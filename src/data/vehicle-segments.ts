import type { IconName } from "@/components/Icon";
import type { MediaKey } from "./media";
import type { VehicleModel, VehicleModelGroupId } from "./vehicle-models";

/**
 * The vehicle-segment pages: /import-export/vehicle-trade/<id>.
 *
 * Each one explains a vehicle category type by type: what the type is for,
 * how it is built, the figures that matter when specifying one, what it is
 * used for, and the models in the export schedule that belong to it. The
 * Vehicle Trade page's category cards link here.
 *
 * Content rules, as for the rest of the site:
 *   - Nothing here claims stock, an OEM appointment or an approval. Figures
 *     are typical ranges for the class, hedged as such. The only exact
 *     figures are the ones the client recorded for a model in its spec sheet
 *     (see `specs` in vehicle-models.ts), and they name that model.
 *   - The photographs illustrate each type in service in India and in export
 *     markets. They are not GTS shipments, and the pages say so.
 *
 * Photographs. The type photographs come from Wikimedia Commons. Most are
 * CC BY or CC BY-SA, which require the photographer and the licence to be
 * shown with the picture, so every one carries a `credit` that the page prints
 * beneath it. Replace one with a GTS photograph and drop its credit. Catalogue
 * cut-outs (`fit: "contain"`) are the client's own and carry none.
 */

export type PhotoCredit = {
  name: string;
  licence: string;
  licenceUrl: string;
  /** The file's page on Wikimedia Commons. */
  url: string;
};

export type SegmentPhoto = {
  src: string;
  alt: string;
  credit?: PhotoCredit;
  /** Catalogue cut-outs on a white ground are shown whole rather than cropped. */
  fit?: "cover" | "contain";
};

export type SegmentType = {
  /** Anchor on the page, e.g. #tippers. */
  id: string;
  title: string;
  /** One sentence: what it is. Used as the lead and in the at-a-glance index. */
  summary: string;
  body: string[];
  /** Typical figures for the class. Hedged ranges, or a named model's recorded spec. */
  facts: { label: string; value: string }[];
  uses: string[];
  photo: SegmentPhoto;
  /**
   * Which models in the schedule belong to this type, matched against the
   * model's `segment` text. A model the admin adds later lands under the right
   * type as long as its segment reads like the ones in the catalogue; one that
   * matches nothing still appears in /vehicle-models, just not here.
   */
  match?: RegExp;
  related?: { label: string; href: string };
};

export type SegmentClass = { code: string; label: string };

export type VehicleSegment = {
  /** Matches the category id in `vehicleCategories` (trade.ts). */
  id: "commercial-vehicles" | "buses";
  /** Which group of the vehicle model schedule this page draws on. */
  group: VehicleModelGroupId;
  title: string;
  /** Short name for cards and links. */
  shortTitle: string;
  icon: IconName;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  heroTitle: string;
  heroLead: string;
  media: MediaKey;
  intro: string[];
  classes: { title: string; items: SegmentClass[]; note: string };
  types: SegmentType[];
  /** A short explainer box, where the category has one worth having. */
  explainer?: { title: string; paragraphs: string[] };
  considerations: { title: string; icon: IconName; text: string; link?: { label: string; href: string } }[];
  specify: string[];
  /** `product` value carried into the enquiry form. */
  enquiryProduct: string;
};

const cc = (name: string, licence: string, file: string): PhotoCredit => {
  const version = licence.match(/\d\.\d/)?.[0] ?? "4.0";
  const kind = licence.includes("BY-SA") ? "by-sa" : "by";
  return {
    name,
    licence,
    licenceUrl: `https://creativecommons.org/licenses/${kind}/${version}/`,
    url: `https://commons.wikimedia.org/wiki/File:${file}`,
  };
};

