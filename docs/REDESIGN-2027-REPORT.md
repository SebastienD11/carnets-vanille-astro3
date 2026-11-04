# Redesign 2027: morning report

The current blog now runs on the new identity, on Astro 7 and Tailwind 4, with a much faster build.
Nothing was pushed or deployed and WordPress was not touched.

## To see it

Node 24 is now required. It is installed with nvm, but your default may still be older.

```bash
nvm use 24
```

```bash
npm run dev
```

## Results

| | Before | After |
| :--- | :--- | :--- |
| Astro / Tailwind | 5.18 / 3.4 | 7.4 / 4.3 |
| Build | 648s on Cloudflare | about 65s on this Mac |
| Prerendering | 567s | about 50s |
| WordPress requests | several per page | 32 in total |
| Images generated | 906 | fewer per photo, none at full source size |
| Dependencies | 781 packages | 373 packages |

The two build times are not like for like: one is Cloudflare, the other my Mac. Expect a longer time
on Cloudflare, but the 567s came from waiting on WordPress and that wait is gone. Not measured there.

## What changed in the code

- **Data.** One snapshot per language, fetched once. A WordPress failure now fails the build, so the
  last good deploy stays online. Before, a failed fetch could publish a site with missing pages.
- **i18n.** You were right that this could be simpler. One `[...path].astro` replaces 6 route files,
  including the duplicated `en/` folder. `Astro.currentLocale` comes from the URL.
- **flowbite removed.** Menu, search, newsletter and purchase confirmation are native `<dialog>`.
- **`@wordpress/block-library` removed.** That was most of the 781 packages. I scanned all 167
  articles and styled only the blocks they use. The 213 "Le +" verse blocks are now the vanille callout.
- **Workers.** `wrangler.jsonc` is ready. Only `/api/*` and `/preview/*` wake the Worker.

Bugs fixed on the way:

- An article with several ebook banners of one kind only showed one. All render now, on the server.
- Mobile search sent the literal text `${lang}` as its language.
- Featured images never used their alt text. The code read `alt_text`, the field is `alt`.
- Comment form crashed after posting when an article had no Mailerlite group.
- Dark mode flashed white on load.
- Paginated canonicals now end with a slash, matching the served URL.

## What I checked

- All 338 URLs from the baseline exist, in both a local build and a Cloudflare-style production build.
- 0 problems across every page: language, title, canonical, raw shortcodes, broken internal links,
  English linking to French.
- Translations match WordPress: 274 items compared one by one, 148 with a translation, 0 mismatches.
- The redirects are generated. In the Workers runtime I tested 301s, the 404 page, search in both languages.
- Clean `npm ci` then build works. `wrangler deploy --dry-run` passes, 348 KB gzipped.
- No password or API key in public files (`npm run check:secrets`). A local build also writes your
  `.env` values to `dist/server/.dev.vars`. That folder is gitignored and is not uploaded as an asset,
  and a build without `.env` does not create the file.
- `npm run dev` works over https. Type check has 0 errors.
- Screens viewed: home, article, destination, list, ebook, Linktree, 404, menu, search, newsletter,
  mostly mobile and in light or dark. No horizontal overflow on 15 sampled pages at 375px.

## What I did not check

- **No form was submitted**, as you asked: comments, newsletter, free extract. Their payloads are the
  same as before but they are untested end to end.
- **Stripe checkout was not run** (no key). I kept Stripe on v18 on purpose: a major upgrade of payment
  code cannot be tested tonight.
- **Nothing ran on real Cloudflare.** Only the local Workers runtime and a dry run.
- Stay22 and Plausible load in production mode, but I did not watch them work.
- `/preview/*` was built but never opened, since it needs a real revision.
- **The Playwright tests were not run** and were not updated. Their selectors target the old markup, so
  expect failures. They need rewriting.
- Tablet size, and not every template in both themes. The browser pane could not open the https dev
  server because of its self-signed certificate, so I reviewed the built site instead.

## Differences from the Paper boards

These have no data yet, so they are not built: map, agenda, series, tested places, "L'essentiel",
"Vérifié sur place", "Répondre" on comments, TikTok (no account in the code).

Replaced with real content:

| Paper | Now |
| :--- | :--- |
| Series block on home | Grid of the latest articles with pagination |
| "L'agenda" tile | "Les événements" → `/evenements-saint-malo/` |
| "La carte", "L'agenda", "Infos pratiques" in the nav | Se garer, Saint-Malo, Au Québec |
| Inline newsletter form | Card opening the existing form, with the existing copy |
| "Contact" page | Stays a redirect to `/`, because URLs had to stay identical |
| Shop and ebook header layout | Same, plus a fixed buy button on mobile as on the old page |

