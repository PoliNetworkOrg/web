/**
 * Registro degli incarichi di PoliNetwork, dal 2016 a oggi: l'unica fonte per l'archivio della Storia e per chi è in
 * carica in Struttura. Ogni elenco è in ordine cronologico e il mandato in carica (`current`) è sempre l'ultimo.
 *
 * Trascritto dal sito precedente: https://polinetwork.org/it/learnmore/about_us/ (in carica) e
 * https://polinetwork.org/it/learnmore/about_us/history/ (storico). Le date mancanti restano vuote, non stimate.
 * Quando cambia un incarico: chiudi il mandato in carica con `to`, togli `current` e aggiungi il nuovo in fondo.
 * I team lead vanno ad anni accademici: a ogni nuovo anno (o cambio a metà anno) aggiungi un mandato con
 * `academicYear`, spostando `current` sull'ultimo.
 */

/** Anno e mese, "AAAA-MM" */
type Month = `${number}-${"01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12"}`

export type Holder = { name: string; role?: string }

export type Term = {
  /** Nome del mandato, quando ne ha uno (es. "Primo Collegio") */
  title?: string
  from?: Month
  to?: Month
  /** Il sito precedente riporta solo il mese di nomina, senza fine */
  appointedOnly?: boolean
  /** Anno accademico del mandato, "2026/27": per i team, che cambiano ad annate */
  academicYear?: `${number}/${number}`
  current?: boolean
  people: Holder[]
}

export type Area = {
  name: string
  terms: Term[]
  /** The team on /team this area became, for the areas still running */
  teamId?: string
  /** What the area was called before it became a team */
  formerNames?: string[]
  /** How an area without a team ended, when we know */
  note?: string
}

const MONTHS = [
  "gennaio",
  "febbraio",
  "marzo",
  "aprile",
  "maggio",
  "giugno",
  "luglio",
  "agosto",
  "settembre",
  "ottobre",
  "novembre",
  "dicembre",
]

