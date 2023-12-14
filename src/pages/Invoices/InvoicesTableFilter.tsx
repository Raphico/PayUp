import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DropdownMenu"
import { Button } from "../../components/ui/Button"
import { ChevronDownIcon } from "@radix-ui/react-icons"

import { InvoiceStatus } from "../../types"

interface InvoicesTableFilterProps {
  statusFilterValue: string
  handleStatusFiltering: (status: InvoiceStatus) => void
}

const statuses = ["pending", "paid", "drafted"]

export function InvoicesTableFilter({
  statusFilterValue,
  handleStatusFiltering,
}: InvoicesTableFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Status <ChevronDownIcon className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="font-semibold">
          Filter by status
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {statuses.map((status) => (
          <DropdownMenuCheckboxItem
            key={status}
            checked={statusFilterValue === status}
            onCheckedChange={() =>
              handleStatusFiltering(status as InvoiceStatus)
            }
            className="capitalize"
          >
            {status}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
