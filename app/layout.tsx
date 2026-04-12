import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_Display, Cormorant_Garamond } from "next/font/google";
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const notoDisplay = Noto_Sans_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-noto-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ayonika — AI Applications Engineer at Sigma Computing",
  description:
    "I turn 'we should use AI' into systems people use every day. CRM replacement, multi-agent deal intelligence, automated GTM workflows.",
  openGraph: {
    title: "ayonika — AI Applications Engineer at Sigma Computing",
    description:
      "I turn 'we should use AI' into systems people use every day. CRM replacement, multi-agent deal intelligence, automated GTM workflows.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${notoDisplay.variable} h-full`} data-view="career">
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        <ViewProvider>
          <Nav />
          <main className="flex-1 pt-14">{children}</main>
        </ViewProvider>
        <Analytics />
      </body>
    </html>
  );
}
