import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation("home");

  return (
    <section id="contact" className="section bg-dark text-white">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div className="max-w-3xl">
            <div className="status mb-6">
              <span className="status-dot" />
              {t("contact.availability")}
            </div>

            <p className="text-label text-brand-muted">
              {t("contact.eyebrow")}
            </p>

            <h2 className="text-title mt-3 max-w-2xl text-white">
              {t("contact.title")}
            </h2>

            <p className="text-large mt-5 max-w-2xl text-text-dark">
              {t("contact.description")}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <a
                href="https://www.linkedin.com/in/jiantaoshen/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-brand"
              >
                LinkedIn
                <span aria-hidden="true">↗</span>
              </a>

              <a
                href="https://github.com/jiantaoshen"
                target="_blank"
                rel="noopener noreferrer"
                className="link-brand"
              >
                GitHub
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="shrink-0">
            <Link to="/contact" className="btn btn-primary">
              {t("contact.action")}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}