import Image from "next/image"
import { FaGithub } from "react-icons/fa"
import { FiChevronDown, FiFacebook, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi"
import discord from "@/assets/icons/discord.svg"
import telegram from "@/assets/icons/telegram.svg"
import { ButtonIcon } from "./button-icon"
import { CardMultipleIcons } from "./card-multiple-icons"
import { CardSplit } from "./card-split"
import { Button } from "./ui/button"

interface FooterLinkProps {
  href: string
  children: React.ReactNode
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <a href={href} className="hover:text-gray-800">
      {children}
    </a>
  )
}

interface FooterAccordionProps {
  title: string
  links: { label: string; href: string }[]
}

function FooterAccordion({ title, links }: FooterAccordionProps) {
  return (
    <details className="group text-text-secondary">
      <summary className="flex cursor-pointer list-none items-center gap-1 [&::-webkit-details-marker]:hidden">
        {title}
        <FiChevronDown className="size-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-2 flex flex-col gap-2 pl-2 text-sm">
        {links.map((link) => (
          <FooterLink key={link.label} href={link.href}>
            {link.label}
          </FooterLink>
        ))}
      </div>
    </details>
  )
}

const sitemapSections = [
  {
    type: "accordion" as const,
    title: "Resources",
    links: [
      { label: "Materials", href: "/" },
      { label: "Guides", href: "/" },
      { label: "Computer recs", href: "/" },
      { label: "FAQs", href: "/" },
    ],
  },
  { type: "text" as const, label: "Privacy Policy", href: "/" },
  {
    type: "accordion" as const,
    title: "Community",
    links: [
      { label: "Groups", href: "/" },
      { label: "Projects", href: "/" },
      { label: "Freshmen", href: "/" },
      { label: "Associations", href: "/" },
    ],
  },
  { type: "text" as const, label: "Terms & Conditions", href: "/" },
  {
    type: "accordion" as const,
    title: "About",
    links: [
      { label: "About us", href: "/" },
      { label: "Join us", href: "/" },
      { label: "Contact us", href: "/" },
    ],
  },
  { type: "text" as const, label: "Cookie policy", href: "/" },
]

export function Footer() {
  return (
    <footer className="my-8 w-full px-8">
      <h2 className="typo-headline-medium md:typo-display-large text-center max-md:bg-linear-to-b max-md:from-blue-secondary max-md:to-blue-primary max-md:bg-clip-text max-md:text-transparent">
        Keep in touch!
      </h2>

      <div className="mx-auto mt-6 mb-18 flex w-fit flex-col items-center gap-4">
        <CardMultipleIcons
          icons={[
            <Image key="telegram" src={telegram} alt="Telegram" />,
            <FiInstagram key="instagram" />,
            <FiLinkedin key="linkedin" />,
            <FiFacebook key="facebook" />,
            <Image key="discord" src={discord} alt="Discord" />,
            <FiGithub key="github" />,
          ]}
        />
      </div>

      <div className="flex w-full justify-evenly gap-8 max-md:flex-col max-md:items-center max-md:gap-24">
        <div className="flex w-full flex-col gap-8 max-md:gap-16 md:order-2 md:max-w-sm">
          <div id="talkwithus" className="w-full">
            <h3 className="typo-label-extralarge md:typo-headline-small">Talk with us</h3>
            <div id="emails" className="typo-body-medium md:typo-body-large">
              <div id="collabs" className="my-4">
                <p className="text-gray-600">Per collaborazioni ed eventi</p>
                <a href="mailto:eventi@polinetwork.org">eventi@polinetwork.org</a>
              </div>
              <div id="requests">
                <p className="text-gray-600">Per domande e richieste</p>
                <a href="mailto:direttivo@polinetwork.org">direttivo@polinetwork.org</a>
              </div>
            </div>
          </div>

          <div id="interested" className="flex flex-col gap-4 text-center md:text-left">
            <h3 className="typo-label-extralarge md:typo-headline-small">Sei interessato?</h3>
            <div>
              <Button variant="primary" size="lg-wide" className="typo-label-large">
                Unisciti a noi!
              </Button>
            </div>
          </div>

          <div id="problems" className="flex flex-col gap-4 text-center md:text-left">
            <h3 className="typo-label-extralarge md:typo-headline-small">Qualche problema? Segnalalo!</h3>
            <div>
              <ButtonIcon icon={FaGithub} size="lg-wide" iconPosition="left" variant="tertiary">
                Report a bug
              </ButtonIcon>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-16 max-md:w-full max-md:items-center md:max-w-md md:justify-self-end">
          <CardSplit textPrimary="5x1000" textSecondary="Sostienici!" textSecondarySmall="CF: 97927490157" />

          <div id="sitemap" className="flex w-full flex-col gap-4">
            <h3 className="typo-label-extralarge md:typo-headline-small">Visita il sito</h3>
            <div className="typo-body-large grid grid-cols-2 items-start gap-x-4 gap-y-4 text-text-secondary">
              {sitemapSections.map((section) =>
                section.type === "accordion" ? (
                  <FooterAccordion key={section.title} title={section.title} links={section.links} />
                ) : (
                  <FooterLink key={section.label} href={section.href}>
                    {section.label}
                  </FooterLink>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="typo-body-small md:typo-body-large mt-36 flex w-full items-center justify-center gap-4 text-center text-text-secondary md:mx-auto md:mb-12 md:max-w-[1324px] md:justify-between md:text-left">
        <p id="copyright">PoliNetwork 2016-2026 © All rights reserved</p>
        {/**<div id="select-language">
          <DropdownButton
            placeholder="Select language"
            options={[
              { label: "Italiano", value: "it" },
              { label: "English", value: "en" },
            ]}
          />
        </div>**/}
      </div>
    </footer>
    //TODO: dropdowns
  )
}
