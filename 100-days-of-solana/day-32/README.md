# Day 32: Review Token Incentive Mechanics

Today I ran through the **complete Token-2022 lifecycle in a single sitting**, combining everything from Days 29–31: a plain SPL token, on-chain metadata, and transfer fees — with no scaffolding, no notes, just CLI commands. The goal was to prove muscle memory on the full workflow: create → configure → mint → transfer → collect.

---

## 🛠️ Key Addresses

| Role | Address |
|---|---|
| **Token-2022 Program** | `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb` |
| **Mint (ReinforceCoin / RFC)** | `ENeWKAxsrTKoYnsVkVUCt7yrD4Y9fUvLAvoDhsWdq3Kb` |
| **Owner Wallet (Fee Authority)** | `BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK` |
| **Owner Token Account** | `5kpQ7iDvNhuweojxe4SfA13hNk2aBTWgNAKTWwysDvuR` |
| **Recipient Wallet** | `356qc5GSKFodN8jhrLgKuktZwgjrNrhfEgmVzeh52gmb` |
| **Recipient Token Account** | `7EWh7xkDiRNRRtZRE9b6BkrqmWWFfgbsNTEt86bS1qJn` |

---

## 📝 Steps & Execution Output

### Step 1: Confirm Environment
```bash
$ solana config set --url devnet
RPC URL: https://api.devnet.solana.com
Keypair Path: C:\Users\athar\.config\solana\id.json

$ solana balance
0.40332572 SOL   # low — airdropped 2 SOL below

$ solana airdrop 2
Requesting airdrop of 2 SOL
Signature: 2JcfFbHgMWtNmPFpKUzVtnjK5K23yFvmG84w5VJ4DwEm4fniPKkLJ3YpGpSVLLNjRDi9NTVKL8V9FevSAeGhfG2
2.39649976 SOL
```

---

### Step 2: Create Token-2022 Mint with 2% Transfer Fee + Metadata Extension
```bash
$ spl-token create-token \
  --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
  --transfer-fee-basis-points 200 \
  --transfer-fee-maximum-fee 5000 \
  --enable-metadata \
  --decimals 9

Address:  ENeWKAxsrTKoYnsVkVUCt7yrD4Y9fUvLAvoDhsWdq3Kb
Decimals:  9
Signature: 4KRF1NypSW9voe6P9FrTyFxsWxYT1peY2R6nb1n832ZXaqLDhq2WZbeDGzXh8GpgUFjj5DMqHM8FYDrUPfwxV2uK
```
> Sets **200 bps = 2% fee**, max cap of `5000` base units, and pre-configures the Metadata Pointer extension on the mint in one command.

---

### Step 3: Initialize On-Chain Metadata
```bash
$ spl-token initialize-metadata ENeWKAxsrTKoYnsVkVUCt7yrD4Y9fUvLAvoDhsWdq3Kb \
  "ReinforceCoin" "RFC" \
  "https://raw.githubusercontent.com/solana-developers/opos-asset/main/assets/CompressedCoil/metadata.json"

Signature: 23kbjTQ6hMta4w4dn9oAggceQHdcMXwNwGJbojJWAXHEfeUFqgMhh99h5s81EHxXdUkqvPjfWha3X1Emc4fsQKtw
```
> Must be called while `Supply = 0`. Writes name, symbol, and URI directly into the mint account — no separate Metaplex account needed.

**Verify both extensions live on the mint:**
```
SPL Token Mint
  Address: ENeWKAxsrTKoYnsVkVUCt7yrD4Y9fUvLAvoDhsWdq3Kb
  Program: TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
  Supply: 0
Extensions
  Transfer fees:   Current fee: 200bps   Max: 5000
  Metadata Pointer: ENeWKAxsrTKoYnsVkVUCt7yrD4Y9fUvLAvoDhsWdq3Kb
  Metadata:        Name: ReinforceCoin  Symbol: RFC
```
> **Two extensions. One mint.**

---

### Step 4: Create Token Account & Mint 1000 Tokens
```bash
$ spl-token create-account ENeWKAxsrTKoYnsVkVUCt7yrD4Y9fUvLAvoDhsWdq3Kb \
  --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
# Created: 5kpQ7iDvNhuweojxe4SfA13hNk2aBTWgNAKTWwysDvuR
# Signature: f2vxMxwgR1DWm5yDrr2kdxBRcEwW7MPEmVR3aqiam6Cr3qbbwHRe5srawC3ez7BEuhV4BzsVsUXg5soTj5qRHzX

$ spl-token mint ENeWKAxsrTKoYnsVkVUCt7yrD4Y9fUvLAvoDhsWdq3Kb 1000
# Recipient: 5kpQ7iDvNhuweojxe4SfA13hNk2aBTWgNAKTWwysDvuR
# Signature: 3VdhTv6hka7kpeuvvrEJ8VMwHhVC2GbRnfXnbBkp6TncKHXGg7ohzzEpFQszdRTG6m4PVJSLnA9QehQvp7RGP6Xm

$ spl-token balance ENeWKAxsrTKoYnsVkVUCt7yrD4Y9fUvLAvoDhsWdq3Kb
1000
```

---

