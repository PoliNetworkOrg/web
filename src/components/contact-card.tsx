import type { ReactNode } from "react"
import { Card, CardBottomButton, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type ContactCardData = {
  title: string
  description: ReactNode
  email: string
}

export function ContactCard({ title, description, email }: ContactCardData) {
  return (
    <Card className="h-auto w-full gap-4 p-6">
      <CardHeader>
        <CardTitle className="typo-headline-small xl:typo-headline-extrasmall">{title}</CardTitle>
      </CardHeader>
      <CardContent className="typo-body-medium flex-1">{description}</CardContent>
      <CardBottomButton variant="tertiary" asChild className="mt-auto max-w-full">
        <a href={`mailto:${email}`}>{email}</a>
      </CardBottomButton>
    </Card>
  )
}
