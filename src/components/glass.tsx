import { cn } from "@/lib/utils"

type GlassProps = React.ComponentProps<"div">

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
