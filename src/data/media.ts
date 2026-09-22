/**
 * Image slots.
 *
 * Every visual slot on the site is declared here, and every slot now carries a
 * photograph. A slot without `src` would render its generated scene artwork, so
 * a new slot can be added before its picture exists. To change a photo:
 *
 *   1. Put the file in `public/images/` (WebP or AVIF, ~2000px wide).
 *   2. Set `src` on the slot below, e.g. `src: "/images/home-hero.webp"`.
 *   3. Update `alt` to describe the actual photograph, and `credit`.
 *
 * Nothing else changes — `<Media>` switches to next/image automatically.
 * `brief` records what the photograph should show, for whoever replaces it.
 *
 * Two sources. The ODC Logistics photographs were supplied by the client. The
 * rest are Unsplash photographs (free for commercial use under the Unsplash
 * License, no attribution required); `credit` records the photographer and the
 * source page so each one can be traced or swapped for a GTS photograph later.
 * They illustrate the subject — none of them is presented as a GTS facility.
 *
 * A slot can carry a video instead. Put the file in `public/videos/`, set
 * `video` to it (H.264 MP4, muted, no audio track, a few seconds, looping
 * cleanly — it is decoration, not content) and `src` to a still from it,
 * which is used as the poster — the frame the server renders, the frame a
 * crawler indexes, and the frame that stays under reduced motion. A slot with a
 * `video` but no `src` is a mistake the type below rejects.
 */

export type SceneName = "port" | "fabrication";

type MediaBase = {
  alt: string;
  scene: SceneName;
  brief: string;
  /** Where the photograph came from, when it is not the client's own. */
  credit?: { name: string; url: string };
  /**
   * CSS `object-position` for the crop, when the subject is not centred —
   * e.g. "center 80%" keeps a low subject in frame in a wide slot.
   */
  position?: string;
};

const unsplash = (name: string, id: string) => ({ name, url: `https://unsplash.com/photos/${id}` });

/**
 * Either a still (or nothing yet, which renders the scene artwork), or a video
 * — which must bring a still with it to use as its poster.
 */
export type MediaSlot = MediaBase &
  ({ src?: string; video?: undefined } | { src: string; video: string });

