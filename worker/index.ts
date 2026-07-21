/**
 * Cloudflare Worker — Portfolio lucasvicente.es
 *
 * Secrets necesarios (configurar con `wrangler secret put <NAME>`):
 *   RESEND_API_KEY        — API key de Resend (https://resend.com)
 *   TURNSTILE_SECRET_KEY  — Secret key de Cloudflare Turnstile
 *
 * Pasos de configuración:
 *   1. Resend: crear cuenta → verificar dominio lucasvicente.es → copiar API key
 *   2. Turnstile: Cloudflare Dashboard → Turnstile → Add Widget → copiar site key (va en el frontend) y secret key
 *   3. wrangler secret put RESEND_API_KEY
 *   4. wrangler secret put TURNSTILE_SECRET_KEY
 */

interface Env {
  ASSETS: Fetcher;
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

const CONTACT_EMAIL = "lucasvicentecerri6@gmail.com";
// Cambiar a "Portfolio Lucas Vicente <noreply@lucasvicente.es>" cuando verifiques el dominio en Resend
const FROM_EMAIL = "onboarding@resend.dev";

// CSP: 'unsafe-inline' es necesario por el script inline anti-FOUC del tema y
// por los estilos inline de React/Radix. El resto queda restringido a origenes
// concretos (Turnstile y Google Fonts son los unicos externos del sitio).
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

// Origenes permitidos para POST /api/contact.
const ALLOWED_ORIGINS = new Set([
  "https://lucasvicente.es",
  "https://www.lucasvicente.es",
  "http://localhost:5173",
  "http://localhost:8787",
]);

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("Origin");
  // Sin cabecera Origin no podemos decidir; Turnstile sigue siendo la barrera real.
  if (!origin) return true;
  return ALLOWED_ORIGINS.has(origin);
}

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": CSP,
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

function addSecurityHeaders(response: Response): Response {
  const newResponse = new Response(response.body, response);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    newResponse.headers.set(key, value);
  }
  return newResponse;
}

function jsonResponse(body: Record<string, unknown>, status: number): Response {
  return addSecurityHeaders(
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    }),
  );
}

async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

async function sendEmail(
  env: Env,
  name: string,
  email: string,
  subject: string,
  message: string,
): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      reply_to: email,
      subject: `[Portfolio] ${subject}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    return { ok: false, error: body };
  }
  return { ok: true };
}

// Rate limiting best-effort por IP.
// OJO: vive en la memoria del isolate y los isolates de Workers son efimeros y
// distribuidos, asi que NO es una barrera fuerte (solo frena abuso trivial).
// La proteccion real es Turnstile + reglas de Rate Limiting de Cloudflare.
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 10;

  // Purga de IPs sin actividad reciente para que el Map no crezca sin limite.
  if (rateLimitMap.size > 5_000) {
    for (const [key, times] of rateLimitMap) {
      if (times.every((t) => now - t >= windowMs)) rateLimitMap.delete(key);
    }
  }

  const timestamps = (rateLimitMap.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxRequests) return true;

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";

  if (!isAllowedOrigin(request)) {
    return jsonResponse({ error: "Forbidden origin." }, 403);
  }

  if (isRateLimited(ip)) {
    return jsonResponse({ error: "Too many requests. Try again later." }, 429);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonResponse({ error: "Invalid JSON." }, 400);
  }

  const { name, email, subject, message, turnstileToken } = body as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    turnstileToken?: string;
  };

  if (!name || !email || !subject || !message || !turnstileToken) {
    return jsonResponse({ error: "Missing required fields." }, 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return jsonResponse({ error: "Invalid email." }, 400);
  }

  if (name.length > 100 || subject.length > 200 || message.length > 5000) {
    return jsonResponse({ error: "Field too long." }, 400);
  }

  // El asunto viaja a una cabecera de email: fuera saltos de linea.
  const safeSubject = subject.replace(/[
]+/g, " ").trim();

  const turnstileValid = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, ip);
  if (!turnstileValid) {
    return jsonResponse({ error: "CAPTCHA verification failed." }, 403);
  }

  const result = await sendEmail(env, name, email, safeSubject, message);
  if (!result.ok) {
    // El detalle solo a logs; al cliente un mensaje generico.
    console.error("Resend error:", result.error);
    return jsonResponse({ error: "No se pudo enviar el mensaje. Intentalo de nuevo mas tarde." }, 500);
  }

  return jsonResponse({ ok: true }, 200);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Contact API
    if (url.pathname === "/api/contact") {
      if (request.method === "POST") {
        try {
          return await handleContact(request, env);
        } catch (err) {
          console.error("Unhandled contact error:", err);
          return jsonResponse({ error: "Error interno." }, 500);
        }
      }
      return jsonResponse({ error: "Method not allowed." }, 405);
    }

    // Serve static assets
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) {
      return addSecurityHeaders(response);
    }

    // SPA fallback: any non-asset route returns index.html
    if (!url.pathname.includes(".")) {
      return addSecurityHeaders(await env.ASSETS.fetch(new Request(new URL("/index.html", url), request)));
    }

    return addSecurityHeaders(response);
  },
};
