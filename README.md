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
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | Digits with country code, e.g. `919600122296`. WhatsApp is the site's primary conversational channel — every former Call action routes to it. Blank, those CTAs fall back to email, then the enquiry form. |
| `NEXT_PUBLIC_TEAMS_ID` | No | Microsoft Teams: a full meeting/chat URL, or a bare Teams address, which is wrapped into a chat deep link. Blank hides every Teams surface. |
| `ANTHROPIC_API_KEY` | No | Switches the site assistant to AI answers and adds the AI answer in search. Unset, the assistant still answers — from the site index, in offline mode — and search returns keyword results only. See §6b. |
| `REMINDER_SECRET` | No | Shared token for the enquiry follow-up job at `/api/reminders`. Unset, the endpoint returns 404 and no reminder is ever sent. Needs the `MYSQL_*` variables too. See §6b. |
| `NEXT_PUBLIC_GA_ID` | No | GA4 measurement ID. The analytics script only loads when set. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Search Console HTML-tag token (the `content` value only). |
| `MYSQL_HOST` / `MYSQL_PORT` / `MYSQL_USER` / `MYSQL_PASSWORD` / `MYSQL_DATABASE` | No | Database behind the `/admin` vehicle model editor. Unset, the site serves the static catalogue and the admin is read-only. Read at runtime, so no rebuild is needed. |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | No | The single sign-in for `/admin`. Unset in production, nobody can sign in. |
| `ADMIN_USERS` | No | One password per person — `email:password,email:password`. The address is what the admin header shows and what a revocation removes. |
| `ADMIN_SESSION_SECRET` | No | Signs the admin session cookie. Derived from the credentials when unset, which signs everyone out whenever a password changes. Set it explicitly if you run more than one instance. |

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
    contact/                Contact / RFQ, country-based support, talk to an expert
    faq/                    Every FAQ on the site, filterable by topic and text
    privacy/                Privacy notice
    api/rfq/route.ts        Enquiry endpoint
    api/chat/route.ts       Site assistant (streams; Claude)
    api/search/route.ts     Site search — keyword always, AI answer on request
    api/reminders/route.ts  Enquiry follow-up job (cron)
    llms.txt/route.ts       Generated plain-text site summary for AI crawlers
    sitemap.ts robots.ts    SEO files
    opengraph-image.tsx     Generated OG/Twitter card (no image asset needed)
    icon.svg not-found.tsx
  components/               Header, Hero, HeroSlider, PageHero, ServiceCard,
                            ProductCategoryCard, FeatureSplit, CTASection, FAQ,
                            FaqBrowser, RFQForm, CategoryFilter, SiteSearch,
                            ChatPanel, MarketSupport, TalkToExpert,
                            ModelFinder, PartsSelector, VehicleModelCard,
                            PostBody, PostCard, SectionNav, Reveal, Spotlight,
                            ScrollProgress, FloatingActions, Footer, Icon, Logo,
                            Analytics, JsonLd
  data/                     All copy and taxonomy (see below), incl. countries.ts,
                            hero-slides.ts, faq-groups.ts
  lib/                      seo.ts, structured-data.ts, rfq.ts, mailer.ts, rate-limit.ts,
                            site-index.ts, assistant.ts, enquiry-log.ts
```

Total: 138 prerendered pages plus the dynamic routes (`/api/rfq`, `/api/chat`,
`/api/search`, `/api/reminders`).

---

## 5. Design & interaction system

Navy brand plus a single signal-red accent, strong dark text and no IT/cloud gradients. The
palette is the brief's; the *use* of it is deliberately more assertive than the brief
describes — see §11. Depth comes from artwork, scale contrast and motion.

The one carousel is [CardCarousel](src/components/CardCarousel.tsx), used for the scope and
category card rows. It is a horizontal scroller with arrows, keyboard support and a 4s
autoplay that stops on interaction, off-screen, on a hidden tab and under reduced motion —
not a hero slideshow, and the cards are server-rendered so they are all present without JS.

**Motion tokens** live in [globals.css](src/app/globals.css): one easing curve
(`--ease-out-industrial`) and three durations, so everything moves the same way.

### The module banner (`SplitHero`)

Every module landing page opens with the same split banner: a full-bleed
photograph carrying the breadcrumb and the h1, and a dark panel carrying the
module's **service list** and one accent call to action. It started as the ODC
Logistics hero and is now shared — [SplitHero.tsx](src/components/SplitHero.tsx).

On these six pages: `/import-export`, `/automotive-parts`, `/manufacturing`,
`/consulting`, `/vehicle-models`, `/odc-logistics`.

The point of it is the list. A visitor landing on a module page sees everything
that module covers and goes straight to the part they came for, instead of a
paragraph and two buttons.

**Each list is derived from data the module already publishes** — `tradeServiceList`,
`partsServiceList`, `manufacturingServiceList`, `consultingServiceList`,
`vehicleModelsServiceList`, `odcServiceList` — so the banner cannot advertise
something the module does not have, and adding a category adds it to the banner.
Where an entry is an anchor it points at the page that actually publishes that
card (e.g. `/manufacturing/scope#reefer-solutions`); those cards sit inside a
`CardCarousel`, which is a scroll container, so the anchor resolves and the card
is scrolled into view. **All anchors were verified against the built HTML.**

