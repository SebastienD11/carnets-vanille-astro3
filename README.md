# Carnets Vanille

Static blog built from a headless WordPress. French at the root, English under `/en/`.

## Tech stack

- [Astro](https://astro.build) 7, static output, with on-demand routes for `/api/*` and `/preview/*`
- [Tailwind CSS](https://tailwindcss.com) 4, tokens in `src/styles/global.css`
- Cloudflare Workers with static assets (`wrangler.jsonc`)
- Stripe 18 for payments, MailerLite for email
- Fonts through Fontsource: Bricolage Grotesque, Mulish, Newsreader

Node 24 is required (`.node-version`). Astro 7 does not run on older versions.

## Commands

| Command                 | Action                                                        |
| :---------------------- | :------------------------------------------------------------ |
| `npm run dev`           | Dev server at `https://localhost:4321`                        |
| `npm run build`         | Builds the site to `dist/`                                    |
| `npm run preview`       | Runs the build in the Workers runtime                         |
| `npm run check:build`   | After a build: language, SEO tags, shortcodes, internal links |
| `npm run check:secrets` | After a build: no secret from `.env` in public files          |

`node scripts/generate-icons.mjs` regenerates the favicons from `public/logos/icon.svg`.

Do not run the Playwright specs against production. The default `BASE_URL` is the live site and
some specs submit real forms.

## How it is organized

```text
src/
├── lib/
│   ├── wordpress/    # Data: client (fetch), snapshot (one per language), index (queries)
│   ├── content.ts    # WordPress HTML: shortcodes, heading anchors, dates, SEO
│   ├── site.ts       # Navigation, identity copy, feature switches
│   └── env.ts        # Worker secrets for /api routes
├── pages/
│   ├── [...path].astro   # Every WordPress page, in both languages
│   ├── 404.astro
│   ├── preview/          # Live preview of a revision
│   └── api/              # Comments, MailerLite, search, Stripe
├── templates/        # One per kind of page
├── components/
├── layouts/
└── styles/global.css # Identity tokens and WordPress content styles
```

### Data

A build fetches WordPress once: all posts, pages, terms and comments, per language, in about 32
requests. Page renders read that snapshot and never touch the network. If WordPress fails, the build
fails, so the last good deploy stays online instead of publishing missing pages.

In `astro dev` the data is cached in `.astro/wp-*.json` for an hour. Delete those files to force a refresh.

Three WordPress behaviors to know about, all handled in `src/lib/wordpress/`:

- In a full list response, `wpml_translations` accumulates from item to item. `repairTranslations`
  recovers each item's own translations.
- `_fields` returns `wpml_translations` empty, so do not use it to fetch translations.
- `per_page=100` on full posts ends in a 504. Posts are fetched 20 at a time.

### Languages

`[...path].astro` generates both languages, and `Astro.currentLocale` comes from the URL. To change
navigation, edit `src/lib/site.ts`. English must only link to pages that exist in English:
`npm run check:build` reports any that do not.

### Changing the logo

Replace the files in `public/logos/` under the same names, then run `node scripts/generate-icons.mjs`.

### Mobile bottom bar

Built but off. Set `FEATURES.mobileBottomBar` to `true` in `src/lib/site.ts`.

## License

This project is proprietary and confidential. All rights reserved.
