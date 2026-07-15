# Day 39: Inspect and Compare Token Extension Configurations

## 📊 Token Extensions Comparison Table

Here is the structured breakdown of the three tokens created during Days 36, 37, and 38, comparing their sizes, rent costs, extensions, and governing authorities.

| Property | Day 36: Interest-Bearing Token | Day 37: Multi-Extension Token | Day 38: Compliance-Gated Token |
| :--- | :--- | :--- | :--- |
| **Mint Address** | `FDf75ggU728DA8jUdegf7cgQLYbnrzf9ATkD7TQvbBjz` | `87Ge5UZSppdUVj1Wupq1EJGroHZneK2HLzdJmjwKttyX` | `4qjYgLgFk4VmHTinSsj9mS6dCCLpzxCuBrzKbqXVYoru` |
| **Extensions Enabled** | • Interest-Bearing Config | • Interest-Bearing Config<br>• Transfer Fee Config<br>• Metadata Pointer<br>• Token Metadata | • Default Account State (Frozen) |
| **Account Data Size** | `222 bytes` | `599 bytes` | `171 bytes` |
| **Rent Cost (SOL)** | `0.00243600 SOL`<br>(2,436,000 lamports) | `0.00505992 SOL`<br>(5,059,920 lamports) | `0.00208104 SOL`<br>(2,081,040 lamports) |
| **Mint Authority** | `BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK` | `BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK` | `BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK` |
| **Freeze Authority** | *(Not set)* | *(Not set)* | `BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK` |
| **Other Authorities** | • **Rate Authority**:<br>`BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK` | • **Rate Authority**:<br>`BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK`<br>• **Transfer Fee Authority**:<br>`BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK`<br>• **Metadata Pointer Authority**:<br>`BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK`<br>• **Metadata Update Authority**:<br>`BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK` | *(None)* |

---

## 💡 Key Takeaways

1. **Rent Scale with Extensions:**
   - The compliance-gated token is the smallest at `171 bytes` because the `DefaultAccountState` extension is extremely lightweight.
   - Adding a single `Interest-bearing` extension increases the size to `222 bytes`.
   - Compiling four extensions together (Interest-bearing, Transfer Fee, Metadata Pointer, and Token Metadata) pushes the size to `599 bytes`, more than doubling the rent cost (`0.00506 SOL`).

2. **TLV (Type-Length-Value) Architecture:**
   - Token-2022 uses a TLV layout. Every extension requires space for its Type descriptor, the Length of the configuration payload, and the Value itself. This is why multi-extension tokens scale in data footprint size.

3. **Authority Distribution:**
   - The governance of a token is highly granular. Instead of a single master key controlling everything, Solana allows separating the **Mint Authority**, **Freeze Authority**, **Rate Authority**, and **Transfer Fee Authority**.

---

### Solana Explorer Quick Links (Devnet)
- **Day 36 Mint**: [FDf75ggU728DA8jUdegf7cgQLYbnrzf9ATkD7TQvbBjz](https://explorer.solana.com/address/FDf75ggU728DA8jUdegf7cgQLYbnrzf9ATkD7TQvbBjz?cluster=devnet)
- **Day 37 Mint**: [87Ge5UZSppdUVj1Wupq1EJGroHZneK2HLzdJmjwKttyX](https://explorer.solana.com/address/87Ge5UZSppdUVj1Wupq1EJGroHZneK2HLzdJmjwKttyX?cluster=devnet)
- **Day 38 Mint**: [4qjYgLgFk4VmHTinSsj9mS6dCCLpzxCuBrzKbqXVYoru](https://explorer.solana.com/address/4qjYgLgFk4VmHTinSsj9mS6dCCLpzxCuBrzKbqXVYoru?cluster=devnet)
