import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  WalletModalProvider
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

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
          <WalletModalProvider>
            { /* Your app's components go here, nested within the context providers. */}
            <Component {...pageProps} />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}
