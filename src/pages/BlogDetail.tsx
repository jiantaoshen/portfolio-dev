import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

type BlogSection = {
  title: string;
  paragraphs: string[];
};

type BlogPost = {
  id: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  sections?: BlogSection[];
};

function toArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export default function BlogDetail() {
  const { id } = useParams();
  const { t } = useTranslation("blog");

  const posts = toArray<BlogPost>(
    t("posts.items", {
      returnObjects: true,
    }),
  );

  const post = posts.find((item) => item.id === id);

  if (!post) {
    return (
      <section className="flex min-h-screen items-center bg-dark pb-20 pt-32 text-white">
        <div className="container">
          <p className="text-label text-brand-muted">
            {t("detail.notFoundEyebrow")}
          </p>

          <h1 className="text-display mt-4 max-w-2xl text-white">
            {t("detail.notFound")}
          </h1>

          <Link to="/blog" className="btn btn-primary mt-8">
            <span aria-hidden="true">←</span>
            {t("detail.back")}
          </Link>
        </div>
      </section>
    );
  }

  const tags = toArray<string>(post.tags);
  const sections = toArray<BlogSection>(post.sections);

  return (
    <>
      {/* Hero */}
      <section className="bg-dark pb-20 pt-32 text-white">
        <div className="container">
          <Link
            to="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-text-dark-muted transition hover:text-white"
          >
            <span aria-hidden="true">←</span>
            {t("detail.back")}
          </Link>

          <p className="text-label text-brand-muted">
            {t("detail.eyebrow")}
          </p>

          <h1 className="text-display mt-4 max-w-4xl text-white">
            {post.title}
          </h1>

          <p className="text-large mt-6 max-w-3xl text-text-dark">
            {post.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-text-dark-muted">
            <span>{post.date}</span>
            <span aria-hidden="true">•</span>
            <span>{post.readingTime}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="tag-dark">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-app">
        <div className="container grid gap-10 lg:grid-cols-[1fr_280px] lg:gap-14">
          <article className="min-w-0 space-y-10">
            {sections.map((section) => (
              <section
                key={section.title}
                className="border-b border-border pb-10 last:border-0 last:pb-0"
              >
                <h2 className="text-heading text-text">
                  {section.title}
                </h2>

                {toArray<string>(section.paragraphs).map(
                  (paragraph, index) => (
                    <p
                      key={`${index}-${paragraph}`}
                      className="mt-5 text-base leading-8 text-text-muted"
                    >
                      {paragraph}
                    </p>
                  ),
                )}
              </section>
            ))}
          </article>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="card p-5">
              <p className="text-label text-text-subtle">
                {t("detail.published")}
              </p>

              <p className="mt-3 font-semibold text-text">
                {post.date}
              </p>
            </div>

            <div className="card p-5">
              <p className="text-label text-text-subtle">
                {t("detail.readingTime")}
              </p>

              <p className="mt-3 font-semibold text-text">
                {post.readingTime}
              </p>
            </div>

            <div className="card p-5">
              <p className="text-label text-text-subtle">
                {t("detail.topics")}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link to="/blog" className="btn btn-light w-full">
              <span aria-hidden="true">←</span>
              {t("detail.back")}
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}