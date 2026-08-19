"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const EASTER_EGG_CLICKS = 3
const EASTER_EGG_WINDOW_MS = 800

export const Logo = () => {
  const router = useRouter()
  const clickCountRef = useRef(0)
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    clickCountRef.current += 1

    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current)
    resetTimeoutRef.current = setTimeout(() => {
      clickCountRef.current = 0
    }, EASTER_EGG_WINDOW_MS)

    if (clickCountRef.current >= EASTER_EGG_CLICKS) {
      e.preventDefault()
      clickCountRef.current = 0
      clearTimeout(resetTimeoutRef.current)
      router.push("/game")
    }
  }

  return (
    <Link href="/" className="flex h-7.5 items-center space-x-2.25" onClick={handleClick}>
      <Image src="/polinetwork_meta.png" alt="PoliNetwork Logo" width={24} height={24} />
      <h1 className="font-normal font-poppins text-[#1156AE] text-[20px] leading-[100%]">PoliNetwork</h1>
    </Link>
  )
}
