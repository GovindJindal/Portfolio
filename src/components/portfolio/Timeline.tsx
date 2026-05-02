import { useMemo, useState } from "react";
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

type VisualKind = "graph" | "progress" | "dashboard" | "waveform" | "code" | "network" | "activity";
type VisualGlow = "soft" | "medium" | "strong";
type VisualShape = "rect" | "square" | "widget";

type FloatingVisual = {
  id: string;
  kind: VisualKind;
  className: string;
  rotate: string;
  glow: VisualGlow;
  shape: VisualShape;
  drift: "near" | "far";
};

const TIMELINE_IMAGE_MODULES = import.meta.glob("/public/timeline/**/*.{png,jpg,jpeg,JPG,JPEG,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const IMAGE_FOLDER_BY_TITLE: Record<string, string> = {
  "SIH 2025 (Internal)": "SIH",
  "Hack Nexus 1.0": "Hack Nexus1.0",
  "Research Team Member": "Research Team Member",
  "Sustainability Hackathon": "Sustainability Hackathon",
  "Eclipse 6.0": "Eclipse6.0",
  "Hack Helix": "Hack Helix",
  FINVASIA: "Finvasia",
};

const ORDERED_TIMELINE_IMAGES = Object.entries(TIMELINE_IMAGE_MODULES)
  .sort(([a], [b]) => a.localeCompare(b))
  .reduce<Record<string, string[]>>((acc, [fullPath, url]) => {
    const segments = fullPath.split("/");
    const folder = segments[segments.length - 2] || "";
    if (!folder) return acc;
    if (!acc[folder]) acc[folder] = [];
    acc[folder].push(url);
    return acc;
  }, {});

type ImageLayout = {
  top: number;
  offset: number;
  side: "left" | "right";
  rotate: number;
  shape: VisualShape;
  glow: VisualGlow;
  drift: "near" | "far";
};

function createImageLayout(index: number, itemIndex: number): ImageLayout {
  const side: "left" | "right" = index % 2 === 0 ? "left" : "right";
  const leftSlots = [
    { top: -28, offset: 54 },
    { top: 24, offset: 66 },
    { top: 78, offset: 58 },
    { top: 132, offset: 70 },
  ];
  const rightSlots = [
    { top: -36, offset: 58 },
    { top: 12, offset: 72 },
    { top: 66, offset: 62 },
    { top: 122, offset: 74 },
  ];
  const slot = (side === "left" ? leftSlots : rightSlots)[Math.floor(index / 2) % 4];
  const row = Math.floor(index / 2);
  return {
    side,
    top: slot.top + row * 2,
    offset: slot.offset + row * 2,
    rotate: (side === "left" ? -1 : 1) * (3 + (index % 5)),
    shape: index % 3 === 0 ? "rect" : index % 3 === 1 ? "square" : "widget",
    glow: index % 3 === 0 ? "strong" : index % 3 === 1 ? "medium" : "soft",
    drift: index % 2 === 0 ? "near" : "far",
  };
}

const TIMELINE_VISUALS: Record<
  string,
  {
    type: "education" | "hackathon" | "research";
    glow: string;
    visuals: FloatingVisual[];
  }
