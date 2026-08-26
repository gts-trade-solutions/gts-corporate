# GTS Trade Solutions — Website MVP

Production-ready MVP for the standalone GTS trade, automotive and engineering website.
Built to the *GTS Trade Solutions MVP Development Brief v1.0*: B2B, six primary navigation
items, SEO-ready, enquiry-driven, no e-commerce or CMS.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Nodemailer · Zod

---

## 1. Quick start

```bash
npm install
cp .env.example .env.local     # then edit .env.local
npm run dev                    # http://localhost:3000
```

Other scripts:

```bash
npm run build                  # production build
npm run start                  # serve the production build
npm run lint                   # eslint
```

---

## 2. Environment variables

All of these live in `.env.example`. Copy it to `.env.local` for development and set the
same values in your hosting provider's dashboard for production.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Public origin. Drives canonical tags, Open Graph URLs, `sitemap.xml` and `robots.txt`. **Read at build time** and baked into the prerendered pages — it must be present when `npm run build` runs, and you must rebuild after changing the domain. Setting it only at runtime has no effect. A trailing slash, a path, or a bare hostname (`example.com`) are all accepted and normalised. If it is unset, empty or malformed the build still succeeds and falls back to Vercel's domain, then `http://localhost:3000`, printing a warning either way. |
| `RFQ_TO_EMAIL` | **Yes** | Mailbox that receives enquiries. |
| `SMTP_HOST` | **Yes** | SMTP server for outgoing mail. |
| `SMTP_PORT` | No | Defaults to `587`. |
| `SMTP_USER` / `SMTP_PASSWORD` | No | Omit only if your relay allows unauthenticated sending. |
| `SMTP_SECURE` | No | Defaults to `true` on port 465, `false` otherwise. |
| `RFQ_FROM_EMAIL` | No | From address. Defaults to `SMTP_USER`. Use a domain you control. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Public enquiry address shown in header, footer and contact page. **Left blank by design** — see §7. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | Digits with country code, e.g. `919600122296`. Setting it enables the floating WhatsApp button; leaving it blank hides it. |
| `NEXT_PUBLIC_GA_ID` | No | GA4 measurement ID. The analytics script only loads when set. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Search Console HTML-tag token (the `content` value only). |

---

## 3. RFQ form & email

The enquiry form posts to `POST /api/rfq` ([src/app/api/rfq/route.ts](src/app/api/rfq/route.ts)).

**On a valid submission the route sends two emails:**

1. **Internal lead email** to `RFQ_TO_EMAIL` — all form fields, with `Reply-To` set to the
   enquirer so replying goes straight back to them. Attachments are included.
2. **Acknowledgement email** to the enquirer, summarising what they sent. This is
   best-effort: if it bounces, the lead email is still counted as delivered.

**Validation and spam protection** (all server-side, in addition to the browser checks):

- Zod schema shared by the client and the server ([src/lib/rfq.ts](src/lib/rfq.ts)).
- Honeypot field that only a bot would complete.
- Timing check — submissions completed in under 3 seconds are rejected.
- Rate limit of 5 submissions per IP per 10 minutes ([src/lib/rate-limit.ts](src/lib/rate-limit.ts)).
- Control characters stripped from every field, so a value cannot inject mail headers.

**File handling:** up to 3 files, 10 MB total. Both the extension *and* the reported MIME
type must be on the allow-list (PDF, DOC, DOCX, XLS, XLSX, JPG, PNG). Files are streamed
straight into the email — nothing is written to disk and nothing is served publicly.
Adjust the limits in [src/data/enquiry.ts](src/data/enquiry.ts).

**Behaviour when SMTP is not configured:**

- In development the enquiry is logged to the server console and the form reports success,
  so you can work on the UI without a mail server.
- In production the route returns a 503 and the form shows an error rather than silently
  swallowing a lead. **Configure SMTP before going live.**

Check configuration at any time: `GET /api/rfq` returns `{"ok":true,"mailerConfigured":true|false}`.

