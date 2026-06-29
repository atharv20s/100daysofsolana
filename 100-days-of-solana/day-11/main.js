import { createSolanaRpc, devnet, address } from "@solana/kit";

const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));

const walletPubkey = "BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK";
const programPubkey = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

// DOM Elements
const walletPubkeyEl = document.getElementById("walletPubkey");
const walletBalanceEl = document.getElementById("walletBalance");
const walletOwnerEl = document.getElementById("walletOwner");
const walletExecEl = document.getElementById("walletExec");

const progBalanceEl = document.getElementById("progBalance");
const progOwnerEl = document.getElementById("progOwner");
const progExecEl = document.getElementById("progExec");

const byteInput = document.getElementById("byteInput");
const rentSol = document.getElementById("rentSol");

async function initDashboard() {
  try {
    // 1. Fetch Wallet Account info
    const walletAddress = address(walletPubkey);
    const walletInfo = await rpc.getAccountInfo(walletAddress).send();
    
    walletPubkeyEl.textContent = walletPubkey;
    if (walletInfo && walletInfo.value) {
      const sol = Number(walletInfo.value.lamports) / 1_000_000_000;
      walletBalanceEl.textContent = `${sol} SOL`;
      walletOwnerEl.textContent = walletInfo.value.owner;
      walletExecEl.textContent = walletInfo.value.executable ? "true" : "false";
    } else {
      walletBalanceEl.textContent = "0 SOL (Not Airdropped yet)";
      walletOwnerEl.textContent = "System Program";
      walletExecEl.textContent = "false";
    }

    // 2. Fetch Token Program Account info
    const progAddress = address(programPubkey);
    const progInfo = await rpc.getAccountInfo(progAddress).send();

    if (progInfo && progInfo.value) {
      const sol = Number(progInfo.value.lamports) / 1_000_000_000;
      progBalanceEl.textContent = `${sol.toFixed(4)} SOL`;
      progOwnerEl.textContent = progInfo.value.owner;
      progExecEl.textContent = progInfo.value.executable ? "true" : "false";
    }

    // 3. Rent calculation initial load
    calculateRent();

  } catch (error) {
    console.error("Dashboard initialization error:", error);
  }
}

async function calculateRent() {
  const bytes = parseInt(byteInput.value, 10);
  if (isNaN(bytes) || bytes < 0) return;

  try {
    const lamports = await rpc.getMinimumBalanceForRentExemption(BigInt(bytes)).send();
    const sol = Number(lamports) / 1_000_000_000;
    rentSol.textContent = sol.toLocaleString(undefined, { minimumFractionDigits: 8 });
  } catch (error) {
    console.error("Rent calculation error:", error);
  }
}

byteInput.addEventListener("input", calculateRent);

initDashboard();
