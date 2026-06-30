# Day 28: Share Your Explorer

Today, the goal is to share a screenshot and reflection on how we navigate the Solana blockchain using a block explorer. Below is a structured draft of the social media post ready to copy-paste for **X (Twitter)** or **LinkedIn**, along with a guide on how to take the screenshot based on previous days' exploration.

---

## 📱 Social Media Post Draft

### For X (Twitter)
```text
Day 28 of #100DaysOfSolana: Getting cozy with block explorers! 🔍

Today I'm exploring the Token-2022 Program on Devnet/Mainnet using the official Solana Explorer. 

💡 Key takeaway: I love how clear it makes the separation of code and state. You can see the Program ID (proxy) pointing to its executable Program Data Account owned by the upgrade loader. This is what allows smart contracts to be upgradeable on Solana!

I highly recommend the official Solana Explorer (explorer.solana.com) for its clean UI and excellent log breakdowns.

What's your go-to Solana explorer? Solscan or SolanaFM? 

cc @solana @solaboratory
```

### For LinkedIn
```text
🚀 Day 28 of #100DaysOfSolana: Navigating the Solana Ledger with Block Explorers!

As a Web2 developer transitioning into Web3, understanding how to read the state of a blockchain is crucial. Block explorers act as the ultimate "Chrome DevTools" or "Database Admin Dashboards" for decentralized networks.

Today, I spent time inspecting the Token-2022 program on the official Solana Explorer. Here is what I learned:
1️⃣ Stateless Architecture in Action: The explorer visually separates the Program ID (the proxy address) from the actual executable bytecode stored in a Program Data account owned by the upgrade loader.
2️⃣ Ownership Rules: You can easily see the 'owner' fields of data accounts, demonstrating that only the designated program has the authority to mutate the data or debit lamports.

I highly recommend the official Solana Explorer for beginners. The ability to inspect instruction logs step-by-step makes debugging transactions infinitely easier.

What's your favorite Solana block explorer, and why? Let me know in the comments!

#solana #blockchain #web3 #softwareengineering #developer
```

---

## 📸 How to Take Your Screenshot

1. Open [Solana Explorer](https://explorer.solana.com/) (or [Solscan](https://solscan.io/)).
2. Look up the **Token-2022 Program**: `TokenzQdBNbXt8TuTRCEjrpb5764uWo1tz5SQH376BB`.
3. Highlight/expand the account details showing:
   - **Executable:** `Yes`
   - **Owner:** `BPF Upgradeable Loader`
   - **Program Data Address:** pointing to the bytecode account.
4. Take a screenshot (or use the screenshot from Day 26 `day-26/screenshot.png` as a starting point) and attach it to your post!
