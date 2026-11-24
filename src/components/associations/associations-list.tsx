import type { IconType } from "react-icons"
import { FaTiktok, FaXTwitter } from "react-icons/fa6"
import { FiFacebook, FiGlobe, FiInstagram, FiLinkedin, FiMail, FiMusic, FiSend, FiYoutube } from "react-icons/fi"
import AccordionList from "@/components/accordion-list"
import { Image } from "@/components/image"
import { EMPTY_STATE } from "@/components/layout/page"
import { isHttpUrl, platformName, withVisibleLabels } from "@/lib/association-links"
import { CONTACT_FUNCTION_LABELS } from "@/lib/association-registry"
import type { fetchAssociationsPage } from "@/queries/functions"

type Association = Awaited<ReturnType<typeof fetchAssociationsPage>>["shown"][number]
type AssociationLinks = Association["links"]

const LINK_CONFIG: { key: keyof AssociationLinks; label: string; icon: IconType; mailto?: boolean }[] = [
  { key: "website", label: "Web", icon: FiGlobe },
  { key: "email", label: "Email", icon: FiMail, mailto: true },
  { key: "facebook", label: "Facebook", icon: FiFacebook },
  { key: "instagram", label: "Instagram", icon: FiInstagram },
  { key: "tiktok", label: "TikTok", icon: FaTiktok },
  // FiX is a close (×) icon, not the X logo
  { key: "x", label: "X", icon: FaXTwitter },
  { key: "youtube", label: "Youtube", icon: FiYoutube },
  { key: "telegram", label: "Telegram", icon: FiSend },
  { key: "linkedin", label: "LinkedIn", icon: FiLinkedin },
  { key: "spotify", label: "Spotify", icon: FiMusic },
]

const LOGO_CLASS = "size-10 shrink-0 rounded-full bg-white sm:size-12"

/** First letter of the first two words: "Lista Aperta - Per il diritto…" → "LA" */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => /\p{L}/u.test(word))
    .slice(0, 2)
    .map((word) => word.match(/\p{L}/u)?.[0] ?? "")
    .join("")
    .toUpperCase()
}

function AssociationLogo({ name, logo }: Pick<Association, "name" | "logo">) {
  // The name sits right next to the logo, so both are decorative for screen readers
  // Reviewed logos must be http(s); anything else falls back to the initials
  if (!logo || !isHttpUrl(logo)) {
    return (
      <span
        aria-hidden
        className={`${LOGO_CLASS} typo-title-medium flex items-center justify-center text-blue-secondary`}
      >
        {initials(name)}
      </span>
    )
  }
  return <Image src={logo} alt="" width={48} height={48} className={`${LOGO_CLASS} object-contain`} />
}

type AssociationLink = {
  /** The link's accessible name and tooltip */
  label: string
  /** Tells apart links with the same label */
  id?: string
  /** Shown next to the icon */
  text?: string
  href: string
  icon: IconType
}

function AssociationLinksList({ links }: { links: AssociationLink[] }) {
  return (
    // 40px targets, pulled left so the first icon lines up with the text
    <ul className="-ml-2 flex flex-wrap gap-1 pt-4">
      {links.map(({ label, id, text, href, icon: Icon }) => (
        <li key={id ?? label}>
          {/* Grey like the site's secondary text, blue on hover like the other links: no circle behind */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={`flex h-10 items-center justify-center gap-2 rounded-sm text-text-secondary outline-none transition-colors duration-200 hover:text-blue-secondary focus-visible:ring-2 focus-visible:ring-blue-secondary ${text ? "px-3" : "w-10"}`}
          >
            <Icon aria-hidden className="size-6 shrink-0" />
            {text && <span className="text-sm">{text}</span>}
          </a>
        </li>
      ))}
    </ul>
  )
}

function AssociationDetails({ association }: { association: Association }) {
  const tags = [
    ...(association.crossProgramme ? ["Tutti i corsi"] : (association.programmes ?? []).map((p) => p.nameIt)),
    ...(association.campuses ?? []).map((c) => c.nameIt),
  ]
  const contacts = association.contacts ?? []
  if (tags.length === 0 && contacts.length === 0) return null
  return (
    <div className="flex max-w-3xl flex-col gap-6 pt-6">
      {tags.length > 0 && (
        <ul aria-label="Corsi e sedi" className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag} className="rounded-full bg-white/60 px-3 py-1 text-sm">
              {tag}
            </li>
          ))}
        </ul>
      )}
      {contacts.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="typo-title-small text-text-primary">Contatti</span>
          <ul className="flex flex-col gap-1">
            {contacts.map((contact) => (
              <li key={`${contact.label}-${contact.email}`}>
                <span>{contact.label || CONTACT_FUNCTION_LABELS[contact.function]}: </span>
                <a className="underline underline-offset-4" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
                {(contact.name || contact.phone) && (
                  <span className="text-text-secondary">
                    {" "}
                    · {[contact.name, contact.phone].filter(Boolean).join(" · ")}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/** `openId`: the association to open (a link from an event); the first one otherwise. */
export function AssociationsList({ associations, openId }: { associations: Association[]; openId?: string }) {
  if (associations.length === 0) {
    // The query returns an empty list on backend errors too, so the message covers both cases
    return <p className={EMPTY_STATE}>Le associazioni non sono disponibili al momento. Riprova più tardi.</p>
  }

  const items = associations.map((association) => {
    const links = association.extraLinks
      ? [
          ...(association.links.email
            ? [{ label: "Email", href: `mailto:${association.links.email}`, icon: FiMail }]
            : []),
          ...withVisibleLabels(association.extraLinks).map((link, index) => ({
            label: link.visibleLabel ? `${platformName(link.platform)}: ${link.label}` : platformName(link.platform),
            id: `${link.platform}-${index}`,
            text: link.visibleLabel ? link.label : undefined,
            href: link.url,
            icon: LINK_CONFIG.find((config) => config.key === link.platform)?.icon ?? FiGlobe,
          })),
        ]
      : LINK_CONFIG.filter(({ key }) => association.links[key]).map(({ key, label, icon, mailto }) => {
          const value = association.links[key] as string
          return { label, href: mailto ? `mailto:${value}` : value, icon }
        })

    return {
      value: String(association.id),
      // A link from an event opens it and scrolls to it
      id: `associazione-${association.id}`,
      trigger: (
        <span className="flex min-w-0 items-center gap-3 sm:gap-4">
          {/* No placeholder logo: an association without one gets its initials */}
          <AssociationLogo name={association.name} logo={association.logo} />
          {/* Long single words may still break on the narrowest phones rather than run under the chevron */}
          <span className="wrap-break-word min-w-0">{association.name}</span>
        </span>
      ),
      content: (
        <>
          {association.descriptionIt && <p>{association.descriptionIt}</p>}
          {/* Programmes, campuses and public contacts, under the description */}
          <AssociationDetails association={association} />
          {links.length > 0 && <AssociationLinksList links={links} />}
        </>
      ),
    }
  })

  const open = items.find((item) => item.value === openId) ?? items[0]

  return (
    // The same accordion as the FAQs. Open, the header loses some bottom padding: the logo is taller than the name,
    // so the full padding left the text far below it. From sm the text lines up with the name:
    // padding (24) + logo (48) + gap (16)
    <AccordionList
      items={items}
      defaultValue={open?.value}
      triggerClassName="transition-[padding] data-[state=open]:pb-3"
      contentClassName="sm:pl-22"
    />
  )
}
