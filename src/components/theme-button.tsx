"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
    >
      {resolvedTheme === "light" ? (
        <SunIcon className="block h-6 w-6 dark:hidden" />
      ) : (
        <MoonIcon className="hidden h-6 w-6 dark:block" />
      )}
    </button>
  );
}
