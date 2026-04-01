"use client"

import Image from "next/image"
import Link from "next/link"
import React from "react"
import { FiArrowUpRight, FiChevronDown, FiChevronRight, FiGlobe, FiMenu, FiMoon, FiUser, FiX } from "react-icons/fi"
import { Glass } from "@/components/glass"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

// --- Custom Hook for Media Query ---
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [matches, query])

  return matches
}

// --- Navigation Menu Data ---
const components: {
  title: string
  href?: string
  menu: { title: string; href: string; icon: React.ElementType }[] | null
}[] = [
  {
    title: "Resources",
    menu: [
      { title: "Materials", href: "#", icon: FiChevronRight },
      { title: "Guides", href: "#", icon: FiChevronRight },
      { title: "Computer Recs", href: "#", icon: FiChevronRight },
      { title: "FAQs", href: "#", icon: FiChevronRight },
      { title: "Rankings", href: "#", icon: FiArrowUpRight },
      { title: "Tol Project", href: "#", icon: FiArrowUpRight },
    ],
  },
  {
    title: "Community",
    menu: [
      { title: "Groups", href: "#", icon: FiChevronRight },
      { title: "Projects", href: "#", icon: FiChevronRight },
      { title: "Freshman", href: "#", icon: FiChevronRight },
      { title: "Associations", href: "#", icon: FiChevronRight },
    ],
  },
  {
    title: "About",
    menu: [
      { title: "About us", href: "#", icon: FiChevronRight },
      { title: "Join us", href: "#", icon: FiChevronRight },
      { title: "Contact us", href: "#", icon: FiChevronRight },
    ],
  },
]

// --- Icon Button Handlers ---
function handleUserIconClick() {
  console.log("User icon clicked")
}

function handleGlobeIconClick() {
  console.log("Globe icon clicked")
}

function handleMoonIconClick() {
  console.log("Moon icon clicked")
}

// --- PoliNetwork Logo ---
const Logo = () => (
  <Link href="/" className="flex items-center space-x-[9px] h-[30px]">
    <Image src="/polinetwork_meta.png" alt="PoliNetwork Logo" width={24} height={24} />
    <h1 className="font-poppins font-normal text-[20px] leading-[100%] text-[#1156AE]">PoliNetwork</h1>
  </Link>
)

const IconButtonsMobile = () => (
  <>
    <Link href="#" onClick={handleUserIconClick} aria-label="User profile">
      <FiUser size={24} className="text-black" />
    </Link>
    <Link href="#" onClick={handleGlobeIconClick} aria-label="Language">
      <FiGlobe size={24} className="text-black" />
    </Link>
    <Link href="#" onClick={handleMoonIconClick} aria-label="Theme">
      <FiMoon size={24} className="text-black" />
    </Link>
  </>
)

const IconButtonsDesktop = ({ removeHoverClass }: { removeHoverClass: string }) => (
  <>
    <NavigationMenuLink asChild className={`${removeHoverClass} p-0`}>
      <Link href="#" onClick={handleUserIconClick} aria-label="User profile">
        <FiUser size={24} className="color-text-primary" />
      </Link>
    </NavigationMenuLink>
    <NavigationMenuLink asChild className={`${removeHoverClass} p-0`}>
      <Link href="#" onClick={handleGlobeIconClick} aria-label="Language">
        <FiGlobe size={24} className="color-text-primary" />
      </Link>
    </NavigationMenuLink>
    <NavigationMenuLink asChild className={`${removeHoverClass} p-0`}>
      <Link href="#" onClick={handleMoonIconClick} aria-label="Theme">
        <FiMoon size={24} className="color-text-primary" />
      </Link>
    </NavigationMenuLink>
  </>
)

