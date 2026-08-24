import type { Faq } from "./types";

/**
 * FAQ content, one set per service page.
 *
 * The four service sets below are the client-supplied copy and should be edited
 * against that source rather than rewritten in place — they are keyword-mapped
 * and they also feed the `FAQPage` structured data on each page, so a change
 * here changes what search engines see.
 *
 * Content rules, unchanged from the rest of the site: nothing claims stock,
 * certification, authorisation or capacity, and GTS supports, coordinates and
 * facilitates regulatory work rather than issuing anything itself.
 *
 * `modelFaqs` covers the vehicle model schedule at /vehicle-models, which is
 * not one of the four service pages.
 */

export const tradeFaqs: Faq[] = [
  {
    question: "What does an import and export company in India like GTS Trade Solutions provide?",
    answer:
      "GTS Trade Solutions supports international buyers, manufacturers, distributors and businesses with product sourcing, import-export coordination, vehicle trade, industrial goods, machinery, steel, raw materials and other legally tradable products. Requirements are evaluated against the product specification, quantity, origin, destination market and applicable regulations.",
  },
  {
    question: "Can GTS export vehicles from India to international markets?",
    answer:
      "Yes. GTS supports vehicle export enquiries from India for passenger cars, SUVs, MPVs, pick-ups, motorcycles, scooters, three-wheelers, commercial vehicles, trucks, buses, electric vehicles and special-purpose vehicles. Availability depends on the model, destination country, manufacturer policy, homologation, emission standards and local import regulations.",
  },
  {
    question: "Can GTS export cars and SUVs from India?",
    answer:
      "Yes. GTS can evaluate the sourcing and export of selected India-origin passenger cars, SUVs, MPVs and pick-ups for international buyers, distributors and fleet customers. Buyers should provide the OEM, model, variant, quantity, destination country and required LHD/RHD configuration for evaluation.",
  },
  {
    question: "Does GTS export trucks and commercial vehicles from India?",
    answer:
      "Yes. Our commercial vehicle export scope includes mini trucks, light commercial vehicles, medium-duty trucks, heavy trucks, tippers, tractor heads, pick-ups and vehicle chassis. We support distributor, fleet, construction, mining, logistics and project-based requirements where the requested vehicle can legally be supplied to the destination market.",
  },
  {
    question: "Can GTS supply buses and coaches for export from India?",
    answer:
      "Yes. GTS supports sourcing enquiries for minibuses, school buses, staff buses, city buses, intercity buses, coaches, electric buses and bus chassis. Seating capacity, application, road conditions, emission requirements, steering configuration and destination-country regulations are reviewed before sourcing.",
  },
  {
    question: "Does GTS export motorcycles and two-wheelers from India?",
    answer:
      "Yes. GTS supports international sourcing and export enquiries for motorcycles, scooters and electric two-wheelers from India. We can work with distributors, dealers, fleet operators and mobility businesses requiring individual models or commercial quantities, subject to export eligibility and availability.",
  },
  {
    question: "Can GTS export passenger and cargo three-wheelers from India?",
    answer:
      "Yes. GTS supports petrol, CNG and electric passenger and cargo three-wheeler enquiries for international markets. We can also support associated spare-parts sourcing for selected India-origin three-wheeler platforms.",
  },
  {
    question: "Can GTS export electric vehicles from India?",
    answer:
      "Yes. GTS can evaluate export requirements for passenger EVs, electric two-wheelers, electric three-wheelers, electric commercial vehicles and electric buses. Vehicle availability, charging standard, voltage architecture, homologation and destination-country regulations must be checked for every market.",
  },
  {
    question: "Can GTS export agricultural tractors and farm equipment from India?",
    answer:
      "Yes. GTS supports international sourcing of tractors, agricultural machinery, implements and related replacement parts. Enquiries can cover tractors, tillage equipment, planters, sprayers, harvesting equipment, trailers, hydraulic systems and other agricultural equipment.",
  },
  {
    question: "Can GTS export construction equipment and heavy machinery from India?",
    answer:
      "Yes. We can evaluate sourcing requirements for excavators, backhoe loaders, wheel loaders, compactors, skid-steer loaders, telehandlers and other construction or off-highway equipment. Buyers should provide the equipment type, preferred brand/model, application, quantity and destination country.",
  },
  {
    question: "Does GTS provide machinery export and industrial equipment sourcing from India?",
    answer:
      "Yes. GTS supports sourcing and international trade of selected industrial machinery, equipment and manufacturing inputs. Requirements should include the machine or equipment specification, capacity, quantity, application, destination and any required certification.",
  },
  {
    question: "Does GTS export automotive spare parts together with vehicles?",
    answer:
      "Yes. Where commercially practical, vehicles can be supplied together with recommended service and spare-parts packages. These may include filters, brake components, clutch parts, bearings, suspension components, steering parts, electrical components, cooling parts and drivetrain components.",
  },
  {
    question: "Can GTS export vehicles and spare parts from India to Africa?",
    answer:
      "Yes. Africa is an important target region for GTS. We can evaluate passenger vehicles, motorcycles, three-wheelers, trucks, buses, agricultural equipment, construction equipment and spare-parts requirements for individual African countries, subject to their specific import and homologation rules.",
  },
  {
    question: "Can GTS export products and vehicles from India to Mexico and North America?",
    answer:
      "Yes. GTS can evaluate India-origin products, vehicles, motorcycles, components and equipment for Mexico, the Caribbean and other North American markets. Each requirement must be checked against the destination country's safety, emission, homologation, customs and manufacturer requirements before commitment.",
  },
  {
    question: "Can GTS help international buyers source products from India?",
    answer:
      "Yes. GTS provides India sourcing support covering requirement review, supplier identification, supplier shortlisting, specification comparison, quotation coordination, inspection coordination, documentation and shipment support. This service is suitable for buyers who want a single sourcing contact in India.",
  },
  {
    question: "Does GTS provide supplier sourcing and vendor identification in India?",
    answer:
      "Yes. We can identify potential Indian manufacturers and suppliers according to the required product, technical specification, volume, quality expectations and commercial requirements. Supplier selection and development can also connect with our automotive-parts and manufacturing services where required.",
  },
  {
    question: "Can overseas manufacturers use GTS to enter the Indian market?",
    answer:
      "Yes. GTS supports overseas companies seeking an India distributor, dealer, representative or market-entry partner. Support can include market assessment, distributor identification, dealer-network development, localisation, after-sales planning and launch coordination.",
  },
  {
    question: "Does GTS help with import-export documentation and logistics?",
    answer:
      "GTS supports documentation, inspection and logistics coordination with the appropriate service providers. Customs clearance, statutory approvals and regulatory certificates are performed or issued by competent authorities and licensed organisations; GTS acts as a coordination and facilitation partner.",
  },
  {
    question: "What is the minimum order quantity for export from India?",
    answer:
      "Minimum order quantity depends on the product and supplier. Some vehicles may be considered individually, while spare parts, components, raw materials and industrial products are normally more competitive as batch, container, fleet or scheduled-volume orders. Send the required quantity for commercial evaluation.",
  },
  {
    question: "How can I get an import-export quotation from GTS?",
    answer:
      "Send the product or vehicle name, specification, brand/model where applicable, quantity, destination country and expected delivery requirement. For vehicles, also provide the model year, fuel type, transmission, LHD/RHD requirement, emission requirement and intended application wherever known.",
  },
];

