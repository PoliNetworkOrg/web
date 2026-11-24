export type HistoricalPerson = {
  name: string
  role: string
  period?: string
}

export const historySources = {
  history: "https://polinetwork.org/it/learnmore/about_us/history/",
  association: "https://polinetwork.org/it/learnmore/about_us/",
}

// Names, roles and periods transcribed from the two public pages above; group admin appointments are excluded.
export const founders: HistoricalPerson[] = [
  { name: "Federico Armellini", role: "Ideatore e cofondatore", period: "Agosto 2016" },
  { name: "Carlo Giovani", role: "Cofondatore", period: "Agosto 2016" },
  { name: "Nicolò Rovaris", role: "Cofondatore", period: "Agosto 2016" },
]

export const historicalBoards: Record<string, { period: string; people: HistoricalPerson[] }> = {
  "Direttivo 1": {
    period: "Ottobre 2022 – aprile 2023",
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
  "Direttivo 2": {
    period: "Aprile 2023 – novembre 2024",
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
}

export const guarantors: HistoricalPerson[] = [
  { name: "Federico Armellini", role: "Garante", period: "Agosto 2016 – settembre 2020" },
  { name: "Carlo Giovani", role: "Garante", period: "Agosto 2016 – settembre 2020" },
  { name: "Tecla Trifilò", role: "Garante", period: "Settembre 2020 – marzo 2022" },
  { name: "Elia Maggioni", role: "Garante", period: "Nomina: settembre 2020" },
  { name: "Raif Muhammad", role: "Garante", period: "Nomina: aprile 2022" },
]

export const historicalArbiters: HistoricalPerson[] = [
  { name: "Federico Armellini", role: "Presidente", period: "Marzo – giugno 2023" },
  { name: "Fabrizio Vasconi", role: "Segretario", period: "Marzo – giugno 2023" },
  { name: "Fabrizio Vasconi", role: "Presidente", period: "Giugno 2023 – luglio 2024" },
  { name: "Luca Cattaneo", role: "Segretario", period: "Giugno 2023 – luglio 2024" },
  { name: "Giacomo Marra", role: "Presidente", period: "Periodo non indicato nel sito precedente" },
  { name: "Giulia La Ferla", role: "Segretaria", period: "Periodo non indicato nel sito precedente" },
]

export const historicalDelegates: HistoricalPerson[] = [
  { name: "Federico Armellini", role: "Comunicazione interna e crescita", period: "Agosto 2016 – agosto 2018" },
  { name: "Carlo Giovani", role: "Eventi e partnership", period: "Agosto 2016 – agosto 2018" },
  { name: "Carlo Giovani", role: "Comunicazione esterna", period: "Agosto 2016 – agosto 2018" },
  { name: "Tecla Trifilò", role: "Comunicazione interna e crescita", period: "Gennaio 2018 – ottobre 2019" },
  { name: "Peru Larrabeiti", role: "Comunicazione interna e crescita", period: "Ottobre 2019 – aprile 2021" },
  { name: "Raif Muhammad", role: "Eventi e partnership", period: "Ottobre 2019 – aprile 2021" },
  { name: "Gabriele Auriemma", role: "Eventi e partnership", period: "Ottobre 2019 – aprile 2021" },
  {
    name: "Federico Armellini",
    role: "Gestione progetti innovativi e supporto tecnico (IT)",
    period: "Settembre 2020",
  },
  {
    name: "Elia Maggioni",
    role: "Gestione progetti innovativi e supporto tecnico (IT)",
    period: "Settembre 2020 – ottobre 2021",
  },
  { name: "Diego Aldarese", role: "Eventi e partnership", period: "Giugno 2021 – giugno 2022" },
  { name: "Raif Muhammad", role: "Comunicazione interna e crescita", period: "Giugno 2021 – giugno 2022" },
  { name: "Fabrizio Vasconi", role: "Comunicazione esterna", period: "Giugno 2021 – febbraio 2022" },
  {
    name: "Elia Maggioni",
    role: "Gestione progetti innovativi e supporto tecnico (IT)",
    period: "Ottobre 2021 – ottobre 2022",
  },
  { name: "Raif Muhammad", role: "Comunicazione interna e crescita", period: "Settembre 2022 – aprile 2023" },
  { name: "Diego Aldarese", role: "Eventi e partnership", period: "Settembre 2022 – aprile 2023" },
  { name: "Giulia La Ferla", role: "Gestione social", period: "Settembre 2022 – aprile 2023" },
  { name: "Giorgia Nanni", role: "Social media management e marketing", period: "Aprile 2023 – dicembre 2024" },
  { name: "Diego Aldarese", role: "Eventi e partnership", period: "Aprile 2023 – dicembre 2024" },
  {
    name: "Tommaso Morganti",
    role: "Gestione progetti innovativi e supporto tecnico (IT)",
    period: "Aprile 2023 – dicembre 2024",
  },
  { name: "Alice Carosi", role: "Gestione interna", period: "Aprile 2023 – dicembre 2024" },
  { name: "Elia Maggioni", role: "Relazioni istituzionali", period: "Aprile 2023 – aprile 2024" },
  { name: "Tommaso Morganti", role: "Relazioni istituzionali", period: "Aprile – dicembre 2024" },
]

export const historicalDepartments: HistoricalPerson[] = [
  { name: "Hui He (Ale)", role: "Gestione interna · capo" },
  { name: "Elisabeta Hoxhaj", role: "Gestione interna · vice" },
  { name: "Lorenzo Corallo", role: "Gestione progetti innovativi e supporto tecnico (IT) · capo" },
  { name: "Tommaso Morganti", role: "Gestione progetti innovativi e supporto tecnico (IT) · vice" },
  { name: "Elisabeta Hoxhaj", role: "Relazioni istituzionali · capo" },
  { name: "Elia Falzoni", role: "Relazioni istituzionali · vice" },
  { name: "Gabriele Viganò", role: "Eventi e partnership · capo" },
  { name: "Giorgia Nanni", role: "Eventi e partnership · vice" },
  { name: "Chiara Maiutto", role: "Eventi e partnership · vice" },
  { name: "Giulia Messina", role: "Social media management e marketing · capo" },
  { name: "Giorgia Nanni", role: "Social media management e marketing · vice" },
]
