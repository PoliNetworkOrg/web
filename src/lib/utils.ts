import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      radius: ["images", "rectangles", "buttonsM", "buttonsL"], // custom rounded classes from figma
    },
    classGroups: {
      // custom typography classes from figma
      "font-size": [
        {
          typo: [
            "display-extralarge",
            "display-large",
            "display-medium",
            "display-small",
            "headline-large",
            "headline-medium",
            "headline-small",
            "body-large",
            "body-medium",
            "body-small",
            "label-extralarge",
            "label-large",
            "label-medium",
            "label-small",
            "title-large",
            "title-medium",
            "title-small",
          ],
        },
      ],
      // custom background colors from figma
      "bg-color": [
        {
          bg: [
            "background",
            "background-blur",
            "button-primary",
            "button-tertiary",
            "red",
            "green",
            "grey",
            "blue-primary",
            "blue-primary-blur",
            "blue-secondary",
            "blue-tertiary",
            "blue-tertiary-blur",
          ],
        },
      ],
      // custom text colors from figma
      "text-color": [
        {
          text: [
            "text-primary",
            "text-secondary",
            "text-accent-darkbg",
            "text-accent-lightbg",
            "card-foreground",
          ],
        },
      ],
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
