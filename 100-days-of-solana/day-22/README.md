# Day 22: Inspect account data

Today, we used the Solana CLI to inspect different account structures on devnet. We examined a user wallet account, the SPL Token Program account, and the Native System Program account.

---

## 📸 Account Inspection Screenshot
![Account Inspection Output](./screenshot.png)

---

## 💻 Terminal Execution Output

### 1. User Wallet Account
```text
Public Key: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
Balance: 0.42897 SOL
Owner: 11111111111111111111111111111111
Executable: false
Rent Epoch: 18446744073709551615
```

### 2. SPL Token Program
```text
Public Key: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
Balance: 12.107575357 SOL
Owner: BPFLoaderUpgradeab1e11111111111111111111111
Executable: true
Rent Epoch: 18446744073709551615
Length: 36 (0x24) bytes
0000:   02 00 00 00  27 f1 90 b1  d3 af 98 b8  ce 71 4c 44   ....'........qLD
0010:   e8 ca df f9  f8 fc 45 cb  8e 5f ac 42  02 ef f8 11   ......E.._.B....
0020:   0d 97 dd 37                                          ...7
```

### 3. Native System Program
```text
Public Key: 11111111111111111111111111111111
Balance: 0.000000001 SOL
Owner: NativeLoader1111111111111111111111111111111
Executable: true
Rent Epoch: 18446744073709551615
Length: 14 (0xe) bytes
0000:   73 79 73 74  65 6d 5f 70  72 6f 67 72  61 6d         system_program
```

---

## 💡 Key Architectural Takeaways
1. **Unified Structure:** Every entity on Solana is stored as an account with the same fundamental structure (lamports, owner, executable status, data bytes).
2. **Owner Restriction:** Only the program defined in the `owner` field can write to an account or deduct lamports. User wallets are owned by the System Program, meaning only the System Program can change their SOL balances.
3. **Executable Status:** Programs are executable accounts (like the System Program or SPL Token Program). Their account data stores compiled bytecode or pointers to loaders, and they do not keep dynamic state data inside themselves; dynamic data is kept in separate accounts that they own.
