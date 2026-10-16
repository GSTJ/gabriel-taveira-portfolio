---
name: Gabriel Taveira
description: A React Native and Expo consultant presented as a well-engineered device, laid out like a Braun product manual.
colors:
  key: "#79b843"
  key-hover: "#84c24e"
  key-press: "#6da93a"
  led-on: "#6fd13f"
  pen: "#2f4ea2"
  pen-light: "#9db4ff"
  panel: "#e4e4e0"
  plate: "#f4f4f1"
  rule: "#c8c8c2"
  rule-soft: "#d6d6d1"
  graphite: "#1d1d1b"
  ink-2: "#55554f"
  ink-3: "#5e5e58"
  face: "#1d1d1b"
  face-raised: "#2a2a28"
  face-input: "#2f2f2c"
  face-rule: "#3a3a37"
  face-ink: "#e4e4e0"
  face-ink-2: "#a3a39c"
  face-ink-3: "#8f8f88"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 8vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  display-sm:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5.2vw, 4rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.1vw, 2.75rem)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  headline-face:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4vw, 3.25rem)"
    fontWeight: 650
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title-lg:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: "clamp(30px, 3.4vw, 40px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 650
    lineHeight: 1.3
    letterSpacing: "-0.012em"
  body-lg:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: "clamp(17px, 1.5vw, 19px)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  key:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.005em"
  label:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.55
  type-plate:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "0.06em"
  hand:
    fontFamily: "Caveat, Bradley Hand, cursive"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1
rounded:
  tag: "6px"
  key: "10px"
  plate: "16px"
  pill: "999px"
  lens: "50%"
spacing:
  gutter: "clamp(20px, 4vw, 48px)"
  section: "clamp(64px, 8vw, 104px)"
  section-tight: "clamp(48px, 6vw, 72px)"
  nav: "64px"
components:
  key:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.graphite}"
    typography: "{typography.key}"
    rounded: "{rounded.key}"
    height: "48px"
    padding: "0 20px"
  key-hover:
    backgroundColor: "#fafaf8"
  key-go:
    backgroundColor: "{colors.key}"
    textColor: "{colors.graphite}"
    typography: "{typography.key}"
    rounded: "{rounded.key}"
    height: "48px"
    padding: "0 20px"
  key-go-hover:
    backgroundColor: "{colors.key-hover}"
  key-go-active:
    backgroundColor: "{colors.key-press}"
  key-flat:
    textColor: "{colors.graphite}"
    typography: "{typography.key}"
    rounded: "{rounded.key}"
    height: "48px"
    padding: "0 12px"
  key-dark:
    backgroundColor: "{colors.face-raised}"
    textColor: "{colors.face-ink}"
    typography: "{typography.key}"
    rounded: "{rounded.key}"
    height: "48px"
    padding: "0 20px"
  key-sm:
    rounded: "{rounded.key}"
    height: "38px"
    padding: "0 14px"
  tag:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.tag}"
    padding: "4px 8px"
  input:
    backgroundColor: "{colors.face-input}"
    textColor: "{colors.face-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.key}"
    height: "46px"
    padding: "0 14px"
  plate:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.plate}"
    padding: "22px 24px 18px"
  row-top:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.plate}"
    padding: "32px"
  face-panel:
    backgroundColor: "{colors.face}"
    textColor: "{colors.face-ink}"
    rounded: "{rounded.plate}"
    padding: "20px"
  form:
    backgroundColor: "{colors.face-raised}"
    textColor: "{colors.face-ink}"
    rounded: "{rounded.plate}"
    padding: "clamp(20px, 3vw, 28px)"
  nav-link:
    textColor: "{colors.ink-2}"
    rounded: "8px"
    padding: "8px 10px"
  nav-link-active:
    textColor: "{colors.graphite}"
---

# Design System: Gabriel Taveira

## Overview

**Creative North Star: "The Operating Manual"**

Gabriel is presented as a well-engineered device, the way a Braun manual presents one: a spec plate, numbered functions, an operating sequence. The page ground is an aluminum-gray body, every word is printed in one graphite grotesque, raised parts are molded and lit from above, and a speaker-grille dot field is punched into the plates. The parts you operate sit on a dark graphite face. One green key, LEDs for state, and blue ballpoint for the handwritten notes are the only color on the device.

The system refuses the dark dev portfolio with a neon accent. Density is a printed manual's: a two-column page with the heading in a narrow left column and ruled rows on the right, generous section spacing, hairline rules instead of boxes. Proof is sized by importance (billing rank), never by decoration. Personality lives in the copy and the ballpoint notes, which are the only hand-made marks on the page.

Motion is mechanical and short: keys press down 1px, LEDs light, the language switch slides. The one authored load moment is the availability LED powering on in the hero.

**Key Characteristics:**

