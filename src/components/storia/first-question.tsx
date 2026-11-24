import { MotionConfig, motion } from "motion/react"
import telegram from "@/assets/icons/telegram-gradient.svg?img"
import { Glass } from "@/components/glass"
import { Image } from "@/components/image"
import { cn } from "@/lib/utils"

/** The question PoliNetwork started from, told as a chat: an illustration, not a real conversation */
const messages = [
  { text: "Ciao! Qualcuno sa dove trovo gli altri del mio corso?", from: "them" },
  { text: "Un posto così non c'è ancora…", from: "them" },
  { text: "Allora creiamolo noi!", from: "us" },
] as const

const EASE_OUT = [0.22, 1, 0.36, 1] as const

/**
 * Beside "Una domanda semplice, una grande idea": the messages arrive one after the other when the card comes into
 * view, then the first group is born.
 */
export function FirstQuestion() {
  return (
    <MotionConfig reducedMotion="user">
      <Glass
        aria-hidden
        className="flex w-full max-w-110 flex-col gap-3 rounded-rectangles border-white/50 bg-background-blur p-5 sm:p-6"
      >
        <motion.ol
          className="flex flex-col gap-3"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ staggerChildren: 0.5, delayChildren: 0.1 }}
        >
          {messages.map((message) => (
            <motion.li
              key={message.text}
              variants={{ hidden: { opacity: 0, y: 10, scale: 0.9 }, shown: { opacity: 1, y: 0, scale: 1 } }}
              transition={{ type: "spring", bounce: 0.35, duration: 0.5 }}
              className={cn(
                "typo-body-medium sm:typo-body-large w-fit max-w-[85%] text-pretty rounded-2xl px-4 py-2.5",
                message.from === "them"
                  ? "origin-bottom-left rounded-bl-sm border border-white/60 bg-white/70 text-text-primary"
                  : "origin-bottom-right self-end rounded-br-sm bg-blue-secondary text-text-accent-darkbg"
              )}
            >
              {message.text}
            </motion.li>
          ))}
          <motion.li
            variants={{ hidden: { opacity: 0, y: 8 }, shown: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="typo-label-large mt-2 flex items-center gap-2 self-center rounded-full border border-white/60 bg-white/60 py-1.5 pr-4 pl-2 text-blue-secondary"
          >
            <Image src={telegram} alt="" width={20} height={20} className="size-5" />
            2016 · Nasce il primo gruppo
          </motion.li>
        </motion.ol>
      </Glass>
    </MotionConfig>
  )
}
