import { useEffect, useState } from "react";
import { ArrowUpRight, Linkedin, Mail, Sparkles } from "lucide-react";
import {
  SiDocker,
  SiGithubactions,
  SiJavascript,
  SiLinux,
  SiNginx,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { InteractiveNebulaShader } from "@/components/ui/liquid-shader";

const projects = [
  {
    title: "MD-Ingelligence",
    description:
      "Proyecto publico enfocado en automatizacion, integraciones y herramientas para sistemas reales.",
    type: "Automation / Integrations",
    href: "http://md.lucasvicente.es/",
  },
  {
    title: "Hytalia (www.hytalia.net)",
    description:
      "Network usando motor de Hytale, web propia, tienda, sistemas internos, APIs e infraestructura.",
    type: "Network / Infrastructure",
    href: "https://www.hytalia.net",
  },
];

const stack = [
  { label: "TypeScript", icon: SiTypescript },
  { label: "JavaScript", icon: SiJavascript },
  { label: "Python", icon: SiPython },
  { label: "React", icon: SiReact },
  { label: "Vite", icon: SiVite },
  { label: "Tailwind", icon: SiTailwindcss },
  { label: "Docker", icon: SiDocker },
  { label: "Nginx", icon: SiNginx },
  { label: "GitHub Actions", icon: SiGithubactions },
  { label: "PostgreSQL", icon: SiPostgresql },
  { label: "SQLite", icon: SiSqlite },
  { label: "Redis", icon: SiRedis },
  { label: "Linux", icon: SiLinux },
];

function App() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [commitStats, setCommitStats] = useState<{ total: number | null; month: number | null }>({
    total: null,
    month: null,
  });
  const t =
    lang === "es"
      ? {
          projects: "Proyectos",
          contact: "Contacto",
          github: "Github",
          hey: "Hey, soy Lucas (Lucks)",
          title: "Desarrollador Full Stack.",
          description:
            "Trabajo en paneles, APIs, automatizacion, servidores e infraestructura.",
          current:
            "Proyecto actual: Hytalia (Network + Sistemas propios) y construyendo en UEFN (Unreal Engine for Fortnite)",
          total: "Commits totales",
          month: "Commits este mes",
          stack: "Stack Tecnico",
          viewProjects: "Ver proyectos",
          goGithub: "Ir a Github",
          publicProjects: "Proyectos publicos",
          seeProject: "Ver proyecto",
          contactTitle: "Contacto",
          contactText: "Si quieres colaborar o hablar de un proyecto, puedes escribirme directamente por email.",
          sendEmail: "Enviar email",
        }
      : {
          projects: "Projects",
          contact: "Contact",
          github: "Github",
          hey: "Hey, I'm Lucas (Lucks)",
          title: "Full Stack Developer.",
          description:
            "I build dashboards, APIs, automation, servers, and infrastructure.",
          current:
            "Current project: Hytalia (Network + internal systems) and building in UEFN (Unreal Engine for Fortnite)",
          total: "Total commits",
          month: "Commits this month",
          stack: "Tech Stack",
          viewProjects: "View projects",
          goGithub: "Open Github",
          publicProjects: "Public projects",
          seeProject: "View project",
          contactTitle: "Contact",
          contactText: "If you want to collaborate or discuss a project, send me an email directly.",
          sendEmail: "Send email",
        };

  useEffect(() => {
    const loadCommits = async () => {
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/lucksgg7");
        if (!res.ok) return;

        const data = (await res.json()) as {
          total: Record<string, number>;
          contributions: Array<{ date: string; count: number }>;
        };

        const now = new Date();
        const y = now.getUTCFullYear();
        const m = now.getUTCMonth();

        const total = Object.values(data.total ?? {}).reduce((acc, value) => acc + value, 0);
        const month = (data.contributions ?? []).reduce((acc, item) => {
          const d = new Date(`${item.date}T00:00:00Z`);
          if (d.getUTCFullYear() === y && d.getUTCMonth() === m) return acc + item.count;
          return acc;
        }, 0);

        setCommitStats({ total, month });
      } catch {
        setCommitStats({ total: null, month: null });
      }
    };

    loadCommits();
  }, []);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <InteractiveNebulaShader className="opacity-95" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <header className="mx-auto w-full max-w-5xl rounded-full border border-white/15 bg-black/55 p-2 backdrop-blur-xl">
          <nav className="flex items-center justify-between gap-3 text-sm text-white/80">
            <a href="#inicio" className="flex items-center gap-2 rounded-full px-3 py-2 text-white">
              <img
                src="/favicon/favicon-32x32.png"
                alt="Lucas Vicente logo"
                className="h-6 w-6 rounded-sm object-contain"
              />
              <span className="font-semibold tracking-wide">lucasvicente.es</span>
            </a>

            <div className="hidden items-center gap-1 sm:flex">
              <a
                href="#proyectos"
                className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
              >
                {t.projects}
              </a>
              <a
                href="#contacto"
                className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
              >
                {t.contact}
              </a>
              <a
                href="https://github.com/lucksgg7"
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
              >
                {t.github}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <div className="rounded-xl border border-white/20 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setLang("es")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                    lang === "es" ? "bg-white/20 text-white" : "text-white/70"
                  }`}
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                    lang === "en" ? "bg-white/20 text-white" : "text-white/70"
                  }`}
                >
                  EN
                </button>
              </div>
              <a
                href="https://www.linkedin.com/in/lucas-esteban-vicente-cerri-3073a8330/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-black transition hover:bg-white/90"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </nav>
        </header>

        <main id="inicio" className="pt-20">
          <section className="max-w-4xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80">
              <Sparkles className="h-3.5 w-3.5" />
              {t.hey}
            </p>

            <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-6xl">{t.title}</h1>

            <p className="mt-5 max-w-3xl text-pretty text-base text-white/80 sm:text-lg">
              {t.description}
              <br />
              {t.current}
            </p>

            <div className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 shadow-[0_0_18px_rgba(16,185,129,0.22)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </span>
                {t.total}: {commitStats.total ?? "...."}
              </span>
              <span className="ml-2 mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 shadow-[0_0_16px_rgba(16,185,129,0.16)] sm:mt-0">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-65" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </span>
                {t.month}: {commitStats.month ?? "...."}
              </span>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-white/90">{t.stack}</p>
              <div className="flex flex-wrap gap-2">
                {stack.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#proyectos"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-medium text-white transition hover:bg-white/15"
              >
                {t.viewProjects}
              </a>
              <a
                href="https://github.com/lucksgg7"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-medium text-white transition hover:bg-white/10"
              >
                {t.goGithub}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </section>

          <section id="proyectos" className="mt-16">
            <h2 className="text-2xl font-semibold sm:text-3xl">{t.publicProjects}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="group overflow-hidden rounded-2xl border border-white/15 bg-card/70 shadow-glow backdrop-blur-sm"
                >
                  <div className="relative h-40 overflow-hidden border-b border-white/10 bg-gradient-to-br from-cyan-500/20 via-sky-400/10 to-emerald-500/15">
                    <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" />
                    <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-emerald-400/20 blur-2xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_45%)]" />
                    <div className="relative flex h-full items-end p-5">
                      <span className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
                        {project.type}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3 p-5">
                    <h3 className="text-lg font-semibold text-card-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white"
                    >
                      {t.seeProject}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="contacto" className="mt-16">
            <h2 className="text-2xl font-semibold sm:text-3xl">{t.contactTitle}</h2>
            <p className="mt-3 max-w-2xl text-white/75">{t.contactText}</p>
            <a
              href="mailto:lucasvicentecerri6@gmail.com?subject=Contacto%20desde%20portfolio&body=Hola%20Lucas%2C%20te%20escribo%20porque..."
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-medium text-white transition hover:bg-white/15"
            >
              <Mail className="h-4 w-4" />
              {t.sendEmail}
            </a>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
