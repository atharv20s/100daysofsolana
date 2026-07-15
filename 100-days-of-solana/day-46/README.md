# Day 46: Audit your NFT collection on chain 🔍

Today, I audited the on-chain token state of my Day 44 NFT and Day 45 NFT Collection on Solana Devnet.

This validation ensures the integrity of the Token-2022 extensions, validating metadata pointers, token group counts, and group memberships directly from devnet validators.

---

## 📋 Mints Audited
*   **Day 44 Member NFT:** `2AHjpgTEGRkKigNuEtyMA22i99HwjUKLsuMGJePGRuoN`
*   **Day 45 Collection Mint (Group):** `6V3UTJ8DsSeEesnXS9KJanCbwVg63bcUQNGmJALFgaPZ`
*   **Day 45 Member NFT 1:** `BoMVJqscNrmML6drZppJHYmPMcqdyKZ2YXw5mWLDoS3s`
*   **Day 45 Member NFT 2:** `5xFH2Q26oND9MufCW5qckWUz23mBLXS25jXdWcKoq1HE`

---

## 🛠️ Audit Reports via `spl-token display`

### 1. Member NFT (Day 44)
Running `spl-token display 2AHjpgTEGRkKigNuEtyMA22i99HwjUKLsuMGJePGRuoN` returns:
```yaml
SPL Token Mint
  Address: 2AHjpgTEGRkKigNuEtyMA22i99HwjUKLsuMGJePGRuoN
  Program: TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
  Supply: 1
  Decimals: 0
  Mint authority: (not set)
  Freeze authority: (not set)
Extensions
  Metadata Pointer:
    Authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Metadata address: 2AHjpgTEGRkKigNuEtyMA22i99HwjUKLsuMGJePGRuoN
  Metadata:
    Update Authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Mint: 2AHjpgTEGRkKigNuEtyMA22i99HwjUKLsuMGJePGRuoN
    Name: Atharv Genesis NFT
    Symbol: AGEN
    URI: https://raw.githubusercontent.com/atharv20s/100daysofsolana/main/day-44/metadata.json
```
*   **Analysis:** Decimals are `0`, Supply is locked at `1` with disabled mint authority, and the metadata matches the GitHub-hosted JSON configuration.

### 2. Collection Member NFT (Day 45 Member #1)
Running `spl-token display BoMVJqscNrmML6drZppJHYmPMcqdyKZ2YXw5mWLDoS3s` returns:
```yaml
SPL Token Mint
  Address: BoMVJqscNrmML6drZppJHYmPMcqdyKZ2YXw5mWLDoS3s
  Program: TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
  Supply: 1
  Decimals: 0
  Mint authority: (not set)
  Freeze authority: (not set)
Extensions
  Metadata Pointer:
    Authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Metadata address: BoMVJqscNrmML6drZppJHYmPMcqdyKZ2YXw5mWLDoS3s
  Group Member Pointer:
    Authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Member address: BoMVJqscNrmML6drZppJHYmPMcqdyKZ2YXw5mWLDoS3s
  Metadata:
    Update Authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Mint: BoMVJqscNrmML6drZppJHYmPMcqdyKZ2YXw5mWLDoS3s
    Name: Sketch #1
    Symbol: SK1
    URI: https://gist.githubusercontent.com/janvinsha/3412c5d4e92b6de9a2ed82337ecafc44/raw/99359fc62ffd0480b6a52ee1ad4048ecba4ae61c/nft.json
  Token Group Member:
    Mint: BoMVJqscNrmML6drZppJHYmPMcqdyKZ2YXw5mWLDoS3s
    Group: 6V3UTJ8DsSeEesnXS9KJanCbwVg63bcUQNGmJALFgaPZ
    Member Number: 1
```

### 3. Collection Mint (Day 45 Group)
Running `spl-token display 6V3UTJ8DsSeEesnXS9KJanCbwVg63bcUQNGmJALFgaPZ` returns:
```yaml
SPL Token Mint
  Address: 6V3UTJ8DsSeEesnXS9KJanCbwVg63bcUQNGmJALFgaPZ
  Program: TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
  Supply: 0
  Decimals: 0
  Mint authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
  Freeze authority: (not set)
Extensions
  Metadata Pointer:
    Authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Metadata address: 6V3UTJ8DsSeEesnXS9KJanCbwVg63bcUQNGmJALFgaPZ
  Group Pointer:
    Authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Group address: 6V3UTJ8DsSeEesnXS9KJanCbwVg63bcUQNGmJALFgaPZ
  Metadata:
    Update Authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Mint: 6V3UTJ8DsSeEesnXS9KJanCbwVg63bcUQNGmJALFgaPZ
    Name: Solana Sketchbook
    Symbol: SKTCH
    URI: https://gist.githubusercontent.com/janvinsha/b477ebe4dda46b0ef03895c4ea930a46/raw/f29222bcaff0d4979fe7ebb610a00bb97a8418ec/collection.json
  Token Group:
    Update Authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Mint: 6V3UTJ8DsSeEesnXS9KJanCbwVg63bcUQNGmJALFgaPZ
    Size: 2
    Max Size: 3
```
*   **Analysis:** The token group displays `Size: 2` and `Max Size: 3`. This confirms both member NFTs (`BoMVJqscNrmML6drZppJHYmPMcqdyKZ2YXw5mWLDoS3s` & `5xFH2Q26oND9MufCW5qckWUz23mBLXS25jXdWcKoq1HE`) are successfully linked on-chain to this parent collection.

---

## 🔗 Verification Links
*   **Day 44 Member NFT:** [2AHjpgTEGRkKigNuEtyMA22i99HwjUKLsuMGJePGRuoN](https://explorer.solana.com/address/2AHjpgTEGRkKigNuEtyMA22i99HwjUKLsuMGJePGRuoN?cluster=devnet)
*   **Day 45 Collection Mint (Group):** [6V3UTJ8DsSeEesnXS9KJanCbwVg63bcUQNGmJALFgaPZ](https://explorer.solana.com/address/6V3UTJ8DsSeEesnXS9KJanCbwVg63bcUQNGmJALFgaPZ?cluster=devnet)
*   **Day 45 Member 1:** [BoMVJqscNrmML6drZppJHYmPMcqdyKZ2YXw5mWLDoS3s](https://explorer.solana.com/address/BoMVJqscNrmML6drZppJHYmPMcqdyKZ2YXw5mWLDoS3s?cluster=devnet)
*   **Day 45 Member 2:** [5xFH2Q26oND9MufCW5qckWUz23mBLXS25jXdWcKoq1HE](https://explorer.solana.com/address/5xFH2Q26oND9MufCW5qckWUz23mBLXS25jXdWcKoq1HE?cluster=devnet)
