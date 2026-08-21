import Script from "next/script";

/**
 * GA4, loaded only when NEXT_PUBLIC_GA_ID is set. Keeping it behind an env
 * var means no third-party script runs in development or before the property
 * is created. Search Console verification is handled in the root metadata.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
