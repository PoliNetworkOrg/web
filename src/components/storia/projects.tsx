import Image from "next/image"
import Link from "next/link"
import { FiAirplay, FiArrowUpRight, FiBarChart, FiBook, FiCheck, FiHeadphones } from "react-icons/fi"
import telegram from "@/assets/icons/telegram-gradient.svg"
import projectsImage from "@/assets/images/storia/progetti.png"
import { CardIcon } from "@/components/card-icon"
import { CONTAINER } from "@/components/layout/page"
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
    <section className={`${CONTAINER} flex flex-col gap-16 sm:gap-20`}>
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
          textDiv: "min-w-0 items-start xl:w-1/2",
          title: "text-start text-blue-secondary",
          descriptionDiv: "text-start",
          contentDiv: "min-w-0 xl:w-1/2",
        }}
      >
        <Image
          src={projectsImage}
          alt="Il sito PoliNetwork su computer e smartphone"
          className="mx-auto h-auto w-full max-w-2xl object-contain mix-blend-multiply"
          sizes="(max-width: 1279px) 100vw, 670px"
        />
      </TextOnlyLayout>
      {/* Figma: the six tools on the left, the note about where they come from beside them, without a panel */}
      <div className="grid gap-10 xl:grid-cols-[minmax(0,5fr)_minmax(0,2fr)] xl:items-center xl:gap-16">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <CardIcon
              key={project.title}
              {...project}
              size={{ base: "inline-sm", sm: "inline" }}
              align="start"
              className="h-full [&_h3]:text-balance"
            />
          ))}
        </div>
        <div className="typo-body-large flex max-w-145 flex-col gap-4 text-pretty">
          <p>
            Molti dei progetti di PoliNetwork sono nati da <strong>idee individuali</strong>: studenti che hanno creato
            autonomamente uno strumento utile e che, nel tempo, sono entrati a far parte del network.
          </p>
          <p className="text-blue-secondary">Da un’idea di uno studente a uno strumento per migliaia di studenti.</p>
          <Button asChild size="lg" className="mt-2 w-fit">
            <Link href="/projects">
              Scopri tutti i progetti <FiArrowUpRight aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
