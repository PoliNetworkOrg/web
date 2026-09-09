"use client"

import { type ReactNode, useRef, useState } from "react"
import { FiAlertCircle, FiCheckCircle, FiLink } from "react-icons/fi"
import { ButtonIcon } from "@/components/button-icon"
import { ReportBrokenLinkFlow } from "@/components/groups/report/broken-link-flow"
import { ReportMissingLinkFlow } from "@/components/groups/report/missing-link"
import { SelectableCardIcon } from "@/components/groups/report/selectable-card-icon"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { reportGroupLink } from "@/queries/groups"
import type { BrokenGroupLinkReportInput, MissingGroupLinkReportInput } from "@/queries/types"

type View = "problem" | "broken" | "missing" | "confirmation" | "done"

export function ReportFinderDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<View>("problem")
  const [report, setReport] = useState<BrokenGroupLinkReportInput | null>(null)
  const [groupName, setGroupName] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle")
  const inFlightRef = useRef(false)
  const requestIdRef = useRef(0)

  function reset() {
    requestIdRef.current++
    inFlightRef.current = false
    setView("problem")
    setReport(null)
    setGroupName("")
    setStatus("idle")
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) reset()
  }

  async function submit(input: BrokenGroupLinkReportInput | MissingGroupLinkReportInput) {
    if (inFlightRef.current) return
    inFlightRef.current = true
    const requestId = ++requestIdRef.current

    setStatus("submitting")
    const result = await reportGroupLink(input)
    if (requestId !== requestIdRef.current) return // dialog was reset/closed meanwhile

    inFlightRef.current = false
    if (result.ok) {
      setView("done")
      setStatus("idle")
      return
    }

    setStatus("error")
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={view === "broken" ? "overflow-visible" : undefined}>
        {view === "done" ? (
          <>
            <DialogHeader title="Segnalazione inviata">
              <DialogDescription>Grazie, la verificheremo al più presto.</DialogDescription>
            </DialogHeader>
            <DialogFooter className="w-full flex-row justify-start sm:justify-start">
              <Button variant="primary" onClick={() => handleOpenChange(false)}>
                Chiudi
              </Button>
            </DialogFooter>
          </>
        ) : view === "confirmation" && report ? (
          <>
            <DialogHeader
              title="Conferma segnalazione"
              onBack={() => {
                setView("broken")
                setStatus("idle")
              }}
            >
              <DialogDescription>Controlla i dettagli prima di inviarla.</DialogDescription>
            </DialogHeader>
            <Card className="h-auto w-full flex-row items-center gap-3 px-5 py-4">
              <CardAction icon={FiAlertCircle} iconSize="sm" gradient={false} className="static shrink-0" />
              <CardContent className="typo-body-medium min-w-0 text-text-primary">
                Il link {report.type === "tg" ? "Telegram" : "WhatsApp"} di “{groupName}” non funziona.
              </CardContent>
            </Card>
            {status === "error" && (
              <p aria-live="polite" className="typo-body-small text-red-600">
                Non è stato possibile inviare la segnalazione. Riprova tra qualche minuto.
              </p>
            )}
            <DialogFooter>
              <ButtonIcon
                icon={FiCheckCircle}
                text={status === "submitting" ? "Invio…" : "Invia segnalazione"}
                disabled={status === "submitting"}
                onClick={() => void submit(report)}
              />
            </DialogFooter>
          </>
        ) : view === "broken" ? (
          <ReportBrokenLinkFlow
            onBack={reset}
            onSelect={(selectedReport, selectedGroupName) => {
              setReport(selectedReport)
              setGroupName(selectedGroupName)
              setView("confirmation")
            }}
          />
        ) : view === "missing" ? (
          <ReportMissingLinkFlow
            onBack={reset}
            onSubmit={(missingReport) => void submit(missingReport)}
            status={status}
          />
        ) : (
          <>
            <DialogHeader title="Quale problema vuoi segnalare?" titleClassName="typo-title-large" />
            <div className="grid grid-cols-2 gap-3">
              <SelectableCardIcon title="Link non funzionante" icon={FiLink} onClick={() => setView("broken")} />
              <SelectableCardIcon title="Link mancante" icon={FiAlertCircle} onClick={() => setView("missing")} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
