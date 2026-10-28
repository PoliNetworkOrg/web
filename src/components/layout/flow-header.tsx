import Link from "next/link"
import { FiArrowLeft, FiX } from "react-icons/fi"

/** Figma's column for the pages a wizard leads to (group results, guides: ~1040px at 1728), with the shared 24/40px gutters. */
export const FLOW_COLUMN = "mx-auto w-full min-w-0 max-w-5xl px-6 sm:px-10"

/** Page shell for those pages: the top padding leaves the fixed header ~48px of air on phones (it was 16px). */
export const FLOW_MAIN = `${FLOW_COLUMN} flex min-h-svh flex-col gap-12 pt-44 pb-32 md:gap-16 md:pt-52`

const iconLinkClass =
  "grid size-10 shrink-0 place-items-center rounded-full bg-white/60 outline-none transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-blue-secondary"

/**
 * Back button, centred title and optional close button. A three-column grid keeps a long course name from running
 * under the buttons on phones.
 */
export function FlowHeader({
  title,
  subtitle,
  backHref,
  replaceBack = false,
  closeHref,
}: {
  title: string
  subtitle?: string
  backHref: string
  /** Go back without leaving a history entry, as the wizard steps do. */
  replaceBack?: boolean
  closeHref?: string
}) {
  return (
    <header className="grid grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-start gap-3 md:items-center md:gap-6">
      <Link href={backHref} replace={replaceBack} aria-label="Indietro" className={iconLinkClass}>
        <FiArrowLeft className="size-5" />
      </Link>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="typo-title-large md:typo-display-medium text-balance text-text-primary">{title}</h1>
        {subtitle && <p className="typo-label-large md:typo-headline-small text-text-secondary">{subtitle}</p>}
      </div>
      {closeHref && (
        <Link href={closeHref} aria-label="Chiudi" className={iconLinkClass}>
          <FiX className="size-5" />
        </Link>
      )}
    </header>
  )
}