**Deployment note:** the in-memory rate limiter is per-instance. If you scale to multiple
instances, move it to a shared store (Redis/Upstash) or use your platform's rate limiting.
On Vercel, serverless request bodies are capped around 4.5 MB — either lower `upload.maxBytes`
to match, or deploy the route to a runtime without that cap.

---

## 4. Project structure

```
src/
  app/
    layout.tsx              Root layout, fonts, header/footer, Organization + WebSite JSON-LD
    page.tsx                Home
    import-export/          Import & Export
    automotive-parts/       Automotive Parts (search + category chips)
      [category]/           8 pre-rendered component detail pages
    vehicle-models/         Vehicle model schedule (filter by type × OEM + search)
      [slug]/               96 pre-rendered model pages with the component picker
    blog/                   Blog index
      [slug]/               6 pre-rendered posts
    manufacturing/          Manufacturing
    consulting/             Consulting
    odc-logistics/          ODC Logistics & heavy-lift transport
      route-survey/         Route Survey Reports
      reports/              Reports
    contact/                Contact / RFQ
    privacy/                Privacy notice
    api/rfq/route.ts        Enquiry endpoint
    sitemap.ts robots.ts    SEO files
    opengraph-image.tsx     Generated OG/Twitter card (no image asset needed)
    icon.svg not-found.tsx
  components/               Header, Hero, PageHero, ServiceCard, ProductCategoryCard,
                            FeatureSplit, CTASection, FAQ, RFQForm, CategoryFilter,
                            ModelFinder, PartsSelector, VehicleModelCard,
                            PostBody, PostCard, SectionNav, Reveal, Spotlight,
                            ScrollProgress, FloatingActions, Footer, Icon, Logo,
                            Analytics, JsonLd
  data/                     All copy and taxonomy (see below)
  lib/                      seo.ts, structured-data.ts, rfq.ts, mailer.ts, rate-limit.ts
```

Total: 128 prerendered pages plus the one dynamic route (`/api/rfq`).

---

## 5. Design & interaction system

Navy brand plus a single amber accent, strong dark text, no IT/cloud gradients and no
carousels. The palette is the brief's; the *use* of it is deliberately more assertive than
the brief describes — see §11. Depth comes from artwork, scale contrast and motion.

**Motion tokens** live in [globals.css](src/app/globals.css): one easing curve
(`--ease-out-industrial`) and three durations, so everything moves the same way.

### Artwork and the image system

**Every image slot on the site is declared in [src/data/media.ts](src/data/media.ts).** Until
a photograph is supplied, each slot renders generated scene artwork, so the site is complete
as it stands. To use a real photo: drop the file in `public/images/`, set `src` on the slot,
update `alt`. Nothing else changes — `<Media>` switches to `next/image` automatically, and
each slot carries a `brief` describing what the photograph should show.

**Eleven slots now carry real photography**, all on the ODC Logistics pages. Five came from the
client's RACE Innovations logistics pages; the six service photographs were supplied in the
client's brief and extracted from that PDF. All were converted to WebP and are rendered through
`next/image`, which serves AVIF/WebP at the right size per breakpoint. [MediaFigure](src/components/MediaFigure.tsx) wraps a slot with
the scrim and the spec-sheet plate caption, which is what keeps a photograph reading as part of
the technical system rather than as decoration.

The five taken from the RACE site are another company's assets — fine within the same group,
worth confirming if any came from a stock library. One of them showed RACE branding on the load
and was dropped once the client supplied an unbranded equivalent (`odcTransportation`). Every
slot has a `brief` noting what a GTS replacement should show.

#### Model catalogue photography

**The vehicle and component photographs are not `media.ts` slots.** They are addressed by slug,
so there is nothing to declare — `vehicleImage(item)` resolves to
`/images/vehicles/<slug>.webp` and every model in the schedule has one. The component photos
resolve the same way through `componentImage(name)` against `/images/components/`.

| | Count | Where | Weight |
| --- | --- | --- | --- |
| Vehicle photographs | 96, one per model | `public/images/vehicles/` | 2.6 MB total, ~28 KB each |
| Component photographs | 10, shared by 4 grids | `public/images/components/` | 37 KB total |

