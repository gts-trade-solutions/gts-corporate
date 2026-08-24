/**
 * Image slots.
 *
 * Every visual slot on the site is declared here. Until a photograph is
 * supplied, the slot renders its generated scene artwork, so the site is
 * complete as it stands. To use a real photo instead:
 *
 *   1. Put the file in `public/images/` (WebP or AVIF, ~2000px wide).
 *   2. Set `src` on the slot below, e.g. `src: "/images/home-hero.webp"`.
 *   3. Update `alt` to describe the actual photograph.
 *
 * Nothing else changes — `<Media>` switches to next/image automatically.
 * `brief` records what the photograph should show, for whoever sources it.
 */

export type SceneName = "port" | "fabrication";

export type MediaSlot = {
  src?: string;
  alt: string;
  scene: SceneName;
  brief: string;
};

const slots = {
  // `satisfies` keeps the literal keys while checking each value against MediaSlot.
  homeHero: {
    alt: "Container terminal with gantry cranes over stacked shipping containers.",
    scene: "port",
    brief:
      "Wide shot of a container terminal or port yard — cranes, stacked containers, ideally at dusk. Must have space on the left for the headline.",
  },
  homeManufacturing: {
    alt: "Fabrication workshop with a trailer chassis on stands beneath an overhead crane.",
    scene: "fabrication",
    brief: "Fabrication shop floor: chassis or trailer under construction, welding in progress.",
  },
  homeTrade: {
    alt: "Container terminal with gantry cranes over stacked shipping containers.",
    scene: "port",
    brief: "Loading bay, trucks at a warehouse, or cargo being handled.",
  },
  manufacturingHero: {
    alt: "Fabrication workshop with a trailer chassis on stands beneath an overhead crane.",
    scene: "fabrication",
    brief: "Wide fabrication shop interior. Space on the left for the headline.",
  },
  consultingHero: {
    alt: "Fabrication workshop with a trailer chassis on stands beneath an overhead crane.",
    scene: "fabrication",
    brief: "Technical inspection or testing setting — vehicle on a lift, or an engineer with a clipboard.",
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
} satisfies Record<string, MediaSlot>;

export type MediaKey = keyof typeof slots;

/* Declared as Record<MediaKey, MediaSlot> so `src` is optional-but-present on
   every slot — otherwise TypeScript narrows it away when no slot sets one. */
export const media: Record<MediaKey, MediaSlot> = slots;
