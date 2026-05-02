import { ACHIEVEMENTS } from "@/data/portfolio";

type AchievementKind = "Hackathon" | "Cert" | "Workshop" | "Competition" | "Other";

const KIND_ICON: Record<AchievementKind, string> = {
  Hackathon: "⚡",
  Cert: "◆",
  Workshop: "◉",
  Competition: "★",
  Other: "•",
};
const ORDER: AchievementKind[] = ["Hackathon", "Cert", "Workshop", "Competition", "Other"];
const LABELS: Record<string, string> = {
  Hackathon: "Hackathons",
  Cert: "Certifications",
  Workshop: "Workshops",
  Competition: "Competitions",
  Other: "Other",
};

function normalizeKind(kind?: string): AchievementKind {
  const value = (kind || "").trim().toLowerCase();
  if (value === "hackathon") return "Hackathon";
  if (value === "cert") return "Cert";
  if (value === "workshop") return "Workshop";
  if (value === "competition") return "Competition";
  return "Other";
}

export function Achievements() {
  return (
    <section id="achievements" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="reveal mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-lime">// 06 · archive</p>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
            Receipts & <span className="text-lime">recognition</span>.
          </h2>
          <p className="mt-2 text-muted-foreground max-w-xl">Hackathons, certifications and competitions — clickable for proof.</p>
        </div>

        <div className="space-y-12">
          {ORDER.map((kind) => {
            const items = ACHIEVEMENTS.filter((a) => normalizeKind(a.kind) === kind);
            if (!items.length) return null;
            return (
              <div key={kind} className="reveal">
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="text-lime mr-2">{KIND_ICON[kind]}</span>{LABELS[kind]}
                  </h3>
                  <span className="font-mono text-[10px] text-muted-foreground">{String(items.length).padStart(2, "0")} entries</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map((a, i) => (
                    a.url ? (
                      <a
                        key={i}
                        href={a.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative block overflow-hidden rounded-xl surface lift p-5"
                      >
                        <h4 className="text-base font-semibold leading-tight">{a.title}</h4>
                        <p className="mt-1.5 text-xs text-muted-foreground">{a.org}</p>
                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{kind}</span>
                          <span className="font-mono text-[10px] text-muted-foreground group-hover:text-lime transition">view →</span>
                        </div>
                      </a>
                    ) : (
                      <div key={i} className="relative block overflow-hidden rounded-xl surface p-5 opacity-85">
                        <h4 className="text-base font-semibold leading-tight">{a.title}</h4>
                        <p className="mt-1.5 text-xs text-muted-foreground">{a.org}</p>
                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{kind}</span>
                          <span className="font-mono text-[10px] text-muted-foreground">proof pending</span>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
