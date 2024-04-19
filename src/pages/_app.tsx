import Navbar from "@/components/layouts/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Space_Grotesk } from "next/font/google";

const myfont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300","400", "700"],
})

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
    <div className={myfont.className}>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </div>
    </SessionProvider>
  );
}

