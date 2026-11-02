import { CardIcon } from "@/components/card-icon"
import { CONTAINER, PAGE_HERO_TOP } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"
import { cn } from "@/lib/utils"
import type { FreshmanContent } from "@/queries/types"
import { FEATURED_CARD, freshmanCardProps } from "./cards"

export function MatricoleIntro({ resources }: { resources: FreshmanContent["resources"] }) {
  return (
    // The featured resources close the hero, so it takes only the hero's top padding
    <section className={cn(CONTAINER, PAGE_HERO_TOP, "flex flex-col gap-16 xl:gap-20")}>
      <Hero
        title="Matricole"
        description="Ecco una raccolta curata di risorse utili, guide e strumenti per supportare il tuo percorso."
      />

      {/* Hidden on phones, as in the mobile design */}
      <div className="hidden w-full gap-6 sm:grid sm:grid-cols-2">
        {resources
          .filter((resource) => resource.group === "featured")
          .map((resource) => (
            <CardIcon key={resource.id} {...freshmanCardProps(resource)} {...FEATURED_CARD} />
          ))}
      </div>
    </section>
  )
}
