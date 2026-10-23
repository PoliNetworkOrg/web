import type { Metadata } from "next"
import { ForgottenManRoom } from "@/components/easter-egg/room"

export const metadata: Metadata = {
  title: { absolute: "???" },
  robots: { index: false, follow: false },
}

export default function EggPage() {
  return <ForgottenManRoom />
}
