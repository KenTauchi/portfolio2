import Head from "next/head";
import { BentoLayout } from "@/components/bento/bento-layout";

const title = "Ken Tauchi — Fullstack Engineer";
const description =
  "Ken Tauchi is a fullstack engineer with a frontend focus, building fast React and React Native applications with AI-augmented delivery. Portfolio, shipped work, and references.";

export default function Home() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://www.kentauchi.com/og/profile.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://www.kentauchi.com/og/profile.jpg" />
      </Head>

      <BentoLayout />
    </>
  );
}
