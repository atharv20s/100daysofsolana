# Day 3: Understand SOL and Lamports

## Concepts Covered
- **SOL**: The native token of the Solana blockchain, used to pay for transaction fees, rent for storing data on-chain, and staking.
- **Lamport**: The smallest indivisible unit of SOL, named after computer scientist Leslie Lamport.
  - $1 \text{ SOL} = 1,000,000,000 \text{ lamports } (10^9)$
- **Integer Arithmetic vs. Floating Points**: Solana's runtime works exclusively with integers (lamports) to avoid floating-point rounding errors (e.g., `0.1 + 0.2 = 0.30000000000000004`), ensuring deterministic results across thousands of validator nodes.

---

## Wallet & Connection Credentials
- **Public Key (Address)**: `4A9KgD7Tf7HQ5KpVdZYT8KuZPVoSqGEd55t5iLZYX6sE`
- **Network**: Solana Devnet (`https://api.devnet.solana.com`)
- **Current Balance**:
  - **SOL**: `0.5 SOL`
  - **Lamports**: `500,000,000 lamports`

---

## Challenge Steps & Command Verification

### 1. Check Devnet Wallet Balance (SOL)
Querying the balance using the standard CLI command returned the value in SOL:
```bash
solana balance 4A9KgD7Tf7HQ5KpVdZYT8KuZPVoSqGEd55t5iLZYX6sE --url devnet
# Output: 0.5 SOL
```

### 2. Check Devnet Wallet Balance (Lamports)
Adding the `--lamports` flag returns the raw integer value in lamports:
```bash
solana balance 4A9KgD7Tf7HQ5KpVdZYT8KuZPVoSqGEd55t5iLZYX6sE --url devnet --lamports
# Output: 500000000 lamports
```

### 3. Math Derivation Proof
Converting between SOL and lamports confirms the $10^9$ relationship:
- **SOL to Lamports**:
  $$0.5 \text{ SOL} \times 1,000,000,000 = 500,000,000 \text{ lamports}$$
- **Lamports to SOL**:
  $$\frac{500,000,000 \text{ lamports}}{1,000,000,000} = 0.5 \text{ SOL}$$

---

## Transaction Fee Inspection

### 1. Fetching Most Recent Transaction
We queried the latest transaction history for our wallet address:
```bash
solana transaction-history 4A9KgD7Tf7HQ5KpVdZYT8KuZPVoSqGEd55t5iLZYX6sE --url devnet --limit 1
# Output:
# 3E6G5QRnZ4fxafme4X4tm6djF5oypduA8fiva7GG2sJck2NXhtpogeD63rdRgAK6Q45c8r9YFBqAH16aZLi8D4TA
# 1 transactions found
```

### 2. Inspecting the Transaction
We confirmed and inspected the transaction signature:
```bash
solana confirm 3E6G5QRnZ4fxafme4X4tm6djF5oypduA8fiva7GG2sJck2NXhtpogeD63rdRgAK6Q45c8r9YFBqAH16aZLi8D4TA -v --url devnet
```

**Key Fields in the Output:**
- **Transfer amount**: `500,000,000 lamports` (0.5 SOL)
- **Fee**: `◎0.000005` (5,000 lamports)

### 3. Fee Conversion Proof
Converting the fee from lamports to SOL:
$$\frac{5,000 \text{ lamports}}{1,000,000,000} = 0.000005 \text{ SOL}$$

This confirms the transaction base fee on Solana is exactly **5,000 lamports** (or $0.000005$ SOL).
