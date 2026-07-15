# Day 31: Advanced Token Incentive Design with Token-2022 Transfer Fees

Today, I explored the advanced tokenomics capabilities of Solana's **Token-2022** program, specifically focusing on the **Transfer Fee Extension**. I configured a token mint with a 1% transfer fee, simulated a transfer that automatically withheld fees on-chain, and withdrew those fees back to the authority wallet.

---

## 💡 Key Architectural Concepts

### 1. Token-2022 vs. Original SPL Token Program
The original SPL Token program (`TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`) is simple and rigid. Introducing features like transfer fees, freeze authorities, or metadata required custom wrapper programs or external indexers. 
**Token-2022** (`TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`) is a superset of the original program that introduces **Extensions**—additional data structures and logic built directly into mints and token accounts.

### 2. Transfer Fee Extension
The Transfer Fee Extension allows token creators to configure fees directly at the mint creation level. 
* **Basis Points (bps):** Fees are defined in basis points, where **100 bps = 1%** (and 10,000 bps = 100%).
* **Max Fee Cap:** You can set a maximum cap in base units (e.g., 5,000 base units) to prevent fees from growing infinitely for large transfers.
* **On-Chain Enforcement:** Unlike Web2 applications where payment processors or backends must calculate and deduct fees, Token-2022 calculates and enforces these fee deductions natively at the blockchain runtime layer.

### 3. Spendable Balance vs. Withheld Balance
When a user transfers tokens, the Transfer Fee Extension splits the transfer amount:
* **Spendable Balance:** The net amount that actually lands in the recipient's wallet and is available for them to spend (e.g., transferring 100 tokens with a 1% fee results in a spendable balance of 99 tokens for the recipient).
* **Withheld Balance:** The fee portion (1 token) is **not** immediately sent to the fee authority. Instead, it is withheld inside the recipient's token account itself. It remains locked and cannot be spent by the recipient.

### 4. Withdraw Withheld Authority
Because withheld fees are kept inside individual recipient token accounts to optimize accounts and storage, a dedicated authority called the **Withdraw Withheld Authority** is required to sweep them. 
This authority is the only public key allowed to execute the `withdrawWithheldTokensFromAccounts` instruction, which aggregates all withheld fees from various token accounts and transfers them to a designated fee recipient account.

### 5. Protocol-Level Monetization
Traditionally, implementing a transfer tax or fee required a centralized backend to intercept transactions, or custom smart contracts. Token-2022 enables **pure, trustless protocol-level monetization**. Creators can deploy a standard token, and the network handles fee collection automatically on every transfer—even if the transfer happens inside a decentralized exchange (DEX), an OTC desk, or a user-to-user wallet transfer.

---

## 🛠️ Key Addresses & Program Details

* **Token-2022 Program ID:** `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`
* **Mint Address:** `m8cQYDKKtG2Gs4Eru8ShszJHLhb4JbNq6gysdJx4Xs8`
* **First Wallet (Owner/Withdraw Authority):** `BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK`
* **First Wallet Token Account (Fee Recipient):** `DHGpXhdsSXpoVU9ynjptR1WXp4c6fc5vZu9175iw4P4R`
* **Second Wallet (Recipient):** `356qc5GSKFodN8jhrLgKuktZwgjrNrhfEgmVzeh52gmb`
* **Second Wallet Token Account:** `Fsi3PcCHqWxu59MhCwQeemWSCE7TQEJfuW8zR9rekWY4`

---

## 📝 Steps & Execution Output

### Step 1: Create a Token-2022 Mint with a 1% Transfer Fee
```bash
$ spl-token create-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb --transfer-fee-basis-points 100 --transfer-fee-maximum-fee 5000
```
* **Mint Address:** `m8cQYDKKtG2Gs4Eru8ShszJHLhb4JbNq6gysdJx4Xs8`
* Sets a `100 bps` (1%) transfer fee with a max fee of `5000` base units.

### Step 2: Mint 1000 Tokens to Owner Account
```bash
$ spl-token create-account m8cQYDKKtG2Gs4Eru8ShszJHLhb4JbNq6gysdJx4Xs8
# Created: DHGpXhdsSXpoVU9ynjptR1WXp4c6fc5vZu9175iw4P4R

$ spl-token mint m8cQYDKKtG2Gs4Eru8ShszJHLhb4JbNq6gysdJx4Xs8 1000
```

### Step 3: Create Recipient Account & Transfer 100 Tokens (1% Withheld)
```bash
$ spl-token create-account m8cQYDKKtG2Gs4Eru8ShszJHLhb4JbNq6gysdJx4Xs8 --owner 356qc5GSKFodN8jhrLgKuktZwgjrNrhfEgmVzeh52gmb
# Created: Fsi3PcCHqWxu59MhCwQeemWSCE7TQEJfuW8zR9rekWY4

$ spl-token transfer m8cQYDKKtG2Gs4Eru8ShszJHLhb4JbNq6gysdJx4Xs8 100 356qc5GSKFodN8jhrLgKuktZwgjrNrhfEgmVzeh52gmb --expected-fee 1 --allow-unfunded-recipient
```
* **First Wallet Balance:** `900` tokens
* **Second Wallet Balance (Spendable):** `99` tokens (1 token fee withheld on-chain)

### Step 4: Withdraw Withheld Fees to Authority Wallet
```bash
$ spl-token withdraw-withheld-tokens DHGpXhdsSXpoVU9ynjptR1WXp4c6fc5vZu9175iw4P4R Fsi3PcCHqWxu59MhCwQeemWSCE7TQEJfuW8zR9rekWY4
```
* **Signature:** `3jeM1cC3Jg7weAsHSWAyRo6cQqfhqiTgp1pETiBnuUYDMkk5ZPmEwSYeRmM6KXPbpmVs8g5ExZqsPhKMQBZ3ax15`
* **First Wallet Balance:** `901` tokens (900 spendable + 1 reclaimed fee)

---

## 🔍 On-Chain Transaction & Log Analysis

The images below illustrate the transaction execution details for the fee withdrawal instruction `withdrawWithheldTokensFromAccounts`:

### Transaction Details & Resource Consumption
The transaction completed with a success status, consuming only **1,931 compute units (CUs)** out of the 200,000 CU limit. This shows that Token-2022's on-chain native logic is highly optimized and cheap to execute.

* **Signer & Fee Payer:** `BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK`
* **Token Program:** `Token-2022 Program`
* **Fee Recipient:** `DHGpXhdsSXpoVU9ynjptR1WXp4c6fc5vZu9175iw4P4R` (First Wallet's Token Account)
* **Source Account:** `Fsi3PcCHqWxu59MhCwQeemWSCE7TQEJfuW8zR9rekWY4` (Second Wallet's Token Account containing the withheld fee)

### On-Chain Logs & Instruction Context
The instruction data shows the following JSON structure being processed by the Token-2022 program:

```json
{
  "feeRecipient": "DHGpXhdsSXpoVU9ynjptR1WXp4c6fc5vZu9175iw4P4R",
  "mint": "m8cQYDKKtG2Gs4Eru8ShszJHLhb4JbNq6gysdJx4Xs8",
  "sourceAccounts": [
    "Fsi3PcCHqWxu59MhCwQeemWSCE7TQEJfuW8zR9rekWY4"
  ],
  "withdrawWithheldAuthority": "BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK",
  "type": "withdrawWithheldTokensFromAccounts"
}
```

The program log confirms:
```text
> Program logged: "TransferFeeInstruction: WithdrawWithheldTokensFromAccounts"
> Program consumed: 1931 of 200000 compute units
> Program returned success
```
