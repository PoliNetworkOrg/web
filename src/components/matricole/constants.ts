import {
  FiBarChart2,
  FiBell,
  FiBook,
  FiCpu,
  FiDollarSign,
  FiFolder,
  FiHome,
  FiMap,
  FiMonitor,
  FiRadio,
  FiRefreshCw,
  FiRepeat,
  FiShoppingCart,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi"
import type { AccordionListItem } from "../accordion-list/types"

export const resources = [
  {
    title: "Graduatorie",
    description: "Risultati storici e soglie di accesso per i vari corsi di laurea.",
    icon: FiBarChart2,
    href: "https://rankings.polinetwork.org/",
  },
  {
    title: "Progetto TOL",
    description: "Informazioni sul test di ingresso (TOL) e su come prepararsi al meglio.",
    icon: FiMonitor,
    href: "https://tol.polinetwork.org/",
  },
] as const

export const guides = [
  {
    title: "Guida della matricola",
    description: "Dalla prima iscrizione alla vita in campus: il manuale completo per ogni nuovo studente.",
    icon: FiBook,
    href: "/matricole/guida",
  },
  {
    title: "Mappa Microonde",
    description: "Dove scaldare il pranzo nei vari campus.",
    icon: FiMap,
  },
  {
    title: "Corsi a Scelta",
    description: "Consigli su come comporre il Piano di Studi.",
    icon: FiBook,
  },
  {
    title: "News",
    description: "Le ultime novità dagli studenti del Politecnico.",
    icon: FiRadio,
  },
  {
    title: "Borsa di Studio",
    description: "Requisiti e scadenze per le agevolazioni.",
    icon: FiDollarSign,
  },
] as const

export const hub = {
  title: "Telegram Hub",
  description:
    "Unisciti alla più grande rete di studenti del Poli su Telegram. Gruppi specifici per ogni esigenza, dai libri alla ricerca della casa.",
  cards: [
    {
      title: "Generale",
      icon: FiBell,
      href: "https://t.me/PoliGruppo",
    },
    {
      title: "Matricole",
      icon: FiUserCheck,
      href: "https://t.me/polimatricole",
    },
    {
      title: "Ripetizioni",
      icon: FiUsers,
      href: "https://t.me/joinchat/l10OF3vF6fEzOTRk",
    },
    {
      title: "PoliBook",
      icon: FiBook,
      href: "https://t.me/joinchat/6nmuXXhAOr1mYTJk",
    },
    {
      title: "DSU",
      icon: FiDollarSign,
      href: "https://t.me/joinchat/4kO9DtAiTVM0NTU0",
    },
    {
      title: "Mercatino",
      icon: FiShoppingCart,
      href: "https://t.me/mercatinopolimi",
    },
    {
      title: "Case",
      icon: FiHome,
      href: "https://t.me/joinchat/jmpNOitFNFw1MzJk",
    },
    {
      title: "Consigli PC",
      icon: FiMonitor,
      href: "https://t.me/joinchat/oD7NGpl0W6VjYmI0",
    },
  ],
}

export const materiali = {
  title: "Materiali",
  description:
    "Il più grande archivio didattico creato dagli studenti per gli studenti del Politecnico di Milano. Migliaia di appunti e temi d’esame.",
  icon: FiFolder,
  href: "/materials",
}

export const techTools = {
  title: "Tech Tools",
  description: "Una serie di Tools sviluppati dagli studenti del Politecnico di Milano.",
  icon: FiCpu,
  cards: [
    {
      title: "Sync Orario",
      icon: FiRepeat,
      href: "https://bebora.github.io/polimi-schedule-js/",
    },
    {
      title: "WeBeep Sync",
      icon: FiRefreshCw,
      href: "https://github.com/toto04/webeep-sync",
    },
  ],
}

export const accordionItems: AccordionListItem[] = [
  {
    value: "item-1",
    trigger: "Le lezioni della prima settimana si tengono regolarmente?",
    content:
      "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell'esercitatore.",
  },
  {
    value: "item-2",
    trigger: "Come faccio ad accedere ai materiali del corso?",
    content:
      "I materiali dei corsi sono disponibili su Beep (il portale e-learning del Politecnico). Puoi accedervi con le tue credenziali di Ateneo (codice persona e password). Ogni docente carica le proprie slide, esercizi e risorse direttamente sulla pagina del corso.",
  },
  {
    value: "item-3",
    trigger: "Come funziona la prenotazione agli esami?",
    content:
      "La prenotazione agli esami avviene tramite il portale Online Services (servizionline.polimi.it). Devi prenotarti entro la scadenza indicata per ogni appello. Ricordati di verificare i prerequisiti necessari prima di iscriverti a un esame.",
  },
  {
    value: "item-4",
    trigger: "Cos'è il codice persona e dove lo trovo?",
    content:
      "Il codice persona è il tuo identificativo univoco al Politecnico, composto da 6 cifre. Lo trovi nella lettera di ammissione o nella mail di benvenuto ricevuta dopo l'immatricolazione. Serve per accedere a tutti i servizi online dell'Ateneo.",
  },
  {
    value: "item-5",
    trigger: "Come posso contattare PoliNetwork?",
    content:
      "Puoi contattare PoliNetwork tramite i nostri canali Telegram o attraverso il sito ufficiale. Siamo un'associazione studentesca e offriamo supporto, risorse e una community per tutti gli studenti del Politecnico.",
  },
]
