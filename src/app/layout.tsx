import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Newsreader } from "next/font/google";
import localFont from "next/font/local";

import { LenisProvider } from "@/components/providers/lenis-provider";
import { PageTransitionProvider } from "@/components/providers/page-transition-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { BASICS } from "@/lib/data/resume";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  authors: [{ name: BASICS.name, url: `${SITE_URL}/about` }],
  creator: BASICS.name,
  publisher: SITE_NAME,
  category: "technology",
  keywords: [
    "full-stack developer portfolio",
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "mobile app developer",
    "backend systems",
    "software engineer portfolio",
    "web developer New Delhi",
    "software developer India",
    "Akxost",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    site: "@akshay_99h",
    creator: "@akshay_99h",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/** Person + WebSite graph for a personal portfolio. */
const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: BASICS.name,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      email: BASICS.contact.email,
      jobTitle: BASICS.title,
      homeLocation: {
        "@type": "Place",
        name: BASICS.location,
      },
      sameAs: [
        BASICS.contact.github,
        BASICS.contact.linkedin,
        BASICS.contact.twitter,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      about: { "@id": `${SITE_URL}/#person` },
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
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
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD built from local data
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(PERSON_JSON_LD),
          }}
        />
        <ThemeProvider>
          <LenisProvider>
            <PageTransitionProvider>{children}</PageTransitionProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
