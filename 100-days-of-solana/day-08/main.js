import { createSolanaRpc, devnet, address } from "@solana/kit";

const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));

const addressInput = document.getElementById("addressInput");
const queryBtn = document.getElementById("queryBtn");
const loader = document.getElementById("loader");
const results = document.getElementById("results");
const solAmount = document.getElementById("solAmount");
const lamportsAmount = document.getElementById("lamportsAmount");
const presets = document.querySelectorAll(".preset-btn");

async function fetchBalance() {
  const addrStr = addressInput.value.trim();
  if (!addrStr) return alert("Please enter an address");

  // Show loader and hide old results
  loader.style.display = "block";
  results.style.display = "none";
  queryBtn.disabled = true;

  try {
    const targetAddress = address(addrStr);
    const { value: balanceInLamports } = await rpc
      .getBalance(targetAddress)
      .send();

    const balanceInSol = Number(balanceInLamports) / 1_000_000_000;

    solAmount.textContent = balanceInSol.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 9 });
    lamportsAmount.textContent = `Lamports: ${Number(balanceInLamports).toLocaleString()}`;
    results.style.display = "block";
  } catch (error) {
    console.error(error);
    alert("Failed to fetch balance. Make sure the address is a valid Solana public key.");
  } finally {
    loader.style.display = "none";
    queryBtn.disabled = false;
  }
}

queryBtn.addEventListener("click", fetchBalance);

presets.forEach(btn => {
  btn.addEventListener("click", () => {
    addressInput.value = btn.getAttribute("data-addr");
    fetchBalance();
  });
});

// Auto fetch on load
fetchBalance();
