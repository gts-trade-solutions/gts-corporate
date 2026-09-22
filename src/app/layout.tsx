import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "@/data/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Import Export Company & Automotive Parts Supplier | GTS Trade Solutions",
    template: `%s | ${site.name}`,
  },
  description: site.supportingLine,
  applicationName: site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  /*
    The site publishes no call action — WhatsApp, email and the enquiry form
    are the routes. Left on, iOS Safari turns every printed office number into
    a tap-to-dial link by itself, which would put the Call option back on the
    one platform where it was never removed.
  */
  formatDetection: { telephone: false },
};

/**
 * Document shell only — fonts, global metadata and the skip link.
 *
 * The public site's chrome (header, footer, scroll progress, analytics) lives
 * in `(site)/layout.tsx` so that `/admin` can render its own chrome instead of
 * inheriting the marketing navigation. Both layouts provide an `#main` target
 * for the skip link below.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /*
      suppressHydrationWarning: browser extensions (translators, dark-mode and
      password tools) write attributes onto <html> before React hydrates, which
      is not a bug in the page. Scoped to this element's own attributes only.

      There is deliberately no inline <script> here. Scroll-reveal hides content
      only under `@media (scripting: enabled)` in globals.css, so no-JS visitors
      and crawlers see everything without a script to set a class first.
    */
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-sm focus:bg-navy-800 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
