import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { FaTiktok } from "react-icons/fa6"
import { FiArrowUpRight, FiChevronDown, FiFacebook, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi"
import discord from "@/assets/icons/discord.svg"
import telegram from "@/assets/icons/telegram.svg"
import { DropdownButton } from "@/components/button-dropdown"
import { CardMultipleIcons } from "@/components/card-multiple-icons"
import { CardSplit } from "@/components/card-split"
import { Glass } from "@/components/glass"
import { headerMenuItems } from "@/components/header/constants"
import { Shape } from "@/components/shapes"
import { Button } from "@/components/ui/button"

type ContactCardData = {
  title: string
  description: ReactNode
  email: string
}

const contactCards: ContactCardData[] = [
  {
    title: "Informazioni Generali",
    description: "Per qualsiasi domanda su PoliNetwork, sui nostri strumenti o servizi.",
    email: "info@polinetwork.org",
  },
  {
    title: "Consiglio Direttivo",
    description: "Per richieste formali, segnalazioni di problemi o questioni che non rientrano nelle categorie sopra.",
    email: "direttivo@polinetwork.org",
  },
  {
    title: "Candidature",
    description: (
      <>
        Se vuoi candidarti come admin o come membro di un team, ti consigliamo di passare dal form disponibile nella
        pagina{" "}
        <Link href="/join" className="text-blue-secondary underline">
          Struttura
        </Link>
        .
      </>
    ),
    email: "hr@polinetwork.org",
  },
  {
    title: "Collaborazioni",
    description: (
      <>
        Se sei un&apos;azienda o associazione e vuoi proporre una collaborazione, puoi anche consultare la pagina{" "}
        <Link href="/collaborate" className="text-blue-secondary underline">
          Collabora con Noi
        </Link>{" "}
        per capire cosa offriamo.
      </>
    ),
    email: "events@polinetwork.org",
  },
]

const socialLinks = [
  {
    label: "Telegram",
    href: "https://t.me/polinetwork",
    icon: <Image src={telegram} alt="" className="size-6" />,
  },
  {
    label: "TikTok",
    href: "https://vm.tiktok.com/ZM8TC84Qu/",
    icon: <FaTiktok className="size-6" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/polinetwork_/",
    icon: <FiInstagram className="size-6" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/polinetwork/",
    icon: <FiLinkedin className="size-6" />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/PolitecnicoDiMilanoNetwork",
    icon: <FiFacebook className="size-6" />,
  },
  {
    label: "Discord",
    href: "https://discord.gg/Fp7ZHcC",
    icon: <Image src={discord} alt="" className="size-[34px]" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/PoliNetworkOrg",
    icon: <FiGithub className="size-6" />,
  },
] as const

function ContactBackdrop() {
  return (
    <>
      <div className="-z-10 pointer-events-none absolute inset-0 isolate hidden overflow-hidden md:block" aria-hidden>
        <Shape variant="small-blue" className="-left-[310px] -top-[459px] h-[760px] w-[760px] max-w-none" />
        <Shape variant="big-teal" className="-right-[253px] -top-[282px] h-[974px] w-[974px] max-w-none" />
        <Shape variant="looper" className="-right-[314px] -top-[162px] h-[896px] w-[925px] max-w-none" />
        <Shape variant="big-teal" className="-left-[518px] top-[654px] h-[974px] w-[974px] max-w-none" />
        <Shape variant="looper" className="-left-[191px] top-[466px] h-[1547px] w-[1533px] max-w-none" />
        <Shape variant="small-blue" className="-right-[358px] top-[1131px] h-[760px] w-[760px] max-w-none" />
      </div>

      <div className="-z-10 pointer-events-none absolute inset-0 isolate overflow-hidden md:hidden" aria-hidden>
        <Shape variant="small-blue" className="-left-[224px] top-[9px] size-[462px] max-w-none" />
        <Shape variant="big-teal" className="top-[260px] left-[155px] size-[401px] max-w-none" />
        <Shape variant="looper" className="-left-[218px] -top-[278px] h-[942px] w-[965px] max-w-none" />

        <Shape variant="big-teal" className="-left-[2px] top-[989px] size-[85px] max-w-none" />
        <Shape variant="looper" className="-left-[38px] top-[954px] h-[401px] w-[513px] max-w-none" />
        <Shape variant="big-teal" className="top-[1112px] left-[249px] size-[206px] max-w-none" />
        <Shape variant="small-blue" className="-left-[201px] top-[1120px] size-[398px] max-w-none" />
        <Shape variant="big-teal" className="-left-[205px] top-[1270px] size-[401px] max-w-none" />

        <Shape variant="small-blue" className="-left-[51px] top-[1739px] size-[201px] max-w-none" />
        <Shape variant="big-teal" className="-left-[220px] top-[1864px] size-[401px] max-w-none" />
        <Shape variant="small-blue" className="top-[2023px] left-[252px] size-[281px] max-w-none" />
        <Shape variant="big-teal" className="-left-[147px] top-[2376px] size-[401px] max-w-none" />
        <Shape variant="small-blue" className="top-[2508px] left-[274px] size-[281px] max-w-none" />
        <Shape variant="big-teal" className="top-[2736px] left-[234px] size-[401px] max-w-none" />
        <Shape variant="looper" className="top-[2858px] left-[27px] h-[1032px] w-[1024px] max-w-none" />
      </div>
    </>
  )
}

function ContactHero() {
  return (
    <section className="flex h-[536px] flex-col items-center px-6 pt-[262px] text-center md:min-h-[640px] md:pt-60 xl:h-[788px] xl:min-h-0 xl:pt-[286px]">
      <h1 className="bg-linear-to-b from-text-primary to-text-secondary bg-clip-text font-dm-sans font-medium text-[57px] text-transparent leading-[64px] tracking-[-0.25px] md:text-[80px] md:leading-[96px] xl:text-[120px] xl:leading-[156px]">
        Contattaci
      </h1>
      <p className="mt-10 max-w-[780px] font-poppins text-[22px] text-text-primary leading-[28px] md:mt-5 md:bg-linear-to-r md:from-blue-secondary md:via-text-primary md:to-blue-secondary md:bg-clip-text md:text-[36px] md:text-transparent md:leading-[44px] xl:mt-6">
        <span className="md:hidden">
          Qualunque sia la tua domanda,
          <br />
          PoliNetwork è a disposizione
        </span>
        <span className="hidden md:inline">
          Qualunque sia la tua domanda,
          <br />
          PoliNetwork è a disposizione.
        </span>
      </p>
    </section>
  )
}

function GroupsSection() {
  return (
    <section className="mx-auto flex h-[775px] w-full flex-col items-center gap-[60px] px-6 py-[120px] md:grid md:h-auto md:w-[calc(100%-3rem)] md:max-w-[1438px] md:gap-12 md:px-0 md:py-16 lg:grid-cols-[minmax(0,632px)_minmax(0,721px)] xl:h-[494px] xl:gap-[85px] xl:py-[75px]">
      <div className="flex w-full flex-col items-center gap-6 text-center md:block md:text-left">
        <h2 className="bg-linear-to-b from-text-primary to-[#41496b] bg-clip-text font-poppins text-[28px] text-transparent leading-[36px] md:font-dm-sans md:text-[45px] md:leading-[52px]">
          Hai mille dubbi sul Poli?
          <br />
          Siamo pronti ad aiutarti!
        </h2>
        <p className="max-w-[354px] font-red-hat text-[16px] leading-[24px] tracking-[0.5px] md:mt-7 md:max-w-[632px] md:font-poppins md:text-[24px] md:leading-[32px] md:tracking-normal">
          Il modo più rapido per ottenere risposte su esami, burocrazia universitaria o sulla vita al Politecnico è{" "}
          <Link href="/groups" className="text-blue-secondary hover:underline focus-visible:underline">
            entrare nel gruppo del tuo corso
          </Link>
          , su Telegram o su WhatsApp, dove gli admin sono presenti ogni giorno.
        </p>
        <Button asChild size="lg" className="md:mt-9">
          <Link href="/groups">
            Trova il tuo gruppo
            <FiArrowUpRight />
          </Link>
        </Button>
      </div>

      <div className="relative aspect-[354/176.251] w-full max-w-[354px] shrink-0 overflow-hidden rounded-rectangles md:aspect-[721/342] md:max-w-none">
        <Image
          src="/contact-group.png"
          alt="Foto di gruppo della community PoliNetwork"
          width={512}
          height={246}
          sizes="(min-width: 1024px) 721px, 354px"
          className="absolute inset-0 h-[133.78%] w-full max-w-none object-fill max-md:top-[-28.9%] md:size-full md:scale-[1.045] md:object-cover md:object-center"
          priority
        />
      </div>
    </section>
  )
}

function ContactCard({ title, description, email }: ContactCardData) {
  return (
    <Glass className="flex h-[264px] w-[312px] shrink-0 flex-col gap-6 rounded-rectangles border-white/50 bg-background-blur p-6">
      <h3 className="typo-headline-small bg-linear-to-b from-blue-primary to-blue-secondary bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="typo-body-medium">{description}</p>
      <Button variant="tertiary" asChild className="mt-auto self-end">
        <a href={`mailto:${email}`}>{email}</a>
      </Button>
    </Glass>
  )
}

function EmailSection() {
  return (
    <section className="mx-auto flex h-[1650px] w-full flex-col gap-6 px-6 py-[120px] md:block md:h-auto md:w-[calc(100%-3rem)] md:max-w-[1438px] md:px-0 md:py-16 xl:mb-[21px] xl:h-[626px] xl:py-[75px]">
      <h2 className="w-full bg-linear-to-b from-text-primary to-[#41496b] bg-clip-text text-center font-poppins text-[28px] text-transparent leading-[36px] md:text-left md:font-dm-sans md:text-[45px] md:leading-[52px]">
        Hai una richiesta specifica?
      </h2>
      <div className="w-full pb-6 md:mt-9 md:pb-0">
        <p className="text-center font-red-hat text-[16px] leading-[24px] tracking-[0.5px] md:text-left md:font-poppins md:text-[24px] md:leading-[32px] md:tracking-normal">
          Per tutto il resto,{" "}
          <a href="mailto:info@polinetwork.org" className="text-blue-secondary hover:underline focus-visible:underline">
            puoi scriverci direttamente
          </a>
          .
          <br />
          Qui sotto trovi i contatti in base al tipo di richiesta.
        </p>
      </div>

      <div className="flex w-full flex-col items-center gap-12 pb-[21px] md:mt-9 md:grid md:grid-cols-2 md:gap-8 md:pb-0 xl:grid-cols-4 xl:gap-[63px]">
        {contactCards.map((card) => (
          <ContactCard key={card.email} {...card} />
        ))}
      </div>
    </section>
  )
}

function SocialLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <CardMultipleIcons
      className={
        mobile
          ? "h-12 w-[344px] rounded-full [&>div]:w-full [&>div]:flex-nowrap [&>div]:justify-between [&>div]:gap-0 [&>div]:px-4 [&>div]:py-[7px]"
          : "h-12 rounded-full [&>div]:flex-nowrap [&>div]:gap-[22px] [&>div]:px-[34px] [&>div]:py-[7px]"
      }
      icons={socialLinks.map(({ label, href, icon }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="hover:-translate-y-0.5 focus-visible:-translate-y-0.5 transition-transform"
        >
          {icon}
        </Link>
      ))}
    />
  )
}