const slots = {
  // `satisfies` keeps the literal keys while checking each value against MediaSlot.
  manufacturingHero: {
    src: "/images/manufacturing-hero.webp",
    alt: "A fabricator in a hard hat grinding the seam of a large rolled-steel cylinder, sparks spraying across a workshop floor.",
    scene: "fabrication",
    brief: "Wide fabrication shop interior. Space on the left for the headline.",
    credit: unsplash("Ahsanization", "mJi2I9KJPQ8"),
  },
  consultingHero: {
    src: "/images/consulting-hero.webp",
    alt: "Three engineers reviewing data on a laptop beside an instrumented steering and cockpit test rig in an automotive workshop.",
    scene: "fabrication",
    brief: "Technical inspection or testing setting — vehicle on a lift, or an engineer with a clipboard.",
    credit: unsplash("ThisisEngineering", "bIltCMXIwRE"),
  },

  /* ODC Logistics photography. Supplied from the RACE Innovations logistics
     page and converted to WebP at 1536px — see §5 of the README. */
  odcJetty: {
    src: "/images/odc-jetty-loading.webp",
    alt: "Two large blue pressure vessels on self-propelled modular trailers being loaded onto a barge at a dockside, with harbour cranes and a ship behind.",
    scene: "port",
    brief:
      "Multimodal interface: over-dimensional cargo at the road-to-water handover. Replace with a GTS project photograph when one is available.",
  },
  /* The road-movement slot is `odcTransportation` below. An earlier photo here
     carried RACE branding on the load; it was dropped once the client supplied
     an unbranded equivalent. */
  routeSurveyJunction: {
    src: "/images/route-survey-junction.webp",
    alt: "Aerial view of an extremely long green girder trailer negotiating a road junction and roundabout, its rear steering dolly swinging wide across the opposite carriageway.",
    scene: "port",
    brief:
      "Swept path and turning radius at a junction — the constraint a route survey exists to find. Aerial framing is important here.",
  },
  odcConsultation: {
    src: "/images/odc-consultation.webp",
    alt: "Two people reviewing charts and a laptop across a table at a container yard, with stacked containers and a truck behind them.",
    scene: "fabrication",
    brief: "Planning or briefing conversation in a logistics setting.",
  },
  routeSurveyTeam: {
    src: "/images/route-survey-team.webp",
    alt: "Two surveyors in high-visibility vests conferring over a field notebook beside a total station mounted on a tripod at the roadside.",
    scene: "fabrication",
    brief: "Survey crew at work in the field — the human side of a route survey.",
  },
  routeSurveyInstrument: {
    src: "/images/route-survey-instrument.webp",
    alt: "A surveyor in a high-visibility jacket and hard hat setting up a total station on a tripod at a construction site.",
    scene: "fabrication",
    brief: "Close work with the instrument — measurement rather than observation.",
  },

  /* The six ODC service photographs, supplied by the client. */
  odcTransportation: {
    src: "/images/odc-transportation.webp",
    alt: "A large pressure vessel on a multi-axle hydraulic trailer hauled by a white prime mover at sunset, with escort vehicles ahead showing warning lights.",
    scene: "fabrication",
    brief: "ODC transportation on the road with escort — the core movement service.",
  },
  clearingForwarding: {
    src: "/images/clearing-forwarding.webp",
    alt: "Two people in hard hats reviewing documents on a wet quayside, with a container ship, gantry cranes, stacked containers and a truck behind them.",
    scene: "port",
    brief: "Clearance and forwarding at the port interface.",
  },
  multimodalTransport: {
    src: "/images/multimodal-transport.webp",
    alt: "A pressure vessel on a low-bed trailer beside a freight locomotive and a container ship at a port, with an aircraft overhead.",
    scene: "port",
    brief: "Road, rail and sea in one frame — the multimodal handover.",
  },
  loadingLashing: {
    src: "/images/loading-lashing.webp",
    alt: "Workers in high-visibility clothing chaining and lashing a large industrial vessel onto a multi-axle trailer at a quayside, with a crane overhead.",
    scene: "port",
    brief: "Cargo being secured — chains, blocking and bracing on the trailer deck.",
  },
  trailerModification: {
    src: "/images/trailer-modification.webp",
    alt: "Technicians welding and working on a multi-axle trailer chassis inside a fabrication workshop, with sparks from the welding arc.",
    scene: "fabrication",
    brief: "Trailer being modified in the workshop.",
  },
  trailerDevelopment: {
    src: "/images/trailer-development.webp",
    alt: "Four engineers reviewing trailer general-arrangement drawings and a CAD model on screen, with a modular multi-axle trailer on the workshop floor behind them.",
    scene: "fabrication",
    brief: "Trailer development — drawings, CAD and the build on the floor behind.",
  },

  /* One photograph per page outside ODC Logistics. Where a page has a hero
     banner the photograph sits behind it; the landing-page cards that link to
     a page reuse that page's slot, so the picture carries through the click. */
  tradeCategories: {
    src: "/images/trade-categories.webp",
    alt: "A forklift carrying a pallet of stacked cartons across a yard towards a red container on a trailer.",
    scene: "port",
    brief:
      "Mixed general cargo in a warehouse or transit shed: pallets, cartons, drums, steel coil. Should read as goods being consolidated for shipment, not a retail stockroom.",
    credit: unsplash("Solømen", "tw_2KG48-vg"),
  },
  vehicleTrade: {
    src: "/images/vehicle-trade.webp",
    alt: "Cars, vans and a minibus parked in rows on the open vehicle deck of a ferry at sea.",
    scene: "port",
    brief:
      "Vehicles staged for export — a marshalling yard, RoRo berth or compound with rows of trucks or cars. Complete units, not parts.",
    credit: unsplash("Adem Percem", "27SvyguDTRo"),
  },
  indiaPartner: {
    src: "/images/india-partner.webp",
    alt: "Two business representatives shaking hands across a table over a signed agreement in a document folder.",
    scene: "fabrication",
    brief:
      "The partnership moment: a handshake, dealership forecourt or distributor meeting in an Indian commercial setting.",
    credit: unsplash("Amina Atar", "MA4aW8ZOzLM"),
    position: "center 40%",
  },
  automotivePartsHero: {
    src: "/images/automotive-parts-hero.webp",
    alt: "A ventilated brake disc and caliper assembly mounted on a vehicle hub, shown close up on a workshop stand.",
    scene: "fabrication",
    brief:
      "The Automotive Parts banner. Video preferred: 8-12s of components on a line, a parts warehouse aisle, or an axle or brake assembly being built — muted, no audio track, looping cleanly, H.264 MP4 under ~4MB, shot wide with the left third uncluttered so the headline sits clear. Supply a still from the same footage as `src`; it is the poster and the reduced-motion frame. A photograph alone is fine — set only `src`.",
    credit: unsplash("Toby Hall", "ii4XEyJEm_I"),
  },
  automotiveParts: {
    src: "/images/automotive-parts.webp",
    alt: "A heap of transmission gears, sprockets and bearings in steel and bronze tones.",
    scene: "fabrication",
    brief:
      "Components in bulk: parts warehouse racking, or a bench laid out with axles, discs, filters and bearings. Must look like trade stock, not a single hero part.",
    credit: unsplash("Jonathan Borba", "xRDuEeG1TVI"),
  },
  manufacturingProcess: {
    src: "/images/manufacturing-process.webp",
    alt: "Hands measuring a machined steel part with a digital caliper on a workbench.",
    scene: "fabrication",
    brief:
      "First-article inspection: measurement against a drawing — caliper, gauge or CMM. The validation step before volume is committed.",
    credit: unsplash("Hans Westbeek", "_luiFaaZU6k"),
  },
  consultingFireSafety: {
    src: "/images/consulting-fire-safety.webp",
    alt: "A red fire hydrant pillar and a wall-mounted hydrant hose cabinet installed outside an industrial building.",
    scene: "fabrication",
    brief:
      "Installed fire protection: sprinkler pipework, hydrant, alarm panel or extinguisher bank in an industrial or commercial building.",
    credit: unsplash("Rifandi G", "Ck_BPUdbbqc"),
  },
  consultingVehicleService: {
    src: "/images/consulting-vehicle-service.webp",
    alt: "An orange commercial truck in a workshop bay with its bonnet raised and the engine exposed for service.",
    scene: "fabrication",
    brief:
      "Commercial vehicle in the workshop: truck or bus on a lift or over a pit, technician at the brakes, axle or suspension.",
    credit: unsplash("Norbert Buduczki", "kXTjna7saAw"),
  },
  consultingHomologation: {
    src: "/images/consulting-homologation.webp",
    alt: "A test engineer standing beside an SUV on the turntable of an anechoic electromagnetic-compatibility test chamber.",
    scene: "fabrication",
    brief:
      "Testing or approval work: vehicle on a rig or rolling road, instrumented and cabled, engineer at a terminal.",
    credit: unsplash("ThisisEngineering", "TLv3hMarnFo"),
  },
  blogJournal: {
    src: "/images/blog-journal.webp",
    alt: "An engineer at a desk reviewing printed technical drawings, with screwdrivers, pliers and a laptop beside them.",
    scene: "fabrication",
    brief:
      "The writing desk of a technical business: marked-up drawings or spec sheets, notebook and laptop. Editorial rather than industrial.",
    credit: unsplash("ThisisEngineering", "M_NvKwSOkug"),
  },
  contactCity: {
    src: "/images/contact-chennai.webp",
    alt: "A daytime view across Chennai, Tamil Nadu — apartment blocks and offices among trees under a blue sky.",
    scene: "fabrication",
    brief:
      "Currently a view of Chennai, where the marketing office is. Replace with GTS people at work — the office, a desk taking an enquiry, or the team — when a photograph of the actual company is available.",
    credit: unsplash("Danachezhian S", "u1QN2S6_kdc"),
  },

  /* Module banner photographs for the split hero. The picture fills half the
     banner at lg and the full width below it, with the breadcrumb and headline
     over its lower edge — so the lower third wants to be uncluttered. */
  importExportHero: {
    src: "/images/import-export-hero.webp",
    alt: "Aerial view of a container terminal on the coast — thousands of stacked containers, gantry cranes along the quay and ships at berth.",
    scene: "port",
    brief:
      "Import & Export banner. Port yard, container handling or a loading bay. Keep the lower third clear — the headline sits over it.",
    credit: unsplash("Olga Subach", "Zuxxq0iHkN4"),
  },
  vehicleModelsHero: {
    src: "/images/vehicle-models-hero.webp",
    alt: "A hand-painted Indian goods truck loaded with crates on a highway, with a hatchback and container lorries alongside.",
    scene: "fabrication",
    brief:
      "Vehicle Models banner. A row of vehicles — trucks, cars, three-wheelers — at a yard or dealership. Keep the lower third clear.",
    credit: unsplash("Siddhesh Mangela", "IXi9rM9yMPM"),
  },

  /* The four home banner slides. Each needs room on the left for the headline
     — the scrim darkens that side — and they are deliberately different
     photographs from the home page's service cards, so nothing repeats on the
     page. */
  slideTrade: {
    src: "/images/slide-trade.webp",
    alt: "A container ship being loaded under a row of gantry cranes at a busy port at dusk, the terminal lit up below the city.",
    scene: "port",
    brief:
      "Banner 1 of 4 — Import & Export. Container terminal or port yard, wide, with space on the left for the headline.",
    credit: unsplash("Timelab", "yx20mpDyr2I"),
  },
  slideComponents: {
    src: "/images/slide-components.webp",
    alt: "Top-down view of a vehicle's suspension and brake plumbing — two coil-over dampers, a brake-fluid reservoir cap and braided hoses.",
    scene: "fabrication",
    brief:
      "Banner 2 of 4 — Automotive Parts. Axles, brake or suspension components laid out, or a parts warehouse aisle. Space on the left. Shoot or choose it in focus edge to edge — a shallow depth of field turns the left half, where the headline sits, into blur.",
    credit: unsplash("Sam Loyd", "qy27JnsH9sU"),
  },
  slideManufacturing: {
    src: "/images/slide-manufacturing.webp",
    alt: "A fabricator in a welding helmet and gloves grinding a steel beam, throwing a spray of sparks.",
    scene: "fabrication",
    brief:
      "Banner 3 of 4 — Contract Manufacturing. Welding or fabrication in progress on a chassis or trailer. Space on the left.",
    credit: unsplash("Josh Beech", "tXJhAFVOHVk"),
    position: "70% center",
  },
  slideConsulting: {
    src: "/images/slide-consulting.webp",
    alt: "A covered vehicle on a platform inside a brightly lit inspection tunnel at a vehicle test facility.",
    scene: "fabrication",
    brief:
      "Banner 4 of 4 — Consulting. Engineers with a drawing, tablet or test instrumentation beside a vehicle. Space on the left.",
    credit: unsplash("KJ Brix", "fBm0QU29OMg"),
  },

  /* One photograph per component category — the card on /automotive-parts and
     the banner of that category's own page. */
  partsTwoWheelers: {
    src: "/images/parts-two-wheelers.webp",
    alt: "A mechanic servicing a scooter's engine and CVT drive with the cover removed, the scooter on its stand.",
    scene: "fabrication",
    brief: "Two-wheeler components: an engine, drive or brake assembly on a motorcycle or scooter.",
    credit: unsplash("Mufid Majnun", "v4aNBdn_gAU"),
  },
  partsThreeWheelers: {
    src: "/images/parts-three-wheelers.webp",
    alt: "A black and yellow auto rickshaw parked against a bright green wall beside a red door.",
    scene: "fabrication",
    brief: "A passenger or cargo three-wheeler, ideally showing the rear axle or drivetrain.",
    credit: unsplash("Pop & Zebra", "wiug8R9aZSQ"),
  },
  partsCars: {
    src: "/images/parts-cars.webp",
    alt: "Robotic arms welding a car body-in-white on an assembly line.",
    scene: "fabrication",
    brief: "Passenger car or LCV components, or a body on the line.",
    credit: unsplash("Lenny Kuhne", "jHZ70nRk7Ns"),
  },
  partsTrucks: {
    src: "/images/parts-trucks.webp",
    alt: "A blue tractor unit hauling a loaded flatbed trailer along a wet highway at sunset.",
    scene: "fabrication",
    brief: "A medium or heavy commercial vehicle — ideally an Indian-market truck.",
    credit: unsplash("Zetong Li", "mVqTumQH-c0"),
  },
  partsBuses: {
    src: "/images/parts-buses.webp",
    alt: "Intercity coaches parked in rows at a bus terminal.",
    scene: "fabrication",
    brief: "City buses or coaches at a depot or terminal.",
    credit: unsplash("Alfandri Fitrahadi", "i73a614YiD8"),
  },
  partsEv: {
    src: "/images/parts-ev.webp",
    alt: "A charging connector plugged into the charge port of an electric car.",
    scene: "fabrication",
    brief: "EV drivetrain or battery components, or a vehicle on charge.",
    credit: unsplash("CHUTTERSNAP", "xJLsHl0hIik"),
  },
  partsTrailer: {
    src: "/images/parts-trailer.webp",
    alt: "Side view of a trailer's tri-axle running gear — three axles with dual wheels, hubs and mudguards.",
    scene: "fabrication",
    brief: "Trailer running gear: axles, suspension, wheels and hubs.",
    credit: unsplash("Mitchell Luo", "czTfiHjjviE"),
    position: "center 75%",
  },
  partsAgriculture: {
    src: "/images/parts-agriculture.webp",
    alt: "A red tractor with dual rear tyres standing in a ploughed field, autumn trees behind.",
    scene: "fabrication",
    brief: "A tractor or agricultural machine at work.",
    credit: unsplash("chris robert", "-MRR3ZV5XQw"),
  },
} satisfies Record<string, MediaSlot>;

export type MediaKey = keyof typeof slots;

/* Declared as Record<MediaKey, MediaSlot> so `src` is optional-but-present on
   every slot — otherwise TypeScript narrows it away when no slot sets one. */
export const media: Record<MediaKey, MediaSlot> = slots;