function monthName(month: Month) {
  const [year = "", m = ""] = month.split("-")
  return { month: MONTHS[Number(m) - 1] ?? "", year }
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/** "Marzo – giugno 2023", "Ottobre 2019 – aprile 2021", "Da dicembre 2024", "Nomina: settembre 2022", "Anno accademico 2026/27" */
export function formatPeriod({
  from,
  to,
  appointedOnly,
  academicYear,
}: Pick<Term, "from" | "to" | "appointedOnly" | "academicYear">) {
  if (academicYear) {
    const year = `Anno accademico ${academicYear}`
    if (!from) return year
    const start = monthName(from)
    return to
      ? `${year}, fino a ${monthName(to).month} ${monthName(to).year}`
      : `${year}, da ${start.month} ${start.year}`
  }
  if (!from) return ""
  const start = monthName(from)
  if (appointedOnly) return `Nomina: ${start.month} ${start.year}`
  if (!to) return `Da ${start.month} ${start.year}`
  const end = monthName(to)
  if (from === to) return `${capitalize(start.month)} ${start.year}`
  if (start.year === end.year) return `${capitalize(start.month)} – ${end.month} ${end.year}`
  return `${capitalize(start.month)} ${start.year} – ${end.month} ${end.year}`
}

export function currentTerm(terms: Term[]) {
  return terms.find((term) => term.current)
}

/* -------------------------------------------------------------------------------------------------------------- */
/* Prima dell'associazione                                                                                         */
/* -------------------------------------------------------------------------------------------------------------- */

export const founders: Term = {
  from: "2016-08",
  people: [
    { name: "Federico Armellini", role: "Ideatore e cofondatore" },
    { name: "Carlo Giovani", role: "Cofondatore" },
    { name: "Nicolò Rovaris", role: "Cofondatore" },
  ],
}

/** Le due figure di garanzia del Consiglio degli Admin, prima dell'associazione */
export const guarantors: Term[] = [
  { from: "2016-08", to: "2020-09", people: [{ name: "Federico Armellini" }, { name: "Carlo Giovani" }] },
  { from: "2020-09", appointedOnly: true, people: [{ name: "Elia Maggioni" }] },
  { from: "2020-09", to: "2022-03", people: [{ name: "Tecla Trifilò" }] },
  { from: "2022-04", appointedOnly: true, people: [{ name: "Raif Muhammad" }] },
]

/* -------------------------------------------------------------------------------------------------------------- */
/* Organi dell'associazione                                                                                        */
/* -------------------------------------------------------------------------------------------------------------- */

/** I Direttivi passati. Quello in carica, con i ritratti, è `boardMembers` in components/storia/constants. */
export const pastBoards: Term[] = [
  {
    title: "Direttivo 1",
    from: "2022-10",
    to: "2023-04",
    people: [
      { name: "Elia Maggioni", role: "Presidente e tesoriere" },
      { name: "Raif Muhammad", role: "Vicepresidente" },
      { name: "Diego Aldarese", role: "Segretario" },
      { name: "Federico Armellini", role: "Membro del Direttivo" },
      { name: "Luca Cattaneo", role: "Membro del Direttivo" },
      { name: "Fabrizio Vasconi", role: "Membro del Direttivo" },
      { name: "Giulia La Ferla", role: "Membro del Direttivo" },
    ],
  },
  {
    title: "Direttivo 2",
    from: "2023-04",
    to: "2024-11",
    people: [
      { name: "Raif Muhammad", role: "Presidente" },
      { name: "Tommaso Morganti", role: "Vicepresidente" },
      { name: "Diego Aldarese", role: "Tesoriere" },
      { name: "Elia Maggioni", role: "Segretario, prima parte del mandato" },
      { name: "Elia Falzoni", role: "Segretario, seconda parte del mandato" },
      { name: "Giorgia Nanni", role: "Membro del Direttivo" },
      { name: "Lucrezia Alparone", role: "Membro del Direttivo" },
    ],
  },
]

export const currentBoard: Term = { title: "Direttivo 3", from: "2024-11", current: true, people: [] }

export const arbiters: Term[] = [
  {
    title: "Primo Collegio",
    from: "2023-03",
    to: "2023-06",
    people: [
      { name: "Federico Armellini", role: "Presidente" },
      { name: "Fabrizio Vasconi", role: "Segretario" },
    ],
  },
  {
    title: "Secondo Collegio",
    from: "2023-06",
    to: "2024-07",
    people: [
      { name: "Fabrizio Vasconi", role: "Presidente" },
      { name: "Luca Cattaneo", role: "Segretario" },
    ],
  },
  {
    // Il sito precedente non riporta la data di inizio
    title: "Collegio in carica",
    current: true,
    people: [
      { name: "Giacomo Marra", role: "Presidente" },
      { name: "Giulia La Ferla", role: "Segretario" },
    ],
  },
]

/* -------------------------------------------------------------------------------------------------------------- */
/* Deleghe, dipartimenti e team                                                                                   */
/* -------------------------------------------------------------------------------------------------------------- */

const DELEGATE = "Delegato"
const HEAD = "Capo dipartimento"

/**
 * Ogni area con chi l'ha seguita: prima le deleghe, poi i dipartimenti (da dicembre 2024), oggi confluiti nei quattro
 * team di /team. Le aree senza `teamId` sono concluse; quelle di cui non sappiamo dove siano confluite restano a sé.
 */
export const areas: Area[] = [
  {
    name: "Team IT",
    teamId: "it",
    formerNames: ["Gestione progetti innovativi e supporto tecnico (IT)"],
    terms: [
      { from: "2020-09", to: "2020-09", people: [{ name: "Federico Armellini", role: DELEGATE }] },
      { from: "2020-09", to: "2021-10", people: [{ name: "Elia Maggioni", role: DELEGATE }] },
      { from: "2021-10", to: "2022-10", people: [{ name: "Elia Maggioni", role: DELEGATE }] },
      { from: "2023-04", to: "2024-12", people: [{ name: "Tommaso Morganti", role: DELEGATE }] },
      {
        from: "2024-12",
        people: [
          { name: "Lorenzo Corallo", role: HEAD },
          { name: "Tommaso Morganti", role: "Vice" },
        ],
      },
      {
        // Team lead dell'anno in corso; per un cambio a metà anno aggiungi un mandato con `from`
        academicYear: "2026/27",
        current: true,
        people: [
          { name: "Lorenzo Corallo", role: "Team lead" },
          { name: "Tommaso Morganti", role: "Team lead" },
        ],
      },
    ],
  },
  {
    name: "Design & Marketing",
    teamId: "design-marketing",
    formerNames: ["Gestione social", "Social media management e marketing"],
    terms: [
      { from: "2022-09", to: "2023-04", people: [{ name: "Giulia La Ferla", role: DELEGATE }] },
      { from: "2023-04", to: "2024-12", people: [{ name: "Giorgia Nanni", role: DELEGATE }] },
      {
        from: "2024-12",
        people: [
          { name: "Giulia Messina", role: HEAD },
          { name: "Giorgia Nanni", role: "Vice" },
        ],
      },
      {
        // Team lead dell'anno in corso; per un cambio a metà anno aggiungi un mandato con `from`
        academicYear: "2026/27",
        current: true,
        people: [{ name: "Raffaele Tiziano Andolina", role: "Team lead" }],
      },
    ],
  },
  {
    name: "Team HR",
    teamId: "hr",
    formerNames: ["Gestione interna"],
    terms: [
      { from: "2023-04", to: "2024-12", people: [{ name: "Alice Carosi", role: DELEGATE }] },
      {
        from: "2024-12",
        people: [
          { name: "Hui He (Ale)", role: HEAD },
          { name: "Elisabeta Hoxhaj", role: "Vice" },
        ],
      },
      {
        // Team lead dell'anno in corso; per un cambio a metà anno aggiungi un mandato con `from`
        academicYear: "2026/27",
        current: true,
        people: [{ name: "Matteo Zenti", role: "Team lead" }],
      },
    ],
  },
  {
    name: "Team Events & Partnership",
    teamId: "events-partnership",
    formerNames: ["Eventi e partnership"],
    terms: [
      { from: "2016-08", to: "2018-08", people: [{ name: "Carlo Giovani", role: DELEGATE }] },
      {
        from: "2019-10",
        to: "2021-04",
        people: [
          { name: "Raif Muhammad", role: DELEGATE },
          { name: "Gabriele Auriemma", role: DELEGATE },
        ],
      },
      { from: "2021-06", to: "2022-06", people: [{ name: "Diego Aldarese", role: DELEGATE }] },
      { from: "2022-09", to: "2023-04", people: [{ name: "Diego Aldarese", role: DELEGATE }] },
      { from: "2023-04", to: "2024-12", people: [{ name: "Diego Aldarese", role: DELEGATE }] },
      {
        from: "2024-12",
        people: [
          { name: "Gabriele Viganò", role: HEAD },
          { name: "Giorgia Nanni", role: "Vice" },
          { name: "Chiara Maiutto", role: "Vice" },
        ],
      },
      {
        // Team lead dell'anno in corso; per un cambio a metà anno aggiungi un mandato con `from`
        academicYear: "2026/27",
        current: true,
        people: [
          { name: "Gabriele Viganò", role: "Team lead" },
          { name: "Lucia Capuano", role: "Team lead" },
        ],
      },
    ],
  },
  {
    // Il sito precedente non dice in quale team sia confluito
    name: "Relazioni istituzionali",
    note: "Dipartimento fino al passaggio ai quattro team",
    terms: [
      { from: "2023-04", to: "2024-04", people: [{ name: "Elia Maggioni", role: DELEGATE }] },
      { from: "2024-04", to: "2024-12", people: [{ name: "Tommaso Morganti", role: DELEGATE }] },
      {
        from: "2024-12",
        people: [
          { name: "Elisabeta Hoxhaj", role: HEAD },
          { name: "Elia Falzoni", role: "Vice" },
        ],
      },
    ],
  },
  {
    name: "Comunicazione interna e crescita",
    terms: [
      { from: "2016-08", to: "2018-08", people: [{ name: "Federico Armellini", role: DELEGATE }] },
      { from: "2018-01", to: "2019-10", people: [{ name: "Tecla Trifilò", role: DELEGATE }] },
      { from: "2019-10", to: "2021-04", people: [{ name: "Peru Larrabeiti", role: DELEGATE }] },
      { from: "2021-06", to: "2022-06", people: [{ name: "Raif Muhammad", role: DELEGATE }] },
      { from: "2022-09", to: "2023-04", people: [{ name: "Raif Muhammad", role: DELEGATE }] },
    ],
  },
  {
    name: "Comunicazione esterna",
    terms: [
      { from: "2016-08", to: "2018-08", people: [{ name: "Carlo Giovani", role: DELEGATE }] },
      { from: "2021-06", to: "2022-02", people: [{ name: "Fabrizio Vasconi", role: DELEGATE }] },
    ],
  },
]

/** Who leads a team on /team today, from the area it grew out of */
export function teamLeads(teamId: string) {
  return currentTerm(areas.find((area) => area.teamId === teamId)?.terms ?? [])?.people ?? []
}

/* -------------------------------------------------------------------------------------------------------------- */
/* Capi admin dei corsi                                                                                            */
/* -------------------------------------------------------------------------------------------------------------- */

function admin(name: string, from: Month, to?: Month): Term {
  return to ? { from, to, people: [{ name }] } : { from, appointedOnly: true, people: [{ name }] }
}

/** I responsabili admin di ogni corso, fino alle ultime nomine del sito precedente (settembre 2022). */
export const courseAdmins: Area[] = [
  {
    name: "Design degli Interni",
    terms: [admin("Riccardo Serra", "2019-10", "2021-04"), admin("Yu Xingping Angela", "2022-09")],
  },
  {
    name: "Design del Prodotto",
    terms: [admin("Marco Tintori", "2022-09")],
  },
  {
    name: "Design della Comunicazione",
    terms: [admin("Marco Tintori", "2019-10", "2021-04"), admin("Giovanni Malausa", "2022-09")],
  },
  {
    name: "Design della Moda",
    terms: [admin("Letizia Bosco", "2019-10", "2021-04"), admin("Marco Tintori", "2022-09")],
  },
  {
    name: "Geoinformatics Engineering",
    terms: [admin("Mirko Calcaterra", "2022-09")],
  },
  {
    name: "Ingegneria Aerospaziale",
    terms: [
      admin("Raif Muhammad", "2019-10", "2021-04"),
      admin("Raif Muhammad", "2021-06", "2022-06"),
      admin("Raif Muhammad", "2022-09"),
    ],
  },
  {
    name: "Ingegneria Ambientale",
    terms: [admin("Flavio Carta", "2022-09")],
  },
  {
    name: "Ingegneria Biomedica",
    terms: [
      admin("Giada Chiametti", "2019-10", "2021-04"),
      admin("Edoardo Corti", "2020-12", "2021-12"),
      admin("Elena Capurro", "2022-01", "2022-09"),
      admin("Elena Capurro", "2022-09"),
    ],
  },
  {
    name: "Ingegneria Chimica",
    terms: [
      admin("Francesca Marra", "2019-10", "2021-04"),
      admin("Veronica Marrocu", "2021-06", "2022-06"),
      admin("Veronica Marrocu", "2022-09"),
    ],
  },
  {
    name: "Ingegneria Civile",
    terms: [
      admin("Andrea Zito", "2019-10", "2021-04"),
      admin("Piera Candita", "2021-06", "2022-06"),
      admin("Piera Candita", "2022-09"),
    ],
  },
  {
    name: "Ingegneria dei Materiali",
    terms: [
      admin("Antonio Acierno", "2019-10", "2021-04"),
      admin("Giada Martinoia", "2020-09", "2021-10"),
      admin("Francesca Speriani", "2022-09"),
    ],
  },
  {
    name: "Ingegneria dell’Automazione",
    terms: [
      admin("Daniele di Francesco", "2019-10", "2021-04"),
      admin("Diego Aldarese", "2021-05", "2022-05"),
      admin("Diego Aldarese", "2022-09"),
    ],
  },
  {
    name: "Ingegneria delle Telecomunicazioni",
    terms: [
      admin("Marco Leo Porro", "2019-10", "2021-04"),
      admin("Ramkumar Ramadoss", "2020-10", "2021-10"),
      admin("Andrea Corcella", "2021-04", "2022-04"),
    ],
  },
  {
    name: "Ingegneria Edile",
    terms: [admin("Matteo Vitelli", "2019-10", "2021-04"), admin("Camilla Massucci", "2022-09")],
  },
  {
    name: "Ingegneria Elettrica",
    terms: [admin("Alberto Fattori", "2019-10", "2021-04"), admin("Gianmarco Cocchi", "2021-05", "2022-05")],
  },
  {
    name: "Ingegneria Elettronica",
    terms: [
      admin("Giacomo Tombolan", "2019-10", "2021-04"),
      admin("Eric Di Luca", "2021-05", "2022-05"),
      admin("Eric Di Luca", "2022-09"),
    ],
  },
  {
    name: "Ingegneria Energetica",
    terms: [
      admin("Giovanni Oteri", "2019-10", "2021-04"),
      admin("Giovanni Oteri", "2021-06", "2022-06"),
      admin("Raif Muhammad", "2022-09"),
    ],
  },
  {
    name: "Ingegneria Fisica",
    terms: [
      admin("Gabriele Auriemma", "2019-10", "2021-04"),
      admin("Alessandro Baserga", "2021-05", "2022-05"),
      admin("Giovanni Zhang", "2022-04"),
    ],
  },
  {
    name: "Ingegneria Gestionale",
    terms: [
      admin("Peru Larrabeiti", "2019-10", "2021-04"),
      admin("Fabrizio Vasconi", "2021-06", "2022-06"),
      admin("Alice Carosi", "2022-09"),
    ],
  },
  {
    name: "Ingegneria Informatica",
    terms: [
      admin("Federico Armellini", "2016-08", "2018-08"),
      admin("Mirko de Vita", "2019-10", "2021-04"),
      admin("Marco di Gennaro", "2020-09", "2021-09"),
      admin("Jovana Babović", "2021-10", "2022-03"),
      admin("Francesco Puddu", "2022-02", "2023-02"),
    ],
  },
  {
    name: "Ingegneria Matematica",
    terms: [
      admin("Luca Sosta", "2020-03", "2021-07"),
      admin("Lucrezia Alparone", "2021-06", "2022-06"),
      admin("Lucrezia Alparone", "2022-09"),
    ],
  },
  {
    name: "Ingegneria Meccanica",
    terms: [
      admin("Laurens Lanzillo", "2019-10", "2021-04"),
      admin("Laurens Lanzillo", "2021-06", "2022-06"),
      admin("Mercedes Alazraki", "2022-09"),
    ],
  },
  {
    name: "Management of Built Environment",
    terms: [admin("Bruna Lleshi", "2021-05", "2022-05"), admin("Bruna Lleshi", "2022-09")],
  },
  {
    name: "Mobility Engineering",
    terms: [
      admin("Luca Cattaneo", "2021-03", "2022-03"),
      admin("Luca Cattaneo", "2022-03", "2022-09"),
      admin("Luca Cattaneo", "2022-09"),
    ],
  },
  {
    name: "Music and Acoustic Engineering",
    terms: [
      admin("Cecilia Marson", "2020-03", "2021-07"),
      admin("Michele Perrone", "2022-04"),
      admin("Antonio Rizzitiello", "2022-09"),
    ],
  },
  {
    name: "Nuclear Engineering",
    terms: [admin("Pier Ombrini", "2020-11", "2021-06"), admin("Raif Muhammad", "2022-09")],
  },
  {
    name: "Progettazione dell’Architettura",
    terms: [admin("Bruna Lleshi", "2022-09")],
  },
  {
    name: "Urbanistica",
    terms: [admin("Alice Simionato", "2021-06", "2022-06"), admin("Matteo Fiorentino", "2022-09")],
  },
]
