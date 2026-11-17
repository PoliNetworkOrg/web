import type { CSSProperties, ReactElement } from "react"

type PixelSpriteProps = {
  rows: readonly string[]
  palette: Record<string, string>
  className?: string
  style?: CSSProperties
}

/** Disegna pixel art da una mappa di caratteri: ogni carattere è un pixel, colorato secondo `palette`. */
export function PixelSprite({ rows, palette, className, style }: PixelSpriteProps) {
  const width = rows[0]?.length ?? 0
  const rects: ReactElement[] = []

  rows.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      const char = row.charAt(x)
      let end = x + 1
      while (end < row.length && row[end] === char) end++
      const fill = palette[char]
      // biome-ignore lint/suspicious/noArrayIndexKey: lo sprite è statico, le coordinate sono un id stabile
      if (fill) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={end - x} height={1} fill={fill} />)
      x = end
    }
  })

  return (
    <svg
      viewBox={`0 0 ${width} ${rows.length}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {rects}
    </svg>
  )
}
