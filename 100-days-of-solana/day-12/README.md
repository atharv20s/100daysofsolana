# Day 12: Compare data across devnet and mainnet

Today we queried the same program address (Token-2022 Program: `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`) on both **Devnet** and **Mainnet-Beta** environments to contrast how the two networks behave as independent databases.

---

## 📸 Interactive Dashboard Output (Browser CORS Demo)
![Dashboard screenshot showing Devnet success and Mainnet 403](./screenshot.png)


## 🖥️ Terminal CLI Output (`node compare-networks.mjs`)
Running in a Node.js server environment avoids CORS/origin protection gates:

```text
--- Devnet ---
Address : TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
Balance : 0.001159846 SOL
Recent transactions: 3
  3Q5abwkPZ5QVXyXhLfiT...  slot 472741032  29/6/2026, 1:52:32 pm
  58LvNEBeVMQkRBmvcaEy...  slot 472741031  29/6/2026, 1:52:32 pm
  4ERpByEgKxcuKpd3fnvj...  slot 472741031  29/6/2026, 1:52:32 pm

--- Mainnet ---
Address : TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
Balance : 0.070127637 SOL
Recent transactions: 3
  3YSaEWeUGvg5W7XWZWSF...  slot 429629007  29/6/2026, 1:52:38 pm
  4s8g4Mz1wuZz4PtcxqKJ...  slot 429629007  29/6/2026, 1:52:38 pm
  29tNJEXXCA7gRUnXCNRX...  slot 429629007  29/6/2026, 1:52:38 pm

--- Summary ---
Same address, same RPC calls, different networks, different data.
```

---

## 🚨 Browser CORS & Origin restrictions (Why 403 occurs)

When testing from a web UI on `localhost`:
*   **Devnet (`https://api.devnet.solana.com`):** Allows cross-origin browser traffic.
*   **Mainnet-Beta (`https://api.mainnet-beta.solana.com`):** Restricts requests originating from browser `Origin` headers (resulting in `HTTP 403 Forbidden` errors) to prevent sybil/rate-limit abuse from frontend requests.
*   **Solution for Web Apps:** In production apps, developers route queries through private RPC providers (e.g., Helius, QuickNode, Alchemy) or utilize a proxy backend to prevent CORS/origin blocking.
