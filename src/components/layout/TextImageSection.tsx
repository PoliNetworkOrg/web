import Image from "next/image";
import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LayoutButton {
  text: string;
  icon?: ReactNode;
  variant?:
    | "primary"
    | "tertiary"
    | "tertiaryBlur"
    | "glass"
    | "outline"
    | "link";
  size?: "sm" | "lg" | "default" | "lg-wide" | "icon" | "icon-sm" | "icon-lg";
}

interface TextImageLayoutClassNames {
  section?: string;
  textDiv?: string;
  title?: string;
  descriptionDiv?: string;
  button?: string;
  imageDiv?: string;
  image?: string;
}

interface TextImageLayoutProps {
  title: string;
  description: ReactNode;
  imageSrc: StaticImageData;
  imageW: number;
  imageH: number;
  horizontalOrientation?: "lr" | "rl";
  verticalOrientation?: "tb" | "bt";
  button?: LayoutButton;
  classNames?: TextImageLayoutClassNames;
}

export default function TextImageLayout({
  title,
  description,
  imageSrc,
  imageW,
  imageH,
  horizontalOrientation = "lr",
  verticalOrientation = "tb",
  button,
  classNames = {},
}: TextImageLayoutProps) {
  const textDiv = (
    <div
      className={cn(
        "flex w-full min-w-0 flex-1 flex-col items-center gap-6 min-[1616px]:items-start min-[1616px]:text-start",
        classNames.textDiv,
      )}
    >
      <h2
        className={cn(
          "typo-display-large sm:typo-display-medium text-center min-[1616px]:text-start",
          classNames.title,
        )}
      >
        {title}
      </h2>

      <div
        className={cn(
          "flex flex-col gap-3 text-center min-[1616px]:text-start",
          classNames.descriptionDiv,
        )}
      >
        {description}
      </div>
      {button && (
        <div className="w-full flex justify-center min-[1616px]:justify-start">
          <Button
            variant={button.variant ?? "primary"}
            size={button.size ?? "lg"}
            className={cn("flex items-center gap-2", classNames.button)}
          >
            {button.text}
            {button.icon}
          </Button>
        </div>
      )}
    </div>
  );

  const imageDiv = (
    <div
      className={cn(
        `flex w-full min-w-0 flex-1 items-center justify-center min-[1616px]:min-w-[${imageW}px]`,
        classNames.imageDiv,
      )}
    >
      <Image
        src={imageSrc}
        alt=""
        width={imageW}
        height={imageH}
        className={cn(
          `h-[${imageH}px] w-full max-w-[${imageW}px] rounded-rectangles object-cover`,
          classNames.image,
        )}
      />
    </div>
  );

  return (
    <section
      className={cn(
        "flex w-full items-center gap-27 px-6 text-center min-[1616px]:items-center md:px-36",
        "flex-col",
        verticalOrientation === "bt" && "flex-col-reverse",
        "min-[1616px]:flex-row",
        horizontalOrientation === "rl" && "min-[1616px]:flex-row-reverse",
        classNames.section,
      )}
    >
      {textDiv}
      {imageDiv}
    </section>
  );
}
