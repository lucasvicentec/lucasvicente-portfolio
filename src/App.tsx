import { lazy, Suspense, useMemo, useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, Github, Linkedin, Mail, ShieldCheck, Sparkles } from "lucide-react";
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

const InteractiveNebulaShader = lazy(() =>
  import("@/components/ui/liquid-shader").then((module) => ({ default: module.InteractiveNebulaShader })),
);

type Locale = "es" | "en";

type Project = {
  title: string;
  tag: string;
  type: string;
  headline: string;
  challenge: string;
  architecture: string;
  impact: string;
  stack: string;
  repo?: string;
  live?: string;
};

const projects: Project[] = [
  {
    title: "StackWatch",
    tag: "New",
    type: "Monitoring Platform",
    headline: "Public status page + private admin + incident lifecycle for VPS monitoring.",
    challenge:
      "Build a self-hosted monitor that is easy to run but still production ready: auth, rate-limit, historical metrics, and reliable checks.",
    architecture:
      "Next.js app with public/admin surfaces, PostgreSQL persistence, internal check runner, and worker loop for periodic checks and incident open/close logic.",
    impact: "Turns infrastructure health into a clear product surface with real-time state and historical context.",
    stack: "Next.js 16, TypeScript, PostgreSQL, Docker, Docker Swarm",
    repo: "https://github.com/lucksgg7/stackwatch",
  },
  {
    title: "MD-Ingelligence",
    tag: "Production",
    type: "Automation / Integrations",
    headline: "Operational platform to reduce manual UT searches and repetitive internal tasks.",
    challenge: "Normalize heterogeneous data while keeping fast response times across complex filters.",
    architecture: "Product-oriented platform with focused utilities, SAP-related workflows, and maintainable backend logic.",
    impact: "Lower friction for daily operations and better throughput in repetitive processes.",
    stack: "Next.js, TypeScript, PostgreSQL, Tailwind, APIs",
    live: "http://md.lucasvicente.es/",
  },
  {
    title: "Hytalia",
    tag: "Production",
    type: "Network / Infrastructure",
    headline: "End-to-end technical ecosystem: web, store, APIs, infra, and internal management tools.",
    challenge: "Coordinate multiple systems with evolving requirements and continuous availability needs.",
    architecture: "Unified platform design connecting product, internal operations, and deployment infrastructure.",
    impact: "Scalable technical base for platform growth and continuous product evolution.",
    stack: "TypeScript, Python, Nginx, Docker, Redis, PostgreSQL",
    live: "https://www.hytalia.net",
  },
];

const stackByCategory = [
  {
    category: "Frontend",
    items: [
      { label: "React", icon: SiReact },
      { label: "TypeScript", icon: SiTypescript },
      { label: "Vite", icon: SiVite },
      { label: "Tailwind", icon: SiTailwindcss },
      { label: "JavaScript", icon: SiJavascript },
    ],
  },
  {
    category: "Backend",
    items: [
      { label: "Python", icon: SiPython },
      { label: "PostgreSQL", icon: SiPostgresql },
      { label: "SQLite", icon: SiSqlite },
      { label: "Redis", icon: SiRedis },
    ],
  },
  {
    category: "Infra / DevOps",
    items: [
      { label: "Docker", icon: SiDocker },
      { label: "Nginx", icon: SiNginx },
      { label: "GitHub Actions", icon: SiGithubactions },
      { label: "Linux", icon: SiLinux },
    ],
  },
];

