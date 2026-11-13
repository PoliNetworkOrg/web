import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { GradientIcon } from "@/components/gradient-icon"
import { PeekCarousel } from "@/components/peek-carousel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { participationPaths } from "./constants"

type ParticipationPath = (typeof participationPaths)[number]

export function Participation() {
  return (
    <>
      <div className="hidden gap-6 sm:grid lg:grid-cols-3">
        {participationPaths.map((path) => (
          <ParticipationCard key={path.title} path={path} />
        ))}
      </div>
      {/* Phones: a carousel instead of three stacked cards */}
      <PeekCarousel
        items={participationPaths}
        getKey={(path) => path.title}
        render={(path) => <ParticipationCard path={path} />}
        className="sm:hidden"
      />
    </>
  )
}

function ParticipationCard({ path }: { path: ParticipationPath }) {
  return (
    <Card className="h-auto w-full gap-6 border-white/50 p-6">
      <CardHeader className="flex flex-row items-center justify-between gap-4 lg:flex-col lg:items-start">
        <GradientIcon icon={path.icon} className="order-2 size-10 shrink-0 lg:order-1 lg:size-16" />
        <CardTitle
          gradient={false}
          className="typo-headline-small lg:typo-headline-medium order-1 text-balance lg:order-2"
        >
          {path.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="typo-body-large flex-1 text-pretty">{path.description}</CardContent>
      <Button asChild className="mt-4 w-fit max-w-full">
        <Link href={path.href}>
          {path.cta}
          <FiArrowUpRight aria-hidden />
        </Link>
      </Button>
    </Card>
  )
}
