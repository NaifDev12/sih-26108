export const MOCK_STANDARDS = [
  {
    id: "IS-1234-2023",
    code: "IS 1234:2023",
    title: "Stainless Steel Food-Grade Storage Containers & Utensils - Specification",
    category: "Food Packaging",
    industry: "Food & Beverages",
    type: "Product Standard",
    relevance: 95,
    status: "MANDATORY", // MANDATORY, RECOMMENDED, REFERENCE
    bisMandatory: true,
    publishedYear: 2023,
    amendments: 2,
    latestAmendmentDate: "2024-03-15",
    scope: "Specifies requirements for material composition, corrosion resistance, surface finish, and hygiene testing of stainless steel containers intended for food storage and processing in institutional procurement.",
    keyRequirements: [
      "Material Grade: Austenitic Stainless Steel Grade 304 (18/8) or 316.",
      "Passivation & Surface Roughness: Ra <= 0.4 µm for food contact surfaces.",
      "Leaching Test: Heavy metal release limits strictly complying with FSSAI regulations.",
      "Drop & Structural Integrity Test: 1.5m drop test without seam failure or permanent deformation."
    ],
    testMethods: [
      "IS 9845: Methods of analysis for determination of specific migration of metals",
      "IS 5528: Method for testing corrosion resistance of stainless steel utensils"
    ],
    certificationRequirements: [
      "Mandatory BIS ISI Mark under Quality Control Order (QCO) 2023",
      "FSSAI Food Contact Surface Compliance Certificate",
      "NABL Accredited Laboratory Test Report"
    ],
    alliedStandards: ["IS 4984:2016", "IS 10146:1982", "ISO 22000:2018"],
    downloadsCount: 1420,
    tags: ["Food Safety", "Stainless Steel", "Containers", "BIS QCO Mandatory"]
  },
  {
    id: "IS-4984-2016",
    code: "IS 4984:2016",
    title: "High Density Polyethylene (HDPE) Pipes for Potable Water Supply",
    category: "Water & Sanitation",
    industry: "Civil & Construction",
    type: "Product Standard",
    relevance: 91,
    status: "MANDATORY",
    bisMandatory: true,
    publishedYear: 2016,
    amendments: 4,
    latestAmendmentDate: "2023-11-20",
    scope: "Covers requirements for high density polyethylene (HDPE) pipes suitable for carrying water for human consumption, municipal water distribution systems, and pressure mains.",
    keyRequirements: [
      "PE 80 or PE 100 raw material grade conforming to IS 7328.",
      "Hydrostatic Strength: Minimum 100 hours at 80°C under 4.5 MPa stress.",
      "Carbon Black Content: 2.0% to 2.5% uniformly dispersed for UV protection.",
      "Overall Migration Limit: Compliant with potable water standards."
    ],
    testMethods: [
      "IS 12235 (Part 1 to 14): Methods of test for unplasticized PVC & HDPE pipes",
      "IS 7328: Specification for Polyethylene material for moulding and extrusion"
    ],
    certificationRequirements: [
      "BIS ISI License Mandatory under Department for Promotion of Industry and Internal Trade (DPIIT) QCO",
      "Central Public Health & Environmental Engineering Organisation (CPHEEO) Approval"
    ],
    alliedStandards: ["IS 12235:2004", "IS 7328:1992", "ISO 4427:2019"],
    downloadsCount: 3890,
    tags: ["HDPE Pipes", "Water Supply", "Infrastructure", "BIS Mandatory"]
  },
  {
    id: "IS-1367-2014",
    code: "IS 1367 (Part 3):2014",
    title: "Technical Supply Conditions for Threaded Fasteners - Mechanical Properties of Fasteners",
    category: "Metals & Fasteners",
    industry: "Metals & Machinery",
    type: "Test Methods",
    relevance: 84,
    status: "RECOMMENDED",
    bisMandatory: false,
    publishedYear: 2014,
    amendments: 1,
    latestAmendmentDate: "2020-08-10",
    scope: "Specifies mechanical properties of bolts, screws, and studs made of carbon steel and alloy steel tested at ambient temperature.",
    keyRequirements: [
      "Property Class 8.8, 10.9, and 12.9 tensile strength verification.",
      "Proof load test & hardness testing (Vickers / Rockwell C scale).",
      "Impact strength requirement at room temperature (-20°C for sub-zero grades)."
    ],
    testMethods: [
      "IS 1608: Metallic materials - Tensile testing at room temperature",
      "IS 1500: Method for Brinell hardness test for metallic materials"
    ],
    certificationRequirements: [
      "Manufacturer Quality Test Certificate (MTC) conforming to EN 10204 3.1",
      "Optional BIS Product Certification"
    ],
    alliedStandards: ["ISO 898-1:2013", "IS 1363:2002", "IS 2062:2011"],
    downloadsCount: 2150,
    tags: ["Fasteners", "Metals", "Mechanical Testing", "ISO Aligned"]
  },
  {
    id: "IS-694-2010",
    code: "IS 694:2010",
    title: "Polyvinyl Chloride (PVC) Insulated Cables for Working Voltages up to and Including 1100 V",
    category: "Electrical Cables",
    industry: "Electrical",
    type: "Safety Standards",
    relevance: 93,
    status: "MANDATORY",
    bisMandatory: true,
    publishedYear: 2010,
    amendments: 3,
    latestAmendmentDate: "2022-05-18",
    scope: "Applies to single-core and multi-core PVC insulated unsheathed and sheathed flexible cables for electric power supply in buildings, equipment, and industrial applications.",
    keyRequirements: [
      "High purity Electrolytic Tough Pitch (ETP) Annealed Copper Conductor (99.9% purity).",
      "Flame Retardant Low Smoke (FRLS) PVC Insulation Compound type A.",
      "High Insulation Resistance & Voltage withstand test at 3.0 kV AC for 5 minutes.",
      "Oxygen Index minimum 29% and Temperature Index minimum 250°C."
    ],
    testMethods: [
      "IS 10810 (Part 1 to 64): Methods of test for cables",
      "IS 8130: Conductors for insulated electric cables and flexible cords"
    ],
    certificationRequirements: [
      "Mandatory BIS ISI Mark license under Central Electricity Authority (CEA) Safety Regulations",
      "CPRI / ERDA Type Test Certificates"
    ],
    alliedStandards: ["IS 8130:2013", "IS 10810:2014", "IEC 60227:2007"],
    downloadsCount: 5120,
    tags: ["Electrical", "Cables", "FRLS PVC", "Safety Mandatory"]
  },
  {
    id: "IS-15820-2009",
    code: "IS 15820:2009",
    title: "General Requirements for Competence of Reference Material Producers & Hallmarking",
    category: "Jewellery & Precious Metals",
    industry: "Metals & Machinery",
    type: "Certification Requirements",
    relevance: 78,
    status: "MANDATORY",
    bisMandatory: true,
    publishedYear: 2009,
    amendments: 2,
    latestAmendmentDate: "2021-06-01",
    scope: "Covers hallmarking requirements, sampling, and assaying techniques for gold and silver artefacts sold under government mandated hallmarking scheme.",
    keyRequirements: [
      "Purity grades: 14K (585), 18K (750), 22K (916), 23K (958), 24K (995).",
      "X-ray Fluorescence (XRF) and Fire Assay test protocols.",
      "Unique Identification Number (HUID) laser etching mandatory."
    ],
    testMethods: [
      "IS 1417: Grades of gold and gold alloys, jewellery/artefacts",
      "IS 1418: Assaying gold in gold bullion, gold jewellery and gold alloys"
    ],
    certificationRequirements: [
      "BIS Hallmarking Center Recognition Certificate",
      "Real-time integration with BIS HUID Portal"
    ],
    alliedStandards: ["IS 1417:2016", "IS 1418:2009"],
    downloadsCount: 1840,
    tags: ["Hallmarking", "Gold", "BIS Mandatory", "HUID"]
  },
  {
    id: "IS-2062-2011",
    code: "IS 2062:2011",
    title: "Hot Rolled Medium and High Tensile Structural Steel - Specification",
    category: "Structural Steel",
    industry: "Civil & Construction",
    type: "Product Standard",
    relevance: 88,
    status: "MANDATORY",
    bisMandatory: true,
    publishedYear: 2011,
    amendments: 3,
    latestAmendmentDate: "2022-12-04",
    scope: "Covers requirements for structural steel sections, plates, flats, and bars for use in structural work, bridges, transmission towers, and general engineering.",
    keyRequirements: [
      "Steel Grade Designation: E250, E300, E350, E410, E450.",
      "Yield Stress: Min 250 MPa to 450 MPa depending on grade and thickness.",
      "Charpy V-Notch Impact Energy at 0°C / -20°C for Grade BR and B0.",
      "Carbon Equivalent (CE) <= 0.42% for weldability assurance."
    ],
    testMethods: [
      "IS 1608: Metallic materials - Tensile testing",
      "IS 1757: Method for Charpy impact test (V-notch) for metallic materials"
    ],
    certificationRequirements: [
      "Mandatory BIS ISI Mark under Steel & Steel Products (Quality Control) Order",
      "Mill Test Certificate with Heat Number Tracking"
    ],
    alliedStandards: ["IS 800:2007", "IS 1786:2008", "ISO 630:2011"],
    downloadsCount: 6400,
    tags: ["Structural Steel", "E250/E350", "Bridges", "Civil Engineering"]
  },
  {
    id: "IS-1448-2021",
    code: "IS 1448 (Part 21):2021",
    title: "Methods of Test for Petroleum and its Products - Flash Point by Pensky-Martens Closed Tester",
    category: "Chemicals & Fuels",
    industry: "Chemicals & Safety",
    type: "Test Methods",
    relevance: 72,
    status: "REFERENCE",
    bisMandatory: false,
    publishedYear: 2021,
    amendments: 0,
    latestAmendmentDate: "2021-01-10",
    scope: "Describes procedure for determination of flash point of fuel oils, lube oils, and liquids containing suspended solids using Pensky-Martens closed cup apparatus.",
    keyRequirements: [
      "Temperature range: 40°C to 360°C.",
      "Stirring speed: 90 to 120 rpm.",
      "Barometric pressure correction formula compliance."
    ],
    testMethods: ["ASTM D93: Standard test methods for flash point"],
    certificationRequirements: ["NABL Accredited Petroleum Testing Laboratory Calibration"],
    alliedStandards: ["ISO 2719:2016", "ASTM D93"],
    downloadsCount: 920,
    tags: ["Petroleum", "Flash Point", "Laboratory Testing"]
  }
];

