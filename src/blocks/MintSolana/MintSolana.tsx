import { useWallet } from "@solana/wallet-adapter-react";
import SolanaWalletButton from "../../elements/SolanaWalletButton/SolanaWalletButton";
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { clusterApiUrl, Connection, SystemProgram, Keypair, TransactionMessage, VersionedTransaction } from '@solana/web3.js';
import { useState } from "react";

const MintSolana = () => {

    const { publicKey, sendTransaction, connected, signTransaction } = useWallet();
    const [error, setError] = useState('');

    const createMintAddress = async () => {

        if (!connected || !publicKey || !signTransaction) {
            console.log('Wallet is not connected');
            return;
        }

        const connection = new Connection(clusterApiUrl(import.meta.env.VITE_SOL_NET), 'confirmed');
        const MINT_SIZE = 82;

        // Get the minimum balance required for the mint account to be rent-exempt
        const rentExempt = await connection.getMinimumBalanceForRentExemption(MINT_SIZE);
        // create array of instructions
        const instructions = [
            SystemProgram.createAccount({
                fromPubkey: publicKey,
                newAccountPubkey: Keypair.generate().publicKey,  // Create a new keypair for the mint account
                lamports: rentExempt,
                space: MINT_SIZE,
                programId: TOKEN_PROGRAM_ID,
            })
        ];

        const {
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();


        // create v0 compatible message
        const messageV0 = new TransactionMessage({
            payerKey: publicKey,
            recentBlockhash: blockhash,
            instructions,
        }).compileToV0Message();

        // make a versioned transaction
        const transactionV0 = new VersionedTransaction(messageV0);

        try {
            const signature = await sendTransaction(transactionV0, connection)
            await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
            console.log("TX CONFIRMED!", signature);
        } catch (error: any) {
            setError(error);
            console.error(error);
        };
    };


    return <>
        <div>Mint on Solana</div>
        <SolanaWalletButton></SolanaWalletButton>
        {connected && (
            <>
                {error && <div>Error! {error.toString()}</div>}
                <div><button onClick={createMintAddress}>Create Mint Address</button></div>
            </>
        )}
    </>;
}

export default MintSolana;