import { z } from "zod"

export const problemReportSchema = z.object({
  email: z.string().trim().pipe(z.email("Inserisci un indirizzo email valido.").max(254)),
  subject: z
    .string()
    .trim()
    .min(5, "Scrivi un oggetto di almeno 5 caratteri.")
    .max(120, "Usa al massimo 120 caratteri.")
    .refine((value) => !/[\r\n]/.test(value), "L’oggetto deve stare su una sola riga."),
  description: z
    .string()
    .trim()
    .min(20, "Descrivi il problema con almeno 20 caratteri.")
    .max(5000, "Usa al massimo 5000 caratteri."),
})
export type ReportState = {
  status: "idle" | "error" | "success"
  message?: string
  errors?: Partial<Record<"email" | "subject" | "description", string[]>>
}