export const partsFaqs: Faq[] = [
  {
    question: "Is GTS an automotive spare parts supplier and exporter from India?",
    answer:
      "GTS Trade Solutions supports sourcing and export of automotive components and spare parts from India for OEMs, distributors, aftermarket importers, fleet operators, workshops and international sourcing companies. Parts are sourced against the vehicle application, part number, drawing, specification or sample.",
  },
  {
    question: "Can GTS supply truck spare parts from India?",
    answer:
      "Yes. GTS supports commercial vehicle and truck spare-parts requirements including filters, axles, suspension parts, steering components, brake systems, clutch components, bearings, propeller shafts, differentials, PTO systems, hydraulics, tyres, rims, electrical systems and selected body parts.",
  },
  {
    question: "Can GTS supply bus and coach spare parts?",
    answer:
      "Yes. Bus and coach component sourcing can include axles, air suspension, steering parts, brake systems, tyres, wheel rims, doors, seats, HVAC components, lighting, electrical systems, safety components and selected body and interior parts.",
  },
  {
    question: "Does GTS export car and light commercial vehicle spare parts?",
    answer:
      "Yes. We support component requirements for passenger vehicles and LCVs across braking, suspension, steering, drivetrain, wheels, tyres, electrical systems, cooling systems, chassis components and selected engine or service parts.",
  },
  {
    question: "Can GTS supply motorcycle spare parts from India?",
    answer:
      "Yes. GTS can source motorcycle and scooter parts including filters, spark plugs, clutch plates, chain-and-sprocket kits, brake parts, cables, wheels, bearings, suspension components, electrical items, engine repair components and body parts.",
  },
  {
    question: "Can GTS supply three-wheeler spare parts?",
    answer:
      "Yes. Our three-wheeler component scope includes rear axles, differentials, EV axles, motors, controllers, batteries, brakes, suspension, tyres, rims, steering parts, electrical systems and selected passenger or cargo body components.",
  },
  {
    question: "Does GTS supply trailer spare parts and trailer components?",
    answer:
      "Yes. GTS supports sourcing of trailer axles, mechanical suspension, air suspension, landing legs, kingpins, fifth wheels, coupling systems, brake systems, ABS/EBS components, wheel rims, tyres, mudguards, lighting and other trailer running-gear components.",
  },
  {
    question: "Can GTS supply tractor and agricultural machinery spare parts?",
    answer:
      "Yes. Agricultural and tractor component sourcing can include axles, transmission components, PTO systems, hydraulic pumps, hydraulic cylinders, linkages, bearings, filters, tyres, rims, disc blades, rotavator parts, harvester components and fabricated parts.",
  },
  {
    question: "Can GTS source construction equipment and off-highway spare parts?",
    answer:
      "Yes. GTS can evaluate spare-parts requirements for construction and off-highway equipment using the machine make, model, serial number and part number. Requirements can include hydraulic, steering, braking, bearing, filtration, electrical and fabricated components.",
  },
  {
    question: "Does GTS supply EV components and electric vehicle parts?",
    answer:
      "Yes. Our EV component scope includes e-axles, traction motors, motor controllers, inverters, battery systems, battery management systems, chargers, DC-DC converters, high-voltage harnesses and thermal-management components.",
  },
  {
    question: "Can GTS source truck axles, trailer axles and e-axles from India?",
    answer:
      "Yes. Axles are one of the priority component groups supported by GTS. Requirements can cover truck axles, trailer axles, agricultural axles and EV e-axles, depending on axle capacity, track width, brake configuration, duty cycle, application and annual volume.",
  },
  {
    question: "Can GTS supply truck air suspension and mechanical suspension parts?",
    answer:
      "Yes. We support sourcing of selected mechanical and air suspension components for trucks, buses and trailers. Buyers should provide the vehicle or trailer application, axle configuration, load rating, dimensions and part specifications for correct identification.",
  },
  {
    question: "Does GTS supply commercial vehicle brake parts, ABS and EBS components?",
    answer:
      "Yes. Our sourcing scope includes selected brake-system components for trucks, buses and trailers, including foundation braking components and ABS/EBS-related parts. Exact availability depends on the vehicle platform, brake system and technical specification.",
  },
  {
    question: "Can GTS supply PTOs, hydraulic pumps and hydraulic cylinders?",
    answer:
      "Yes. PTO systems, hydraulic pumps, cylinders and related hydraulic components can be sourced for commercial vehicles, tippers, trailers, agricultural machinery and special-purpose applications. Technical data and duty-cycle requirements are needed for accurate selection.",
  },
  {
    question: "Can GTS export commercial vehicle tyres and wheel rims from India?",
    answer:
      "Yes. GTS supports sourcing of selected truck, bus, trailer, LCV and agricultural tyres as well as steel wheel rims and other wheel solutions. Buyers should specify tyre size, load rating, rim size, vehicle application, quantity and destination market.",
  },
  {
    question: "Does GTS supply genuine, OEM-equivalent and aftermarket automotive parts?",
    answer:
      "The sourcing route depends on the brand, supplier authorisation, application and buyer requirement. GTS clearly identifies the proposed product category and will not describe a component as genuine or authorised unless appropriate supplier documentation supports that description.",
  },
  {
    question: "Can GTS identify spare parts using a VIN, chassis number or part number?",
    answer:
      "Yes. Providing the OEM, model, model year, VIN/chassis number, engine details and part number significantly improves part identification. Photographs, dimensions or an old sample may also be useful where a part number is unavailable.",
  },
  {
    question: "Can GTS manufacture an automotive component from a drawing or sample?",
    answer:
      "Yes. When an off-the-shelf component is unsuitable, the requirement can move into GTS's contract manufacturing route. Drawings, specifications, dimensional data or samples can be evaluated for feasibility, prototype development and batch production.",
  },
  {
    question: "Can automotive spare-parts distributors order in bulk from GTS?",
    answer:
      "Yes. GTS supports distributors, aftermarket importers, fleets and international sourcing teams requiring bulk or scheduled supply. Annual-volume planning can help improve supplier capacity planning, pricing, packaging and lead-time management.",
  },
  {
    question: "Can GTS export automotive spare parts from India to African markets?",
    answer:
      "Yes. GTS can support model-specific and category-based spare-parts enquiries for India-origin vehicles operating in African markets. Requirements may include passenger vehicles, trucks, buses, motorcycles, three-wheelers, tractors and construction equipment, subject to correct vehicle and part identification.",
  },
];

