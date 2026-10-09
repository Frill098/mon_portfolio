import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Navigation from "@/components/layout/Navigation";
import { APP_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.site.url),
  title: {
    default: APP_CONFIG.site.name,
    template: `%s | ${APP_CONFIG.site.author}`,
  },
  description: APP_CONFIG.site.description,
  keywords: APP_CONFIG.seo.keywords,
  authors: [{ name: APP_CONFIG.site.author, url: APP_CONFIG.site.url }],
  creator: APP_CONFIG.site.author,
  publisher: APP_CONFIG.site.author,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: APP_CONFIG.site.url,
    title: APP_CONFIG.site.name,
    description: APP_CONFIG.site.description,
    siteName: APP_CONFIG.site.name,
    images: [
      {
        url: APP_CONFIG.site.ogImage,
        width: 1200,
        height: 630,
        alt: APP_CONFIG.site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_CONFIG.site.name,
    description: APP_CONFIG.site.description,
    images: [APP_CONFIG.site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg" }],
  },
  alternates: {
    canonical: APP_CONFIG.site.url,
    languages: { "fr-FR": APP_CONFIG.site.url },
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#09090b" />
        <meta name="msapplication-TileColor" content="#09090b" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
