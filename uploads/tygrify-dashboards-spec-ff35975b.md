# Tygrify - Admin & Customer Dashboards

Companion to `tygrify-site-structure.md`. Covers the logged-in areas of the site: the client's admin dashboard and the customer account area.

**Status: phase 2 - not v1.** The public site and the quote form ship first. Nothing in this document should delay that launch.

---

## Scope warning - read this first

The customer-facing half of this document is the portal from the client's original AI-generated brief - accounts, saved estimates, approve-and-book, loyalty. That was deliberately deprioritised because it turns a website build into a small SaaS product: authentication, a database of real customer records, file storage, transactional email, an admin UI, and an ongoing support burden for a business with no in-house technical staff.

None of that is a reason to refuse it. It is a reason to scope, price, and sign it off separately, and to build it in an order where each stage is useful on its own.

**Recommended order:**

| Stage | What ships | Why this order |
| --- | --- | --- |
| 2a | Admin: enquiry pipeline, content editing, shop toggle | Useful immediately, no customer accounts, no auth exposure beyond one admin login |
| 2b | Customer: sign-in, view estimate, my details, my vehicles | Only worth building once there are real enquiries flowing through 2a |
| 2c | Booking requests, MOT/service reminders (virtual garage) | This is what gives customers a reason to log in again |
| 3 | Loyalty / XP | Deliberately last - see the note at the end |

2a alone solves a real problem the client has today. 2b on its own solves almost nothing without 2a behind it.

---

## Build decision: do not build a bespoke admin for content

The list of admin features splits cleanly into two groups, and they should be built with completely different tools.

**Content editing - use the CMS, build nothing custom.** Editing service pages and prices, editing the gallery, editing business information (hours, phone, address, areas covered) is exactly what a headless CMS or WordPress admin already does, with versioning, media handling, and user roles included. Building a custom interface for this is weeks of work to produce something worse than what comes free.

**The enquiry pipeline - build this custom.** There is no off-the-shelf product that understands the damage selector output. This is the part with genuine value and it is where the budget should go.

Practical consequence: "the admin dashboard" is really one custom screen set (enquiries) sitting alongside the CMS, ideally behind a single login with a shared navigation so it feels like one system to the client. Confirm the platform choice before this is specified any further - the answer changes the estimate significantly.

---

## Admin dashboard

Route: `/admin`. Single account for the owner initially, with a role field in the schema so staff logins can be added later without a migration.

### `/admin` - Home

Deliberately thin. A working owner will check this on a phone between jobs.

- Count of new enquiries awaiting a response, as the largest thing on screen
- Enquiries awaiting customer approval, and quotes gone quiet past a set number of days
- Last five enquiries, tappable straight through to detail
- Nothing else. No charts, no vanity metrics, no revenue graphs pulled from data the site does not hold.

### `/admin/enquiries` - List

- Filter by status: New, Quoted, Approved, Booked, Completed, Lost
- Sort by date received, oldest unanswered first by default
- Each row: date, name, registration, derived make/model, number of panels selected, photo count, status
- Search by name, registration, or phone
- Bulk action: mark as lost - stale enquiries need to be clearable or the list becomes noise and stops being checked

### `/admin/enquiries/[id]` - Detail

The most important screen in the build. Everything the customer submitted, on one page, readable on a phone.

- **Vehicle:** registration, make/model/year/colour derived from the DVLA lookup, body type the customer selected
- **Damage:** the SVG diagram re-rendered with the selected panels highlighted, so the client sees the same picture the customer drew. Below it, a list per panel: panel name, damage type, severity, the customer's note, and their photos as tappable thumbnails
- **Customer:** name, phone (tap to call), email, WhatsApp link, preferred dates, marketing consent status
- **Actions:**
  - Send estimate - amount or range, free-text note, optional validity period. Generates the customer email/message
  - Change status
  - Add internal note, timestamped, never visible to the customer
  - Download all photos as a zip
- **Activity log** down one side: submitted, viewed, estimate sent, estimate viewed, approved, booked. Useful for chasing and for disputes.

