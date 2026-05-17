"use client";

/**
 * Proposal page — danielsun.space-inspired direction, glare turned up.
 *
 * Standalone: ignores the existing ws-* design system on purpose so the
 * user can compare this against the Workshop build and the /lab experiments.
 * Hardcoded English copy; if this direction wins we port it through i18n.
 */

import Link from "next/link";
import { Inter_Tight, Caveat } from "next/font/google";
import { useEffect, useRef } from "react";
import {
  CHANNELS,
  WORK,
  TALKS,
  AWARDS,
  NOW,
  WRITING_TOPICS,
  LINKEDIN,
  GITHUB,
  EMAIL,
  EMAIL_ADDR,
  MEDIUM,
  SPACE_CAST,
} from "@/components/portfolio/data";
import {
  yearsInIndustry,
  yearsTinkering,
  currentMonthLabel,
} from "@/components/portfolio/lifeline";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--ds-font-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--ds-font-hand",
  display: "swap",
});

/* ---------- Work copy (proposal-only — not wired through i18n yet) ---------- */

const WORK_COPY: Record<
  (typeof WORK)[number]["id"],
  { name: string; services: string }
> = {
  consulting: {
    name: "Independent",
    services: "Engineering leadership, mobile architecture, hands-on build",
  },
  coinbase: {
    name: "Coinbase",
    services: "React Native, Expo, platform architecture",
  },
  ateam: {
    name: "D-ID via A.Team",
    services: "Tech lead, React Native, applied AI",
  },
  meta: {
    name: "Kustomer at Meta",
    services: "Design systems, developer experience, SDKs",
  },
  xteam: {
    name: "Groundswell via X-Team",
    services: "Mentorship, fintech, testing infra",
  },
  ze: {
    name: "Zé Delivery (AB InBev)",
    services: "Hiring, native, design systems",
  },
  alfred: {
    name: "Alfred Delivery",
    services: "Web → React Native migration",
  },
  micro: {
    name: "Micro Import Group",
    services: "Full-stack, PHP, Gatsby",
  },
};

const TALK_COPY: Record<
  (typeof TALKS)[number]["id"],
  { venue: string; title: string }
> = {
  brooklyn: {
    venue: "The Brooklyn Brothers",
    title: "Engineering efficiency in the age of AI",
  },
  tdc: {
    venue: "TDC — The Developer's Conference",
    title: "Mobile architecture for product teams",
  },
  assemble: {
    venue: "Rocketseat Assemble",
    title: "Growing engineers, not just shipping features",
  },
  spaceSquad: {
    venue: "Space Squad (Rocketseat)",
    title: "Inside React Native at scale",
  },
};

const AWARD_COPY: Record<
  (typeof AWARDS)[number]["id"],
  { name: string; place: string }
> = {
  globalLegal: { name: "Global Legal Hackathon", place: "Gold · 2020" },
  maoNaCevada: { name: "Mão na Cevada (AB InBev)", place: "Gold · 2019" },
  hackRibeirao: { name: "Hack Ribeirão", place: "Silver · 2019" },
  jovemInovador: { name: "Jovem Inovador", place: "Silver · 2019" },
  nasa: { name: "NASA Space Apps", place: "Finalist · 2019" },
};

const NOW_COPY: Record<(typeof NOW)[number]["id"], string> = {
  consulting:
    "Taking on a small number of consulting engagements — mobile architecture, platform reviews, and embedded leadership.",
  hosting:
    "Hosting Space Cast on Rocketseat — long-form conversations with engineers building real things.",
  mentoring:
    "Mentoring senior engineers and lead-track ICs, mostly out of the A.Team and Brazilian RN communities.",
  tinkering:
    "Tinkering with small native apps and a few internal AI tools — most of it half-shipped, all of it on-purpose.",
};

const TOPIC_COPY: Record<(typeof WRITING_TOPICS)[number]["id"], string> = {
  leadership: "Notes on engineering leadership",
  mobile: "React Native, Expo, and shipping at scale",
  design: "Design systems from an engineer's chair",
  hiring: "Hiring and growing senior ICs",
  reverse: "Reverse-engineering apps I admire",
};

const CHANNEL_COPY: Record<
  (typeof CHANNELS)[number]["id"],
  { label: string; cta: string }
