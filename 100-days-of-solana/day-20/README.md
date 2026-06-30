# Day 20: Technical Blog Post on Solana Transactions

Today was focused on cementing everything learned about Solana transactions by documenting the details in a technical blog post published on DEV.to.

---

## 📝 Blog Post Draft

You can find the drafted content in this directory:
- [draft_post.md](./draft_post.md)

### Key Areas Covered:
1. **The Anatomy of a Transaction:** Explaining the 1,232-byte size limit, signature array, message header, account keys declaration, and recent blockhash lifetime.
2. **Commitment Levels:** Contrasting the stages of consensus (Processed, Confirmed, Finalized) against Web2 backend concepts (Single database writes vs. replication/backups).
3. **The Economics of Failures:** Analyzing why failed transactions on-chain still charge gas fees and why transaction simulation (`preflight`) is critical.
4. **Mental Model Shifts:** Upfront account declarations, time-boxed transaction lifespans, and atomic execution guarantees.
