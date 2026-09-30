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
import esnLogo from "../../../public/logos/esn.svg"

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
    return <p className="typo-body-large text-center">Nessuna associazione disponibile al momento.</p>
  }

  const accordionItems = associations.map((association) => ({
    value: String(association.id),
    name: association.name,
    logo: association.logo ?? esnLogo,
    content: association.descriptionIt,
    links: LINK_CONFIG.filter(({ key }) => association.links[key]).map(({ key, label, icon, mailto }) => {
      const value = association.links[key] as string
      return { key: label, href: mailto ? `mailto:${value}` : value, icon }
    }),
  }))

  return (
    <div className="w-full max-w-300">
      <AccordionAssociation accordionItems={accordionItems} defaultValue={accordionItems[0]?.value} />
    </div>
  )
}
