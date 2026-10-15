import {
  FiAward,
  FiCloud,
  FiCornerRightUp,
  FiCpu,
  FiEdit,
  FiEdit2,
  FiHeadphones,
  FiMonitor,
  FiSave,
  FiSettings,
  FiShare2,
  FiSmartphone,
  FiUsers,
} from "react-icons/fi"
import communication from "@/assets/icons/team/communication.svg"
import type { CardIconProps } from "@/components/card-icon/types"

export type Team = {
  id: string
  title: string
  description: string
  roles: Pick<CardIconProps, "title" | "icon">[]
  placeholderCount: number
  reverse?: boolean
  centered?: boolean
}

// Copy and specialisms from the desktop Team frame (5546:10874).
// Member cards in the design contain copied board names and no photos: keep them explicit placeholders.
export const teams: Team[] = [
  {
    id: "it",
    title: "Team IT",
    description:
      "Il team IT riunisce sviluppatori frontend e backend, designer UI/UX e figure specializzate in DevOps e gestione dei database, che collaborano alla progettazione, allo sviluppo e alla manutenzione di tutti gli strumenti digitali di PoliNetwork.",
    roles: [
      { title: "Frontend Developers", icon: FiMonitor },
      { title: "Backend Developers", icon: FiCpu },
      { title: "UX/UI Designers", icon: FiEdit2 },
      { title: "DevOps Engineers", icon: FiCloud },
      { title: "Database Specialists", icon: FiSave },
    ],
    placeholderCount: 6,
  },
  {
    id: "design-marketing",
    title: "Design & Marketing",
    description:
      "Il team Design & Marketing costruisce l’identità visiva e la comunicazione di PoliNetwork, valorizzando i progetti dell’associazione e rendendoli riconoscibili sia online che durante gli eventi.",
    roles: [
      { title: "Brand & Graphic Design", icon: FiEdit2 },
      { title: "Social & Content", icon: FiSmartphone },
      { title: "Copywriting & Communication", icon: communication.src },
      { title: "Collaborazione", icon: FiShare2 },
    ],
    placeholderCount: 4,
  },
  {
    id: "hr",
    title: "Team HR",
    description:
      "Il team HR si occupa delle persone che fanno parte di PoliNetwork, seguendole in ogni fase del loro percorso e contribuendo alla crescita di una community organizzata, inclusiva e collaborativa.",
    roles: [
      { title: "Recruiting & Onboarding", icon: FiUsers },
      { title: "Organizzazione & Processi", icon: FiEdit },
      { title: "Community & Engagement", icon: FiAward },
      { title: "Crescita del team", icon: FiCornerRightUp },
    ],
    placeholderCount: 4,
    reverse: true,
  },
  {
    id: "events-partnership",
    title: "Team Events & Partnership",
    description:
      "Il team Events & Partnership organizza gli eventi di PoliNetwork e sviluppa collaborazioni con aziende, associazioni e realtà del mondo universitario, creando opportunità di valore per la community del Politecnico.",
    roles: [
      { title: "Eventi", icon: FiHeadphones },
      { title: "Partnership", icon: FiUsers },
      { title: "Project Management", icon: FiSettings },
    ],
    placeholderCount: 0,
    centered: true,
  },
  {
    id: "international",
    title: "International Team",
    description:
      "Il team International segue gli studenti Erasmus in arrivo al Politecnico e chi si è trasferito stabilmente per studiare qui. Organizza eventi di benvenuto e di scambio culturale, cura le comunicazioni sui social rivolte a questo pubblico e sviluppa progetti pensati sulle loro esigenze specifiche. Il team lavora a stretto contatto con Events & Partnership per l’organizzazione degli eventi e con Design & Marketing per la comunicazione in lingua inglese sui social.",
    roles: [],
    placeholderCount: 7,
    centered: true,
  },
]

export function applicationHref(team?: string) {
  return `mailto:direttivo@polinetwork.org?subject=${encodeURIComponent(team ? `Candidatura – ${team}` : "Candidatura PoliNetwork")}`
}
