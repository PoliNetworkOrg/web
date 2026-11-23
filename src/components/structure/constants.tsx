import { FiBriefcase, FiCompass, FiFlag, FiUsers } from "react-icons/fi"
import { LuBookUser, LuCodeXml, LuHandshake, LuPencilRuler, LuShield, LuUsersRound } from "react-icons/lu"
import { Highlight as Blue } from "@/components/collabora/section"

export const associationBodies = [
  {
    id: "assemblea",
    title: "Assemblea dei Soci",
    description: (
      <>
        È <Blue>l’organo sovrano</Blue> di PoliNetwork. Si riunisce almeno una volta l’anno per approvare il bilancio
        consuntivo e, ogni due anni, per <Blue>eleggere il Consiglio Direttivo e il Collegio dei Probiviri</Blue>.
        Approva eventuali modifiche allo Statuto. Ogni socio ha diritto di voto e può candidarsi direttamente a entrambi
        gli organi.
      </>
    ),
  },
  {
    id: "consiglio",
    title: "Consiglio Direttivo",
    description: (
      <>
        È <Blue>l’organo esecutivo e di garanzia</Blue> dell’associazione. Vigila sulle attività di PoliNetwork per
        preservare i valori dello Statuto, gestisce le finanze e i rapporti istituzionali con partner esterni, emana i
        regolamenti interni. Approva o respinge le linee d’azione proposte dai team, senza gestire direttamente le loro
        attività quotidiane.
      </>
    ),
  },
  {
    id: "probiviri",
    title: "Collegio dei Probiviri",
    description: (
      <>
        È <Blue>l’organo di garanzia interna</Blue>, indipendente dal Consiglio Direttivo. Interviene in caso di
        controversie tra membri o organi dell’associazione e di contestazioni sulle elezioni, e vigila sul rispetto
        dello Statuto e dei regolamenti quando è in gioco l’imparzialità del Direttivo stesso. Viene eletto
        dall’Assemblea dei Soci con lo stesso mandato biennale del Direttivo.
      </>
    ),
  },
  {
    id: "team",
    title: "I team",
    description: (
      <>
        Sono <Blue>i quattro team operativi</Blue> di PoliNetwork: IT (sito, strumenti per gli studenti e progetti open
        source), HR (reclutamento e gestione delle persone), Design & Marketing (social, grafica e branding) ed Events &
        Partnership (eventi e partnership esterne). Entrare in un team significa{" "}
        <Blue>contribuire alla crescita dell’associazione</Blue> e acquisire competenze concrete.
      </>
    ),
  },
]

export const participationPaths = [
  {
    title: "I team operativi",
    icon: LuUsersRound,
    description: (
      <>
        PoliNetwork lavora attraverso <Blue>quattro team</Blue>, ciascuno con un proprio ambito di responsabilità e un
        team lead che risponde al Consiglio Direttivo.
      </>
    ),
    href: "/team",
  },
  {
    title: "I Soci",
    icon: FiUsers,
    description: (
      <>
        I soci sono i <Blue>membri formali</Blue> dell’associazione. Votano in Assemblea, eleggono Consiglio Direttivo e
        Collegio dei Probiviri e possono candidarsi a entrambi gli organi.
      </>
    ),
    href: "/unisciti#socio",
  },
  {
    title: "Rete Admin",
    icon: LuShield,
    description: (
      <>
        Gli admin sono la <Blue>rete di moderazione dei gruppi</Blue>, organizzata per corso di laurea e sede. Ogni area
        ha un Capo Admin che coordina gli admin e fa da riferimento per le situazioni più complesse.
      </>
    ),
    href: "/unisciti#admin",
  },
]

export const teamLeads = [
  { title: "Team lead HR", icon: LuBookUser },
  { title: "Team lead IT", icon: LuCodeXml },
  { title: "Team lead Design & Marketing", icon: LuPencilRuler },
  { title: "Team lead Eventi & Partnership", icon: LuHandshake },
]

export const legalFacts = [
  {
    title: "Associazione di promozione sociale",
    description: (
      <>
        PoliNetwork è costituita come <Blue>PoliNetwork APS</Blue> (Associazione di Promozione Sociale), Ente del Terzo
        Settore.
      </>
    ),
    icon: FiBriefcase,
  },
  { title: "Sede legale", description: "Milano", icon: FiCompass },
  {
    title: "Indipendenza",
    description: (
      <>
        È <Blue>indipendente dal Politecnico di Milano</Blue> per scelta: questa indipendenza permette di gestire
        l’infrastruttura in autonomia e di rispondere alle esigenze degli studenti senza vincoli istituzionali.
      </>
    ),
    icon: FiFlag,
  },
]
