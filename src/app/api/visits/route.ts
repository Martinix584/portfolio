import { Redis } from "@upstash/redis";

// Contador de visitas del "Sensor S-01".
// Funciona con Upstash Redis (integración de Vercel Marketplace). Sin variables de entorno devuelve count: null
// y el header muestra "en línea" sin número.

const KEY = "portfolio:visits";

function getRedis() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function GET() {
  const redis = getRedis();
  if (!redis) return Response.json({ count: null });
  try {
    const count = (await redis.get<number>(KEY)) ?? 0;
    return Response.json({ count });
  } catch {
    return Response.json({ count: null });
  }
}

export async function POST() {
  const redis = getRedis();
  if (!redis) return Response.json({ count: null });
  try {
    const count = await redis.incr(KEY);
    return Response.json({ count });
  } catch {
    return Response.json({ count: null });
  }
}
