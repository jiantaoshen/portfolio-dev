import { Button } from "../ui/button"
import type { Locale } from "../../lib/types"

export const localeLabels: Record<Locale, string> = {
  en: "English",
  sv: "Svenska",
  zh: "中文",
}

export function LocaleSwitcher({
  value,
  onChange,
}: {
  value: Locale
  onChange: (locale: Locale) => void
}) {
  return <div className="flex flex-wrap gap-2">
    {(Object.keys(localeLabels) as Locale[]).map(locale => (
      <Button
        key={locale}
        type="button"
        size="sm"
        variant={value === locale ? "default" : "outline"}
        onClick={() => onChange(locale)}
      >
        {localeLabels[locale]}
      </Button>
    ))}
  </div>
}
