# Portfolio profesional orientado a reclutadores técnicos

Portfolio de Lucas Vicente (`lucasvicentec`) enfocado en demostrar ejecución real, criterio técnico y ownership end-to-end.

## Este proyecto demuestra

- Diseño de arquitectura frontend con enfoque de producto y conversión.
- Integración CI/CD real con despliegue continuo en Cloudflare Workers.
- Optimización de rendimiento (lazy loading del shader con Three.js).
- Internacionalización funcional ES/EN.
- Mantenimiento iterativo en producción (UX, copy, SEO técnico).

## Ver portfolio

- Producción: `https://lucasvicente.es`

## Stack principal

- `React 19` + `TypeScript` + `Vite`
- `Tailwind CSS`
- `Three.js`
- `Cloudflare Workers`
- `GitHub Actions`

## Detalle técnico (engineering)

- `src/App.tsx`: layout principal, i18n ES/EN, casos de proyectos y CTA de contratación.
- `src/components/ui/liquid-shader.tsx`: shader de fondo con carga diferida.
- `index.html`: metadatos SEO + OpenGraph + JSON-LD.
- `.github/workflows/deploy-cloudflare-worker.yml`: pipeline de build/deploy.
- `wrangler.toml`: configuración de runtime/deploy en Cloudflare.

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

- Email: `contacto@lucasvicente.es`
- GitHub: `https://github.com/lucasvicentec`
- LinkedIn: `https://www.linkedin.com/in/lucas-esteban-vicente-cerri-3073a8330/`
