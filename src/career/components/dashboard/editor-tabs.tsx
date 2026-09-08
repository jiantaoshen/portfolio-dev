import { Eye, PencilLine } from "lucide-react"
import { Button } from "../ui/button"

export type EditorTab = "edit" | "preview"

export function EditorTabs({
  value,
  onChange,
}: {
  value: EditorTab
  onChange: (tab: EditorTab) => void
}) {
  return <div className="inline-flex rounded-lg border border-zinc-200 bg-zinc-50 p-1">
    <Button
      type="button"
      size="sm"
      variant={value === "edit" ? "default" : "ghost"}
      onClick={() => onChange("edit")}
    >
      <PencilLine className="mr-2 h-4 w-4" />
      Edit
    </Button>
    <Button
      type="button"
      size="sm"
      variant={value === "preview" ? "default" : "ghost"}
      onClick={() => onChange("preview")}
    >
      <Eye className="mr-2 h-4 w-4" />
      Preview
    </Button>
  </div>
}
