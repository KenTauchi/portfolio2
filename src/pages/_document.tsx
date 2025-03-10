import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/ken_logo.svg" />
        <link rel="alternate icon" href="/favicon.ico" />

        {/* Primary Meta Tags */}
        <meta
          name="description"
          content="Ken Tauchi - Software Developer portfolio showcasing frontend development expertise and scalable application development."
        />

        {/* Open Graph / LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kentauchi.com/" />
        <meta property="og:title" content="Ken Tauchi | Software Developer" />
        <meta
          property="og:description"
          content="Ken Tauchi - Software Developer portfolio showcasing frontend development expertise and scalable application development."
        />
        <meta property="og:image" content="https://kentauchi.com/ken_logo.svg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://kentauchi.com/" />
        <meta name="twitter:title" content="Ken Tauchi | Software Developer" />
        <meta
          name="twitter:description"
          content="Ken Tauchi - Software Developer portfolio showcasing frontend development expertise and scalable application development."
        />
        <meta name="twitter:image" content="https://kentauchi.com/ken_logo.svg" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
