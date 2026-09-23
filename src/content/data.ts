// Todo el contenido del portfolio, en español e inglés.
// Para editar textos, métricas o proyectos, este es el único archivo a tocar.

export type Lang = "es" | "en";
export type L = Record<Lang, string>;
/** Etiqueta que puede ser igual en ambos idiomas (string) o traducida (L). */
export type Tag = string | L;


export const profile = {
  name: "Martín Porollan",
  brand: { main: "MP", accent: "·FACTORY" },
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

export type SceneId = "treasury" | "fiscal" | "lab" | "depot" | "production" | "service" | "datacenter";

export type Station = {
  id: string;
  code: string;
  /** Sector de la planta donde vive este proyecto. */
  sector: L;
  scene: SceneId;
  title: L;
  kicker: L;
  problem: L;
  solution: L;
  stack: Tag[];
  impact: { value: string; label: L }[];
  /** Comparación antes/después opcional para el slider. */
  beforeAfter?: { before: L; after: L };
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
    code: "S-01",
    sector: { es: "Tesorería", en: "Treasury" },
    scene: "treasury",
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
  },
  {
    id: "arca",
    code: "S-02",
    sector: { es: "Oficina fiscal", en: "Tax office" },
    scene: "fiscal",
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
  },
  {
    id: "vision",
    code: "S-03",
    sector: { es: "Laboratorio de IA", en: "AI lab" },
    scene: "lab",
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
  },
  {
    id: "erp",
    code: "S-04",
    sector: { es: "Depósito y logística", en: "Warehouse & logistics" },
    scene: "depot",
    kicker: { es: "Full stack", en: "Full stack" },
    title: { es: "ERP en Flutter + PostgreSQL", en: "Flutter + PostgreSQL ERP" },
    problem: {
      es: "Remitos en papel que se perdían, stock que nadie sabía con certeza y cero trazabilidad de las entregas.",
      en: "Paper delivery notes that got lost, stock nobody was sure about and zero delivery traceability.",
    },
    solution: {
      es: "Un ERP multiplataforma con remitos digitales, stock en tiempo real, cobranzas y cuenta corriente. Nació en Firebase y lo migré a PostgreSQL en Supabase: toda la lógica que toca dinero vive en funciones de la base, no en el cliente.",
      en: "A cross-platform ERP with digital delivery notes, real-time stock, collections and customer accounts. It started on Firebase and I migrated it to PostgreSQL on Supabase: all money-handling logic lives in database functions, not in the client.",
    },
    stack: ["Flutter", "Dart", "Supabase", "PostgreSQL", { es: "Migración desde Firebase", en: "Firebase migration" }],
    impact: [
      { value: "3600+", label: { es: "remitos digitales", en: "digital delivery notes" } },
      { value: "100%", label: { es: "operación sin papel", en: "paperless operation" } },
    ],
  },
  {
    id: "iot",
    code: "S-05",
    sector: { es: "Producción", en: "Production floor" },
    scene: "production",
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
  },
  {
    id: "servicio",
    code: "S-06",
    sector: { es: "Servicio técnico", en: "Field service" },
    scene: "service",
    kicker: { es: "Mobile en campo", en: "Field mobile" },
    title: { es: "Aquaservice ST: app de servicio técnico", en: "Aquaservice ST: field service app" },
    problem: {
      es: "Técnicos sin historial de los equipos, comprobantes hechos a mano y ningún control de qué dispenser estaba en cada cliente o en reparación.",
      en: "Technicians with no equipment history, handwritten receipts and no record of which dispenser was at which client or in repair.",
    },
    solution: {
      es: "Una app para el técnico: escanea el QR de cada dispenser, ve su historial, registra el servicio con fotos, GPS y firma del cliente, e imprime el comprobante por Bluetooth en una impresora térmica. Suma taller de reparaciones, stock de repuestos y reportes en PDF.",
      en: "An app for the technician: scan each dispenser's QR, see its history, log the service with photos, GPS and the client's signature, and print the receipt over Bluetooth on a thermal printer. Plus a repair workshop, spare-parts stock and PDF reports.",
    },
    stack: ["Flutter", "Riverpod", "Firebase", "Cloud Functions", "QR", { es: "Impresión térmica BT", en: "BT thermal printing" }],
    impact: [
      { value: "400+", label: { es: "dispensers con QR", en: "QR-tagged dispensers" } },
      { value: "BT", label: { es: "comprobante en el acto", en: "on-site receipts" } },
    ],
  },
  {
    id: "ada",
    code: "S-07",
    sector: { es: "Centro de datos", en: "Data center" },
    scene: "datacenter",
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
  },
];

export const finishedProduct = {
  title: { es: "Producto terminado", en: "Finished product" },
  text: {
    es: "La misma planta, 100% digital y sin papel. Cada proceso crítico automatizado, medido y conectado.",
    en: "The same plant, 100% digital and paperless. Every critical process automated, measured and connected.",
  },
};

/** Proyectos propios (Taller de I+D). Todavía sin publicar: no llevan links. */
export type LabProject = {
  id: string;
  code: string;
  scene: "sports" | "quest";
  name: string;
  tagline: L;
  description: L;
  features: L[];
  stack: Tag[];
  stat: { value: string; label: L };
};

