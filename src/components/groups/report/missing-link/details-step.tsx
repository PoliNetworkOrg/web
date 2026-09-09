import { FiCheckCircle } from "react-icons/fi"
import { ButtonIcon } from "@/components/button-icon"
import { Glass } from "@/components/glass"
import { DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import type { ReportMissingLinkCategory } from "./types"

export function DetailsStep({
  path,
  category,
  details,
  status,
  onBack,
  onChangeDetails,
  onSubmit,
}: {
  path: string
  category: ReportMissingLinkCategory | null
  details: string
  status: "idle" | "submitting" | "error"
  onBack: () => void
  onChangeDetails: (value: string) => void
  onSubmit: () => void
}) {
  return (
    <>
      <DialogHeader title="Cosa manca?" onBack={onBack}>
        <DialogDescription>{path}</DialogDescription>
      </DialogHeader>
      <label className="flex flex-col gap-2" htmlFor="missing-link-details">
        <span className="typo-body-medium text-text-primary">Descrivi il gruppo o il link mancante</span>
        <Glass className="border-white/50 bg-background-blur p-0">
          <textarea
            id="missing-link-details"
            className="typo-body-medium min-h-28 w-full resize-y bg-transparent p-4 text-text-primary outline-none placeholder:text-text-secondary"
            value={details}
            maxLength={500}
            placeholder={
              category === "extra"
                ? "Ad esempio: manca il gruppo Telegram del mercatino dell'usato..."
                : "Ad esempio: manca il gruppo Telegram del corso..."
            }
            onChange={(event) => onChangeDetails(event.target.value)}
          />
        </Glass>
      </label>
      {status === "error" && (
        <p aria-live="polite" className="typo-body-small text-red-600">
          Non è stato possibile inviare la segnalazione. Riprova tra qualche minuto.
        </p>
      )}
      <DialogFooter>
        <ButtonIcon
          icon={FiCheckCircle}
          text={status === "submitting" ? "Invio…" : "Invia segnalazione"}
          disabled={!details.trim() || status === "submitting"}
          onClick={onSubmit}
        />
      </DialogFooter>
    </>
  )
}
