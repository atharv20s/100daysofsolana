---
title: "Three Token-2022 Mints in One Week: Fees, Yield, and Soulbound"
published: false
description: "I shipped three Token-2022 mints on Solana devnet in one week — a fee-bearing token, an interest-accruing token, and a soulbound badge. Here's exactly what I built, the CLI commands I ran, and what each extension actually does."
tags: 100DaysOfSolana, solana, web3, tutorial
---

## Token-2022 Is Middleware for Your Currency

If you come from Web2, think of Token-2022 as the upgraded SPL token program on Solana — the same way you might think of Express middleware layered on top of a Node server. Instead of forking the token program to add custom behaviors, you flip extension flags at mint creation time. The runtime enforces them from that point forward. No custom smart contracts. No Rust. Just CLI commands and configuration that lives on chain forever.

Over the past week, I shipped three mints on devnet using three different extensions. Here's exactly what I built and why each one matters.

---

## Mint 1: The Fee-Bearing Token (Transfer Fee Extension)

**Mint Address:** [`WjbwpciSWwF8XWjHKtrACU9ypK1LwpFjSgGMb4gV9Dp`](https://explorer.solana.com/address/WjbwpciSWwF8XWjHKtrACU9ypK1LwpFjSgGMb4gV9Dp?cluster=devnet)
**Extension:** `TransferFeeConfig`

### The Command

```bash
spl-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
  create-token \
  --transfer-fee-basis-points 100 \
  --transfer-fee-maximum-fee 1000000 \
  --decimals 6
```

This creates a token that automatically skims **1% (100 basis points)** off every transfer, capped at 1,000,000 tokens. The fee is withheld in the recipient's token account, and the withdrawal authority (me) can sweep it back at any time.

### On-Chain Proof

```yaml
Extensions
  Transfer fees:
    Current fee: 100bps
    Current maximum: 1000000000000
    Config authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Withdrawal authority: BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK
    Withheld fees: 0
```

I transferred 1,000 tokens to a second wallet and watched the protocol automatically withhold 10 tokens as the fee. Then I swept those withheld fees back with a single command:

```bash
spl-token withdraw-withheld-tokens <MY_ACCOUNT> <RECIPIENT_ACCOUNT>
```

### When Would You Use This?

Anytime you want the protocol itself to enforce a take rate — **royalties on a creator token**, a protocol fee on a stablecoin, or a treasury skim on a community currency. The fee is baked into the mint. No one can transfer without paying it.

---

## Mint 2: The Interest-Bearing Token (Transfer Fee + Interest Stacked)

**Mint Address:** [`GS7JaVubA3AxVbubg7tU8WsxLP2FLgMuMS82Yj8n6maL`](https://explorer.solana.com/address/GS7JaVubA3AxVbubg7tU8WsxLP2FLgMuMS82Yj8n6maL?cluster=devnet)
**Extensions:** `TransferFeeConfig` + `InterestBearingConfig`

### The Command

```bash
spl-token create-token \
  --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
  --decimals 6 \
  --transfer-fee-basis-points 100 \
  --transfer-fee-maximum-fee 1000000 \
  --interest-rate 5000
```

Two extensions on one mint. The transfer fee works exactly like Mint 1. The interest-bearing extension adds a **50% APR (5000 basis points)** that makes the displayed balance drift upward over time.

### The Subtle Thing That Matters

Here's what caught me off guard: **the interest extension does not mint new supply**. It updates the *UI-displayed amount* using a continuous compounding formula based on elapsed time. The raw token amount in the account stays the same. The "interest" is a presentation-layer calculation that wallets and explorers render.

This means if you're building a product on top of this, the interest is cosmetic until someone actually mints or distributes the difference. It's like a bank showing you your accrued interest before it posts to your account.

### On-Chain Proof

Running `spl-token display` on the same account 30 seconds apart:

```yaml
# First check
Balance: 1000000.332734

# 30 seconds later
Balance: 1000000.730303
```

The balance drifts upward without any transaction. That's the interest extension at work.

---

## Mint 3: The Soulbound Badge (Non-Transferable Extension)

**Mint Address:** [`295DTMWYjrVwFqRDtmCh386gfHzj3EtVtFVUQtAdRoed`](https://explorer.solana.com/address/295DTMWYjrVwFqRDtmCh386gfHzj3EtVtFVUQtAdRoed?cluster=devnet)
**Extension:** `Non-transferable`

### The Command

```bash
spl-token create-token \
  --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
  --enable-non-transferable \
  --decimals 0
```

Decimals 0, supply 1. A certificate of completion that can never leave the wallet it's minted to.

### The Proof: Breaking It on Purpose

I pre-created a recipient's token account (so the transfer would actually reach the program), then tried to send my badge:

```bash
$ spl-token transfer 295DTMWYjrVwFqRDtmCh386gfHzj3EtVtFVUQtAdRoed 1 \
  9YCJgq52Msb8tehyyokP5YNhkv2cGK2Bd83aAtwjFUdy --allow-unfunded-recipient

Program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb invoke [1]
Program log: Instruction: TransferChecked
Program log: Transfer is disabled for this mint
Program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb failed: custom program error: 0x25
```

**`Transfer is disabled for this mint`** — error `0x25` (decimal 37). The Token-2022 program itself refused the instruction. Not my code. Not an API layer. The *validator* rejected it at the protocol level.

### When Would You Use This?

Proof-of-attendance tokens, certification badges, reputation scores, KYC stamps — any asset that should be permanently bound to its holder and never tradeable.

---

## The Extension Map

Here's the full audit across all three mints:

| Mint | Extensions | Behavior |
|------|-----------|----------|
| `WjbwpciS...9Dp` | Transfer Fees | Charges 1% on every move |
| `GS7JaVub...maL` | Transfer Fees + Interest-Bearing | Charges 1% + accrues 50% APR display interest |
| `295DTMWY...oed` | Non-Transferable | Cannot be sent, sold, or moved. Ever. |

Three mints. Three different shapes. Zero custom programs written.

---

## What Surprised Me

The biggest thing I didn't expect was how *composable* extensions are. Stacking transfer fees and interest on one mint felt like adding two Express middlewares to a route — they don't interfere with each other, and the runtime handles the ordering.

The non-transferable extension was the most visceral. Seeing the validator print `Transfer is disabled for this mint` and reject your instruction at the protocol level hits differently than a 403 from an API. There's no backdoor. There's no admin panel. The rule lives in the bytes of the mint account, readable by anyone, enforceable by the network.

If I were building a real product, I'd reach for transfer fees on a creator token or community currency, interest-bearing for a savings-style stablecoin wrapper, and non-transferable for onboarding credentials. Token-2022 makes all three a configuration problem, not a smart contract problem.

---

*This post is part of my [#100DaysOfSolana](https://dev.to/t/100daysofsolana) journey. Follow along for daily hands-on Solana experiments.*
