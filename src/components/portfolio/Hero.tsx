import { useEffect, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import { PROFILE } from "@/data/portfolio";
import avatarImg from "@/assets/avatar.png";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const HISAR_COORDS: [number, number] = [29.1492, 75.7217];
const CHITKARA_COORDS: [number, number] = [30.516389, 76.658611];
const MAP_CENTER: [number, number] = [29.8328, 76.1892];
const NODE_ID = "NODE_0286";
const STUDY_NODE_ID = "NODE_CU01";

function LocationPreviewCard({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="map-preview-card pointer-events-auto absolute right-0 top-full z-40 mt-3 w-[17rem] origin-top-right rounded-2xl glass-strong p-3 opacity-0 shadow-[0_22px_70px_-24px_rgba(0,0,0,0.9)] transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 translate-y-2 scale-95">
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        <span>location preview</span>
        <span className="text-lime/80">active</span>
      </div>
      <div className="relative overflow-hidden rounded-[1.1rem] border border-white/8 bg-[#101010] p-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_38%,rgba(182,255,0,0.16),transparent_0,transparent_18%,rgba(182,255,0,0.08)_18%,transparent_28%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04),transparent_65%)]" />
        <svg viewBox="0 0 240 140" className="relative z-10 h-32 w-full">
          <rect x="0" y="0" width="240" height="140" rx="18" fill="#0E0E0E" />
          <g opacity="0.4" stroke="rgba(255,255,255,0.08)">
            <path d="M0 28h240M0 56h240M0 84h240M0 112h240" />
            <path d="M40 0v140M80 0v140M120 0v140M160 0v140M200 0v140" />
          </g>
          <g fill="#1F1F1F" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5">
            <path d="M20 46c10-12 26-15 39-11 6 2 11 2 14 8 2 5-4 9-7 13-6 8-8 19-18 22-11 4-18-3-27-7-10-5-17-15-14-25 1-4 6-3 13 0z" />
            <path d="M90 32c13-10 29-13 47-11 11 1 22 6 29 12 4 3 7 9 2 11-8 4-15 0-23 4-7 4-8 12-16 15-8 3-15-1-24 1-10 2-23 10-31 2-8-8 2-23 16-34z" />
            <path d="M170 72c10-7 18-3 27 0 11 3 22 8 27 18 3 7-2 13-9 15-14 5-29-2-41-10-9-6-18-16-13-23 2-1 5-1 9 0z" />
            <path d="M144 88c6-3 12-2 17 4 5 7 4 16-3 19-7 4-14 0-18-6-5-6-3-14 4-17z" />
          </g>
          <path
            d="M149 62c3-4 8-6 12-5 5 1 7 6 10 10 2 3 5 4 4 8-2 4-7 5-10 7-2 3-1 7-5 8-5 1-9-3-12-6-4-4-9-7-8-13 1-4 6-5 9-9z"
            fill="rgba(182,255,0,0.45)"
            stroke="rgba(182,255,0,0.85)"
            strokeWidth="1.4"
          />
          <circle cx="163" cy="83" r="4.5" fill="#B6FF00" className="animate-pulse-soft" />
          <circle cx="163" cy="83" r="10" fill="none" stroke="rgba(182,255,0,0.4)" className="map-preview-ring" />
        </svg>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Hisar, Haryana</div>
          <div className="mt-1 text-sm text-foreground">India node online</div>
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="rounded-full border border-lime/20 bg-lime/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-lime transition-colors hover:bg-lime/20 hover:border-lime/40 cursor-pointer"
        >
          click
        </button>
      </div>
    </div>
  );
}

function createNodeIcon(nodeId: string, lat: number, lng: number) {
  return `
    <div class="map-node">
      <span class="map-node__pulse"></span>
      <span class="map-node__dot"></span>
      <div class="map-node__hud">
        <div class="map-node__hud-row"><span>NODE</span><strong>${nodeId}</strong></div>
        <div class="map-node__hud-row"><span>STATUS</span><strong>ACTIVE</strong></div>
        <div class="map-node__hud-row"><span>LAT/LNG</span><strong>${lat.toFixed(4)} / ${lng.toFixed(4)}</strong></div>
      </div>
    </div>
  `;
}

let cachedMapModules: any = null;

function WorldMap({ className = "", preview = false }: { className?: string; preview?: boolean }) {
  const [mapModules, setMapModules] = useState<any>(cachedMapModules);

  useEffect(() => {
    if (cachedMapModules) return;

    let mounted = true;
    Promise.all([import("react-leaflet"), import("leaflet")]).then(([reactLeaflet, leaflet]) => {
      if (!mounted) return;
      const modules = {
        MapContainer: reactLeaflet.MapContainer,
        Marker: reactLeaflet.Marker,
        TileLayer: reactLeaflet.TileLayer,
        Tooltip: reactLeaflet.Tooltip,
        L: leaflet.default,
      };
      cachedMapModules = modules;
      setMapModules(modules);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const markerIcon = useMemo(() => {
    if (!mapModules) return null;
    return mapModules.L.divIcon({
      className: "map-node-icon",
      html: createNodeIcon(NODE_ID, HISAR_COORDS[0], HISAR_COORDS[1]),
      iconSize: [180, 80],
      iconAnchor: [18, 18],
    });
  }, [mapModules]);

  const studyMarkerIcon = useMemo(() => {
    if (!mapModules) return null;
    return mapModules.L.divIcon({
      className: "map-node-icon",
      html: createNodeIcon(STUDY_NODE_ID, CHITKARA_COORDS[0], CHITKARA_COORDS[1]),
      iconSize: [180, 80],
      iconAnchor: [18, 18],
    });
  }, [mapModules]);

  if (!mapModules || !markerIcon || !studyMarkerIcon) {
    return <div className={`${className} bg-[#090909]`} />;
  }

  const { MapContainer, Marker, TileLayer, Tooltip } = mapModules;

  return (
    <div className={className}>
      <MapContainer
        center={MAP_CENTER}
        zoom={preview ? 3 : 4}
        scrollWheelZoom
        doubleClickZoom
        dragging
        zoomControl={false}
        attributionControl={false}
        className="h-full w-full bg-[#090909]"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains={["a", "b", "c", "d"]}
        />
        <Marker position={HISAR_COORDS} icon={markerIcon}>
          <Tooltip
            direction="top"
            offset={[0, -18]}
            className="leaflet-node-tooltip"
            opacity={1}
          >
            Hisar, Haryana — India
          </Tooltip>
        </Marker>
        <Marker position={CHITKARA_COORDS} icon={studyMarkerIcon}>
          <Tooltip
            direction="top"
            offset={[0, -18]}
            className="leaflet-node-tooltip"
            opacity={1}
          >
            Chitkara University (Punjab Campus), Rajpura — 30°30'59"N, 76°39'31"E
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
}

function LocationModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="map-modal border-white/10 bg-transparent p-0 shadow-none sm:rounded-[1.75rem]">
        <DialogTitle className="sr-only">Location module</DialogTitle>
        <DialogDescription className="sr-only">
          Interactive world map showing Hisar and Chitkara University (Punjab campus).
        </DialogDescription>
        <div className="relative h-full min-h-[100svh] w-full overflow-hidden bg-[#090909] sm:min-h-[90vh] sm:rounded-[1.75rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(182,255,0,0.12),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.4))] pointer-events-none z-10" />
          <div className="absolute left-5 top-5 z-20 rounded-2xl glass-strong px-4 py-3 sm:left-6 sm:top-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">geo / node interface</div>
            <div className="mt-2 text-lg text-foreground">Hisar + Chitkara University (Punjab)</div>
            <div className="mt-3 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="rounded-full border border-white/10 px-2 py-1">lat 29.1492</span>
              <span className="rounded-full border border-white/10 px-2 py-1">lng 75.7217</span>
              <span className="rounded-full border border-white/10 px-2 py-1">lat 30.5164</span>
              <span className="rounded-full border border-white/10 px-2 py-1">lng 76.6586</span>
              <span className="rounded-full border border-lime/20 bg-lime/10 px-2 py-1 text-lime">status active</span>
              <span className="rounded-full border border-white/10 px-2 py-1">{NODE_ID}</span>
              <span className="rounded-full border border-white/10 px-2 py-1">{STUDY_NODE_ID}</span>
            </div>
          </div>
          <div className="absolute bottom-5 left-5 z-20 hidden rounded-2xl glass px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:block">
            <div>zoom + pan enabled</div>
            <div className="mt-1 text-lime/80">signal lock / neural lime</div>
          </div>
          {open && <WorldMap className="h-full w-full" />}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Typing({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = words[i % words.length];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del) {
        setTxt(cur.slice(0, txt.length + 1));
        if (txt.length + 1 === cur.length) setTimeout(() => setDel(true), 1600);
      } else {
        setTxt(cur.slice(0, txt.length - 1));
        if (txt.length - 1 === 0) { setDel(false); setI((v) => v + 1); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [txt, del, i, words]);
  return (
    <span className="font-mono text-lime">
      {txt}<span className="ml-0.5 inline-block w-2 h-4 bg-lime align-middle animate-blink" />
    </span>
  );
}

function AbstractVisual({ onOpenMap }: { onOpenMap: () => void }) {
  return (
    <div className="relative aspect-square mx-auto w-full max-w-[24rem] sm:max-w-[28rem] lg:max-w-[34rem] xl:max-w-[38rem]">
      {/* concentric rings */}
      <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
      <div className="absolute inset-6 sm:inset-8 rounded-full border border-white/[0.08]" />
      <div className="absolute inset-12 sm:inset-16 rounded-full border border-lime/20" />
      <div className="absolute inset-20 sm:inset-24 rounded-full border border-lime/30" />

      {/* core */}
      <div className="absolute inset-[4.75rem] sm:inset-[5.25rem] md:inset-[5.5rem] lg:inset-[6.5rem] xl:inset-[7.25rem] rounded-full surface-2 flex items-center justify-center glow-lime-strong overflow-hidden border border-lime/30 z-20">
        <img src={avatarImg} alt="Govind Jindal" className="w-full h-full object-cover scale-[1.14]" />
      </div>

      {/* orbit dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <div key={deg}
             className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-lime"
             style={{
               transform: `rotate(${deg}deg) translateX(${138 + (i % 2) * 28}px) rotate(-${deg}deg)`,
               boxShadow: "0 0 10px rgba(182,255,0,0.6)",
             }} />
      ))}

      {/* corner data labels */}
      <div className="absolute top-0 left-0 font-mono text-[10px] text-muted-foreground">
        <div>NODE_001</div>
        <div className="text-lime/60">↳ active</div>
      </div>
      <div className="absolute top-0 right-0 text-right">
        <div className="group relative inline-flex">
          <button
            type="button"
            onClick={onOpenMap}
            className="rounded-xl border border-transparent px-2 py-1 font-mono text-[10px] text-muted-foreground transition-all duration-300 hover:border-lime/25 hover:bg-white/[0.03] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/60"
            aria-label="Open location map for Hisar, Haryana, India"
          >
            <div>LAT 28.6°N India</div>
            <div className="text-lime/60">↳ geo module</div>
          </button>
          <LocationPreviewCard onOpen={onOpenMap} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 font-mono text-[10px] text-muted-foreground">
        <div>UPTIME 99.9</div>
        <div className="text-lime/60">↳ stable</div>
      </div>
      <div className="absolute bottom-0 right-0 font-mono text-[10px] text-muted-foreground text-right">
        <div>BUILD 2026</div>
        <div className="text-lime/60">↳ shipping</div>
      </div>
    </div>
  );
}

export function Hero() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  function openMap() {
    setIsMapOpen(true);
  }

  return (
    <>
      <section id="top" className="relative min-h-screen flex items-center pt-28 pb-16 md:pt-32 md:pb-18 overflow-hidden">
        {/* layered background: soft grid + animated grid + radial wash */}
        <div className="absolute inset-0 grid-bg-soft" aria-hidden />
        <div className="absolute inset-0 grid-bg-anim opacity-60" aria-hidden />
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(45% 40% at 70% 35%, rgba(182,255,0,0.10), transparent 60%), radial-gradient(40% 35% at 20% 80%, rgba(120,140,255,0.07), transparent 65%)",
          }}
        />

        {/* top status rail — product chrome */}
        <div className="absolute top-24 inset-x-0 z-10 hidden md:block">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="sec-num">sys / 01 · interface</span>
              </div>
              <div className="flex items-center gap-4">
                <span>build 2026.05</span>
                <span className="text-lime/80">● online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 xl:px-10 grid items-center gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-14">
          <div className="animate-fade-up max-w-[44rem]">
            <div className="inline-flex items-center gap-2 rounded-full surface px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-soft" />
              <span>available · {PROFILE.location}</span>
            </div>
            <h1 className="mt-5 h-display text-[3.4rem] leading-[0.94] font-bold sm:text-[4.35rem] md:text-[5rem] lg:text-[5.7rem] xl:text-[6.3rem]">
              <span className="inline whitespace-nowrap text-foreground">Govind</span>
              <span className="inline whitespace-nowrap text-lime">{" "}Jindal.</span>
            </h1>
            <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-foreground/80 md:text-[1.325rem]">
              I build <span className="text-foreground">AI systems</span> that work where the internet doesn't —
              edge models, offline copilots, and resilient infrastructure.
            </p>
            <div className="mt-3 text-sm font-mono text-muted-foreground">
              <span className="text-muted-foreground/70">role ▸ </span>
              <Typing words={PROFILE.roles} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="btn-lime">
                Explore Projects
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
              <a
                href="/Resume__1st_Year_.pdf"
                download="Govind_Jindal_Resume.pdf"
                className="btn-outline"
              >
                View Resume
              </a>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-5 border-t border-white/5 pt-5">
              {[
                { k: "8+", v: "Projects", t: "shipped" },
                { k: "7", v: "Hackathons", t: "competed" },
                { k: "15+", v: "Certs", t: "earned" },
              ].map((s) => (
                <div key={s.v} className="group">
                  <dt className="text-3xl font-bold text-lime font-mono">{s.k}</dt>
                  <dd className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">{s.v}</dd>
                  <dd className="text-[10px] font-mono text-muted-foreground/60 mt-0.5">↳ {s.t}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-fade-up flex justify-center md:justify-end md:pr-2 lg:pr-4" style={{ animationDelay: ".15s" }}>
            <AbstractVisual onOpenMap={openMap} />
          </div>
        </div>

        <a href="#terminal" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-lime transition flex flex-col items-center gap-1.5">
          <span>scroll</span>
          <span className="h-8 w-px bg-gradient-to-b from-lime to-transparent" />
        </a>
      </section>
      <LocationModal open={isMapOpen} onOpenChange={setIsMapOpen} />
    </>
  );
}
