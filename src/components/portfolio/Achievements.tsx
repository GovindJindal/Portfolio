import { type ComponentType, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ACHIEVEMENTS } from "@/data/portfolio";
import { Award, BadgeCheck, ExternalLink, FileBadge2, ShieldCheck, Sparkles, Trophy, X } from "lucide-react";

type AchievementKind = "Hackathon" | "Cert" | "Workshop" | "Competition" | "Other";
type AchievementRecord = (typeof ACHIEVEMENTS)[number] & {
  normalizedKind: AchievementKind;
  skills: string[];
};

const KIND_ICON: Record<AchievementKind, ComponentType<{ className?: string }>> = {
  Hackathon: Sparkles,
  Cert: BadgeCheck,
  Workshop: Award,
  Competition: Trophy,
  Other: FileBadge2,
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

function inferSkills(title: string, org: string, kind: AchievementKind): string[] {
  const source = `${title} ${org}`.toLowerCase();
  const tags = new Set<string>();
  if (source.includes("azure")) tags.add("Cloud");
  if (source.includes("disaster")) tags.add("Risk");
  if (source.includes("figma") || source.includes("design")) tags.add("Design");
  if (source.includes("react")) tags.add("React");
  if (source.includes("prompt")) tags.add("Prompting");
  if (source.includes("python")) tags.add("Python");
  if (kind === "Hackathon" && source.includes("sustainability")) tags.add("Sustainability");
  if (kind === "Competition" && source.includes("pitch")) tags.add("Pitching");
  return Array.from(tags).slice(0, 4);
}

function statusTag(kind: AchievementKind, hasProof: boolean) {
  if (!hasProof) return "COMPLETED";
  if (kind === "Cert") return "CERTIFIED";
  return "VERIFIED";
}

export function Achievements() {
  const [activeRecord, setActiveRecord] = useState<AchievementRecord | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const records: AchievementRecord[] = useMemo(
    () =>
      ACHIEVEMENTS.map((entry) => {
        const normalizedKind = normalizeKind(entry.kind);
        return {
          ...entry,
          normalizedKind,
          skills: inferSkills(entry.title, entry.org, normalizedKind),
        };
      }),
    []
  );

  return (
    <section id="achievements" className="relative py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(182,255,0,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(182,255,0,0.06)_1px,transparent_1px)] [background-size:64px_64px]" />
        <motion.div
          className="absolute top-10 left-0 h-px w-full bg-gradient-to-r from-transparent via-lime/40 to-transparent"
          animate={shouldReduceMotion ? undefined : { x: ["-20%", "20%", "-20%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-14 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent"
          animate={shouldReduceMotion ? undefined : { x: ["20%", "-20%", "20%"] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        {Array.from({ length: 8 }).map((_, idx) => (
          <motion.span
            key={idx}
            className="absolute h-1.5 w-1.5 rounded-full bg-lime/60 blur-[0.5px]"
            style={{ top: `${10 + idx * 11}%`, left: `${8 + (idx * 11) % 86}%` }}
            animate={shouldReduceMotion ? undefined : { opacity: [0.15, 0.7, 0.15], y: [0, -10, 0] }}
            transition={{ duration: 4 + idx * 0.35, repeat: Infinity, delay: idx * 0.08 }}
          />
        ))}
      </div>

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
            const items = records.filter((a) => a.normalizedKind === kind);
            if (!items.length) return null;
            const Icon = KIND_ICON[kind];
            return (
              <div key={kind} className="reveal">
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    <Icon className="inline h-3.5 w-3.5 text-lime mr-2 -mt-0.5" />
                    {LABELS[kind]}
                  </h3>
                  <span className="font-mono text-[10px] text-muted-foreground">{String(items.length).padStart(2, "0")} entries</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                  {items.map((a, i) => {
                    const hackathonMode = a.normalizedKind === "Hackathon";
                    const certMode = a.normalizedKind === "Cert";
                    return (
                      <motion.button
                        key={`${a.title}-${i}`}
                        type="button"
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                y: -6,
                                scale: 1.01,
                              }
                        }
                        onClick={() => setActiveRecord(a)}
                        className={`group relative cursor-pointer overflow-hidden rounded-2xl p-5 text-left border backdrop-blur-xl transition-all duration-300
                        ${
                          hackathonMode
                            ? "bg-black/50 border-lime/30 shadow-[0_10px_35px_rgba(130,255,0,0.16)] hover:border-lime/60 hover:shadow-[0_18px_40px_rgba(130,255,0,0.28)]"
                            : certMode
                            ? "bg-black/45 border-emerald-300/20 shadow-[0_8px_26px_rgba(0,0,0,0.35)] hover:border-emerald-300/45 hover:shadow-[0_14px_34px_rgba(90,255,190,0.2)]"
                            : "bg-black/45 border-white/15 shadow-[0_8px_26px_rgba(0,0,0,0.35)] hover:border-lime/35 hover:shadow-[0_14px_34px_rgba(180,255,0,0.18)]"
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-lime/5 via-transparent to-emerald-300/5 opacity-70 group-hover:opacity-100 transition-opacity" />
                        {hackathonMode && (
                          <motion.div
                            className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-lime/20 blur-2xl"
                            animate={shouldReduceMotion ? undefined : { opacity: [0.25, 0.55, 0.25] }}
                            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}

                        <div className="relative">
                          <div className="mb-3 flex items-start justify-between gap-3">
                            <span
                              className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.14em]
                              ${
                                certMode
                                  ? "border-emerald-200/40 bg-emerald-200/10 text-emerald-200"
                                  : "border-lime/35 bg-lime/10 text-lime"
                              }`}
                            >
                              {statusTag(a.normalizedKind, Boolean(a.url))}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{a.normalizedKind}</span>
                          </div>
                          <h4 className="text-base font-semibold leading-tight">{a.title}</h4>
                          <p className="mt-1.5 text-xs text-muted-foreground">{a.org}</p>

                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {a.skills.map((skill) => (
                              <span
                                key={`${a.title}-${skill}`}
                                className="rounded-full border border-lime/25 bg-lime/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-lime/90"
                              >
                                {skill.toUpperCase()}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/35 px-3 py-2.5 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-300">
                            <div className="text-[11px] text-foreground/80">
                              <p className="font-mono uppercase tracking-wider text-lime/80">
                                {a.url ? "Verification ready" : "Awaiting proof link"}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                            <span className="font-mono text-[10px] text-muted-foreground">vault module {String(i + 1).padStart(2, "0")}</span>
                            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-lime">
                              open node <ExternalLink className="h-3 w-3" />
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeRecord && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm p-4 md:p-8" onClick={() => setActiveRecord(null)}>
          <div
            className="mx-auto w-full max-w-3xl rounded-2xl border border-lime/35 bg-[#090909]/95 shadow-[0_0_50px_rgba(170,255,0,0.2)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-lime">Achievement Vault Record</p>
                <h4 className="mt-1 text-lg font-semibold">{activeRecord.title}</h4>
                <p className="text-xs text-muted-foreground">{activeRecord.org}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveRecord(null)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-lime/30 text-lime hover:bg-lime/10 transition"
                aria-label="Close achievement details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-5 p-5 md:grid-cols-[1.25fr_1fr]">
              <div className="rounded-xl border border-lime/20 bg-black/45 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-lime/80 mb-3">Preview Panel</p>
                <div className="rounded-lg border border-white/10 bg-black/40 p-4 min-h-40 flex flex-col justify-center">
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {activeRecord.skills.map((skill) => (
                      <span key={`modal-${skill}`} className="rounded-full border border-lime/25 bg-lime/10 px-2.5 py-1 text-[10px] font-mono tracking-[0.12em] text-lime">
                        {skill.toUpperCase()}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {activeRecord.url ? "Verification link is available for this record." : "Verification link not available yet."}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Actions</p>
                {activeRecord.url ? (
                  <a
                    href={activeRecord.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-lime/35 bg-lime/10 px-4 py-2.5 text-sm font-medium text-lime hover:bg-lime/20 transition"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Verify Credential
                  </a>
                ) : (
                  <div className="rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-muted-foreground">Proof link pending</div>
                )}
                <button
                  type="button"
                  onClick={() => setActiveRecord(null)}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-foreground/80 hover:bg-white/10 transition"
                >
                  <FileBadge2 className="h-4 w-4" />
                  Close Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
