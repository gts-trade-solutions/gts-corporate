import Link from "next/link";
import { Container } from "./Container";
import { Icon, type IconName } from "./Icon";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Section";
import { contact, mailtoHref, teamsHref, whatsappHref } from "@/data/site";

/**
 * "Talk to an expert" band.
 *
 * Four routes to a person, in the order they are actually useful: the enquiry
 * form (the only one that reaches a quoting desk with the specification
 * attached), WhatsApp, Teams and email. The messaging channels are conditional
 * — an unset environment variable drops that card rather than rendering a dead
 * one — so the band is never a grid of broken links.
 *
 * Deliberately not a call band. There is no tel: link anywhere on this site.
 */

type Route = {
  title: string;
  description: string;
  icon: IconName;
  href: string;
  action: string;
  external?: boolean;
  featured?: boolean;
};

const EXPERT_MESSAGE =
  "Hello GTS Trade Solutions, I would like to speak to someone about a requirement.";

export function TalkToExpert({
  title = "Talk to an expert",
  lead = "Sourcing, specification, homologation, fabrication or a route survey — you reach the people who do the work, not a call centre.",
}: {
  title?: string;
  lead?: string;
}) {
  const whatsapp = whatsappHref(EXPERT_MESSAGE);
  const teams = teamsHref();
  const email = mailtoHref("Enquiry from the GTS website");

  const routes: Route[] = [
    {
      title: "Send your requirement",
      description:
        "The fastest route to a quotation. Attach the drawing, specification or RFQ and it goes straight to the desk that prices it.",
      icon: "clipboard",
      href: "/contact#rfq",
      action: "Open the enquiry form",
      featured: true,
    },
  ];

  if (whatsapp) {
    routes.push({
      title: "WhatsApp",
      description:
        "Quick questions, part identification and photographs. Useful when you have the component in front of you but not the number.",
      icon: "handshake",
      href: whatsapp,
      action: "Start a chat",
      external: true,
    });
  }

  if (teams) {
    routes.push({
      title: "Microsoft Teams",
      description:
        "For corporate buyers and procurement teams who would rather put a meeting in the calendar than exchange messages.",
      icon: "target",
      href: teams,
      action: "Message on Teams",
      external: true,
    });
  }

  if (email) {
    routes.push({
      title: "Email",
      description:
        "Long specifications, tender documents and anything with a paper trail. Replies come from the person handling the enquiry.",
      icon: "article",
      href: email,
      action: contact.email,
      external: true,
    });
  }

  return (
    <section className="bg-white py-11 sm:py-14 lg:py-16">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>Talk To Us</Eyebrow>
            <h2 className="mt-3 text-[clamp(1.45rem,2.6vw,2.1rem)] font-bold leading-tight tracking-[-0.02em] text-ink sm:mt-4">
              {title}
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft sm:mt-4 sm:text-[16px]">
              {lead}
            </p>
          </div>
        </Reveal>

        <Reveal>
          {/*
            On a phone these become rows rather than cards — the descriptions
            are the bulk of the height and they are not what anyone reads here,
            so below sm they are dropped and the card collapses to an icon, a
            channel name and the action.
          */}
          <ul className="mt-6 grid gap-px overflow-hidden rounded-sm border border-steel-200 bg-steel-200 sm:mt-9 sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent lg:grid-cols-4">
            {routes.map((route) => {
              const Wrapper = route.external ? "a" : Link;
              return (
                <li key={route.title}>
                  <Wrapper
                    href={route.href}
                    {...(route.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`keyline group flex h-full items-center gap-3.5 border-0 p-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:flex-col sm:items-stretch sm:rounded-sm sm:border sm:p-6 sm:hover:-translate-y-1 sm:hover:shadow-lift ${
                      route.featured
                        ? "bg-accent-50/40 sm:border-accent-600 sm:hover:border-accent-700"
                        : "bg-white sm:border-steel-200 sm:hover:border-navy-200"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 sm:h-11 sm:w-11 ${
                        route.featured
                          ? "bg-accent-700 text-white"
                          : "bg-navy-50 text-navy-700 group-hover:bg-navy-800 group-hover:text-white"
                      }`}
                    >
                      <Icon name={route.icon} className="h-5 w-5 sm:h-[21px] sm:w-[21px]" />
                    </span>
                    <span className="min-w-0 flex-1 sm:flex sm:flex-1 sm:flex-col">
                      <span className="block text-[16px] font-bold text-ink sm:mt-4 sm:text-[17px]">
                        {route.title}
                      </span>
                      <span className="mt-1.5 hidden flex-1 text-[14.5px] leading-relaxed text-ink-soft sm:mt-2 sm:block">
                        {route.description}
                      </span>
                      <span className="mt-0.5 inline-flex items-center gap-1.5 break-all text-[13.5px] font-semibold text-accent-700 sm:mt-5 sm:text-[14px]">
                        {route.action}
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </span>
                    </span>
                  </Wrapper>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <p className="mt-5 text-[13px] text-ink-muted sm:mt-7 sm:text-[13.5px]">
          {contact.businessHours}. Enquiries sent outside those hours are answered the next working
          day.
        </p>
      </Container>
    </section>
  );
}
