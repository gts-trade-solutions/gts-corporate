import { cc, links, type VehicleSegment } from "./types";

export const constructionEquipment: VehicleSegment = {
  id: "construction-equipment",
  title: "Construction Equipment",
  shortTitle: "Construction equipment",
  icon: "excavator",
  seoTitle: "Construction Equipment from India — Backhoes, Excavators | GTS",
  metaDescription:
    "Backhoe loaders, excavators, wheel loaders, motor graders, compactors and skid-steers from India — what each machine does, key figures and what to specify.",
  keywords: [
    "construction equipment exporter India",
    "backhoe loader exporter",
    "excavator export India",
    "road construction equipment India",
    "motor grader exporter",
    "road roller exporter",
    "earthmoving equipment India",
  ],
  heroTitle: "Construction equipment from India",
  heroLead:
    "Backhoe loaders, excavators, wheel loaders, graders, compactors and skid-steers — the machines that build roads, sites and infrastructure, what each does best, and what to specify for your project.",
  media: "constructionHero",
  heroCredit: cc(
    "Timothy A. Gonsalves",
    "CC BY-SA 4.0",
    "JCB_Excavator_Padum_Purney_Road_Tsarap_Oct22_A7C_04402.jpg",
  ),
  intro: [
    "India has one of the world's largest construction equipment markets, driven by road, rail and urban infrastructure, and many global manufacturers build machines there for India and for export. The range runs from backhoe loaders, the most common construction machine in the country, to large excavators, graders and road-building fleets.",
    "Machines are chosen for the job, not the badge: the material, the volume to be moved each day, the haul distance and the site's space and ground decide the type and the size. This page explains each type and where it fits.",
    "This page describes each type, not a stock list. Specifications, emission stages and variants differ by market, and we confirm what can be supplied for your destination before anything is committed.",
  ],
  classes: {
    title: "How machines are sized",
    items: [
      { code: "t", label: "Operating weight, in tonnes: the main measure of a machine's size and capability." },
      { code: "m³", label: "Bucket or blade capacity: how much each pass moves." },
      { code: "kW", label: "Engine power, in kW or hp, which sets productivity in heavy digging and pushing." },
    ],
    note: "Compare machines on operating weight and bucket capacity first. The right size comes from the material, the daily volume and the site.",
  },
  types: [
    {
      id: "backhoe-loaders",
      title: "Backhoe loaders",
      summary:
        "A loader at the front and a digging arm at the back on one wheeled machine: the most common construction machine in India.",
      body: [
        "A backhoe loader carries a front bucket for loading and levelling and a rear backhoe for digging trenches and foundations, on a wheeled, tractor-based chassis that can drive between sites by road. Machines in India are typically around 7 to 8 tonnes, with engines of about 70 to 100 hp.",
        "That versatility makes it the first machine a contractor buys: one operator can dig a trench, load a truck, backfill and level, then drive to the next job. Bucket sizes, four-wheel drive and attachments such as breakers and augers extend what it can do.",
      ],
      facts: [
        { label: "Operating weight", value: "About 7–8 t" },
        { label: "Engine", value: "Around 70–100 hp" },
        { label: "Dig depth", value: "About 4.5–6 m" },
        { label: "Attachments", value: "Breaker, auger, forks" },
      ],
      uses: [
        "Trenching for pipes and cables",
        "Foundations and site work",
        "Loading trucks",
        "Road maintenance",
        "Municipal work",
      ],
      photo: {
        src: "/images/vehicle-types/ce-backhoe.webp",
        alt: "A yellow JCB 3DX backhoe loader working beside a mountain road in Himachal Pradesh.",
        credit: cc("Abhishekptlbbk", "CC BY-SA 4.0", "JCB_India.jpg"),
      },
    },
    {
      id: "excavators",
      title: "Excavators",
      summary:
        "Tracked digging machines with a rotating upper structure, from mini excavators to machines of 20 tonnes and more for earthworks and quarries.",
      body: [
        "An excavator digs with a boom, arm and bucket on an upper structure that turns a full circle on its tracks, so it can dig and load without moving. The 20-tonne class is the workhorse of earthworks and road building; smaller machines work in towns and on utilities, and larger ones in quarries and mines.",
        "Size is chosen from the bucket capacity needed to fill the trucks efficiently and the depth to be dug. Long-reach arms, rock buckets, breakers and quick couplers adapt one machine to many jobs, and rubber or steel tracks suit different ground.",
      ],
      facts: [
        { label: "Classes", value: "Mini under 6 t; standard around 20 t; large 30 t and up" },
        { label: "Bucket", value: "Matched to the trucks it loads" },
        { label: "Undercarriage", value: "Steel or rubber tracks; wheeled versions exist" },
        { label: "Attachments", value: "Breaker, long reach, rock bucket" },
      ],
      uses: [
        "Bulk earthworks",
        "Road and rail building",
        "Quarrying",
        "Canal and drainage work",
        "Demolition with attachments",
      ],
      photo: {
        src: "/images/vehicle-types/ce-excavator.webp",
        alt: "An orange Tata Hitachi excavator working on a site in India.",
        credit: cc("Nikhil B", "CC BY 3.0", "TATA_Hitachi_excavator.jpg"),
      },
    },
    {
      id: "wheel-loaders",
      title: "Wheel loaders",
      summary:
        "Articulated loaders with a large front bucket, built to load trucks and move loose material quickly over short distances.",
      body: [
        "A wheel loader has a large bucket on lift arms at the front of an articulated, four-wheel-drive frame. It loads trucks and hoppers, builds stockpiles and moves material around a site faster than any other machine over short distances, but it does not dig like an excavator.",
        "Bucket capacity, typically about 1 to 5 cubic metres, is matched to the material's density and the trucks being loaded. High-lift arms, rock or light-material buckets and forks adapt it to quarries, ports, plants and yards.",
      ],
      facts: [
        { label: "Bucket", value: "About 1–5 m³" },
        { label: "Frame", value: "Articulated, four-wheel drive" },
        { label: "Best for", value: "Loading and short-distance moving" },
        { label: "Attachments", value: "Forks, high-lift arms, special buckets" },
      ],
      uses: [
        "Quarries and crushers",
        "Aggregate and sand yards",
        "Ports and bulk terminals",
        "Concrete and asphalt plants",
        "Waste handling",
      ],
      photo: {
        src: "/images/vehicle-types/ce-wheel-loader.webp",
        alt: "A yellow Caterpillar 950 GC wheel loader on a street in winter.",
        credit: cc("Oto Zapletal", "CC BY-SA 4.0", "CATERPILLAR_950_GC_Wheel_Loader_01.jpg"),
      },
    },
    {
      id: "motor-graders",
      title: "Motor graders",
      summary: "Long machines with a central blade for shaping and finishing road surfaces to an exact level and camber.",
      body: [
        "A motor grader carries a long, adjustable blade between its front and rear axles. It spreads and levels base material, cuts drainage ditches, sets the camber and crossfall of a road, and maintains unpaved roads by reshaping the surface and clearing the side drains.",
        "Graders are essential on any road project and on the long networks of unpaved roads in Africa and Asia, where regular grading keeps roads usable through the rains. Blade length, engine power and a front scarifier or rear ripper are the main choices, and machine-control systems are increasingly used for precision work.",
      ],
      facts: [
        { label: "Blade", value: "About 3.7–4.3 m on most machines" },
        { label: "Drive", value: "Rear tandem drive; all-wheel on some" },
        { label: "Tools", value: "Front scarifier, rear ripper" },
        { label: "Precision", value: "Machine control available" },
      ],
      uses: [
        "Road construction",
        "Unpaved road maintenance",
        "Site levelling",
        "Drainage ditches",
        "Mine haul roads",
      ],
      photo: {
        src: "/images/vehicle-types/ce-grader.webp",
        alt: "A yellow motor grader working on a railway construction site in Jaffna, Sri Lanka.",
        credit: cc("Aathavan jaffna", "CC BY-SA 3.0", "A_Grader_working_in_railway_constructions,_jaffna.JPG"),
      },
    },
    {
      id: "compactors",
      title: "Compactors and road rollers",
      summary: "Rollers that compact soil, base layers and asphalt to the density a road or foundation needs.",
      body: [
        "Compaction gives a road its strength. Single-drum vibratory rollers compact soil and granular base layers; tandem rollers with two smooth drums finish asphalt; pneumatic-tyred rollers knead and seal asphalt surfaces; plate compactors and small rollers work in trenches and tight spaces. Static three-wheel rollers, still common in India, compact without vibration.",
        "The roller is chosen for the material and the layer thickness, and its weight and vibration settings decide how many passes reach the specified density. Water-spray systems on asphalt rollers keep the mix from sticking to the drums.",
      ],
      facts: [
        { label: "Types", value: "Single drum, tandem, pneumatic, static" },
        { label: "Weight", value: "From under 1 t to over 20 t" },
        { label: "Material", value: "Soil, base or asphalt" },
        { label: "Judged by", value: "Density reached per pass" },
      ],
      uses: [
        "Road building",
        "Highway resurfacing",
        "Embankments and earth dams",
        "Foundations and slabs",
        "Trench backfill",
      ],
      photo: {
        src: "/images/vehicle-types/ce-compactor.webp",
        alt: "A yellow static road roller parked beside a road in Chennai.",
        credit: cc("Gausanchennai", "CC BY-SA 4.0", "Road_roller_1.jpg"),
      },
    },
    {
      id: "skid-steer-loaders",
      title: "Skid-steer and compact track loaders",
      summary: "Small, highly manoeuvrable loaders that turn on the spot and take dozens of attachments.",
      body: [
        "A skid-steer loader steers by driving the wheels on each side at different speeds, so it turns on the spot; a compact track loader does the same on rubber tracks for soft ground. The lift arms carry a quick-attach plate for buckets, forks, brooms, augers, breakers, trenchers and more.",
        "Their size suits building sites, farms, warehouses, landscaping and municipal work where a larger loader cannot fit. Rated operating capacity, the lift path (radial or vertical) and the auxiliary hydraulic flow for attachments are the main specifications.",
      ],
      facts: [
        { label: "Rated capacity", value: "About 0.5–1.5 t" },
        { label: "Steering", value: "Skid steer: turns on the spot" },
        { label: "Running gear", value: "Wheels or rubber tracks" },
        { label: "Attachments", value: "Dozens, on a quick-attach plate" },
      ],
      uses: ["Building sites", "Landscaping", "Farms and dairies", "Warehouses and yards", "Municipal cleaning"],
      photo: {
        src: "/images/vehicle-types/ce-skid-steer.webp",
        alt: "A white Bobcat T650 compact track loader working on loose soil.",
        credit: cc("Dmitry Ivanov", "CC BY-SA 4.0", "Bobcat_T650_compact_track_loader_(side_view).jpg"),
      },
    },
  ],
  considerations: [
    {
      title: "Machine size",
      icon: "chart",
      text: "Size the machine for the daily volume, the material and the trucks it works with. An oversized machine wastes fuel; an undersized one sets the pace of the whole site.",
    },
    {
      title: "Emissions and approval",
      icon: "shieldCheck",
      text: "Construction machines have their own emission stages, separate from road vehicles, and some markets require a particular stage. Machines that drive on public roads, such as backhoes, may also need registration.",
      link: links.homologation,
    },
    {
      title: "Attachments",
      icon: "gear",
      text: "Order attachments with the machine: breakers, augers, buckets for the material, forks. Check the hydraulic flow and quick-coupler compatibility.",
    },
    {
      title: "Shipping",
      icon: "container",
      text: "Most machines ship roll-on/roll-off or on flat racks. Larger excavators may need partial dismantling and ODC planning.",
      link: links.odc,
    },
    {
      title: "Operator training",
      icon: "clipboard",
      text: "Productivity and safety depend on the operator. Include training and manuals in the right language.",
    },
    {
      title: "Parts and service",
      icon: "wrench",
      text: "Wear parts go fastest: bucket teeth, cutting edges, undercarriage parts, filters and hydraulic hoses. Plan a parts package and service support with the machines.",
      link: { label: "Automotive and off-highway parts", href: "/automotive-parts/agriculture-off-highway" },
    },
  ],
  specify: [
    "The job: material, daily volume and haul distance",
    "Machine type and operating-weight class",
    "Bucket or blade size, and attachments",
    "Site conditions: ground, space, altitude and climate",
    "Destination country and the emission stage required",
    "Operator training and documentation",
    "Quantity, delivery schedule and destination port",
    "Wear parts and service support",
  ],
  enquiryProduct: "Construction equipment",
};
