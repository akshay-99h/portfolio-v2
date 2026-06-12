import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Newsreader } from "next/font/google";
import localFont from "next/font/local";

import { LenisProvider } from "@/components/providers/lenis-provider";
import { PageTransitionProvider } from "@/components/providers/page-transition-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";

const switzer = localFont({
  src: "../../public/fonts/switzer-variable.woff2",
  variable: "--font-switzer",
  weight: "100 900",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Akxost Studio",
    template: "%s | Akxost Studio",
  },
  description:
    "Akxost Studio is a product engineering agency delivering strategy, full-stack web and mobile builds, backend systems, and launch support.",
  metadataBase: new URL("https://akxost.com"),
  openGraph: {
    title: "Akxost Studio",
    description:
      "Product engineering agency for web, mobile, backend systems, and launch support.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akxost Studio",
    description:
      "Product engineering agency for web, mobile, backend systems, and launch support.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#060606" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${switzer.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider>
          <LenisProvider>
            <PageTransitionProvider>{children}</PageTransitionProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
