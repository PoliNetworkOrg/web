"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import styles from "./CFUGame.module.css"
import {
  advanceToNextYear,
  createInitialState,
  GOLDEN_WARNING_MS,
  respawnAfterDeath,
  setPaused,
  setPlayerDirection,
  startGame,
  stepEngine,
  TILE,
} from "./engine"
import { POLINETWORK_LOGO_DATA_URI } from "./logoData"
import { MAZES } from "./mazes"
import { renderFrame } from "./render"
import type { CFUGameStats, Direction, EngineState, GamePhase } from "./types"

export type CFUGameProps = {
  className?: string
  targetCFU?: number
  logoSrc?: string
  onLevelComplete?: (year: number, cfu: number) => void
  onGraduate?: (stats: CFUGameStats) => void
}

type HudSnapshot = {
  phase: GamePhase
  cfu: number
  score: number
  livesLeft: number
  yearIndex: number
  goldenActive: boolean
  goldenWarning: boolean
  paused: boolean
}

const FIXED_STEP_SEC = 1 / 120
const MAX_FRAME_SEC = 0.25
const SWIPE_THRESHOLD = 24
const RESPAWN_DELAY_MS = 900

function snapshotHud(state: EngineState): HudSnapshot {
  return {
    phase: state.phase,
    cfu: state.cfu,
    score: state.score,
    livesLeft: state.livesLeft,
    yearIndex: state.yearIndex,
    goldenActive: state.elapsedMs < state.goldenSessionUntilMs,
    goldenWarning:
      state.elapsedMs < state.goldenSessionUntilMs && state.goldenSessionUntilMs - state.elapsedMs < GOLDEN_WARNING_MS,
    paused: state.pausedReason !== null,
  }
}

