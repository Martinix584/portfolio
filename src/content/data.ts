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
    es: "Estudiante de Ingeniería en Sistemas · Datos, Analytics e IA aplicada",
    en: "Systems Engineering Student · Data, Analytics & Applied AI",
  },
  summary: {
    es: "Estudiante de 4.º año de Ingeniería en Sistemas (UTN) con casi 2 años digitalizando la operación de una embotelladora y distribuidora de agua. Trabajo con SQL y PostgreSQL: modelado de datos, vistas para reportes, migraciones con ETL y validación de calidad de datos. Integré IA aplicada a procesos reales: lectura de facturas con Vision LLMs (Gemini) y operación de la base en lenguaje natural con MCP, siempre con validaciones y control humano. Me interesa especializarme en analítica con IA sobre Google Cloud (Looker, BigQuery, Vertex AI).",
    en: "Fourth-year Systems Engineering student at UTN with almost 2 years digitizing the operations of a water bottling and distribution company. I work with SQL and PostgreSQL: data modeling, reporting views, ETL migrations and data-quality validation. I've brought applied AI into real processes: invoice reading with Vision LLMs (Gemini) and natural-language database operations over MCP, always with validations and a human in the loop. I want to specialize in AI-powered analytics on Google Cloud (Looker, BigQuery, Vertex AI).",
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
    es: "Noviembre 2024. Una embotelladora y distribuidora de agua con 44 distribuidores que funcionaba en papel: remitos a mano, facturas cargadas una por una, pagos conciliados a ojo contra los extractos y datos sin integridad para reportar. Esto es lo que entró a la línea.",
    en: "November 2024. A water bottling and distribution company with 44 distributors running on paper: handwritten delivery notes, invoices keyed in one by one, payments matched by eye against bank statements and data with no integrity to report on. This is what went into the line.",
  },
  items: [
    { es: "Remitos en papel", en: "Paper delivery notes" },
    { es: "Facturación manual", en: "Manual invoicing" },
    { es: "Conciliación a mano", en: "Hand reconciliation" },
    { es: "Datos sin integridad", en: "Data without integrity" },
  ] as L[],
};

