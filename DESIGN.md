---
name: Gabriel Taveira, the authored page
description: Gabriel's own sentences, set large, marked up in his own pen.
colors:
  paper: "light-dark(#f6f6f3, #121211)"
  paper-2: "light-dark(#eeede8, #1b1b19)"
  paper-3: "light-dark(#e6e4dd, #242421)"
  ink: "light-dark(#191917, #edebe5)"
  ink-2: "light-dark(#47463f, #bdbab2)"
  ink-3: "light-dark(#62615a, #8f8c85)"
  rule: "light-dark(#d9d7cf, #2e2d2a)"
  rule-strong: "light-dark(#c4c2b9, #403f3b)"
  control: "light-dark(#807e75, #76736d)"
  pen: "light-dark(#2343c9, #93a6ff)"
  pen-wash: "light-dark(rgb(35 67 201 / 0.1), rgb(147 166 255 / 0.14))"
typography:
  display:
    fontFamily: "Bricolage Grotesque"
    fontSize: "clamp(2.5rem, 4.3vw + 1.5rem, 5.625rem)"
    fontWeight: 380
    lineHeight: 0.98
    letterSpacing: "-0.036em"
  h1:
    fontFamily: "Bricolage Grotesque"
    fontSize: "clamp(2rem, 1.6vw + 1.375rem, 2.875rem)"
    fontWeight: 520
    lineHeight: 1.06
    letterSpacing: "-0.034em"
  h2:
    fontFamily: "Bricolage Grotesque"
    fontSize: "clamp(2rem, 2.2vw + 1.25rem, 3.375rem)"
    fontWeight: 420
    lineHeight: 1.06
    letterSpacing: "-0.032em"
  title:
    fontFamily: "Bricolage Grotesque"
    fontSize: "clamp(1.25rem, 0.4vw + 1.125rem, 1.375rem)"
    fontWeight: 520
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Bricolage Grotesque"
    fontSize: "clamp(1.125rem, 0.3vw + 1rem, 1.3125rem)"
    fontWeight: 420
    lineHeight: 1.5
    letterSpacing: "-0.013em"
  body:
    fontFamily: "Bricolage Grotesque"
    fontSize: "1.03125rem"
    fontWeight: 420
    lineHeight: 1.55
    letterSpacing: "-0.01em"
  meta:
    fontFamily: "Bricolage Grotesque"
    fontSize: "0.8125rem"
    fontWeight: 420
    lineHeight: 1.4
    letterSpacing: "-0.005em"
  mono:
    fontFamily: "ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0"
  hand:
    fontFamily: "Caveat"
    fontSize: "clamp(1.3125rem, 0.5vw + 1.125rem, 1.625rem)"
    fontWeight: 560
    lineHeight: 1.05
    letterSpacing: "0"
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
  xl: "18px"
  pill: "999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "24px"
  "6": "32px"
  "7": "48px"
  "8": "64px"
  "9": "96px"
  "10": "128px"
  gutter: "clamp(20px, 4vw, 56px)"
  section: "clamp(96px, 9vw, 168px)"
components:
  button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    height: "46px"
    padding: "0 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "46px"
    padding: "0 20px"
  button-small:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    height: "38px"
    padding: "0 16px"
  card:
    backgroundColor: "{colors.paper-2}"
    rounded: "{rounded.lg}"
    padding: "32px"
  margin-note:
    textColor: "{colors.pen}"
    typography: "{typography.hand}"
---

# DESIGN.md

Source of truth: `src/app/tokens.css` (every raw value), `src/components/portfolio/ui/ui.css` (shared primitives), `src/app/globals.css` (element defaults). This file explains them. Direction C from the 2026-10-19 rebuild, see `PRODUCT.md` for who it is for.

## Overview

The authored page. A letter in Gabriel's voice, typeset large on neutral paper, that he then marks up with a blue pen: he underlines the claim, writes notes in the margin, signs off at the bottom. The pen is the only accent and the only authored motion. Everything else is ink on paper, hairline rules instead of boxes, and cards only where a proof needs a stage. Each card that exists has its own grammar (a real app screen, a running library demo, a dated number), never icon + title + paragraph.

Refuses: the dark-glow dev portfolio, mono-caps eyebrows, section numbers, an italic accent word per headline, identical cards, count-up stats, decoration that pretends to be the product.

## Colors

