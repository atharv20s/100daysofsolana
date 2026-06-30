# Day 19: Explore failed transactions

Today, we broke things on purpose on devnet to understand how Solana handle transaction failures and on-chain errors. 

---

## 📸 Transaction Details Gallery (Solana Explorer)
### 1. Failed Transaction Overview
![Transaction Summary](./screenshot1.png)

### 2. Balance Deductions & Logs
![Accounts and Balances](./screenshot2.png)

---

## 💻 Terminal Execution Output (`solana confirm -v`)

We wrote `force-fail.mjs` which bypassed client-side preflight check via `skipPreflight: true` to submit a transaction that transfer `500 SOL` (well over the balance).

```text
RPC URL: https://api.devnet.solana.com
Default Signer Path: C:\Users\athar\.config\solana\id.json
Commitment: confirmed

Transaction executed in slot 472968625:
  Block Time: 2026-06-30T13:54:10+05:30
  Version: 0
  Recent Blockhash: EALK8vXNRKdxGsjTCV45grod4S4fozgviVgBvEYYs7eo
  Signature 0: 5LseX35v7oWXrhR4dfnNN9Ejm4vHuN2Ydu1k7ybBW8py9GLEYAdFaE5Nrnsy1syfKdC2u8z7oyPtCQ4nTkp4KgG7
  Account 0: srw- BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK (fee payer)
  Account 1: -rw- FkC8VHGTgFHZtefvxAsuyPAqgoUqzFomgKw83F2BC35p
  Account 2: -r-x 11111111111111111111111111111111
  Instruction 0
    Program:   11111111111111111111111111111111 (2)
    Account 0: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK (0)
    Account 1: FkC8VHGTgFHZtefvxAsuyPAqgoUqzFomgKw83F2BC35p (1)
    Transfer { lamports: 500000000000 }
  Status: Error processing Instruction 0: custom program error: 0x1
    Fee: ◎0.000005
    Account 0 balance: ◎0.428975 -> ◎0.42897
    Account 1 balance: ◎0.57
    Account 2 balance: ◎0.000000001
  Compute Units Consumed: 150
  Log Messages:
    Program 11111111111111111111111111111111 invoke [1]
    Transfer: insufficient lamports 428970000, need 500000000000
    Program 11111111111111111111111111111111 failed: custom program error: 0x1

Transaction failed: Error processing Instruction 0: custom program error: 0x1
```

---

## 💡 Key Takeaways
1. **Errors Cost Money:** Failed transactions still require execution work from validators. The fee-payer account was still charged the `0.000005 SOL` transaction fee despite the failure.
2. **Transaction Simulation:** Standard Solana client applications simulate transactions (`preflight`) beforehand to prevent users from paying transaction fees on logically invalid attempts.
