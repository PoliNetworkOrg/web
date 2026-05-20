import { Card, CardContent } from "./ui/card"

export default function CardText({ text, className }: { text: string; className?: string }) {
  return (
    <Card className={`h-fit w-full rounded-3xl border-white/50 p-4 ${className || ""}`}>
      <CardContent className="typo-headline-small sm:typo-hedline-small bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text px-0 text-center font-normal text-transparent">
        {text}
      </CardContent>
    </Card>
  )
}
