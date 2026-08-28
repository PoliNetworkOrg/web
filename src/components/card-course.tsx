import type { IconType } from "react-icons"
import { FiChevronRight, FiGlobe, FiMapPin } from "react-icons/fi"
import { Card, CardAction, CardContent } from "./ui/card"

export function CardCourse({
  courseName,
  iconLocation: IconLocation = FiMapPin,
  location = "Milano Leonardo",
  iconLanguage: IconLanguage = FiGlobe,
  language = "ITA",
  iconSelect: IconSelect = FiChevronRight,
}: {
  courseName: string
  iconLocation?: IconType
  location?: "Milano Leonardo" | "Milano Bovisa" | "Cremona" | "Lecco" | "Mantova" | "Piacenza" | "Xi'an" //Magari poi si mette solo string come tipo nel caso si pullino da un DB
  iconLanguage?: IconType
  language?: "ITA" | "ENG" //Idem
  iconSelect?: IconType
}) {
  return (
    <Card className="typo-body-large flex h-fit w-full flex-row items-center gap-2 px-5 py-3.75 font-normal leading-6 tracking-[0.03125rem] sm:gap-0">
      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:contents">
        <CardContent className="min-w-0 truncate sm:basis-1/3">{courseName}</CardContent>
        <div className="flex min-w-0 items-center gap-4 sm:contents">
          <CardContent className="flex min-w-0 items-center gap-1.25 sm:basis-1/3">
            <CardAction icon={IconLocation} iconSize="xs" /> <span className="truncate">{location}</span>
          </CardContent>
          <CardContent className="flex min-w-0 items-center gap-1.25 sm:basis-1/3">
            <CardAction icon={IconLanguage} iconSize="xs" /> <span className="truncate">{language}</span>
          </CardContent>
        </div>
      </div>
      <CardContent className="flex shrink-0 items-center">
        <IconSelect className="h-4 w-4 text-text-primary" strokeWidth={2} />
      </CardContent>
    </Card>
  )
}
