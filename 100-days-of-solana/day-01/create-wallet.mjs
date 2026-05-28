import {
  generateKeyPairSigner,
  createSolanaRpc,
  address,
  devnet,
} from "@solana/kit";

const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));
const wallet = await generateKeyPairSigner();

// Use our generated address for the balance check
const fundedAddress = address("2ZEpvBJNv3S3VguCawakYg4JNuUifuZawKxA2pSTbLqN");

console.log("Wallet address (newly generated):", wallet.address);
console.log("Funded address to check:", fundedAddress);
console.log("\n--- Go to https://faucet.solana.com/ and airdrop SOL to this address ---");
console.log("--- Then run this script again to check the balance ---\n");

const { value: balance } = await rpc.getBalance(fundedAddress).send();
const balanceInSol = Number(balance) / 1_000_000_000;

console.log(`Balance of ${fundedAddress}: ${balanceInSol} SOL`);

