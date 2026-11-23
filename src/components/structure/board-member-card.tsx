import { Image } from "@/components/image"
import type { BoardMember } from "@/components/storia/constants"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/** A Direttivo member's portrait, with name and role over a gradient. With a LinkedIn profile, the card links to it. */
export function BoardMemberCard({
  member,
  sizes,
  className,
}: {
  member: BoardMember
  sizes: string
  className?: string
}) {
  return (
    <Card
      hoverBackground={false}
      className={cn(
        "relative aspect-[223.429/263] h-auto w-full max-w-56 rounded-rectangles border-edge/50 p-0 shadow-sm",
        // Linked portraits react like the site's other clickable cards: they lift their photo and shrink when pressed
        member.linkedin &&
          "transition-transform duration-150 ease-out has-[a:active]:scale-[0.98] has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-blue-secondary [&:has(a:hover)_img]:scale-105",
        className
      )}
    >
      <Image
        src={member.image}
        alt={member.name}
        sizes={sizes}
        className={cn("absolute max-w-none transition-transform duration-500 ease-out", member.crop)}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-5% from-blue-secondary/70 to-60% to-transparent dark:from-blue-tertiary/80"
      />
      <CardContent className="absolute inset-x-4 bottom-5 text-white">
        <h3 className="typo-body-large font-poppins">{member.name}</h3>
        {member.role && <p className="typo-body-small">{member.role}</p>}
      </CardContent>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 outline-none"
        >
          <span className="sr-only">{member.name} su LinkedIn (si apre in una nuova scheda)</span>
        </a>
      )}
    </Card>
  )
}
