import { useEffect, useState } from "react";

const ROWS = [
  { label: "Active Projects", value: "ASHA-VANI · Fractal Fire Mamba", state: "RUNNING" },
  { label: "Research Mode", value: "Evolve AI · CfC Networks", state: "ACTIVE" },
  { label: "Learning Status", value: "Mamba SSM · Edge AI", state: "STREAMING" },
  { label: "Coffee Levels", value: "Espresso · 2/4 cups today", state: "STABLE" },
];

const BARS = [
  { l: "Build Energy", v: 92 },
  { l: "Curiosity", v: 99 },
  { l: "Sleep Debt", v: 38 },
];

export function SystemStatus() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i); }, []);
  return (
    <section id="status" className="relative py-28">
      <div className="mx-auto max-w-5xl px-4">
        <div className="reveal mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-lime">// 07 · live_feed</p>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
            System <span className="text-lime">status</span>.
          </h2>
        </div>
        <div className="reveal surface rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 font-mono text-[10px] uppercase tracking-widest">
            <div className="flex items-center gap-2 text-lime"><span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-soft"/> all systems nominal</div>
            <div className="text-muted-foreground">UTC {t.toISOString().slice(11, 19)}</div>
          </div>
          <div className="divide-y divide-white/5">
            {ROWS.map((r) => (
              <div key={r.label} className="grid grid-cols-12 items-center px-5 py-4 hover:bg-white/[0.02] transition">
                <div className="col-span-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{r.label}</div>
                <div className="col-span-6 text-sm">{r.value}</div>
                <div className="col-span-2 flex items-center justify-end gap-2 font-mono text-[10px] text-lime">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-soft"/>
                  {r.state}
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-5 border-t border-white/5 grid sm:grid-cols-3 gap-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {BARS.map((b) => (
              <div key={b.l}>
                <div className="flex justify-between"><span>{b.l}</span><span className="text-lime">{b.v}%</span></div>
                <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-lime" style={{ width: `${b.v}%`, boxShadow: "0 0 10px rgba(182,255,0,0.5)" }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
