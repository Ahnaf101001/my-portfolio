import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Skills", "Projects", "Certifications", "Contact"];

const SKILLS = [
  { name: "JavaScript",          pct: 85, cat: "Frontend" },
  { name: "React.js",            pct: 80, cat: "Frontend" },
  { name: "HTML5 / CSS3",        pct: 90, cat: "Frontend" },
  { name: "Tailwind / DaisyUI",  pct: 82, cat: "Frontend" },
  { name: "C / C++",             pct: 75, cat: "Language" },
  { name: "Python",              pct: 72, cat: "Language" },
  { name: "Machine Learning",    pct: 70, cat: "AI/ML"    },
  { name: "Deep Learning / CNN", pct: 65, cat: "AI/ML"    },
  { name: "Node.js / Express",   pct: 72, cat: "Backend"  },
  { name: "MongoDB / Firebase",  pct: 70, cat: "Backend"  },
  { name: "Git & GitHub",        pct: 78, cat: "Tools"    },
  { name: "Vite / Webpack",      pct: 68, cat: "Tools"    },
];

const PROJECTS = [
  {
    title: "Gameverse",
    tech: ["React.js", "Node.js", "MongoDB", "Firebase", "Tailwind"],
    desc: "Full-stack gaming platform with auth, shop, orders dashboard and admin panel. Live-deployed with Express REST API and Firebase authentication.",
    color: "#0ea5e9",
    liveLink: "https://gameverse10100.netlify.app/",
    ghLink: "https://github.com/Ahnaf101001/gameverse-client",
  },
  {
    title: "Task Master",
    tech: ["JavaScript", "React.js", "CSS3"],
    desc: "Clean task management app with drag-and-drop interface, local persistence and animated transitions — showcasing practical front-end engineering.",
    color: "#8b5cf6",
    liveLink: "https://task-master-web-app.web.app/",
    ghLink: "https://github.com/Ahnaf101001/task-master-web-app",
  },
  {
    title: "Gen Library",
    tech: ["React.js", "Node.js", "MongoDB", "Firebase", "Tailwind"],
    desc: "Full-stack library management platform with book browsing, borrowing system, and user dashboard. Features auth, admin panel, and a clean modern UI for managing library collections.",
    color: "#f58a1f",
    liveLink: "https://your-genlibrary-link.netlify.app/",
    ghLink: "https://github.com/Ahnaf101001/gen-library",
  },
  {
    title: "Dried fish classification using Convolutional Neural Networks (CNNs)",
    tech: ["Python", "TensorFlow", "CNN", "Deep Learning"],
    desc: "Undergraduate thesis project — an image classification system using Convolutional Neural Networks to identify and categorize dried fish species with high accuracy.",
    color: "#10b981",
    thesis: true,
    ghLink: "https://github.com/Ahnaf101001/DRIED-FISH-CLASSIFICATION-USING-CONVOLUTIONAL-NEURAL-NETWORKS",
  },
];

const CERTS = [
  {
    title: "Complete Web Development Course",
    org: "Programming Hero",
    date: "Jun 2024",
    id: "WEB9-1945",
    color: "#7c3aed",
    icon: "🎓",
  },
  {
    title: "ICPC Asia Dhaka Regional – Preliminary",
    org: "ICPC Foundation",
    date: "Sep 2022",
    id: "Team: BAUSTian__Ploceus_Benghalensis",
    color: "#0ea5e9",
    icon: "🏆",
  },
  {
    title: "bdapps National Hackathon 2022",
    org: "bdapps · Robi Axiata",
    date: "2022",
    id: "Regional Round",
    color: "#ef4444",
    icon: "⚡",
  },
  {
    title: "Intra University Programming Contest",
    org: "CSE Society, BAUST",
    date: "Feb 2023",
    id: "Certificate of Achievement",
    color: "#f59e0b",
    icon: "🥇",
  },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, from = "bottom" }) {
  const [ref, inView] = useInView();
  const transforms = {
    bottom: "translateY(50px)",
    left:   "translateX(-40px)",
    right:  "translateX(40px)",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : transforms[from],
        transition: `opacity .75s ease ${delay}s, transform .75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SkillBar({ name, pct, delay = 0 }) {
  const [ref, inView] = useInView();
  const color = "#64ffda";
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ color: "#ccd6f6", fontSize: 13, fontWeight: 600 }}>{name}</span>
        <span style={{ color: "#64748b", fontSize: 12, fontFamily: "monospace" }}>{pct}%</span>
      </div>
      <div style={{ height: 3, background: "#0f2139", borderRadius: 3, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: inView ? `${pct}%` : "0%",
            background: `linear-gradient(90deg, ${color}, #3b82f6)`,
            borderRadius: 3,
            transition: `width 1.1s cubic-bezier(.4,0,.2,1) ${delay}s`,
            boxShadow: `0 0 10px ${color}55`,
          }}
        />
      </div>
    </div>
  );
}

