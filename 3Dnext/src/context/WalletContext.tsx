'use client';

import { DynamicWalletButton, DynamicWalletDisconnectButton } from "@/app/components/DynamicWalletButton";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

interface WalletProviderProps {
    children: React.ReactNode;
}


const WalletContext = ({ children }: WalletProviderProps) => {
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(() =>
        [new UnsafeBurnerWalletAdapter()]
        , [network]);

    return (<ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                <DynamicWalletButton></DynamicWalletButton>
                <DynamicWalletDisconnectButton></DynamicWalletDisconnectButton>
                {children}
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>);
}

export default WalletContext;