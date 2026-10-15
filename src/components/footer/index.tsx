import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { FiChevronDown, FiFacebook, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi"
import discord from "@/assets/icons/discord.svg"
import telegram from "@/assets/icons/telegram.svg"
import tiktok from "@/assets/icons/tiktok.svg"
import { Glass } from "@/components/glass"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CardMultipleIcons } from "../card-multiple-icons"
import { FooterShapes } from "./shapes"

/**
 * Footer of the Figma desktop frames ("footer-francesca", 1728px) and of "Footer-mobile" (402px). The desktop layout
 * starts at `lg`; below it the mobile one is used, centered.
 */

const socials = [
  { label: "Telegram", href: "https://t.me/polinetwork", icon: <Image src={telegram} alt="" className="size-6" /> },
  { label: "TikTok", href: "https://vm.tiktok.com/ZM8TC84Qu/", icon: <Image src={tiktok} alt="" className="size-6" /> },
  { label: "Instagram", href: "https://instagram.com/polinetwork_", icon: <FiInstagram className="text-black" /> },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/polinetwork",
    icon: <FiLinkedin className="text-black" />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/PolitecnicoDiMilanoNetwork",
    icon: <FiFacebook className="text-black" />,
  },
  { label: "Discord", href: "https://discord.gg/Fp7ZHcC", icon: <Image src={discord} alt="" className="size-8.5" /> },
  { label: "GitHub", href: "https://github.com/PoliNetworkOrg", icon: <FiGithub className="text-text-primary" /> },
]

const socialLinks = socials.map(({ label, href, icon }) => (
  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex">
    {icon}
  </a>
))

type NavLink = { title: string; href?: string }