> = {
  "Started BE CSE (AIML)": {
    type: "education",
    glow: "rgba(0, 255, 145, 0.12)",
    visuals: [
      { id: "edu-graph-1", kind: "progress", className: "-top-14 -right-8", rotate: "rotate-[3deg]", glow: "soft", shape: "rect", drift: "near" },
      { id: "edu-graph-2", kind: "graph", className: "bottom-2 -left-12", rotate: "-rotate-[4deg]", glow: "medium", shape: "square", drift: "far" },
      { id: "edu-graph-3", kind: "activity", className: "top-1/2 -right-20", rotate: "rotate-[2deg]", glow: "soft", shape: "widget", drift: "near" },
    ],
  },
  "Hack Nexus 1.0": {
    type: "hackathon",
    glow: "rgba(183, 255, 0, 0.12)",
    visuals: [
      { id: "hnx-dash-1", kind: "dashboard", className: "-top-16 -left-12", rotate: "-rotate-[3deg]", glow: "strong", shape: "rect", drift: "far" },
      { id: "hnx-wave-2", kind: "waveform", className: "bottom-4 -right-10", rotate: "rotate-[5deg]", glow: "medium", shape: "square", drift: "near" },
      { id: "hnx-code-3", kind: "code", className: "top-8 -right-20", rotate: "-rotate-[2deg]", glow: "soft", shape: "widget", drift: "far" },
    ],
  },
  "SIH 2025 (Internal)": {
    type: "hackathon",
    glow: "rgba(0, 245, 180, 0.12)",
    visuals: [
      { id: "sih-dash-1", kind: "dashboard", className: "-top-12 -right-10", rotate: "rotate-[4deg]", glow: "medium", shape: "rect", drift: "near" },
      { id: "sih-net-2", kind: "network", className: "bottom-1 -left-14", rotate: "-rotate-[5deg]", glow: "strong", shape: "square", drift: "far" },
      { id: "sih-widget-3", kind: "activity", className: "top-1/2 -left-20", rotate: "rotate-[2deg]", glow: "soft", shape: "widget", drift: "near" },
    ],
  },
  "Research Team Member": {
    type: "research",
    glow: "rgba(150, 255, 90, 0.12)",
    visuals: [
      { id: "rsh-net-1", kind: "network", className: "-top-14 -right-8", rotate: "rotate-[3deg]", glow: "strong", shape: "rect", drift: "far" },
      { id: "rsh-code-2", kind: "code", className: "bottom-2 -left-12", rotate: "-rotate-[3deg]", glow: "medium", shape: "square", drift: "near" },
      { id: "rsh-graph-3", kind: "graph", className: "top-8 -right-20", rotate: "rotate-[2deg]", glow: "soft", shape: "widget", drift: "far" },
    ],
  },
  "Sustainability Hackathon": {
    type: "hackathon",
    glow: "rgba(120, 255, 210, 0.12)",
    visuals: [
      { id: "sus-wave-1", kind: "waveform", className: "-top-16 -left-12", rotate: "-rotate-[2deg]", glow: "medium", shape: "rect", drift: "near" },
      { id: "sus-dash-2", kind: "dashboard", className: "bottom-4 -right-10", rotate: "rotate-[4deg]", glow: "strong", shape: "square", drift: "far" },
      { id: "sus-net-3", kind: "network", className: "top-12 -right-20", rotate: "-rotate-[3deg]", glow: "soft", shape: "widget", drift: "near" },
    ],
  },
  "Hack Secure": {
    type: "research",
    glow: "rgba(150, 255, 0, 0.12)",
    visuals: [
      { id: "sec-code-1", kind: "code", className: "-top-14 -right-10", rotate: "rotate-[3deg]", glow: "strong", shape: "rect", drift: "far" },
      { id: "sec-wave-2", kind: "waveform", className: "bottom-0 -left-14", rotate: "-rotate-[5deg]", glow: "medium", shape: "square", drift: "near" },
      { id: "sec-activity-3", kind: "activity", className: "top-1/2 -right-20", rotate: "rotate-[2deg]", glow: "soft", shape: "widget", drift: "near" },
    ],
  },
  "Eclipse 6.0": {
    type: "hackathon",
    glow: "rgba(0, 255, 200, 0.12)",
    visuals: [
      { id: "ecl-dash-1", kind: "dashboard", className: "-top-16 -right-8", rotate: "rotate-[5deg]", glow: "strong", shape: "rect", drift: "near" },
      { id: "ecl-graph-2", kind: "graph", className: "bottom-2 -left-12", rotate: "-rotate-[4deg]", glow: "medium", shape: "square", drift: "far" },
      { id: "ecl-code-3", kind: "code", className: "top-8 -right-20", rotate: "-rotate-[2deg]", glow: "soft", shape: "widget", drift: "far" },
    ],
  },
  "Hack Helix": {
    type: "hackathon",
    glow: "rgba(190, 255, 120, 0.12)",
    visuals: [
      { id: "hlx-wave-1", kind: "waveform", className: "-top-12 -left-12", rotate: "-rotate-[3deg]", glow: "strong", shape: "rect", drift: "far" },
      { id: "hlx-dash-2", kind: "dashboard", className: "bottom-4 -right-10", rotate: "rotate-[4deg]", glow: "medium", shape: "square", drift: "near" },
      { id: "hlx-activity-3", kind: "activity", className: "top-1/2 -left-20", rotate: "rotate-[2deg]", glow: "soft", shape: "widget", drift: "near" },
    ],
  },
  FINVASIA: {
    type: "research",
    glow: "rgba(0, 255, 160, 0.12)",
    visuals: [
      { id: "fin-graph-1", kind: "graph", className: "-top-14 -right-10", rotate: "rotate-[3deg]", glow: "strong", shape: "rect", drift: "near" },
      { id: "fin-network-2", kind: "network", className: "bottom-2 -left-14", rotate: "-rotate-[4deg]", glow: "medium", shape: "square", drift: "far" },
      { id: "fin-code-3", kind: "code", className: "top-8 -right-20", rotate: "-rotate-[2deg]", glow: "soft", shape: "widget", drift: "far" },
    ],
  },
};