### Step 5: Create Recipient Token Account
```bash
$ spl-token create-account ENeWKAxsrTKoYnsVkVUCt7yrD4Y9fUvLAvoDhsWdq3Kb \
  --owner 356qc5GSKFodN8jhrLgKuktZwgjrNrhfEgmVzeh52gmb \
  --fee-payer ~/.config/solana/id.json \
  --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
# Created: 7EWh7xkDiRNRRtZRE9b6BkrqmWWFfgbsNTEt86bS1qJn
# Signature: 2Kuii4bM2nTb5k4Ki2xKD7Skoy8Lho7ujyQRtmtdQtFwzEUmw47X6RYePEPm4SKTxkAjZZRQys1mg7arouDiD7rk
```

---

### Step 6: Transfer 100 Tokens — 2% Fee Withheld (2 Tokens)
```bash
$ spl-token transfer ENeWKAxsrTKoYnsVkVUCt7yrD4Y9fUvLAvoDhsWdq3Kb \
  100 356qc5GSKFodN8jhrLgKuktZwgjrNrhfEgmVzeh52gmb \
  --expected-fee 2 --allow-unfunded-recipient

Transfer 100 tokens
  Sender: 5kpQ7iDvNhuweojxe4SfA13hNk2aBTWgNAKTWwysDvuR
  Recipient: 7EWh7xkDiRNRRtZRE9b6BkrqmWWFfgbsNTEt86bS1qJn
Signature: 4MECQXacLwujSehXij5aWQLowPvCPDeMUWtwBzieFuwPB6qzoxua35j6uAcAVKH6JpR2b95V2V8GScNvKP1Pd4qu
```

**Post-Transfer Balances:**
| Account | Balance | Notes |
|---|---|---|
| Owner (`5kpQ7iD...`) | `900` | Sent 100 tokens |
| Recipient Spendable (`7EWh7x...`) | `98` | Received 100, 2 withheld |
| Withheld (inside recipient acct) | `2` | Locked — only fee authority can collect |

---

### Step 7: Collect Withheld Fees (Withdraw Authority Sweeps)
```bash
$ spl-token withdraw-withheld-tokens \
  5kpQ7iDvNhuweojxe4SfA13hNk2aBTWgNAKTWwysDvuR \
  7EWh7xkDiRNRRtZRE9b6BkrqmWWFfgbsNTEt86bS1qJn

Signature: 42NjQ4jUo1Q6j65Ng5m8PK3u5z8yZhi5jcxK4fejpcDU1yVYa2VH6iyc2rZx5YTBoQV3Q1WkHfUgAuNbXryZytg7
```

---

### Step 8: Final Display — Submission Screenshot

```bash
PS C:\Users> spl-token display ENeWKAxsrTKoYnsVkVUCt7yrD4Y9fUvLAvoDhsWdq3Kb

SPL Token Mint
  Address: ENeWKAxsrTKoYnsVkVUCt7yrD4Y9fUvLAvoDhsWdq3Kb
  Program: TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
  Supply: 1000000000000
  Decimals: 9
  Mint authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
  Freeze authority: (not set)
Extensions
  Transfer fees:
    Current fee: 200bps
    Current maximum: 5000000000000
    Config authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Withdrawal authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Withheld fees: 0
  Metadata Pointer:
    Authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Metadata address: ENeWKAxsrTKoYnsVkVUCt7yrD4Y9fUvLAvoDhsWdq3Kb
  Metadata:
    Update Authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Mint: ENeWKAxsrTKoYnsVkVUCt7yrD4Y9fUvLAvoDhsWdq3Kb
    Name: ReinforceCoin
    Symbol: RFC
    URI: https://raw.githubusercontent.com/solana-developers/opos-asset/main/assets/CompressedCoil/metadata.json
```

> **Submission proof:** The output above shows all three required fields — on-chain **Metadata** (ReinforceCoin/RFC), **Transfer Fee** (200bps, 2%), and **Withheld fees: 0** (all fees successfully collected).

**Final Balances:**
| Account | Final Balance |
|---|---|
| Owner (after fee collection) | **`902`** (900 kept + 2 reclaimed fees) |
| Recipient (spendable) | **`98`** |

> `Withheld fees: 0` confirms all fees were successfully swept out of recipient accounts and into the owner's token account.

---

## 💡 Key Takeaways

| Concept | What It Means |
|---|---|
| **Token-2022 Extensions** | Multiple behaviors (`--enable-metadata` + `--transfer-fee-*`) baked into one mint at creation time |
| **Basis Points** | 200 bps = 2%. The unit of precision for protocol-level fee rates (10,000 bps = 100%) |
| **Automatic Withholding** | The runtime deducts and locks the fee during the transfer instruction — zero backend code |
| **Spendable vs. Withheld** | Recipient gets 98 (spendable), 2 is locked as withheld inside their token account |
| **Withdraw Withheld Authority** | Only the configured authority can execute `withdraw-withheld-tokens` to collect accumulated fees |
| **Protocol-Level Monetization** | Zero middleware, zero backends, zero custom smart contracts — just mint configuration |

> **The full lifecycle — create → configure → mint → transfer → collect** — ran entirely from the CLI in one session. This is the same pattern for any advanced token design on Solana.
