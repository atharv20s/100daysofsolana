import crypto from "crypto";
import fs from "fs";

const keypair = await crypto.subtle.generateKey(
  { name: "Ed25519" },
  true,
  ["sign", "verify"]
);

const rawPrivate = await crypto.subtle.exportKey("pkcs8", keypair.privateKey);
const rawPublic = await crypto.subtle.exportKey("raw", keypair.publicKey);

// In PKCS#8 format for Ed25519, the private key is wrapped. 
// The raw 32-byte seed begins at index 16.
const privateKeyBytes = new Uint8Array(rawPrivate).slice(16, 48);
const publicKeyBytes = new Uint8Array(rawPublic);

const secretKeyArray = Array.from(new Uint8Array([...privateKeyBytes, ...publicKeyBytes]));

fs.writeFileSync("temp-wallet.json", JSON.stringify(secretKeyArray));
console.log("Generated temp-wallet.json successfully!");
