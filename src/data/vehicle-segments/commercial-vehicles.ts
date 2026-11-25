import { cc, links, type VehicleSegment } from "./types";

export const commercialVehicles: VehicleSegment = {
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
    eyebrow: "Model numbers",
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
      link: links.homologation,
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
      link: links.schedule,
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
