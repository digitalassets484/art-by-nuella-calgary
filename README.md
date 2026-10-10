# Art by Nuella

Static website for Art by Nuella (custom gifts, apparel, engraving, crystals and event favours, Calgary).
Plain HTML/CSS/JS, no build step needed to host it. Pages are generated from `_build/build.py`.

## Add a blog post
1. Create `_build/posts/<slug>.md` (copy an existing one for the front matter).
2. Run `python _build/build.py`.
3. Commit and push. The blog index, post page, related posts and home page strip update automatically.

## Forms
Quote forms post to `FORM_ENDPOINT` in `app.js` (empty = demo mode). Setup notes in `_setup/README-forms.md`.
