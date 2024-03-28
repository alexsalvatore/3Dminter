'use client';

import { getNftsForWallet } from "@/api/MoralisApi";
import NftItem from "@/app/components/NftItem";
import { getNftsListResponse } from "@/models/getNftListResponse";
import { useEffect, useState } from "react";

const nfts = ({ params }: { params: { address: string } }) => {

    const [nfts, setNfts] = useState<getNftsListResponse | undefined>(undefined);

    useEffect(() => {
        if (params.address) {
            getNftsForWallet(params.address as string)
                .then(nfts => {
                    setNfts(nfts)
                });
        }
    }, [params.address])

    return (<>
        <h2>List NFTs</h2>
        <div>Found {nfts?.length} NFTS for {params.address}!</div>
        <div>
            {nfts?.map(data => <NftItem data={data}></NftItem>)}
        </div>
    </>)
}

export default nfts;