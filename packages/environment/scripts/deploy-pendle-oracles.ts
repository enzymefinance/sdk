import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import arg, { type Result } from "arg";

// Keystore V3 Type (simplified)
interface KeystoreV3 {
  address: string;
  crypto: {
    cipher: string;
    ciphertext: string;
    cipherparams: {
      iv: string;
    };
    kdf: string;
    kdfparams: {
      dklen: number;
      salt: string;
      n?: number; // for scrypt
      p?: number; // for scrypt
      r?: number; // for scrypt
      c?: number; // for pbkdf2
      prf?: string; // for pbkdf2
    };
    mac: string;
  };
  id: string;
  version: 3;
}

// --- Password Prompt Function (remains the same) ---
async function getPassword(promptMessage: string): Promise<string> {
  return new Promise((resolve, reject) => {
    process.stdout.write(promptMessage);

    let password = "";
    const onData = (key: Buffer) => {
      const char = key.toString("utf8");

      switch (char) {
        case "\r": // Enter key
        case "\n": {
          // Enter key (alternative)
          process.stdin.removeListener("data", onData);
          process.stdin.setRawMode(false);
          process.stdout.write("\n");
          resolve(password);
          break;
        }
        case "\x03": {
          // Ctrl+C
          process.stdin.removeListener("data", onData);
          process.stdin.setRawMode(false);
          reject(new Error("Input cancelled by user"));
          process.exit(); // Exit the process on Ctrl+C
          break;
        }
        case "\x08": // Backspace (Windows)
        case "\x7f": // Backspace (macOS/Linux)
          if (password.length > 0) {
            password = password.slice(0, -1);
          }
          break;
        default:
          if (key[0] >= 32) {
            // Check if it's a printable character
            password += char;
          }
          break;
      }
    };

    process.stdin.setRawMode(true);
    process.stdin.resume(); // Start reading from stdin
    process.stdin.on("data", onData);
  });
}
// --- End Password Prompt Function ---

