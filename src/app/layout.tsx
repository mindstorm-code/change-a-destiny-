import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

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

export const metadata: Metadata = {
  // Swap for the real production domain before launch — needed for social
  // preview images to resolve to absolute URLs.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3220"),
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
      </body>
    </html>
  );
}