export default function CFUGame({ className, targetCFU = 180, logoSrc, onLevelComplete, onGraduate }: CFUGameProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const stateRef = useRef<EngineState>(createInitialState())
  const logoImgRef = useRef<HTMLImageElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const accumulatorRef = useRef(0)
  const respawnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const graduateNotifiedRef = useRef(false)

  const [hud, setHud] = useState<HudSnapshot>(() => snapshotHud(stateRef.current))
  const [scale, setScale] = useState(1)
  const [isTouch, setIsTouch] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [logoReady, setLogoReady] = useState(false)

  const gridWidth = (MAZES[0]?.rows[0]?.length ?? 0) * TILE
  const gridHeight = (MAZES[0]?.rows.length ?? 0) * TILE

  // Caricamento immagine logo — solo lato client, mai a livello di modulo.
  useEffect(() => {
    const img = new Image()
    img.src = logoSrc ?? POLINETWORK_LOGO_DATA_URI
    img
      .decode()
      .then(() => {
        logoImgRef.current = img
        setLogoReady(true)
      })
      .catch(() => {
        logoImgRef.current = img
        setLogoReady(true)
      })
  }, [logoSrc])

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)")
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsTouch(mq.matches)
    setReducedMotion(mqMotion.matches)
    const onTouchChange = () => setIsTouch(mq.matches)
    const onMotionChange = () => setReducedMotion(mqMotion.matches)
    mq.addEventListener("change", onTouchChange)
    mqMotion.addEventListener("change", onMotionChange)
    return () => {
      mq.removeEventListener("change", onTouchChange)
      mqMotion.removeEventListener("change", onMotionChange)
    }
  }, [])

  // Canvas responsive: risoluzione interna fissa in devicePixelRatio,
  // dimensione visualizzata adattata via ResizeObserver.
  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = gridWidth * dpr
    canvas.height = gridHeight * dpr
    const ctx = canvas.getContext("2d")
    ctx?.scale(dpr, dpr)

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const availableWidth = entry.contentRect.width
      const nextScale = Math.min(1, availableWidth / gridWidth)
      setScale(nextScale > 0 ? nextScale : 1)
    })
    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [gridWidth, gridHeight])

  const restartGame = useCallback(() => {
    stateRef.current = createInitialState()
    startGame(stateRef.current)
    graduateNotifiedRef.current = false
    setHud(snapshotHud(stateRef.current))
  }, [])

  const beginFromIntro = useCallback(() => {
    startGame(stateRef.current)
    setHud(snapshotHud(stateRef.current))
  }, [])

  const continueToNextYear = useCallback(() => {
    const finishedYear = stateRef.current.yearIndex
    onLevelComplete?.(finishedYear + 1, stateRef.current.cfu)
    stateRef.current = advanceToNextYear(stateRef.current)
    setHud(snapshotHud(stateRef.current))
  }, [onLevelComplete])

  const togglePause = useCallback(() => {
    const state = stateRef.current
    if (state.phase !== "playing") return
    setPaused(state, state.pausedReason === "user" ? null : "user")
    setHud(snapshotHud(state))
  }, [])

  // Loop principale a timestep fisso.
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    let frameCount = 0

    const tick = (timeMs: number) => {
      rafRef.current = requestAnimationFrame(tick)
      if (lastTimeRef.current == null) lastTimeRef.current = timeMs
      const frameSec = Math.min(MAX_FRAME_SEC, (timeMs - lastTimeRef.current) / 1000)
      lastTimeRef.current = timeMs
      accumulatorRef.current += frameSec

      const state = stateRef.current
      while (accumulatorRef.current >= FIXED_STEP_SEC) {
        stepEngine(state, FIXED_STEP_SEC)
        accumulatorRef.current -= FIXED_STEP_SEC
      }

      renderFrame(ctx, state, logoImgRef.current, timeMs / 1000, { reducedMotion })

      frameCount++
      if (frameCount % 6 === 0) {
        setHud((prev) => {
          const next = snapshotHud(state)
          if (
            prev.phase === next.phase &&
            prev.cfu === next.cfu &&
            prev.score === next.score &&
            prev.livesLeft === next.livesLeft &&
            prev.yearIndex === next.yearIndex &&
            prev.goldenActive === next.goldenActive &&
            prev.goldenWarning === next.goldenWarning &&
            prev.paused === next.paused
          ) {
            return prev
          }
          return next
        })
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      lastTimeRef.current = null
    }
  }, [reducedMotion])

  // Gestione della fase "dying": pausa breve, poi respawn automatico.
  useEffect(() => {
    if (hud.phase === "dying") {
      respawnTimeoutRef.current = setTimeout(() => {
        stateRef.current = respawnAfterDeath(stateRef.current)
        setHud(snapshotHud(stateRef.current))
      }, RESPAWN_DELAY_MS)
    }
    return () => {
      if (respawnTimeoutRef.current) clearTimeout(respawnTimeoutRef.current)
    }
  }, [hud.phase])

  // Notifica di laurea, una sola volta per partita.
  useEffect(() => {
    if (hud.phase === "graduated" && !graduateNotifiedRef.current) {
      graduateNotifiedRef.current = true
      onGraduate?.({
        cfu: stateRef.current.cfu,
        score: stateRef.current.score,
        timeMs: stateRef.current.elapsedMs,
      })
    }
  }, [hud.phase, onGraduate])

  // Pausa automatica quando la scheda/finestra perde visibilità.
  useEffect(() => {
    const onVisibility = () => {
      const state = stateRef.current
      if (document.hidden) {
        if (state.pausedReason === null) setPaused(state, "hidden")
      } else if (state.pausedReason === "hidden") {
        setPaused(state, null)
      }
      setHud(snapshotHud(state))
    }
    document.addEventListener("visibilitychange", onVisibility)
    window.addEventListener("blur", onVisibility)
    return () => {
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("blur", onVisibility)
    }
  }, [])

  // Tastiera: solo quando l'area di gioco ha il focus, per non bloccare lo
  // scroll della pagina che ospita il gioco.
  useEffect(() => {
    const isGameFocused = () => wrapperRef.current?.contains(document.activeElement) ?? false

    const keyToDir: Record<string, Direction> = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      w: "up",
      s: "down",
      a: "left",
      d: "right",
      W: "up",
      S: "down",
      A: "left",
      D: "right",
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (!isGameFocused()) return
      const dir = keyToDir[e.key]
      if (dir) {
        e.preventDefault()
        setPlayerDirection(stateRef.current, dir)
        return
      }
      if (e.key === " " || e.key === "p" || e.key === "P") {
        e.preventDefault()
        togglePause()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [togglePause])

  // Swipe touch sul canvas.
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    touchStartRef.current = { x: e.clientX, y: e.clientY }
    canvasRef.current?.focus()
  }, [])
  const onPointerUp = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const start = touchStartRef.current
    touchStartRef.current = null
    if (!start) return
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) return
    const dir: Direction = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : dy > 0 ? "down" : "up"
    setPlayerDirection(stateRef.current, dir)
  }, [])

  const pressDpad = useCallback((dir: Direction) => {
    setPlayerDirection(stateRef.current, dir)
    canvasRef.current?.focus()
  }, [])

  const maze = MAZES[hud.yearIndex]
  const displayWidth = Math.round(gridWidth * scale)
  const displayHeight = Math.round(gridHeight * scale)

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${className ?? ""}`}
      onPointerDown={() => canvasRef.current?.focus()}
    >
      <div className={styles.hud} aria-live="polite">
        <div className={styles.hudRow}>
          <span className={styles.hudLabel}>{maze?.title ?? ""}</span>
          <span className={styles.hudLabel}>Appelli: {"❤️".repeat(Math.max(0, hud.livesLeft))}</span>
          <span className={styles.hudLabel}>Punti: {hud.score}</span>
        </div>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${Math.min(100, (hud.cfu / targetCFU) * 100)}%` }} />
          <span className={styles.progressText}>
            {hud.cfu} / {targetCFU} CFU
          </span>
        </div>
        {hud.goldenActive && (
          <div className={`${styles.goldenBanner} ${hud.goldenWarning ? styles.goldenWarning : ""}`}>
            ☕ Sessione d&apos;oro!
          </div>
        )}
      </div>

      <div className={styles.canvasArea} style={{ width: displayWidth, height: displayHeight }}>
        <canvas
          ref={canvasRef}
          tabIndex={0}
          className={styles.canvas}
          style={{ width: displayWidth, height: displayHeight }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          aria-label="Area di gioco PoliPac"
        />

        {!logoReady && <div className={styles.overlay}>Caricamento…</div>}

        {hud.paused && hud.phase === "playing" && (
          <div className={styles.overlay}>
            <p>Pausa</p>
            <Button type="button" onClick={togglePause}>
              Riprendi
            </Button>
          </div>
        )}

        {hud.phase === "intro" && (
          <div className={styles.overlay}>
            <p>Mangia i CFU e arriva a 180 per laurearti!</p>
            <Button type="button" onClick={beginFromIntro}>
              Inizia
            </Button>
          </div>
        )}

        {hud.phase === "levelComplete" && (
          <div className={styles.overlay}>
            <p>
              Anno superato! {hud.cfu} / {targetCFU} CFU
            </p>
            <Button type="button" onClick={continueToNextYear}>
              Continua
            </Button>
          </div>
        )}

        {hud.phase === "gameOver" && (
          <div className={styles.overlay}>
            <p>Fuori corso…</p>
            <Button type="button" onClick={restartGame}>
              Riprova
            </Button>
          </div>
        )}

        {hud.phase === "graduated" && (
          <div className={styles.overlay}>
            <p>
              🎓 Dottore! {hud.cfu} CFU — punteggio {hud.score}
            </p>
            <Button type="button" onClick={restartGame}>
              Rigioca
            </Button>
          </div>
        )}
      </div>

      {isTouch && hud.phase === "playing" && (
        <div className={styles.dpad}>
          <button type="button" className={styles.dpadUp} onClick={() => pressDpad("up")} aria-label="Su">
            ▲
          </button>
          <button type="button" className={styles.dpadLeft} onClick={() => pressDpad("left")} aria-label="Sinistra">
            ◀
          </button>
          <button type="button" className={styles.dpadRight} onClick={() => pressDpad("right")} aria-label="Destra">
            ▶
          </button>
          <button type="button" className={styles.dpadDown} onClick={() => pressDpad("down")} aria-label="Giù">
            ▼
          </button>
        </div>
      )}

      <div className={styles.legend}>
        <span>
          <span className={styles.legendDot} style={{ background: "var(--color-blue-tertiary)" }} /> 1 CFU
        </span>
        <span>
          <span className={styles.legendDot} style={{ background: "var(--color-blue-secondary)" }} /> 3 CFU
        </span>
        <span>
          <span className={styles.legendDot} style={{ background: "var(--color-green)" }} /> 6 CFU
        </span>
        <span>
          <span className={styles.legendDot} style={{ background: "var(--color-red)" }} /> 12 CFU
        </span>
        <span>☕ sessione d&apos;oro</span>
      </div>
    </div>
  )
}
