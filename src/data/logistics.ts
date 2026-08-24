import type { IconName } from "@/components/Icon";
import type { MediaKey } from "./media";
import type { CategoryBlock } from "./types";

/**
 * ODC Logistics & Route Survey — content for /odc-logistics and its two
 * sub-pages.
 *
 * ODC is over-dimensional cargo: consignments that exceed the legal limits for
 * width, height, length or weight and therefore cannot simply be put on a
 * standard trailer and driven.
 *
 * The route-survey material below describes what a route survey actually records
 * in the field — the obstruction categories, the per-point data and the
 * deliverables are the ones the survey tooling captures, not a generic list.
 *
 * Content rule, unchanged from the rest of the site: nothing here claims owned
 * equipment, fleet, capacity or approvals. Permits, no-objection certificates
 * and clearances are issued by the competent authorities; GTS prepares,
 * coordinates and supports the application.
 */

/* ------------------------------------------------------------------ ODC page */

/** Consignment types that typically move as ODC. */
export const odcCargoTypes = [
  "Transformers and generators",
  "Boilers and pressure vessels",
  "Wind-turbine blades, towers and nacelles",
  "Turbines, mill housings and crushers",
  "Reactors, columns and heat exchangers",
  "Construction and mining equipment",
  "Prefabricated structures and modules",
  "Storage tanks and silos",
  "Cranes and plant machinery",
  "Project cargo and plant relocations",
];

export const odcScope: CategoryBlock[] = [
  {
    id: "transport-engineering",
    title: "Transport Engineering",
    icon: "draft",
    summary:
      "The calculation work that decides whether a movement is possible before anything is committed — and what it would take to make it possible.",
    items: [
      "Cargo and trailer configuration studies",
      "Axle-load distribution and vehicle stability checks",
      "Bridge and culvert load assessment",
      "Turning-radius and swept-path analysis",
      "Vertical and horizontal clearance checks",
      "Gradient, camber and ground-bearing assessment",
    ],
  },
  {
    id: "route-survey-scope",
    title: "Route Survey",
    icon: "map",
    summary:
      "A physical survey of the proposed route, chainage by chainage, recording every constraint with GPS coordinates and photographs.",
    items: [
      "Origin-to-destination reconnaissance",
      "Obstruction identification and measurement",
      "GPS-referenced obstruction schedule",
      "Photographic record at every point",
      "Alternative-route and diversion assessment",
      "Route difficulty rating",
    ],
  },
  {
    id: "movement-planning",
    title: "Movement Planning",
    icon: "route",
    summary:
      "Turning a feasible route into an executable plan — equipment, sequencing, timing and the people who need to be there.",
    items: [
      "Trailer and prime-mover selection",
      "Hydraulic axle and low-bed configuration",
      "Lifting and handling method at both ends",
      "Night-movement and traffic-window planning",
      "Escort, pilot and utility-coordination planning",
      "Contingency and abort planning",
    ],
  },
  {
    id: "permits-approvals",
    title: "Permits & Approvals Coordination",
    icon: "clipboard",
    summary:
      "Preparation and coordination of the applications a movement depends on. The approvals themselves are issued by the competent authorities.",
    items: [
      "Oversize and overweight permit applications",
      "Road-authority and highway submissions",
      "Bridge and structure clearance submissions",
      "Utility and power-line shutdown coordination",
      "Police escort and traffic-management coordination",
      "Documentation packs for each authority",
    ],
  },
  {
    id: "execution-support",
    title: "Execution Support",
    icon: "crane",
    summary:
      "Supervision and coordination while the consignment is actually moving, so decisions on the road are made against the plan.",
    items: [
      "Pre-movement route re-verification",
      "On-site movement supervision",
      "Obstruction clearance coordination",
      "Progress reporting during transit",
      "Delivery, offloading and handover coordination",
      "Post-movement reporting",
    ],
  },
  {
    id: "multimodal",
    title: "Multimodal & Project Logistics",
    icon: "container",
    summary:
      "Where road alone will not reach, the movement is planned across modes and the interfaces between them are what need managing.",
    items: [
      "Port, jetty and barge interface planning",
      "Roll-on / roll-off and lift-on / lift-off planning",
      "Inland waterway and coastal leg assessment",
      "Rail-leg feasibility assessment",
      "Approach-road and laydown assessment",
      "End-to-end project cargo coordination",
    ],
  },
];

