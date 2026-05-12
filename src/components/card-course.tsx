import type { IconType } from "react-icons"
import { CiGlobe } from "react-icons/ci"
import { FaAngleRight } from "react-icons/fa6"
import { IoLocationOutline } from "react-icons/io5"
import { Card, CardAction, CardContent } from "./ui/card"

export function CardCourse({
  courseName,
  iconLocation: IconLocation = IoLocationOutline,
  location = "Milano Leonardo",
  iconLanguage: IconLanguage = CiGlobe,
  language = "ITA",
  iconSelect: IconSelect = FaAngleRight,
}: {
  courseName: string
  iconLocation?: IconType
  location?: "Milano Leonardo" | "Milano Bovisa" | "Cremona" | "Lecco" | "Mantova" | "Piacenza" | "Xi'an" //Magari poi si mette solo string come tipo nel caso si pullino da un DB
  iconLanguage?: IconType
  language?: "ITA" | "ENG" //Idem
  iconSelect?: IconType
}) {
  return (
    <Card className="typo-body-large flex h-fit w-full flex-row px-5 py-3.75 font-normal leading-6 tracking-[0.03125rem]">
      <CardContent className="basis-1/3 truncate">{courseName}</CardContent>
      <CardContent className="flex basis-1/3 items-center gap-1.25">
        <CardAction icon={IconLocation} iconSize="xs" /> {location}
      </CardContent>
      <CardContent className="flex basis-1/3 items-center gap-1.25">
        <CardAction icon={IconLanguage} iconSize="xs" /> {language}
      </CardContent>
      <CardContent className="flex items-center">
        <CardAction icon={IconSelect} iconSize="xs" />
      </CardContent>
    </Card>
  )
}