const copy = {
  es: {
    navProjects: "Casos",
    navProcess: "Metodo",
    navHiring: "Hiring",
    openToWork: "Disponible para remoto o hibrido",
    eyebrow: "Full-stack engineer con foco en sistemas reales",
    title: "Construyo software que mejora operaciones y escala sin romperse.",
    intro:
      "Diseño y entrego productos tecnicos end-to-end: frontend, backend, automatizacion, infraestructura y despliegue. Mi foco es impacto real y mantenibilidad.",
    ctaProjects: "Ver casos destacados",
    ctaContact: "Contactar",
    ctaGitHub: "Github",
    proofTitle: "Senales que importan a reclutadores y equipos",
    proofItems: [
      { label: "Ownership", value: "End-to-end" },
      { label: "Entorno", value: "Produccion" },
      { label: "Especialidad", value: "Automation + Infra" },
      { label: "Modo", value: "Build / Operate / Improve" },
    ],
    featuredTitle: "Featured Case Studies",
    featuredSubtitle: "Cada proyecto esta presentado con reto, arquitectura e impacto.",
    challenge: "Reto",
    architecture: "Arquitectura",
    impact: "Impacto",
    stack: "Stack",
    viewRepo: "Ver repo",
    viewLive: "Ver online",
    processTitle: "Como trabajo para entregar valor rapido y estable",
    processItems: [
      "Empiezo por problema de negocio y criterio de exito medible.",
      "Diseño arquitectura simple para hoy, extensible para manana.",
      "Automatizo despliegues y operaciones repetitivas desde el inicio.",
      "Priorizo observabilidad y fiabilidad en produccion.",
    ],
    hiringTitle: "Si buscas alguien que tome ownership tecnico real",
    hiringText:
      "Estoy abierto a freelance, contrato o full-time. Puedo entrar en proyectos existentes o construir desde cero con enfoque de producto y operaciones.",
    hiringPoints: ["Rapido en ejecucion", "Solido en produccion", "Comunicacion clara con negocio y equipo"],
    hireNow: "Hablemos",
    sendEmail: "Enviar email",
  },
  en: {
    navProjects: "Cases",
    navProcess: "Process",
    navHiring: "Hiring",
    openToWork: "Open to remote or hybrid roles",
    eyebrow: "Full-stack engineer focused on real-world systems",
    title: "I build software that improves operations and scales without breaking.",
    intro:
      "I design and ship end-to-end technical products: frontend, backend, automation, infrastructure, and deployment. My focus is measurable impact and maintainability.",
    ctaProjects: "View featured cases",
    ctaContact: "Contact",
    ctaGitHub: "Github",
    proofTitle: "Signals recruiters and teams actually care about",
    proofItems: [
      { label: "Ownership", value: "End-to-end" },
      { label: "Environment", value: "Production" },
      { label: "Specialty", value: "Automation + Infra" },
      { label: "Mode", value: "Build / Operate / Improve" },
    ],
    featuredTitle: "Featured Case Studies",
    featuredSubtitle: "Each project is presented by challenge, architecture, and impact.",
    challenge: "Challenge",
    architecture: "Architecture",
    impact: "Impact",
    stack: "Stack",
    viewRepo: "Open repo",
    viewLive: "Open live",
    processTitle: "How I work to deliver value fast and reliably",
    processItems: [
      "Start from business problem and measurable success criteria.",
      "Design architecture simple for now, extensible for later.",
      "Automate deploy and repetitive operations from day one.",
      "Prioritize observability and production reliability.",
    ],
    hiringTitle: "If you need someone with real technical ownership",
    hiringText:
      "Open to freelance, contract, or full-time opportunities. I can join existing systems or build from scratch with product and operations mindset.",
    hiringPoints: ["Fast execution", "Production reliability", "Clear communication with product and team"],
    hireNow: "Let us talk",
    sendEmail: "Send email",
  },
} as const;

