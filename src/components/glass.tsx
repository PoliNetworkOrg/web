import { cn } from "@/lib/utils"

type GlassProps = React.HTMLAttributes<HTMLDivElement>

/**
 * Render a div with a glass-like visual treatment that wraps provided children.
 *
 * Merges the caller-provided `className` with the component's default styling:
 * rounded corners, border, translucent white background, padding, and backdrop blur.
 *
 * @param children - Content rendered inside the glass-styled container
 * @returns A `div` element with merged classes and the provided `children`
 */
export function Glass({ children, ...props }: GlassProps) {
  return (
    <div
      {...props}
      className={cn("rounded-lg border border-gray-200 bg-white/40 p-4 backdrop-blur-md", props.className)}
    >
      {children}
    </div>
  )
}
