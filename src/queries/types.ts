import type { ApiInput, ApiOutput } from "@/types"

export type VisibleGroup = ApiOutput["groups"]["search"]["getAll"][number] & { link: string }

export type GroupLinkReportInput = ApiInput["web"]["reports"]["create"]
export type BrokenGroupLinkReportInput = Extract<GroupLinkReportInput, { reportType: "broken_link" }>
export type MissingGroupLinkReportInput = Extract<GroupLinkReportInput, { reportType: "missing" }>

export type GroupLinkReportResult = { ok: true } | { ok: false; error: "UNKNOWN" }
