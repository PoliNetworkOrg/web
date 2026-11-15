import { Background } from "@/components/background"
import { ConditionalFooter } from "@/components/conditional-footer"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header/header"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"
import type { Metadata } from "next"
import { DM_Sans, Poppins, Red_Hat_Text } from "next/font/google"
import { SITE_URL } from "@/lib/site"

const poppinsFont400 = Poppins({
  variable: "--font-poppins",
  weight: "400",
  subsets: ["latin"],
})
const dmSansFont = DM_Sans({
  variable: "--font-dm-sans",
  weight: "variable",
  subsets: ["latin"],
})
const redHatTextFont = Red_Hat_Text({
  variable: "--font-red-hat",
  weight: "variable",
  subsets: ["latin"],
})

const desc = "La community online del Politecnico di Milano, gestita dagli studenti per gli studenti"

export const metadata: Metadata = {
  // Resolves the relative image URLs: without it Next.js falls back to http://localhost:3000
  metadataBase: SITE_URL,
  title: {
    default: "PoliNetwork APS",
    template: "%s | PoliNetwork APS",
  },
  description: desc,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  // No fixed `url`: pages inherit this object, and a single URL would point every page's preview at the homepage
  openGraph: {
    siteName: "PoliNetwork",
    locale: "it_IT",
    images: [
      {
        url: "/polinetwork_meta.png",
        width: 200,
        height: 200,
        alt: "Logo di PoliNetwork",
      },
    ],
    type: "website",
  },
  // Title and description come from the Open Graph tags of each page; the image is a square logo, not a banner
  twitter: {
    card: "summary",
    images: [
      {
        url: "/polinetwork_meta.png",
        alt: "Logo di PoliNetwork",
      },
    ],
    site: "@PoliNetworkAPS",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      suppressHydrationWarning
      className={`${poppinsFont400.variable} ${redHatTextFont.variable} ${dmSansFont.variable}`}
    >
      <body className="overflow-y-scroll">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false} // TODO: enable when dark mode design is ready
          // storageKey="polinetwork_darkmode_temp" // TODO: enable when dark mode design is ready
          disableTransitionOnChange
        >
          {/* Outside the page wrapper: inside it, Chromium did not blur the content behind the fixed header's glass */}
          <Header />
          <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-start overflow-clip">
            <Background />
            {children}
            <ConditionalFooter>
              <Footer />
            </ConditionalFooter>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