### `/admin/customers` - Records (2b onwards)

Only exists once accounts exist. List and detail view: contact details, saved vehicles, enquiry history, repair history. No editing of customer-owned data by the client beyond correcting a typo in a phone number - it is their record.

### `/admin/settings`

- Notification email addresses for new enquiries
- The stated response time shown on the quote form (currently same day - one place to change it)
- **Shop visibility toggle:** a simple on/off switch that controls whether the Shop tab appears in navigation, plus a choice of "coming soon" or "live". This is the requested "add a shop button for the future" - a feature flag, not a build. Ten minutes of work now, and it means the client can reveal the shop himself when the phase arrives without a support ticket
- Holiday / closure notice banner - toggle plus a line of text, shows site-wide

### Notifications - not optional

A dashboard is a record, not a prompt. If the client has to remember to log in, enquiries will sit unanswered and the same-day response promise on the form becomes a liability.

Every new enquiry fires an email and, if the API is worth the setup, a WhatsApp message, both containing enough detail to triage without logging in and a direct link to the enquiry. The dashboard is where he acts; the notification is what makes him act.

---

## Customer dashboard

Route: `/account`.

### Three decisions worth taking now

**1. No account required to get a quote.** The quote form stays completely public and anonymous. Forcing registration before someone can ask for a price will cost a meaningful share of enquiries, and the target visitor is standing next to a damaged car on their phone.

The original brief had the estimate gated behind account setup - "finish setting up your account to view your estimation." Recommend against it. Send the estimate directly by email and WhatsApp, in full, and offer the account as a convenience: *"Want to keep this and your vehicle details in one place? Set up an account."* An estimate the customer has to jump through a hoop to read is an estimate that gets ignored while they ring the garage down the road.

**2. One-time code sign-in, no passwords.** The customer enters their email and receives a 6-digit code. No passwords stored, no reset flow, no forgotten-password phone calls to a one-man business, and a much smaller security surface.

**Code, not magic link.** Same underlying mechanism in Supabase and the same security factor - control of the inbox - but the link version has two failure modes that matter for this audience:

- Tapping a link inside a mail app signs the person in to that app's embedded webview. They return to their normal browser and are still signed out, with no explanation.
- Corporate mail scanners pre-fetch links and consume the single-use token before the recipient clicks. Relevant for fleet and trade customers on managed inboxes.

A code keeps the person in the tab they started in. In Supabase this is the email template rendering the token rather than the confirmation URL - a template change, not an architecture change.

**Add Continue with Google alongside it.** Free, no round trip through the inbox, and most UK users are already signed in on Android or in Chrome. Crucially it returns a **verified** email, which keeps the enquiry-linking design below intact.

Supabase automatically links identities that share the same verified email address to a single user, so someone who signs up by code and later uses Google lands in the same account rather than a duplicate. It deliberately will not auto-link against an unverified email, since that would allow pre-account-takeover. Both routes here produce verified emails, so this works - but test it explicitly rather than assuming.

**Providers assessed:**

| Provider | Verdict | Reason |
| --- | --- | --- |
| Google | Yes | Highest coverage, verified email, zero cost, minimal setup |
| Apple | Not for v1 | See below |
| Facebook | No | Meta app review and business verification for a shrinking share of users, email is not guaranteed to be returned, and it adds Meta as a data recipient in the privacy policy for very little |
| SMS OTP | Removed | Per-message cost and a provider to maintain, for a factor that adds nothing over email here |

**Why Apple is a problem specifically for this project.** Sign in with Apple offers Hide My Email, which gives you a `@privaterelay.appleid.com` address instead of the real one. That breaks matching an account to an earlier anonymous enquiry, and it means every quote, booking confirmation and MOT reminder has to travel through Apple's relay - which requires registering the sending domain with Apple first, or the mail simply does not arrive. For a business that will also be phoning and WhatsApping the same customer, an address the client cannot actually use is a liability. Note that Apple's rule requiring Sign in with Apple where other social logins are offered applies to App Store apps, not websites, so there is no obligation here.

