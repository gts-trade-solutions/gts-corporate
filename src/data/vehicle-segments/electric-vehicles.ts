import { cc, links, segmentPath, type VehicleSegment } from "./types";

const electric = /electric|\bev\b|e-?rickshaw|e-?bus/i;

export const electricVehicles: VehicleSegment = {
  id: "electric-vehicles",
  title: "Electric Vehicles",
  shortTitle: "Electric vehicles",
  icon: "bolt",
  seoTitle: "Electric Vehicles from India — EV Cars, Scooters, 3W & Buses | GTS",
  metaDescription:
    "Electric cars, two-wheelers, three-wheelers and buses from India, and the charging behind them — what each is for, key figures and what to specify.",
  keywords: [
    "electric vehicle export India",
    "EV exporter India",
    "electric scooter exporter India",
    "electric three wheeler exporter",
    "electric bus export India",
    "EV charging equipment India",
  ],
  heroTitle: "Electric vehicles from India",
  heroLead:
    "Electric cars and SUVs, two- and three-wheelers and buses, and the charging that makes them work — how each type is built, what it suits, and what to settle before you order.",
  media: "electricVehiclesHero",
  heroCredit: cc("Manukrishnan80", "CC BY-SA 4.0", "EV_charging_station_,kollam.jpg"),
  intro: [
    "India's electric vehicle industry has grown fastest where electric drive pays back quickest: two-wheelers, three-wheelers and city buses that cover predictable daily distances. Electric cars and SUVs from Indian manufacturers have followed, and the supply of batteries, motors and chargers has grown with them.",
    "An electric vehicle is bought as a system. The vehicle is only part of it: the charging plan, the battery's warranty and its life in your climate, and local service capability decide whether it pays back. This page covers each type, and the charging behind them.",
    "This page describes each type, not a stock list. Specifications, charging standards and variants differ by market, and we confirm what can be supplied for your destination before anything is committed.",
  ],
  classes: {
    title: "Kinds of electric drive",
    items: [
      { code: "BEV", label: "Battery-electric: driven only by the battery, charged from the grid. Most Indian EVs are BEVs." },
      { code: "PHEV", label: "Plug-in hybrid: an engine plus a battery large enough for some electric-only driving." },
      { code: "HEV", label: "Hybrid: an engine assisted by a motor and a small battery, never plugged in." },
    ],
    note: "Electric vehicles are approved in the same categories as fuel-powered ones (M, N and L), with extra rules for battery safety and charging. Charging connectors and standards also differ by market.",
  },
  types: [
    {
      id: "electric-cars",
      title: "Electric cars and SUVs",
      summary: "Battery-electric hatchbacks and compact SUVs, charged at home or at public fast chargers.",
      body: [
        "Indian electric cars are mostly compact: hatchbacks and SUVs of about four metres, with batteries from about 20 kWh to more than 60 kWh and certified ranges of roughly 250 to 500 km. Real-world range is lower, particularly with air-conditioning running. Most charge on AC overnight at home or work, and on DC fast chargers on the road.",
        "For export, the charging connector and protocol have to match the destination's network, and drive side applies as for any car. Battery warranty terms, and whether anyone locally can diagnose and repair the high-voltage system, matter as much as range.",
      ],
      facts: [
        { label: "Battery", value: "About 20 kWh to more than 60 kWh" },
        { label: "Range", value: "Roughly 250–500 km certified" },
        { label: "Charging", value: "AC at home, DC fast charging" },
        { label: "Body", value: "Hatchback and compact SUV" },
      ],
      uses: ["Private ownership", "Corporate and government fleets", "Ride-hailing", "Campus and estate fleets"],
      photo: {
        src: "/images/vehicle-types/ev-car.webp",
        alt: "A white Mahindra XUV400 electric SUV parked outside an apartment building in Jamshedpur.",
        credit: cc(
          "Ank Kumar",
          "CC BY-SA 4.0",
          "2023_Mahindra_XUV_400_EL_EV_,_Ashiana_Brahmananda,_Jamshedpur,_Jharkhand,_India_(_Ank_Kumar,_Infosys_Limited_)_03.jpg",
        ),
      },
      groups: ["passenger-vehicles"],
      match: electric,
      matchName: electric,
    },
    {
      id: "electric-two-wheelers",
      title: "Electric two-wheelers",
      summary: "Electric scooters and motorcycles: the largest electric vehicle segment in India by number.",
      body: [
        "Electric scooters lead India's EV sales. Most carry a lithium-ion battery of about 2 to 4 kWh and a hub or mid-mounted motor, ride and handle like a 110 to 125 cc petrol scooter, and charge from an ordinary socket in a few hours.",
        "Their strongest case abroad is delivery and fleet work, where daily distances are known and the fuel saving builds up quickly. The two-wheeler page covers them alongside the petrol alternatives.",
      ],
      facts: [
        { label: "Battery", value: "About 2–4 kWh" },
        { label: "Range", value: "Around 80–150 km" },
        { label: "Charging", value: "Home socket, fast charging or swap" },
        { label: "Top speed", value: "Typically 60–120 km/h" },
      ],
      uses: ["Delivery fleets", "Urban commuting", "Rental and sharing", "Campus mobility"],
      photo: {
        src: "/images/vehicle-types/ev-two-wheeler.webp",
        alt: "Three Bajaj Chetak electric scooters lined up in a showroom.",
        credit: cc("Gpkp", "CC BY-SA 4.0", "Bajaj_Chetak_electric_scooters_(2026)_01.jpg"),
      },
      groups: ["two-wheelers"],
      match: electric,
      matchName: electric,
      related: { label: "Two-wheelers in depth", href: segmentPath("two-wheelers") },
    },
    {
      id: "electric-three-wheelers",
      title: "Electric three-wheelers",
      summary:
        "Electric autos and e-rickshaws for passengers and cargo: the vehicles that went electric first in India.",
      body: [
        "Electric three-wheelers were the first Indian vehicles to go electric in large numbers, because they run short, predictable routes and their drivers feel every rupee of fuel cost. They range from low-speed e-rickshaws to full-speed electric autos and cargo carriers with lithium-ion batteries.",
        "Battery swapping, where a driver exchanges a flat battery for a charged one in minutes, has spread for these vehicles and is worth considering for fleets. The three-wheeler page covers the types and the approval questions in detail.",
      ],
      facts: [
        { label: "Types", value: "E-rickshaw, e-auto, e-cargo" },
        { label: "Range", value: "About 100–150 km for e-autos" },
        { label: "Charging", value: "Plug-in or battery swap" },
        { label: "Category", value: "L5, or India's e-rickshaw class" },
      ],
      uses: ["Shared passenger routes", "Last-mile feeder services", "Urban cargo", "Waste collection"],
      photo: {
        src: "/images/vehicle-types/ev-three-wheeler.webp",
        alt: "A battery-powered toto e-rickshaw on Netaji Subhash Marg in Delhi.",
        credit: cc(
          "Biswarup Ganguly",
          "CC BY 3.0",
          "Toto_Rickshaw_-_Battery_Powered_Three-wheeler_-_Netaji_Subhash_Marg_-_Delhi_2014-05-13_3121.JPG",
        ),
      },
      groups: ["three-wheelers"],
      match: electric,
      matchName: electric,
      related: { label: "Three-wheelers in depth", href: segmentPath("three-wheelers") },
    },
    {
      id: "electric-buses",
      title: "Electric buses",
      summary: "Battery-electric city and intercity buses, now running in large numbers in Indian cities.",
      body: [
        "Indian cities have adopted electric buses at scale, mostly nine- and twelve-metre city buses charged overnight at the depot, and electric intercity services now run too. The bus and its charging are planned together: the battery is sized to the route, and the depot needs chargers and a grid connection to match.",
        "Battery warranty, depot charging equipment and a service partner able to support the high-voltage system belong in the same contract as the buses. The buses page covers city, intercity and electric types in detail.",
      ],
      facts: [
        { label: "Length", value: "Mainly 9 m and 12 m" },
        { label: "Charging", value: "Overnight at the depot, or on the route" },
        { label: "Battery sized by", value: "Longest daily duty, plus a margin" },
        { label: "Class", value: "Class I city; Class II or III intercity" },
      ],
      uses: ["City routes", "Metro feeder services", "Airport and campus shuttles", "Staff transport"],
      photo: {
        src: "/images/vehicle-types/ev-bus.webp",
        alt: "A green and white Olectra electric bus of the Telangana transport corporation in Hyderabad.",
        credit: cc("LoveofZ", "CC BY-SA 4.0", "Olectra_-_BYD_Electric_Bus_Hyderabad_1.jpg"),
      },
      groups: ["buses"],
      match: electric,
      matchName: electric,
      related: { label: "Buses in depth", href: segmentPath("buses") },
    },
    {
      id: "charging",
      title: "Charging equipment",
      summary:
        "AC chargers for homes and depots, and DC fast chargers for public and fleet use: the half of an EV purchase that is not the vehicle.",
      body: [
        "AC chargers, from a few kilowatts up to about 22 kW, charge cars and light vehicles over several hours and suit homes, workplaces and overnight depots. DC fast chargers, from about 30 kW to several hundred, charge a car in under an hour and are what buses and high-use fleets rely on.",
        "The connector standard has to match the vehicles and the market: CCS2 is common in India and Europe, while other markets use other standards. A fleet charging plan sets the number and power of chargers from the daily duty, and the site's grid connection often decides what is possible.",
      ],
      facts: [
        { label: "AC charging", value: "Up to about 22 kW" },
        { label: "DC fast charging", value: "About 30 kW to several hundred" },
        { label: "Connectors", value: "CCS2 and others, by market" },
        { label: "Sized by", value: "Fleet duty and grid connection" },
      ],
      uses: ["Fleet depots", "Public charging stations", "Workplaces and campuses", "Fuel stations and highway sites"],
      photo: {
        src: "/images/vehicle-types/ev-charging.webp",
        alt: "A public EV charging station with a fast charger at Idukki Dam Park in Kerala.",
        credit: cc("Timothy A. Gonsalves", "CC BY-SA 4.0", "EV_Charging_Station_Idukki_Dam_Park_Nov23_A7C_08066.jpg"),
      },
      related: { label: "EV component sourcing", href: "/automotive-parts/ev-components" },
    },
  ],
  considerations: [
    {
      title: "Charging standard",
      icon: "bolt",
      text: "Connectors and charging protocols differ by market. Match the vehicle's inlet and the chargers to the destination's network before ordering.",
    },
    {
      title: "Battery warranty and life",
      icon: "shieldCheck",
      text: "Ask for the battery warranty in years and kilometres, what it covers, and how heat affects it. Battery replacement is the largest cost over an EV's life.",
    },
    {
      title: "Approval and battery shipping",
      icon: "package",
      text: "EVs need the destination's vehicle approval plus battery safety certification. Lithium-ion batteries are dangerous goods in transport, which affects packing, documents and freight.",
      link: links.homologation,
    },
    {
      title: "Grid and site",
      icon: "factory",
      text: "Fleet charging needs electrical capacity at the depot. Check the grid connection early: upgrading it can take longer than the vehicles take to arrive.",
    },
    {
      title: "Service capability",
      icon: "wrench",
      text: "High-voltage systems need trained technicians and diagnostic tools. Confirm local service support, or plan training, before the vehicles land.",
    },
    {
      title: "The running-cost case",
      icon: "chart",
      text: "EVs pay back through low energy and maintenance costs over high daily distances. Build the case on your own duty cycle, electricity tariff and fuel price.",
      link: { label: "EV sourcing and duty cycles", href: "/blog/ev-component-sourcing-duty-cycle" },
    },
  ],
  specify: [
    "Vehicle type and the daily duty: distance, load and hours",
    "Battery size, range needed and climate",
    "Charging: overnight, fast charging or battery swap",
    "The connector standard used in your market",
    "Destination country and drive side",
    "Chargers and installation, if needed",
    "Battery warranty and service support required",
    "Quantity, delivery schedule and destination port",
  ],
  enquiryProduct: "Electric vehicles",
};
