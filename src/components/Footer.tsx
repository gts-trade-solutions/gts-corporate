import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { contact, footerEnquiryLinks, mailtoHref, navDestinations, site, teamsHref, whatsappHref } from "@/data/site";

/* Every destination in the nav except Home — the logo already links there.
   Flattened, so the pages inside a dropdown are reachable from the footer too.
   That is eighteen links, which is why the list below is laid out in two
   columns rather than one very tall one. */
const quickLinks = navDestinations.filter((item) => item.href !== "/");

export function Footer() {
  return (
    <footer className="border-t border-steel-200 bg-navy-900 text-navy-100">
      <Container className="pb-28 pt-14 md:pb-14 lg:py-16">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Logo inverted />
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-navy-100 sm:mt-5">
              {site.footerBlurb}
            </p>
          </div>

          <nav className="lg:col-span-3" aria-labelledby="footer-quick-links">
            <h2
              id="footer-quick-links"
              className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-500"
            >
              Quick Links
            </h2>
            <ul className="mt-4 grid gap-x-5 gap-y-0.5 text-[15px] sm:mt-5 sm:grid-cols-2">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-9 items-center text-navy-100 transition-all duration-200 hover:translate-x-0.5 hover:text-accent-500">
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
            <ul className="mt-4 space-y-0.5 text-[15px] sm:mt-5">
              {footerEnquiryLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="inline-flex min-h-9 items-center text-navy-100 transition-all duration-200 hover:translate-x-0.5 hover:text-accent-500">
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
            <address className="mt-4 space-y-1 text-[15px] not-italic leading-relaxed sm:mt-5">
              {contact.office.lines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </address>
            {/* Numbers are listed, not dialled — the site has no call action.
                The messaging channels below are what people are asked to use. */}
            <ul className="mt-5 space-y-1 text-[15px] text-navy-100">
              {contact.phones.map((phone) => (
                <li key={phone}>{phone}</li>
              ))}
            </ul>

            <ul className="mt-5 space-y-2 text-[15px]">
              {contact.email ? (
                <li>
                  <a
                    href={mailtoHref()}
                    className="inline-flex items-center gap-2 font-semibold transition-all duration-200 hover:translate-x-0.5 hover:text-accent-500"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                      <rect x="2.5" y="5" width="19" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                    {contact.email}
                  </a>
                </li>
              ) : null}
              {whatsappHref() ? (
                <li>
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold transition-all duration-200 hover:translate-x-0.5 hover:text-accent-500"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.23 8.23 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23Z" />
                    </svg>
                    WhatsApp
                  </a>
                </li>
              ) : null}
              {teamsHref() ? (
                <li>
                  <a
                    href={teamsHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold transition-all duration-200 hover:translate-x-0.5 hover:text-accent-500"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
                      <path d="M14.5 8.5h6A1.5 1.5 0 0 1 22 10v4.2a3.8 3.8 0 0 1-3.8 3.8h-.2a3.5 3.5 0 0 1-3.5-3.5v-6Zm3.25-5.25a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM10 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.5 9h11a.5.5 0 0 1 .5.5v6.2A5.3 5.3 0 0 1 8.7 21H8A6 6 0 0 1 2 15V9.5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                    Microsoft Teams
                  </a>
                </li>
              ) : null}
            </ul>
            <p className="mt-4 text-[13.5px] text-navy-100/80">{contact.businessHours}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:mt-12 sm:pt-7 text-[13.5px] text-navy-100 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/faq" className="transition-colors duration-200 hover:text-accent-500">
              FAQ
            </Link>
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
