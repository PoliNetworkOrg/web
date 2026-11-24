"use server"

import { problemReportSchema, type ReportState } from "@/components/problem-report/schema"
import { sendProblemReport } from "@/lib/backend"

export async function submitProblemReport(_previous: ReportState, formData: FormData): Promise<ReportState> {
  // This field stays empty for people; automated fills are discarded without sending mail.
  if (formData.get("website")) return { status: "success" }
  const parsed = problemReportSchema.safeParse({
    email: formData.get("email"),
    subject: formData.get("subject"),
    description: formData.get("description"),
  })
  if (!parsed.success) return { status: "error", errors: parsed.error.flatten().fieldErrors }
  try {
    const status = await sendProblemReport(parsed.data)
    if (status === 204) return { status: "success" }
    if (status === 429)
      return { status: "error", message: "Hai inviato troppe segnalazioni. Attendi qualche minuto e riprova." }
  } catch {
    // Delivery may have failed or timed out. Keep the form so the person can retry.
  }
  return {
    status: "error",
    message:
      "Non siamo riusciti a inviare la segnalazione. I dati sono ancora qui: riprova tra poco oppure scrivi a it@polinetwork.org.",
  }
}
