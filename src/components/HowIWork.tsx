import { useTranslation } from "react-i18next";

type ProcessItem = {
  title: string;
  description: string;
};

export default function HowIWork() {
  const { t } = useTranslation("home");

  const items = t("process.items", {
    returnObjects: true,
  }) as ProcessItem[];

  return (
    <section className="section bg-app">
      <div className="container">

        <div className="section-head">
          <p className="text-label text-brand">{t("process.eyebrow")}</p>
          <h2 className="text-title mt-3 text-text">{t("process.title")}</h2>
          <p className="text-large mt-4 text-text-muted">{t("process.description")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <article key={item.title} className="card relative p-6 shadow-none">

              {index < items.length - 1 && <span className="absolute left-full top-10 hidden h-px w-6 bg-border lg:block" />}

              <span className="font-mono text-xs font-semibold text-brand">0{index + 1}</span>

              <h3 className="text-heading mt-5 text-text">{item.title}</h3>

              <p className="text-body mt-3 text-text-muted">{item.description}</p>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}