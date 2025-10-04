// import bip39 from 'bip39';
import crypto from "crypto"
import { Mnemonic } from 'ethers';
// import { Wallet } from 'ethers';
import { generateMnemonic } from 'bip39';
export default async function generateSeedPhrase() {
    const entropy = crypto.randomBytes(16)
    const mnemonic = generateMnemonic(); // Generates a 12-word mnemonic
    console.log("Entropy", entropy);
    console.log('Mnemonic:', mnemonic);
};

// generateSeedPhrase();