> = {
  linkedin: { label: "LinkedIn", cta: "Best place to start a conversation" },
  github: { label: "GitHub", cta: "Open source, hackathon code, experiments" },
  email: { label: "Email", cta: "For proposals and intros" },
  medium: { label: "Medium", cta: "Long-form essays on engineering" },
  spaceCast: { label: "Space Cast", cta: "The podcast, on YouTube" },
};

/* ---------- Reveal-on-scroll hook ---------- */

function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (prefersReduced) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = Number(el.dataset.delay ?? i * 60);
            window.setTimeout(() => el.classList.add("is-in"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Cursor-tracker (for the sun parallax + mark sweep direction) ---- */

function useCursorTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      document.documentElement.style.setProperty("--ds-mx", cx.toFixed(3));
      document.documentElement.style.setProperty("--ds-my", cy.toFixed(3));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}

/* ---------- Page ---------- */

export default function ProposalSunPage() {
  const years = yearsInIndustry();
  const tinkering = yearsTinkering();
  const month = currentMonthLabel("en-US");

  useReveal();
  useCursorTracker();

  return (
    <>
      <style>{styles}</style>

      <CompareBar />

      <main className={`ds ${interTight.variable} ${caveat.variable}`}>
        {/* The sun: fixed-ish behind the hero, parallax-tracks cursor */}
        <SunBlob />

        <header className="ds-hero">
          <p className="ds-eyebrow" data-reveal>
            <span className="ds-dot" aria-hidden /> Available · {month}
            <span className="ds-hand-small ds-tilt-r">← yes, really</span>
          </p>

          <h1 className="ds-headline" data-reveal data-delay="80">
            <span className="ds-hand ds-tilt-l">Howdy!</span>
            <br />
            <span className="ds-name">
              I&rsquo;m <em>Gabriel.</em>
            </span>
            <br />
            <span className="ds-headline-sub">
              An engineering lead{" "}
              <Marker>building mobile products</Marker> for teams that
              actually ship.
            </span>
          </h1>

          <p className="ds-lede" data-reveal data-delay="180">
            {years}+ years in the industry, {tinkering}+ years tinkering
            <span className="ds-hand-small ds-tilt-r">
              {" "}
              (started at 8 =)
            </span>
            . Currently independent, based in Brazil, working with founders
            and platform teams from <em>YC startups to enterprises</em> — and
            the occasional crew in between.
          </p>

          <div className="ds-cta-row" data-reveal data-delay="260">
            <a
              className="ds-btn ds-btn--primary"
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
            >
              Start a project
              <span aria-hidden className="ds-btn-arrow">
                →
              </span>
            </a>
            <a className="ds-btn ds-btn--ghost" href={EMAIL}>
              {EMAIL_ADDR}
            </a>
            <span className="ds-hand-small ds-tilt-l ds-cta-aside">
              ← either works
            </span>
          </div>

          {/* Yellow paper-tape strip stuck on the page */}
          <div className="ds-tape" aria-hidden>
            <span>SHIPPING · WRITING · MENTORING · {month.toUpperCase()}</span>
          </div>
        </header>

        {/* ------- Selected work ------- */}
        <Section eyebrow="01" title="Selected work" hand="some of the good ones">
          <ul className="ds-list">
            {WORK.map((w, i) => {
              const copy = WORK_COPY[w.id];
              return (
                <li
                  key={w.id}
                  className="ds-row"
                  data-reveal
                  data-delay={i * 50}
                >
                  <a
                    className="ds-row-link"
                    href={w.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="ds-row-name">
                      {copy.name}
                      {w.id === "coinbase" && (
                        <span className="ds-hand-small ds-tilt-r ds-row-aside">
                          {" "}
                          ← ask me about this
                        </span>
                      )}
                    </span>
                    <span className="ds-row-services">{copy.services}</span>
                    <span className="ds-row-year">
                      {w.eyebrow.split("·").slice(-1)[0]?.trim()}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Section>

        {/* ------- Story ------- */}
        <Section eyebrow="02" title="Story" hand="the long version, abridged">
          <div className="ds-prose">
            <p data-reveal>
              I started coding at eight — small games, broken websites, random
              scripts I&apos;d show my mom. {tinkering}+ years later I&apos;m
              still doing the same thing, just with a bigger keyboard and
              slightly better taste.{" "}
              <span className="ds-hand-small ds-tilt-r">(mostly.)</span>
            </p>
            <p data-reveal data-delay="80">
              Professionally, I&apos;ve spent {years}+ years building mobile
              and web products. I&apos;ve led teams at{" "}
              <strong>Coinbase</strong>, <strong>D-ID</strong>,{" "}
              <strong>Kustomer (Meta)</strong>, <strong>Zé Delivery</strong>,
              and a long line of startups before that. My happy zone is the
              messy middle: where architecture choices meet hiring choices
              meet what the team actually wants to work on Monday morning.
            </p>
            <p data-reveal data-delay="160">
              These days I run a small consulting practice. I take on a
              handful of engagements at a time and try to leave each team{" "}
              <Marker>faster than I found them</Marker>.
            </p>
          </div>
        </Section>

        {/* ------- Now ------- */}
        <Section eyebrow="03" title="Now" hand={`as of ${month.toLowerCase()}`}>
          <ul className="ds-now">
            {NOW.map((n, i) => (
              <li
                key={n.id}
                className="ds-now-item"
                data-reveal
                data-delay={i * 70}
              >
                <span className="ds-now-bullet" aria-hidden>
                  <Sunburst />
                </span>
                <span>{NOW_COPY[n.id]}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ------- Speaking ------- */}
        <Section eyebrow="04" title="Speaking" hand="on stages & in rooms">
          <ul className="ds-list ds-list--compact">
            {TALKS.map((t, i) => {
              const copy = TALK_COPY[t.id];
              return (
                <li
                  key={t.id}
                  className="ds-row"
                  data-reveal
                  data-delay={i * 50}
                >
                  <a
                    className="ds-row-link"
                    href={t.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="ds-row-name">{copy.venue}</span>
                    <span className="ds-row-services">{copy.title}</span>
                    <span className="ds-row-year">
                      {t.date} · {t.lang}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Section>

        {/* ------- Writing ------- */}
        <Section eyebrow="05" title="Writing" hand="thoughts, occasionally edited">
          <p className="ds-eyebrow-inline" data-reveal>
            Essays on{" "}
            <a href={MEDIUM} target="_blank" rel="noreferrer">
              Medium
            </a>{" "}
            — mostly engineering leadership and mobile.
          </p>
          <ul className="ds-tags" data-reveal data-delay="80">
            {WRITING_TOPICS.map((t) => (
              <li key={t.id} className="ds-tag">
                {TOPIC_COPY[t.id]}
              </li>
            ))}
          </ul>
        </Section>

        {/* ------- Awards ------- */}
        <Section eyebrow="06" title="Hackathons" hand="five wins, two years">
          <p className="ds-eyebrow-inline" data-reveal>
            Between 2019 and 2020 I did almost nothing but hackathons — five
            podium finishes, including a global one.{" "}
            <span className="ds-hand-small ds-tilt-r">(good times.)</span>
          </p>
          <ul className="ds-list ds-list--compact">
            {AWARDS.map((a, i) => {
              const copy = AWARD_COPY[a.id];
              return (
                <li
                  key={a.id}
                  className="ds-row ds-row--static"
                  data-reveal
                  data-delay={i * 40}
                >
                  <span className="ds-row-link">
                    <span className="ds-row-name">
                      {copy.name}
                      {a.trophy === "gold" && (
                        <span aria-hidden className="ds-trophy">
                          {" "}
                          ★
                        </span>
                      )}
                    </span>
                    <span className="ds-row-services">
                      {trophyText(a.trophy)}
                    </span>
                    <span className="ds-row-year">{copy.place}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Section>

        {/* ------- Contact ------- */}
        <Section eyebrow="07" title="Connect" hand="pick your channel">
          <ul className="ds-list ds-list--compact">
            {CHANNELS.map((c, i) => {
              const copy = CHANNEL_COPY[c.id];
              return (
                <li
                  key={c.id}
                  className="ds-row"
                  data-reveal
                  data-delay={i * 50}
                >
                  <a
                    className="ds-row-link"
                    href={c.url}
                    target={c.id === "email" ? undefined : "_blank"}
                    rel="noreferrer"
                  >
                    <span className="ds-row-name">{copy.label}</span>
                    <span className="ds-row-services">{copy.cta}</span>
                    <span className="ds-row-year">{c.handle}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Section>

        <footer className="ds-foot" data-reveal>
          <div className="ds-foot-sun" aria-hidden>
            <Sunburst />
          </div>
          <p>
            <span className="ds-hand ds-tilt-l">— Thanks for reading.</span>
          </p>
          <p className="ds-foot-meta">
            Built as a design proposal · Inter Tight + Caveat ·{" "}
            <a href={GITHUB} target="_blank" rel="noreferrer">
              source on GitHub
            </a>
            <span className="ds-sep">·</span>
            <a href={SPACE_CAST} target="_blank" rel="noreferrer">
              Space Cast
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}

function trophyText(t: "gold" | "silver" | "bronze") {
  if (t === "gold") return "1st place";
  if (t === "silver") return "2nd place";
  return "Finalist";
}

function Section({
  eyebrow,
  title,
  hand,
  children,
}: {
  eyebrow: string;
  title: string;
  hand?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="ds-section" data-reveal>
      <header className="ds-section-head">
        <span className="ds-section-num">{eyebrow}</span>
        <h2 className="ds-section-title">{title}</h2>
        {hand && (
          <span className="ds-hand-small ds-tilt-l ds-section-hand">
            {hand}
          </span>
        )}
      </header>
      <div className="ds-section-body">{children}</div>
    </section>
  );
}

function CompareBar() {
  return (
    <nav className="ds-compare" aria-label="Design comparison">
      <Link href="/en-US" className="ds-compare-link">
        <span className="ds-compare-tag">cur</span> current design
      </Link>
      <Link href="/en-US/lab" className="ds-compare-link">
        <span className="ds-compare-tag">lab</span> /lab
      </Link>
      <span className="ds-compare-link ds-compare-link--active">
        <span className="ds-compare-tag ds-compare-tag--active">▲</span> proposal: sun
      </span>
    </nav>
  );
}

/* ---------- The sun: animated SVG with conic backdrop, rays, bloom ---------- */

function SunBlob() {
  const ref = useRef<SVGSVGElement | null>(null);
  return (
    <div className="ds-sun-wrap" aria-hidden>
      <div className="ds-sun-bloom" />
      <div className="ds-sun-conic" />
      <svg
        ref={ref}
        className="ds-sun"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff8cf" />
            <stop offset="38%" stopColor="#ffe24a" />
            <stop offset="72%" stopColor="#ffb800" />
            <stop offset="100%" stopColor="#ff7a00" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sunHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd900" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#ffb800" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ff7a00" stopOpacity="0" />
          </radialGradient>
          <filter id="sunBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        {/* outer soft halo */}
        <circle cx="300" cy="300" r="290" fill="url(#sunHalo)" />

        {/* lens-flare rays — each pulses independently */}
        <g className="ds-rays">
          {Array.from({ length: 7 }).map((_, i) => (
            <rect
              key={i}
              x="298"
              y="20"
              width="4"
              height="560"
              rx="2"
              fill="url(#sunHalo)"
              style={{
                transformOrigin: "300px 300px",
                transform: `rotate(${(360 / 7) * i}deg)`,
                animation: `ds-ray-pulse 3.2s ease-in-out ${i * 0.32}s infinite`,
                mixBlendMode: "screen",
              }}
            />
          ))}
        </g>

        {/* blurred core for the bloom */}
        <circle
          cx="300"
          cy="300"
          r="170"
          fill="url(#sunCore)"
          filter="url(#sunBlur)"
          opacity="0.85"
        />
        {/* crisp core */}
        <circle cx="300" cy="300" r="138" fill="url(#sunCore)" />
        {/* hot center */}
        <circle cx="300" cy="300" r="68" fill="#fff5b0" opacity="0.9" />
      </svg>
    </div>
  );
}

function Sunburst() {
  // small inline sunburst icon used in lists and footer
  return (
    <svg viewBox="0 0 24 24" className="ds-sunburst" aria-hidden>
      <circle cx="12" cy="12" r="4" fill="#ffb800" />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={i}
          x="11.4"
          y="2"
          width="1.2"
          height="4"
          rx="0.6"
          fill="#ffd900"
          style={{
            transformOrigin: "12px 12px",
            transform: `rotate(${i * 45}deg)`,
          }}
        />
      ))}
    </svg>
  );
}

/* ---------- Marker: yellow highlighter that sweeps in on hover ------------- */

function Marker({ children }: { children: React.ReactNode }) {
  return <mark className="ds-mark">{children}</mark>;
}

/* ---------- Styles ---------- */

const styles = `
  :root {
    --ds-bg: #f6f5f0;
    --ds-paper: #efeeea;
    --ds-ink: #0e0e10;
    --ds-ink-2: rgba(14, 14, 16, 0.66);
    --ds-ink-3: rgba(14, 14, 16, 0.42);
    --ds-rule: rgba(14, 14, 16, 0.12);

    --ds-yellow: #ffd900;
    --ds-yellow-hot: #fff200;
    --ds-yellow-soft: rgba(255, 217, 0, 0.42);
    --ds-orange: #ff8a00;
    --ds-blue: #0099ff;

    --ds-mx: 0;
    --ds-my: 0;
  }

  @media (prefers-color-scheme: dark) {
    :root { color-scheme: light; }
  }

  html, body {
    background: var(--ds-bg);
    color: var(--ds-ink);
  }

  /* ---- the sun: fixed-positioned, parallax via cursor vars ---- */
  .ds-sun-wrap {
    position: fixed;
    top: -180px;
    right: -180px;
    width: 880px;
    height: 880px;
    pointer-events: none;
    z-index: 0;
    transform: translate3d(
      calc(var(--ds-mx, 0) * -16px),
      calc(var(--ds-my, 0) * -16px),
      0
    );
    transition: transform 0.6s cubic-bezier(.2,.7,.2,1);
  }
  @media (max-width: 760px) {
    .ds-sun-wrap {
      width: 620px;
      height: 620px;
      top: -120px;
      right: -180px;
    }
  }

  .ds-sun {
    width: 100%;
    height: 100%;
    display: block;
    animation: ds-sun-breathe 6s ease-in-out infinite;
  }
  .ds-sun-conic {
    position: absolute;
    inset: 8%;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      rgba(255, 217, 0, 0) 0deg,
      rgba(255, 217, 0, 0.45) 40deg,
      rgba(255, 138, 0, 0.15) 100deg,
      rgba(255, 217, 0, 0) 160deg,
      rgba(255, 242, 0, 0.55) 220deg,
      rgba(255, 138, 0, 0.12) 290deg,
      rgba(255, 217, 0, 0) 360deg
    );
    filter: blur(28px);
    mix-blend-mode: screen;
    opacity: 0.85;
    animation: ds-spin 32s linear infinite;
  }
  .ds-sun-bloom {
    position: absolute;
    inset: -8%;
    border-radius: 50%;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(255, 230, 100, 0.55) 0%,
      rgba(255, 184, 0, 0.18) 38%,
      rgba(255, 138, 0, 0) 70%
    );
    filter: blur(40px);
    animation: ds-bloom-pulse 5.5s ease-in-out infinite;
  }

  @keyframes ds-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes ds-sun-breathe {
    0%, 100% { transform: scale(1); filter: saturate(1); }
    50% { transform: scale(1.025); filter: saturate(1.15); }
  }
  @keyframes ds-ray-pulse {
    0%, 100% { opacity: 0.25; transform: rotate(var(--r, 0deg)) scaleY(0.95); }
    50% { opacity: 0.85; transform: rotate(var(--r, 0deg)) scaleY(1.08); }
  }
  @keyframes ds-bloom-pulse {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  .ds-rays rect { transform-box: fill-box; }

  /* ---- top compare bar ---- */
  .ds-compare {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    justify-content: center;
    gap: 6px;
    padding: 10px 16px;
    background: rgba(246, 245, 240, 0.72);
    backdrop-filter: blur(14px) saturate(1.4);
    -webkit-backdrop-filter: blur(14px) saturate(1.4);
    border-bottom: 1px solid var(--ds-rule);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
    font-size: 11px;
    letter-spacing: 0.02em;
  }
  .ds-compare-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--ds-ink-3);
    text-decoration: none;
    padding: 4px 10px;
    border-radius: 999px;
    transition: color 0.2s ease, background 0.2s ease;
  }
  .ds-compare-link:hover { color: var(--ds-ink); background: rgba(0,0,0,0.05); }
  .ds-compare-link--active {
    color: var(--ds-ink);
    background: var(--ds-yellow);
    box-shadow: 0 0 0 1px rgba(0,0,0,0.06);
  }
  .ds-compare-tag {
    font-size: 9px;
    padding: 1px 5px;
    border-radius: 4px;
    background: rgba(0,0,0,0.06);
    color: var(--ds-ink-2);
  }
  .ds-compare-tag--active { background: rgba(0,0,0,0.18); color: #fff; }

  /* ---- main layout ---- */
  .ds {
    position: relative;
    z-index: 1;
    max-width: 780px;
    margin: 0 auto;
    padding: 88px 24px 120px;
    font-family: var(--ds-font-sans), "Inter Tight", "Inter",
      ui-sans-serif, system-ui, -apple-system, sans-serif;
    font-feature-settings: "ss01", "cv11";
    -webkit-font-smoothing: antialiased;
  }

  /* ---- reveal-on-scroll ---- */
  [data-reveal] {
    opacity: 0;
    transform: translateY(14px) rotate(-0.4deg);
    transition:
      opacity 0.7s cubic-bezier(.2,.7,.2,1),
      transform 0.7s cubic-bezier(.2,.7,.2,1);
    will-change: opacity, transform;
  }
  [data-reveal].is-in {
    opacity: 1;
    transform: translateY(0) rotate(0);
  }
  @media (prefers-reduced-motion: reduce) {
    [data-reveal] { opacity: 1; transform: none; transition: none; }
    .ds-sun, .ds-sun-conic, .ds-sun-bloom, .ds-rays rect { animation: none !important; }
    .ds-sun-wrap { transition: none; }
  }

  /* ---- hero ---- */
  .ds-hero {
    margin-bottom: 96px;
    position: relative;
  }
  .ds-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 500;
    color: var(--ds-ink-2);
    letter-spacing: 0.01em;
    margin: 0 0 28px;
  }
  .ds-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.18);
    display: inline-block;
    animation: ds-dot-pulse 2.4s ease-in-out infinite;
  }
  @keyframes ds-dot-pulse {
    0%, 100% { box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.18); }
    50% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0.06); }
  }

  .ds-headline {
    font-family: var(--ds-font-sans), "Inter Tight", "Inter", system-ui, sans-serif;
    font-size: clamp(46px, 7.4vw, 84px);
    line-height: 0.98;
    letter-spacing: -0.035em;
    font-weight: 700;
    margin: 0 0 28px;
    color: var(--ds-ink);
  }
  .ds-headline .ds-hand {
    font-family: var(--ds-font-hand), "Caveat", cursive;
    font-weight: 700;
    font-size: 0.46em;
    color: var(--ds-ink-2);
    letter-spacing: 0;
    display: inline-block;
    margin-bottom: 4px;
  }
  .ds-name em {
    font-style: italic;
    background: linear-gradient(
      180deg,
      transparent 0%,
      transparent 62%,
      var(--ds-yellow) 62%,
      var(--ds-yellow) 92%,
      transparent 92%
    );
    background-size: 100% 100%;
    padding: 0 0.06em;
  }
  .ds-headline-sub {
    font-size: 0.45em;
    font-weight: 500;
    color: var(--ds-ink-2);
    letter-spacing: -0.015em;
    line-height: 1.25;
    display: inline-block;
    margin-top: 18px;
    max-width: 22ch;
  }

  /* handwriting variants */
  .ds-hand {
    font-family: var(--ds-font-hand), "Caveat", cursive;
    font-weight: 700;
  }
  .ds-hand-small {
    font-family: var(--ds-font-hand), "Caveat", cursive;
    font-size: 18px;
    font-weight: 600;
    color: var(--ds-ink-2);
    margin-left: 8px;
    line-height: 1;
    display: inline-block;
  }
  .ds-tilt-l { transform: rotate(-3deg); display: inline-block; }
  .ds-tilt-r { transform: rotate(2.5deg); display: inline-block; }

  /* ---- the marker: yellow highlighter that sweeps in on hover ---- */
  .ds-mark {
    position: relative;
    color: var(--ds-ink);
    padding: 0 4px;
    background:
      linear-gradient(90deg, var(--ds-yellow) 0%, var(--ds-yellow-hot) 100%);
    background-size: 100% 60%;
    background-repeat: no-repeat;
    background-position: 0 88%;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    transition: background-size 0.45s cubic-bezier(.2,.7,.2,1);
  }
  .ds-mark:hover {
    background-size: 100% 100%;
  }

  /* ---- lede / cta / tape ---- */
  .ds-lede {
    font-size: clamp(18px, 1.7vw, 21px);
    line-height: 1.55;
    color: var(--ds-ink);
    max-width: 60ch;
    margin: 0 0 28px;
  }
  .ds-lede em {
    font-style: italic;
    color: var(--ds-ink);
    font-weight: 500;
  }
  .ds-cta-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin: 0 0 56px;
  }
  .ds-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    padding: 11px 18px;
    border-radius: 999px;
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    letter-spacing: -0.005em;
  }
  .ds-btn--primary {
    background: var(--ds-yellow);
    color: var(--ds-ink);
    box-shadow:
      0 1px 0 rgba(0,0,0,0.04),
      0 12px 30px -10px rgba(255, 217, 0, 0.6),
      inset 0 1px 0 rgba(255,255,255,0.6);
  }
  .ds-btn--primary:hover {
    transform: translateY(-2px) rotate(-1deg);
    box-shadow:
      0 1px 0 rgba(0,0,0,0.04),
      0 18px 40px -10px rgba(255, 217, 0, 0.8);
    background: var(--ds-yellow-hot);
  }
  .ds-btn-arrow { transition: transform 0.2s ease; }
  .ds-btn--primary:hover .ds-btn-arrow { transform: translateX(3px); }
  .ds-btn--ghost {
    color: var(--ds-ink);
    background: transparent;
    border: 1px solid var(--ds-ink);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    font-size: 12px;
  }
  .ds-btn--ghost:hover { background: var(--ds-ink); color: var(--ds-bg); }
  .ds-cta-aside { margin-left: 4px; }

  .ds-tape {
    position: absolute;
    right: -8px;
    top: -8px;
    transform: rotate(6deg);
    background: var(--ds-yellow);
    color: var(--ds-ink);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    padding: 6px 18px;
    box-shadow:
      0 6px 24px -8px rgba(255, 138, 0, 0.55),
      0 1px 0 rgba(0,0,0,0.06);
    border-radius: 2px;
    pointer-events: none;
    z-index: 2;
  }
  .ds-tape::before, .ds-tape::after {
    content: "";
    position: absolute;
    top: 0; bottom: 0;
    width: 10px;
    background-image: linear-gradient(
      135deg,
      transparent 33%,
      rgba(0,0,0,0.05) 33%,
      rgba(0,0,0,0.05) 66%,
      transparent 66%
    );
    background-size: 6px 6px;
  }
  .ds-tape::before { left: 0; }
  .ds-tape::after { right: 0; }
  @media (max-width: 640px) {
    .ds-tape { right: 4px; top: -16px; font-size: 9px; padding: 5px 14px; }
  }

  /* ---- sections ---- */
  .ds-section {
    padding-top: 64px;
    margin-bottom: 64px;
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 28px;
    position: relative;
  }
  .ds-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: repeating-linear-gradient(
      90deg,
      var(--ds-rule) 0 6px,
      transparent 6px 12px
    );
  }
  @media (max-width: 640px) {
    .ds-section {
      grid-template-columns: 1fr;
      gap: 12px;
      padding-top: 48px;
      margin-bottom: 48px;
    }
  }
  .ds-section-head {
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: sticky;
    top: 56px;
    align-self: start;
    height: max-content;
  }
  @media (max-width: 640px) {
    .ds-section-head { position: static; }
  }
  .ds-section-num {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    font-size: 11px;
    color: var(--ds-ink);
    background: var(--ds-yellow);
    padding: 2px 8px;
    border-radius: 4px;
    align-self: start;
    letter-spacing: 0.08em;
    box-shadow: 0 4px 12px -4px rgba(255, 217, 0, 0.5);
  }
  .ds-section-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--ds-ink);
    margin: 0;
    letter-spacing: -0.005em;
  }
  .ds-section-hand {
    margin-left: 0;
    margin-top: 4px;
    font-size: 16px;
    color: var(--ds-ink-3);
  }
  .ds-section-body { min-width: 0; }

  /* ---- list rows ---- */
  .ds-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .ds-row {
    border-bottom: 1px dashed var(--ds-rule);
    position: relative;
  }
  .ds-row:first-child { border-top: 1px dashed var(--ds-rule); }
  .ds-row-link {
    display: grid;
    grid-template-columns: minmax(180px, 1.2fr) 1.8fr auto;
    gap: 20px;
    align-items: baseline;
    padding: 18px 8px;
    text-decoration: none;
    color: var(--ds-ink);
    position: relative;
    transition: padding 0.3s cubic-bezier(.2,.7,.2,1);
  }
  .ds-row:not(.ds-row--static) .ds-row-link::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      var(--ds-yellow-soft) 0%,
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    border-radius: 4px;
  }
  .ds-row:not(.ds-row--static) .ds-row-link:hover { padding-left: 18px; }
  .ds-row:not(.ds-row--static) .ds-row-link:hover::before { opacity: 1; }
  .ds-row:not(.ds-row--static) .ds-row-link::after {
    content: "→";
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translate(-8px, -50%);
    opacity: 0;
    color: var(--ds-ink);
    font-weight: 500;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .ds-row:not(.ds-row--static) .ds-row-link:hover::after {
    opacity: 1;
    transform: translate(0, -50%);
  }
  .ds-row-name {
    font-size: 19px;
    font-weight: 600;
    letter-spacing: -0.01em;
    position: relative;
    z-index: 1;
  }
  .ds-row-aside {
    color: var(--ds-ink-3);
    font-weight: 600;
  }
  .ds-row-services {
    font-size: 14px;
    color: var(--ds-ink-2);
    line-height: 1.45;
    position: relative;
    z-index: 1;
  }
  .ds-row-year {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    font-size: 11px;
    color: var(--ds-ink-3);
    text-align: right;
    letter-spacing: 0.04em;
    white-space: nowrap;
    position: relative;
    z-index: 1;
  }
  @media (max-width: 640px) {
    .ds-row-link {
      grid-template-columns: 1fr;
      gap: 4px;
      padding: 14px 8px;
    }
    .ds-row-year { text-align: left; }
  }
  .ds-list--compact .ds-row-name { font-size: 17px; }

  /* ---- prose ---- */
  .ds-prose p {
    font-size: 18px;
    line-height: 1.7;
    color: var(--ds-ink);
    margin: 0 0 22px;
    max-width: 62ch;
  }
  .ds-prose strong { font-weight: 600; }
  .ds-prose .ds-hand-small { font-size: 17px; }

  /* ---- now ---- */
  .ds-eyebrow-inline {
    font-size: 15px;
    color: var(--ds-ink-2);
    margin: 0 0 18px;
    max-width: 60ch;
    line-height: 1.55;
  }
  .ds-eyebrow-inline a {
    color: var(--ds-ink);
    border-bottom: 2px solid var(--ds-yellow);
    text-decoration: none;
    padding-bottom: 1px;
    transition: background 0.2s ease;
  }
  .ds-eyebrow-inline a:hover { background: var(--ds-yellow-soft); }
  .ds-now {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .ds-now-item {
    display: grid;
    grid-template-columns: 28px 1fr;
    gap: 14px;
    align-items: start;
    font-size: 17px;
    line-height: 1.55;
    color: var(--ds-ink);
    max-width: 62ch;
  }
  .ds-now-bullet {
    display: inline-flex;
    width: 24px;
    height: 24px;
    margin-top: 4px;
    animation: ds-spin 18s linear infinite;
  }
  .ds-sunburst { width: 100%; height: 100%; display: block; }

  /* ---- tags ---- */
  .ds-tags {
    list-style: none;
    padding: 0;
    margin: 18px 0 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .ds-tag {
    font-size: 13px;
    font-weight: 500;
    padding: 7px 14px;
    border: 1px solid var(--ds-rule);
    border-radius: 999px;
    color: var(--ds-ink-2);
    background: transparent;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease,
      transform 0.2s ease;
  }
  .ds-tag:nth-child(2n) { transform: rotate(-1deg); }
  .ds-tag:nth-child(3n) { transform: rotate(1.5deg); }
  .ds-tag:hover {
    background: var(--ds-yellow);
    color: var(--ds-ink);
    border-color: transparent;
    transform: rotate(0) scale(1.05);
  }

  .ds-trophy { color: var(--ds-yellow-hot); font-size: 1.1em; text-shadow: 0 1px 0 rgba(0,0,0,0.06); }

  /* ---- footer ---- */
  .ds-foot {
    margin-top: 96px;
    padding-top: 56px;
    border-top: 1px dashed var(--ds-rule);
    text-align: center;
    position: relative;
  }
  .ds-foot-sun {
    width: 36px;
    height: 36px;
    margin: 0 auto 16px;
    animation: ds-spin 14s linear infinite;
  }
  .ds-foot p { margin: 0 0 8px; }
  .ds-foot .ds-hand {
    font-size: 32px;
    color: var(--ds-ink);
    display: inline-block;
  }
  .ds-foot-meta {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    font-size: 11px;
    color: var(--ds-ink-3);
    letter-spacing: 0.04em;
  }
  .ds-foot-meta a {
    color: var(--ds-ink-2);
    text-decoration: none;
    border-bottom: 1px solid var(--ds-rule);
  }
  .ds-foot-meta a:hover { color: var(--ds-ink); }
  .ds-sep { color: var(--ds-ink-3); margin: 0 4px; }
`;
