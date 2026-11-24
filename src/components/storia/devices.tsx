import Image from "next/image"
import siteDesktop from "@/assets/images/storia/site-desktop.webp"
import siteMobile from "@/assets/images/storia/site-mobile.webp"
import { cn } from "@/lib/utils"

/** The pieces of a Devices.css device around its screen (see `styles/devices.css`) */
const PARTS = ["device-stripe", "device-header", "device-sensors", "device-btns", "device-power"] as const

/**
 * The site on a MacBook Pro and an iPhone 14 Pro, drawn by Devices.css around real screenshots of the home page.
 * The scene is 860 × 480 device pixels: its font size is 1/100 of a device pixel, set from its width, so the pair
 * scales as one. The phone stands in front of the laptop's right corner.
 */
export function Devices({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Il sito di PoliNetwork su un MacBook e un iPhone"
      className={cn("@container mx-auto w-full max-w-2xl", className)}
    >
      <div className="relative h-[4.8em] w-[8.6em] text-[calc(100cqw*100/860)]">
        <div className="device device-macbook-pro absolute top-[0.3em] left-0">
          <div className="device-frame">
            <Image src={siteDesktop} alt="" sizes="(min-width: 1280px) 520px, 75vw" className="device-screen" />
          </div>
          {PARTS.map((part) => (
            <div key={part} className={part} />
          ))}
        </div>

        {/* 36% of its real size, next to the laptop */}
        <div className="absolute right-0 bottom-0 text-[0.36em] drop-shadow-xl">
          <div className="device device-iphone-14-pro device-black">
            <div className="device-frame">
              <Image src={siteMobile} alt="" sizes="(min-width: 1280px) 120px, 20vw" className="device-screen" />
            </div>
            {PARTS.map((part) => (
              <div key={part} className={part} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