function SectionHeader({ num, sub, title }) {
  return (
    <Reveal>
      <p style={{ color: "#64ffda", fontSize: 12, fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: 6 }}>
        {num}. {sub}
      </p>
      <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, color: "#e2e8f0", marginBottom: 14, letterSpacing: "-0.5px" }}>
        {title}
      </h2>
      <div style={{ width: 52, height: 3, background: "linear-gradient(90deg,#64ffda,#3b82f6)", borderRadius: 2, marginBottom: 56 }} />
    </Reveal>
  );
}

const PHOTO_SRC = "/My_Pic.jpg";

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const titles = ["Web Developer", "Front-End Engineer", "React Specialist", "CSE Graduate"];
  const [tIdx, setTIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [del, setDel] = useState(false);
  
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const cur = titles[tIdx];
    const t = setTimeout(() => {
      if (!del) {
        if (cIdx < cur.length) { setTyped(cur.slice(0, cIdx + 1)); setCIdx(c => c + 1); }
        else setTimeout(() => setDel(true), 1900);
      } else {
        if (cIdx > 0) { setTyped(cur.slice(0, cIdx - 1)); setCIdx(c => c - 1); }
        else { setDel(false); setTIdx(i => (i + 1) % titles.length); }
      }
    }, del ? 55 : 85);
    return () => clearTimeout(t);
  }, [cIdx, del, tIdx]);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Sora','Outfit',sans-serif", background: "#020b18", color: "#ccd6f6", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── GLOBAL CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{background:#020b18}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-14px) rotate(1deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:none}}
        @keyframes pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
        .hero-anim{animation:fadeUp .9s ease both}
        .hero-anim-2{animation:fadeUp .9s ease .25s both}
        .hero-photo-wrap{animation:fadeUp .9s ease .4s both}
        .photo-inner{animation:float 7s ease-in-out 1.3s infinite}
        .nav-link:hover{color:#64ffda !important}
        .btn-outline:hover{background:rgba(100,255,218,.1) !important; transform:translateY(-2px)}
        .btn-solid:hover{background:#4dffd6 !important; transform:translateY(-2px)}
        .proj-card{transition:transform .3s,box-shadow .35s,border-color .3s}
        .proj-card:hover{transform:translateY(-8px) !important;border-color:rgba(100,255,218,.18) !important;box-shadow:0 24px 64px rgba(0,0,0,.55) !important}
        .cert-card{transition:transform .25s,box-shadow .25s}
        .cert-card:hover{transform:translateY(-4px) !important;box-shadow:0 12px 32px rgba(0,0,0,.35) !important}
        .contact-link{transition:transform .2s,box-shadow .2s,background .2s}
        .contact-link:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,.4)}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#020b18}
        ::-webkit-scrollbar-thumb{background:#193a5e;border-radius:4px}

        /* ── GRADIENT TEXT FIX ── */
        .gradient-name {
          background: linear-gradient(135deg, #ccd6f6 20%, #64ffda 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        /* ── NAV ── */
        .menu-btn { display: none; }
        .desktop-links { display: flex; }

        /* ── HERO LAYOUT ── */
        .hero-inner {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 100px 80px 60px;
          max-width: 1200px;
          margin: 0 auto;
          gap: 48px;
        }
        .hero-text { flex: 1; max-width: 560px; }
        .hero-photo-wrap { flex-shrink: 0; margin-left: 0; }

        /* ── SECTION PADDING ── */
        .section-pad { padding: 110px 80px; }

        /* ── GRIDS ── */
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 72px; }
        .about-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: 64px; align-items: start; }
        .proj-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }

        /* ── TABLET (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .hero-inner { padding: 100px 48px 60px; gap: 32px; }
          .section-pad { padding: 80px 48px; }
        }

        /* ── MOBILE (≤ 768px) ── */
        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
          .menu-btn { display: block !important; }

          .hero-inner {
            flex-direction: column !important;
            padding: 88px 24px 56px !important;
            text-align: center;
            gap: 40px;
          }
          .hero-text { max-width: 100%; }
          .hero-btns { justify-content: center !important; }
          .hero-photo-wrap {
            order: -1;        /* photo ABOVE text on mobile */
            margin: 0 auto;
            width: 100%;
            display: flex;
            justify-content: center;
          }
          .hero-photo-wrap .photo-inner img,
          .hero-photo-wrap .photo-inner > div[style] {
            width: 220px !important;
            height: 260px !important;
          }

          .section-pad { padding: 64px 20px !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .proj-grid { grid-template-columns: 1fr !important; }
        }

        /* ── SMALL MOBILE (≤ 480px) ── */
        @media (max-width: 480px) {
          .hero-inner { padding: 80px 16px 48px !important; }
          .section-pad { padding: 56px 16px !important; }
          .contact-links-wrap { flex-direction: column !important; align-items: stretch !important; }
          .contact-links-wrap a { justify-content: center; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px",
        background: scrolled ? "rgba(2,11,24,.94)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(100,255,218,.08)" : "none",
        transition: "all .35s",
      }}>
        <div
          onClick={() => scrollTo("about")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
        >
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: "linear-gradient(135deg,#64ffda,#3b82f6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 14, color: "#020b18",
          }}>AK</div>
          <span style={{ color: "#e2e8f0", fontWeight: 800, fontSize: 16, letterSpacing: "-0.5px" }}>
            Ahnaf<span style={{ color: "#64ffda" }}>.</span>
          </span>
        </div>

        <ul className="desktop-links" style={{ gap: 36, listStyle: "none" }}>
          {NAV_LINKS.map((l, i) => (
            <li key={l}>
              <span
                className="nav-link"
                onClick={() => scrollTo(l)}
                style={{
                  color: "#8892b0", fontSize: 12.5, fontWeight: 600, cursor: "pointer",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  transition: "color .2s",
                }}
              >
                <span style={{ color: "#64ffda", fontFamily: "monospace", marginRight: 4 }}>0{i + 1}.</span>{l}
              </span>
            </li>
          ))}
        </ul>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: "none", border: "none", color: "#64ffda", fontSize: 22, cursor: "pointer" }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, right: 0, width: 240,
          background: "#0a1929", border: "1px solid rgba(100,255,218,.12)",
          zIndex: 199, padding: "24px 0", borderRadius: "0 0 0 12px",
          boxShadow: "0 16px 40px rgba(0,0,0,.6)",
        }}>
          {NAV_LINKS.map(l => (
            <div
              key={l}
              onClick={() => scrollTo(l)}
              style={{ padding: "14px 28px", color: "#ccd6f6", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              {l}
            </div>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section
        id="hero"
        style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}
      >
        {/* grid bg */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "linear-gradient(rgba(100,255,218,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(100,255,218,.025) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />
        {/* ambient glow */}
        <div style={{
          position: "absolute", width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(59,130,246,.12) 0%,transparent 70%)",
          top: "5%", right: "-5%", filter: "blur(60px)", zIndex: 0, animation: "pulse 6s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(100,255,218,.07) 0%,transparent 70%)",
          bottom: "10%", left: "-5%", filter: "blur(60px)", zIndex: 0,
        }} />

        <div className="hero-inner" style={{ zIndex: 2 }}>
          {/* Text */}
          <div className="hero-text">
            <div className="hero-anim">
              <p style={{ color: "#64ffda", fontFamily: "monospace", fontSize: 14, letterSpacing: "0.1em", marginBottom: 18 }}>
                &gt; Hello, World!
              </p>
            </div>
            <div className="hero-anim">
              <h1 style={{ fontSize: "clamp(38px,6vw,72px)", fontWeight: 900, color: "#e2e8f0", lineHeight: 1.05, marginBottom: 6, letterSpacing: "-1.5px" }}>
                Ahnaf Khan<br />
                {/* FIX: use a class + display:inline-block so gradient renders correctly */}
                <span className="gradient-name">Sadaf</span>
              </h1>
            </div>
            <div className="hero-anim-2">
              <p style={{ fontSize: "clamp(16px,2.5vw,28px)", color: "#64748b", fontWeight: 600, marginBottom: 28, minHeight: 36 }}>
                <span style={{ color: "#64ffda", fontFamily: "monospace" }}>&gt; </span>
                {typed}
                <span style={{ color: "#64ffda", animation: "blink 1s infinite", display: "inline-block" }}>▋</span>
              </p>
              <p style={{ color: "#8892b0", fontSize: 15.5, lineHeight: 1.85, marginBottom: 44, maxWidth: 470 }}>
                CSE Graduate from <strong style={{ color: "#ccd6f6" }}>BAUST</strong> — building beautiful, performant web apps. 30+ projects shipped. Competitive programmer. Problem solver.
              </p>
              <div className="hero-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button
                  className="btn-outline"
                  onClick={() => scrollTo("Contact")}
                  style={{ padding: "13px 30px", background: "transparent", border: "1px solid #64ffda", color: "#64ffda", fontSize: 12.5, fontWeight: 700, cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4, transition: "all .2s" }}
                >
                  Get In Touch
                </button>
                <button
                  className="btn-solid"
                  onClick={() => scrollTo("Projects")}
                  style={{ padding: "13px 30px", background: "#64ffda", border: "none", color: "#020b18", fontSize: 12.5, fontWeight: 800, cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4, transition: "all .2s" }}
                >
                  View Projects
                </button>
              </div>
            </div>
          </div>

          {/* Photo */}
          <div className="hero-photo-wrap">
            <div className="photo-inner" style={{ position: "relative", display: "inline-block" }}>
              {/* decorative rings */}
              <div style={{
                position: "absolute", inset: -12,
                borderRadius: 18,
                border: "1px solid rgba(100,255,218,.18)",
                zIndex: 0,
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", inset: -24,
                borderRadius: 22,
                border: "1px solid rgba(100,255,218,.07)",
                zIndex: 0,
                pointerEvents: "none",
              }} />
              <img
                src={PHOTO_SRC}
                alt="Ahnaf Khan Sadaf"
                style={{
                  width: 300, height: 350,
                  objectFit: "cover", objectPosition: "top center",
                  borderRadius: 14,
                  border: "2px solid rgba(100,255,218,.22)",
                  boxShadow: "0 30px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(100,255,218,.04)",
                  position: "relative", zIndex: 1,
                  display: "block",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Fallback avatar */}
              <div style={{
                display: "none",
                width: 300, height: 350, borderRadius: 14,
                background: "linear-gradient(135deg,#0f2139,#1e3a5f)",
                border: "2px solid rgba(100,255,218,.22)",
                alignItems: "center", justifyContent: "center",
                fontSize: 72, fontWeight: 900, color: "#64ffda",
                position: "relative", zIndex: 1,
                boxShadow: "0 30px 80px rgba(0,0,0,.6)",
              }}>AKS</div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "#64748b",
        }}>
          <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.15em" }}>SCROLL</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(#64ffda,transparent)" }} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section-pad" style={{ background: "rgba(8,20,40,.5)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader num="01" sub="who am i" title="About Me" />

          <div className="about-grid">
            {/* Left */}
            <Reveal delay={0.05}>
              <p style={{ color: "#94a3b8", fontSize: 15.5, lineHeight: 1.9, marginBottom: 18 }}>
                I'm a dedicated Computer Science & Engineering graduate from{" "}
                <strong style={{ color: "#e2e8f0" }}>Bangladesh Army University of Science and Technology (BAUST)</strong>,
                with a strong foundation in both front-end web development and machine learning.
              </p>
              <p style={{ color: "#94a3b8", fontSize: 15.5, lineHeight: 1.9, marginBottom: 32 }}>
                I've built <strong style={{ color: "#64ffda" }}>30+ projects</strong> ranging from small utilities to full-stack commercial solutions.
                I competed in <strong style={{ color: "#e2e8f0" }}>ICPC</strong>, participated in national hackathons, and led as{" "}
                <strong style={{ color: "#e2e8f0" }}>Development Head</strong> of the BAUST Computer Club.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  ["Name",     "Ahnaf Khan Sadaf"],
                  ["Email",    "ahnaf10100@gmail.com"],
                  ["Location", "Gopalganj, Bangladesh"],
                  ["Degree",   "B.Sc. CSE · BAUST"],
                ].map(([k, v]) => (
                  <div key={k} style={{
                    background: "rgba(100,255,218,.03)", border: "1px solid rgba(100,255,218,.1)",
                    borderRadius: 8, padding: "14px 18px",
                  }}>
                    <div style={{ color: "#64ffda", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 4 }}>{k}</div>
                    <div style={{ color: "#ccd6f6", fontSize: 13, fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right — stats */}
            <Reveal delay={0.15}>
              <div style={{
                background: "rgba(10,25,47,.7)", border: "1px solid rgba(100,255,218,.1)",
                borderRadius: 14, overflow: "hidden",
              }}>
                {[
                  ["30+", "Projects Completed", "#64ffda"],
                  ["4",   "Certifications",     "#8b5cf6"],
                  ["2",   "Hackathons Entered",  "#0ea5e9"],
                  ["1",   "ICPC Participation",  "#f59e0b"],
                ].map(([n, l, c], i, arr) => (
                  <div key={l} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "20px 28px",
                    borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
                  }}>
                    <span style={{ color: "#8892b0", fontSize: 14 }}>{l}</span>
                    <span style={{ color: c, fontSize: 28, fontWeight: 900, fontFamily: "monospace" }}>{n}</span>
                  </div>
                ))}
                <div style={{ padding: "20px 28px", background: "rgba(100,255,218,.03)", display: "flex", gap: 12 }}>
                  <a href="https://github.com/Ahnaf101001" target="_blank" rel="noreferrer"
                    style={{ flex: 1, padding: "10px 0", textAlign: "center", background: "rgba(139,92,246,.15)", border: "1px solid rgba(139,92,246,.3)", borderRadius: 6, color: "#8b5cf6", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/ahnafkhansadaf/" target="_blank" rel="noreferrer"
                    style={{ flex: 1, padding: "10px 0", textAlign: "center", background: "rgba(14,165,233,.15)", border: "1px solid rgba(14,165,233,.3)", borderRadius: 6, color: "#0ea5e9", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                    LinkedIn
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader num="02" sub="what i know" title="Skills" />

          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05}>
                <SkillBar {...s} delay={i * 0.06} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div style={{ marginTop: 52, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["React.js","JavaScript","Node.js","Express","MongoDB","Firebase","TailwindCSS","Git","Python","TensorFlow","C++","Vite"].map(t => (
                <span key={t} style={{
                  padding: "6px 14px",
                  background: "rgba(100,255,218,.04)",
                  border: "1px solid rgba(100,255,218,.14)",
                  borderRadius: 20, color: "#64ffda", fontSize: 12, fontWeight: 600,
                }}>{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section-pad" style={{ background: "rgba(8,20,40,.5)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader num="03" sub="what i've built" title="Projects" />

          <div className="proj-grid">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="proj-card" style={{
                  background: "rgba(10,22,42,.85)",
                  border: "1px solid rgba(255,255,255,.06)",
                  borderRadius: 14, padding: 30,
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: p.color }} />
                  {p.thesis && (
                    <span style={{
                      position: "absolute", top: 18, right: 18,
                      background: p.color + "20", color: p.color, fontSize: 9,
                      fontWeight: 800, padding: "3px 10px", borderRadius: 20,
                      border: "1px solid " + p.color + "44", letterSpacing: "0.1em",
                    }}>THESIS</span>
                  )}
                  <div style={{ fontSize: 32, marginBottom: 16 }}>📁</div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#e2e8f0", marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ color: "#8892b0", fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>{p.desc}</p>
                  <div style={{ marginBottom: 20 }}>
                    {p.tech.map(t => (
                      <span key={t} style={{
                        display: "inline-block", padding: "3px 10px",
                        background: p.color + "16", border: "1px solid " + p.color + "40",
                        color: p.color, fontSize: 11, borderRadius: 20,
                        marginRight: 6, marginBottom: 6, fontWeight: 600,
                      }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 16 }}>
                    <a href={p.ghLink} target="_blank" rel="noreferrer"
                      style={{ color: "#8892b0", fontSize: 12, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
                      ⎙ GitHub
                    </a>
                    {p.liveLink && (
                      <a href={p.liveLink} target="_blank" rel="noreferrer"
                        style={{ color: p.color, fontSize: 12, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
                        ↗ Live
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" className="section-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader num="04" sub="achievements" title="Certifications" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20 }}>
            {CERTS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="cert-card" style={{
                  background: "rgba(10,22,42,.85)",
                  border: "1px solid " + c.color + "28",
                  borderLeft: "3px solid " + c.color,
                  borderRadius: 12, padding: 24,
                }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
                  <div style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 700, marginBottom: 8, lineHeight: 1.4 }}>{c.title}</div>
                  <div style={{ color: c.color, fontSize: 12.5, fontWeight: 600, marginBottom: 6 }}>{c.org}</div>
                  <div style={{ color: "#4a5568", fontSize: 11.5 }}>{c.date} · {c.id}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad" style={{ background: "rgba(8,20,40,.5)", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <Reveal>
            <p style={{ color: "#64ffda", fontFamily: "monospace", fontSize: 12, letterSpacing: "0.15em", marginBottom: 12 }}>05. get in touch</p>
            <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, color: "#e2e8f0", marginBottom: 14 }}>Contact</h2>
            <div style={{ width: 52, height: 3, background: "linear-gradient(90deg,#64ffda,#3b82f6)", borderRadius: 2, margin: "0 auto 24px" }} />
            <p style={{ color: "#8892b0", fontSize: 16, lineHeight: 1.85, marginBottom: 48 }}>
              I'm currently open to new opportunities. Whether you have a project idea, a collaboration, or just want to say hi — my inbox is always open!
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="contact-links-wrap" style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
              {[
                { label: "ahnaf10100@gmail.com", href: "mailto:ahnaf10100@gmail.com", color: "#64ffda",   icon: "✉" },
                { label: "LinkedIn",             href: "https://www.linkedin.com/in/ahnafkhansadaf/", color: "#0ea5e9", icon: "💼", ext: true },
                { label: "GitHub",               href: "https://github.com/Ahnaf101001", color: "#8b5cf6", icon: "🐙", ext: true },
                { label: "+880 1725-315443",     href: "tel:+8801725315443", color: "#f59e0b", icon: "📞" },
              ].map(({ label, href, color, icon, ext }) => (
                <a
                  key={label}
                  href={href}
                  target={ext ? "_blank" : undefined}
                  rel={ext ? "noreferrer" : undefined}
                  className="contact-link"
                  style={{
                    display: "flex", alignItems: "center", gap: 9,
                    padding: "13px 22px",
                    background: color + "0d",
                    border: "1px solid " + color + "38",
                    borderRadius: 8, color, fontSize: 13.5, fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  {icon} {label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "28px 48px", textAlign: "center",
        color: "#334155", fontSize: 13,
        borderTop: "1px solid rgba(255,255,255,.04)",
      }}>
        Designed & Built by{" "}
        <strong style={{ color: "#64ffda" }}>Ahnaf Khan Sadaf</strong> · {new Date().getFullYear()}
      </footer>
    </div>
  );
}