import { z } from "zod"

export const invoiceValidator = z.object({
  sellerStreetAddress: z.string().min(1, { message: "required" }),
  sellerCity: z.string().min(1, { message: "required" }),
  sellerPostCode: z.string().min(1, { message: "required" }),
  sellerCountry: z.string().min(1, { message: "required" }),

  clientName: z.string().min(1, { message: "required" }),
  clientEmail: z.string().email(),
  clientStreetAddress: z.string().min(1, { message: "required" }),
  clientCity: z.string().min(1, { message: "required" }),
  clientPostCode: z.string().min(1, { message: "required" }),
  clientCountry: z.string().min(1, { message: "required" }),

  invoiceDate: z.date({
    required_error: "An invoice date is required.",
  }),
  paymentTerms: z.string().min(1, { message: "required" }),

  serviceDescription: z.string().min(1, { message: "required" }),

  itemList: z
    .array(
      z.object({
        item: z.string().min(1, { message: "required" }),
        quantity: z.coerce.number().min(1, { message: "invalid" }),
        price: z.coerce.number().min(1, { message: "invalid" }),
      })
    )
    .min(1, {
      message: "At least one item is required.",
    }),
})

export type InvoiceInputs = z.infer<typeof invoiceValidator>
