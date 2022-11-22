## TCCTDB.org

Twin Cities Community Theater Database

This is the frontend for the site.

It uses [SvelteKit](https://kit.svelte.dev) for a framework, [TailwindCSS](https://tailwindcss.com), and components from [TailwindUI](https://tailwindui.com).

Hosting is on cloudflare pages, which watches for commits to this repo and rebuilds the site.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
