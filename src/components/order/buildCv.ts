import { experience, skills, stations, type Area, type SkillGroup, type Station } from "@/content/data";

export type CvOrder = { client: string; position: string; areas: Area[]; number: string };

export type BuiltCv = {
  order: CvOrder;
  stations: Station[];
  extraLines: (typeof experience.extra)[number][];
  skills: { group: SkillGroup; relevant: boolean }[];
};

const overlap = (a: Area[], b: Area[]) => a.filter((x) => b.includes(x)).length;

/** Elige y ordena proyectos y habilidades según las áreas pedidas en la orden. */
export function buildCv(order: CvOrder): BuiltCv {
  const ranked = stations
    .map((s, i) => ({ s, i, score: overlap(s.areas, order.areas) }))
    .sort((a, b) => b.score - a.score || a.i - b.i);

  // Siempre al menos 4 proyectos: los relevantes primero, completando con el resto.
  const relevant = ranked.filter((r) => r.score > 0);
  const chosen = (relevant.length >= 4 ? relevant : ranked.slice(0, Math.max(4, relevant.length))).map((r) => r.s);

  const extraLines = experience.extra.filter((e) => overlap(e.areas, order.areas) > 0);

  const skillList = skills
    .map((group, i) => ({ group, i, relevant: overlap(group.areas, order.areas) > 0 }))
    .sort((a, b) => Number(b.relevant) - Number(a.relevant) || a.i - b.i)
    .map(({ group, relevant }) => ({ group, relevant }));

  return { order, stations: chosen, extraLines, skills: skillList };
}
