# Sections: who owns what

The home page is six slots, in this order, each with a stable id: `hero`, `projects`, `work`, `services`, `notes`, `contact`. Each one is its own folder. Six agents can work at once as long as each stays inside its own folder, its own locale key, and its own `public/` folder.

Read first: `DESIGN.md` (tokens, type roles, motion, do's and don'ts), `PRODUCT.md` (who it is for, hard content rules), `/Users/gabrieltaveira/Desktop/gabriel-site/direcoes/C/` (the chosen direction) and `DECISION.md` next to it (grafts and fixes per section).

## The slots

| Slot                                                      | Files you own                                  | Locale key you own | Public assets      |
| --------------------------------------------------------- | ---------------------------------------------- | ------------------ | ------------------ |
| hero                                                      | `src/components/portfolio/sections/hero/*`     | `hero`             | `public/hero/`     |
| projects                                                  | `src/components/portfolio/sections/projects/*` | `projects`         | `public/projects/` |
| work                                                      | `src/components/portfolio/sections/work/*`     | `work`             | `public/work/`     |
| services                                                  | `src/components/portfolio/sections/services/*` | `services`         | `public/services/` |
| notes (Now, Space Cast and media, talks, awards, writing) | `src/components/portfolio/sections/notes/*`    | `notes`            | `public/notes/`    |
| contact                                                   | `src/components/portfolio/sections/contact/*`  | `contact`          | `public/contact/`  |

Each folder has:

