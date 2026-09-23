"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronRight, Eraser, HardHat, RotateCcw, SkipForward, Trophy, X } from "lucide-react";
import { ui } from "@/content/ui";
import { useLang } from "@/lib/i18n";
import { SectionTitle } from "../SectionTitle";
import { ITEMS, LEVELS, MACHINES, type Cell, type Dir, type Level, type MachineId, type Tile } from "./levels";
import { emptySim, isWall, key, step, type SimState } from "./sim";

const TICK_MS = 450;

type Tool = { kind: "belt" } | { kind: "erase" } | { kind: "machine"; id: MachineId };

export function FactoryGame() {
  const { t } = useLang();
  const [levelIdx, setLevelIdx] = useState(0);
  const [finished, setFinished] = useState(false);

  return (
    <section id="simulador" className="relative border-t border-line bg-bg py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle label={t(ui.game.label)} title={t(ui.game.title)} intro={t(ui.game.intro)} />
          <a
            href="#contacto"
            className="flex items-center gap-2 rounded border border-line px-3 py-2 font-mono text-xs uppercase text-muted transition-colors hover:border-safety hover:text-safety"
          >
            <SkipForward className="h-4 w-4" /> {t(ui.game.skip)}
          </a>
        </div>

        <div className="mt-10">
          {finished ? (
            <Finished
              onReplay={() => {
                setLevelIdx(0);
                setFinished(false);
              }}
            />
          ) : (
            <Board
              key={levelIdx}
              level={LEVELS[levelIdx]}
              levelIdx={levelIdx}
              onNext={() => (levelIdx + 1 < LEVELS.length ? setLevelIdx(levelIdx + 1) : setFinished(true))}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function Board({ level, levelIdx, onNext }: { level: Level; levelIdx: number; onNext: () => void }) {
  const { t } = useLang();
  const [tiles, setTiles] = useState<Record<string, Tile>>({});
  const [tool, setTool] = useState<Tool>({ kind: "belt" });
  const [sim, setSim] = useState<SimState>(emptySim);
  const [solved, setSolved] = useState(false);
  const [visible, setVisible] = useState(false);

  const tilesRef = useRef(tiles);
  useEffect(() => {
    tilesRef.current = tiles;
  }, [tiles]);
  const solvedRef = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Solo corre la simulación cuando el tablero está en pantalla.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || solved) return;
    const id = setInterval(() => {
      // La parada de emergencia congela también el simulador.
      if (document.documentElement.classList.contains("halted")) return;
      setSim((s) => {
        // No largamos materia prima hasta que el jugador coloque algo, para no sumar descarte de entrada.
        const n = step(level, tilesRef.current, s, Object.keys(tilesRef.current).length > 0);
        if (n.delivered >= level.goal && !solvedRef.current) {
          solvedRef.current = true;
          setTimeout(() => setSolved(true), TICK_MS);
        }
        return n;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [visible, solved, level]);

  const isFixed = (x: number, y: number) =>
    (x === level.source.x && y === level.source.y) || (x === level.sink.x && y === level.sink.y) || isWall(level, x, y);

  const placeAt = useCallback(
    (x: number, y: number, t: Tile | null) => {
      setTiles((prev) => {
        const next = { ...prev };
        if (t?.kind === "machine") {
          // Cada máquina existe una sola vez: si ya estaba en otro lado, se mueve.
          for (const k of Object.keys(next)) {
            const v = next[k];
            if (v.kind === "machine" && v.id === t.id) delete next[k];
          }
        }
        if (t) next[key(x, y)] = t;
        else delete next[key(x, y)];
        return next;
      });
    },
    [],
  );

  // --- Interacción: tocar coloca/rota; arrastrar dibuja cintas con dirección automática ---
  const drag = useRef<{ start: Cell; last: Cell; moved: boolean } | null>(null);

  const cellFromEvent = (e: React.PointerEvent): Cell | null => {
    const r = gridRef.current?.getBoundingClientRect();
    if (!r) return null;
    const x = Math.floor(((e.clientX - r.left) / r.width) * level.cols);
    const y = Math.floor(((e.clientY - r.top) / r.height) * level.rows);
    if (x < 0 || y < 0 || x >= level.cols || y >= level.rows) return null;
    return { x, y };
  };

  const dirBetween = (a: Cell, b: Cell): Dir => (b.x > a.x ? 0 : b.y > a.y ? 1 : b.x < a.x ? 2 : 3);

  const tap = (c: Cell) => {
    if (isFixed(c.x, c.y)) return;
    const cur = tilesRef.current[key(c.x, c.y)];
    if (tool.kind === "erase") return placeAt(c.x, c.y, null);
    if (tool.kind === "belt") {
      if (cur) return placeAt(c.x, c.y, { ...cur, dir: ((cur.dir + 1) % 4) as Dir });
      return placeAt(c.x, c.y, { kind: "belt", dir: 0 });
    }
    if (cur?.kind === "machine" && cur.id === tool.id) {
      return placeAt(c.x, c.y, { ...cur, dir: ((cur.dir + 1) % 4) as Dir });
    }
    placeAt(c.x, c.y, { kind: "machine", id: tool.id, dir: cur?.dir ?? 0 });
  };

  /** Extiende el trazo una celda: orienta la celda anterior hacia la nueva y coloca cinta en la nueva. */
  const extend = (from: Cell, to: Cell) => {
    const d = dirBetween(from, to);
    const cur = tilesRef.current;
    const prevTile = cur[key(from.x, from.y)];
    const next = { ...cur };
    if (prevTile && !isFixed(from.x, from.y)) next[key(from.x, from.y)] = { ...prevTile, dir: d };
    if (!isFixed(to.x, to.y)) {
      const existing = cur[key(to.x, to.y)];
      next[key(to.x, to.y)] = existing?.kind === "machine" ? { ...existing, dir: d } : { kind: "belt", dir: d };
    }
    tilesRef.current = next;
    setTiles(next);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const c = cellFromEvent(e);
    if (!c) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { start: c, last: c, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const c = cellFromEvent(e);
    if (!c || (c.x === d.last.x && c.y === d.last.y)) return;
    if (tool.kind === "machine") return;
    // Avanza de a una celda (primero en X, después en Y) para no saltear casilleros en arrastres rápidos.
    while (d.last.x !== c.x || d.last.y !== c.y) {
      const nx = d.last.x + Math.sign(c.x - d.last.x);
      const ny = nx !== d.last.x ? d.last.y : d.last.y + Math.sign(c.y - d.last.y);
      const nextCell = { x: nx, y: ny };
      if (tool.kind === "erase") {
        if (!d.moved && !isFixed(d.start.x, d.start.y)) placeAt(d.start.x, d.start.y, null);
        if (!isFixed(nx, ny)) placeAt(nx, ny, null);
      } else {
        if (isWall(level, nx, ny)) break;
        extend(d.last, nextCell);
      }
      d.moved = true;
      d.last = nextCell;
      if (nx === level.sink.x && ny === level.sink.y) break;
    }
  };

  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    if (d && !d.moved) tap(d.start);
  };

  const reset = () => {
    setTiles({});
    setSim(emptySim());
  };

  const callEngineer = () => {
    const next: Record<string, Tile> = {};
    for (const [x, y, tl] of level.solution) next[key(x, y)] = tl;
    setTiles(next);
  };

  const placedMachines = new Set(
    Object.values(tiles)
      .filter((v): v is Extract<Tile, { kind: "machine" }> => v.kind === "machine")
      .map((v) => v.id),
  );

  const lastBad = sim.poofs.some((p) => !p.ok && p.x === level.sink.x && p.y === level.sink.y);
  const pct = (n: number, total: number) => `${(n / total) * 100}%`;

  return (
    <div ref={rootRef} className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* Tablero */}
      <div className="plate rounded-lg p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase">
          <span className="rounded-sm bg-safety px-2 py-0.5 font-semibold text-black">
            {t(ui.game.level)} {levelIdx + 1}/{LEVELS.length}
          </span>
          <span className="font-display text-xl font-extrabold normal-case tracking-wide sm:text-2xl">{t(level.title)}</span>
        </div>

        <div className="mx-auto w-full max-w-[560px]">
          <div
            ref={gridRef}
            className="relative grid touch-none select-none overflow-hidden rounded-md border-2 border-[#000] bg-[#0d0e0f]"
            style={{
              gridTemplateColumns: `repeat(${level.cols}, 1fr)`,
              aspectRatio: `${level.cols} / ${level.rows}`,
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (drag.current = null)}
          >
            {Array.from({ length: level.rows * level.cols }, (_, i) => {
              const x = i % level.cols;
              const y = Math.floor(i / level.cols);
              return <GridCell key={i} level={level} x={x} y={y} tile={tiles[key(x, y)]} sinkAlert={lastBad} />;
            })}

            {/* Piezas en movimiento */}
            {sim.items.map((it) => {
              const def = ITEMS[it.type];
              const Icon = it.bad ? X : def.icon;
              return (
                <div
                  key={it.id}
                  className="pointer-events-none absolute flex items-center justify-center"
                  style={{
                    left: pct(it.x, level.cols),
                    top: pct(it.y, level.rows),
                    width: pct(1, level.cols),
                    height: pct(1, level.rows),
                    transition: it.age === 0 ? "none" : `left ${TICK_MS}ms linear, top ${TICK_MS}ms linear`,
                  }}
                >
                  <div
                    className="flex h-[52%] w-[52%] items-center justify-center rounded-[5px] border-2 bg-[#0d0e0f] shadow-[0_2px_8px_rgb(0_0_0/0.6)]"
                    style={{ borderColor: it.bad ? "var(--red)" : def.color, color: it.bad ? "var(--red)" : def.color }}
                  >
                    <Icon className="h-[60%] w-[60%]" strokeWidth={2.4} />
                  </div>
                </div>
              );
            })}

            {/* Chispazos al entregar o descartar */}
            {sim.poofs.map((p) => (
              <motion.div
                key={`p${p.id}-${sim.tick}`}
                initial={{ scale: 0.4, opacity: 0.9 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-none absolute rounded-full"
                style={{
                  left: pct(p.x, level.cols),
                  top: pct(p.y, level.rows),
                  width: pct(1, level.cols),
                  height: pct(1, level.rows),
                  background: `radial-gradient(circle, ${p.ok ? "var(--green)" : "var(--red)"} 0%, transparent 65%)`,
                }}
              />
            ))}

            <AnimatePresence>
              {solved && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-black/75 p-4 backdrop-blur-[2px]"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <motion.div
                    initial={{ scale: 0.85, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    className="max-w-sm rounded-md border border-led/50 bg-panel p-4 text-center sm:p-6"
                  >
                    <p className="font-display text-2xl font-black uppercase text-led sm:text-3xl">✓ {t(ui.game.solved)}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted">{t(ui.game.realWorld)}</p>
                    <p className="mt-1 text-sm leading-snug text-ink/90">{t(level.real)}</p>
                    <button
                      onClick={onNext}
                      className="mt-4 inline-flex items-center gap-2 rounded bg-safety px-4 py-2 font-mono text-xs font-semibold uppercase text-black"
                    >
                      {levelIdx + 1 < LEVELS.length ? t(ui.game.next) : t(ui.game.done)} <ChevronRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Receta del nivel */}
          <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted">
            <ItemChip type={level.input} />
            {level.machines
              .filter((id) => MACHINES[id].from !== null)
              .map((id) => (
                <span key={id} className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> <span className="text-ink/70">{MACHINES[id].label}</span>
                </span>
              ))}
            <ArrowRight className="h-3 w-3" />
            <ItemChip type={level.output} />
          </div>
        </div>
      </div>

      {/* Panel de control */}
      <div className="flex flex-col gap-4">
        <div className="plate rounded-lg p-4">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{t(ui.game.howto)}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <ToolButton active={tool.kind === "belt"} onClick={() => setTool({ kind: "belt" })}>
              <span className="belt h-4 w-6 rounded-[2px]" /> {t(ui.game.belt)}
            </ToolButton>
            {level.machines.map((id) => {
              const def = MACHINES[id];
              const Icon = def.icon;
              return (
                <ToolButton
                  key={id}
                  active={tool.kind === "machine" && tool.id === id}
                  onClick={() => setTool({ kind: "machine", id })}
                  dim={placedMachines.has(id)}
                  danger={def.from === null}
                >
                  <Icon className="h-4 w-4" /> {def.label}
                </ToolButton>
              );
            })}
            <ToolButton active={tool.kind === "erase"} onClick={() => setTool({ kind: "erase" })}>
              <Eraser className="h-4 w-4" /> {t(ui.game.erase)}
            </ToolButton>
          </div>
          <p className="mt-3 text-sm leading-snug text-ink/80">{t(level.hint)}</p>
        </div>

        <div className="plate grid grid-cols-3 gap-2 rounded-lg p-4 text-center font-mono">
          <Counter label={t(ui.game.delivered)} value={`${Math.min(sim.delivered, level.goal)}/${level.goal}`} tone="led" />
          <Counter label={t(ui.game.scrap)} value={String(sim.scrap)} tone="alarm" />
          <div className="flex flex-col items-center justify-center gap-2">
            <button
              onClick={reset}
              className="flex items-center gap-1 text-[10px] uppercase text-muted transition-colors hover:text-ink"
            >
              <RotateCcw className="h-3.5 w-3.5" /> {t(ui.game.reset)}
            </button>
            <button
              onClick={callEngineer}
              title="Autocompletar"
              className="flex items-center gap-1 text-[10px] uppercase text-muted transition-colors hover:text-safety"
            >
              <HardHat className="h-3.5 w-3.5" /> {t({ es: "Ingeniero", en: "Engineer" })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GridCell({ level, x, y, tile, sinkAlert }: { level: Level; x: number; y: number; tile?: Tile; sinkAlert: boolean }) {
  const { t } = useLang();
  const base = "relative border-[0.5px] border-white/[0.05]";

  if (isWall(level, x, y)) {
    return (
      <div className={`${base} p-[6%]`}>
        <div className="hazard h-full w-full rounded-[3px] opacity-70" />
      </div>
    );
  }
  if (x === level.source.x && y === level.source.y) {
    const Icon = ITEMS[level.input].icon;
    return (
      <div className={`${base} flex flex-col items-center justify-center bg-rust/15 text-rust`}>
        <Icon className="h-[38%] w-[38%]" />
        <span className="font-mono text-[8px] font-semibold uppercase sm:text-[10px]">{t(ui.game.source)}</span>
      </div>
    );
  }
  if (x === level.sink.x && y === level.sink.y) {
    const Icon = ITEMS[level.output].icon;
    return (
      <div
        className={`${base} flex flex-col items-center justify-center transition-colors ${
          sinkAlert ? "bg-alarm/30 text-alarm" : "bg-led/15 text-led"
        }`}
      >
        <Icon className="h-[38%] w-[38%]" />
        <span className="font-mono text-[8px] font-semibold uppercase sm:text-[10px]">{t(ui.game.sink)}</span>
      </div>
    );
  }
  if (!tile) return <div className={`${base} hover:bg-white/[0.04]`} />;

  if (tile.kind === "belt") {
    return (
      <div className={base}>
        <div className="absolute inset-[14%] overflow-hidden rounded-[3px]" style={{ transform: `rotate(${tile.dir * 90}deg)` }}>
          <div className="belt h-full w-full" />
          <ChevronRight className="absolute inset-0 m-auto h-[70%] w-[70%] text-safety/80" strokeWidth={2.5} />
        </div>
      </div>
    );
  }

  const def = MACHINES[tile.id];
  const Icon = def.icon;
  const danger = def.from === null;
  return (
    <div className={`${base} p-[6%]`}>
      <div
        className={`relative flex h-full w-full flex-col items-center justify-center rounded-[4px] border-2 ${
          danger ? "border-alarm bg-alarm/15 text-alarm" : "border-safety bg-safety/15 text-safety"
        }`}
      >
        <Icon className="h-[42%] w-[42%]" />
        <span className="hidden max-w-full truncate px-0.5 font-mono text-[9px] font-semibold sm:block">{def.label}</span>
        {/* Indicador de salida */}
        <div className="absolute inset-0" style={{ transform: `rotate(${tile.dir * 90}deg)` }}>
          <div
            className={`absolute top-1/2 -right-[3px] h-0 w-0 -translate-y-1/2 border-y-[5px] border-l-[6px] border-y-transparent ${
              danger ? "border-l-alarm" : "border-l-safety"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

function ItemChip({ type }: { type: keyof typeof ITEMS }) {
  const { t } = useLang();
  const d = ITEMS[type];
  const Icon = d.icon;
  return (
    <span className="flex items-center gap-1.5 rounded-sm border px-1.5 py-0.5" style={{ borderColor: d.color, color: d.color }}>
      <Icon className="h-3 w-3" /> {t(d.label)}
    </span>
  );
}

function ToolButton({
  active,
  onClick,
  children,
  dim,
  danger,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dim?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-2 rounded border px-2.5 py-2 font-mono text-xs transition-colors ${
        active
          ? danger
            ? "border-alarm bg-alarm/20 text-alarm"
            : "border-safety bg-safety/15 text-safety"
          : "border-line text-ink/80 hover:border-muted"
      } ${dim && !active ? "opacity-50" : ""}`}
    >
      {children}
    </button>
  );
}

function Counter({ label, value, tone }: { label: string; value: string; tone: "led" | "alarm" }) {
  return (
    <div className="rounded-md bg-[#0b0c0d] px-2 py-2">
      <p className={`text-2xl font-semibold tabular-nums ${tone === "led" ? "text-led" : "text-alarm"}`}>{value}</p>
      <p className="text-[9px] uppercase text-muted">{label}</p>
    </div>
  );
}

function Finished({ onReplay }: { onReplay: () => void }) {
  const { t } = useLang();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="plate rivets mx-auto max-w-2xl rounded-lg p-8 text-center sm:p-12"
    >
      <Trophy className="mx-auto h-12 w-12 text-safety" />
      <p className="mt-4 font-display text-4xl font-black uppercase sm:text-5xl">{t(ui.game.done)}</p>
      <p className="mx-auto mt-3 max-w-md text-muted">{t(ui.game.doneText)}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href="#contacto"
          className="flex items-center gap-2 rounded bg-safety px-4 py-2.5 font-mono text-xs font-semibold uppercase text-black"
        >
          {t(ui.game.toContact)} <ArrowRight className="h-4 w-4" />
        </a>
        <button
          onClick={onReplay}
          className="flex items-center gap-2 rounded border border-line px-4 py-2.5 font-mono text-xs uppercase text-muted hover:text-ink"
        >
          <RotateCcw className="h-4 w-4" /> {t(ui.game.replay)}
        </button>
      </div>
    </motion.div>
  );
}
