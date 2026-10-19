[README.md](https://github.com/user-attachments/files/33664676/README.md)
# Athens View Maldives – website

Static multi-page site (no build step, no backend). Works on GitHub Pages as-is.

## Publish on GitHub Pages
1. Create a repo (e.g. `athens-view`) and upload **everything in this folder** (index.html must be at the repo root).
2. Repo → Settings → Pages → Deploy from a branch → `main` / `(root)` → Save.
3. Your site appears at `https://<username>.github.io/<repo>/` after a minute or two.

## Edit your content (one file)
`assets/js/data.js` holds phone, WhatsApp, email, Instagram, prices, rooms, excursions and FAQ.
Changing it updates cards, booking totals and every contact link on all pages.

## How booking works (no server)
The booking form builds a live quote, then creates a pre-written WhatsApp / email message with a reference
number. Optional: paste a Formspree URL into `formEndpoint` in data.js to also receive requests by email.

## Placeholders to replace before real use
- Phone / WhatsApp (+960 799 8877), email, Instagram handle, prices, menu items, review quote.
- Photos are AI-generated Stitch images hosted online; download them into `assets/img/` and update the URLs in
  `data.js` and the HTML if you want them permanently hosted with your site.
- Speedboat time (35 min) and transfer price ($35) – confirm with your operator.

## Files
index, rooms, excursions, dining, location, contact, booking, privacy, 404 (.html) · assets/css · assets/js · assets/img
