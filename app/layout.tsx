import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Montaña — Party Games",
  description:
    "Party games by La Montaña. Pass the device, play with friends!",
  icons: {
    icon: [
      { url: "/the-impostor/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/the-impostor/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/the-impostor/logo-180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#1A1A2E] text-[#ededed]">
        {children}
      </body>
    </html>
  );
}
