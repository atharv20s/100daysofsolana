import { createSolanaRpc, devnet, address } from "@solana/kit";

const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));

const addressInput = document.getElementById("addressInput");
const fetchBtn = document.getElementById("fetchBtn");
const loader = document.getElementById("loader");
const feedTitle = document.getElementById("feedTitle");
const txList = document.getElementById("txList");
const presets = document.querySelectorAll(".preset-btn");

async function fetchTransactions() {
  const addrStr = addressInput.value.trim();
  if (!addrStr) return alert("Please enter an address");

  // Show loader and hide old results
  loader.style.display = "block";
  txList.innerHTML = "";
  feedTitle.style.display = "none";
  fetchBtn.disabled = true;

  try {
    const targetAddress = address(addrStr);
    const signatures = await rpc
      .getSignaturesForAddress(targetAddress, { limit: 5 })
      .send();

    feedTitle.textContent = `Recent Transactions (${signatures.length})`;
    feedTitle.style.display = "block";

    if (signatures.length === 0) {
      txList.innerHTML = `<div class="tx-card" style="text-align: center; color: var(--text-secondary);">No transactions found for this address.</div>`;
      return;
    }

    signatures.forEach(tx => {
      const time = tx.blockTime
        ? new Date(Number(tx.blockTime) * 1000).toLocaleString()
        : "Unknown Timestamp";

      const card = document.createElement("div");
      card.className = "tx-card";
      
      const explorerUrl = `https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`;
      const statusClass = tx.err ? "status-failed" : "status-success";
      const statusText = tx.err ? "Failed" : "Success";

      card.innerHTML = `
        <div class="tx-header">
          <span class="tx-slot">Slot: ${tx.slot.toLocaleString()}</span>
          <span class="status-badge ${statusClass}">${statusText}</span>
        </div>
        <a href="${explorerUrl}" target="_blank" class="tx-signature">${tx.signature}</a>
        <div class="tx-time">Time: ${time}</div>
      `;

      txList.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    alert("Failed to fetch transactions. Make sure the address is valid.");
  } finally {
    loader.style.display = "none";
    fetchBtn.disabled = false;
  }
}

fetchBtn.addEventListener("click", fetchTransactions);

presets.forEach(btn => {
  btn.addEventListener("click", () => {
    addressInput.value = btn.getAttribute("data-addr");
    fetchTransactions();
  });
});

// Auto fetch on load
fetchTransactions();
