"use client"

import Link from "next/link"
import { Fragment, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { headerMenuItems } from "./constants"
import { IconButtonsMobile } from "./IconButtons"
import { Logo } from "./Logo"

export const MobileLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <Glass className="fixed inset-x-6 top-14 z-20 box-border rounded-[36px] px-6 py-5">
      <div className="flex w-full items-center justify-between">
        <Logo />
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="ml-auto rounded-md focus-visible:ring-2 focus-visible:ring-text-primary"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <FiX size={24} className="text-black" /> : <FiMenu size={24} className="text-black" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="flex flex-row gap-4">
          <div className="mr-auto flex flex-col">
            {headerMenuItems.map((item) => (
              <Fragment key={item.title}>
                <span className="typo-title-large mt-6 bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text font-poppins text-transparent">
                  {item.title}
                </span>
                {"menu" in item && item.menu && (
                  <ul className="ml-3 flex flex-col gap-2">
                    {item.menu.map((subItem) => (
                      <li key={subItem.title} className="mt-3 flex items-center gap-1">
                        <Link
                          href={subItem.href}
                          className="typo-body-medium text-text-primary decoration-1 decoration-blue-secondary hover:underline focus:underline"
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </Fragment>
            ))}
          </div>
          <div className="mt-7.25 flex flex-col gap-5 pt-2">
            <IconButtonsMobile />
          </div>
        </nav>
      )}
    </Glass>
  )
}
