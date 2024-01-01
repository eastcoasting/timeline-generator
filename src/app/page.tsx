import Head from "next/head";
import { DropzoneDialog } from "./_components/Dropzone";
import { MapControls } from "./_components/MapControls";
import { MapWrapper } from "./_components/MapWrapper";

export default async function Home() {
  return (
    <main className="h-full w-full bg-[#010011]">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <meta
          property="og:image"
          content="https://timeline-generator.vercel.app/og.png"
        />

        <meta
          property="og:url"
          content="https://timeline-generator.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Timeline Globe Generator" />
        <meta
          name="twitter:card"
          content="https://timeline-generator.vercel.app/og.png"
        />
        <meta
          property="twitter:domain"
          content="timeline-generator.vercel.app/"
        />
        <meta
          property="twitter:url"
          content="https://timeline-generator.vercel.app/"
        />
        <meta name="twitter:title" content="Timeline Globe Generator" />
      </Head>
      <DropzoneDialog />
      <MapControls />
      <MapWrapper />
      <div className="absolute bottom-4 z-50 flex w-full cursor-pointer justify-end px-8 text-white hover:text-[#3AA99F]">
        <a href="https://www.mowen.dev" target="_blank">
          M.O.
        </a>
      </div>
    </main>
  );
}
