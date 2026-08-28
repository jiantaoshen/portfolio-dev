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

function toArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export default function TechnicalNotes() {
  const { t } = useTranslation(["home", "blog", "common"]);

  const posts = toArray<BlogPost>(
    t("posts.items", {
      ns: "blog",
      returnObjects: true,
    }),
  );

  const previewPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="section bg-surface-muted">
      <div className="container">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-label text-brand">
              {t("technicalNotes.eyebrow", { ns: "home" })}
            </p>

            <h2 className="text-title mt-3 text-text">
              {t("technicalNotes.title", { ns: "home" })}
            </h2>

            <p className="text-large mt-4 text-text-muted">
              {t("technicalNotes.description", { ns: "home" })}
            </p>
          </div>

          <Link
            to="/blog"
            className="link-brand shrink-0"
          >
            {t("technicalNotes.viewAll", { ns: "home" })}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {previewPosts.map((post) => {
            const tags = toArray<string>(post.tags).slice(0, 4);

            return (
              <article
                key={post.id}
                className="card card-hover flex h-full flex-col p-6"
              >
                <div className="flex items-center gap-3 text-xs text-text-subtle">
                  <span>{post.date}</span>
                  <span aria-hidden="true">•</span>
                  <span>{post.readingTime}</span>
                </div>

                <h3 className="text-heading mt-5 leading-snug text-text">
                  {post.title}
                </h3>

                <p className="text-body mt-4 flex-1 text-text-muted">
                  {post.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag"
                    >
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

