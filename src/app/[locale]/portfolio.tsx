"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";

/* ============================================================================
 * Shared atoms
 * ========================================================================== */

function BrandMark({ size = 28, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <div className="ws-brand">
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <defs>
          <radialGradient id="bm-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde9d6" />
            <stop offset="32%" stopColor="#f29842" />
            <stop offset="70%" stopColor="#b85d12" />
            <stop offset="100%" stopColor="#3a1d05" />
          </radialGradient>
          <radialGradient id="bm-h" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e07a1f" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#e07a1f" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#e07a1f" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#bm-h)" />
        <circle cx="32" cy="32" r="13" fill="url(#bm-g)" />
        <circle cx="28" cy="28" r="3.5" fill="#fde9d6" opacity="0.85" />
      </svg>
      {withText && <span className="ws-brand-text">Workshop</span>}
    </div>
  );
}

function Eyebrow({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span className={"ws-eyebrow" + (accent ? " ws-eyebrow-accent" : "")}>{children}</span>
  );
}

function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="7 17 17 7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

type ChipTone = "neutral" | "ember" | "coral" | "brass" | "teal";

function Chip({
  children,
  tone = "neutral",
  dot = true,
}: {
  children: ReactNode;
  tone?: ChipTone;
  dot?: boolean;
}) {
  return (
    <span className={`ws-chip ws-chip-${tone}`}>
      {dot && <span className="ws-chip-dot" />}
      {children}
    </span>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return <span className="ws-tag">{children}</span>;
}

/* ============================================================================
 * Nav
 * ========================================================================== */

function Nav({
  active,
  onNav,
}: {
  active: string;
  onNav: (id: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "work", label: "Work" },
    { id: "publications", label: "Media" },
    { id: "talks", label: "Talks" },
    { id: "awards", label: "Awards" },
    { id: "about", label: "Now" },
  ];

  const triggerBurst = () => {
    setBurst(true);
    window.setTimeout(() => setBurst(false), 700);
  };

  return (
    <div className={`ws-nav-wrap${scrolled ? " ws-nav-scrolled" : ""}`}>
      <nav className="ws-nav">
        <a
          className={"ws-nav-brand" + (burst ? " ws-nav-brand-burst" : "")}
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            triggerBurst();
            onNav("top");
          }}
        >
          <BrandMark size={22} withText={false} />
        </a>
        <div className="ws-nav-links">
          {links.map((l) => (
            <a
              key={l.id}
              className={"ws-nav-link" + (active === l.id ? " ws-nav-link-active" : "")}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNav(l.id);
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="ws-nav-spacer" />
        <button
          className="ws-btn ws-btn-primary"
          onClick={() => onNav("contact")}
        >
          Get in touch
          <ArrowRight />
        </button>
      </nav>
    </div>
  );
}

/* ============================================================================
 * Hero
 * ========================================================================== */

function useCountUp(target: number, ref: React.RefObject<Element | null>, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    let frame: number;
    let started = false;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const t0 = performance.now();
          const step = (now: number) => {
            const k = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - k, 3);
            setValue(Math.round(eased * target));
            if (k < 1) frame = requestAnimationFrame(step);
          };
          frame = requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => {
      cancelAnimationFrame(frame);
      obs.disconnect();
    };
  }, [target, ref, duration]);
  return value;
}

