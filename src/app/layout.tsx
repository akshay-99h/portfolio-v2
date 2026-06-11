import type { Metadata, Viewport } from "next";

import { SiteAudioController } from "@/components/layout/site-audio-controller";
import { PageTransitionProvider } from "@/components/providers/page-transition-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <PageTransitionProvider>{children}</PageTransitionProvider>
          <SiteAudioController />
        </ThemeProvider>
      </body>
    </html>
  );
}
