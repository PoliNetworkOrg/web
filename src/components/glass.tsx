import { cn } from "@/lib/utils"

type GlassProps = React.ComponentProps<"div">

export function Glass({ children, ...props }: GlassProps) {
  return (
    <div
      {...props}
      // A gray-200 rim would glare on a dark page: there it takes the faint light edge of the other panels
      className={cn(
        "rounded-lg border border-gray-200 bg-surface/40 p-4 backdrop-blur-md dark:border-edge/50",
        props.className
      )}
    >
      {children}
    </div>
  )
}
