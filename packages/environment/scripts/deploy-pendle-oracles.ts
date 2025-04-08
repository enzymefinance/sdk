import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import * as RLP from "node:readline/promises";
import arg, { type Result } from "arg";

const ALGORITHM = "aes-256-cbc";
const KEY_LENGTH = 32; // 256 bits for aes-256
const SALT_LENGTH = 16; // bytes
const IV_LENGTH = 16; // bytes for AES

// Function to prompt for password securely (hides input)
async function getPassword(promptMessage: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const rl = RLP.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true, // Ensure terminal features are enabled
    });

    process.stdout.write(promptMessage);

    let password = "";
    const onData = (key: Buffer) => {
      const char = key.toString("utf8");

      switch (char) {
        case "\r": // Enter key
        case "\n": // Enter key (alternative)
          process.stdin.removeListener("data", onData);
          process.stdin.setRawMode(false);
          process.stdin.pause(); // Allow node process to exit if this is the last async op
          process.stdout.write("\n");
          rl.close();
          resolve(password);
          break;
        case "\x03": // Ctrl+C
          process.stdin.removeListener("data", onData);
          process.stdin.setRawMode(false);
          process.stdin.pause();
          rl.close();
          reject(new Error("Input cancelled by user"));
          process.exit(); // Exit the process on Ctrl+C
          break;
        case "\x08": // Backspace (Windows)
        case "\x7f": // Backspace (macOS/Linux)
          if (password.length > 0) {
            password = password.slice(0, -1);
            // Optional: Move cursor back, write space, move back again if you want visual feedback
            // process.stdout.write('\b \b');
          }
          break;
        default:
          // Ignore other control characters if necessary
          if (key[0] >= 32) {
            // Check if it's a printable character
            password += char;
            // Optional: write a masking character like '*'
            // process.stdout.write('*');
          }
          break;
      }
    };

    process.stdin.setRawMode(true);
    process.stdin.resume(); // Start reading from stdin
    process.stdin.on("data", onData);
  });
}

// parse args
const args = arg({
  // Types
  "--file": String,
});

const filePathArg = args["--file"];

if (!filePathArg) {
  throw new Error("--file argument is required");
}

console.log("filePathArg", filePathArg);

const encryptedFilePath = path.resolve(filePathArg);

if (!fs.existsSync(encryptedFilePath)) {
  throw new Error(`Encrypted file not found at ${encryptedFilePath}`);
}

// Read the entire file content (assuming hex encoded: salt + iv + data)
const fileContentHex = fs.readFileSync(encryptedFilePath, "utf8").trim();

const saltHex = fileContentHex.substring(0, SALT_LENGTH * 2);
const ivHex = fileContentHex.substring(SALT_LENGTH * 2, (SALT_LENGTH + IV_LENGTH) * 2);
const encryptedHex = fileContentHex.substring((SALT_LENGTH + IV_LENGTH) * 2);

// Simplified validation: Check if lengths match expectations.
// If they match, saltHex, ivHex, and encryptedHex will be non-empty unless the original file was too short.
if (saltHex.length !== SALT_LENGTH * 2 || ivHex.length !== IV_LENGTH * 2) {
  throw new Error("Invalid file format or length. Expected hex encoded: salt + iv + encryptedData");
}

const salt = Buffer.from(saltHex, "hex");
const iv = Buffer.from(ivHex, "hex");
const encryptedData = Buffer.from(encryptedHex, "hex");

// Prompt user for the password
const password = await getPassword("Enter password to decrypt file: ");

if (!password) {
  console.error("Error: Password is required.");
  process.exit(1);
}

console.log("\nDeriving key and decrypting file...");

// Derive the key from the password and salt using scrypt
// Use sync version for simplicity in script context
const derivedKey = crypto.scryptSync(password, salt, KEY_LENGTH);

// Create decipher
const decipher = crypto.createDecipheriv(ALGORITHM, derivedKey, iv);

// Decrypt the data
let decrypted = decipher.update(encryptedData);
decrypted = Buffer.concat([decrypted, decipher.final()]);

// Output the decrypted content as UTF-8 text
console.log("\n--- Decrypted Content ---");
console.log(decrypted.toString("utf8"));
console.log("-------------------------\n");