All are WebP on a white ground and rendered `object-contain`, never `cover` — these are cut-out
product shots, and cropping them lops the ends off the longer trucks.

They were extracted from the client's *GTS Vehicle Models & Components Catalogue*. Two things
about that source are worth knowing before anyone tries to re-derive them:

- **The catalogue's pages are screenshots.** Each of the 96 model pages is a single 1536×1024
  raster of a rendered page — heading, spec strip, vehicle shot and component grid all baked
  into one image. The vehicle photographs here were cropped out of that raster, so most are
  ~700×430 native. Good enough for the card and the hero plate at 1×; they will not stand up
  to a full-bleed treatment.
- **18 pages carry a separate overlay image** drawn on top of the screenshot, because the base
  page was a placeholder or carried a watermark. For those the overlay is the real photograph
  and the crop underneath is wrong, so they are sourced from the overlay instead. Nine of them
  are small — RE 4S Petrol (187×164) and the three TVS King three-wheelers are the worst — and
  are deliberately not upscaled to fill the frame; they sit smaller on the canvas rather than
  going mushy. **These nine are the ones to replace first** when OEM photography is available.

Five images had a caption or a source-site watermark burned into the bottom edge (Swift, Jimny
5-Door, S-Presso, Platina 100, HLX 150 5 Gear); those are trimmed off. If the client supplies a
corrected catalogue, re-check those five before assuming the trim is still needed.

**The scrim is tuned, not guessed.** `MediaScrim` darkens only the band the text sits in and
reaches transparent well before the far edge, so the photograph is untouched where nothing sits
on it. It carries no flat overlay — an earlier version washed 15% navy across the whole image,
which made every photograph look muddy. Two strengths: `soft` for a plate caption, the default
for a page `H1`, which is larger and sits higher up the image.

Measured worst-case contrast of white text against the *lightest* pixel behind it — not the
average, which is what makes a caption fail in one bright corner:

| | contrast | | | contrast |
| --- | --- | --- | --- | --- |
| ODC hero H1 | 5.60 | | Row 1 caption | 5.81 |
| Home hero H1 | 5.33 | | Row 3 caption | 8.75 |
| Full-bleed plate | 6.56 | | Home plates | 14.19 / 17.33 |

AA needs 4.5, so the tightest has ~18% margin. If you lighten the scrim further, re-measure
rather than eyeballing it: at one point in tuning these, two captions dropped to 3.77 and 4.14
while still looking perfectly readable in a screenshot.

Two kinds of artwork sit behind that:

- **Scenes** ([PortScene](src/components/illustrations/PortScene.tsx),
  [FabricationScene](src/components/illustrations/FabricationScene.tsx)) — flat layered
  silhouettes that can carry a full-bleed hero or an editorial plate.
- **Blueprints** ([TruckBlueprint](src/components/illustrations/TruckBlueprint.tsx),
  [AxleBlueprint](src/components/illustrations/AxleBlueprint.tsx)) — engineering side and
  front elevations with dimension lines, centre marks and figure captions.

This was a deliberate choice, and worth understanding before changing it:

- It is **honest**. A drawing of an axle claims nothing about equipment GTS owns, whereas
  stock photography of a factory floor implies a facility.
- It is **cheap and sharp**: ~4KB gzipped each, no image requests, perfect at any size,
  and it inherits the brand colours instead of fighting them.
- It is **on-brief**: the guidance says trade/automotive/industrial rather than IT/cloud,
  and a technical drawing is more distinctly engineering than any generic stock shot.

Each shape carries `pathLength="1"`, so the single `draw-line` keyframe stroke-draws the
whole figure regardless of real path length. Add a new drawing by following the same
pattern and pass it to `PageHero` via the `art` and `artLabel` props.

If real photography is supplied later, it should sit **alongside** these drawings — full-
bleed section imagery — rather than replacing them; the blueprints are what make the
pages look like an engineering firm rather than a template.

