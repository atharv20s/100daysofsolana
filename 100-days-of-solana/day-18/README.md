# Day 18: Add transaction confirmation UI

Today, we extended the Day 17 programmatic transfer tool to track transaction confirmation in real-time across Solana's three commitment levels: **Processed**, **Confirmed**, and **Finalized**.

---

## 📸 Transaction Details Gallery (Solana Explorer)
### 1. Transaction Summary
![Transaction Summary](./screenshot1.png)

### 2. Accounts & SOL Balance Changes
![Accounts and Balances](./screenshot2.png)

### 3. Programs & Logs
![Programs invoked](./screenshot3.png)

---

## 💻 Terminal Execution Output

```text
Solana Transfer Tool
====================
Connected to Solana devnet.
Sender: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
Recipient: FkC8VHGTgFHZtefvxAsuyPAqgoUqzFomgKw83F2BC35p
Amount: 0.01 SOL
Sender balance: 0.43898 SOL

Status: Sending transaction...
Status: Processed (waiting for confirmation)...
Status: Confirmed (waiting for finalization)...
Status: Finalized!                  
Transaction successful!
Signature: HyafdBgDbdwDzStDxCD64Zv6QsRkwrv4hzsea9KNt7VU6fnFnyaQCiJDEaSFE7DF5kwDhdeKiZQP6G6y48ftUHd
View on Solana Explorer:
https://explorer.solana.com/tx/HyafdBgDbdwDzStDxCD64Zv6QsRkwrv4hzsea9KNt7VU6fnFnyaQCiJDEaSFE7DF5kwDhdeKiZQP6G6y48ftUHd?cluster=devnet
```

---

## 🛠️ Code Logic Changes (`transfer.mjs`)

Instead of using `sendAndConfirmTransactionFactory` which hides the confirmation steps, we split the process:
1. **Manual Broadcast:** Serialized the transaction via `getBase64EncodedWireTransaction` and broadcasted it using `rpc.sendTransaction(wireTransaction)`.
2. **Polling Loop:** Implemented a `waitForCommitment` function that polls `getSignatureStatuses` until the transaction reaches the desired commitment level:
   - **Processed:** Included in a block by a validator.
   - **Confirmed:** Network's supermajority (66%+) approved the block.
   - **Finalized:** Reached max confirmations (>31 blocks built on top).
