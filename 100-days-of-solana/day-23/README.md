# Day 23: Build an account explorer

Today, we built a command-line account explorer from scratch. Given any Solana address, the tool queries devnet and presents a beautifully formatted, human-readable summary of the account’s on-chain state—acting as our own mini Solscan.

---

## 💻 Terminal Execution Output

Here is the terminal output from running the explorer side-by-side with a wallet account and a program account:

```text
🔍 Fetching details for address: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK...

=================== ACCOUNT EXPLORER ===================
Address:     BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
Balance:     0.42897 SOL (42,89,70,000 Lamports)
Owner:       System Program (11111111111111111111111111111111)
Executable:  ❌ No (Data Account)
Rent Epoch:  18446744073709551615
Data Size:   0 bytes
Data (Hex):  None
========================================================

🔍 Fetching details for address: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA...

=================== ACCOUNT EXPLORER ===================
Address:     TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
Balance:     12.107575357 SOL (12,10,75,75,357 Lamports)
Owner:       BPF Upgradeable Loader (BPFLoaderUpgradeab1e11111111111111111111111)
Executable:  ✅ Yes (Program)
Rent Epoch:  18446744073709551615
Data Size:   36 bytes
Data (Hex):  02 00 00 00 27 f1 90 b1 d3 af 98 b8 ce 71 4c 44 e8 ca df f9 f8 fc 45 cb 8e 5f ac 42 02 ef f8 11 0d 97 dd 37
========================================================
```

---

## 🛠️ Code Structure (`explorer.mjs`)

The explorer leverages `@solana/kit` to fetch and decode account data through the following steps:
1. **Network Connection:** Sets up a connection to devnet RPC using `createSolanaRpc(devnet("..."))`.
2. **Arguments & Address Verification:** Captures `process.argv[2]`, validates it as a base58 address using the `address()` helper, and handles errors cleanly.
3. **Parallel Fetching:** Fetches the SOL balance and account information concurrently using `Promise.all` with `getBalance` and `getAccountInfo`.
4. **Program Mapping:** Translates standard system program owner hashes (e.g. `1111...`) and BPF loaders into user-friendly names.
5. **Data Hex Decoding:** Extracts the base64-encoded account data, converts it to a hex byte buffer preview, and truncates it if it exceeds 64 bytes to prevent terminal overflow.
