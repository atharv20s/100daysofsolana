# Day 11: Compare accounts vs databases

Today we contrasted the structure, billing, access control, and behavior of **Solana Accounts** with traditional **Web2 databases**. We built an interactive dashboard running on `localhost:5176` that visualizes this comparison.

---

## 📸 Dashboard Output (Proof of Work)
![Live Account Inspector](./screenshot1.png)
![Comparison Reference Grid](./screenshot2.png)


## 🖥️ Account Inspection CLI Outputs

### 1. Wallet Account Inspection (`solana account $(solana address)`)
```text
Public Key: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
Balance: 1 SOL
Owner: 11111111111111111111111111111111 (System Program)
Executable: false
Rent Epoch: 18446744073709551615
```

### 2. Program Account Inspection (`solana account TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`)
```text
Public Key: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
Balance: 12.107574357 SOL
Owner: BPFLoaderUpgradeab1e11111111111111111111111
Executable: true
Rent Epoch: 18446744073709551615
Length: 36 (0x24) bytes
0000:   02 00 00 00  27 f1 90 b1  d3 af 98 b8  ce 71 4c 44   ....'........qLD
0010:   e8 ca df f9  f8 fc 45 cb  8e 5f ac 42  02 ef f8 11   ......E.._.B....
0020:   0d 97 dd 37                                          ...7
```

---

## 📊 Account vs Database Comparison Grid

| Concept | Traditional Database | Solana Accounts |
| :--- | :--- | :--- |
| **Data location** | Rows in tables on a centralized server | Accounts on a distributed ledger across validators |
| **Schema** | Defined by the database (SQL DDL, document schema) | Defined by the owning program; stored as raw bytes in the account's data field |
| **Access control** | Application-level auth (SQL roles, app middleware) | Enforced by the runtime: only the owning program can modify an account, and only with the required signer(s) |
| **Cost of storage** | Server/cloud hosting fees, pay for disk space | Rent-exempt deposit proportional to data size (refundable when closed) |
| **Identity/keys** | Auto-increment IDs, UUIDs | 32-byte public keys or Program Derived Addresses (PDAs) |
| **Reads** | SQL queries, document lookups | RPC calls (`getAccountInfo`, `getProgramAccounts`) |
| **Writes** | INSERT/UPDATE via application code | Transactions with instructions, signed by authorized keys |
| **Code vs data** | Application code and database are separate systems | Both are accounts; programs (code) and data accounts coexist in the same model |
| **Deletion** | DELETE query removes the row | Close the account, lamports are returned to you |
| **Visibility** | Private by default; you choose what to expose | Public by default; anyone can read any account's data |

---

## 💰 Rent-Exempt Storage Scaling

We checked the minimum balance required to store data and keep accounts active without periodic rent collection:

*   **0 Bytes:** `0.00089088 SOL`
*   **100 Bytes:** `0.00158688 SOL`
*   **1000 Bytes:** `0.00785088 SOL`

### Key Takeaway
Storage on Solana behaves linearly relative to the allocation size:
$$\text{Rent Exemption Cost} = \text{Base Account Overhead} + (\text{Cost Per Byte} \times \text{Allocated Bytes})$$
This upfront deposit guarantees permanent network storage for free unless you explicitly decide to close the account and recover the entire deposit.
