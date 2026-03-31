"use client"

import Image from "next/image"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: {
  title: string
  href?: string
  menu: { title: string; href: string }[] | null
}[] = [
  {
    title: "Resources",
    menu: [
      {
        title: "Materials",
        href: "#",
      },
      {
        title: "Guides",
        href: "#",
      },
      {
        title: "Computer Recs",
        href: "#",
      },
      {
        title: "FAQs",
        href: "#",
      },
      {
        title: "Rankings",
        href: "#",
      },
      {
        title: "Tol Project",
        href: "#",
      },
    ],
  },
  {
    title: "Community",
    menu: [
      {
        title: "Groups",
        href: "#",
      },
      {
        title: "Projects",
        href: "#",
      },
      {
        title: "Freshman",
        href: "#",
      },
      {
        title: "Associations",
        href: "#",
      },
    ],
  },
  {
    title: "About",
    menu: [
      {
        title: "About us",
        href: "#",
      },
      {
        title: "Join us",
        href: "#",
      },
      {
        title: "Contact us",
        href: "#",
      },
    ],
  },
]

export const HEADER_HEIGHT = "4.5rem"

export function Header() {
  return (
    <NavigationMenu
      viewport={false}
      className="sticky top-0 isolate z-20 flex max-h-(--header-height) w-full shrink-0 items-center justify-center bg-card"
    >
      <NavigationMenuList>
        {/* Disable hover effect on the logo */}
        <NavigationMenuLink className="hover:bg-transparent! focus:bg-transparent! data-[active=true]:bg-transparent!">
          <Link href="/">
            <div className="flex items-center space-x-4">
              <Image src="/polinetwork_meta.png" alt="PoliNetwork Logo" width={24} height={24} />
              <h1 className="font-poppins font-normal text-[1.25rem] leading-[100%] text-[#1156AE]">PoliNetwork</h1>
            </div>
          </Link>
        </NavigationMenuLink>
        {components.map((component) => (
          <NavigationMenuItem key={component.title}>
            {component.menu ? (
              <>
                <NavigationMenuTrigger className="font-red-hat typo-body-medium text-text-primary">
                  {component.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-fit text-nowrap">
                    {component.menu.map((item) => (
                      <ListItem key={item.title} title={item.title} href={item.href} />
                    ))}
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
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({ title, href, ...props }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1">
            <div className="font-red-hat typo-body-medium text-text-primary">{title}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
