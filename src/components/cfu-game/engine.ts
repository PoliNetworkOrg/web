import { MAZES } from "./mazes"
import { type CellType, CFU_VALUE_BY_CELL, type Direction, type EngineState, type GhostState, type Vec2 } from "./types"

export const TILE = 24 // px logici per tile a scala 1
const PLAYER_SPEED = 6.2 // tile/sec
const GOLDEN_SESSION_MS = 7000
const GOLDEN_WARNING_MS = 2000
const STARTING_LIVES = 3
const GHOST_COLORS = ["#e0455f", "#f2a640", "#3fb6a8", "#a76bf0"]

let popupIdCounter = 0

function cloneGrid(rows: string[]): CellType[][] {
  return rows.map((row) => row.split("") as CellType[])
}

function findAll(grid: CellType[][], type: CellType): Vec2[] {
  const found: Vec2[] = []
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y]
    if (!row) continue
    for (let x = 0; x < row.length; x++) {
      if (row[x] === type) found.push({ x, y })
    }
  }
  return found
}

function cellAt(grid: CellType[][], x: number, y: number): CellType {
  const row = grid[y]
  if (!row) return "#"
  return row[x] ?? "#"
}

function isWalkable(grid: CellType[][], x: number, y: number): boolean {
  return cellAt(grid, x, y) !== "#"
}

function sumCfuInGrid(grid: CellType[][]): number {
  let total = 0
  for (const row of grid) {
    for (const cell of row) {
      total += CFU_VALUE_BY_CELL[cell] ?? 0
    }
  }
  return total
}

const DIR_VECTORS: Record<Exclude<Direction, "none">, Vec2> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

const DIR_ANGLES: Record<Direction, number> = {
  right: 0,
  down: Math.PI / 2,
  left: Math.PI,
  up: -Math.PI / 2,
  none: 0,
}

export function dirAngle(dir: Direction): number {
  return DIR_ANGLES[dir]
}

function isAligned(pos: Vec2): boolean {
  const eps = 0.02
  return Math.abs(pos.x - Math.round(pos.x)) < eps && Math.abs(pos.y - Math.round(pos.y)) < eps
}

function canMove(grid: CellType[][], tileX: number, tileY: number, dir: Direction): boolean {
  if (dir === "none") return false
  const v = DIR_VECTORS[dir]
  return isWalkable(grid, tileX + v.x, tileY + v.y)
}

function wrapTunnel(grid: CellType[][], pos: Vec2): Vec2 {
  const width = grid[0]?.length ?? 0
  const tileY = Math.round(pos.y)
  const row = grid[tileY]
  if (!row) return pos
  if (row[0] === "T" && pos.x < 0) {
    return { x: width - 1, y: pos.y }
  }
  if (row[width - 1] === "T" && pos.x > width - 1) {
    return { x: 0, y: pos.y }
  }
  return pos
}

export function createLevelState(
  yearIndex: number,
  carry: { cfu: number; score: number; livesLeft: number }
): EngineState {
  const maze = MAZES[yearIndex]
  if (!maze) throw new Error(`Anno inesistente: ${yearIndex}`)
  const grid = cloneGrid(maze.rows)

  const playerSpawn = findAll(grid, "P")[0] ?? { x: 1, y: 1 }
  const ghostSpawns = findAll(grid, "G")

  const ghosts: GhostState[] = ghostSpawns.slice(0, maze.ghostCount).map((spawn, i) => ({
    id: i,
    pos: { x: spawn.x, y: spawn.y },
    dir: "left",
    color: GHOST_COLORS[i % GHOST_COLORS.length] ?? "#e0455f",
    vulnerable: false,
    vulnerableUntilMs: 0,
    spawn,
  }))

  // P e G sono solo marker di spawn: la tile sottostante è pavimento vuoto.
  grid[playerSpawn.y]![playerSpawn.x] = " "
  for (const spawn of ghostSpawns) {
    grid[spawn.y]![spawn.x] = " "
  }

  return {
    phase: "playing",
    yearIndex,
    grid,
    totalCfuInLevel: sumCfuInGrid(grid),
    cfu: carry.cfu,
    score: carry.score,
    livesLeft: carry.livesLeft,
    player: {
      pos: { x: playerSpawn.x, y: playerSpawn.y },
      dir: "none",
      nextDir: "none",
      speedTilesPerSec: PLAYER_SPEED,
      mouthAngle: 0,
      moving: false,
    },
    ghosts,
    goldenSessionUntilMs: 0,
    popups: [],
    elapsedMs: 0,
    pausedReason: null,
  }
}

