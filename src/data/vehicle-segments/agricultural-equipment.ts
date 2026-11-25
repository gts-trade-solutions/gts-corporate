import { cc, links, type VehicleSegment } from "./types";

export const agriculturalEquipment: VehicleSegment = {
  id: "agricultural-equipment",
  title: "Agricultural Equipment",
  shortTitle: "Agricultural equipment",
  icon: "tractor",
  seoTitle: "Tractors and Farm Machinery from India — Tillers, Harvesters | GTS",
  metaDescription:
    "Compact, utility and high-horsepower tractors, power tillers, combine harvesters and implements from India — what each is for, key figures and what to specify.",
  keywords: [
    "tractor exporter India",
    "Indian tractors for export",
    "power tiller exporter",
    "combine harvester export India",
    "agricultural machinery exporter India",
    "farm implements exporter",
    "rotavator exporter",
  ],
  heroTitle: "Tractors and farm machinery from India",
  heroLead:
    "Compact, utility and high-horsepower tractors, power tillers, harvesters and implements — what each machine is built for, how to match them, and what to specify for your farms.",
  media: "agriculturalHero",
  heroCredit: cc("Clément Bardot", "CC BY-SA 4.0", "Mahindra_Tractor,_India.jpg"),
  intro: [
    "India is the world's largest tractor market by volume, and its manufacturers build for smallholders: simple, fuel-efficient tractors of roughly 25 to 60 hp that plough, haul, pump and power implements, and that village workshops can repair. That profile fits farming across Africa, South Asia and Latin America, where much of India's tractor export goes.",
    "Tractors are only half of mechanisation. The implement behind them, a plough, rotavator, seed drill or sprayer, does the actual work, and it has to be matched to the tractor's power, linkage and speed. This page covers both.",
    "This page describes each type, not a stock list. Specifications and variants differ by market, and we confirm what can be supplied for your destination before anything is committed.",
  ],
  classes: {
    title: "How tractors are classed",
    items: [
      { code: "< 30 hp", label: "Compact and orchard tractors, for small plots and work between rows." },
      { code: "30–50 hp", label: "Utility tractors: the general-purpose machines, and the largest class in India." },
      { code: "> 50 hp", label: "High-horsepower tractors for heavy implements, larger farms and haulage." },
    ],
    note: "Implements are matched to PTO power, the power available at the power take-off shaft, which is lower than the engine's rated power, and to the three-point linkage category.",
  },
  types: [
    {
      id: "compact-tractors",
      title: "Compact and orchard tractors",
      summary:
        "Tractors under about 30 hp, narrow and light enough for orchards, vineyards, small plots and work between rows.",
      body: [
        "Compact tractors trade power for size. A narrow track, short wheelbase and light weight let them work between rows of trees, vines and vegetables, on terraces and on plots too small for a utility tractor. Orchard versions lower the bonnet and seat and narrow the track further.",
        "They run small rotavators, sprayers, mowers and trailers, and many come with four-wheel drive for traction on wet ground. Their low cost makes them the first tractor for many smallholders.",
      ],
      facts: [
        { label: "Power", value: "Under about 30 hp" },
        { label: "Track", value: "Narrow, often adjustable" },
        { label: "Drive", value: "2WD or 4WD" },
        { label: "Implements", value: "Small rotavators, sprayers, trailers" },
      ],
      uses: [
        "Orchards and vineyards",
        "Vegetable and horticulture farms",
        "Smallholdings",
        "Estates and landscaping",
        "Spraying",
      ],
      photo: {
        src: "/images/vehicle-types/ag-compact.webp",
        alt: "A blue Sonalika Baagban orchard tractor beside a stack of paddy straw in Coorg, Karnataka.",
        credit: cc(
          "Timothy A. Gonsalves",
          "CC BY-SA 4.0",
          "Sonalika_Baagban_DI-30Rx_Tractor_Coorg_Feb24_A7C_09554.jpg",
        ),
      },
    },
    {
      id: "utility-tractors",
      title: "Utility tractors",
      summary:
        "Tractors of 30 to 50 hp that do a bit of everything: ploughing, puddling, haulage and running implements.",
      body: [
        "Utility tractors are the general-purpose machines of small and medium farms: mostly two-wheel drive, with simple mechanical gearboxes, robust front axles for loader and haulage work, and enough hydraulic lift for a two- or three-furrow plough or a rotavator. India builds more of these than any other kind.",
        "Away from the field they haul trailers, power threshers and pumps through the PTO, and carry produce between village and market. That versatility is why they sell across Africa and South Asia, where one tractor often serves several farms.",
      ],
      facts: [
        { label: "Power", value: "About 30–50 hp" },
        { label: "Drive", value: "Mostly 2WD; 4WD available" },
        { label: "Linkage", value: "Category I or II three-point hitch" },
        { label: "PTO", value: "540 rpm standard" },
      ],
      uses: [
        "Ploughing and tillage",
        "Paddy puddling",
        "Haulage with trailers",
        "Threshing and pumping",
        "Contract farming services",
      ],
      photo: {
        src: "/images/vehicle-types/ag-utility.webp",
        alt: "A red Mahindra tractor carrying three men in Bubaque, Guinea-Bissau.",
        credit: cc(
          "Adrian Turner",
          "CC BY-SA 2.0",
          "Mahindra_Gambia_tractor,_Bijagos_Archipelago,_Guinea-Bissau.jpg",
        ),
      },
    },
    {
      id: "high-horsepower-tractors",
      title: "High-horsepower tractors",
      summary: "Tractors above 50 hp for heavy implements, larger farms and haulage, often with four-wheel drive.",
      body: [
        "Above 50 hp, tractors are built for heavier work: wider rotavators and disc harrows, multi-furrow ploughs, seed drills and balers, and heavy trailers on the road. Four-wheel drive, synchromesh or shuttle gearboxes and greater lift capacity become common.",
        "Larger farms, contractors and sugar-cane haulage drive this class in India; abroad, it suits commercial farms and estates where the tractor works long days. Check implement compatibility, tyre size and local service for the more complex hydraulics.",
      ],
      facts: [
        { label: "Power", value: "Above 50 hp" },
        { label: "Drive", value: "2WD or 4WD" },
        { label: "Gearbox", value: "Synchromesh or shuttle on many" },
        { label: "Lift", value: "Higher capacity for heavy implements" },
      ],
      uses: [
        "Commercial farms and estates",
        "Contract ploughing and harvesting",
        "Sugar-cane haulage",
        "Heavy tillage",
        "Baling and forage",
      ],
      photo: {
        src: "/images/vehicle-types/ag-high-hp.webp",
        alt: "A red Mahindra Arjun 605 DI tractor hauling a trailer loaded with fodder.",
        credit: cc("SnapMeUp", "CC BY-SA 4.0", "Mahindra_Arjun_605_DI_tractor_with_trailer.JPG"),
      },
    },
    {
      id: "power-tillers",
      title: "Power tillers",
      summary:
        "Single-axle, walk-behind tractors of about 8 to 15 hp for paddy fields, terraces and plots too small or wet for a tractor.",
      body: [
        "A power tiller is a single-axle tractor steered by handlebars, with the operator walking behind or riding on a trailer seat. It drives a rotary tiller for puddling and seedbed preparation, and can pull a small trailer or power a pump or thresher. Engines are typically diesels of about 8 to 15 hp.",
        "Power tillers are the machine of rice farming on small, wet plots and terraces, where a four-wheel tractor sinks or cannot turn. They are inexpensive, simple and economical, and widely used across South and Southeast Asia and parts of Africa.",
      ],
      facts: [
        { label: "Power", value: "About 8–15 hp, diesel" },
        { label: "Type", value: "Single-axle, walk-behind" },
        { label: "Attachments", value: "Rotary tiller, trailer, pump, reaper" },
        { label: "Best for", value: "Wet paddy and small plots" },
      ],
      uses: ["Paddy puddling", "Terrace and hill farming", "Vegetable plots", "Small haulage", "Pumping"],
      photo: {
        src: "/images/vehicle-types/ag-power-tiller.webp",
        alt: "A red Mitsubishi Shakti power tiller parked beside a field in Coorg, Karnataka.",
        credit: cc(
          "Timothy A. Gonsalves",
          "CC BY-SA 4.0",
          "Mitsubishi_Shakti_Power_Tiller_Coorg_Feb24_A7C_09418.jpg",
        ),
      },
    },
    {
      id: "combine-harvesters",
      title: "Combine harvesters",
      summary:
        "Machines that reap, thresh and clean grain in one pass, including compact track harvesters for wet paddy fields.",
      body: [
        "A combine harvester cuts the crop, threshes the grain from the straw and cleans it into a tank in a single pass. Wheeled combines suit wheat and dry fields; track combines spread their weight for soft, wet paddy, and compact track combines are built for the small fields of South Asia. Tractor-mounted harvesters are a cheaper alternative where a tractor is already owned.",
        "Cutter-bar width, grain-tank capacity, the crops it can be set up for, and the availability of operators and service decide the choice. Many are bought by contractors who harvest for several farms across a season.",
      ],
      facts: [
        { label: "Types", value: "Wheeled, track, or tractor-mounted" },
        { label: "Crops", value: "Paddy, wheat and others, with the right settings" },
        { label: "Cutter bar", value: "Sized to the fields and crop" },
        { label: "Buyers", value: "Often harvesting contractors" },
      ],
      uses: ["Paddy harvesting", "Wheat harvesting", "Contract harvesting services", "Large farms and cooperatives"],
      photo: {
        src: "/images/vehicle-types/ag-harvester.webp",
        alt: "A compact track combine harvester working in a paddy field in India.",
        credit: cc("Jayanunni", "CC BY 3.0", "MechanizedHarvesting.jpg"),
      },
    },
    {
      id: "implements",
      title: "Implements: tillage, seeding and spraying",
      summary:
        "The tools that do the work behind the tractor: ploughs, rotavators, harrows, seed drills, planters and sprayers.",
      body: [
        "Tillage implements prepare the soil: mouldboard and disc ploughs turn it, rotavators and harrows break it into a seedbed, and cultivators control weeds. Seed drills and planters place seed at a set depth and spacing, often with fertiliser, and boom and air-blast sprayers apply crop protection.",
        "Each is matched to the tractor's power, three-point linkage and PTO speed, and to the soil and crop. India builds a very wide range of implements for its own tractors, which makes them a natural match for Indian tractors abroad.",
      ],
      facts: [
        { label: "Tillage", value: "Plough, rotavator, harrow, cultivator" },
        { label: "Seeding", value: "Seed drill, planter, transplanter" },
        { label: "Spraying", value: "Boom and air-blast sprayers" },
        { label: "Matched to", value: "PTO power, linkage and PTO speed" },
      ],
      uses: ["Seedbed preparation", "Sowing and planting", "Weed control", "Crop protection", "Residue management"],
      photo: {
        src: "/images/vehicle-types/ag-implements.webp",
        alt: "A tractor ploughing a field ahead of the monsoon in India.",
        credit: cc("abhiriksh", "CC BY-SA 3.0", "Tractor_ploughing_field_2.jpg"),
      },
    },
  ],
  explainer: {
    eyebrow: "Matching",
    title: "Matching an implement to a tractor",
    paragraphs: [
      "An implement is matched on three things. Power: what it needs at the PTO shaft or the drawbar, which is less than the tractor's rated engine power. Linkage: the three-point hitch category, Category I on smaller tractors and Category II on most utility tractors, and the lift capacity. And speed: the PTO speed, usually 540 rpm, and the ground speed the work needs.",
      "PTO-driven implements such as rotavators are the most demanding. As a rough guide, a rotavator needs around 7 to 8 hp per foot of working width in average soil, so a six-foot rotavator suits a tractor of about 45 hp and above. Heavy, wet or stony soils need more.",
    ],
  },
  considerations: [
    {
      title: "Power and implements",
      icon: "gear",
      text: "Choose the tractor for the heaviest implement it will run, matched on PTO power, linkage category and lift capacity.",
    },
    {
      title: "Tyres and ballast",
      icon: "target",
      text: "Wet paddy, dry land and haulage need different tyres. Specify the soil and the main work, and ask for cage wheels or paddy tyres where needed.",
    },
    {
      title: "Approval and emissions",
      icon: "shieldCheck",
      text: "Tractors are approved and taxed differently from road vehicles in most markets, and some set emission levels for farm machinery. Check the rules for the destination.",
      link: links.homologation,
    },
    {
      title: "Complete or kits",
      icon: "package",
      text: "Tractors can ship complete, or as kits for local assembly where duty favours it. Implements are often sourced to match the tractors.",
    },
    {
      title: "Shipping",
      icon: "container",
      text: "Smaller tractors and implements ship in containers; larger tractors and harvesters ship roll-on/roll-off or on flat racks.",
    },
    {
      title: "Parts and service",
      icon: "wrench",
      text: "Farms cannot wait for parts in season. Ship a parts package with filters, clutch parts, hydraulic seals and implement wear parts.",
      link: { label: "Agricultural components", href: "/automotive-parts/agriculture-off-highway" },
    },
  ],
  specify: [
    "Main crops, farm size and soil",
    "Tractor power class, and 2WD or 4WD",
    "Implements to be run, with their working widths",
    "Tyres: dry land, paddy or haulage",
    "Destination country and any approval rules",
    "Complete machines or kits for local assembly",
    "Quantity, delivery schedule and destination port",
    "Parts package for the first season",
  ],
  enquiryProduct: "Agricultural equipment",
};
