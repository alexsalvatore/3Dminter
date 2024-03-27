import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div>Hello 3Dchan!</div>
      <div>
        <Link href="/nfts">List NFTs</Link> |
        <Link href="/paint">Create NFTs</Link>
      </div>
    </>
  );
}
