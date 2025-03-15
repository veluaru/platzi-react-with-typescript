import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div >
      <Head>
        <title>Platzi</title>
        <meta name="description" content="Generated by platzi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </main>
      <footer >
      </footer>
    </div>
  );
}
