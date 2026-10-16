import { FiBriefcase, FiCompass, FiFlag, FiUsers } from "react-icons/fi"
import {
  LuBookUser,
  LuCodeXml,
  LuCrown,
  LuGlobe,
  LuHandshake,
  LuPencilRuler,
  LuScale,
  LuShield,
  LuUserCog,
  LuUsersRound,
} from "react-icons/lu"

export const associationBodies = [
  {
    id: "assemblea",
    icon: FiUsers,
    title: "Assemblea dei Soci",
    description:
      "È l’organo sovrano di PoliNetwork. Si riunisce almeno una volta l’anno per approvare il bilancio consuntivo e, ogni due anni, per eleggere il Consiglio Direttivo e il Collegio dei Probiviri. Approva eventuali modifiche allo Statuto. Ogni socio ha diritto di voto e può candidarsi direttamente a entrambi gli organi.",
  },
  {
    id: "consiglio",
    icon: LuCrown,
    title: "Consiglio Direttivo",
    description:
      "È l’organo esecutivo e di garanzia dell’associazione. Vigila sulle attività di PoliNetwork per preservare i valori dello Statuto, gestisce le finanze e i rapporti istituzionali con partner esterni, emana i regolamenti interni. Approva o respinge le linee d’azione proposte dai singoli team e le strategie delineate dal Team Growth, senza gestire direttamente le attività quotidiane dei team.",
  },
  {
    id: "probiviri",
    icon: LuScale,
    title: "Collegio dei Probiviri",
    description:
      "È l’organo di garanzia interna, indipendente dal Consiglio Direttivo. Interviene in caso di controversie tra membri o organi dell’associazione, contestazioni sulle elezioni, e vigila sul rispetto dello Statuto e dei regolamenti quando è in gioco l’imparzialità del Direttivo stesso. Viene eletto dall’Assemblea dei Soci con lo stesso mandato biennale del Direttivo, in modo indipendente da esso.",
  },
  {
    id: "growth",
    icon: LuUserCog,
    title: "Team Growth",
    description:
      "È il livello di coordinamento tra i cinque team operativi: riunisce i Capi Dipartimento e alcuni membri del Direttivo per allineare le priorità comuni, le nomine, il recruiting e le decisioni che coinvolgono più team contemporaneamente. Non è un team a sé e non si aprono candidature dirette: si entra in Team Growth diventando Capo Dipartimento di uno dei cinque team.",
  },
]

export const participationPaths = [
  {
    title: "I team operativi",
    icon: LuUsersRound,
    description:
      "PoliNetwork lavora attraverso cinque team, ciascuno con un proprio ambito di responsabilità e un Capo Dipartimento che risponde al Consiglio Direttivo.",
    href: "/team",
    cta: "Esplora i team",
  },
  {
    title: "I Soci",
    icon: FiUsers,
    description:
      "I soci sono i membri formali dell’associazione ai sensi dello Statuto. Votano in Assemblea, eleggono Consiglio Direttivo e Collegio dei Probiviri, e possono candidarsi a entrambi gli organi. Rappresentano il livello di partecipazione più alto alla vita istituzionale di PoliNetwork.",
    href: "/join#socio",
    cta: "Unisciti ai soci",
  },
  {
    title: "Rete Admin",
    icon: LuShield,
    description:
      "Gli admin costituiscono la rete di moderazione dei gruppi, organizzata per corso di laurea e sede. Ogni area disciplinare ha un Capo Admin che coordina gli admin del proprio ambito e fa da riferimento per le situazioni più complesse.",
    href: "/join#admin",
    cta: "Diventa Admin",
  },
]

export const teamLeads = [
  { title: "Team lead HR", icon: LuBookUser },
  { title: "Team lead IT", icon: LuCodeXml },
  { title: "Team lead Design & Marketing", icon: LuPencilRuler },
  { title: "Team lead International", icon: LuGlobe },
  { title: "Team lead Eventi & Partnership", icon: LuHandshake },
]

export const legalFacts = [
  {
    title: "Associazione di promozione sociale",
    description:
      "PoliNetwork è costituita come PoliNetwork APS (Associazione di Promozione Sociale), Ente del Terzo Settore.",
    icon: FiBriefcase,
  },
  {
    title: "Iscrizione e sede",
    description:
      "È iscritta al RUNTS con il numero 42822 (Lombardia), con sede legale a Milano e codice fiscale 97927490157.",
    icon: FiCompass,
  },
  {
    title: "Indipendenza",
    description:
      "È indipendente dal Politecnico di Milano per scelta: questa indipendenza permette di gestire l’infrastruttura in autonomia e di rispondere alle esigenze degli studenti senza vincoli istituzionali.",
    icon: FiFlag,
  },
]

export const statuteHref = "https://github.com/PoliNetworkOrg/Statuto/blob/main/full.pdf"
export const regulationsHref =
  "https://github.com/PoliNetworkOrg/RegolamentoInterno/blob/main/RaccoltaRegolamentiInterni.pdf"
