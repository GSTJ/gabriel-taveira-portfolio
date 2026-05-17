import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gabriel Taveira \u00B7 Palette preview",
  description:
    "Side-by-side comparison of the current ember palette vs. a proposed forest-mossy green replacement.",
};

/* =============================================================================
   Palette preview · ember (current) vs. forest-mossy green (proposed)
   - Server component, dark background
   - Reuses .ws-* classes from design-portfolio.css
   - Green palette is scoped via CSS variable overrides on `.theme-green`
   - Hero `em` gradient is hardcoded in design-portfolio.css so we duplicate
     the rule here with green stops (scoped to .theme-green)
   ============================================================================= */

// Green 500 = #2a9460  -> rgb(42, 148, 96)
const GREEN_500_RGB = "42, 148, 96";

function PreviewColumn({
  themeClass,
  label,
  sublabel,
  ctaLabel,
}: {
  themeClass: string;
  label: string;
  sublabel: string;
  ctaLabel: string;
}) {
  return (
    <section
      className={themeClass}
      style={{
        background: "var(--ink-900)",
        border: "1px solid var(--color-border-strong)",
        borderRadius: "var(--radius-xl)",
        padding: "48px 36px",
        display: "flex",
        flexDirection: "column",
        gap: "36px",
      }}
    >
      <header style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span className="eyebrow">{label}</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--color-fg-subtle)",
            letterSpacing: "0.08em",
          }}
        >
          {sublabel}
        </span>
      </header>

      {/* Hero title sample */}
      <div style={{ textAlign: "center" }}>
        <h1
          className="ws-hero-title"
          style={{ fontSize: "clamp(48px, 6vw, 88px)", margin: 0 }}
        >
          Gabriel <em>Taveira</em>.
        </h1>
      </div>

      {/* Button + link + chip row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <a className="ws-btn ws-btn-primary" href="#">
          {ctaLabel}
        </a>
        <span className="ws-chip ws-chip-ember">
          <span className="ws-chip-dot" />
          Available
        </span>
        <a href="#" style={{ fontSize: 14 }}>
          gabrielstaveira@gmail.com
        </a>
      </div>

      {/* Work cell samples */}
      <div className="ws-work-grid">
        <article className="ws-work-cell">
          <div className="ws-work-cell-glow" />
          <div className="ws-work-cell-top">
            <span className="ws-chip ws-chip-ember">
              <span className="ws-chip-dot" />
              Live
            </span>
          </div>
          <h3 className="ws-work-cell-title">
            Workshop &mdash; backlit shelf
          </h3>
          <p className="ws-work-cell-blurb">
            A small editorial system for warm interfaces. Type, color, motion,
            and ambient backlight studies in one place.
          </p>
          <div className="ws-work-cell-foot">
            <div className="ws-work-cell-tags">
              <span className="ws-tag">design</span>
              <span className="ws-tag">tokens</span>
            </div>
            <span className="ws-work-cell-cta">View &rarr;</span>
          </div>
        </article>

        <article className="ws-work-cell">
          <div className="ws-work-cell-glow" />
          <div className="ws-work-cell-top">
            <span className="ws-chip ws-chip-ember">
              <span className="ws-chip-dot" />
              Open source
            </span>
          </div>
          <h3 className="ws-work-cell-title">Library &mdash; field notes</h3>
          <p className="ws-work-cell-blurb">
            Reading, writing and small experiments &mdash; bound together in a
            slim shelf-side notebook.
          </p>
          <div className="ws-work-cell-foot">
            <div className="ws-work-cell-tags">
              <span className="ws-tag">notes</span>
              <span className="ws-tag">essays</span>
            </div>
            <span className="ws-work-cell-cta">Read &rarr;</span>
          </div>
        </article>
      </div>
    </section>
  );
}

