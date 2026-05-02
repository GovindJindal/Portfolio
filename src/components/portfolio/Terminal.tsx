import { useEffect, useRef, useState } from "react";
import { PROFILE, PROJECTS, SKILLS } from "@/data/portfolio";

type Line = { kind: "in" | "out" | "sys"; text: string };

const HELP = `available commands:
  help            show this menu
  whoami          who is Govind
  show projects   list active projects
  show skills     dump skill matrix
  show contact    open comm channels
  cat resume      brief summary
  clear           reset terminal`;

function run(cmd: string): string {
  const c = cmd.trim().toLowerCase();
  if (!c) return "";
  if (c === "help") return HELP;
  if (c === "whoami" || c === "who are you") return `${PROFILE.name} · ${PROFILE.roles.join(" · ")}\n${PROFILE.edu}\nlocation: ${PROFILE.location}`;
  if (c === "show projects" || c === "ls projects") return PROJECTS.map((p) => `  [${p.tag.padEnd(10)}] ${p.name.padEnd(22)} → ${p.tagline}`).join("\n");
  if (c === "show skills" || c === "ls skills") return Object.entries(SKILLS).map(([k, v]) => `  ${k.padEnd(14)} :: ${v.join(", ")}`).join("\n");
  if (c === "show contact") return `  email    ${PROFILE.email}\n  github   ${PROFILE.github}\n  linkedin ${PROFILE.linkedin}`;
  if (c === "cat resume") return `Govind Jindal — AI Engineer & Full Stack Developer.\nBuilding offline-first AI (ASHA-VANI), chaos-driven detection (Fractal Fire Mamba),\nliquid neural cybersecurity, and accessibility AI.`;
  if (c === "clear") return "__CLEAR__";
  if (c === "sudo rm -rf /") return "nice try. system integrity: 100% ✦";
  return `command not found: ${cmd}\ntype "help" to see available commands.`;
}

const SUGGESTIONS = ["show projects", "show skills", "whoami"];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "sys", text: "govind.os v1.0.0 — neural shell ready." },
    { kind: "sys", text: 'type "help" to begin.' },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const submit = (val: string) => {
    if (!val.trim()) return;
    const out = run(val);
    if (out === "__CLEAR__") { setLines([]); setInput(""); return; }
    setLines((ls) => [...ls, { kind: "in", text: val }, { kind: "out", text: out }]);
    setInput("");
  };

  return (
    <section id="terminal" className="relative py-28">
      <div className="mx-auto max-w-5xl px-4">
        <div className="reveal mb-8 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-lime">// 02 · interactive</p>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
              Talk to my <span className="text-lime">system</span>.
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl">Type a command — or pick one below.</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => submit(s)} className="chip">$ {s}</button>
            ))}
          </div>
        </div>

        <div className="reveal surface rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-lime" />
            </div>
            <div className="font-mono text-[10px] tracking-widest text-muted-foreground">govind@neural-os : ~/portfolio</div>
            <div className="text-[10px] text-lime font-mono flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-soft" /> live
            </div>
          </div>
          <div ref={scrollRef} onClick={() => inputRef.current?.focus()}
               className="font-mono text-sm p-5 h-[360px] overflow-y-auto cursor-text leading-relaxed">
            {lines.map((l, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {l.kind === "in" && (<><span className="text-lime">govind@os</span><span className="text-muted-foreground">:~$</span> <span className="text-foreground">{l.text}</span></>)}
                {l.kind === "out" && <span className="text-foreground/75">{l.text}</span>}
                {l.kind === "sys" && <span className="text-muted-foreground">{l.text}</span>}
              </div>
            ))}
            <form onSubmit={(e) => { e.preventDefault(); submit(input); }} className="flex items-center gap-2 mt-1">
              <span className="text-lime">govind@os</span><span className="text-muted-foreground">:~$</span>
              <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
                     className="flex-1 bg-transparent outline-none text-foreground caret-[var(--lime)] placeholder:text-muted-foreground/60"
                     placeholder='try "show projects"' autoComplete="off" spellCheck={false} />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
