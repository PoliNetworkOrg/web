'use client'

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
        <AccordionAssociation accordionItems={accordionItems} defaultValue="ESN - Erasmus Student Network" />
      </div>
    </main>
  )
}