export const modelFaqs: Faq[] = [
  {
    question: "What is this model list, exactly?",
    answer:
      "It is a demand schedule: the vehicle models we are most often asked to supply spare parts for, the markets those enquiries come from, and the components that move most on each one. It is not a stock list and it is not an inventory — it is there so you can find your model, tick the parts you need and send a precise enquiry in one step.",
  },
  {
    question: "How do I request parts for a specific model?",
    answer:
      "Open the model page, tick the components you need, and continue to the enquiry form. Your selection, the model and the vehicle type are carried across automatically, so the form arrives already describing your requirement. Add your quantities and contact details and send it.",
  },
  {
    question: "Are these genuine OEM parts or aftermarket parts?",
    answer:
      "Both routes are quotable and they price very differently, so tell us which you need. The sourcing route depends on the brand, supplier authorisation and application, and a component is never described as genuine or authorised unless appropriate supplier documentation supports that description.",
  },
  {
    question: "My model is not on the list. Can you still supply parts for it?",
    answer:
      "Yes. This schedule covers the models asked for most often, not the limit of what can be sourced. Send the make, model, year and variant — or the OEM part number, a drawing or a photograph of the part — and we will quote against it the same way.",
  },
  {
    question: "Can I order a mixed container across several models?",
    answer:
      "That is the normal pattern for distributors and aftermarket importers. Send one enquiry per model, or list the models and quantities in a single enquiry and attach your parts schedule as a spreadsheet. Consolidating a shipment across models and OEMs is part of the sourcing work.",
  },
  {
    question: "Do you supply the complete vehicles as well as the parts?",
    answer:
      "Yes — complete vehicle import and export sits under our import and export service, covering passenger vehicles, two- and three-wheelers, commercial vehicles, buses, electric vehicles, and agricultural and construction equipment. Vehicle rules differ by destination country, age and emission standard, so we review the specific market before a shipment is committed.",
  },
];

