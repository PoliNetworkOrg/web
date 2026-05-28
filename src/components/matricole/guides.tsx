import { CardIcon } from "@/components/card-icon"
import { CardGroup } from "../card-group"
import { guides, hub, materiali, techTools } from "./constants"

export function MatricoleGuides() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center px-6 sm:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-13 text-start">
        <h3 className="typo-display-small md:typo-display-medium">Guide e Utility</h3>

        <div className="grid w-full gap-6 md:grid-cols-2">
          <CardIcon key={guides[0].title} {...guides[0]} align="start" className="h-full" size="compact" />
          <div className="grid w-full gap-6 md:grid-cols-2">
            {guides.slice(1).map((guide) => (
              <CardIcon key={guide.title} {...guide} align="inline" className="h-full" size="inline" />
            ))}
          </div>
        </div>
        <CardGroup title={hub.title} description={hub.description} className="w-full">
          <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-4">
            {hub.cards.map((card) => (
              <CardIcon key={card.title} {...card} align="inline" size="inline" />
            ))}
          </div>
        </CardGroup>

        <div className="grid w-full gap-6 md:grid-cols-2">
          <CardIcon key={materiali.title} {...materiali} align="start" className="h-full" size="compact" />
          <CardGroup
            title={techTools.title}
            description={techTools.description}
            icon={techTools.icon}
            className="w-full"
            horizontal
          >
            <div className="flex flex-col gap-6">
              {techTools.cards.map((card) => (
                <CardIcon key={card.title} {...card} align="inline" size="inline" />
              ))}
            </div>
          </CardGroup>
        </div>
      </div>
    </section>
  )
}
