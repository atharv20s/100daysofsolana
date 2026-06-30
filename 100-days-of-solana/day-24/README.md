# Day 24: Decode account data

Today, we explored decoding on-chain accounts. We fetched raw base64 data for the Wrapped SOL mint address on Mainnet-Beta and translated it into readable JSON structures using three different methodologies:
1. Composed token SDK Mint decoders.
2. Manual byte parsing using standard JS `DataView` over Borsh serialization spec.
3. Server-side RPC parsed JSON parsing (`jsonParsed`).

---

## 💻 Terminal Execution Output

```text
🔍 Fetching account data for Wrapped SOL Mint: So11111111111111111111111111111111111111112...
Raw data length: 82 bytes

--- [1] Decoded using @solana-program/token Mint Decoder ---
{
  mintAuthority: { __option: 'None' },
  supply: '0',
  decimals: 9,
  isInitialized: true,
  freezeAuthority: { __option: 'None' }
}

--- [2] Manual Byte-level Parsing (Borsh) ---
{
  mintAuthority: { __option: 'None' },
  supply: '0',
  decimals: 9,
  isInitialized: true,
  freezeAuthority: { __option: 'None' }
}

--- [3] Decoded Server-Side via RPC jsonParsed ---
{
  mintAuthority: { __option: 'None' },
  supply: '0',
  decimals: 9,
  isInitialized: true,
  freezeAuthority: { __option: 'None' }
}

✅ All decoders matched successfully!
```

---

## 🛠️ Decoding Logic & Borsh Layout

A Mint account's 82 bytes are structured according to the following layout:
* **Option Fields:** Prefixed with a 4-byte `u32` option flag (1 = Present, 0 = None).
* **Endianness:** Values are stored in little-endian format (e.g. `dataView.getBigUint64(offset, true)`).
* **Address Encodings:** Addresses are converted back from 32 raw bytes into Base58 character format.