export default function PalettePreviewPage() {
  return (
    <>
      {/* Scoped style block:
          - Green palette overrides (--ember-* + semantic accent tokens)
          - Hero `em` gradient is rewritten for .theme-green because the
            original rule in design-portfolio.css uses hardcoded ember hexes
            and cannot be swapped via the token override alone.            */}
      <style
        // eslint-disable-next-line react/no-unknown-property
        dangerouslySetInnerHTML={{
          __html: `
            .theme-green {
              --ember-900: #0c2418;
              --ember-800: #143a25;
              --ember-700: #1b5837;
              --ember-600: #1f7d4d;
              --ember-500: #2a9460;   /* PRIMARY · matcha-pine glow */
              --ember-400: #58b685;
              --ember-300: #8ccfa9;
              --ember-200: #c1e4ce;
              --ember-100: #e2f1e7;

              --color-accent:       var(--ember-500);
              --color-accent-hover: var(--ember-400);
              --color-accent-press: var(--ember-600);
              --color-accent-soft:  rgba(${GREEN_500_RGB}, 0.14);

              --color-link:         var(--ember-300);
              --color-link-hover:   var(--ember-200);

              --shadow-ember:       0 0 32px rgba(${GREEN_500_RGB}, 0.22), 0 8px 24px rgba(0,0,0,0.45);
              --color-selection-bg: var(--ember-500);
            }

            /* Hero italic gradient · scoped duplicate of .ws-hero-title em
               from design-portfolio.css with green stops               */
            .theme-green .ws-hero-title em {
              background: linear-gradient(135deg, #58b685 0%, #2a9460 40%, #14633c 100%);
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              filter: drop-shadow(0 0 22px rgba(${GREEN_500_RGB}, 0.40));
            }

            /* Chip-ember override · the original rule uses hardcoded ember
               rgb(224,122,31) values, so background/border/dot-glow won't
               follow the token swap. Re-tint them with the green 500.    */
            .theme-green .ws-chip-ember {
              background: rgba(${GREEN_500_RGB}, 0.10);
              border-color: rgba(${GREEN_500_RGB}, 0.35);
              color: var(--ember-300);
            }
            .theme-green .ws-chip-ember .ws-chip-dot {
              background: var(--ember-400);
              box-shadow: 0 0 8px rgba(${GREEN_500_RGB}, 0.8);
            }

            /* Work-cell hover glow (default tone) uses a hardcoded ember
               radial in design-portfolio.css — re-tint for parity.       */
            .theme-green .ws-work-cell-glow {
              background: radial-gradient(circle 280px at var(--mx, 50%) var(--my, 50%), rgba(${GREEN_500_RGB}, 0.18), transparent 70%);
            }

            /* Tag hover border also hardcoded ember rgb */
            .theme-green .ws-tag:hover {
              border-color: rgba(${GREEN_500_RGB}, 0.4);
              color: var(--ember-300);
            }
          `,
        }}
      />

      <main
        style={{
          minHeight: "100vh",
          background: "var(--ink-1000)",
          padding: "64px 32px 96px",
        }}
      >
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 40,
          }}
        >
          <header style={{ textAlign: "center" }}>
            <span className="eyebrow">Palette preview</span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3vw, 40px)",
                margin: "8px 0 4px",
                color: "var(--color-fg-strong)",
              }}
            >
              Ember vs. Forest-mossy green
            </h2>
            <p
              style={{
                color: "var(--color-fg-muted)",
                maxWidth: 60 + "ch",
                margin: "0 auto",
              }}
            >
              Same hero, button, chip, link and work-cell components rendered
              under two scoped palettes. Hover the cells to see the accent
              glow under each scheme.
            </p>
          </header>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(540px, 1fr))",
              gap: 32,
              alignItems: "start",
            }}
          >
            <PreviewColumn
              themeClass="theme-ember"
              label="Ember (current)"
              sublabel="--ember-500 · #e07a1f · warm LED amber"
              ctaLabel="Get in touch"
            />
            <PreviewColumn
              themeClass="theme-green"
              label="Green (proposed)"
              sublabel="--ember-500 · #2a9460 · matcha-pine glow"
              ctaLabel="Get in touch"
            />
          </div>
        </div>
      </main>
    </>
  );
}
