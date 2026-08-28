import { useState } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";

type ContactReason = {
  value: string;
  label: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const { t } = useTranslation("home");

  const [status, setStatus] = useState<SubmitStatus>("idle");

  const reasonsValue = t("contactPage.reasons", {
    returnObjects: true,
  });

  const reasons: ContactReason[] = Array.isArray(reasonsValue)
    ? (reasonsValue as ContactReason[])
    : [];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    if (!endpoint) {
      console.error("VITE_FORMSPREE_ENDPOINT is not configured.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const formData = new FormData(form);

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <>
      <section className="bg-dark pb-20 pt-32 text-white">
        <div className="container">
          <div className="status mb-6">
            <span className="status-dot" />
            {t("contactPage.availability")}
          </div>

          <p className="text-label text-brand-muted">
            {t("contactPage.eyebrow")}
          </p>

          <h1 className="text-display mt-4 max-w-4xl text-white">
            {t("contactPage.title")}
          </h1>

          <p className="text-large mt-6 max-w-2xl text-text-dark">
            {t("contactPage.description")}
          </p>
        </div>
      </section>

      <section className="section bg-app">
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-label text-brand">
              {t("contactPage.openTo.eyebrow")}
            </p>

            <h2 className="text-title mt-3 text-text">
              {t("contactPage.openTo.title")}
            </h2>

            <p className="text-large mt-5 text-text-muted">
              {t("contactPage.openTo.description")}
            </p>

            <div className="mt-8 space-y-4">
              {[
                t("contactPage.openTo.backend"),
                t("contactPage.openTo.automation"),
                t("contactPage.openTo.ai"),
                t("contactPage.openTo.opportunities"),
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-text-muted"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-border pt-8">
              <p className="text-label text-text-subtle">
                {t("contactPage.connect")}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
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
          </div>

          <div className="card rounded-3xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-medium text-text"
                >
                  {t("contactPage.form.name")}
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={t("contactPage.form.namePlaceholder")}
                  className="input"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-medium text-text"
                >
                  {t("contactPage.form.email")}
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={t("contactPage.form.emailPlaceholder")}
                  className="input"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-reason"
                  className="mb-2 block text-sm font-medium text-text"
                >
                  {t("contactPage.form.reason")}
                </label>

                <select
                  id="contact-reason"
                  name="reason"
                  required
                  defaultValue=""
                  className="input"
                >
                  <option value="" disabled>
                    {t("contactPage.form.reasonPlaceholder")}
                  </option>

                  {reasons.map((reason) => (
                    <option key={reason.value} value={reason.value}>
                      {reason.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-text"
                >
                  {t("contactPage.form.message")}
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={7}
                  required
                  placeholder={t("contactPage.form.messagePlaceholder")}
                  className="input resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn btn-primary w-full"
              >
                {status === "loading"
                  ? t("contactPage.form.sending")
                  : t("contactPage.form.submit")}

                {status !== "loading" && (
                  <span aria-hidden="true">→</span>
                )}
              </button>

              {status === "success" && (
                <p
                  role="status"
                  className="text-center text-sm font-medium text-success"
                >
                  {t("contactPage.form.success")}
                </p>
              )}

              {status === "error" && (
                <p
                  role="alert"
                  className="text-center text-sm font-medium text-red-600"
                >
                  {t("contactPage.form.error")}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}