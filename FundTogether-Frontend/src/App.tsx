import { useState } from 'react'
import bip39 from "bip39"
import generateSeedPhrase from './utils/generateSeed';

// import { generateMnemonic } from './utils/generateSeed';
// import { useState, useEffect } from 'react'
// import { initializeProvider, initializeModal  } from './components/Web3Setup';
// import { NavLink } from 'react-router';
// import "./App.css"
// import { initializeProvider, initializeModal } from './config' // previous config file
// import UniversalProvider from '@walletconnect/universal-provider'
// import { GoogleOAuthProvider } from '@react-oauth/google'
// Import everything
// import type { AppKitNetwork } from '@reown/appkit/networks'
// import type { InferredCaipNetwork } from '@reown/appkit-common'
// import UniversalProvider from '@walletconnect/universal-provider'
// import { AppKit, createAppKit } from '@reown/appkit/core'
// import { ethers } from "ethers";
// import { JsonRpcProvider } from 'ethers';
// Import just a few select items
// import { BrowserProvider, parseUnits } from "ethers";
// Import from a specific export
// import { HDNodeWallet } from "ethers/wallet";
import axios from "axios";
// import { WebSocketProvider } from "ethers";

// async function subscribeToMinedTransactions() {
//   const provider = new WebSocketProvider(
//     "wss://eth-mainnet.g.alchemy.com/v2/iLpW3EVSVUFTSXLQ9Lb3P"
//   );

//   // Send the subscription request manually
//   const subscriptionId = await provider.send("eth_subscribe", [
//     "alchemy_minedTransactions",
//     {
//       addresses: [
//         {
//           to: "0x9f3ce0ad29b767d809642a53c2bccc9a130659d7",
//           from: "0x228f108fd09450d083bb33fe0cc50ae449bc7e11",
//         },
//         { to: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
//       ],
//       includeRemoved: false,
//       hashesOnly: true,
//     },
//   ]);

//   console.log("Subscribed with ID:", subscriptionId);

//   // Handle the incoming messages manually
//   provider.websocket.onmessage = (event) => {
//     const data = JSON.parse(event.data);

//     if (
//       data.method === "eth_subscription" &&
//       data.params.subscription === subscriptionId
//     ) {
//       console.log("Mined transaction data:", data.params.result);
//     }
//   };

//   provider.websocket.onerror = (error) => {
//     console.error("WebSocket error:", error);
//   };

//   provider.websocket.close = () => {
//     console.log("WebSocket connection closed");
//   };
// }
// 1. Get projectId
// export const projectId = "b6e3aff4f6bc477c10547451afb5657a"
// if (!projectId) {
//   throw new Error('Project ID is not defined')
// }

// // you can configure your own network
// const sui: InferredCaipNetwork = {
//   id: 784,
//   chainNamespace: 'sui' as const,
//   caipNetworkId: 'sui:mainnet',
//   name: 'Sui',
//   nativeCurrency: { name: 'SUI', symbol: 'SUI', decimals: 9 },
//   rpcUrls: { default: { http: ['https://fullnode.mainnet.sui.io:443'] } }
// }

// export const networks = [sui] as [AppKitNetwork, ...AppKitNetwork[]]
// let provider: UniversalProvider | undefined
// let modal: AppKit | undefined

// export async function initializeProvider() {
//   if (!provider) {
//     provider = await UniversalProvider.init(
//       { 
//         projectId, 
//         metadata: {
//           name: "WalletConnect x Sui",
//           description: "Sui integration with WalletConnect's Universal Provider",
//           url: "http://localhost:5173/",
//           icons: ["https://avatars.githubusercontent.com/u/37784886"],
//         }
//       })
//   }
//   return provider
// }

