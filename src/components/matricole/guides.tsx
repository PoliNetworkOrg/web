import { FiBook, FiDollarSign, FiMap, FiRadio } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"

const guides = [
    {
        title: "Guida della matricola",
        description: "Dalla prima iscrizione alla vita in campus: il manuale completo per ogni nuovo studente.",
        icon: FiBook,
    },
    {
        title: "Mappa Microonde",
        description: "Dove scaldare il pranzo nei vari campus.",
        icon: FiMap,
    },
    {
        title: "Corsi a Scelta",
        description: "Consigli su come comporre il Piano di Studi.",
        icon: FiBook,
    },
    {
        title: "News",
        description: "Le ultime novità dagli studenti del Politecnico..",
        icon: FiRadio,
    },
    {
        title: "Borsa di Studio",
        description: "Requisiti e scadenze per le agevolazioni.",
        icon: FiDollarSign,
    }
] as const

export function MatricoleGuides() {
    return (
        <section className="flex min-h-screen w-full flex-col items-center px-6 sm:px-10">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-13 text-start">
                <h3 className="typo-display-small md:typo-display-medium">
                    Guide e Utility
                </h3>

                <div className="grid w-full gap-6 md:grid-cols-2">
                    <CardIcon key={guides[0].title} {...guides[0]} align="start" className="h-full min-h-50" size="compact" />
                    <div className="grid w-full gap-6 md:grid-cols-2">
                        {guides.slice(1).map((guide) => (
                            <CardIcon key={guide.title} {...guide} align="start" className="h-full min-h-50" size="compact" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
