import ale from "@/assets/images/storia/ale-he.jpg"
import alessandro from "@/assets/images/storia/alessandro-gabbini.jpg"
import elia from "@/assets/images/storia/elia-falzoni.jpg"
import elisabeta from "@/assets/images/storia/elisabeta-hoxhaj.jpg"
import gabriele from "@/assets/images/storia/gabriele-vigano.jpg"
import lorenzo from "@/assets/images/storia/lorenzo-corallo.jpg"
import tommaso from "@/assets/images/storia/tommaso-morganti.jpg"

/** Shared section container: Figma's 1272px content column, with the homepage's 24/40/64px gutters (md:px-10 overrides TextOnlyLayout's md:px-36). */
export const CONTAINER = "mx-auto w-full max-w-350 px-6 sm:px-10 md:px-10 lg:px-16"

// Contenuti del design Figma “La nostra storia”, nodo 5368:5885.
export const milestones = [
  {
    year: "2016",
    description:
      "Nasce il primo gruppo per rispondere a una necessità semplice: trovare informazioni e parlare con i compagni di corso.",
  },
  {
    year: "2017",
    description: "I gruppi si moltiplicano su Telegram e WhatsApp e iniziamo a coprire tutti i corsi di laurea.",
  },
  {
    year: "2022",
    description: "PoliNetwork diventa un’APS-ETS, con un direttivo eletto e una struttura ancora più democratica.",
  },
  {
    year: "OGGI",
    description:
      "Oltre 200 admin volontari e una community che accompagna ogni giorno migliaia di studenti del Politecnico di Milano.",
  },
] as const

export const chapters = [
  {
    title: "Costruire la rete",
    subtitle: "Dal primo gruppo a una rete per tutti i corsi.",
    description:
      "Il primo gruppo diventa la base per crearne altri. Arrivano i primi admin e volontari e il modello viene testato su Informatica, con gruppi divisi per scaglione. Il test funziona e, dal dicembre successivo, la struttura viene estesa a tutti i corsi, su Telegram e WhatsApp, mesi prima dell’inizio delle lezioni.",
  },
  {
    title: "Trovare il nostro spazio",
    subtitle: "Crescere senza perdere la nostra identità.",
    description:
      "All’inizio PoliNetwork è una realtà piccola e cerca collaborazione con le community già presenti al Politecnico. Con la crescita del network, quegli accordi diventano sempre meno necessari e nascono regole interne più chiare.",
  },
  {
    title: "Il Consiglio degli Admin",
    subtitle: "Da cinque persone a una struttura rappresentativa.",
    description:
      "All’inizio sono cinque persone a coordinare il network. Dopo circa un anno nasce il Consiglio degli Admin, con un rappresentante per ogni corso e due figure di garanzia. Nel tempo il Consiglio cambia quattro volte: la struttura resta, le persone passano il testimone. È anche qui che nascono le prime responsabilità dedicate a IT, comunicazione, eventi e gestione delle persone.",
  },
  {
    title: "Dai dipartimenti ai team",
    subtitle: "Da persone che fanno tutto a persone che lavorano insieme.",
    description:
      "Con la crescita nascono i primi dipartimenti: IT, HR, eventi, gestione interna, social media e marketing. Arrivano processi più strutturati, il recruiting e nuovi eventi. La rete supera i 200 admin attivi e i dipartimenti diventano la base dei team di oggi.",
  },
  {
    title: "2022: l’associazione",
    subtitle: "Il network diventa un’associazione.",
    description:
      "Dopo circa un anno di lavoro sullo Statuto, nel luglio 2022 nasce PoliNetwork APS, iscritta al RUNTS come Ente del Terzo Settore. Il Consiglio degli Admin lascia il posto al Consiglio Direttivo, nasce il Collegio dei Probiviri e le regole che prima dipendevano dalle persone diventano parte della struttura.",
  },
  {
    title: "L’albo, ancora",
    subtitle: "Un obiettivo che resta aperto.",
    description:
      "PoliNetwork è APS-ETS e iscritta al RUNTS, ma non è ancora nell’albo delle associazioni studentesche del Politecnico. La forma scelta non è prevista dal regolamento dell’Ateneo. È un obiettivo ancora da raggiungere.",
  },
] as const

export const boardMembers = [
  {
    name: "Elisabeta Hoxhaj",
    role: "Presidente",
    image: elisabeta,
    crop: "-top-[6.05%] left-[-3.77%] h-[131.91%] w-[103.59%]",
  },
  {
    name: "Alessandro Gabbini",
    role: "Vicepresidente",
    image: alessandro,
    crop: "-top-[10.85%] left-[-0.16%] h-[127.91%] w-full",
  },
  {
    name: "Gabriele Viganò",
    role: "Tesoriere",
    image: gabriele,
    crop: "-top-[8.21%] left-[0.2%] h-[127.48%] w-[99.66%]",
  },
  {
    name: "Lorenzo Corallo",
    role: "Segretario",
    image: lorenzo,
    crop: "-top-[8.82%] left-[-0.03%] h-[127.91%] w-full",
  },
  { name: "Elia Falzoni", role: "", image: elia, crop: "-top-[6.96%] left-0 h-[127.34%] w-full" },
  { name: "Ale He", role: "", image: ale, crop: "-top-[8.01%] left-[0.22%] h-[127.06%] w-[99.78%]" },
  { name: "Tommaso Morganti", role: "", image: tommaso, crop: "-top-[5.9%] left-0 h-[127.34%] w-full" },
] as const

// Il mockup fornisce i ritratti soltanto per il mandato 2024–oggi.
export const boardTerms = ["2016-2019", "2019-2021", "2022-2023", "2023-2024", "2024-OGGI"] as const

// Nomi unici presenti nei ringraziamenti del mockup; i ruoli non sono specificati.
export const contributors = [
  ...boardMembers.map(({ name }) => ({ name, category: "Direttivi" })),
  ...[
    "Elia Maggioni",
    "Raif Muhammad",
    "Diego Aldarese",
    "Federico Armellini",
    "Luca Cattaneo",
    "Fabrizio Vasconi",
    "Giulia La Ferla",
  ].map((name) => ({ name, category: null })),
]
