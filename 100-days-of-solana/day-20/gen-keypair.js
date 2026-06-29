import crypto from "crypto";
import fs from "fs";

const keypair = await crypto.subtle.generateKey(
  { name: "Ed25519" },
  true,
  ["sign", "verify"]
);

const rawPrivate = await crypto.subtle.exportKey("pkcs8", keypair.privateKey);
const rawPublic = await crypto.subtle.exportKey("raw", keypair.publicKey);

// Raw private key seed is 32 bytes starting at offset 16 in the pkcs8 buffer
const privateKeyBytes = new Uint8Array(rawPrivate).slice(16, 48);
const publicKeyBytes = new Uint8Array(rawPublic);

const secretKeyArray = Array.from(new Uint8Array([...privateKeyBytes, ...publicKeyBytes]));

fs.writeFileSync("recipient-keypair.json", JSON.stringify(secretKeyArray));
console.log("Generated recipient-keypair.json successfully!");
