export const locales = ["en", "sv", "zh"] as const;

export type Locale = (typeof locales)[number];

export type Namespace =
  | "about"
  | "common"
  | "home"
  | "project";

const translations = import.meta.glob(
  "./locales/*/*.json",
  {
    eager: true,
    import: "default",
  },
) as Record<string, unknown>;

export function getTranslations<T>(
  locale: Locale,
  namespace: Namespace,
): T {
  const path = `./locales/${locale}/${namespace}.json`;

  const data = translations[path];

  if (!data) {
    throw new Error(
      `Missing translation: ${locale}/${namespace}`,
    );
  }

  return data as T;
}