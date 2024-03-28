import { cache } from 'react';

import { getNftsListResponse } from '@/models/getNftListResponse';
import { getNftMetadataResponse } from '@/models/getNftMetadaResponse';
import Moralis from 'moralis';

const MORALIS_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImRlMDNiOTljLTI3ZWEtNGVmNS04NDA4LTZiZjBkMDVkZWJkNCIsIm9yZ0lkIjoiMzczOTYzIiwidXNlcklkIjoiMzg0MzE0IiwidHlwZUlkIjoiMDMyYmFmYmItZTliZS00YzU0LTliOWQtNGJlMGFkZWZmMTQ0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDYwOTUzNDAsImV4cCI6NDg2MTg1NTM0MH0.0L6tkmPUPfG7ur0w4iRFWhBi5vn50krD2mtuyJmygFc";
const SOLANA_NETWORK = "mainnet";

const startMoralis = async () => {
    try {
        await Moralis.start({
            apiKey: MORALIS_API_KEY
        });
    } catch (error) {
        console.error(error);
    }

}
export const getNftsForWallet = cache(async (walletAddress: string) => {
    try {

        await startMoralis();

        return await Moralis.SolApi.account.getNFTs({
            "network": SOLANA_NETWORK,
            "address": walletAddress
        }).then(response => response.raw as getNftsListResponse);

    } catch (e) {
        console.error(e);
    }
});

export const getNftMetadata = cache(async (address: string) => {
    try {

        await startMoralis();

        return await Moralis.SolApi.nft.getNFTMetadata({
            "network": SOLANA_NETWORK,
            "address": address
        }).then(response => response.raw as getNftMetadataResponse);

    } catch (e) {
        console.error(e);
    }
});