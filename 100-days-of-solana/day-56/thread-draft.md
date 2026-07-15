---
Post 1 (Hook) - 247 chars
---
I spent four days building tokens on Solana that charge fees, pay yield, and refuse to move—and the protocol handles all of it natively. No middleware. No custom smart contracts.

Here's how Token-2022 extensions change the game. 🧵👇

---
Post 2 (Transfer Fee) - 269 chars
---
1/ The Fee-Bearing Mint
With the `TransferFeeConfig` extension, the mint automatically skims a 1% fee on every transfer, capped on-chain. The fee is withheld at the program level, and I can sweep it back with one command.

Create CLI command:
`spl-token create-token --transfer-fee-basis-points 100`

---
Post 3 (Interest-Bearing) - 267 chars
---
2/ The Interest-Bearing Mint
Stacked `InterestBearingConfig` on top of transfer fees for 50% APR yield.
Crucial detail: The raw supply never changes. The extension compound-calculates the balance drift purely at the client/presentation level.

`--interest-rate 5000`

---
Post 4 (Soulbound Token) - 264 chars
---
3/ The Non-Transferable Mint
A soulbound badge. Decimals: 0, Supply: 1.
Once minted, the program itself rejects any transfer instruction with a `0x25` error: "Transfer is disabled for this mint." Enforced by validators, not app-level checks.

`--enable-non-transferable`

---
Post 5 (Call to Action) - 265 chars
---
4/ Every extension sits inside the mint using Solana's Type-Length-Value (TLV) layout, extending the account bytes.

Read the full deep-dive, including commands, outputs, and validation details on DEV:

https://dev.to/atharv_shukla_f7a20a5893f/three-token-2022-mints-in-one-week-fees-yield-and-soulbound-48j3

#100DaysOfSolana #Solana
