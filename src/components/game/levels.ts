import {
  Activity,
  BarChart3,
  Box,
  Braces,
  Camera,
  Cpu,
  FileCheck2,
  FileSpreadsheet,
  Landmark,
  ReceiptText,
  ScanEye,
  Sheet,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { L } from "@/content/data";

/** 0 = derecha, 1 = abajo, 2 = izquierda, 3 = arriba */
export type Dir = 0 | 1 | 2 | 3;
export const DX = [1, 0, -1, 0] as const;
export const DY = [0, 1, 0, -1] as const;

export type ItemType = "extracto" | "imputado" | "foto" | "json" | "factura" | "unidad" | "dato" | "reporte";

export const ITEMS: Record<ItemType, { icon: LucideIcon; color: string; label: L }> = {
  extracto: { icon: FileSpreadsheet, color: "var(--orange)", label: { es: "Extracto bancario", en: "Bank statement" } },
  imputado: { icon: FileCheck2, color: "var(--green)", label: { es: "Pagos imputados", en: "Posted payments" } },
  foto: { icon: Camera, color: "var(--orange)", label: { es: "Foto de factura", en: "Invoice photo" } },
  json: { icon: Braces, color: "var(--steel)", label: { es: "Datos JSON", en: "JSON data" } },
  factura: { icon: ReceiptText, color: "var(--green)", label: { es: "Comprobante ARCA", en: "ARCA filing" } },
  unidad: { icon: Box, color: "var(--orange)", label: { es: "Unidad producida", en: "Produced unit" } },
  dato: { icon: Activity, color: "var(--steel)", label: { es: "Métrica", en: "Metric" } },
  reporte: { icon: BarChart3, color: "var(--green)", label: { es: "Reporte con IA", en: "AI report" } },
};

export type MachineId = "java" | "vision" | "arca" | "esp32" | "mcp" | "excel";

export type MachineDef = {
  id: MachineId;
  label: string;
  icon: LucideIcon;
  /** null = máquina trampa: arruina cualquier pieza. */
  from: ItemType | null;
  to: ItemType | null;
};

export const MACHINES: Record<MachineId, MachineDef> = {
  java: { id: "java", label: "Java", icon: Landmark, from: "extracto", to: "imputado" },
  vision: { id: "vision", label: "Vision LLM", icon: ScanEye, from: "foto", to: "json" },
  arca: { id: "arca", label: "Bot ARCA", icon: ReceiptText, from: "json", to: "factura" },
  esp32: { id: "esp32", label: "ESP32", icon: Cpu, from: "unidad", to: "dato" },
  mcp: { id: "mcp", label: "IA · MCP", icon: Sparkles, from: "dato", to: "reporte" },
  excel: { id: "excel", label: "Excel", icon: Sheet, from: null, to: null },
};

export type Cell = { x: number; y: number };

export type Tile =
  | { kind: "belt"; dir: Dir }
  | { kind: "machine"; id: MachineId; dir: Dir };

export type Level = {
  title: L;
  hint: L;
  real: L;
  cols: number;
  rows: number;
  source: Cell & { dir: Dir };
  sink: Cell;
  walls: [number, number][];
  input: ItemType;
  output: ItemType;
  machines: MachineId[];
  goal: number;
  /** Solución de referencia para el botón "Llamar al ingeniero". */
  solution: [number, number, Tile][];
};

const b = (dir: Dir): Tile => ({ kind: "belt", dir });
const m = (id: MachineId, dir: Dir): Tile => ({ kind: "machine", id, dir });

export const LEVELS: Level[] = [
  {
    title: { es: "Conciliación de pagos", en: "Payment reconciliation" },
    hint: {
      es: "Poné la máquina Java en el camino y dibujá cintas arrastrando desde la entrada hasta la salida.",
      en: "Drop the Java machine on the path and drag belts from the input to the output.",
    },
    real: {
      es: "Este es el motor real: 600+ clientes conciliados por CUIT y ~5 h semanales de trabajo manual convertidas en una descarga de CSV.",
      en: "That's the real engine: 600+ clients reconciled by tax ID and ~5 h/week of manual work turned into one CSV download.",
    },
    cols: 7,
    rows: 5,
    source: { x: 0, y: 2, dir: 0 },
    sink: { x: 6, y: 2 },
    walls: [
      [3, 2],
      [3, 3],
    ],
    input: "extracto",
    output: "imputado",
    machines: ["java"],
    goal: 3,
    solution: [
      [1, 2, b(0)],
      [2, 2, b(3)],
      [2, 1, b(0)],
      [3, 1, m("java", 0)],
      [4, 1, b(1)],
      [4, 2, b(0)],
      [5, 2, b(0)],
    ],
  },
  {
    title: { es: "Facturas de compra", en: "Purchase invoices" },
    hint: {
      es: "El orden importa: primero la IA lee la foto y recién después el bot la carga en ARCA.",
      en: "Order matters: first the AI reads the photo, then the bot files it with ARCA.",
    },
    real: {
      es: "Así funciona el pipeline real: un Vision LLM lee cada factura, extrae los datos y genera los archivos para imputarlos directo en ARCA.",
      en: "That's the real pipeline: a Vision LLM reads each invoice, extracts the data and generates the files for direct ARCA filing.",
    },
    cols: 7,
    rows: 5,
    source: { x: 0, y: 1, dir: 0 },
    sink: { x: 6, y: 3 },
    walls: [
      [3, 0],
      [3, 1],
      [3, 2],
      [5, 4],
    ],
    input: "foto",
    output: "factura",
    machines: ["arca", "vision"],
    goal: 3,
    solution: [
      [1, 1, m("vision", 1)],
      [1, 2, b(1)],
      [1, 3, b(0)],
      [2, 3, b(0)],
      [3, 3, m("arca", 0)],
      [4, 3, b(0)],
      [5, 3, b(0)],
    ],
  },
  {
    title: { es: "Planta conectada", en: "Connected plant" },
    hint: {
      es: "Ojo con la máquina de Excel manual: arruina todo lo que toca. No hace falta usarla.",
      en: "Watch out for the manual Excel machine: it ruins everything it touches. You don't need it.",
    },
    real: {
      es: "En la planta real, 2 ESP32 y 4 barreras ópticas cuentan cada unidad, y la IA conectada por MCP arma reportes a pedido.",
      en: "In the real plant, 2 ESP32s and 4 optical barriers count every unit, and AI connected over MCP builds reports on demand.",
    },
    cols: 7,
    rows: 5,
    source: { x: 0, y: 4, dir: 0 },
    sink: { x: 6, y: 0 },
    walls: [
      [2, 2],
      [2, 3],
      [2, 4],
      [3, 3],
      [4, 2],
      [5, 2],
    ],
    input: "unidad",
    output: "reporte",
    machines: ["excel", "esp32", "mcp"],
    goal: 3,
    solution: [
      [1, 4, m("esp32", 3)],
      [1, 3, b(3)],
      [1, 2, b(3)],
      [1, 1, b(0)],
      [2, 1, b(0)],
      [3, 1, b(0)],
      [4, 1, m("mcp", 3)],
      [4, 0, b(0)],
      [5, 0, b(0)],
    ],
  },
];
