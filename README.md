# Portfolio · Lucas Vicente

Portfolio personal de [Lucas Vicente](https://lucasvicente.es). Diseño limpio enfocado a recruiters técnicos: casos reales con métricas verificables, decisiones técnicas explícitas y CTA de contacto sin fricción.

**Producción**: [lucasvicente.es](https://lucasvicente.es)

## Stack

- **Frontend**: React 19, TypeScript, Vite 7
- **UI**: Tailwind CSS, [shadcn/ui](https://ui.shadcn.com/) (Radix), Lucide icons
- **Backend**: Cloudflare Workers (formulario de contacto + Turnstile anti-spam)
- **CI/CD**: GitHub Actions → Cloudflare Workers

## Estructura

```
src/
  App.tsx                 Layout principal, casos, copy bilingüe ES/EN
  main.tsx                Entry point
  index.css               Tema claro (white + neutrals + acento azul)
  components/ui/          Componentes shadcn/ui (Button, Card, Dialog, ...)
  lib/utils.ts            Helper cn() (clsx + tailwind-merge)
worker/
  index.ts                Endpoint /api/contact con verificación Turnstile
public/
  cv-lucas-vicente.pdf    CV descargable
  foto.jpg                Avatar
  images/                 Capturas de proyectos
.github/workflows/        Pipeline de despliegue a Cloudflare
```

## Desarrollo local

Requiere Node 20+ (recomendado 22). Hay un `.nvmrc`.

```bash
npm install
npm run dev
```

App disponible en `http://localhost:5173/`.

## Build y deploy

```bash
npm run build         # tsc + vite build
npm run preview       # preview del build
npm run cf:dev        # build + wrangler dev (worker local)
npm run deploy:cf     # build + wrangler deploy (producción)
```

## Calidad

```bash
npm run lint
```

## Contacto

- Email: [contacto@lucasvicente.es](mailto:contacto@lucasvicente.es)
- LinkedIn: [Lucas Esteban Vicente Cerri](https://www.linkedin.com/in/lucas-esteban-vicente-cerri-3073a8330/)
- GitHub: [@lucasvicentec](https://github.com/lucasvicentec)
- Reservar 30 min: [Calendly](https://calendly.com/lucasvicentecerri6/30min)

## Licencia

MIT — ver [LICENSE](./LICENSE).
