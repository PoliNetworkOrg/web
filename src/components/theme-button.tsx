"use client"
import { useTheme } from "next-themes"
import { FiMoon, FiSun } from "react-icons/fi"

export function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    // TODO: enable when dark mode design is ready
    <button type="button" disabled={true} onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
      <FiSun className="block h-6 w-6 dark:hidden" />
      <FiMoon className="hidden h-6 w-6 dark:block" />
    </button>
  )
}
