import { createSolanaRpc, devnet, address } from "@solana/kit";

// Connect to devnet (Solana's test network)
const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));

// Replace this with the wallet address you created on Day 1
const targetAddress = address(
  "BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK"
);

// Query the balance, just like calling a REST API
const { value: balanceInLamports } = await rpc
  .getBalance(targetAddress)
  .send();

// Lamports are Solana's smallest unit. 1 SOL = 1,000,000,000 lamports.
const balanceInSol = Number(balanceInLamports) / 1_000_000_000;

console.log(`Address: ${targetAddress}`);
console.log(`Balance: ${balanceInSol} SOL`);
