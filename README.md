# Shintaine Ruiz Tajanlangit — Portfolio

Static portfolio site (HTML/CSS/JS, no framework). Live: https://itsshintayyyn.vercel.app

## Edit content
All text, projects, blog posts, testimonials, socials and the Spotify playlist live in `assets/js/data.js`.

After editing, regenerate the search-engine / AI files (per-item pages, sitemap, robots.txt, llms.txt):

```bash
node tools/build-seo.mjs
```

## Run locally
```bash
python3 -m http.server 5173
```
Then open http://localhost:5173

## Deploy
Pushing to `main` redeploys automatically on Vercel.
