import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LayoutButton {
  text: string;
  icon?: ReactNode;
  variant?: "primary" | "tertiary" | "tertiaryBlur" | "glass" | "outline" | "link";
  size?: "sm" | "lg" | "default" | "lg-wide" | "icon" | "icon-sm" | "icon-lg";
}

interface TextOnlyLayoutClassNames {
  section?: string;
  textDiv?: string;
  title?: string;
  descriptionDiv?: string;
  button?: string;
  contentDiv?: string;
}

interface TextOnlyLayoutProps {
  title: string;
  description: ReactNode;
  children?: ReactNode;
  horizontalOrientation?: "start" | "center" | "end";
  button?: LayoutButton;
  classNames?: TextOnlyLayoutClassNames;
}

export default function TextOnlyLayout({
  title,
  description,
  children = <></>,
  horizontalOrientation = "start",
  button,
  classNames = {},
}: TextOnlyLayoutProps) {
  const textAlignClass =
    horizontalOrientation === "center"
      ? "text-center min-[1616px]:text-center"
      : horizontalOrientation === "end"
        ? "text-end min-[1616px]:text-end"
        : "text-center min-[1616px]:text-start";

  const itemsAlignClass =
    horizontalOrientation === "center"
      ? "items-center min-[1616px]:items-center"
      : horizontalOrientation === "end"
        ? "items-end min-[1616px]:items-end"
        : "items-center min-[1616px]:items-start";

  return (
    <section
      className={cn(
        "flex w-full flex-col gap-8 px-6 min-[1616px]:flex-row min-[1616px]:items-start min-[1616px]:px-36",
        classNames.section
      )}
    >
      <div
        className={cn(
          "flex w-full max-w-[959] flex-col gap-6",
          itemsAlignClass,
          classNames.textDiv
        )}
      >
        <h2
          className={cn(
            "typo-display-large sm:typo-display-medium",
            textAlignClass,
            classNames.title
          )}
        >
          {title}
        </h2>

        <div className={cn("flex flex-col gap-3", textAlignClass, classNames.descriptionDiv)}>
          {description}
        </div>
        {button && (
          <Button type="button" variant={button.variant ?? "primary"} size={button.size ?? "lg"} className={cn("flex items-center gap-2", classNames.button)}>
            {button.text}
            {button.icon}
          </Button>
        )}
      </div>

      <div className={cn("flex w-full min-[1616px]:flex-1", classNames.contentDiv)}>
        {children}
      </div>
    </section>
  );
}
