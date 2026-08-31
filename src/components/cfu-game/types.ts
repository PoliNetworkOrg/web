export type Direction = "up" | "down" | "left" | "right" | "none"

export type CellType =
  | "#" // wall
  | " " // empty floor (already eaten / walkable)
  | "." // 1 CFU
  | ":" // 3 CFU
  | "o" // 6 CFU
  | "O" // 9 CFU
  | "@" // 12 CFU
  | "C" // caffè power-up
  | "P" // player spawn
  | "G" // ghost spawn
  | "-" // ghost house door
  | "T" // tunnel

export const CFU_VALUE_BY_CELL: Partial<Record<CellType, number>> = {
  ".": 1,
  ":": 3,
  o: 6,
  O: 9,
  "@": 12,
}

export type Vec2 = { x: number; y: number }

export type ExamName = {
  cell: "@" | "O" | "o"
  name: string
}

export type MazeDefinition = {
  year: 1 | 2 | 3
  title: string
  rows: string[]
  examNames: ExamName[]
  ghostCount: number
  ghostChaseChance: number // 0..1
  ghostSpeedFactor: number // relative to player speed, < 1
}

export type GhostState = {
  id: number
  pos: Vec2 // tile-space, fractional
  dir: Direction
  color: string
  vulnerable: boolean
  vulnerableUntilMs: number
  spawn: Vec2
}

export type FloatingPopup = {
  id: number
  text: string
  x: number
  y: number
  createdAtMs: number
}

export type GamePhase = "intro" | "playing" | "dying" | "levelComplete" | "graduated" | "gameOver"

export type EngineState = {
  phase: GamePhase
  yearIndex: number // 0,1,2 -> anno 1,2,3
  grid: CellType[][]
  totalCfuInLevel: number
  cfu: number // 0..180 cumulative across levels
  score: number
  livesLeft: number // "appelli"
  player: {
    pos: Vec2
    dir: Direction
    nextDir: Direction
    speedTilesPerSec: number
    mouthAngle: number
    moving: boolean
  }
  ghosts: GhostState[]
  goldenSessionUntilMs: number
  popups: FloatingPopup[]
  elapsedMs: number
  pausedReason: "user" | "hidden" | null
}

export type CFUGameStats = {
  cfu: number
  score: number
  timeMs: number
}
