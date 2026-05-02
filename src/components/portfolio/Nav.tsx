import { useEffect, useState } from "react";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#terminal", label: "Terminal" },
  { href: "#skills", label: "Skills" },
  { href: "#timeline", label: "Timeline" },
  { href: "#status", label: "Status" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 24);
    onS();
    window.addEventListener("scroll", onS);
    return () => window.removeEventListener("scroll", onS);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="mx-auto max-w-6xl px-4">
        <nav className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all ${scrolled ? "glass-strong" : "glass"}`}>
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="grid h-7 w-7 place-items-center rounded-md font-mono text-xs font-bold bg-lime text-[#0D0D0D]">G</span>
            <div className="leading-tight">
              <div className="font-mono text-xs tracking-widest text-foreground">GOVIND<span className="text-lime">.SYS</span></div>
              <div className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground/70">v2026.05 · stable</div>
            </div>
          </a>
          <ul className="hidden md:flex items-center gap-0.5">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="px-3 py-1.5 rounded-full text-xs text-muted-foreground hover:text-lime transition-colors hover:bg-white/5">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest border border-white/10 hover:border-lime/40 hover:text-lime transition">
            <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-soft" /> Available
          </a>
          <button onClick={() => setOpen((v) => !v)} className="md:hidden p-2 rounded-md hover:bg-white/5" aria-label="Menu">
            <div className="space-y-1.5">
              <span className="block h-px w-5 bg-foreground" />
              <span className="block h-px w-5 bg-foreground" />
              <span className="block h-px w-5 bg-foreground" />
            </div>
          </button>
        </nav>
        {open && (
          <div className="mt-2 md:hidden glass-strong rounded-2xl p-2 animate-fade-in">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 text-sm hover:bg-white/5 rounded-md">{l.label}</a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
