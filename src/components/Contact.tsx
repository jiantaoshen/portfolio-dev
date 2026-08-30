import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation("home");

  return (
    <section id="contact" className="section bg-app">
      <div className="container">
        <div className="rounded-3xl bg-dark px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <p className="text-label text-brand-muted">
                {t("contact.eyebrow")}
              </p>

              <h2 className="text-section mt-4 text-white">
                {t("contact.title")}
              </h2>

              <p className="text-large mt-5 max-w-xl text-text-dark">
                {t("contact.description")}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href="mailto:jiantaos98@outlook.com"
                className="btn btn-light"
              >
                {t("contact.email")}
                <span aria-hidden="true">→</span>
              </a>

              <a
                href="https://www.linkedin.com/in/jiantaoshen/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}