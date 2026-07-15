# Day 33: Test Token Distribution Strategies — Soulbound (Non-Transferable) Tokens

Today I created a **non-transferable "soulbound" token** using Solana's Token Extensions Program (Token-2022). The experiment proved two things: the blockchain **enforces** the transfer lock at the protocol level (no transfer succeeded), and the token holder can still **burn** what they own. The failure is the point.

---

## 🛠️ Key Addresses

| Role | Address |
|---|---|
| **Token-2022 Program** | `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb` |
| **Mint (Non-Transferable)** | `Ej5Bmho8wHYHfX3N9migm4DqbkMMqv691daGKYEm3peP` |
| **Owner Wallet** | `BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK` |
| **Owner Token Account** | `DxoNTWJm9EKqc1PaaYuSTChiAxm1Naez3yyHeX1MeumA` |
| **Experiment Wallet (Blocked Recipient)** | `9y5jCgmW41ZYqxVLQdW6N7EeiZbhyM2qgVgYvTZxhq4R` |
| **Experiment Token Account** | `3xBqVHP9MbteKVewoBKfhDbGSos6zzHJxZpfSNuJMTTL` |

---

## 📝 Steps & Execution Output

### Step 1: Confirm Environment
```bash
$ solana config set --url devnet
RPC URL: https://api.devnet.solana.com

$ solana balance
0.39756264 SOL
```

---

### Step 2: Create a Non-Transferable Token Mint
```bash
$ spl-token create-token \
  --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
  --enable-non-transferable

Creating token Ej5Bmho8wHYHfX3N9migm4DqbkMMqv691daGKYEm3peP under program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb

Address:  Ej5Bmho8wHYHfX3N9migm4DqbkMMqv691daGKYEm3peP
Decimals:  9
Signature: 3Uzm4dwKdc4NGjDvv2r5Bwga3NgaNQfJyFHeuuVNg97QRVm3u6KgLtJKGEuYpWT6b7HzF6TwuLgc5ac8AQrXMAXY
```
> The `--enable-non-transferable` flag permanently writes the `NonTransferable` extension into the mint account. It cannot be removed later.

**Verify the extension is present:**
```bash
$ spl-token display Ej5Bmho8wHYHfX3N9migm4DqbkMMqv691daGKYEm3peP

SPL Token Mint
  Address: Ej5Bmho8wHYHfX3N9migm4DqbkMMqv691daGKYEm3peP
  Program: TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
  Supply: 7000000000
  Decimals: 9
  Mint authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
  Freeze authority: (not set)
Extensions
  Non-transferable
```

---

### Step 3: Create Token Account & Mint 10 Tokens
```bash
$ spl-token create-account Ej5Bmho8wHYHfX3N9migm4DqbkMMqv691daGKYEm3peP \
  --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
# Created: DxoNTWJm9EKqc1PaaYuSTChiAxm1Naez3yyHeX1MeumA
# Signature: 4fpdMuyS6mK9igefXx2G44qq1p5FmqEVrbiyLBRF3apVoKJxkqHNAHcJ1dXpVYiJzx9UrPgCUVatmWQyaPhnEqia

$ spl-token mint Ej5Bmho8wHYHfX3N9migm4DqbkMMqv691daGKYEm3peP 10
# Minting 10 tokens
# Recipient: DxoNTWJm9EKqc1PaaYuSTChiAxm1Naez3yyHeX1MeumA
# Signature: 33bWgjxP2fcQShe2fGM6TDCnwxeY36fwGUJVm25oGkyQkv57zMBa7G8hMWfeLYxU9fDM174m2X34qHx45tt9WijJ

$ spl-token balance Ej5Bmho8wHYHfX3N9migm4DqbkMMqv691daGKYEm3peP
10
```

---

### Step 4: ❌ Attempt Transfer — Watch It Fail

Generated an experiment wallet, created its token account, then attempted to send 5 tokens.