No colour is passed in: the panel inherits the module's accent through
`ModuleTheme`, which is why the list marks are green on ODC, amber on trade,
blue on manufacturing and purple on consulting.

Below the banner, the landing pages' "In this section" cards carry a
**photograph, not a bullet list** — the banner already lists every category, so
the cards used to repeat it word for word. Each card uses its destination page's
own slot, so the picture a visitor clicks is the picture they arrive at.

`PageHero` is still used for pages that have no service list to show: the
sub-pages, the detail pages, blog, contact, FAQ and privacy. Every one of those
except FAQ and privacy now passes `media`, so it opens on its own photograph
(see *Artwork and the image system* below).

### The phone tab bar

Phones get a fixed bottom tab bar ([MobileTabBar](src/components/MobileTabBar.tsx))
rather than a conversion strip: **Search · Parts · Contact · Menu**, with a raised
back-to-top button on the left and the Talk to Expert pill beside the assistant
bubble on the right, above the bar.

- It is mounted by `Header`, not on its own, because Search and Menu drive state
  the header owns (the search dialog and the drawer).
- `TAB_BAR_HEIGHT` is exported and consumed by `FloatingActions`. The two are a
  pair — changing the bar's height means changing that offset.
- `FloatingActions` is split by breakpoint: on a phone it renders only the pill
  and the bubble above the bar; the WhatsApp / Teams / back-to-top rail is
  desktop-only, since the bar already carries back-to-top and the pill already
  carries WhatsApp.
- The offset is passed as a CSS custom property, **not an inline `bottom`** — an
  inline style beats `md:bottom-6`, which pinned the row at the phone offset on
  desktop and collided it with the rail.
- The drawer (z-55) sits above the bar (z-50), so opening the menu covers it.

**Header fit budget.** The desktop bar omits Home *and* Contact: the logo covers
Home, "Request a Quote" covers Contact, and adding the search button pushed the
row over — measured at 1280px, search overlapped the Contact link by 47px. Before
adding anything else to that row, measure it at 1280 and 1440.

### Mobile density — measured, not guessed

Every page stacks into one column on a phone, and the page count is high, so
vertical rhythm is set **much tighter below `sm` than at desktop**. Desktop spacing
is unchanged from the original design; only the mobile step was reduced.

The rules, all of which live in shared components so they apply everywhere:

- `Section` is `py-11 sm:py-16 lg:py-24` (was `py-16 sm:py-20 lg:py-24`). With
  twelve to fifteen sections on a page this was the single biggest saving.
- Headings step down one size on mobile — `SectionHeading`, `PageHero`,
  `CTASection`, `AlternatingRow`.
- **Card grids become rows below `sm`** where the card is an icon, a title and a
  line of text: "Why GTS" on the home page and `TalkToExpert`. Same content,
  roughly half the height.
- **Photo cards crop wider on a phone** — `ServiceCard` and `PostCard` photos are
  2:1 below `sm` and 16:10 / 16:9 above it, and the home page shows two articles
  on a phone instead of three.
- **`VehicleModelCard` is two-up on a phone.** The spec rows and part chips are
  hidden below `sm` — kept in the HTML, because they are the long-tail search
  terms — leaving a photo, a name and a tap target. This took `/vehicle-models`
  from 26 phone screens to under 12.
- **`/faq` is topic-first.** It renders an index of the eight sets and opens one
  at a time; search spans all of them. It does not render all 110 questions.
- Tap targets: `ArrowLink` and the footer links carry a `min-h` with a negative
  margin, so they hit 44px/36px without changing the layout.

**Measuring it.** The numbers above were taken with headless Chrome over CDP at a
390×844 viewport, reporting `document.documentElement.scrollHeight` per page and
per section. If you add a section, measure before and after — "it looks fine on my
laptop" is how the page got to nineteen screens in the first place. Current state,
in phone screens: home under 12.5 (was 14.4 before its five scope sections were
folded into the photo cards), ODC 14.7, parts 12.4, models 11.7, import & export
8.7, contact 8.3, blog 8.1 (cover photos added), FAQ 4.9. ODC, parts, models and
FAQ were not re-measured after the photography pass.

**Going below this means cutting content, not spacing.** The home page now shows
each service once, as a photo card, where it used to show the bento, then five
`FeatureSplit` scope sections restating the same services, then a "Why GTS" grid
restating them a third time — the scope lists live on the service pages. The ODC
page still carries eight alternating rows; that is its remaining bulk, and
dropping any of them is a client decision.

### Module themes

**Each section of the site has its own colour theme.** No component was re-styled to do
this: each route segment's `layout.tsx` wraps its pages in
[`<ModuleTheme>`](src/components/ModuleTheme.tsx), which does nothing but set a
`data-module` attribute, and `globals.css` re-declares the design tokens on that element.
Every `bg-accent-600`, `text-navy-700`, `shadow-card` and `spotlight` below it then
resolves to the module's own value. Nothing inside the subtree knows a theme exists, and it
renders on the server, so there is no flash of the default palette on a hard load.

