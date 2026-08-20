import { dirAngle, TILE } from "./engine"
import { PALETTE } from "./palette"
import type { EngineState } from "./types"
import { CFU_VALUE_BY_CELL } from "./types"

const WALL_COLOR = PALETTE.bluePrimary
const BG_COLOR = "#050b18"
const PELLET_COLORS: Record<string, string> = {
  ".": PALETTE.blueTertiary,
  ":": PALETTE.blueSecondary,
  o: PALETTE.green,
  O: PALETTE.red,
  "@": PALETTE.red,
}

export type RenderOptions = {
  reducedMotion: boolean
}

function drawWalls(ctx: CanvasRenderingContext2D, state: EngineState) {
  ctx.strokeStyle = WALL_COLOR
  ctx.lineWidth = TILE * 0.28
  ctx.lineCap = "round"
  ctx.lineJoin = "round"

  const grid = state.grid
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y]
    if (!row) continue
    for (let x = 0; x < row.length; x++) {
      if (row[x] !== "#") continue
      const cx = x * TILE + TILE / 2
      const cy = y * TILE + TILE / 2
      // Disegna solo i segmenti verso vicini non-muro, per un effetto "tubo"
      // continuo invece di quadrati pieni.
      const right = row[x + 1]
      const down = grid[y + 1]?.[x]
      if (right === "#") {
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + TILE, cy)
        ctx.stroke()
      }
      if (down === "#") {
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx, cy + TILE)
        ctx.stroke()
      }
    }
  }
}

function drawPellets(ctx: CanvasRenderingContext2D, state: EngineState, tSec: number) {
  const grid = state.grid
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y]
    if (!row) continue
    for (let x = 0; x < row.length; x++) {
      const cell = row[x]
      if (!cell) continue
      const cx = x * TILE + TILE / 2
      const cy = y * TILE + TILE / 2

      if (cell === "C") {
        const pulse = 1 + 0.15 * Math.sin(tSec * 6)
        ctx.font = `${TILE * 0.9 * pulse}px system-ui, sans-serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("☕", cx, cy + 1)
        continue
      }

      const color = PELLET_COLORS[cell]
      if (!color) continue

      const isBig = cell === "@" || cell === "O"
      const showValue = cell !== "." && cell !== ":"
      const baseRadius = cell === "." ? TILE * 0.09 : cell === ":" ? TILE * 0.13 : TILE * 0.22
      const radius = isBig ? baseRadius * (1 + 0.08 * Math.sin(tSec * 4)) : baseRadius

      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fill()

      if (showValue) {
        const value = CFU_VALUE_BY_CELL[cell]
        ctx.fillStyle = PALETTE.textPrimary
        ctx.font = `bold ${TILE * 0.34}px system-ui, sans-serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(String(value), cx, cy + 1)
      }
    }
  }
}

function drawGhost(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  vulnerable: boolean,
  dirX: number,
  dirY: number
) {
  const r = TILE * 0.42
  ctx.fillStyle = vulnerable ? PALETTE.grey : color
  ctx.beginPath()
  ctx.arc(x, y - r * 0.1, r, Math.PI, 0)
  ctx.lineTo(x + r, y + r * 0.6)
  for (let i = 0; i < 4; i++) {
    const wx = x + r - (i * (2 * r)) / 4
    ctx.quadraticCurveTo(wx - r / 4, y + (i % 2 === 0 ? r * 1.05 : r * 0.5), wx - r / 2, y + r * 0.6)
  }
  ctx.lineTo(x - r, y - r * 0.1)
  ctx.closePath()
  ctx.fill()

  const eyeOffsetX = r * 0.35
  const eyeOffsetY = -r * 0.15
  const pupilShiftX = dirX * r * 0.18
  const pupilShiftY = dirY * r * 0.18

  for (const side of [-1, 1]) {
    ctx.fillStyle = "#fff"
    ctx.beginPath()
    ctx.arc(x + side * eyeOffsetX, y + eyeOffsetY, r * 0.22, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = vulnerable ? "#fff" : PALETTE.textPrimary
    ctx.beginPath()
    ctx.arc(x + side * eyeOffsetX + pupilShiftX, y + eyeOffsetY + pupilShiftY, r * 0.11, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawPlayer(
  ctx: CanvasRenderingContext2D,
  state: EngineState,
  logoImg: HTMLImageElement | null,
  _tSec: number,
  reducedMotion: boolean
) {
  const { pos, dir, mouthAngle } = state.player
  const cx = pos.x * TILE + TILE / 2
  const cy = pos.y * TILE + TILE / 2
  const r = TILE * 0.52
  const angle = dirAngle(dir === "none" ? "right" : dir)
  const mouth = reducedMotion ? mouthAngle * 0.5 : mouthAngle

  ctx.save()
  ctx.beginPath()
  if (mouth > 0.03) {
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy, r, angle + mouth, angle - mouth + Math.PI * 2)
    ctx.closePath()
  } else {
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
  }
  ctx.clip()

  if (logoImg) {
    ctx.drawImage(logoImg, cx - r, cy - r, r * 2, r * 2)
  } else {
    ctx.fillStyle = PALETTE.bluePrimary
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2)
  }
  ctx.restore()
}

function drawPopups(ctx: CanvasRenderingContext2D, state: EngineState) {
  for (const popup of state.popups) {
    const age = state.elapsedMs - popup.createdAtMs
    const progress = Math.min(1, age / 1200)
    const cx = popup.x * TILE + TILE / 2
    const cy = popup.y * TILE + TILE / 2 - progress * TILE * 1.4
    const alpha = 1 - progress

    ctx.globalAlpha = alpha
    ctx.fillStyle = "#ffffff"
    ctx.font = `bold ${TILE * 0.42}px system-ui, sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(popup.text, cx, cy)
    ctx.globalAlpha = 1
  }
}

export function renderFrame(
  ctx: CanvasRenderingContext2D,
  state: EngineState,
  logoImg: HTMLImageElement | null,
  tSec: number,
  options: RenderOptions
) {
  const width = (state.grid[0]?.length ?? 0) * TILE
  const height = state.grid.length * TILE

  ctx.fillStyle = BG_COLOR
  ctx.fillRect(0, 0, width, height)

  drawWalls(ctx, state)
  drawPellets(ctx, state, tSec)

  const golden = state.elapsedMs < state.goldenSessionUntilMs
  for (const ghost of state.ghosts) {
    const gx = ghost.pos.x * TILE + TILE / 2
    const gy = ghost.pos.y * TILE + TILE / 2
    const angle = dirAngle(ghost.dir)
    const flashing = golden && state.goldenSessionUntilMs - state.elapsedMs < 2000 && Math.floor(tSec * 6) % 2 === 0
    drawGhost(ctx, gx, gy, flashing ? "#ffffff" : ghost.color, ghost.vulnerable, Math.cos(angle), Math.sin(angle))
  }

  drawPlayer(ctx, state, logoImg, tSec, options.reducedMotion)
  drawPopups(ctx, state)
}