const commercialVehicles: VehicleSegment = {
  id: "commercial-vehicles",
  group: "commercial-vehicles",
  title: "Commercial Vehicles",
  shortTitle: "Commercial vehicles",
  icon: "truck",
  seoTitle: "Commercial Vehicles from India — Trucks, Tippers & Pick-ups | GTS",
  metaDescription:
    "Mini trucks, pick-ups, light, medium and heavy trucks, tippers and tractor heads from India — what each is for, key figures, export models and what to specify.",
  keywords: [
    "commercial vehicle exporter India",
    "truck exporter India",
    "Indian trucks for export",
    "tipper truck exporter",
    "tractor head export",
    "pickup exporter India",
    "LCV exporter India",
    "mini truck export",
    "heavy truck export from India",
  ],
  heroTitle: "Commercial vehicles from India",
  heroLead:
    "Mini trucks and pick-ups through light, medium and heavy trucks, tippers and tractor heads — what each class is built for, the figures that matter when you specify one, and the models in our export schedule.",
  media: "commercialVehiclesHero",
  intro: [
    "A commercial vehicle is bought for the work it does. The useful questions are how much it must carry, over what roads, how far each day, and what body sits on the chassis. The answers place it in one of the seven classes below, and narrow a list of dozens of models to a handful.",
    "India builds commercial vehicles across the whole range, for a home market where heavy loads, heat, dust and poor roads are normal operating conditions. That is much of their appeal in Africa, the Middle East, South Asia and Latin America: designs proven on similar duty cycles, from manufacturers whose vehicles are already familiar to many operators and workshops in those markets.",
    "This page describes each class, not a stock list. Specifications, variants and drive side differ by market, and we confirm what can be supplied for your destination before anything is committed.",
  ],
  classes: {
    title: "How goods vehicles are classed",
    items: [
      { code: "N1", label: "Up to 3.5 t gross vehicle weight: mini trucks and pick-ups." },
      { code: "N2", label: "Over 3.5 t and up to 12 t: light and most medium trucks." },
      { code: "N3", label: "Over 12 t: heavy trucks, heavy tippers and tractor heads." },
    ],
    note: "India and many importing markets register and approve goods vehicles in these UN-derived categories. Gross vehicle weight (GVW) is the vehicle plus its maximum load. For a tractor head, the figure that matters is the gross combination weight (GCW): tractor, trailer and cargo together.",
  },
  types: [
    {
      id: "mini-trucks",
      title: "Mini trucks and small commercial vehicles",
      summary:
        "The smallest goods vehicles: around a tonne of payload, built for short, frequent trips through dense streets.",
      body: [
        "Mini trucks sit on a compact, cab-forward chassis with a small diesel, petrol or CNG engine, and in some markets an electric drivetrain. They are narrow enough for market lanes and old town centres, cheap to run and simple to maintain, which is why they are often the first motor vehicle a small business buys.",
        "The deck can be an open drop-side body, a closed box, an insulated or refrigerated box, or a purpose-built body for gas cylinders, water or waste. Payload is modest, so the weight of the body matters: a heavy box eats into what the vehicle can legally carry.",
      ],
      facts: [
        { label: "Typical payload", value: "Around 0.75 to 1.5 t" },
        { label: "Category", value: "N1, up to 3.5 t GVW" },
        { label: "Bodies", value: "Drop-side, box, refrigerated, special-purpose" },
        {
          label: "From our schedule",
          value: "Tata Super Ace: 1.4 L diesel, 70 hp, GVW 2,260 kg, payload 1,000 kg",
        },
      ],
      uses: [
        "Last-mile and market distribution",
        "FMCG and beverage delivery",
        "LPG cylinder and water delivery",
        "Municipal and utility work",
        "Small-business transport",
      ],
      photo: {
        src: "/images/vehicle-types/cv-mini-truck.webp",
        alt: "A white Tata Ace mini truck with a box body parked on a street in Accra, Ghana.",
        credit: cc("Matti Blume", "CC BY-SA 4.0", "Tata_Ace,_Korle-Klottey_(P1100226).jpg"),
      },
      match: /mini truck|small commercial/i,
    },
    {
      id: "pick-ups",
      title: "Pick-ups",
      summary:
        "One-tonne-class utility vehicles with a car-like cab, in single or double cab and two- or four-wheel drive.",
      body: [
        "A pick-up combines a passenger cab with an open load bed on a ladder-frame chassis. The single cab gives the longest bed; the double cab seats a crew of five and gives up bed length for it. Four-wheel drive, ground clearance and a low-range gearbox are what separate a farm or mine-site pick-up from one that will spend its life on tarmac.",
        "Indian pick-ups are well established in Southern Africa and in other markets where they are bought as working vehicles first. Payloads run from about a tonne to around 1.7 t on heavy-duty versions, and most markets take a turbo-diesel engine.",
      ],
      facts: [
        { label: "Typical payload", value: "About 1 t to 1.7 t" },
        { label: "Cabs", value: "Single cab or double cab" },
        { label: "Drive", value: "4x2 or 4x4, by model and market" },
        {
          label: "From our schedule",
          value: "Tata Xenon Single Cab: 2.2 L diesel, 140 PS, payload approx. 1,280 kg",
        },
      ],
      uses: [
        "Agriculture and estates",
        "Construction and mine-site support",
        "Utility and service fleets",
        "Rural and off-road transport",
        "Tradespeople and small businesses",
      ],
      photo: {
        src: "/images/vehicle-types/cv-pickup.webp",
        alt: "A white Mahindra Pik Up S6 Karoo double-cab 4x4 pick-up parked in South Africa.",
        credit: cc("Axxter99", "CC BY-SA 4.0", "Mahindra_Pik_Up_S6_Karoo.jpg"),
      },
      match: /pick-?\s?up/i,
    },
    {
      id: "light-trucks",
      title: "Light trucks",
      summary:
        "Five- to eight-tonne trucks for city and regional distribution: the delivery workhorse of most urban economies.",
      body: [
        "Light trucks move up from the pick-up to a proper truck chassis: a forward-control cab, a three- to four-litre diesel and a gross vehicle weight of roughly five to eight tonnes, which gives a payload of about two to five tonnes depending on the body and wheelbase.",
        "Wheelbase and body are the main choices. A longer wheelbase suits bulky, light loads such as parcels or furniture; a shorter one turns tighter in town. Common bodies are drop-side, high-side, closed container and insulated or refrigerated boxes.",
      ],
      facts: [
        { label: "Typical GVW", value: "About 5 to 8 t" },
        { label: "Category", value: "N2, 3.5 to 12 t GVW" },
        { label: "Bodies", value: "Drop-side, container, refrigerated, light tipper" },
        {
          label: "From our schedule",
          value: "Tata Ultra T.7: 3.3 L Euro VI diesel, 155 PS, GVW 7,490 kg",
        },
      ],
      uses: [
        "City and intercity distribution",
        "E-commerce and parcels",
        "Cold-chain delivery",
        "Building materials",
        "Municipal services",
      ],
      photo: {
        src: "/images/vehicle-types/cv-light-truck.webp",
        alt: "A red Tata Ultra truck with a drop-side body on a highway in Bangladesh.",
        credit: cc(
          "Shadman Samee",
          "CC BY-SA 2.0",
          "Homebound_Tata_Ultra_1312_truck,Bangladesh._(30825840421).jpg",
        ),
      },
      match: /^light(\s*\/\s*medium)? truck$/i,
    },
    {
      id: "medium-trucks",
      title: "Medium trucks",
      summary:
        "Nine- to sixteen-tonne trucks that carry most regional freight: heavy enough for real loads, light enough for ordinary roads.",
      body: [
        "Medium trucks, often called intermediate commercial vehicles in India, fill the gap between the city delivery truck and the highway heavy. Two axles, a diesel of roughly four to six litres and gross weights from about nine to sixteen tonnes make them the most versatile class: they take a wide choice of bodies and run on roads and bridges that restrict heavier vehicles.",
        "This is where body choice widens: high-side cargo bodies for produce and FMCG, containers, tankers for water and fuel, tippers, and chassis for fire, refuse and utility conversions.",
      ],
      facts: [
        { label: "Typical GVW", value: "About 9 to 16 t" },
        { label: "Axles", value: "Two (4x2)" },
        { label: "Category", value: "N2 or N3, by GVW" },
        { label: "Bodies", value: "High-side, container, tanker, tipper, special-purpose" },
      ],
      uses: [
        "Regional and intercity freight",
        "Agricultural produce",
        "FMCG distribution",
        "Water and fuel tankers",
        "Fire, refuse and utility conversions",
      ],
      photo: {
        src: "/images/vehicle-types/cv-medium-truck.webp",
        alt: "An Eicher truck carrying a high load of oil-palm fruit on a rural road near Eluru, Andhra Pradesh.",
        credit: cc("IM3847", "CC BY-SA 4.0", "Eicher_1095_truck_near_Pedavegi,_Eluru.jpg"),
      },
      match: /^medium (truck|haulage)$/i,
    },
    {
      id: "heavy-trucks",
      title: "Heavy trucks",
      summary:
        "Multi-axle rigid trucks from about sixteen to more than forty tonnes, for long-haul and bulk freight.",
      body: [
        "Heavy rigid trucks gain capacity by adding axles: two-axle 4x2 trucks at the lower end, then three-axle 6x2 and 6x4 trucks, and four- and five-axle layouts above thirty tonnes. The legal maximum is set by the destination's axle-load rules, so the same chassis can be rated differently in different markets.",
        "Engines move into the five- to eight-litre class, cabs gain sleeper options for long hauls, and the driveline is chosen for the road and the load: a 6x4 with two driven axles for poor surfaces and gradients, a 6x2 with a single driven axle for economy on good highways.",
      ],
      facts: [
        { label: "Typical GVW", value: "About 16 t to more than 40 t" },
        { label: "Axle layouts", value: "4x2, 6x2, 6x4, 8x2, 8x4, 10x2" },
        { label: "Category", value: "N3, over 12 t GVW" },
        { label: "Bodies", value: "High-side, platform, container, bulker, tanker" },
      ],
      uses: [
        "Long-haul general freight",
        "Cement, steel and bulk materials",
        "Container movement",
        "Fuel and chemical tankers",
        "Agricultural bulk",
      ],
      photo: {
        src: "/images/vehicle-types/cv-heavy-truck.webp",
        alt: "A red Eicher multi-axle heavy truck on a road near Musiri, Tamil Nadu.",
        credit: cc("SnapMeUp", "CC BY-SA 4.0", "Eicher_Multi-Axle_2015_Tamil_Nadu.JPG"),
      },
      match: /^heavy (truck|haulage( truck)?)$/i,
    },
    {
      id: "tippers",
      title: "Tippers",
      summary:
        "Trucks with a hydraulically raised body for construction, quarry and mining work, from light city tippers to 8x4 heavies.",
      body: [
        "A tipper is defined by its body and its duty. Light and medium tippers carry sand, aggregate and debris on building sites and road projects. Heavy 6x4 and 8x4 tippers work quarries and mines, where the chassis, suspension and driveline are built for repeated full loads on unmade haul roads.",
        "The body is specified with the chassis: a box body for general construction material, or a scoop (rock) body with a sloped floor and thicker high-tensile steel for broken rock. Body volume is quoted in cubic metres and has to suit the density of the material, otherwise the truck is either under-used or overloaded.",
      ],
      facts: [
        { label: "Range", value: "Light tippers up to 8x4 heavies above 30 t GVW" },
        { label: "Axle layouts", value: "4x2, 6x4, 8x4" },
        { label: "Bodies", value: "Box or scoop (rock) body, sized in m³" },
        { label: "Category", value: "N2 or N3, by GVW" },
      ],
      uses: [
        "Construction and real estate",
        "Road and infrastructure projects",
        "Quarries and aggregates",
        "Mining",
        "Municipal debris removal",
      ],
      photo: {
        src: "/images/vehicle-types/cv-tipper.webp",
        alt: "A white Ashok Leyland U-series tipper with a raised steel body on display in Chennai.",
        credit: cc("Balaji.B", "CC BY-SA 2.0", "Ashok_Leyland_U_truck_-_Chennai_-_India.jpg"),
      },
      match: /tipper/i,
    },
    {
      id: "tractor-heads",
      title: "Tractor heads (prime movers)",
      summary:
        "Tractor units that pull a semi-trailer through a fifth wheel, for containers, bulk trailers and heavy or over-dimensional cargo.",
      body: [
        "A tractor head carries no load of its own. It pulls a semi-trailer coupled to its fifth wheel, so one tractor can work with flatbed, skeletal container, tanker, bulker and low-bed trailers in turn. It is rated by gross combination weight: tractor, trailer and cargo together.",
        "4x2 tractors suit lighter combinations on good roads. 6x4 tractors, with more power and a stronger driveline, handle combinations of forty tonnes and more, steep gradients, and over-dimensional cargo on low-bed trailers. Specify the trailer with the tractor: fifth-wheel height and rating, kingpin size, and brake and electrical connections all have to match.",
      ],
      facts: [
        { label: "Rated by", value: "GCW: tractor, trailer and load together" },
        { label: "Typical GCW", value: "About 40 to 60 t, by model and market" },
        { label: "Drive", value: "4x2 or 6x4" },
        { label: "Trailers", value: "Flatbed, skeletal, tanker, bulker, low-bed" },
      ],
      uses: [
        "Port and container haulage",
        "Long-haul semi-trailer freight",
        "Bulk and tanker transport",
        "Over-dimensional cargo",
        "Project logistics",
      ],
      photo: {
        src: "/images/vehicle-types/cv-tractor-head.webp",
        alt: "A white Tata Prima tractor head coupled to a flatbed semi-trailer in West Java, Indonesia.",
        credit: cc("Sulthan Naufal", "CC BY-SA 4.0", "MDL_Logistik_TATA_Prima_(BE_9321_CU).jpg"),
      },
      match: /tractor/i,
      related: { label: "Over-dimensional cargo: ODC logistics", href: "/odc-logistics" },
    },
  ],
  explainer: {
    title: "Reading an Indian truck model number",
    paragraphs: [
      "Many Indian truck names are shorthand for the truck itself. On Ashok Leyland models, the first two digits give the weight class in tonnes and the last two the approximate engine power in tens of horsepower: a Cargo 2518 is a 25-tonne truck of about 180 hp, a U3123 a 31-tonne truck of about 230 hp.",
      "Suffixes add the body or layout. In our schedule, Tata's .K and Eicher's T mark a tipper (Prima 3328.K, Pro 6031T), while Tata's .S and Eicher's TT mark a tractor head (Prima 4438.S, Pro 6049TT).",
      "Treat the number as a guide, not a specification. The confirmed weights and power come from the spec sheet for the market variant, and we send it with the quotation.",
    ],
  },
  considerations: [
    {
      title: "Drive side",
      icon: "route",
      text: "India builds right-hand-drive vehicles. Markets that drive on the left, as India does (much of East and Southern Africa and South Asia), take them as built. Markets that drive on the right need a left-hand-drive export variant, and not every model has one.",
    },
    {
      title: "Emission standard",
      icon: "leaf",
      text: "India's current standard, BS-VI, is equivalent to Euro VI. Many importing markets set a different level, with fuel quality to match, so export variants are often built to the destination's norm rather than India's. We confirm the variant before quoting.",
    },
    {
      title: "Approval and import rules",
      icon: "shieldCheck",
      text: "Most markets register commercial vehicles against a type approval, a certificate of conformity or a pre-shipment inspection, and many limit the age of used imports. These rules decide what can be shipped.",
      link: { label: "Homologation and market entry", href: "/consulting/homologation-market-entry" },
    },
    {
      title: "Built-up, cab-chassis or kits",
      icon: "package",
      text: "Trucks can ship complete (CBU), as a cab-chassis for a local body builder, or as SKD or CKD kits for local assembly where the duty structure favours it. Each changes the freight, the duty and the documents.",
    },
    {
      title: "Shipping",
      icon: "container",
      text: "Vehicles move on roll-on/roll-off vessels, on flat-rack containers or, for small units, inside containers. Heavy and over-dimensional units need route and lashing planning.",
      link: { label: "ODC logistics", href: "/odc-logistics" },
    },
    {
      title: "Spare parts and service",
      icon: "wrench",
      text: "Plan the first parts order with the vehicles. Our model schedule lists the components most often needed for each model, so they can be ordered with the fleet.",
      link: { label: "Vehicle model schedule", href: "/vehicle-models" },
    },
  ],
  specify: [
    "Vehicle class and application: what it will carry, and where",
    "Payload and GVW, or GCW for a tractor head",
    "Axle configuration and drive: 4x2, 6x2, 6x4 or 8x4",
    "Body: cab-chassis, cargo body, tipper, tanker, refrigerated or special",
    "Destination country, drive side and emission standard",
    "Complete vehicle, cab-chassis, or SKD/CKD kit",
    "Quantity, delivery schedule and destination port",
    "Spare-parts package to ship with the vehicles",
  ],
  enquiryProduct: "Commercial vehicles",
};

