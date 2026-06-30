# Solana Transactions: A Web2 Backend Perspective

If you're coming from a Web2 backend background, your mental model of APIs is probably built on the standard HTTP client-server pattern: client makes a request, the database runs a transaction, and you return a status code.

When diving into Solana, you quickly run into a lot of the same terms—like "transactions"—but the actual execution under the hood is very different. Here's a quick guide on how Solana transactions actually work, what's inside them, and a few things that caught me off guard.

---

## 1. Anatomy of a Solana Transaction
An HTTP request is usually headers and a JSON body. A Solana transaction is a packed binary payload that cannot exceed **1,232 bytes** (this limit exists so transactions can fit cleanly into a single IPv6 packet). 

Inside that byte limit, a transaction contains:
- **Signatures:** Cryptographic proof from the accounts authorizing the action.
- **Message:** The instructions and context, which includes:
  - **Account Keys:** Every single account the transaction will read from or write to. Solana needs this declared upfront so it can parallelize execution.
  - **Recent Blockhash:** A hash from a recent block. This acts as a timestamp and prevents replay attacks. If the blockhash is too old (usually over 150 blocks, or about a minute), the transaction expires.
  - **Instructions:** The actual operations to execute. Each instruction specifies an on-chain program (like calling a controller method) and passes along the necessary accounts and raw data.

---

## 2. The Transaction Lifecycle
In Web2, a database transaction is either committed or it isn't. On a blockchain, consensus is reached in stages:
1. **Processed:** A single validator has included the transaction in a block. 
2. **Confirmed:** A supermajority (66%+) of validators have voted on the block. At this point, the transaction is functionally irreversible.
3. **Finalized:** 31 or more blocks have been built on top of your block. The write is permanently locked into ledger history.

You can think of this as moving from a local write, to multi-region replication, to an immutable backup.

---

## 3. Failed Transactions Still Cost Fees
This is the biggest shift. In Web2, if a request fails validation (say, a 400 Bad Request), you don't get billed for the server CPU cycles it took to reject the request. 

On Solana, **failed transactions still charge fees.** 

If your signatures are valid and the blockhash is recent, validators will execute your transaction. Even if the program logic fails halfway through (e.g. you tried to transfer more SOL than you actually have), you still pay for the compute. 

Here is what it looks like when a transaction fails on-chain:

```text
Transaction executed:
  Signature: 5LseX35v...K4KgG7
  Status: Error processing Instruction 0: custom program error: 0x1
  Fee: 0.000005 SOL
  Account 0 balance: 0.428975 SOL -> 0.42897 SOL
  Compute Units Consumed: 150
  Log Messages:
    Program 11111111111111111111111111111111 invoke [1]
    Transfer: insufficient lamports 428970000, need 500000000000
    Program 11111111111111111111111111111111 failed: custom program error: 0x1
```

Notice that the fee-payer's balance still decreased by `0.000005 SOL` even though the transfer failed. 

To avoid wasting real money on failed execution, Web3 developers use **Transaction Simulation** (preflight checks) on the client side to test the transaction's success on a local state before broadcasting it to the network.

---

## 4. Key Takeaways
- **No ad-hoc lookups:** You cannot query arbitrary accounts mid-transaction; every address you interact with must be declared in your instructions.
- **Keep it fast:** Because of the recent blockhash requirement, signed transactions expire in about a minute.
- **Preflight is your friend:** Run simulations on the RPC node first to save your users from paying fees on failed transactions.
