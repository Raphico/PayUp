import { useForm, useFieldArray, Control, useWatch } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/Form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/Select"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../components/ui/Popover"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"

import { invoiceValidator, InvoiceInputs } from "./invoiceValidator"
import { zodResolver } from "@hookform/resolvers/zod"

import { CalendarIcon, TrashIcon } from "@radix-ui/react-icons"
import { Icons } from "../../components/Icons"

import { cn } from "../../lib/utils"
import { format } from "date-fns"
import { Calendar } from "../../components/ui/Calendar"
import { Invoice } from "../../types"

const Total = ({
  control,
  index,
}: {
  control: Control<InvoiceInputs>
  index: number
}) => {
  const item = useWatch({
    name: `itemList.${index}`,
    control,
  })

  const total = item.price * item.quantity

  return (
    <div className="space-y-2 py-1 pl-2">
      <p className="text-sm text-muted">Total</p>
      <p className="flex w-full text-sm py-2">{total}</p>
    </div>
  )
}

interface InvoiceFormProps {
  onSubmit: (values: InvoiceInputs) => void
  isPending: boolean
  invoice?: Invoice
}

export function InvoiceForm({
  onSubmit,
  isPending,
  invoice,
}: InvoiceFormProps) {
  const form = useForm<InvoiceInputs>({
    resolver: zodResolver(invoiceValidator),
    defaultValues: {
      sellerStreetAddress: invoice?.sellerStreetAddress || "",
      sellerCountry: invoice?.sellerCountry || "",
      sellerCity: invoice?.sellerCity || "",
      sellerPostCode: invoice?.sellerPostCode || "",
      clientName: invoice?.clientName || "",
      clientEmail: invoice?.clientEmail || "",
      clientStreetAddress: invoice?.clientStreetAddress || "",
      clientCountry: invoice?.clientCountry || "",
      clientCity: invoice?.clientCity || "",
      clientPostCode: invoice?.clientPostCode || "",
      invoiceDate: invoice?.invoiceDate.toDate(),
      paymentTerms: invoice?.paymentTerms || "",
      serviceDescription: invoice?.serviceDescription || "",
      itemList: invoice?.itemList || [],
    },
  })

  const itemListFieldArray = useFieldArray({
    control: form.control,
    name: "itemList",
  })

  const itemListError = form.formState.errors.itemList

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg mx-auto space-y-10"
      >
        <div className="space-y-4">
          <p className="font-semibold text-accent">Bill From</p>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="sellerStreetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="sellerCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sellerCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sellerPostCode"
                render={({ field }) => (
                  <FormItem className="max-sm:col-span-2">
                    <FormLabel>Post code</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-semibold text-accent">Bill To</p>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client'Name</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>client's Email</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientStreetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="clientCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientPostCode"
                render={({ field }) => (
                  <FormItem className="max-sm:col-span-2">
                    <FormLabel>Post code</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="invoiceDate"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-center pt-1 gap-1.5">
                <FormLabel>Invoice Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-between")}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="h-4 w-4 text-muted" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentTerms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Terms</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Net 1 day">Net 1 day</SelectItem>
                    <SelectItem value="Net 7 days">Net 7 days</SelectItem>
                    <SelectItem value="Net 14 days">Net 14 days</SelectItem>
                    <SelectItem value="Net 30 days">Net 30 days</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="serviceDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Description</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <p className="text-lg text-muted font-semibold">Item List</p>

            {itemListError && (
              <p className="text-sm font-medium text-destructive">
                {itemListError.message}
              </p>
            )}
          </div>

          <div className="grid gap-6">
            {itemListFieldArray.fields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-col items-center md:flex-row md:items-end gap-2"
              >
                <div
                  key={field.id}
                  className="grid grid-cols-4 sm:grid-cols-9 gap-4 w-full"
                >
                  <FormField
                    control={form.control}
                    name={`itemList.${index}.item` as const}
                    render={({ field }) => (
                      <FormItem className="col-span-3 sm:col-span-4">
                        <FormLabel>Item</FormLabel>
                        <FormControl>
                          <Input {...field} autoComplete="off" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`itemList.${index}.quantity` as const}
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Qty.</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`itemList.${index}.price` as const}
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Total control={form.control} index={index} />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  sizes="icon"
                  className="max-sm:w-full"
                  onClick={() => itemListFieldArray.remove(index)}
                >
                  <TrashIcon className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Delete item</span>
                </Button>
              </div>
            ))}
          </div>

          <Button
            type="button"
            sizes="sm"
            onClick={() =>
              itemListFieldArray.append({
                item: "",
                quantity: 1,
                price: 0,
              })
            }
          >
            Add Item
          </Button>
        </div>

        <div className="w-full grid">
          <Button
            type="submit"
            variant="accent"
            sizes="sm"
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner
                className="h-4 w-4 animate-spin mr-2"
                aria-hidden="true"
              />
            )}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  )
}
