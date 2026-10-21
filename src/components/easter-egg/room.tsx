"use client"

import Image from "next/image"
import type { CSSProperties } from "react"
import { useEffect, useReducer, useRef, useSyncExternalStore } from "react"
import NotFound from "@/app/not-found"
import {
  COLORS,
  DIALOGUE_START_DELAY,
  EGG_SOUND_SRC,
  EGG_SOUND_VOLUME,
  MUSIC_SRC,
  MUSIC_VOLUME,
  PUNCTUATION_DELAY,
  TEXT_SOUND_SRC,
  TEXT_SOUND_VOLUME,
  TILE,
  TREE,
  TYPE_DELAY,
} from "./constants"
import { dialogueReducer, initialDialogueState, stepEvent, stepText } from "./dialogue"
import { DialogueBox } from "./dialogue-box"
import { hasRoomTicket, markEggReceived, subscribeRoomTicket } from "./storage"

// la stanza è larga ~8 tile e alta ~9.5: scala a multipli interi finché ci sta nello schermo
const ROOM_PX = "max(1px, round(down, min(100vw / 170, 100svh / 190), 1px))"

const tiles = (n: number) => `calc(${n * TILE} * var(--px))`
const px = (n: number) => `calc(${n} * var(--px))`

// pavimento in tile, rispetto all'angolo in alto a sinistra della parte larga della stanza
const FLOOR = [
  { x: 1, y: 0, w: 4, h: 1 },
  { x: 0, y: 1, w: 6, h: 3 },
  { x: 1, y: 4, w: 4, h: 1 },
] as const

const PUNCTUATION = new Set([".", ",", "?", "!"])
// come nel gioco, spazi e punteggiatura non fanno suono
const VOICED = /[\p{L}\p{N}]/u
const CONFIRM_KEYS = new Set(["Enter", " ", "z", "Z"])
const SKIP_KEYS = new Set(["x", "X", "Shift"])
const MOVE_KEYS = new Set(["ArrowLeft", "ArrowRight", "a", "A", "d", "D"])

export function ForgottenManRoom() {
  // null durante l'SSR/idratazione, poi true solo se ci si arriva dal trigger in navigazione
  const allowed = useSyncExternalStore(subscribeRoomTicket, hasRoomTicket, () => null)

  if (allowed === null) return <div className="fixed inset-0 z-10000 bg-black" />
  if (!allowed) return <NotFound />
  return <Room />
}

function Room() {
  const [state, dispatch] = useReducer(dialogueReducer, initialDialogueState)
  const { open } = state
  const soundsRef = useRoomAudio()
  const step = open?.step

  useEffect(() => {
    const timeout = setTimeout(() => dispatch({ type: "start" }), DIALOGUE_START_DELAY)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!open) return
    const text = stepText(open.step)
    if (open.typed >= text.length) return
    const delay = PUNCTUATION.has(text[open.typed - 1] ?? "") ? PUNCTUATION_DELAY : TYPE_DELAY
    const timeout = setTimeout(() => {
      if (VOICED.test(text.charAt(open.typed))) soundsRef.current?.text()
      dispatch({ type: "tick" })
    }, delay)
    return () => clearTimeout(timeout)
  }, [open, soundsRef])

  useEffect(() => {
    if (!step || stepEvent(step) !== "receive-egg") return
    markEggReceived()
    soundsRef.current?.egg()
  }, [step, soundsRef])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return
      if (CONFIRM_KEYS.has(event.key)) dispatch({ type: "confirm" })
      else if (SKIP_KEYS.has(event.key)) dispatch({ type: "skip" })
      else if (MOVE_KEYS.has(event.key)) dispatch({ type: "move" })
      else return
      event.preventDefault()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = overflow
    }
  }, [])

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents lint/a11y/noStaticElementInteractions: la tastiera è gestita a livello di window
    <div
      className="fixed inset-0 z-10000 cursor-default select-none overflow-hidden bg-black"
      style={{ "--px": ROOM_PX } as CSSProperties}
      onClick={() => dispatch({ type: "confirm" })}
    >
      <div
        aria-hidden="true"
        className="-translate-x-1/2 absolute left-1/2"
        style={{ top: `calc(50% - ${tiles(3)})`, width: tiles(6), height: tiles(5) }}
      >
        {FLOOR.map(({ x, y, w, h }) => (
          <div
            key={`${x}-${y}`}
            className="absolute"
            style={{ left: tiles(x), top: tiles(y), width: tiles(w), height: tiles(h), background: COLORS.floor }}
          />
        ))}
        {/* il sentiero prosegue fino al fondo dello schermo */}
        <div
          className="absolute h-svh"
          style={{ left: tiles(2), top: tiles(5), width: tiles(2), background: COLORS.floor }}
        />
        <Image
          src={TREE.src}
          alt=""
          width={TREE.width}
          height={TREE.height}
          unoptimized
          priority
          className="absolute max-w-none select-none [image-rendering:pixelated]"
          style={{ left: px(TREE.left), top: px(TREE.top), width: px(TREE.width), height: px(TREE.height) }}
        />
      </div>

      <DialogueBox state={state} dispatch={dispatch} />
    </div>
  )
}

