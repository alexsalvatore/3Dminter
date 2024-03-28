import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import WalletContext from "@/context/WalletContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <h1>
            <Link href="/">3Dchan</Link>
          </h1>
          <p>人工知能を備えたNFTクリエイター</p>
        </div>
        <div>
          <WalletContext>
            {children}
          </WalletContext>
        </div>
      </body>
    </html >
  );
}
