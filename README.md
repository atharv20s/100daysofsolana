# 100daysofsolana

My journey learning Solana development over 100 days.

## Day 1: Identity and Your First Wallet
*   Generated a Solana keypair programmatically using `@solana/kit`.
*   Address: `2ZEpvBJNv3S3VguCawakYg4JNuUifuZawKxA2pSTbLqN`
*   Funded it on Devnet using the Solana Faucet.

### Devnet Wallet Balance Screenshot
![Day 1 Screenshot](./100-days-of-solana/day-01/day1.png)

---

## Day 2: Persistent Wallet
*   Built a reusable wallet script `persistent-wallet.mjs` that saves keypair bytes to `wallet.json` and loads it on subsequent runs.
*   Address: `GE6ZQPt87frGWHV5jG1erjL3zLioBvfCFvcahqnehK49`
*   Funded the persistent address via the Solana Faucet to obtain 1 SOL.

### Devnet Wallet Balance Screenshot (Day 2)
![Day 2 Screenshot](./100-days-of-solana/day-02/day2.png)

---

## Day 3: Understand SOL and Lamports
*   Learned the relationship: `1 SOL = 1,000,000,000 Lamports`.
*   Created a script to verify wallet balances in both SOL and Lamports.
*   Address: `4A9KgD7Tf7HQ5KpVdZYT8KuZPVoSqGEd55t5iLZYX6sE`
*   **Resolution of Faucet Rate Limits:** When the faucet returned a 429 rate limit error, we performed a CLI transfer of 0.5 SOL from our Day 2 wallet to the Day 3 wallet using transaction signature `3E6G5QRnZ4fxafme4X4tm6djF5oypduA8fiva7GG2sJck2NXhtpogeD63rdRgAK6Q45c8r9YFBqAH16aZLi8D4TA`.
*   Verified the base transfer transaction fee of **5,000 Lamports** (0.000005 SOL) via `solana confirm`.

### Math Derivation Proof:
*   **SOL to Lamports:** `0.5 SOL * 1,000,000,000 = 500,000,000 Lamports`
*   **Lamports to SOL:** `500,000,000 Lamports / 1,000,000,000 = 0.5 SOL`

### Devnet Wallet Balance Screenshot (Day 3)
![Day 3 Screenshot](./100-days-of-solana/day-03/day3.png)

---

## Day 4: Connect a Browser Wallet
*   Built a browser app that discovers installed Solana-compatible wallets using the `@wallet-standard/app` Wallet Standard API.
*   Connected to the wallet securely using the standard connect features with explicit user approval.
*   Address: `Gfa11SqE7wpwh9ksRzPT16P79MLnfVJ3n2iTbkvjTFJf`
*   Fetched and displayed the real-time Devnet balance using the `@solana/kit` RPC client.

### Browser Wallet Connection Screenshot
![Day 4 Screenshot](./100-days-of-solana/day-04/day4.png)

---

## Day 5: Explore Different Wallet Types
*   Set up and compared three different wallet types hands-on: CLI wallet, browser extension wallet, and mobile wallet.
*   Analyzed the hot vs. cold and custodial vs. non-custodial tradeoffs in Solana key management.
*   Built and launched an interactive **Solana Wallet Explorer & Reflection Hub** on localhost.

### Wallet Explorer Dashboard Screenshot (Day 5)
![Day 5 Screenshot](./100-days-of-solana/day-05/day5-hub.png)

---

## Day 6: Share your experiences on DEV (On-Chain Identity)
*   Drafted and published a technical blog post explaining on-chain identity to Web2 developers.
*   Explained how Solana uses cryptographic Ed25519 keypairs (similar to SSH keys) as the primary identity anchor instead of centralized database records.
*   Explored Base58 address encoding and sovereign non-custodial ownership patterns.

---

## Day 7: Share your wallet experiments and amplify others
*   Shared our progress and takeaways from Week 1 of the #100DaysOfSolana challenge with the community.
*   Created engagement templates and connected with peer developers to discuss wallet archetypes, hot vs. cold storage, and Base58 usability.

---

## Day 8: Read your first on-chain data
*   Connected to the public Solana Devnet via RPC using the new `@solana/kit` and fetched the balance of our local CLI wallet address.
*   Built a client-side interactive **On-Chain Data Inspector** dashboard on localhost that allows users to fetch the balance of any Solana public address in real-time.

### On-Chain Inspector Dashboard Screenshot (Day 8)
![Day 8 Screenshot](./100-days-of-solana/day-08/screenshot.png)

---

## Day 9: Fetch and display recent transactions
*   Connected to the public Solana Devnet via RPC using the new `@solana/kit` and fetched the 5 most recent transaction signatures for the Token-2022 Program address.
*   Built an interactive **Transaction Inspector** dashboard on localhost (`localhost:5174`) to inspect transaction details in a list showing slots, signatures, status badges, and Unix timestamps.

### Transaction Inspector Dashboard Screenshot (Day 9)
![Day 9 Screenshot](./100-days-of-solana/day-09/screenshot.png)

---

## Day 10: Build a simple dashboard in the browser
*   Created a vanilla web dashboard using Vite, bundling `@solana/kit` directly for client-side use.
*   Implemented live data fetching to query both the SOL balance and the 5 most recent transactions for any inputted Solana address dynamically.
*   Added full try/catch error handling to display user-friendly warnings for bad addresses or network outages.

### Solana Devnet Dashboard Screenshot (Day 10)
![Day 10 Screenshot](./100-days-of-solana/day-10/screenshot.png)

---

## Day 11: Compare accounts vs databases
*   Analyzed how Solana’s account-centric model (combining code and state in a single model) differs from traditional Web2 databases.
*   Used the Solana CLI to inspect local wallet accounts, executable program accounts (Token Program), and verified the linear scaling property of the rent-exemption model.
*   Built a comprehensive comparison matrix detailing storage location, schemas, access control, billing, reads/writes, and visibility behaviors.

### Account Inspector Dashboard Screenshots (Day 11)
![Day 11 Live Inspector](./100-days-of-solana/day-11/screenshot1.png)
![Day 11 Comparison Grid](./100-days-of-solana/day-11/screenshot2.png)

---

## Day 12: Compare data across devnet and mainnet
*   Queried the same target address (Token-2022 Program) across two separate RPC environments: Devnet and Mainnet-Beta.
*   Constructed a side-by-side terminal verification script comparing balances and transaction histories on each network.
*   Documented why public Mainnet-Beta RPC endpoints restrict web browsers with 403 Forbidden CORS blocks, whereas Node.js server connections work without origin issues.

### Cross-Network Inspector Dashboard Screenshot (Day 12)
![Day 12 Screenshot](./100-days-of-solana/day-12/screenshot.png)

---

## Day 13: Write about your second week
*   Drafted and compiled a technical blog post summarizing Week 2 reflections of the #100DaysOfSolana journey.
*   Reflected on working with browser RPC APIs, migrating terminal scripts to dashboards, learning the structural differences between Web2 databases and Solana accounts, and navigating cross-origin CORS limitations on production mainnet networks.








