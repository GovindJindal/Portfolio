import asha from "@/assets/proj-asha.jpg";
import fractal from "@/assets/proj-fractal.jpg";
import liquid from "@/assets/proj-liquid.jpg";
import sign from "@/assets/proj-sign.jpg";
import bodhi from "@/assets/proj-bodhi.jpg";
import eco from "@/assets/proj-eco.jpg";
import logic from "@/assets/proj-logic.jpg";
import ayur from "@/assets/proj-ayur.jpg";

export type Project = {
  id: string;
  name: string;
  category: "ai" | "research" | "security" | "fullstack" | "system";
  tagline: string;
  description: string;
  impact: string;
  stack: string[];
  github: string;
  demo?: string;
  image: string;
  highlight?: boolean;
  status?: "LIVE" | "RESEARCH" | "BETA" | "ARCHIVED";
  version?: string;
  metrics?: { label: string; value: string }[];
};

export const PROJECTS: Project[] = [
  {
    id: "asha",
    name: "ASHA-VANI",
    category: "ai",
    tagline: "Offline AI copilot for India's frontline health workers.",
    description:
      "A fully offline, voice-activated AI copilot delivering real-time Hinglish medical guidance. Optimized SLMs run on edge devices, bypassing the internet to bring instant triage to remote rural communities.",
    impact: "100% Offline · <500ms latency",
    stack: ["Python", "Qwen2.5 3B", "Oumi Fine-Tune", "FastAPI", "React"],
    github: "https://github.com/GovindJindal/ASHA-VANI.git",
    image: asha,
    highlight: true,
    status: "RESEARCH",
    version: "v0.4.1",
    metrics: [
      { label: "latency", value: "<500ms" },
      { label: "uptime", value: "100%" },
      { label: "mode", value: "offline" },
    ],
  },
  {
    id: "fractal",
    name: "Fractal Fire Mamba",
    category: "research",
    tagline: "AI + Chaos Theory for decentralized wildfire detection.",
    description:
      "A decentralized, multi-modal fire detection mesh. Mamba-130m State Space Models for temporal pattern recognition, fused with Hurst & Lyapunov exponents to mathematically prove fire vs. noise. LoRa + Iridium for off-grid comms.",
    impact: "Solar-powered · 24/7 thermal + RGB · Off-grid mesh",
    stack: ["PyTorch", "Mamba SSM", "OpenCV", "FastAPI", "LoRa"],
    github: "https://github.com/Fractal-Forest-Fire-Detection/fractal_fire_mamba.git",
    image: fractal,
    highlight: true,
    status: "RESEARCH",
    version: "v0.2.0",
    metrics: [
      { label: "power", value: "solar" },
      { label: "uplink", value: "LoRa" },
      { label: "duty", value: "24/7" },
    ],
  },
  {
    id: "liquid",
    name: "Liquid Defense",
    category: "security",
    tagline: "Continuous-time neural networks for encrypted threat detection.",
    description:
      "A novel cybersecurity architecture using Closed-form Continuous-time (CfC) Neural Networks. Treats time as a continuous physical variable to detect subtle timing anomalies in encrypted malware traffic.",
    impact: "Detects encrypted malware via Δt anomalies",
    stack: ["Python", "Java", "C++", "Android Studio", "CfC NN"],
    github: "https://github.com/Liquid-Defence/Liquid_Defence_Model.git",
    image: liquid,
    highlight: true,
    status: "RESEARCH",
    version: "v0.1.3",
    metrics: [
      { label: "model", value: "CfC NN" },
      { label: "signal", value: "Δt" },
      { label: "target", value: "encrypted" },
    ],
  },
  {
    id: "sign",
    name: "Sign Setu",
    category: "ai",
    tagline: "Bridging communication for the deaf community via ISL gloss.",
    description:
      "Converts text, audio, and video into Indian Sign Language gloss notation, enabling seamless communication between hearing and deaf/hard-of-hearing communities.",
    impact: "Inclusive AI for accessibility",
    stack: ["Next.js 15", "Three.js", "Django", "spaCy", "AssemblyAI"],
    github: "https://github.com/GovindJindal/Sign-Setu.git",
    image: sign,
    highlight: true,
    status: "BETA",
    version: "v0.3.0",
    metrics: [
      { label: "modalities", value: "3" },
      { label: "engine", value: "Three.js" },
      { label: "scope", value: "ISL" },
    ],
  },
  {
    id: "bodhi",
    name: "BODHI",
    category: "fullstack",
    tagline: "Money that moves with you — social finance for Gen Z.",
    description:
      "Track group expenses, run micro-investment clubs, and execute live trades with a proactive AI financial assistant always in the background.",
    impact: "AI assistant · Live trading · Group investing",
    stack: ["React Native", "TypeScript", "FastAPI", "AWS", "Gemini 1.5", "Razorpay"],
    github: "https://github.com/GovindJindal/BODHI.git",
    image: bodhi,
    status: "BETA",
    version: "v0.5.0",
    metrics: [
      { label: "platform", value: "iOS/Android" },
      { label: "ai", value: "Gemini 1.5" },
      { label: "payments", value: "Razorpay" },
    ],
  },
  {
    id: "ayur",
    name: "AyurSutra",
    category: "fullstack",
    tagline: "Digitizing Panchakarma therapy management.",
    description:
      "An integrated platform for patient management, appointment scheduling, treatment planning, and AI-assisted Ayurvedic consultations.",
    impact: "Smart India Hackathon 2025",
    stack: ["Django", "REST", "SQLite3", "AI Assistant"],
    github: "https://github.com/Ayursutra/AyursutraApp.git",
    demo: "https://ayur-sutra-edd2366f.base44.app/login?from_url=https://ayur-sutra-edd2366f.base44.app/&app_id=68b896b995c5df98edd2366f",
    image: ayur,
    status: "BETA",
    version: "v0.2.4",
    metrics: [
      { label: "domain", value: "ayurveda" },
      { label: "stack", value: "Django" },
      { label: "event", value: "SIH'25" },
    ],
  },
  {
    id: "eco",
    name: "EcoCity Connect",
    category: "system",
    tagline: "A smart city OS for sustainable urban communities.",
    description:
      "Real-time public transport, AQI monitoring, waste management, carbon footprint, and citizen feedback — all in one platform.",
    impact: "Hack Nexus 1.0 · Live deployment",
    stack: ["Flask", "PostgreSQL", "Leaflet.js", "Flask-Dance"],
    github: "https://github.com/EcoCity-Connect/EcoCitty.git",
    demo: "https://eco-citty.vercel.app/",
    image: eco,
    status: "LIVE",
    version: "v1.0.0",
    metrics: [
      { label: "modules", value: "5" },
      { label: "map", value: "Leaflet" },
      { label: "deploy", value: "Vercel" },
    ],
  },
  {
    id: "logic",
    name: "Logic Flow",
    category: "system",
    tagline: "A digital electronics lab that never runs out of equipment.",
    description:
      "A browser-based simulator for digital electronics & computer architecture, giving university students universal access to lab practice.",
    impact: "University-level access · Live deployment",
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/GovindJindal/LogicFlow.git",
    demo: "https://logic-flow-evaluation-1.vercel.app/",
    image: logic,
    status: "LIVE",
    version: "v1.1.0",
    metrics: [
      { label: "audience", value: "university" },
      { label: "runtime", value: "browser" },
      { label: "deploy", value: "Vercel" },
    ],
  },
];

