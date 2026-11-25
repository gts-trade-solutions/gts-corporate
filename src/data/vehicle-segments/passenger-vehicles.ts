import { cc, links, type VehicleSegment } from "./types";

export const passengerVehicles: VehicleSegment = {
  id: "passenger-vehicles",
  group: "passenger-vehicles",
  title: "Passenger Vehicles",
  shortTitle: "Passenger vehicles",
  icon: "car",
  seoTitle: "Passenger Cars from India for Export — Hatchbacks, SUVs & MPVs | GTS",
  metaDescription:
    "Hatchbacks, compact sedans, compact SUVs, 4x4s and MPVs built in India — what each is for, key figures, the models in our export schedule and what to specify.",
  keywords: [
    "car exporter India",
    "passenger vehicle export from India",
    "Indian cars for export",
    "compact SUV exporter India",
    "hatchback export India",
    "MPV export India",
    "left hand drive cars from India",
  ],
  heroTitle: "Passenger vehicles from India",
  heroLead:
    "Hatchbacks, compact sedans, SUVs, 4x4s and MPVs built in India for Africa, Latin America and beyond — how each type is built and used, and what to specify for your market.",
  media: "passengerVehiclesHero",
  heroCredit: cc("LuvsMG481", "CC BY-SA 4.0", "2024_Mahindra_Scorpio_Z8L_front.jpg"),
  intro: [
    "India is one of the world's largest car producers and a major exporter, and much of what it builds suits the conditions many importing markets share: crowded cities, mixed road quality, heat, and buyers who weigh running costs as carefully as the price. Small, efficient petrol engines, generous ground clearance and simple, durable mechanicals are the common thread.",
    "Several manufacturers build cars in India specifically for export, including left-hand-drive versions for Latin America, the Middle East and Africa. The models in our schedule move into South Africa and Mexico today.",
    "This page describes each type, not a stock list. Specifications, variants and drive side differ by market, and we confirm what can be supplied for your destination before anything is committed.",
  ],
  classes: {
    title: "How passenger vehicles are classed",
    items: [
      { code: "M1", label: "Passenger vehicles with up to eight seats besides the driver: cars, SUVs and MPVs." },
      {
        code: "N1",
        label: "Light goods vehicles up to 3.5 t: pick-ups and panel vans, covered on the commercial vehicles page.",
      },
      {
        code: "< 4 m",
        label: "India's sub-four-metre class, taxed at a lower rate at home, which shapes most compact cars built there.",
      },
    ],
    note: "Importing markets classify by their own rules, usually engine size, emissions and, for used cars, age. The category decides the duty and the approval route.",
  },
  types: [
    {
      id: "hatchbacks",
      title: "Hatchbacks and small cars",
      summary:
        "Compact five-door cars with small petrol engines: the entry point of most car markets, and a core of India's car production.",
      body: [
        "A hatchback puts four doors and a lift-up tailgate on a short body, about 3.5 to 4 metres long, with a 1.0- to 1.2-litre petrol engine. Light weight and small engines make these some of the cheapest cars to buy and run, and their size suits congested cities and tight parking.",
        "Many are offered with CNG or mild-hybrid versions, and with manual or automated manual gearboxes, which are simple and cheap to maintain. For export, check air-conditioning capacity, airbag count and safety equipment against the destination's rules, which may be stricter or looser than India's.",
      ],
      facts: [
        { label: "Length", value: "About 3.5 to 4 m" },
        { label: "Engines", value: "1.0–1.2 L petrol, some CNG" },
        { label: "Gearbox", value: "Manual or AMT; automatic on some" },
        { label: "Category", value: "M1" },
      ],
      uses: [
        "Private ownership",
        "Ride-hailing and taxi fleets",
        "Driving schools",
        "Corporate pool cars",
        "Car rental",
      ],
      photo: {
        src: "/images/vehicle-types/pv-hatchback.webp",
        alt: "A white Suzuki Swift hatchback parked on a cobbled street in Budapest.",
        credit: cc("Davidi Vardi", "CC BY-SA 4.0", "Suzuki_Swift_2018.jpg"),
      },
      match: /hatchback|passenger car|small car/i,
    },
    {
      id: "compact-sedans",
      title: "Compact sedans",
      summary:
        "A hatchback with a separate boot added, kept under four metres: more luggage space and a more formal look for the same running costs.",
      body: [
        "India's compact sedan is a distinctive type: the platform of a hatchback with a short, separate boot, the whole car held under four metres for tax reasons at home. The result is a four-door saloon with a usable boot, the economy of a small car and a price well below a full-size sedan.",
        "Compact sedans are a staple of taxi and ride-hailing fleets in India and in many export markets, where the separate boot matters for airport and intercity work. CNG and automated manual versions are common, and the simple mechanicals keep fleet maintenance cheap.",
      ],
      facts: [
        { label: "Length", value: "Just under 4 m" },
        { label: "Boot", value: "Around 350–400 L" },
        { label: "Engines", value: "1.2 L petrol, some CNG" },
        { label: "Category", value: "M1" },
      ],
      uses: [
        "Taxi and ride-hailing fleets",
        "Airport transfers",
        "Private ownership",
        "Corporate and government fleets",
        "Car rental",
      ],
      photo: {
        src: "/images/vehicle-types/pv-sedan.webp",
        alt: "A silver Maruti Suzuki Dzire compact sedan parked in Kolkata.",
        credit: cc(
          "Biswarup Ganguly",
          "CC BY 3.0",
          "Maruti_Suzuki_Dzire_VXi_VVT_-_Subcompact_Car_-_Kolkata_2018-01-17_7574.JPG",
        ),
      },
      match: /sedan/i,
    },
    {
      id: "compact-suvs",
      title: "Compact SUVs and crossovers",
      summary:
        "SUV styling and ground clearance on a small-car footprint: one of the fastest-growing types in India and in many export markets.",
      body: [
        "A compact SUV sits higher than a hatchback, with more ground clearance, bigger wheels and a commanding driving position, but shares the running gear of a small car. Most are front-wheel drive with 1.0- to 1.5-litre petrol engines, often turbocharged, and many are built to India's four-metre limit.",
        "Ground clearance of around 190 to 210 mm is what buyers in markets with poor roads value most: it clears speed bumps, potholes and unpaved access roads without the cost and fuel use of a true 4x4. Turbo petrol and automatic versions are the usual choice for export.",
      ],
      facts: [
        { label: "Length", value: "About 4 m" },
        { label: "Ground clearance", value: "Around 190–210 mm" },
        { label: "Drive", value: "Front-wheel drive" },
        { label: "Engines", value: "1.0–1.5 L petrol, often turbo" },
      ],
      uses: [
        "Private and family use",
        "Rural and peri-urban roads",
        "Corporate fleets",
        "Car rental",
        "Premium ride-hailing",
      ],
      photo: {
        src: "/images/vehicle-types/pv-compact-suv.webp",
        alt: "A red Nissan Magnite compact SUV, built in India, on display in Montevideo, Uruguay.",
        credit: cc("NaBUru38", "CC BY-SA 4.0", "Nissan_Magnite_2025_1.0_Exclusive_at_WTC_Montevideo_-_08.jpg"),
      },
      match: /compact suv|crossover/i,
    },
    {
      id: "suvs-4x4s",
      title: "SUVs and 4x4s",
      summary:
        "Larger and tougher vehicles, many on ladder frames with real four-wheel drive, for rough roads, towing and remote work.",
      body: [
        "Above the compact class, Indian SUVs split into two kinds: car-based SUVs built for comfort and space, and body-on-frame SUVs with a separate ladder chassis, rear- or four-wheel drive and a low-range transfer case. The second kind is the one that matters for mines, farms, NGOs and governments working off the paved road.",
        "Body-on-frame SUVs are heavier and use more fuel, but they tolerate heavy loads, rough tracks and river crossings, and they are simpler to repair in the field. Diesel engines are common, and seating runs from five to seven.",
      ],
      facts: [
        { label: "Construction", value: "Monocoque or ladder frame" },
        { label: "Drive", value: "4x2, or 4x4 with low range" },
        { label: "Seating", value: "Five to seven" },
        { label: "In our schedule", value: "Suzuki Jimny 5-door: compact ladder-frame 4x4" },
      ],
      uses: [
        "Mining and energy sites",
        "Farms and estates",
        "NGO and government fleets",
        "Tourism and safari",
        "Security and patrol",
      ],
      photo: {
        src: "/images/vehicle-types/pv-suv.webp",
        alt: "A sand-coloured Suzuki Jimny 5-door 4x4 on display at the 2024 Indonesia International Motor Show.",
        credit: cc("Dzaky Apri V", "CC BY 4.0", "Suzuki_Jimny_5_door_IIMS_2024.jpg"),
      },
      match: /suv|4x4|off-?road/i,
    },
    {
      id: "mpvs",
      title: "MPVs and people carriers",
      summary:
        "Seven-seat family and fleet vehicles built on car platforms: the most passengers for the running costs of a compact car.",
      body: [
        "An MPV stretches a car platform into a tall, three-row body that seats seven, with sliding or folding middle-row seats for access to the back. Indian MPVs such as the Ertiga use small-car running gear, so they cost little more to run than a compact sedan while carrying two more people.",
        "That makes them a fixture of airport shuttles, hotel transfers, staff transport and family ownership across South Asia, Africa and the Middle East. Petrol, CNG and mild-hybrid versions exist; check third-row space and luggage room against the intended use.",
      ],
      facts: [
        { label: "Seating", value: "Seven, in three rows" },
        { label: "Length", value: "About 4.4 m" },
        { label: "Engines", value: "1.5 L petrol, some CNG or mild hybrid" },
        { label: "Category", value: "M1" },
      ],
      uses: [
        "Family transport",
        "Airport and hotel shuttles",
        "Staff transport",
        "Larger ride-hailing tiers",
        "Tour operators",
      ],
      photo: {
        src: "/images/vehicle-types/pv-mpv.webp",
        alt: "Two Suzuki Ertiga MPVs parked side by side.",
        credit: cc("Ethan Llamas", "CC BY-SA 4.0", "Suzuki_Ertiga_1.5_GLX_Hybrids_and_1.5_GL_2023.jpg"),
      },
      match: /mpv|people carrier/i,
    },
  ],
  explainer: {
    eyebrow: "The four-metre rule",
    title: "Why so many Indian cars are just under four metres",
    paragraphs: [
      "India taxes cars under four metres long with small engines at a lower rate than larger ones. Manufacturers have designed around that line for years, which is why so many Indian compact sedans and SUVs measure just under 4,000 mm and use petrol engines of 1.2 litres or so.",
      "For an importer, it means a lot of car in a short footprint: a boot added to a hatchback, or an SUV body on a city car's footprint. It also means engines tuned for economy rather than power, which suits markets where fuel is expensive.",
      "Export versions sometimes differ from the Indian ones in engine and equipment, because the tax reason behind the Indian specification does not apply abroad. Confirm the variant for your market.",
    ],
  },
  considerations: [
    {
      title: "Drive side",
      icon: "route",
      text: "Most Indian cars are built right-hand drive for home. Manufacturers that export to markets driving on the right, in Latin America, the Middle East and much of Africa, build left-hand-drive versions of selected models. Not every model has one.",
    },
    {
      title: "Safety and emission rules",
      icon: "shieldCheck",
      text: "The destination decides airbag count, crash-test requirements and emission level. Export variants are often specified differently from Indian ones for exactly this reason.",
      link: links.homologation,
    },
    {
      title: "New or used",
      icon: "clipboard",
      text: "Most markets treat new and used imports very differently, and many cap the age of used cars or ban them. Confirm which rules apply before the order, not after shipping.",
    },
    {
      title: "Fuel and climate",
      icon: "leaf",
      text: "Fuel quality, altitude and heat affect the engine choice and the cooling and air-conditioning package. CNG versions only make sense where CNG is sold.",
    },
    {
      title: "Shipping",
      icon: "container",
      text: "Cars ship on roll-on/roll-off vessels or, in smaller numbers, in containers, typically two to four to a 40-foot box on racks.",
    },
    {
      title: "Parts and service",
      icon: "wrench",
      text: "Plan service parts with the vehicles: filters, brake pads, suspension parts and body panels. Our model schedule lists the parts most often ordered for each model.",
      link: links.schedule,
    },
  ],
  specify: [
    "Model, or the type and size of vehicle you need",
    "Engine and fuel: petrol, diesel, CNG or hybrid",
    "Gearbox: manual, AMT or automatic",
    "Destination country and drive side",
    "Trim and equipment, including airbags and air-conditioning",
    "Colours, and quantity per colour",
    "Quantity, delivery schedule and destination port",
    "Service parts to ship with the vehicles",
  ],
  enquiryProduct: "Passenger vehicles",
};