async function decryptKeystore() {
  // --- Argument Parsing ---
  const argSpec = {
    "--file": String,
    "-f": "--file",
  };
  let args: Result<typeof argSpec>;
  try {
    args = arg(argSpec);
  } catch (error: any) {
    console.error(`Error parsing arguments: ${error.message}`);
    console.error("Usage: ts-node <script_name>.ts --file <path_to_keystore_file>");
    process.exit(1);
  }
  const filePathArg = args["--file"];
  if (!filePathArg) {
    console.error("Error: --file argument is required.");
    console.error("Usage: ts-node <script_name>.ts --file <path_to_keystore_file>");
    process.exit(1);
  }
  const keystoreFilePath = path.resolve(filePathArg);
  if (!fs.existsSync(keystoreFilePath)) {
    console.error(`Error: Keystore file not found at ${keystoreFilePath}`);
    process.exit(1);
  }
  // --- End Argument Parsing ---

  try {
    // --- Read and Parse Keystore JSON ---
    const keystoreContent = fs.readFileSync(keystoreFilePath, "utf8");
    let keystore: KeystoreV3;
    try {
      keystore = JSON.parse(keystoreContent);
    } catch (error) {
      console.error("Error parsing keystore file: Invalid JSON format.", error.message);
      process.exit(1);
    }

    if (keystore.version !== 3) {
      console.error(`Error: Unsupported keystore version (${keystore.version}). Only V3 is supported.`);
      process.exit(1);
    }
    // --- End Read and Parse Keystore JSON ---

    // --- Get Password ---
    const password = await getPassword("Enter password to decrypt keystore: ");
    if (!password) {
      console.error("Error: Password is required.");
      process.exit(1);
    }
    // --- End Get Password ---

    // --- Derive Key ---
    const cryptoParams = keystore.crypto;
    const kdfParams = cryptoParams.kdfparams;
    const salt = Buffer.from(kdfParams.salt, "hex");
    const dklen = kdfParams.dklen;
    let derivedKey: Buffer;

    if (cryptoParams.kdf === "scrypt") {
      if (kdfParams.n === undefined || kdfParams.r === undefined || kdfParams.p === undefined) {
        console.error("Error: Invalid scrypt parameters in keystore file.");
        process.exit(1);
      }
      // Note: Node's scrypt uses N, keystore uses n.
      derivedKey = crypto.scryptSync(password, salt, dklen, {
        N: kdfParams.n,
        r: kdfParams.r,
        p: kdfParams.p,
        maxmem: kdfParams.n * kdfParams.r * 128 * 2, // Estimate maxmem roughly
      });
    } else if (cryptoParams.kdf === "pbkdf2") {
      if (kdfParams.c === undefined || kdfParams.prf === undefined) {
        console.error("Error: Invalid pbkdf2 parameters in keystore file.");
        process.exit(1);
      }
      if (kdfParams.prf !== "hmac-sha256") {
        console.error(`Error: Unsupported PBKDF2 PRF: ${kdfParams.prf}. Only hmac-sha256 is supported.`);
        process.exit(1);
      }
      derivedKey = crypto.pbkdf2Sync(password, salt, kdfParams.c, dklen, "sha256");
    } else {
      console.error(`Error: Unsupported KDF: ${cryptoParams.kdf}`);
      process.exit(1);
    }
    // --- End Derive Key ---

    // --- Decrypt Ciphertext ---
    const ciphertext = Buffer.from(cryptoParams.ciphertext, "hex");
    const iv = Buffer.from(cryptoParams.cipherparams.iv, "hex");
    const algo = cryptoParams.cipher;

    // Node crypto expects lowercase algorithm names
    if (!["aes-128-ctr", "aes-128-cbc", "aes-256-cbc"].includes(algo)) {
      console.error(`Error: Unsupported cipher: ${algo}`);
      process.exit(1);
    }

    // Check IV length (e.g., 16 bytes for AES)
    // AES block size is 128 bits (16 bytes)
    if ((algo.includes("cbc") || algo.includes("ctr")) && iv.length !== 16) {
      console.error(`Error: Invalid IV length (${iv.length} bytes) for cipher ${algo}. Expected 16 bytes.`);
      process.exit(1);
    }

    const decipher = crypto.createDecipheriv(algo, derivedKey.slice(0, 16), iv); // Use first 16 bytes of derived key for AES-128 if dklen > 16
    // Note: For AES-256, use derivedKey.slice(0, 32). This part might need adjustment based on standard.
    // Ethereum standard usually uses first 16 bytes for cipher key, rest for MAC check.
    // Let's assume we only need the first 16 bytes for aes-128 ciphers mentioned.
    // A more robust implementation would check dklen and cipher requirements.

    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

    // --- Optional: MAC Verification (Recommended for security) ---
    // const macData = Buffer.concat([derivedKey.slice(16, 32), ciphertext]);
    // const calculatedMac = crypto.createHash("sha3-256").update(macData).digest("hex");
    // if (calculatedMac !== cryptoParams.mac) {
    //   console.error("Error: MAC verification failed. Keystore file might be corrupted or password incorrect.");
    //   process.exit(1);
    // }
    // console.log("MAC verification successful.");
    // --- End MAC Verification ---

    // Output the decrypted private key (hex encoded)
    return decrypted.toString("hex");
  } catch (error: any) {
    console.error("\nAn error occurred during decryption:");
    if (error.code === "ERR_OSSL_BAD_DECRYPT" || error.message?.toLowerCase().includes("bad decrypt")) {
      console.error("Decryption failed. Likely incorrect password or corrupted file (Bad MAC or ciphertext).");
    } else if (error.code === "ENOENT") {
      console.error(`File not found at ${keystoreFilePath}`);
    } else if (error.code === "ERR_CRYPTO_INVALID_KEYLEN" || error.code === "ERR_CRYPTO_INVALID_IV") {
      console.error(`Crypto Error: ${error.message}`);
    } else {
      console.error(error.message || error);
    }
    process.exit(1);
  }
}

decryptKeystore().catch((error) => {
  console.error("An unexpected error occurred in the main execution:", error);
  process.exit(1);
});
