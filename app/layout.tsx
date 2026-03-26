import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { ViewProvider } from "@/context/ViewContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ayonika — I build AI systems that replace SaaS",
  description:
    "AI Applications Engineer at Sigma Computing. Warehouse-native AI · GTM & RevOps automation · Snowflake Cortex.",
  openGraph: {
    title: "ayonika — I build AI systems that replace SaaS",
    description:
      "AI Applications Engineer at Sigma Computing. Warehouse-native AI · GTM & RevOps automation · Snowflake Cortex.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`} data-view="career">
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        <ViewProvider>
          <Nav />
          <main className="flex-1 pt-14">{children}</main>
        </ViewProvider>
      </body>
    </html>
  );
}
