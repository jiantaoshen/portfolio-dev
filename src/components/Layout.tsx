import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import githubIcon from "../assets/Github.svg";
import linkedinIcon from "../assets/Linkedin.svg";
import { Mail } from "lucide-react";

import LanguageSwitcher from "./LanguageSwitcher";

export default function Layout() {
  const { t } = useTranslation("common");

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link nav-active" : "nav-link";

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-mobile ${isActive ? "text-white" : "text-text-dark"}`;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.08] bg-dark-muted/85 backdrop-blur-xl">
        <nav className="container flex h-20 items-center justify-between">
          <NavLink
            to="/"
            onClick={closeMenu}
            className="inline-flex items-center rounded-lg px-1 py-1 text-xl font-extrabold tracking-tight"
          >
            <span className="!text-white">JIANTAO</span>
            <span className="text-brand-muted">.dev</span>
          </NavLink>

          <div className="hidden items-center gap-7 md:flex">
            <NavLink to="/projects" className={navLinkClass}>
              {t("nav.projects")}
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              {t("nav.about")}
            </NavLink>

            <NavLink to="/blog" className={navLinkClass}>
              {t("nav.blog")}
            </NavLink>

            <a
              href="mailto:jiantaos98@outlook.com"
              className="btn btn-primary !px-4 !py-2.5"
            >
              {t("nav.contact")}
            </a>

            <LanguageSwitcher />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            className="menu-button"
          >
            {menuOpen ? (
              <span className="text-xl leading-none">×</span>
            ) : (
              <span className="flex flex-col gap-1.5">
                <span className="h-0.5 w-5 rounded-full bg-white" />
                <span className="h-0.5 w-5 rounded-full bg-white" />
                <span className="h-0.5 w-5 rounded-full bg-white" />
              </span>
            )}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/10 bg-dark/98 backdrop-blur-xl md:hidden">
            <div className="container flex flex-col py-4">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {t("nav.home")}
              </NavLink>

              <NavLink
                to="/projects"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {t("nav.projects")}
              </NavLink>

              <NavLink
                to="/about"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {t("nav.about")}
              </NavLink>

              <NavLink
                to="/blog"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {t("nav.blog")}
              </NavLink>

              <div className="mt-5 flex flex-col gap-3">
                <LanguageSwitcher />

                <a
                  href="mailto:jiantaos98@outlook.com"
                  className="btn btn-primary justify-center"
                  onClick={closeMenu}
                >
                  {t("nav.contact")}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-white/[0.06] bg-dark text-text-dark">
        <div className="container flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/jiantaoshen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition duration-200 hover:opacity-100"
            >
              <img
                src={githubIcon}
                className="h-7 w-7 object-contain opacity-70"
              />
            </a>

            <a
              href="https://www.linkedin.com/in/jiantaoshen/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition duration-200 hover:opacity-100"
            >
              <img
                src={linkedinIcon}
                className="h-7 w-7 object-contain opacity-70"
              />
            </a>

            <a
              href="mailto:jiantaos98@outlook.com"
              aria-label="Email"
              className="text-white/70 transition-colors hover:text-white"
            >
              <Mail className="h-7 w-7" />
            </a>
          </div>

          <p className="text-sm text-text-dark-muted">
            © {new Date().getFullYear()} JIANTAO. {t("rights")}
          </p>
        </div>
      </footer>
    </div>
  );
}