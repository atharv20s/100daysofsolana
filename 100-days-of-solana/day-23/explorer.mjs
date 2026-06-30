import {
    address,
    createSolanaRpc,
    devnet,
} from "@solana/kit";

const KNOWN_PROGRAMS = {
    "11111111111111111111111111111111": "System Program",
    "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA": "Token Program",
    "TokenzQdBNbXt8TuTRCEjrpb5764uWo1tz5SQH376BB": "Token-2022 Program",
    "BPFLoaderUpgradeab1e11111111111111111111111": "BPF Upgradeable Loader",
    "BPFLoader2111111111111111111111111111111111": "BPF Loader 2",
    "ComputeBudget111111111111111111111111111111": "Compute Budget Program",
    "SysvarRent111111111111111111111111111111111": "Sysvar: Rent",
    "SysvarC1ock11111111111111111111111111111111": "Sysvar: Clock",
};

// 1. Get address argument
const targetAddressArg = process.argv[2];

if (!targetAddressArg) {
    console.error("\n❌ Error: Please provide a Solana address.");
    console.error("Usage: node explorer.mjs <SOLANA_ADDRESS>");
    console.error("Example: node explorer.mjs TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA\n");
    process.exit(1);
}

// 2. Validate address
let targetAddress;
try {
    targetAddress = address(targetAddressArg);
} catch (e) {
    console.error(`\n❌ Error: Invalid Solana address format: "${targetAddressArg}"\n`);
    process.exit(1);
}

// 3. Connect to Devnet
const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));

async function main() {
    console.log(`\n🔍 Fetching details for address: ${targetAddress}...`);
    
    try {
        // Fetch balance and account info in parallel
        const [balanceResult, accountInfoResult] = await Promise.all([
            rpc.getBalance(targetAddress).send(),
            rpc.getAccountInfo(targetAddress, { encoding: 'base64' }).send()
        ]);

        const balanceSOL = Number(balanceResult.value) / 1_000_000_000;
        const accountInfo = accountInfoResult.value;

        console.log("\n=================== ACCOUNT EXPLORER ===================");
        console.log(`Address:     ${targetAddress}`);
        console.log(`Balance:     ${balanceSOL} SOL (${balanceResult.value.toLocaleString()} Lamports)`);

        if (accountInfo === null) {
            console.log("Status:      ⚠️ Unfunded/Uninitialized Account (No on-chain data)");
            console.log("========================================================");
            return;
        }

        const rawOwner = accountInfo.owner;
        const ownerName = KNOWN_PROGRAMS[rawOwner] || rawOwner;

        console.log(`Owner:       ${ownerName} (${rawOwner})`);
        console.log(`Executable:  ${accountInfo.executable ? "✅ Yes (Program)" : "❌ No (Data Account)"}`);
        console.log(`Rent Epoch:  ${accountInfo.rentEpoch}`);
        
        let dataLength = 0;
        let dataPreview = "None";

        if (accountInfo.data) {
            // For base64 encoded data, the length is the decoded byte length
            const dataBytes = Buffer.from(accountInfo.data[0], 'base64');
            dataLength = dataBytes.length;
            
            if (dataLength > 0) {
                // Show hex preview of the first 64 bytes
                const previewBytes = dataBytes.slice(0, 64);
                const hexString = previewBytes.toString('hex').match(/../g).join(' ');
                dataPreview = hexString + (dataLength > 64 ? " ... (truncated)" : "");
            }
        }

        console.log(`Data Size:   ${dataLength} bytes`);
        console.log(`Data (Hex):  ${dataPreview}`);
        console.log("========================================================");

    } catch (err) {
        console.error("\n❌ RPC Error: Failed to fetch account information.");
        console.error(err.message || err);
        process.exit(1);
    }
}

main();
