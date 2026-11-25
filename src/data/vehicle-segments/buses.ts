import { cc, links, type VehicleSegment } from "./types";

export const buses: VehicleSegment = {
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
      link: links.homologation,
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
      link: links.odc,
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