| Section | Theme | Ground | Accent |
| --- | --- | --- | --- |
| Home, Contact, Privacy | GTS brand | Navy `#001a41` | Signal red `#e10000` |
| Import & Export | Harbour | Deep petrol `#042630` | Cargo amber `#b45309` |
| Automotive Parts | Gunmetal | Graphite `#191a1c` | Electric cyan `#0e7490` |
| Manufacturing | Blueprint | Drawing-office slate `#0d1826` | Engineering blue `#1d4ed8` |
| Consulting | Meridian | Indigo night `#151235` | Violet `#7c3aed` |
| ODC Logistics | Convoy | Asphalt `#1a1c13` | Hi-vis lime `#4d7c0f` |
| Vehicle Models | Depot | Yard green `#101f1a` | Emerald `#047857` |
| Blog | Journal | Ink plum `#221530` | Berry `#be185d` |

Three things hold it together rather than letting it fragment:

- **The chrome never changes.** Header, footer, floating actions and the scroll progress bar
  sit *outside* the wrapper, in `(site)/layout.tsx`. Navy and signal red frame every page
  whatever the section, and Home, Contact and Privacy stay fully on brand — those are the
  pages where GTS should be speaking as itself, not as a section.
- **Every ramp has the same value structure** as the navy/red original, so a theme only ever
  changes hue, never the contrast relationships the layouts were built on. Each accent was
  checked against its own ground and against white: the weakest pairing in any module is at
  or above the base theme's, so nothing here trades legibility for variety.
- **Accent hues are spaced 25–77° apart**, so no two sections read as the same colour, and
  each ground is the deep, desaturated end of a hue that belongs with the accent it carries.

A theme declares only two ramps — `--color-navy-*` (the ground) and `--color-accent-*`.
Everything else is derived from them in the shared `[data-module]` rule: the ink, the muted
body tone, the four steel surfaces, the card shadows, and the `--scene-*` depth ramp that
retints the generated `PortScene`/`FabricationScene` artwork to match the page it sits on.

Two build-time details are worth knowing before editing the tokens. Tailwind inlines
`--shadow-*` values into the utility, so the shadow colour goes through `rgb(var(--shadow-rgb) / …)`
— a `var()` *inside* the inlined value is what makes it resolve per module. And a `var()`
used inside a custom property is substituted where that property is *declared*, which is why
the derived tokens live on `[data-module]` and not on `:root`.

### Artwork and the image system

**Every image slot on the site is declared in [src/data/media.ts](src/data/media.ts), and
every slot now carries a photograph** — no page shows the generated scene artwork any more.
To change a photo: drop the file in `public/images/`, set `src` on the slot, update `alt`
and `credit`. Nothing else changes — `<Media>` switches to `next/image` automatically, and
each slot carries a `brief` describing what a GTS replacement should show. A slot without
`src` still falls back to the scene artwork, so a new slot can be added before its picture.

A slot can also carry `position` — a CSS `object-position` — when the subject is not
centred and a wide crop would cut it off (the trailer axles, the tractor, the welder).

**No photograph appears twice on the same page.** That was checked by crawling every page
type and listing each `<img>`; keep it that way when adding a card or a plate.

**A slot can hold a video instead of a still.** Put an H.264 MP4 in `public/videos/`, set
`video` on the slot, and set `src` to a still from the same footage — the type makes the
still mandatory, because it is the poster, the frame the server renders, the frame a crawler
indexes and the frame that stays under reduced motion.
[MediaVideo](src/components/MediaVideo.tsx) then plays it muted, looping and inline, pausing
it off-screen and on a hidden tab, stopping it entirely for `prefers-reduced-motion`, and
falling back to the poster if the file fails to load. Video is decoration: nothing that only
appears in one is information the page needs.

[PageHero](src/components/PageHero.tsx) takes an optional `media` slot, which puts that
photograph or video full-bleed behind the banner with the scrim and the blueprint grid over
it. **Every sub-page, detail page, blog page and the contact page passes one**, so each opens on
its own photograph; only FAQ and privacy keep the flat navy banner. The photo used to sit in a
[MediaBand](src/components/MediaBand.tsx) plate further down, under a hero carrying one of four
blueprint drawings that repeated from page to page — the drawing is gone and the plate moved up.
MediaBand is still used on Import & Export and Automotive Parts, where it is a second, different
photograph.

Where the pictures appear:

| Where | Slots |
| --- | --- |
| Home banner (4 slides) | `slideTrade`, `slideComponents`, `slideManufacturing`, `slideConsulting` |
| Home service cards, and each module's split banner | `importExportHero`, `automotivePartsHero`, `manufacturingHero`, `consultingHero`, `odcJetty`, `vehicleModelsHero` |
| Landing-page cards, and each sub-page's banner | `tradeCategories`, `vehicleTrade`, `indiaPartner`, `trailerModification`, `manufacturingProcess`, `consultingFireSafety`, `consultingVehicleService`, `consultingHomologation` |
| Parts category cards, and each category page's banner | `partsTwoWheelers` … `partsAgriculture` (one per category, set as `media` in `partCategories`) |
| Blog cards and post banners | `cover` on each post in `blog.ts`, pointing at the slot for the same subject |
| Blog index / contact banners | `blogJournal`, `contactCity` |
| ODC Logistics pages | the eleven client-supplied photographs below |

