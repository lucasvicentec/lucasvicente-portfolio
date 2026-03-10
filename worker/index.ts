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

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
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

// Rate limiting básico por IP (en memoria del isolate)
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 10;

  const timestamps = (rateLimitMap.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxRequests) return true;

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";

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

  const turnstileValid = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, ip);
  if (!turnstileValid) {
    return jsonResponse({ error: "CAPTCHA verification failed." }, 403);
  }

  const result = await sendEmail(env, name, email, subject, message);
  if (!result.ok) {
    return jsonResponse({ error: `Failed to send email: ${result.error}` }, 500);
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
          const msg = err instanceof Error ? err.message : String(err);
          return jsonResponse({ error: `Unhandled: ${msg}` }, 500);
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