function getTimelineImageSet(title: string, index: number) {
  const folder = IMAGE_FOLDER_BY_TITLE[title];
  const imagePool = (folder ? ORDERED_TIMELINE_IMAGES[folder] : undefined) || [];
  if (imagePool.length === 0) return [];
  return imagePool.map((src, idx) => ({
    src,
    layout: createImageLayout(idx, index),
    key: `${folder}-${idx}-${src}`,
    alt: `${title} visual ${idx + 1}`,
  }));
}

function FloatingPlaceholder({
  imageSrc,
  imageAlt,
  layout,
  delay,
  useFarParallax,
  parallaxNear,
  parallaxFar,
  onOpen,
}: {
  imageSrc: string;
  imageAlt: string;
  layout: ImageLayout;
  delay: number;
  useFarParallax: boolean;
  parallaxNear: any;
  parallaxFar: any;
  onOpen: (src: string, alt: string) => void;
}) {
  const glowClass =
    layout.glow === "strong"
      ? "shadow-[0_8px_30px_rgba(0,0,0,0.45),0_0_24px_rgba(182,255,0,0.34)] border-lime/50"
      : layout.glow === "medium"
      ? "shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_18px_rgba(182,255,0,0.26)] border-lime/40"
      : "shadow-[0_8px_20px_rgba(0,0,0,0.35),0_0_12px_rgba(182,255,0,0.18)] border-lime/30";

  const sizeClass =
    layout.shape === "rect"
      ? "w-40 lg:w-48 h-28 lg:h-[8.5rem]"
      : layout.shape === "square"
      ? "w-[8.5rem] lg:w-40 h-[8.5rem] lg:h-40"
      : "w-[7.5rem] lg:w-36 h-24 lg:h-28";
  const layerClass = layout.side === "left" ? "z-[10]" : "z-[28]";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 20px rgba(182,255,0,0.55))" }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      animate={{ y: [0, -8, 0] }}
      style={{
        y: useFarParallax ? parallaxFar : parallaxNear,
        top: `${layout.top}px`,
        [layout.side]: `-${layout.offset}px`,
        rotate: `${layout.rotate}deg`,
      }}
      className={`absolute ${layerClass} ${sizeClass} cursor-pointer`}
      onClick={() => onOpen(imageSrc, imageAlt)}
    >
      <div className={`glass rounded-xl border p-2.5 backdrop-blur-xl transition-transform duration-300 bg-black/35 ${glowClass}`}>
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full rounded-lg object-contain bg-black/35"
        />
      </div>
    </motion.div>
  );
}

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

const STORY_NOTES: Record<string, string[]> = {
  "Started BE CSE (AIML)": ["Entered BE CSE AIML with perfect first-sem momentum.", "Built strong ML + systems fundamentals from day one."],
  "Hack Nexus 1.0": ["Turned sustainability idea into EcoCity Connect prototype.", "Validated rapid build + team execution under pressure."],
  "SIH 2025 (Internal)": ["Developed AyurSutra in a constrained hackathon timeline.", "Translated healthcare workflow into a usable full-stack product."],
  "Research Team Member": ["Joined Evolve AI research circles and technical sessions.", "Documented ideas, experiments, and model explorations."],
  "Sustainability Hackathon": ["Pushed Fractal Fire Mamba concept in global hack setting.", "Focused on resilient infra + wildfire intelligence story."],
  "Hack Secure": ["Worked on Liquid Defense with a cybersecurity-first lens.", "Balanced model accuracy with practical threat signals."],
  "Eclipse 6.0": ["Presented ASHA-VANI and Aegis direction in competitive stage.", "Strengthened offline AI + social impact narrative."],
  "Hack Helix": ["Shipped Sign Setu to showcase accessibility-led product thinking.", "Merged AI, UX, and inclusive communication objectives."],
  FINVASIA: ["Built BODHI around social finance and AI-assisted workflows.", "Demonstrated practical fintech build speed with scalable intent."],
};

const GLOW_BY_TITLE: Record<string, string> = {
  "Started BE CSE (AIML)": "rgba(0, 255, 145, 0.12)",
  "Hack Nexus 1.0": "rgba(183, 255, 0, 0.12)",
  "SIH 2025 (Internal)": "rgba(0, 245, 180, 0.12)",
  "Research Team Member": "rgba(150, 255, 90, 0.12)",
  "Sustainability Hackathon": "rgba(120, 255, 210, 0.12)",
  "Hack Secure": "rgba(150, 255, 0, 0.12)",
  "Eclipse 6.0": "rgba(0, 255, 200, 0.12)",
  "Hack Helix": "rgba(190, 255, 120, 0.12)",
  FINVASIA: "rgba(0, 255, 160, 0.12)",
};

