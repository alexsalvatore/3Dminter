import { getNftMetadata } from "@/api/MoralisApi";
import { NftData } from "@/models/getNftListResponse";
import { getNftMetadataResponse } from "@/models/getNftMetadaResponse";
import { useMemo, useState } from "react";

interface NftItemProps {
    data: NftData;
}

const NftItem = ({ data }: NftItemProps) => {

    const [metadata, setMetadata] = useState<getNftMetadataResponse | undefined>(undefined);

    // Get the metadatas
    useMemo(() => {
        getNftMetadata(data.mint as string)
            .then(data => {
                setMetadata(data)
            });
    }, []);

    return (<div>
        <h3>{data.name}</h3>
        <div>Mint: {data.mint}</div>
        <div>Token address: {data.associatedTokenAddress}</div>
        {metadata && <>
            <div>{metadata.standard}</div>
            <div>{metadata.metaplex.isMutable}</div>
            <div>{metadata.metaplex.metadataUri}</div>
            <div>{metadata.metaplex.updateAuthority}</div>
            <div>💴 {metadata.metaplex.sellerFeeBasisPoints / 100} %</div>
        </>}
    </div>);
}

export default NftItem;