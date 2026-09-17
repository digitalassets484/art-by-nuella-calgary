# Add generated gallery photos to Art by Nuella

## Goal
Expand the gallery beyond the 7 uploaded sample photos with new AI-generated product photos that match their look — warm neutral backdrops, gold accents, natural light, clean product-photography style — so the site feels even more gallery-heavy and covers every service the shop offers.

## New images (6)
Generated to match the existing photos' aesthetic (cream/beige backdrop, gold detail, soft shadows):

1. Engraved mugs — pair of mugs with a gold line-art design
2. Custom T-shirt — folded/worn tee with a bold printed design
3. Tote bag — canvas tote with printed personalization
4. Engraved chopping board close-up — detail shot of the laser engraving
5. Crystal plaque — engraved crystal award/keepsake on a lit base
6. Celebration gift set — wrapped personalized gift with ribbon (wedding/anniversary feel)

## Changes
- Generate each image with the image tool, sized for the gallery grid (landscape/square).
- Upload each to Lovable assets and create `src/assets/art-by-nuella-*.asset.json` pointers.
- In `src/routes/index.tsx`: import the new pointers, add 6 entries to the `gallery` array (title + alt text), and tune the grid span classes so the expanded mosaic stays balanced (roughly 13 tiles across 3 columns).
- No changes to the lead form, contact info, or other sections.

## Verification
- Check the build log after edits.
- Playwright screenshot of the gallery section to confirm the new tiles load and the mosaic layout looks balanced.