function App() {
  const [lang, setLang] = useState<Locale>("es");
  const t = copy[lang];

  const skillsCount = useMemo(() => stackByCategory.reduce((acc, group) => acc + group.items.length, 0), []);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background text-white">
      <Suspense fallback={null}>
        <InteractiveNebulaShader className="opacity-95" />
      </Suspense>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <header className="mx-auto w-full max-w-5xl rounded-full border border-white/15 bg-black/55 p-2 backdrop-blur-xl">
          <nav className="flex items-center justify-between gap-3 text-sm text-white/80">
            <a href="#inicio" className="flex items-center gap-2 rounded-full px-3 py-2 text-white">
              <img src="/favicon/favicon-32x32.png" alt="Lucas Vicente logo" className="h-6 w-6 rounded-sm object-contain" />
              <span className="font-semibold tracking-wide">lucasvicente.es</span>
            </a>

            <div className="hidden items-center gap-1 sm:flex">
              <a href="#casos" className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white">
                {t.navProjects}
              </a>
              <a href="#metodo" className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white">
                {t.navProcess}
              </a>
              <a href="#hiring" className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white">
                {t.navHiring}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <div className="rounded-xl border border-white/20 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setLang("es")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${lang === "es" ? "bg-white/20 text-white" : "text-white/70"}`}
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${lang === "en" ? "bg-white/20 text-white" : "text-white/70"}`}
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
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              {t.openToWork}
            </p>

            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/80">
              <Sparkles className="h-3.5 w-3.5" />
              {t.eyebrow}
            </p>

            <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-6xl">{t.title}</h1>

            <p className="mt-5 max-w-3xl text-pretty text-base text-white/80 sm:text-lg">{t.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#casos"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-medium text-white transition hover:bg-white/15"
              >
                {t.ctaProjects}
              </a>
              <a
                href="#hiring"
                className="rounded-full border border-white/20 px-5 py-2.5 font-medium text-white transition hover:bg-white/10"
              >
                {t.ctaContact}
              </a>
              <a
                href="https://github.com/lucksgg7"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-medium text-white transition hover:bg-white/10"
              >
                {t.ctaGitHub}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-base font-semibold text-white/90">{t.proofTitle}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {t.proofItems.map((item) => (
                <article key={item.label} className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-wide text-white/60">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="casos" className="mt-16">
            <h2 className="text-2xl font-semibold sm:text-3xl">{t.featuredTitle}</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/70">{t.featuredSubtitle}</p>

            <div className="mt-6 grid gap-6">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="overflow-hidden rounded-2xl border border-white/15 bg-card/75 shadow-glow backdrop-blur-sm"
                >
                  <div className="flex flex-wrap items-center gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-4">
                    <span className="rounded-full border border-cyan-300/35 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
                      {project.tag}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-white/60">{project.type}</span>
                  </div>

                  <div className="space-y-4 p-5">
                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground">{project.title}</h3>
                      <p className="mt-2 text-sm text-white/80">{project.headline}</p>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                      <p className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm text-white/75">
                        <span className="font-semibold text-white/90">{t.challenge}:</span> {project.challenge}
                      </p>
                      <p className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm text-white/75">
                        <span className="font-semibold text-white/90">{t.architecture}:</span> {project.architecture}
                      </p>
                      <p className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm text-white/75">
                        <span className="font-semibold text-white/90">{t.impact}:</span> {project.impact}
                      </p>
                    </div>

                    <p className="text-sm text-white/70">
                      <span className="font-semibold text-white/90">{t.stack}:</span> {project.stack}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {project.repo ? (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
                        >
                          <Github className="h-4 w-4" />
                          {t.viewRepo}
                        </a>
                      ) : null}
                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                          {t.viewLive}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="metodo" className="mt-16 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <article className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h2 className="text-2xl font-semibold sm:text-3xl">{t.processTitle}</h2>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                {t.processItems.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h2 className="text-2xl font-semibold sm:text-3xl">Tech Stack</h2>
              <p className="mt-2 text-xs text-white/60">{skillsCount} herramientas usadas en producto, backend e infraestructura.</p>
              <div className="mt-4 grid gap-4">
                {stackByCategory.map((group) => (
                  <div key={group.category} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">{group.category}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map(({ label, icon: Icon }) => (
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
                ))}
              </div>
            </article>
          </section>

          <section id="hiring" className="mt-16 rounded-2xl border border-white/20 bg-white/[0.06] p-6 sm:p-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/80">
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              Hiring
            </p>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">{t.hiringTitle}</h2>
            <p className="mt-3 max-w-3xl text-white/75">{t.hiringText}</p>
            <ul className="mt-4 flex flex-wrap gap-2 text-sm text-white/85">
              {t.hiringPoints.map((point) => (
                <li key={point} className="rounded-full border border-emerald-300/35 bg-emerald-500/10 px-3 py-1">
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:lucasvicentecerri6@gmail.com?subject=Hiring%20conversation&body=Hola%20Lucas%2C%20quiero%20hablar%20sobre%20una%20oportunidad..."
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-medium text-white transition hover:bg-white/15"
              >
                <Mail className="h-4 w-4" />
                {t.sendEmail}
              </a>
              <a
                href="https://www.linkedin.com/in/lucas-esteban-vicente-cerri-3073a8330/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-medium text-white transition hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/lucksgg7"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-medium text-white transition hover:bg-white/10"
              >
                <Github className="h-4 w-4" />
                Github
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
