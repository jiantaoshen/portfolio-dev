import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation("common");

  return (
    <section className="flex min-h-screen items-center bg-dark pb-20 pt-32 text-white">
      <div className="container">

        <p className="font-mono text-sm font-semibold text-brand-muted">404</p>

        <h1 className="text-display mt-4 max-w-2xl text-white">{t("notFound.title")}</h1>

        <p className="text-large mt-5 max-w-xl text-text-dark">{t("notFound.description")}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn btn-primary">
            {t("notFound.home")}
            <span aria-hidden="true">→</span>
          </Link>

          <Link to="/projects" className="btn btn-secondary">
            {t("buttons.viewWork")}
          </Link>
        </div>

      </div>
    </section>
  );
}