**On requiring a password.** Still recommend against it, and Google makes the case weaker rather than stronger. The one real argument for passwords was speed of repeat sign-in without waiting on an email - Google solves that instantly and for free. What a password would add is credential storage, a reset flow, credential-stuffing exposure, and support calls to a one-man business, for a portal most customers open twice a year and would need to reset every time anyway. A reset is an emailed one-time code with extra steps.

If it ever becomes necessary, Supabase supports adding email-and-password to an existing OAuth account after the fact, so this is not a door being closed. It just should not be in v1.

**Configuration that needs setting explicitly:**

- **Replace Supabase's built-in email sender.** It is rate-limited to a handful of messages per hour and is not intended for production. Wire in Resend, Postmark or SES before launch or codes will silently stop arriving.
- **Shorten the OTP expiry** to around 10 minutes. The default is longer than it needs to be.
- **Turnstile on the request-code form**, so the email quota cannot be burned by repeated requests.
- **Tighten `rate_limit_otp` and `rate_limit_email_sent`** in the Supabase auth rate limit settings.
- **Add Google as an OAuth provider** in Supabase auth settings, and name Google in the privacy policy as a recipient.
- **Long customer sessions - 30 to 60 days.** Someone using this twice a year should not re-authenticate every visit. The admin session is the opposite: short, with TOTP on top.

**3. Request a date, do not build a live booking diary.** The client has no garage management system, so there is no source of truth anywhere about workshop capacity. A calendar showing real bookable slots would be inventing availability, and the first double-booking will do more damage to trust than the feature is worth. Customers pick two or three preferred dates; the client confirms manually from the admin side. Revisit only if he adopts a job management system.

### Pages

**`/account/sign-in`** - Continue with Google as the primary action, with email entry below it leading to a code entry screen in the same tab. Resend option with a visible cooldown.

**`/account`** - Home. Anything currently needing attention: an estimate awaiting a decision, a confirmed booking date, an MOT expiring soon. Below that, vehicles and recent activity. This screen will be near-empty for most customers most of the time - which is the honest problem with a portal for accident repair, and the reason 2c matters.

**`/account/vehicles`** - List, with an add-vehicle flow driven by registration lookup: enter the reg, the DVLA APIs return make, model, year, colour, fuel type, MOT expiry and MOT history. One field in, most of a vehicle record out. Manual entry as a fallback for anything the lookup misses.

**`/account/vehicles/[id]`** - Vehicle detail: the derived data, repair history with Tygrify, photos from past jobs, MOT expiry, and space for documents. This is the seed of the virtual garage concept, and it is the only part of the customer area with a genuine reason to be revisited.

**`/account/quotes`** and **`/account/quotes/[id]`** - Estimates received, with status. Detail view shows the damage diagram as submitted, the panels, the photos, the estimate and any notes from the client, and two clear actions: accept and request booking, or decline. Accepting moves the enquiry along in the admin pipeline and triggers the date request.

**`/account/repairs`** - Booked and completed work. Status, dates, and photos of the finished job where the client uploads them.

**`/account/details`** - Name, email, phone, marketing preferences, and account deletion (detailed below). **No address field in phase 2** - it is not needed until the shop is real, and collecting personal data with no current purpose is the wrong side of UK GDPR data minimisation. Add it with the shop.

#### Account deletion - right to erasure

Self-service, in settings, not a "email us to request deletion" line. Under UK GDPR the request has to be actioned within a month anyway, so a manual route just creates an obligation the client will miss.

**Flow:** Delete my account → plain-English explanation of what goes and what stays → re-authenticate with a fresh one-time code (proves it is the account holder, not someone on an unlocked phone) → confirm → immediate action, with a confirmation email sent afterwards.

**What is actually deleted:**

| Data | Action | Why |
| --- | --- | --- |
| Supabase auth user | Hard delete | No reason to retain |
| Name, email, phone, marketing prefs | Hard delete | Personal data, no residual purpose |
| Saved vehicles and registrations | Hard delete | A reg identifies a keeper - personal data |
| Uploaded photos, original and redacted | Hard delete from storage | Includes both buckets, see below |
| Enquiry and job records | Anonymise, do not delete | Replace personal fields with a null-ish placeholder, keep dates, service type, panels, and amounts |

