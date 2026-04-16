import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion-association"
import esnLogo from "../../../public/logos/esn.svg"

const accordionItems = [
  {
    value: "ESN - Erasmus Student Network",
    name: "ESN - Erasmus Student Network",
    logo: esnLogo,
    content:
      "Lorem ipsum dolor sit amet consectetur. Velit integer diam in id proin blandit fames id. Volutpat at vel risus non amet tortor. Potenti sit gravida donec lacinia et posuere faucibus. Elementum libero diam nullam ultricies mauris mauris erat porttitor. At morbi commodo nunc vulputate id odio pellentesque ipsum. Adipiscing at dictumst pulvinar mattis faucibus quisque donec convallis commodo. ",
    links: [
      {
        key: "Facebook",
        href: "https://www.google.com",
      },
      {
        key: "Instagram",
        href: "https://www.google.com",
      },
      {
        key: "Youtube",
        href: "https://www.google.com",
      },
      {
        key: "Discord",
        href: "https://www.google.com",
      },
      {
        key: "GitHub",
        href: "https://www.google.com",
      },
      {
        key: "Telegram",
        href: "https://www.google.com",
      },
      {
        key: "Email",
        href: "mailto:example@email.com",
      },
      {
        key: "LinkedIn",
        href: "https://www.google.com",
      },
      {
        key: "Twitch",
        href: "https://www.google.com",
      },
      {
        key: "Spotify",
        href: "https://www.google.com",
      },
      {
        key: "X",
        href: "https://www.google.com",
      },
      {
        key: "Web",
        href: "https://www.google.com",
      },
    ],
  },
]

export default function AssociationsPage() {
  return (
    <main className="w-full">
      <div className="mx-auto w-300 py-12">
        <Accordion type="single" collapsible defaultValue="item-1">
          {accordionItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>
                <div className="flex items-center gap-10">
                  <Image src={item.logo} alt={item.name} width={100} height={100} className="rounded-full" />
                  <span>{item.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  )
}
