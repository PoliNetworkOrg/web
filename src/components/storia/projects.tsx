import Image from "next/image"
import Link from "next/link"
import { FiAirplay, FiArrowUpRight, FiBarChart, FiBook, FiCheck, FiHeadphones } from "react-icons/fi"
import telegram from "@/assets/icons/telegram-gradient.svg"
import projectsImage from "@/assets/images/storia/progetti.png"
import { CardIcon } from "@/components/card-icon"
import { Glass } from "@/components/glass"
import TextOnlyLayout from "@/components/layout/TextOnlySection"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Bot Telegram",
    description: "Per moderare, smistare e aiutare gli studenti a trovare le informazioni.",
    icon: telegram.src,
  },
  {
    title: "Sito web",
    description: "Per trovare il gruppo del proprio corso e orientarsi nella rete.",
    icon: FiAirplay,
  },
  { title: "Graduatorie", description: "Per consultare le graduatorie degli anni precedenti.", icon: FiBarChart },
  { title: "Progetto TOL", description: "Per esercitarsi con prove e simulazioni.", icon: FiBook },
  {
    title: "Sincronizzatore WeBeep",
    description: "Per rendere più semplice l’accesso ai file dei corsi.",
    icon: FiCheck,
  },
  {
    title: "Registrazioni delle lezioni",
    description: "Strumenti per trovare, organizzare e condividere le registrazioni.",
    icon: FiHeadphones,
  },
]

export function HistoryProjects() {
  return (
    <section className="mx-auto flex w-full max-w-330 flex-col gap-20 px-6">
      <TextOnlyLayout
        title="I nostri progetti"
        description={
          <>
            <h3 className="typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
              Le cose che abbiamo costruito.
            </h3>
            <p className="typo-body-large sm:typo-headline-extrasmall mt-3 text-pretty">
              Nel corso degli anni PoliNetwork ha sviluppato e mantenuto un ecosistema di{" "}
              <strong>strumenti gratuiti e open source</strong> pensati per rispondere ai bisogni concreti degli
              studenti.
            </p>
          </>
        }
        classNames={{
          section: "gap-12 px-0 md:px-0 xl:flex-row xl:items-center [&>div>h2]:typo-title-large",
          textDiv: "min-w-0 xl:w-1/2 xl:items-start",
          title: "text-blue-secondary xl:text-start",
          descriptionDiv: "xl:text-start",
          contentDiv: "min-w-0 xl:w-1/2",
        }}
      >
        <Image
          src={projectsImage}
          alt="Il sito PoliNetwork su computer e smartphone"
          className="h-auto w-full object-contain mix-blend-multiply"
          sizes="(max-width: 1279px) 100vw, 670px"
        />
      </TextOnlyLayout>
      <div className="flex flex-col gap-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <CardIcon
              key={project.title}
              {...project}
              size={{ base: "inline-sm", sm: "inline" }}
              align="inline"
              className="h-full [&_h3]:text-balance"
            />
          ))}
        </div>
        <Glass className="typo-body-large flex flex-col gap-6 rounded-rectangles border-white/50 bg-background-blur p-6 sm:p-8 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex max-w-240 flex-col gap-3 text-pretty">
            <p>
              Molti dei progetti di PoliNetwork sono nati da <strong>idee individuali</strong>: studenti che hanno
              creato autonomamente uno strumento utile e che, nel tempo, sono entrati a far parte del network.
            </p>
            <p>Da un’idea di uno studente a uno strumento per migliaia di studenti.</p>
          </div>
          <Button asChild className="w-fit shrink-0">
            <Link href="/projects">
              Scopri tutti i progetti <FiArrowUpRight aria-hidden />
            </Link>
          </Button>
        </Glass>
      </div>
    </section>
  )
}