export const SKILLS = {
  "AI / ML": ["Qwen2.5", "Mamba SSM", "PyTorch", "spaCy", "NLTK", "Gemini", "OpenRouter", "Numpy", "Pandas"],
  "Full Stack": ["React", "Next.js 15", "React Native", "TypeScript", "Node.js", "FastAPI", "Django", "Flask", "Vite"],
  "Languages": ["Python", "JavaScript", "TypeScript", "C", "C++", "Java", "HTML", "CSS"],
  "Cloud / DB": ["AWS", "PostgreSQL", "SQLite", "Vercel", "Render"],
  "Tools": ["Git", "VS Code", "Xcode", "Android Studio", "Blender", "Figma", "Canva"],
};

export const TIMELINE = [
  { year: "August,2025", title: "Started BE CSE (AIML)", org: "Chitkara University", detail: "Sem 1 · 10 CGPA" },
  { year: "September, 2025", title: "Hack Nexus 1.0", org: "Chitkara University", detail: "Built EcoCity Connect" },
  { year: "October, 2025", title: "SIH 2025 (Internal)", org: "Smart India Hackathon", detail: "Built AyurSutra" },
  { year: "November, 2025", title: "Research Team Member", org: "Evolve AI", detail: "Research sessions & notes" },
  { year: "January, 2026", title: "Sustainability Hackathon", org: "Canadian University, Dubai", detail: "Fractal Fire Mamba" },
  { year: "February, 2026", title: "Hack Secure", org: "NIT Hamirpur", detail: "Liquid Defense" },
  { year: "April, 2026", title: "Eclipse 6.0", org: "Thapar University", detail: "ASHA-VANI · Aegis" },
  { year: "April, 2026", title: "Hack Helix", org: "Thapar University", detail: "Sign Setu" },
  { year: "April, 2026", title: "FINVASIA", org: "Chitkara University", detail: "BODHI" },
];

