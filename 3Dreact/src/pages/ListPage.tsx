import { useWallet } from "@solana/wallet-adapter-react";
import SolanaWalletButton from "../elements/SolanaWalletButton/SolanaWalletButton";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { useEffect, useState } from "react";

const ListPage = () => {

    const { publicKey } = useWallet();
    const [nftsList, setNftsList] = useState<any[] | null>(null);

    // Initialize connection
    const cluster = "mainnet-beta"; // Change this accordingly
    const solanaConnection = new Connection(clusterApiUrl(cluster));

    useEffect(() => {
        if (publicKey) {
            fetchNFTs(publicKey);
        }
    }, [publicKey]);

    const fetchNFTs = async (publicKeyToFetch: PublicKey) => {

        const nfts = [];
        try {
            // This is a simplified example. Depending on your use case, you might need additional filters or parameters.
            const ownedNFTs = await solanaConnection.getParsedTokenAccountsByOwner(publicKeyToFetch, {
                programId: new PublicKey("31fgM5ZVkDkwwYCWHKXKFWbw2aDXjDpYgj7pjGU46Uhk"),
            });
            console.log("ownedNFTs: ", ownedNFTs);
            for (const nft of ownedNFTs.value) {
                // Filter for NFTs, you might need additional checks based on your criteria
                if (nft.account.data.parsed.info.tokenAmount.uiAmount === 1) {
                    nfts.push(nft.account.data.parsed.info);
                }
            }

            setNftsList(nfts);

        } catch (error) {
            console.error("Error fetching NFTs: ", error);
        }
        return nfts;
    };

    return (
        <>
            <h2>List NFTs</h2>
            <div>
                {publicKey ? <div> How have {nftsList?.length ? nftsList?.length : "0"} NFTs</div> :
                    <SolanaWalletButton></SolanaWalletButton>}
            </div>
        </>
    );
}

export default ListPage;