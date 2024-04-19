import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Space_Grotesk } from "next/font/google";

const myfont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300","400", "700"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={myfont.className}>
      <Component {...pageProps} />
    </div>
  );
}

