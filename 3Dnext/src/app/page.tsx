'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';

const Home = () => {

  const { publicKey } = useWallet();

  return (
    <>
      <div>{publicKey?.toBase58()}</div>
      <div>Hello 3Dchan!</div>
      <div>
        <Link href={`/nfts-list/${publicKey?.toBase58()}`}>List NFTs</Link> | <Link href="/paint">Create NFTs</Link>
      </div>
    </>
  );
}

export default Home;
