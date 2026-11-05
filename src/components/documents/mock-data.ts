import type { DocumentCategory } from "./types"

// Demonstration content only. Replace this catalog when official documents are available.
export const mockDocumentCategories: DocumentCategory[] = [
  {
    id: "associazione",
    title: "Associazione",
    description: "Chi siamo e su quali principi ci fondiamo.",
    documents: [
      {
        title: "PoliNetwork in breve",
        description: "Una panoramica dell’associazione e delle sue attività.",
        href: "/documents/mock/polinetwork-in-breve.pdf",
      },
      {
        title: "Statuto dell’associazione",
        description: "Finalità, organizzazione e principi associativi.",
        href: "/documents/mock/statuto.pdf",
      },
    ],
  },
  {
    id: "regolamenti",
    title: "Regolamenti",
    description: "Le regole dell’associazione e della community.",
    documents: [
      {
        title: "Regolamento interno dell’associazione",
        description: "Le regole di organizzazione e funzionamento dell’associazione.",
        href: "/documents/mock/regolamento-interno.pdf",
      },
      {
        title: "Regolamento per gli utenti",
        description: "Le regole di partecipazione ai gruppi e alle piattaforme PoliNetwork.",
        href: "/documents/mock/regolamento-utenti.pdf",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy e Informative",
    description: "Come trattiamo e proteggiamo i dati personali.",
    documents: [
      {
        title: "Associati e candidati soci",
        description: "Il trattamento dei dati personali di chi è socio o richiede di diventarlo.",
        href: "/documents/mock/privacy-soci.pdf",
      },
      {
        title: "App PoliNetwork",
        description: "Il trattamento dei dati personali nell’app PoliNetwork.",
        href: "/documents/mock/privacy-app.pdf",
      },
      {
        title: "Candidati CCS – elezioni 2023",
        description: "Il trattamento dei dati personali dei candidati alle elezioni CCS di maggio 2023.",
        href: "/documents/mock/privacy-ccs.pdf",
      },
    ],
  },
  {
    id: "bilanci",
    title: "Bilanci",
    description: "Come gestiamo le risorse dell’associazione.",
    documents: [
      { title: "Bilancio 2024", href: "/documents/mock/bilancio-2024.pdf" },
      { title: "Bilancio 2023", href: "/documents/mock/bilancio-2023.pdf" },
      { title: "Bilancio 2022", href: "/documents/mock/bilancio-2022.pdf" },
    ],
  },
]
