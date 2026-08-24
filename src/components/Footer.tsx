import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { contact, footerEnquiryLinks, navDestinations, site, telHref } from "@/data/site";

/* Every destination in the nav except Home — the logo already links there.
   Flattened, so the pages inside a dropdown are reachable from the footer too. */
const quickLinks = navDestinations.filter((item) => item.href !== "/");

export function Footer() {
  return (
    <footer className="border-t border-steel-200 bg-navy-900 text-navy-100">
      <Container className="pb-28 pt-14 md:pb-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo inverted />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-navy-100">
              {site.footerBlurb}
            </p>
          </div>

          <nav className="lg:col-span-2" aria-labelledby="footer-quick-links">
            <h2
              id="footer-quick-links"
              className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-500"
            >
              Quick Links
            </h2>
            <ul className="mt-5 space-y-3 text-[15px]">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-block text-navy-100 transition-all duration-200 hover:translate-x-0.5 hover:text-accent-500">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-labelledby="footer-enquiry-links">
            <h2
              id="footer-enquiry-links"
              className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-500"
            >
              Enquiries
            </h2>
            <ul className="mt-5 space-y-3 text-[15px]">
              {footerEnquiryLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="inline-block text-navy-100 transition-all duration-200 hover:translate-x-0.5 hover:text-accent-500">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-500">
              {contact.office.label}
            </h2>
            <address className="mt-5 space-y-1 text-[15px] not-italic leading-relaxed">
              {contact.office.lines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </address>
            <ul className="mt-5 space-y-2 text-[15px]">
              {contact.phones.map((phone) => (
                <li key={phone}>
                  <a href={telHref(phone)} className="inline-block transition-all duration-200 hover:translate-x-0.5 hover:text-accent-500">
                    {phone}
                  </a>
                </li>
              ))}
              {contact.email ? (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-block transition-all duration-200 hover:translate-x-0.5 hover:text-accent-500"
                  >
                    {contact.email}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-[13.5px] text-navy-100 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition-colors duration-200 hover:text-accent-500">
              Privacy Policy
            </Link>
            <Link href="/contact" className="transition-colors duration-200 hover:text-accent-500">
              Request a Quote
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