async function loadBuffer(context: AudioContext, sources: string[], signal: AbortSignal) {
  // non tutti i browser decodificano ogg (es. Safari meno recente): in quel caso si prova la sorgente successiva
  for (const src of sources) {
    try {
      const response = await fetch(src, { signal })
      if (!response.ok) continue
      return await context.decodeAudioData(await response.arrayBuffer())
    } catch {
      if (signal.aborted) return null
    }
  }
  return null
}

type RoomSounds = { text: () => void; egg: () => void }

/**
 * Musica in loop senza stacchi ed effetti sonori, tutti via Web Audio: partono appena il browser lo consente (al più
 * al primo input). Restituisce un ref alle funzioni che riproducono gli effetti.
 */
function useRoomAudio() {
  const soundsRef = useRef<RoomSounds | null>(null)

  useEffect(() => {
    const context = new AudioContext()
    const controller = new AbortController()

    const output = (volume: number) => {
      const gain = context.createGain()
      gain.gain.value = volume
      gain.connect(context.destination)
      return gain
    }

    const loadMusic = async () => {
      const buffer = await loadBuffer(context, [MUSIC_SRC.ogg, MUSIC_SRC.mp3], controller.signal)
      if (!buffer || controller.signal.aborted) return
      const source = context.createBufferSource()
      source.buffer = buffer
      source.loop = true
      source.connect(output(MUSIC_VOLUME))
      source.start()
    }
    void loadMusic()

    // ogni riproduzione interrompe la precedente dello stesso effetto invece di sovrapporsi
    const soundEffect = (src: string, volume: number) => {
      const gain = output(volume)
      let buffer: AudioBuffer | null = null
      let voice: AudioBufferSourceNode | null = null
      void loadBuffer(context, [src], controller.signal).then((loaded) => {
        buffer = loaded
      })
      return () => {
        if (!buffer || context.state !== "running") return
        voice?.stop()
        voice = context.createBufferSource()
        voice.buffer = buffer
        voice.connect(gain)
        voice.start()
      }
    }
    soundsRef.current = {
      text: soundEffect(TEXT_SOUND_SRC, TEXT_SOUND_VOLUME),
      egg: soundEffect(EGG_SOUND_SRC, EGG_SOUND_VOLUME),
    }

    const resume = () => void context.resume()
    window.addEventListener("pointerdown", resume)
    window.addEventListener("keydown", resume)
    return () => {
      soundsRef.current = null
      controller.abort()
      window.removeEventListener("pointerdown", resume)
      window.removeEventListener("keydown", resume)
      void context.close()
    }
  }, [])

  return soundsRef
}
