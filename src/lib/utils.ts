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
            "display-fluid-extralarge",
            "display-fluid-large",
            "display-fluid-medium",
            "display-extralarge",
            "display-large",
            "display-medium",
            "display-small",
            "headline-large",
            "headline-medium",
            "headline-small",
            "headline-extrasmall",
            "body-large",
            "body-medium",
            "body-small",
            "label-extralarge",
            "label-large",
            "label-medium",
            "label-small",
            "label-tiny",
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
            "surface",
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
            "text-muted",
            "text-accent-darkbg",
            "text-accent-lightbg",
            "logo",
            "card-foreground",
          ],
        },
      ],
      "border-color": [{ border: ["edge", "grey"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
