import {
	address,
	createKeyPairSignerFromBytes,
	createSolanaRpc,
	createSolanaRpcSubscriptions,
	pipe,
	createTransactionMessage,
	setTransactionMessageFeePayerSigner,
	setTransactionMessageLifetimeUsingBlockhash,
	appendTransactionMessageInstruction,
	signTransactionMessageWithSigners,
	getSignatureFromTransaction,
	getBase64EncodedWireTransaction,
	lamports,
	devnet,
} from "@solana/kit";
import { getTransferSolInstruction } from "@solana-program/system";
import fs from "fs";
import path from "path";
import os from "os";

// Resolve keypair path: ~/.config/solana/id.json
const keypairPath = path.join(os.homedir(), ".config/solana", "id.json");

console.log("Solana Transfer Tool");
console.log("====================");

// 1. Check arguments
const recipientArg = process.argv[2];
const amountArg = process.argv[3];

if (!recipientArg || !amountArg) {
  console.log("Usage: node transfer.mjs <recipient_address> <amount_in_sol>");
  console.log("Example: node transfer.mjs FkC8VHGTgFHZtefvxAsuyPAqgoUqzFomgKw83F2BC35p 0.05\n");
  process.exit(1);
}

// 2. Validate amount
const transferAmountSOL = parseFloat(amountArg);
if (isNaN(transferAmountSOL) || transferAmountSOL <= 0) {
  console.error("Error: Amount must be a positive number.");
  process.exit(1);
}

// Helper for status updates
function statusUpdate(message) {
    if (process.stdout.clearLine && process.stdout.cursorTo) {
	    process.stdout.clearLine(0);
	    process.stdout.cursorTo(0);
    } else {
        process.stdout.write('\n');
    }
	process.stdout.write(message);
}

async function waitForCommitment(rpc, signature, desiredCommitment) {
    while (true) {
        const { value: statuses } = await rpc.getSignatureStatuses([signature]).send();
        const status = statuses[0];

        if (status) {
            if (status.err) {
                throw new Error(`Transaction failed: ${JSON.stringify(status.err)}`);
            }
            
            const confirmationStatus = status.confirmationStatus;
            
            if (confirmationStatus === desiredCommitment || 
               (desiredCommitment === 'confirmed' && confirmationStatus === 'finalized')) {
                return;
            }
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

async function transferWithConfirmation(rpc, senderSigner, recipientAddress, solAmount) {
    const transferAmountLamports = lamports(BigInt(Math.round(solAmount * 1_000_000_000)));
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

    const transferInstruction = getTransferSolInstruction({
        amount: transferAmountLamports,
        destination: recipientAddress,
        source: senderSigner,
    });

    const transactionMessage = pipe(
        createTransactionMessage({ version: 0 }),
        (tx) => setTransactionMessageFeePayerSigner(senderSigner, tx),
        (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
        (tx) => appendTransactionMessageInstruction(transferInstruction, tx)
    );

    const fullySignedTransaction = await signTransactionMessageWithSigners(transactionMessage);
    const signature = getSignatureFromTransaction(fullySignedTransaction);
    const wireTransaction = getBase64EncodedWireTransaction(fullySignedTransaction);

    statusUpdate("Status: Sending transaction...");
    await rpc.sendTransaction(wireTransaction, { encoding: 'base64' }).send();
    
    statusUpdate("Status: Processed (waiting for confirmation)...");
    await waitForCommitment(rpc, signature, 'confirmed');
    
    statusUpdate("Status: Confirmed (waiting for finalization)...");
    await waitForCommitment(rpc, signature, 'finalized');
    
    statusUpdate("Status: Finalized!                  \n");

    return signature;
}

async function main() {
    // 3. Load Keypair
    if (!fs.existsSync(keypairPath)) {
      console.error(`Error: Sender keypair not found at ${keypairPath}`);
      console.error("Please run 'solana-keygen new' first.");
      process.exit(1);
    }

    const secretKeyArray = JSON.parse(fs.readFileSync(keypairPath, "utf-8"));
    const secretKeyBytes = new Uint8Array(secretKeyArray);
    const sender = await createKeyPairSignerFromBytes(secretKeyBytes);

    // 4. Validate recipient address
    let recipientAddress;
    try {
      recipientAddress = address(recipientArg);
    } catch (err) {
      console.error("Error: Invalid recipient address format.");
      process.exit(1);
    }

    // 5. Establish RPC connections
    const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));
    console.log("Connected to Solana devnet.");

    // 6. Check balance
    console.log(`Sender: ${sender.address}`);
    console.log(`Recipient: ${recipientAddress}`);
    console.log(`Amount: ${transferAmountSOL} SOL`);

    const senderBalanceObj = await rpc.getBalance(sender.address).send();
    const senderBalanceLamports = senderBalanceObj.value;
    const senderBalanceSOL = Number(senderBalanceLamports) / 1_000_000_000;
    console.log(`Sender balance: ${senderBalanceSOL} SOL`);

    const requiredLamports = BigInt(Math.round(transferAmountSOL * 1_000_000_000)) + 5000n;

    if (BigInt(senderBalanceLamports) < requiredLamports) {
      console.error(`Error: Insufficient balance to cover transfer amount + fee.`);
      process.exit(1);
    }

    try {
        const signature = await transferWithConfirmation(rpc, sender, recipientAddress, transferAmountSOL);
        console.log("Transaction successful!");
        console.log(`Signature: ${signature}`);
        console.log(`View on Solana Explorer:`);
        console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch (error) {
        console.error("\nTransaction failed:");
        console.error(error.message);
        process.exit(1);
    }
}

main();
