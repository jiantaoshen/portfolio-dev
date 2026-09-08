import * as React from "react"
import { cn } from "../../lib/utils"

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn("flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-300 disabled:opacity-50", className)} {...props} />
))
Input.displayName = "Input"
