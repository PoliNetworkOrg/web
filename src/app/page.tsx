import Image from "next/image"
import { FiFacebook, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi"
import discord from "@/assets/icons/discord.svg"
import telegram from "@/assets/icons/telegram.svg"
import { DropdownButton } from "@/components/button-dropdown"
import { CardMultipleIcons } from "@/components/card-multiple-icons"
import { AboutUs } from "@/components/home/about-us"
import { CarouselMock } from "@/components/home/carousel-mock"
import { Hero } from "@/components/home/hero"
import { Materials } from "@/components/home/materials"

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Materials />
      {/* TODO: delete this when merging */}
      <CarouselMock />
      <AboutUs />
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
      </div>
    </main>
  )
}