```bash
# Generate experiment wallet
$ node -e "const { Keypair } = require('@solana/web3.js'); ..."
Public Key: 9y5jCgmW41ZYqxVLQdW6N7EeiZbhyM2qgVgYvTZxhq4R

# Create token account for experiment wallet
$ spl-token create-account Ej5Bmho8wHYHfX3N9migm4DqbkMMqv691daGKYEm3peP \
  --owner C:\Users\athar\experiment-wallet.json \
  --fee-payer C:\Users\athar\.config\solana\id.json \
  --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
# Created: 3xBqVHP9MbteKVewoBKfhDbGSos6zzHJxZpfSNuJMTTL

# ❌ Attempt the transfer
$ spl-token transfer Ej5Bmho8wHYHfX3N9migm4DqbkMMqv691daGKYEm3peP 5 \
  9y5jCgmW41ZYqxVLQdW6N7EeiZbhyM2qgVgYvTZxhq4R \
  --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
  --allow-unfunded-recipient
```

**Error Output (Submission Proof):**
```
Transfer 5 tokens
  Sender: DxoNTWJm9EKqc1PaaYuSTChiAxm1Naez3yyHeX1MeumA
  Recipient: 9y5jCgmW41ZYqxVLQdW6N7EeiZbhyM2qgVgYvTZxhq4R
  Recipient associated token account: 3xBqVHP9MbteKVewoBKfhDbGSos6zzHJxZpfSNuJMTTL

Error: Transaction simulation failed: Error processing Instruction 0: custom program error: 0x25
Program log: Instruction: TransferChecked
Program log: Transfer is disabled for this mint
Program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb failed: custom program error: 0x25
```

> **`Program log: Transfer is disabled for this mint`** — the Token Extensions Program itself blocked the transaction before it ever hit the network. This is not an application error. This is protocol-level enforcement. No code, no script, and no workaround can override it.

---

### Step 5: ✅ Prove Burning Still Works

Non-transferable does not mean stuck forever. The holder can still destroy their tokens.

```bash
$ spl-token burn DxoNTWJm9EKqc1PaaYuSTChiAxm1Naez3yyHeX1MeumA 3

Burn 3 tokens
  Source: DxoNTWJm9EKqc1PaaYuSTChiAxm1Naez3yyHeX1MeumA
Signature: 5xBVQjW1X1Der9kPaGjVcEDkWnjrRfYfdFVWKmKXLSyPSrhJKv5xL3Wsum5FqE6oRjqGrr4mg4BtCU5yxv71nLSn

$ spl-token balance Ej5Bmho8wHYHfX3N9migm4DqbkMMqv691daGKYEm3peP
7
```

| Action | Result |
|---|---|
| Transfer to another wallet | ❌ **Blocked — `Transfer is disabled for this mint`** |
| Burn by holder | ✅ **Succeeded — balance dropped from 10 to 7** |

---

## 🧾 Proof of Execution (Devnet)

### 1. Devnet Configuration & Token Minting
```bash
$ solana config set --url devnet
Config File: C:\Users\athar\.config\solana\cli\config.yml
RPC URL: https://api.devnet.solana.com 

$ spl-token mint 1MDdMFzQpRj7q5ozrv1LDvPyb1M7942i2JXTFMfoEyL 10 --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
Minting 10 tokens
  Token: 1MDdMFzQpRj7q5ozrv1LDvPyb1M7942i2JXTFMfoEyL
  Recipient: Ahij1wF5q3a5KiFGFvQM32jk7PdUkVbZMT6CpgQg3Un1
Signature: 5X6Yz8feB2cAfggbMTkriYfWV4D4p3YUUtd8UBq4ZMcb5eszJRC3QAamyqXTdwQNTgKxvyjkWRhr4MRPJWxupCtr
```

