import { FirebaseError } from "firebase/app"
import { toast } from "sonner"

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function catchError(error: unknown) {
  if (error instanceof FirebaseError) {
    const errorMsg = error.code.replace("auth/", "").replace(/-/g, " ")
    toast.error(errorMsg)
  } else if (error instanceof Error) {
    toast.error(error.message)
  } else {
    toast.error("Something went wrong")
  }
}
