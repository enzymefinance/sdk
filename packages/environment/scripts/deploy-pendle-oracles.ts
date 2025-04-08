import * as fs from "node:fs";
import * as path from "node:path";
import arg, { type Result } from "arg";
import { Wallet } from "ethers";
import inquirer from "inquirer";

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

  const { password } = await inquirer.prompt([
    {
      type: "password",
      name: "password",
      message: "Enter your password:",
      mask: "",
    },
  ]);

  const json = fs.readFileSync(keystoreFilePath, "utf8");
  const wallet = await Wallet.fromEncryptedJson(json, password);

  return wallet;
}

decryptKeystore().catch((error) => {
  console.error("An unexpected error occurred in the main execution:", error);
  process.exit(1);
});
