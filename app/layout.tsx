import type { Metadata } from "next";
import { Inter, Fraunces, Source_Serif_4, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Nav from "@/components/Nav";
import { ViewProvider } from "@/context/ViewContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

/* Career view — OpenAI-style type: plain editorial serif for headlines,
   neutral grotesk for UI/body (closer to OpenAI Sans than Inter). */
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

const SITE_URL = "https://www.ayonikabose.com";
const HEADSHOT_URL = `${SITE_URL}/images/hero%20photo.jpeg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ayonika Bose — AI Applications Engineer at Sigma Computing",
  description:
    "Ayonika Bose — AI Applications Engineer at Sigma Computing. Building multi-agent AI applications on the modern data stack.",
  authors: [{ name: "Ayonika Bose" }],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Ayonika Bose — AI Applications Engineer",
    description:
      "AI Applications Engineer at Sigma Computing. Building multi-agent AI applications on Snowflake, dbt, and LLM APIs.",
    type: "website",
    url: SITE_URL,
    images: [HEADSHOT_URL],
  },
  twitter: {
    card: "summary",
    site: "@ayonikabose",
    title: "Ayonika Bose — AI Applications Engineer",
    description:
      "AI Applications Engineer at Sigma Computing. Building multi-agent AI apps on the modern data stack.",
    images: [HEADSHOT_URL],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ayonika Bose",
  alternateName: "Nika Bose",
  url: SITE_URL,
  image: HEADSHOT_URL,
  description:
    "AI Applications Engineer at Sigma Computing. Builds multi-agent AI applications on the modern data stack using Snowflake, dbt, and LLM APIs.",
  jobTitle: "AI Applications Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Sigma Computing",
    url: "https://www.sigmacomputing.com",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Minnesota Twin Cities",
    url: "https://twin-cities.umn.edu",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Multi-Agent AI Systems",
    "Business Intelligence",
    "Data Engineering",
    "Snowflake",
    "dbt",
    "Python",
    "SQL",
    "Marketing Analytics",
  ],
  sameAs: [
    "https://www.linkedin.com/in/ayonikabose99",
    "https://twitter.com/ayonikabose",
    "https://github.com/nikabosedata",
    "https://medium.com/@ayonikabose",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${sourceSerif.variable} ${interTight.variable} h-full`} data-view="career">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-sans)" }}>
        <ViewProvider>
          <Nav />
          <main className="flex-1 pt-14">{children}</main>
        </ViewProvider>
        <Analytics />
      </body>
    </html>
  );
}