/** How a movement is put together, start to finish. */
export const odcProcess: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Cargo and route definition",
    description:
      "Dimensions, weight, centre of gravity, lifting points and packing, against a named origin and destination. This is the input everything else is calculated from.",
    icon: "package",
  },
  {
    title: "Desk study and preliminary routing",
    description:
      "Candidate routes assessed on maps and available structure data, so the field survey covers routes that are worth surveying rather than all of them.",
    icon: "search",
  },
  {
    title: "Physical route survey",
    description:
      "The route is driven and recorded point by point — every bridge, cable, junction, narrow section and level crossing, with chainage, GPS and photographs.",
    icon: "map",
  },
  {
    title: "Engineering assessment",
    description:
      "Stability, axle loading, swept path and structure capacity checked against the surveyed constraints. Obstructions are classified as clearable, avoidable or blocking.",
    icon: "draft",
  },
  {
    title: "Report and method statement",
    description:
      "The survey becomes a report: obstruction schedule, route map, drawings, difficulty rating and the actions required at each point.",
    icon: "article",
  },
  {
    title: "Permits and coordination",
    description:
      "Applications prepared and submitted to the relevant authorities, and utility shutdowns, escorts and traffic windows coordinated around the approved dates.",
    icon: "clipboard",
  },
  {
    title: "Movement and closeout",
    description:
      "Supervised execution against the plan, with progress reporting during transit and a closeout report once the consignment is delivered.",
    icon: "route",
  },
];

/** What a buyer should send so an ODC enquiry can actually be assessed. */
export const odcEnquiryChecklist = [
  "Cargo dimensions — length, width and height, as packed for transport",
  "Gross weight, and the centre of gravity if it is not central",
  "Lifting and lashing points, and any orientation restriction",
  "Origin and destination, named to the site rather than the city",
  "Required delivery window, and any plant shutdown it has to hit",
  "Whether lifting is required at either end, and what is available on site",
  "Any drawing, GA or packing list you already hold",
];

/* --------------------------------------------------------- Route survey page */

/**
 * The obstruction categories a survey records. These are the categories the
 * survey tooling captures in the field, grouped for reading.
 */
export const surveyObstructions: CategoryBlock[] = [
  {
    id: "structures",
    title: "Structures",
    icon: "bridge",
    summary: "Anything the consignment has to pass over, under or through.",
    items: [
      "Bridges",
      "Underpass bridges",
      "Footpath bridges",
      "Culverts",
      "Railway level crossings",
      "Toll plazas",
    ],
  },
  {
    id: "geometry",
    title: "Road Geometry",
    icon: "route",
    summary: "Where the road itself, rather than an object on it, is the constraint.",
    items: [
      "Narrow road sections",
      "Bends and curves",
      "Junctions — left and right",
      "Road damage and surface condition",
      "Gradients and camber",
      "Available diversions",
    ],
  },
  {
    id: "overhead",
    title: "Overhead Obstructions",
    icon: "bolt",
    summary:
      "The height-critical items, and the ones most likely to need a shutdown or a temporary removal.",
    items: [
      "High-tension cables",
      "Low-tension cables",
      "Towerline crossings",
      "Tree branches",
      "Electric sign boards",
      "Gantries and signage",
    ],
  },
  {
    id: "roadside",
    title: "Roadside Objects",
    icon: "pin",
    summary: "Fixed items at the road edge that reduce usable width at a specific chainage.",
    items: [
      "Camera poles",
      "Sign boards",
      "Electric and utility poles",
      "Petrol bunks and forecourts",
      "Median and kerb obstructions",
      "Permanent roadside structures",
    ],
  },
];

