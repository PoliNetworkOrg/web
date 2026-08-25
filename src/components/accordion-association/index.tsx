import Image from "next/image"
import { GradientIcon } from "../gradient-icon"
import { Accordion } from "./accordion"
import { AccordionContent } from "./accordion-content"
import { AccordionItem } from "./accordion-item"
import { AccordionTrigger } from "./accordion-trigger"
import type { AccordionAssociationProps } from "./types"

export default function AccordionAssociation({ accordionItems, defaultValue }: AccordionAssociationProps) {
  return (
    <Accordion type="single" collapsible defaultValue={defaultValue}>
      {accordionItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>
            <div className="flex items-center gap-4 md:gap-10">
              <Image
                src={item.logo}
                alt={item.name}
                width={80}
                height={80}
                className="size-14 rounded-full md:size-20"
              />
              <span>{item.name}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {item.content}
            <div className="flex flex-col items-start gap-5 pt-14">
              <span className="typo-body-large md:typo-title-large bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent">
                Segui l'associazione
              </span>
              <div className="flex flex-wrap gap-4 md:gap-7">
                {item.links.map((link) => (
                  <a key={link.key} href={link.href} target="_blank" className="group/icon relative">
                    <link.icon className="size-6 transition-opacity duration-200 group-hover/icon:opacity-0" />
                    <GradientIcon
                      icon={link.icon}
                      className="absolute inset-0 size-6 opacity-0 transition-opacity duration-200 group-hover/icon:opacity-100"
                    />
                  </a>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