function DesktopFooterDecorations() {
  return (
    <div className="-z-10 pointer-events-none absolute inset-0 isolate overflow-hidden" aria-hidden>
      <Shape variant="looper" className="-top-[314px] left-[455px] h-[2167px] w-[2184px] max-w-none" />
      <Shape variant="big-teal" className="-left-[196px] top-[244px] h-[1444px] w-[1444px] max-w-none" />
      <Shape variant="small-blue" className="top-[416px] left-[53px] h-[354px] w-[354px] max-w-none" />
      <Shape variant="big-blue" className="-right-[764px] top-[95px] h-[1432px] w-[1432px] max-w-none" />
    </div>
  )
}

function FooterNavigation() {
  return (
    <div>
      <h3 className="typo-headline-small">Visita il sito</h3>
      <div className="mt-11 grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-3">
          {headerMenuItems.map((item) => (
            <details key={item.title} className="group text-text-secondary">
              <summary className="typo-body-large flex cursor-pointer list-none items-center gap-1 [&::-webkit-details-marker]:hidden">
                {item.title}
                {"menu" in item && <FiChevronDown className="size-4 transition-transform group-open:rotate-180" />}
              </summary>
              {"menu" in item && (
                <ul className="mt-2 flex flex-col gap-1 pl-2 text-text-primary">
                  {item.menu.map((subItem) => (
                    <li key={subItem.title}>
                      <Link href={subItem.href} className="typo-body-medium hover:underline focus-visible:underline">
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </details>
          ))}
        </div>

        <nav aria-label="Informazioni legali" className="flex flex-col gap-2.5">
          {(
            [
              ["Privacy policy", "/privacy"],
              ["Terms & conditions", "/terms"],
              ["Cookie policy", "/cookies"],
            ] as const
          ).map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="typo-body-large flex items-center gap-1 text-text-secondary hover:underline focus-visible:underline"
            >
              {label}
              <FiArrowUpRight className="size-5" />
            </Link>
          ))}
        </nav>
      </div>

      <CardSplit
        className="mt-11 w-full"
        textPrimary="5x1000"
        textSecondary="Sostienici!"
        textSecondarySmall="CF: 97927490157"
      />
    </div>
  )
}

function FooterContact() {
  return (
    <div>
      <h3 className="typo-headline-small">Talk with us</h3>
      <div className="mt-11 flex flex-col gap-5">
        <a
          href="mailto:eventi@polinetwork.org"
          className="typo-body-large w-fit hover:underline focus-visible:underline"
        >
          <span className="block text-text-secondary">Per collaborazioni ed eventi</span>
          eventi@polinetwork.org
        </a>
        <a
          href="mailto:direttivo@polinetwork.org"
          className="typo-body-large w-fit hover:underline focus-visible:underline"
        >
          <span className="block text-text-secondary">Per domande e richieste</span>
          direttivo@polinetwork.org
        </a>
      </div>

      <div className="mt-7">
        <h3 className="typo-headline-small">Sei interessato?</h3>
        <Button asChild size="lg" className="mt-7 h-[46px] w-[206px]">
          <Link href="/join">Unisciti a noi!</Link>
        </Button>
      </div>

      <div className="mt-10">
        <h3 className="typo-headline-small">Qualche problema? Segnalalo!</h3>
        <Button variant="tertiary" asChild size="lg" className="mt-7 h-[46px] w-[207px]">
          <Link href="https://github.com/PoliNetworkOrg/web/issues" target="_blank" rel="noreferrer">
            <FiGithub className="size-6" />
            Report a bug
          </Link>
        </Button>
      </div>
    </div>
  )
}

function DesktopFooter() {
  return (
    <footer className="relative isolate hidden min-h-[1106px] overflow-hidden px-6 pt-[122px] md:block">
      <DesktopFooterDecorations />

      <div className="flex flex-col items-center">
        <h2 className="text-center font-dm-sans font-medium text-[44px] leading-[52px] sm:text-[57px] sm:leading-[64px]">
          Keep in touch!
        </h2>
        <div className="mt-[19px] max-w-full overflow-x-auto pb-1">
          <SocialLinks />
        </div>
      </div>

      <div className="mx-auto mt-[87px] grid w-full max-w-[1180px] gap-20 lg:grid-cols-[419px_419px] lg:justify-between xl:translate-x-10">
        <FooterNavigation />
        <FooterContact />
      </div>

      <div className="mx-auto mt-24 flex w-full max-w-[1328px] flex-col-reverse items-center justify-between gap-8 pb-16 text-text-secondary md:absolute md:right-0 md:bottom-[81px] md:left-0 md:mt-0 md:flex-row md:pb-0">
        <p className="typo-body-large">Polinetwork 2016-2025 - All rights reserved</p>
        <DropdownButton
          placeholder="Select language"
          size="sm"
          options={[
            { label: "Italian", value: "it" },
            { label: "English", value: "en" },
          ]}
        />
      </div>
    </footer>
  )
}

function MobileFooter() {
  return (
    <footer className="relative h-[479px] w-full md:hidden">
      <h2 className="-translate-x-1/2 absolute top-[72px] left-1/2 whitespace-nowrap bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text font-poppins text-[28px] text-transparent leading-[36px]">
        Keep in touch!
      </h2>

      <div className="-translate-x-1/2 absolute top-[127px] left-1/2">
        <SocialLinks mobile />
      </div>

      <nav className="absolute top-[219px] left-[43px] flex w-[150px] flex-col gap-7 font-medium font-red-hat text-[16px] leading-[24px] tracking-[0.15px]">
        <Link href="/join" className="underline underline-offset-2">
          Unisciti a noi!
        </Link>
        <Link href="/contact" className="underline underline-offset-2">
          Contattaci
        </Link>
        <Link
          href="https://github.com/PoliNetworkOrg/web/issues"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2"
        >
          Qualche problema? Segnalalo!
        </Link>
      </nav>

      <nav
        aria-label="Informazioni legali"
        className="absolute top-[222px] left-[247px] flex w-[109px] flex-col gap-[37px] font-red-hat text-[12px] text-text-secondary leading-[16px] tracking-[0.4px]"
      >
        <Link href="/terms">Terms &amp; conditions</Link>
        <Link href="/privacy">Privacy policy</Link>
        <Link href="/cookies">Cookie policy</Link>
      </nav>

      <p className="-translate-x-1/2 absolute bottom-[42px] left-1/2 whitespace-nowrap font-red-hat text-[12px] text-text-secondary leading-[16px] tracking-[0.4px]">
        Polinetwork 2016-2025 - All rights reserved
      </p>
    </footer>
  )
}

function ContactFooter() {
  return (
    <>
      <MobileFooter />
      <DesktopFooter />
    </>
  )
}

export function ContactPage() {
  return (
    <main data-page="contact" className="relative isolate w-full overflow-hidden">
      <ContactBackdrop />
      <ContactHero />
      <GroupsSection />
      <EmailSection />
      <ContactFooter />
    </main>
  )
}
