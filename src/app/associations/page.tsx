import Image from "next/image"
import {
  FiFacebook,
  FiGithub,
  FiGlobe,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiTwitch,
  FiX,
  FiYoutube,
} from "react-icons/fi"
import { GradientIcon } from "@/components/gradient-icon"
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
        icon: FiFacebook,
      },
      {
        key: "Instagram",
        href: "https://www.google.com",
        icon: FiInstagram,
      },
      {
        key: "Youtube",
        href: "https://www.google.com",
        icon: FiYoutube,
      },
      // {
      //   key: "Discord",
      //   href: "https://www.google.com",
      //   icon: FiDiscord
      // },
      {
        key: "GitHub",
        href: "https://www.google.com",
        icon: FiGithub,
      },
      // {
      //   key: "Telegram",
      //   href: "https://www.google.com",
      //   icon: FiTelegram
      // },
      {
        key: "Email",
        href: "mailto:example@email.com",
        icon: FiMail,
      },
      {
        key: "LinkedIn",
        href: "https://www.google.com",
        icon: FiLinkedin,
      },
      {
        key: "Twitch",
        href: "https://www.google.com",
        icon: FiTwitch,
      },
      // {
      //   key: "Spotify",
      //   href: "https://www.google.com",
      //   icon: FiSpotify
      // },
      {
        key: "X",
        href: "https://www.google.com",
        icon: FiX,
      },
      {
        key: "Web",
        href: "https://www.google.com",
        icon: FiGlobe,
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
              <AccordionContent>
                {item.content}
                <div className="flex flex-col items-start gap-5 pt-14">
                  <span className="typo-title-large bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent">
                    Segui l'associazione
                  </span>
                  <div className="flex flex-wrap gap-7">
                    {item.links.map((link) => (
                      <a
                        key={link.key}
                        href={link.href}
                        target="_blank"
                        className="group/icon relative"
                      >
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
      </div>
    </main>
  )
}
