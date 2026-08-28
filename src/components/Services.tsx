import { useTranslation } from "react-i18next";

type ServiceItem = {
  title: string;
  description: string;
  technologies: string[];
};

export default function Services() {
  const { t } = useTranslation("home");

  const services = t("services.items", {
    returnObjects: true,
  }) as ServiceItem[];

  return (
    <section id="services" className="section bg-app">
      <div className="container">

        <div className="section-head">
          <p className="text-label text-brand">{t("services.eyebrow")}</p>
          <h2 className="text-title mt-3 text-text">{t("services.title")}</h2>
          <p className="text-large mt-4 text-text-muted">{t("services.description")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article key={service.title} className="card card-hover p-7">

              <span className="font-mono text-xs font-semibold text-brand">0{index + 1}</span>

              <h3 className="text-heading mt-5 text-text">{service.title}</h3>

              <p className="text-body mt-4 text-text-muted">{service.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {service.technologies.map((technology) => (
                  <span key={technology} className="tag">{technology}</span>
                ))}
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}