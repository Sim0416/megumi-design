# Megumi Design 惠 — Website

Next.js 16 (App Router) + Sanity Studio, styled in a Japanese-craftsman
aesthetic (black / gold, 匠の技) inspired by the Megumi Design logo. Content
(hero, about, stats, contact, **services** and **portfolio**) is editable from
an embedded Sanity Studio at `/studio` — no code changes needed to update
those sections.

Until Sanity is connected, the site renders with real content copied from
[megumidesign.net](https://www.megumidesign.net/) as fallback data (see
`src/sanity/lib/fallback.ts`), so it already looks complete.

## 1. Run locally

```bash
npm install
npm run dev
```

- Site: http://localhost:3000
- Studio: http://localhost:3000/studio (will show a connection error until
  step 2 below is done — that's expected)

## 2. Connect your Sanity project

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage)
   (or run `npx sanity init` from this folder and choose "create new
   project").
2. Copy the **Project ID** it gives you.
3. Edit `.env.local` in this folder:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. Restart `npm run dev`, open http://localhost:3000/studio, log in, and you
   have a working CMS.
5. In Studio → **网站设置 Site Settings**, fill in the hero/about/stats/
   contact fields once — this is a singleton document.
6. Add **服务 Services** and **作品 Portfolio** entries with photos. The
   homepage picks them up automatically (60s cache).

If you'd rather I create and connect the Sanity project for you, authorize
the Sanity MCP connector (`/mcp` or your Claude Code MCP settings) and ask
again — that wasn't available in this session.

## 3. Deploy

- **Frontend**: deploy this Next.js app to Vercel (recommended) — set the
  same two env vars in the Vercel project settings.
- **Studio**: either keep it embedded at `/studio` on the same deployment
  (simplest), or run `npx sanity deploy` to host it separately on
  `*.sanity.studio`.

## Structure

```
src/app/            Next.js routes (page.tsx = homepage, studio/ = CMS)
src/components/      All UI sections (Hero, About, Services, Portfolio, Contact, Nav, Footer)
src/sanity/schemaTypes/  Studio content models (siteSettings, service, project)
src/sanity/lib/      Sanity client, GROQ queries, image URLs, fallback content
public/logo.webp     Logo used in nav, footer, and favicon
```

## Design notes

- Colors are sampled from the logo: gold `#B8863E` family on near-black
  `#0A0908` / `#121110`, with a warm paper/cream text tone.
- Fonts: **Shippori Mincho** (headings, Japanese + Latin) and **Noto Sans
  JP** (body) — both self-hosted via `next/font`, no runtime request to
  Google.
- Every section animates in on scroll down and reverses on scroll up
  (`framer-motion` `whileInView` with `once: false`), via the shared
  `<Reveal>` / `<RevealGroup>` components in `src/components/Reveal.tsx`.
- Fully responsive: single-column stacked layout on mobile, multi-column
  grids from `sm:`/`md:`/`lg:` breakpoints up. Test on a phone-width viewport
  and desktop before shipping changes.
