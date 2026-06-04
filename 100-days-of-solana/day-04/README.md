# Day 4: Connect a Browser Wallet

## Concepts Covered
- **Wallet Standard (`@wallet-standard/app`)**: An open, lightweight protocol that allows web applications to discover and interact with browser wallets (such as Phantom, Solflare, or MetaMask) without hardcoding custom integrations for each wallet.
- **Browser Wallets**: Extensions that securely store user keys, expose standard Web3 APIs, and prompt users to approve or reject connections and transaction signatures without exposing their private keys.
- **Connection Flow**: The permission-based flow requiring explicit user approval (`connectFeature.connect()`) before exposing any public keys/addresses to the client application.
- **RPC Queries via `@solana/kit`**: Querying the connected public key's live balance in real time using the Solana RPC standard.

---

## Wallet & Connection Screen

Here is the application showing a successful connection to a browser wallet:

![Connected Wallet State](./day4.png)

### Connection Metadata
- **Connected Wallet**: MetaMask (Solana Snap)
- **Public Key (Address)**: `Gfa11SqE7wpwh9ksRzPT16P79MLnfVJ3n2iTbkvjTFJf`
- **Current Balance**: `0.000000000 SOL`
- **Network**: Solana Devnet (`https://api.devnet.solana.com`)

---

## Project Structure & Setup

This challenge is built using **Vite** with the **vanilla template**. 

### Running Locally
To launch the application local development server:
```bash
npm install
npm run dev
```

The server will spin up on `http://localhost:5173`. When a compatible wallet extension is installed, it will automatically register itself in the application list.