export const stations: Station[] = [
  {
    id: "conciliacion",
    code: "S-01",
    sector: { es: "Tesorería", en: "Treasury" },
    scene: "treasury",
    kicker: { es: "Ingeniería financiera", en: "Financial engineering" },
    title: { es: "Motor de conciliación bancaria", en: "Bank reconciliation engine" },
    problem: {
      es: "Los pagos llegaban por 3 bancos y por comprobantes de WhatsApp, y había que cruzarlos a mano contra las facturas pendientes de cada cliente.",
      en: "Payments came in through 3 banks and WhatsApp receipts, and had to be matched by hand against each client's pending invoices.",
    },
    solution: {
      es: "Un motor de scoring que cruza extractos y comprobantes (leídos con Gemini) contra facturas pendientes por CUIT, monto, nombre y fecha. Imputa solo lo de alta confianza, manda el resto a revisión humana y aprende de cada decisión. Nació en Java; lo reescribí en Python (FastAPI) para trabajar con la deuda en vivo por API, deduplicar pagos y reemplazar un clasificador con LLM por reglas verificables.",
      en: "A scoring engine that matches bank statements and receipts (read with Gemini) against pending invoices by CUIT (Argentine tax ID), amount, name and date. It only posts high-confidence matches, sends the rest to human review and learns from every decision. It started in Java; I rewrote it in Python (FastAPI) to work against live debt over an API, deduplicate payments and replace an LLM classifier with verifiable rules.",
    },
    stack: ["Python", "FastAPI", "Java", "Gemini", { es: "Scoring", en: "Scoring" }],
    impact: [
      { value: "3", label: { es: "bancos + WhatsApp", en: "banks + WhatsApp" } },
      { value: "184", label: { es: "tests automatizados", en: "automated tests" } },
    ],
    beforeAfter: {
      before: { es: "Cruce manual, pago por pago", en: "Manual matching, one payment at a time" },
      after: { es: "Auto-imputación + revisión de lo dudoso", en: "Auto-posting + review of the doubtful" },
    },
  },
  {
    id: "arca",
    code: "S-02",
    sector: { es: "Oficina fiscal", en: "Tax office" },
    scene: "fiscal",
    kicker: { es: "Automatización fiscal", en: "Fiscal automation" },
    title: { es: "Facturación electrónica ARCA", en: "ARCA e-invoicing" },
    problem: {
      es: "Las facturas electrónicas se cargaban a mano en la web de ARCA (ex-AFIP), con los errores de tipeo y de numeración que eso trae.",
      en: "E-invoices were typed by hand into the ARCA (ex-AFIP) tax portal, with all the typos and numbering mistakes that brings.",
    },
    solution: {
      es: "Integré los web services de ARCA (WSAA y WSFEv1) en Supabase Edge Functions: firma con certificado digital, caché de token, numeración correlativa y certificados resguardados en Vault.",
      en: "I integrated ARCA's web services (WSAA and WSFEv1) into Supabase Edge Functions: digital-certificate signing, token caching, sequential numbering and certificates kept in Vault.",
    },
    stack: ["TypeScript", "Supabase Edge Functions", "SOAP", "WSFEv1", "Vault"],
    impact: [
      { value: "SOAP", label: { es: "WSAA + WSFEv1", en: "WSAA + WSFEv1" } },
      { value: "Vault", label: { es: "certificados resguardados", en: "secured certificates" } },
    ],
  },
  {
    id: "vision",
    code: "S-03",
    sector: { es: "Laboratorio de IA", en: "AI lab" },
    scene: "lab",
    kicker: { es: "IA aplicada", en: "Applied AI" },
    title: { es: "Facturas de compra con Vision LLM", en: "Purchase invoices with a Vision LLM" },
    problem: {
      es: "Las facturas de compra llegaban como fotos y PDFs, y había que transcribirlas para el Libro IVA Digital.",
      en: "Purchase invoices arrived as photos and PDFs and had to be transcribed by hand for the digital VAT ledger.",
    },
    solution: {
      es: "Un pipeline en Python con Gemini 2.5 Flash vía bot de Telegram: extrae 14 campos por factura, valida el CUIT, la coherencia de importes y los duplicados contra lo ya declarado, y genera los archivos de importación del Libro IVA Digital de ARCA. Lo adapté también para una segunda empresa.",
      en: "A Python pipeline with Gemini 2.5 Flash over a Telegram bot: it extracts 14 fields per invoice, validates the CUIT, amount consistency and duplicates against what was already filed, and generates the import files for ARCA's digital VAT ledger. I also adapted it for a second company.",
    },
    stack: ["Python", "Gemini 2.5 Flash", "Telegram", "JSON", "ARCA"],
    impact: [
      { value: "14", label: { es: "campos por factura", en: "fields per invoice" } },
      { value: "2", label: { es: "empresas en uso", en: "companies using it" } },
    ],
    beforeAfter: {
      before: { es: "Foto de factura → tipeo a mano", en: "Invoice photo → typed by hand" },
      after: { es: "Foto → JSON validado → archivo ARCA", en: "Photo → validated JSON → ARCA file" },
    },
  },
  {
    id: "erp",
    code: "S-04",
    sector: { es: "Depósito y logística", en: "Warehouse & logistics" },
    scene: "depot",
    kicker: { es: "Mobile en producción", en: "Mobile in production" },
    title: { es: "ERP de remitos en Flutter", en: "Flutter delivery-note ERP" },
    problem: {
      es: "Remitos en papel que se perdían, numeración sin control y cero trazabilidad de lo que se entregaba a cada distribuidor.",
      en: "Paper delivery notes that got lost, uncontrolled numbering and zero traceability of what went to each distributor.",
    },
    solution: {
      es: "Una app que reemplazó los remitos en papel: carga sin conexión, talonario de numeración, firma digital e impresión térmica por Bluetooth.",
      en: "An app that replaced paper delivery notes: offline entry, numbered receipt books, digital signature and Bluetooth thermal printing.",
    },
    stack: ["Flutter", "Dart", "Supabase", "Offline-first", { es: "Impresión térmica BT", en: "BT thermal printing" }],
    impact: [
      { value: "4300+", label: { es: "remitos (~700/mes)", en: "delivery notes (~700/mo)" } },
      { value: "44", label: { es: "distribuidores", en: "distributors" } },
    ],
  },
  {
    id: "migracion",
    code: "S-05",
    sector: { es: "Línea de datos", en: "Data line" },
    scene: "production",
    kicker: { es: "Ingeniería de datos", en: "Data engineering" },
    title: { es: "Migración Firebase → PostgreSQL", en: "Firebase → PostgreSQL migration" },
    problem: {
      es: "El sistema vivía en Firebase: sin integridad referencial y sin forma de sacar reportes con SQL.",
      en: "The system lived on Firebase: no referential integrity and no way to report with SQL.",
    },
    solution: {
      es: "Migré todo a Supabase/PostgreSQL y validé el corte con un ETL que comparó cada valor entre ambas bases. Sumé vistas de estadísticas diarias, imputación FIFO de pagos con transacciones, seguridad por fila (RLS) y auditoría.",
      en: "I migrated everything to Supabase/PostgreSQL and validated the cutover with an ETL that compared every value across both databases. Added daily-stats views, transactional FIFO payment allocation, row-level security (RLS) and auditing.",
    },
    stack: ["PostgreSQL", "PL/pgSQL", "Supabase", "ETL", "RLS"],
    impact: [
      { value: "5220", label: { es: "valores validados", en: "values validated" } },
      { value: "0", label: { es: "divergencias", en: "mismatches" } },
    ],
    beforeAfter: {
      before: { es: "NoSQL sin integridad", en: "NoSQL with no integrity" },
      after: { es: "SQL con RLS, vistas y auditoría", en: "SQL with RLS, views and auditing" },
    },
  },
  {
    id: "servicio",
    code: "S-06",
    sector: { es: "Servicio técnico", en: "Field service" },
    scene: "service",
    kicker: { es: "Mobile en campo", en: "Field mobile" },
    title: { es: "App de servicio técnico", en: "Field service app" },
    problem: {
      es: "Las visitas de servicio técnico se registraban a mano, sin historial de cada equipo.",
      en: "Field service visits were logged by hand, with no history per piece of equipment.",
    },
    solution: {
      es: "Una app móvil para gestionar las visitas de servicio técnico, con integración por Bluetooth.",
      en: "A mobile app to manage field service visits, with Bluetooth integration.",
    },
    stack: ["Flutter", "Dart", "Bluetooth"],
    impact: [
      { value: "BT", label: { es: "integración en campo", en: "in-field integration" } },
      { value: "100%", label: { es: "visitas digitales", en: "digital visits" } },
    ],
  },
  {
    id: "mcp",
    code: "S-07",
    sector: { es: "Centro de datos", en: "Data center" },
    scene: "datacenter",
    kicker: { es: "IA sobre la base", en: "AI over the database" },
    title: { es: "Servidor MCP", en: "MCP server" },
    problem: {
      es: "Cargar cobranzas y remitos exigía conocer la app; los operarios querían simplemente decir qué pasó.",
      en: "Logging collections and delivery notes meant knowing the app; operators just wanted to say what happened.",
    },
    solution: {
      es: "Un servidor MCP en Python (FastMCP): los operarios cargan cobranzas y remitos escribiendo en un chat de IA. Sin SQL libre: cada herramienta llama a una función de la base que valida y audita, con el token OAuth del propio usuario para respetar la seguridad por fila (RLS) e idempotencia ante reintentos.",
      en: "A Python MCP server (FastMCP): operators log collections and delivery notes by typing into an AI chat. No free-form SQL: each tool calls a database function that validates and audits, using the user's own OAuth token so row-level security (RLS) applies, with idempotency on retries.",
    },
    stack: ["Python", "FastMCP", "MCP", "OAuth", "RLS"],
    impact: [
      { value: "23", label: { es: "herramientas", en: "tools" } },
      { value: "0", label: { es: "SQL libre", en: "free-form SQL" } },
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
    items: ["Python", "Java (Spring Boot)", "TypeScript", "Dart (Flutter)", "Kotlin"],
    tool: "saw",
  },
  {
    title: { es: "IA aplicada", en: "Applied AI" },
    items: ["Vision LLMs (Gemini)", "MCP", { es: "Extracción estructurada (JSON)", en: "Structured extraction (JSON)" }, "Ollama", "Qwen", { es: "APIs de IA", en: "AI APIs" }],
    tool: "multimeter",
  },
  {
    title: { es: "Datos y BI", en: "Data & BI" },
    items: ["SQL", "PostgreSQL", "PL/pgSQL", { es: "Modelado de datos", en: "Data modeling" }, { es: "ETL y calidad de datos", en: "ETL & data quality" }],
    tool: "screwdriver",
  },
  {
    title: { es: "Backend", en: "Backend" },
    items: ["Supabase", "FastAPI", "Ktor", "REST", "SOAP"],
    tool: "wrench",
  },
  {
    title: { es: "Reportes y NoSQL", en: "Reporting & NoSQL" },
    items: ["Power BI", "Excel", "Firebase / Firestore"],
    tool: "tape",
  },
  {
    title: { es: "DevOps y herramientas", en: "DevOps & tools" },
    items: ["Git", "GitHub Actions", "Docker", "Linux", "Vercel", "Sentry"],
    tool: "drill",
  },
  {
    title: { es: "Operaciones", en: "Operations" },
    items: ["ARCA / AFIP", { es: "Conciliación bancaria", en: "Bank reconciliation" }, { es: "Logística", en: "Logistics" }],
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
