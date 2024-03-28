export interface getNftMetadataResponse {
    mint: string;
    standard: string;
    name: string;
    symbol: string;
    metaplex: {
        metadataUri: any;
        masterEdition: any;
        isMutable: boolean;
        primarySaleHappened: number;
        sellerFeeBasisPoints: number;
        updateAuthority: string;
    }
}