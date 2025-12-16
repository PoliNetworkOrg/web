"use client"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    // TODO: enable when dark mode design is ready
    <button type="button" disabled={true} onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
      <SunIcon className="block h-6 w-6 dark:hidden" />
      <MoonIcon className="hidden h-6 w-6 dark:block" />
    </button>
  )
}