// --- Mobile Layout ---
const MobileLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <Glass className="fixed py-[20px]! px-[24px]! max-w-[354px] w-full rounded-[36px] m-auto mb-0 mt-0 top-[40px] z-20 box-border">
      <div className="flex justify-between! items-center w-full">
        <Logo />
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="ml-auto focus:outline-none"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <FiX size={24} className="text-black" /> : <FiMenu size={24} className="text-black" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="flex flex-row gap-4">
          <div className="mr-auto flex flex-col">
            {components.map((component) => (
              <React.Fragment key={component.title}>
                <span className="mt-[24px] typo-title-large font-poppins bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent">
                  {component.title}
                </span>
                {component.menu && (
                  <ul className="ml-[12px] flex flex-col gap-2">
                    {component.menu.map((item) => (
                      <li key={item.title} className="flex items-center gap-1 mt-[12px]">
                        <Link
                          href={item.href}
                          className="typo-body-medium text-text-primary hover:underline focus:underline decoration-1 decoration-blue-secondary"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-col pt-2 gap-[20px] mt-[29px]">
            <IconButtonsMobile />
          </div>
        </nav>
      )}
    </Glass>
  )
}

// --- Desktop Layout ---
const DesktopLayout = () => {
  const removeDefaultHoverEffectClass = "hover:bg-transparent! focus:bg-transparent! bg-transparent!"
  const customHoverEffectClass = "hover:underline focus:underline decoration-1 decoration-blue-secondary "

  return (
    <Glass className="fixed py-[20px]! px-[70px]! max-w-[1045px] w-full rounded-full m-auto mb-0 mt-0 top-[40px] z-20 box-border">
      <NavigationMenu
        viewport={false}
        className="flex top-0 isolate [&>div]:w-full max-w-full shrink-0 items-stretch bg-card max-h-[var(--header-height)]"
      >
        <NavigationMenuList className="flex justify-between! w-full">
          <NavigationMenuLink asChild className={`${removeDefaultHoverEffectClass} p-0 py-[3px]`}>
            <Logo />
          </NavigationMenuLink>

          {components.map((component) => (
            <NavigationMenuItem key={component.title}>
              {component.menu ? (
                <>
                  <NavigationMenuTrigger
                    className={`font-red-hat typo-body-medium text-text-primary ${removeDefaultHoverEffectClass} ${customHoverEffectClass} p-0 h-fit group [&_.lucide-chevron-down]:hidden`}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-red-hat typo-body-medium text-text-primary">{component.title}</span>
                    </div>
                    <FiChevronDown
                      size={24}
                      className="color-text-primary relative top-[1px] ml-1 transition duration-300 group-data-[state=open]:rotate-180"
                    />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="mt-[36px]! border-none! bg-transparent! shadow-none! data-[state=open]:bg-transparent! data-[state=closed]:bg-transparent!">
                    <ul className="w-fit text-nowrap">
                      <Glass>
                        {component.menu.map((item) => {
                          const Icon = item.icon
                          return (
                            <NavigationMenuLink
                              asChild
                              key={item.title}
                              className={`flex flex-row flex-nowrap justify-between items-center shrink-0 ${removeDefaultHoverEffectClass} ${customHoverEffectClass}`}
                            >
                              <Link href={item.href || "#"}>
                                <div className="flex flex-col gap-1">
                                  <span className="font-red-hat typo-body-medium text-text-primary">{item.title}</span>
                                </div>
                                <Icon size={24} className="color-text-primary" />
                              </Link>
                            </NavigationMenuLink>
                          )
                        })}
                      </Glass>
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild>
                  <Link href={component.href || "#"} className={navigationMenuTriggerStyle()}>
                    {component.title}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}

          <NavigationMenuItem className="flex items-center gap-[20px]">
            <IconButtonsDesktop removeHoverClass={removeDefaultHoverEffectClass} />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Glass>
  )
}

// --- Main Header Component ---
export function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)") // TODO: Adjust breakpoint

  return isMobile ? <MobileLayout /> : <DesktopLayout />
}

export const HEADER_HEIGHT = "4.5rem"
