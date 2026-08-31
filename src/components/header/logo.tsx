import Image from "next/image"
import Link from "next/link"

export const Logo = ({ interactive = true }: { interactive?: boolean }) => {
  const content = (
    <>
      <Image src="/polinetwork_meta.png" alt="PoliNetwork Logo" width={24} height={24} />
      <h1 className="font-normal font-poppins text-[#1156AE] text-[20px] leading-[100%]">PoliNetwork</h1>
    </>
  )

  if (!interactive) {
    return <div className="flex h-7.5 items-center space-x-2.25">{content}</div>
  }

  return (
    <Link href="/" className="flex h-7.5 items-center space-x-2.25">
      {content}
    </Link>
  )
}
