"use client"
import AccordionList from "@/components/accordion-list"
import type { AccordionListItem } from "@/components/accordion-list/types"

const accordionItems: AccordionListItem[] = [
  {
    value: "item-1",
    trigger: "Le lezioni della prima settimana si tengono regolarmente?",
    content:
      "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell'esercitatore.",
  },
  {
    value: "item-2",
    trigger: "Come faccio ad accedere ai materiali del corso?",
    content:
      "I materiali dei corsi sono disponibili su Beep (il portale e-learning del Politecnico). Puoi accedervi con le tue credenziali di Ateneo (codice persona e password). Ogni docente carica le proprie slide, esercizi e risorse direttamente sulla pagina del corso.",
  },
  {
    value: "item-3",
    trigger: "Come funziona la prenotazione agli esami?",
    content:
      "La prenotazione agli esami avviene tramite il portale Online Services (servizionline.polimi.it). Devi prenotarti entro la scadenza indicata per ogni appello. Ricordati di verificare i prerequisiti necessari prima di iscriverti a un esame.",
  },
  {
    value: "item-4",
    trigger: "Cos'è il codice persona e dove lo trovo?",
    content:
      "Il codice persona è il tuo identificativo univoco al Politecnico, composto da 6 cifre. Lo trovi nella lettera di ammissione o nella mail di benvenuto ricevuta dopo l'immatricolazione. Serve per accedere a tutti i servizi online dell'Ateneo.",
  },
  {
    value: "item-5",
    trigger: "Come posso contattare PoliNetwork?",
    content:
      "Puoi contattare PoliNetwork tramite i nostri canali Telegram o attraverso il sito ufficiale. Siamo un'associazione studentesca e offriamo supporto, risorse e una community per tutti gli studenti del Politecnico.",
  },
]

export function FAQsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-400 flex-col items-center justify-center gap-16 px-9 py-49 sm:gap-20">
      <h2 className="typo-headline-medium sm:typo-display-medium text-center text-text-primary">
        Domande Frequenti tra le Matricole
      </h2>

      <div className="mx-auto flex w-full max-w-255 flex-col">
        <AccordionList items={accordionItems} />
      </div>
    </main>
  )
}
