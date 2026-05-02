import { useState } from "react";
import { PROFILE } from "@/data/portfolio";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiCodeforces, SiKaggle } from "react-icons/si";

export function Contact() {
  const [sent, setSent] = useState(false);
  const socialCards = [
    {
      label: "GitHub",
      href: PROFILE.github,
      value: "@GovindJindal",
      sub: "code · projects",
      icon: FaGithub,
      tone: "from-slate-900 via-slate-950 to-black border-cyan-400/40",
    },
    {
      label: "LinkedIn",
      href: PROFILE.linkedin,
      value: "Govind Jindal",
      sub: "professional network",
      icon: FaLinkedinIn,
      tone: "from-sky-700 via-blue-700 to-blue-900 border-sky-300/45",
    },
    {
      label: "Kaggle",
      href: PROFILE.kaggle,
      value: "@govindjindal7808",
      sub: "ml competitions",
      icon: SiKaggle,
      tone: "from-sky-500 via-cyan-500 to-sky-600 border-cyan-200/55",
    },
    {
      label: "Codeforces",
      href: PROFILE.codeforces,
      value: "@govindjindal7808",
      sub: "competitive programming",
      icon: SiCodeforces,
      tone: "from-indigo-950 via-slate-900 to-indigo-900 border-orange-300/40",
    },
  ] as const;

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-5xl px-4">
        <div className="reveal mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-lime">// 08 · open_channel</p>
          <h2 className="mt-2 text-4xl md:text-6xl font-bold tracking-tight">
            Let's build something <span className="text-lime">insane</span>.
          </h2>
          <p className="mt-3 text-muted-foreground">Drop a signal — I respond fast.</p>
        </div>

        <div className="reveal grid md:grid-cols-5 gap-5">
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); (e.target as HTMLFormElement).reset(); }}
            className="md:col-span-3 surface rounded-xl p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" name="name" placeholder="Your name"/>
              <Field label="Email" name="email" type="email" placeholder="you@domain.com"/>
            </div>
            <Field label="Subject" name="subject" placeholder="Project · Collab · Hire"/>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea required name="msg" rows={5} placeholder="Tell me what you're building..."
                className="mt-1.5 w-full bg-[oklch(0.215_0_0)] border border-white/10 rounded-md px-3 py-2.5 text-sm focus:border-lime focus:ring-1 focus:ring-[var(--lime)] focus:outline-none transition placeholder:text-muted-foreground/50"/>
            </div>
            <button type="submit" className="btn-lime w-full">
              {sent ? "Signal received ✦" : "Transmit Signal →"}
            </button>
          </form>

          <aside className="md:col-span-2 space-y-3">
            <a href={`mailto:${PROFILE.email}`} className="block surface rounded-xl p-5 lift">
              <p className="font-mono text-[10px] uppercase tracking-widest text-lime">primary_email</p>
              <p className="mt-1.5 text-base break-all">{PROFILE.email}</p>
            </a>
            <div className="grid gap-3 sm:grid-cols-2">
              {socialCards.map((card) => {
                const Icon = card.icon;
                return (
                  <a
                    key={card.label}
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`group relative overflow-hidden rounded-xl border bg-gradient-to-br ${card.tone} p-4 shadow-[0_14px_32px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1.5`}
                  >
                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-300" />
                    <div className="relative flex items-start gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/95 text-black">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-base font-semibold leading-none text-white">{card.label}</p>
                        <p className="mt-1 truncate text-xs text-white/80">{card.value}</p>
                        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/65">{card.sub}</p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <input required name={name} type={type} placeholder={placeholder}
        className="mt-1.5 w-full bg-[oklch(0.215_0_0)] border border-white/10 rounded-md px-3 py-2.5 text-sm focus:border-lime focus:ring-1 focus:ring-[var(--lime)] focus:outline-none transition placeholder:text-muted-foreground/50"/>
    </div>
  );
}