/** What is recorded at every single point on the route. */
export const surveyPointFields: { label: string; description: string }[] = [
  {
    label: "Chainage",
    description:
      "Distance in kilometres from the survey start, so every point has a position on the route rather than only a place name.",
  },
  {
    label: "GPS coordinates",
    description:
      "Latitude and longitude for each obstruction, so it can be found again by anyone — including the crew moving at night.",
  },
  {
    label: "Location description",
    description: "The place in words, as a driver would describe it, alongside the coordinates.",
  },
  {
    label: "Obstruction category and detail",
    description:
      "What the constraint is and its measured dimensions — available height, available width, span, radius.",
  },
  {
    label: "Vehicle movement required",
    description:
      "What the vehicle actually has to do at that point: hold the crown, take the shoulder, reverse into the turn, wait for a shutdown.",
  },
  {
    label: "Photographs",
    description:
      "Images at each point, which are what make the report usable by someone who has not driven the route.",
  },
  {
    label: "Difficulty rating",
    description:
      "A per-point rating, so the report can be read for the hard sections first rather than end to end.",
  },
];

/** What comes out of a survey. */
export const surveyOutputs: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Obstruction schedule",
    description:
      "Every recorded point in chainage order, with category, measured dimensions, GPS position, photographs and the action required.",
    icon: "clipboard",
  },
  {
    title: "Route map",
    description:
      "The surveyed route plotted with the obstruction points marked, so the difficult sections are visible at a glance.",
    icon: "map",
  },
  {
    title: "GA drawing",
    description:
      "General arrangement of the cargo on the selected trailer, with the overall dimensions the route was assessed against.",
    icon: "draft",
  },
  {
    title: "GPX track",
    description:
      "The route and its points as a GPS track, so the surveyed line can be loaded onto a device in the vehicle.",
    icon: "pin",
  },
  {
    title: "Difficulty assessment",
    description:
      "The route rated section by section, separating what is clear, what needs work and what would block the movement.",
    icon: "target",
  },
  {
    title: "Photographic record",
    description:
      "The full set of field photographs, indexed to the chainage and coordinates they were taken at.",
    icon: "search",
  },
];

/** Where a route survey gets used. */
export const surveyUseCases: { title: string; description: string }[] = [
  {
    title: "Before bidding",
    description:
      "A feasibility survey tells you whether the movement is possible and what it will really cost to make it possible — before the number is committed to a tender.",
  },
  {
    title: "Permit applications",
    description:
      "Road and bridge authorities want the route, the structures on it and the loads they will see. A GPS-referenced obstruction schedule is what that submission is built from.",
  },
  {
    title: "Utility coordination",
    description:
      "Every cable crossing below the required clearance has to be identified, measured and scheduled with its owner. The survey is what produces that list.",
  },
  {
    title: "Execution planning",
    description:
      "Crews plan the run against the surveyed points — where to slow, where to swing wide, where a shutdown has been booked and where a diversion is available.",
  },
  {
    title: "Plant and site access",
    description:
      "The last kilometre is often the hard one. Approach roads, gates, turning circles and laydown areas are surveyed the same way as the highway.",
  },
  {
    title: "Repeat movements",
    description:
      "Where a route will carry several consignments, one survey supports the whole programme and is updated rather than repeated.",
  },
];

/* -------------------------------------------------------------- Reports page */

/** What a report contains, in the order it appears. */
export const reportSections: { title: string; description: string }[] = [
  {
    title: "Project and cargo summary",
    description:
      "The consignment the route was surveyed for — dimensions, weight, the trailer configuration assumed, and the origin and destination.",
  },
  {
    title: "Route summary",
    description:
      "Start, intermediate and end locations with total surveyed distance, and the overall difficulty position for the route.",
  },
  {
    title: "Obstruction schedule",
    description:
      "The body of the report. Every point in chainage order with its category, measured clearances, GPS coordinates, photographs, required vehicle movement and remarks.",
  },
  {
    title: "Photographs",
    description:
      "Field images placed against the point they belong to, selected for the report rather than dumped in an appendix.",
  },
  {
    title: "Route map",
    description: "The surveyed line with the obstruction points plotted along it.",
  },
  {
    title: "GA drawing",
    description:
      "General arrangement of the cargo on the trailer, carrying the dimensions every clearance in the report was checked against.",
  },
  {
    title: "Remarks and required action",
    description:
      "Per point: clearable, avoidable or blocking — and what specifically has to happen, by whom, before the movement can pass.",
  },
];

