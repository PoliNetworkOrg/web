import { z } from "zod"

/**
 * Optional registry fields added after the first portal release: programmes, campuses, the cross-programme flag and
 * approved public contacts. Each one is validated on its own; absent (older backend) or malformed values become
 * `undefined`, so one odd field never hides an association or the whole list.
 */
const namedSchema = z.array(z.object({ slug: z.string().min(1), nameIt: z.string().min(1), nameEn: z.string() }))
const contactSchema = z.array(
  z.object({
    function: z.enum(["presidency", "events", "collaborations", "communications", "other"]),
    label: z.string().trim().min(1),
    email: z.email(),
    name: z.string().default(""),
    phone: z.string().default(""),
  })
)

export type Named = z.infer<typeof namedSchema>[number]
export type PublicContact = z.infer<typeof contactSchema>[number]
export type RegistryFields = {
  programmes?: Named[]
  campuses?: Named[]
  crossProgramme?: boolean
  contacts?: PublicContact[]
}

function optional<T>(schema: z.ZodType<T>, value: unknown, field: string): T | undefined {
  if (value === undefined || value === null) return undefined
  const result = schema.safeParse(value)
  if (result.success) return result.data
  console.error(`Ignoring invalid association ${field}`, result.error.message)
  return undefined
}

export function parseRegistryFields(association: Record<string, unknown>): RegistryFields {
  return {
    programmes: optional(namedSchema, association.programmes, "programmes"),
    campuses: optional(namedSchema, association.campuses, "campuses"),
    crossProgramme: optional(z.boolean(), association.crossProgramme, "crossProgramme"),
    contacts: optional(contactSchema, association.contacts, "contacts"),
  }
}

export const CONTACT_FUNCTION_LABELS: Record<PublicContact["function"], string> = {
  presidency: "Presidenza",
  events: "Eventi",
  collaborations: "Collaborazioni",
  communications: "Comunicazione",
  other: "Contatto",
}

export type Filters = { programme?: string; campus?: string }

/**
 * Cross-programme associations match every programme. An association that lists nothing for a filtered dimension
 * does not match it: the site cannot tell whether it fits.
 */
export function matchesFilters(association: RegistryFields, { programme, campus }: Filters) {
  if (programme && !association.crossProgramme && !association.programmes?.some((p) => p.slug === programme))
    return false
  if (campus && !association.campuses?.some((c) => c.slug === campus)) return false
  return true
}

/** Filter options from what the published associations list, sorted by name; empty with an older backend. */
export function filterOptions(associations: RegistryFields[]) {
  const collect = (pick: (a: RegistryFields) => Named[] | undefined) => {
    const byslug = new Map<string, string>()
    for (const a of associations) for (const n of pick(a) ?? []) byslug.set(n.slug, n.nameIt)
    return [...byslug].map(([value, label]) => ({ value, label })).sort((a, b) => a.label.localeCompare(b.label, "it"))
  }
  return { programmes: collect((a) => a.programmes), campuses: collect((a) => a.campuses) }
}