- `index.tsx`: the exported section (`HeroSection`, `ProjectsSection`, ...). A server component that renders `<section id="<slot>" aria-labelledby="<slot>-title">` with one `h2` (the hero has the page's only `h1`). Today it is a plain placeholder with all the current content; replace it freely.
- `<slot>.module.css`: your styles, as a CSS Module.
- `data.ts`: your locale-neutral data (links, ids, order, numbers).

Add as many files as you need inside your folder (client islands, sub-components, more CSS Modules).

The lead owns everything else: `src/app/**` (tokens, globals, fonts, layout, routes), `src/components/portfolio/{index.tsx,profile.ts,lifeline.ts,structured-data.tsx}`, `shell/`, `ui/`, `src/components/security/`, and the locale keys `meta`, `nav`, `common`, `links`, `resume`, `security`, `securityPage`.

## Primitives you can use

From `src/components/portfolio/ui/` (import, don't copy):

| Import                                                                         | What it does                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enter(delay?)` from `ui/motion`                                               | Spread on first-viewport elements (hero only). CSS entrance from first paint: 16px rise, 5px blur-up, 700/820ms.                                                                                                                                                                                                                                                      |
| `reveal(index?, delay?)` from `ui/motion`                                      | Spread on anything below the fold. Reveals once at 12% into view; `index` staggers siblings by 80ms. Visible without JS and under reduced motion.                                                                                                                                                                                                                     |
| `<PenUnderline delay?>` from `ui/pen-underline`                                | Gabriel's pen under a short phrase (it does not wrap). Draws when in view.                                                                                                                                                                                                                                                                                            |
| `<Annotated as?>` + `<Marginalia note placement? delay?>` from `ui/marginalia` | His handwritten note on an anchor phrase. `margin` (default): hangs in the right margin at 1000px and up, drops to its own line under the block below that, so it never breaks a sentence at 390. One margin note per `Annotated` block, and give that block a max-width so the margin has room. `inline`: right after the anchor, for notes beside a demo or number. |
| `<ArrowUpRight />`, `CHANNEL_ICONS` from `ui/icons`                            | 1.5px stroke icons.                                                                                                                                                                                                                                                                                                                                                   |
| `THEME_COLORS` from `ui/theme`                                                 | Only if a canvas or image needs the paper color.                                                                                                                                                                                                                                                                                                                      |

Global classes from `ui/ui.css`: `.wrap`, `.section` (rhythm and the hairline between sections), `.section-head` (h2 plus optional `p`), type roles `.t-display .t-h1 .t-h2 .t-title .t-lede .t-body .t-small .t-meta .t-mono .t-hand`, `.num`, `.btn .btn-ghost .btn-small .icon-btn .link-arrow`, `.visually-hidden`, `.only-light .only-dark` (theme-specific images and icons, works for auto and explicit themes). Compose classes with `cn()` from `@/utils/cn` (lint requires it).

Tokens (all in `src/app/tokens.css`): colors `--paper(-2,-3) --ink(-2,-3) --rule(-strong) --pen --pen-wash --scrim --bezel --shadow`, type `--fs-* --lh-* --tr-* --fw-* --wd-*`, space `--space-1..10 --gutter --measure --sec-y --sec-head-gap --nav-h`, radii `--r-sm/md/lg/xl/pill`, motion `--ease-out --ease-in-out --ease-pen --dur-* --stagger --rise --rise-blur`.

## Rules

1. Don't edit files outside your slot folder, your locale key, or your `public/<slot>/` folder. If you need a shared change (a token, a primitive, the shell, a route, another slot's data), don't make it: write it in your report and the lead will make it once for everyone.
2. A new primitive lives in your slot folder. If two slots want it, the lead promotes it to `ui/`.
3. Every string in both `src/i18n/locales/en-US.json` and `pt-BR.json`, under your key only, same shape in both. No em or en dashes, no emoji, no italic accent words. Load `writing-ui-copy` before writing strings.
4. Client components get their copy as props from your server `index.tsx` (see `contact/contact-form.tsx`). There is no client-side translation provider, so `useTranslations` in a client component will throw.
5. Styles only in your CSS Module, only from tokens. No raw colors, sizes, curves or durations. The one allowed `:global` is `:global(.js)` to gate a JS-only hidden state. Hover only inside `@media (hover: hover) and (pointer: fine)`. Every hidden-before-animation state goes inside `@media (prefers-reduced-motion: no-preference)` and behind `.js`.
6. Animate transform, opacity, clip-path, filter and stroke-dashoffset only. Autoplay only while visible and while the tab is visible, and hand control to the visitor for good on first interaction.
7. No new dependency without asking the lead; say what capability it owns.
8. Keep the section id, the `h2` with id `<slot>-title`, and the exported component name. The nav, skip link and llms.txt depend on them.
9. Facts only from the brief's sources. Anything you can't verify goes in your report as `TODO(gabriel):`, never into copy.

## Data contracts (other code reads these)

Add fields freely. Don't rename or remove these, or the routes break:

| Slot     | Read by                     | Must keep                                                                                                                                                                                      |
| -------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hero     | llms.txt                    | `hero.status`                                                                                                                                                                                  |
| projects | llms.txt                    | `PROJECTS[].id/href`, `projects.items.<id>.title/body`                                                                                                                                         |
| work     | resume, llms.txt, JSON-LD   | `WORK[].id/orgs/start/end/href`, `workDates()`, `work.items.<id>.title/blurb` (blurb may use `<mark>`), `work.present`                                                                         |
| services | JSON-LD, llms.txt           | `SERVICES[].id`, `services.items.<id>.title/body`                                                                                                                                              |
| notes    | resume, llms.txt, JSON-LD   | `NOW[].id/href`, `TALKS[].id/date`, `AWARDS[].id/year/position`, `notes.now.items.<id>.chip/title/body`, `notes.talks.items.<id>.title/venue/city/description`, `notes.awards.items/positions` |
| contact  | /links, llms.txt, /security | `CHANNELS[].id/handle/url`, `EMAIL`, `EMAIL_ADDR`, `contact.channels.<id>`; `ContactSection` also renders on /security, so it must not depend on the home page around it                       |

Hard content rules that sit in one slot: the Now line "Building" keeps `https://curvinha.app/?ct=gabrieltaveira-dev` (notes); the Curvinha project card keeps `https://curvinha.app/?ct=gabriel-site` and the wording "curated with architects from Curva Interiores" / "curadoria com arquitetas da Curva Interiores", no Ana or Curva prices (projects); the current role is "independent consultant", past jobs stay as listed (work).

## Done means

`pnpm typecheck && pnpm lint && pnpm format && pnpm build` clean, then your section screenshotted at 390 and 1440, light and dark, both locales, no horizontal overflow at 390, axe clean on your section, into `/Users/gabrieltaveira/Desktop/gabriel-site/secoes/<slot>/`.