export const reportFormats: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Word document",
    description:
      "The editable master, issued as a .docx so your own team can annotate it or fold it into a larger submission.",
    icon: "article",
  },
  {
    title: "PDF",
    description:
      "The fixed version for circulation to authorities, clients and insurers, where layout has to stay put.",
    icon: "draft",
  },
  {
    title: "GPX track",
    description:
      "The surveyed route and its points as a GPS file, for navigation devices in the prime mover and escort vehicles.",
    icon: "pin",
  },
];

export const reportAudiences: { title: string; description: string; icon: IconName }[] = [
  {
    title: "EPC and project teams",
    description:
      "Feasibility evidence at bid stage, and the transport basis of design once the project is running.",
    icon: "factory",
  },
  {
    title: "Transporters and heavy-haulage crews",
    description:
      "The document the run is actually planned and driven against, point by point.",
    icon: "truck",
  },
  {
    title: "Road and bridge authorities",
    description:
      "The technical content that supports an oversize or overweight permit application.",
    icon: "clipboard",
  },
  {
    title: "Utility owners",
    description:
      "The measured clearance and location data behind a request to raise, divert or shut down a line.",
    icon: "bolt",
  },
  {
    title: "Plant owners and consignees",
    description:
      "Site access, approach and laydown constraints identified before the consignment arrives.",
    icon: "container",
  },
  {
    title: "Insurers and risk teams",
    description:
      "A documented, evidenced basis for the route that was chosen and the controls placed around it.",
    icon: "shieldCheck",
  },
];

/* ============================================================================
   Page composition
   ----------------------------------------------------------------------------
   The three ODC pages follow the layout of the client's RACE Innovations
   logistics pages: a split hero with the service list beside it, alternating
   image/text rows with justified body copy, a full-bleed plate, and a dark
   "connect" band at the foot. The structures below are what those sections read
   from — change the data, not the layout.
   ========================================================================== */

/**
 * The service list beside the hero, and the jump list above the service rows.
 *
 * These are the six services the client named for this page, plus the two that
 * were already here. Each anchors to its own row further down, except the route
 * survey, which has its own page.
 */
export const odcServiceList: { label: string; icon: IconName; href: string }[] = [
  { label: "ODC Transportation", icon: "truck", href: "#odc-transportation" },
  { label: "Clearing & Forwarding", icon: "clipboard", href: "#clearing-forwarding" },
  { label: "Multimodal Transport", icon: "container", href: "#multimodal-transport" },
  { label: "Loading & Lashing Services", icon: "crane", href: "#loading-lashing" },
  { label: "Vehicle & Trailer Modification", icon: "wrench", href: "#trailer-modification" },
  { label: "Trailer Development Support", icon: "draft", href: "#trailer-development" },
  { label: "Transport Engineering", icon: "gear", href: "#transport-engineering" },
  { label: "Route Survey & Reports", icon: "map", href: "/odc-logistics/route-survey" },
];

export type AlternatingSection = {
  id: string;
  title: string;
  /** Justified body copy — one string per paragraph. */
  body: string[];
  slot: MediaKey;
  plate: string;
  caption: string;
  /** true puts the text on the left and the image on the right. */
  reversed?: boolean;
};

