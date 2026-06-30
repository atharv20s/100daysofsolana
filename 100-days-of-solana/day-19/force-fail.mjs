import {
	address,
	createKeyPairSignerFromBytes,
	createSolanaRpc,
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

async function main() {
    if (!fs.existsSync(keypairPath)) {
        console.error(`Error: Keypair not found at ${keypairPath}`);
        process.exit(1);
    }

    const secretKeyArray = JSON.parse(fs.readFileSync(keypairPath, "utf-8"));
    const secretKeyBytes = new Uint8Array(secretKeyArray);
    const sender = await createKeyPairSignerFromBytes(secretKeyBytes);

    const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));
    
    console.log("Preparing transaction...");
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

    // Destination address (we'll use a random valid address)
    const recipientAddress = address("FkC8VHGTgFHZtefvxAsuyPAqgoUqzFomgKw83F2BC35p");
    
    // Transfer 500 SOL (forces insufficient funds on-chain when skipping preflight)
    const transferAmount = lamports(500n * 1_000_000_000n);

    const transferInstruction = getTransferSolInstruction({
        amount: transferAmount,
        destination: recipientAddress,
        source: sender,
    });

    const transactionMessage = pipe(
        createTransactionMessage({ version: 0 }),
        (tx) => setTransactionMessageFeePayerSigner(sender, tx),
        (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
        (tx) => appendTransactionMessageInstruction(transferInstruction, tx)
    );

    const fullySignedTransaction = await signTransactionMessageWithSigners(transactionMessage);
    const signature = getSignatureFromTransaction(fullySignedTransaction);
    const wireTransaction = getBase64EncodedWireTransaction(fullySignedTransaction);

    console.log(`Sending transaction with signature ${signature}...`);
    
    try {
        await rpc.sendTransaction(wireTransaction, {
            encoding: "base64",
            skipPreflight: true, // Bypass preflight to force it on-chain
        }).send();
        
        console.log("\nTransaction successfully sent to network (skipping preflight).");
        console.log(`Signature: ${signature}`);
        console.log(`View on Solana Explorer (devnet):`);
        console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
        console.log(`\nTo inspect using CLI, run:`);
        console.log(`solana confirm -v ${signature} --url devnet`);
    } catch (err) {
        console.error("Failed to send transaction:", err.message || err);
    }
}

main();
