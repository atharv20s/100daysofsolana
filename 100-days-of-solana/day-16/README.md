# Day 16: Send your first SOL transfer

Today, we constructed and broadcasted our first custom SOL transfer transaction on the Solana Devnet to transfer `0.5 SOL` to a newly generated recipient wallet.


---

## 📸 Transaction Details Gallery (Solana Explorer)
### 1. Transaction Summary
![Transaction Summary](./screenshot1.png)

### 2. Accounts & SOL Balance Changes
![Accounts and Balances](./screenshot2.png)

### 3. Programs invoked
![Programs invoked](./screenshot3.png)

### 4. Raw Logs & CU Profiling
![Logs and compute units](./screenshot4.png)


---

## 💻 CLI Transaction Details & Verifications

### 1. Send the Transfer Transaction
```bash
solana transfer FkC8VHGTgFHZtefvxAsuyPAqgoUqzFomgKw83F2BC35p 0.5 --allow-unfunded-recipient
```

**Output:**
```text
Signature: 57PVeEXmGApeFBiaQbBVnNtN7tmkz1PgFtneyFcurQ6xHrNLtCAh5A8PEGZbeg3yshApmAWcMN367neCkHBfA741
```

### 2. Verify Final Balances
*   **Sender Address (`BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK`):** `0.49899 SOL`
*   **Recipient Address (`FkC8VHGTgFHZtefvxAsuyPAqgoUqzFomgKw83F2BC35p`):** `0.5 SOL`

---

## 🔬 Core Concepts Explored

*   **Atomic Settlement:** Value was settled across the decentralized network in under 400 milliseconds without any bank or card network middleware.
*   **Safety Limits & --allow-unfunded-recipient:** The recipient address had never interacted on-chain before, meaning no account struct existed. The `--allow-unfunded-recipient` flag explicitly authorizes the network to fund the rent fee of creating the recipient's account on the ledger automatically.
*   **Validator Fees:** A tiny fee of `0.000005 SOL` (5,000 Lamports) was charged to pay validators for block consensus processing.
