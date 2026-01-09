import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio Personnel",
    template: "%s | Portfolio Personnel"
  },
  description: "Portfolio personnel moderne d'un développeur web full-stack spécialisé en React, Next.js et technologies modernes",
  keywords: [
    "développeur web",
    "full-stack",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "portfolio",
    "développement web"
  ],
  authors: [{ name: "Portfolio Personnel" }],
  creator: "Portfolio Personnel",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://portfolio-personnel.vercel.app",
    title: "Portfolio Personnel",
    description: "Portfolio personnel moderne d'un développeur web full-stack",
    siteName: "Portfolio Personnel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Personnel",
    description: "Portfolio personnel moderne d'un développeur web full-stack",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${geist.variable}`}>
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}