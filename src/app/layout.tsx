import type { Metadata } from "next";
import { Outfit, Josefin_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ravindra - Portfolio",
  description: "Full Stack Developer Portfolio",
};

import ScrollToTop from "@/components/ScrollToTop";
import SmoothScrollProvider from "@/components/LenisProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${outfit.className} ${outfit.variable} ${josefin.variable} antialiased`}
      >
        <SmoothScrollProvider>
          {children}
          <ScrollToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
