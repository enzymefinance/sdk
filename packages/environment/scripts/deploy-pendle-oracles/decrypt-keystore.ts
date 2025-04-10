import * as fs from "node:fs";
import { Wallet } from "ethers";
import inquirer from "inquirer";

export async function decryptKeystore({
  keystoreFilePath,
}: {
  keystoreFilePath: string;
}) {
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
