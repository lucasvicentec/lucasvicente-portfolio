# Portfolio profesional orientado a reclutadores tecnicos

Portfolio de Lucas Vicente (`lucksgg7`) enfocado en demostrar ejecucion real, criterio tecnico y ownership end-to-end.

## Este proyecto demuestra

- Diseno de arquitectura frontend con enfoque producto y conversion.
- Integracion CI/CD real con despliegue continuo en Cloudflare Workers.
- Optimizacion de rendimiento (lazy loading del shader con Three.js).
- Internacionalizacion funcional ES/EN.
- Mantenimiento iterativo en produccion (UX, copy, SEO tecnico).

## Ver portfolio

- Produccion: `https://lucasvicente.es`

## Stack principal

- `React 19` + `TypeScript` + `Vite`
- `Tailwind CSS`
- `Three.js`
- `Cloudflare Workers`
- `GitHub Actions`

## Detalle tecnico (engineering)

- `src/App.tsx`: layout principal, i18n ES/EN, casos de proyectos y CTA de contratacion.
- `src/components/ui/liquid-shader.tsx`: shader de fondo con carga diferida.
- `index.html`: metadatos SEO + OpenGraph + JSON-LD.
- `.github/workflows/deploy-cloudflare-worker.yml`: pipeline de build/deploy.
- `wrangler.toml`: configuracion de runtime/deploy en Cloudflare.

## Desarrollo local

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 3000
```

## Calidad

```bash
npm run lint
npm run build
```

## Contacto

- GitHub: `https://github.com/lucksgg7`
- LinkedIn: `https://www.linkedin.com/in/lucas-esteban-vicente-cerri-3073a8330/`
