import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ayonika — I build AI Apps",
  description:
    "AI Applications Engineer at Sigma Computing. Warehouse-native AI · GTM & Finance automation · Snowflake Cortex.",
  openGraph: {
    title: "ayonika — I build AI Apps",
    description:
      "AI Applications Engineer at Sigma Computing. Warehouse-native AI · GTM & Finance automation · Snowflake Cortex.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        <Nav />
        <main className="flex-1 pt-14">{children}</main>
      </body>
    </html>
  );
}
