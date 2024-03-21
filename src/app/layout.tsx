"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "@/utils/thirdweb";
import { client } from "@/utils/client";
import { RecoilRoot } from "recoil";
const inter = Inter({ subsets: ["latin"] });
import { Icon } from "@/components/icon";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider
          client={client}
        >
          <RecoilRoot>
            <div className="bg-gradient-to-br from-blue-200 to-white min-h-screen flex">
              <div className="w-full mx-auto">
                <Icon />
                {children}
              </div>
            </div>
          </RecoilRoot>
        </ThirdwebProvider>
      </body>
    </html>
  );
}

{/* <ThirdwebProvider
  chainRpc={{ [ChainId.Mainnet]: "rpc URL here!" }}
  desiredChainId={ChainId.Mainnet}
>
  <Component {...pageProps} />
</ThirdwebProvider> */}