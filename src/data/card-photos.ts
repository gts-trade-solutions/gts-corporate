import { cc, type Photo } from "./photos";

/**
 * Photographs across the top of the category cards on Trade Categories, the
 * three consulting service pages, Manufacturing Scope and Route Survey.
 *
 * All are from Wikimedia Commons, in public/images/cards/. Each card prints
 * its photograph's credit, which the CC BY / BY-SA licences require. They
 * illustrate the subject; none shows a GTS facility, vehicle or project.
 *
 * Cards that link to a page of their own use that page's slot in media.ts
 * instead, and the Vehicle Trade cards use one of the vehicle-type photographs
 * from their segment page.
 */
const card = (name: string) => `/images/cards/${name}.webp`;

export const cardPhotos = {
  /* Trade Categories */
  food: {
    src: card("tr-food"),
    alt: "Open sacks of turmeric, chilli and other ground spices with steel scoops at a market stall in Goa.",
    credit: cc("sara marlowe", "CC BY 2.0", "Indian_spices_for_sale_at_the_Anjuna_flea-market,_Anjuna_Beach,_Goa.jpg"),
  },
  cosmetics: {
    src: card("tr-cosmetics"),
    alt: "Rows of uncapped lipsticks in a range of shades standing in a display.",
    credit: cc("Raysonho", "CC0", "DifferentColorsOfLipsticks.JPG"),
  },
  steel: {
    src: card("tr-steel"),
    alt: "Galvanised steel coils stacked in rows in a warehouse.",
    credit: cc("Arosset", "CC BY-SA 4.0", "Steel_Coils_-_Leeco_Steel_-_Antonio_Rosset.jpg"),
  },
  rawMaterials: {
    src: card("tr-raw-materials"),
    alt: "Pallets of bagged polymer granules stacked in a yard.",
    credit: cc("Cjp24", "CC BY-SA 3.0", "Plastomer_granules_bags.jpg"),
  },

  /* Consulting — fire and safety */
  activeFire: {
    src: card("cs-active-fire"),
    alt: "Close-up of a ceiling-mounted fire sprinkler head with its red glass bulb.",
    credit: cc("Brandon Leon", "CC BY-SA 2.0", "Fire_sprinkler_roof_mount_side_view.jpg"),
  },
  passiveFire: {
    src: card("cs-passive-fire"),
    alt: "A red steel fire door stencilled “Fire door — keep closed”.",
    credit: cc("Joe Mabel", "CC BY-SA 3.0", "Georgetown_PowerPlant_-_fire_door_01.jpg"),
  },
  fireServices: {
    src: card("cs-fire-services"),
    alt: "A trainer discharging a fire extinguisher in front of a crowd of trainees at a fire-safety demonstration.",
    credit: cc("Aaronrspn", "CC BY-SA 4.0", "Fire_extinguisher_training.jpg"),
  },

  /* Consulting — commercial vehicle service */
  maintenance: {
    src: card("cs-maintenance"),
    alt: "Single- and double-deck buses on the service bays of a depot workshop.",
    credit: cc("Hullian111", "CC BY-SA 4.0", "Queens_Road_125_Depot_Workshops_02.jpg"),
  },
  aggregates: {
    src: card("cs-aggregates"),
    alt: "The tandem rear axle, wheels and leaf-spring suspension of a heavy truck.",
    credit: cc("Spielvogel", "CC0", "Büssing_12000_Waagebalken._Spielvogel.JPG"),
  },
  fleet: {
    src: card("cs-fleet"),
    alt: "Indian trucks, one with a hand-painted cab, parked nose to tail on a Mumbai road.",
    credit: cc("Aktron", "CC BY-SA 4.0", "Mumbai,_PD_Mello_Road,_náklaďáky.jpg"),
  },

  /* Consulting — homologation and market entry */
  homologation: {
    src: card("cs-homologation"),
    alt: "A blue hatchback on the impact track of a vehicle safety-testing laboratory, test markers on its body.",
    credit: cc("Calspan / NHTSA", "Public domain", "Honda_Fit_-_Impact_Still.jpg"),
  },
  marketEntry: {
    src: card("cs-market-entry"),
    alt: "Visitors around a Tata Nexon on the manufacturer's stand at the 2018 Auto Expo in Delhi.",
    credit: cc("Bharadwaj 7645", "CC BY-SA 4.0", "Tata_Nexon_aero_at_2018_Delhi_auto_expo..jpg"),
  },

  /* Manufacturing Scope */
  automotiveManufacturing: {
    src: card("mf-automotive"),
    alt: "Orange welding robots working on car body shells in an automotive body shop.",
    credit: cc("BMW Werk Leipzig", "CC BY-SA 2.0 de", "BMW_Leipzig_MEDIA_050719_Download_Karosseriebau_max.jpg"),
  },
  containers: {
    src: card("mf-containers"),
    alt: "Shipping containers stacked five high along a quay at the Port of Rotterdam.",
    credit: cc("AgainErick", "CC BY-SA 4.0", "Shipping_container_stacks_-_Port_of_Rotterdam_-_2017_-_1.jpg"),
  },
  reefer: {
    src: card("mf-reefer"),
    alt: "A refrigerated container with its cooling unit, standing in a port container yard in Kuantan.",
    credit: cc("Only Truth", "CC BY-SA 3.0", "Kuantan_Port_Container_Yard_with_REEFER_Service.JPG"),
  },

  /* Route Survey */
  structures: {
    src: card("rs-structures"),
    alt: "The cable-stayed railway overbridge at Bardhaman, West Bengal.",
    credit: cc("Sbb1413", "CC BY 4.0", "Bardhaman_Railway_Overbridge_(23_October_2023).jpg"),
  },
  geometry: {
    src: card("rs-geometry"),
    alt: "A vehicle rounding one of the hairpin bends on the Valparai ghat road, seen from above.",
    credit: cc("Jaseem Hamza", "CC BY 3.0", "Valparai_Ghat_Road_40_Hairpin_bends_-_panoramio_(5).jpg"),
  },
  overhead: {
    src: card("rs-overhead"),
    alt: "Power lines spanning a divided highway, with a bus and cars passing beneath.",
    credit: cc("Judgefloro", "CC0", "03768jfCrossing_Bridge_Malis_Guiguinto_Bulacan_Municipal_Roadsfvf_30.jpg"),
    position: "center 0%",
  },
  roadside: {
    src: card("rs-roadside"),
    alt: "Men painting a roadside signboard beside a highway direction sign in Wayanad, Kerala.",
    credit: cc("Ingo Mehling", "CC BY-SA 4.0", "Wayanad_-_Highway_Sign_Painter.jpg"),
  },
} satisfies Record<string, Photo>;
