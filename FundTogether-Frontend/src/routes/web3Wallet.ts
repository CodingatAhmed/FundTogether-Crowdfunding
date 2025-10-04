import { Core } from "@walletconnect/core";
import { WalletKit } from "@reown/walletkit";
import express from 'express';
import cors from "cors"
// import { abstract } from "@reown/appkit/networks";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

process.env.DISABLE_GLOBAL_CORE = "true";
const core = new Core({
  projectId: process.env.VITE_REOWN_WEB3_PROJECT_ID,
});

const walletKit = await WalletKit.init({
  core, // <- pass the shared `core` instance
  metadata: {
    name: "Demo app",
    description: "Demo Client as Wallet/Peer",
    url: "http://localhost:5173",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
});
// abstract class client {
  
// }
app.get("/routes/web3Wallet", async (req,res)=> {
   res.json(walletKit.metadata);
})
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});