export type getNftsResponse = NftItem[];

interface NftItem {
    associatedTokenAddress: string;
    mint: string;
    name: string;
    symbol: string;
}