**Two sources.** The eleven ODC Logistics photographs are the client's: five came from the
RACE Innovations logistics pages and six were supplied in the client's brief and extracted from
that PDF. The other 27 are **Unsplash photographs**, free for commercial use under the
[Unsplash License](https://unsplash.com/license) with no attribution required — each slot's
`credit` still records the photographer and source page, so any one can be traced or replaced.
They were chosen to illustrate the subject, and none is captioned or described as a GTS facility,
vehicle or team. `contactCity` is a view of Chennai, where the marketing office is; it is the slot
most worth replacing with a photograph of the actual company.

All photographs are WebP and rendered through `next/image`, which serves AVIF/WebP at the right
size per breakpoint. [MediaFigure](src/components/MediaFigure.tsx)
wraps a slot with the scrim and the spec-sheet plate caption, which is what keeps a photograph
reading as part of the technical system rather than as decoration.

**Keeping full-width banners sharp.** A banner photograph fills a 1920px screen, and more device
pixels than that on a scaled laptop display, so four things are set deliberately:

- **Source size.** The home banner slides are 3200px wide and every other Unsplash photograph
  2800px, exported once from the original at WebP q86/q82. A 2000px source was being upscaled,
  and its compression then compounded with next/image's own re-encode.
- **Encode quality.** `images.qualities` in `next.config.ts` allows `[75, 85]`. The banners
  (`Hero`, `PageHero`, `SplitHero`) pass `quality={85}` through `<Media>`; everything else stays at
  the default 75. Next 16 rejects any other value, so add it to the list before using it.
- **No film grain over photographs.** `bg-grain` is for flat navy panels; over a photo it reads as
  blur. The blueprint grid stays over banners but is masked to fade out by 60% of the width, so
  only the copy side carries it.
- **In focus where the text sits.** A shallow depth of field turns the left half of a banner —
  exactly where the headline is — into blur. The Automotive Parts slide was replaced for that
  reason, and two slides (`slideComponents`, `slideConsulting`) are cut from the left 80% / 66% of
  their originals so the subject lands in the open right half rather than behind the copy.

On a phone the headline runs the full width of the banner, so `MediaScrim side="left"` is an even
72% tint below `md` rather than the left-to-right gradient — white text still measures ~7:1 over
the brightest part of the photograph.

If a replaced photograph still looks stale in development, clear `.next/dev/cache/images` — the
optimiser caches by URL, and the file name has not changed.

**There is no film on the site.** A 51-second manufacturing film (`/videos/cisme.mp4`) used to sit
on `/manufacturing`; it was removed at the client's request. It carried the RACE Innovations
watermark and burned-in captions, and several frames carry a third-party channel watermark and OEM
branding, so it was not mined for stills either. [VideoFigure](src/components/VideoFigure.tsx) is
kept for a future film; a GTS-owned one should be supplied without burned-in text.

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

Two kinds of generated artwork remain in the codebase. Neither is rendered on a page at the
moment — the scenes are the fallback for a slot without `src`, and the blueprints are
unused since the heroes took photographs — but both still work:

- **Scenes** ([PortScene](src/components/illustrations/PortScene.tsx),
  [FabricationScene](src/components/illustrations/FabricationScene.tsx)) — flat layered
  silhouettes that can carry a full-bleed hero or an editorial plate.
- **Blueprints** ([TruckBlueprint](src/components/illustrations/TruckBlueprint.tsx),
  [AxleBlueprint](src/components/illustrations/AxleBlueprint.tsx)) — engineering side and
  front elevations with dimension lines, centre marks and figure captions.

The site originally ran on these instead of photographs, for three reasons: a drawing of
an axle claims nothing about equipment GTS owns; each is ~4KB and sharp at any size; and a
technical drawing reads as engineering rather than IT/cloud. It now carries photographs at the
client's request — every page had shown the same two scenes and four drawings over and over.
The first reason still governs the photographs: none is captioned or described as a GTS
facility, and the alt text says what is actually in the frame. Keep it that way, and keep
generic IT/cloud imagery off the site.

Each shape carries `pathLength="1"`, so the single `draw-line` keyframe stroke-draws the
whole figure regardless of real path length. Add a new drawing by following the same
pattern and pass it to `PageHero` via the `art` and `artLabel` props.

The drawings can go back into any `PageHero` through its `art` prop. Do not combine `art`
with `media` on the same hero — the drawing sits on top of the photograph and neither reads.

| Piece | What it does |
| --- | --- |
| [Reveal.tsx](src/components/Reveal.tsx) | Scroll-triggered fade/rise. One shared `IntersectionObserver` for the whole page; each element reveals once then stops being watched. |
| [ScrollProgress.tsx](src/components/ScrollProgress.tsx) | Accent progress bar across the top. Writes to the DOM inside `requestAnimationFrame` — scrolling never triggers a React render. |
| [SectionNav.tsx](src/components/SectionNav.tsx) | Sticky in-page nav with scroll-spy. See the two rules below. |
| [FloatingActions.tsx](src/components/FloatingActions.tsx) | The assistant launcher (always visible), plus Talk to Expert, back-to-top and the optional WhatsApp / Teams buttons, revealed after ~520px of scroll. |
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

Five nav topics are dropdowns — see `primaryNav` in [src/data/site.ts](src/data/site.ts). Give an
item a `children` array and it becomes one; `panelTitle` is the full topic name shown as the
panel heading, while `label` is the shorter string the bar shows. *Indian Vehicle Models
Gallery* is the clearest example of why the two exist: the full name is 29 characters and would
overflow the row on its own, so the bar says **Vehicle Models** and the panel says the rest.

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
| Nav, 7 slots | ~822px | ~850px |
| CTA button | 179px | 179px |
| **Headroom** | **~11px** | **~18px** |

⚠️ **The xl row was measured at 786px / 47px headroom when only two topics were dropdowns and
the seventh label was "Resources".** Three things have moved since, and the figures above are
*computed from those deltas, not re-measured in a browser*:

| | xl |
| --- | --- |
| Three more topics became dropdowns, each gaining a caret (`w-3` + `gap-1.5`) | +54px |
| "Resources" (9 chars) → "Vehicle Models" (14) | +38px |
| Item padding `px-2`→`px-1.5`, caret `w-3`→`w-2.5` with `gap-1`, row `xl:gap-4`→`xl:gap-3` | −56px |
| **Net** | **+36px** |

**Re-measure this in a browser at 1280–1535px before trusting it.** The margin is now thin
enough that one more character could blow it.

Changes that bought the headroom, and removing any one puts labels back to wrapping: Home
dropped from the desktop bar, item padding at `px-1.5`, the row gap tightened at `xl`, the
caret kept small, and the logo descriptor hidden in the xl–2xl band. Nav items carry `shrink-0 whitespace-nowrap`
deliberately — if the budget is ever blown again the row will visibly overflow rather than
silently wrap two labels onto two lines, which is how the problem hid the first time.

**Before adding a ninth slot or a longer label, re-measure.** At ~11px the row now has barely
one character in hand, and a caret costs 18px. Adding a topic almost certainly means nesting it
under an existing dropdown instead; lengthening a label almost certainly means putting the long
form in `panelTitle` and leaving the bar short, as *Vehicle Models* does.

**The header must never change height on scroll.** It is a constant 70px, and this is
load-bearing: it sits in normal flow, so animating its height reflows the entire page and
content jerks around the threshold — scrolling 2px can throw the `H1` 24px. Only the drop shadow reacts to scroll, because a shadow costs no layout. If you add anything to the header,
keep it out of the flow (shadow, colour, opacity) or put it above the sticky element.

Three further rules the motion system holds to, all verified in the browser:

1. **Nothing is hidden without JavaScript.** The reveal styles sit inside
   `@media (scripting: enabled)`, which the browser resolves before first paint. No JS — or a
   crawler — sees every section fully visible, with no flash either way, and no script is
   involved. (This replaced a `.js` class set by an inline `<script>` in the root layout, which
   React 19 flagged: "Encountered a script tag while rendering React component". Don't
   reintroduce a raw `<script>` in a component; `next/script`'s inline `beforeInteractive`
   is not a substitute here either — it queues the code until Next's runtime loads, which
   would bring the flash back.)
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

- **A vehicle model** is edited at [`/admin`](#the-admin-at-admin) once a database is
  configured. Without one — and at build time before the first save — the schedule is the
  `vehicleModels` array in `src/data/vehicle-models.ts`, one object per model with its
  photograph at `public/images/vehicles/<slug>.webp`. Its page, its entry in the filters and
  the OEM chips, its `Product` structured data, the coverage figures on the index and its
  sitemap entry all derive from the object. Slugs are stable, so a URL does not change because
  a model name was edited. `segment` and `parts` are transcribed from the client's model
  catalogue — the vehicle type and the "Priority Spare Parts / Components" line, split on its
  semicolons — so edit them against that document rather than rewriting in place; `partsNote`
  carries the catalogue's body-type qualifier verbatim where there is one (tippers, tractor
  heads, the Magnite turbo).
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

### The admin at /admin

The vehicle model schedule is the one part of the site the client edits themselves, so it is
the one part backed by a database rather than a data file. Everything else on the site stays
in `src/data/` and ships with the build.

**Setting it up.** Point the `MYSQL_*` variables at an empty database and set `ADMIN_EMAIL`
and `ADMIN_PASSWORD` (or `ADMIN_USERS`). Nothing else is needed: the tables are created on
first use, and the catalogue in `src/data/vehicle-models.ts` is copied in as the starting
content. In development, with nothing configured at all, `/admin` accepts
`admin@gts.local` / `gts-admin` and says so on the sign-in page; in production an
unconfigured admin refuses every sign-in.

**What it edits.** Per model: OEM, model name, vehicle type, category, exported-from, the
technical specification (engine, max power, max torque, transmission, GVW/payload),
destination markets, the priority parts list, the parts note, the component photo grid, the
URL, and the photograph. Models can be added and deleted. Photographs are stored in the
database and served from `/api/vehicle-photo/<slug>/<version>` — the version is the upload
time, so the URL is cached forever and changes the moment the picture does. Uploading a
photograph does not touch `public/images/vehicles/`, which stays the fallback.

**Bulk specifications.** `/admin/import` takes the client's spec sheet pasted straight out of
Excel or Google Sheets — `Vehicle Type · OEM · Model · Engine / Displacement · Max Power ·
Max Torque · Transmission · GVW / Payload`, in any column order, tab- or comma-separated.
Rows are matched to the schedule on OEM and model, and *Preview changes* prints what each row
would do before *Apply* writes anything. A sheet name that is a longer variant of a schedule
name ("Ultra T.7 - Export" against "Ultra T.7") matches only when exactly one model could be
meant, and the report says so. A row matching nothing is reported, never invented — a spec
sheet has none of the parts, markets or photograph a model page needs.

**How edits reach the public pages.** The model pages, the index, the home page, the
components page and the sitemap are prerendered and revalidated on save, with a five-minute
interval as a backstop. If the database is unreachable the readers fall back to the static
catalogue and log it, so an outage degrades the site to its pre-admin behaviour rather than
taking the pages down.

**What the security is.** An email address and a static password, the password compared in
constant time and one message covering both a wrong address and a wrong password. An HMAC-signed
`httpOnly` session cookie lasting eight hours, five sign-in attempts per IP per ten minutes,
every page and every write re-checking the session, and `/admin` disallowed in `robots.txt`
and `noindex` in its metadata. There is no account management, no password reset and no audit
trail — passwords are changed by editing the environment and restarting.

---

## 6b. Contact channels, search, the assistant and follow-up

### There is no Call button

The site publishes **no `tel:` link anywhere**. WhatsApp, email and the enquiry form are the
routes, and every former Call action now points at `primaryContactAction()` in
[src/data/site.ts](src/data/site.ts), which falls through WhatsApp → email → the enquiry form.
An unset environment variable therefore degrades a CTA rather than breaking it.

The office numbers are still *printed* — in the footer, on the contact page and in the mobile
drawer — because a buyer checking who they are dealing with expects to see them. They are text,
not links, and `formatDetection.telephone` is `false` in the root layout so iOS Safari cannot
turn them back into tap-to-dial.

Three variables switch the channels on, and each appears everywhere at once the moment it is
set — header utility row, footer, mobile drawer, contact page, "Talk to an expert" band and the
floating rail:

| Variable | Channel |
| --- | --- |
| `NEXT_PUBLIC_CONTACT_EMAIL` | The published email address |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp (digits with country code) |
| `NEXT_PUBLIC_TEAMS_ID` | Microsoft Teams (a full URL, or a bare address) |

### Country-based support

[src/data/countries.ts](src/data/countries.ts) is the market schedule: 36 countries across five
regions, each flagged `local` (a partner on the ground) or `direct` (handled from Chennai). It
drives the selector on the contact page and the home page, and the search index — so "do you
cover Kenya" resolves to a result that opens `/contact?market=KE#rfq` with the country field
already filled in.

**The individual partner names and desk details are still to come from Srikanth.** Add them to
`partnerName` / `partnerNote` on the relevant market as they are confirmed; a market without
one simply says enquiries are handled from the India desk. Nothing is invented.

### Search

`/api/search` searches one flat index built from the same data modules the pages render from
([src/lib/site-index.ts](src/lib/site-index.ts)) — pages, component categories, all 96 vehicle
models, articles, service scope, markets and all 110 FAQ entries. The index is **server-only**;
it is reached through the API rather than shipped, which keeps ~100KB of catalogue out of the
bundle. Open it from the header button or ⌘K / Ctrl-K.

Add `?ai=1` and Claude writes a one-paragraph answer **from the retrieved entries only** — it
cannot introduce a page keyword search did not find. The dialog requests it separately, 600ms
after typing stops, so an abandoned search never reaches the model.

### The assistant

The launcher at the bottom right opens [ChatPanel](src/components/ChatPanel.tsx), which streams
from `/api/chat`. **It is visible on every page from the first paint**, including /contact — it
used to wait for 520px of scroll, which meant most visitors never saw it. Two details keep it out
of the way:

- It lifts above any element marked `data-float-clear` while that element sits along the bottom
  of the viewport. The home banner's slide selector carries it, so the bubble never covers the
  slide controls; once the banner scrolls away the bubble drops back into the corner.
- A one-time hint ("Need a hand?…") appears six seconds into a first visit, only on desktop and
  only while the bubble is lifted over the home banner — the one place the space above it is known
  to be photograph rather than a button. Dismissing it or opening the chat sets
  `gts-assistant-nudged` in localStorage.

**Two answer modes, chosen per request** — `X-Assistant-Mode` on the response says which answered,
and `GET /api/chat` returns `{"assistantConfigured":…,"mode":"ai"|"offline"}`.

- **Offline** (no `ANTHROPIC_API_KEY`, and also the fallback if the API fails before any text is
  sent) — [assistant-offline.ts](src/lib/assistant-offline.ts). Nothing is generated: greetings,
  contact details and hours, and pricing questions get fixed wording drawn from `site.ts`;
  everything else is answered with the best-matching entries from the site index. Matching is
  stricter than the search dialog's — filler words are dropped, terms are lightly stemmed and
  weighted by rarity (so "Tata" outweighs "components"), and an entry must cover at least half
  the question by weight. A FAQ that covers the whole question is quoted as the answer. A
  question the site does not cover gets "I couldn't find that" rather than a loose match.
- **AI** (`ANTHROPIC_API_KEY` set) — every turn retrieves the most relevant index entries and
  prepends them to the question, so Claude answers from the site rather than from memory.

Both AI surfaces (chat and search) run `claude-opus-5` at low effort through
`client.beta.messages`, because they send `fallbacks: "default"` (beta
`server-side-fallback-2026-07-01`): if the model's safety classifiers decline a request, the API
re-runs it server-side on Anthropic's recommended fallback model instead of returning a refusal.
`max_tokens` is 4096 for chat and 2048 for search — thinking is on by default on this model and
counts toward the limit, so the old 1024 / 400 could cut an answer off; a reply that still hits the
limit is flagged in chat and dropped in search. The system prompt carries the site map and is sent
as a cached block, so from the second request onward only the retrieved passages and the question
are billed at full rate. It restates the site's content rules as hard constraints — no stock, no
certification, no prices, no approvals, and links only to paths in the site map.

Replies are rendered by a deliberately small markdown subset — paragraphs, line breaks, `- ` and
`1.` lists, `**bold**` and links — built as React elements, so nothing in a reply can inject
markup. Only on-site paths become links; any other URL renders as its label.

The chat has its own rate limit, 30 messages per 10 minutes per client address. Behind a proxy
that does not forward `X-Forwarded-For`, every visitor shares one bucket — see §3.

### Automated reply and follow-up reminders

The acknowledgement to the enquirer has always been sent by `/api/rfq`. Each enquiry now also
gets a quotable reference (`GTS-XXXXXXXX`) and, when MySQL is configured, a row in an
`enquiries` table ([src/lib/enquiry-log.ts](src/lib/enquiry-log.ts)) so an unanswered one can be
chased:

- **Stage 1, 24 hours** — nudges `RFQ_TO_EMAIL`, with a one-click link that closes the enquiry.
- **Stage 2, 72 hours** — follows up with the enquirer. It does not promise a date.

Point a scheduler at `https://your-domain/api/reminders?token=$REMINDER_SECRET` hourly. Running
it more often is harmless — the stage counter is the guard, so nothing is sent twice. Add
`&report=1` to list what is open without sending anything. Without `REMINDER_SECRET` the
endpoint returns 404; without MySQL, enquiries send exactly as before and nothing is recorded.

### AI discoverability

`/llms.txt` is generated from the same index — the convention assistants and AI search crawlers
look for. It carries the service summary, the market schedule, every page URL and, deliberately,
the same "how to describe GTS accurately" rules, because a model reading it is exactly the
audience that could otherwise infer stock or certification. AI crawlers are named and allowed
explicitly in [robots.ts](src/app/robots.ts) — flip `allow` to `disallow` there to change that.

---

## 7. Before you go live

These items need input that is not in the brief — the site is built so that each one is a
single edit, and nothing is invented in the meantime.

1. **Logo.** [src/components/Logo.tsx](src/components/Logo.tsx) renders a typographic
   wordmark as a placeholder. Drop the official file into `public/` and swap the mark for
   `next/image` (the header allows 40px height).
2. **Public email address.** Deliberately blank. Set `NEXT_PUBLIC_CONTACT_EMAIL` and it
   appears in the header utility row, footer, mobile drawer, contact page, the "Talk to an
   expert" band and the Organization JSON-LD.
3. **WhatsApp number.** WhatsApp is the site's primary conversational channel and every former
   Call button now routes to it — but the whole thing is off until
   `NEXT_PUBLIC_WHATSAPP_NUMBER` is set, and those CTAs fall back to the enquiry form until
   then. This is the highest-value variable to fill in. See §6b.
3b. **Microsoft Teams.** Off until `NEXT_PUBLIC_TEAMS_ID` is set.
3c. **Local partners.** [countries.ts](src/data/countries.ts) marks which markets have a partner
   on the ground, but the partner names and desk details are still to come from Srikanth. See §6b.
3d. **`ANTHROPIC_API_KEY`.** Optional. Without it the assistant answers in offline mode from the
   site index and search shows keyword results; with it both switch to Claude. Budget for it
   before enabling — every AI conversation turn is a billed call.
3e. **`REMINDER_SECRET` + MySQL and a scheduler**, if the follow-up reminders are wanted. See §6b.
4. **Photography.** Every slot now carries a real photograph — eleven client-supplied (ODC
   Logistics) and 27 from Unsplash (free commercial licence, credited per slot in
   [media.ts](src/data/media.ts)). The Unsplash set illustrates each subject; it does not show
   GTS's own premises, vehicles or people. Replace them with GTS photographs as those become
   available, starting with `contactCity` (currently a view of Chennai) — each slot's `brief`
   says what to shoot. Confirm the licence on the client-supplied ODC photographs too — five came
   from the RACE Innovations site. Supply replacements as WebP/AVIF through `next/image`, and do
   not substitute generic IT/cloud stock.
5. **Model catalogue photographs.** The 96 vehicle shots came out of the client's catalogue,
   whose model pages are screenshots — so they are ~700×430 native at best, and nine are
   materially smaller (listed in §5). They carry no visible source attribution, but they are
   OEM product photography that reached us second-hand: **confirm the client has the right to
   publish them** before launch, and replace the nine small ones from OEM or authorised
   distributor material. The component photographs are stock-style part shots from the same
   document and want the same check.
6. **Contact details.** Address and phone numbers are the ones published on the existing
   GTS reference page. Confirm or replace them in `src/data/site.ts`. Note the numbers are
   printed but never dialled — see §6b.
6b. **Banner photography.** The home banner's four slides (`slideTrade`, `slideComponents`,
   `slideManufacturing`, `slideConsulting`) carry Unsplash photographs, deliberately different
   from the home page's service cards so nothing repeats on the page. If they are replaced, the
   four should read as a set, because the banner cross-fades between them.
