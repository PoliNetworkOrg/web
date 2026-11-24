import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router"
import { MotionConfig, motion } from "motion/react"
import { type ReactNode, useEffect } from "react"
import dmSans from "@/assets/fonts/dm-sans-latin.woff2?url"
import poppins from "@/assets/fonts/poppins-400-latin.woff2?url"
import redHatText from "@/assets/fonts/red-hat-text-latin.woff2?url"
import { Background } from "@/components/background"
import { ConditionalFooter } from "@/components/conditional-footer"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header/header"
import { NotFound } from "@/components/not-found"
import { ThemeProvider } from "@/components/theme-provider"
import { DEFAULT_DESCRIPTION, DYNAMIC_PAGE_HEADERS, missingPageMeta, pageMeta } from "@/lib/seo"
import { fetchSiteOrigin } from "@/queries/functions"
import appCss from "@/styles/globals.css?url"
import { useRoutePathname } from "@/utils/use-route-pathname"

/** The Latin files of the three typefaces: every page needs them to draw its text */
const FONTS = [poppins, dmSans, redHatText]

const LOGO = { path: "/polinetwork_meta.png", alt: "Logo di PoliNetwork" }

export const Route = createRootRoute({
  loader: () => fetchSiteOrigin(),
  // The origin never changes while the site is open: ask once
  staleTime: Number.POSITIVE_INFINITY,
  head: ({ loaderData: origin, match }) => {
    // The page whose loader found its content missing still names itself in the 404's title
    const missing = missingPageMeta(match.error)
    // Previews need an absolute URL for the image
    const logo = origin ? new URL(LOGO.path, origin).href : LOGO.path
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        ...pageMeta({ title: missing?.title, description: missing?.description ?? DEFAULT_DESCRIPTION }),
        // No `og:url`: every page inherits these tags, and a single URL would point every preview at the homepage
        { property: "og:site_name", content: "PoliNetwork" },
        { property: "og:locale", content: "it_IT" },
        { property: "og:image", content: logo },
        { property: "og:image:width", content: "200" },
        { property: "og:image:height", content: "200" },
        { property: "og:image:alt", content: LOGO.alt },
        { property: "og:type", content: "website" },
        // The image is a square logo, not a banner
        { name: "twitter:card", content: "summary" },
        { name: "twitter:site", content: "@PoliNetworkAPS" },
        { name: "twitter:image", content: logo },
        { name: "twitter:image:alt", content: LOGO.alt },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.ico" },
      ],
    }
  },
  headers: () => ({
    ...DYNAMIC_PAGE_HEADERS,
    // Announced with the response itself, before the browser has read any of the page
    Link: FONTS.map((href) => `<${href}>; rel=preload; as="font"; crossorigin=""; type="font/woff2"`).join(", "),
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        {/* First in the head: the text can't be drawn in its typefaces until these arrive */}
        {FONTS.map((href) => (
          <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="" />
        ))}
        <HeadContent />
      </head>
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
            <PageTransition>{children}</PageTransition>
            <ConditionalFooter>
              <Footer />
            </ConditionalFooter>
          </div>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}

/**
 * False until the first page has hydrated: that page is shown as it is (the server already rendered it, and hiding it
 * until the script loads would delay it), every page reached by navigating afterwards animates in.
 */
const session: { navigated: boolean } = { navigated: false }

/**
 * The page fades in whenever the first segment of the path changes (/chi-siamo → /team), not while moving inside a
 * section (the groups wizard keeps its card), so changing page reads as a change rather than as the old page scrolling.
 * Header, background and footer stay outside it.
 */
function PageTransition({ children }: { children: ReactNode }) {
  const section = useRoutePathname().split("/")[1] ?? ""
  return (
    <MotionConfig reducedMotion="user">
      <FadeIn key={section}>{children}</FadeIn>
    </MotionConfig>
  )
}

/**
 * Only the opacity is animated: a transform on the wrapper would make it the containing block of the `position: fixed`
 * elements inside it (the groups report button), and would shift the page while the router scrolls to a `#hash` target.
 */
function FadeIn({ children }: { children: ReactNode }) {
  const animate = session.navigated
  useEffect(() => {
    session.navigated = true
  }, [])

  return (
    <motion.div
      initial={animate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      // The root layout centres its children in a column: the wrapper takes their place in it
      className="flex w-full flex-col items-center"
    >
      {children}
    </motion.div>
  )
}
