import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type BlogPost = {
  id: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
};

type Topic = {
  title: string;
  description: string;
};

function toArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export default function Blog() {
  const { t } = useTranslation(["blog", "common"]);

  const posts = toArray<BlogPost>(
    t("posts.items", {
      ns: "blog",
      returnObjects: true,
    }),
  );

  const topics = toArray<Topic>(
    t("topics.items", {
      ns: "blog",
      returnObjects: true,
    }),
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-dark pb-20 pt-32 text-white">
        <div className="container">
          <p className="text-label text-brand-muted">
            {t("hero.eyebrow", { ns: "blog" })}
          </p>

          <h1 className="text-display mt-4 max-w-4xl text-white">
            {t("hero.title", { ns: "blog" })}
          </h1>

          <p className="text-large mt-6 max-w-3xl text-text-dark">
            {t("hero.description", { ns: "blog" })}
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="section bg-app">
        <div className="container">
          <div className="mb-12 max-w-2xl">
            <p className="text-label text-brand">
              {t("posts.eyebrow", { ns: "blog" })}
            </p>

            <h2 className="text-title mt-3 text-text">
              {t("posts.title", { ns: "blog" })}
            </h2>

            <p className="text-large mt-4 text-text-muted">
              {t("posts.description", { ns: "blog" })}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="card card-hover flex h-full flex-col p-6"
              >
                <div className="flex items-center gap-3 text-xs text-text-subtle">
                  <span>{post.date}</span>
                  <span aria-hidden="true">•</span>
                  <span>{post.readingTime}</span>
                </div>

                <h2 className="text-heading mt-5 leading-snug text-text">
                  {post.title}
                </h2>

                <p className="text-body mt-4 flex-1 text-text-muted">
                  {post.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {toArray<string>(post.tags).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 border-t border-border pt-5">
                  <Link
                    to={`/blog/${post.id}`}
                    className="link-brand"
                  >
                    {t("readArticle", { ns: "common" })}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="section bg-surface-muted">
        <div className="container">
          <div className="section-head">
            <p className="text-label text-brand">
              {t("topics.eyebrow", { ns: "blog" })}
            </p>

            <h2 className="text-title mt-3 text-text">
              {t("topics.title", { ns: "blog" })}
            </h2>

            <p className="text-large mt-4 text-text-muted">
              {t("topics.description", { ns: "blog" })}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {topics.map((topic) => (
              <article
                key={topic.title}
                className="card p-6 shadow-none"
              >
                <h3 className="text-heading text-text">
                  {topic.title}
                </h3>

                <p className="text-body mt-3 text-text-muted">
                  {topic.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-app pb-24">
        <div className="container">
          <div className="rounded-3xl bg-dark p-8 text-white sm:p-10">
            <p className="text-label text-brand-muted">
              {t("cta.eyebrow", { ns: "blog" })}
            </p>

            <h2 className="text-title mt-3 max-w-2xl text-white">
              {t("cta.title", { ns: "blog" })}
            </h2>

            <p className="text-large mt-5 max-w-2xl text-text-dark">
              {t("cta.description", { ns: "blog" })}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="btn btn-primary"
              >
                {t("buttons.viewWork", { ns: "common" })}
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                to="/contact"
                className="btn btn-secondary"
              >
                {t("nav.contact", { ns: "common" })}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}