7. **Privacy notice.** [src/app/privacy/page.tsx](src/app/privacy/page.tsx) is a factual
   starting point covering what the form actually does. Have it reviewed against your
   retention policy and applicable law before launch.
8. **Keyword validation.** The clusters in `src/lib/seo.ts` come from the brief. Validate
   volumes in Google Ads Keyword Planner / Search Console before final launch.

---

## 8. SEO implemented

- Unique title, meta description, canonical URL, H1 and commercial CTA per page. Exactly one
  `<h1>` per page. The generated model-page titles and descriptions are built to fit a result
  listing rather than written long and truncated by the engine — titles around 55-70
  characters, descriptions at most 158, with the model name leading both because it is what
  was searched for and what survives a trim. The description spends its room on the engine
  line and then on as many part names as still fit.
- Keyword clusters mapped per page, from section 11 of the brief and from the client's own
  keyword sheet (67 rows, 50 unique once the repeats are removed). Every one of the 50 is
  assigned to a single primary page in `pageSeo`, so pages do not compete with each other for
  the same term, and every one appears in visible copy — 7 in a title or `<h1>`, the rest in
  body text. The 14 that remain meta-only are compounds whose near-identical form is already
  in the copy ("truck exporter India" for `Truck Exporter`), and forcing the exact string in
  as well would read as stuffing for no gain.
