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

type ArchitectureStep = {
  label: string;
  value: string;
};

const featuredIds = [
  "light-manager",
  "price-watch",
  "portfolio",
];

const projectArchitectures: Record<string, ArchitectureStep[]> = {
  "light-manager": [
    {
      label: "Application UI",
      value: "React + TypeScript",
    },
    {
      label: "Backend API",
      value: "ASP.NET Core",
    },
    {
      label: "Auth & Data",
      value: "Identity · JWT · PostgreSQL",
    },
    {
      label: "Delivery",
      value: "Microsoft Azure",
    },
  ],

  "price-watch": [
    {
      label: "Application UI",
      value: "React + TypeScript",
    },
    {
      label: "Application Backend",
      value: "ASP.NET Core",
    },
    {
      label: "Automation",
      value: "Python + Playwright",
    },
    {
      label: "Runtime",
      value: "Local + Task Scheduler",
    },
  ],

  "portfolio": [
    {
      label: "Application",
      value: "React + TypeScript",
    },
    {
      label: "Content",
      value: "i18next · EN · SV · ZH",
    },
    {
      label: "UI",
      value: "Tailwind CSS",
    },
    {
      label: "Delivery",
      value: "Firebase + Google Cloud",
    },
  ],
};

export default function FeaturedProjects() {
  const { t } = useTranslation(["home", "project", "common"]);

  const projectsValue = t("items", {
    ns: "project",
    returnObjects: true,
  });

  const projects: ProjectItem[] = Array.isArray(projectsValue)
    ? (projectsValue as ProjectItem[])
    : [];

  const featuredProjects = featuredIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is ProjectItem => Boolean(project));

  const [mainProject, ...sideProjects] = featuredProjects;

  if (!mainProject) {
    return null;
  }

  const architecture = projectArchitectures[mainProject.id] ?? [];

  return (
    <section id="projects" className="section bg-surface-muted">
      <div className="container">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-label text-brand">
              {t("featuredProjects.eyebrow", { ns: "home" })}
            </p>

            <h2 className="text-title mt-3 text-text">
              {t("featuredProjects.title", { ns: "home" })}
            </h2>

            <p className="text-large mt-4 text-text-muted">
              {t("featuredProjects.description", { ns: "home" })}
            </p>
          </div>

          <Link to="/projects" className="link-brand shrink-0">
            {t("featuredProjects.viewAll", { ns: "home" })}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="card card-hover overflow-hidden rounded-3xl">
            <div className="grid h-full lg:grid-cols-[1.1fr_0.9fr]">
              <div className="flex flex-col p-7 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-label text-brand">
                    {mainProject.category}
                  </span>

                  <span className="tag">{mainProject.status}</span>
                </div>

                <div className="mt-10">
                  <p className="text-label text-text-subtle">
                    {t("featuredProjects.featured", { ns: "home" })}
                  </p>

                  <h3 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl">
                    {mainProject.title}
                  </h3>

                  <p className="text-large mt-5 text-text-muted">
                    {mainProject.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {mainProject.technologies.slice(0, 5).map((technology) => (
                      <span key={technology} className="tag">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    to={`/projects/${mainProject.id}`}
                    className="btn btn-light"
                  >
                    {t("buttons.caseStudy", { ns: "common" })}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div className="border-t border-border bg-brand/[0.035] p-6 lg:border-l lg:border-t-0 sm:p-7">
                <div className="flex h-full flex-col">
                  <div>
                    <p className="text-label text-brand">
                      Architecture
                    </p>

                    <p className="mt-2 text-sm text-text-muted">
                      How the application fits together
                    </p>
                  </div>

                  <div className="mt-7 flex flex-1 flex-col justify-center">
                    {architecture.map((step, index) => (
                      <div key={`${step.label}-${step.value}`}>
                        <div
                          className={
                            index === 1
                              ? "rounded-xl border border-brand/25 bg-brand/[0.08] p-4"
                              : "rounded-xl border border-border bg-surface p-4"
                          }
                        >
                          <p
                            className={
                              index === 1
                                ? "text-label text-brand"
                                : "text-label text-text-subtle"
                            }
                          >
                            {step.label}
                          </p>

                          <p className="mt-2 font-semibold text-text">
                            {step.value}
                          </p>
                        </div>

                        {index < architecture.length - 1 && (
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
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-6">
            {sideProjects.map((project) => (
              <article
                key={project.id}
                className="card card-hover flex h-full flex-col p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-label text-brand">
                    {project.category}
                  </span>

                  <span className="tag">{project.status}</span>
                </div>

                <h3 className="mt-5 text-2xl font-bold tracking-tight text-text">
                  {project.title}
                </h3>

                <p className="text-body mt-4 flex-1 text-text-muted">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((technology) => (
                    <span key={technology} className="tag">
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-6 border-t border-border pt-5">
                  <Link
                    to={`/projects/${project.id}`}
                    className="link-brand"
                  >
                    {t("buttons.caseStudy", { ns: "common" })}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}