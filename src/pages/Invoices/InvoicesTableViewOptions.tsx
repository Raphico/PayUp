import { Button } from "../../components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DropdownMenu"

import { MixerHorizontalIcon } from "@radix-ui/react-icons"

import { ColumnDef } from "./schema"

interface InvoicesTableViewOptionsProps {
  columns: ColumnDef[]
  toggleColumnVisibility: (columnId: string) => void
}

export function InvoicesTableViewOptions({
  columns,
  toggleColumnVisibility,
}: InvoicesTableViewOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <MixerHorizontalIcon className="h-4 w-4 mr-2" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="font-semibold">
          Toggle columns
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        {columns.map(
          (column) =>
            column.canHide && (
              <DropdownMenuCheckboxItem
                checked={column.isVisible}
                onCheckedChange={() => toggleColumnVisibility(column.id)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