export const odcFaqs: Faq[] = [
  {
    question: "What is ODC, and when does a consignment become one?",
    answer:
      "ODC is over-dimensional cargo — a consignment that exceeds the legal limit for width, height, length or weight in the jurisdiction it is moving through, and therefore cannot simply be loaded onto a standard trailer and driven. The threshold is set by the road authority and differs by state and by country, so the same consignment can be ordinary on one leg and over-dimensional on the next.",
  },
  {
    question: "What does GTS actually do on an ODC movement?",
    answer:
      "Transport engineering and feasibility, physical route survey, movement planning and trailer selection, preparation and coordination of permit applications, coordination of utility shutdowns and escorts, and supervision during execution. Permits, no-objection certificates and clearances are issued by the competent authorities — we prepare, submit and coordinate rather than issue them.",
  },
  {
    question: "Do you own trailers, hydraulic axles and cranes?",
    answer:
      "Capability is delivered through coordinated transporter, crane and equipment partners selected for the specific movement, rather than from an owned fleet. We will tell you plainly which route a given movement takes and who is performing each part of it, rather than overstating in-house capability.",
  },
  {
    question: "What information do you need to assess an ODC movement?",
    answer:
      "Cargo dimensions as packed for transport, gross weight, the centre of gravity if it is not central, lifting and lashing points, the origin and destination named to the site rather than the city, the required delivery window and whether lifting is needed at either end. Any GA drawing or packing list you already hold shortens the assessment considerably.",
  },
  {
    question: "How long does an ODC movement take to plan?",
    answer:
      "The variable is rarely the transport — it is the route survey, the engineering assessment and the permit and shutdown lead times, which are set by the authorities and utility owners involved. Send the cargo data and the route early: the survey can start while commercial terms are still being settled, and it is the survey that determines whether the timeline is realistic.",
  },
  {
    question: "Can you handle movements that involve a port, jetty or barge leg?",
    answer:
      "Yes. Where road alone will not reach, the movement is planned across modes and the interfaces between them are what need managing — approach roads, laydown areas, roll-on or lift-on method, and the condition of the jetty or hardstand. Each leg is assessed on its own terms and then joined into one plan.",
  },
  {
    question: "What happens if the survey finds the route is not viable?",
    answer:
      "That is a useful outcome, and it is far cheaper found at survey stage than on the road. Obstructions are classified as clearable, avoidable or blocking. Where a route is blocked we assess alternatives, and where clearing is possible we set out what it involves — a temporary cable raise, a strengthened culvert, a widened turn — so the decision is a commercial one rather than a guess.",
  },
  {
    question: "Which cargo types do you typically move?",
    answer:
      "Transformers and generators, boilers and pressure vessels, wind-turbine blades, towers and nacelles, turbines, mill housings and crushers, reactors and columns, construction and mining equipment, prefabricated modules, storage tanks, cranes and plant relocations.",
  },
];

