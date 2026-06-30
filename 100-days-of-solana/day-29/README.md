# Day 29: Exploring Token Economics and Incentives

Today, I created my first SPL token on Solana's devnet, set up a dedicated token account, minted a supply of 100 tokens, and inspected its on-chain configuration using the `spl-token` CLI.

---

## 🛠️ Steps & CLI Output

### Step 1: Confirm CLI is Pointing at Devnet
```bash
$ solana config set --url devnet
Config File: C:\Users\athar\.config\solana\cli\config.yml
RPC URL: https://api.devnet.solana.com
WebSocket URL: wss://api.devnet.solana.com/ (computed)
Keypair Path: C:\Users\athar\.config\solana\id.json
Commitment: confirmed

$ solana balance
0.42897 SOL
```

---

### Step 2: Create the Token Mint Account
```bash
$ spl-token create-token
Creating token Duu2BqBMhKknARtxoGobigg4GeSCg3YbQ6FRMGKKtdHS under program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA

Address:  Duu2BqBMhKknARtxoGobigg4GeSCg3YbQ6FRMGKKtdHS
Decimals:  9

Signature: 5HHoJvsU5dqMBMjxkwxUC2Sykqi1zH8GkELxNQrCR3HXbTvz95QRr693wveNE3WZR573YoRk7AaZMQJgQRwfYrMX
```
> **Token Mint Address:** `Duu2BqBMhKknARtxoGobigg4GeSCg3YbQ6FRMGKKtdHS`

---

### Step 3: Create a Dedicated Token Account
```bash
$ spl-token create-account Duu2BqBMhKknARtxoGobigg4GeSCg3YbQ6FRMGKKtdHS
Creating account P1EUMeFNwZCc8XQZJ8J9YLibwu8EuYGMVxfTUSt8Qxw

Signature: 5cy4vPdHZHczHTQSkxBHfoGBjKJ9NUTKitbDHWDQ5h93qXUPF6MLqty6gDCvJSj8d1CNkHqiWiKHLYXG2P14j6RW
```
> **Token Account Address:** `P1EUMeFNwZCc8XQZJ8J9YLibwu8EuYGMVxfTUSt8Qxw`

---

### Step 4: Mint 100 Tokens
```bash
$ spl-token mint Duu2BqBMhKknARtxoGobigg4GeSCg3YbQ6FRMGKKtdHS 100
Minting 100 tokens
  Token: Duu2BqBMhKknARtxoGobigg4GeSCg3YbQ6FRMGKKtdHS
  Recipient: P1EUMeFNwZCc8XQZJ8J9YLibwu8EuYGMVxfTUSt8Qxw

Signature: 24dE3rPDBvS5EPDZzAxsgKBQkeN5pKLxZ8DubK9KMr6F1iF6p9U2bvUyF2Sm6mSq9LmywFTfuaeuGrktActpeev1
```

---

### Step 5: Inspect the Results

#### Token Accounts (all balances in wallet)
```bash
$ spl-token accounts
Token                                         Balance
-----------------------------------------------------
4CJNn9zFx3Z9v27edeVSgWyJE6M7qwwatG8wJ1ZEijby  100
Duu2BqBMhKknARtxoGobigg4GeSCg3YbQ6FRMGKKtdHS  100
```

#### Mint Account Details
```bash
$ spl-token display Duu2BqBMhKknARtxoGobigg4GeSCg3YbQ6FRMGKKtdHS

SPL Token Mint
  Address: Duu2BqBMhKknARtxoGobigg4GeSCg3YbQ6FRMGKKtdHS
  Program: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
  Supply: 100000000000
  Decimals: 9
  Mint authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
  Freeze authority: (not set)
```

---

## 💡 Key Takeaways

| Concept | What It Means |
|---|---|
| **Mint Account** | The global source of truth for a token. Stores supply, decimals, mint authority. |
| **Token Account** | A per-wallet, per-token balance folder. You must create one before receiving tokens. |
| **Supply: 100000000000** | That's 100 tokens × 10^9 (because Decimals = 9, like SOL's lamports). |
| **Mint Authority** | Only this keypair can mint more tokens. |
| **Freeze Authority** | Nobody has the power to freeze this token account (not set). |

> On Solana, programs are stateless. The **SPL Token Program** is a shared, audited, on-chain program — no smart contract code needed to create and manage tokens.
