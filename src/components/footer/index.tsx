import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { FiArrowUpRight, FiFacebook, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi"
import discord from "@/assets/icons/discord.svg"
import telegram from "@/assets/icons/telegram.svg"
import { CardMultipleIcons } from "@/components/card-multiple-icons"
import { Glass } from "@/components/glass"
import { CONTAINER } from "@/components/layout/page"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/*
  Built on the designers' footer exploration used across the Figma pages ("footer-francesca", 593:2123): the
  "Keep in touch!" header of the official component (5107:12889), then a site map with the 5x1000 card, the contact
  addresses and the two calls to action. Only content that exists is shown: no TikTok, no language selector (the site
  has no translations), and the association's documents instead of policy pages that don't exist yet.
*/

const socials: { label: string; href: string; icon: ReactNode }[] = [
  { label: "Telegram", href: "https://t.me/polinetwork", icon: <Image src={telegram} alt="" className="size-6" /> },
  { label: "Instagram", href: "https://instagram.com/polinetwork_", icon: <FiInstagram /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/polinetwork", icon: <FiLinkedin /> },
  { label: "Facebook", href: "https://www.facebook.com/PolitecnicoDiMilanoNetwork", icon: <FiFacebook /> },
  // The Discord glyph has a 34px canvas with its own padding: at 28px it matches the optical size of the others
  { label: "Discord", href: "https://discord.gg/Fp7ZHcC", icon: <Image src={discord} alt="" className="size-7" /> },
  { label: "GitHub", href: "https://github.com/PoliNetworkOrg", icon: <FiGithub /> },
]

const siteLinks = [
  { title: "Gruppi", href: "/groups" },
  { title: "Matricole", href: "/matricole" },
  { title: "Progetti", href: "/projects" },
  { title: "Appunti", href: "https://polinetwork.org/it/materials/view/" },
  { title: "Su di noi", href: "/chi-siamo" },
  { title: "Contatti", href: "/contact" },
]

// Already linked from /join. They stand in for "Terms", "Privacy" and "Cookie policy", which pointed to "#"
const documents = [
  { title: "Statuto", href: "https://github.com/PoliNetworkOrg/Statuto/blob/main/full.pdf" },
  {
    title: "Regolamento interno",
    href: "https://github.com/PoliNetworkOrg/RegolamentoInterno/blob/main/RaccoltaRegolamentiInterni.pdf",
  },
]

// The addresses of the /contact page, with the Figma labels
const emails = [
  { label: "Per collaborazioni ed eventi", email: "events@polinetwork.org" },
  { label: "Per domande e richieste", email: "info@polinetwork.org" },
]

const HEADING = "typo-headline-extrasmall text-text-primary"
const LINK =
  "rounded-sm outline-none decoration-1 decoration-blue-secondary underline-offset-4 transition-colors hover:text-blue-secondary hover:underline focus-visible:underline focus-visible:ring-2 focus-visible:ring-blue-secondary focus-visible:ring-offset-2"

function FooterLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const external = !href.startsWith("/")
  return external ? (
    // Inline arrow: when the label wraps, it follows the last word instead of floating beside the block
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn(LINK, className)}>
      {children}
      <FiArrowUpRight className="ml-1 inline size-4 align-[-0.125em]" aria-hidden />
    </a>
  ) : (
    <Link href={href} className={cn(LINK, className)}>
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className={cn(CONTAINER, "pt-8 pb-8 md:pt-16")}>
      <div className="flex flex-col items-center gap-6">
        {/* Grey gradient like the section titles: the style guide keeps the blue one off text over the background */}
        <h2 className="typo-display-small md:typo-display-medium bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-center text-transparent">
          Keep in touch!
        </h2>
        <CardMultipleIcons
          className="h-auto [&>div]:flex-nowrap [&>div]:justify-center [&>div]:gap-0.5 [&>div]:px-2 [&>div]:py-1 sm:[&>div]:gap-3 sm:[&>div]:px-5"
          icons={socials.map(({ label, href, icon }) => (
            // 40px targets around 24px glyphs: the bare icons were 24px, below the touch-target minimum
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex size-10 items-center justify-center rounded-full outline-none transition-colors hover:bg-white/70 focus-visible:ring-2 focus-visible:ring-blue-secondary"
            >
              {icon}
            </a>
          ))}
        />
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-x-16 gap-y-12 md:mt-24 md:grid-cols-2 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-6">
          <nav aria-labelledby="footer-site" className="flex flex-col gap-5">
            <h3 id="footer-site" className={HEADING}>
              Visita il sito
            </h3>
            <div className="grid grid-cols-[auto_1fr] gap-x-10 sm:gap-x-14 lg:gap-x-20">
              <ul className="typo-body-large flex flex-col gap-3 text-text-primary">
                {siteLinks.map((link) => (
                  <li key={link.title}>
                    <FooterLink href={link.href}>{link.title}</FooterLink>
                  </li>
                ))}
              </ul>
              {/* Secondary column, as in Figma: smaller and grey */}
              <ul className="typo-body-medium flex flex-col gap-3 pt-0.5 text-slate-600">
                {documents.map((document) => (
                  <li key={document.title}>
                    <FooterLink href={document.href} className="whitespace-nowrap">
                      {document.title}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* The 5x1000 card of the Figma footer: it leads to the explanation on Su di noi */}
          <Glass className="relative flex w-full items-center gap-4 rounded-rectangles border-white/50 bg-background-blur px-5 py-4 transition-colors hover:bg-white/60 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-blue-secondary sm:w-fit sm:gap-8 sm:px-8">
            <p className="typo-headline-large sm:typo-display-small bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent">
              5x1000
            </p>
            <div className="flex flex-col gap-0.5">
              <Link
                href="/chi-siamo#sostienici"
                className="typo-title-large text-text-primary outline-none after:absolute after:inset-0 after:content-['']"
              >
                Sostienici!
              </Link>
              <p className="typo-body-medium whitespace-nowrap text-slate-600 tabular-nums">C.F. 97927490157</p>
            </div>
          </Glass>
        </div>

        <div className="flex flex-col gap-10 lg:col-span-5 lg:col-start-8">
          <section aria-labelledby="footer-contacts" className="flex flex-col gap-5">
            <h3 id="footer-contacts" className={HEADING}>
              Talk with us
            </h3>
            <dl className="flex flex-col gap-4">
              {emails.map(({ label, email }) => (
                <div key={email} className="flex flex-col gap-0.5">
                  <dt className="typo-body-medium text-slate-600">{label}</dt>
                  <dd className="typo-body-large text-text-primary">
                    <a href={`mailto:${email}`} className={LINK}>
                      {email}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
            <div className="flex flex-col items-start gap-4">
              <h3 className={HEADING}>Sei interessato?</h3>
              <Button variant="primary" size="lg" asChild>
                <Link href="/join">Unisciti a noi!</Link>
              </Button>
            </div>
            <div className="flex flex-col items-start gap-4">
              <h3 className={HEADING}>Qualche problema?</h3>
              <Button variant="tertiary" size="lg" asChild>
                <a href="https://github.com/PoliNetworkOrg/web/issues/new" target="_blank" rel="noopener noreferrer">
                  <FiGithub />
                  Segnalalo
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* slate-600 rather than text-secondary (slate-500, 4.3:1 on the page background) so the small print passes AA */}
      <div className="typo-body-small md:typo-body-medium mx-auto mt-16 flex max-w-6xl flex-col items-center gap-1 border-slate-300/70 border-t pt-6 text-slate-600 sm:flex-row sm:justify-between md:mt-24">
        <p id="copyright">PoliNetwork APS 2016-{new Date().getFullYear()}</p>
        <p>All rights reserved</p>
      </div>
    </footer>
  )
}
