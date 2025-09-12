import type { Metadata } from "next";
import { Nunito, PT_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { ViewTransitions } from "next-view-transitions";
import { siteConfig } from "@/config/site";
import { Toaster } from "sonner";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ["Next.js", "React", "Tailwind CSS", "Components", "avalynndev"],
  authors: [
    {
      name: "avalynndev",
      url: "https://github.com/avalynndev",
    },
  ],
  creator: "avalynndev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image.png`],
    creator: "@avalynndev",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/manifest.json`,
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="apple-mobile-web-app-title" content="Ignitia" />
          <meta property="og:image" content="opengraph-image.png" />
          <meta name="twitter:image" content="opengraph-image.png" />
        </head>
        <body
          className={`${nunito.variable} ${ptSans.variable} antialiased relative bg-background text-foreground`}
        >
          <Toaster />
          <Providers>
            <Header />
            <main
              id="skip-nav"
              className="mx-auto mb-16 w-full flex-1 px-4 py-12 sm:px-8"
            >
              {children}
            </main>
            <Footer />
            <Image
              width={1512}
              height={550}
              className="absolute left-1/2 top-0 -z-10 -translate-x-1/2"
              src="/gradient-background-top.png"
              alt=""
              role="hello"
              priority
            />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