export const routeSurveyFaqs: Faq[] = [
  {
    question: "What is a route survey?",
    answer:
      "A physical survey of a proposed route, driven end to end, recording every constraint the consignment would meet. Each obstruction is logged with its chainage from the survey start, its GPS coordinates, its measured clearances, photographs, and the vehicle movement required to get past it. It is a field exercise, not a desk study — maps and satellite imagery do not show a sagging cable or a broken culvert.",
  },
  {
    question: "What does a survey record at each point?",
    answer:
      "Chainage in kilometres, latitude and longitude, a plain-language location description, the obstruction category and its measured dimensions, the vehicle movement required at that point, photographs, and a difficulty rating so the report can be read for the hard sections first.",
  },
  {
    question: "Which obstructions are covered?",
    answer:
      "Structures such as bridges, underpass and footpath bridges, culverts, railway level crossings and toll plazas; road geometry including narrow sections, bends, left and right junctions, road damage, gradients and available diversions; overhead obstructions including high-tension, low-tension and towerline cables, tree branches and sign gantries; and roadside objects such as camera poles, sign boards, utility poles and petrol bunk forecourts.",
  },
  {
    question: "Do I need a route survey before applying for permits?",
    answer:
      "In practice, yes. Road and bridge authorities want the route, the structures on it and the loads those structures will see, and utility owners want measured clearances and locations before they will schedule a shutdown. A GPS-referenced obstruction schedule is what those submissions are built from.",
  },
  {
    question: "What do I get at the end of a survey?",
    answer:
      "An obstruction schedule in chainage order, a route map with the points plotted, a GA drawing of the cargo on the selected trailer, a GPX track for navigation devices, a section-by-section difficulty assessment, and the indexed photographic record. These are delivered as the survey report — see the LBI Reports page for what that document contains.",
  },
  {
    question: "How long does a route survey take?",
    answer:
      "It depends on route length, road conditions and how much of the route is urban, since urban sections carry far more obstructions per kilometre than highway. Site approach roads usually take disproportionately long relative to their length, and they are frequently the section that decides the movement.",
  },
  {
    question: "Can you survey a route before the cargo is finalised?",
    answer:
      "A survey can be run against a provisional envelope — the maximum width, height, length and weight you expect — and the clearances recorded against it. If the final cargo grows beyond that envelope, the affected points have to be reassessed, so it is worth setting the envelope with some margin rather than to the current best case.",
  },
  {
    question: "Is one survey enough for several consignments on the same route?",
    answer:
      "Usually. Where a route will carry several movements, one survey supports the whole programme and is updated rather than repeated — though a re-verification run before each movement is normal practice, because cables sag, road works appear and structures are repaired or damaged between movements.",
  },
];

