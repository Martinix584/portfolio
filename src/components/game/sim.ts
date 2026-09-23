import { DX, DY, MACHINES, type ItemType, type Level, type Tile } from "./levels";

export type Item = { id: number; x: number; y: number; type: ItemType; bad: boolean; age: number };
export type Poof = { id: number; x: number; y: number; ok: boolean };

export type SimState = {
  items: Item[];
  poofs: Poof[];
  nextId: number;
  tick: number;
  delivered: number;
  scrap: number;
};

export const SPAWN_EVERY = 3;
const MAX_AGE = 60;

export const key = (x: number, y: number) => `${x},${y}`;

export function emptySim(): SimState {
  return { items: [], poofs: [], nextId: 1, tick: 0, delivered: 0, scrap: 0 };
}

export function isWall(level: Level, x: number, y: number) {
  return level.walls.some(([wx, wy]) => wx === x && wy === y);
}

/** Avanza un tick: mueve cada pieza una celda, aplica máquinas, entrega o descarta, y genera nuevas piezas. */
export function step(level: Level, tiles: Record<string, Tile>, s: SimState, spawn: boolean): SimState {
  const items: Item[] = [];
  const poofs: Poof[] = [];
  let { delivered, scrap, nextId } = s;

  for (const it of s.items) {
    const atSource = it.x === level.source.x && it.y === level.source.y;
    const here = tiles[key(it.x, it.y)];
    const dir = atSource ? level.source.dir : here?.dir;
    if (dir === undefined || it.age > MAX_AGE) {
      scrap++;
      poofs.push({ id: it.id, x: it.x, y: it.y, ok: false });
      continue;
    }
    const nx = it.x + DX[dir];
    const ny = it.y + DY[dir];

    if (nx === level.sink.x && ny === level.sink.y) {
      const ok = !it.bad && it.type === level.output;
      if (ok) delivered++;
      else scrap++;
      poofs.push({ id: it.id, x: nx, y: ny, ok });
      continue;
    }

    const next = tiles[key(nx, ny)];
    const outOfGrid = nx < 0 || ny < 0 || nx >= level.cols || ny >= level.rows;
    if (outOfGrid || !next || isWall(level, nx, ny)) {
      scrap++;
      poofs.push({ id: it.id, x: it.x, y: it.y, ok: false });
      continue;
    }

    const moved: Item = { ...it, x: nx, y: ny, age: it.age + 1 };
    if (next.kind === "machine") {
      const def = MACHINES[next.id];
      if (def.from !== null && def.from === moved.type && def.to) moved.type = def.to;
      else moved.bad = true;
    }
    items.push(moved);
  }

  const tick = s.tick + 1;
  const sourceBusy = items.some((i) => i.x === level.source.x && i.y === level.source.y);
  if (spawn && tick % SPAWN_EVERY === 1 && !sourceBusy) {
    items.push({ id: nextId++, x: level.source.x, y: level.source.y, type: level.input, bad: false, age: 0 });
  }

  return { items, poofs, nextId, tick, delivered, scrap };
}
