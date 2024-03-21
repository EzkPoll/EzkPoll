"use client"
import { Icon } from "@/components/icon";
import { injectedMetamaskProvider, metamaskWallet } from "thirdweb/wallets";
import { defineChain } from 'thirdweb';
import { useActiveAccount, useActiveWallet, useActiveWalletConnectionStatus } from "thirdweb/react";
import HomePage from "@/components/page_home";

export default function Home() {

    const address = useActiveAccount();

    const showCurrentAddress = async () => {
        console.log("address", address)
    };

    const handleSignInWithMetaMask = async () => {

        console.log("Sign in with MetaMask clicked");
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
            <div className="w-full mx-auto">
                <Icon />
                <HomePage/>
            </div>
        </div>
    );
}
