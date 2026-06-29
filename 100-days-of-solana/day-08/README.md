# Day 8: Read your first on-chain data

Today, we connected to Solana's Devnet via RPC using the new `@solana/kit` and fetched the balance of our local CLI wallet address.

---

## 💻 Code Implementation

Inside [read-balance.mjs](file:///c:/Users/athar/OneDrive/Desktop/100D_Solana/D1/100-days-of-solana/day-08/read-balance.mjs):
```javascript
import { createSolanaRpc, devnet, address } from "@solana/kit";

const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));
const targetAddress = address("BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK");

const { value: balanceInLamports } = await rpc
  .getBalance(targetAddress)
  .send();

const balanceInSol = Number(balanceInLamports) / 1_000_000_000;

console.log(`Address: ${targetAddress}`);
console.log(`Balance: ${balanceInSol} SOL`);
```

---

## 🖥️ Terminal Output
```text
Address: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
Balance: 1 SOL
```
