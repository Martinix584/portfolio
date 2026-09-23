// Todo el contenido del portfolio, en español e inglés.
// Para editar textos, métricas o proyectos, este es el único archivo a tocar.

export type Lang = "es" | "en";
export type L = Record<Lang, string>;
/** Etiqueta que puede ser igual en ambos idiomas (string) o traducida (L). */
export type Tag = string | L;

export type Area =
  | "backend"
  | "web"
  | "mobile"
  | "ai"
  | "iot"
  | "devops"
  | "automation";

export const profile = {
  name: "Martín Porollan",
  shortName: "M. POROLLAN",
  email: "mporollan@gmail.com",
  phone: "+54 9 261 515 4977",
  whatsapp: "5492615154977",
  location: "Mendoza, Argentina",
  linkedin: "https://linkedin.com/in/martinporollan",
  github: "https://github.com/Martinix584",
  photo: "/martin.jpg",
  cv: { es: "/cv/CV-Martin-Porollan-ES.pdf", en: "/cv/CV-Martin-Porollan-EN.pdf" },
  role: {
    es: "Estudiante de Ingeniería en Sistemas · Full Stack · Datos e IA",
    en: "Systems Engineering Student · Full Stack · Data & AI",
  },
  summary: {
    es: "Estudiante de 4.º año de Ingeniería en Sistemas en la UTN, con inglés C1 y más de 1,5 años transformando procesos de negocio. Construyo herramientas de automatización y ecosistemas de software a medida que cruzan ingeniería de datos, IA aplicada (Vision LLMs, MCP) e IoT industrial. Encuentro el cuello de botella y lo resuelvo con la tecnología que haga falta: Java, Python, .NET o Flutter.",
    en: "Fourth-year Systems Engineering student at UTN with C1 English and 1.5+ years transforming business processes. I build automation tools and custom software ecosystems spanning data engineering, applied AI (Vision LLMs, MCP) and industrial IoT. I find the bottleneck and fix it with whatever stack it takes: Java, Python, .NET or Flutter.",
  },
};

export type Station = {
  id: string;
  code: string;
  title: L;
  kicker: L;
  problem: L;
  solution: L;
  stack: Tag[];
  impact: { value: string; label: L }[];
  areas: Area[];
  /** Comparación antes/después opcional para el slider. */
  beforeAfter?: { before: L; after: L };
  /** Bullet corto para el CV a medida. */
  cvLine: L;
};

export const rawMaterial = {
  title: { es: "Materia prima", en: "Raw material" },
  text: {
    es: "Noviembre 2024. Una planta de distribución con 600+ clientes que funcionaba en papel: remitos a mano, facturas cargadas una por una, conciliaciones bancarias de 5 horas por semana y ninguna métrica de producción. Esto es lo que entró a la línea.",
    en: "November 2024. A distribution plant with 600+ clients running on paper: handwritten delivery notes, invoices keyed in one by one, 5-hour weekly bank reconciliations and zero production metrics. This is what went into the line.",
  },
  items: [
    { es: "Remitos en papel", en: "Paper delivery notes" },
    { es: "Facturación manual", en: "Manual invoicing" },
    { es: "Conciliación a mano", en: "Hand reconciliation" },
    { es: "Producción sin medir", en: "Unmeasured output" },
  ] as L[],
};

