import { cn } from "@/lib/utils"

type GlassProps = React.HTMLAttributes<HTMLDivElement>

export function Glass({ children, ...props }: GlassProps) {
  return (
    <div {...props} className={cn("backdrop-blur-md rounded-lg border border-gray-200 p-4", props.className)}>
      {children}
    </div>
  )
}
