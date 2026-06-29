# Day 10: Build a simple dashboard in the browser

Today, we built our first comprehensive web-based dashboard on Solana. This dashboard combines our Day 8 balance fetch logic and Day 9 transaction fetch logic into a single user-friendly client-side application.

---

## 📸 Dashboard Output (Proof of Work)
![Solana Dashboard](./screenshot.png)

---

## 💻 Code Implementation

### index.html:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Solana Devnet Dashboard</title>
    <!-- CSS rules styling the address input, Fetch button, balance layout, and transaction cards -->
  </head>
  <body>
    <h1>Solana Devnet Dashboard</h1>
    <input type="text" id="addressInput" value="TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb" />
    <button id="fetchBtn">Fetch Data</button>
    <div id="error"></div>
    <div id="loading"></div>
    <div id="results"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### src/main.js:
```javascript
import { createSolanaRpc, devnet, address } from "@solana/kit";

const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));
const addressInput = document.getElementById("addressInput");
const fetchBtn = document.getElementById("fetchBtn");
const resultsDiv = document.getElementById("results");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");

fetchBtn.addEventListener("click", async () => {
  errorDiv.textContent = "";
  resultsDiv.innerHTML = "";
  loadingDiv.textContent = "Fetching...";

  try {
    const targetAddress = address(addressInput.value.trim());

    // 1. Fetch balance (from Day 8)
    const { value: balanceInLamports } = await rpc.getBalance(targetAddress).send();
    const balanceInSol = Number(balanceInLamports) / 1_000_000_000;

    // 2. Fetch transactions (from Day 9)
    const signatures = await rpc.getSignaturesForAddress(targetAddress, { limit: 5 }).send();

    // 3. Render results
    let html = `<div class="balance">${balanceInSol} SOL</div>`;
    html += `<h3>Recent transactions</h3>`;

    for (const tx of signatures) {
      const time = tx.blockTime ? new Date(Number(tx.blockTime) * 1000).toLocaleString() : "unknown";
      const statusClass = tx.err ? "status failed" : "status";
      const statusText = tx.err ? "Failed" : "Success";

      html += `
        <div class="tx">
          <div><strong>Signature:</strong> ${tx.signature}</div>
          <div><strong>Slot:</strong> ${tx.slot}</div>
          <div><strong>Time:</strong> ${time}</div>
          <div class="${statusClass}"><strong>Status:</strong> ${statusText}</div>
        </div>
      `;
    }

    resultsDiv.innerHTML = html;
  } catch (err) {
    errorDiv.textContent = `Error: ${err.message}`;
  } finally {
    loadingDiv.textContent = "";
  }
});
```

---

## 🚀 Running the Dashboard Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Launch dev server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5175/` (or the fallback port printed by Vite) in your browser.
