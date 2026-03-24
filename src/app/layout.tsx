import { HEADER_HEIGHT, Header } from "@/components/header"
import { Shape } from "@/components/shapes"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import { Poppins, Red_Hat_Text, DM_Sans } from "next/font/google"

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppinsFont400.variable} ${redHatTextFont.variable} ${dmSansFont.variable}`}
    >
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
          <div className="-z-10 pointer-events-none fixed inset-0">
            <Shape variant="big-teal" className="-translate-x-1/2 top-2 left-1/2" />
            <Shape variant="small-blue" className="-translate-x-1/2 top-2 left-1/4 translate-y-1/2" />
            <Shape variant="big-blue" className="-translate-x-1/2 -translate-y-1/2 top-0 left-1/2" />
            <Shape variant="looper" className="-translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
          </div>
          <div className="flex min-h-screen w-full flex-col items-center justify-start">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