export function Timeline() {
  const { scrollYProgress } = useScroll();
  const parallaxNear = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const parallaxFar = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);
  const defaultVisualSet = useMemo(
    () => ({
      type: "hackathon" as const,
      glow: "rgba(182,255,0,0.12)",
      visuals: [
        { id: "default-dash", kind: "dashboard" as const, className: "-top-14 -right-8", rotate: "rotate-[3deg]", glow: "medium" as const, shape: "rect" as const, drift: "near" as const },
        { id: "default-wave", kind: "waveform" as const, className: "bottom-2 -left-12", rotate: "-rotate-[4deg]", glow: "soft" as const, shape: "square" as const, drift: "far" as const },
      ],
    }),
    []
  );

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
            const visualTheme = TIMELINE_VISUALS[t.title] || defaultVisualSet;
            const imageSet = getTimelineImageSet(t.title, i);
            const timelineStory = STORY_NOTES[t.title] || ["Milestone completed with strong momentum.", "Expanded build and collaboration depth."];
            const contextualGlow = visualTheme.glow || GLOW_BY_TITLE[t.title] || "rgba(182,255,0,0.12)";
            const isActive = activeIndex === i;
            
            return (
              <div
                key={i}
                className="relative last:pb-0 group"
                style={{ paddingBottom: `${Math.max(96, 96 + Math.max(0, imageSet.length - 2) * 42)}px` }}
              >
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
                  {/* Floating media visual elements (desktop/tablet only) */}
                  <div className="hidden md:block">
                    {imageSet.length > 0 ? imageSet.map((item, visualIdx) => (
                      <FloatingPlaceholder
                        key={item.key}
                        imageSrc={item.src}
                        imageAlt={item.alt}
                        layout={item.layout}
                        delay={visualIdx * 0.08}
                        useFarParallax={item.layout.drift === "far"}
                        parallaxNear={parallaxNear}
                        parallaxFar={parallaxFar}
                        onOpen={(src, alt) => setPreviewImage({ src, alt })}
                      />
                    )) : visualTheme.visuals.map((visual, visualIdx) => (
                      <motion.div
                        key={visual.id}
                        className={`absolute z-[8] ${visual.className} ${visual.rotate} ${visual.shape === "rect" ? "w-32 h-24" : visual.shape === "square" ? "w-28 h-28" : "w-24 h-20"}`}
                        style={{ y: visual.drift === "far" ? parallaxFar : parallaxNear }}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.45, ease: "easeOut", delay: visualIdx * 0.08 }}
                      >
                        <div className="glass rounded-xl border border-lime/30 p-2.5 backdrop-blur-xl bg-black/35">
                          <div className="h-full w-full rounded-lg bg-gradient-to-br from-lime/25 to-black/30" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <Particle delay={i * 0.3} top="-10%" left="80%" />
                  <Particle delay={i * 0.4 + 1} top="90%" left="10%" />

                  <motion.div
                    whileHover={{ 
                      scale: 1.01,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    className="surface rounded-2xl p-6 md:p-8 lift glass-strong relative z-20 border border-white/5 hover:border-lime/40 transition-colors cursor-pointer"
                    style={{
                      boxShadow: isActive
                        ? `0 20px 48px rgba(0,0,0,0.45), 0 0 30px ${contextualGlow}`
                        : "0 12px 30px rgba(0,0,0,0.35)",
                      background: isActive
                        ? `linear-gradient(135deg, rgba(14,14,14,0.92), ${contextualGlow})`
                        : "rgba(14,14,14,0.82)",
                    }}
                    onClick={() => setActiveIndex(isActive ? null : i)}
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

                    <motion.div
                      initial={false}
                      animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0, marginTop: isActive ? 18 : 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-xl border border-lime/20 bg-black/30 p-4 backdrop-blur-md">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-lime/80 mb-2">Expanded Story</p>
                        <div className="space-y-2 text-sm text-foreground/75">
                          {timelineStory.map((line, idx) => (
                            <p key={idx}>{line}</p>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {imageSet.length > 0 && (
                      <div className="mt-4 flex md:hidden gap-2 overflow-x-auto pb-1">
                        {imageSet.map((item) => (
                          <button
                            key={`mobile-${item.key}`}
                            type="button"
                            className="shrink-0 h-20 w-28 rounded-lg border border-lime/30 bg-black/30 p-1.5"
                            onClick={() => setPreviewImage({ src: item.src, alt: item.alt })}
                          >
                            <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="h-full w-full rounded-md object-contain bg-black/40" />
                          </button>
                        ))}
                      </div>
                    )}

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

      {previewImage && (
        <div
          className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <button
            type="button"
            className="absolute top-5 right-5 h-10 w-10 rounded-full border border-lime/40 text-lime bg-black/50"
            onClick={() => setPreviewImage(null)}
            aria-label="Close image preview"
          >
            ✕
          </button>
          <img
            src={previewImage.src}
            alt={previewImage.alt}
            className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl border border-lime/40 shadow-[0_0_30px_rgba(182,255,0,0.35)] bg-black/40"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
