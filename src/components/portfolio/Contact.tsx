import { useState } from "react";
import { PROFILE } from "@/data/portfolio";

export function Contact() {
  const [sent, setSent] = useState(false);
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
            {[
              { l: "GitHub", h: PROFILE.github, v: "@GovindJindal" },
              { l: "LinkedIn", h: PROFILE.linkedin, v: "Govind Jindal" },
              { l: "Kaggle", h: PROFILE.kaggle, v: "@govindjindal7808" },
              { l: "Codeforces", h: PROFILE.codeforces, v: "@govindjindal7808" },
            ].map((c) => (
              <a key={c.l} href={c.h} target="_blank" rel="noreferrer" className="block surface rounded-xl p-4 lift">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.l}</p>
                <p className="mt-0.5 text-sm">{c.v}</p>
              </a>
            ))}
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