export const reportFaqs: Faq[] = [
  {
    question: "What is in an LBI route survey report?",
    answer:
      "A project and cargo summary, a route summary with start, intermediate and end locations and the total surveyed distance, the obstruction schedule with every point in chainage order, the field photographs placed against their points, the route map, the GA drawing, and the remarks and required action per obstruction.",
  },
  {
    question: "What formats is the report issued in?",
    answer:
      "An editable Word document as the master, so your own team can annotate it or fold it into a larger submission; a PDF for circulation to authorities, clients and insurers where the layout has to stay put; and a GPX track of the surveyed route and its points for navigation devices in the prime mover and escort vehicles.",
  },
  {
    question: "How is the report produced?",
    answer:
      "The field survey captures each point with its chainage, coordinates, measurements and photographs. Points are then reviewed and the ones that belong in the document are selected, so the report carries what matters rather than every frame recorded. The route map and GA drawing are added, and the document is generated from that dataset.",
  },
  {
    question: "What does the required-action column mean?",
    answer:
      "Each obstruction is classified as clearable, avoidable or blocking, and the action names what specifically has to happen and by whom — a cable raise scheduled with its owner, a culvert plated, a signboard temporarily removed, a diversion taken, or a turn negotiated in a particular sequence.",
  },
  {
    question: "Can the report be used directly in a permit application?",
    answer:
      "It is written to be. The obstruction schedule, route map, GA drawing and structure list are the technical content an oversize or overweight application is built from. The application itself is submitted to the competent authority, which issues the permit — we prepare and coordinate the submission rather than issue any approval.",
  },
  {
    question: "Who normally uses the report?",
    answer:
      "EPC and project teams for feasibility and transport basis of design; transporters and heavy-haulage crews, who plan and drive the run against it; road and bridge authorities and utility owners, as the technical basis of a submission; plant owners and consignees, for site access and laydown; and insurers and risk teams, as documented evidence of the route chosen and the controls around it.",
  },
  {
    question: "Can the report be shared with our contractors and authorities?",
    answer:
      "Yes — it is your document once issued. It is produced in formats that circulate cleanly, and it is written so that someone who has not driven the route can still work from it, which is the whole point of the photographic and GPS record.",
  },
  {
    question: "How do I request a survey and report?",
    answer:
      "Send the cargo dimensions and weight, the origin and destination named to the site, and your target movement window. If the route is already fixed, say so; if you want alternatives assessed, say that instead. We will come back with a survey scope and the basis on which the report would be produced.",
  },
];

