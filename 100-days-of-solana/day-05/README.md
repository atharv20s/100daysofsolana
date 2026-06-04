# Day 5: Explore Different Wallet Types

Today we analyzed and set up three different wallet types on Solana: CLI keypair wallet, Browser extension wallet, and Mobile app wallet, exploring their trade-offs along the axes of **Hot vs. Cold** and **Custodial vs. Non-custodial**.

---

## Wallet Comparison Dashboard

We built and ran a local interactive **Solana Wallet Explorer & Reflection Hub** on localhost.

![Wallet Explorer Dashboard](./day5.png)

### Concepts & Setup

1. **CLI Wallet:** Stored as plaintext JSON (`~/.config/solana/id.json`). Fast and scriptable for local dev workflows, but hot and insecure for mainnet storage.
2. **Browser Extension (Phantom/MetaMask):** Password-encrypted at rest in LocalStorage. Standardized API via `@wallet-standard/app` for dApp interfacing, with explicit user prompt guards.
3. **Mobile Wallet (Phantom/Solflare):** Leverages OS sandboxing and biometric access (FaceID/fingerprint) backed by Secure Enclave hardware co-processors.
4. **Hardware Wallets (Ledger):** Cold, air-gapped signature verification. Private key never leaves the physical chips.
5. **Multisigs (Squads):** On-chain smart accounts requiring multiple private keys to approve operations.

---

## Challenge Reflection Q&A

### 1. Which wallet was fastest to set up?
The **CLI wallet** was the fastest, requiring a single `solana-keygen new` command taking less than 5 seconds without seed phrase confirmation tests or password inputs.

### 2. Which felt safest?
The **Mobile wallet** felt safest because it utilizes hardware-isolated secure enclave chips, biometric authentication gates, and OS-level sandboxing.

### 3. Where is the private key stored in each case?
- **CLI Wallet:** Raw plaintext JSON array under `~/.config/solana/id.json`.
- **Browser Wallet:** Encrypted with setup password in browser's local sandbox storage directory.
- **Mobile Wallet:** Stored securely within iOS Keychain or Android Keystore backed by Secure Enclave.

### 4. If your laptop caught fire right now, which wallets could you recover? How?
- **Browser and Mobile Wallets:** Recoverable by importing their written-down 12/24-word recovery seed phrase on a new device.
- **CLI Wallet:** Permanent loss of funds/identity unless a physical backup of the JSON file or its seed phrase was created.

### 5. If you were building a dApp and needed to sign 500 test transactions in a script, which wallet would you use?
The **CLI wallet** because its plaintext private key file can be loaded directly into a Node/Python script memory to sign programmatically without requiring manual confirmation clicks.

### 6. If you were holding $10,000 in SOL, which wallet would you use?
A **Hardware wallet (Ledger)** or an multi-signature governance vault like **Squads Multisig** to completely decouple access from internet-facing environments.

---

## Running the Interactive Hub Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run dev server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.
