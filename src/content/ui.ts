import type { L } from "./data";

// Textos de interfaz (botones, etiquetas, títulos de sección).
export const ui = {
  nav: {
    line: { es: "Línea", en: "Line" },
    tools: { es: "Herramientas", en: "Tools" },
    game: { es: "Simulador", en: "Simulator" },
    order: { es: "Orden", en: "Order" },
  },
  downloadCv: { es: "CV", en: "CV" },
  downloadCvLong: { es: "Descargar CV", en: "Download CV" },
  sensor: { es: "Sensor S-01 · visitas", en: "Sensor S-01 · visits" },
  sensorOnline: { es: "Sensor S-01 · en línea", en: "Sensor S-01 · online" },

  hero: {
    badge: { es: "Credencial de operario", en: "Operator badge" },
    id: { es: "Legajo", en: "Employee ID" },
    shift: { es: "Turno", en: "Shift" },
    available: { es: "Disponible para nuevos proyectos", en: "Open to new projects" },
    clearance: { es: "Acceso", en: "Clearance" },
    clearanceValue: { es: "Toda la planta", en: "Full plant" },
    headline: {
      es: "Convierto procesos manuales en sistemas que funcionan solos.",
      en: "I turn manual processes into systems that run themselves.",
    },
    enter: { es: "Ingresá a la planta", en: "Enter the plant" },
    gate: { es: "Portón 1 · Acceso de visitas", en: "Gate 1 · Visitor access" },
  },

  line: {
    label: { es: "Línea de producción", en: "Production line" },
    title: { es: "Del papel al sistema", en: "From paper to system" },
    intro: {
      es: "Seguí la pieza por la línea. Cada estación es un proyecto real en producción: qué problema había, cómo lo resolví y qué cambió.",
      en: "Follow the part down the line. Each station is a real project in production: the problem, how I solved it and what changed.",
    },
    problem: { es: "Problema", en: "Problem" },
    solution: { es: "Solución", en: "Solution" },
    stack: { es: "Stack", en: "Stack" },
    impact: { es: "Impacto", en: "Impact" },
    before: { es: "Antes", en: "Before" },
    after: { es: "Después", en: "After" },
    drag: { es: "Arrastrá para comparar", en: "Drag to compare" },
    input: { es: "Entrada", en: "Input" },
    output: { es: "Salida", en: "Output" },
  },

  tools: {
    label: { es: "Pañol de herramientas", en: "Tool crib" },
    title: { es: "Con qué trabajo", en: "What I work with" },
    certs: { es: "Certificaciones del operario", en: "Operator certifications" },
  },

  game: {
    label: { es: "Simulador de planta", en: "Plant simulator" },
    title: { es: "Automatizá la planta", en: "Automate the plant" },
    intro: {
      es: "Tu turno. Armá la línea para que la materia prima llegue procesada a la salida. Menos de 90 segundos, lo prometo.",
      en: "Your shift. Build the line so raw material reaches the output fully processed. Under 90 seconds, promise.",
    },
    skip: { es: "Saltar simulador", en: "Skip simulator" },
    level: { es: "Nivel", en: "Level" },
    belt: { es: "Cinta", en: "Belt" },
    erase: { es: "Borrar", en: "Erase" },
    reset: { es: "Reiniciar", en: "Reset" },
    delivered: { es: "Entregadas", en: "Delivered" },
    scrap: { es: "Descarte", en: "Scrap" },
    goal: { es: "Objetivo", en: "Goal" },
    howto: {
      es: "Elegí una pieza y tocá la grilla para colocarla. Tocala de nuevo para rotarla.",
      en: "Pick a part and tap the grid to place it. Tap it again to rotate.",
    },
    solved: { es: "Línea automatizada", en: "Line automated" },
    realWorld: { es: "En la vida real", en: "In real life" },
    next: { es: "Siguiente nivel", en: "Next level" },
    done: { es: "Planta 100% automatizada", en: "Plant 100% automated" },
    doneText: {
      es: "Ahora imaginá esto con procesos reales de tu empresa. Pasá a la última estación y armá tu pedido.",
      en: "Now picture this with your company's real processes. Head to the last station and place your order.",
    },
    toOrder: { es: "Ir a la orden de producción", en: "Go to the work order" },
    replay: { es: "Jugar de nuevo", en: "Play again" },
    wrong: { es: "¡Pieza mal procesada!", en: "Badly processed part!" },
    source: { es: "Entrada", en: "Input" },
    sink: { es: "Salida", en: "Output" },
  },

  order: {
    label: { es: "Última estación", en: "Final station" },
    title: { es: "Orden de producción a medida", en: "Custom work order" },
    intro: {
      es: "Completá la orden con lo que buscás y la planta fabrica un CV hecho para tu búsqueda, listo para descargar en PDF.",
      en: "Fill in the order with what you're looking for and the plant builds a CV tailored to your role, ready to download as PDF.",
    },
    number: { es: "Orden N.º", en: "Order No." },
    client: { es: "Cliente / empresa", en: "Client / company" },
    clientPh: { es: "Ej.: Acme S.A. (opcional)", en: "e.g. Acme Inc. (optional)" },
    position: { es: "Puesto", en: "Position" },
    positionPh: { es: "Ej.: Backend Developer (opcional)", en: "e.g. Backend Developer (optional)" },
    specs: { es: "Especificaciones requeridas", en: "Required specs" },
    specsHint: { es: "Elegí al menos una", en: "Pick at least one" },
    produce: { es: "Fabricar CV", en: "Build CV" },
    producing: { es: "En producción…", en: "In production…" },
    steps: [
      { es: "Seleccionando materia prima", en: "Selecting raw material" },
      { es: "Mecanizando experiencia", en: "Machining experience" },
      { es: "Ensamblando habilidades", en: "Assembling skills" },
      { es: "Control de calidad", en: "Quality control" },
    ] as L[],
    download: { es: "Descargar PDF", en: "Download PDF" },
    newOrder: { es: "Nueva orden", en: "New order" },
    madeFor: { es: "Fabricado para", en: "Built for" },
    qc: { es: "QC aprobado", en: "QC passed" },
    printHint: {
      es: "En el diálogo de impresión elegí «Guardar como PDF».",
      en: "In the print dialog choose “Save as PDF”.",
    },
  },

  cv: {
    summary: { es: "Perfil", en: "Profile" },
    experience: { es: "Experiencia", en: "Experience" },
    skills: { es: "Habilidades técnicas", en: "Technical skills" },
    education: { es: "Educación e idiomas", en: "Education & languages" },
    focus: { es: "Foco en", en: "Focus on" },
  },

  estop: {
    button: { es: "Parada de emergencia", en: "Emergency stop" },
    title: { es: "Línea detenida", en: "Line stopped" },
    subtitle: { es: "¿Hablamos?", en: "Let's talk?" },
    text: {
      es: "Frenaste toda la planta. Ya que estamos, escribime: respondo rápido.",
      en: "You stopped the whole plant. While we're here, drop me a line: I reply fast.",
    },
    copy: { es: "Copiar email", en: "Copy email" },
    copied: { es: "¡Copiado!", en: "Copied!" },
    rearm: { es: "Rearmar línea", en: "Re-arm line" },
  },

  footer: {
    label: { es: "Despacho", en: "Shipping" },
    title: { es: "¿Tenés un proceso que automatizar?", en: "Got a process to automate?" },
    text: {
      es: "Escribime y lo vemos. Trabajo en español e inglés.",
      en: "Write me and we'll look at it. I work in Spanish and English.",
    },
    built: { es: "Fabricado en Mendoza con Next.js", en: "Made in Mendoza with Next.js" },
  },
} satisfies Record<string, unknown>;
