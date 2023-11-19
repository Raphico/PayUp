import { nanoid } from "nanoid"

export const generateInvoiceId = () => {
  const currentYear = new Date().getFullYear()
  const randomChars = nanoid(3)
  return `INV${currentYear}-${randomChars}`
}
