import { Shape } from "@/components/shapes"
import { cn } from "@/lib/utils"

/** The shapes a clickable card shows on hover. `className` can show them on another hover than the card's own. */
export function CardHoverBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "card-hover-background pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-0 transition-opacity duration-200 ease-(--ease-ui-out) group-hover/card:opacity-100",
        className
      )}
    >
      <Shape variant="big-teal" className="-top-16 -right-20 absolute h-40 w-40" />
      <Shape variant="big-teal" className="-bottom-21 -left-2 absolute h-70 w-70" />
      <div className="-top-36 -left-32 absolute h-168 w-2xl">
        <div className="-rotate-70 relative h-full w-full origin-center">
          <Shape variant="looper" className="absolute inset-0 h-full w-full object-contain" />
        </div>
      </div>
    </div>
  )
}
