import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { GradientIcon } from "@/components/gradient-icon"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { participationPaths } from "./constants"

export function Participation() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {participationPaths.map((path) => (
        <Card key={path.title} className="h-auto w-full gap-6 border-white/50 p-6">
          <CardHeader className="flex flex-row items-center justify-between gap-4 lg:flex-col lg:items-start">
            <GradientIcon icon={path.icon} className="order-2 size-10 shrink-0 lg:order-1 lg:size-16" />
            <CardTitle className="typo-headline-small lg:typo-headline-medium order-1 text-balance lg:order-2">
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
      ))}
    </div>
  )
}
