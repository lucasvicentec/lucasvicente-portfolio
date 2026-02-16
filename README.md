# lucasvicente-portfolio

Portfolio personal de Lucas Vicente (lucksgg7).

Este repo muestra una landing técnica enfocada en:
- perfil profesional real (Full Stack, automatización, APIs, infra),
- proyectos de GitHub,
- despliegue automático en Cloudflare Workers.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- shadcn/ui structure
- Three.js para el fondo shader interactivo
- Cloudflare Workers + GitHub Actions para CI/CD

## Desarrollo local

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 3000
```

## Build

```bash
npm run build
```

## Deploy

El deploy es automático al hacer push a `main` usando:
- `.github/workflows/deploy-cloudflare-worker.yml`
- `wrangler.toml`

Secrets requeridos en GitHub:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Dominio

Rutas configuradas para:
- `lucasvicente.es/*`
- `www.lucasvicente.es/*`

## Contacto

- GitHub: `https://github.com/lucksgg7`
- LinkedIn: `https://www.linkedin.com/in/lucas-esteban-vicente-cerri-3073a8330/`
- Discord: `lucksgg7`
