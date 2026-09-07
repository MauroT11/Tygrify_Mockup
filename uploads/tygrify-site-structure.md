# Tygrify - Site Structure

v1 page list and what goes on each, built from `tygrify-scope-services.md`. Pull facts from the companion files - this doc is about structure, not content.

## Primary navigation

**Updated per client-supplied reference mockup:** Home | Services | Security | Gallery | About | Contact — with **Shop** shown but visually secondary (greyed or badged "Coming soon"), and **Login** / **My Garage** on the right, alongside the primary CTA. Reviews doesn't get its own nav slot in the reference - keep it as a homepage section and a footer link instead, rather than a top-level page, unless the client wants it promoted.

Security as its own nav item is a reasonable read of the reference and fits an existing decision - Trackers and Ghost immobilisers already needed dedicated pages, so grouping them under a "Security" section (with its own overview page, same pattern as Services) is a small, sensible change. Confirm with the client rather than treating it as locked.

**Persistent on mobile:** fixed click-to-call button. Not ticked on the client's form, but flagged as a recommendation in `tygrify-scope-services.md` given how much traffic will be someone next to a damaged car.

**Primary CTA everywhere:** "Get a quote" - orange accent colour, per `tygrify-design.md`, and present in the header on every page, not just the homepage. "Login" sits alongside it for returning customers.

---

## Home

- **Hero:** one-line value proposition + tagline pattern (per reference mockup) + CTA row: "Get a Quote" (primary), "Request a Quote" (see naming note in `tygrify-scope-services.md`), "My Garage." Phone/WhatsApp visible without scrolling.
- **Trust bar:** guarantee, years in the industry, insurance held. Leave accreditation logos and any "manufacturer approved" or "nationwide" style claims out until they're actually confirmed (see open contradictions in the main instructions doc, and the reference-mockup caveat in `tygrify-design.md`) - don't let an empty trust bar block launch, just don't populate it with unverified claims.
- **Services highlights:** icon-led strip of service categories (per reference mockup), linking through to the services overview, not every individual page.
- **How it works:** numbered steps matching the actual v1 flow - use the 2D configurator → get an estimate → approve → track progress in My Garage. Keep this honest to the reduced My Garage scope in `tygrify-scope-services.md` - no automated pricing, no loyalty tracking yet.
- **Before/after slider:** a real repair shown as a single before/after comparison (per reference mockup), linking to the full gallery. Cannot populate until photos arrive.
- **About teaser:** short pull from the founder story, linking to the full About page.
- **Reviews snippet:** once there are reviews to show - hold this section back rather than launching it empty.
- **Areas covered:** short list or map, matching the towns and radius in `tygrify-business-info.md`.
- **Accreditations strip:** bottom of the homepage per the client's request - same caveat as the trust bar above.
- **Closing CTA banner.**

## Services overview

- Short intro.
- Grouped by category, not a flat list: Body & paint / Cosmetic & aftermarket / Security & customisation.
- One card per service - name, one-line summary, "from £X" where the client has agreed to publish a price (cosmetic services only), linking to that service's own page.
- CTA to the quote form.

## Individual service pages (one per service, per the client's explicit ask - this is what drives local search)

Same template for each:

- H1 using the customer-facing name (e.g. "Bumper Scuff & Crack Repair," not internal jargon)
- Plain-English description - what it actually involves
- Who it's for
- Typical turnaround
- Price guide where applicable ("from £X, subject to inspection") - cosmetic services only, per the client's answer
- Before-and-after photos specific to that service
- CTA to the quote form

Pages needed: SMART repair · Bumper scuff & crack repair · Panel repair & replacement · Full/part respray & colour matching · Aluminium bodywork & rust/corrosion repair · Alloy wheel refurbishment · Ceramic coating & paint protection · Valeting & detailing · Interior & trim repair · Trackers · Ghost immobilisers.

Trackers and Ghost immobilisers were specifically called out by the client as needing their own pages rather than being folded into a general "security" page.

## Get a quote / online estimate

- Short intro setting expectations: same-day response, what happens after submission.
- 2D configurator: body type choice (hatchback / saloon / SUV) → SVG panel selector → per-panel damage type, severity, photo upload, note. Full interaction spec lives in `tygrify-configurator-build-spec.md` - unchanged despite the naming update, see `tygrify-scope-services.md`.
- Contact fields: name, phone, email, registration, preferred dates (per `tygrify-scope-services.md`).
- WhatsApp offered as an alternative route in, alongside the form.
- Confirmation state after submission, matching the same-day response promise.
- If submitted while logged in, the resulting quote appears in My Garage; if submitted as a guest, offer account creation at the confirmation step so the quote can be tracked there.

## Login / create account

- Simple login and registration - email/password or equivalent.
- Account creation can also happen inline from the quote confirmation step above, rather than requiring a separate sign-up journey.

## My Garage (logged-in area, reduced v1 scope)

Per the scoping note in `tygrify-scope-services.md`, v1 covers:

- List of the customer's submitted quotes/estimates and their status
- Ability to approve a quote to proceed with repair
- Basic progress state per job (e.g. received - in progress - ready for collection)

**Not in v1:** loyalty points or discounts, vehicle history/MOT reminders/document storage (the fuller "virtual garage"), and anything implying an online booking diary beyond the preferred-dates field already in the quote form. Don't let page design imply these exist yet - a "Rewards" or "Vehicle History" tab with nothing behind it would overpromise.

## Security

Mirrors the Services overview pattern:

- Short intro
- Cards for Trackers and Ghost immobilisers (and CAN-BUS systems if given its own page), each linking to its individual page as already defined in `tygrify-scope-services.md`
- CTA to the quote form

This groups content that already needed dedicated pages under a nav item that matches the reference mockup, rather than changing what's built.

## Before and after gallery

- Grouped or filterable by service type.
- Every vehicle photo has plates covered with a Tygrify-branded plate, per the client's instruction.
- Cannot populate at launch - see photo blocker in the main instructions doc.

## About us / meet the team

- Founder story, used in full here (kept out of service pages - see `tygrify-design.md`).
- What makes Tygrify different, in the client's own words as a starting point.
- Team section - currently no team details or photos; hold this section back or keep it to the founder only until more comes in.
- CTA to the quote form.

## Reviews and testimonials

- Currently empty - no reviews exist yet anywhere. Either seed with real testimonials from past recommendation-based customers before launch, or hold the page back and add it once automatic review requests (see marketing section, `tygrify-scope-services.md`) start generating content.

## Contact and find us

- Address, phone, email, hours, map embed.
- WhatsApp button.
- Areas covered list.
- Quote CTA repeated here too - people landing on Contact are often ready to act.

## Shop (v1: placeholder only)

- Single "coming soon" page at `/shop` on the main domain.
- No products, basket, or checkout in v1.
- Optional: an email capture for "let me know when it launches," low effort, keeps the tab from feeling dead.

## Legal pages

- Terms, Privacy, Cookies - built from Nue Web's standard templates, linked from the footer. Not ticked on the client's form but not optional for a UK site handling personal data and payments.

## Footer (site-wide)

- Accreditations strip (same caveat as above)
- Social links (Instagram, TikTok - no Facebook given)
- Address, hours, contact details
- Legal page links
- Copyright

---

## Deliberately not in v1 navigation

Insurance/claims page and a dedicated fleet/trade route are on hold pending the insurance contradiction in the main instructions doc. FAQ, blog, and careers were not requested. Customer portal and loyalty pages don't exist yet - see phasing in `tygrify-scope-services.md`.
