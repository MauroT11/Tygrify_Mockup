# Tygrify - Scope & Services

Source: `Tygify_Website_Requirements.pdf`, returned by the client 4 September 2026, plus the agreed configurator design.

## Services offered in-house

Body and paint: SMART repair (small and medium area repair), bumper scuff and crack repair / plastic welding, panel repair and replacement, full and part resprays, colour matching and paint restoration, aluminium bodywork, rust and corrosion repair.

Cosmetic and aftermarket: alloy wheel refurbishment, ceramic coating and paint protection, valeting and detailing, interior and trim repair.

Security and customisation (not on the original form's checklist, added by the client under "anything else"): Ghost immobilisers, trackers, CAN-BUS systems.

**Not offered:** PDR, chassis/jig straightening, classic restoration, ADAS recalibration, EV/hybrid repair, diagnostics, MOT testing, servicing, wheel alignment, air conditioning, glass and windscreen work, vehicle wrapping, headlight restoration (unconfirmed - checkbox came back malformed).

**Subcontracted out:** roadside recovery.

## Who the client works for

Private customers (aiming at higher-end cars), fleet and commercial contracts, motor trade / other garages, dealerships. Vans and light commercials, and insurance/accident management work, were left unticked - see insurance contradiction below.

## Published pricing (cosmetic work only, "from" figures, subject to inspection)

| Service | Price guide | Typical turnaround |
| --- | --- | --- |
| Small scratches | from £45 | - |
| SMART repair | from £50 | 24 hours |
| Alloy repair | from £50 | same day to 3 days, depending on damage |
| Interior repair | from £80 | same day |
| Trackers | from £350 | same day to 24 hours, depending on car |
| Ghost immobiliser | £500 | same day to 24 hours, depending on car |
| Paint correction | from £400 | same day to one week |
| Half resprays | quote on inspection | 2-7 days |

Structural and insurance-adjacent work stays quote-only, which is expected and doesn't need a published figure.

No courtesy car offered under any circumstances.

## Insurance work - contradiction, resolve before writing any insurance copy

The services checklist ticks "insurance claim repairs," but the dedicated insurance section says the client does **not** handle insurance claims, and "insurance and accident management work" is unticked under who he works for. Do not build or write an insurance/claims page until this is resolved - confirm whether customers ever arrive via insurers even if Tygrify doesn't manage the claim itself.

## Collision repair ceiling - needs clarifying

Panel repair/replacement and full resprays are offered, but chassis and jig straightening is not. Confirm whether there's a practical size/severity ceiling on jobs taken, or whether it's assessed case by case - this affects how confidently the site can describe collision repair capability.

## v1 build - pages

- Home
- Services overview
- Individual service pages, including dedicated pages for trackers and Ghost immobilisers
- Get a quote / online estimate form, with the 2D vehicle configurator
- Login / create account
- My Garage (reduced scope - see below)
- Before and after gallery
- About us / meet the team
- Reviews and testimonials
- Contact and find us, with map
- Accreditations strip at the bottom of the homepage (not a standalone page)
- Shop - "coming soon" tab only, at `/shop` on the main domain. No products, basket, or checkout in v1.
- Legal pages - Terms, Privacy, Cookies. Unticked on the form but not optional; built from Nue Web's standard templates.

## 2D vehicle configurator - agreed v1 design

**Scope update:** the client originally asked for a 3D model with automated price estimation, which was deprioritised as the highest-risk item in the brief. He's since confirmed he wants the configurator concept kept, but built as 2D rather than 3D - this matches the SVG-based approach already designed, just under its original name again rather than "damage selector." No build change follows from this, only a naming one; the detail below is unchanged.

Full interaction detail lives in `tygrify-configurator-build-spec.md`. Summary:

- One layered SVG diagram per body type - hatchback, saloon, SUV
- Two-way binding: tapping a panel ticks its checkbox; ticking a checkbox highlights the panel
- Panels grouped into plain-English collapsed sections; thin panels get enlarged invisible hit areas for mobile
- Each selected panel captures damage type, severity, a photo upload, and a free-text note
- **Still out of scope:** 3D car models, spin-frame interaction, hit-mapping across frames, automated price estimation - the "2D" instruction confirms these stay out, it isn't a reopening of that question.

## Quote form - fields in v1

Name, phone number, email, vehicle registration, description of damage, photo upload, preferred dates. Stated response time is **same day** - this goes on the form itself.

**CTA naming:** the client wants the "Book a Repair" button (from his reference mockup) replaced with "Request a Quote." Worth flagging back to him: this sits right next to the existing "Get a Quote" CTA, so the two may read as duplicates on the page - fine if intentional (e.g. one for new customers, one for logged-in "My Garage" users requesting a follow-up quote), but worth a quick confirmation before it's built as two separate buttons doing the same thing.

Two recommendations to put to the client:
- Derive make, model, and year from the registration automatically instead of asking for them - one less field, more data.
- Add a fixed click-to-call button on mobile. It wasn't ticked on the form, but a large share of this traffic will be someone next to a damaged car on their phone.

WhatsApp enquiries were requested and are in scope for v1.

## Login and My Garage - pulled into v1, reduced scope

**This reverses an earlier decision.** The full customer portal was deliberately kept out of v1 due to backend complexity (auth, job/status data, admin visibility) and staff adoption risk. The client has now confirmed he wants login and "My Garage" in v1, based on his reference mockup. To keep this achievable without quietly re-inheriting the full later-phase build, v1 "My Garage" is scoped as:

- Account creation / login
- View the status of a submitted quote or estimate
- Approve a quote to proceed with repair
- See booked/preferred dates and repair progress at a basic level (e.g. received - in progress - ready for collection)

**Explicitly still excluded from v1's My Garage:** the loyalty/discount tracking shown in the reference mockup's messaging. That stays gated behind the client's answer on his actual goal (retention, referrals, or novelty) - see below - rather than being pulled in by association with the rest of the portal. Vehicle history, MOT/service reminders, and document storage (the "virtual garage" concept) also stay out of v1 for the same reason; My Garage in v1 is a quote/job tracker, not the fuller vehicle-record feature.

Flag to the client (and to Mauro, for scoping/pricing purposes): even this reduced version is real backend work - accounts, authentication, and a data model tying quotes to logged-in customers - that wasn't priced into the original phased plan. Worth confirming timeline and budget impact before committing to it as v1 rather than an early v1.1.

## Loyalty scheme - still on hold

Unchanged by the above: probe the client's actual goal (retention, referrals, or novelty) before scoping any loyalty/discount mechanic. Loyalty mechanics only make commercial sense for discretionary repeat services (valeting, detailing, alloys, ceramic coating), not accident repair, where rewarding damage creates awkward messaging. The virtual garage concept - vehicle history, MOT/service reminders, document storage - remains a stronger, more immediately useful pitch than gamification, and is still the recommended next phase after v1's reduced My Garage, not a v1 feature itself.

## Explicitly out of scope for v1 - later phases

- Full virtual garage (vehicle history, MOT/service reminders, document storage) - beyond the reduced My Garage above
- Online loyalty / discount scheme
- Real online shop: products, payments, delivery. Client wants a visible "coming soon" tab now, content later. Currently 0 products defined; when scoped, keep the initial range small and tightly focused rather than a full catalogue.
- Online deposits at time of booking
- Insurance and claims page, dedicated fleet/trade enquiry route, FAQ, blog, careers page

## Marketing and tracking - in scope for v1

Follow-up sequences for quote enquiries that go quiet; Google Analytics with conversion tracking.

**Worth revisiting with the client**, unticked on the form but well-supported by his other answers: local SEO pages for the towns he named (he gave a specific radius and town list, so the groundwork already exists); automatic review requests after collection (he currently has zero reviews anywhere - this is close to a free fix); MOT and seasonal email campaigns, which pair naturally with the virtual garage phase above.
