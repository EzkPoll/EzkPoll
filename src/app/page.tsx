"use client"
import { ConnectButton } from "@/app/thirdweb";
import { chainById } from "@/app/chains";
import { useActiveAccount, useActiveWallet, useActiveWalletConnectionStatus } from "thirdweb/react";


export default function Home() {
  const status = useActiveWalletConnectionStatus();
  console.log(status);

  const account = useActiveAccount();
  console.log(account);

  const wallet = useActiveWallet();
  console.log(wallet);

  return (
    <div>
      <h1> Web3 App</h1>
      <ConnectButton
        chain={chainById}
      />
      {account && (
        <>
          <h2>Account data:</h2>
          <p>Address: {account.address}</p>
          <h2>Wallet data:</h2>
          <p>Address: {wallet?.getAccount()?.address}</p>
          <p>Wallet type: {wallet?.metadata.name}</p>
          <p>Chain: {wallet?.getChain()?.id}</p>
          
        </>
      )}
      <h2>Connection:</h2>
      <p>Status: {status}</p>
    </div>
  );
}
