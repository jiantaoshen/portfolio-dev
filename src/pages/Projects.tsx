import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type ProjectItem = {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;
  technologies: string[];
  highlights: string[];
};

export default function Projects() {
  const { t } = useTranslation(["project", "common"]);

  const projects = t("items", {
    ns: "project",
    returnObjects: true,
  }) as ProjectItem[];

  return (
    <>
      <section className="bg-dark pb-20 pt-32 text-white">
        <div className="container">
          <p className="text-label text-brand-muted">{t("page.eyebrow", { ns: "project" })}</p>
          <h1 className="text-display mt-4 max-w-4xl text-white">{t("page.title", { ns: "project" })}</h1>
          <p className="text-large mt-6 max-w-3xl text-text-dark">{t("page.description", { ns: "project" })}</p>
        </div>
      </section>

      <section className="section bg-app">
        <div className="container">

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.id} className="card card-hover flex h-full flex-col p-7">

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-label text-brand">{project.category}</span>
                  <span className="tag">{project.status}</span>
                </div>

                <h2 className="mt-5 text-2xl font-bold tracking-tight text-text">{project.title}</h2>

                <p className="text-body mt-4 text-text-muted">{project.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="tag">{technology}</span>
                  ))}
                </div>

                <ul className="mt-6 space-y-3">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-6 text-text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Link to={`/projects/${project.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-hover">
                    {t("buttons.caseStudy", { ns: "common" })}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

              </article>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}