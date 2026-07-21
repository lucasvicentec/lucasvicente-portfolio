// Genera public/images/farmacenter-arquitectura.png
// Diagrama de arquitectura ANONIMIZADO (NDA-safe): solo la forma del sistema.
// NO incluye: nombre del cliente, repos, dominios, variables de entorno,
// tokens, terceros ni datos de negocio.
// Uso desde la raíz del repo:  node scripts/generate-arch-diagram.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const OUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..", "public", "images", "farmacenter-arquitectura.png"
);

const F = "Inter, 'Segoe UI', system-ui, -apple-system, sans-serif";
const M = "'Cascadia Code', Consolas, ui-monospace, monospace";

const channels = ["Web", "WhatsApp", "Messenger", "Voz en tiempo real", "Panel admin"];

const chBoxes = channels.map((c, i) => {
  const x = 68 + i * 216;
  return `
  <rect x="${x}" y="156" width="200" height="62" rx="12" fill="#16161A" stroke="#27272A"/>
  <text x="${x + 100}" y="194" font-family="${F}" font-size="17" font-weight="600"
        fill="#E4E4E7" text-anchor="middle">${c}</text>
  <line x1="${x + 100}" y1="218" x2="${x + 100}" y2="236" stroke="#3F3F46" stroke-width="1.5"/>`;
}).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">
  <defs>
    <marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="#52525B"/>
    </marker>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0 L0 0 0 40" fill="none" stroke="#ffffff" stroke-opacity="0.022" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="760" fill="#0A0A0B"/>
  <rect width="1200" height="760" fill="url(#grid)"/>

  <text x="68" y="64" font-family="${F}" font-size="30" font-weight="800" fill="#FFFFFF"
        letter-spacing="-0.5">Arquitectura del sistema</text>
  <text x="68" y="94" font-family="${F}" font-size="16" fill="#A1A1AA">Atención y pedidos con IA multicanal · diagrama anonimizado</text>

  <rect x="980" y="44" width="152" height="30" rx="15" fill="#2E2410" stroke="#7C5E10"/>
  <text x="1056" y="64" font-family="${F}" font-size="13" font-weight="600" fill="#E3B341"
        text-anchor="middle">Detalles bajo NDA</text>

  <text x="68" y="140" font-family="${F}" font-size="12" font-weight="700" fill="#71717A"
        letter-spacing="1.6">CANALES DE ENTRADA</text>
  ${chBoxes}

  <line x1="168" y1="236" x2="1032" y2="236" stroke="#3F3F46" stroke-width="1.5"/>
  <line x1="600" y1="236" x2="600" y2="258" stroke="#52525B" stroke-width="2" marker-end="url(#a)"/>

  <rect x="68" y="266" width="1064" height="106" rx="14" fill="#101420" stroke="#2563EB" stroke-width="1.5"/>
  <text x="92" y="300" font-family="${F}" font-size="19" font-weight="700" fill="#FFFFFF">Agente IA · cerebro único compartido</text>
  <text x="92" y="328" font-family="${F}" font-size="15" fill="#A1A1AA">Tool-calling con acceso real a catálogo y pedidos · máquina de estados de conversación</text>
  <text x="92" y="352" font-family="${F}" font-size="15" fill="#A1A1AA">Guardrails sanitarios · derivación a operador humano · proveedor LLM elegido por caso de uso</text>

  <line x1="600" y1="372" x2="600" y2="396" stroke="#52525B" stroke-width="2" marker-end="url(#a)"/>

  <rect x="68" y="404" width="1064" height="88" rx="14" fill="#16161A" stroke="#27272A"/>
  <text x="92" y="436" font-family="${F}" font-size="19" font-weight="700" fill="#FFFFFF">API REST · única dueña del esquema</text>
  <text x="92" y="464" font-family="${F}" font-size="15" fill="#A1A1AA">Validación de contratos · rate limit · webhooks firmados (HMAC + anti-replay) · logs con PII redactada</text>

  <line x1="600" y1="492" x2="600" y2="516" stroke="#52525B" stroke-width="2" marker-end="url(#a)"/>

  <text x="68" y="546" font-family="${F}" font-size="12" font-weight="700" fill="#71717A"
        letter-spacing="1.6">PERSISTENCIA</text>
  <rect x="68" y="558" width="340" height="72" rx="12" fill="#14161A" stroke="#27272A"/>
  <text x="238" y="588" font-family="${F}" font-size="17" font-weight="600" fill="#E4E4E7" text-anchor="middle">PostgreSQL</text>
  <text x="238" y="611" font-family="${F}" font-size="13.5" fill="#8A8A93" text-anchor="middle">RLS por rol · transacciones atómicas</text>

  <rect x="430" y="558" width="340" height="72" rx="12" fill="#14161A" stroke="#27272A"/>
  <text x="600" y="588" font-family="${F}" font-size="17" font-weight="600" fill="#E4E4E7" text-anchor="middle">Auth</text>
  <text x="600" y="611" font-family="${F}" font-size="13.5" fill="#8A8A93" text-anchor="middle">sesiones JWT · OAuth</text>

  <rect x="792" y="558" width="340" height="72" rx="12" fill="#14161A" stroke="#27272A"/>
  <text x="962" y="588" font-family="${F}" font-size="17" font-weight="600" fill="#E4E4E7" text-anchor="middle">Storage</text>
  <text x="962" y="611" font-family="${F}" font-size="13.5" fill="#8A8A93" text-anchor="middle">imágenes de catálogo</text>

  <rect x="68" y="656" width="1064" height="56" rx="12" fill="#0E0F12" stroke="#27272A" stroke-dasharray="5 4"/>
  <text x="92" y="690" font-family="${M}" font-size="14.5" fill="#8A8A93">CDN/WAF  →  Nginx (reverse proxy, TLS)  →  Docker Swarm  ·  2 réplicas, rollback automático, healthchecks</text>

  <text x="68" y="738" font-family="${F}" font-size="12.5" fill="#5A5A63">Flujo crítico: cotización (precios congelados en servidor) → pedido → decremento de stock, en transacción atómica.</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log("Diagrama generado ->", OUT);