function Hero({ onContact }: { onContact: () => void }) {
  const yearsRef = useRef<HTMLDivElement | null>(null);
  const reportsRef = useRef<HTMLDivElement | null>(null);
  const tinkerRef = useRef<HTMLDivElement | null>(null);
  const awardsRef = useRef<HTMLDivElement | null>(null);

  const years = useCountUp(9, yearsRef);
  const reports = useCountUp(56, reportsRef);
  const tinker = useCountUp(17, tinkerRef);
  const awards = useCountUp(5, awardsRef);

  return (
    <section className="ws-hero" id="top">
      <div className="ws-hero-bg" />
      <div className="ws-hero-aurora" />

      <div className="ws-hero-inner">
        <span className="ws-hero-eyebrow">
          <span className="ws-eyebrow ws-eyebrow-accent">Engineering Lead</span>
          <span className="ws-eyebrow-sep">·</span>
          <span className="ws-eyebrow" id="ws-clock" />
        </span>

        <h1 className="ws-hero-title">
          Gabriel <em>Taveira</em>.
        </h1>

        <p className="ws-hero-sub">
          I&apos;m an Engineering Lead with over nine years of professional
          experience. I&apos;ve led teams from{" "}
          <strong>4 to 56 direct reports</strong>, working remotely with major
          US companies. I help them build great teams and systems that last.
        </p>

        <p className="ws-hero-sub-2">
          Currently consulting independently. My engineering journey started
          when I was eight, reverse-engineering games. Seventeen years of
          building and breaking systems later, the itch hasn&apos;t changed
          shape.
        </p>

        <div className="ws-hero-cta-row">
          <button
            type="button"
            className="ws-btn ws-btn-primary"
            onClick={onContact}
          >
            Get in touch
            <ArrowRight />
          </button>
          <a
            className="ws-btn ws-btn-secondary"
            href="https://www.linkedin.com/in/gabrieltaveira/"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            View LinkedIn
          </a>
          <a
            className="ws-btn ws-btn-ghost"
            href="/curriculum.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </a>
        </div>

        <div className="ws-hero-status">
          <span className="ws-eyebrow">Currently</span>
          <span className="ws-hero-status-sep">·</span>
          <span className="ws-hero-status-co">Consulting</span>
          <span className="ws-hero-status-sep">·</span>
          <span className="ws-hero-status-meta">
            Remote · Ribeirão Preto, Brazil
          </span>
        </div>

        <div className="ws-hero-stats">
          <div ref={yearsRef} className="ws-hero-stat">
            <div className="ws-hero-stat-glow ws-hero-stat-glow-ember" />
            <div className="ws-hero-stat-v">
              {years}
              <em>+</em>
            </div>
            <div className="ws-hero-stat-l">Years in industry</div>
            <div className="ws-hero-stat-meta">Since 2017</div>
          </div>
          <div ref={reportsRef} className="ws-hero-stat">
            <div className="ws-hero-stat-glow ws-hero-stat-glow-coral" />
            <div className="ws-hero-stat-v">{reports}</div>
            <div className="ws-hero-stat-l">Largest team led</div>
            <div className="ws-hero-stat-meta">Grew from four</div>
          </div>
          <div ref={tinkerRef} className="ws-hero-stat">
            <div className="ws-hero-stat-glow ws-hero-stat-glow-brass" />
            <div className="ws-hero-stat-v">{tinker}</div>
            <div className="ws-hero-stat-l">Years tinkering</div>
            <div className="ws-hero-stat-meta">Started at age 8</div>
          </div>
          <div ref={awardsRef} className="ws-hero-stat">
            <div className="ws-hero-stat-glow ws-hero-stat-glow-teal" />
            <div className="ws-hero-stat-v ws-hero-stat-trophy">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
              <span>{awards}</span>
            </div>
            <div className="ws-hero-stat-l">Hackathons won</div>
            <div className="ws-hero-stat-meta">2019 → 2020</div>
          </div>
        </div>
      </div>

      <div className="ws-shelf-edge" />
    </section>
  );
}

/* ============================================================================
 * WorkGrid
 * ========================================================================== */

const LINKEDIN = "https://www.linkedin.com/in/gabrieltaveira/";

type FlourishKind =
  | "ticker"
  | "frames"
  | "swatches"
  | "spark"
  | "scoot"
  | "migration"
  | "tools"
  | null;

const WORK: Array<{
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  tags: string[];
  tone: "ember" | "coral" | "brass" | "teal";
  flourish: FlourishKind;
  href: string;
  cta: string;
}> = [
  {
    id: "consulting",
    eyebrow: "INDEPENDENT · 2025 → NOW",
    title: "Independent consulting",
    blurb:
      "Mobile architecture, engineering leadership, and team craft. Engagement details under NDA. Reach out if you're hiring or just curious.",
    tags: ["Consulting", "Mobile", "Leadership"],
    tone: "ember",
    flourish: null,
    href: LINKEDIN,
    cta: "View on LinkedIn",
  },
  {
    id: "coinbase",
    eyebrow: "COINBASE · G2I · 2024 → 25",
    title: "Mobile architecture at Coinbase",
    blurb:
      "On Consumer App Infra. Drove React Compiler adoption with the React WG, migrated Coinbase to Expo Prebuild, and enabled React Native's new architecture. Test coverage on team-owned files: 25% → 45%.",
    tags: ["React Native", "Expo", "Architecture"],
    tone: "coral",
    flourish: "ticker",
    href: "https://www.coinbase.com/",
    cta: "Visit Coinbase",
  },
  {
    id: "ateam",
    eyebrow: "A.TEAM · D-ID · 2023 → 25",
    title: "Lead Engineer on D-ID's mobile flagship",
    blurb:
      "Built the company's new core product from zero. 1.5M registrants/week on the parent web app. Best UX 2023 on A.Team. Product of the Week on Product Hunt.",
    tags: ["Lead", "React Native", "AI"],
    tone: "coral",
    flourish: "frames",
    href: "https://www.d-id.com/",
    cta: "Visit D-ID",
  },
  {
    id: "meta",
    eyebrow: "META · KUSTOMER · 2022 → 23",
    title: "Open-source design system at Kustomer",
    blurb:
      "Standardized UI for external developers. Shipped SDKs that simplified Kustomer's API integrations. Authored docs that lifted the cross-functional DevX score.",
    tags: ["Design Systems", "DevX", "SDKs"],
    tone: "brass",
    flourish: "swatches",
    href: "https://www.kustomer.com/",
    cta: "Visit Kustomer",
  },
  {
    id: "xteam",
    eyebrow: "X-TEAM · GROUNDSWELL · 2022 → 23",
    title: "Mentored mobile engineering at a fintech",
    blurb:
      "Founded the Mobile Engineering Biweekly forum. Lifted coverage 30% → 80%+. Killed 16k lines of brittle tests with MSW. Discover page 200% faster. SOC 2 from day one.",
    tags: ["Mentorship", "Fintech", "Testing"],
    tone: "teal",
    flourish: "spark",
    href: "https://groundswell.io/",
    cta: "Visit Groundswell",
  },
  {
    id: "ze",
    eyebrow: "ZÉ DELIVERY · AB INBEV · 2020 → 22",
    title: "Refactored Brazil's biggest beer app",
    blurb:
      "Interviewed and onboarded high-proficiency engineers. Rebuilt the Browse module. Shipped deep-link handling that lifted marketing-campaign conversion. Co-built Mozeic, the in-house design system.",
    tags: ["Hiring", "Native", "Design Systems"],
    tone: "ember",
    flourish: "scoot",
    href: "https://www.ze.delivery/",
    cta: "Visit Zé Delivery",
  },
  {
    id: "alfred",
    eyebrow: "ALFRED DELIVERY · 2019 → 20",
    title: "Led migration from Ionic to React Native",
    blurb:
      "Coordinated the rewrite for 90+ franchises serving smaller Brazilian cities. Kept legacy Ionic 3 alive in parallel until cutover.",
    tags: ["Migration", "React Native"],
    tone: "coral",
    flourish: "migration",
    href: LINKEDIN,
    cta: "View on LinkedIn",
  },
  {
    id: "micro",
    eyebrow: "MICRO IMPORT GROUP · 2017 → 19",
    title: "First job: systems for computer repairs",
    blurb:
      "Real-time repair-status tracker for an Apple Service Provider. Internal dashboards for technicians and customer service. Headless-CMS sites for the holding's brands.",
    tags: ["Full-stack", "PHP", "Gatsby"],
    tone: "brass",
    flourish: "tools",
    href: LINKEDIN,
    cta: "View on LinkedIn",
  },
];

