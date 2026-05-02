import { useState } from "react";
import { PROJECTS, type Project } from "@/data/portfolio";

const CATEGORY_LABELS: Record<Project["category"], string> = {
  ai: "AI",
  research: "Research",
  security: "Security",
  fullstack: "Fullstack",
  system: "System",
};

function StatusBadge({ status }: { status?: Project["status"] }) {
  if (!status) return null;
  const cls =
    status === "LIVE" ? "status-live" :
    status === "RESEARCH" ? "status-research" :
    status === "BETA" ? "status-beta" : "status-archived";
  return (
    <span className={`status-pill ${cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-soft" />
      {status}
    </span>
  );
}

function Card({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const idx = PROJECTS.indexOf(p);
  const liveHref = p.id === "ayur" ? p.demo : undefined;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen();
      }}
      className="group text-left relative overflow-hidden rounded-2xl surface lift brackets w-full h-full flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/60"
      aria-label={`Open ${p.name}`}
    >
      {/* product chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground bg-white/[0.015]">
        <div className="flex items-center gap-2">
          <span className="text-lime/80">module</span>
          <span>/{String(idx + 1).padStart(2, "0")}</span>
          <span className="text-muted-foreground/40">·</span>
          <span>{CATEGORY_LABELS[p.category]}</span>
        </div>
        <div className="flex items-center gap-2">
          {p.version && <span className="text-muted-foreground/70">{p.version}</span>}
          <StatusBadge status={p.status} />
        </div>
      </div>

      {/* visual */}
      <div className="relative h-44 overflow-hidden bg-[oklch(0.18_0_0)] sm:h-48">
        <img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-700 group-hover:opacity-65 group-hover:scale-[1.04]" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,13,13,0.1) 0%, rgba(13,13,13,0.55) 60%, rgba(13,13,13,0.98) 100%)" }} />
        {/* faint tech grid overlay */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay"
             style={{
               backgroundImage:
                 "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
               backgroundSize: "24px 24px",
             }}
        />
        {p.highlight && (
          <div className="absolute top-3 left-3">
            <span className="status-pill status-live">★ Flagship</span>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{p.tagline}</p>

        {/* metrics row */}
        {p.metrics && (
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-md border border-white/5 bg-white/[0.02] p-2">
            {p.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">{m.label}</div>
                <div className="mt-0.5 font-mono text-[11px] text-foreground">{m.value}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 4).map((t) => <span key={t} className="tag">{t}</span>)}
          {p.stack.length > 4 && <span className="tag">+{p.stack.length - 4}</span>}
        </div>

        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-lime/90 line-clamp-1">▸ {p.impact}</span>
          <div className="flex items-center gap-2">
            {liveHref && (
              <a
                href={liveHref}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground transition hover:text-lime hover:border-lime/40"
              >
                Live →
              </a>
            )}
            <span className="text-[11px] font-mono text-muted-foreground group-hover:text-lime transition translate-x-0 group-hover:translate-x-0.5">
              inspect →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-background/85 backdrop-blur-md" />
      <div className="relative z-10 max-w-3xl w-full surface rounded-2xl overflow-hidden animate-fade-up" onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-[16/8] overflow-hidden">
          <img src={p.image} alt={p.name} className="h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,13,13,0.2), rgba(13,13,13,0.95))" }} />
          <button onClick={onClose} className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full surface-2 hover:text-lime" aria-label="Close">×</button>
          <div className="absolute bottom-4 left-5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-lime">{CATEGORY_LABELS[p.category]}</span>
            <h3 className="text-3xl font-bold">{p.name}</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-foreground/85 leading-relaxed">{p.description}</p>
          <p className="text-sm font-mono text-lime">▸ {p.impact}</p>
          <div className="flex flex-wrap gap-2">{p.stack.map((t) => <span key={t} className="chip">{t}</span>)}</div>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href={p.github} target="_blank" rel="noreferrer" className="btn-outline">GitHub</a>
            {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="btn-lime">Live Demo →</a>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"all" | Project["category"]>("all");
  const tags: Array<{ value: "all" | Project["category"]; label: string }> = [
    { value: "all", label: "All" },
    { value: "ai", label: "AI" },
    { value: "research", label: "Research" },
    { value: "security", label: "Security" },
    { value: "fullstack", label: "Fullstack" },
    { value: "system", label: "System" },
  ];
  const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  return (
    <section id="projects" className="relative py-28">
      <div className="absolute inset-x-0 top-0 divider-x" aria-hidden />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="reveal flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <span className="sec-num">sys / 03 · modules</span>
            <h2 className="mt-3 h-display text-4xl md:text-5xl font-bold">
              Deployed <span className="text-lime">systems</span>.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              A registry of shipped products and active research. Each module is designed,
              built, and battle-tested in the field.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <button
                key={t.value}
                onClick={() => setFilter(t.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition border ${
                  filter === t.value
                    ? "bg-lime text-[#0D0D0D] border-lime"
                    : "border-white/10 text-muted-foreground hover:text-lime hover:border-lime/40"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        {list.length === 0 ? (
          <div className="surface rounded-2xl p-10 text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              registry / empty
            </div>
            <div className="mt-3 text-2xl font-semibold">No systems match this filter.</div>
            <p className="mt-2 text-muted-foreground">
              Try another category or reset to <span className="text-lime">All</span>.
            </p>
            <button
              className="mt-6 btn-outline"
              onClick={() => setFilter("all")}
            >
              Reset filter
            </button>
          </div>
        ) : (
          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <div key={p.id} className="reveal h-full" style={{ transitionDelay: `${i * 60}ms` }}>
              <Card p={p} onOpen={() => setOpen(p)} />
              </div>
            ))}
          </div>
        )}
      </div>
      {open && <Modal p={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