export const stations: Station[] = [
  {
    id: "conciliacion",
    code: "EST-01",
    kicker: { es: "Ingeniería financiera", en: "Financial engineering" },
    title: { es: "Motor de conciliación de pagos", en: "Payment reconciliation engine" },
    problem: {
      es: "Cada semana, alguien pasaba ~5 horas cruzando extractos bancarios contra 600+ cuentas de clientes, CUIT por CUIT.",
      en: "Every week someone spent ~5 hours matching bank statements against 600+ client accounts, one tax ID at a time.",
    },
    solution: {
      es: "Un sistema en Java que parsea los extractos, mapea cada movimiento al cliente por CUIT e imputa los pagos automáticamente. El resultado sale en un CSV listo para usar.",
      en: "A Java system that parses the statements, maps each transaction to its client by CUIT (Argentine tax ID) and posts payments automatically. The output is a ready-to-use CSV.",
    },
    stack: ["Java", "Parsing", "CSV"],
    impact: [
      { value: "600+", label: { es: "clientes conciliados", en: "clients reconciled" } },
      { value: "−50%", label: { es: "tiempo de proceso", en: "processing time" } },
    ],
    beforeAfter: {
      before: { es: "~5 h/semana de trabajo manual", en: "~5 h/week of manual work" },
      after: { es: "1 descarga de CSV", en: "1 CSV download" },
    },
    areas: ["backend", "automation"],
    cvLine: {
      es: "Motor en Java de imputación automática de pagos y conciliación bancaria por CUIT para 600+ clientes: redujo el tiempo manual en más del 50% (de ~5 h semanales a una descarga de CSV).",
      en: "Java engine for automated payment posting and bank reconciliation by tax ID across 600+ clients: cut manual time by over 50% (from ~5 h/week to a single CSV download).",
    },
  },
  {
    id: "arca",
    code: "EST-02",
    kicker: { es: "Automatización fiscal", en: "Fiscal automation" },
    title: { es: "Bot de facturación ARCA", en: "ARCA invoicing bot" },
    problem: {
      es: "Más de 150 facturas electrónicas por mes cargadas a mano en la web de ARCA (ex-AFIP), con los errores de tipeo que eso trae.",
      en: "150+ monthly e-invoices typed by hand into the ARCA (ex-AFIP) tax portal, with all the typos that brings.",
    },
    solution: {
      es: "Un motor en Python que habla directo con la API de ARCA: arma, emite y registra las facturas sin intervención manual.",
      en: "A Python engine that talks straight to the ARCA API: it builds, issues and records invoices with no manual input.",
    },
    stack: ["Python", "ARCA API", { es: "Factura electrónica", en: "E-invoicing" }],
    impact: [
      { value: "150+", label: { es: "facturas/mes", en: "invoices/month" } },
      { value: "100%", label: { es: "cumplimiento fiscal", en: "fiscal compliance" } },
    ],
    areas: ["backend", "automation"],
    cvLine: {
      es: "Motor de facturación en Python integrado a la API de ARCA (ex-AFIP): 150+ facturas electrónicas mensuales sin errores de carga y con 100% de cumplimiento fiscal.",
      en: "Python invoicing engine integrated with the ARCA (ex-AFIP) API: 150+ monthly e-invoices with zero data-entry errors and 100% fiscal compliance.",
    },
  },
  {
    id: "vision",
    code: "EST-03",
    kicker: { es: "IA aplicada", en: "Applied AI" },
    title: { es: "Digitalización de facturas con Vision LLMs", en: "Invoice digitization with Vision LLMs" },
    problem: {
      es: "Las facturas de compra llegaban como fotos y PDFs, y había que transcribirlas para el libro de IVA Compras.",
      en: "Purchase invoices arrived as photos and PDFs and had to be transcribed by hand for the VAT purchase ledger.",
    },
    solution: {
      es: "Un pipeline en Python con modelos de visión que lee cada comprobante, extrae los datos estructurados y genera los archivos que ARCA necesita para imputar directo.",
      en: "A Python pipeline using vision-language models that reads each voucher, extracts structured data and generates the exact files ARCA needs for direct filing.",
    },
    stack: ["Python", "Vision LLMs", "JSON", "ARCA"],
    impact: [
      { value: "0", label: { es: "tipeo manual", en: "manual typing" } },
      { value: "JSON", label: { es: "datos estructurados", en: "structured data" } },
    ],
    beforeAfter: {
      before: { es: "Foto de factura → tipeo a mano", en: "Invoice photo → typed by hand" },
      after: { es: "Foto → JSON → archivo ARCA", en: "Photo → JSON → ARCA file" },
    },
    areas: ["ai", "automation", "backend"],
    cvLine: {
      es: "Pipeline en Python con Vision-Language LLMs para digitalizar facturas de compra y generar automáticamente los archivos de imputación para ARCA.",
      en: "Python pipeline using Vision-Language LLMs to digitize purchase invoices and auto-generate ARCA tax filing files.",
    },
  },
  {
    id: "erp",
    code: "EST-04",
    kicker: { es: "Full stack", en: "Full stack" },
    title: { es: "ERP en Flutter + Firebase", en: "Flutter + Firebase ERP" },
    problem: {
      es: "Remitos en papel que se perdían, stock que nadie sabía con certeza y cero trazabilidad de las entregas.",
      en: "Paper delivery notes that got lost, stock nobody was sure about and zero delivery traceability.",
    },
    solution: {
      es: "Un ERP multiplataforma (móvil y escritorio) con remitos digitales, stock en tiempo real por línea de producto y sincronización en la nube.",
      en: "A cross-platform ERP (mobile and desktop) with digital delivery notes, real-time stock per product line and cloud sync.",
    },
    stack: ["Flutter", "Dart", "Firebase", "Firestore", "Auth"],
    impact: [
      { value: "3600+", label: { es: "remitos digitales", en: "digital delivery notes" } },
      { value: "100%", label: { es: "operación sin papel", en: "paperless operation" } },
    ],
    areas: ["mobile", "web", "backend"],
    cvLine: {
      es: "ERP multiplataforma en Flutter y Firebase: 3.600+ remitos digitales en 6 meses y stock en tiempo real en varias líneas de producto. Llevó la operación a 100% sin papel.",
      en: "Cross-platform Flutter + Firebase ERP: 3,600+ digital delivery notes in 6 months and real-time stock across product lines. Took the operation 100% paperless.",
    },
  },
  {
    id: "iot",
    code: "EST-05",
    kicker: { es: "IoT industrial", en: "Industrial IoT" },
    title: { es: "Telemetría de producción", en: "Production telemetry" },
    problem: {
      es: "La producción se estimaba a ojo. No había forma de saber cuánto salía de la línea ni cuándo se frenaba.",
      en: "Output was eyeballed. There was no way to know how much came off the line or when it stopped.",
    },
    solution: {
      es: "Una red de 2 microcontroladores ESP32 y 4 sensores de barrera óptica que cuenta cada unidad en tiempo real y registra métricas operativas continuas.",
      en: "A network of 2 ESP32 microcontrollers and 4 optical barrier sensors that counts every unit in real time and logs continuous operating metrics.",
    },
    stack: ["ESP32", { es: "Barreras ópticas", en: "Optical barriers" }, { es: "Telemetría", en: "Telemetry" }],
    impact: [
      { value: "4", label: { es: "barreras ópticas", en: "optical barriers" } },
      { value: "24/7", label: { es: "conteo en vivo", en: "live counting" } },
    ],
    areas: ["iot"],
    cvLine: {
      es: "Sistema de telemetría industrial con 2 ESP32 y 4 sensores de barrera óptica para contar la producción en tiempo real y registrar métricas operativas de forma continua.",
      en: "Industrial telemetry system with 2 ESP32s and 4 optical barrier sensors for real-time production counting and continuous metrics capture.",
    },
  },
  {
    id: "ada",
    code: "EST-06",
    kicker: { es: "Arquitectura de sistemas", en: "Systems architecture" },
    title: { es: "Suite ADA", en: "ADA application suite" },
    problem: {
      es: "Clientes que llamaban para todo, técnicos sin historial de los equipos y datos repartidos en sistemas que no se hablaban.",
      en: "Clients calling for everything, field techs with no equipment history and data scattered across systems that didn't talk to each other.",
    },
    solution: {
      es: "Un ecosistema completo: portal de autogestión para clientes, app de fábrica conectada a los sensores, app de campo con trazabilidad por QR de cada dispenser, PLCs programados e IA vía MCP para reportes en lenguaje natural.",
      en: "A full ecosystem: a self-service client portal, a factory app wired to the sensors, a field-service app with per-dispenser QR traceability, programmed PLCs and AI over MCP for natural-language reporting.",
    },
    stack: [".NET 8", "PostgreSQL", "React", "Flutter", "MCP", "PLC"],
    impact: [
      { value: "3", label: { es: "apps integradas", en: "integrated apps" } },
      { value: "MCP", label: { es: "IA sobre los datos", en: "AI over the data" } },
    ],
    areas: ["backend", "web", "mobile", "ai", "iot", "devops"],
    cvLine: {
      es: "Arquitecto y desarrollador líder de la Suite ADA (.NET 8, PostgreSQL, React, Flutter): portal de autogestión, app de fábrica e IoT, app de campo con trazabilidad QR, PLCs e integración de IA vía Model Context Protocol.",
      en: "Lead architect & developer of the ADA suite (.NET 8, PostgreSQL, React, Flutter): self-service portal, factory & IoT app, field-service app with QR traceability, PLCs and AI integration via Model Context Protocol.",
    },
  },
];

