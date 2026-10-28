import Image from "next/image"
import { GradientIcon } from "../gradient-icon"
import { Accordion } from "./accordion"
import { AccordionContent } from "./accordion-content"
import { AccordionItem } from "./accordion-item"
import { AccordionTrigger } from "./accordion-trigger"
import type { AccordionAssociationItem, AccordionAssociationProps } from "./types"

const LOGO_CLASS = "size-10 shrink-0 rounded-full bg-white sm:size-12 md:size-16"

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

function AssociationLogo({ name, logo }: Pick<AccordionAssociationItem, "name" | "logo">) {
  // The name sits right next to the logo, so both are decorative for screen readers
  if (!logo) {
    return (
      <span
        aria-hidden
        className={`${LOGO_CLASS} typo-title-medium md:typo-title-large flex items-center justify-center text-blue-secondary`}
      >
        {initials(name)}
      </span>
    )
  }
  return <Image src={logo} alt="" width={64} height={64} className={`${LOGO_CLASS} object-contain`} />
}

export default function AccordionAssociation({ accordionItems, defaultValue }: AccordionAssociationProps) {
  return (
    <Accordion type="single" collapsible defaultValue={defaultValue}>
      {accordionItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>
            <span className="flex min-w-0 items-center gap-3 sm:gap-4 md:gap-6">
              <AssociationLogo name={item.name} logo={item.logo} />
              {/* Long single words may still break on the narrowest phones rather than run under the chevron */}
              <span className="wrap-break-word min-w-0">{item.name}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            {item.content && <p className="max-w-3xl text-pretty">{item.content}</p>}
            {item.links.length > 0 && (
              <div className="flex flex-col items-start gap-3 pt-8">
                <span className="typo-title-small text-text-primary">Segui l'associazione</span>
                <ul className="-ml-2 flex flex-wrap gap-1">
                  {item.links.map((link) => (
                    <li key={link.key}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.key}
                        title={link.key}
                        className="group/icon relative flex size-10 items-center justify-center rounded-full outline-none transition-colors hover:bg-white/60 focus-visible:ring-2 focus-visible:ring-blue-secondary"
                      >
                        <link.icon className="size-6 transition-opacity duration-200 group-hover/icon:opacity-0" />
                        <GradientIcon
                          icon={link.icon}
                          className="absolute size-6 opacity-0 transition-opacity duration-200 group-hover/icon:opacity-100"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
