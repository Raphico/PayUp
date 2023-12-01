import { cn } from "../lib/utils"

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("bg-border/80 animate-pulse rounded-sm", className)}
    {...props}
  />
)

export { Skeleton }
