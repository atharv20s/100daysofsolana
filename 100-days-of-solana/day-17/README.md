# Day 17: Build a transfer tool

Today, we built a command-line transfer tool using the modern `@solana/kit` and `@solana-program/system` SDKs. This tool encapsulates input validation, wallet balance pre-flight checks (to prevent paying transaction fees on failures), transaction compilation, and live confirmation tracking.

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
Amount: 0.05 SOL
Sender balance: 0.49899 SOL
Sending transaction...
Transaction confirmed!
Signature: 4rsePM1QFfPtzgadABymoXuMPh2crj1p5PEKXicZNGdNWqjoMdohzEAJxqXkfHdMr4hYvSk5UMFzvmi2r7mML4Dp
Explorer:  https://explorer.solana.com/tx/4rsePM1QFfPtzgadABymoXuMPh2crj1p5PEKXicZNGdNWqjoMdohzEAJxqXkfHdMr4hYvSk5UMFzvmi2r7mML4Dp?cluster=devnet
New sender balance: 0.448985 SOL
```

---

## 🛠️ Code Structure (`transfer.mjs`)

Our transfer tool performs five key steps programmatically:
1.  **Input Parsing:** Validates that the recipient is a correct Base58 Solana address and that the transfer amount is a positive number.
2.  **State Pre-flight Check:** Queries the sender's balance and checks it against `amount + transactionFee` before submitting to prevent unnecessary loss of gas/fee lamports.
3.  **Instruction Building:** Constructs a `transfer` instruction pointing to the System Program.
4.  **Chained Construction:** Combines the instructions, fee payer, and blockhash using the `@solana/kit` functional pipe framework.
5.  **Broadcast & Confirm:** Signs with the locally resolved private key and monitors confirmations via RPC/Subscriptions.
