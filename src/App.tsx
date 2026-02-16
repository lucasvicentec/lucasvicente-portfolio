import { useEffect, useState } from "react";
import { ArrowUpRight, Linkedin, Orbit, Sparkles } from "lucide-react";
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
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    href: "https://github.com/lucksgg7/MD-Intelligence",
  },
  {
    title: "Hytalia (www.hytalia.net)",
    description:
      "Network usando motor de Hytale, web propia, tienda, sistemas internos, APIs e infraestructura.",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    href: "https://www.hytalia.net",
  },
];

const trackedRepos = [
  "HytaliaNetwork/hytalia-web",
  "HytaliaNetwork/hytale-plugin-journey",
  "lucksgg7/lucasvicente-portfolio",
  "lucksgg7/ServerMappings",
  "lucksgg7/MD-Intelligence",
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
  const [commits, setCommits] = useState<number | null>(null);

  useEffect(() => {
    const getCount = async (repo: string): Promise<number> => {
      const url = `https://api.github.com/repos/${repo}/commits?author=lucksgg7&per_page=1`;
      const res = await fetch(url);
      if (!res.ok) return 0;

      const link = res.headers.get("link");
      if (link) {
        const last = link.match(/&page=(\d+)>; rel="last"/);
        if (last?.[1]) return Number(last[1]);
      }

      const items = (await res.json()) as unknown[];
      return items.length;
    };

    const loadCommits = async () => {
      try {
        const counts = await Promise.all(trackedRepos.map((repo) => getCount(repo)));
        setCommits(counts.reduce((acc, count) => acc + count, 0));
      } catch {
        setCommits(null);
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
              <Orbit className="h-5 w-5" />
              <span className="font-semibold tracking-wide">lucasvicente.es</span>
            </a>

            <div className="hidden items-center gap-1 sm:flex">
              <a
                href="#proyectos"
                className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
              >
                Proyectos
              </a>
              <a
                href="https://github.com/lucksgg7"
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
              >
                Github
              </a>
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
          </nav>
        </header>

        <main id="inicio" className="pt-20">
          <section className="max-w-4xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80">
              <Sparkles className="h-3.5 w-3.5" />
              Hey, soy Lucas (Lucks)
            </p>

            <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-6xl">
              Desarrollador Full Stack.
            </h1>

            <p className="mt-5 max-w-3xl text-pretty text-base text-white/80 sm:text-lg">
              Trabajo en paneles, APIs, automatizacion, servidores e infraestructura.
              <br />
              Proyecto actual: Hytalia (Network + Sistemas propios) y construyendo en UEFN (Unreal Engine for
              Fortnite)
            </p>

            <div className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 shadow-[0_0_18px_rgba(16,185,129,0.22)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </span>
                Commits totales: {commits ?? "...."}
              </span>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-white/90">Stack Tecnico</p>
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
                Ver proyectos
              </a>
              <a
                href="https://github.com/lucksgg7"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-medium text-white transition hover:bg-white/10"
              >
                Ir a Github
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </section>

          <section id="proyectos" className="mt-16">
            <h2 className="text-2xl font-semibold sm:text-3xl">Proyectos publicos</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="group overflow-hidden rounded-2xl border border-white/15 bg-card/70 shadow-glow backdrop-blur-sm"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="space-y-3 p-5">
                    <h3 className="text-lg font-semibold text-card-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white"
                    >
                      Ver proyecto
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
