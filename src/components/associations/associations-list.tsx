import {
  FiFacebook,
  FiGlobe,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMusic,
  FiSend,
  FiVideo,
  FiX,
  FiYoutube,
} from "react-icons/fi"
import AccordionAssociation from "@/components/accordion-association"
import type { GradientIconType } from "@/components/gradient-icon"
import type { ApiOutput } from "@/types"

type Association = ApiOutput["web"]["associations"]["getAllAssociations"][number]
type AssociationLinks = Association["links"]

const LINK_CONFIG: { key: keyof AssociationLinks; label: string; icon: GradientIconType; mailto?: boolean }[] = [
  { key: "website", label: "Web", icon: FiGlobe },
  { key: "email", label: "Email", icon: FiMail, mailto: true },
  { key: "facebook", label: "Facebook", icon: FiFacebook },
  { key: "instagram", label: "Instagram", icon: FiInstagram },
  { key: "tiktok", label: "TikTok", icon: FiVideo },
  { key: "x", label: "X", icon: FiX },
  { key: "youtube", label: "Youtube", icon: FiYoutube },
  { key: "telegram", label: "Telegram", icon: FiSend },
  { key: "linkedin", label: "LinkedIn", icon: FiLinkedin },
  { key: "spotify", label: "Spotify", icon: FiMusic },
]

export function AssociationsList({ associations }: { associations: Association[] }) {
  if (associations.length === 0) {
    // The query returns an empty list on backend errors too, so the message covers both cases
    return (
      <p className="typo-body-large rounded-rectangles border border-slate-300 border-dashed px-6 py-10 text-center text-slate-600">
        Le associazioni non sono disponibili al momento. Riprova più tardi.
      </p>
    )
  }

  const accordionItems = associations.map((association) => ({
    value: String(association.id),
    name: association.name,
    // No placeholder logo: an association without one gets its initials (see AccordionAssociation)
    logo: association.logo,
    content: association.descriptionIt,
    links: LINK_CONFIG.filter(({ key }) => association.links[key]).map(({ key, label, icon, mailto }) => {
      const value = association.links[key] as string
      return { key: label, href: mailto ? `mailto:${value}` : value, icon }
    }),
  }))

  return <AccordionAssociation accordionItems={accordionItems} defaultValue={accordionItems[0]?.value} />
}
