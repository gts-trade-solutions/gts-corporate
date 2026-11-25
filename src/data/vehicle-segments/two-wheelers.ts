import { cc, links, segmentPath, type VehicleSegment } from "./types";

export const twoWheelers: VehicleSegment = {
  id: "two-wheelers",
  group: "two-wheelers",
  title: "Two-Wheelers",
  shortTitle: "Two-wheelers",
  icon: "motorcycle",
  seoTitle: "Motorcycles and Scooters from India for Export | Two-Wheelers | GTS",
  metaDescription:
    "Commuter, sport, adventure and classic motorcycles, scooters and electric two-wheelers from India — what each is for, key figures and export models.",
  keywords: [
    "two wheeler exporter India",
    "motorcycle exporter India",
    "Indian motorcycles for export",
    "boda boda motorcycles",
    "scooter export India",
    "electric scooter export India",
    "commuter motorcycle supplier Africa",
  ],
  heroTitle: "Two-wheelers from India",
  heroLead:
    "Commuter motorcycles for taxi and delivery work, sport, adventure and classic motorcycles, scooters and electric two-wheelers — what each type is built for, and what to specify for your market.",
  media: "twoWheelersHero",
  intro: [
    "India is the world's largest two-wheeler market and one of its largest exporters. Its manufacturers build for riders who use a motorcycle as their main transport and often their livelihood, which is why Indian motorcycles are a leading choice for motorcycle taxis and delivery across much of Africa, and why Indian brands now also sell larger motorcycles in Europe and North America.",
    "The models in our schedule run from 100 cc commuters for African markets to 350 and 650 cc motorcycles sold in the USA and Canada.",
    "This page describes each type, not a stock list. Specifications and variants differ by market, and we confirm what can be supplied for your destination before anything is committed.",
  ],
  classes: {
    title: "How two-wheelers are classed",
    items: [
      { code: "L1", label: "Mopeds and low-speed scooters: up to 50 cc or 45 km/h." },
      { code: "L3", label: "Motorcycles and scooters above those limits: almost every model exported from India." },
      {
        code: "cc",
        label: "Within L3, markets and buyers group by engine size: 100–125 cc, 150–250 cc, and 250 cc and above.",
      },
    ],
    note: "Import duty, licence classes and insurance often step at engine-size thresholds, so the capacity band matters as much as the model.",
  },
  types: [
    {
      id: "commuter-motorcycles",
      title: "Commuter motorcycles",
      summary:
        "100 to 150 cc motorcycles built for economy, load and endurance: the workhorse of motorcycle taxis and delivery across Africa and Asia.",
      body: [
        "A commuter motorcycle has a small single-cylinder engine, a simple frame, a long, flat seat and a carrier rack. It is designed to run for years on variable fuel and rough roads with little maintenance, to carry a passenger and luggage, and to return very high fuel economy.",
        "Versions built for African markets add heavier-duty suspension, stronger frames and racks, crash guards and wider seats for taxi work, where the motorcycle earns its living twelve hours a day. Kick or electric start, drum or disc brakes and the number of gears are the main choices.",
      ],
      facts: [
        { label: "Engines", value: "100–150 cc, single cylinder" },
        { label: "Priority", value: "Fuel economy, load and durability" },
        { label: "Start", value: "Kick, electric, or both" },
        { label: "In our schedule", value: "Bajaj Boxer and Platina, TVS HLX" },
      ],
      uses: [
        "Motorcycle taxis (boda-boda, okada)",
        "Delivery and courier fleets",
        "Rural transport",
        "Daily commuting",
        "Field-staff fleets",
      ],
      photo: {
        src: "/images/vehicle-types/tw-commuter.webp",
        alt: "A Bajaj Boxer BM 150 delivery motorcycle with a top box.",
        credit: cc("Axxter99", "CC BY-SA 4.0", "Bajaj_Boxer_BM_150.jpg"),
      },
      match: /commuter/i,
      matchName: /boxer|platina|hlx|\bct ?1\d\d\b/i,
    },
    {
      id: "sport-motorcycles",
      title: "Sport and street motorcycles",
      summary:
        "150 to 400 cc motorcycles with stronger engines, better brakes and sportier styling, for performance at a sensible price.",
      body: [
        "Street and sport motorcycles step up from the commuter with more powerful, often liquid-cooled engines, disc brakes with ABS, wider tyres and sharper styling. India builds a deep range between 150 and 400 cc, a class where its manufacturers compete on value with motorcycles from Japan and China.",
        "Naked street bikes are the volume type; faired sport and sport-touring models sit above them. For export, confirm ABS, lighting and noise compliance with the destination's rules, and the local supply of tyres and service parts.",
      ],
      facts: [
        { label: "Engines", value: "150–400 cc" },
        { label: "Brakes", value: "Discs, with single- or dual-channel ABS" },
        { label: "Styles", value: "Naked, faired, sport-tourer" },
        { label: "In our schedule", value: "Bajaj Pulsar and Dominar ranges" },
      ],
      uses: ["Commuting and leisure", "Younger and first-time riders", "Touring", "Rental fleets"],
      photo: {
        src: "/images/vehicle-types/tw-sport.webp",
        alt: "A black Bajaj Pulsar NS160 street motorcycle parked beside a wall.",
        credit: cc("Sijawd", "CC BY-SA 4.0", "BAJAJ_Pulsar_NS160.jpg"),
      },
      match: /sport|street|naked/i,
      matchName: /pulsar|dominar|apache/i,
    },
    {
      id: "adventure-motorcycles",
      title: "Adventure motorcycles",
      summary: "Tall, long-travel motorcycles built to cover long distances on and off the road.",
      body: [
        "Adventure motorcycles combine an upright riding position with long-travel suspension, a large-diameter front wheel, high ground clearance and room for luggage. They are designed to cover long distances on bad roads and tracks, carrying a rider, a passenger and kit.",
        "Royal Enfield's Himalayan established India in this class, and it now sells in Europe, the Americas and Asia. The appeal is simplicity: single-cylinder engines and robust chassis that can be repaired far from a dealer.",
      ],
      facts: [
        { label: "Engines", value: "Around 400–450 cc single" },
        { label: "Suspension", value: "Long travel, high ground clearance" },
        { label: "Wheels", value: "Large front wheel, often 21-inch" },
        { label: "In our schedule", value: "Royal Enfield Himalayan 450" },
      ],
      uses: ["Adventure touring", "Remote and rural travel", "Rental and tour operators", "Off-road leisure"],
      photo: {
        src: "/images/vehicle-types/tw-adventure.webp",
        alt: "A Royal Enfield Himalayan adventure motorcycle with luggage racks on a gravel track.",
        credit: cc("Ashley Pomeroy", "CC0", "Royal_Enfield_Himalayan_DB2K5442.jpg"),
      },
      match: /adventure/i,
      matchName: /himalayan|xpulse/i,
    },
    {
      id: "classic-motorcycles",
      title: "Classic, roadster and cruiser motorcycles",
      summary:
        "Mid-size motorcycles with traditional styling and relaxed, torquey engines, from 350 cc singles to 650 cc twins.",
      body: [
        "This is the type Royal Enfield is known for: motorcycles with classic looks, engines that pull strongly from low speeds, and an upright or laid-back riding position. The 350 cc single-cylinder range covers classic, roadster and cruiser styles; the 650 cc parallel twins add the power for highway riding.",
        "India now builds mid-size motorcycles for developed markets, and these models are sold in the USA, Canada, Europe and Australia. Export versions are built to each market's emission, lighting and noise rules, so the variant for your destination has to be specified.",
      ],
      facts: [
        { label: "Engines", value: "350 cc single or 650 cc twin" },
        { label: "Styles", value: "Classic, roadster, cruiser, café racer, scrambler" },
        { label: "Riding position", value: "Upright or feet-forward" },
        { label: "In our schedule", value: "Royal Enfield 350 and 650 ranges" },
      ],
      uses: ["Leisure and touring", "Commuting", "Rental and tour operators", "Premium dealer stock"],
      photo: {
        src: "/images/vehicle-types/tw-classic.webp",
        alt: "A blue Royal Enfield Interceptor 650 parked on grass in Prague.",
        credit: cc("Mojmir Churavy", "CC BY-SA 4.0", "Royal_Enfield_Interceptor_650_Jinonice_A.jpg"),
      },
      match: /cruiser|classic|roadster/i,
      matchName: /royal enfield/i,
    },
    {
      id: "scooters",
      title: "Scooters",
      summary:
        "Step-through scooters of 110 to 125 cc with automatic transmissions: the easiest two-wheeler to ride, and the first choice of many city riders.",
      body: [
        "A scooter has a step-through frame, a floorboard, small wheels and a continuously variable automatic transmission, so there are no gears or clutch to manage. Engines are typically 110 to 125 cc. Storage under the seat, a flat floor for bags and an easy riding position make scooters the everyday choice in cities, including for many people who would not ride a motorcycle.",
        "Scooters suit heavy loads and very rough roads less well than a commuter motorcycle, but in cities they are hard to beat. Delivery versions with carriers and fleet specifications are common.",
      ],
      facts: [
        { label: "Engines", value: "110–125 cc" },
        { label: "Transmission", value: "CVT automatic" },
        { label: "Wheels", value: "10- to 12-inch" },
        { label: "Category", value: "L3 (L1 for 50 cc mopeds)" },
      ],
      uses: ["Urban commuting", "Food and parcel delivery", "Rental fleets", "Students and first-time riders"],
      photo: {
        src: "/images/vehicle-types/tw-scooter.webp",
        alt: "A grey Honda Activa scooter parked outside a rental office in Goa.",
        credit: cc("Bssasidhar", "CC0", "Honda_Activa_Rental-_Goa_1.jpg"),
      },
      match: /scooter/i,
      exclude: /electric|\bev\b/i,
    },
    {
      id: "electric-two-wheelers",
      title: "Electric two-wheelers",
      summary:
        "Battery-electric scooters and motorcycles, charged from a household socket, for urban riding and delivery fleets.",
      body: [
        "India has become one of the largest markets for electric two-wheelers, mostly scooters with a hub or mid-mounted motor and a lithium-ion battery of roughly 2 to 4 kWh, giving a real-world range of around 80 to 150 km. Most charge from an ordinary socket in a few hours; some offer fast charging or swappable batteries.",
        "Running costs are a fraction of a petrol scooter's, which matters most to delivery fleets covering fixed daily distances. Battery warranty, local service, spare parts and the climate the battery will work in are the questions to settle before ordering.",
      ],
      facts: [
        { label: "Battery", value: "About 2–4 kWh, lithium-ion" },
        { label: "Range", value: "Around 80–150 km" },
        { label: "Charging", value: "Home socket, fast charging or swap" },
        { label: "Motor", value: "Hub or mid-mounted" },
      ],
      uses: ["Delivery fleets", "Urban commuting", "Campus and estate mobility", "Rental and sharing schemes"],
      photo: {
        src: "/images/vehicle-types/tw-electric.webp",
        alt: "A red Ola S1 Pro electric scooter parked on a forecourt.",
        credit: cc("SnapMeUp", "CC BY-SA 4.0", "OLA_S1_Pro_Gen_1_Electric_Scooter.jpg"),
      },
      match: /electric|\bev\b/i,
      matchName: /electric|\bev\b/i,
      related: { label: "All electric vehicles", href: segmentPath("electric-vehicles") },
    },
  ],
  considerations: [
    {
      title: "Engine size and duty bands",
      icon: "chart",
      text: "Import duty, licence categories and insurance often change at engine-size thresholds, typically at 125 cc and above. Check where the model sits against your market's bands before choosing it.",
    },
    {
      title: "Emissions, ABS and lighting",
      icon: "shieldCheck",
      text: "Markets set their own emission level and may require ABS or combined braking, specific lighting and noise limits. Export variants are built to these, so the destination decides the variant.",
      link: links.homologation,
    },
    {
      title: "Complete or CKD",
      icon: "package",
      text: "Motorcycles ship complete or as CKD kits for local assembly, which many African and Asian markets favour through lower duty. Kits need a local assembly partner and a parts supply.",
    },
    {
      title: "Roads, fuel and load",
      icon: "route",
      text: "Fuel quality, heat, dust and the load the motorcycle will carry decide the specification. In taxi and delivery work, heavy-duty suspension, strong racks and the right tyres matter more than top speed.",
    },
    {
      title: "Shipping",
      icon: "container",
      text: "Motorcycles ship crated in containers. CKD kits fill a container far more efficiently than complete motorcycles.",
    },
    {
      title: "Parts and service",
      icon: "wrench",
      text: "Commuter fleets consume chains, sprockets, brake shoes, clutch plates, cables and filters quickly. Ship a parts package with the motorcycles.",
      link: { label: "Two-wheeler components", href: "/automotive-parts/two-wheelers" },
    },
  ],
  specify: [
    "Type and use: commuter, taxi, delivery or leisure",
    "Model and engine size, or the capacity band you need",
    "Start, brakes and wheels: kick or electric, drum or disc, spoke or alloy",
    "Destination country, its emission level and any ABS requirement",
    "Complete motorcycles or CKD kits",
    "Colours and accessories: racks, crash guards, top boxes",
    "Quantity, delivery schedule and destination port",
    "Parts package to ship with the fleet",
  ],
  enquiryProduct: "Two-wheelers",
};