### 2. Blocked Transfer Attempt
```bash
$ spl-token transfer 1MDdMFzQpRj7q5ozrv1LDvPyb1M7942i2JXTFMfoEyL 5 BWxJTL6mRZ3PEWpVtskzdHGpL9XXhAji11TTvLntDNqZ --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb --allow-unfunded-recipient
Transfer 5 tokens
  Sender: Ahij1wF5q3a5KiFGFvQM32jk7PdUkVbZMT6CpgQg3Un1
  Recipient: BWxJTL6mRZ3PEWpVtskzdHGpL9XXhAji11TTvLntDNqZ
Error: Client(Error { request: Some(SendTransaction), kind: RpcError(RpcResponseError { code: -32002, message: "Transaction simulation failed: Error processing Instruction 0: custom program error: 0x25", data: SendTransactionPreflightFailure(RpcSimulateTransactionResult { err: Some(UiTransactionError(InstructionError(0, Custom(37)))), logs: Some(["Program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb invoke [1]", "Program log: Instruction: TransferChecked", "Program log: Transfer is disabled for this mint", "Program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb consumed 1570 of 200000 compute units", "Program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb failed: custom program error: 0x25"]), accounts: None, units_consumed: Some(1570), loaded_accounts_data_size: Some(711991), return_data: None, inner_instructions: None, replacement_blockhash: None, fee: Some(5000), pre_balances: None, post_balances: None, pre_token_balances: None, post_token_balances: None, loaded_addresses: None }) }) })
```

### 3. Successful Token Burn
```bash
$ spl-token burn Ahij1wF5q3a5KiFGFvQM32jk7PdUkVbZMT6CpgQg3Un1 3 --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
Burn 3 tokens
  Source: Ahij1wF5q3a5KiFGFvQM32jk7PdUkVbZMT6CpgQg3Un1
Signature: 2MR2XmwURVnEyb5AdQZ6FntBui2rYWkPDRvCuhvm5phJLaVfGyjAfiAEBMAJfoi1ztgXieAHXA6ugK1ttWBcYEcy

$ spl-token balance 1MDdMFzQpRj7q5ozrv1LDvPyb1M7942i2JXTFMfoEyL --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
7
```

### Solana Explorer Links (Devnet)
- **Mint Address**: [1MDdMFzQpRj7q5ozrv1LDvPyb1M7942i2JXTFMfoEyL](https://explorer.solana.com/address/1MDdMFzQpRj7q5ozrv1LDvPyb1M7942i2JXTFMfoEyL?cluster=devnet)
- **Mint Tx**: [5X6Yz8...pCtr](https://explorer.solana.com/tx/5X6Yz8feB2cAfggbMTkriYfWV4D4p3YUUtd8UBq4ZMcb5eszJRC3QAamyqXTdwQNTgKxvyjkWRhr4MRPJWxupCtr?cluster=devnet)
- **Burn Tx**: [2MR2Xm...YEcy](https://explorer.solana.com/tx/2MR2XmwURVnEyb5AdQZ6FntBui2rYWkPDRvCuhvm5phJLaVfGyjAfiAEBMAJfoi1ztgXieAHXA6ugK1ttWBcYEcy?cluster=devnet)

---

## 💡 Key Takeaways

| Concept | What It Means |
|---|---|
| **Non-Transferable Extension** | Set via `--enable-non-transferable` at mint creation, permanently embedded, cannot be revoked |
| **Protocol-Level Enforcement** | The Token Extensions Program itself rejects the transaction (`custom program error: 0x25`) — not application code |
| **Soulbound Tokens** | Tokens permanently bound to the receiving wallet; value comes from *who holds them*, not from trading |
| **Burn Is Still Allowed** | The holder controls their own account and can destroy the token, just not pass it on |
| **Web2 Equivalent** | A verified badge, course certificate, KYC credential, or employee ID — non-tradeable by design |

> **The key insight:** In Web2, "non-transferable" is an application rule that can be worked around. On Solana, it is enforced by the runtime itself. The transaction never succeeds — the blockchain simply rejects it. This makes non-transferable tokens ideal for credentials, memberships, and participation proofs.
