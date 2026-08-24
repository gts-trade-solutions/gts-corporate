import { ButtonLink } from "../Button";
import { Container } from "../Container";

/**
 * The dark "connect" strip that closes each ODC page — a single dark bar with
 * the line on the left and one button hard right, matching the reference
 * layout. Deliberately lighter than `CTASection`, which is the site's larger
 * two-column conversion band.
 */
export function ConnectBand({
  title = "Connect with us for tailored transport solutions",
  cta = { label: "For More Enquiries", href: "/contact?enquiry=odc-logistics#rfq" },
}: {
  title?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="bg-white py-14 sm:py-16">
      <Container>
        <div className="bg-grain flex flex-col gap-5 rounded-sm bg-navy-900 px-6 py-6 sm:px-8 md:flex-row md:items-center md:justify-between md:gap-8">
          <h2 className="font-display text-[20px] font-bold leading-snug text-white sm:text-[24px]">
            {title}
          </h2>
          <ButtonLink href={cta.href} variant="light" size="lg" className="shrink-0" withArrow>
            {cta.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
