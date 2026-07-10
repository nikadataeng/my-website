import type { Metadata } from "next";
import Footer from "@/components/Footer";

const SITE_URL = "https://www.ayonikabose.com";
const HEADSHOT_URL = `${SITE_URL}/images/hero%20photo.jpeg`;

const BIO_DESCRIPTION =
  "Ayonika Bose is an AI Applications Engineer at Sigma Computing, building multi-agent AI applications on the modern data stack.";

export const metadata: Metadata = {
  title: "About — Ayonika Bose",
  description: BIO_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About — Ayonika Bose",
    description: BIO_DESCRIPTION,
    type: "profile",
    url: `${SITE_URL}/about`,
    images: [HEADSHOT_URL],
  },
  twitter: {
    card: "summary",
    site: "@ayonikabose",
    title: "About — Ayonika Bose",
    description: BIO_DESCRIPTION,
    images: [HEADSHOT_URL],
  },
};

export default function AboutPage() {
  return (
    <>
      <article className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="max-w-3xl mx-auto">
          {/* Page heading */}
          <h1
            style={{
              fontFamily:
                "var(--font-serif)",
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 400,
              color: "var(--color-ink)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "2.5rem",
            }}
          >
            Ayonika Bose
          </h1>

          <p
            className="text-label mb-12"
            style={{ color: "var(--color-accent)" }}
          >
            AI Applications Engineer · Sigma Computing · San Francisco
          </p>

          {/* Third-person bio — SEO-primary */}
          <section
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: "var(--text-body)",
              color: "var(--color-ink)",
              lineHeight: 1.7,
            }}
          >
            <p className="mb-5">
              <strong>Ayonika Bose</strong> is an AI Applications Engineer at{" "}
              <strong>Sigma Computing</strong>, a cloud-native analytics and
              business intelligence platform based in San Francisco. She builds
              multi-agent AI applications on the modern data stack, working at
              the intersection of large language models, data engineering, and
              go-to-market strategy.
            </p>

            <p className="mb-5">
              At <strong>Sigma</strong>, Nika created the AI Applications
              Engineering function from scratch, transitioning from an Analytics
              Engineer role to design and ship production AI systems that serve
              sales, marketing, and executive teams. Her work includes{" "}
              <strong>Vantage</strong>, a warehouse-native CRM replacement built
              on <strong>Snowflake</strong> and <strong>dbt</strong> with
              AI-powered agents for deal coaching and risk analysis, as well as
              internal tools for automated deal celebrations, content
              amplification, and marketing attribution.
            </p>

            <p className="mb-5">
              Her technical stack spans Snowflake, dbt, Sigma Computing, Python,
              SQL, and LLM APIs. She has presented Sigma webinars on
              data-driven marketing strategy and contributed to company
              conference initiatives.
            </p>

            <p className="mb-5">
              Before Sigma, Nika worked as a Data Analyst and Product Manager at{" "}
              <strong>WITHIN Co.</strong> in New York, a Data Visualization
              Intern at <strong>Ovative Group</strong> in Minneapolis, and a
              Business Analyst Intern at <strong>Cisco</strong> in Singapore.
              She holds a degree from the{" "}
              <strong>University of Minnesota Twin Cities</strong>,{" "}
              <strong>Carlson School of Management</strong>, where she served
              as Chief of Information and Marketing for the MIS Club.
            </p>

            <p>
              Nika grew up between India and the United States. She is
              interested in applied AI, Vedic philosophy, space exploration, and
              writing fiction.
            </p>
          </section>

          {/* Divider */}
          <hr
            style={{
              border: "none",
              borderTop: "1px solid var(--color-border)",
              margin: "4rem 0",
            }}
          />

          {/* First-person section */}
          <section>
            <h2
              style={{
                fontFamily:
                  "var(--font-serif)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 400,
                color: "var(--color-ink)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                marginBottom: "2rem",
              }}
            >
              In my own words.
            </h2>

            <div
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: "var(--text-body)",
                color: "var(--color-ink)",
                lineHeight: 1.7,
              }}
            >
              <p className="mb-5">
                I went from building dashboards to building multi-agent AI
                systems, and I did it at the same company. Sigma gave me the
                space to define a role that didn&apos;t exist yet, and I ran
                with it.
              </p>

              <p className="mb-5">
                Most of my work lives at the intersection of &ldquo;how do we
                make AI actually useful for business teams&rdquo; and
                &ldquo;how do we build it on infrastructure we already
                trust.&rdquo; That means warehouse-native apps, not standalone
                SaaS. That means agents grounded in real data, not vibes.
              </p>

              <p>
                Outside of work, I&apos;m reading the Vedas, writing a novel,
                and trying to convince my two cats (Barfi and Kaju) that
                I&apos;m the most interesting thing in the apartment. So far,
                mixed results.
              </p>
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </>
  );
}
