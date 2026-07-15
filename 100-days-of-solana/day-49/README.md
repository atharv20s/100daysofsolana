# Day 49: Amplify your Solana NFT post to the developer community 📢

For Day 49, I drafted a structured social thread/post to share my Solana NFT journey using Token Extensions (Token-2022) with the broader developer community.

---

## 🐦 X / Twitter Thread & LinkedIn Draft

### Post 1 (The Hook)
> I just spent a week minting NFTs on Solana and the thing nobody told me was: you don't actually need Metaplex to build a complete, on-chain NFT collection anymore.
> 
> Here's how native Token Extensions (Token-2022) changed the game for me 👇 #100DaysOfSolana

### Post 2 (The Mental Model)
> Under the hood, an NFT isn't magic. It's just a standard Mint Account configured with:
> - Decimals: `0`
> - Supply: `1`
> - Mint Authority: Disabled (to freeze supply)
> 
> Instead of mapping records off-chain, all metadata parameters are stored directly on the mint account using the Metadata Pointer extension.

### Post 3 (Collection Groups)
> Previously, grouping collections required external standards. Now:
> 1. The `Group Extension` turns a mint into a collection parent.
> 2. The `Group Member Extension` points individual NFTs back to the collection.
> 
> Provenance is verified at the program level by validators—just two byte arrays matching equal.

### Post 4 (Mutable State)
> Because the metadata lives inside the account, you can mutate it live on devnet with a single CLI call:
> `spl-token update-metadata <MINT> rarity legendary`
> 
> Immediate updates for indexers and explorers, while keeping the update authority secure.

### Post 5 (Call to Action)
> Read my full technical walkthrough of the process, including explorer snapshots and configuration steps:
> 🔗 https://dev.to/atharv_shukla_f7a20a5893f/solana-nfts-without-metaplex-what-i-learned-building-nfts-with-token-extensions-28n
> 
> This is Day 49 of my #100DaysOfSolana journey. Tagging @solana & @solana_devs! 🚀
