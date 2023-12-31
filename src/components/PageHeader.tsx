import * as React from "react"
import { cn } from "../lib/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

const PageHeader = ({
  className,
  as: Comp = "section",
  ...props
}: PageHeaderProps) => (
  <Comp className={cn("grid gap-1", className)} {...props} />
)

const PageHeaderHeading = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn(
      "font-bold leading-tight tracking-tighter lg:leading-[1.1] text-2xl",
      className
    )}
    {...props}
  />
)

const PageHeaderDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("font-medium text-base text-muted", className)} {...props} />
)

export { PageHeader, PageHeaderHeading, PageHeaderDescription }
