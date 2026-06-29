# Day 8: Read your first on-chain data

Today, we connected to Solana's Devnet via RPC using the new `@solana/kit` and fetched the balance of our local CLI wallet address.

We also built an interactive web dashboard running on `localhost:5173` that queries the balance of any Solana public address in real-time.

---

## 📸 Interactive Dashboard
![On-Chain Inspector](./screenshot.png)

---

## 💻 Code Implementation

### CLI Script (`read-balance.mjs`):
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

## 🚀 How to Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the local server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