- Aluminum body, graphite print, graphite face for the controls.
- One green key, reserved for the hire action.
- LEDs carry state; their text label carries the meaning.
- Molded keys and plates lit from above (inset top highlight plus soft offset shadow).
- Circled numbers where order is the information.
- Lowercase printed legends, tabular figures.
- Blue ballpoint notes in Caveat, tilted a few degrees.

## Colors

A near-monochrome warm-gray device where color only ever means function.

### Primary

- **Go-Key Green** (`key`): the single colored key. Fill of the hire action only ("Start a project" in the hero, "Send message" in the contact form), plus text selection and focus/caret color on the graphite face. Hover lifts to `key-hover`, press drops to `key-press`. Graphite legend on it reads 7.0:1.
- **Lit LED Green** (`led-on`): the lit lens of an indicator light (availability, current engagement, on air, a pressed function key). Always rendered as a radial lens with a soft glow, never as a flat fill or text color.

### Secondary

- **Ballpoint Blue** (`pen`): handwritten margin notes on the light body.
- **Ballpoint Blue, light** (`pen-light`): the same notes when they sit on the graphite face.

### Neutral

- **Aluminum** (`panel`): page ground and the sticky nav background.
- **Printed Plate** (`plate`): raised plates (hero spec plate, top-billed work row) and neutral key caps. Also the heading color on the graphite face.
- **Printed Hairline** (`rule`) and **Soft Hairline** (`rule-soft`): section rules, row dividers, tag outlines; the soft one divides rows inside a plate (spec table, agate list).
- **Graphite** (`graphite`): all primary print. 13.2:1 on aluminum.
- **Graphite 2** (`ink-2`) and **Graphite 3** (`ink-3`): secondary copy (subheads, blurbs) and printed labels (spec terms, years, meta). The two sit very close; treat them as one quiet tier with labels a hair lighter.
- **Graphite Face** (`face`, same value as `graphite`): the dark front that hosts the controls.
- **Face Raised** (`face-raised`), **Face Input** (`face-input`), **Face Rule** (`face-rule`): keys and the form plate on the face, recessed inputs, hairlines on the face.
- **Face Print** (`face-ink`, `face-ink-2`, `face-ink-3`): primary, secondary (6.7:1) and label (5.2:1) print on the face.

### Named Rules

**The One Green Key Rule.** Green fills exactly one kind of key: the hire action. The hero's "Start a project" and the contact form's "Send message" are green; every other key (LinkedIn, PDF, podcast, nav "contact") is neutral.

**The Color Is Function Rule.** No hue appears for decoration. Green means go or on, blue means a hand wrote this. Anything else is graphite or aluminum.

## Typography

**Display Font:** Archivo variable (with the `wdth` axis loaded), falling back to Helvetica Neue, Helvetica, Arial, system-ui.
**Body Font:** Archivo, same stack.
**Hand Font:** Caveat 500, falling back to Bradley Hand, cursive. Margin notes only.

**Character:** one printed grotesque in the Akzidenz line the Braun manuals were set in, carrying every word; tight negative tracking at display sizes, plain at text sizes. Every ampersand falls back to Helvetica Neue/Arial through a `U+0026`-only face, because Archivo's "&" reads like a reversed 3 at text sizes.

### Hierarchy

- **Display** (700, clamp 3.25 to 6rem, 0.92): the name in the hero, surname on its own line. `display-sm` (clamp 2.4 to 4rem) for sub-page heroes like Security.
- **Headline** (650, clamp 1.9 to 2.75rem, 1.08): section titles in the left column. A smaller step (clamp 1.5 to 2rem) for tight sections. `headline-face` is the larger contact and links title on the graphite face.
- **Title** (650, 18px, 1.3): row titles, talk titles, media names. Steps around it: work org name 22px, legend title 19px, step title 17px, top-billed org name `title-lg`.
- **Body** (400, 15 to 16.5px, 1.55 to 1.6): blurbs and subs in Graphite 2, capped at 60 to 62ch; section subs at 34ch. `body-lg` for the hero intro (36em measure).
- **Key** (600, 15px, 1): key legends; 14px on the small key.
- **Label** (400 to 600, 12 to 13px): printed legends in Graphite 3: spec terms, panel labels, "now" labels (all lowercase), years, venues, meta.
- **Type plate** (11px, 0.06em tracking): the device type line at the foot of the hero plate ("type GT-n · made in Brazil"). The only tracked text in the device world.
- **Hand** (Caveat 500, 20px, 1): ballpoint notes.

### Named Rules

**The Printed Heading Rule.** A heading is one weight and one color. `<em>` in copy renders upright and unaccented (no italic, no color, no weight change). Nothing sits above a heading: no eyebrow or kicker label.

**The Lowercase Legend Rule.** Printed labels on the device (spec terms, panel key labels, "now" labels) are lowercase, Graphite 3, 12 to 13px. No tracked uppercase labels.

