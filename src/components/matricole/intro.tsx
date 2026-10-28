import { CardIcon } from "@/components/card-icon"
import { CONTAINER, PAGE_HERO } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"
import { cn } from "@/lib/utils"
import type { FreshmanContent } from "@/queries/types"
import { FEATURED_CARD, freshmanCardProps } from "./cards"

export function MatricoleIntro({ resources }: { resources: FreshmanContent["resources"] }) {
  return (
    // The featured resources close the hero, so the hero's extra bottom air is dropped: the page gap follows
    <section className={cn(CONTAINER, PAGE_HERO, "flex flex-col gap-16 pb-0 md:pb-0 xl:gap-20 xl:pb-0")}>
      <Hero
        title="Matricole"
        description="Ecco una raccolta curata di risorse utili, guide e strumenti per supportare il tuo percorso."
      />

      {/* Hidden on phones as in the Figma mobile frame (3351:13333): an open design decision, not changed here */}
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
