import { motion, useScroll, useTransform } from "framer-motion";
import { TIMELINE } from "@/data/portfolio";
import { Cpu, Globe, Shield, Terminal, Zap, Code, Database, Sparkles } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  "Started BE CSE (AIML)": [Cpu, Code],
  "Hack Nexus 1.0": [Globe, Terminal],
  "SIH 2025 (Internal)": [Shield, Zap],
  "Research Team Member": [Database, Sparkles],
  "Sustainability Hackathon": [Globe, Zap],
  "Hack Secure": [Shield, Terminal],
  "Eclipse 6.0": [Zap, Code],
  "Hack Helix": [Globe, Code],
  "FINVASIA": [Database, Terminal],
};

const FloatingElement = ({ delay = 0, className = "" }: { delay?: number; className?: string }) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
      x: [0, 5, 0],
      rotate: [-2, 2, -2],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
    className={`absolute pointer-events-none z-0 ${className}`}
  >
    <div className="w-16 h-10 rounded-lg glass border-lime/20 shadow-glow opacity-40 blur-[1px]" />
  </motion.div>
);

const Particle = ({ delay = 0, top = "0%", left = "0%" }: { delay?: number; top?: string; left?: string }) => (
  <motion.div
    animate={{
      y: [0, -15, 0],
      opacity: [0.2, 0.5, 0.2],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
    className="absolute h-1 w-1 rounded-full bg-lime z-0"
    style={{ top, left }}
  />
);

export function Timeline() {
  return (
    <section id="timeline" className="relative py-28 overflow-hidden">
      {/* Background ambient wash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-lime/[0.02] blur-[140px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime/10 border border-lime/20 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-lime leading-none mt-0.5">// 05 · trajectory</p>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none h-display">
            The <span className="text-lime">timeline</span>.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl text-lg">System logs of education, research, and milestones.</p>
        </motion.div>

        <div className="relative pl-8 md:pl-16 border-l border-white/10 ml-4 md:ml-0">
          {/* Glowing line overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-lime/30 to-transparent" />

          {TIMELINE.map((t, i) => {
            const icons = ICON_MAP[t.title] || [Terminal, Code];
            
            return (
              <div key={i} className="relative pb-24 last:pb-0 group">
                {/* Timeline Node */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="absolute -left-[41px] md:-left-[57px] top-1.5 h-4 w-4 rounded-full bg-[#0D0D0D] border-2 border-lime z-30 flex items-center justify-center"
                  style={{ boxShadow: "0 0 15px rgba(182,255,0,0.5)" }}
                >
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-lime rounded-full" 
                  />
                </motion.div>

                {/* Card Container with Antigravity Motion */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="relative"
                >
                  {/* Floating decorative elements around the card */}
                  <FloatingElement delay={i * 0.5} className="-top-6 -right-8" />
                  <FloatingElement delay={i * 0.7 + 1} className="bottom-4 -left-10" />
                  <Particle delay={i * 0.3} top="-10%" left="80%" />
                  <Particle delay={i * 0.4 + 1} top="90%" left="10%" />

                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 4 + (i % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -12,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    className="surface rounded-2xl p-6 md:p-8 lift glass-strong relative z-10 border border-white/5 hover:border-lime/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-lime/80 bg-lime/5 px-2 py-0.5 rounded border border-lime/10">
                        {t.year}
                      </span>
                      <div className="flex gap-2">
                        {icons.map((Icon: any, idx: number) => (
                          <Icon key={idx} size={14} className="text-muted-foreground/40" />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-lime transition-colors">
                        {t.title}
                      </h3>
                      <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">{t.org}</p>
                    </div>
                    
                    <p className="text-base text-foreground/60 mt-5 leading-relaxed max-w-2xl font-light">
                      {t.detail}
                    </p>

                    {/* Subtle corner tech details */}
                    <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-[8px] uppercase tracking-tighter">
                      STBL-0{i+1} // NODE
                    </div>
                  </motion.div>

                  {/* Glow layer behind card */}
                  <div className="absolute inset-0 bg-lime/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
