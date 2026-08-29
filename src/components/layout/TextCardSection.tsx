import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LayoutButton {
  text: string;
  icon?: ReactNode;
  variant?: "primary" | "tertiary" | "tertiaryBlur" | "glass" | "outline" | "link";
  size?: "sm" | "lg" | "default" | "lg-wide" | "icon" | "icon-sm" | "icon-lg";
}

interface TextCardSectionClassNames {
  section?: string;
  textDiv?: string;
  title?: string;
  descriptionDiv?: string;
  button?: string;
  cardsContainer?: string;
}

interface TextCardSectionProps {
  title: string;
  description: ReactNode;
  children: ReactNode;
  horizontalOrientation?: "start" | "center" | "end";
  verticalOrientation?: "tb" | "bt";
  button?: LayoutButton;
  classNames?: TextCardSectionClassNames;
}

export default function TextCardSection({
  title,
  description,
  children,
  horizontalOrientation = "start",
  verticalOrientation = "tb",
  button,
  classNames = {},
}: TextCardSectionProps) {
  const textAlignClass =
    horizontalOrientation === "center"
      ? "text-center"
      : horizontalOrientation === "end"
        ? "text-end"
        : "text-center min-[1616px]:text-start";

  const containerAlignClass =
    horizontalOrientation === "center"
      ? "justify-center"
      : horizontalOrientation === "end"
        ? "justify-end"
        : "justify-center min-[1616px]:justify-start";

  const flexDirection =
    verticalOrientation === "bt"
      ? "flex-col-reverse"
      : "flex-col";

  const flexDirectionDesktop =
    horizontalOrientation === "start"
      ? verticalOrientation === "bt"
        ? "min-[1616px]:flex-row-reverse"
        : "min-[1616px]:flex-row"
      : horizontalOrientation === "end"
        ? verticalOrientation === "bt"
          ? "min-[1616px]:flex-row"
          : "min-[1616px]:flex-row-reverse"
        : "min-[1616px]:flex-row";

  return (
    <section
      className={cn(
        "flex w-full flex-col gap-6 px-6 md:px-36",
        flexDirection,
        flexDirectionDesktop,
        classNames.section
      )}
    >
      <div className={cn("flex flex-col gap-6", classNames.textDiv)}>
        <h2
          className={cn(
            "typo-headline-medium md:typo-display-medium bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent",
            textAlignClass,
            classNames.title
          )}
        >
          {title}
        </h2>

        <div
          className={cn(
            "typo-body-large md:typo-headline-small text-text-primary",
            textAlignClass,
            classNames.descriptionDiv
          )}
        >
          {description}
        </div>
        {button && (
          <Button type="button" variant={button.variant ?? "primary"} size={button.size ?? "lg"} className={cn("flex items-center gap-2 w-fit", classNames.button)}>
            {button.text}
            {button.icon}
          </Button>
        )}
      </div>

      <div
        className={cn(
          "flex flex-wrap gap-12 w-full xl:gap-16",
          containerAlignClass,
          classNames.cardsContainer
        )}
      >
        {children}
      </div>
    </section>
  );
}
