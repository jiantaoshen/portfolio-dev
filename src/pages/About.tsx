import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type SkillGroup = {
  title: string;
  items: string[];
};

function toArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export default function About() {
  const { t } = useTranslation(["about", "common"]);

  const story = toArray<string>(
    t("story.paragraphs", {
      ns: "about",
      returnObjects: true,
    }),
  );

  const skills = toArray<SkillGroup>(
    t("skills.items", {
      ns: "about",
      returnObjects: true,
    }),
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-dark pb-20 pt-32 text-white">
        <div className="container">
          <p className="text-label text-brand-muted">
            {t("hero.eyebrow", { ns: "about" })}
          </p>

          <h1 className="text-display mt-4 max-w-4xl text-white">
            {t("hero.title", { ns: "about" })}
          </h1>

          <p className="text-large mt-6 max-w-3xl text-text-dark">
            {t("hero.description", { ns: "about" })}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-app">
        <div className="container grid gap-12 lg:gap-16">
          <div>
            <p className="text-label text-brand">
              {t("story.eyebrow", { ns: "about" })}
            </p>

            <h2 className="text-title mt-3 text-text">
              {t("story.title", { ns: "about" })}
            </h2>

            <div className="mt-6 space-y-5">
              {story.map((paragraph, index) => (
                <p
                  key={`${index}-${paragraph}`}
                  className="text-large text-text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section bg-surface-muted">
        <div className="container">
          <div className="section-head">
            <p className="text-label text-brand">
              {t("skills.eyebrow", { ns: "about" })}
            </p>

            <h2 className="text-title mt-3 text-text">
              {t("skills.title", { ns: "about" })}
            </h2>

            <p className="text-large mt-4 text-text-muted">
              {t("skills.description", { ns: "about" })}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {skills.map((group) => (
              <article
                key={group.title}
                className="card p-6"
              >
                <h3 className="text-heading text-text">
                  {group.title}
                </h3>

                <div className="mt-5 flex flex-wrap gap-2">
                  {toArray<string>(group.items).map((item) => (
                    <span
                      key={item}
                      className="tag"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-app">
        <div className="container">
          <div className="rounded-3xl bg-dark p-8 text-white sm:p-10">
            <p className="text-label text-brand-muted">
              {t("cta.eyebrow", { ns: "about" })}
            </p>

            <h2 className="text-title mt-3 max-w-2xl text-white">
              {t("cta.title", { ns: "about" })}
            </h2>

            <p className="text-large mt-5 max-w-2xl text-text-dark">
              {t("cta.description", { ns: "about" })}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="btn btn-primary"
              >
                {t("nav.contact", { ns: "common" })}
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                to="/projects"
                className="btn btn-secondary"
              >
                {t("buttons.viewWork", { ns: "common" })}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}