**The Tabular Figure Rule.** Numbers that compare (spec values, years, callout numbers, outcome figures in blurbs) use tabular figures; outcome figures are set in 650 graphite inside the blurb.

## Layout

A centered page capped at 1240px with a fluid gutter (`spacing.gutter`), under a 64px sticky nav (`spacing.nav`) on aluminum with a bottom hairline.

- **Hero:** 7fr / 5fr grid. Name, role, intro, aside and keys on the left; the device plate on the right.
- **Sections:** the manual's two-column page, 4fr / 8fr, each section opened by a full-width top hairline and padded with `spacing.section` (`section-tight` for short ones). The heading column is sticky under the nav.
- **Services:** inside the right column, a 5fr / 7fr split of the sticky control panel and its numbered legend.
- **Engagement:** a four-step operating sequence joined by a graphite line between callouts; 2 columns under 1080px, 1 under 560px.
- **Work:** ruled rows, 1fr / 2fr (org and years, then title, blurb, tags and link).
- **Publications:** 8fr / 4fr, the podcast card on the face beside plain ruled rows.
- **Contact:** a full-bleed graphite face with 28px top corners, 5fr / 6fr copy and form, footer below a face hairline.
- **Links page:** the whole viewport is the graphite face, a single 560px column vertically centered.

Rhythm comes from hairlines and padding, not boxes: rows at 28px, legend items at 22px, table rows at 20px, keys gapped 12px.

Breakpoints: 1080px (services and media stack, panel unsticks and caps at 420px), 900px (hero, sections and contact go single column; nav links hide; sticky heads release), 560px (nav switch hides, steps and form fields go single column, tables drop the trailing column).

## Elevation & Depth

Depth is physical: every raised part is a molded piece lit from above, with an inset 1px white top highlight plus a soft offset shadow below. Pressed parts lose the highlight, gain an inset shadow and drop 1 to 2px. The graphite face casts one long soft shadow onto the aluminum. Flat areas (rows, tables, the section page itself) carry no shadow and rely on hairlines.

### Shadow Vocabulary

- **Plate lift** (`inset 0 1px 0 rgba(255,255,255,.85), 0 1px 2px rgba(29,29,27,.08), 0 20px 40px -18px rgba(29,29,27,.3)`): hero plate, top-billed work row.
- **Key lift** (`inset 0 1px 0 rgba(255,255,255,.9), 0 1px 2px rgba(29,29,27,.18), 0 4px 10px -4px rgba(29,29,27,.24)`): neutral keys and the switch thumb.
- **Key pressed** (`inset 0 1px 3px rgba(29,29,27,.2)`): any key on `:active`, with `translateY(1px)`.
- **Green key lift** (`inset 0 1px 0 rgba(255,255,255,.4), 0 1px 2px rgba(29,29,27,.22), 0 4px 10px -4px rgba(29,29,27,.3)`): the go key, a dimmer highlight on the colored cap.
- **Face cast** (`0 24px 44px -20px rgba(29,29,27,.45)`): the services control panel and the podcast card.
- **Face key** (`inset 0 1px 0 rgba(255,255,255,.07), 0 2px 6px rgba(0,0,0,.35 to .4)`): keys on the graphite face.
- **Recess** (`inset 0 1px 3px rgba(0,0,0,.45)`): inputs and the switch track on the face.

### Named Rules

**The Lit-From-Above Rule.** A raised part always gets both halves: the inset top highlight and the soft offset shadow. Never a hard offset shadow, never a glow, except the LED's own light.

## Shapes

Softly molded rectangles. Keys and inputs share a 10px corner (`rounded.key`), plates and the face cards 16px (`rounded.plate`), panel keys 12px, tags 6px, nav hover boxes and the grille 8px. The contact face rounds only its top corners (28px) so it reads as the device's lower front. Circles are reserved for LEDs and the circled callout numbers (26px, 1.5px graphite ring). The two-position switch is a full pill. Borders are 1px hairlines; boxes are drawn by elevation, not outlines (tags are the one outlined chip).

The speaker grille is a dot field (1.5px graphite dots on a 9px pitch, tiled with `background-repeat: space` so no dot is cut), at 82% opacity on a plate and in face-ink-3 at 60% on the graphite face.

## Components

### Buttons (keys)

Molded keys you press, legends printed in graphite.

- **Shape:** gently rounded (10px), 48px tall, 20px side padding, legend plus an optional arrow icon (16px stroke 1.75).
- **Neutral key:** plate cap, graphite legend, key lift. Hover brightens the cap slightly.
- **Go key:** green cap, graphite legend, green key lift. Hire action only (see The One Green Key Rule).
- **Flat key:** no cap or shadow, 12px padding pulled -12px left so the legend aligns with the gutter; faint graphite wash on hover. Used for the PDF download.
- **Dark key:** face-raised cap with face-ink legend, for a secondary action on the graphite face (podcast playlist).
- **Small key:** 38px, 14px legend; the nav "contact" key.
- **Press:** `translateY(1px)` and the pressed inset shadow, 120ms on the shared ease.