| Piece | What it does |
| --- | --- |
| [Reveal.tsx](src/components/Reveal.tsx) | Scroll-triggered fade/rise. One shared `IntersectionObserver` for the whole page; each element reveals once then stops being watched. |
| [ScrollProgress.tsx](src/components/ScrollProgress.tsx) | Accent progress bar across the top. Writes to the DOM inside `requestAnimationFrame` — scrolling never triggers a React render. |
| [SectionNav.tsx](src/components/SectionNav.tsx) | Sticky in-page nav with scroll-spy. See the two rules below. |
| [FloatingActions.tsx](src/components/FloatingActions.tsx) | Mobile quote/call bar, back-to-top, and the optional WhatsApp button — all revealed after ~520px of scroll. |
| [Spotlight.tsx](src/components/Spotlight.tsx) | Cursor-tracked highlight on dark bands. Mouse-only; flat without a pointer. |
| [FAQ.tsx](src/components/FAQ.tsx) | `<details>` accordion with an animated panel: opening grows the grid row, closing shrinks it before the attribute drops. |
| [CategoryFilter.tsx](src/components/CategoryFilter.tsx) | Vehicle-type chips **plus live search** across every category name, summary and product line. Combines with the chips, reports "Showing N of 8", supports arrow-key movement between chips, and its empty state doubles as a conversion prompt. |
| [ModelFinder.tsx](src/components/ModelFinder.tsx) | The same technique over two filter dimensions at once — vehicle type **and** OEM, each chip carrying its count — plus search across model name, segment, market and every part name. Reports "Showing N of 62". |
| [PartsSelector.tsx](src/components/PartsSelector.tsx) | The component picker on a model page. Ticking parts builds the enquiry URL; with nothing selected the CTA is a disabled `<button>` rather than a dead link. Selections are ordered by the schedule, not by click order, so the enquiry reads the same way as the page. |
| [PageTransition.tsx](src/components/PageTransition.tsx) | Fades client-side navigations in. Skipped on first render so LCP is never delayed. |
| [CopyButton.tsx](src/components/CopyButton.tsx) | Copy-to-clipboard on phone numbers and the email address, with inline confirmation. |
| `.stagger-item` / `.rule-draw` | CSS helpers that piggy-back on the nearest `[data-reveal]` so lists step in and accent rules draw themselves, with no extra JS. |
| `.corner-ticks` / `.index-mark` / `.sticky-heading` | Engineering-drawing corner brackets, spec-sheet section numbers (`01`, `02`…), and heading columns that stay put while their cards scroll past on wide screens. |

**Two things worth knowing about the search:** it matches against a `data-search`
attribute the page writes onto each card, so the cards stay server-rendered and every
product line remains in the HTML for crawlers. And when nothing matches, the empty state
links to `/contact?enquiry=component-sourcing&product=<query>` — the RFQ form reads that
`product` parameter and arrives pre-filled, so a failed search still becomes an enquiry.

### The model → enquiry hand-off

This is the one flow that spans several files, so it is worth reading before editing any of
them. A buyer ticks components on a model page and arrives at the RFQ form with the selection
already written up:

1. [PartsSelector](src/components/PartsSelector.tsx) holds the ticked parts and calls
   `enquiryHref(model, parts)` from [src/data/vehicle-models.ts](src/data/vehicle-models.ts).
2. That builds `/contact?enquiry=component-sourcing&product=…&application=…&model=…&parts=…#rfq`.
   `parts` is a comma-separated list; `model` is the slug, carried only so the form can link
   back.
3. [RFQForm](src/components/RFQForm.tsx) reads all four. `enquiry` selects the type, `product`
   and `application` fill their fields, and `parts` becomes both the ticked summary panel above
   the form and a drafted `message` the buyer can edit.

Two details that are load-bearing:

- **The seeded fields are keyed on the seed.** They are uncontrolled inputs, so `defaultValue`
  only applies on mount. Without the `key`, arriving from a *second* model page during the same
  client-side session would leave the first model's text in place. Nothing remounts while
  someone is typing, because the query string is not changing.
- **`model` is validated against a slug charset before it is used in a link.** It only ever
  becomes an internal path, and a value that does not match simply renders no link.

Adding another entry point to this flow means calling `enquiryHref` rather than assembling the
query by hand — that keeps the parameter names in one place.

