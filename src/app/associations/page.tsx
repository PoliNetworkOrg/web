"use client"

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
import AccordionAssociation from "@/components/accordion-association"
import { Hero } from "@/components/ui/hero"
import esnLogo from "../../../public/logos/esn.svg"

const accordionItems = [
  {
    value: "ESN",
    name: "ESN",
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
  {
    value: "Lista Aperta",
    name: "Lista Aperta",
    logo: esnLogo,
    content:
      "Lorem ipsum dolor sit amet consectetur. Velit integer diam in id proin blandit fames id. Volutpat at vel risus non amet tortor. Potenti sit gravida donec lacinia et posuere faucibus. Elementum libero diam nullam ultricies mauris mauris erat porttitor. At morbi commodo nunc vulputate id odio pellentesque ipsum. Adipiscing at dictumst pulvinar mattis faucibus quisque donec convallis commodo. ",
    links: [
      {
        key: "Facebook",
        href: "https://www.google.com",
        icon: FiFacebook,
      },
    ],
  },
  {
    value: "MESA",
    name: "MESA",
    logo: esnLogo,
    content:
      "Lorem ipsum dolor sit amet consectetur. Velit integer diam in id proin blandit fames id. Volutpat at vel risus non amet tortor. Potenti sit gravida donec lacinia et posuere faucibus. Elementum libero diam nullam ultricies mauris mauris erat porttitor. At morbi commodo nunc vulputate id odio pellentesque ipsum. Adipiscing at dictumst pulvinar mattis faucibus quisque donec convallis commodo. ",
    links: [
      {
        key: "Facebook",
        href: "https://www.google.com",
        icon: FiFacebook,
      },
    ],
  },
  {
    value: "Polifonia",
    name: "Polifonia",
    logo: esnLogo,
    content:
      "Lorem ipsum dolor sit amet consectetur. Velit integer diam in id proin blandit fames id. Volutpat at vel risus non amet tortor. Potenti sit gravida donec lacinia et posuere faucibus. Elementum libero diam nullam ultricies mauris mauris erat porttitor. At morbi commodo nunc vulputate id odio pellentesque ipsum. Adipiscing at dictumst pulvinar mattis faucibus quisque donec convallis commodo. ",
    links: [
      {
        key: "Facebook",
        href: "https://www.google.com",
        icon: FiFacebook,
      },
    ],
  },
  {
    value: "POLI.RADIO",
    name: "POLI.RADIO",
    logo: esnLogo,
    content:
      "Lorem ipsum dolor sit amet consectetur. Velit integer diam in id proin blandit fames id. Volutpat at vel risus non amet tortor. Potenti sit gravida donec lacinia et posuere faucibus. Elementum libero diam nullam ultricies mauris mauris erat porttitor. At morbi commodo nunc vulputate id odio pellentesque ipsum. Adipiscing at dictumst pulvinar mattis faucibus quisque donec convallis commodo. ",
    links: [
      {
        key: "Facebook",
        href: "https://www.google.com",
        icon: FiFacebook,
      },
    ],
  },
  {
    value: "Studenti Indipendenti",
    name: "Studenti Indipendenti",
    logo: esnLogo,
    content:
      "Lorem ipsum dolor sit amet consectetur. Velit integer diam in id proin blandit fames id. Volutpat at vel risus non amet tortor. Potenti sit gravida donec lacinia et posuere faucibus. Elementum libero diam nullam ultricies mauris mauris erat porttitor. At morbi commodo nunc vulputate id odio pellentesque ipsum. Adipiscing at dictumst pulvinar mattis faucibus quisque donec convallis commodo. ",
    links: [
      {
        key: "Facebook",
        href: "https://www.google.com",
        icon: FiFacebook,
      },
    ],
  },
]

export default function AssociationsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-400 flex-col items-center justify-center gap-20 px-4 py-49 md:gap-39">
      <Hero title="Associazioni" description="Scopri le associazioni studentesche del Politecnico" />

      <div className="w-full max-w-300">
        <AccordionAssociation accordionItems={accordionItems} defaultValue="ESN - Erasmus Student Network" />
      </div>
    </main>
  )
}
