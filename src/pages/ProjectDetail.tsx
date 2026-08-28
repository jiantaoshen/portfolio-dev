import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

type ArchitectureItem = {
  label: string;
  value: string;
};

type DetailItem = {
  title: string;
  description: string;
};

type ProjectLinks = {
  github?: string;
  live?: string;
};

type ProjectItem = {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;
  technologies: string[];
  highlights: string[];

  overview: string;
  problem: string;
  solution: string;

  architecture: ArchitectureItem[];
  features: DetailItem[];
  challenges: DetailItem[];

  deployment: string;

  learnings: string[];
  futureImprovements: string[];

  links?: ProjectLinks;
};

export default function ProjectDetail() {
  const { id } = useParams();
  const { t } = useTranslation(["project", "common"]);

  const projectsValue = t("items", {
    ns: "project",
    returnObjects: true,
  });

  const projects: ProjectItem[] = Array.isArray(projectsValue)
    ? (projectsValue as ProjectItem[])
    : [];

  const project = projects.find((item) => item.id === id);

  if (!project) {
    return (
      <section className="flex min-h-screen items-center bg-dark pb-20 pt-32 text-white">
        <div className="container">
          <p className="text-label text-brand-muted">
            {t("detail.eyebrow", { ns: "project" })}
          </p>

          <h1 className="text-display mt-4 max-w-2xl text-white">
            {t("detail.notFound", { ns: "project" })}
          </h1>

          <Link to="/projects" className="btn btn-primary mt-8">
            ← {t("detail.back", { ns: "project" })}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-dark pb-20 pt-32 text-white">
        <div className="container">
          <Link
            to="/projects"
            className="mb-6 inline-flex items-center gap-2 text-sm text-text-dark-muted transition hover:text-white"
          >
            ← {t("detail.back", { ns: "project" })}
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-label text-brand-muted">
              {project.category}
            </span>

            <span className="tag-dark">
              {project.status}
            </span>
          </div>

          <h1 className="text-display mt-5 max-w-4xl text-white">
            {project.title}
          </h1>

          <p className="text-large mt-6 max-w-3xl text-text-dark">
            {project.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span key={technology} className="tag-dark">
                {technology}
              </span>
            ))}
          </div>

          {(project.links?.github || project.links?.live) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  {t("buttons.liveDemo", { ns: "common" })}
                  <span aria-hidden="true">↗</span>
                </a>
              )}

              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                >
                  {t("buttons.github", { ns: "common" })}
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="section bg-app">
        <div className="container grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-14">
          <article className="space-y-10">
            <section className="border-b border-border pb-10">
              <h2 className="text-heading text-text">
                {t("detail.overview", { ns: "project" })}
              </h2>

              <p className="mt-5 text-base leading-8 text-text-muted">
                {project.overview}
              </p>
            </section>

            <section className="border-b border-border pb-10">
              <h2 className="text-heading text-text">
                {t("detail.problem", { ns: "project" })}
              </h2>

              <p className="mt-5 text-base leading-8 text-text-muted">
                {project.problem}
              </p>
            </section>

            <section className="border-b border-border pb-10">
              <h2 className="text-heading text-text">
                {t("detail.solution", { ns: "project" })}
              </h2>

              <p className="mt-5 text-base leading-8 text-text-muted">
                {project.solution}
              </p>
            </section>

            <section className="border-b border-border pb-10">
              <h2 className="text-heading text-text">
                {t("detail.architecture", { ns: "project" })}
              </h2>

              <div className="mt-6 space-y-3">
                {project.architecture.map((item, index) => (
                  <div key={`${item.label}-${item.value}`}>
                    <div
                      className={
                        index === 1
                          ? "rounded-xl border border-brand/25 bg-brand/[0.06] p-5"
                          : "rounded-xl border border-border bg-surface p-5"
                      }
                    >
                      <p
                        className={
                          index === 1
                            ? "text-label text-brand"
                            : "text-label text-text-subtle"
                        }
                      >
                        {item.label}
                      </p>

                      <p className="mt-2 font-semibold text-text">
                        {item.value}
                      </p>
                    </div>

                    {index < project.architecture.length - 1 && (
                      <div
                        className="flex h-7 items-center justify-center text-text-subtle"
                        aria-hidden="true"
                      >
                        ↓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="border-b border-border pb-10">
              <h2 className="text-heading text-text">
                {t("detail.features", { ns: "project" })}
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="card p-5"
                  >
                    <h3 className="font-semibold text-text">
                      {feature.title}
                    </h3>

                    <p className="text-body mt-2 text-text-muted">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-b border-border pb-10">
              <h2 className="text-heading text-text">
                {t("detail.challenges", {
                  ns: "project",
                  defaultValue: "Challenges & Decisions",
                })}
              </h2>

              <div className="mt-6 space-y-4">
                {project.challenges.map((challenge) => (
                  <div
                    key={challenge.title}
                    className="rounded-xl border border-border bg-surface p-5"
                  >
                    <h3 className="font-semibold text-text">
                      {challenge.title}
                    </h3>

                    <p className="text-body mt-2 text-text-muted">
                      {challenge.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-b border-border pb-10">
              <h2 className="text-heading text-text">
                {t("detail.deployment", { ns: "project" })}
              </h2>

              <p className="mt-5 text-base leading-8 text-text-muted">
                {project.deployment}
              </p>
            </section>

            <section className="border-b border-border pb-10">
              <h2 className="text-heading text-text">
                {t("detail.learned", { ns: "project" })}
              </h2>

              <ul className="mt-5 space-y-3">
                {project.learnings.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-text-muted"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {project.futureImprovements.length > 0 && (
              <section>
                <h2 className="text-heading text-text">
                  {t("detail.future", {
                    ns: "project",
                    defaultValue: "Future Improvements",
                  })}
                </h2>

                <ul className="mt-5 space-y-3">
                  {project.futureImprovements.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-6 text-text-muted"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="card p-5">
              <p className="text-label text-text-subtle">
                {t("detail.technologies", { ns: "project" })}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span key={technology} className="tag">
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <p className="text-label text-text-subtle">
                {t("detail.status", { ns: "project" })}
              </p>

              <p className="mt-3 font-semibold text-text">
                {project.status}
              </p>
            </div>

            <div className="card p-5">
              <p className="text-label text-text-subtle">
                {t("detail.type", { ns: "project" })}
              </p>

              <p className="mt-3 font-semibold text-text">
                {project.category}
              </p>
            </div>

            {project.highlights.length > 0 && (
              <div className="card p-5">
                <p className="text-label text-text-subtle">
                  Highlights
                </p>

                <ul className="mt-4 space-y-3">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-6 text-text-muted"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              to="/projects"
              className="btn btn-light w-full"
            >
              ← {t("detail.back", { ns: "project" })}
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}