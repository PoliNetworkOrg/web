import { useTheme } from "next-themes"
import { FiMoon, FiSun } from "react-icons/fi"
import { cn } from "@/lib/utils"

/**
 * Switches between the light and the dark theme; until it's used, the site follows the system's. The icon is picked
 * by CSS, as the theme is only known in the browser: the server renders both.
 */
export function ThemeButton({ size = 24, className }: { size?: number; className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Cambia tema"
      title="Cambia tema"
      className={cn(
        "rounded-full text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-blue-secondary",
        className
      )}
    >
      <FiMoon size={size} className="dark:hidden" aria-hidden />
      <FiSun size={size} className="hidden dark:block" aria-hidden />
    </button>
  )
}
