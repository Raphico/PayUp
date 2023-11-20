import * as React from "react"
import { cn } from "../../lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table ref={ref} className={cn("w-full text-sm", className)} {...props} />
))

Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))

TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "max-sm:[&_td:first-child]:pt-6 max-sm:[&_td:last-child]:pb-6",
      className
    )}
    {...props}
  />
))

TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("border-b transition-colors hover:bg-border/80", className)}
    {...props}
  />
))

TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "max-sm:hidden text-left font-medium text-muted p-4 capitalize",
      className
    )}
    {...props}
  />
))

TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement> & { heading?: string }
>(({ className, heading, children, ...props }, ref) => (
  <td
    role="cell"
    ref={ref}
    className={cn(
      "max-sm:grid max-sm:grid-cols-[15ch,auto] gap-2 max-sm:p-2 p-4",
      className
    )}
    {...props}
  >
    {heading && (
      <span className="sm:hidden capitalize text-muted font-medium">
        {heading}:{" "}
      </span>
    )}
    {children}
  </td>
))

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
