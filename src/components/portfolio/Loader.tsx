import { useEffect, useState } from "react";

export function Loader() {
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setOut(true), 1100);
    const t2 = setTimeout(() => setGone(true), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (gone) return null;
  return (
    <div className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-500 ${out ? "opacity-0 pointer-events-none" : ""}`}>
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-white/10 border-t-[var(--lime)] animate-spin"/>
          <div className="absolute inset-0 grid place-items-center font-mono text-[10px] text-lime tracking-widest">G·OS</div>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          booting<span className="animate-blink">_</span>
        </div>
      </div>
    </div>
  );
}