**The RFQ form** shows a live completion meter and validates each field on blur, clearing
the error again as soon as the correction is typed. Validation messages come from the
browser's own constraint API mapped to our wording — the `required`, `minLength`,
`type` and `pattern` attributes on the inputs are the client-side rules, so no validation
library is shipped to the browser. [src/lib/rfq.ts](src/lib/rfq.ts) remains the source of
truth on the server.

**Two rules `SectionNav` depends on** — worth knowing before you edit an inner page:

1. **It must stay inside the `<div>` that wraps its sections.** A sticky element is
   constrained by its parent's box, so that wrapper is what makes the nav scroll away once
   the last section ends. Move the nav out of it and it stays pinned across the CTA band
   and footer.
2. **It pins to `var(--header-h)`, not a fixed offset.** The header measures itself with a
   `ResizeObserver` and publishes its height there; `globals.css` declares the default so
   the server-rendered page is correct before JS runs. Hard-coding the offset instead
   leaves a gap where page content bleeds between the header and the nav.

### The ODC Logistics pages follow a different layout

The three pages under `/odc-logistics` deliberately do **not** use the site's standard
`PageHero` + `SectionNav` + `Section` rhythm. They reproduce the layout of the client's RACE
Innovations logistics pages, at the client's request, in GTS's palette and type:

| Reference page | GTS page | Layout |
| --- | --- | --- |
| `/logistics` | `/odc-logistics` | Split hero — photo one side, dark panel with the service list and one accent CTA on the other; **eight** alternating image/text rows, one per service; the connect band |
| `/intellect/lbi` | `/odc-logistics/route-survey` | Split hero — title left, photo right; topic strip; intro row; "Key **Features**" with bullets left and photo right |
| `/lbi-reports` | `/odc-logistics/reports` | Centred hero with pill badge and two buttons; filter bar; report card grid |

The eight service rows are one array — `odcSections` — so adding or reordering a service is a
data edit. Each entry's `id` is both the row's anchor and the target of its entry in
`odcServiceList`, which drives the hero list; keep the two in step or a hero link goes nowhere.

The pieces live in [src/components/logistics/](src/components/logistics/):
[AlternatingRow](src/components/logistics/AlternatingRow.tsx) (the zig-zag row — the image is
first in the DOM and moved with `lg:order`, so the phone reading order is always heading → text
→ image), [TopicTabs](src/components/logistics/TopicTabs.tsx),
[ReportFinder](src/components/logistics/ReportFinder.tsx) and
[ConnectBand](src/components/logistics/ConnectBand.tsx). The section content is data in
`odcSections`, `routeSurveyIntro`, `routeSurveyKeyFeatures` and `reportListings`.

Two departures from the reference worth knowing. Body copy is justified as the reference sets
it, but with `hyphens: auto` and only from `sm` up — justified text without hyphenation opens
rivers of whitespace, and at phone width it is unreadable either way. And the report cards carry
**no price**: the reference sells fixed-price reports, whereas these are scoped per route, so
the card says "Scoped per route" and the button requests a quote. Give a listing its own
commercial fields to sell one off the shelf.

### The nav dropdowns, and the header fit budget

Two nav topics are dropdowns — see `primaryNav` in [src/data/site.ts](src/data/site.ts). Give an
item a `children` array and it becomes one; `panelTitle` is the full topic name shown as the
panel heading, while `label` is the shorter string the bar shows.

Three things about [Header.tsx](src/components/Header.tsx) are load-bearing:

1. **The trigger is a `<button>`, not a link.** On touch there is no hover, so a link would
   navigate before the panel could open. That is why the overview page is repeated as the first
   child — it is otherwise unreachable on a phone. It also matches the reference design.
2. **Longest match wins for the child's active state.** The overview href is a prefix of its
   siblings', so plain prefix matching lights up two items at once on `/odc-logistics/reports`.
   The parent still uses prefix matching, which is what keeps *Vehicle Models* marked on
   `/vehicle-models/<slug>`.
3. **The panel has no gap above it** — the `pt-2` belongs to the panel, not the trigger — so the
   pointer can travel from trigger to panel without crossing dead space and closing it.

