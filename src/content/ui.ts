// Textos de interfaz (botones, etiquetas, títulos de sección).
export const ui = {
  nav: {
    plant: { es: "Planta", en: "Plant" },
    lab: { es: "I+D", en: "R&D" },
    tools: { es: "Herramientas", en: "Tools" },
    game: { es: "Simulador", en: "Simulator" },
    contact: { es: "Contacto", en: "Contact" },
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

  plant: {
    label: { es: "Plano de planta", en: "Plant floor plan" },
    title: { es: "Recorré la planta", en: "Tour the plant" },
    intro: {
      es: "Cada sector es un sistema real que diseñé y hoy está en producción. Tocá un sector para inspeccionarlo: qué problema había, cómo lo resolví y qué cambió.",
      en: "Each sector is a real system I designed that's running in production today. Tap a sector to inspect it: the problem, how I solved it and what changed.",
    },
    before: { es: "Estado inicial · nov 2024", en: "Starting point · Nov 2024" },
    inspect: { es: "Inspeccionar", en: "Inspect" },
    inspected: { es: "Inspeccionado", en: "Inspected" },
    progress: { es: "Inspección", en: "Inspection" },
    hint: { es: "Tocá un sector para inspeccionarlo", en: "Tap a sector to inspect it" },
    certified: { es: "Planta certificada: viste todos los sectores.", en: "Plant certified: you've seen every sector." },
    toGame: { es: "Ahora automatizala vos", en: "Now automate it yourself" },
    gate: { es: "Portón", en: "Gate" },
    dispatch: { es: "Despacho", en: "Dispatch" },
    close: { es: "Cerrar", en: "Close" },
    prev: { es: "Sector anterior", en: "Previous sector" },
    next: { es: "Sector siguiente", en: "Next sector" },
    problem: { es: "Problema", en: "Problem" },
    solution: { es: "Solución", en: "Solution" },
    stack: { es: "Stack", en: "Stack" },
    drag: { es: "Arrastrá para comparar", en: "Drag to compare" },
    beforeLabel: { es: "Antes", en: "Before" },
    afterLabel: { es: "Después", en: "After" },
  },

  lab: {
    label: { es: "Taller de I+D", en: "R&D workshop" },
    title: { es: "Proyectos propios", en: "Side projects" },
    intro: {
      es: "Lo que construyo fuera del trabajo, para aprender tecnologías nuevas y resolver problemas que me interesan.",
      en: "What I build outside work, to learn new technologies and solve problems I care about.",
    },
    status: { es: "En desarrollo", en: "In development" },
    prototype: { es: "Plano de prototipo", en: "Prototype drawing" },
  },

  tools: {
    label: { es: "Caja de herramientas", en: "Toolbox" },
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
      es: "Ahora imaginá esto con los procesos reales de tu empresa.",
      en: "Now picture this with your company's real processes.",
    },
    toContact: { es: "Hablemos", en: "Let's talk" },
    replay: { es: "Jugar de nuevo", en: "Play again" },
    wrong: { es: "¡Pieza mal procesada!", en: "Badly processed part!" },
    source: { es: "Entrada", en: "Input" },
    sink: { es: "Salida", en: "Output" },
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