export const finishedProduct = {
  title: { es: "Producto terminado", en: "Finished product" },
  text: {
    es: "La misma planta, 100% digital y sin papel. Cada proceso crítico automatizado, medido y conectado.",
    en: "The same plant, 100% digital and paperless. Every critical process automated, measured and connected.",
  },
};

export type SkillGroup = { title: L; items: Tag[]; areas: Area[] };

export const skills: SkillGroup[] = [
  {
    title: { es: "Lenguajes", en: "Languages" },
    items: ["Java", "Python", "Dart", "TypeScript", "JavaScript", "C# (.NET 8)"],
    areas: ["backend", "web", "mobile"],
  },
  {
    title: { es: "Datos, IA y automatización", en: "Data, AI & automation" },
    items: ["Vision LLMs", "MCP", "Ollama", "Qwen", "Gemma", { es: "Automatización fiscal", en: "Fiscal automation" }],
    areas: ["ai", "automation"],
  },
  {
    title: { es: "Backend y bases de datos", en: "Backend & databases" },
    items: ["PostgreSQL", "Firebase", "Firestore", "REST APIs", "Postman", "SQL / NoSQL"],
    areas: ["backend"],
  },
  {
    title: { es: "Frontend y mobile", en: "Frontend & mobile" },
    items: ["React", "Node.js", "Flutter", "Firebase Auth"],
    areas: ["web", "mobile"],
  },
  {
    title: { es: "IoT e industria", en: "IoT & industrial" },
    items: ["ESP32", "PLC", { es: "Sensores", en: "Sensors" }, { es: "Telemetría", en: "Telemetry" }, { es: "Monitoreo en vivo", en: "Live monitoring" }],
    areas: ["iot"],
  },
  {
    title: { es: "DevOps y herramientas", en: "DevOps & tools" },
    items: ["Linux", "Git", "Docker", "Kubernetes", "GitHub Actions", "AWS", "Azure"],
    areas: ["devops"],
  },
  {
    title: { es: "Operaciones", en: "Operations" },
    items: ["ERP / CRM", "ARCA / AFIP", { es: "Logística", en: "Logistics" }, { es: "BI y churn", en: "BI & churn" }],
    areas: ["automation"],
  },
];

