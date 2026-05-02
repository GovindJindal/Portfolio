import { SKILLS } from "@/data/portfolio";
import { FiCode, FiCpu, FiDatabase, FiLayers } from "react-icons/fi";
import {
  FaAws,
  FaCss3Alt,
  FaFlask,
  FaGitAlt,
  FaHtml5,
  FaJava,
  FaJsSquare,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { SiDjango, SiFastapi, SiFigma, SiPostgresql, SiPytorch, SiTypescript, SiVercel, SiVite } from "react-icons/si";
import type { IconType } from "react-icons";

const ICONS: Record<string, string> = {
  "AI / ML": "◆",
  "Full Stack": "◇",
  "Languages": "▲",
  "Cloud / DB": "●",
  "Tools": "■",
};

const TECH_ICON_MAP: Record<string, IconType> = {
  React: FaReact,
  "Next.js 15": FiLayers,
  "React Native": FaReact,
  TypeScript: SiTypescript,
  "Node.js": FaNodeJs,
  FastAPI: SiFastapi,
  Django: SiDjango,
  Flask: FaFlask,
  Vite: SiVite,
  PyTorch: SiPytorch,
  spaCy: FiCpu,
  NLTK: FiLayers,
  Gemini: FiCpu,
  OpenRouter: FiLayers,
  Numpy: FiCpu,
  Pandas: FiDatabase,
  Python: FaPython,
  JavaScript: FaJsSquare,
  C: FiCode,
  "C++": FiCode,
  Java: FaJava,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  AWS: FaAws,
  PostgreSQL: SiPostgresql,
  SQLite: FiDatabase,
  Vercel: SiVercel,
  Render: FiLayers,
  Git: FaGitAlt,
  "VS Code": FiCode,
  Xcode: FiCode,
  "Android Studio": FiCode,
  Blender: FiLayers,
  Figma: SiFigma,
  Canva: FiLayers,
  "Qwen2.5": FiCpu,
  "Mamba SSM": FiCpu,
  "OpenCV": FiCpu,
  "Cloud / DB": FiDatabase,
  "AI / ML": FiCpu,
  "Full Stack": FiLayers,
  Languages: FiCode,
  Tools: FiCode,
};

function getTechIcon(item: string) {
  return TECH_ICON_MAP[item] ?? FiCode;
}

export function Skills() {
  const cats = Object.entries(SKILLS);
  return (
    <section id="skills" className="relative py-28">
      <div className="absolute inset-x-0 top-0 divider-x" aria-hidden />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="reveal mb-12">
          <span className="sec-num">sys / 04 · stack</span>
          <h2 className="mt-3 h-display text-4xl md:text-5xl font-bold">
            How I <span className="text-lime">build</span>.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl">
            A categorized registry of the tools, languages, and frameworks running in production.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cats.map(([cat, items], i) => (
            <div
              key={cat}
              className="group reveal relative overflow-hidden rounded-xl p-6 surface brackets transition-all duration-300 ease-out hover:scale-[1.02] hover:border-lime/35 hover:shadow-[0_0_0_1px_rgba(182,255,0,0.22),0_16px_44px_-18px_rgba(182,255,0,0.42)]"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(182,255,0,0.09),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 transition-all duration-300 group-hover:opacity-15 group-hover:translate-y-1">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-lime text-lg leading-none">{ICONS[cat]}</span>
                    <h3 className="text-sm font-mono uppercase tracking-[0.2em]">{cat}</h3>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">[{String(items.length).padStart(2, "0")}]</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((it) => <span key={it} className="chip">{it}</span>)}
                </div>
              </div>

              <div className="relative z-20 mt-2 rounded-lg border border-lime/20 bg-lime/5 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-lime/85 w-fit opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                Active Stack Module
              </div>

              <div className="relative z-20 mt-4 grid grid-cols-2 gap-2 opacity-0 translate-y-3 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 lg:grid-cols-3">
                {items.slice(0, 6).map((it, idx) => (
                  <div
                    key={`${cat}-${it}`}
                    className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-2 transition-all duration-500 ease-out group-hover:border-lime/35 group-hover:bg-lime/[0.07] hover:scale-[1.02]"
                    style={{ transitionDelay: `${80 + idx * 45}ms` }}
                  >
                    {(() => {
                      const Icon = getTechIcon(it);
                      return <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-lime/90" />;
                    })()}
                    <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground truncate transition-colors duration-300 group-hover:text-foreground">
                      {it}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
