import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gabriel Taveira \u00B7 Hero font experiments",
  description: "Side-by-side preview of display fonts for the hero title.",
};

type Option = {
  n: number;
  label: string;
  fontFamily: string;
  feel: string;
  note: string;
  /** any per-option tweaks layered on top of the .ws-hero-title baseline */
  style?: React.CSSProperties;
};

const OPTIONS: Option[] = [
  {
    n: 1,
    label: "Option 1 — Instrument Serif (current)",
    fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif",
    feel: "Refined editorial serif. Tall x-height, restrained italic.",
    note: "Baseline. Risk: shows up on a lot of modern Vercel-style portfolio templates, which reads default rather than personal.",
  },
  {
    n: 2,
    label: "Option 2 — Fraunces (opsz 144, soft, italic)",
    // Fraunces variable axes: opsz, SOFT, WONK. We crank opsz to the display
    // master, push SOFT for a hand-cut warmth, and enable WONK so the italic
    // gets the swashier, more idiosyncratic letterforms.
    fontFamily: "'Fraunces', 'Instrument Serif', Georgia, serif",
    feel: "Display-cut serif with a hand-drawn warmth; the italic has real swash character.",
    note: "Feels editorial like a literary magazine cover. The WONK axis gives the italic 'T' and 'a' personality that Instrument Serif lacks.",
    style: {
      fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1",
      fontWeight: 360,
    },
  },
  {
    n: 3,
    label: "Option 3 — Newsreader (opsz 60, italic)",
    // Newsreader has a wonderful italic 'T' with a curving descender and feels
    // like a personal byline rather than a brand title.
    fontFamily: "'Newsreader', 'Instrument Serif', Georgia, serif",
    feel: "Humanist text serif scaled up; reads like a long-form essay byline.",
    note: "Less 'logo', more 'someone wrote this'. The italic feels handwritten without sacrificing legibility at 132px.",
    style: {
      fontVariationSettings: "'opsz' 60",
      fontWeight: 400,
    },
  },
  {
    n: 4,
    label: "Option 4 — Italiana",
    // Italiana is a high-contrast didone with a very tall, narrow italic. Reads
    // couture / Vogue masthead — opinionated and distinctive at hero scale.
    fontFamily: "'Italiana', 'Instrument Serif', Georgia, serif",
    feel: "Tall, high-contrast didone. Couture editorial energy.",
    note: "Most opinionated of the three alternatives. Risks being too thin on dark bg; works because the italic surname gets the ember gradient for weight.",
    style: {
      fontWeight: 400,
      letterSpacing: "-0.01em",
    },
  },
];

// Single Google Fonts request. opsz/wght variable axes for Fraunces &
// Newsreader, plus italic. Italiana is a single-weight display face.
const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2" +
  "?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,100..900,0..100,0..1;1,9..144,100..900,0..100,0..1" +
  "&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800" +
  "&family=Italiana&display=swap";

export default function FontsPage() {
  return (
    <>
      {/* Page-scoped font load. These don't leak into the rest of the site
          because they're only referenced by inline styles on this page. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />

      <main
        style={{
          minHeight: "100vh",
          background: "var(--ink-900)",
          color: "var(--ink-50)",
          padding: "96px 32px 160px",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <header style={{ marginBottom: 72 }}>
            <span
              className="ws-eyebrow ws-eyebrow-accent"
              style={{ display: "block", marginBottom: 12 }}
            >
              Internal · font experiments
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                margin: "0 0 16px",
              }}
            >
              Hero name — pick one.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 16,
                lineHeight: 1.55,
                color: "var(--ink-300)",
                maxWidth: "60ch",
                margin: 0,
              }}
            >
              All four renders share the exact hero sizing
              (<code>clamp(56px, 9vw, 132px)</code>), italic surname, and the
              ember gradient on the italic. Only the typeface changes.
            </p>
          </header>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 64,
            }}
          >
            {OPTIONS.map((opt) => (
              <section
                key={opt.n}
                style={{
                  borderTop: "1px solid var(--color-divider)",
                  paddingTop: 32,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 24,
                    marginBottom: 28,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    className="ws-eyebrow"
                    style={{ color: "var(--ember-300)" }}
                  >
                    {opt.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--ink-400)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {opt.feel}
                  </span>
                </div>

                <h2
                  className="ws-hero-title"
                  style={{
                    fontFamily: opt.fontFamily,
                    margin: 0,
                    ...opt.style,
                  }}
                >
                  Gabriel <em>Taveira</em>.
                </h2>

                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--ink-300)",
                    maxWidth: "72ch",
                    margin: "28px 0 0",
                  }}
                >
                  {opt.note}
                </p>
              </section>
            ))}
          </div>

          <footer
            style={{
              marginTop: 96,
              paddingTop: 32,
              borderTop: "1px solid var(--color-divider)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ink-400)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            preview only · the live hero still uses Instrument Serif
          </footer>
        </div>
      </main>
    </>
  );
}
