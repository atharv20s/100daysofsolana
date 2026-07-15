# Day 54: Make a token that refuses to move 🔒

Today I built the opposite of money — a **soulbound token** using Token-2022's `non-transferable` extension. Once it lands in an account, it cannot be sent, sold, or moved. Like a certificate of completion stapled to your profile forever.

---

## 🛠️ CLI Execution Steps & Outputs

### 1. Create the Non-Transferable Mint
```bash
$ spl-token create-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb --enable-non-transferable --decimals 0

Address:  295DTMWYjrVwFqRDtmCh386gfHzj3EtVtFVUQtAdRoed
Decimals:  0
```

### 2. Create Token Account & Mint 1 Badge
```bash
$ spl-token create-account 295DTMWYjrVwFqRDtmCh386gfHzj3EtVtFVUQtAdRoed
Creating account 3MnaF1aQE2eDaridrcgotKt5deTHTyQz5Y6WAzR9eNhf

$ spl-token mint 295DTMWYjrVwFqRDtmCh386gfHzj3EtVtFVUQtAdRoed 1
Minting 1 tokens
  Token: 295DTMWYjrVwFqRDtmCh386gfHzj3EtVtFVUQtAdRoed
  Recipient: 3MnaF1aQE2eDaridrcgotKt5deTHTyQz5Y6WAzR9eNhf
```

### 3. Create Recipient's Token Account (Pre-funded by us)
Set up a recipient account so the transfer actually reaches the Token-2022 program and gets rejected by the extension — not by the CLI for a missing destination:
```bash
$ spl-token create-account 295DTMWYjrVwFqRDtmCh386gfHzj3EtVtFVUQtAdRoed --owner 9YCJgq52Msb8tehyyokP5YNhkv2cGK2Bd83aAtwjFUdy --fee-payer ~/.config/solana/id.json
Creating account Fu6UC5QvJhw8aUMzM17NzQaa4G6QkEJkkpJBZi9zGHHC
```

### 4. ❌ Attempt Transfer — REJECTED
```bash
$ spl-token transfer 295DTMWYjrVwFqRDtmCh386gfHzj3EtVtFVUQtAdRoed 1 9YCJgq52Msb8tehyyokP5YNhkv2cGK2Bd83aAtwjFUdy --allow-unfunded-recipient

Transfer 1 tokens
  Sender: 3MnaF1aQE2eDaridrcgotKt5deTHTyQz5Y6WAzR9eNhf
  Recipient: 9YCJgq52Msb8tehyyokP5YNhkv2cGK2Bd83aAtwjFUdy
  Recipient associated token account: Fu6UC5QvJhw8aUMzM17NzQaa4G6QkEJkkpJBZi9zGHHC

Error: Transaction simulation failed:
  Program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb invoke [1]
  Program log: Instruction: TransferChecked
  Program log: Transfer is disabled for this mint          ← THE EXTENSION IN ACTION
  Program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb failed: custom program error: 0x25
```

**The rejection IS the feature.** Error `0x25` (decimal 37) = non-transferable mint. The Token-2022 program itself refused the instruction at the protocol level.

### 5. ✅ Confirm Extension on Mint
```bash
$ spl-token display 295DTMWYjrVwFqRDtmCh386gfHzj3EtVtFVUQtAdRoed
```
```yaml
SPL Token Mint
  Address: 295DTMWYjrVwFqRDtmCh386gfHzj3EtVtFVUQtAdRoed
  Program: TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
  Supply: 1
  Decimals: 0
  Mint authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
  Freeze authority: (not set)
Extensions
  Non-transferable
```

---

## 📝 Reflection

**Non-transferable** turns a token into an identity object. Once minted to an account, the Token-2022 program refuses any `TransferChecked` instruction on it — not at the application layer, not at the API layer, but at the protocol level inside the validator. No custom program needed. One flag at creation time, enforced forever. This is how you build soulbound credentials on Solana.

---

## 🔗 Verification Links
*   **Soulbound Mint:** [`295DTMWYjrVwFqRDtmCh386gfHzj3EtVtFVUQtAdRoed`](https://explorer.solana.com/address/295DTMWYjrVwFqRDtmCh386gfHzj3EtVtFVUQtAdRoed?cluster=devnet)
*   **My Token Account (holds the badge):** [`3MnaF1aQE2eDaridrcgotKt5deTHTyQz5Y6WAzR9eNhf`](https://explorer.solana.com/address/3MnaF1aQE2eDaridrcgotKt5deTHTyQz5Y6WAzR9eNhf?cluster=devnet)

---

## 🖼️ Screenshot
Below is the terminal showing the failed transfer error and `spl-token display` confirming the non-transferable extension:

![Non-Transferable Token - Failed Transfer & Extension Verification](solana-explorer.png)