One neutral paper (cooler than Curvinha's cream on purpose), three inks, two rules, one accent. Every token is a `light-dark()` pair declared once, resolved by `color-scheme` on `<html>`: `light dark` (follow the system) by default, `light` or `dark` when the visitor picks one.

- **paper / paper-2 / paper-3**: page, card stage, inset (code, inputs on a card).
- **ink / ink-2 / ink-3**: headings and strong text, body, meta. Every ink is 4.6:1 or better on every paper in both themes (light ink-3 was darkened from C's mockup to clear paper-3).
- **rule / rule-strong**: hairlines between rows and sections; ghost button borders.
- **control**: the edge of an input and the switch (track border, off thumb). 3:1 or better on every paper, so a control reads as a control.
- **pen**: his notes, the pen underline, focus rings, selection (as `pen-wash`). Never a button fill, never a heading color, never a second accent next to it.

`--scrim`, `--bezel` and `--shadow` exist for the one modal and the phone frame the projects section may need.

## Typography

Two families. **Bricolage Grotesque** (variable, self-hosted, latin, `wght` 300 to 700, `wdth` 90 to 100, optical size automatic) carries every word. **Caveat** 560 is his hand and nothing else. Mono is the system stack, only for real code and package names.

Weight does the emphasis: the display line runs at 380 with "I'm Gabriel." at 640. No italic accent word. Display and h2 run narrower (`font-stretch` 92% and 94%); tracking tightens as size grows. Headings `text-wrap: balance`, paragraphs `pretty`. Numbers that line up use `.num` (tabular).

Roles, as classes in `ui.css`: `.t-display` (hero, contact ask), `.t-h1` (a card's name, like Curvinha), `.t-h2` (section title), `.t-title` (row or card title), `.t-lede` (opening paragraphs, section subs), `.t-body`, `.t-small`, `.t-meta` (dates, orgs, captions), `.t-mono`, `.t-hand`.

## Layout

- Content width 1280px (`.wrap`), gutter 20 to 56px, text measure 37em.
- Section rhythm `--sec-y` 96 to 168px top and bottom (`.section`), a hairline between consecutive sections inset to the content width, `--sec-head-gap` under a section head (`.section-head`: an h2 and an optional lede, nothing above it).
- Spacing steps on a 4px base, `--space-1` (4px) to `--space-10` (128px).
- Breakpoints by content: 1000px is where margin notes move from the margin to their own line and ledgers collapse to one column; 760px is where the nav stacks into two rows.
- No horizontal overflow at 390. `body` clips x overflow as a backstop, not as a layout tool.

## Elevation & Depth

Flat by default. Depth comes from paper steps (paper → paper-2 → paper-3), not shadows. `--shadow` is reserved for things that physically float: the phone frame, a modal sheet and the "Email copied" toast. The sticky nav uses an 88% paper with a 12px backdrop blur and fades in a hairline over the first 24px of scroll (CSS scroll timeline, no JS).

## Shapes

Pill for every button, the language switch and toggles. 14px for a card stage, 10px for insets (code blocks, inputs, demo renders), 6px for focus rings and small chips. Lines are 1px hairlines; drawn strokes (arrows, underline) are 1.6 to 3px round-capped, so they read as pen, not as UI.

## Components

- **Button** (`.btn`, `.btn-ghost`, `.btn-small`): ink fill or ghost outline, pill, 46/38px. Press scales to 0.97 in 160ms ease-out. Hover only under `(hover: hover) and (pointer: fine)`.
- **Icon button** (`.icon-btn`): 38px circle, press 0.94. The theme toggle.
- **Link arrow** (`.link-arrow` + `<ArrowUpRight />`): a link that leaves the page; the arrow nudges 2px up-right on hover.
- **Pen underline** (`<PenUnderline>`): two quick strokes under a short phrase (no wrap), drawn left to right in 640ms on `--ease-pen`, the second stroke trailing at 45%.
- **Marginalia** (`<Annotated>` + `<Marginalia note>`): his note on an anchor phrase. At 1000px and up it hangs in the right margin on the anchor's line with an arrow back to the text; below that it drops to its own line under the block, the anchor gets a pen underline and the arrow points up, so a sentence never breaks around it. Writes in through `clip-path` (760ms, `--ease-pen`), then the arrow draws (420ms). `placement="inline"` sits right after the anchor for notes beside a demo or a number. Screen readers hear it in parentheses.
- **Theme toggle**: one button that flips the effective theme with a View Transition crossfade (240ms). Picking the theme the system already uses clears the choice, so the page returns to auto.
- **Language switch**: EN / PT pill, plain links to the other locale.
- **Card** (a section-local pattern, paper-2 on a 14px radius, 32px padding): only when the proof inside needs a stage.

### Motion

One curve family per job, from `tokens.css`:

| Token           | Curve                            | Use                                                               |
| --------------- | -------------------------------- | ----------------------------------------------------------------- |
| `--ease-out`    | `cubic-bezier(.22, 1, .36, 1)`   | anything arriving, press feedback                                 |
| `--ease-in-out` | `cubic-bezier(.77, 0, .175, 1)`  | anything moving on screen (a line drawing across, a step landing) |
| `--ease-pen`    | `cubic-bezier(.55, .06, .35, 1)` | the in-out curve softened so a stroke starts without hesitating   |

Durations: press 160, hover 160, small UI 240, exit 160 (exits beat entries), arrow 420, pen 640, text 700 opacity / 820 rise, note 760. Stagger 80ms in reading order. Text arrives 16px lower with a 5px blur.

Three hooks, one layer (`ui.css` + `ui/boot.ts` + `ui/motion.ts`):

- `{...enter(delay)}`: first viewport. CSS keyframes from first paint, so the hero never waits for JS.
- `{...reveal(index, delay)}`: below the fold. Hidden only when `<html class="js">` (set in `<head>` before paint), revealed once at 12% into view by one inline IntersectionObserver that runs before hydration. No JS means everything is visible.
- `data-draw` (built into `PenUnderline` and `Marginalia`): strokes and notes draw the first time they are in view.

Reduced motion: nothing starts hidden, nothing moves, strokes and notes are already drawn, the theme switch has no crossfade.

## Do's and Don'ts

- Do let one claim per section carry the pen. Don't underline or annotate everything; a page full of notes is a page with none.
- Do keep the pen blue for his hand, focus and selection. Don't use it for buttons, headings, icons or links.
- Do put a real proof beside a claim. Don't add a card, icon or animation that only looks like proof.
- Do gate every hover behind `(hover: hover) and (pointer: fine)` and give every pressable a 0.97 press. Don't animate keyboard-driven actions.
- Do animate transform, opacity, clip-path and stroke-dashoffset. Don't animate layout properties or use `transition: all`.
- Don't add eyebrows, section numbers, italic accent words, emoji, count-ups, gradients, glows or a second accent.
- Don't introduce a raw color, size, curve or duration outside `tokens.css`.
