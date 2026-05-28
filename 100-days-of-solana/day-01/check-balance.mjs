import {
  createSolanaRpc,
  address,
  devnet,
} from "@solana/kit";

const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));

const addressString = process.argv[2];

if (!addressString) {
  console.error("Please provide a Solana address as an argument.");
  process.exit(1);
}

try {
  const { value: balance } = await rpc.getBalance(address(addressString)).send();
  const balanceInSol = Number(balance) / 1_000_000_000;
  console.log(`Address: ${addressString}`);
  console.log(`Balance: ${balanceInSol} SOL`);
} catch (error) {
  console.error("Error fetching balance:", error.message);
}
