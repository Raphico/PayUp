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

interface PageHeaderHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const PageHeaderHeading = ({ className, ...props }: PageHeaderHeadingProps) => (
  <h1
    className={cn(
      "font-bold leading-tight tracking-tighter lg:leading-[1.1] text-2xl sm:text-3xl",
      className
    )}
    {...props}
  />
)

interface PageHeaderDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const PageHeaderDescription = ({
  className,
  ...props
}: PageHeaderDescriptionProps) => (
  <p className={cn("font-medium text-base text-muted", className)} {...props} />
)

export { PageHeader, PageHeaderHeading, PageHeaderDescription }
