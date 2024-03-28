'use client';

import { getNftsForWallet } from "@/api/MoralisApi";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";

const nfts = () => {

    const { publicKey } = useWallet();

    useEffect(() => {
        if (publicKey) {
            getNftsForWallet(publicKey?.toBase58());
        }
    }, [publicKey])

    return (<>
        <h2>List NFTs</h2>
        <div></div>
    </>)
}

export default nfts;