**The fit budget.** The header row is a fixed 70px with a logo, the nav and the CTA button, and
the container caps at `max-w-7xl`, so *a wider viewport does not give the nav more room*. These
are measured, not estimated:

| | xl (1280–1535) | 2xl (1536+) |
| --- | --- | --- |
| Container inner width | 1216px | 1376px (header widens to `max-w-[1440px]`) |
| Logo | 172px (descriptor hidden) | 289px |
| Nav, 7 slots | 786px | 814px |
| CTA button | 179px | 179px |
| **Headroom** | **47px** | **46px** |

Four changes bought that headroom, and removing any one puts labels back to wrapping: Home
dropped from the desktop bar, item padding at `px-2`, the row gap tightened at `xl`, and the
logo descriptor hidden in the xl–2xl band. Nav items carry `shrink-0 whitespace-nowrap`
deliberately — if the budget is ever blown again the row will visibly overflow rather than
silently wrap two labels onto two lines, which is how the problem hid the first time.

**Before adding a ninth slot or a longer label, re-measure.** Roughly 47px is about four
characters. Adding a topic almost certainly means nesting it under an existing dropdown instead.

**The header must never change height on scroll.** It is a constant 70px, and this is
load-bearing: it sits in normal flow, so animating its height reflows the entire page and
content jerks around the threshold — scrolling 2px can throw the `H1` 24px. Only the drop shadow reacts to scroll, because a shadow costs no layout. If you add anything to the header,
keep it out of the flow (shadow, colour, opacity) or put it above the sticky element.

Three further rules the motion system holds to, all verified in the browser:

1. **Nothing is hidden without JavaScript.** The reveal styles are scoped to a `.js` class
   set by an inline script before first paint. No JS — or a crawler — sees every section
   fully visible, with no flash either way.
2. **`prefers-reduced-motion: reduce` removes all of it,** including the ambient hero grid
   drift and the keyword ticker.
3. **Nothing animates that would delay LCP.** Hero and page-hero `H1`s and lead paragraphs
   deliberately carry no entrance animation; only the surrounding furniture does. Measured
   CLS is 0.

To dial the motion down, raise the `--dur-*` tokens or drop the `<Reveal>` wrappers — the
markup renders identically without them.

## 6. Editing content

**No code changes are needed to add a category or product group.** Everything is data-driven:

| File | Controls |
| --- | --- |
| [src/data/site.ts](src/data/site.ts) | Brand strings, address, phone numbers, navigation, footer links |
| [src/data/home.ts](src/data/home.ts) | Home page sections and cards |
| [src/data/trade.ts](src/data/trade.ts) | Import & Export sections, vehicle categories, India partner module |
| [src/data/parts.ts](src/data/parts.ts) | Component categories, priority product groups, buyer types |
| [src/data/vehicle-models.ts](src/data/vehicle-models.ts) | The vehicle model schedule — model, OEM, type, markets and priority spare parts |
| [src/data/logistics.ts](src/data/logistics.ts) | ODC scope and cargo types, the alternating page sections, route survey intro and key features, survey obstructions, report contents and the report catalogue |
| [src/data/blog.ts](src/data/blog.ts) | Blog posts, authored as typed blocks (no MDX, no CMS) |
| [src/data/manufacturing.ts](src/data/manufacturing.ts) | Manufacturing scope and project stages |
| [src/data/consulting.ts](src/data/consulting.ts) | Fire & safety, CV service, homologation blocks, regulatory note |
| [src/data/faqs.ts](src/data/faqs.ts) | FAQs — 20 per service page plus 6 on Vehicle Models (also feed the FAQPage structured data) |
| [src/data/enquiry.ts](src/data/enquiry.ts) | Enquiry types, conditional fields, upload rules |
| [src/lib/seo.ts](src/lib/seo.ts) | Per-page title, meta description and keyword cluster |

Adding a new component category is a matter of appending one object to `partCategories` —
the chips, the cards, the structured data and the sitemap-adjacent copy all follow.

The same holds for the two data-driven sections added after the MVP:

