import dynamic from 'next/dynamic';
import React from 'react';

const WalletMultiButtonNoSSR = dynamic(
    () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
    { ssr: false }
);

export const DynamicWalletButton = () => <WalletMultiButtonNoSSR />;


const WalletDisconnectButtonNoSSR = dynamic(
    () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletDisconnectButton),
    { ssr: false }
);

export const DynamicWalletDisconnectButton = () => <WalletDisconnectButtonNoSSR />;

