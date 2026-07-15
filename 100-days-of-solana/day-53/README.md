# Day 53: Audit your Token-2022 mints and map every extension you have shipped 🔍

Today I ran the Solana equivalent of `DESCRIBE TABLE` — pointing `spl-token display` at each of my Token-2022 mints and reading back every extension the protocol sees on chain.

---

## 🏗️ Mint Inventory

| Mint | Address | Day Shipped | Extensions |
|------|---------|-------------|------------|
| Fee-Bearing Token | `WjbwpciSWwF8XWjHKtrACU9ypK1LwpFjSgGMb4gV9Dp` | Day 50–51 | Transfer Fees |
| Stacked Fee + Interest Token | `GS7JaVubA3AxVbubg7tU8WsxLP2FLgMuMS82Yj8n6maL` | Day 52 | Transfer Fees, Interest-Bearing |

---

## 🛠️ Audit Outputs

### Mint 1 — Day 50 Fee-Bearing Token
```bash
$ spl-token display WjbwpciSWwF8XWjHKtrACU9ypK1LwpFjSgGMb4gV9Dp
```
```yaml
SPL Token Mint
  Address: WjbwpciSWwF8XWjHKtrACU9ypK1LwpFjSgGMb4gV9Dp
  Program: TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
  Supply: 1001000000000
  Decimals: 6
  Mint authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
  Freeze authority: (not set)
Extensions
  Transfer fees:
    Current fee: 100bps
    Current maximum: 1000000000000
    Config authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Withdrawal authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Withheld fees: 0
```

### Mint 2 — Day 52 Stacked Token (Fees + Interest)
```bash
$ spl-token display GS7JaVubA3AxVbubg7tU8WsxLP2FLgMuMS82Yj8n6maL
```
```yaml
SPL Token Mint
  Address: GS7JaVubA3AxVbubg7tU8WsxLP2FLgMuMS82Yj8n6maL
  Program: TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
  Supply: 1000000000000
  Decimals: 6
  Mint authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
  Freeze authority: (not set)
Extensions
  Interest-bearing:
    Current rate: 5000bps
    Average rate: 5000bps
    Rate authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
  Transfer fees:
    Current fee: 100bps
    Current maximum: 1000000000000
    Config authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Withdrawal authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Withheld fees: 0
```

---

## 📝 Extension Map — Plain English

### Transfer Fees (on both mints)
**TransferFeeConfig** makes the mint charge a 1% fee (100 basis points) on every token transfer, automatically withheld by the Token-2022 program at the protocol level — no custom smart contract needed, the withdrawal authority can sweep accumulated fees at any time.

### Interest-Bearing (Day 52 mint only)
**InterestBearingConfig** makes the mint accrue 50% APR (5000 basis points) continuously on every token account balance — the UI-displayed amount drifts upward over time without any transaction, like a savings account that compounds by itself.

---

## 🔗 Side-by-Side Comparison

```
┌─────────────────────────────────┬─────────────────────────────────┐
│  MINT 1 (Day 50)                │  MINT 2 (Day 52)                │
│  WjbwpciSWwF...9Dp              │  GS7JaVubA3A...maL              │
├─────────────────────────────────┼─────────────────────────────────┤
│  Program: Token-2022            │  Program: Token-2022            │
│  Decimals: 6                    │  Decimals: 6                    │
│  Supply: 1,001,000 tokens       │  Supply: 1,000,000 tokens       │
├─────────────────────────────────┼─────────────────────────────────┤
│  Extensions:                    │  Extensions:                    │
│  ✅ Transfer Fees (100bps)      │  ✅ Interest-Bearing (5000bps)  │
│                                 │  ✅ Transfer Fees (100bps)      │
│  ❌ Interest-Bearing            │                                 │
├─────────────────────────────────┼─────────────────────────────────┤
│  Total extensions: 1            │  Total extensions: 2            │
└─────────────────────────────────┴─────────────────────────────────┘
```

---

## 🔗 Verification Links
*   **Day 50 Mint:** [`WjbwpciSWwF8XWjHKtrACU9ypK1LwpFjSgGMb4gV9Dp`](https://explorer.solana.com/address/WjbwpciSWwF8XWjHKtrACU9ypK1LwpFjSgGMb4gV9Dp?cluster=devnet)
*   **Day 52 Mint:** [`GS7JaVubA3AxVbubg7tU8WsxLP2FLgMuMS82Yj8n6maL`](https://explorer.solana.com/address/GS7JaVubA3AxVbubg7tU8WsxLP2FLgMuMS82Yj8n6maL?cluster=devnet)

---

## 🖼️ Audit Screenshots
Below are the `spl-token display` outputs for both mints showing all extensions on chain:

![Day 50 Mint - Transfer Fee Extension](day50-mint-audit.png)

![Day 52 Mint - Transfer Fee + Interest-Bearing Extensions](day52-mint-audit.png)