- **A vehicle model** is one object appended to `vehicleModels`, plus its photograph dropped at
  `public/images/vehicles/<slug>.webp`. Its page, its entry in the filters and the OEM chips,
  its `Product` structured data, the coverage figures on the index and its sitemap entry all
  derive from the object. Slugs are written out rather than generated, so a URL never changes
  because a model name was edited. `segment` and `parts` are transcribed from the client's
  model catalogue — the vehicle type and the "Priority Spare Parts / Components" line, split on
  its semicolons — so edit them against that document rather than rewriting in place;
  `partsNote` carries the catalogue's body-type qualifier verbatim where there is one
  (tippers, tractor heads, the Magnite turbo).
- **A blog post** is one object appended to `blogPosts`, with its body as `heading` /
  `paragraph` / `list` / `note` blocks. There is deliberately no markdown parser in the
  bundle and no way for raw HTML to reach the page. Keep `publishedAt` as ISO `YYYY-MM-DD`;
  it drives both the displayed date and `datePublished`.

**The four service FAQ sets are client-supplied copy.** `tradeFaqs`, `partsFaqs`,
`manufacturingFaqs` and `consultingFaqs` carry 20 questions each, mapped to the keyword
clusters, and they are also the `FAQPage` structured data for their page — so editing one
changes what search engines see. Edit them against the client's source document rather than
rewriting in place. Each set is used in exactly one page (the accordion and the schema both
read the same array), and the FAQ heading on each page prints `array.length`, so a count never
goes stale. `modelFaqs` is ours, not client-supplied, and covers `/vehicle-models`.

Questions must stay unique within a set — the accordion keys on the question text.

Icons come from an inline set in [src/components/Icon.tsx](src/components/Icon.tsx); add a
path there and reference it by name.

---

## 7. Before you go live

These items need input that is not in the brief — the site is built so that each one is a
single edit, and nothing is invented in the meantime.

1. **Logo.** [src/components/Logo.tsx](src/components/Logo.tsx) renders a typographic
   wordmark as a placeholder. Drop the official file into `public/` and swap the mark for
   `next/image` (the header allows 40px height).
2. **Public email address.** Deliberately blank. Set `NEXT_PUBLIC_CONTACT_EMAIL` and it
   appears in the header bar, footer, contact page and Organization JSON-LD.
3. **WhatsApp number.** The floating button is off until `NEXT_PUBLIC_WHATSAPP_NUMBER` is set.
4. **Photography.** The ODC Logistics pages carry real photographs and every other `media.ts`
   slot still renders its generated scene artwork, so nothing is missing (see *Artwork* in §5).
   Confirm the licence on the ones in use — they came from the RACE Innovations site, and one
   showed RACE branding on the load. For the remaining slots, supply WebP/AVIF via `next/image`
   as full-bleed section imagery alongside the drawings. Do not substitute generic IT/cloud stock.
5. **Model catalogue photographs.** The 96 vehicle shots came out of the client's catalogue,
   whose model pages are screenshots — so they are ~700×430 native at best, and nine are
   materially smaller (listed in §5). They carry no visible source attribution, but they are
   OEM product photography that reached us second-hand: **confirm the client has the right to
   publish them** before launch, and replace the nine small ones from OEM or authorised
   distributor material. The component photographs are stock-style part shots from the same
   document and want the same check.
6. **Contact details.** Address and phone numbers are the ones published on the existing
   GTS reference page. Confirm or replace them in `src/data/site.ts`.
7. **Privacy notice.** [src/app/privacy/page.tsx](src/app/privacy/page.tsx) is a factual
   starting point covering what the form actually does. Have it reviewed against your
   retention policy and applicable law before launch.
8. **Keyword validation.** The clusters in `src/lib/seo.ts` come from the brief. Validate
   volumes in Google Ads Keyword Planner / Search Console before final launch.

---

## 8. SEO implemented

- Unique title, meta description, canonical URL, H1 and commercial CTA per page.
- Keyword clusters mapped per page from section 11 of the brief, used naturally in
  headings and body copy rather than repeated.
