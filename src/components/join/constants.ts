import adsClick from "@/assets/icons/join/ads-click.svg"
import calendarClock from "@/assets/icons/join/calendar-clock.svg"
import chat from "@/assets/icons/join/chat.svg"
import code from "@/assets/icons/join/code.svg"
import conversation from "@/assets/icons/join/conversation.svg"
import events from "@/assets/icons/join/events.svg"
import hr from "@/assets/icons/join/hr.svg"
import mail from "@/assets/icons/join/mail.svg"
import palette from "@/assets/icons/join/palette.svg"
import partnerExchange from "@/assets/icons/join/partner-exchange.svg"
import privacy from "@/assets/icons/join/privacy.svg"
import regulations from "@/assets/icons/join/regulations.svg"
import reply from "@/assets/icons/join/reply.svg"
import report from "@/assets/icons/join/report.svg"
import starShine from "@/assets/icons/join/star-shine.svg"
import statute from "@/assets/icons/join/statute.svg"
import type { InfoCardData } from "@/components/collabora/info-card"

const iconClassName = "mr-3 h-auto w-7 md:mr-0 md:w-13"

export const adminCards: InfoCardData[] = [
  {
    title: "Risponde",
    description: "Alle domande delle matricole sulla burocrazia universitaria",
    icon: chat,
    iconClassName,
  },
  {
    title: "Rimuove",
    description: "I messaggi di spam o che vanno contro il regolamento",
    icon: report,
    iconClassName,
  },
  { title: "Regola", description: "Le conversazioni mantenendo il gruppo in ordine", icon: starShine, iconClassName },
  { title: "Rafforza", description: "Il funzionamento del gruppo e la sua utilità", icon: adsClick, iconClassName },
]

export const adminSteps: InfoCardData[] = [
  {
    title: "Dimostra la tua attività e disponibilità",
    description:
      "All’avvio dell’anno accademico, con i gruppi matricole. In seguito, il recruiting avviene per segnalazione dei Capi Admin o del team HR.",
    icon: calendarClock,
    iconClassName,
  },
  {
    title: "Fai un colloquio iniziale con il team HR",
    description: "Una chiacchierata breve e informale pensata per capire motivazione e disponibilità.",
    icon: conversation,
    iconClassName,
  },
  {
    title: "Incontra il Capo Admin del tuo corso",
    description: "Fungerà da punto di riferimento per qualsiasi dubbio sulla gestione del gruppo.",
    icon: partnerExchange,
    iconClassName,
  },
]

export const teamCards: InfoCardData[] = [
  {
    title: "Sviluppo Tecnico",
    href: "/team#it",
    description: "Realizza prodotti digitali in produzione, usati da migliaia di persone",
    icon: code,
    iconClassName,
  },
  {
    title: "Comunicazione",
    href: "/team#design-marketing",
    description: "Gestisce la comunicazione e l’identità visiva dell’associazione: Instagram, grafiche di eventi…",
    icon: palette,
    iconClassName,
  },
  {
    title: "Gestione HR",
    href: "/team#hr",
    description: "Struttura i processi di recruiting e onboarding e gestisce i volontari del network",
    icon: hr,
    iconClassName,
  },
  {
    title: "Eventi/Partnership",
    href: "/team#events-partnership",
    description: "Organizza eventi e costruisce collaborazioni con aziende e associazioni esterne",
    icon: events,
    iconClassName,
  },
]

export const membershipEmail = `mailto:info@polinetwork.org?subject=${encodeURIComponent("Richiesta ammissione sotto la qualifica di socio")}`

export const membershipSteps = [
  {
    title: "Consulta lo Statuto dell’Associazione",
    icon: statute,
    href: "https://github.com/PoliNetworkOrg/Statuto/blob/main/full.pdf",
  },
  {
    title: "Leggi il Regolamento Interno",
    icon: regulations,
    href: "https://github.com/PoliNetworkOrg/RegolamentoInterno/blob/main/RaccoltaRegolamentiInterni.pdf",
  },
  {
    title: "Dai un occhio alle Privacy Policy",
    icon: privacy,
    href: "https://github.com/PoliNetworkOrg/PrivacyPolicies/releases/download/v1.0/regolamento_soci.pdf",
  },
  { title: "Invia una mail a info@polinetwork.org", icon: mail, href: membershipEmail },
  { title: "Attendi la nostra risposta", icon: reply },
] as const