- `/automotive-parts` carries a **Genuine, OEM and aftermarket** section. It is the grade a
  buyer names before they ask a price, it was the largest gap against the keyword sheet, and
  the copy states plainly that naming a grade is not a claim of stock, of an OEM appointment
  or of an authorisation — the same content rule as the rest of the site.
- `sitemap.xml` and `robots.txt` generated from `NEXT_PUBLIC_SITE_URL`. Model pages carry
  their real last-edited time from the database rather than the build date, so a crawler is
  not told that all 96 changed every deploy. `robots.txt` disallows `/api/` and `/admin`, but
  allows `/api/vehicle-photo/` — those are real image URLs, referenced by the model pages and
  by their `Product` schema, and blocking them would keep admin-uploaded photographs out of
  image search.
- Open Graph and Twitter cards, backed by a generated 1200×630 branded image.
- Structured data: `Organization` and `WebSite` site-wide; `Service` and `BreadcrumbList`
  per page; `FAQPage` on Import & Export, Automotive Parts, Manufacturing and Consulting
  (20 questions each), on the three ODC Logistics pages and on Vehicle Models; `ItemList` on
  the Vehicle Models and Blog indexes; `Product` with an
  `OfferCatalog` of parts on each model page, carrying the technical specification as
  `additionalProperty` so engine, power, torque, transmission and GVW are machine-readable
  rather than only prose; `Blog` plus `BlogPosting` on the blog.
- Internal linking: automotive parts → vehicle models → manufacturing → homologation → contact,
  with the blog linking into all of them.
- Long-tail depth: 8 component category pages, 96 model pages (`<model> spare parts`) and 6
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

3. **The nav is no longer six flat items — it is eight slots, five of which are dropdowns.**
   ODC Logistics & Route Survey and the Vehicle Models / Blog pair were added after the MVP, and
   Import & Export, Manufacturing and Consulting became dropdowns when each was split into its
   own pages. Grouping them under dropdown parents is what keeps the bar to eight slots while
   covering nineteen destinations, and it follows the pattern the client asked for.

   **Home is deliberately absent from the desktop bar.** The logo is the home link and carries
   `aria-label="GTS Trade Solutions — home"`. Home is still the first item in the mobile menu.
   This was not a style choice — see the fit budget in §5, which is why it had to go.

Everything else — the compliance guardrails, the "support/coordinate/facilitate" wording,
no invented certifications, clients or capacity — is unchanged and still enforced.