Anonymising rather than deleting the job records is defensible: the client has a legitimate interest in keeping a record of work carried out, plus statutory retention on anything with a financial element. Erasure is not absolute where another lawful basis applies - but the record must genuinely no longer identify anyone, so vehicle registration has to be stripped too, not just the name.

**Two things to get right:**

- Deletion has to reach Supabase Storage, not just the database rows. Deleting a row that points at an object leaves the object sitting in the bucket. Write it as a single transaction or an edge function that does both, and test it by checking the bucket afterwards.
- Marketing suppression. If someone has unsubscribed and then deletes their account, wiping the record entirely means they can be re-added later from a different route. Keep a hashed email in a suppression list, and say so in the privacy policy.

Log the deletion - timestamp and the anonymised record ID, nothing identifying. That is the evidence the request was actioned.

**`/account/rewards`** - Phase 3, not now.

---

---

## Technical stack

### Supabase - auth, database, storage

Good fit for this build. Magic-link auth is native, Row Level Security removes most of the "did I remember to check ownership on this endpoint" class of bug, and storage sits next to the database so a delete can cover both.

**Set the project region to EU (London or Frankfurt).** Region is fixed at project creation and cannot be changed afterwards without a migration. Getting this wrong means an awkward conversation about international transfers in the privacy policy for no benefit.

**Row Level Security on every table, no exceptions.** A customer reads only rows where `user_id = auth.uid()`. The admin role reads everything. Write the admin policy against a role claim, not a hardcoded email.

**Storage buckets are private by default and stay that way.** Enquiry and account photos are served through signed URLs with a short expiry, never a public bucket. The only public bucket is the marketing gallery, and nothing lands there without a human approving it.

**Anonymous enquiry submission.** The quote form has no logged-in user, so the insert cannot go through a normal authenticated client. Route it through an edge function using the service role, and validate server-side. Never expose the service role key to the browser.

**Linking an anonymous enquiry to an account later.** Store enquiries with an email and a null `user_id`. When someone signs in with a matching email, backfill `user_id` on their enquiries. This is safe specifically because one-time-code sign-in proves control of that email address - it would not be safe with password auth and no verification step.

**Admin account creation must be closed.** Disable public sign-up for the admin role, or you have an open registration endpoint attached to every customer record on the system. Allowlist the owner's email and grant the role manually.

**Enable TOTP MFA on the admin account.** Supabase supports it natively and it is the single highest-value control on that login.

### hCaptcha - one correction

hCaptcha is bot protection, not rate limiting. They solve different problems and you want both.

- **Rate limiting** is already there: Supabase Auth enforces rate limits on authentication endpoints using a token bucket per IP, returning 429 when exceeded, and several of the limits are configurable in the dashboard under Authentication > Rate Limits. Tighten these rather than building your own.
- **Captcha** is a toggle: Supabase has native support for hCaptcha and Cloudflare Turnstile on sign-in, sign-up and password reset, configured under Authentication > Bot and Abuse Protection. Cheap to switch on.

Two things worth reconsidering:

**Turnstile over hCaptcha for the admin login.** hCaptcha frequently shows an interactive challenge. This is a login the owner uses every day, on a phone, in a workshop - a picture puzzle between him and his enquiries is friction on the one person who has no choice but to get through it. Turnstile is usually invisible and does the same job here.

**The captcha is more useful on the public quote form than on the admin login.** That form is anonymous, accepts file uploads, and triggers email and a paid third-party API call per submission - it is the abusable endpoint. The admin login is one allowlisted account behind MFA. Note that Supabase's built-in captcha covers auth routes only, so for the quote form you verify the token yourself inside the edge function before accepting the submission.

### Plate Recognizer - number plate redaction

Right instinct, and it lines up neatly with what the client already asked for. Worth being precise about which product and where it runs.

