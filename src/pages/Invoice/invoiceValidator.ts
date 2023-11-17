import { z } from "zod"

export const invoiceValidator = z.object({
  sellerStreetAddress: z.string(),
  sellerCity: z.string(),
  sellerPostCode: z.string(),
  sellerCountry: z.string(),

  clientName: z.string(),
  clientEmail: z.string().email(),
  clientStreetAddress: z.string(),
  clientCity: z.string(),
  clientPostCode: z.string(),
  clientCountry: z.string(),

  invoiceDate: z.date({
    required_error: "An invoice date is required.",
  }),
  paymentTerms: z.string(),

  serviceDescription: z.string(),

  itemList: z.array(
    z.object({
      item: z.string(),
      quantity: z.coerce.number(),
      price: z.coerce.number(),
    })
  ),
})