// Entries without `href` don't have a page yet.
const navGroups: { title: string; links: NavLink[] }[] = [
  {
    title: "Resources",
    links: [
      { title: "Materials", href: "/materials" },
      { title: "Guides", href: "/guides" },
      { title: "Computer recs" },
      { title: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Community",
    links: [
      { title: "Groups", href: "/groups" },
      { title: "Projects", href: "/projects" },
      { title: "Freshman", href: "/matricole" },
      { title: "Associations", href: "/associations" },
    ],
  },
  {
    title: "About",
    links: [
      { title: "About us", href: "/chi-siamo" },
      { title: "Join us", href: "/join" },
      { title: "Contact us", href: "/contact" },
    ],
  },
]

// TODO: link the documents once the legal page exists (#151)
const legalLinks = ["Privacy policy", "Terms & conditions", "Cookie policy"]

const contacts = [
  { label: "Per collaborazioni ed eventi", email: "events@polinetwork.org" },
  { label: "Per domande e richieste", email: "direttivo@polinetwork.org" },
]

const linkHoverClass = "decoration-1 underline-offset-2 hover:underline focus-visible:underline"

function NavGroups() {
  return (
    <div className="flex flex-col items-start gap-3">
      {navGroups.map((group) => (
        <details key={group.title} className="group">
          <summary className="flex cursor-pointer list-none items-center gap-1 text-text-secondary [&::-webkit-details-marker]:hidden">
            <span className="typo-body-large">{group.title}</span>
            <FiChevronDown aria-hidden className="size-4 transition-transform group-open:rotate-180" />
          </summary>
          <ul className="typo-body-medium mt-1 flex flex-col gap-1 text-black">
            {group.links.map((link) => (
              <li key={link.title}>
                {link.href ? (
                  <Link href={link.href} className={linkHoverClass}>
                    {link.title}
                  </Link>
                ) : (
                  link.title
                )}
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  )
}

function LegalLinks() {
  return (
    <ul className="typo-body-large flex flex-col gap-2.5 text-text-secondary">
      {legalLinks.map((title) => (
        <li key={title}>{title}</li>
      ))}
    </ul>
  )
}

function Contacts({ emailClassName }: { emailClassName: string }) {
  return contacts.map(({ label, email }) => (
    <div key={email} className="flex flex-col">
      <span className="typo-body-large text-text-secondary">{label}</span>
      <a href={`mailto:${email}`} className={cn("text-text-primary", emailClassName, linkHoverClass)}>
        {email}
      </a>
    </div>
  ))
}

function JoinButton({ className }: { className?: string }) {
  return (
    <Button asChild variant="primary" className={cn("h-11.5 w-51.5", className)}>
      <Link href="/join">Unisciti a noi!</Link>
    </Button>
  )
}

function ReportBugButton({ className }: { className?: string }) {
  return (
    <Button asChild variant="tertiary" className={cn("h-11.5 w-51.75", className)}>
      <a href="https://github.com/PoliNetworkOrg/web/issues/new" target="_blank" rel="noopener noreferrer">
        <FiGithub className="size-6" />
        Report a bug
      </a>
    </Button>
  )
}

function LanguageSelect({ className }: { className?: string }) {
  // Not functional until the site is translated (#44)
  return (
    <button
      type="button"
      disabled
      className={cn(
        "typo-body-medium flex items-center gap-1.25 rounded-buttonsM border border-white/50 bg-background-blur px-5 py-2.5 text-black backdrop-blur-md",
        className
      )}
    >
      Select language
      <FiChevronDown aria-hidden className="size-6" />
    </button>
  )
}

function SupportBox({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <Glass className={cn("flex items-center rounded-images border-white/50 bg-background-blur", className)}>
      {children}
    </Glass>
  )
}

const supportAmountClass =
  "bg-linear-to-b from-blue-secondary to-blue-primary to-53% bg-clip-text text-transparent whitespace-nowrap"

const copyright = `PoliNetwork 2016-${new Date().getFullYear()} - All rights reserved`

function DesktopFooter() {
  return (
    <div className="mx-auto w-full max-w-432 pt-30.5 pb-20.25 max-lg:hidden">
      <h2 className="typo-display-large text-center text-text-primary">Keep in touch!</h2>
      <div className="mt-4.75 flex justify-center">
        <CardMultipleIcons icons={socialLinks} />
      </div>

      {/* Columns at x=313 and x=1075 of the 1728px frame, closing in linearly down to 64px gutters at 1024px */}
      <div className="mt-22.75 flex items-start justify-between gap-10 pr-[calc(24.15%-183.3px)] pl-[calc(35.37%-298.2px)]">
        <div className="w-full max-w-104.75">
          <h3 className="typo-headline-small text-text-primary">Visita il sito</h3>
          <div className="mt-11 flex min-h-44 items-start justify-between gap-6">
            <NavGroups />
            <LegalLinks />
          </div>
          <SupportBox className="mt-11 gap-10 px-10 py-4.75">
            <span className={cn("typo-display-medium", supportAmountClass)}>5x1000</span>
            <div className="flex flex-col text-text-primary">
              <span className="typo-headline-small">Sostienici!</span>
              <span className="typo-body-medium">CF: 97927490157</span>
            </div>
          </SupportBox>
        </div>

        <div className="w-full max-w-104.75">
          <h3 className="typo-headline-small text-text-primary">Talk with us</h3>
          <div className="mt-11 flex flex-col gap-5.75">
            <Contacts emailClassName="typo-body-large" />
          </div>
          <h3 className="typo-headline-small mt-11 text-text-primary">Sei interessato?</h3>
          <JoinButton className="-ml-1.25 mt-7.25" />
          <h3 className="typo-headline-small mt-11 text-text-primary">Qualche problema? Segnalalo!</h3>
          <ReportBugButton className="-ml-0.75 mt-7.25" />
        </div>
      </div>

      <div className="mt-35 flex items-center justify-between gap-6 px-[calc(19.32%-133.8px)]">
        <p className="typo-body-large text-text-secondary">{copyright}</p>
        <LanguageSelect />
      </div>
    </div>
  )
}

function MobileFooter() {
  return (
    <div className="mx-auto flex w-full max-w-100.5 flex-col px-6 pt-30.5 pb-14 md:max-w-152 lg:hidden">
      <h2 className="typo-headline-medium bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-center text-transparent">
        Keep in touch!
      </h2>
      <div className="mx-auto mt-6 flex w-full max-w-78 items-center justify-between text-2xl">{socialLinks}</div>
      <LanguageSelect className="mt-6 self-end" />

      <h3 className="typo-label-extralarge mt-16 text-text-primary">Talk with us</h3>
      <div className="mt-6 flex flex-col gap-3">
        <Contacts emailClassName="typo-body-medium" />
      </div>

      <h3 className="typo-label-extralarge mt-18 text-center text-text-primary">Sei interessato?</h3>
      <JoinButton className="mx-auto mt-6" />

      <h3 className="typo-label-extralarge mt-14 text-center text-text-primary">Qualche problema? Segnalalo!</h3>
      <ReportBugButton className="mx-auto mt-6" />

      <SupportBox className="mx-auto mt-26 w-65.5 justify-between px-6 py-4.75">
        <span className={cn("typo-headline-small", supportAmountClass)}>5x1000</span>
        <div className="flex flex-col text-text-primary">
          <span className="typo-label-large">Sostienici!</span>
          <span className="typo-body-small">CF: 97927490157</span>
        </div>
      </SupportBox>

      <h3 className="typo-label-extralarge mt-27 text-text-primary">Visita il sito</h3>
      <div className="mt-6 flex items-start gap-6">
        <div className="flex-1">
          <NavGroups />
        </div>
        <LegalLinks />
      </div>

      <p className="typo-body-small mt-36 text-center text-text-secondary">{copyright}</p>
    </div>
  )
}

export function Footer() {
  return (
    // Figma clips the background to the footer. Past the 1728px frame the shapes scale up and would be cut with a
    // visible edge at the top, so they are let through (the page wrapper still clips them at the bottom)
    <footer className="relative w-full overflow-clip min-[1729px]:overflow-visible">
      <FooterShapes />
      <DesktopFooter />
      <MobileFooter />
    </footer>
  )
}
