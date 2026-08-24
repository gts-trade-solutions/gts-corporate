/**
 * Blog content.
 *
 * Posts are authored here as structured blocks rather than MDX, so the whole
 * site stays a plain TypeScript data layer with no extra build step, no CMS and
 * no runtime markdown parser — consistent with the rest of `src/data`.
 *
 * Content rules are the same as everywhere else on the site: no invented
 * certifications, clients, capacity or approvals, and GTS supports, coordinates
 * and facilitates regulatory work rather than issuing anything itself. Posts are
 * buyer guidance, not promises.
 *
 * To add a post: append one object to `blogPosts`. The index, the detail page,
 * the sitemap and the structured data all follow from it. Keep `publishedAt` in
 * ISO `YYYY-MM-DD` form — it is used for both display and `datePublished`.
 */

export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "note"; title?: string; text: string };

export type BlogPost = {
  /** Stable URL segment — /blog/<slug>. */
  slug: string;
  title: string;
  /** Full <title> for the post page. */
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  /** Shown on the index card and used as the post's standfirst. */
  excerpt: string;
  body: BlogBlock[];
  /** Where a reader should go next on the site. */
  cta: { label: string; href: string };
  /** Slugs of related posts, in the order they should appear. */
  related: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "vehicle-export-enquiry-checklist",
    title: "What a vehicle export enquiry needs before anyone can quote it",
    seoTitle: "Vehicle Export Enquiry Checklist — What to Send | GTS Trade Solutions",
    metaDescription:
      "The information a vehicle export enquiry needs to be quotable: destination market rules, specification, drive side, emission standard, quantity and delivery terms.",
    keywords: [
      "vehicle export enquiry",
      "vehicle export from India",
      "car export documentation",
      "truck export requirements",
      "vehicle import rules by country",
    ],
    category: "Vehicle Trade",
    publishedAt: "2026-03-12",
    readingMinutes: 6,
    excerpt:
      "Most vehicle enquiries stall for the same reason: they name a model and a quantity, and nothing else. Here is what turns one into a quotation.",
    body: [
      {
        type: "paragraph",
        text: "A vehicle enquiry that reads “we need 40 pick-ups, please send your best price” cannot be quoted. Not because the request is unreasonable, but because the price of a vehicle delivered into a market depends on things the enquiry has not said: which market, in what specification, to which emission standard, on what delivery terms. Change any one of them and the number moves by more than the margin.",
      },
      {
        type: "paragraph",
        text: "This is the list we work through on every vehicle requirement. Sending it up front usually shortens the first response from a week of back-and-forth to a single reply.",
      },
      { type: "heading", text: "1. The destination market, named exactly" },
      {
        type: "paragraph",
        text: "Not the region — the country, and the port. Vehicle import rules are national, and neighbouring markets frequently disagree with each other on age limits, emission standards, left- or right-hand drive, pre-shipment inspection and homologation. “Southern Africa” is not a specification; South Africa and Zambia are, and they do not want the same vehicle.",
      },
      {
        type: "paragraph",
        text: "This is also the item most likely to end an enquiry early, which is a good thing. It is far cheaper to learn in week one that a market will not admit a given vehicle than to learn it when the units are on the water.",
      },
      { type: "heading", text: "2. New or used, and the age limit that applies" },
      {
        type: "paragraph",
        text: "Many markets cap the age of an imported vehicle, and some prohibit used imports in certain categories entirely. If you are buying used, state the acceptable year range and mileage band. If you are buying new, say whether you need the current model year specifically, because that constrains availability far more than the price does.",
      },
      { type: "heading", text: "3. Specification, in the buyer's own words" },
      {
        type: "paragraph",
        text: "Variant name, engine and fuel type, transmission, drive side, and any equipment that is not optional for you. For commercial vehicles, add the configuration that actually determines the build:",
      },
      {
        type: "list",
        items: [
          "GVW or GCW, and the axle configuration (4x2, 6x4 and so on)",
          "Wheelbase, and the body or superstructure to be fitted",
          "Cab type — day cab or sleeper — and whether air conditioning is required",
          "Tyre size, and whether a spare wheel and carrier are needed",
          "Whether you are buying a complete vehicle or a chassis for local bodying",
        ],
      },
      {
        type: "paragraph",
        text: "That last point matters more than it looks. A bus chassis shipped to a local body builder and a fully built bus are different transactions with different documentation, different freight and very different landed costs.",
      },
      { type: "heading", text: "4. Emission and safety standard required" },
      {
        type: "paragraph",
        text: "State the standard the destination market enforces rather than the one you assume applies. Emission-standard mismatches are a common cause of a vehicle clearing the exporter and failing at the importing end, and they cannot be corrected after shipment.",
      },
      { type: "heading", text: "5. Quantity, and whether it repeats" },
      {
        type: "paragraph",
        text: "One unit, a first batch, or an annual programme are three different commercial conversations. A single unit is a transaction. A stated annual volume changes what can be negotiated on price, allocation and lead time, and it changes whether it is worth planning a parts and service position alongside the vehicles.",
      },
      { type: "heading", text: "6. Delivery terms, and who does what" },
      {
        type: "paragraph",
        text: "Name the Incoterm you want quoted on — FOB, CFR and CIF are not comparable numbers, and comparing quotations on different terms is the single most common way a buyer picks the more expensive offer by mistake. Say which port, and whether you or we are arranging inspection, insurance and inland delivery at the far end.",
      },
      { type: "heading", text: "7. Documentation and inspection requirements" },
      {
        type: "paragraph",
        text: "Some markets require pre-shipment inspection by a nominated agency, a certificate of conformity, or consular or chamber attestation of the commercial documents. These have lead times of their own and are not always available at short notice, so they belong in the first conversation rather than the last.",
      },
      {
        type: "note",
        title: "Where the regulatory line sits",
        text: "Approvals, registrations, certificates and clearances are issued by the competent authorities and licensed agents in each market. We review the requirement, prepare and coordinate documentation, and work with those parties on your behalf — we do not issue them ourselves, and any supplier who tells you they do is worth a second look.",
      },
      { type: "heading", text: "8. After the vehicles land" },
      {
        type: "paragraph",
        text: "Worth deciding before the order, not after the first breakdown: who holds the initial spares stock, what the service arrangement is, and whether local technicians need training on the platform. Fleets that plan a first-year parts kit alongside the vehicle order tend to keep their utilisation figures; fleets that order the vehicles first and think about parts later usually pay for the same components twice — once in air freight and once in downtime.",
      },
      {
        type: "paragraph",
        text: "If your requirement already has most of this, send it as it stands. If it has none of it, send what you have anyway — the questions above are how we would reply, and it is quicker to answer them once than to guess at them twice.",
      },
    ],
    cta: {
      label: "Start a vehicle import / export enquiry",
      href: "/contact?enquiry=vehicle-trade#rfq",
    },
    related: ["spare-parts-planning-african-markets", "homologation-market-entry-basics"],
  },

  {
    slug: "spare-parts-planning-african-markets",
    title: "Spare-parts planning for Indian vehicles in African markets",
    seoTitle: "Spare Parts Planning for Indian Vehicles in Africa | GTS Trade Solutions",
    metaDescription:
      "How to plan a first-year spare-parts position for Indian-built motorcycles, three-wheelers and trucks in African markets — what moves, what to stock and what to order per shipment.",
    keywords: [
      "spare parts Africa",
      "motorcycle spare parts Tanzania",
      "three wheeler spare parts Africa",
      "truck spare parts exporter",
      "aftermarket parts distributor Africa",
      "Indian vehicle spare parts",
    ],
    category: "Aftermarket",
    publishedAt: "2026-04-28",
    readingMinutes: 7,
    excerpt:
      "The vehicles are the easy part. What decides whether a fleet or a dealership survives its second year is whether the fast-moving parts are on the shelf.",
    body: [
      {
        type: "paragraph",
        text: "Indian-built motorcycles, three-wheelers and light commercial vehicles work well in African markets for a specific reason: they were designed for duty cycles that look a lot like the ones they meet there. Poor road surfaces, heavy loads, dust, long service intervals and repair rather than replacement. What follows from that is predictable — and predictability is exactly what a parts plan needs.",
      },
      {
        type: "paragraph",
        text: "The mistake is treating parts as a reaction to failures. By the time a part is needed, the lead time has already been spent. A parts position is a forecast, and for these platforms the forecast is unusually reliable.",
      },
      { type: "heading", text: "Parts fall into three bands, and they behave differently" },
      {
        type: "paragraph",
        text: "Sorting a parts list by unit price tells you almost nothing useful. Sorting it by how often it is consumed tells you what to do.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Consumables — air and oil filters, spark plugs, brake shoes and pads, cables, chain and sprocket kits, wiper blades. Consumed on a schedule, cheap per unit, and the entire reason a workshop keeps a customer. These should never be air-freighted, which means they should never run out.",
          "Wear items — clutch plates and kits, wheel bearings, fork seals, shock absorbers, suspension and leaf-spring bushes, tie-rod ends, U-joints. Consumed on a curve rather than a schedule, and heavily influenced by road surface and load. Volume rises sharply after the first 18 months of a fleet's life.",
          "Failure items — starters, alternators, water pumps, injectors, sensors, radiators, electricals. Low frequency, higher value, and the ones that immobilise a vehicle. Stock the ones with long lead times, not the ones with high prices.",
        ],
      },
      { type: "heading", text: "The duty cycle changes the mix, not just the quantity" },
      {
        type: "paragraph",
        text: "A commuter motorcycle in an urban rental fleet and the same model on rural unsurfaced roads consume different lists. The rural bike eats suspension, bearings, fork seals and chain kits; the urban bike eats brakes, clutch plates and electricals. Passenger three-wheelers running long hours consume clutch assemblies and brake shoes far faster than the service schedule implies, because the schedule was not written for fourteen-hour days.",
      },
      {
        type: "paragraph",
        text: "So when a parts plan is being built, the useful questions are about the operation rather than the vehicle: how many hours a day, on what surface, carrying what, maintained by whom.",
      },
      { type: "heading", text: "Order fast-movers by shipment, not by requisition" },
      {
        type: "paragraph",
        text: "The economics of a parts programme are decided by consolidation. A container that arrives quarterly, carrying the consumables and wear items for the quarter ahead plus a thin layer of failure items, costs a fraction of the same parts ordered reactively in small air-freighted batches. It also keeps the workshop's promise to the customer, which is the part that does not appear on the invoice.",
      },
      {
        type: "list",
        items: [
          "Build a per-model consumption list from your own service records once you have six months of them, and from the platform's known pattern before that",
          "Order to a coverage period — a quarter, or a season — rather than to a reorder point",
          "Consolidate across models and OEMs into one shipment where the destination and the buyer are the same",
          "Keep failure items to the long-lead-time ones only, and let the locally available ones stay local",
          "Review the list after the first year against what actually moved; the second-year list is always different from the first",
        ],
      },
      { type: "heading", text: "Genuine or aftermarket is a decision, not a default" },
      {
        type: "paragraph",
        text: "Both are legitimate and they price very differently. Warranty work and safety-critical items usually justify OEM-genuine. General aftermarket resale and older vehicles out of warranty often do not. The failure mode is not choosing one over the other — it is not deciding, and ending up with a shelf that mixes both at genuine prices.",
      },
      {
        type: "paragraph",
        text: "Tell a supplier which you want, per band if necessary. A parts enquiry that says “OEM-genuine for brakes and clutch, aftermarket for filters and bushes” is a better enquiry than one that says “best price”.",
      },
      { type: "heading", text: "Packaging, labelling and identification" },
      {
        type: "paragraph",
        text: "Small items that arrive in unmarked bulk cost the workshop time on every single job. Specify carton quantities, individual packaging where a part needs it, and labelling that carries the part identification in a form your storeman can read. If your market requires particular labelling on imported goods, that belongs in the enquiry rather than in a correction after the first shipment.",
      },
      {
        type: "note",
        title: "A practical starting point",
        text: "Our vehicle model schedule lists the components most often requested for each model, market by market. It is a demand record rather than a stock list, but as a first-pass consumption list for a platform you are about to support, it is a reasonable place to begin.",
      },
      {
        type: "paragraph",
        text: "None of this needs to be perfect at the start. It needs to exist at the start, because a parts plan written in the first month is cheap and a parts plan written after the first stock-out is not.",
      },
    ],
    cta: {
      label: "Browse spare parts by vehicle model",
      href: "/vehicle-models",
    },
    related: ["vehicle-export-enquiry-checklist", "india-distribution-route-overseas-brands"],
  },

  {
    slug: "homologation-market-entry-basics",
    title: "Homologation: what actually changes when you enter a new market",
    seoTitle: "Vehicle Homologation & Type Approval Explained | GTS Trade Solutions",
    metaDescription:
      "What homologation and type approval involve when taking a vehicle or component into a new market — the sequence, the documentation, the testing and the common delays.",
    keywords: [
      "vehicle homologation",
      "type approval",
      "vehicle certification India",
      "component homologation",
      "automotive testing coordination",
      "market entry compliance",
    ],
    category: "Homologation",
    publishedAt: "2026-05-19",
    readingMinutes: 7,
    excerpt:
      "Homologation is rarely the technical problem people expect. It is a sequencing problem, and it is usually the reason a launch date moves.",
    body: [
      {
        type: "paragraph",
        text: "Homologation is the process by which a market satisfies itself that a vehicle or component meets the rules it enforces — safety, emissions, noise, lighting, braking, dimensions, and whatever else that market has legislated. The engineering is usually the least surprising part. What catches programmes out is the order the steps have to happen in, and the fact that several of them cannot be shortened by paying more.",
      },
      { type: "heading", text: "Start from the regulation, not from the product" },
      {
        type: "paragraph",
        text: "The first useful question is not “will our vehicle pass?” but “which regulation applies to this vehicle, in this category, in this market, on this date?” Category definitions differ between markets, and a product that is one category at home can be another category on arrival — with a different test list attached. A quadricycle, a light commercial vehicle and a passenger car are not the same regulatory object even when they look similar on a spec sheet.",
      },
      {
        type: "paragraph",
        text: "Date matters too. Standards have implementation dates, and a programme scoped against the current standard that lands after a transition has occurred will be tested against the new one.",
      },
      { type: "heading", text: "The sequence that usually works" },
      {
        type: "list",
        ordered: true,
        items: [
          "Regulatory scoping — establish the category, the applicable standards and the required test list for the specific market and date",
          "Gap assessment — compare the existing product and its existing test evidence against that list, and identify what is missing rather than what is uncertain",
          "Documentation preparation — technical files, drawings, material and component declarations, conformity-of-production arrangements",
          "Test planning — book the facilities, in the order the tests depend on each other, allowing for sample build and shipping",
          "Testing and witnessing — conducted at authorised or accredited facilities as the market requires",
          "Submission and approval — through the authorised agency for that market",
          "Conformity of production — the ongoing part people forget, which keeps the approval valid after it is granted",
        ],
      },
      {
        type: "paragraph",
        text: "Steps two and three are where time is won. A gap assessment that is honest about missing evidence is worth more than an optimistic one, because the missing evidence sets the critical path and the critical path sets the launch date.",
      },
      { type: "heading", text: "Where existing evidence can be reused — and where it cannot" },
      {
        type: "paragraph",
        text: "Some markets accept test reports issued under recognised international arrangements; others require testing in-country regardless of what has already been done. Reusing evidence is often possible for components and less often possible for whole vehicles. Establishing which applies before booking anything avoids the most expensive mistake in this process, which is paying twice for the same test.",
      },
      { type: "heading", text: "The delays that actually happen" },
      {
        type: "list",
        items: [
          "Test samples that are not representative of production, and have to be rebuilt",
          "Component-level declarations missing from the technical file, holding up submission after all the testing is complete",
          "Test slots booked in the wrong order, so a failed early test invalidates later ones",
          "A specification change made for commercial reasons mid-programme, which resets part of the test list",
          "Facility lead times treated as a formality — they are frequently the longest single item on the plan",
        ],
      },
      {
        type: "paragraph",
        text: "Notice that only one of these is a technical failure. The rest are planning failures, which is why homologation belongs in the programme schedule from the start rather than being handed to compliance at the end.",
      },
      { type: "heading", text: "Components have their own version of this" },
      {
        type: "paragraph",
        text: "A component supplier entering a new market faces a smaller but similar process: which standard the part is certified against, whether the certification is recognised, what the marking requirements are, and what the customer's own approval process adds on top. For a Tier-1 supply arrangement, the OEM's validation requirements usually exceed the regulator's, and both have to be satisfied.",
      },
      {
        type: "note",
        title: "Who issues what",
        text: "Type approval and certification are performed by authorised agencies, and in India that is a defined list of them. We act as a support and coordination partner — reviewing regulatory requirements, preparing and coordinating documentation, and working with authorised test facilities on your behalf. We do not issue approvals or certificates.",
      },
      { type: "heading", text: "What to have ready before the first conversation" },
      {
        type: "paragraph",
        text: "The target market and the intended launch window; the product category as you understand it; the existing specification and any test evidence already held; whether the product will be imported built-up, imported as a kit, or assembled locally; and the volume, because low-volume routes exist in some markets and change the whole approach.",
      },
      {
        type: "paragraph",
        text: "With those five things, a realistic scope and sequence can usually be drawn up quickly. Without them, any timeline offered is a guess.",
      },
    ],
    cta: {
      label: "Discuss homologation and testing",
      href: "/contact?enquiry=homologation-testing#rfq",
    },
    related: ["vehicle-export-enquiry-checklist", "india-distribution-route-overseas-brands"],
  },

  {
    slug: "choosing-trailer-axle-specification",
    title: "Choosing a trailer axle: the three numbers that decide everything else",
    seoTitle: "How to Specify a Trailer Axle — Rating, Track & Suspension | GTS",
    metaDescription:
      "Specifying a trailer axle: how rating, track width and suspension type determine braking, wheels, tyres and ride height — and what to send with an axle enquiry.",
    keywords: [
      "trailer axle specification",
      "trailer axle supplier",
      "trailer air suspension",
      "trailer axle rating",
      "trailer track width",
      "trailer EBS",
    ],
    category: "Components",
    publishedAt: "2026-06-09",
    readingMinutes: 6,
    excerpt:
      "Trailer running gear is the most frequently requested component group we handle, and almost every enquiry turns on the same three figures.",
    body: [
      {
        type: "paragraph",
        text: "Trailer axles look like a catalogue purchase and are not. The same nominal rating covers products that behave very differently in service, and the difference shows up as bearing life, brake wear and tyre wear rather than as anything visible on delivery. Three figures determine almost the whole specification, and once they are fixed most of the remaining choices follow.",
      },
      { type: "heading", text: "One: rating per axle, and the duty behind it" },
      {
        type: "paragraph",
        text: "Rating is not simply payload divided by the number of axles. It has to account for how the load actually distributes, what happens under braking and cornering, and the road surface the trailer works on. A 13-tonne axle under a highway curtain-side and a 13-tonne axle under a tipper working site roads are being asked for different things, and specifying by the number alone gets one of them wrong.",
      },
      {
        type: "paragraph",
        text: "So state the trailer type and the duty cycle alongside the rating: on-highway, mixed, or off-road. It is the single most useful qualifier on an axle enquiry.",
      },
      { type: "heading", text: "Two: track width and the required ride height" },
      {
        type: "paragraph",
        text: "Track width has to match the trailer's frame, the intended wheel and tyre package, and the legal width in the market it operates in. Ride height then follows from the deck height you need and the suspension you choose. Getting these wrong is not a performance problem, it is a fitment problem, and fitment problems are discovered after delivery.",
      },
      {
        type: "paragraph",
        text: "If the trailer is being built to an existing design, send the drawing. If it is a new build, send the deck height, the frame dimensions and the wheel package you intend to use.",
      },
      { type: "heading", text: "Three: suspension type" },
      {
        type: "paragraph",
        text: "Mechanical leaf or air, and this decision reaches further than the suspension itself.",
      },
      {
        type: "list",
        items: [
          "Mechanical leaf — simpler, cheaper, more tolerant of poor maintenance and rough surfaces, and easier to repair with locally available parts. Still the right answer for a great many operations.",
          "Air — better ride quality and load protection, ride-height control, easier coupling at a fixed dock height, and lower dynamic loading into the frame. Requires an air system, and requires maintenance that is actually carried out.",
        ],
      },
      {
        type: "paragraph",
        text: "The deciding factor is usually not the cargo. It is whether the operation has the maintenance capability and the parts access to keep an air system healthy. An air suspension that is not maintained performs worse than a leaf spring that is.",
      },
      { type: "heading", text: "What follows once those three are fixed" },
      {
        type: "list",
        items: [
          "Braking — drum or disc, and whether ABS or EBS is required in your market and for your configuration",
          "Wheels — rim size, PCD and offset, which have to agree with both the hub and the tyre",
          "Tyres — size and construction, matched to the axle rating and the duty cycle rather than to the rim alone",
          "Hubs, bearings and seals — the parts that will define your service interval",
          "Landing legs, kingpin and fifth-wheel compatibility on a semi-trailer, which have to match the tractor unit, not just the trailer",
          "Lighting, mudguards and marking to the destination market's requirements",
        ],
      },
      { type: "heading", text: "The coupling interface deserves its own check" },
      {
        type: "paragraph",
        text: "On a semi-trailer, kingpin size and fifth-wheel compatibility are decided by the tractor units that will actually pull it — including the ones the operator might add later. A mixed fleet with two different coupling standards is a problem that gets more expensive every year it goes unaddressed, and it is trivially avoidable at specification time.",
      },
      { type: "heading", text: "What to send with an axle enquiry" },
      {
        type: "list",
        ordered: true,
        items: [
          "Trailer type — flatbed, container, low-bed, tipper, tanker, box or curtain-side",
          "Number of axles and the rating required per axle",
          "Track width, and the ride height the deck height implies",
          "Suspension: mechanical leaf or air",
          "Braking: drum or disc, with or without ABS or EBS",
          "Wheel and tyre package, with PCD and offset if already fixed",
          "Kingpin size and fifth-wheel standard, for semi-trailers",
          "Quantity for this order and expected annual volume",
        ],
      },
      {
        type: "paragraph",
        text: "That is enough to quote from without a second round of questions. If some of it is not decided yet, say which — a specification conversation is a perfectly good starting point, and it is a much better one than a rating with nothing attached to it.",
      },
    ],
    cta: {
      label: "Request trailer running gear",
      href: "/automotive-parts/trailer-components",
    },
    related: ["ev-component-sourcing-duty-cycle", "spare-parts-planning-african-markets"],
  },

  {
    slug: "india-distribution-route-overseas-brands",
    title: "Building an India distribution route for an overseas brand",
    seoTitle: "India Distribution & Dealership Setup for Overseas Brands | GTS",
    metaDescription:
      "How an overseas manufacturer builds a distribution or dealership route into India: market assessment, partner selection, pricing, after-sales setup and launch sequencing.",
    keywords: [
      "India distribution partner",
      "India dealership setup",
      "distributor in India",
      "market entry India automotive",
      "India go to market strategy",
      "brand representation India",
    ],
    category: "Market Entry",
    publishedAt: "2026-07-14",
    readingMinutes: 8,
    excerpt:
      "The common failure is not picking the wrong partner. It is appointing a partner before deciding what the partner is supposed to do.",
    body: [
      {
        type: "paragraph",
        text: "Overseas manufacturers usually arrive at India with a distributor question: who should we appoint? It is the right question in the wrong order. A distributor is an answer to a commercial design, and if the design has not been made explicit, any appointment is a guess — including a good one, which is worse, because it takes two years to find out.",
      },
      {
        type: "paragraph",
        text: "What follows is the sequence that tends to hold up, and the decisions each stage forces.",
      },
      { type: "heading", text: "Stage one: decide what you are actually selling into" },
      {
        type: "paragraph",
        text: "India is not one market and the segment structure rarely maps onto the home market's. The same product can face a price-led volume segment, a specification-led industrial segment and an institutional or tender segment, each with different buyers, different channels and different service expectations. Choose which of those you are entering first. Attempting all three at once is the most common cause of a launch that never gains traction anywhere.",
      },
      {
        type: "list",
        items: [
          "Which segment, and roughly how large is it for your product category",
          "Who the incumbents are, and what they charge — not their list prices, their street prices",
          "Whether local manufacturing already serves this segment, because that sets your landed-cost ceiling",
          "Whether the buying decision is technical, commercial or institutional, since that decides the channel",
        ],
      },
      { type: "heading", text: "Stage two: get the landed cost onto the table early" },
      {
        type: "paragraph",
        text: "Duty, freight, inland logistics, working capital and channel margin have to be stacked up before partner conversations start — because the answer determines what kind of partner is even viable. If the landed cost lands above the segment's price band, no distributor can fix that, and the honest options are a different segment, a different product configuration, local assembly, or not entering yet.",
      },
      {
        type: "paragraph",
        text: "This is the stage most likely to change the plan, which is exactly why it should come before the appointment rather than after it.",
      },
      { type: "heading", text: "Stage three: choose the structure, then the partner" },
      {
        type: "paragraph",
        text: "There is a real choice here and it is frequently skipped:",
      },
      {
        type: "list",
        items: [
          "A single national distributor — simplest to manage, slowest to build coverage, and it concentrates your market knowledge in someone else's business",
          "Regional distributors — faster coverage and better local presence, more management overhead, and it needs a pricing discipline that prevents them competing with each other",
          "An appointed dealer network under your own representation — most control and most work, and it usually requires someone acting for you in India",
          "Direct institutional or OEM supply, with a channel alongside it for aftermarket demand",
        ],
      },
      {
        type: "paragraph",
        text: "Only once the structure is chosen does partner selection become answerable, because you now know what you are asking a partner to do — hold stock, carry credit, provide service, cover which territory, at what expected volume.",
      },
      { type: "heading", text: "Stage four: decide the after-sales position before launch" },
      {
        type: "paragraph",
        text: "In automotive and industrial categories, after-sales is not a support function, it is a purchase condition. Buyers ask who fixes it and where the parts come from before they ask about price. A launch without an answer to that gets a hearing and no orders.",
      },
      {
        type: "list",
        items: [
          "Initial spares stock — what is held in India, by whom, and who funds it",
          "Service capability — the partner's own workshops, an appointed service network, or a third party",
          "Technical training for the partner's staff, and who delivers it",
          "Warranty terms and the claim process, which need to be workable at the distance involved",
          "Technical documentation in a form the local workshop can actually use",
        ],
      },
      { type: "heading", text: "Stage five: sequence the launch" },
      {
        type: "paragraph",
        text: "A first order that is deliberately small, into a defined territory, with the service arrangement live before the units ship. Then a review against real demand rather than forecast demand, and only then expansion. Programmes that open nationally on day one spend their launch budget discovering what a pilot would have told them for a fraction of it.",
      },
      { type: "heading", text: "What we do inside this" },
      {
        type: "paragraph",
        text: "GTS acts as the representation and market-development partner in that sequence: segment assessment and positioning, identification and evaluation of distributors, dealers and service partners, dealer-network development, after-sales and spares planning, guidance on product and documentation localisation, and launch coordination including customer introductions and first-order handling.",
      },
      {
        type: "note",
        title: "What we do not claim",
        text: "We support, coordinate and facilitate. Statutory approvals and registrations are issued by the competent authorities and licensed agents, and commercial appointments are yours to make — we bring you the shortlist, the assessment and the coordination, not a guaranteed outcome.",
      },
      {
        type: "paragraph",
        text: "If you are earlier than stage one and simply want to know whether the category is worth the effort, that is a reasonable first conversation too — and a cheaper one than finding out later.",
      },
    ],
    cta: {
      label: "Discuss an India partnership",
      href: "/contact?enquiry=india-dealership#rfq",
    },
    related: ["homologation-market-entry-basics", "spare-parts-planning-african-markets"],
  },

  {
    slug: "ev-component-sourcing-duty-cycle",
    title: "EV component sourcing starts with the duty cycle, not the parts list",
    seoTitle: "EV Component Sourcing — Start With the Duty Cycle | GTS Trade Solutions",
    metaDescription:
      "Why EV component selection is a system decision: how duty cycle, voltage, power and thermal strategy constrain each other across e-axles, motors, batteries and chargers.",
    keywords: [
      "EV component sourcing",
      "e axle supplier",
      "traction motor selection",
      "EV battery pack BMS",
      "EV charger selection",
      "electric vehicle duty cycle",
    ],
    category: "EV",
    publishedAt: "2026-08-05",
    readingMinutes: 6,
    excerpt:
      "Almost every EV component enquiry we receive is a shopping list. Almost every one changes once the vehicle's actual working day is on the table.",
    body: [
      {
        type: "paragraph",
        text: "A typical EV enquiry names a motor power, a battery capacity and a controller, and asks for pricing. It can be quoted, and the quotation is usually not useful — because those three numbers were chosen independently, and in an electric powertrain they are not independent. Voltage, power, capacity, gearing and thermal strategy constrain each other. Fix them one at a time and the result is a vehicle that meets none of its targets while being more expensive than one that does.",
      },
      { type: "heading", text: "The duty cycle is the specification" },
      {
        type: "paragraph",
        text: "What the vehicle does all day determines every component choice downstream. Not the peak figures — the repeated, ordinary working pattern:",
      },
      {
        type: "list",
        items: [
          "Kerb weight and payload, and how often it runs loaded versus empty",
          "Daily distance, and whether it is one continuous run or many short trips",
          "Speed profile, and how much of the day is spent stopped",
          "Gradients, and whether they are met loaded",
          "Stop-start frequency, which drives thermal load more than top speed does",
          "Ambient temperature range, and whether the vehicle sits in the sun between runs",
          "Charging opportunity — overnight only, or a depot break in the middle of the day",
        ],
      },
      {
        type: "paragraph",
        text: "A three-wheeler doing 120 km of urban stop-start work fully loaded and a three-wheeler doing 120 km of steady suburban running lightly loaded need different motors, different cooling and different battery sizing, even though the range figure is identical.",
      },
      { type: "heading", text: "Then voltage, and it decides more than you expect" },
      {
        type: "paragraph",
        text: "System voltage sets current for a given power, and current sets conductor sizing, connector selection, contactor ratings, losses and heat. It also constrains which motors, controllers and chargers are available to you at sensible cost. Choosing voltage late means re-selecting components that were already chosen; choosing it early, from the power the duty cycle demands, means the rest of the selection converges instead of oscillating.",
      },
      { type: "heading", text: "Continuous power, not peak power" },
      {
        type: "paragraph",
        text: "Peak power sells motors and continuous power moves vehicles. What matters is the power the motor can hold at the temperature it will actually reach in your duty cycle, with your cooling, in your ambient. A motor rated generously on paper and thermally derated in service is the most common disappointment in this category, and it is entirely predictable from the duty cycle.",
      },
      {
        type: "paragraph",
        text: "Gradeability is the honest test. State the gradient, the load and how long the climb lasts, and the required continuous rating falls out of it.",
      },
      { type: "heading", text: "Battery: capacity, chemistry and format together" },
      {
        type: "paragraph",
        text: "Capacity comes from daily energy consumption plus a margin for degradation, temperature and the reserve the operator will actually keep. Chemistry is a trade between energy density, cycle life, thermal behaviour, cost and safety — and the right answer differs sharply between a light two-wheeler and a depot-charged commercial vehicle. Pack format and mounting then have to survive the vehicle's real vibration and ingress environment, which for many markets is more demanding than the datasheet assumes.",
      },
      {
        type: "paragraph",
        text: "The BMS is part of this decision, not an accessory to it. Its protection thresholds, balancing behaviour and communication interface have to match the pack, the charger and the vehicle controller.",
      },
      { type: "heading", text: "Charging is an operational choice" },
      {
        type: "paragraph",
        text: "AC or DC, at what power, and against what turnaround requirement. Fast charging raises thermal load, affects cycle life and requires infrastructure the operator may not have. Depot overnight charging is usually cheaper in every dimension. Decide this from the operating pattern rather than from a specification-sheet ambition, because it feeds back into the battery and cooling decisions.",
      },
      { type: "heading", text: "Thermal strategy ties it together" },
      {
        type: "paragraph",
        text: "Air or liquid cooling for the motor, the controller and the pack. Air is simpler and cheaper and sufficient for many light-vehicle duty cycles. Liquid becomes necessary as continuous power, ambient temperature and charge rate rise. This choice is often left to last and it is often the reason a programme has to re-select components, because a system that cannot hold its temperature cannot hold its rating.",
      },
      {
        type: "note",
        title: "What to send instead of a parts list",
        text: "Vehicle platform and kerb weight plus payload; target range and system voltage if fixed; continuous and peak power, and gradeability; battery capacity, chemistry and pack format if decided; charging type and target charge time; and the cooling strategy. Send the duty cycle even where the components are not yet chosen — it is the part we can actually work from.",
      },
      {
        type: "paragraph",
        text: "Programmes that arrive with a duty cycle and open questions get further, faster, than programmes that arrive with a fixed parts list and a fixed budget. The parts list is the output of this conversation, not the input to it.",
      },
    ],
    cta: {
      label: "Discuss EV component sourcing",
      href: "/automotive-parts/ev-components",
    },
    related: ["choosing-trailer-axle-specification", "spare-parts-planning-african-markets"],
  },
];

/** Newest first — the order the blog index and the sitemap use. */
export const blogPostsByDate = [...blogPosts].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export const findBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);

export const blogCategories = [...new Set(blogPosts.map((post) => post.category))];

/** Resolves a post's `related` slugs, then tops up with the next newest posts. */
export function relatedPosts(post: BlogPost, count = 2) {
  const picked = post.related
    .map((slug) => findBlogPost(slug))
    .filter((item): item is BlogPost => item !== undefined && item.slug !== post.slug);

  const filler = blogPostsByDate.filter(
    (item) => item.slug !== post.slug && !picked.some((p) => p.slug === item.slug),
  );

  return [...picked, ...filler].slice(0, count);
}

/** "12 March 2026" — fixed locale so the server and client agree. */
export const formatPostDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
