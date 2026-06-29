Day 13: Write about your second week

This directory contains the drafted blog post for Day 13 reflecting on Week 2 of the 100 Days of Solana challenge.

Title: From Local Scripts to Live Data: What I Learned in My Second Week of Solana
Tags: 100daysofsolana, solana, web3, blockchain, beginners

Draft Post:

We are nearly two weeks into the 100 Days of Solana challenge, and the transition from theoretical concepts to active development has been eye-opening. During Week 1, I focused on identities, keypairs, and local wallets. This past week, I started reading real data directly from the blockchain and exploring how Solana acts as a public, globally shared database.

Here are the key takeaways and reflections from my second week:

1. Blockchain is Just a Public API

Before diving in, I expected querying blockchain data to require complex indexing, heavy infrastructure setups, or proprietary tooling. The reality was refreshingly simple. Using the new Solana Kit library, querying on-chain data felt just like calling a standard REST API. Creating an RPC connection and calling getBalance or getSignaturesForAddress was straightforward, lightweight, and required no authorization headers or private api keys.

2. The Interface Transition

Moving from terminal-only outputs to an interactive browser application was a major milestone. Building a browser-based dashboard on localhost to fetch balances and transaction feeds side-by-side showed me how quickly you can create tools on top of Solana. It made the concept of a shared global state click.

3. The Account Model Shift

The biggest conceptual challenge was comparing Solana's account model to traditional Web2 databases. In Web2, your code and data are separate systems. On Solana, both program binaries (executable code) and user states (data accounts) live under the same account model. Learning about the rent-exempt storage model (where you pay a fully refundable upfront SOL deposit for allocated byte space instead of monthly cloud hosting bills) completely rewired my thinking on how backend data should be modeled.

4. The Devnet vs. Mainnet CORS Gotcha

My most interesting discovery this week happened while querying the same Token-2022 program address across both Devnet and Mainnet-Beta. While my Node.js scripts executed successfully, my web UI threw an HTTP 403 Forbidden error on Mainnet queries. This led to a crucial lesson in browser security: public Mainnet RPC endpoints enforce CORS/Origin restrictions to prevent spam, requiring developers to route production frontend requests through private RPC providers (like Helius or QuickNode) or custom backend proxies.

What is Next?

Having mastered reading account states, checking balances, tracking transaction history, and understanding the economics of rent, I am excited to move to the next phase: writing on-chain programs and understanding program accounts and states.

This post is part of my journey through the 100DaysOfSolana challenge. Follow along as I build and learn in public!
