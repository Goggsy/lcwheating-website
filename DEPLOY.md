# LCW Heating — Go-Live Guide

Static site. No build step, no framework, no dependencies. Deploys exactly as it is.

```
index.html                    Home
services/
  boiler-installation/
  boiler-servicing-and-repair/
  plumbing/
  central-heating/
  landlord-gas-safety/
  emergency-callouts/         Six service pages
privacy/                      Privacy policy (UK GDPR)
404.html                      Not-found page
robots.txt                    Search engine directives
sitemap.xml                   All 8 indexable URLs
site.webmanifest              App icons / add-to-home-screen
assets/
  style.css                   All styling (single shared file)
  main.js                     Menu, scroll reveal, form handling
  lcw-logo.png                Exact logo, transparent, dark backgrounds only
  velyntic-logo.svg           ⚠️ PLACEHOLDER — see step 1
  favicons, icons, og-image
```

---

## 1. Before you deploy — two things left

| # | Placeholder | Where | Action |
|---|---|---|---|
| 1 | `YOUR-WEB3FORMS-ACCESS-KEY` | `index.html` quote form | See step 2. |
| 2 | Company details | Footer (HTML comment marks the spot) | If LCW Heating is a limited company, the registered name and company number **must** appear by law. |

The Velyntic logo (real asset, "reversed" dark-background variant) and Luke's Gas Safe number (962607) are both now live across every page.

---

## 2. Make the quote form send

The site is static, so the form needs an endpoint. It is wired for **Web3Forms** — free, no server required.

1. Go to **web3forms.com** and enter `lcwheating@gmail.com`. They email an access key back.
2. Paste it into `index.html`:
   ```html
   <input type="hidden" name="access_key" value="PASTE-KEY-HERE">
   ```
3. Send a test enquiry once live and confirm it arrives.

The form has a honeypot spam trap, inline validation, a success state, and a failure fallback that shows the phone number and email if sending ever fails.

**Have Luke check the Gmail spam folder for the first enquiry** and mark it "not spam", or leads will quietly disappear into it.

---

## 3. Deploy: GitHub → Cloudflare Pages

**GitHub**
1. Create a repo, e.g. `lcw-heating`.
2. Upload the contents of this folder to the repo **root** (`index.html` at top level, not in a subfolder).

**Cloudflare Pages**
1. Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select the repo.
3. Build settings:
   - Framework preset: **None**
   - Build command: *(blank)*
   - Build output directory: `/`
4. Deploy. You get a `*.pages.dev` URL immediately — test everything there before pointing the domain at it.

---

## 4. Domain: Namecheap → Cloudflare

1. Buy the domain on Namecheap.
2. In Cloudflare, **Add a site**, enter the domain. Cloudflare gives you two nameservers.
3. In Namecheap: **Domain → Nameservers → Custom DNS**, paste in the two Cloudflare nameservers.
4. Propagation is usually under an hour (can take up to 24).
5. Cloudflare Pages → project → **Custom domains** → add `lcwheating.co.uk` and `www.lcwheating.co.uk`.
6. Set **SSL/TLS → Full (Strict)** and turn on **Always Use HTTPS**.

---

## 5. SEO — what is already built in

**Every page has:** a unique title and meta description written for local search intent, a single `<h1>`, correct heading hierarchy, canonical URL, Open Graph and Twitter cards with a 1200×630 share image, descriptive `alt` text, and explicit image dimensions (no layout shift).

**Structured data:**
- Home — `HVACBusiness` (phone, email, geo coordinates, opening hours, all 12 service areas, service catalogue), `FAQPage`, `WebSite`
- Each service page — `Service`, `BreadcrumbList`, `FAQPage`
- Every FAQ on the site is eligible to appear as a rich result in Google

**Six service pages** are the biggest ranking lever here. Each one targets its own search intent ("boiler installation Catterick", "landlord gas certificate Richmond") with roughly 500 words of genuinely useful copy, a process breakdown, and its own FAQs. A single-page site cannot rank for these terms; six pages can.

**Also:** mobile sticky call bar (the highest-converting element on any trades site), tap-to-call throughout, skip-to-content link, `prefers-reduced-motion` support, keyboard-accessible navigation, lazy-loaded below-fold images, and `fetchpriority="high"` on the hero logo.

**Deliberately excluded: review and star-rating schema.** Publishing invented reviews or ratings in schema breaches Google's guidelines and risks a manual penalty across the whole domain. Once real Google reviews exist, we add the section and the schema together.

---

## 6. After go-live

1. **Google Business Profile** — for a local trade this matters *more than the website*. Set it up at `google.com/business`: category "Heating Contractor", the same phone, email and service areas as the site, link to the domain, upload the logo and photos of real jobs. Google verifies by post.
2. **Google Search Console** — verify the domain, submit `sitemap.xml`, and confirm all 8 URLs get indexed.
3. **Reviews** — ask every satisfied customer for a Google review. For a new local trade this is the single biggest ranking lever that exists.
4. **Test the rich results** — paste each service URL into Google's Rich Results Test to confirm the FAQ and Service schema validate.

---

## 7. Known gaps, deliberately left

- **Real photography.** The site is logo and typography led, which works, but photos of Luke and his actual work would lift it more than any further code change.
- **Real reviews.** See above. The section and schema go in together, once they exist.
- **Gas Safe number and company details.** Blocking. Cannot go live without them.

---

## 8. A standing constraint worth remembering

The logo's snowflake, roof keylines and letter gaps are **transparent knockouts**. The mark is built for dark backgrounds and visibly breaks on white. That is why this site is dark-led throughout, and it is why the logo pack includes "on-black" plate versions for any light-background or print use. Do not place the transparent logo on a white surface.