// export function initializeModal(universalProvider?: UniversalProvider) {
//   if (!modal && universalProvider) {
//     modal = createAppKit({
//       projectId,
//       networks,
//       universalProvider: universalProvider as any, // Type cast to fix version mismatch
//       manualWCControl: true,
//       features: {
//         analytics: true // Optional - defaults to your Cloud configuration
//       }
//     })
//   }
//   return modal
// }
export default function App() {

  // const [provider, setProvider] = useState<UniversalProvider>();
  const [seedGenerate, SetSeedGenerate] = useState("")
  const [session, setSession] = useState<any>();
  const [Data, setData] = useState("")
  const [web3Data, setweb3Data] = useState("")
  const [walletOptions, setWalletOptions] = useState(false)
  // export const generateSeed = () => {

  // }

  //   useEffect(() => {
  //     const init = async () => {
  //       const dataProvider = await initializeProvider();
  //       setProvider(dataProvider);
  //       initializeModal(dataProvider);

  //       if (dataProvider.session) { // check if there is a session
  //         setSession(dataProvider.session);
  //       }
  //     }
  //     init()
  //   }, [])

  //   useEffect(() => {
  //     // Handler for when WalletConnect generates a connection URI
  //     // Opens the AppKit modal with the URI and shows the connecting view
  //     const handleDisplayUri = (uri: string) => {
  //       const modal = initializeModal(provider)
  //       modal?.open({ uri, view: 'ConnectingWalletConnectBasic' })
  //     }

  //     // Handler for when a wallet successfully connects
  //     // Updates the session state and closes the modal
  //     const handleConnect = async (session: any) => {
  //       setSession(session.session);
  //       const modal = initializeModal(provider)
  //       await modal?.close()
  //     }

  //     // Subscribe to WalletConnect events
  //     provider?.on('display_uri', handleDisplayUri) // Listen for connection URI
  //     provider?.on('connect', handleConnect) // Listen for successful connections

  //     return () => {
  //       provider?.removeListener('connect', handleConnect)
  //       provider?.removeListener('display_uri', handleDisplayUri)
  //     }
  //   }, [provider])
  // const url = `https://eth-mainnet.g.alchemy.com/v2/iLpW3EVSVUFTSXLQ9Lb3P`;
  // const payload = {
  //   jsonrpc: '2.0',
  //   id: 1,
  //   method: 'eth_blockNumber',
  //   params: []
  // };
  // axios.post(url, payload)
  //   .then(response => {
  //     console.log('The latest block number is', parseInt(response.data.result, 16));
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  //   const walletAuth = async () => {
  //     try {
  //       let signer = null;

  // let provider;
  // if ((window as any).ethereum == null) {

  //     // If MetaMask is not installed, we use the default provider,
  //     // which is backed by a variety of third-party services (such
  //     // as INFURA). They do not have private keys installed,
  //     // so they only have read-only access
  //     console.log("MetaMask not installed; using read-only defaults")
  //     provider = ethers.getDefaultProvider()

  // } else {

  // // Get write access as an account by getting the signer
  // const provider = new JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/iLpW3EVSVUFTSXLQ9Lb3P");
  // // let signer = await provider.getSigner()

  // // Get block by number
  // const blockNumber = "latest";
  // const block = await provider.getBlock(blockNumber);

  // console.log(block);
  // // console.log("alchemy Provider", provider);
  // console.log("alchemy Provider", provider);
  // console.log("Signer", signer);
  // }

  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  const fetchRandomByte = async () => {
    const response = await axios.get("/routes/index");         //request for login link
    console.log(response)
  }
  const fetchAuth = async () => {
    try {
      // const res = await axios.get("/routes/googleauth");         //request for login link
      // console.log(res)
      // setData("Request made successfully")
      window.location.href = "/routes/googleauth"                     //redirects the user to google login
    }
    catch (error) {
      setData("Failed to reach login point")
      console.log("error occured", error)
    }
  };

  const fetchweb3Auth = async () => {
    try {
      setWalletOptions(false)
      const res = await axios.get("/routes/web3Wallet");         //request for login link
      console.log(res)
      setweb3Data("Request web3 made successfully")
      // window.location.href = "/routes/googleauth"                     //redirects the user to google login
    }
    catch (error) {
      setweb3Data("Failed to reach login point")
      console.log("error occured", error)
    }
  };
  return (
    <div className='bg-r'>
      {!walletOptions ? (
        <div >
          <button type="button" onClick={fetchAuth} title="hello">
            Sign in with Google
          </button>
          <button onClick={() => window.location.href = "/wc"} type="button" title="hello">
            Go to Hello
          </button>
          <button onClick={fetchRandomByte} type="button" title="hello">
            generate Mnemonic
          </button>
          {/* <button onClick={() => generateMnemonic()} type="button" title="hello">
            generate Mnemonic
          </button> */}
          {/* <p>{Data}</p> */}
          <button onClick={() => setWalletOptions(true)} type="button" title="hello">
            Sign in with Wallet
          </button>
        </div>
      ) : (
        <div>
          <p>All Wallet options</p>
          <button type="button" onClick={() => fetchweb3Auth()} title="hello">
            {web3Data}
          </button>
        </div>
      )}
    </div>
  )
}

