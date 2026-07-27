import "@/styles/globals.css";
import "@/styles/showcase.css";
import type { AppProps } from "next/app";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const jet = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jet",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${display.variable} ${jet.variable} font-display`}>
      <Component {...pageProps} />
    </div>
  );
}
