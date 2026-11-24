"use client"

import Link from "next/link"
import { useActionState } from "react"
import { FiCheck, FiSend } from "react-icons/fi"
import { submitProblemReport } from "@/app/segnala-problema/actions"
import { Glass } from "@/components/glass"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ReportState } from "./schema"

const initialState: ReportState = { status: "idle" }

export function ProblemReportForm() {
  const [state, action, pending] = useActionState(submitProblemReport, initialState)
  if (state.status === "success")
    return (
      <Glass
        className="mx-auto flex w-full max-w-2xl flex-col items-start gap-5 rounded-rectangles p-6 sm:p-10"
        role="status"
      >
        <FiCheck aria-hidden="true" className="size-8 text-blue-secondary" />
        <h2 className="typo-headline-small">Segnalazione inviata</h2>
        <p className="typo-body-large">
          Il team IT ha ricevuto il tuo messaggio. Se serviranno dettagli, ti ricontatteremo all’indirizzo che hai
          indicato.
        </p>
        <Button asChild variant="primary" size="lg">
          <Link href="/">Torna alla home</Link>
        </Button>
      </Glass>
    )

  return (
    <Glass className="mx-auto w-full max-w-2xl rounded-rectangles p-6 sm:p-10">
      {/* Uncontrolled fields: after a submission without JavaScript the server renders them from state.values. */}
      <form action={action} className="flex flex-col gap-6" aria-label="Segnalazione di un problema">
        <div className="flex flex-col gap-2">
          <label htmlFor="report-email" className="typo-title-medium">
            La tua email
          </label>
          <Input
            id="report-email"
            name="email"
            defaultValue={state.values?.email}
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="nome@esempio.it"
            className="text-base"
            aria-describedby="report-email-help report-email-error"
            aria-invalid={!!state.errors?.email}
          />
          <p id="report-email-help" className="typo-body-medium text-text-secondary">
            La useremo solo per ricontattarti su questo problema.
          </p>
          <p id="report-email-error" className="typo-body-medium text-red-700 dark:text-red-300">
            {state.errors?.email?.[0]}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="report-subject" className="typo-title-medium">
            Qual è il problema?
          </label>
          <Input
            id="report-subject"
            name="subject"
            defaultValue={state.values?.subject}
            required
            minLength={5}
            maxLength={120}
            placeholder="Ad esempio: non riesco ad aprire un documento"
            className="text-base"
            aria-invalid={!!state.errors?.subject}
            aria-describedby="report-subject-error"
          />
          <p id="report-subject-error" className="typo-body-medium text-red-700 dark:text-red-300">
            {state.errors?.subject?.[0]}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="report-description" className="typo-title-medium">
            Descrivi cosa succede
          </label>
          <textarea
            id="report-description"
            name="description"
            defaultValue={state.values?.description}
            required
            minLength={20}
            maxLength={5000}
            rows={7}
            placeholder="In quale pagina succede? Cosa stavi facendo e cosa ti aspettavi? Se puoi, indica anche dispositivo e browser."
            aria-invalid={!!state.errors?.description}
            aria-describedby="report-description-help report-description-error"
            className="w-full resize-y rounded-rectangles border border-white/50 bg-background-blur p-4 text-base text-text-primary outline-offset-2 placeholder:text-text-secondary focus-visible:outline-2 focus-visible:outline-blue-secondary"
          />
          <p id="report-description-help" className="typo-body-medium text-text-secondary">
            Da 20 a 5000 caratteri. Non inserire password o altri dati riservati.
          </p>
          <p id="report-description-error" className="typo-body-medium text-red-700 dark:text-red-300">
            {state.errors?.description?.[0]}
          </p>
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="report-website">Website</label>
          <input id="report-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <p className="typo-body-medium text-text-secondary">
          Il messaggio sarà inviato a{" "}
          <a href="mailto:it@polinetwork.org" className="underline underline-offset-4">
            it@polinetwork.org
          </a>
          . Leggi l’
          <a href="https://polinetwork.org/privacy/" className="underline underline-offset-4">
            informativa privacy
          </a>
          .
        </p>
        {state.status === "error" && (
          <p role="alert" className="typo-body-large text-red-700 dark:text-red-300">
            {state.message ?? "Controlla i campi indicati e riprova."}
          </p>
        )}
        <Button type="submit" variant="primary" size="lg" disabled={pending} className="min-h-12 self-start">
          <FiSend aria-hidden="true" />
          {pending ? "Invio in corso…" : "Invia segnalazione"}
        </Button>
      </form>
    </Glass>
  )
}