export const MOCK_CATEGORIES = [
  { id: "all", name: "All Categories", count: 2540 },
  { id: "food", name: "Food & Beverages", count: 520, sub: ["Food Packaging", "Food Safety", "Testing Methods"] },
  { id: "civil", name: "Civil & Construction", count: 680, sub: ["Water & Sanitation", "Structural Steel", "Cement & Concrete"] },
  { id: "electrical", name: "Electrical & Electronics", count: 430, sub: ["Electrical Cables", "Transformers", "Solar PV"] },
  { id: "metals", name: "Metals & Machinery", count: 350, sub: ["Metals & Fasteners", "Jewellery & Precious Metals", "Pipes"] },
  { id: "textiles", name: "Textiles & Garments", count: 290, sub: ["Medical Textiles", "Protective Clothing", "Yarn"] },
  { id: "chemicals", name: "Chemicals & Safety", count: 270, sub: ["Chemicals & Fuels", "Fire Safety", "Personal Protective Equipment"] }
];

export const MOCK_MY_SPECIFICATIONS = [
  {
    id: "SPEC-2026-089",
    name: "Procurement of Food-Grade Stainless Steel Utensils for Mid-Day Meal Scheme",
    department: "Department of School Education & Literacy",
    createdDate: "2026-09-02",
    modifiedDate: "2026-09-14",
    standardsCount: 3,
    status: "Finalized", // Draft, Finalized, Published, Archived
    standards: ["IS 1234:2023", "IS 9845", "IS 5528"],
    author: "Rajesh Kumar (Deputy Director Procurement)"
  },
  {
    id: "SPEC-2026-074",
    name: "Tender Specifications for HDPE Water Pipeline Laying in Jal Jeevan Mission Phase II",
    department: "Ministry of Jal Shakti",
    createdDate: "2026-08-18",
    modifiedDate: "2026-09-10",
    standardsCount: 4,
    status: "Published",
    standards: ["IS 4984:2016", "IS 12235", "IS 7328", "IS 2062:2011"],
    author: "Ananya Sharma (Executive Engineer)"
  },
  {
    id: "SPEC-2026-042",
    name: "Supply & Commissioning of FRLS Cables for Central Secretariat Complex",
    department: "Central Public Works Department (CPWD)",
    createdDate: "2026-07-22",
    modifiedDate: "2026-08-05",
    standardsCount: 2,
    status: "Draft",
    standards: ["IS 694:2010", "IS 8130:2013"],
    author: "Vikramaditya Singh (Superintending Engineer)"
  }
];

