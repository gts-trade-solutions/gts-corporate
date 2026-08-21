import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Section";
import { primaryNav } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="py-20 sm:py-28">
      <div className="max-w-2xl">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-4 text-[34px] font-bold leading-tight text-ink sm:text-[42px]">
          We could not find that page
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
          The page may have moved, or the address may be mistyped. Use the links below, or send us
          your requirement directly.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" size="lg">
            Request a Quote
          </ButtonLink>
          <ButtonLink href="/" variant="outline" size="lg">
            Back to home
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-sm border border-steel-200 bg-steel-200 sm:grid-cols-2">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block bg-white px-5 py-4 text-[15px] font-semibold text-ink transition-colors hover:text-navy-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
