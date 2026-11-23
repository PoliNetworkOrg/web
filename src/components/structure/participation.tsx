import { CardCaption } from "@/components/card-caption"
import { PeekCarousel } from "@/components/peek-carousel"
import { participationPaths } from "./constants"

type ParticipationPath = (typeof participationPaths)[number]

export function Participation() {
  return (
    <>
      <div className="hidden gap-6 md:grid lg:grid-cols-3">
        {participationPaths.map((path) => (
          <ParticipationCard key={path.title} path={path} />
        ))}
      </div>
      {/* Phones: a carousel instead of three stacked cards */}
      <PeekCarousel
        items={participationPaths}
        getKey={(path) => path.title}
        render={(path) => <ParticipationCard path={path} />}
        className="md:hidden"
      />
    </>
  )
}

/** The whole card is the link, with the hover and press of the site's other clickable cards: no separate button. */
function ParticipationCard({ path }: { path: ParticipationPath }) {
  return (
    <CardCaption
      title={path.title}
      caption={<p>{path.description}</p>}
      icon={path.icon}
      iconPosition="top"
      href={path.href}
      className="h-full w-full gap-4 p-6"
      titleClassName="typo-headline-small lg:typo-headline-medium text-balance"
      captionClassName="typo-body-large text-pretty"
    />
  )
}
