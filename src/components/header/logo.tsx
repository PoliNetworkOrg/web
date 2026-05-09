import Image from "next/image"
import Link from "next/link"

export const Logo = () => (
  <Link href="/" className="flex h-7.5 items-center space-x-2.25">
    <Image src="/polinetwork_meta.png" alt="PoliNetwork Logo" width={24} height={24} />
    <h1 className="font-normal font-poppins text-[#1156AE] text-[20px] leading-[100%]">PoliNetwork</h1>
  </Link>
)
