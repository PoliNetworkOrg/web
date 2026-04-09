import Image from "next/image"
import { FiFacebook, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi"
import discord from "@/assets/icons/discord.svg"
import telegram from "@/assets/icons/telegram.svg"
import { CardMultipleIcons } from "@/components/card-multiple-icons"
import { Hero } from "@/components/home/hero"
import { Materials } from "@/components/home/materials"

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Materials />
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
