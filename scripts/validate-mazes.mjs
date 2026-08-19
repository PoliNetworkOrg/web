// Verifica gli invarianti dei labirinti: se questo script fallisce, il gioco
// può diventare impossibile da completare o rompere il conteggio dei 180 CFU.
// Va eseguito ad ogni modifica di src/components/cfu-game/mazes.ts.
import { readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const mazesFile = path.join(__dirname, "../src/components/cfu-game/mazes.ts")

const CFU_VALUES = { ".": 1, ":": 3, o: 6, O: 9, "@": 12 }
const EXPECTED_TOTAL_PER_MAZE = 60
const EXPECTED_GRAND_TOTAL = 180

function extractMazeBlocks(source) {
  // Estrae ogni array `[...]_ROWS = [ ... ];` dal file TypeScript senza
  // dover compilare il progetto: sufficiente per dati puramente statici.
  const blocks = []
  const regex = /const\s+(\w+_ROWS)\s*=\s*\[([\s\S]*?)\];/g
  let match
  while ((match = regex.exec(source))) {
    const [, name, body] = match
    const rows = [...body.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1].replace(/\\"/g, '"'))
    blocks.push({ name, rows })
  }
  return blocks
}

function floodFillReachable(rows) {
  const h = rows.length
  const w = rows[0].length
  const cellAt = (r, c) => rows[r][c]
  let start = null
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (cellAt(r, c) === "P") start = [r, c]
    }
  }
  if (!start) return { start: null, reached: new Set() }

  const key = (r, c) => `${r},${c}`
  const reached = new Set([key(...start)])
  const queue = [start]

  // Coppie di tunnel sulla stessa riga: uscire da un lato porta all'altro.
  const tunnelRowToCols = new Map()
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (cellAt(r, c) === "T") {
        if (!tunnelRowToCols.has(r)) tunnelRowToCols.set(r, [])
        tunnelRowToCols.get(r).push(c)
      }
    }
  }

  while (queue.length) {
    const [r, c] = queue.pop()
    const neighbors = [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ]
    if (cellAt(r, c) === "T") {
      const cols = tunnelRowToCols.get(r) ?? []
      for (const otherCol of cols) {
        if (otherCol !== c) neighbors.push([r, otherCol])
      }
    }
    for (const [nr, nc] of neighbors) {
      if (nr < 0 || nr >= h || nc < 0 || nc >= w) continue
      const ch = rows[nr][nc]
      if (ch === "#" || ch === undefined) continue
      const k = key(nr, nc)
      if (!reached.has(k)) {
        reached.add(k)
        queue.push([nr, nc])
      }
    }
  }
  return { start, reached }
}

function validateMaze(name, rows) {
  const errors = []
  const width = rows[0]?.length ?? 0

  if (rows.length === 0) {
    return [`${name}: nessuna riga trovata`]
  }
  rows.forEach((row, i) => {
    if (row.length !== width) {
      errors.push(`${name}: riga ${i} ha lunghezza ${row.length}, attesa ${width}`)
    }
  })

  const h = rows.length
  const w = width
  for (let c = 0; c < w; c++) {
    if (rows[0][c] !== "#" || rows[h - 1][c] !== "#") {
      errors.push(`${name}: bordo superiore/inferiore non chiuso in colonna ${c}`)
    }
  }
  for (let r = 0; r < h; r++) {
    const left = rows[r][0]
    const right = rows[r][w - 1]
    const leftOk = left === "#" || left === "T"
    const rightOk = right === "#" || right === "T"
    if (!leftOk || !rightOk) {
      errors.push(`${name}: bordo laterale non chiuso in riga ${r}`)
    }
  }

  let cfuTotal = 0
  const counts = {}
  let playerSpawns = 0
  let ghostSpawns = 0
  let coffeeCount = 0
  const tunnelRows = new Map()

  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      const ch = rows[r][c]
      if (CFU_VALUES[ch]) {
        cfuTotal += CFU_VALUES[ch]
        counts[ch] = (counts[ch] ?? 0) + 1
      }
      if (ch === "P") playerSpawns++
      if (ch === "G") ghostSpawns++
      if (ch === "C") coffeeCount++
      if (ch === "T") {
        tunnelRows.set(r, (tunnelRows.get(r) ?? 0) + 1)
      }
    }
  }

  if (cfuTotal !== EXPECTED_TOTAL_PER_MAZE) {
    errors.push(`${name}: totale CFU = ${cfuTotal}, atteso ${EXPECTED_TOTAL_PER_MAZE} (dettaglio: ${JSON.stringify(counts)})`)
  }
  if (playerSpawns !== 1) {
    errors.push(`${name}: spawn giocatore (P) = ${playerSpawns}, atteso 1`)
  }
  if (ghostSpawns < 1) {
    errors.push(`${name}: nessuno spawn nemico (G) trovato`)
  }
  if (coffeeCount !== 2) {
    errors.push(`${name}: caffè (C) = ${coffeeCount}, attesi 2`)
  }
  for (const [row, count] of tunnelRows) {
    if (count !== 2) {
      errors.push(`${name}: riga ${row} ha ${count} tunnel (T), atteso 0 o 2 per riga`)
    }
  }

  if (playerSpawns === 1) {
    const { reached } = floodFillReachable(rows)
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        const ch = rows[r][c]
        const isPelletOrSpecial = CFU_VALUES[ch] || ch === "C" || ch === "G" || ch === "T"
        if (isPelletOrSpecial && !reached.has(`${r},${c}`)) {
          errors.push(`${name}: cella '${ch}' in (${r},${c}) non raggiungibile dallo spawn P`)
        }
      }
    }
  }

  return { errors, cfuTotal }
}

const source = readFileSync(mazesFile, "utf8")
const blocks = extractMazeBlocks(source)

if (blocks.length === 0) {
  console.error(`Nessun labirinto trovato in ${mazesFile}`)
  process.exit(1)
}

let allErrors = []
let grandTotal = 0

for (const { name, rows } of blocks) {
  const { errors, cfuTotal } = validateMaze(name, rows)
  allErrors.push(...errors)
  grandTotal += cfuTotal ?? 0
  console.log(`${name}: ${cfuTotal} CFU, ${errors.length} errori`)
}

if (grandTotal !== EXPECTED_GRAND_TOTAL) {
  allErrors.push(`TOTALE su tutti i labirinti = ${grandTotal}, atteso ${EXPECTED_GRAND_TOTAL}`)
}

if (allErrors.length > 0) {
  console.error("\nErrori di validazione:")
  for (const err of allErrors) console.error(`  - ${err}`)
  process.exit(1)
}

console.log(`\nOK — ${blocks.length} labirinti validi, totale ${grandTotal} CFU.`)
