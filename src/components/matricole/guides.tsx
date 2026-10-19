import { CardIcon } from "@/components/card-icon"
import type { FreshmanContent } from "@/queries/types"
import { CardGroup } from "../card-group"
import { freshmanCardProps } from "./cards"
import { hub, techTools } from "./constants"

export function MatricoleGuides({ content }: { content: FreshmanContent }) {
  const guides = content.resources.filter((card) => card.group === "guides")
  const materials = content.resources.filter((card) => card.group === "materials")
  const tools = content.resources.filter((card) => card.group === "tools")
  return (
    <section className="flex w-full flex-col items-center px-6 sm:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 text-start sm:gap-13">
        <h3 className="typo-title-large sm:typo-display-medium">Guide e Utility</h3>

        <div className="grid w-full gap-6 sm:grid-cols-2">
          {/* Hidden in mobile */}
          {guides.slice(0, 1).map((guide) => (
            <CardIcon
              key={guide.id}
              {...freshmanCardProps(guide)}
              align="start"
              className="hidden h-full sm:block"
              size="compact"
            />
          ))}
          <div className="grid w-full gap-3 sm:gap-6 lg:grid-cols-2">
            {guides.slice(1).map((guide) => (
              <CardIcon key={guide.id} {...freshmanCardProps(guide)} align="inline" className="h-full" size="inline" />
            ))}
          </div>
        </div>

        <CardGroup title={hub.title} description={hub.description} className="mt-18 w-full sm:mt-0">
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.telegram.map((card) => (
              <CardIcon key={card.id} {...freshmanCardProps(card)} align="inline" size="inline" />
            ))}
          </div>
        </CardGroup>

        <div className="grid w-full gap-6 sm:grid-cols-2">
          {/* hidden in mobile */}
          {materials.map((material) => (
            <CardIcon
              key={material.id}
              {...freshmanCardProps(material)}
              align="start"
              className="hidden h-full sm:block"
              size="compact"
            />
          ))}
          <CardGroup
            title={techTools.title}
            description={techTools.description}
            icon={techTools.icon}
            className="mt-18 w-full sm:mt-0"
            horizontal
          >
            <div className="flex flex-col gap-6">
              {tools.map((card) => (
                <CardIcon key={card.id} {...freshmanCardProps(card)} align="inline" size="inline" />
              ))}
            </div>
          </CardGroup>
        </div>
      </div>
    </section>
  )
}
