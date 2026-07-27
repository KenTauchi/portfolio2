import "@/styles/globals.css";
import "@/styles/showcase.css";
import type { AppProps } from "next/app";
import { Space_Grotesk, Public_Sans, Space_Mono, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const body = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

// Used only by the showcase route (/v3), which sets every label in JetBrains Mono.
const jet = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jet",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} ${jet.variable} font-sans`}>
      <MotionConfig reducedMotion="user">
        <Component {...pageProps} />
      </MotionConfig>
    </div>
  );
}
