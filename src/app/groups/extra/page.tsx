import type { Metadata } from "next"
import { ExtraGroups } from "@/components/groups/extra-groups"

export const metadata: Metadata = {
  title: "Gruppi Extra",
  description: "Affitti, mercatino, eventi, hobby e tutto ciò che riguarda la vita studentesca.",
}

export const dynamic = "force-dynamic"

export default function ExtraGroupsPage() {
  return <ExtraGroups />
}