export const credentials = [
  {
    title: { es: "Ingeniería en Sistemas · UTN", en: "Systems Engineering · UTN" },
    detail: { es: "4.º año en curso · Mendoza", en: "4th year, ongoing · Mendoza" },
  },
  {
    title: { es: "Inglés C1 · TOEFL iBT", en: "English C1 · TOEFL iBT" },
    detail: { es: "Instituto Amicana · 2015–2019", en: "Instituto Amicana · 2015–2019" },
  },
  {
    title: { es: "Español nativo", en: "Native Spanish" },
    detail: { es: "Trabajo cómodo en ambos idiomas", en: "Fully comfortable working in both" },
  },
];

export const experience = {
  role: { es: "Analista de Operaciones y Automatización de TI", en: "Operations & IT Automation Analyst" },
  company: { es: "Planta de distribución de agua", en: "Water distribution plant" },
  period: { es: "11/2024 – Presente", en: "11/2024 – Present" },
  extra: [
    {
      areas: ["automation"] as Area[],
      line: {
        es: "Coordinación de 2 rutas de distribución diarias (60–100 clientes/día) y del servicio técnico, cumpliendo los SLA.",
        en: "Coordinated 2 daily distribution routes (60–100 clients/day) and technical service schedules, meeting SLAs.",
      },
    },
    {
      areas: ["ai", "automation"] as Area[],
      line: {
        es: "Análisis de abonos y demanda (~3.000 bidones/semana) para detectar señales de churn y proyectar ingresos recurrentes.",
        en: "Analyzed subscriptions and demand (~3,000 units/week) to detect churn signals and forecast recurring revenue.",
      },
    },
  ],
};

export const areaLabels: Record<Area, L> = {
  backend: { es: "Backend", en: "Backend" },
  web: { es: "Web / Full stack", en: "Web / Full stack" },
  mobile: { es: "Mobile", en: "Mobile" },
  ai: { es: "Datos e IA", en: "Data & AI" },
  iot: { es: "IoT / Industrial", en: "IoT / Industrial" },
  devops: { es: "DevOps / Infra", en: "DevOps / Infra" },
  automation: { es: "Automatización de procesos", en: "Process automation" },
};

/** Frase de apertura del CV a medida según el área principal elegida. */
export const areaPitch: Record<Area, L> = {
  backend: {
    es: "sistemas backend confiables que mueven dinero y datos reales",
    en: "reliable backend systems that move real money and data",
  },
  web: {
    es: "productos full stack de punta a punta, del modelo de datos a la interfaz",
    en: "end-to-end full stack products, from data model to UI",
  },
  mobile: {
    es: "apps multiplataforma en Flutter que la gente usa todos los días",
    en: "cross-platform Flutter apps people use every day",
  },
  ai: {
    es: "IA aplicada a problemas concretos: Vision LLMs, modelos locales y MCP",
    en: "AI applied to concrete problems: Vision LLMs, local models and MCP",
  },
  iot: {
    es: "IoT industrial: sensores, ESP32 y PLCs conectados al software",
    en: "industrial IoT: sensors, ESP32s and PLCs wired into software",
  },
  devops: {
    es: "infraestructura sólida sobre Linux, contenedores y CI/CD",
    en: "solid infrastructure on Linux, containers and CI/CD",
  },
  automation: {
    es: "automatizar procesos de negocio hasta eliminar el trabajo manual",
    en: "automating business processes until the manual work is gone",
  },
};
