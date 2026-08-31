import type { MazeDefinition } from "./types"

// Ogni labirinto vale esattamente 60 CFU (1×@=12 + 2×o=12 + 4×:=12 + 24×.=24),
// così che 3 anni completati facciano esattamente 180 CFU = laurea.
// Verificato da `npm run validate:mazes` ad ogni modifica.

const YEAR_1_ROWS = [
  "###############",
  "#: .#G @ : o G#",
  "# # # # # ### #",
  "#. .#o : . . .#",
  "# ### ####### #",
  "#. .#C : . .#.#",
  "# # ##### # # #",
  "T. . . . . .#.T",
  "# # ####### # #",
  "#  . . . . .# #",
  "# # ##### ### #",
  "#      .#     #",
  "# # ### ##### #",
  "# # #     #   #",
  "# # # # # # # #",
  "#      P C    #",
  "###############",
]

const YEAR_2_ROWS = [
  "###############",
  "#. C o @ G G G#",
  "# ### ####### #",
  "#. . : . . .#o#",
  "# # ### # # # #",
  "#. .#. :#.#: :#",
  "# ### ### #####",
  "T. .#.#. .#. .T",
  "### # # # # # #",
  "#. .#. . . .#.#",
  "# # ####### # #",
  "#           # #",
  "####### # # # #",
  "#             #",
  "# # # # ### # #",
  "#     #P C    #",
  "###############",
]

const YEAR_3_ROWS = [
  "###############",
  "#@ : o G o G G#",
  "# # ##### # # #",
  "#: . . . : : C#",
  "### # #########",
  "#. .#. . . . .#",
  "# # # # # ### #",
  "T. .#.#. . . .T",
  "# # # # # ### #",
  "#. .#. .   . .#",
  "# ### ### # ###",
  "#.  #     #   #",
  "### ### # # # #",
  "#       #   # #",
  "# ### ### ### #",
  "#      P C    #",
  "###############",
]

export const MAZES: MazeDefinition[] = [
  {
    year: 1,
    title: "1° anno",
    rows: YEAR_1_ROWS,
    examNames: [{ cell: "@", name: "Analisi Matematica I" }],
    ghostCount: 2,
    ghostChaseChance: 0.5,
    ghostSpeedFactor: 0.85,
  },
  {
    year: 2,
    title: "2° anno",
    rows: YEAR_2_ROWS,
    examNames: [{ cell: "@", name: "Fisica II" }],
    ghostCount: 3,
    ghostChaseChance: 0.6,
    ghostSpeedFactor: 0.88,
  },
  {
    year: 3,
    title: "3° anno",
    rows: YEAR_3_ROWS,
    examNames: [{ cell: "@", name: "Tesi di Laurea" }],
    ghostCount: 3,
    ghostChaseChance: 0.7,
    ghostSpeedFactor: 0.9,
  },
]
