# Day 15: Understand transaction anatomy

Today, we executed a transfer transaction on the Solana Devnet to inspect and dissect the underlying transaction structure down to its raw cryptographic and runtime components.

---

## 📸 Transaction Proof of Work (Solana Explorer)
![Transaction summary on explorer](./screenshot.png)

---

## 💻 CLI Transaction Details (`solana confirm -v`)

```text
Transaction executed in slot 472744216:
  Block Time: 2026-06-29T14:12:39+05:30
  Version: legacy
  Recent Blockhash: 5cZKA65KwhLRrFfTg6fhhxup2FaKXBRCekYRJqjR2ECh
  Signature 0: zhuJc18J8vM2fvjwGSvG3fmx25gu4qYH7hJrjrtwQMGL3gCkK4okkngWHaSQU8HvXsbkdGbYhHojvzN6H25Xuaf
  Account 0: srw- BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK (fee payer)
  Account 1: -rw- 8RpVDRUiBBN7EjsJtfoL8vsj8Ed4EPLwEoSnektDc9D6
  Account 2: -r-x 11111111111111111111111111111111
  Instruction 0
    Program:   11111111111111111111111111111111 (2)
    Account 0: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK (0)
    Account 1: 8RpVDRUiBBN7EjsJtfoL8vsj8Ed4EPLwEoSnektDc9D6 (1)
    Transfer { lamports: 1000000 }
  Status: Ok
    Fee: ◎0.000005
    Account 0 balance: ◎1 -> ◎0.998995
    Account 1 balance: ◎0 -> ◎0.001
    Account 2 balance: ◎0.000000001
  Compute Units Consumed: 150
```

---

## 🔬 Dissecting the Transaction Anatomy

Every transaction on Solana is comprised of two core parts:

1.  **Signatures:** An array of 64-byte Ed25519 signatures. The first signature in the array serves as the unique **Transaction ID**.
2.  **Message:** The actual payload containing:
    *   **Header:** Three bytes defining (1) number of required signatures, (2) number of signed read-only accounts, and (3) number of unsigned read-only accounts.
    *   **Account Keys:** A list of all 32-byte public keys referenced in the instructions. Ordering is determined by the permissions in the header (signers first, then read-only).
    *   **Recent Blockhash:** A 32-byte hash serving as a proof of freshness (expires after ~150 slots, or ~90s) and replay attack protection.
    *   **Instructions:** The executable commands. Each contains a program ID index, account indexes, and data payload that the target program executes.

### ⚠️ Size Constraints (MTU Limit)
The entire serialized transaction payload must fit within **1,232 bytes** to comply with the IPv6 Minimum MTU size (1,280 bytes) minus network packet overhead, ensuring fast, packet-loss-free routing across the global validator network.
