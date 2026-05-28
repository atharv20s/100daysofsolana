# 100 Days of Solana (`100daysofsolana`)

A comprehensive developer journey learning and building on the Solana blockchain over 100 days. 

---

## 🛠️ Technologies Used

-   **Node.js**: The Javascript runtime environment used to execute the backend scripts.
-   **JavaScript (ES Modules)**: Leveraged modern ES modules (using `.mjs` extensions) for clean import/export syntax.
-   **@solana/kit (v6.x / Web3.js v2)**: The brand-new, modern, and tree-shakable Solana SDK for blockchain interactions.
-   **Solana JSON-RPC**: Connection client configured for the Solana **Devnet** cluster to communicate with the blockchain.
-   **Git & GitHub**: Source control and remote repository management.

---

## 📖 Project Description

This project tracks daily challenges to master Solana blockchain development. 

### Day 1: Identity & Your First Wallet
On Day 1, we establish a cryptographic identity on Solana. Unlike Web2 applications which rely on username/password combos saved on centralized databases, Solana uses **Keypairs** to verify identity.

-   **Public Key (Address)**: `2ZEpvBJNv3S3VguCawakYg4JNuUifuZawKxA2pSTbLqN` (Acts as the unique identifier/address on-chain, safe to share).
-   **Private Key**: Held in memory (proves ownership and signs transactions).
-   **Devnet Funding**: Funded the generated keypair with devnet SOL using the Solana Web Faucet to cover network transaction fees.

### Balance Verification
We created scripts to query the Solana network and check if the airdropped devnet SOL arrived at the address.

---

## 🚀 How to Run

### Setup
Ensure you have the dependencies installed:
```bash
cd 100-days-of-solana/day-01
npm install
```

### Generate Wallet & Check Balance
To run the wallet generation and balance checking script:
```bash
node create-wallet.mjs
```

### Check Balance of Any Address
To check the balance of a specific address dynamically:
```bash
node check-balance.mjs <SOLANA_ADDRESS>
```
Example:
```bash
node check-balance.mjs 2ZEpvBJNv3S3VguCawakYg4JNuUifuZawKxA2pSTbLqN
```

---

## 📊 Devnet Wallet Balance Screenshot
![Day 1 Screenshot](./100-days-of-solana/day-01/day1.png)
