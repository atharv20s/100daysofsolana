import { createSolanaRpc, devnet } from "@solana/kit";
import { getWallets } from "@wallet-standard/app";

// Setup RPC Connection to Devnet
const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));

// DOM Elements - Tabs
window.switchTab = function(tabId) {
  // Hide all contents
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach(content => content.classList.remove("active"));
  
  // Deactivate all tab buttons
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  
  // Show target content
  const activeContent = document.getElementById(`tab-${tabId}`);
  if (activeContent) activeContent.classList.add("active");
  
  // Activate target button
  // Find button based on onclick string
  buttons.forEach(btn => {
    if (btn.getAttribute("onclick").includes(tabId)) {
      btn.classList.add("active");
    }
  });
};

// DOM Elements - Active Wallet Hub
const extensionsList = document.getElementById("extensions-list");
const walletButtonsContainer = document.getElementById("wallet-buttons-container");
const browserDisconnected = document.getElementById("browser-disconnected");
const browserConnected = document.getElementById("browser-connected");
const connectedWalletName = document.getElementById("connected-wallet-name");
const connectedWalletAddress = document.getElementById("connected-wallet-address");
const connectedWalletBalance = document.getElementById("connected-wallet-balance");
const btnDisconnect = document.getElementById("btn-disconnect");
const errorBox = document.getElementById("error-box");

// CLI Inspector DOM Elements
const cliAddressInput = document.getElementById("cli-address-input");
const btnInspectCli = document.getElementById("btn-inspect-cli");
const cliStatus = document.getElementById("cli-status");
const cliDisplayAddress = document.getElementById("cli-display-address");
const cliDisplayBalance = document.getElementById("cli-display-balance");

let activeBrowserWallet = null;

// WALLET STANDARD API INTEGRATION
function isSolanaWallet(wallet) {
  return wallet.chains?.some((chain) => chain.startsWith("solana:"));
}

function scanAndRenderWallets() {
  const { get } = getWallets();
  const allWallets = get();
  const solanaWallets = allWallets.filter(isSolanaWallet);

  // Render detected extensions list
  if (solanaWallets.length === 0) {
    extensionsList.innerHTML = `<span style="color: var(--accent-red); font-size: 0.85rem;">No wallets detected</span>`;
    walletButtonsContainer.innerHTML = `
      <div style="padding: 1rem; text-align: center; color: var(--text-secondary); background: rgba(0,0,0,0.1); border-radius: 8px; font-size: 0.85rem;">
        No Solana wallet extensions found. Please install <a href="https://phantom.app" target="_blank" style="color: var(--accent-solana);">Phantom</a> or another compatible wallet.
      </div>`;
    return;
  }

  // Display badges for detected extensions
  extensionsList.innerHTML = "";
  walletButtonsContainer.innerHTML = "";

  solanaWallets.forEach(wallet => {
    // Extension badge
    const badge = document.createElement("div");
    badge.className = "installed-badge";
    badge.innerHTML = wallet.icon 
      ? `<img src="${wallet.icon}" alt=""> ${wallet.name}`
      : wallet.name;
    extensionsList.appendChild(badge);

    // Connect button
    const btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.style.marginBottom = "0.75rem";
    btn.innerHTML = wallet.icon
      ? `<img src="${wallet.icon}" style="width: 20px; height: 20px; border-radius: 4px;" alt=""> Connect ${wallet.name}`
      : `Connect ${wallet.name}`;
    btn.addEventListener("click", () => connectBrowserWallet(wallet));
    walletButtonsContainer.appendChild(btn);
  });
}

async function connectBrowserWallet(wallet) {
  errorBox.textContent = "";
  const connectFeature = wallet.features["standard:connect"];
  if (!connectFeature) {
    errorBox.textContent = `${wallet.name} does not support standard connection interface.`;
    return;
  }

  try {
    const { accounts } = await connectFeature.connect();
    if (accounts.length === 0) {
      errorBox.textContent = "Connection rejected by user.";
      return;
    }

    activeBrowserWallet = wallet;
    const account = accounts[0];
    const address = account.address;

    // Fetch Devnet Balance
    const { value: lamports } = await rpc.getBalance(address).send();
    const balanceSol = (Number(lamports) / 1_000_000_000).toFixed(9);

    // Update UI
    connectedWalletName.textContent = wallet.name;
    connectedWalletAddress.textContent = address;
    connectedWalletBalance.innerHTML = `${balanceSol} <span>SOL</span>`;

    browserDisconnected.style.display = "none";
    browserConnected.style.display = "block";
  } catch (err) {
    errorBox.textContent = `Error connecting: ${err.message}`;
  }
}

async function disconnectBrowserWallet() {
  if (!activeBrowserWallet) return;
  
  const disconnectFeature = activeBrowserWallet.features["standard:disconnect"];
  if (disconnectFeature) {
    try {
      await disconnectFeature.disconnect();
    } catch (e) {
      console.warn("Standard disconnect call failed: ", e);
    }
  }

  activeBrowserWallet = null;
  browserConnected.style.display = "none";
  browserDisconnected.style.display = "block";
}

// CLI INSPECTOR FUNCTIONALITY
async function inspectCliWallet() {
  const address = cliAddressInput.value.trim();
  
  if (!address) {
    alert("Please enter a valid Solana address");
    return;
  }

  btnInspectCli.disabled = true;
  btnInspectCli.textContent = "Querying RPC...";

  try {
    const { value: lamports } = await rpc.getBalance(address).send();
    const balanceSol = (Number(lamports) / 1_000_000_000).toFixed(9);

    cliStatus.className = "wallet-status status-online";
    cliStatus.textContent = "Active (Devnet)";
    cliDisplayAddress.textContent = address;
    cliDisplayBalance.innerHTML = `${balanceSol} <span>SOL</span>`;
  } catch (err) {
    cliStatus.className = "wallet-status status-offline";
    cliStatus.textContent = "Error Querying";
    cliDisplayAddress.textContent = address;
    cliDisplayBalance.innerHTML = `0.000000000 <span>SOL</span>`;
    alert(`Could not fetch balance. Make sure the address is valid. Error: ${err.message}`);
  } finally {
    btnInspectCli.disabled = false;
    btnInspectCli.textContent = "Querying Devnet Balance";
  }
}

// Init Setup
const { on } = getWallets();
scanAndRenderWallets();

// Handle late-injecting extensions
on("register", () => {
  if (!activeBrowserWallet) {
    scanAndRenderWallets();
  }
});

// Event Listeners
btnDisconnect.addEventListener("click", disconnectBrowserWallet);
btnInspectCli.addEventListener("click", inspectCliWallet);
