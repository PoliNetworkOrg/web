import Image from "next/image"
import Link from "next/link"
import { FiFacebook, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi"
import discord from "@/assets/icons/discord.svg"
import telegram from "@/assets/icons/telegram.svg"
import { CardMultipleIcons } from "../card-multiple-icons"

export function Footer() {
  return (
    <footer className="my-8 w-full px-8">
      <h2 className="typo-headline-medium md:typo-display-large bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-center text-transparent">
        Keep in touch!
      </h2>

      <div className="mx-auto mt-6 flex w-fit flex-col items-center gap-4">
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

      <div className="mx-auto mt-11 grid max-w-5xl grid-flow-row-dense grid-cols-[max-content_max-content] justify-around gap-y-7 **:h-fit md:mt-25 md:gap-y-11">
        <div className="typo-title-medium md:typo-headline-small contents text-text-primary underline *:col-start-1">
          <Link href="#">Unisciti a noi!</Link>
          <Link href="#">Contattaci</Link>
          <Link href="#">
            Qualche problema? <br /> Segnalalo!
          </Link>
        </div>
        <div className="typo-body-small md:typo-body-large contents text-text-secondary *:col-start-2">
          <Link href="#">Terms & conditions</Link>
          <Link href="#">Privacy policy</Link>
          <Link href="#">Cookie policy</Link>
        </div>
      </div>

      <div className="typo-body-small md:typo-body-large mt-12 w-full text-center text-text-secondary md:mt-36">
        <p id="copyright">PoliNetwork 2016-{new Date().getFullYear()} - All rights reserved</p>
      </div>
    </footer>
  )
}