- `sitemap.xml` and `robots.txt` generated from `NEXT_PUBLIC_SITE_URL`.
- Open Graph and Twitter cards, backed by a generated 1200×630 branded image.
- Structured data: `Organization` and `WebSite` site-wide; `Service` and `BreadcrumbList`
  per page; `FAQPage` on Import & Export, Automotive Parts, Manufacturing and Consulting
  (20 questions each), on the three ODC Logistics pages and on Vehicle Models; `ItemList` on
  the Vehicle Models and Blog indexes; `Product` with an
  `OfferCatalog` of parts on each model page; `Blog` plus `BlogPosting` on the blog.
- Internal linking: automotive parts → vehicle models → manufacturing → homologation → contact,
  with the blog linking into all of them.
- Long-tail depth: 8 component category pages, 62 model pages (`<model> spare parts`) and 6
  posts, none of which add a top-level navigation item.
- All content is server-rendered. Both filters only toggle visibility, so every category, every
  model and every part name stays in the HTML for crawlers and for users without JavaScript.
  The `/vehicle-models` index is 684 KB of HTML but under 40 KB gzipped — the repetition
  compresses away, so it ships lighter than the home page.

Accessibility and performance: semantic headings, labelled form controls, keyboard-visible
focus rings, a skip link, `<details>`-based FAQs that work without JavaScript, and no
carousels, sliders or third-party scripts beyond optional GA4.

---

## 9. Deployment

The site builds to fully static pages plus one dynamic route (`/api/rfq`).

**Vercel (recommended)**

1. Push the repository to GitHub/GitLab and import it in Vercel.
2. Framework preset: Next.js. Build `npm run build`, output handled automatically.
3. Add every variable from §2 under *Settings → Environment Variables* (Production and
   Preview). `NEXT_PUBLIC_SITE_URL` must be the final public domain.
4. Add the custom domain, then redeploy so the new `NEXT_PUBLIC_SITE_URL` is baked in.

**Any Node host (VPS, Render, Railway, Docker)**

```bash
npm ci
npm run build
npm run start        # serves on $PORT, default 3000
```

Run it behind a reverse proxy that terminates TLS and forwards `X-Forwarded-For` (the rate
limiter uses it).

**After the first deploy**

1. Visit `/api/rfq` and confirm `mailerConfigured: true`.
2. Send a live test enquiry with an attachment and confirm both emails arrive.
3. Submit `https://your-domain/sitemap.xml` in Google Search Console.
4. Verify the property using `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, and add `NEXT_PUBLIC_GA_ID`.
5. Test the OG card at `https://your-domain/opengraph-image`.

---

## 10. Out of scope for the MVP

Per the brief: no e-commerce or checkout, no user accounts or dealer portal, no CMS, no
live inventory or pricing, and no multi-language. The content layer is structured so
translations can be added later without redesigning pages.

---

## 11. Deliberate divergences from the brief

Two things depart from the written brief, both at the client's explicit request. They are
recorded here so nobody "fixes" them by accident.

1. **The design is no longer predominantly white.** The brief asks for a mostly-white site
   with one or two accent colours. The home page now opens with a full-bleed dark hero and
   carries a full-colour amber band for the India Partner module. The palette itself is
   unchanged — still navy plus a single amber — but it is used far more assertively.
2. **The site is larger than six pages.** The brief's six-page structure is intact and the
   header still carries **exactly six primary navigation items**, which is the actual
   acceptance criterion. The eight component detail pages sit *below* Automotive Parts as
   long-tail SEO depth and are reachable from the category cards, not from the nav.

3. **The nav is no longer six flat items — it is eight slots, two of which are dropdowns.**
   ODC Logistics & Route Survey and the Vehicle Models / Blog pair were added after the MVP.
   Grouping them under dropdown parents is what keeps the bar to eight slots while covering
   eleven destinations, and it follows the pattern the client asked for.

   **Home is deliberately absent from the desktop bar.** The logo is the home link and carries
   `aria-label="GTS Trade Solutions — home"`. Home is still the first item in the mobile menu.
   This was not a style choice — see the fit budget in §5, which is why it had to go.

Everything else — the compliance guardrails, the "support/coordinate/facilitate" wording,
no invented certifications, clients or capacity — is unchanged and still enforced.
