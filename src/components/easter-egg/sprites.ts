import { COLORS } from "./constants"

// angolo in alto a sinistra del box di dialogo, ricalcato pixel per pixel; il bordo parte dall'offset 4
export const CORNER_OFFSET = 4
export const CORNER_SIZE = 13
export const CORNER_ROWS = [
  "........#....",
  "........#o...",
  "........#oo..",
  ".....#####o..",
  "......##ooo##",
  "...#....#oo##",
  "...##.t.#oooo",
  "...##...o.o.o",
  "####o##oooo#.",
  ".oo#ooo..o...",
  "..ooooooo....",
  "....##o.#....",
  "....##oo.....",
] as const
export const CORNER_PALETTE = {
  ".": "#000000",
  "#": COLORS.border,
  o: COLORS.borderInner,
  t: COLORS.sparkle,
}

export const SOUL_ROWS = [
  ".##...##.",
  "####.####",
  "#########",
  "#########",
  ".#######.",
  "..#####..",
  "...###...",
  "....#....",
] as const
export const SOUL_PALETTE = { "#": COLORS.soul }
