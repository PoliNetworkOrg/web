import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";

import Image from "next/image";
import { GlobeIcon } from "lucide-react";
import Link from "next/link";
import { ThemeButton } from "@/components/theme-button";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

const desc =
  "The online community of Politecnico di Milano brought to you by its students";

export const metadata: Metadata = {
  title: {
    default: "PoliNetwork APS",
    template: "%s | PoliNetwork APS",
  },
  description: desc,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "PoliNetwork APS - {{ page.title }}",
    description: desc,
    url: "https://polinetwork.org/",
    siteName: "PoliNetwork",
    images: [
      {
        url: "/polinetwork_meta.png",
        width: 200,
        height: 200,
        alt: desc,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PoliNetwork/polinetwork.org",
    description: desc,
    images: [
      {
        url: "/polinetwork_meta.png",
        alt: desc,
      },
    ],
    site: "@PoliNetworkAPS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable}`}
    >
      <body className="overflow-y-scroll">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="polinetwork_darkmode"
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="bg-white shadow-md dark:bg-gray-800">
              <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://raw.githubusercontent.com/PoliNetworkOrg/Logo/refs/heads/master/Logo.svg"
                    alt="PoliNetwork Logo"
                    width={40}
                    height={40}
                  />
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    PoliNetwork
                  </h1>
                </div>
                <nav className="flex items-center space-x-4">
                  <Link
                    href="/admin"
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                  >
                    Admin
                  </Link>
                  <ThemeButton />
                  <button className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
                    <GlobeIcon className="h-6 w-6" />
                  </button>
                </nav>
              </div>
            </header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
