'use client';

import { DynamicWalletButton, DynamicWalletDisconnectButton } from "@/app/components/DynamicWalletButton";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider, useWallet } from "@solana/wallet-adapter-react";
import { WalletModalProvider, } from "@solana/wallet-adapter-react-ui";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

interface WalletProviderProps {
    children: React.ReactNode;
}


const WalletContext = ({ children }: WalletProviderProps) => {
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const { publicKey } = useWallet();
    const wallets = useMemo(() =>
        [new UnsafeBurnerWalletAdapter()]
        , [network]);

    return (<ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                {publicKey ?
                    <DynamicWalletDisconnectButton></DynamicWalletDisconnectButton> :
                    <DynamicWalletButton></DynamicWalletButton>
                }
                {children}
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>);
}

export default WalletContext;