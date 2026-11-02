import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { FiArrowUpRight, FiFacebook, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi"
import discord from "@/assets/icons/discord.svg"
import telegram from "@/assets/icons/telegram.svg"
import { CardMultipleIcons } from "@/components/card-multiple-icons"
import { Glass } from "@/components/glass"
import { MATERIALS_URL } from "@/components/header/constants"
import { CONTAINER, SECTION_TITLE } from "@/components/layout/page"
import { regulationsHref, statuteHref } from "@/components/structure/constants"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const socials: { label: string; href: string; icon: ReactNode }[] = [
  { label: "Telegram", href: "https://t.me/polinetwork", icon: <Image src={telegram} alt="" className="size-6" /> },
  { label: "Instagram", href: "https://instagram.com/polinetwork_", icon: <FiInstagram /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/polinetwork", icon: <FiLinkedin /> },
  { label: "Facebook", href: "https://www.facebook.com/PolitecnicoDiMilanoNetwork", icon: <FiFacebook /> },
  // The Discord glyph has its own padding: at 28px it matches the others
  { label: "Discord", href: "https://discord.gg/Fp7ZHcC", icon: <Image src={discord} alt="" className="size-7" /> },
  { label: "GitHub", href: "https://github.com/PoliNetworkOrg", icon: <FiGithub /> },
]

const siteLinks = [
  { title: "Gruppi", href: "/groups" },
  { title: "Matricole", href: "/matricole" },
  { title: "Progetti", href: "/projects" },
  { title: "Appunti", href: MATERIALS_URL },
  { title: "Su di noi", href: "/chi-siamo" },
  { title: "Contatti", href: "/contact" },
]

const documents = [
  { title: "Statuto", href: statuteHref },
  { title: "Regolamento interno", href: regulationsHref },
]

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
    // Inline arrow: when the label wraps, it follows the last word
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
    <footer className={cn(CONTAINER, "pt-8 pb-6 md:pt-16 md:pb-10")}>
      <Glass className="rounded-[32px] border-white/60 bg-background-blur px-4 py-10 backdrop-blur-xl sm:rounded-[36px] sm:px-10 sm:py-12 md:rounded-[48px] md:px-14 md:py-16">
        <div className="flex flex-col items-center gap-6">
          <h2 lang="en" className={cn(SECTION_TITLE, "text-center")}>
            Keep in touch!
          </h2>
          <CardMultipleIcons
            icons={socials.map(({ label, href, icon }) => (
              // 36px targets below sm keep the row whole at 320px
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full outline-none transition-colors hover:bg-white/70 focus-visible:ring-2 focus-visible:ring-blue-secondary sm:size-10"
              >
                {icon}
              </a>
            ))}
          />
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-x-16 gap-y-12 md:mt-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-6">
            <nav aria-labelledby="footer-site" className="flex flex-col gap-5">
              <h3 id="footer-site" className={HEADING}>
                Visita il sito
              </h3>
              <div className="grid grid-cols-[auto_1fr] gap-x-10 sm:gap-x-14 lg:gap-x-20">
                <ul className="typo-body-large flex flex-col gap-3 text-text-primary">
                  {siteLinks.map((link) => (
                    <li key={link.title}>
                      <FooterLink href={link.href} className="whitespace-nowrap">
                        {link.title}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
                <ul className="typo-body-medium flex flex-col gap-3 pt-0.5 text-slate-600">
                  {documents.map((document) => (
                    <li key={document.title}>
                      <FooterLink href={document.href}>{document.title}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* A lighter tile, not a second glass layer inside the panel */}
            <div className="relative flex w-full flex-col items-start gap-1 rounded-rectangles border border-white/70 bg-white/40 px-5 py-4 transition-colors hover:bg-white/70 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-blue-secondary sm:w-fit sm:flex-row sm:items-center sm:gap-8 sm:px-8 md:w-full md:flex-col md:items-start md:gap-1 lg:w-fit lg:flex-row lg:items-center lg:gap-8">
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
            </div>
          </div>

          <div className="flex flex-col gap-10 lg:col-span-5 lg:col-start-8">
            <section aria-labelledby="footer-contacts" className="flex flex-col gap-5">
              <h3 id="footer-contacts" lang="en" className={HEADING}>
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
                <Button variant="primary" size="lg" className="mt-auto" asChild>
                  <Link href="/join">Unisciti a noi!</Link>
                </Button>
              </div>
              <div className="flex flex-col items-start gap-4">
                <h3 className={HEADING}>Qualche problema?</h3>
                <Button variant="tertiary" size="lg" className="mt-auto" asChild>
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
        <div className="typo-body-small md:typo-body-medium mx-auto mt-14 flex max-w-6xl flex-col items-center gap-1 border-slate-300/70 border-t pt-6 text-slate-600 sm:flex-row sm:justify-between md:mt-16">
          <p>PoliNetwork APS 2016–{new Date().getFullYear()}</p>
          <p lang="en">All rights reserved</p>
        </div>
      </Glass>
    </footer>
  )
}
