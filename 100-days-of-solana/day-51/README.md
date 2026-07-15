# Day 51: Send your fee-bearing token and harvest the withheld fees 💸

Today, I executed the entire lifecycle of a fee-bearing token: **transferring** tokens, watching the protocol **withhold** a 1% fee on-chain inside the recipient account, and **harvesting** (withdrawing) those fees back using the withdraw authority.

---

## 🛠️ CLI Execution Steps & Outputs

### 1. Mint Starting Supply
Exported the Day 50 token mint address (`WjbwpciSWwF8XWjHKtrACU9ypK1LwpFjSgGMb4gV9Dp`) and minted 1,000,000 tokens:
```bash
$ spl-token mint WjbwpciSWwF8XWjHKtrACU9ypK1LwpFjSgGMb4gV9Dp 1000000
Signature: 643BMfRnYBJfhFVDoUXTGkgjh5brFbTvVXqfUaEeTTS2fdk1Cg69hg67gBDTxUkSdexsVbnbHysAcq7nBZSNpdCz
```

### 2. Generate a Throwaway Recipient Wallet & Create Account
Generated a local recipient keypair and initialized their associated token account:
```bash
# Recipient Wallet: 9YCJgq52Msb8tehyyokP5YNhkv2cGK2Bd83aAtwjFUdy
$ spl-token create-account WjbwpciSWwF8XWjHKtrACU9ypK1LwpFjSgGMb4gV9Dp --owner 9YCJgq52Msb8tehyyokP5YNhkv2cGK2Bd83aAtwjFUdy --fee-payer ~/.config/solana/id.json
Creating account BNsxb4DESUsXJxVa148MzDMjBC98UEBSzGufvUF7CwaA
Signature: oLhCowoyeU52vMNskXfBcinvnuQ6hjCDGbszcDqNzHavpkfeg12ULyBVCRYsFWacYSUUsvJVrPauBYLd1GgtXzb
```

### 3. Transfer 1000 Tokens (10 Withheld)
Since our fee is set to 100bps (1%), transferring 1,000 tokens results in a 10-token fee. Using the `--allow-unfunded-recipient` flag allows the transfer to target the recipient's empty token account directly:
```bash
$ spl-token transfer --expected-fee 10 WjbwpciSWwF8XWjHKtrACU9ypK1LwpFjSgGMb4gV9Dp 1000 9YCJgq52Msb8tehyyokP5YNhkv2cGK2Bd83aAtwjFUdy --allow-unfunded-recipient
Transfer 1000 tokens
  Sender: zjR2p6WMQNpGhrQwE9CaT2Nin2KYjHg15tww5p5sGJp
  Recipient: 9YCJgq52Msb8tehyyokP5YNhkv2cGK2Bd83aAtwjFUdy
  Recipient associated token account: BNsxb4DESUsXJxVa148MzDMjBC98UEBSzGufvUF7CwaA
Signature: 2hn34nMMvkDLDhsVUvzYDdgXkbDwMWynkhXowdaHwdsFpfNFiTh7E9jjLnnZtrS4PaVfjqSkQceYtFj2tbgpSZs2
```

### 4. Display Recipient Token Account (Withheld Fees Visible)
Running `spl-token display` shows the 10 tokens withheld natively within the recipient's account (`Transfer fees withheld: 10000000` raw / `10` UI amount):
```bash
$ spl-token display BNsxb4DESUsXJxVa148MzDMjBC98UEBSzGufvUF7CwaA
SPL Token Account
  Address: BNsxb4DESUsXJxVa148MzDMjBC98UEBSzGufvUF7CwaA
  Program: TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
  Balance: 990
  Decimals: 6
  Mint: WjbwpciSWwF8XWjHKtrACU9ypK1LwpFjSgGMb4gV9Dp
  Owner: 9YCJgq52Msb8tehyyokP5YNhkv2cGK2Bd83aAtwjFUdy
  State: Initialized
Extensions:
  Immutable owner
  Transfer fees withheld: 10000000
```

### 5. Harvest Withheld Fees Back to Sender
Reclaimed the withheld fees from the recipient's account back into our main sender token account (`zjR2p6WMQNpGhrQwE9CaT2Nin2KYjHg15tww5p5sGJp`) using the withdraw authority:
```bash
$ spl-token withdraw-withheld-tokens zjR2p6WMQNpGhrQwE9CaT2Nin2KYjHg15tww5p5sGJp BNsxb4DESUsXJxVa148MzDMjBC98UEBSzGufvUF7CwaA
Signature: 3b9gfrL6FVRMK3SVpWELGuirdjhyxhWhF2uFSjrbRie7FN8C21e7kQRkKHXbcZ5nUbJqtuNEQGBovcGGooUBdUae
```

### 6. Verify Post-Withdrawal State
The recipient's withheld fee has returned to `0`:
```bash
$ spl-token display BNsxb4DESUsXJxVa148MzDMjBC98UEBSzGufvUF7CwaA
SPL Token Account
  Address: BNsxb4DESUsXJxVa148MzDMjBC98UEBSzGufvUF7CwaA
  ...
Extensions:
  Immutable owner
  Transfer fees withheld: 0
```

---

## 🔗 Verification Links
*   **Token Account (Recipient):** [`BNsxb4DESUsXJxVa148MzDMjBC98UEBSzGufvUF7CwaA`](https://explorer.solana.com/address/BNsxb4DESUsXJxVa148MzDMjBC98UEBSzGufvUF7CwaA?cluster=devnet)
*   **Harvest Transaction:** [`3b9gfrL6FVRMK3SVpWELGuirdjhyxhWhF2uFSjrbRie7FN8C21e7kQRkKHXbcZ5nUbJqtuNEQGBovcGGooUBdUae`](https://explorer.solana.com/tx/3b9gfrL6FVRMK3SVpWELGuirdjhyxhWhF2uFSjrbRie7FN8C21e7kQRkKHXbcZ5nUbJqtuNEQGBovcGGooUBdUae?cluster=devnet)
