import { Analytics } from "@/components/Analytics";
import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { PageTransition } from "@/components/PageTransition";
import { ScrollProgress } from "@/components/ScrollProgress";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

/** Chrome for the public site. `/admin` deliberately sits outside this group. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <FloatingActions />
      <Analytics />
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
    </>
  );
}