export function createInitialState(): EngineState {
  const state = createLevelState(0, { cfu: 0, score: 0, livesLeft: STARTING_LIVES })
  state.phase = "intro"
  return state
}

export function startGame(state: EngineState) {
  state.phase = "playing"
}

function resetPositionsAfterDeath(state: EngineState) {
  const maze = MAZES[state.yearIndex]!
  const spawn = findAll(
    // il grid corrente ha già " " al posto di P, quindi ricalcoliamo dallo schema originale
    cloneGrid(maze.rows),
    "P"
  )[0] ?? { x: 1, y: 1 }
  state.player.pos = { x: spawn.x, y: spawn.y }
  state.player.dir = "none"
  state.player.nextDir = "none"
  state.player.moving = false
  for (const ghost of state.ghosts) {
    ghost.pos = { x: ghost.spawn.x, y: ghost.spawn.y }
    ghost.vulnerable = false
    ghost.vulnerableUntilMs = 0
  }
  state.goldenSessionUntilMs = 0
}

function pushPopup(state: EngineState, text: string, x: number, y: number) {
  state.popups.push({
    id: popupIdCounter++,
    text,
    x,
    y,
    createdAtMs: state.elapsedMs,
  })
  // tieni al più le ultime popup per non far crescere l'array all'infinito
  if (state.popups.length > 8) state.popups.shift()
}

function moveGhost(state: EngineState, ghost: GhostState, dtSec: number) {
  const maze = MAZES[state.yearIndex]!
  const speed = state.player.speedTilesPerSec * maze.ghostSpeedFactor

  // Come in movePlayer: la direzione va decisa e validata solo nell'istante
  // esatto dello snap, non ricontrollata ogni tick con una posizione ancora
  // frazionaria (Math.round vicino a x.5 è ambiguo e bloccherebbe il nemico
  // a metà cella).
  if (isAligned(ghost.pos)) {
    const tileX = Math.round(ghost.pos.x)
    const tileY = Math.round(ghost.pos.y)
    ghost.pos.x = tileX
    ghost.pos.y = tileY

    const validDirs = (Object.keys(DIR_VECTORS) as Direction[]).filter((d) => canMove(state.grid, tileX, tileY, d))
    const reverse: Record<string, Direction> = {
      up: "down",
      down: "up",
      left: "right",
      right: "left",
    }
    const nonReverse = validDirs.filter((d) => d !== reverse[ghost.dir])
    const options = nonReverse.length > 0 ? nonReverse : validDirs

    if (options.length > 0) {
      const toPlayer = {
        x: state.player.pos.x - tileX,
        y: state.player.pos.y - tileY,
      }
      const chaseChance = ghost.vulnerable ? 0 : maze.ghostChaseChance
      const shouldChase = Math.random() < (ghost.vulnerable ? 1 : chaseChance)

      let chosen: Direction
      if (shouldChase) {
        const sign = ghost.vulnerable ? -1 : 1
        chosen = options.reduce((best, d) => {
          const v = DIR_VECTORS[d as Exclude<Direction, "none">]
          const bestV = DIR_VECTORS[best as Exclude<Direction, "none">]
          const score = sign * (v.x * toPlayer.x + v.y * toPlayer.y)
          const bestScore = sign * (bestV.x * toPlayer.x + bestV.y * toPlayer.y)
          return score > bestScore ? d : best
        }, options[0]!)
      } else {
        chosen = options[Math.floor(Math.random() * options.length)]!
      }
      ghost.dir = chosen
    }
  }

  if (ghost.dir !== "none") {
    const v = DIR_VECTORS[ghost.dir as Exclude<Direction, "none">]
    ghost.pos.x += v.x * speed * dtSec
    ghost.pos.y += v.y * speed * dtSec
  }
  ghost.pos = wrapTunnel(state.grid, ghost.pos)

  if (ghost.vulnerable && state.elapsedMs > ghost.vulnerableUntilMs) {
    ghost.vulnerable = false
  }
}

