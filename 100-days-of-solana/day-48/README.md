# Solana NFTs Without Metaplex: A Week with Token Extensions 🎨

Before this week, I thought a Solana NFT was exclusively a Metaplex thing. It turns out you can mint a full NFT, complete with on-chain metadata and a collection group, using just the native **SPL Token Extensions (Token-2022)** program. 

Here is the mental model shift and technical breakdown from my week building NFTs on Solana.

📖 **Published DEV Post:** [Solana NFTs Without Metaplex: What I Learned Building NFTs with Token Extensions](https://dev.to/atharv_shukla_f7a20a5893f/solana-nfts-without-metaplex-what-i-learned-building-nfts-with-token-extensions-28n)

---

## 🧠 The Mental Model: What is a Solana NFT anyway?

In Web2 terms, an NFT is like a row in a database table with an image link and a owner foreign key. In the Ethereum/EVM world, an NFT is a token mapped inside a smart contract (ERC-721). 

On Solana, there is no master database. An NFT is simply an **SPL Token Mint** configured with very specific parameters:
*   **Decimals:** `0` (cannot be split).
*   **Supply:** `1` (guarantees uniqueness).
*   **Mint Authority:** Disabled/burned (locks the supply forever).
*   **Extensions Block:** Appended TLV bytes storing metadata pointer, metadata fields, and collection links natively on the mint account itself.

---

## 🛠️ What I Built: The Extensions Blueprint

Instead of relying on off-chain indexing services, the entire relationship is baked directly into the account's state:

```
                     ┌──────────────────┐
                     │  Collection Mint │ (Group Extension)
                     │ (Solana Sketchbook)
                     └────────┬─────────┘
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
      ┌─────────────────┐           ┌─────────────────┐
      │  Member 1 Mint  │           │  Member 2 Mint  │
      │   (Sketch #1)   │           │   (Sketch #2)   │ (Member Extension)
      │  Member No: 1   │           │  Member No: 2   │
      └─────────────────┘           └─────────────────┘
```

1. **Metadata Pointer Extension:** Tells explorers and wallets that the metadata exists natively inside the mint account itself.
2. **Token Metadata Extension:** Writes the `name`, `symbol`, and raw GitHub-hosted `URI` directly onto the mint.
3. **Token Group Extension (On the Collection):** Declares a collection mint with a maximum size (e.g., `3`) and tracks the size of active members.
4. **Token Group Member Extension (On the NFTs):** Creates a cryptographic pointer back to the parent Collection Mint, proving membership on-chain.

Here is what the configuration output looks like under `spl-token display`:
```yaml
Extensions
  Metadata Pointer:
    Authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Metadata address: BoMVJqscNrmML6drZppJHYmPMcqdyKZ2YXw5mWLDoS3s
  Group Member Pointer:
    Authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Member address: BoMVJqscNrmML6drZppJHYmPMcqdyKZ2YXw5mWLDoS3s
  Token Group Member:
    Mint: BoMVJqscNrmML6drZppJHYmPMcqdyKZ2YXw5mWLDoS3s
    Group: 6V3UTJ8DsSeEesnXS9KJanCbwVg63bcUQNGmJALFgaPZ
    Member Number: 1
```

---

## ⚡ The Surprising Part: Mutable Metadata & Caching

The coolest exercise was updating metadata live on devnet with a single CLI call:
```bash
spl-token update-metadata 6V3UTJ8DsSeEesnXS9KJanCbwVg63bcUQNGmJALFgaPZ name "Field Notes"
spl-token update-metadata 6V3UTJ8DsSeEesnXS9KJanCbwVg63bcUQNGmJALFgaPZ rarity legendary
```
Because the update authority key is still active, the transaction goes through and the bytes update on-chain instantly. 

However, **there is a sharp separation between on-chain metadata and off-chain assets**. While the token name updates instantly in the Solana Explorer, the image pointed to by the `URI` is cached aggressively by indexers and wallets. This highlights why serious NFT projects use permanent storage solutions like IPFS or Arweave for the asset hosting.

---

## 🚀 What's Next?

Natively nesting collection parameters directly into the Token-2022 standard makes Solana collections extremely lightweight and composable. For my next step, I want to explore:
*   **Transfer Hooks:** Implementing custom rules that check account constraints before allowing an NFT to be transferred.
*   **Royalty Enforcement:** Setting up mandatory transfer fees at the program level.

*This post is part of #100DaysOfSolana. Follow along or jump in any day!*
