# Carnets Vanille - Astro Website

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build) v4.3.5
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v3.4.3
- **UI Components**: [Flowbite](https://flowbite.com) v2.3.0
- **Payment Processing**: [Stripe](https://stripe.com) v14.22.0
- **Email Marketing**: [MailerLite](https://www.mailerlite.com) Node.js SDK
- **Fonts**: [Fontsource](https://fontsource.org) - Mulish Variable
- **Lightbox**: [GLightbox](https://biati-digital.github.io/glightbox/) v3.3.0
- **Development Tools**:
  - TypeScript
  - Prettier
  - Tailwind Typography

## 🏗️ Project Structure

```text
/
├── public/              # Static assets
├── src/
│   ├── api/            # API routes and utilities
│   ├── components/     # Reusable components
│   ├── i18n/          # Internationalization
│   ├── layouts/       # Layout components
│   ├── pages/         # Astro pages
│   ├── templates/     # Page templates
│   └── utils/         # Utility functions
├── .astro/            # Astro cache
└── .github/           # GitHub configuration
```

## 🛠️ Available Scripts

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `npm install`       | Installs dependencies                            |
| `npm run dev`       | Starts local dev server at `localhost:4321`      |
| `npm run build`     | Build your production site to `./dist/`          |
| `npm run preview`   | Preview your build locally, before deploying     |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro check` |

## 🌐 Deployment

The project is automatically deployed to Cloudflare Pages on every commit to the main branch. The deployment process includes:

1. Automatic build and deployment on push to main
2. Preview deployments for pull requests
3. Automatic HTTPS/SSL configuration
4. Global CDN distribution
5. Edge Functions for API routes

## 📦 Dependencies

Key dependencies are managed in `package.json`. The project uses:

- Astro for the core framework
- Tailwind CSS for styling
- Stripe for payment processing
- MailerLite for email marketing
- Various UI and utility libraries

## 🔧 Configuration

- `astro.config.mjs`: Astro configuration
- `tailwind.config.cjs`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration

## 📝 License

This project is proprietary and confidential. All rights reserved.

## Fonts

Custom font is using the Fontsource project which simplifies using Google Fonts and other open-source fonts. It provides npm modules you can install for the fonts you want to use.
More with its Astro integration [here](https://docs.astro.build/en/guides/fonts/#using-fontsource)

## Todo

- [ ] Check https and non www redirection
- [ ] Redirect https://carnets-vanille-astro3.pages.dev/ to https://carnetsvanille.com/
- [ ] Add CRON Job to build every night
