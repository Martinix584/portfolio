# MP·WORKS — Portfolio de Martín Porollan

Portfolio con temática de fábrica, hecho con Next.js 16, Tailwind 4 y Motion.

## Recorrido

1. **Portón**: una persiana metálica que se abre con el scroll y deja ver la credencial de operario.
2. **Línea de producción**: una pieza baja por la cinta y cambia de forma en cada estación (cada una es un proyecto: Problema → Solución → Stack → Impacto).
3. **Pañol de herramientas**: habilidades, estudios e idiomas.
4. **Simulador**: minijuego tipo Factorio con 3 niveles, que se puede saltar.
5. **Orden de producción**: arma un CV a medida y lo descarga como PDF desde el diálogo de impresión.
6. **Siempre visibles**: botón de parada de emergencia (contacto), sensor de visitas, selector ES/EN y descarga del CV.

## Editar contenido

- Textos, proyectos, métricas y habilidades: `src/content/data.ts`
- Textos de interfaz: `src/content/ui.ts`
- Niveles del juego: `src/components/game/levels.ts`
- CVs descargables: `public/cv/` (los originales están en `cv-source/`)

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Deploy en Vercel

1. Subí el repo a GitHub e importalo en [vercel.com/new](https://vercel.com/new). No hace falta configurar nada más.
2. **Contador de visitas (opcional)**: en el proyecto de Vercel, entrá a *Storage → Marketplace → Upstash Redis → Connect*. Eso crea las variables `KV_REST_API_URL` y `KV_REST_API_TOKEN`. Hacé un redeploy y el sensor empieza a mostrar el número. Sin esas variables, el sensor muestra "en línea" y no cuenta.
