import { TIMELINE } from "@/data/portfolio";

export function Timeline() {
  return (
    <section id="timeline" className="relative py-28">
      <div className="mx-auto max-w-4xl px-4">
        <div className="reveal mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-lime">// 05 · trajectory</p>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
            The <span className="text-lime">timeline</span>.
          </h2>
          <p className="mt-2 text-muted-foreground max-w-xl">Education, research, hackathons & milestones — chronologically.</p>
        </div>

        <div className="relative pl-8 border-l border-white/10">
          {TIMELINE.map((t, i) => (
            <div key={i} className="reveal relative pb-10 last:pb-0" style={{ transitionDelay: `${i * 50}ms` }}>
              {/* dot */}
              <span className="absolute -left-[33px] top-1.5 h-3 w-3 rounded-full bg-lime" style={{ boxShadow: "0 0 0 4px rgba(13,13,13,1), 0 0 12px rgba(182,255,0,0.5)" }} />
              <div className="surface rounded-lg p-5 lift">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-lime">{t.year}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">/{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-base font-semibold mt-1">{t.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{t.org}</p>
                <p className="text-sm text-foreground/70 mt-2">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
