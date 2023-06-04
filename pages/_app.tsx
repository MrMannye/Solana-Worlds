import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import dynamic from "next/dynamic";

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

const ReactUIWalletModalProviderDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [

    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );
  return (
    <div>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <ReactUIWalletModalProviderDynamic>
            { /* Your app's components go here, nested within the context providers. */}
            <Component {...pageProps} />
          </ReactUIWalletModalProviderDynamic>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}
