# Gabriel Taveira's Open-Source Portfolio

Welcome to my open-source portfolio! This project is built using Next.js, Tailwind, and Server Components.

<img width="1498" alt="preview" src="https://assets.gabrieltaveira.dev/demo.gif">

## Features

- Responsive design with Tailwind CSS
- Dark mode support
- Server Components for improved performance
- A live COIN quote on the hero, served from `/api/coin` with a cached fallback

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js 24 or later
- pnpm (the version in `packageManager`; `corepack enable` picks it up)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/gstj/gabriel-taveira-portfolio.git
```

2. Install dependencies:

```sh
cd gabriel-taveira-portfolio
pnpm install
```

3. Optionally copy the environment template:

```sh
cp .env.example .env.local
```

Every variable in it is optional. Without `NEXT_PUBLIC_POSTHOG_KEY` the
PostHog client is a no-op — analytics and error reports go nowhere and nothing
is logged — so the site runs unchanged with no `.env.local` at all.

4. Run the development server:

```sh
pnpm dev
```

Open your browser and navigate to http://localhost:3000 to see the portfolio in action.

### Deployment

Production runs on Vercel, deployed from `main` on every push. `www.gabrieltaveira.dev` is the primary domain and the apex redirects onto it, which is where `src/utils/site.ts` gets its host.

There is no static export. The locale routing runs in `src/proxy.ts`, `/api/coin` and `/curriculum.pdf` are route handlers, and both locale pages render on demand, so the build needs a Node server rather than a folder of files:

```sh
pnpm build
pnpm start
```

### Contributing

Contributions are welcome! If you find a bug or have a suggestion, please create an issue or submit a pull request.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Made with ❤️ by [Gabriel Taveira](https://www.gabrieltaveira.dev).