**Use Blur, not Snapshot.** Snapshot reads plates and returns text. Blur is a separate product that forwards the image to Snapshot, then uses the returned bounding box to blur the plate, and it handles faces as well - relevant for workshop and team photos.

**Blur can overlay a logo instead of blurring.** The product supports placing your own logo over the plate, adjustable blur level, ignoring plates matching a pattern, and ignoring plates where no vehicle was detected. That is exactly the client's instruction on the discovery pack - cover every plate with a Tygrify plate rather than blurring. Produce a UK-proportioned Tygrify plate PNG and use it as the overlay asset. Set the region config to `gb` for UK plate detection.

**Cloud versus on-premise is a data protection decision, not just a cost one.** The on-premise SDK runs inside your own environment with no images sent to Plate Recognizer, which removes the third-party processor entirely. The cloud API is far less setup, but unredacted customer photos leave your infrastructure - so Plate Recognizer becomes a processor, needs naming in the privacy policy, and needs a DPA and a look at where their processing happens. For this volume cloud is probably the sensible commercial call, but make it deliberately and do the paperwork.

**Pipeline - order matters:**

1. Upload lands in a **private quarantine bucket**. Never served, no signed URLs issued, admin cannot browse it.
2. An edge function or background job sends it to Blur.
3. The redacted version is written to the **serving bucket** and linked to the enquiry.
4. The original is deleted from quarantine, or auto-expires on a short lifecycle rule (30 days is a reasonable ceiling) to allow a re-run if detection failed.

**Do not block form submission on the API call.** Someone may attach eight photos. Accept the upload, confirm to the customer immediately, redact asynchronously. Photos show as "processing" in the admin view until done.

**Handle the failure case explicitly.** If the API is down or a plate is missed - reflections, angled shots, a second vehicle in the background - you need a queue with retries and a visible failure state, plus a manual redaction tool on the admin side. An automated pipeline that silently fails open is worse than no pipeline.

**Two different standards, and this is the important one:**

| Where | Risk | Rule |
| --- | --- | --- |
| Enquiry photos - private, admin only | Low. The client has the registration from the form field anyway | Redact, but a miss is not a breach |
| Gallery photos - public | High. A missed plate on a public page is a live personal data exposure | Never auto-publish. Human review and approval before anything goes live, every time |

Automated redaction reduces the manual workload on the gallery. It does not replace the review step.

---

## Things that need deciding or resolving

**Platform for the public site and CMS.** The CMS/bespoke split above depends on it. Supabase covers the application layer but not the content editing the client asked for, so this is still open. Nothing here can be estimated properly until it is fixed.

**Photo retention period.** Separate from account deletion - how long do enquiry photos live for an enquiry that never converts? Pick a number, put it in the privacy policy, and enforce it with a scheduled job rather than intent.

**Plate Recognizer commercial terms.** Blur is a paid add-on and requires the feature enabled on the account. Confirm pricing at expected volume, and whether the on-premise SDK licence is affordable enough to make the data protection question moot.

**Adoption.** The whole thing depends on the client actually using it. Worth an honest conversation before the build: if his current process is a phone and a notebook, a dashboard he ignores is worse than no dashboard, because the site is publicly promising a same-day response against it.

**Reg lookup coverage.** DVLA vehicle enquiry and MOT history APIs need registration and have usage terms - check these before committing to the reg-lookup flow, in both the quote form and the vehicle add.

---

## Loyalty / XP - note for later

Left out on purpose, consistent with the existing scope decision. Two things to keep in mind so phase 3 is not blocked by phase 2 choices:

- The data model should record every completed job against a customer with a service type and a date. That is enough to build almost any loyalty mechanic later without a migration.
- The commercial question is still open and still needs answering before anything is built: the client should say whether he wants retention, referrals, or novelty. Rewarding repeat visits works for valeting, detailing, alloys and coatings. It reads badly against accident repair, where the reward is for having crashed again.

The MOT and service reminders in 2c are likely to deliver more repeat work than any points system, at a fraction of the cost. Worth putting that to him as the alternative rather than as a delay.