export const MOCK_ANALYTICS = {
  totalStandards: "2,540+",
  activeOfficers: "1,420+",
  specificationsGenerated: "54,200+",
  recommendationAccuracy: "96.4%",
  categoryBreakdown: [
    { name: "Civil & Construction", count: 680, percentage: 26.7 },
    { name: "Food & Agriculture", count: 520, percentage: 20.4 },
    { name: "Electrical & IT", count: 430, percentage: 16.9 },
    { name: "Metals & Fasteners", count: 350, percentage: 13.7 },
    { name: "Textiles & Garments", count: 290, percentage: 11.4 },
    { name: "Chemicals & Petro", count: 270, percentage: 10.9 }
  ],
  monthlyTrend: [
    { month: "Apr", recommendations: 3400, specs: 1100 },
    { month: "May", recommendations: 4200, specs: 1450 },
    { month: "Jun", recommendations: 4900, specs: 1800 },
    { month: "Jul", recommendations: 5600, specs: 2100 },
    { month: "Aug", recommendations: 6800, specs: 2540 },
    { month: "Sep", recommendations: 7400, specs: 2980 }
  ]
};

export const MOCK_NEWS = [
  {
    id: "N-101",
    date: "12 Sep 2026",
    tag: "QCO Notification",
    title: "DPIIT notifies mandatory BIS certification for 14 new stainless steel & metal product categories",
    summary: "All procurement bodies must ensure compliance with updated IS 1234:2023 and IS 2062:2011 for contracts issued after 1st October 2026."
  },
  {
    id: "N-102",
    date: "05 Sep 2026",
    tag: "System Update",
    title: "AI Engine upgraded with automated Hindi & regional terminology matching for GeM tender descriptions",
    summary: "Officers can now paste tender criteria in Hindi (Devanagari) to receive matched Indian Standards."
  },
  {
    id: "N-103",
    date: "28 Aug 2026",
    tag: "BIS Amendment",
    title: "Amendment 4 issued for IS 4984:2016 (HDPE Potable Water Pipes)",
    summary: "Revisions include revised hydrostatic stress test duration and enhanced UV stabilizer concentration thresholds."
  }
];
