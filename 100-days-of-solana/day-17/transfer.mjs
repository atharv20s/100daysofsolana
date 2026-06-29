import {
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  sendAndConfirmTransactionFactory,
  address,
  devnet,
  pipe,
  createTransactionMessage,
  setTransactionMessageFeePayer,
  setTransactionMessageLifetimeUsingBlockhash,
  appendTransactionMessageInstructions,
  compileTransaction,
  signTransactionWithSigners,
  createKeyPairSignerFromBytes,
  getSignatureFromTransaction
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

// 3. Load Keypair
if (!fs.existsSync(keypairPath)) {
  console.error(`Error: Sender keypair not found at ${keypairPath}`);
  console.error("Please run 'solana-keygen new' first.");
  process.exit(1);
}

const secretKeyArray = JSON.parse(fs.readFileSync(keypairPath, "utf-8"));
const secretKeyBytes = new Uint8Array(secretKeyArray);
const senderSigner = await createKeyPairSignerFromBytes(secretKeyBytes);

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
const rpcSubscriptions = createSolanaRpcSubscriptions(devnet("wss://api.devnet.solana.com/"));
console.log("Connected to Solana devnet.");

// 6. Check balance
console.log(`Sender: ${senderSigner.address}`);
console.log(`Recipient: ${recipientAddress}`);
console.log(`Amount: ${transferAmountSOL} SOL`);

const senderBalanceObj = await rpc.getBalance(senderSigner.address).send();
const senderBalanceLamports = senderBalanceObj.value;
const senderBalanceSOL = Number(senderBalanceLamports) / 1_000_000_000;
console.log(`Sender balance: ${senderBalanceSOL} SOL`);

const transferAmountLamports = BigInt(Math.round(transferAmountSOL * 1_000_000_000));
const estimatedFeeLamports = 5000n; // Standard transaction signature fee

if (BigInt(senderBalanceLamports) < transferAmountLamports + estimatedFeeLamports) {
  console.error(`Error: Insufficient balance to cover transfer amount + fee.`);
  console.error(`Required: ${(Number(transferAmountLamports + estimatedFeeLamports) / 1_000_000_000).toFixed(6)} SOL`);
  process.exit(1);
}

// 7. Build, Sign, and Send Transaction
console.log("Sending transaction...");
try {
  const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

  const transferInstruction = getTransferSolInstruction({
    amount: transferAmountLamports,
    destination: recipientAddress,
    source: senderSigner,
  });

  const transactionMessage = pipe(
    createTransactionMessage({ version: 0 }),
    (tx) => setTransactionMessageFeePayer(senderSigner.address, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
    (tx) => appendTransactionMessageInstructions([transferInstruction], tx)
  );

  const compiledTransaction = compileTransaction(transactionMessage);
  const fullySignedTransaction = await signTransactionWithSigners([senderSigner], compiledTransaction);

  const sendAndConfirmTransaction = sendAndConfirmTransactionFactory({ rpc, rpcSubscriptions });
  
  await sendAndConfirmTransaction(fullySignedTransaction, { commitment: "confirmed" });
  const signature = getSignatureFromTransaction(fullySignedTransaction);

  console.log("Transaction confirmed!");
  console.log(`Signature: ${signature}`);
  console.log(`Explorer:  https://explorer.solana.com/tx/${signature}?cluster=devnet`);

  // Show updated balance
  const newBalanceObj = await rpc.getBalance(senderSigner.address).send();
  const newBalanceSOL = Number(newBalanceObj.value) / 1_000_000_000;
  console.log(`New sender balance: ${newBalanceSOL} SOL`);
} catch (err) {
  console.error("Transaction failed:", err.message || err);
  process.exit(1);
}
