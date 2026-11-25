import { cc, links, type VehicleSegment } from "./types";

export const specialPurposeVehicles: VehicleSegment = {
  id: "special-purpose-vehicles",
  title: "Special-Purpose Vehicles",
  shortTitle: "Special-purpose vehicles",
  icon: "container",
  seoTitle: "Special-Purpose Vehicles from India — Fire, Tanker & Reefer | GTS",
  metaDescription:
    "Fire tenders, tankers, refrigerated trucks, municipal vehicles, ambulances and mobile workshops built on Indian chassis — what each involves and what to specify.",
  keywords: [
    "special purpose vehicle export India",
    "fire tender exporter India",
    "tanker truck exporter India",
    "refrigerated truck India",
    "ambulance exporter India",
    "garbage truck exporter",
    "mobile workshop vehicle",
  ],
  heroTitle: "Special-purpose vehicles from India",
  heroLead:
    "Fire tenders, tankers, refrigerated trucks, municipal vehicles, ambulances and mobile workshops — vehicles built for one job on a standard chassis, and what to specify when you need one.",
  media: "specialPurposeHero",
  heroCredit: cc("AvaneeshKulkarni04", "CC BY-SA 4.0", "Mini_fire_tender_if_Mumbai_Fire_Brigade.jpg"),
  intro: [
    "A special-purpose vehicle is a standard chassis with an application body: a fire pump and water tank, a tanker barrel, an insulated box and refrigeration unit, a compactor, a patient compartment, a workshop. The chassis comes from a vehicle manufacturer; the body and equipment usually come from a specialist builder.",
    "India has a large body-building industry around its truck and van manufacturers, building these vehicles for its own municipalities, fire services, health systems and logistics firms, and the same chassis and bodies can be built to an export specification. Our contract manufacturing covers several of these bodies, including tankers, refrigerated bodies and truck bodies.",
    "This page describes each type, not a stock list. Chassis, bodies and standards differ by market and application, and we confirm what can be supplied for your destination before anything is committed.",
  ],
  classes: {
    title: "How special-purpose vehicles are built",
    items: [
      { code: "Chassis", label: "A standard truck, van or pick-up chassis from the vehicle manufacturer." },
      { code: "Body", label: "The application body and its equipment, from a specialist builder." },
      { code: "Approval", label: "Often in stages: the chassis by its maker, the completed vehicle by the body builder." },
    ],
    note: "Because the chassis and the body come from different builders, the payload, weight distribution and approval have to be agreed across both before anything is ordered.",
  },
  types: [
    {
      id: "fire-tenders",
      title: "Fire tenders",
      summary:
        "Fire-fighting vehicles carrying water, foam, pumps and crew, from compact first-response units to heavy tenders and airport crash tenders.",
      body: [
        "A fire tender combines a crew cab, a water tank, a fire pump and hose equipment on a truck chassis. Mini and quick-response tenders on van or light-truck chassis reach narrow streets first; water tenders on medium and heavy chassis carry several thousand litres; foam tenders and airport crash tenders add foam systems and roof monitors for fuel fires.",
        "The specification starts with the risk: what has to be fought, where, and with what water supply. Tank capacity, pump output, foam system, crew seating and the locker layout follow, and fire services usually require the build to a recognised fire-appliance standard.",
      ],
      facts: [
        { label: "Chassis", value: "Van, light, medium or heavy truck" },
        { label: "Water", value: "From under 1,000 L to several thousand" },
        { label: "Pump", value: "Rated in litres per minute at pressure" },
        { label: "Types", value: "Mini, water, foam, crash tender" },
      ],
      uses: ["Municipal fire services", "Industrial and refinery sites", "Airports", "Ports and mines"],
      photo: {
        src: "/images/vehicle-types/sp-fire.webp",
        alt: "A red Tata airport crash tender of the Kerala fire service.",
        credit: cc("Fotokannan", "CC BY 3.0", "Airport_Crash_Tender.JPG"),
      },
      related: { label: "Fire safety consulting", href: "/consulting/fire-safety" },
    },
    {
      id: "tankers",
      title: "Tankers",
      summary:
        "Trucks and trailers carrying liquids and gases in bulk: fuel, LPG, water, milk, edible oil and chemicals.",
      body: [
        "A tanker body is designed around its cargo. Fuel tankers have compartments, bottom loading and vapour recovery; LPG tankers are pressure vessels built to a pressure-vessel code; milk tankers are insulated stainless steel; water tankers can be simple mild steel. Capacity runs from a few thousand litres on a light chassis to more than 30,000 litres on a heavy truck or semi-trailer.",
        "Material, compartments, valves and the destination's dangerous-goods rules for fuel, gas and chemicals define the specification. Tanker fabrication is part of our contract manufacturing scope.",
      ],
      facts: [
        { label: "Capacity", value: "A few thousand to more than 30,000 L" },
        { label: "Materials", value: "Mild steel, stainless steel, aluminium" },
        { label: "Cargoes", value: "Fuel, LPG, water, milk, chemicals" },
        { label: "Chassis", value: "Rigid truck or semi-trailer" },
      ],
      uses: ["Fuel distribution", "LPG supply", "Municipal water", "Dairy collection", "Chemical transport"],
      photo: {
        src: "/images/vehicle-types/sp-tanker.webp",
        alt: "LPG tanker trucks on a national highway in West Bengal.",
        credit: cc(
          "Biswarup Ganguly",
          "CC BY 3.0",
          "Liquid_Petroleum_Gas_Transportation_-_National_Highway_2_-_Burdwan_-_2017-10-21_5067.JPG",
        ),
      },
      related: links.manufacturing,
    },
    {
      id: "refrigerated-trucks",
      title: "Refrigerated trucks",
      summary:
        "Insulated bodies with a refrigeration unit, keeping food and medicines within a set temperature from pickup to delivery.",
      body: [
        "A refrigerated truck has an insulated box, usually a polyurethane foam core between glass-fibre or metal skins, and a refrigeration unit driven by the vehicle's engine or by its own motor. Chilled bodies hold around 0 to 5 °C for fresh produce and dairy; frozen bodies hold −18 °C or lower.",
        "Insulation thickness, unit capacity, door layout and whether the body has more than one temperature zone are set from the cargo, the outside temperature and the number of door openings per trip. In hot climates the unit is sized with a generous margin.",
      ],
      facts: [
        { label: "Temperatures", value: "Chilled 0–5 °C; frozen −18 °C or below" },
        { label: "Body", value: "Insulated panels, PUF core" },
        { label: "Unit", value: "Engine-driven or independent" },
        { label: "Chassis", value: "Mini truck to heavy truck" },
      ],
      uses: [
        "Fresh produce and dairy",
        "Frozen food",
        "Pharmaceuticals and vaccines",
        "Meat and fish",
        "Food-service delivery",
      ],
      photo: {
        src: "/images/vehicle-types/sp-reefer.webp",
        alt: "A white refrigerated truck of an Indian logistics company.",
        credit: cc("Therupeshbharti", "CC BY-SA 4.0", "Refrigerated_Transporters_in_India.jpg"),
      },
      related: links.manufacturing,
    },
    {
      id: "municipal-vehicles",
      title: "Municipal and refuse vehicles",
      summary: "Garbage compactors, tippers, hook loaders, sweepers and sewer cleaners for city services.",
      body: [
        "Cities run a family of specialised vehicles: small tippers and three-wheelers for door-to-door collection, compactors that press waste to carry more per trip, hook loaders and skip loaders for containers, road sweepers, and suction and jetting machines for sewers and drains.",
        "The right mix depends on the collection system: door-to-door or bins, street width, the distance to the disposal site, and how much waste each route produces. Compactor capacity is quoted in cubic metres, and the body has to be matched to the bins the city uses.",
      ],
      facts: [
        { label: "Types", value: "Compactor, tipper, hook loader, sweeper, jetting" },
        { label: "Capacity", value: "Compactors rated in cubic metres" },
        { label: "Chassis", value: "Three-wheeler to heavy truck" },
        { label: "Matched to", value: "The city's bins and collection system" },
      ],
      uses: [
        "Municipal waste collection",
        "Street cleaning",
        "Sewer and drain maintenance",
        "Industrial waste",
        "Market and campus cleaning",
      ],
      photo: {
        src: "/images/vehicle-types/sp-municipal.webp",
        alt: "A Kolkata Municipal Corporation tipper truck being loaded with waste.",
        credit: cc("pradip paswan", "CC BY-SA 4.0", "City_kolkata_Municipal_Corporation.jpg"),
      },
    },
    {
      id: "ambulances",
      title: "Ambulances",
      summary:
        "Patient-transport and life-support ambulances, mostly built on van chassis and equipped to the level of care they provide.",
      body: [
        "Ambulances are graded by the care they provide. Patient-transport ambulances carry a stretcher and basic equipment; basic life support ambulances add oxygen, monitoring and emergency equipment; advanced life support ambulances carry a ventilator, defibrillator and drugs for critical care. India builds large numbers on van platforms such as the Force Traveller.",
        "Specify the care level, the equipment list, the layout of the patient compartment, and the destination's ambulance standard, which may set dimensions, lighting, sirens and markings. Air-conditioning and electrical capacity matter in hot climates.",
      ],
      facts: [
        { label: "Levels", value: "Patient transport, BLS, ALS" },
        { label: "Chassis", value: "Mostly van-based" },
        { label: "Fit-out", value: "Stretcher, oxygen, monitoring, equipment" },
        { label: "Standards", value: "Set by the destination" },
      ],
      uses: ["Emergency medical services", "Hospitals", "Mines and industrial sites", "Event medical cover"],
      photo: {
        src: "/images/vehicle-types/sp-ambulance.webp",
        alt: "A white Force Traveller ambulance of an Indian hospital group.",
        credit: cc("Narenfox", "CC BY-SA 4.0", "Ambulance_used_by_Narayana_Health_Group,_India.jpg"),
      },
    },
    {
      id: "mobile-workshops",
      title: "Mobile workshops and service vehicles",
      summary: "Vehicles carrying the tools, spares and power to repair machines where they work.",
      body: [
        "A mobile workshop takes the workshop to the machine: tools, a generator or compressor, welding equipment, lighting, storage for spares and sometimes a crane, built into a van, pick-up or truck body. Dealers use smaller versions for roadside and doorstep service; mines, farms and construction sites use larger ones to keep equipment running far from a base.",
        "The specification is a list of what the technician needs on site: power, air, lifting, light, and the spares for the fleet being supported. The racking and storage layout matter as much as the vehicle.",
      ],
      facts: [
        { label: "Base", value: "Van, pick-up or truck" },
        { label: "Equipment", value: "Generator, compressor, welding, crane" },
        { label: "Storage", value: "Racking for tools and spares" },
        { label: "Users", value: "Dealers, mines, farms, sites" },
      ],
      uses: [
        "Dealer roadside service",
        "Mining and quarry support",
        "Construction sites",
        "Farm machinery service",
        "Utility and telecom maintenance",
      ],
      photo: {
        src: "/images/vehicle-types/sp-workshop.webp",
        alt: "An orange Mahindra Scorpio fitted out as a dealer service vehicle.",
        credit: cc("SnapMeUp", "CC BY-SA 4.0", "Mahindra_Scorpio_GEN-I_Service_Vehicle.JPG"),
      },
    },
  ],
  considerations: [
    {
      title: "Chassis and body together",
      icon: "package",
      text: "Agree the chassis and the body as one specification: payload, axle loads, wheelbase and the power take-off for pumps or hydraulics all have to fit.",
    },
    {
      title: "Standards",
      icon: "shieldCheck",
      text: "Fire appliances, ambulances, pressure vessels and dangerous-goods tankers are built to specific standards. Name the standard your buyer or authority requires.",
      link: links.homologation,
    },
    {
      title: "Climate",
      icon: "flame",
      text: "Heat, dust and altitude affect pumps, refrigeration units, generators and air-conditioning. Specify the operating conditions, not just the vehicle.",
    },
    {
      title: "Training and handover",
      icon: "clipboard",
      text: "Specialised equipment needs operator training and documentation in the right language. Include both in the order.",
    },
    {
      title: "Shipping",
      icon: "container",
      text: "Most special-purpose vehicles ship roll-on/roll-off or on flat racks. Large tankers and heavy vehicles may need ODC planning.",
      link: links.odc,
    },
    {
      title: "Parts and service",
      icon: "wrench",
      text: "Plan spares for both the chassis and the equipment: pump seals, refrigeration parts, hydraulic hoses and filters.",
      link: { label: "Automotive parts", href: "/automotive-parts" },
    },
  ],
  specify: [
    "The application, and what the vehicle must do",
    "Capacity: water, cargo volume, payload or patients",
    "Chassis preference or weight class",
    "Equipment list, and any standard it must meet",
    "Destination country, drive side and operating climate",
    "Training, manuals and documentation language",
    "Quantity, delivery schedule and destination port",
    "Spares for both the chassis and the equipment",
  ],
  enquiryProduct: "Special-purpose vehicles",
};
