import Link from "next/link";
import CalendlyButton from "./CalendlyButton";

const navLinks = [
  { href: "/#work",  label: "work"  },
  { href: "/blog",   label: "blog"  },
  { href: "/about",  label: "about" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-12 lg:px-20">
      {/* Contact section */}
      <div
        className="max-w-6xl mx-auto py-24 md:py-32"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <h2
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 400,
            color: "var(--color-ink)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
          }}
        >
          Say hello.
        </h2>
        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="mailto:ayonikabose99@gmail.com"
            className="link-underline"
            style={{
              fontSize: "clamp(16px, 1.5vw, 20px)",
              fontWeight: 500,
              color: "var(--color-accent)",
            }}
          >
            ayonikabose99@gmail.com →
          </Link>
          <Link
            href="https://www.linkedin.com/in/ayonikabose/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
            style={{
              fontSize: "clamp(16px, 1.5vw, 20px)",
              fontWeight: 500,
              color: "var(--color-muted)",
            }}
          >
            LinkedIn
          </Link>
          <CalendlyButton />
        </div>
      </div>

      {/* Minimal footer line */}
      <div
        className="max-w-6xl mx-auto pb-8"
        style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-label" style={{ color: "var(--color-muted)" }}>
            ayonika · {year}
          </span>
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
        </div>
      </div>
    </footer>
  );
}