const buses: VehicleSegment = {
  id: "buses",
  group: "buses",
  title: "Buses",
  shortTitle: "Buses and coaches",
  icon: "bus",
  seoTitle: "Buses from India for Export — School, City, Coach & Electric | GTS",
  metaDescription:
    "Minibuses, school and staff buses, city buses, coaches, electric buses and bus chassis from India — what each is for, key figures, and what to specify.",
  keywords: [
    "bus exporter India",
    "bus export from India",
    "school bus exporter",
    "electric bus export India",
    "minibus exporter",
    "coach exporter India",
    "bus chassis export",
    "city bus supplier",
  ],
  heroTitle: "Buses and coaches from India",
  heroLead:
    "From twelve-seat minibuses to fifteen-metre coaches, and from diesel chassis for local body building to electric city buses — how each type is built and used, and what to specify for your market.",
  media: "busesHero",
  intro: [
    "A bus is specified around people: how many travel, how far, how often they get on and off, and whether they stand. Those answers decide the length, the floor height, the number of doors, the seating layout and the class the bus is approved in, long before a make is chosen.",
    "India builds buses in large numbers and across the whole range, from van-based minibuses to air-conditioned multi-axle coaches and electric city buses. Much of it is built in two stages: a manufacturer's chassis, bodied by a specialist coachbuilder. That means most types can be supplied either as a complete bus or as a chassis for a body builder in your own market.",
    "This page describes each type, not a stock list. Specifications, layouts and drive side differ by market, and we confirm what can be supplied for your destination before anything is committed.",
  ],
  classes: {
    title: "How buses are classed",
    items: [
      { code: "M2", label: "More than eight passenger seats, up to 5 t: minibuses and van-based buses." },
      { code: "M3", label: "More than eight passenger seats, over 5 t: midi and full-size buses and coaches." },
      { code: "Class I", label: "City buses, with space for standing passengers and frequent stops." },
      { code: "Class II", label: "Mainly seated, with limited standing: suburban and intercity buses." },
      { code: "Class III", label: "Seated passengers only: coaches." },
    ],
    note: "India and many importing markets use these UN categories and classes for approval. Smaller buses carrying up to 22 passengers fall into Classes A and B instead.",
  },
  types: [
    {
      id: "minibuses",
      title: "Minibuses and van-based buses",
      summary:
        "Ten to around thirty seats on a van or light-truck platform, for transfers, staff shuttles and routes too small for a full-size bus.",
      body: [
        "The smallest buses are built on large-van platforms, or on light-truck chassis bodied by a coachbuilder. They drive like a big van, park almost anywhere and are cheap to run, which makes them the usual choice for hotel and airport transfers, tour groups, staff shuttles and feeder routes.",
        "The same platforms are widely converted into ambulances, school vans and mobile clinics. Seating capacity, roof height and air-conditioning are the main choices; most are diesel, with CNG and electric versions in some markets.",
      ],
      facts: [
        { label: "Seating", value: "Roughly 10 to 30, plus driver" },
        { label: "Category", value: "M2, or M3 on heavier versions" },
        { label: "Bodies", value: "Standard or high roof, AC or non-AC" },
        { label: "Conversions", value: "Ambulance, school van, mobile clinic" },
      ],
      uses: [
        "Hotel and airport transfers",
        "Tourism and tour groups",
        "Staff and institutional shuttles",
        "Feeder and rural routes",
        "Ambulance and special conversions",
      ],
      photo: {
        src: "/images/vehicle-types/bus-minibus.webp",
        alt: "A white Force Traveller van-based minibus parked beside the Leh–Manali highway.",
        credit: cc("Yann Forget", "CC BY-SA 3.0", "Force_Traveller,_Leh-Manali_Highway.jpg"),
      },
      match: /mini ?bus|van/i,
    },
    {
      id: "school-staff-buses",
      title: "School and staff buses",
      summary:
        "Purpose-equipped buses for carrying students and employees on fixed daily routes, usually with 20 to 50 seats.",
      body: [
        "School and staff buses are mostly built on front-engined light and medium bus chassis, simple to maintain and bodied for a fixed number of seated passengers on a predictable daily route. They do not need the low floor or the door count of a city bus. They need robust seats, good ventilation or air-conditioning, and safety equipment.",
        "Many markets regulate school buses separately: a mandated colour, emergency exits, speed limiters, window guards, first-aid and fire equipment, and in some places GPS tracking and CCTV. The bus has to be built to the destination's rules, not India's, so those rules belong in the enquiry from the start.",
      ],
      facts: [
        { label: "Seating", value: "Typically 20 to 50" },
        { label: "Platform", value: "Front-engined light and medium bus chassis" },
        { label: "Category", value: "M2 or M3, by weight" },
        { label: "Fitments", value: "Speed limiter, emergency exits, safety equipment" },
      ],
      uses: [
        "School transport",
        "Employee and factory shuttles",
        "Universities and institutions",
        "Hospitals and campuses",
        "Contract transport operators",
      ],
      photo: {
        src: "/images/vehicle-types/bus-school.webp",
        alt: "A yellow school bus belonging to a public school, in traffic in Indore.",
        credit: cc("Bernard Gagnon", "CC BY-SA 3.0", "School_bus,_Indore.jpg"),
      },
      match: /school|staff/i,
    },
    {
      id: "city-buses",
      title: "City buses",
      summary:
        "Buses built for frequent stops and standing passengers, in standard, semi-low and low-floor versions, nine to twelve metres long.",
      body: [
        "A city bus spends its day stopping, so it is designed around boarding: two or three wide doors, a low step, open floor space and grab rails for standing passengers. Floor height is the defining choice. India's urban bus specifications describe three levels: standard floor at about 900 mm, semi-low floor at about 650 mm and low floor at about 400 mm. The lower the floor, the quicker and easier boarding is, at the cost of ground clearance and price.",
        "Low-floor buses need level roads and proper kerbs to make sense. On rougher networks, a semi-low or standard-floor bus is the practical choice. Diesel, CNG and electric drivelines are all available, and many cities now specify air-conditioning, passenger information displays and CCTV.",
      ],
      facts: [
        { label: "Length", value: "About 9 to 12 m" },
        { label: "Floor", value: "Standard, semi-low or low floor" },
        { label: "Class", value: "Class I: seated and standing" },
        { label: "Fuel", value: "Diesel, CNG or electric" },
      ],
      uses: [
        "Urban public transport",
        "Bus rapid transit (BRT)",
        "Airport terminal shuttles",
        "Metro feeder services",
        "Large campuses and industrial parks",
      ],
      photo: {
        src: "/images/vehicle-types/bus-city.webp",
        alt: "A Tata Marcopolo low-floor city bus parked under trees.",
        credit: cc("Ratnam", "CC BY-SA 3.0", "City_sheetal.jpg"),
      },
      match: /city|urban|low.?floor/i,
    },
    {
      id: "coaches",
      title: "Intercity buses and coaches",
      summary:
        "Long-distance buses for seated passengers, with reclining seats, luggage holds and, on the largest, three axles and sleeper berths.",
      body: [
        "Intercity buses and coaches trade the city bus's open floor for comfort and luggage space: a raised floor over underfloor luggage bays, reclining seats, air-conditioning and, on long overnight routes, sleeper berths, a layout widely used in India. Two-axle coaches run to about twelve metres; three-axle coaches reach thirteen and a half to fifteen metres and carry more passengers within the same axle loads.",
        "Rear-engined coach chassis give a quieter cabin and a flat floor; front-engined intercity buses are simpler and cheaper to maintain on rougher routes. Markets that follow UN regulations can require coaches to meet the rollover-strength rules of UN Regulation 66, which depend on the body as much as the chassis.",
      ],
      facts: [
        { label: "Length", value: "About 10 to 15 m" },
        { label: "Axles", value: "Two, or three on the longest" },
        { label: "Class", value: "Class II or III: mainly or only seated" },
        { label: "Layouts", value: "Seater, semi-sleeper, sleeper" },
      ],
      uses: [
        "Intercity and interstate services",
        "Tour and charter operators",
        "Cross-border services",
        "Airport express services",
        "Long-distance staff transport",
      ],
      photo: {
        src: "/images/vehicle-types/bus-coach.webp",
        alt: "An orange three-axle Scania Metrolink intercity coach in Maharashtra.",
        credit: cc("Karthik Nadar", "CC BY-SA 4.0", "Scania_Metrolink_HD_14.5_M_Ashwamedh.jpg"),
      },
      match: /coach|intercity|sleeper/i,
    },
    {
      id: "electric-buses",
      title: "Electric buses",
      summary:
        "Battery-electric city and intercity buses, sized to the route and charged at the depot or along the route.",
      body: [
        "Electric buses replace the engine with a traction motor and a large battery pack. Most are nine- and twelve-metre city buses, where daily distances are predictable and buses return to the depot every night. Indian cities have put electric buses into service in large numbers, and electric express services now run between cities.",
        "An electric bus is bought as a system, not just a vehicle. The battery is sized to the longest daily duty with a margin for heat, air-conditioning and ageing. The charging plan, overnight at the depot or top-ups at the end of the route, sets the number of chargers and the grid connection the depot needs. Battery warranty, local service capability and parts support matter as much as the purchase price.",
      ],
      facts: [
        { label: "Length", value: "Mainly 9 m and 12 m" },
        { label: "Charging", value: "Overnight at the depot, or on the route" },
        { label: "Battery sized by", value: "Longest daily duty, plus a margin" },
        { label: "Class", value: "Class I city; Class II or III intercity" },
      ],
      uses: [
        "City and metro feeder routes",
        "Airport and campus shuttles",
        "Corporate staff transport",
        "Intercity express services",
        "Fleet electrification programmes",
      ],
      photo: {
        src: "/images/vehicle-types/bus-electric.webp",
        alt: "A grey KSRTC electric bus at a charging station in Haripad, Kerala.",
        credit: cc("Navaneeth Krishnan S", "CC BY-SA 3.0", "Electric_bus_KSRTC.jpg"),
      },
      match: /electric|\bev\b|e-bus/i,
      related: { label: "EV component sourcing", href: "/automotive-parts/ev-components" },
    },
    {
      id: "bus-chassis",
      title: "Bus chassis for local body building",
      summary:
        "A rolling chassis, with engine, driveline, axles and controls, shipped to a coachbuilder in the destination market to be bodied there.",
      body: [
        "Much of India's own bus fleet is built in two stages: the manufacturer supplies a chassis and a coachbuilder builds the body. The same route works for export. A chassis is smaller and lighter to ship than a finished bus, and bodying it locally lets the operator match the body to local rules, climate and preferences. In some markets it also earns a duty or local-content advantage.",
        "Front-engined chassis such as the Tata LP 613 are a common base for school, staff and midi buses; rear-engined chassis are used for low-floor city buses and coaches. Wheelbase, overhangs, engine position and gross weight have to be agreed with the body builder before the chassis is ordered, because they fix the seating layout the body can achieve.",
      ],
      facts: [
        { label: "Engine position", value: "Front or rear" },
        { label: "Agree with the body builder", value: "Wheelbase, overhangs, GVW" },
        { label: "Bodied as", value: "School, staff, midi or route bus" },
        { label: "In our schedule", value: "Tata LP 613" },
      ],
      uses: [
        "Local body building",
        "School and staff buses",
        "Midi and route buses",
        "Special bodies: mobile clinics, libraries, workshops",
      ],
      photo: {
        src: "/images/vehicles/tata-lp-613.webp",
        alt: "Tata LP 613 bus chassis with cab, catalogue photograph.",
        fit: "contain",
      },
      match: /chassis/i,
      related: { label: "Chassis or built bus: the enquiry checklist", href: "/blog/vehicle-export-enquiry-checklist" },
    },
  ],
  considerations: [
    {
      title: "Complete bus or chassis",
      icon: "package",
      text: "A complete bus arrives ready to register; a chassis ships for less and is bodied locally. The choice changes the freight, the duty, the lead time and who certifies the finished vehicle.",
    },
    {
      title: "Drive side and door side",
      icon: "route",
      text: "Passenger doors must open on the kerb side. A bus for a market that drives on the left, as India does, has its doors on the left. A market that drives on the right needs a left-hand-drive bus with doors on the right: a different body, not just a different steering position.",
    },
    {
      title: "Approval and passenger rules",
      icon: "shieldCheck",
      text: "Seating and standing capacity, emergency exits, seat strength and rollover strength are set by the destination. Markets that follow UN regulations refer to R107 for general construction and R66 for rollover strength.",
      link: { label: "Homologation and market entry", href: "/consulting/homologation-market-entry" },
    },
    {
      title: "Fuel, climate and air-conditioning",
      icon: "bolt",
      text: "Diesel, CNG and electric versions exist for most city types. Fuel availability decides the driveline; climate decides the air-conditioning capacity and the cooling package.",
    },
    {
      title: "Shipping",
      icon: "container",
      text: "Complete buses ship on roll-on/roll-off vessels; chassis can also ship on flat racks. Delivering long or tall vehicles to an inland depot may need a route survey.",
      link: { label: "ODC logistics and route surveys", href: "/odc-logistics" },
    },
    {
      title: "Parts and service",
      icon: "wrench",
      text: "Doors, glass, seats, air-conditioning, brakes and suspension wear fastest on a bus. Plan a first-year parts package with the fleet.",
      link: { label: "Bus components", href: "/automotive-parts/buses" },
    },
  ],
  specify: [
    "Bus type and application: route, daily distance and stops",
    "Seating capacity, and standing capacity for city buses",
    "Length, floor height and number of doors",
    "Fuel: diesel, CNG or electric, with the charging plan for electric",
    "Air-conditioned or not; seat type and layout",
    "Complete bus, or chassis for local body building",
    "Destination country, drive side and the rules that apply",
    "Quantity, delivery schedule and spare-parts package",
  ],
  enquiryProduct: "Buses",
};

export const vehicleSegments: VehicleSegment[] = [commercialVehicles, buses];

export const findVehicleSegment = (id: string) => vehicleSegments.find((segment) => segment.id === id);

export const vehicleSegmentHref = (id: string) => `/import-export/vehicle-trade/${id}`;

/**
 * The schedule's models for each type of a segment. A model goes under the
 * first type whose `match` fits its segment text, so it is listed once.
 */
export function modelsByType(segment: VehicleSegment, models: VehicleModel[]) {
  const byType = new Map<string, VehicleModel[]>(segment.types.map((type) => [type.id, []]));
  for (const model of models) {
    if (model.group !== segment.group) continue;
    const type = segment.types.find((candidate) => candidate.match?.test(model.segment));
    if (type) byType.get(type.id)!.push(model);
  }
  return byType;
}
