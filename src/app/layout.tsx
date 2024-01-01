import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Timeline Generator",
  description: "Upload google timeline data and view your travel over time.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    images: {
      url: "https://timeline-generator.vercel.app/og.png",
    },
  },
};

// content="https://timeline-generator.vercel.app/og.png"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