### Indicator light (LED)

An 8px lens. Off is a dull gray lens with an inset shadow; on is a radial green lens lit from inside with a soft green glow. Always `aria-hidden`; the text beside it carries the meaning. Used for availability (hero plate), the current engagement (work row), on air (podcast card corner) and a pressed function key.

### Spec plate (signature)

The hero's raised plate: grille on top, the lit availability LED with its label, a spec table (lowercase term left, 600 tabular value right, soft hairline between rows), and the type plate line at the foot. A ballpoint note can hang off a value into the left margin.

### Control panel (signature)

On the graphite face, a 2x2 grid of square keys, each with an LED, a large tabular numeral cap and a lowercase label, plus a grille strip. Hovering a legend entry presses its matching key and lights its LED, done in CSS with `:has()`. The panel is `aria-hidden`; the legend is the accessible content.

### Callouts and legend

26px circled numerals, used wherever order is the information (services legend, engagement steps). On legend hover the callout fills graphite with plate-colored numeral.

### Work rows (billing)

Rows billed like poster credits, in four ranks:

- **current:** LED lit before the org name, name at 18px.
- **top:** lifted onto a plate (32px padding, plate lift), org name at `title-lg`, blurb in full graphite.
- **main:** the plain ruled row.
- **agate:** small print at the foot under a graphite rule, 13px, years column plus one line each.

### Tags

Outlined chips: 1px hairline, 6px corner, 12px 500 Graphite 2. Static labels only, no hover.

### Inputs / Fields

On the graphite face only: recessed (face-input with inset shadow), 10px corner, 46px tall, 15px text, label above in 13px 600 face-ink-2. Caret and focus ring are green (2px outline, 2px offset). Textarea grows from 140px.

### Navigation

Sticky aluminum bar with a hairline: brand at 15px 700, text links at 14px 500 Graphite 2 with an 8px-cornered faint wash on hover and active, a two-position language switch (pill track, sliding lifted thumb, 200ms), and the small neutral contact key. Links hide under 900px, the switch under 560px.

### Graphite face

The dark front hosts the controls: the Services control panel, the podcast card, the contact section and the links page. Inside it, focus rings and selection turn green and ballpoint notes switch to `pen-light`. Contact channels are ruled rows on face hairlines (icon, label, handle right-aligned, arrow).

### Ballpoint note

Caveat 500 at 20px in `pen` (or `pen-light` on the face), tilted -5 to +5 degrees from a left (or right) origin, a few words long, set beside the fact it annotates ("yes, really", "season 3", "made with coffee").

### Resume (deliberate exception)

`/[locale]/resume` and the PDF sit outside the device world. They are ATS-facing: white page, `#1a1a1a` text, a Helvetica Neue / Helvetica / Arial system stack (never Archivo, which prints as Type 3 glyphs some parsers can't read), single 760px column, US Letter print margins. None of the device tokens, keys, plates or LEDs apply there, and its tracked uppercase section headers stay on the resume.

## Do's and Don'ts

### Do:

- **Do** keep green on the hire action only: the hero "Start a project" and the contact "Send message".
- **Do** put controls on the graphite face (control panel, podcast card, contact, links page) and switch notes to `pen-light` and focus to green there.
- **Do** light raised parts from above: inset top highlight plus soft offset shadow, and press them 1px on `:active`.
- **Do** pair every LED with a text label and keep the LED `aria-hidden`.
- **Do** size proof by billing rank: current, top (raised plate), main, agate (small print).
- **Do** use circled callout numbers wherever the order is the information.
- **Do** set printed labels lowercase in Graphite 3 and numbers in tabular figures.
- **Do** keep the one load moment to the availability LED powering on (900ms, 350ms delay); everything else is a 120 to 200ms state change on `cubic-bezier(0.16, 1, 0.3, 1)`, and reduced motion removes it all.

### Don't:

- **Don't** build the dark dev portfolio with a neon accent; the body is aluminum and dark is reserved for the face.
- **Don't** color any key green except the hire action; every other key is neutral, flat or dark.
- **Don't** put an eyebrow or kicker label above a heading.
- **Don't** mix weights or colors inside a heading, or render `<em>` italic, colored or bolder.
- **Don't** use emoji in copy.
- **Don't** add a hue for decoration; green means go or on, blue means handwriting.
- **Don't** use Caveat for anything but the ballpoint notes, or add other hand-made marks (scribbles, drawn arrows, flourishes).
- **Don't** set tracked uppercase labels in the device world.
- **Don't** bring Archivo, device tokens or shadows into the resume page or PDF.