English has no ebook card: the old English "Buy for 9,90€" banner linked nowhere, so it is gone. The
newsletter group labels are now translated in English. The group ids are unchanged.

## Copy to confirm with Sarah

All of this comes from the Paper boards, not from her:

- Home: "Moi c'est Sarah, Malouine de retour après 10 ans au Québec…" and its English version.
- Sarah card: "Je teste, je marche, je goûte, et je vous partage mes vraies adresses."
- Byline: "Par Sarah, Malouine". The old text said "malouine de cœur".
- Ebook card: "Tout mon Saint-Malo dans votre poche".
- "Cette page a fondu" on the 404.
- Ebook card points: conseils de visite, itinéraires, anecdotes. Taken from her article, with no page
  count, because the article says "plus de 200 pages" and the old banner copy says "180+ pages".

## WordPress changes needed (nothing was touched)

1. `/le-quebec/` declares `/en/in-quebec/` as its translation, but your redirect sends that URL to
   `/en/quebec`. So the `hreflang` points at a redirect. Fix the WPML link or the redirect.
2. The WPML field bug (translations accumulating in lists) is worked around in code. Worth reporting or
   fixing in the plugin, but not urgent.
3. English categories `elsewhere` and `my-notebooks` have 0 posts and `non-classifiee` has 1, and all
   are public pages. Consider noindex or removing them.
4. Ebook and kids' book "mis à jour en Avril 2025 / Mai 2025" are hardcoded in `Product.astro`, like
   before. An ACF field would be better.
5. Earlier content flags: the Route du Rhum "Fort-de-France en Guadeloupe" error, stale event dates, the
   Pétille invited-visit disclosure, Ti/Ty Nevez.
6. `robots.txt` points to a sitemap on `content.carnetsvanille.com`. I did not check it. Make sure it
   lists `carnetsvanille.com` URLs.

## Security notes (existing, not changed)

- `/api/comments` forwards any JSON to WordPress **with the admin credentials**. A caller could likely
  set fields a visitor should not control, such as `status`. Worth limiting to the four fields the form
  sends. This is the one I would fix first.
- `/api/mailerlite` accepts any payload, including any group.
- The WordPress password is compiled into the Worker bundle, because the code reads
  `import.meta.env`. It is not public, but runtime secrets would be cleaner.

## Switching hosting, when you merge

Your adapter version has dropped Pages support, so this is required.

1. Create a Worker from the repo in Cloudflare, with build `npm run build` and deploy `npx wrangler deploy`.
2. **Build variables:** everything in `.env.example`, plus `CUSTOM_ENV=production`. There must be no
   `.env` in the build. A local `.env` overrides shell variables, so a local build always says development.
3. **Runtime secrets:** `MAILERLITE_KEY`, `ASTRO_APP_STRIPE_SECRET_KEY`, `ASTRO_APP_STRIPE_WEBHOOK`,
   `WORDPRESS_REST_API_URL`, `WORDPRESS_APP_USERNAME`, `WORDPRESS_APP_PASSWORD`.
4. `.github/workflows/nightly-rebuild.yml` calls a Pages deploy hook. It needs replacing. I have not
   confirmed the Workers equivalent, and running `wrangler deploy` from the action is the fallback.
5. `public/_headers` has noindex rules for the `pages.dev` host. Add your new `workers.dev` host.
6. Move the custom domain last, and check the Stripe webhook still reaches `/api/stripe/fullfillment`.
7. Keep `node_modules/.astro` between builds if you can. It saves regenerating images every night.

One small change to expect: URLs without a trailing slash now redirect with a 307. Canonicals are not affected.

## Remove before launch

- `/home-2` and `/home-3`: `src/pages/home-2.astro`, `src/pages/home-3.astro`.
- Sarah's settings widget: `src/components/DesignSettings.astro`, its code and flag in `Layout.astro`
  and `FEATURES.designSettings`, and `public/logos/options/`. Then set the chosen logo in `public/logos/`
  and the chosen font in `src/styles/global.css`.
- The review copy on 2027.carnetsvanille.com: the `carnets-vanille-2027` Worker and its domain in
  Cloudflare, the `preview-2027` environment in `wrangler.jsonc`, the `deploy:2027` script,
  `scripts/preview-2027-links.mjs` and its line in `public/_headers`. Only search works there: forms
  stop at the 404 page on purpose, so they cannot reach the real MailerLite, WordPress or Stripe.

## Where things are

- Identity tokens: `src/styles/global.css`
- Navigation and copy: `src/lib/site.ts`
- Logos: `public/logos/`, replace the files to swap them
- Mobile bottom bar switch: `FEATURES.mobileBottomBar` in `src/lib/site.ts`, off by default