export const manufacturingFaqs: Faq[] = [
  {
    question: "Does GTS provide contract manufacturing services in India?",
    answer:
      "Yes. GTS supports build-to-print and build-to-specification manufacturing through directly coordinated projects and a manufacturing partner network. Projects can include automotive structures, fabricated components, truck bodies, trailers, containers, reefers and other industrial assemblies.",
  },
  {
    question: "Does GTS provide automotive contract manufacturing in India?",
    answer:
      "Yes. Automotive contract manufacturing support can cover truck bodies, vehicle structures, cabins, chassis components, brackets, fabricated subassemblies, trailers, tippers, tankers and special-purpose vehicle structures.",
  },
  {
    question: "Does GTS provide sheet metal fabrication services in India?",
    answer:
      "Yes. GTS coordinates sheet-metal fabrication projects involving cutting, bending, welding, machining, finishing, coating and assembly. Requirements should include drawings, material grade, thickness, tolerances, finish and required batch quantity.",
  },
  {
    question: "Can GTS support structural steel fabrication?",
    answer:
      "Yes. Structural fabrication requirements can be evaluated against engineering drawings, dimensions, material grades, welding specifications, finish, application and quantity. Manufacturing may be coordinated through specialised partner facilities according to the project requirement.",
  },
  {
    question: "Can GTS manufacture truck bodies in India?",
    answer:
      "Yes. GTS supports truck-body and application-specific body projects using the vehicle chassis data, dimensions, payload requirement and intended operating application. Projects may include cargo bodies, utility bodies and other special body configurations.",
  },
  {
    question: "Does GTS provide trailer manufacturing support?",
    answer:
      "Yes. Trailer manufacturing support covers flatbed trailers, container trailers, low-bed trailers, tipper trailers, tanker trailers, box trailers, curtain-side trailers and special-purpose trailer configurations.",
  },
  {
    question: "Can GTS manufacture tipper bodies and tipper trailers?",
    answer:
      "Yes. Tipper-body and tipper-trailer projects can be developed against the vehicle or trailer specification, payload, material, body volume, axle configuration, hydraulic requirement and intended duty cycle.",
  },
  {
    question: "Does GTS manufacture containers in India?",
    answer:
      "GTS provides manufacturing support for dry-freight containers, cargo containers, custom containers, office containers, workshop containers and special-application containers. Specifications are evaluated according to dimensions, material, application and required quantity.",
  },
  {
    question: "Can GTS manufacture reefer bodies and refrigerated containers?",
    answer:
      "Yes. Reefer projects can include insulated truck bodies, refrigerated containers, insulated panels, doors, flooring, cooling-unit integration and temperature-monitoring requirements for cold-chain and temperature-controlled transport applications.",
  },
  {
    question: "Can GTS support tanker manufacturing and fabrication?",
    answer:
      "Yes. GTS can evaluate tanker and special-purpose fabrication requirements against capacity, material, chassis or trailer configuration, transported product, dimensions and applicable engineering or regulatory specifications.",
  },
  {
    question: "Does GTS manufacture special-purpose vehicle bodies?",
    answer:
      "Yes. GTS supports application-specific vehicle structures and body solutions based on a customer's drawings, operational requirements and vehicle platform. The manufacturing route depends on technical complexity, required processes and production volume.",
  },
  {
    question: "Can GTS manufacture automotive chassis structures and brackets?",
    answer:
      "Yes. Chassis structures, brackets and fabricated automotive subassemblies can be evaluated for build-to-print manufacturing. Buyers should provide drawings, material specifications, tolerances, welding or process standards, finish and annual volume.",
  },
  {
    question: "Does GTS provide welding, machining, cutting and bending services?",
    answer:
      "These processes can be coordinated as part of a manufacturing project through appropriate manufacturing partners. Depending on the requirement, a project can include cutting, bending, welding, machining, painting, coating and final assembly.",
  },
  {
    question: "Can GTS develop a prototype before mass production?",
    answer:
      "Yes. GTS recommends a staged prototype-to-production approach where appropriate. This normally includes drawing review, manufacturing feasibility, supplier/process selection, first article or prototype development, inspection and approval before repeat production.",
  },
  {
    question: "Does GTS support build-to-print manufacturing?",
    answer:
      "Yes. Build-to-print projects can start from customer drawings, specifications and acceptance criteria. GTS evaluates the required materials, manufacturing processes, tolerances, finishes, inspection requirements and volume before confirming the production route.",
  },
  {
    question: "Can GTS support low-volume and batch manufacturing?",
    answer:
      "Yes. Selected projects can be structured around prototype, low-volume or scheduled batch production rather than continuous mass production. Commercial feasibility depends on tooling, process setup, materials, complexity and order quantity.",
  },
  {
    question: "Can GTS manufacture products in India for export markets?",
    answer:
      "Yes. Manufacturing projects intended for export can be supported with production coordination, inspection, packing, documentation and shipment support. Destination-country certification, testing and regulatory requirements must be reviewed separately where applicable.",
  },
  {
    question: "Does GTS provide custom fabrication for international customers?",
    answer:
      "Yes. International customers can submit drawings, samples or technical specifications for custom fabrication in India. GTS reviews manufacturability, supplier/process capability, commercial feasibility and export requirements before proceeding.",
  },
  {
    question: "Does GTS own its manufacturing facilities?",
    answer:
      "GTS uses a combination of directly coordinated work and a manufacturing partner network depending on the process, tolerance, capacity and volume required. The proposed manufacturing route is communicated clearly to the customer before a project begins.",
  },
  {
    question: "What information is needed for a contract manufacturing RFQ?",
    answer:
      "Provide engineering drawings or sketches, dimensions, material grade, tolerances, surface finish, quantity per batch, expected annual volume, application, destination market and required inspection or testing standards. A physical sample or reference photograph can also support feasibility evaluation.",
  },
];