export const odcSections: AlternatingSection[] = [
  {
    id: "odc-transportation",
    title: "ODC Transportation",
    body: [
      "Our ODC transportation services are designed for the safe and efficient movement of over-dimensional cargo, heavy machinery, industrial equipment, project cargo and oversized components that exceed standard transportation dimensions or weight limits.",
      "We coordinate the complete transportation process, including route planning, vehicle selection, permit support, escort arrangements, axle-load considerations, cargo securing and final delivery. Depending on the cargo size, weight and route conditions, suitable equipment such as low-bed trailers, hydraulic axle trailers, extendable trailers, modular trailers and specialised heavy-haul vehicles can be deployed.",
      "These solutions support industries such as power, infrastructure, construction, mining, oil and gas, manufacturing, renewable energy and heavy engineering, helping customers move critical cargo safely from origin to project site.",
    ],
    slot: "odcTransportation",
    plate: "PLATE 01",
    caption: "A pressure vessel under escort on hydraulic axles",
  },
  {
    id: "clearing-forwarding",
    title: "Clearing & Forwarding",
    body: [
      "Our clearing and forwarding services support the movement of ODC, heavy, oversized and project cargo through ports, customs checkpoints and logistics terminals. We coordinate the required documentation, customs clearance, port formalities, cargo handling and transportation arrangements to reduce delays and keep cargo moving.",
      "Support includes import and export customs clearance, shipping documentation, port coordination, cargo inspection support, duty and compliance documentation, transportation planning and delivery coordination. For oversized and heavy cargo we also coordinate with transporters, port authorities and other stakeholders so the consignment moves safely from the port or terminal to its final destination.",
      "With end-to-end coordination, customers can manage complex project cargo movements from arrival and clearance through to forwarding and final delivery.",
    ],
    slot: "clearingForwarding",
    plate: "PLATE 02",
    caption: "Documentation and clearance at the port interface",
    reversed: true,
  },
  {
    id: "multimodal-transport",
    title: "Multimodal Transport",
    body: [
      "Our multimodal transport solutions provide integrated movement of ODC, heavy and project cargo using a suitable combination of road, rail, sea and inland waterways. The modes are selected on cargo dimensions, weight, route conditions, project location, delivery timelines and the wider logistics requirement.",
      "Services cover origin pickup, port handling, road transportation, sea freight, rail movement, barge transportation, transshipment, specialised trailers, route planning, cargo securing and final-mile delivery.",
      "For large industrial equipment and oversized cargo, each stage of the journey is coordinated to ensure a smooth transfer between modes — which is what makes delivery from the manufacturing location or port to the final project site safe, cost-effective and efficient.",
      "These solutions suit industrial machinery, construction equipment, power and energy equipment, transformers, turbines, heavy engineering products, infrastructure cargo and other oversized shipments.",
    ],
    slot: "multimodalTransport",
    plate: "PLATE 03",
    caption: "Road, rail and sea in a single corridor",
  },
  {
    id: "loading-lashing",
    title: "Loading & Lashing Services",
    body: [
      "Our loading and lashing services ensure heavy and oversized cargo is safely handled and securely positioned before transportation. Proper loading and cargo securing are what prevent movement, vibration, shifting or damage during road, rail, sea or multimodal transportation.",
      "We support cargo loading, unloading, positioning, lifting coordination, blocking, bracing, chaining, strapping and lashing, based on the cargo type, dimensions, weight distribution and transportation method.",
      "Depending on project requirements, loading operations can involve cranes, forklifts, hydraulic jacks, gantry systems, lifting beams, spreaders, chains, wire ropes and heavy-duty securing equipment.",
      "The approach focuses on safe handling, proper weight distribution, secure cargo restraint and smooth transportation of industrial machinery, transformers, pressure vessels, construction equipment, fabricated structures and other ODC cargo.",
    ],
    slot: "loadingLashing",
    plate: "PLATE 04",
    caption: "Chaining and lashing before the movement starts",
    reversed: true,
  },
  {
    id: "trailer-modification",
    title: "Vehicle & Trailer Modification",
    body: [
      "Our vehicle and trailer modification support helps adapt transportation equipment to the specific requirements of oversized, heavy and special project cargo.",
      "Depending on cargo dimensions, weight, centre of gravity, ground clearance, loading requirements and route limitations, modifications may be required to improve the suitability and operational capability of the transport vehicle or trailer.",
      "Support can include trailer platform modifications, deck extensions, structural reinforcement, additional supports, mounting arrangements, axle configuration support, load distribution improvements, ramps, brackets, cargo supports and special-purpose fixtures.",
      "These customised modifications improve cargo compatibility, transportation safety, loading efficiency, stability and operational flexibility for complex ODC movements.",
    ],
    slot: "trailerModification",
    plate: "PLATE 05",
    caption: "Reinforcement and deck work in the shop",
  },
  {
    id: "trailer-development",
    title: "Trailer Development Support for ODC Logistics",
    body: [
      "We provide trailer development support for companies requiring specialised transportation solutions for heavy and oversized cargo.",
      "The work covers development and adaptation of trailers based on cargo dimensions, payload requirements, axle loads, turning requirements, route conditions, deck height, loading method and project-specific transportation challenges.",
      "We can support the development of low-bed trailers, extendable trailers, multi-axle trailers, hydraulic trailers, modular trailers, heavy-duty flatbeds and customised special-purpose trailers. The process can include requirement analysis, conceptual design support, configuration planning, load distribution assessment, structural considerations, axle selection, hydraulic requirements, fabrication coordination, testing support and operational evaluation.",
      "The objective is practical, reliable trailer solutions that improve payload capacity, manoeuvrability, cargo safety, operational efficiency and suitability for demanding ODC logistics applications.",
    ],
    slot: "trailerDevelopment",
    plate: "PLATE 06",
    caption: "From requirement to configuration, before it is built",
    reversed: true,
  },
  {
    id: "transport-engineering",
    title: "Transport Engineering",
    body: [
      "For the safe and successful movement of heavy-lift and over-dimensional cargo, technical expertise is what decides the outcome. GTS provides tailor-made transport engineering, feasibility and infrastructure studies, detailed route survey services and technical project consulting, so a movement is assessed properly before anything is committed.",
      "The work includes vehicle stability checks, gradient and traction analysis to establish the pullers and torque required at the wheels, multimodal movement studies, barge loading and unloading analysis, wharf ground stability assessment, jetty stability evaluation and bridge load calculation. Combining engineering calculation with on-ground survey is what reduces operational risk across difficult terrain and multimodal routes.",
    ],
    slot: "routeSurveyJunction",
    plate: "PLATE 07",
    caption: "Swept path through a junction — the constraint an engineering study has to answer",
  },
  {
    id: "logistics-consultancy",
    title: "Transport Logistics Consultancy",
    body: [
      "Consultancy that prioritises deadlines, budgets and measurable results. The work covers multimodal transport planning, jetty and approach development, route optimisation, warehouse and supply-chain planning, and safety planning for the movement itself.",
      "Where a programme carries several consignments over the same corridor, this is what turns a series of one-off movements into a planned operation — with the surveys, permits and equipment sequenced against the delivery schedule instead of chased individually.",
    ],
    slot: "odcConsultation",
    plate: "PLATE 08",
    caption: "Planning a corridor rather than a single load",
    reversed: true,
  },
];

