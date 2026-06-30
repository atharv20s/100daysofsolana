# Day 30: Design Sustainable Token Incentive Systems

Today I created a fully branded **Token-2022** token named **100DaysCoin (HUNDO)** with on-chain metadata, minted 1000 tokens, and transferred 250 to a second wallet — all on Solana devnet.

---

## 🛠️ Steps & CLI Output

### Step 1: Create a Token-2022 Mint with Metadata Enabled

Unlike the original SPL Token Program, Token-2022 (`TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`) lets you store metadata **directly on the mint account itself**.

```bash
$ spl-token create-token \
  --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
  --enable-metadata \
  --decimals 6

Creating token 59dKGoVnJzrdFrFVJa4q4YRBq3UmpuLhrG7j3rPXrgX8 under program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb

Address:  59dKGoVnJzrdFrFVJa4q4YRBq3UmpuLhrG7j3rPXrgX8
Decimals:  6

Signature: 4hMX62a5gn1vrTQvEna57UGha81jkoHNvk5acXbyZuG9oMduCEfXvnWmkmLJVVJMaPjn9VQ82T28z8qyZW5TXymV
```
> **Token Mint Address:** `59dKGoVnJzrdFrFVJa4q4YRBq3UmpuLhrG7j3rPXrgX8`

---

### Step 2: Initialize On-Chain Metadata

Writes the token name, symbol, and URI directly to the mint account.

```bash
$ spl-token initialize-metadata 59dKGoVnJzrdFrFVJa4q4YRBq3UmpuLhrG7j3rPXrgX8 \
  "100DaysCoin" "HUNDO" \
  "https://raw.githubusercontent.com/solana-developers/opos-asset/main/assets/DeveloperPortal/metadata.json"

Signature: 5xZXzEvr7wgGkXFsW7QqcVjE96VPoY5XZHrhSQxdSjSJScYRxjznhGxQ4cW9H5SX43yL6bNwdiMNZK1xuz8vMFJY
```

---

### Step 3: Create a Token Account (ATA)

A dedicated token account must exist before receiving tokens.

```bash
$ spl-token create-account 59dKGoVnJzrdFrFVJa4q4YRBq3UmpuLhrG7j3rPXrgX8
Creating account DXdYkcR8xuBY4DGctZFMpEZtNHFdGvqhjL5B1S1vLE69

Signature: 4MTqfhdRNurVnN5Ybgk4mEebcZK2A5DAzvdtR7qRWUynAQySZAZeY7u2CZKXTT2kjqbyf8fEuycsMZPHfu7ge4MV
```

---

### Step 4: Mint 1000 Tokens

```bash
$ spl-token mint 59dKGoVnJzrdFrFVJa4q4YRBq3UmpuLhrG7j3rPXrgX8 1000
Minting 1000 tokens
  Token: 59dKGoVnJzrdFrFVJa4q4YRBq3UmpuLhrG7j3rPXrgX8
  Recipient: DXdYkcR8xuBY4DGctZFMpEZtNHFdGvqhjL5B1S1vLE69

Signature: 5KkJALwbb92kfgkeqC5YGWxdJjmoxsMjuLSH1LPrwiMY7HaeWrZ6UkVDTCxQRjjPcr4qZQ8CSu7zkbLorFU8c9hE
```

---

### Step 5: Generate a Second Wallet & Transfer 250 Tokens

```bash
# Second wallet generated via Node.js Keypair
Public Key: 2Mgoyfdb2PiKxjx6TU3yYsRLnZHhvVp3QpR8U1wcNuY6

$ spl-token transfer 59dKGoVnJzrdFrFVJa4q4YRBq3UmpuLhrG7j3rPXrgX8 250 \
  2Mgoyfdb2PiKxjx6TU3yYsRLnZHhvVp3QpR8U1wcNuY6 \
  --fund-recipient --allow-unfunded-recipient

Transfer 250 tokens
  Sender: DXdYkcR8xuBY4DGctZFMpEZtNHFdGvqhjL5B1S1vLE69
  Recipient: 2Mgoyfdb2PiKxjx6TU3yYsRLnZHhvVp3QpR8U1wcNuY6
  Recipient associated token account: H3bqwQuE239NribHcEsmZQQzg5AzzvUnxoA4rSxz4wcT
  Funding recipient: H3bqwQuE239NribHcEsmZQQzg5AzzvUnxoA4rSxz4wcT

Signature: 3Q3aNfDuRVJfrFv9g6bo1D7RH7mHiPWzAgoxKNJRbdGxHyTrjtYK26EHmzRBnbYr6jNSq9nNFkEwSgoaZjTs9veS
```

---

### Step 6: Verify Both Balances

```bash
$ spl-token balance 59dKGoVnJzrdFrFVJa4q4YRBq3UmpuLhrG7j3rPXrgX8
750

$ spl-token balance --owner 2Mgoyfdb2PiKxjx6TU3yYsRLnZHhvVp3QpR8U1wcNuY6 59dKGoVnJzrdFrFVJa4q4YRBq3UmpuLhrG7j3rPXrgX8
250
```

---

### Token Mint Display (with Metadata)

```bash
$ spl-token display 59dKGoVnJzrdFrFVJa4q4YRBq3UmpuLhrG7j3rPXrgX8

SPL Token Mint
  Address: 59dKGoVnJzrdFrFVJa4q4YRBq3UmpuLhrG7j3rPXrgX8
  Program: TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
  Supply: 1000000000
  Decimals: 6
  Mint authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
  Freeze authority: (not set)
Extensions
  Metadata Pointer:
    Authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Metadata address: 59dKGoVnJzrdFrFVJa4q4YRBq3UmpuLhrG7j3rPXrgX8
  Metadata:
    Update Authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Mint: 59dKGoVnJzrdFrFVJa4q4YRBq3UmpuLhrG7j3rPXrgX8
    Name: 100DaysCoin
    Symbol: HUNDO
    URI: https://raw.githubusercontent.com/solana-developers/opos-asset/main/assets/DeveloperPortal/metadata.json
```

---

## 💡 Key Takeaways

| Concept | Web2 Equivalent |
|---|---|
| **Mint Account** | Your platform's loyalty currency definition in the DB |
| **Token-2022 Metadata** | Giving the currency a name, symbol, and icon |
| **Token Account (ATA)** | A user's individual balance row in your rewards table |
| **Transfer + `--fund-recipient`** | Sending currency + automatically creating the recipient's account |
| **Decimals: 6** | Like USD using 2 decimal places (cents); this token uses 6 |

> **Token Extensions (Token-2022)** embeds metadata directly in the mint account — no separate Metaplex metadata account needed. This means fewer accounts, fewer transactions, and lower costs.
