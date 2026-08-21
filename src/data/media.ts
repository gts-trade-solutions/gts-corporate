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
} satisfies Record<string, MediaSlot>;

export type MediaKey = keyof typeof slots;

/* Declared as Record<MediaKey, MediaSlot> so `src` is optional-but-present on
   every slot — otherwise TypeScript narrows it away when no slot sets one. */
export const media: Record<MediaKey, MediaSlot> = slots;
