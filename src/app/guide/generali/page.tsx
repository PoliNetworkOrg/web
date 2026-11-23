import type { Metadata } from "next"
import { GeneralGuides } from "@/components/guides/general-guides"

export const metadata: Metadata = {
  title: "Guide Generali",
  description: "Le guide generali del Politecnico di Milano.",
}

export default function GuidesGeneraliPage() {
  return <GeneralGuides />
}
