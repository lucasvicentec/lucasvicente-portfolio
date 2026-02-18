# Lucas Vicente Portfolio

Portfolio profesional de Lucas Vicente (`lucksgg7`) construido para mostrar capacidad real de ejecucion full-stack: producto, backend, infraestructura y despliegue.

No es una landing de plantilla. Este repo esta mantenido como software de produccion:
- interfaz bilingue (ES/EN),
- casos tecnicos con foco en reto/arquitectura/impacto,
- build reproducible,
- despliegue automatico en Cloudflare Workers con GitHub Actions.

## Que demuestra este proyecto

- Capacidad de llevar una web desde idea hasta deploy continuo.
- Criterio de producto: estructura pensada para conversion de recruiter/cliente.
- Criterio tecnico: React + TypeScript + optimizacion de carga (lazy loading del shader).
- Mantenimiento real: iteracion continua sobre contenido, UX y arquitectura.

## Stack

- `React 19` + `TypeScript` + `Vite`
- `Tailwind CSS`
- `Three.js` (fondo interactivo)
- `Cloudflare Workers` + `Wrangler`
- `GitHub Actions` (CI/CD)

## Estructura clave

- `src/App.tsx`: layout principal, i18n ES/EN, casos de proyectos y CTA de contratacion.
- `src/components/ui/liquid-shader.tsx`: shader de fondo con Three.js (cargado de forma diferida).
- `index.html`: metadatos SEO + OpenGraph + JSON-LD.
- `.github/workflows/deploy-cloudflare-worker.yml`: pipeline de build/deploy.
- `wrangler.toml`: configuracion de Cloudflare Worker.

## Desarrollo local

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 3000
```

## Calidad y build

```bash
npm run lint
npm run build
```

## Deploy

El deploy a produccion se ejecuta al hacer push en `main`.

Requisitos de secrets en GitHub:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Comandos utiles:

```bash
npm run deploy:cf
npm run cf:dev
```

## Dominio

Configurado para:
- `lucasvicente.es/*`
- `www.lucasvicente.es/*`

## Contacto

- GitHub: `https://github.com/lucksgg7`
- LinkedIn: `https://www.linkedin.com/in/lucas-esteban-vicente-cerri-3073a8330/`
