import { ButtonLink } from "./Button";
import { Container } from "./Container";
import { Eyebrow } from "./Section";
import { Reveal } from "./Reveal";
import { Spotlight } from "./Spotlight";
import { primaryContactAction } from "@/data/site";

/** Conversion band reused at the foot of every page. */
export function CTASection({
  eyebrow = "Send Us Your Requirement",
  title,
  lead,
  primaryCta = { label: "Request a Quote", href: "/contact" },
  secondaryCta = { label: "Discuss Your Requirement", href: "/contact" },
}: {
  eyebrow?: string;
  title: string;
  lead: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  const talk = primaryContactAction();

  return (
    <Spotlight className="bg-navy-800 bg-blueprint text-white">
      <Container className="py-11 sm:py-14 lg:py-20">
        <Reveal>
          <div className="grid gap-7 sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
              <Eyebrow inverted>{eyebrow}</Eyebrow>
              <h2 className="mt-3 text-[26px] font-bold leading-tight text-white sm:mt-4 sm:text-[34px] lg:text-[38px]">
                {title}
              </h2>
              <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-navy-100 sm:mt-4 sm:text-[17px]">{lead}</p>
            </div>

            <div className="lg:col-span-5">
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <ButtonLink
                  href={primaryCta.href}
                  size="lg"
                  withArrow
                  className="sm:flex-1 lg:flex-none"
                >
                  {primaryCta.label}
                </ButtonLink>
                <ButtonLink
                  href={secondaryCta.href}
                  variant="outlineLight"
                  size="lg"
                  className="sm:flex-1 lg:flex-none"
                >
                  {secondaryCta.label}
                </ButtonLink>
              </div>
              {/* Was a phone number. WhatsApp is the staffed channel now, and
                  the helper falls back to email or the form when no number is
                  configured, so this line can never become a dead link. */}
              <p className="mt-5 text-[14px] text-navy-100">
                Prefer to talk?{" "}
                <a
                  href={talk.href}
                  {...(talk.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="font-semibold text-white underline decoration-accent-500 underline-offset-4 transition-colors duration-200 hover:text-accent-500"
                >
                  {talk.label}
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Spotlight>
  );
}
