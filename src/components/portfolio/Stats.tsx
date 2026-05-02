import { useEffect, useRef, useState } from "react";

const STATS = [
  { k: 8, suffix: "+", label: "Projects Built" },
  { k: 7, suffix: "", label: "Hackathons" },
  { k: 15, suffix: "+", label: "Certifications" },
  { k: 100, suffix: "+", label: "GH Contributions" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1400;
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.disconnect();
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5">
          {STATS.map((s) => (
            <div key={s.label} className="reveal bg-background p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold font-mono text-lime">
                <Counter to={s.k} suffix={s.suffix}/>
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
