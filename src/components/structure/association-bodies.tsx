"use client"

import { Accordion } from "@/components/accordion-association/accordion"
import { AccordionContent } from "@/components/accordion-association/accordion-content"
import { AccordionItem } from "@/components/accordion-association/accordion-item"
import { AccordionTrigger } from "@/components/accordion-association/accordion-trigger"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { associationBodies } from "./constants"

export function AssociationBodies() {
  return (
    <>
      <Accordion type="single" collapsible className="md:hidden">
        {associationBodies.map((body) => (
          <AccordionItem key={body.id} value={body.id} className="rounded-rectangles">
            <AccordionTrigger className="p-6 focus-visible:ring-2 focus-visible:ring-blue-secondary focus-visible:ring-inset">
              <span className="min-w-0">{body.title}</span>
            </AccordionTrigger>
            <AccordionContent className="group-data-[state=open]:px-6 group-data-[state=open]:pb-6">
              {body.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="hidden gap-6 md:grid md:grid-cols-2">
        {associationBodies.map((body) => (
          <Card key={body.id} className="h-auto w-full gap-6 border-white/50 p-6">
            {/* Definitions, not objects: plain title as in Figma, no icon */}
            <CardHeader>
              <CardTitle gradient={false} className="typo-headline-medium text-balance">
                {body.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="typo-body-large text-pretty">{body.description}</CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
