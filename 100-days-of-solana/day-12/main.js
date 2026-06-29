import { createSolanaRpc, devnet, mainnet, address } from "@solana/kit";

const devnetRpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));
const mainnetRpc = createSolanaRpc(mainnet("https://api.mainnet-beta.solana.com"));

const addressInput = document.getElementById("addressInput");
const fetchBtn = document.getElementById("fetchBtn");
const loader = document.getElementById("loader");

const devnetBalance = document.getElementById("devnetBalance");
const devnetTxList = document.getElementById("devnetTxList");

const mainnetBalance = document.getElementById("mainnetBalance");
const mainnetTxList = document.getElementById("mainnetTxList");

async function queryNetwork(rpc, targetAddress, balanceEl, txListEl, explorerCluster) {
  try {
    // 1. Fetch Balance
    const { value: balanceInLamports } = await rpc.getBalance(targetAddress).send();
    const balanceInSol = Number(balanceInLamports) / 1_000_000_000;
    balanceEl.textContent = `${balanceInSol.toLocaleString(undefined, { maximumFractionDigits: 9 })} SOL`;

    // 2. Fetch Transactions
    const signatures = await rpc.getSignaturesForAddress(targetAddress, { limit: 3 }).send();

    txListEl.innerHTML = "";

    if (signatures.length === 0) {
      txListEl.innerHTML = `<div class="tx-card" style="text-align: center; color: var(--text-secondary);">No transactions found</div>`;
      return;
    }

    signatures.forEach(tx => {
      const time = tx.blockTime
        ? new Date(Number(tx.blockTime) * 1000).toLocaleString()
        : "unknown";

      const explorerUrl = `https://explorer.solana.com/tx/${tx.signature}${explorerCluster ? `?cluster=${explorerCluster}` : ""}`;
      
      const card = document.createElement("div");
      card.className = "tx-card";
      card.innerHTML = `
        <a href="${explorerUrl}" target="_blank" class="tx-sig">${tx.signature.slice(0, 24)}...</a>
        <div class="tx-meta">
          <span>Slot: ${tx.slot.toLocaleString()}</span>
          <span>${time}</span>
        </div>
      `;
      txListEl.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    balanceEl.textContent = "Error loading";
    txListEl.innerHTML = `<div class="tx-card" style="color: #ef4444;">Failed to fetch: ${error.message}</div>`;
  }
}

async function runComparison() {
  const addrStr = addressInput.value.trim();
  if (!addrStr) return alert("Please enter an address");

  let targetAddress;
  try {
    targetAddress = address(addrStr);
  } catch (err) {
    return alert("Invalid Solana Address format");
  }

  loader.style.display = "block";
  fetchBtn.disabled = true;

  // Run devnet and mainnet queries in parallel using allSettled to handle CORS errors gracefully
  await Promise.allSettled([
    queryNetwork(devnetRpc, targetAddress, devnetBalance, devnetTxList, "devnet"),
    queryNetwork(mainnetRpc, targetAddress, mainnetBalance, mainnetTxList, "")
  ]);


  loader.style.display = "none";
  fetchBtn.disabled = false;
}

fetchBtn.addEventListener("click", runComparison);

// Auto-run on load
runComparison();
