import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { LeadCapturePopup } from "@/components/LeadCapturePopup";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Bold condensed display face — matches the real book cover's rugged,
// heavy-weight wordmark far better than an elegant literary serif does.
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const title = "The Path: Transformative Living | Judah Becker";
const description =
  "A framework where clinical counseling and Hebrew-rooted faith meet — the book, the Founding Cohort course, and the mission it points toward.";

/**
 * Absolute base the relative `images` below are resolved against.
 *
 * This shipped as a bare `http://localhost:3220` fallback, and production used
 * it — the project had no environment variables set at all — so every social
 * share of this page carried an `og:image` pointing at a developer's laptop.
 * Nothing fails when that is wrong: the build passes, the page renders, and the
 * broken preview is invisible unless somebody actually shares the link.
 *
 * So the fallback is now a chain that lands somewhere real on its own.
 * `VERCEL_PROJECT_PRODUCTION_URL` is supplied automatically on every Vercel
 * deployment (this project has System Environment Variables enabled), which
 * means a fresh deploy is correct without anyone remembering to set a variable.
 * `NEXT_PUBLIC_SITE_URL` still wins when set, so the canonical domain can be
 * pinned; localhost remains only as the local-development case it was always
 * meant to be.
 */
function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3220";
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable} antialiased`}>
        <NavBar />
        {children}
        <Footer />
        <LeadCapturePopup />
      </body>
    </html>
  );
}
