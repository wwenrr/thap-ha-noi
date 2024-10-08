import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../assessts/style/reset.css'
import Nav from './nav'
import Head from 'next/head';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  verification: {
    google: 'UkiKfs197sYMt-PKEzqu5mirHR00iKy3wvL1sStOwXM'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
