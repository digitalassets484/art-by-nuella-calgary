# Add event gifting wording + "Events" quote option

## My recommendation (your question)
Use **one "Events" chip**, not separate "Wedding" / "Birthday" chips. Reasons:
- The chip row stays clean and scannable on mobile.
- The "Project details" box already asks for occasion, date, and quantity — so we still know if it's a wedding, birthday, shower, or corporate event when the lead arrives.
- A single chip covers future event types (baby showers, graduations, corporate parties) without adding more chips later.

## Changes (all in `src/routes/index.tsx`, copy-only — no backend or layout changes)

1. **Project-type chips**
   - Add `Events` to the chip list, shown last.

2. **Event wording additions**
   - Hero subline: extend the existing line to explicitly mention weddings, birthdays, and events (e.g. "Made for birthdays, weddings, baby showers, teachers, teams, businesses, and keepsakes.").
   - Personalized gifts service card: mention wedding and birthday gifting and event favours.
   - Print shop service card: mention bulk orders for events and parties.
   - Quote-form intro: add a short line inviting event and bulk orders ("Planning a wedding, birthday, or party? Ask about bulk pricing and event packages.").

3. **Nothing else changes**
   - Lead form fields, submission logic, gallery, and contact details stay untouched.

## Verification
- Build logs report OK.
- Playwright check that the "Events" chip renders and can be selected, and the new wording appears.
