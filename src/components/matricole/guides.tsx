import { CardIcon } from "@/components/card-icon"
import { CONTAINER, SECTION_TITLE } from "@/components/layout/page"
import { cn } from "@/lib/utils"
import type { FreshmanContent } from "@/queries/types"
import { CardGroup } from "../card-group"
import { FEATURED_CARD, freshmanCardProps } from "./cards"
import { hub, techTools } from "./constants"

export function MatricoleGuides({ content }: { content: FreshmanContent }) {
  const guides = content.resources.filter((card) => card.group === "guides")
  const materials = content.resources.filter((card) => card.group === "materials")
  const tools = content.resources.filter((card) => card.group === "tools")
  return (
    <section className={cn(CONTAINER, "flex flex-col gap-8 sm:gap-12")}>
      <h2 className={SECTION_TITLE}>Guide e Utility</h2>

      <div className="flex flex-col gap-16 sm:gap-6">
        {/* 5/12 for the large card: at 1:1 the 2×2 grid next to it squeezed its titles onto two lines */}
        <div className="grid w-full gap-6 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Hidden on phones, as in the mobile design */}
          {guides.slice(0, 1).map((guide) => (
            <CardIcon
              key={guide.id}
              {...freshmanCardProps(guide)}
              {...FEATURED_CARD}
              className={cn(FEATURED_CARD.className, "hidden sm:block")}
            />
          ))}
          <div className="grid w-full gap-3 sm:grid-cols-2 sm:gap-6">
            {guides.slice(1).map((guide) => (
              <CardIcon
                key={guide.id}
                {...freshmanCardProps(guide)}
                align="inline"
                className="h-full"
                size="inline-sm"
              />
            ))}
          </div>
        </div>

        <CardGroup title={hub.title} description={hub.description}>
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
            {content.telegram.map((card) => (
              <CardIcon key={card.id} {...freshmanCardProps(card)} align="inline" size="inline" />
            ))}
          </div>
        </CardGroup>

        <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Hidden on phones, as in the mobile design */}
          {materials.map((material) => (
            <CardIcon
              key={material.id}
              {...freshmanCardProps(material)}
              {...FEATURED_CARD}
              className={cn(FEATURED_CARD.className, "hidden sm:block")}
            />
          ))}
          <CardGroup title={techTools.title} description={techTools.description} icon={techTools.icon} horizontal>
            <div className="flex flex-col gap-3 sm:gap-6">
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
