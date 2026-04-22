import Image from "next/image"
import { FaRegMap } from "react-icons/fa"
import { FiDollarSign, FiFacebook, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi"
import discord from "@/assets/icons/discord.svg"
import telegram from "@/assets/icons/telegram.svg"
import { CardMultipleIcons } from "@/components/card-multiple-icons"
import { AboutUs } from "@/components/home/about-us"
import { Hero } from "@/components/home/hero"
import { Materials } from "@/components/home/materials"
import { CallToAction } from "@/components/ui/call-to-action"

export default function Home() {
  return (
    <main className="w-full">
      <CallToAction title="Mappa Microonde" caption="Dove scaldare il pranzo nei vari campus." icon={FaRegMap} />
      <CallToAction title="DSU" icon={FiDollarSign} />
      <Hero />
      <Materials />
      <AboutUs />
      <div className="mx-auto w-fit py-12">
        <CardMultipleIcons
          icons={[
            <Image key="telegram" src={telegram} alt="Telegram" />,
            <FiInstagram key="instagram" />,
            <FiLinkedin key="linkedin" />,
            <FiFacebook key="facebook" />,
            <Image key="discord" src={discord} alt="Discord" />,
            <FiGithub key="github" />,
          ]}
        />
      </div>
    </main>
  )
}
