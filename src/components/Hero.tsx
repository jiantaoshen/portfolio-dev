import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation(["home", "common"]);

  return (
    <section className="hero">
      <div className="container grid min-h-screen items-center gap-14 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:pb-24 lg:pt-28">
        <div className="max-w-2xl">
          <div className="status mb-6">
            <span className="status-dot" />
            {t("hero.availability", { ns: "home" })}
          </div>

          <p className="text-label text-brand-muted">
            {t("hero.eyebrow", { ns: "home" })}
          </p>

          <h1 className="text-display mt-4 max-w-3xl text-white">
            {t("hero.titleBefore", { ns: "home" })}{" "}
            <span className="text-brand-muted">
              {t("hero.titleHighlight", { ns: "home" })}
            </span>{" "}
            {t("hero.titleAfter", { ns: "home" })}
          </h1>

          <p className="text-large mt-7 max-w-xl text-text-dark">
            {t("hero.description", { ns: "home" })}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn btn-primary">
              {t("buttons.discussProject", { ns: "common" })}
              <span aria-hidden="true">→</span>
            </a>

            <a href="#projects" className="btn btn-secondary">
              {t("buttons.viewWork", { ns: "common" })}
            </a>

            <a href="/cv.pdf" className="btn btn-secondary">
              {t("buttons.downloadCV", { ns: "common" })}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-10 -z-10 rounded-full bg-brand/10 blur-3xl" />

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
            <div className="mb-6">
              <p className="text-label text-text-dark-muted">
                {t("hero.architecture.title", { ns: "home" })}
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-brand/30 bg-brand/10 p-4">
                <p className="text-label text-brand-muted">
                  {t("hero.architecture.backend.label", { ns: "home" })}
                </p>

                <p className="mt-2 font-semibold text-white">
                  {t("hero.architecture.backend.value", { ns: "home" })}
                </p>
              </div>

              <div className="flex justify-center text-text-dark-muted" aria-hidden="true">
                ↓
              </div>

              <div className="rounded-xl border border-brand/20 bg-brand/[0.08] p-4">
                <p className="text-label text-brand-muted">
                  {t("hero.architecture.ai.label", { ns: "home" })}
                </p>

                <p className="mt-2 font-semibold text-white">
                  {t("hero.architecture.ai.value", { ns: "home" })}
                </p>
              </div>

              <div className="flex justify-center text-text-dark-muted" aria-hidden="true">
                ↓
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-dark-muted/80 p-4">
                  <p className="text-label text-text-dark-muted">
                    {t("hero.architecture.frontend.label", { ns: "home" })}
                  </p>

                  <p className="mt-2 font-semibold text-white">
                    {t("hero.architecture.frontend.value", { ns: "home" })}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-dark-muted/80 p-4">
                  <p className="text-label text-text-dark-muted">
                    {t("hero.architecture.data.label", { ns: "home" })}
                  </p>

                  <p className="mt-2 font-semibold text-white">
                    {t("hero.architecture.data.value", { ns: "home" })}
                  </p>
                </div>
              </div>

              <div className="flex justify-center text-text-dark-muted" aria-hidden="true">
                ↓
              </div>

              <div className="rounded-xl border border-white/10 bg-dark-muted/80 p-4">
                <p className="text-label text-text-dark-muted">
                  {t("hero.architecture.deployment.label", { ns: "home" })}
                </p>

                <p className="mt-2 font-semibold text-white">
                  {t("hero.architecture.deployment.value", { ns: "home" })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}