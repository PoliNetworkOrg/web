import Image from "next/image"
import Link from "next/link"

export const Logo = ({ href = "/" }: { href?: string }) => {
  const content = (
    <>
      <Image src="/polinetwork_meta.png" alt="" width={24} height={24} />
      {/* Not a heading: every page has its own h1, the logo repeats on all of them */}
      <span className="font-normal font-poppins text-[#1156AE] text-[20px] leading-[100%]">PoliNetwork</span>
    </>
  )

  return (
    <Link
      href={href}
      className="flex h-7.5 items-center space-x-2.25 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-blue-secondary focus-visible:ring-offset-4"
    >
      {content}
    </Link>
  )
}
