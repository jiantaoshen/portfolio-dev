import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language).split("-")[0];

  const changeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <select value={currentLanguage} onChange={changeLanguage} aria-label="Select language" className="language-select">
      <option value="en" className="text-text">EN</option>
      <option value="sv" className="text-text">SV</option>
      <option value="zh" className="text-text">中文</option>
    </select>
  );
}