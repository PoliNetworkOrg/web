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

/**
 * Subscribes to a CSS media query and exposes whether it currently matches.
 *
 * @param query - A valid CSS media query string (e.g. `"(max-width: 768px)"`)
 * @returns `true` if the media query currently matches, `false` otherwise
 *
 * Observes changes and updates the returned value when the query match state changes; listener is cleaned up on unmount or when `query` changes.
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

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

/**
 * Handle clicks on the user/profile icon.
 *
 * Logs "User icon clicked" to the console.
 */
function handleUserIconClick() {
  console.log("User icon clicked")
}

/**
 * Handle clicks on the globe (language) icon.
 *
 * Logs "Globe icon clicked" to the console.
 */
function handleGlobeIconClick() {
  console.log("Globe icon clicked")
}

/**
 * Log that the moon (theme) icon was clicked.
 *
 * Logs the string "Moon icon clicked" to the console.
 */
function handleMoonIconClick() {
  console.log("Moon icon clicked")
}

// --- PoliNetwork Logo ---
const Logo = () => (
  <Link href="/" className="flex h-[30px] items-center space-x-[9px]">
    <Image src="/polinetwork_meta.png" alt="PoliNetwork Logo" width={24} height={24} />
    <h1 className="font-normal font-poppins text-[#1156AE] text-[20px] leading-[100%]">PoliNetwork</h1>
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
    <Glass className="fixed top-[40px] z-20 m-auto mt-0 mb-0 box-border w-full max-w-[354px] rounded-[36px] px-[24px]! py-[20px]!">
      <div className="justify-between! flex w-full items-center">
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
                <span className="typo-title-large mt-[24px] bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text font-poppins text-transparent">
                  {component.title}
                </span>
                {component.menu && (
                  <ul className="ml-[12px] flex flex-col gap-2">
                    {component.menu.map((item) => (
                      <li key={item.title} className="mt-[12px] flex items-center gap-1">
                        <Link
                          href={item.href}
                          className="typo-body-medium text-text-primary decoration-1 decoration-blue-secondary hover:underline focus:underline"
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
          <div className="mt-[29px] flex flex-col gap-[20px] pt-2">
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
    <Glass className="fixed top-[40px] z-20 m-auto mt-0 mb-0 box-border w-full max-w-[1045px] rounded-full px-[70px]! py-[20px]!">
      <NavigationMenu
        viewport={false}
        className="top-0 isolate flex max-h-[var(--header-height)] max-w-full shrink-0 items-stretch bg-card [&>div]:w-full"
      >
        <NavigationMenuList className="justify-between! flex w-full">
          <NavigationMenuLink asChild className={`${removeDefaultHoverEffectClass} p-0 py-[3px]`}>
            <Logo />
          </NavigationMenuLink>

          {components.map((component) => (
            <NavigationMenuItem key={component.title}>
              {component.menu ? (
                <>
                  <NavigationMenuTrigger
                    className={`typo-body-medium font-red-hat text-text-primary ${removeDefaultHoverEffectClass} ${customHoverEffectClass} group h-fit p-0 [&_.lucide-chevron-down]:hidden`}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="typo-body-medium font-red-hat text-text-primary">{component.title}</span>
                    </div>
                    <FiChevronDown
                      size={24}
                      className="color-text-primary relative top-[1px] ml-1 transition duration-300 group-data-[state=open]:rotate-180"
                    />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="mt-[36px]! border-none! bg-transparent! shadow-none! data-[state=closed]:bg-transparent! data-[state=open]:bg-transparent!">
                    <ul className="w-fit text-nowrap">
                      <Glass>
                        {component.menu.map((item) => {
                          const Icon = item.icon
                          return (
                            <NavigationMenuLink
                              asChild
                              key={item.title}
                              className={`flex shrink-0 flex-row flex-nowrap items-center justify-between ${removeDefaultHoverEffectClass} ${customHoverEffectClass}`}
                            >
                              <Link href={item.href || "#"}>
                                <div className="flex flex-col gap-1">
                                  <span className="typo-body-medium font-red-hat text-text-primary">{item.title}</span>
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

/**
 * Render the responsive header that switches between mobile and desktop layouts.
 *
 * While the app hydrates, the component renders the mobile layout by default to avoid a layout flash;
 * after mount it selects mobile or desktop based on the "(max-width: 768px)" media query.
 *
 * @returns A React element for the header: initially the mobile layout until hydration completes, then the mobile layout when the viewport is 768px wide or narrower, otherwise the desktop layout.
 */
export function Header() {
  const [mounted, setMounted] = React.useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)") // TODO: Adjust breakpoint

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Wait for hydration to prevent flash. Default to mobile layout under the assumption that most traffic is mobile.
  if (!mounted) {
    return <MobileLayout />
  }

  return isMobile ? <MobileLayout /> : <DesktopLayout />
}

export const HEADER_HEIGHT = "4.5rem"
