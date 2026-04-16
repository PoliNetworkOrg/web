import AccordionList from "@/components/accordion-list"

const accordionItems = [
  {
    value: "item-1",
    trigger: "Per le lauree le lezioni sono sospese? ",
    content:
      "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell’esercitatore.",
  },
  {
    value: "item-2",
    trigger: "Per le lauree le lezioni sono sospese? ",
    content:
      "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell’esercitatore.",
  },
  {
    value: "item-3",
    trigger: "Per le lauree le lezioni sono sospese? ",
    content:
      "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell’esercitatore.",
  },
  {
    value: "item-4",
    trigger: "Per le lauree le lezioni sono sospese? ",
    content:
      "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell’esercitatore.",
  },
  {
    value: "item-5",
    trigger: "Per le lauree le lezioni sono sospese? ",
    content:
      "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell’esercitatore.",
  },
]

export default function FAQsPage() {
  return (
    <main className="w-full">
      <div className="mx-auto w-225 py-12">
        <AccordionList items={accordionItems} defaultValue="item-1" />
      </div>
    </main>
  )
}
