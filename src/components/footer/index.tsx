import Image from "next/image"
import Link from "next/link"
import { FiFacebook, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi"
import discord from "@/assets/icons/discord.svg"
import telegram from "@/assets/icons/telegram.svg"
import { CardMultipleIcons } from "../card-multiple-icons"

export function Footer() {
  return (
    <footer className="w-full px-gutter">
      <h2 className="typo-headline-medium md:typo-display-large bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-center text-transparent">
        Keep in touch!
      </h2>

      <div className="mx-auto mt-6 flex w-fit flex-col items-center gap-4">
        <CardMultipleIcons
          className="h-auto [&>div]:gap-6 [&>div]:px-6 [&>div]:py-3"
          icons={[
            <a
              key="telegram"
              href="https://t.me/polinetwork"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <Image src={telegram} alt="" />
            </a>,
            <a
              key="instagram"
              href="https://instagram.com/polinetwork_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FiInstagram />
            </a>,
            <a
              key="linkedin"
              href="https://www.linkedin.com/company/polinetwork"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>,
            <a
              key="facebook"
              href="https://www.facebook.com/PolitecnicoDiMilanoNetwork"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FiFacebook />
            </a>,
            <a
              key="discord"
              href="https://discord.gg/Fp7ZHcC"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
            >
              <Image src={discord} alt="" />
            </a>,
            <a
              key="github"
              href="https://github.com/PoliNetworkOrg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>,
          ]}
        />
      </div>

      <div className="mx-auto mt-block grid max-w-5xl grid-flow-row-dense grid-cols-[max-content_max-content] items-baseline justify-around gap-y-7 **:h-min **:w-fit md:gap-y-11">
        <div className="typo-title-medium md:typo-headline-small contents text-text-primary underline *:col-start-1">
          <Link href="/join">Unisciti a noi!</Link>
          <Link href="/contact">Contattaci</Link>
          <a href="https://github.com/PoliNetworkOrg/web/issues/new" target="_blank" rel="noopener noreferrer">
            Qualche problema? <br /> Segnalalo!
          </a>
        </div>
        <div className="typo-body-small md:typo-body-large contents text-text-secondary *:col-start-2">
          <Link href="#">Terms & conditions</Link>
          <Link href="#">Privacy policy</Link>
          <Link href="#">Cookie policy</Link>
        </div>
      </div>

      <div className="typo-body-small md:typo-body-large mt-section mb-10 w-full text-center text-text-secondary">
        <p id="copyright">PoliNetwork 2016-{new Date().getFullYear()} - All rights reserved</p>
      </div>
    </footer>
  )
}
