import Link from "next/link";

const navLinks = [
  { href: "/#work",  label: "work"  },
  { href: "/blog",   label: "blog"  },
  { href: "/about",  label: "about" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-12 lg:px-20 py-8">
      <div
        className="max-w-6xl mx-auto"
        style={{ borderTop: "1px solid var(--color-border)", paddingTop: "2rem" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Name + year */}
          <span
            className="text-label"
            style={{ color: "var(--color-muted)" }}
          >
            ayonika · {year}
          </span>

          {/* Nav links */}
          <nav className="flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="link-underline text-label"
                style={{ color: "var(--color-muted)" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* LinkedIn + CTA */}
          <div className="flex items-center gap-4">
            <Link
              href="https://www.linkedin.com/in/ayonikabose/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="linkedin-icon"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </Link>
            <Link
              href="mailto:hello@ayonika.dev"
              className="text-label font-bold"
              style={{ color: "var(--color-accent)" }}
            >
              say hello →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
