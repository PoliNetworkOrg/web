import { cn } from "@/lib/utils"

type GlassProps = React.HTMLAttributes<HTMLDivElement>

export function Glass({ children, ...props }: GlassProps) {
  return (
    <div {...props} className={cn("rounded-lg border border-gray-200 p-4 backdrop-blur-md", props.className)}>
      {children}
    </div>
  )
}
