import { FiBook, FiStar } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"
import { GroupSearch } from "@/components/home/group-search"

const groups = [
  {
    title: "Gruppi Didattici",
    caption: "Ingegneria, Architettura, Design, e tutti i gruppi del tuo corso di studi.",
    href: "/groups/didattica",
    icon: FiBook,
  },
  {
    title: "Gruppi Extra",
    caption: "Affitti, mercatino, eventi, hobby e tutto ciò che riguarda la vita studentesca.",
    href: "/groups/extra",
    icon: FiStar,
  },
] as const

export default function Home() {
  return (
    <main className="w-full">
      <div className="mx-auto flex min-h-svh flex-col items-center justify-center gap-16 px-4 py-32 md:gap-34">
        <div className="flex w-full flex-col items-center gap-5 text-center">
          <h2 className="typo-display-large md:typo-display-extralarge w-fit bg-linear-to-b from-text-primary to-text-secondary bg-clip-text py-4 text-transparent md:py-14">
            Groups
          </h2>
          <GroupSearch />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:gap-13">
          {groups.map((group) => (
            <CardIcon
              key={group.title}
              title={group.title}
              description={group.caption}
              href={group.href}
              icon={group.icon}
              align="start"
              className="w-full max-w-108"
              size="compact"
            />
          ))}
        </div>
      </div>
    </main>
  )
}
