import { Footer } from "@/components/footer"
import { HEADER_HEIGHT, Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"

const desc = "The online community of Politecnico di Milano brought to you by its students"

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
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable}`}>
      <body
        className="overflow-y-scroll"
        style={
          {
            "--header-height": HEADER_HEIGHT,
          } as React.CSSProperties
        }
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false} // TODO: enable when dark mode design is ready
          // storageKey="polinetwork_darkmode_temp" // TODO: enable when dark mode design is ready
          disableTransitionOnChange
        >
          <div className="flex min-h-screen w-full flex-col items-center justify-start">
            <Header />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