function movePlayer(state: EngineState, dtSec: number) {
  const p = state.player

  // Il muro davanti va validato SOLO nell'istante esatto dello snap, usando
  // le coordinate intere di quel momento: ricontrollare canMove ogni tick con
  // Math.round() di una posizione ancora frazionaria è ambiguo vicino a x.5
  // e può bloccare il giocatore a metà cella pensando di aver già raggiunto
  // quella successiva.
  if (isAligned(p.pos)) {
    const tileX = Math.round(p.pos.x)
    const tileY = Math.round(p.pos.y)
    p.pos.x = tileX
    p.pos.y = tileY
    consumeCellAt(state, tileX, tileY)
    if (p.nextDir !== "none" && canMove(state.grid, tileX, tileY, p.nextDir)) {
      p.dir = p.nextDir
    } else if (p.dir !== "none" && !canMove(state.grid, tileX, tileY, p.dir)) {
      p.dir = "none"
    }
  }

  if (p.dir !== "none") {
    const v = DIR_VECTORS[p.dir as Exclude<Direction, "none">]
    p.pos.x += v.x * p.speedTilesPerSec * dtSec
    p.pos.y += v.y * p.speedTilesPerSec * dtSec
    p.moving = true
  } else {
    p.moving = false
  }
  p.pos = wrapTunnel(state.grid, p.pos)
}

function consumeCellAt(state: EngineState, tileX: number, tileY: number) {
  const cell = cellAt(state.grid, tileX, tileY)
  const maze = MAZES[state.yearIndex]!
  const cfuValue = CFU_VALUE_BY_CELL[cell]

  if (cfuValue) {
    state.grid[tileY]![tileX] = " "
    state.cfu += cfuValue
    state.score += cfuValue * 10
    const examName = maze.examNames.find((e) => e.cell === cell)?.name
    pushPopup(state, examName ? `${examName} +${cfuValue} CFU` : `+${cfuValue} CFU`, tileX, tileY)
  } else if (cell === "C") {
    state.grid[tileY]![tileX] = " "
    state.goldenSessionUntilMs = state.elapsedMs + GOLDEN_SESSION_MS
    state.score += 50
    for (const ghost of state.ghosts) {
      ghost.vulnerable = true
      ghost.vulnerableUntilMs = state.goldenSessionUntilMs
    }
    pushPopup(state, "☕ sessione d'oro!", tileX, tileY)
  }
}

function handleGhostCollisions(state: EngineState) {
  for (const ghost of state.ghosts) {
    const dx = ghost.pos.x - state.player.pos.x
    const dy = ghost.pos.y - state.player.pos.y
    const dist2 = dx * dx + dy * dy
    if (dist2 < 0.35 * 0.35) {
      if (ghost.vulnerable) {
        ghost.pos = { x: ghost.spawn.x, y: ghost.spawn.y }
        ghost.vulnerable = false
        state.score += 200
        pushPopup(state, "+200", ghost.spawn.x, ghost.spawn.y)
      } else {
        state.phase = "dying"
        state.livesLeft -= 1
        return
      }
    }
  }
}

export function stepEngine(state: EngineState, dtSec: number): EngineState {
  if (state.phase !== "playing" || state.pausedReason) return state

  state.elapsedMs += dtSec * 1000

  const targetMouth = state.player.moving ? 0.32 : 0.02
  const speed = 10 * dtSec
  state.player.mouthAngle += (targetMouth - state.player.mouthAngle) * Math.min(1, speed)

  movePlayer(state, dtSec)
  for (const ghost of state.ghosts) moveGhost(state, ghost, dtSec)
  handleGhostCollisions(state)

  state.popups = state.popups.filter((p) => state.elapsedMs - p.createdAtMs < 1200)

  if (state.livesLeft <= 0) {
    state.phase = "gameOver"
    return state
  }

  const remaining = sumCfuInGrid(state.grid)
  if (remaining === 0 && state.phase === "playing") {
    state.phase = state.cfu >= 180 ? "graduated" : "levelComplete"
  }

  return state
}

export function respawnAfterDeath(state: EngineState): EngineState {
  resetPositionsAfterDeath(state)
  state.phase = "playing"
  return state
}

export function advanceToNextYear(state: EngineState): EngineState {
  const nextYearIndex = state.yearIndex + 1
  return createLevelState(nextYearIndex, {
    cfu: state.cfu,
    score: state.score,
    livesLeft: state.livesLeft,
  })
}

export function setPlayerDirection(state: EngineState, dir: Direction) {
  state.player.nextDir = dir
}

export function setPaused(state: EngineState, reason: "user" | "hidden" | null) {
  state.pausedReason = reason
}

export { GOLDEN_WARNING_MS, STARTING_LIVES }
