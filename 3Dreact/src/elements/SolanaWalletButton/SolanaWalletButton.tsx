import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const SolanaWalletButton = () => {

    const { publicKey, connected } = useWallet();

    return (
        <div>
            {connected ? (
                <div>
                    {publicKey && <div>PublicKey: {publicKey.toString()}</div>}
                    <WalletMultiButton />
                </div>
            ) : (
                <WalletMultiButton />
            )}
        </div>
    );
}

export default SolanaWalletButton;