export const labProjects: LabProject[] = [
  {
    id: "sportsapp",
    code: "P-01",
    scene: "sports",
    name: "SportsApp",
    tagline: { es: "Resultados deportivos en vivo", en: "Live sports scores" },
    description: {
      es: "App nativa de Android con backend propio que junta resultados en vivo de fútbol, básquet, Fórmula 1, tenis y pádel. Normaliza varias fuentes de datos en un único modelo y transmite los eventos al instante.",
      en: "Native Android app with its own backend that brings together live scores for football, basketball, Formula 1, tennis and padel. It normalizes several data providers into a single model and streams events instantly.",
    },
    features: [
      { es: "Marcadores en vivo por Server-Sent Events", en: "Live scores over Server-Sent Events" },
      { es: "Offline-first: caché local con Room", en: "Offline-first: local cache with Room" },
      { es: "Backend-for-frontend con sondeo adaptativo", en: "Backend-for-frontend with adaptive polling" },
      { es: "Widget de pantalla de inicio con Glance", en: "Home-screen widget with Glance" },
    ],
    stack: ["Kotlin", "Jetpack Compose", "Room", "Ktor", "SSE", "PostgreSQL"],
    stat: { value: "5", label: { es: "deportes", en: "sports" } },
  },
  {
    id: "utnquest",
    code: "P-02",
    scene: "quest",
    name: "UTNQuest",
    tagline: { es: "Repasá el parcial jugando", en: "Study for exams by playing" },
    description: {
      es: "App con juegos para que estudiantes de la UTN FRM repasen sus materias: XP, niveles, rachas y logros. Incluye un Profe IA que toma examen oral citando los apuntes de la cátedra. Un solo código para web, Android e iOS.",
      en: "Gamified app for UTN FRM students to review their courses: XP, levels, streaks and achievements. Includes an AI professor that runs oral exams citing the course notes. One codebase for web, Android and iOS.",
    },
    features: [
      { es: "Rosco, contrarreloj, duelos y desafío diario", en: "Word wheel, time trial, duels and daily challenge" },
      { es: "Profe IA con Claude y tool use sobre los apuntes", en: "AI professor with Claude tool use over the notes" },
      { es: "XP y logros calculados en SQL: no se pueden inflar", en: "XP and achievements computed in SQL: cheat-proof" },
      { es: "Modo invitado sin backend", en: "Guest mode with no backend" },
    ],
    stack: ["Flutter", "Riverpod", "Supabase", "PostgreSQL", "Edge Functions", "Claude API"],
    stat: { value: "469", label: { es: "preguntas", en: "questions" } },
  },
];

/** Forma de herramienta con la que se dibuja cada grupo en la caja. */
export type ToolShape = "saw" | "multimeter" | "screwdriver" | "wrench" | "tape" | "drill" | "hammer";

export type SkillGroup = { title: L; items: Tag[]; tool: ToolShape };

export const skills: SkillGroup[] = [
  {
    title: { es: "Lenguajes", en: "Languages" },
    items: ["Java", "Python", "Dart", "TypeScript", "JavaScript", "C# (.NET 8)"],
    tool: "saw",
  },
  {
    title: { es: "Datos, IA y automatización", en: "Data, AI & automation" },
    items: ["Vision LLMs", "MCP", "Ollama", "Qwen", "Gemma", { es: "Automatización fiscal", en: "Fiscal automation" }],
    tool: "multimeter",
  },
  {
    title: { es: "Backend y bases de datos", en: "Backend & databases" },
    items: ["PostgreSQL", "Supabase", "Firebase", "REST APIs", "Postman", "SQL / NoSQL"],
    tool: "screwdriver",
  },
  {
    title: { es: "Frontend y mobile", en: "Frontend & mobile" },
    items: ["React", "Node.js", "Flutter", "Firebase Auth"],
    tool: "wrench",
  },
  {
    title: { es: "IoT e industria", en: "IoT & industrial" },
    items: ["ESP32", "PLC", { es: "Sensores", en: "Sensors" }, { es: "Telemetría", en: "Telemetry" }, { es: "Monitoreo en vivo", en: "Live monitoring" }],
    tool: "tape",
  },
  {
    title: { es: "DevOps y herramientas", en: "DevOps & tools" },
    items: ["Linux", "Git", "Docker", "Kubernetes", "GitHub Actions", "AWS", "Azure"],
    tool: "drill",
  },
  {
    title: { es: "Operaciones", en: "Operations" },
    items: ["ERP / CRM", "ARCA / AFIP", { es: "Logística", en: "Logistics" }, { es: "BI y churn", en: "BI & churn" }],
    tool: "hammer",
  },
];

/** Certificaciones, grabadas como placas remachadas de identificación de máquina. */
export const credentials: { title: L; detail: L; serial: L; status: L }[] = [
  {
    title: { es: "Ingeniería en Sistemas", en: "Systems Engineering" },
    detail: { es: "UTN · Mendoza", en: "UTN · Mendoza" },
    serial: { es: "Año 4/5", en: "Year 4/5" },
    status: { es: "En curso", en: "In progress" },
  },
  {
    title: { es: "Inglés C1", en: "English C1" },
    detail: { es: "TOEFL iBT · Instituto Amicana", en: "TOEFL iBT · Instituto Amicana" },
    serial: { es: "2015–2019", en: "2015–2019" },
    status: { es: "Certificado", en: "Certified" },
  },
  {
    title: { es: "Español", en: "Spanish" },
    detail: { es: "Lengua materna", en: "Mother tongue" },
    serial: { es: "Nativo", en: "Native" },
    status: { es: "Operativo", en: "Operational" },
  },
];
