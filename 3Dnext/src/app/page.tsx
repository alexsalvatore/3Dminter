'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');


const DEFAULT_SOL_ADDRESS = "9Hg3LhTUQyPKrD5PM6sqxjFQ5hgUpCfGuajnpaAUdqwQ";

const Home = () => {

  const { publicKey } = useWallet();

  return (
    <>
      <div>{publicKey?.toBase58()}</div>
      <div>Hello 3Dchan!</div>
      <div>
        <Link href={`/nfts-list/${publicKey?.toBase58() ? publicKey?.toBase58() : DEFAULT_SOL_ADDRESS}`}>List NFTs</Link> | <Link href="/paint">Create NFTs</Link>
      </div>
    </>
  );
}

export default Home;
