import { FiUserPlus } from "react-icons/fi"
import CardText from "@/components/card-text"
import { Button } from "@/components/ui/button"

const guides = [
    {
        text: "Corsi a scelta Primo Anno",
    },
    {
        text: "Corsi a scelta Secondo Anno",
    },
    {
        text: "Corsi a scelta Terzo Anno",
    },
]

export default function GuidePage() {
    return (
        <section className="min-h-screen w-full">
            <div className="mx-auto flex w-full max-w-350 flex-col gap-4 px-6 pt-24 pb-15 sm:gap-9 sm:px-12 sm:pt-58">
                <div className="flex flex-col gap-35">
                    <div className="flex flex-col items-center gap-6">
                        <h1 className="typo-display-large sm:typo-display-extralarge w-fit bg-linear-to-b from-text-primary to-text-secondary bg-clip-text py-4 text-transparent">
                            Guide
                        </h1>
                        <p className="typo-title-large sm:typo-headline-small max-w-2xl text-text-primary">
                            Una raccolta di guide realizzate dai membri del Network
                        </p>
                    </div>
                    <div className="flex flex-col gap-14">
                        <div className="flex flex-col gap-2 text-start">
                            <h3 className="typo-headline-small sm:typo-display-medium w-fit">Le guide per Ingegneria Informatica</h3>
                            <p className="typo-body-large sm:typo-body-large text-text-primary">
                                Rimani aggiornato sulle idee appena condivise dagli studenti del Politecnico
                            </p>
                        </div>
                        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
                            {guides.map((guide) => (
                                <CardText key={guide.text} text={guide.text} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full justify-end px-6 pb-15 sm:px-12">
                <Button variant="tertiaryBlur" size="lg" className="text-blue-secondary">
                    <FiUserPlus />
                    Sei una matricola?
                </Button>
            </div>
        </section>
    )
}
