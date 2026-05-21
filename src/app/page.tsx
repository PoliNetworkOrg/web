import Image from "next/image"
import { FiFacebook, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi"
import discord from "@/assets/icons/discord.svg"
import telegram from "@/assets/icons/telegram.svg"
import { DropdownButton } from "@/components/button-dropdown"
import { CardMultipleIcons } from "@/components/card-multiple-icons"
import { CardSplit } from "@/components/card-split"
import { AboutUs } from "@/components/home/about-us"
import { Hero } from "@/components/home/hero"
import { Materials } from "@/components/home/materials"
import { Projects } from "@/components/home/projects"
import { CallToAction } from "@/components/ui/call-to-action"

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Materials />
      <Projects />
      <AboutUs />
      <CallToAction title="Scopri di più su di noi" href="/about" icon={FiGithub} />
      <div className="mx-auto flex w-fit flex-col items-center gap-4 py-12">
        <DropdownButton
          placeholder="Select language"
          options={[
            { label: "Italian", value: "it" },
            { label: "English", value: "en" },
          ]}
        />
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
        <CardSplit textPrimary="5x1000" textSecondary="Sostienici!" textSecondarySmall="CF: 97927490157" />
      </div>
    </main>
  )
}
