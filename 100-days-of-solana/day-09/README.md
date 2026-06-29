# Day 9: Fetch and display recent transactions

Today, we connected to Solana's Devnet via RPC using the new `@solana/kit` and fetched the 5 most recent transaction signatures for the Token-2022 Program address.

We also built an interactive web dashboard running on `localhost:5174` that displays the recent transactions list, including their slots, signatures (linked to Solana Explorer), timestamps, and success/failure status.

---

## 📸 Interactive Dashboard
![Transaction Inspector](./screenshot.png)

---

## 💻 Code Implementation

### CLI Script (`fetch-transactions.mjs`):
```javascript
import { createSolanaRpc, devnet, address } from "@solana/kit";

const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));

// Same address from yesterday. Programs have lots of transaction activity.
const targetAddress = address(
  "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
);

// Fetch the 5 most recent transaction signatures for this address
const signatures = await rpc
  .getSignaturesForAddress(targetAddress, { limit: 5 })
  .send();

console.log(
  `\nLast 5 transactions for ${targetAddress}:\n`
);

for (const tx of signatures) {
  const time = tx.blockTime
    ? new Date(Number(tx.blockTime) * 1000).toLocaleString()
    : "unknown";

  console.log(`Signature : ${tx.signature}`);
  console.log(`Slot      : ${tx.slot}`);
  console.log(`Time      : ${time}`);
  console.log(`Status    : ${tx.err ? "Failed" : "Success"}`);
  console.log("---");
}
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
   Open `http://localhost:5174/` (or the console printed port) in your browser.
