import { useMemo, useState } from "react";
import { ArrowUpRight, Linkedin, Orbit, Sparkles } from "lucide-react";
import { InteractiveNebulaShader } from "@/components/ui/liquid-shader";

type Locale = "es" | "en";

type Project = {
  title: string;
  image: string;
  href: string;
  description: Record<Locale, string>;
};

const projects: Project[] = [
  {
    title: "hytalia-web",
    description: {
      es: "Frontend y experiencia de usuario para la plataforma web principal de Hytalia.",
      en: "Frontend and user experience work for the main Hytalia web platform.",
    },
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    href: "https://github.com/HytaliaNetwork/hytalia-web",
  },
  {
    title: "hytale-plugin-journey",
    description: {
      es: "Plugin de gameplay con logica propia para servidores, orientado a progresion y sistemas.",
      en: "Gameplay plugin with custom server-side logic focused on progression and systems.",
    },
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    href: "https://github.com/HytaliaNetwork/hytale-plugin-journey",
  },
  {
    title: "ServerMappings",
    description: {
      es: "Mapeo publico de IPs de servidores Minecraft a nombres legibles para clientes.",
      en: "Public mapping of Minecraft server IPs to readable display names.",
    },
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    href: "https://github.com/lucksgg7/ServerMappings",
  },
];

const copy = {
  es: {
    projects: "Proyectos",
    github: "Github",
    about: "Sobre mi",
    heroTag: "Hey, soy Lucas (Lucks)",
    heroTitle: "Desarrollador Full Stack construyendo sistemas reales.",
    heroDescription:
      "Trabajo en paneles, APIs, automatizacion, servidores e infraestructura. Proyecto actual: Hytalia (Network + sistemas propios). En febrero de 2026: 189 commits en hytalia-web y 37 en hytale-plugin-journey.",
    collab: "Abierto a colaboraciones",
    ctaProjects: "Ver proyectos",
    ctaGithub: "Ir a Github",
    sectionTitle: "Proyectos destacados",
    statsFollowers: "GitHub followers: 3",
    statsFollowing: "GitHub following: 5",
    statsContrib: "Contribuciones ultimos 12 meses: 1,162",
    stackTitle: "Stack tecnico",
    stack: [
      "TypeScript / JavaScript",
      "Python",
      "React / Vite / Tailwind",
      "Docker / Nginx / GitHub Actions",
      "PostgreSQL / SQLite / Redis",
      "Linux",
    ],
  },
  en: {
    projects: "Projects",
    github: "Github",
    about: "About",
    heroTag: "Hey, I'm Lucas (Lucks)",
    heroTitle: "Full Stack developer building real systems.",
    heroDescription:
      "I work on panels, APIs, automation, servers, and infrastructure. Current focus: Hytalia (Network + internal systems). In February 2026: 189 commits in hytalia-web and 37 in hytale-plugin-journey.",
    collab: "Open to collaborations",
    ctaProjects: "View projects",
    ctaGithub: "Open Github",
    sectionTitle: "Featured projects",
    statsFollowers: "GitHub followers: 3",
    statsFollowing: "GitHub following: 5",
    statsContrib: "Contributions in last 12 months: 1,162",
    stackTitle: "Tech stack",
    stack: [
      "TypeScript / JavaScript",
      "Python",
      "React / Vite / Tailwind",
      "Docker / Nginx / GitHub Actions",
      "PostgreSQL / SQLite / Redis",
      "Linux",
    ],
  },
} as const;

function App() {
  const [locale, setLocale] = useState<Locale>("es");
  const t = useMemo(() => copy[locale], [locale]);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <InteractiveNebulaShader className="opacity-95" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <header className="mx-auto w-full max-w-5xl rounded-full border border-white/15 bg-black/55 p-2 backdrop-blur-xl">
          <nav className="flex items-center justify-between gap-3 text-sm text-white/80">
            <a href="#inicio" className="flex items-center gap-2 rounded-full px-3 py-2 text-white">
              <Orbit className="h-5 w-5" />
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
                href="https://github.com/lucksgg7"
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
              >
                {t.github}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <div className="rounded-2xl border border-white/20 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setLocale("es")}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    locale === "es" ? "bg-white/20 text-white" : "text-white/70 hover:text-white"
                  }`}
                  aria-label="Cambiar idioma a espanol"
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    locale === "en" ? "bg-white/20 text-white" : "text-white/70 hover:text-white"
                  }`}
                  aria-label="Switch language to english"
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
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80">
                <Sparkles className="h-3.5 w-3.5" />
                {t.heroTag}
              </p>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-200">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
                </span>
                {t.collab}
              </span>
            </div>

            <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-6xl">{t.heroTitle}</h1>

            <p className="mt-5 max-w-3xl text-pretty text-base text-white/80 sm:text-lg">{t.heroDescription}</p>

            <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/75">
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">{t.statsFollowers}</span>
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">{t.statsFollowing}</span>
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">{t.statsContrib}</span>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold text-white/90">{t.stackTitle}</p>
              <div className="flex flex-wrap gap-2">
                {t.stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#proyectos"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-medium text-white transition hover:bg-white/15"
              >
                {t.ctaProjects}
              </a>
              <a
                href="https://github.com/lucksgg7"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-medium text-white transition hover:bg-white/10"
              >
                {t.ctaGithub}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </section>

          <section id="proyectos" className="mt-16">
            <h2 className="text-2xl font-semibold sm:text-3xl">{t.sectionTitle}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="group overflow-hidden rounded-2xl border border-white/15 bg-card/70 shadow-glow backdrop-blur-sm"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="space-y-3 p-5">
                    <h3 className="text-lg font-semibold text-card-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description[locale]}</p>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white"
                    >
                      Github
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
