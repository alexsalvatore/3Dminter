import { getNftsListResponse } from '@/models/getNftListResponse';
import Moralis from 'moralis';

const MORALIS_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImRlMDNiOTljLTI3ZWEtNGVmNS04NDA4LTZiZjBkMDVkZWJkNCIsIm9yZ0lkIjoiMzczOTYzIiwidXNlcklkIjoiMzg0MzE0IiwidHlwZUlkIjoiMDMyYmFmYmItZTliZS00YzU0LTliOWQtNGJlMGFkZWZmMTQ0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDYwOTUzNDAsImV4cCI6NDg2MTg1NTM0MH0.0L6tkmPUPfG7ur0w4iRFWhBi5vn50krD2mtuyJmygFc";

export const getNftsForWallet = async (walletAddress: string) => {
    try {

        await Moralis.start({
            apiKey: MORALIS_API_KEY
        });

        return await Moralis.SolApi.account.getNFTs({
            "network": "mainnet",
            "address": walletAddress
        }).then(response => response.raw as getNftsListResponse);

    } catch (e) {
        console.error(e);
    }
};

export const getNftMetadata = async (address: string) => {
    try {

        await Moralis.start({
            apiKey: MORALIS_API_KEY
        });

        return await Moralis.SolApi.nft.getNFTMetadata({
            "network": "mainnet",
            "address": address
        }).then(response => response.raw as getNftMetadataResponse);

    } catch (e) {
        console.error(e);
    }
};