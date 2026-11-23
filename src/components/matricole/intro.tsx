import { CardIcon } from "@/components/card-icon"
import { CONTAINER, PAGE_HERO_TOP } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"
import { cn } from "@/lib/utils"
import type { FreshmanContent } from "@/queries/types"
import { FEATURED_CARD, freshmanCardProps } from "./cards"

export function MatricoleIntro({ resources }: { resources: FreshmanContent["resources"] }) {
  const featured = resources.filter((resource) => resource.group === "featured")
  return (
    // The featured resources close the hero, so it takes only the hero's top padding
    <section className={cn(CONTAINER, PAGE_HERO_TOP, "flex flex-col gap-16 xl:gap-20")}>
      <Hero
        title="Matricole"
        description="Ecco una raccolta curata di risorse utili, guide e strumenti per supportare il tuo percorso."
      />

      {/* Large cards from sm up. The mobile design dropped them, but they are the key resources for a freshman
          (rankings, TOL): phones get the same links as compact cards */}
      <div className="hidden w-full gap-6 sm:grid sm:grid-cols-2">
        {featured.map((resource) => (
          <CardIcon key={resource.id} {...freshmanCardProps(resource)} {...FEATURED_CARD} />
        ))}
      </div>
      <div className="grid w-full gap-3 sm:hidden">
        {featured.map((resource) => (
          <CardIcon key={resource.id} {...freshmanCardProps(resource)} align="inline" size="inline" />
        ))}
      </div>
    </section>
  )
}
