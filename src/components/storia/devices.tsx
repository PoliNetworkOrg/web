import Image from "next/image"
import siteDesktop from "@/assets/images/storia/site-desktop.webp"
import siteMobile from "@/assets/images/storia/site-mobile.webp"
import { cn } from "@/lib/utils"

/**
 * The site on a current MacBook and iPhone, drawn in CSS around real screenshots of the home page: thin bezels, the
 * notch and the Dynamic Island, instead of the old device photo. Sizes are percentages, so the pair scales as one.
 */
export function Devices({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Il sito di PoliNetwork su un MacBook e un iPhone"
      className={cn("relative mx-auto w-full max-w-2xl pr-[6%] pb-[4%]", className)}
    >
      {/* MacBook: the display with its notch, then the thin aluminium base, a little wider than the lid */}
      <div className="relative rounded-[3.5%/5.5%] bg-slate-900 p-[1.6%] shadow-xl ring-1 ring-slate-700">
        <span
          aria-hidden
          className="-translate-x-1/2 absolute top-0 left-1/2 z-10 h-[3.2%] w-[11%] rounded-b-[30%/60%] bg-slate-900"
        />
        <Image
          src={siteDesktop}
          alt=""
          sizes="(min-width: 1280px) 600px, 90vw"
          className="aspect-[16/10] h-auto w-full rounded-[1.5%/2.4%] object-cover object-top"
        />
      </div>
      <div className="-mx-[7%] relative h-[0.9rem] rounded-b-[45%_100%] bg-linear-to-b from-slate-200 to-slate-400 shadow-md sm:h-[1.1rem]">
        <span
          aria-hidden
          className="-translate-x-1/2 absolute top-0 left-1/2 h-[40%] w-[16%] rounded-b-[40%_100%] bg-slate-400/70"
        />
      </div>

      {/* iPhone, in front of the laptop's corner */}
      <div className="absolute right-0 bottom-0 w-[24%] rounded-[17%/8%] bg-slate-900 p-[2.6%] shadow-2xl ring-1 ring-slate-600">
        <span
          aria-hidden
          className="-translate-x-1/2 absolute top-[3.2%] left-1/2 z-10 h-[3.4%] w-[30%] rounded-full bg-black"
        />
        <Image
          src={siteMobile}
          alt=""
          sizes="(min-width: 1280px) 160px, 24vw"
          className="aspect-[9/19.5] h-auto w-full rounded-[14%/6.5%] object-cover object-top"
        />
      </div>
    </div>
  )
}
