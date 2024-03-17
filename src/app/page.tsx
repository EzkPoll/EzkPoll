"use client"
import { ConnectButton } from "@/utils/thirdweb";
import { injectedMetamaskProvider, metamaskWallet } from "thirdweb/wallets";
import { defineChain } from 'thirdweb';
import { chainById } from "@/utils/chains";
import { useActiveAccount, useActiveWallet, useActiveWalletConnectionStatus } from "thirdweb/react";

export default function Home() {
  
  const handleSignInWithMetaMask = async () => {
    
    const isInstalled = !!injectedMetamaskProvider();
    
    if (isInstalled) {
      const wallet = metamaskWallet(); 
      
      try {
        const account = await wallet.connect(); 
        console.log("Connected to", account);
        const mumbai = defineChain({
          id: 80001,
        });
        await wallet.connect({ chain: mumbai });
        console.log("Connected to Mumbai chain");
      } catch (e) {
        console.error("Error connecting to MetaMask", e);
      }
    } else {
      
      console.error("MetaMask not installed");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 to-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto p-8">
        <div className="flex justify-between items-center mb-10">
          <div className="text-blue-600 text-2xl font-bold">EzkPoll</div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome to EzkPoll</h1>
          <p className="text-gray-600 mb-8">Web2 Comfort, Web3 Power. Cast in Privacy, Count in Impact</p>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{`{Poll subject}`}</h2>
            <p className="text-gray-500 mb-6">{`{Poll subject}`}</p>
            <p className="text-gray-500 mb-6">met consectetur. Venenatis molestie quis neque dis. Aliquet cras purus eget quis purus. Donec pellentesque semper dolor risus habitant pretium posuere auctor vel. Scelerisque arcu non velit consectetur morbi in aliquam magna enim.</p>
            <p className="text-gray-500 mb-6">{`{Estimated poll time}`}</p>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700" onClick={handleSignInWithMetaMask}>
                <i className="fab fa-google mr-2"></i> Sign in with MetaMask
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-600 hover:bg-gray-700">
                <i className="fas fa-times mr-2"></i> Sign in with X
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-900">
                <i className="fab fa-apple mr-2"></i> Sign in with Apple
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



// export default function Home() {
//   const status = useActiveWalletConnectionStatus();
//   console.log(status);

//   const account = useActiveAccount();
//   console.log(account);

//   const wallet = useActiveWallet();
//   console.log(wallet);

//   return (
//     <div>
//       <h1> Web3 App</h1>
//       <ConnectButton
//         chain={chainById}
//       />
//       {account && (
//         <>
//           <h2>Account data:</h2>
//           <p>Address: {account.address}</p>
//           <h2>Wallet data:</h2>
//           <p>Address: {wallet?.getAccount()?.address}</p>
//           <p>Wallet type: {wallet?.metadata.name}</p>
//           <p>Chain: {wallet?.getChain()?.id}</p>
          
//         </>
//       )}
//       <h2>Connection:</h2>
//       <p>Status: {status}</p>
//     </div>
//   );
// }
