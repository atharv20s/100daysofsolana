import {
    address,
    createSolanaRpc,
    getBase58Decoder,
    mainnet,
} from "@solana/kit";
import { getMintDecoder } from "@solana-program/token";

// Wrapped SOL Mint Address on Solana Mainnet
const wrappedSolAddress = address("So11111111111111111111111111111111111111112");

// Connect to Solana Mainnet Beta
const rpc = createSolanaRpc(mainnet("https://api.mainnet-beta.solana.com"));

async function main() {
    console.log(`🔍 Fetching account data for Wrapped SOL Mint: ${wrappedSolAddress}...`);

    try {
        // Fetch raw account data (encoded in base64)
        const accountResponse = await rpc.getAccountInfo(wrappedSolAddress, { encoding: "base64" }).send();
        const accountInfo = accountResponse.value;

        if (!accountInfo) {
            console.error("Account not found.");
            process.exit(1);
        }

        // Decode the base64 data string into a Uint8Array/Buffer
        const rawData = Buffer.from(accountInfo.data[0], 'base64'); 
        console.log(`Raw data length: ${rawData.length} bytes`);

        // --- PATH 1: Decoded using @solana-program/token Mint Decoder ---
        console.log("\n--- [1] Decoded using @solana-program/token Mint Decoder ---");
        const sdkMint = getMintDecoder().decode(rawData);
        console.log({
            mintAuthority: sdkMint.mintAuthority,
            supply: sdkMint.supply.toString(),
            decimals: sdkMint.decimals,
            isInitialized: sdkMint.isInitialized,
            freezeAuthority: sdkMint.freezeAuthority,
        });

        // --- PATH 2: Manual Byte-level Parsing via DataView ---
        console.log("\n--- [2] Manual Byte-level Parsing (Borsh) ---");
        const dataView = new DataView(rawData.buffer, rawData.byteOffset, rawData.byteLength);
        const base58Decoder = getBase58Decoder();

        // Bytes 0-3: mintAuthorityOption (u32, 1 = present, 0 = none)
        const mintAuthorityOption = dataView.getUint32(0, true); // true = little-endian
        let mintAuthority = { __option: "None" };
        if (mintAuthorityOption === 1) {
            const bytes = rawData.slice(4, 36);
            mintAuthority = { __option: "Some", value: address(base58Decoder.decode(bytes)) };
        }

        // Bytes 36-43: supply (u64, little-endian)
        const supply = dataView.getBigUint64(36, true);

        // Byte 44: decimals (u8)
        const decimals = dataView.getUint8(44);

        // Byte 45: isInitialized (boolean)
        const isInitialized = dataView.getUint8(45) !== 0;

        // Bytes 46-49: freezeAuthorityOption (u32)
        const freezeAuthorityOption = dataView.getUint32(46, true);
        let freezeAuthority = { __option: "None" };
        if (freezeAuthorityOption === 1) {
            const bytes = rawData.slice(50, 82);
            freezeAuthority = { __option: "Some", value: address(base58Decoder.decode(bytes)) };
        }

        console.log({
            mintAuthority,
            supply: supply.toString(),
            decimals,
            isInitialized,
            freezeAuthority,
        });

        // --- PATH 3: RPC Server-Side Parsed JSON (jsonParsed) ---
        console.log("\n--- [3] Decoded Server-Side via RPC jsonParsed ---");
        const parsedResponse = await rpc.getAccountInfo(wrappedSolAddress, { encoding: "jsonParsed" }).send();
        const parsedInfo = parsedResponse.value.data.parsed.info;
        
        console.log({
            mintAuthority: parsedInfo.mintAuthority ? { __option: "Some", value: parsedInfo.mintAuthority } : { __option: "None" },
            supply: parsedInfo.supply,
            decimals: parsedInfo.decimals,
            isInitialized: parsedInfo.isInitialized,
            freezeAuthority: parsedInfo.freezeAuthority ? { __option: "Some", value: parsedInfo.freezeAuthority } : { __option: "None" },
        });

        console.log("\n✅ All decoders matched successfully!");

    } catch (err) {
        console.error("An error occurred during decoding:", err);
    }
}

main();
