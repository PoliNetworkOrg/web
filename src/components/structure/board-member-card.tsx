import Image from "next/image"
import type { boardMembers } from "@/components/storia/constants"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/** A Direttivo member's portrait, with name and role over a gradient. */
export function BoardMemberCard({
  member,
  sizes,
  className,
}: {
  member: (typeof boardMembers)[number]
  sizes: string
  className?: string
}) {
  return (
    <Card
      className={cn(
        "relative aspect-[223.429/263] h-auto w-full max-w-56 rounded-rectangles border-white/50 p-0 shadow-sm",
        className
      )}
    >
      <Image src={member.image} alt={member.name} sizes={sizes} className={cn("absolute max-w-none", member.crop)} />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-5% from-blue-secondary/70 to-60% to-transparent"
      />
      <CardContent className="absolute inset-x-4 bottom-5 text-white">
        <h3 className="typo-body-large font-poppins">{member.name}</h3>
        {member.role && <p className="typo-body-small">{member.role}</p>}
      </CardContent>
    </Card>
  )
}
