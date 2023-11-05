import { Icons } from "./Icons"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Icons.logo className="h-8 w-8" aria-label="PayUp logo" />
      <h3 className="heading3 max-sm:hidden">PayUp</h3>
    </div>
  )
}
