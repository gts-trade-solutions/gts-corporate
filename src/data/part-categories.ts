/**
 * Per-category detail for the Automotive Parts sub-pages.
 *
 * These sit under /automotive-parts/<id> and are the deep, long-tail SEO layer.
 * They deliberately add NO new top-level navigation — the six primary tabs are
 * unchanged, per the MVP brief.
 *
 * Content rule: nothing here claims stock, certification, approvals or
 * capacity. "What to specify" is buyer guidance, not a promise.
 */

export type PartCategoryDetail = {
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  /** What a buyer should send us so the enquiry is quotable first time. */
  specify: string[];
  /** Typical vehicles or machines the category is fitted to. */
  applications: string[];
};

export const partCategoryDetails: Record<string, PartCategoryDetail> = {
  "two-wheelers": {
    seoTitle: "Two Wheeler Spare Parts Supplier & Exporter | GTS Trade Solutions",
    metaDescription:
      "Source two-wheeler components — motors, controllers, battery packs, BMS, chargers, wheels, tyres, brakes, suspension and body parts — for petrol and electric platforms.",
    keywords: [
      "two wheeler spare parts",
      "motorcycle spare parts exporter",
      "electric scooter parts",
      "two wheeler battery pack",
      "BMS supplier",
    ],
    intro:
      "Two-wheeler sourcing splits cleanly between conventional and electric platforms. Petrol programmes tend to need running gear, braking and body parts; electric programmes are driven by the motor, controller and battery decision, with everything else following from the voltage and duty cycle you choose.",
    specify: [
      "Platform: petrol or electric, and the model it fits",
      "For EV: system voltage, motor power rating and controller type",
      "Battery chemistry, capacity and whether a BMS is required",
      "Wheel and tyre size, brake type (drum or disc)",
      "Annual volume and whether supply is one-off or scheduled",
    ],
    applications: [
      "Commuter motorcycles",
      "Scooters",
      "Electric two-wheelers",
      "Last-mile delivery fleets",
    ],
  },
  "three-wheelers": {
    seoTitle: "Three Wheeler Parts Supplier — Axles, EV Axles & Drivetrain | GTS",
    metaDescription:
      "Three-wheeler components for passenger, cargo and electric platforms: rear axles, differentials, EV axles, motors, controllers, batteries, brakes, suspension, tyres and rims.",
    keywords: [
      "three wheeler parts",
      "auto rickshaw spare parts",
      "electric three wheeler axle",
      "three wheeler differential",
      "e rickshaw parts supplier",
    ],
    intro:
      "Three-wheeler work is dominated by the rear axle and the driveline around it. Cargo platforms carry very different loads to passenger platforms, and electric conversions change the axle requirement entirely, so the payload and duty cycle matter more than the model name.",
    specify: [
      "Passenger or cargo, and rated payload",
      "Axle type: conventional rear axle, differential, or EV axle",
      "For EV: motor power, voltage and reduction ratio",
      "Track width and mounting centres",
      "Brake type and tyre or rim size",
    ],
    applications: [
      "Passenger three-wheelers",
      "Cargo three-wheelers",
      "Electric three-wheelers",
      "Municipal and utility platforms",
    ],
  },
  "cars-lcvs": {
    seoTitle: "Car & LCV Spare Parts Supplier and Exporter | GTS Trade Solutions",
    metaDescription:
      "Passenger car and light commercial vehicle components: suspension, steering, braking, drivetrain, wheels, tyres, electrical, thermal and chassis parts for OEM and aftermarket buyers.",
    keywords: [
      "car spare parts exporter",
      "LCV spare parts",
      "passenger vehicle components",
      "car suspension parts supplier",
      "aftermarket auto parts India",
    ],
    intro:
      "Car and LCV sourcing is usually either an aftermarket range-fill or a specific OEM programme. Both are quotable, but they need different information: aftermarket buyers work from part numbers and cross-references, OEM programmes from drawings and validation requirements.",
    specify: [
      "Make, model, year and variant — or the OEM part number",
      "Whether you need OEM-equivalent or aftermarket grade",
      "Left- or right-hand drive where it affects the part",
      "Any homologation or certification requirement in the destination market",
      "Order quantity and expected annual volume",
    ],
    applications: ["Passenger cars", "SUVs and MPVs", "Pick-ups", "Light commercial vehicles"],
  },
  trucks: {
    seoTitle: "Truck Spare Parts Supplier & Exporter — Axles, Brakes, Tyres | GTS",
    metaDescription:
      "Medium and heavy truck components: front and rear axles, mechanical and air suspension, brakes, ABS and EBS, tyres, wheel rims, differentials, propeller shafts, PTOs, hydraulics and cabin parts.",
    keywords: [
      "truck spare parts",
      "truck axle supplier",
      "commercial vehicle parts exporter",
      "truck air suspension",
      "ABS EBS supplier",
      "PTO hydraulic pump truck",
    ],
    intro:
      "Truck aggregates are specified by load and duty, not by model. An axle for a 40-tonne tipper on site roads and an axle for a highway tractor unit at the same GVW are different products, so the application drives the specification more than anything else.",
    specify: [
      "GVW or GCW, and axle load rating required",
      "Application: tipper, tractor unit, rigid, tanker, mixer",
      "Suspension type: mechanical leaf or air",
      "Braking: drum or disc, and whether ABS or EBS is required",
      "Tyre and rim size, plus PCD and offset for wheels",
      "Duty cycle — on-highway, mixed or off-road",
    ],
    applications: [
      "Medium and heavy trucks",
      "Tractor units",
      "Tippers and mixers",
      "Tankers and special-application bodies",
    ],
  },
  buses: {
    seoTitle: "Bus Spare Parts Supplier — Axles, Air Suspension, HVAC, Seats | GTS",
    metaDescription:
      "Bus and coach components: axles, air suspension, steering, brakes, tyres, rims, doors, seats, HVAC, lighting, electrical, safety and interior parts for city, intercity and electric buses.",
    keywords: [
      "bus spare parts",
      "bus axle supplier",
      "bus air suspension",
      "bus HVAC supplier",
      "bus seats supplier",
      "electric bus components",
    ],
    intro:
      "Bus sourcing divides into running gear and passenger environment. The chassis side follows truck logic — axle rating, suspension, braking — while doors, seats, HVAC and interior trim are specified around passenger count, route type and climate.",
    specify: [
      "Bus type: city, intercity, coach, school or staff",
      "Chassis make and model, and axle rating",
      "Suspension: mechanical or air, and ride height requirement",
      "Seating capacity and layout for interior items",
      "Climate and HVAC cooling capacity required",
      "Whether the platform is diesel or electric",
    ],
    applications: ["City buses", "Intercity coaches", "School and staff buses", "Electric buses"],
  },
  "ev-components": {
    seoTitle: "EV Components Supplier — E-Axles, Traction Motors, BMS, Chargers | GTS",
    metaDescription:
      "Electric vehicle components: e-axles, traction motors, controllers, inverters, battery systems and BMS, chargers, DC-DC converters, high-voltage harnesses and thermal management.",
    keywords: [
      "EV components supplier",
      "e axle supplier",
      "traction motor supplier",
      "EV battery pack BMS",
      "EV charger DC-DC converter",
      "electric vehicle parts India",
    ],
    intro:
      "EV component selection is a system decision, not a parts list. Voltage, motor rating, battery capacity and thermal strategy constrain each other, so we would rather see the vehicle duty cycle up front than a shopping list — it usually changes what we recommend.",
    specify: [
      "Vehicle platform and kerb weight, plus payload",
      "System voltage and target range",
      "Continuous and peak power required, and gradeability",
      "Battery capacity, chemistry and pack format",
      "Charging: AC or DC, and target charge time",
      "Cooling strategy — air or liquid",
    ],
    applications: [
      "Electric two- and three-wheelers",
      "Electric LCVs",
      "Electric buses and trucks",
      "Off-highway electrification programmes",
    ],
  },
  "trailer-components": {
    seoTitle: "Trailer Parts Supplier — Axles, Landing Legs, Kingpins, Fifth Wheels | GTS",
    metaDescription:
      "Trailer running gear and coupling components: trailer axles, mechanical and air suspension, landing legs, kingpins, fifth wheels, brakes, ABS and EBS, tyres, rims, lighting and mudguards.",
    keywords: [
      "trailer axle supplier",
      "trailer parts exporter",
      "landing legs kingpin supplier",
      "fifth wheel coupling",
      "trailer air suspension",
      "trailer EBS",
    ],
    intro:
      "Trailer running gear is the most frequently requested group on this page. Axle rating, track width and suspension type are the three numbers that decide almost everything else, and they follow directly from the trailer configuration and the roads it will work on.",
    specify: [
      "Trailer type: flatbed, container, low-bed, tipper, tanker, box or curtain-side",
      "Number of axles and rating per axle",
      "Track width and required ride height",
      "Suspension: mechanical leaf or air",
      "Braking: drum or disc, with or without ABS/EBS",
      "Kingpin size and fifth-wheel compatibility",
    ],
    applications: [
      "Flatbed and container trailers",
      "Low-bed and heavy-haul trailers",
      "Tipper and tanker trailers",
      "Box and curtain-side trailers",
    ],
  },
  "agriculture-off-highway": {
    seoTitle: "Tractor & Agricultural Machinery Parts Supplier | GTS Trade Solutions",
    metaDescription:
      "Tractor and off-highway components: axles, transmission parts, PTOs, hydraulic pumps and cylinders, linkages, tyres and rims, disc blades, rotavator and harvester parts, bearings and filters.",
    keywords: [
      "tractor parts supplier",
      "agricultural machinery parts",
      "tractor PTO supplier",
      "hydraulic cylinder tractor",
      "rotavator parts",
      "harvester spare parts",
    ],
    intro:
      "Agricultural sourcing covers both tractor aggregates and implement wear parts. Wear items such as disc blades and rotavator blades are specified by dimension and material; driveline and hydraulic parts are specified by the tractor they fit and the implement they drive.",
    specify: [
      "Tractor make, model and HP range",
      "For implements: working width and the tractor it is matched to",
      "PTO speed and spline count where relevant",
      "Hydraulic bore, stroke and operating pressure",
      "For wear parts: diameter, thickness, bore and material grade",
      "Annual volume, since wear parts usually move on schedule",
    ],
    applications: [
      "Tractors",
      "Rotavators and tillage implements",
      "Harvesters",
      "Off-highway and construction machinery",
    ],
  },
};
