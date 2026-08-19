import type { Metadata } from "next"
import { ContactPage } from "@/components/contact-page"

export const metadata: Metadata = {
  title: "Contattaci",
  description: "Contatta PoliNetwork o trova il gruppo del tuo corso al Politecnico di Milano.",
}

export default function Contact() {
  return <ContactPage />
}