export const consultingFaqs: Faq[] = [
  {
    question: "Does GTS provide automotive consulting services in India?",
    answer:
      "Yes. GTS provides automotive, engineering and market-entry consulting covering vehicle and component homologation support, testing coordination, supplier development, market assessment, distributor identification, after-sales planning and technical support.",
  },
  {
    question: "Does GTS provide vehicle homologation consulting in India?",
    answer:
      "Yes. GTS supports manufacturers with regulatory requirement review, documentation preparation and coordination with authorised testing and certification facilities. GTS does not itself issue homologation certificates or statutory approvals.",
  },
  {
    question: "Can GTS support automotive component homologation and testing?",
    answer:
      "Yes. GTS can coordinate technical requirement review, documentation and testing activity for vehicle and component programmes with the relevant authorised facilities. Required tests and approvals depend on the component, application and target market.",
  },
  {
    question: "Does GTS provide vehicle type approval support in India?",
    answer:
      "Yes. GTS can support manufacturers preparing for Indian vehicle type-approval processes by reviewing requirements, coordinating documentation and interacting with authorised testing facilities. Formal type approvals are issued only by competent authorised agencies.",
  },
  {
    question: "Can GTS help foreign automotive companies enter the Indian market?",
    answer:
      "Yes. India market-entry consulting can cover market assessment, competitor analysis, regulatory planning, distributor or dealer identification, supplier development, localisation, product positioning, after-sales planning and launch support.",
  },
  {
    question: "Can GTS help find a distributor in India?",
    answer:
      "Yes. GTS can support overseas manufacturers with identification and evaluation of potential importers, distributors and channel partners in India. The search is based on the product category, target customer, geographic coverage and required distribution capability.",
  },
  {
    question: "Can GTS help international manufacturers develop a dealer network in India?",
    answer:
      "Yes. Dealer-network support can include identification of potential regional dealers, evaluation of channel capability, discussions with prospective partners and support for the structure of a market-development programme.",
  },
  {
    question: "Does GTS provide automotive market research and market assessment in India?",
    answer:
      "Yes. Market-entry programmes can include segment assessment, competitive benchmarking, product positioning, customer requirements, distribution structure and commercial opportunities relevant to the manufacturer's product or technology.",
  },
  {
    question: "Does GTS provide competitor benchmarking for automotive companies?",
    answer:
      "Yes. GTS can support competitor and product benchmarking as part of a market-entry or product-positioning assignment. The scope can include competing products, specifications, pricing position, market presence, distribution and relevant technology comparisons.",
  },
  {
    question: "Can GTS develop an automotive go-to-market strategy?",
    answer:
      "Yes. Go-to-market support can connect market assessment, product positioning, importer or distributor identification, dealer development, regulatory planning, after-sales requirements, spare-parts support and product-launch coordination.",
  },
  {
    question: "Can GTS support automotive supplier development in India?",
    answer:
      "Yes. GTS supports supplier identification and development for automotive, commercial vehicle, EV, trailer and agricultural equipment components. Requirements can progress from drawing or specification review through supplier evaluation, prototype development and scheduled supply.",
  },
  {
    question: "Does GTS provide EV consulting and EV powertrain component selection?",
    answer:
      "Yes. GTS can support selection and sourcing of EV powertrain components such as motors, e-axles, controllers, inverters, battery systems, BMS, chargers and thermal-management systems according to vehicle architecture and application.",
  },
  {
    question: "Can GTS help establish an automotive after-sales service network in India?",
    answer:
      "Yes. After-sales planning can cover service-partner identification, spare-parts planning, technician and training requirements, technical-support processes and service-network development as part of an India market-entry programme.",
  },
  {
    question: "Does GTS provide commercial vehicle maintenance and technical support?",
    answer:
      "Yes. GTS supports trucks, buses, trailers, tankers and special-application vehicles with maintenance and technical coordination covering braking, suspension, axles, electrical systems, hydraulics, PTO systems and diagnostics.",
  },
  {
    question: "Does GTS provide truck and bus fleet maintenance support?",
    answer:
      "Yes. Fleet-support assignments can include preventive-maintenance planning, diagnostics, technical troubleshooting, spare-parts requirements and maintenance coordination intended to improve uptime and reduce unplanned vehicle stoppages.",
  },
  {
    question: "Can GTS support truck, trailer and tanker technical troubleshooting?",
    answer:
      "Yes. Depending on the requirement and available service capability, GTS can coordinate technical support for brake, suspension, axle, electrical, hydraulic and PTO-related issues on commercial vehicles and special applications.",
  },
  {
    question: "Does GTS provide fire and safety consulting services?",
    answer:
      "Yes. GTS provides fire and safety advisory and coordination for industrial, commercial and vehicle applications. The scope can cover active and passive fire-protection requirements, product supply, design coordination, installation coordination, testing support and documentation.",
  },
  {
    question: "Does GTS supply fire protection systems and equipment?",
    answer:
      "Yes. Depending on the project, the scope can include fire alarms, detection systems, extinguishers, hydrants, sprinklers, pumps, suppression systems, fire-rated doors, fire stopping, protective coatings, sealants and associated support services.",
  },
  {
    question: "Can GTS support a complete programme from product development to market entry?",
    answer:
      "Yes. Depending on project scope, GTS can connect supplier sourcing, component development, contract manufacturing, prototype coordination, testing, homologation support, import-export activity, distributor identification and after-sales planning within one coordinated programme.",
  },
  {
    question: "How can an international company start a consulting project with GTS?",
    answer:
      "Provide your company background, product or vehicle category, current project stage, target market and the specific support required. For homologation projects, include available technical documentation; for market-entry projects, include the product range, target customers and proposed launch objective.",
  },
];