function FlourishTicker({ hover }: { hover: boolean }) {
  const [price, setPrice] = useState(248.92);
  useEffect(() => {
    if (!hover) return;
    const id = setInterval(() => {
      setPrice((p) => +(p + (Math.random() - 0.45) * 1.2).toFixed(2));
    }, 320);
    return () => clearInterval(id);
  }, [hover]);
  return (
    <div className="ws-flourish ws-flourish-ticker">
      <div className="ws-ticker-row">
        <span className="ws-ticker-label">$COIN</span>
        <span className="ws-ticker-price">${price.toFixed(2)}</span>
        <span className="ws-ticker-delta">▲</span>
      </div>
      <svg viewBox="0 0 130 18" className="ws-ticker-chart" preserveAspectRatio="none">
        <polyline
          points="0,14 8,12 16,15 24,11 32,12 40,8 48,10 56,7 64,8 72,4 80,6 88,3 96,5 104,2 112,4 120,1 130,0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function FlourishFrames({ hover }: { hover: boolean }) {
  return (
    <div className={"ws-flourish ws-flourish-frames" + (hover ? " is-hover" : "")}>
      <div className="ws-frame" />
      <div className="ws-frame ws-frame-active">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <polygon points="6 4 20 12 6 20 6 4" />
        </svg>
      </div>
      <div className="ws-frame" />
    </div>
  );
}

function FlourishSwatches({ hover }: { hover: boolean }) {
  return (
    <div className={"ws-flourish ws-flourish-swatches" + (hover ? " is-hover" : "")}>
      <div className="ws-sw" style={{ background: "#e07a1f" }} />
      <div className="ws-sw" style={{ background: "#e63b30" }} />
      <div className="ws-sw" style={{ background: "#c89a3a" }} />
      <div className="ws-sw" style={{ background: "#2aa39b" }} />
      <div className="ws-sw" style={{ background: "#f6f1e6" }} />
    </div>
  );
}

function FlourishSpark({ hover }: { hover: boolean }) {
  return (
    <div className={"ws-flourish ws-flourish-spark" + (hover ? " is-hover" : "")}>
      <span className="ws-soc">SOC 2</span>
      <svg viewBox="0 0 90 22" className="ws-spark" preserveAspectRatio="none">
        <polyline
          points="0,18 12,16 24,20 36,12 48,14 60,8 72,11 84,5 90,2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <polyline
          points="0,18 12,16 24,20 36,12 48,14 60,8 72,11 84,5 90,2"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeDasharray="2 2"
          className="ws-spark-glow"
        />
      </svg>
    </div>
  );
}

function FlourishScoot({ hover }: { hover: boolean }) {
  return (
    <div className={"ws-flourish ws-flourish-scoot" + (hover ? " is-hover" : "")}>
      <span className="ws-scoot-pkg" aria-hidden>
        📦
      </span>
      <div className="ws-scoot-line">
        <span className="ws-scoot-dot" />
      </div>
      <span className="ws-scoot-target" aria-hidden>
        🏠
      </span>
    </div>
  );
}

function FlourishMigration({ hover }: { hover: boolean }) {
  return (
    <div className={"ws-flourish ws-flourish-migration" + (hover ? " is-hover" : "")}>
      <span className="ws-mig-tag">Ionic</span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
      <span className="ws-mig-tag ws-mig-tag-active">RN</span>
    </div>
  );
}

function FlourishTools({ hover }: { hover: boolean }) {
  return (
    <div className={"ws-flourish ws-flourish-tools" + (hover ? " is-hover" : "")}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    </div>
  );
}

function Flourish({ kind, hover }: { kind: FlourishKind; hover: boolean }) {
  switch (kind) {
    case "ticker":
      return <FlourishTicker hover={hover} />;
    case "frames":
      return <FlourishFrames hover={hover} />;
    case "swatches":
      return <FlourishSwatches hover={hover} />;
    case "spark":
      return <FlourishSpark hover={hover} />;
    case "scoot":
      return <FlourishScoot hover={hover} />;
    case "migration":
      return <FlourishMigration hover={hover} />;
    case "tools":
      return <FlourishTools hover={hover} />;
    default:
      return null;
  }
}

function WorkTile({ item }: { item: (typeof WORK)[number] }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [hover, setHover] = useState(false);
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setCoords({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <a
      ref={ref}
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className={`ws-work-cell ws-work-tone-${item.tone}${hover ? " is-hover" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMouseMove}
      style={{
        ["--mx" as string]: `${coords.x}%`,
        ["--my" as string]: `${coords.y}%`,
      } as CSSProperties}
    >
      <div className="ws-work-cell-glow" />
      <div className="ws-work-cell-flourish">
        <Flourish kind={item.flourish} hover={hover} />
      </div>
      <div className="ws-work-cell-top">
        <Eyebrow>{item.eyebrow}</Eyebrow>
      </div>
      <h3 className="ws-work-cell-title">{item.title}</h3>
      <p className="ws-work-cell-blurb">{item.blurb}</p>
      <div className="ws-work-cell-foot">
        <div className="ws-work-cell-tags">
          {item.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <span className="ws-work-cell-cta">
          {item.cta} <ArrowUpRight size={14} />
        </span>
      </div>
    </a>
  );
}

function WorkGrid() {
  return (
    <section className="ws-section" id="work">
      <div className="ws-section-head">
        <Eyebrow>Professional Experience · 2017 → now</Eyebrow>
        <h2 className="ws-section-title">
          Teams I&apos;ve led. Systems that <em>lasted</em>.
        </h2>
        <p className="ws-section-sub">
          From four direct reports to fifty-six, across startups, delivery
          apps, fintechs, and tech giants. Same playbook every time: hire
          kindly, ship boring tech, write everything down.
        </p>
      </div>
      <div className="ws-work-grid">
        {WORK.map((w) => (
          <WorkTile key={w.id} item={w} />
        ))}
      </div>
    </section>
  );
}

/* ============================================================================
 * Publications
 * ========================================================================== */

function Publications() {
  return (
    <section className="ws-section" id="publications">
      <div className="ws-section-head">
        <Eyebrow>Publications &amp; media</Eyebrow>
        <h2 className="ws-section-title">
          Things I host, write, and <em>ambassador</em>.
        </h2>
      </div>

      <div className="ws-pubs-grid">
        <article className="ws-pubs-feature">
          <div className="ws-pubs-feature-glow" />
          <div className="ws-pubs-feature-meta">
            <span className="ws-chip ws-chip-ember">
              <span className="ws-chip-dot" />
              On air · Space Cast
            </span>
            <div className="ws-pubs-bars" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className="ws-pubs-bar"
                  style={{ animationDelay: `${(i % 6) * 90}ms` }}
                />
              ))}
            </div>
          </div>
          <h3 className="ws-pubs-feature-title">
            I host the <em>Space Cast</em> podcast on Rocketseat&apos;s YouTube.
          </h3>
          <p className="ws-pubs-feature-sub">
            Long-form conversations on engineering, leadership, and the strange
            shapes of a tech career. Now in season three.
          </p>
          <div className="ws-pubs-feature-cta">
            <a
              className="ws-btn ws-btn-primary"
              href="https://www.youtube.com/@spacesquad-rocketseat"
              target="_blank"
              rel="noreferrer"
            >
              Watch the show <ArrowUpRight size={14} />
            </a>
            <a
              className="ws-btn ws-btn-ghost"
              href="https://www.youtube.com/playlist?list=PLRqjZNegpUk8KgQxIvOh49093Iu-vFc9V"
              target="_blank"
              rel="noreferrer"
            >
              Episode playlist →
            </a>
          </div>
        </article>

        <div className="ws-pubs-side">
          <a
            className="ws-pubs-card"
            href="https://medium.com/@gabrieltaveira"
            target="_blank"
            rel="noreferrer"
          >
            <Eyebrow>Medium</Eyebrow>
            <h4>medium.com/@gabrieltaveira</h4>
            <p>Articles on programming, design systems, and team craft.</p>
            <ArrowUpRight size={16} />
          </a>
          <a
            className="ws-pubs-card"
            href="https://www.rocketseat.com.br/space-squad"
            target="_blank"
            rel="noreferrer"
          >
            <Eyebrow>Ambassador</Eyebrow>
            <h4>Space Squad · Rocketseat</h4>
            <p>Mentoring the next generation of tech wizards.</p>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
 * Talks
 * ========================================================================== */

const TALKS = [
  {
    date: "2024",
    venue: "The Brooklyn Brothers",
    title: "Eficiência com IA",
    description:
      "How to lift team throughput with AI in day-to-day engineering.",
    city: "São Paulo",
    lang: "PT",
    topic: "leadership" as const,
    href:
      "https://www.figma.com/file/nBdwnIQxwLseSXicLhzRoB/Efici%C3%AAncia-Com-AI---The-Brooklyn-Brothers",
    hrefLabel: "Slides on Figma",
  },
  {
    date: "2024",
    venue: "TDC · Design Systems",
    title: "Shipping Mozeic at Zé Delivery",
    description:
      "Lessons from co-building an in-house design system at a high-traffic delivery app.",
    city: "São Paulo",
    lang: "PT",
    topic: "tech" as const,
    href: "https://thedevconf.com/",
    hrefLabel: "Event site",
  },
  {
    date: "2023",
    venue: "Assemble · Rocketseat",
    title: "Forming a Tech Lead, three days at a time",
    description: "3-day immersion focused on forming engineering leads.",
    city: "Remote",
    lang: "PT",
    topic: "leadership" as const,
    href: "https://www.rocketseat.com.br/",
    hrefLabel: "Rocketseat",
  },
  {
    date: "2023",
    venue: "Space Squad · Rocketseat",
    title: "Mentoring in the Space Squad community",
    description: "Ongoing mentorship through Rocketseat's ambassador program.",
    city: "Remote",
    lang: "PT",
    topic: "tech" as const,
    href: "https://www.rocketseat.com.br/space-squad",
    hrefLabel: "Space Squad",
  },
];

function TalksList() {
  return (
    <section className="ws-section" id="talks">
      <div className="ws-section-head">
        <Eyebrow>Talks · selected</Eyebrow>
        <h2 className="ws-section-title">
          I speak at <em>tech</em> and <em>leadership</em> events.
        </h2>
        <p className="ws-section-sub">
          Currently in Portuguese. Open to English engagements. If you&apos;re
          organizing a conference, talk titles can flex to your audience.
        </p>
      </div>
      <ul className="ws-talks">
        {TALKS.map((t, i) => (
          <li key={i} className={"ws-talks-row ws-talks-topic-" + t.topic}>
            <span className="ws-talks-date">{t.date}</span>
            <div className="ws-talks-main">
              <div className="ws-talks-title">{t.title}</div>
              <div className="ws-talks-desc">{t.description}</div>
              <div className="ws-talks-venue">
                <span
                  className={
                    "ws-talks-topic-chip ws-talks-topic-chip-" + t.topic
                  }
                >
                  {t.topic === "leadership" ? "Leadership" : "Tech"}
                </span>
                <span>
                  {t.venue} · {t.city} · {t.lang}
                </span>
              </div>
            </div>
            <a
              className="ws-talks-link"
              href={t.href}
              target="_blank"
              rel="noreferrer"
            >
              {t.hrefLabel}
              <span className="ws-talks-link-arrow">
                <ArrowUpRight size={14} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ============================================================================
 * Awards
 * ========================================================================== */

const AWARDS = [
  {
    year: 2020,
    position: "1st place",
    title: "Global Legal Hackathon SP",
    trophy: "gold",
  },
  { year: 2019, position: "1st place", title: "Mão na Cevada", trophy: "gold" },
  {
    year: 2019,
    position: "2nd place",
    title: "HackRibeirão",
    trophy: "silver",
  },
  {
    year: 2019,
    position: "2nd place",
    title: "Prêmio Jovem Inovador",
    trophy: "silver",
  },
  {
    year: 2019,
    position: "Finalist",
    title: "NASA Space Apps Challenge",
    trophy: "bronze",
  },
];

function Awards() {
  return (
    <section className="ws-section" id="awards">
      <div className="ws-section-head">
        <Eyebrow>Awards · 2019 → 2020</Eyebrow>
        <h2 className="ws-section-title">
          A small <em>trophy shelf</em>.
        </h2>
        <p className="ws-section-sub">
          A few hackathons I crashed before the day job got busy.
        </p>
      </div>
      <ul className="ws-awards-list">
        {AWARDS.map((a, i) => (
          <li key={i} className={"ws-awards-row ws-awards-trophy-" + a.trophy}>
            <span className="ws-awards-year">{a.year}</span>
            <span className="ws-awards-position">{a.position}</span>
            <span className="ws-awards-title">{a.title}</span>
            <svg
              className="ws-awards-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ============================================================================
 * Writing
 * ========================================================================== */

const TOPICS: Array<{ label: string; tone: "ember" | "coral" | "brass" | "teal" }> = [
  { label: "Engineering Leadership", tone: "ember" },
  { label: "Mobile Architecture", tone: "coral" },
  { label: "Design Systems", tone: "brass" },
  { label: "Hiring & Mentorship", tone: "teal" },
  { label: "Reverse Engineering", tone: "ember" },
];

function WritingList() {
  return (
    <section className="ws-section" id="writing">
      <div className="ws-section-head">
        <Eyebrow>Writing</Eyebrow>
        <h2 className="ws-section-title">
          Notes from the <em>shelf</em>.
        </h2>
        <p className="ws-section-sub">
          Mostly about leading engineers, shipping mobile at scale, and the
          parts of the job nobody writes job descriptions for.
        </p>
      </div>

      <a
        className="ws-writing-callout"
        href="https://medium.com/@gabrieltaveira"
        target="_blank"
        rel="noreferrer"
      >
        <div className="ws-writing-callout-glow" />
        <div className="ws-writing-callout-left">
          <div className="ws-writing-callout-handle">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <span>medium.com/@gabrieltaveira</span>
          </div>
          <h3 className="ws-writing-callout-title">
            I write on <em>Medium</em>.
          </h3>
          <p className="ws-writing-callout-sub">
            New posts whenever a thought stops being interesting only to me.
            Subscribe there for the next one.
          </p>
          <div className="ws-writing-topics">
            {TOPICS.map((t, i) => (
              <span
                key={i}
                className={"ws-writing-topic ws-writing-topic-" + t.tone}
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>
        <div className="ws-writing-callout-cta">
          <span className="ws-writing-callout-link">
            Read on Medium <ArrowUpRight size={18} />
          </span>
        </div>
      </a>
    </section>
  );
}

/* ============================================================================
 * Now playing
 * ========================================================================== */

const NOW: Array<{
  chip: { label: string; tone: "ember" | "coral" | "brass" | "teal" };
  title: string;
  body: string;
}> = [
  {
    chip: { label: "Consulting", tone: "ember" },
    title: "Mobile architecture and engineering leadership",
    body:
      "Independent consulting. Engagement details under NDA. Same work, less commute.",
  },
  {
    chip: { label: "Hosting", tone: "brass" },
    title: "Space Cast on Rocketseat",
    body:
      "Long-form chats on engineering, leadership, and the strange shapes of a tech career. Bring a guest idea over 🍻.",
  },
  {
    chip: { label: "Mentoring", tone: "teal" },
    title: "Space Squad · the next generation",
    body:
      "Ambassador since the program started. The compounding interest on a 20-minute coffee with a junior engineer is wild.",
  },
  {
    chip: { label: "Tinkering", tone: "coral" },
    title: "A native screen-recording detector for Expo",
    body:
      "Upstreaming work from a past engagement. Reverse-engineering for fun, then for prod. Both still scratch the same age-8 itch.",
  },
];

function NowPlaying() {
  return (
    <section className="ws-section ws-now-section" id="about">
      <div className="ws-section-head">
        <Eyebrow>Now · May 2026</Eyebrow>
        <h2 className="ws-section-title">
          What I&apos;m actually <em>doing</em>.
        </h2>
      </div>
      <ul className="ws-now-list">
        {NOW.map((n, i) => (
          <li key={i} className="ws-now-row">
            <span className={`ws-chip ws-chip-${n.chip.tone}`}>
              <span className="ws-chip-dot" />
              {n.chip.label}
            </span>
            <div className="ws-now-row-main">
              <h3 className="ws-now-row-title">{n.title}</h3>
              <p className="ws-now-row-body">{n.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ============================================================================
 * Contact
 * ========================================================================== */

type ChannelIcon = "linkedin" | "github" | "mail" | "book" | "youtube";

const CHANNELS: Array<{ label: string; handle: string; url: string; icon: ChannelIcon }> = [
  {
    label: "LinkedIn",
    handle: "/in/gabrieltaveira",
    url: "https://www.linkedin.com/in/gabrieltaveira/",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    handle: "@GSTJ",
    url: "https://github.com/GSTJ",
    icon: "github",
  },
  {
    label: "Email",
    handle: "gabrielstaveira@gmail.com",
    url: "mailto:gabrielstaveira@gmail.com",
    icon: "mail",
  },
  {
    label: "Medium",
    handle: "@gabrieltaveira",
    url: "https://medium.com/@gabrieltaveira",
    icon: "book",
  },
  {
    label: "Space Cast",
    handle: "Rocketseat / YouTube",
    url: "https://www.youtube.com/@spacesquad-rocketseat",
    icon: "youtube",
  },
];

const SOCIAL_ICONS: Record<ChannelIcon, ReactNode> = {
  linkedin: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  github: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  mail: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  book: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  youtube: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  ),
};

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.message) return;
    setSent(true);
  };

  return (
    <section className="ws-section ws-contact" id="contact">
      <div className="ws-contact-grid">
        <div className="ws-contact-left">
          <Eyebrow accent>Get in touch</Eyebrow>
          <h2 className="ws-contact-title">
            Got an <em>interesting</em> challenge?
          </h2>
          <p className="ws-contact-sub">
            Let&apos;s solve it together. I reply within the week. If it&apos;s
            urgent, ping me on LinkedIn. I check before coffee. 🍻
          </p>
          <div className="ws-contact-channels">
            {CHANNELS.map((c, i) => (
              <a
                key={i}
                className="ws-channel"
                href={c.url}
                target="_blank"
                rel="noreferrer"
              >
                {SOCIAL_ICONS[c.icon]}
                <span className="ws-channel-label">{c.label}</span>
                <span className="ws-channel-handle">{c.handle}</span>
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>

        <form className="ws-contact-form" onSubmit={submit}>
          {sent ? (
            <div className="ws-contact-sent">
              <Chip tone="ember">Sent</Chip>
              <h3>Thanks. I&apos;ll reply within the week. 🍻</h3>
              <p>
                If you don&apos;t hear back by next Friday, ping again. Email
                sometimes loses the war with spam.
              </p>
            </div>
          ) : (
            <>
              <div className="ws-field-grid">
                <div className="ws-field">
                  <label>Name</label>
                  <input
                    className="ws-input"
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your name"
                  />
                </div>
                <div className="ws-field">
                  <label>Email</label>
                  <input
                    className="ws-input"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div className="ws-field">
                <label>The challenge</label>
                <input
                  className="ws-input"
                  type="text"
                  value={form.subject}
                  onChange={update("subject")}
                  placeholder="What needs solving?"
                />
              </div>
              <div className="ws-field">
                <label>Tell me more</label>
                <textarea
                  className="ws-input ws-textarea"
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Team size, timeline, stack, what good looks like."
                />
              </div>
              <div className="ws-form-foot">
                <button
                  type="submit"
                  className="ws-btn ws-btn-primary"
                  onClick={submit}
                >
                  Send message
                  <ArrowRight />
                </button>
                <span className="ws-kbd-hint">
                  <kbd>/</kbd> contact · <kbd>b</kbd> 🍻 · <kbd>gt</kbd> audit ·{" "}
                  <kbd>↑↑↓↓←→←→BA</kbd>
                </span>
              </div>
            </>
          )}
        </form>
      </div>

      <footer className="ws-footer">
        <div className="ws-footer-row">
          <BrandMark size={18} withText={false} />
          <span className="ws-footer-meta">
            Gabriel Taveira · Engineering Lead · Ribeirão Preto, Brazil
          </span>
          <span className="ws-footer-spacer" />
          <span className="ws-footer-meta">
            Building &amp; breaking systems since age 8 · 🍻
          </span>
        </div>
      </footer>
    </section>
  );
}

/* ============================================================================
 * Toast + System Audit
 * ========================================================================== */

function Toast({
  message,
  sub,
  onClose,
}: {
  message: string;
  sub?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 4200);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="ws-toast">
      <div className="ws-toast-glow" />
      <div className="ws-toast-icon">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div className="ws-toast-body">
        <div className="ws-toast-title">{message}</div>
        {sub && <div className="ws-toast-sub">{sub}</div>}
      </div>
      <button
        className="ws-toast-close"
        onClick={onClose}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

function SystemAudit({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const script = [
      "> system audit init",
      "> identity ............ Gabriel Taveira",
      "> role ................ Engineering Lead",
      "> years .............. 9+ professional, 17 tinkering",
      "> reports led ........ 4 → 56",
      "> teams shipped ...... Coinbase, A.Team, Meta, X-Team,",
      "                       Zé Delivery, Alfred Delivery, MIG",
      "> awards ............. 5 (2019 → 2020)",
      "> coffee level ....... ☕☕☕☕  (acceptable)",
      "> system status ...... operational",
      "> press ESC to close",
    ];
    let i = 0;
    const id = setInterval(() => {
      if (i >= script.length) {
        clearInterval(id);
        return;
      }
      setLines((prev) => [...prev, script[i]]);
      i++;
    }, 90);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="ws-audit-backdrop" onClick={onClose}>
      <div className="ws-audit" onClick={(e) => e.stopPropagation()}>
        <div className="ws-audit-head">
          <span className="ws-audit-light" />
          <span className="ws-audit-light" />
          <span className="ws-audit-light" />
          <span className="ws-audit-title">workshop.audit</span>
          <button className="ws-audit-close" onClick={onClose}>
            esc
          </button>
        </div>
        <pre className="ws-audit-body">
          {lines.join("\n")}
          <span className="ws-audit-cursor">▊</span>
        </pre>
      </div>
    </div>
  );
}

/* ============================================================================
 * App
 * ========================================================================== */

export default function Portfolio() {
  const [active, setActive] = useState("work");
  const [toast, setToast] = useState<{ message: string; sub?: string } | null>(
    null
  );
  const [audit, setAudit] = useState(false);

  // Live clock
  useEffect(() => {
    const tick = () => {
      const el = document.getElementById("ws-clock");
      if (!el) return;
      const now = new Date();
      const t = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "America/Sao_Paulo",
      });
      el.textContent = `${t} BRT`;
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Scroll spy
  useEffect(() => {
    const ids = [
      "work",
      "publications",
      "talks",
      "awards",
      "writing",
      "about",
      "contact",
    ];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const onScroll = () => {
      const y = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (y >= sections[i].offsetTop) {
          const id = sections[i].id;
          setActive(
            id === "contact"
              ? "about"
              : id === "writing"
                ? "publications"
                : id
          );
          return;
        }
      }
      setActive("work");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keyboard easter eggs
  useEffect(() => {
    const KONAMI = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    const konamiRef: string[] = [];
    const gtRef: Array<{ k: string; t: number }> = [];

    const spawnBeer = () => {
      const el = document.createElement("div");
      el.className = "ws-beer";
      el.textContent = "🍻";
      el.style.left = 10 + Math.random() * 80 + "vw";
      el.style.animationDuration = 2.2 + Math.random() * 1.5 + "s";
      document.body.appendChild(el);
      window.setTimeout(() => el.remove(), 4500);
    };

    const onKey = (e: KeyboardEvent) => {
      const tag =
        (document.activeElement && document.activeElement.tagName) || "";
      const inForm = tag === "INPUT" || tag === "TEXTAREA";

      if (e.key === "/" && !inForm) {
        e.preventDefault();
        const el = document.getElementById("contact");
        const form = document.querySelector<HTMLInputElement>(
          ".ws-contact-form .ws-input"
        );
        if (el)
          window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
        window.setTimeout(() => form && form.focus(), 450);
        return;
      }

      if (e.key === "b" && !inForm) {
        for (let i = 0; i < 5; i++) window.setTimeout(spawnBeer, i * 90);
      }

      if (!inForm) {
        gtRef.push({ k: e.key.toLowerCase(), t: Date.now() });
        while (gtRef.length && Date.now() - gtRef[0].t > 1000) gtRef.shift();
        const seq = gtRef.map((x) => x.k).join("");
        if (seq.endsWith("gt")) {
          setAudit(true);
          gtRef.length = 0;
        }
      }

      konamiRef.push(e.key);
      if (konamiRef.length > KONAMI.length) konamiRef.shift();
      const match =
        konamiRef.length === KONAMI.length &&
        konamiRef.every(
          (x, i) => x.toLowerCase() === KONAMI[i].toLowerCase()
        );
      if (match) {
        setToast({
          message: "Reverse engineering detected.",
          sub: "Welcome. The tools are over by the captain's hat. 🍻",
        });
        document.body.classList.add("ws-crt");
        window.setTimeout(
          () => document.body.classList.remove("ws-crt"),
          4000
        );
        for (let i = 0; i < 18; i++) window.setTimeout(spawnBeer, i * 70);
        konamiRef.length = 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Console banner — easter egg #1
  useEffect(() => {
    const css1 =
      "color:#e07a1f;font:600 14px ui-monospace,monospace;text-shadow:0 0 8px rgba(224,122,31,.5);";
    const css2 = "color:#f6f1e6;font:400 13px ui-monospace,monospace;";
    const css3 = "color:#8a827a;font:400 11px ui-monospace,monospace;";
    console.log("%c   ▄████  ████████   ▄▄▄▄▄▄ ", css1);
    console.log("%c  ██     ██▄    ██▄   ██   ", css1);
    console.log("%c   ████    ██     ██   ██   ", css1);
    console.log("%c     ██    ██     ██   ██   ", css1);
    console.log("%c  ████▀    ██     ██   ██   ", css1);
    console.log(
      "%cGabriel Taveira — Engineering Lead, currently consulting",
      css2
    );
    console.log("%cBuilding and breaking systems since age 8.", css3);
    console.log(
      "%c   ↳ shortcuts: '/' to contact · 'gt' for system audit · ↑↑↓↓←→←→BA for science",
      css3
    );
    console.log("%c   ↳ hiring? gabrielstaveira@gmail.com", css3);
  }, []);

  const handleNav = useCallback((id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el)
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  }, []);

  return (
    <>
      <Nav active={active} onNav={handleNav} />
      <Hero onContact={() => handleNav("contact")} />
      <WorkGrid />
      <Publications />
      <TalksList />
      <Awards />
      <WritingList />
      <NowPlaying />
      <Contact />

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      {audit && <SystemAudit onClose={() => setAudit(false)} />}
    </>
  );
}
