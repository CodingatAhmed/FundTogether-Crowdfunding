import express from 'express';
import cors from 'cors';
import axios from "axios"
import crypto from "crypto"
import bip39 from "bip39"
import * as ethers from "ethers"
import { randomBytes } from 'ethers';
import { Wallet } from 'ethers';
import { JsonRpcProvider } from 'ethers';
import { Transaction } from 'ethers';
// import Sign
// import { computeSeed } from "ethers"
// import /HDNo
// import fromSeed from bip32
// import
// import {fromSeed} from "bip32" 
// import bip32 from "bip32"
import * as ecc from 'tiny-secp256k1';
import { BIP32Factory } from 'bip32';
// import bip32 from ""
// import { generateMnemonic } from 'bip39';
// import axios from 'axios';


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
app.get("/routes/index", async (req, res) => {
  const data = {
    jsonrpc: '2.0',
    method: 'eth_getAccount',
    params: [
      '0x33e2CFC94477D5baf7FE24f9e97f22ae24536cdB',
      'latest'
    ],
    id: 1,
  };
  // difference between mnemonic and phrase
  // mnemonic object gives entropy, password,wordlist language(english) while phrase object only gives phrase
  const bip32 = BIP32Factory(ecc)
  // Generate 128-bit entropy (16 bytes → 12-word mnemonic)
  const EtherEntropy = randomBytes(16)
  // Convert entropy into a mnemonic phrase (human-readable backup)
  const EtherEntropyToMnemonic = ethers.Mnemonic.fromEntropy(EtherEntropy)
  // Convert mnemonic to a 512-bit seed 
  const seed = EtherEntropyToMnemonic.computeSeed()
  const root = ethers.HDNodeWallet.fromSeed(seed)
  const child = root.derivePath("m/44'/60'/0'/0/0")
  const APIKey = process.env.ALCHEMY_API_KEY
  // console.log("the path", child);
  const TestNetprovider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/iLpW3EVSVUFTSXLQ9Lb3P`)
  // const ir
  // const originalWallet = new Wallet()
  const newWallet = new Wallet("0x13cd8abb829e7dff31d649efdae0c0eb65c98f9954bbc91ce7ef6b476d75625f", TestNetprovider)
  const balance = await TestNetprovider.getBalance("0x33e2CFC94477D5baf7FE24f9e97f22ae24536cdB")
  const newBal = await TestNetprovider.getBalance("0xE44D312d2a7b69620D0E4AFBCAB69282f3Ab278D")
  // const newBalance = await TestNetprovider.getBalance("0x29F8F6F8c2613fAcAfEe45D372461A6D33911485")
  console.log("the balance nwew", ethers.formatEther(newBal));
  console.log("original acc balance", ethers.formatEther(balance));

  const transaction = {
    to: "0x33e2CFC94477D5baf7FE24f9e97f22ae24536cdB",
    value: ethers.parseEther("0.01"),
    gasLimit: 21000,
    maxPriorityFeePerGas: ethers.parseUnits("5", "gwei"),
    maxFeePerGas: ethers.parseUnits("20", "gwei"),
    type: 2,
  }
  console.log("the child", child);
  // eth_getAccount (POST /:apiKey)
  const response = await fetch("https://eth-sepolia.g.alchemy.com/v2/iLpW3EVSVUFTSXLQ9Lb3P", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "jsonrpc": "2.0",
      "method": "eth_getAccount",
      "params": [
        "0xE44D312d2a7b69620D0E4AFBCAB69282f3Ab278D",
        "latest"
      ],
      "id": 1
    }),
  });
  const body = await response.json();
  console.log("get accounts", body);
  const hexBalance = body.result.balance;
  console.log(hexBalance);

  const bigInt = BigInt(hexBalance)
  // const Tx = await newWallet.sendTransaction(transaction)
  // console.log("Sent transaction", Tx.hash)
  // const receipt = await Tx.wait()
  // console.log("Transaction confirmed", receipt)
  // 1. Convert the hex string to a BigNumber (Wei)
  // ethers handles the hex-to-decimal conversion automatically.
  // ethers.getBigInt
  // const weiBalance = ethers.getBigInt(hexBalance);

  // 2. Format the BigNumber (Wei) to Ether (ETH)
  // formatEther divides by 10^18 and returns a string for precision.
  // console.log(bigInt);
  const ethBalance = ethers.formatEther(bigInt);

  // console.log(`Wei Balance: ${weiBalance.toString()}`);
  console.log(`ETH Balance: ${ethBalance}`)

  // const Signer = await TestNetprovider.getSigner()
  // const signer = await TestNetprovider.getSigner()
  // transaction.from = "0x33e2CFC94477D5baf7FE24f9e97f22ae24536cdB"
  // const transaction = await signer.sendTransaction({
  //   to: '0x29F8F6F8c2613fAcAfEe45D372461A6D33911485',
  //   value: parseEther("0.01")
  // })
  // const receipt = transaction.wait()
  // console.log(transaction.toJSON(), "transaction")
  //  address: '0x29F8F6F8c2613fAcAfEe45D372461A6D33911485'
  console.log("public key", child.publicKey);
  console.log("The address", child.address);
  // the child HDNodeWallet {
  //   provider: null,
  //   address: '0x33e2CFC94477D5baf7FE24f9e97f22ae24536cdB',
  //   publicKey: '0x02c98ece5cdef2359c89bc7cb3f9f327fd2b4edbc56d77268a670827762a57211c',
  //   fingerprint: '0x2b4324e2',
  //   parentFingerprint: '0xc039f71a',
  //   mnemonic: null,
  //   chainCode: '0x22e2e6b5d7d045ec1a45dcf6ee3090ea92fa19a91ac236f33c1579f0532aa4e2',
  //   path: "m/44'/60'/0'/0/0",
  //   index: 0,
  //   depth: 5
  // }
  console.log("private key", child.privateKey);
  console.log("Wallet", newWallet);
  // 0x5dc6E8Ce11ba0E43D4275aeB7aa0030524dDfff7
  // const root = bip32.fromSeed(seed)
  // m/44'/60'/0'/0/0 → Ethereum first account
  // m/44'/0'/0'/0/0 → Bitcoin first account
  // const derive = root.derivePath("m/44'/60'/0'/0/0")
  res.json({ EtherEntropy: EtherEntropy, EtherEntropyToMnemonic: EtherEntropyToMnemonic, seed: seed, root: root, balance: ethers.formatEther(balance), child: child })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
// app.post('/auth/callback', async (req:any, res:any) => {
//   const { code } = req.body;
//   if (!code) {
//     return res.status(400).json({ error: 'Missing authorization code' });
//   }

//   const payload = new URLSearchParams({
//     code,
//     client_id: process.env.VITE_GOOGLE_CLIENT_ID!,
//     client_secret: process.env.VITE_GOOGLE_CLIENT_SECRET!,
//     redirect_uri: process.env.VITE_GOOGLE_REDIRECT_URI!,
//     grant_type: 'authorization_code',
//     code_verifier: req.body.code_verifier,
//   });

//   try {
//     const response = await axios.post('https://oauth2.googleapis.com/token', payload, {
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     });

//     const { id_token, access_token } = response.data;

//     // Optionally decode id_token to get user info (or fetch using access_token)

//     res.json({
//       message: 'Authenticated!',
//       id_token,
//       access_token,
//     });
//   } catch (error: any) {
//     console.error(error.response?.data || error.message);
//     res.status(500).json({ error: 'Token exchange failed' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