/* ------------------------------------------------------- Route survey page */

/** The topic strip beneath the route-survey hero. */
export const odcTopicTabs: { label: string; href: string }[] = [
  { label: "ODC Logistics", href: "/odc-logistics" },
  { label: "Route Survey Reports", href: "/odc-logistics/route-survey" },
  { label: "Reports", href: "/odc-logistics/reports" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Consulting", href: "/consulting" },
];

/** Intro copy for the route survey reports page. */
export const routeSurveyIntro = [
  "Location-Based Intelligence is about facilitating hindrance-free movement of goods by conducting route surveys with a team of experts on the ground. The survey team produces reports with recommendations that let a consignment move without surprises, using survey tooling that records every point with coordinates and photographs so accuracy does not rest on memory.",
  "GTS works with engineering and civil specialists to execute route surveys, identify the shortest feasible route, establish load securing, perform vehicle stability calculations, and determine bridge capacity and road filling requirements together with the associated civil costs — so a movement is planned on cost as well as on feasibility.",
  "The same team can support industries, logistics operators and transport companies in specifying trailers suited to a particular cargo and application, where standard equipment does not fit the consignment.",
];

/** Key features. `conditional` items depend on the scope agreed for the survey. */
export const routeSurveyKeyFeatures: { text: string; conditional?: boolean }[] = [
  { text: "Turning circle diagrams with vehicle simulation along with the load" },
  { text: "Railway crossing related obstruction details" },
  { text: "LT/HT cable, tree branches, signboards and overhead bridge height constraints" },
  {
    text: "Other observations — petrol pump, toll plaza, parking points, SOS and emergency services, dhaba, traffic congestion locations, pothole details, NH/SH identification and major city entry and exit",
  },
  { text: "Critical bridge calculations", conditional: true },
  { text: "Vehicle stability calculation when loaded", conditional: true },
  {
    text: "Load securing guidelines, suggested vehicle modification to suit the load, and new vehicle design for a specific cargo movement",
    conditional: true,
  },
  { text: "Gradient calculations", conditional: true },
];

/* ------------------------------------------------------------ Reports page */

export type ReportListing = {
  id: string;
  category: string;
  title: string;
  description: string;
  regions: string[];
  slot: MediaKey;
};

export const reportCategories = [
  "ODC Route Feasibility Study Report",
  "Route Survey Report",
  "Corridor Feasibility Report",
  "Port Connectivity Report",
  "Heavy Cargo Movement Report",
];

export const reportRegions = ["Asia Pacific", "India", "Africa", "Middle East"];

/**
 * The report catalogue.
 *
 * These are report *types* GTS can produce to order, not stock items — there is
 * deliberately no price, because a report is scoped per route. Add a priced,
 * off-the-shelf listing by giving an entry its own commercial fields.
 */
export const reportListings: ReportListing[] = [
  {
    id: "odc-inbound-port-corridor",
    category: "ODC Route Feasibility Study Report",
    title: "Movement of Over-Dimensional Cargo from the highway corridors to a port",
    description:
      "Route feasibility and engineering assessment for inbound ODC movement from the nearest National Highway corridors to the port gate. Evaluates highway connectivity, port approach roads, last-mile access, turning radius, bridge and flyover clearances, utility obstructions, gate entry feasibility, internal port road movement, berth accessibility, RORO and LOLO suitability, bottleneck locations and risk factors.",
    regions: ["Asia Pacific", "India"],
    slot: "odcJetty",
  },
  {
    id: "odc-outbound-port-evacuation",
    category: "ODC Route Feasibility Study Report",
    title: "Outward movement of Over-Dimensional Cargo from a port to the highway corridors",
    description:
      "Route engineering and logistics feasibility for the outward evacuation of ODC from a port to the nearest National Highway corridors. Evaluates port exit feasibility, internal port road circulation, gate movement constraints, heavy-haul connectivity, turning radius requirements, bridge clearances, overhead utility obstructions, road width, pavement condition, traffic management and onward highway access.",
    regions: ["Asia Pacific", "India"],
    slot: "odcTransportation",
  },
  {
    id: "route-survey-point-to-point",
    category: "Route Survey Report",
    title: "Point-to-point route survey with a GPS-referenced obstruction schedule",
    description:
      "A driven survey of a named origin-to-destination route, recording every obstruction with chainage, GPS coordinates, measured clearances, photographs and the vehicle movement required at each point. Issued with route map, GA drawing, GPX track and a section-by-section difficulty assessment.",
    regions: ["Asia Pacific", "India", "Africa"],
    slot: "routeSurveyTeam",
  },
  {
    id: "corridor-feasibility",
    category: "Corridor Feasibility Report",
    title: "Corridor feasibility assessment for a repeat heavy-cargo programme",
    description:
      "Where a corridor will carry several consignments, this assesses the route once against a defined cargo envelope and sets out what has to be cleared, strengthened or avoided for the programme as a whole — so surveys, permits and equipment can be sequenced rather than chased per movement.",
    regions: ["Asia Pacific", "India", "Middle East"],
    slot: "routeSurveyJunction",
  },
  {
    id: "port-connectivity",
    category: "Port Connectivity Report",
    title: "Port connectivity and approach assessment for project cargo",
    description:
      "Assessment of a port's suitability for a given consignment: approach roads, gate and internal circulation, berth and jetty access, laydown availability, ground bearing at the wharf, and the road or barge interface for the onward leg.",
    regions: ["Asia Pacific", "India"],
    slot: "odcJetty",
  },
  {
    id: "heavy-cargo-movement",
    category: "Heavy Cargo Movement Report",
    title: "Heavy cargo movement plan with method statement",
    description:
      "The executable plan for a specific consignment: trailer and prime-mover configuration, axle loading, lifting method at both ends, traffic windows, escort and utility coordination, and the point-by-point actions required along the surveyed route.",
    regions: ["Asia Pacific", "India", "Africa", "Middle East"],
    slot: "odcConsultation",
  },
];
