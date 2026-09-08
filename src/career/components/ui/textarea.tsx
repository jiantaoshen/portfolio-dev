import * as React from "react"
import { cn } from "../../lib/utils"

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn("min-h-[120px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-300 disabled:opacity-50", className)} {...props} />
))
Textarea.displayName = "Textarea"
