import type { CSSProperties, Dispatch, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { COLORS } from "./constants"
import type { DialogueAction, DialogueState } from "./dialogue"
import { stepChoices, stepText } from "./dialogue"
import { pixelFont } from "./font"
import { PixelSprite } from "./pixel-sprite"
import { CORNER_OFFSET, CORNER_PALETTE, CORNER_ROWS, CORNER_SIZE, SOUL_PALETTE, SOUL_ROWS } from "./sprites"

// box nativo di Deltarune: 288x76 pixel di gioco, scalato a multipli interi per tenere i pixel nitidi
const BOX_PX = "max(2px, min(4px, round(down, min(90vw / 288, 32svh / 76), 1px)))"
const LINE_HEIGHT = 18

const px = (n: number) => `calc(${n} * var(--px))`

const CORNERS = [
  "top-0 left-0",
  "top-0 right-0 -scale-x-100",
  "bottom-0 left-0 -scale-y-100",
  "right-0 bottom-0 -scale-100",
] as const

// ombra blu sfumata dall'alto verso il basso di ogni riga, come nel gioco
const SHADOW_STYLE: CSSProperties = {
  translate: `${px(1)} ${px(1)}`,
  // backgroundImage: `linear-gradient(${COLORS.shadowTop} ${px(5)}, ${COLORS.shadowBottom} ${px(13)})`,
  backgroundSize: `100% ${px(LINE_HEIGHT)}`,
}

function ShadowedText({ children }: { children: ReactNode }) {
  return (
    <span aria-hidden="true" className="grid">
      <span className="col-start-1 row-start-1 bg-clip-text text-transparent" style={SHADOW_STYLE}>
        {children}
      </span>
      <span className="col-start-1 row-start-1">{children}</span>
    </span>
  )
}

function TypedText({ text, typed }: { text: string; typed: number }) {
  // il testo ancora da scrivere occupa già il suo spazio, così le parole non saltano a capo mentre compaiono
  return (
    <ShadowedText>
      {text.slice(0, typed)}
      <span className="invisible">{text.slice(typed)}</span>
    </ShadowedText>
  )
}

export function DialogueBox({ state, dispatch }: { state: DialogueState; dispatch: Dispatch<DialogueAction> }) {
  const { open } = state
  if (!open) return null

  const text = stepText(open.step)
  const choices = open.typed >= text.length ? stepChoices(open.step) : null

  return (
    <section
      aria-label="Dialogo"
      className={cn(pixelFont.className, "-translate-x-1/2 absolute left-1/2 bg-black text-white")}
      style={
        {
          "--px": BOX_PX,
          bottom: `calc(${px(CORNER_OFFSET)} + env(safe-area-inset-bottom))`,
          width: `min(${px(288)}, calc(100vw - ${px(2 * CORNER_OFFSET)}))`,
          minHeight: px(76),
          border: `${px(2)} solid ${COLORS.border}`,
          boxShadow: `inset 0 0 0 ${px(1)} ${COLORS.borderInner}`,
          padding: `${px(10)} ${px(4)} ${px(10)} ${px(11)}`,
          fontSize: px(8),
          lineHeight: px(LINE_HEIGHT),
        } as CSSProperties
      }
    >
      {CORNERS.map((position) => (
        <PixelSprite
          key={position}
          rows={CORNER_ROWS}
          palette={CORNER_PALETTE}
          className={cn("absolute", position)}
          style={{ width: px(CORNER_SIZE), height: px(CORNER_SIZE), margin: px(-(CORNER_OFFSET + 2)) }}
        />
      ))}

      <p className="sr-only" aria-live="polite">
        {text}
      </p>
      <div className="wrap-break-word grid" style={{ gridTemplateColumns: `${px(16)} 1fr` }}>
        <ShadowedText>*</ShadowedText>
        <TypedText text={text} typed={open.typed} />
      </div>

      {choices && (
        <div className="grid grid-cols-2" style={{ marginTop: px(6) }}>
          {choices.map((choice, i) => (
            <button
              key={choice.label}
              type="button"
              className="flex items-center justify-center"
              style={{ gap: px(4) }}
              onPointerEnter={() => dispatch({ type: "select", option: i })}
              onClick={(event) => {
                event.stopPropagation()
                dispatch({ type: "choose", option: i })
              }}
            >
              <PixelSprite
                rows={SOUL_ROWS}
                palette={SOUL_PALETTE}
                className={cn(open.selected !== i && "invisible")}
                style={{ width: px(9), height: px(8) }}
              />
              <ShadowedText>{choice.label}</ShadowedText>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
