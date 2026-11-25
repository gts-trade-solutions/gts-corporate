import { cc, links, segmentPath, type VehicleSegment } from "./types";

export const threeWheelers: VehicleSegment = {
  id: "three-wheelers",
  group: "three-wheelers",
  title: "Three-Wheelers",
  shortTitle: "Three-wheelers",
  icon: "threeWheeler",
  seoTitle: "Three-Wheelers from India for Export — Auto Rickshaws & Cargo | GTS",
  metaDescription:
    "Auto-rickshaws, cargo three-wheelers, electric three-wheelers and quadricycles from India — what each is for, key figures and the models in our export schedule.",
  keywords: [
    "three wheeler exporter India",
    "auto rickshaw exporter",
    "tuk tuk supplier India",
    "cargo three wheeler export",
    "e-rickshaw exporter India",
    "quadricycle export India",
  ],
  heroTitle: "Three-wheelers from India",
  heroLead:
    "Passenger auto-rickshaws, cargo three-wheelers, electric three-wheelers and quadricycles — the vehicles India builds for short-haul passengers and goods, and what to specify for your market.",
  media: "threeWheelersHero",
  heroCredit: cc("Slyronit", "CC BY-SA 4.0", "Auto_Rickshaws_outside_Purana_Qila,_Delhi.jpg"),
  intro: [
    "The three-wheeler is one of India's most distinctive exports. Known as the auto-rickshaw, tuk-tuk, bajaj or keke depending on the country, it carries passengers and goods in cities across Africa, Asia and Latin America, and a large share of the world's supply is built in India.",
    "Its appeal is simple: a low price, very low running costs, a turning circle made for crowded streets, and mechanicals any roadside workshop can repair. Petrol, CNG, LPG, diesel and electric versions cover almost every market's fuel situation.",
    "This page describes each type, not a stock list. Specifications and variants differ by market, and we confirm what can be supplied for your destination before anything is committed.",
  ],
  classes: {
    title: "How three-wheelers are classed",
    items: [
      { code: "L2", label: "Three-wheeled mopeds: up to 50 cc or 45 km/h." },
      {
        code: "L5",
        label: "Three-wheeled motor vehicles above those limits: passenger and cargo auto-rickshaws, and electric autos.",
      },
      {
        code: "L7",
        label: "Heavy quadricycles: light four-wheelers such as the Bajaj Qute, limited in weight and power.",
      },
    ],
    note: "India also has its own class for e-rickshaws and e-carts: battery three-wheelers limited to 25 km/h. Many markets have no equivalent, so their approval route has to be checked before an order.",
  },
  types: [
    {
      id: "passenger-three-wheelers",
      title: "Passenger three-wheelers (auto-rickshaws)",
      summary:
        "The auto-rickshaw: a three-passenger taxi with a small engine, a canvas or hard top, and some of the lowest running costs of any motor vehicle.",
      body: [
        "A passenger three-wheeler has a single front wheel, a rear-mounted engine of about 200 to 250 cc driving the rear wheels, a driver's seat in front and a bench for three passengers behind. It is light, cheap to run and turns in a very small circle, which is why it fills the gap between the bus and the car taxi in so many cities.",
        "Variants differ in fuel, seating, side doors or curtains, and layout for different markets. Africa and Latin America take large numbers as taxis, often with trims and colours specified to local taxi rules.",
      ],
      facts: [
        { label: "Engine", value: "About 200–250 cc, single cylinder" },
        { label: "Seating", value: "Driver plus three passengers" },
        { label: "Fuels", value: "Petrol, CNG, LPG or diesel" },
        { label: "Category", value: "L5" },
      ],
      uses: [
        "Shared and private taxi services",
        "Last-mile links from bus and rail stations",
        "Tourism",
        "Small-business transport",
      ],
      photo: {
        src: "/images/vehicle-types/thw-passenger.webp",
        alt: "A green and yellow Bajaj RE CNG auto-rickshaw on a road in New Delhi.",
        credit: cc(
          "Biswarup Ganguly",
          "CC BY 3.0",
          "Bajaj_RE_4S_CNG_-_Three-wheeler_-_New_Delhi_2014-05-06_0889.JPG",
        ),
      },
      match: /passenger/i,
      exclude: /electric|e-?rickshaw/i,
    },
    {
      id: "cargo-three-wheelers",
      title: "Cargo three-wheelers",
      summary:
        "Three-wheelers with a load body instead of seats, carrying around half a tonne through streets a truck cannot use.",
      body: [
        "Cargo three-wheelers share the front of the passenger version but carry a drop-side deck, a closed box or a special body behind the cab. Payloads are typically around 500 to 700 kg, with larger diesel and CNG engines than the passenger versions for the extra load.",
        "They are the delivery vehicle of markets and narrow streets: produce, gas cylinders, water, building materials and parcels. A closed box or a tipping deck can be specified, and the body and loading height should be matched to what will be carried.",
      ],
      facts: [
        { label: "Payload", value: "About 500–700 kg" },
        { label: "Bodies", value: "Drop-side, box, tipper, special" },
        { label: "Fuels", value: "Petrol, CNG, diesel or electric" },
        { label: "Category", value: "L5" },
      ],
      uses: [
        "Market and produce delivery",
        "LPG cylinder and water delivery",
        "Parcels and courier work",
        "Building materials",
        "Municipal collection",
      ],
      photo: {
        src: "/images/vehicle-types/thw-cargo.webp",
        alt: "A green Bajaj Maxima C cargo three-wheeler with a canopy over its load deck.",
        credit: cc("Oleg Yunakov", "CC BY-SA 4.0", "Bajaj_Maxima_C.jpg"),
      },
      match: /cargo/i,
      exclude: /electric/i,
    },
    {
      id: "electric-three-wheelers",
      title: "Electric three-wheelers and e-rickshaws",
      summary:
        "Battery-powered passenger and cargo three-wheelers, from low-speed e-rickshaws to full-speed electric autos.",
      body: [
        "There are two kinds. E-rickshaws are light, low-speed vehicles, limited in India to 25 km/h, with a small motor and lead-acid or lithium batteries; very large numbers serve short shared routes in Indian towns. Electric autos are full-speed L5 three-wheelers built like their petrol counterparts, with lithium-ion batteries and ranges of roughly 100 to 150 km.",
        "The running-cost saving is large, but so is the dependence on charging and on battery life. Check whether the destination allows low-speed e-rickshaws at all, how batteries will be charged or swapped, and what the warranty covers in your climate.",
      ],
      facts: [
        { label: "Types", value: "Low-speed e-rickshaw or full-speed e-auto" },
        { label: "Range", value: "Around 100–150 km for e-autos" },
        { label: "Batteries", value: "Lithium-ion; lead-acid on some e-rickshaws" },
        { label: "Category", value: "L5, or India's e-rickshaw class" },
      ],
      uses: [
        "Shared last-mile routes",
        "Feeder services to rail and metro",
        "Campus and estate transport",
        "Urban cargo delivery",
      ],
      photo: {
        src: "/images/vehicle-types/thw-electric.webp",
        alt: "A battery-powered toto e-rickshaw carrying passengers in Howrah, West Bengal.",
        credit: cc(
          "Biswarup Ganguly",
          "CC BY 3.0",
          "Toto_Rickshaw_-_Battery_Powered_Three-wheeler_-_Howrah_2014-06-15_5108.JPG",
        ),
      },
      match: /electric|e-?rickshaw/i,
      matchName: /electric|\bev\b/i,
      related: { label: "All electric vehicles", href: segmentPath("electric-vehicles") },
    },
    {
      id: "quadricycles",
      title: "Quadricycles",
      summary:
        "Light four-wheelers with a closed, car-like body, built to quadricycle rules with three-wheeler running costs.",
      body: [
        "A quadricycle is a light four-wheeled vehicle limited in weight and power. India's best-known example, the Bajaj Qute, has a rear-mounted engine of about 200 cc, seats four and has a closed body with doors, while weighing a fraction of a small car.",
        "It is sold as a safer, weatherproof alternative to the auto-rickshaw for taxi work, and as a low-cost personal vehicle. Where it is allowed, and on which roads, depends on the market's quadricycle rules, which vary widely.",
      ],
      facts: [
        { label: "Engine", value: "About 200 cc, rear-mounted" },
        { label: "Seating", value: "Four including the driver" },
        { label: "Fuels", value: "Petrol or CNG" },
        { label: "Category", value: "L7 heavy quadricycle" },
      ],
      uses: ["Taxi services", "Personal urban mobility", "City delivery", "Campus and resort transport"],
      photo: {
        src: "/images/vehicle-types/thw-quadricycle.webp",
        alt: "A red Bajaj Qute quadricycle on display.",
        credit: cc("Rsrikanth05", "CC BY-SA 4.0", "MakeInIndia-Bajaj-Qute.jpg"),
      },
      match: /quadricycle/i,
    },
  ],
  explainer: {
    eyebrow: "Fuel",
    title: "Petrol, CNG, LPG, diesel or electric?",
    paragraphs: [
      "Most passenger three-wheelers come with a choice of fuels, and the right one depends on what your market sells and what it costs. Petrol versions are the simplest and the most widely exported. CNG and LPG versions cost much less per kilometre where the gas is available, which is why cities with gas networks favour them.",
      "Diesel is common in cargo three-wheelers for its pulling power. Electric versions remove most of the fuel cost but need reliable charging and a plan for replacing batteries. Choose the fuel for the destination's supply, not India's.",
    ],
  },
  considerations: [
    {
      title: "Approval and city rules",
      icon: "shieldCheck",
      text: "Three-wheelers need approval as L-category vehicles, some cities cap or ban new taxi three-wheelers, and low-speed e-rickshaws may not be allowed at all. Check the city as well as the country.",
      link: links.homologation,
    },
    {
      title: "Fuel",
      icon: "bolt",
      text: "Choose the fuel the market can supply: petrol, CNG, LPG, diesel or electric. The same model is often offered in several.",
    },
    {
      title: "Layout and trim",
      icon: "route",
      text: "Drive side, doors or curtains, seating and colours are often specified to the market or to a city's taxi rules.",
    },
    {
      title: "Complete or CKD",
      icon: "package",
      text: "Many markets take three-wheelers as CKD kits for local assembly. Kits change the duty, and need a local assembler and a parts supply.",
    },
    {
      title: "Shipping",
      icon: "container",
      text: "Three-wheelers ship in containers, complete or as kits.",
    },
    {
      title: "Parts and service",
      icon: "wrench",
      text: "Clutch plates, brake shoes, cables, tyres and body parts wear fast in taxi use. Plan a parts package with the vehicles.",
      link: { label: "Three-wheeler components", href: "/automotive-parts/three-wheelers" },
    },
  ],
  specify: [
    "Passenger, cargo or electric, and the intended use",
    "Fuel: petrol, CNG, LPG, diesel or electric",
    "Seating, or payload and body type for cargo versions",
    "Destination country and city, and its taxi rules",
    "Complete vehicles or CKD kits",
    "Colours and trim to the local specification",
    "Quantity, delivery schedule and destination port",
    "Parts package to ship with the fleet",
  ],
  enquiryProduct: "Three-wheelers",
};
