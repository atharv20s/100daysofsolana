# Day 25: Explore system program accounts

Today, we explored Solana's native System Program accounts, program accounts, and cluster configuration variables (sysvars) on Devnet using the Solana CLI.

---

## 💻 Terminal Execution Output

Here is the terminal output from inspecting three distinct account structures:

```text
Public Key: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
Balance: 0.42897 SOL
Owner: 11111111111111111111111111111111
Executable: false
Rent Epoch: 18446744073709551615

------------------

Public Key: 11111111111111111111111111111111
Balance: 0.000000001 SOL
Owner: NativeLoader1111111111111111111111111111111
Executable: true
Rent Epoch: 18446744073709551615
Length: 14 (0xe) bytes
0000:   73 79 73 74  65 6d 5f 70  72 6f 67 72  61 6d         system_program

------------------

Public Key: SysvarC1ock11111111111111111111111111111111
Balance: 0.00116928 SOL
Owner: Sysvar1111111111111111111111111111111111111
Executable: false
Rent Epoch: 18446744073709551615
Length: 40 (0x28) bytes
0000:   f9 2d 31 1c  00 00 00 00  5d 66 41 6a  00 00 00 00   .-1.....]fAj....
0010:   46 04 00 00  00 00 00 00  47 04 00 00  00 00 00 00   F.......G.......
0020:   98 95 43 6a  00 00 00 00                             ..Cj....
```

---

## 💡 Key Architectural Insights

1. **System Accounts (Wallets):** Owned by the System Program (`11111111111111111111111111111111`), have `executable: false`, and `data: 0 bytes`. They store only SOL balances and are managed directly by System Program logic.
2. **Native Program Accounts:** Owned by `NativeLoader1111111111111111111111111111111`, have `executable: true`. These built-in programs (like System Program, Stake Program, or Vote Program) handle core ledger logic.
3. **Sysvar Accounts (System Variables):** Owned by `Sysvar1111111111111111111111111111111111111`, have `executable: false` but contain data. They hold read-only cluster variables like the Clock (`SysvarC1ock...`) or Rent (`SysvarRent...`) for programs to query.
