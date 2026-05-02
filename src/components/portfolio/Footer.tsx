import { PROFILE } from "@/data/portfolio";

const TICKER = ["AI ENGINEER", "FULL STACK", "SYSTEMS THINKER", "OFFLINE-FIRST", "EDGE AI", "RESEARCH"];

export function Footer() {
  return (
    <footer className="relative mt-20">
      <div className="overflow-hidden border-y border-white/5 py-6">
        <div className="flex animate-ticker whitespace-nowrap font-mono text-3xl md:text-5xl font-bold uppercase tracking-tight">
          {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="mx-8 inline-flex items-center gap-8 text-foreground/15">
              {t}<span className="text-lime">✦</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
        <p>© {new Date().getFullYear()} {PROFILE.name}. Built with caffeine & curiosity.</p>
        <p className="opacity-60">v1.0.0 · neural shell</p>
      </div>
    </footer>
  );
}