export const ACHIEVEMENTS = [
  // ─── HACKATHONS ───────────────────────────────────────────────────────
  { title: "Hack Nexus 1.0", org: "Chitkara University", url: "https://www.linkedin.com/posts/govind-jindal-62925b361_hackathon-innovation-teamwork-activity-7400071142180282368-pIGp?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFnqisEBDnsakzI59xVThzs230r53f6zCB0", kind: "Hackathon" },
  { title: "SIH 2025 (Internal)", org: "Chitkara University", kind: "Hackathon" },
  { title: "Sustainability Hackathon", org: "Canadian University, Dubai", url: "https://drive.google.com/file/d/1cTEaU20jklC6Ga7uLMzcSjUKczn6rhZQ/view?usp=sharing", kind: "Hackathon" },
  { title: "Hack Secure", org: "NIT Hamirpur", kind: "Hackathon" },
  { title: "Eclipse 6.0", org: "Thapar University", url: "https://drive.google.com/file/d/1Y6VBAeafSCN-PpwtCC-oFj_F7BxGyT4G/view?usp=sharing", kind: "Hackathon" },
  { title: "Hack Helix", org: "Thapar University", kind: "Hackathon" },
  { title: "FINVASIA", org: "Chitkara University", url: "https://drive.google.com/file/d/1fYeyvwa2i3xp54WCgKn0YYAr0X5nrfNn/view?usp=sharing", kind: "Hackathon" },
  // ─── CERTIFICATIONS ──────────────────────────────────────────────────
  { title: "Microsoft Certified: Azure Fundamentals", org: "Microsoft", url: "https://drive.google.com/file/d/1kC_S2qeN2iGIR7OZ_VOrki_1FQqX8OFv/view?usp=sharing", kind: "Cert" },
  { title: "Oracle Cloud Infrastructure Al Foundations", org: "Oracle", url: "https://drive.google.com/file/d/1IfH78PEeIMHG2Y3EgtJ65EcKQOkUnGjb/view?usp=sharing", kind: "Cert" },
  { title: "Apply AI: Analyze Customer Reviews", org: "CISCO Networking Academy", url: "https://drive.google.com/file/d/10vJbXEtwJdCXvq3bq4YL_XNnUyZDDEmU/view?usp=sharing", kind: "Cert" },
  { title: "Introduction to Modern AI", org: "CISCO Networking Academy", url: "https://drive.google.com/file/d/1WHQLU0XkqR-SPckb_m5jFJPhdWJnQr7D/view?usp=sharing", kind: "Cert" },
  { title: "Decision Making and Governance of Natural Disaster Risk", org: "Banco Interamericano de Desarrollo", url: "https://drive.google.com/file/d/1T0jUs-SW6IoC_ZHvg-isuY_sQ1jpLOVD/view?usp=sharing", kind: "Cert" },
  { title: "Qualitative and Quantitative Analysis of Disaster Risk", org: "Banco Interamericano de Desarrollo", url: "https://drive.google.com/file/d/1YCMt8zBGQcXkyHkhKV3T8xRvVpTbj4-4/view?usp=sharing", kind: "Cert" },
  { title: "Natural Disaster Risk in Infrastructure Projects", org: "Banco Interamericano de Desarrollo", url: "https://drive.google.com/file/d/1wX3HvNkHqZz4nYArpvnscsWF8a2jvW30/view?usp=sharing", kind: "Cert" },
  { title: "AI and Disaster Management", org: "DeepLearning.AI", url: "https://drive.google.com/file/d/1Av7nVog5BE3tMrS7qGRaOTRQ7L4SV6Xg/view?usp=sharing", kind: "Cert" },
  { title: "Natural Disaster and Climate Change Risk Assessment", org: "Banco Interamericano de Desarrollo", url: "https://drive.google.com/file/d/1_Y1Hn_7Z-xrMKSZ6ErOnnCN_Wug4pdo-/view?usp=sharing", kind: "Cert" },
  { title: "Microsoft Certified: Azure AI Fundamentals", org: "Microsoft", url: "https://drive.google.com/file/d/1G_OziekaTKtWz5wdB3h_U-AXWxwYEL2v/view?usp=sharing", kind: "Cert" },
  { title: "Python Fundamentals", org: "Infosys Springboard", url: "https://drive.google.com/file/d/1FUDobgtJfg4DNrB2AlIBhWiLWmqkQpMh/view?usp=sharing", kind: "Cert" },
  { title: "HTML5-The Language", org: "Infosys Springboard", url: "https://drive.google.com/file/d/1FD3-AXAkrpodtg85CQUHBOFiecgrQbC-/view?usp=sharing", kind: "Cert" },
  { title: "Generative AI Tools Workshop", org: "Skill Nation", url: "https://drive.google.com/file/d/1I6-FJjmQ4pr95u72XH3glR8O-DCt9e52/view?usp=sharing", kind: "Cert" },
  { title: "AI Tools Workshop", org: "Be10x", url: "https://drive.google.com/file/d/11z253SbmLRpqLJqHgEn7ZQcOtVoTMLPq/view?usp=sharing", kind: "Cert" },
  { title: "Introduction to LLM's", org: "Create Byte Experts", url: "https://drive.google.com/file/d/1E9h80WsN_MzRLAfDtqRmxrF8LTy0fagd/view?usp=sharing", kind: "Cert" },
  // ─── WORKSHOPS ───────────────────────────────────────────────────────
  { title: "AI Story Lab", org: "Evolve Al", url: "https://drive.google.com/file/d/1iwK2gmbpADxIBmE9f5KZVfYbLqWiL9U0/view?usp=sharing", kind: "Workshop" },
  { title: "Pixel Flow: Figma Design Workshop", org: "Evolve Al", url: "https://drive.google.com/file/d/1F1JyH9zWFWY3TSYP2WLn00qn6OFG1HCo/view?usp=sharing", kind: "Workshop" },
  { title: "Build an E-Commerce platform using React", org: "Scaler", url: "https://drive.google.com/file/d/1wbRe2v_NK5Ove4QlIxeIf1jALdSoLl8u/view?usp=sharing", kind: "Workshop" },
  { title: "RESTECH 2025", org: "SCRS", url: "https://drive.google.com/file/d/1ejWsqBG1N1zV6_ePuMVa6ryzPbZjBxkz/view?usp=sharing", kind: "Workshop" },
  { title: "The Prompt Lab", org: "IE (I) CSE Student Chapter", url: "https://drive.google.com/file/d/1khTAQo1KZ0DjrGipMtKmMCOhoW4wpwgj/view?usp=sharing", kind: "Workshop" },
  { title: "Endless Domain", org: "Endless Domains", url: "https://drive.google.com/file/d/1aluUCS5VWX0AoWuHCG7r2zJYSd_EkoI_/view?usp=sharing", kind: "Workshop" },
  { title: "Create an App Prototype", org: "Apple & iOS Development Centre", url: "https://www.linkedin.com/posts/govind-jindal-62925b361_apple-chitkarauniversity-innovation-activity-7452818709448138752-kTD0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFnqisEBDnsakzI59xVThzs230r53f6zCB0", kind: "Workshop" },
  // ─── COMPETITIONS ───────────────────────────────────────────────────────
  { title: "Intellex 2.0", org: "Evolve Al", url: "https://drive.google.com/file/d/14Ji464fjGuHV5MC-wTABHc34_gZgE4uW/view?usp=sharing", kind: "Competition" },
  { title: "Pitch the Future", org: "Toastmaster International", url: "https://drive.google.com/file/d/1iV7rIcHeDCftEKx2mqTPO9zFxtF8l4Fd/view?usp=sharing", kind: "Competition" },
  { title: "Neuracode 1.0", org: "Chitkara University", url: "https://drive.google.com/file/d/1leVHya0UDMlSgZF--iEmCzOaMs9px8PZ/view?usp=sharing", kind: "Competition" },
  { title: "Neuracode 2.0", org: "Chitkara University", url: "https://drive.google.com/file/d/1TmOy_IYuVtj9EOgqiLkzXQyxGvXLbxxV/view?usp=sharing", kind: "Competition" }
];

export const PROFILE = {
  name: "Govind Jindal",
  email: "govindjindal7808@gmail.com",
  phone: "+91 8168717582",
  location: "Hisar, Haryana, India",
  github: "https://github.com/GovindJindal",
  linkedin: "https://www.linkedin.com/in/govind-jindal-62925b361",
  kaggle: "https://www.kaggle.com/govindjindal7808",
  codeforces: "https://codeforces.com/profile/govindjindal7808",
  edu: "BE CSE (AIML) · Chitkara University · 2029 · 10 CGPA",
  roles: ["AI Engineer", "Full Stack Developer", "Systems Thinker"],
};

