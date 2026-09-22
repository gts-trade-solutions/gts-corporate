/**
 * Renders a JSON-LD block. Content is built server-side from site data only.
 *
 * Every `<` is written as the JSON escape `\u003c` so no value can close the
 * script element early. The pattern needs a doubled backslash in source: a
 * single one makes `"\u003c"` a plain `<` again, which escapes nothing. A
 * data block's `type` also exempts it from React's warning about rendering
 * script tags.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
