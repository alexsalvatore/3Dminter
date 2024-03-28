export type getNftsListResponse = NftData[];

export interface NftData {
    associatedTokenAddress: string;
    mint: string;
    name: string;
    symbol: string;
}