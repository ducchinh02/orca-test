# Review: Mộc Sương Atelier landing page

**FINAL verdict (round 3): APPROVED**: 3/3 items FIXED · 0 Blocker · 0 Major · 0 Minor · 0 Nit · no regressions

Every finding across the three rounds (R1–R5) is closed. No new findings were raised.

## Round 3 verification (final)

**Date:** 2026-10-07. This was a narrow, read-only check of `index.html`, `css/styles.css` and the §5.10 line of `docs/design-spec.md`.

I ran headless Chrome 154 over DevTools Protocol, using a fresh browser for each suite. I compared the current files side by side with the round-2 build taken from commit `3f6337c`.

### The three items

| Item | Status | Evidence |
|---|---|---|
| **R5** Header call button jump | **FIXED** | `css/styles.css:878` adds `min-width: calc(2 * var(--tap-min) + 4px)` to `.site-header__actions`.<br>• **Shifts:** I used the round-2 method: 10 cold loads at 375 (cache off; 7 at 4× CPU, 3 unthrottled). Header shifts: **0/10**. The round-2 build reproduced the bug at 1/10.<br>• The only shifts left (0.0055) come from the hero font swap and have been there since round 1.<br>• **Geometry with JS:** logo, actions, call, toggle, CTA, phone and header height are **identical to round 2** at 320, 375, 1024 and 1280.<br>• **Without JS at 375:** the call button now sits at its final position (267–311px; round 2 had it at 315–359px).<br>• Lighthouse reports CLS **0**, with no `layout-shifts` items. |
| **N1** Product select label | **FIXED** | `index.html:824` and spec §5.10 line 805 now read "Nhờ tư vấn". Measured text vs space available:<br>• 320: 83.7/174px<br>• 375: 84/229px<br>• 768: 86/236px<br>• 1024: 87.5/153px<br>• 1100: 88/175px<br>• 1140: 88/187px<br>• 1440: 89/227px<br>The label is fully visible at every width; screenshots at 320, 1024 and 1100 confirm it. |
| **N2** "Tết Nguyên đán" tile | **FIXED** | `index.html:532` is `Tết Nguyên&nbsp;đán`.<br>• At 320 it renders "Tết / Nguyên đán", so "Nguyên đán" stays on one line (screenshot). At 375, 768 and 1024 it fits on one line.<br>• No overflow, and tile and row heights are unchanged. The accessible name still reads "Tết Nguyên đán".<br>• Filter output is byte-identical to round 2.<br>• Clicking the Tết tile still sets the occasion to `tet` ("Tết Nguyên đán"), flashes the field and navigates to `#dat-hoa`. |

### Change containment

`git diff` against `3f6337c` (the committed round-2 state) shows **exactly the three edits** (4 insertions, 3 deletions):

- `css/styles.css`: +1 line
- `index.html`: 2 lines
- `docs/design-spec.md`: 1 line

The committed byte sizes equal the round-2 files I verified (66 841 / 48 405 / 15 317 / 108 142 B). Reverse-applying the three edits gives files **string-identical to HEAD**, and `js/main.js` is untouched.

### Regression essentials

| Check | Result |
|---|---|
| Horizontal overflow, 320–1440 | None: `scrollWidth == clientWidth` at 320, 375, 768, 1024, 1280 and 1440. Grids, page heights and touch targets are the same as round 2. |
| Console | 0 errors and 0 warnings in every run |
| #13 Mobile menu | Pass, identical to round 2. The only difference is the skip link's measured position partway through its 150ms slide-in (top 7px vs 0px); the skip-link code did not change this round. |
| #17 Filter, #18 Prefill | Output byte-identical to round 2 (counts 6/3/3/2/1, exact status strings, all prefill paths) |
| #27 No JS | Identical to round 2 at 375 and 1280 |
| axe-core 4.10.2 | 0 violations at 375 and 1280 |
| Nu validator 26.10.6 (local) | `index.html` and `styles.css`: "No errors found" |
| Lighthouse 12.8.2, mobile (1 run) | Accessibility 100 · Best Practices 100 · SEO 100 · **CLS 0** (Performance 92, LCP 2.7 s) |

### Notes

These are not findings. The pre-existing spec-owner notes stay as recorded and are not re-raised: O3, and N2's "viết / tay" split at 1024.

---

**Round 2 verdict (history): APPROVED**: all 7 polish items FIXED · 0 Blocker · 0 Major · 0 Minor · 1 Nit (R5, fixed in round 3)

## Round 2 verification (polish round 1)

**Date:** 2026-10-07. Read-only check of `index.html`, `css/styles.css`, `js/main.js` and the three new notes in `docs/design-spec.md`.

**Method:** Headless Chrome 154 driven over DevTools Protocol, using the same scripts as round 1 and a fresh browser for each suite. I also rebuilt the **exact round-1 files** in a scratch folder by reverse-applying the seven edits; their byte counts match round 1 (see "Change containment"). That allowed old-vs-new runs side by side, so anything new could be traced to its cause.

### The seven items

| Item | Status | Evidence |
|---|---|---|
| **R1** No-JS menu toggle | **FIXED** | `index.html:135` now has `hidden`, and `js/main.js:52` runs `toggle.hidden = false;`. With JS off at 375 the toggle has `hidden` and `display:none` while the call button still shows. With JS on at 375 it is visible at 44×44 and the whole menu suite passes; at 1280 it is `display:none`. The no-JS run at 1280 is identical to round 1. **Side effect → R5.** |
| **R2** Date-picker focus ring | **FIXED** | The rule at `css/styles.css:653-657` matches what I specified. Tabbing to the 4th date stop (Chrome's picker button): the host matches `:focus-within` and computes `outline: solid 2px rgb(47,74,58)`, offset 2px. In round 1 it computed `none`. The screenshot shows the forest ring on the field; Chrome's own small icon ring remains, as expected. The full focus sweep now finds 0 off-brand stops at 375 and 1280 (round 1: 1). |
| **R3** Skip link while menu open | **FIXED** | `js/main.js:55` adds `$('.skip-link')` to the inert list. With the menu open, `.skip-link.inert` is true. Shift+Tab from the first menu link goes toggle → call → logo → wraps to the last menu link, so the skip link is skipped. It is restored (`inert` false) on **all four** close paths: toggle, Esc, menu link and resize to 1100. On a fresh load it is still the first Tab stop and Enter still moves focus to `#noi-dung`. |
| **R4** Balanced short labels | **FIXED** | `css/styles.css:1204` and `:1437` compute `text-wrap: balance`.<br>• 375: "Tình yêu / & Kỷ niệm" (round 1: "Tình yêu & Kỷ / niệm").<br>• 1024: "Thiệp viết / tay miễn phí" and "Duyệt ảnh / trước khi giao" (round 1: "…miễn / phí", "…khi / giao").<br>No orphans remain at 375 or 1024, and page heights are unchanged at all six widths. |
| **O1** Shorter product-select label | **FIXED** | `index.html:824` is "Nhờ Mộc Sương tư vấn", with the spec updated at §5.10 line 805.<br>• Measured text vs space available: 175/229px at 375 and 185/227px at 1440, so the label is fully visible (screenshots).<br>• It also fits at 320–1023 and at ≥1152.<br>• **Residual:** at 1024 to about 1140px the last word ("vấn") still clips, by up to 29px. Round 1 clipped there by 136px, so this is pre-existing and smaller. It is outside the requested 375/1440 check; see N1. |
| **O2** Loading-state opacity | **FIXED** | `css/styles.css:395-399` adds `.btn.is-loading { opacity: 0.75; cursor: progress }` after the disabled rule, so it wins while loading. The spec note is at §5.0 line 379.<br>• Measured while loading: opacity 0.75, `aria-disabled="true"`, focus kept, cursor `progress`.<br>• Contrast of "Đang gửi…" over the white card is **4.55:1**, up from 2.79:1 and passing AA's 4.5:1.<br>• A test button with `aria-disabled` only, and one with real `disabled`, both stay at **0.55** with `not-allowed`.<br>• Opacity returns to 1 after success. |
| **O4** Hero `q=65` | **FIXED** | `index.html:203-206`: all 4 hero URLs (`src` and 3 `srcset` candidates) use `q=65`. The other 46 photo URLs, including the process `<source>`, stay at `q=75`. og:image, twitter:image and JSON-LD stay at `q=80`. The spec note is at §3.2 line 231.<br>The browser fetched `q=65&w=1200&h=1500` at DPR 3. Hero transfer dropped from 53 to 48–49 KB. Under applied throttling (slow 4G, 4× CPU, no cache, 5 alternating runs) median **real LCP fell from 1304 to 1168 ms (−10%)**. |

### Change containment

The files are untracked, so there is no git diff. Instead, I reverse-applied exactly the seven intended edits to the current files. That reproduces the round-1 files **to the byte and line**:

- `index.html`: 66 851 B, 975 lines
- `js/main.js`: 15 273 B, 413 lines
- `css/styles.css`: 48 026 B, 2 191 lines

Each edit string matched exactly the expected number of times (1 or 4), so nothing else in the code changed.

In `design-spec.md` the three notes are where expected: §3.2 line 231 (a new line; the file went from 1 253 to 1 254 lines), §5.0 line 379 and §5.10 line 805. There is no round-1 byte baseline for the spec, but every static diff that reads it still passes.

### Regression results

| Check | Round 2 result | vs round 1 |
|---|---|---|
| Static diffs | `:root` and sprite verbatim, favicon decodes identical, 28 `<head>` lines in order, JSON-LD is Florist, 12/12 image slots (ID, alt, fallback, `sizes`, and `q` per the updated §3.2). Copy diff: the same 21 parser artifacts plus the spec's own new O2 annotation; the old option text is gone. No color literals outside `:root`, no inline styles or handlers, `!important` only where the spec mandates it (6), and breakpoints unchanged. | Identical except the 7 intended items |
| #14, #15, #16 at 320, 375, 768, 1024, 1280, 1440 | `scrollWidth == clientWidth`, 0 targets under 44px, grid matrix, stagger, sticky process image, aspect ratios, 12/12 images, 3 hosts, 0 console output | Identical metrics, including page heights |
| #10 Skip link | First Tab stop; Enter moves focus to `#noi-dung` | Identical |
| #13 Mobile menu | `aria-expanded` and label flip, focus to first link, `main` and `footer` inert, scroll lock, Esc returns focus, panel hidden after 400ms, link click lands at 80px, resize to ≥1024 closes | Identical, plus R3 |
| #17 Filter, #18 Prefill | Counts 6/3/3/2/1, exact status strings, Space key, all prefill paths including Chia buồn → Tĩnh Tại | Output byte-identical to round 1 |
| #19–#22 Form | 4 exact errors, live recount, all phone vectors, date rules including the 16:00 cutoff, loading keeps focus, success text, reset, no network or storage | Every key identical to round 1 |
| #25 Image fallback | 12/12 `.is-error`, 0 visible images, page height 10 120px | Identical |
| #26 Reduced motion | Nothing hidden or transformed, `scroll-behavior:auto`, no hero animation, menu hides immediately | Identical |
| #27 No JS | All content visible, filter hidden, noscript note shown | Identical except the toggle is now hidden (R1, intended) |
| #28 Focus ring | 47 stops at 375 and 52 at 1280, same order; all forest or sand, 0 clipped | 0 off-brand (round 1: 1); the only change is the new option label text |
| axe-core 4.10.2 | 0 violations at 375 and 1280; the same 4 `color-contrast` "needs review" items | Identical |
| Nu validator 26.10.6 (local) | `index.html` and `styles.css`: "No errors found" | Identical |
| Lighthouse 12.8.2, mobile | A11y 100, BP 100, SEO 100. Perf over 3 runs: round-1 build 89/92/94 (median 92, LCP 3.15 s); current 89/90/89 (median 89, LCP 3.68 s). CLS 0.0007 in 2 of 3 runs, from `div.site-header__actions` (R5). | The Perf/LCP gap is simulation noise. The ranges overlap (2.95–3.67 s vs 3.55–3.68 s), the observed hero download is *shorter* on the current build, and real throttled LCP is 10% faster (O4 row). |

### New finding

#### R5: Nit. The header call button can jump 48px on first paint (side effect of R1)

- **Where:** `css/styles.css:874-878` (`.site-header__actions`), together with `index.html:135` and `js/main.js:52`.
- **What is wrong:** The toggle is now hidden in the HTML and un-hidden by the deferred script. If the first paint happens before `main.js` runs, the call button paints at the right edge and then jumps 48px left when the toggle appears (no-JS left edge 315px, with JS 267px). Frequency:
  - 1 in 6 cold loads at 375 with 4× CPU throttling, and 1 in 3 unthrottled.
  - The round-1 build had 0 in 6.
  - Lighthouse attributes CLS 0.0007 to `div.site-header__actions`.
- **Why it matters:** The CLS is far below the 0.1 "good" threshold. But it is a visible jump of the primary mobile call action on first paint, and this round introduced it.
- **Fix:** Add one declaration to the `.site-header__actions` block at `css/styles.css:874-878`:

  ```css
  .site-header__actions {
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: calc(2 * var(--tap-min) + 4px); /* reserve call + toggle so un-hiding the toggle moves nothing */
  }
  ```

  This reserves the 44 + 4 + 44px that the call button and toggle need below 1024. At ≥1024 the actions content is already at least 103px wide, so the rule has no effect there. Without JS it only leaves 48px of empty space to the right of the call button.

  I verified this in a scratch copy:
  - 0 shifts in 6 cold loads.
  - Header geometry identical to the current build at 320, 1024 and 1280.
  - No horizontal overflow.

### Notes for the design-spec owner

These are not counted in the verdict. All are pre-existing or within the spec.

- **N1 (O1 residual).** Between 1024 and about 1140px, the two-column form inside the 7-of-12 card leaves the select only 153–181px of text space. "Nhờ Mộc Sương tư vấn" needs about 182px, so "vấn" clips. Measured at 1024, "Chưa chọn mẫu" (127px) or "Nhờ tư vấn" (88px) would fit at every width.
- **N2 (wrapping outside R4's scope).** At 320 only, "Tết Nguyên / đán" still splits, exactly as in round 1. Balancing can't improve it. Writing `Tết Nguyên&nbsp;đán` would keep "Nguyên đán" together if that is wanted. At 1024 the balanced value title reads "Thiệp viết / tay miễn phí": no orphan, though "viết tay" is split.
- **O3** was intentionally not actioned and is not re-flagged.

---

## Round 1 review (history, unchanged below)

**Round 1 verdict: APPROVED**: 0 Blocker · 0 Major · 1 Minor · 3 Nit. All four were fixed in round 2.

The verdict rule is CHANGES REQUESTED only if a Blocker or Major exists. None does. The one Minor and three Nits below are optional polish, and each has a fix the Frontend agent can apply directly.

| | |
|---|---|
| Date | 2026-10-07 |
| Reviewed | `index.html` (976 lines), `css/styles.css` (2 192 lines, 48 026 B), `js/main.js` (414 lines, 15 273 B). There is no `assets/`, which is correct per §3.1.4. |
| Source of truth | `docs/design-spec.md` v1.0, including the §11 acceptance checklist |
| Mode | Read-only. Only this file was written. |

## How this was verified

The page was **rendered and exercised in a real browser**, not only read as code.

- **Rendering.** Headless Chrome 154, driven through the DevTools Protocol, at **320, 375, 768, 1024, 1280 and 1440 px**. I inspected viewport and full-page screenshots, and zoomed Vietnamese headings to 2× to check diacritic placement.
- **Interaction scripts.** Real keyboard input (Tab, Shift+Tab, Enter, Space, Esc), mouse clicks, viewport resize, `prefers-reduced-motion: reduce` emulation, JavaScript disabled, and `images.unsplash.com` blocked.
- **axe-core 4.10.2** (tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa and best-practice) at 375 and 1280: **0 violations**. Four `color-contrast` items came back as "needs review". They are text on `--color-ivory-glass` or over photos (badges and the order note); the underlying token pairs are all in §2.2.
- **Lighthouse 12.8.2, mobile**, against a local static server: **Accessibility 100 · Best Practices 100 · SEO 100**. Performance was 90 (LCP 3.6 s on simulated slow 4G, CLS 0, TBT 0 ms).
- **Nu HTML Checker 26.10.6**, a local `vnu.jar`, so no content left the machine:
  - `index.html` reports "Document checking completed. No errors found." (0 warnings).
  - `styles.css` validates with no errors.
  - I confirmed the harness reports errors on a deliberately invalid sample.
- **Console.** 0 errors and 0 warnings on load and through every interaction above.
- **Static diffs.**
  - The `:root` block (§2.1) and the SVG sprite (§3.5) are verbatim.
  - All 28 `<head>` lines (§9.1) are present and in order.
  - JSON-LD passes `JSON.parse` and is `@type: Florist`.
  - All 12 image slots match §3.3: ID, crop, `srcset`, `sizes`, alt and fallback.
  - 185 copy strings extracted from §5 all match. The only "misses" were spec annotations, or runtime templates that I verified live.
  - The phone and name test vectors from §7.8 behave as specified.

During testing, a few runs stalled because of headless-Chrome throttling and stale tabs. The browser process, not the page, was at 100% CPU. Every affected check was re-run in a fresh browser instance and passed. None of these stalls was a page defect.

## Acceptance checklist (§11)

| # | Item | Result | Evidence |
|---|---|---|---|
| 1 | Only `index.html`, `css/styles.css`, `js/main.js`, README, `docs/`; no `assets/`, no `package.json`, no third-party JS | PASS | `git status` shows only `css/ docs/ index.html js/` untracked; no `assets/` or `package.json`; only `js/main.js` is loaded (`index.html:35`) |
| 2 | External requests only to fonts.googleapis.com, fonts.gstatic.com, images.unsplash.com | PASS | Network log at all 6 widths contains exactly those 3 hosts. The JSON-LD/OG `mocsuong.vn`, social and Zalo URLs are links, not requests. |
| 3 | `lang="vi"`, UTF-8, viewport, exact title and description | PASS | `index.html:2,4,5,6,7`; byte-identical to §9.1 |
| 4 | OG and Twitter tags, §3.6 favicon, JSON-LD parses as Florist | PASS | `index.html:13-26`, `:28`, `:37-71`. The favicon is percent-encoded but decodes byte-identical to §3.6 (see deviation D1). |
| 5 | `styles.css` starts with the §2.1 `:root` block verbatim; no hex or `rgb()` outside `:root` | PASS | `css/styles.css:1-118` is verbatim; the grep finds 0 color literals after line 118 |
| 6 | Both fonts render all Vietnamese strings; no colliding diacritics | PASS | `document.fonts` reports Be Vietnam Pro 400/500/600 and Cormorant 500/600/500-italic loaded, and `fonts.check()` is true for "Mộc Sương Hỷ Sự Tĩnh Tại Đặt hoa". The 2× zoom of the H1 and H2s shows correctly placed stacked marks (ỗ, ộ, ê, ấ) with no collisions at `--lh-tight` 1.15. |
| 7 | Section order and ids per §4; every section has `aria-labelledby` | PASS | Runtime: `trang-chu → cam-ket → bo-suu-tap → hoa-ban-chay → theo-dip → cau-chuyen → cach-dat-hoa → danh-gia → dat-hoa`, each with `aria-labelledby` resolving to its H1 or H2 |
| 8 | All copy verbatim | PASS | Programmatic diff of §5 copy (H1, lead, 6 names and prices, 3 testimonials, labels, footer disclosure `index.html:969`), plus runtime strings for the filter status, form status, errors and success text |
| 9 | One H1, one H2 per section (values visually hidden), cards are H3, no skipped levels | PASS | Outline: H1 (`:183`), H2 `values-title` visually hidden (`:223`), H3s under each H2, footer column H2s; axe `heading-order` passes |
| 10 | Skip link is the first Tab stop, visible on focus, moves focus to `main` | PASS | First Tab is `a.skip-link` (`:103`), visible at top 12px on focus; Enter sets `activeElement` to `#noi-dung` and the hash to `#noi-dung` |
| 11 | Sticky header with fixed height; `.is-scrolled` after 8px | PASS | `is-scrolled` gives bg `rgba(250,247,242,.92)`, `backdrop-filter: saturate(1.4) blur(12px)`, hairline `#E3DACD` and a shadow. Height is identical before and after: 65px below 1024, 77px from 1024. That is `--header-h` plus the spec's 1px border; see O3. |
| 12 | Desktop: 5 links and CTA; phone at ≥1280; scrollspy `aria-current` with underline | PASS | Visible sets measured at 1024, 1280 and 1440. Scrollspy gives hero, values, testimonials and order nothing, and gives the five nav sections their own link (screenshot shows the underline). |
| 13 | Mobile menu: `aria-expanded` and label flip, focus to first link, `main` and `footer` inert, scroll locked, Esc returns focus, link click closes and navigates, resize to ≥1024 closes | PASS | All measured at 375: label "Đóng menu"/"Mở menu", focus on "Bộ sưu tập", `inert` true on both, `html` `overflow:hidden` (wheel did not scroll), Esc puts focus on the toggle, panel `hidden` after 400ms (immediately under reduced motion), link click lands on `#hoa-ban-chay` at 80px (scroll-padding), resize to 1100 closes |
| 14 | Every interactive element ≥44×44 at 375 | PASS | Automated sweep of all visible targets at 320, 375, 768, 1024, 1280 and 1440 finds 0 under 44px. Menu links are 343×56; contact links are ≥124×44. |
| 15 | `scrollWidth === clientWidth` at 320, 375, 768, 1024, 1440 | PASS | Equal at all of these, and also at 1280. The hero sprig extends past the viewport at 1024 and 1280 but is clipped by `.hero{overflow:clip}`. |
| 16 | Grid columns match §6.3, including the collections stagger and sticky process image | PASS | Measured column counts match every cell of the matrix. Stagger offsets at ≥1024 are `[0,64,0]`. `.process__media` is `position:sticky` at ≥1024. The process frame is 1.5 (3:2) below 1024 and 0.8 (4:5) from 1024; story 4:3 → 4:5 and collections 4:3 → 3:4 are confirmed. |
| 17 | Filter hidden without JS and visible with it; `aria-pressed` and check icon; counts 6/3/3/2/1; exact status sentence | PASS | Counts 3/3/2/1/6, check icon `display:block` when pressed, status e.g. "Đang hiển thị 3 mẫu hoa cho dịp Sinh nhật." and "Đang hiển thị tất cả 6 mẫu hoa."; Space key toggles; no-JS `.filter` is `display:none` |
| 18 | Prefill from occasion tile, product card and collection; "Chia buồn" filter plus Tĩnh Tại pre-selects the occasion | PASS | `chia-buon` with the `prefill-flash` animation, `bst-hy-su`, `nang-ha`; with the filter active and occasion empty, the result is `tinh-tai` plus `chia-buon` |
| 19 | Empty submit: 4 exact errors with icon, border and `aria-invalid`; status "…4 mục…"; focus on name | PASS | All 4 messages are exact, `aria-invalid="true"`, border `#B42318` plus inset 1px; status "Vui lòng kiểm tra lại 4 mục được đánh dấu."; focus `#order-name`; live recount to 3 after fixing the name |
| 20 | Phone validator vectors | PASS | 5 accepted and 5 rejected, exactly per §7.8 (tested both through the UI and directly against the regex) |
| 21 | Date min/max from local time; past, >90 days and today ≥16:00 messages | PASS | `min=2026-10-07`, `max=2027-01-05` (local). −1d, +91d and today at 17:00 give their exact messages; +90d and today at 09:00 are accepted. |
| 22 | Loading state about 900ms with focus kept; success with name and phone via `textContent`; `<b>Lan</b>` rejected; focus on heading; reset | PASS | "Đang gửi…", `aria-disabled="true"`, no `disabled`, focus kept, spinner animates; a second Enter is ignored. Success text uses the collapsed name and the trimmed phone. There is no `innerHTML` in `main.js`. Focus goes to `#order-success-title`. Reset empties the form, restores `0/200` and focuses `#order-name`. |
| 23 | No network on submit; no storage or cookies | PASS | 0 requests during submit; `localStorage`, `sessionStorage` and `document.cookie` are empty; `// TODO` at `js/main.js:337` |
| 24 | `<img>` has `width`, `height`, `decoding`, §3.3 alt; lazy except hero; `<picture>` art direction | PASS | 12/12 images; hero is `eager` with `fetchpriority=high` (`index.html:208`); `<picture>` at `:682-694` renders 3:2 below 1024 and 4:5 from 1024 |
| 25 | Blocked Unsplash: gradient plus sprig, no broken icons, layout unchanged | PASS | 12/12 `.media.is-error`, 0 visible `<img>`; page height 10 120px, identical to the unblocked run; screenshot shows the brand gradients and centred sprig |
| 26 | Reveal plays once; reduced motion shows everything, static, with instant anchors | PASS | `unobserve` after reveal. Under `reduce`: no `reveal-ready`, 0 hidden or transformed `[data-reveal]`, `scroll-behavior:auto`, hero animation none |
| 27 | No JS: all content visible, anchors work, filter hidden, `<noscript>` note shown | PASS | 0 elements at opacity < 1, `.filter` is `display:none`, the noscript note is visible, no overflow. One related gap is filed as **R1**. |
| 28 | Focus ring visible everywhere (forest on light, sand on dark), never clipped | PASS | Tab sweep of 48 stops at 375 and 53 at 1280: all `2px solid #2F4A3A` (light) or `#F0C38E` (story and footer), offset 3px (2px on inputs), 0 clipped by overflow ancestors. One sub-control exception is filed as **R2**. |
| 29 | Lighthouse mobile A11y, SEO and BP ≥95; axe 0 serious or critical | PASS | 100/100/100; axe 0 violations of any impact |
| 30 | Nu validator 0 errors; console 0 errors and 0 warnings | PASS | vnu 26.10.6 reports "No errors found"; console is empty across every run and interaction |

## Frontend's self-reported claims, checked independently

| Claim | Result |
|---|---|
| W3C Nu validator: 0 errors | **Confirmed.** Local vnu 26.10.6 shows 0 errors and 0 warnings for the HTML, and the CSS is clean. |
| axe: 0 violations | **Confirmed.** axe-core 4.10.2 shows 0 violations at 375 and 1280 (WCAG 2.0/2.1/2.2 A/AA and best-practice). |
| Lighthouse not run | **Run here.** Mobile: A11y 100, BP 100, SEO 100 (Perf 90). |
| 99-check headless suite | Not re-run, because the suite was not shared. Every behaviour it would cover was re-tested independently above. |

## Declared deviations: adjudication

| # | Deviation | Ruling | Reason |
|---|---|---|---|
| D1 | Favicon data URI encodes spaces as `%20` (`index.html:28`) | **ACCEPT** | `decodeURIComponent` of both strings is byte-identical, so the rendered icon is the same. Raw spaces in a URL attribute are a Nu error and would fail §11.30. This is equivalent and also valid. |
| D2 | `svg.hero__sprig` placed before `.media` so `figcaption` is the last child (`index.html:200`) | **ACCEPT** | The spec fixes no order inside the figure. HTML requires `figcaption` to be the first or last child. The sprig is `position:absolute; z-index:-1` inside an `isolation:isolate` figure, so its visual result is unchanged (verified at 1024, 1280 and 1440). |
| D3 | Mobile-menu CTA and contact list nested inside its `<nav>` (`index.html:144-173`) | **ACCEPT** | `#mobile-menu` sits outside header, main and footer, so leaving these outside a landmark trips axe `region` (best-practice). Keeping them inside the labelled mobile nav is a reasonable grouping: they are the panel's wayfinding and contact actions. Behaviour, styling and Tab order match §5.1. |
| D4 | `!important` on `[hidden]` and `.visually-hidden` (`css/styles.css:228,231`) | **ACCEPT** | §5.0 mandates both declarations verbatim. The only other `!important` uses are the §7.11 reduced-motion block (`:2186-2189`). |
| D5 | Reveal uses `threshold: [0, 0.15]` with a "taller than viewport" fallback (`js/main.js:134-139`) | **ACCEPT** | This is better than the spec. With `threshold: 0.15` alone, an element taller than about 6.7× the effective viewport (the viewport minus the 10% bottom root margin) could never reveal and would stay at `opacity:0` at high zoom or on short viewports. Normal elements still reveal at 15%, so behaviour is otherwise identical to §7.5. |
| D6 | `.section-head` is a `div`, not `<header>` | **ACCEPT** | The spec names only the class. §8.2 requires exactly one `header` element; measured count is 1. |
| D7 | `styles.css` is 48 026 B against a 40 KB target (10 285 B gzipped) | **ACCEPT** | §10 calls it a *target*. The overrun comes from one declaration per line, not bloat. The dead-selector sweep found only the spec-mandated `.media--3x4/3x2/4x3` utilities unused, and no duplicated rule blocks. At about 10 KB on the wire the user impact is nil. `main.js` is 15 273 B, within its ≤15 KB (15 360 B) target. |

## Findings

All four are optional under the verdict rule. They are ordered by severity.

### R1: Minor. Mobile menu toggle is a dead control without JavaScript

- **Where:** `index.html:135` (`button.nav-toggle` is rendered visible) and `js/main.js:48-51` (`initMobileNav`).
- **What is wrong:** With JS disabled at <1024px, the hamburger button is visible (`display:grid`, measured at 375) but does nothing, because `#mobile-menu` stays `hidden`. The page is still fully usable by scrolling, so checklist #27 passes.
- **Why it matters:** This is the progressive-enhancement principle the spec applies to the filter in §5.5 ("no-JS users never see dead controls"). A visible, labelled "Mở menu" button that does nothing is confusing, and screen readers announce it as a collapsed menu button that never expands.
- **Fix:**
  1. In `index.html:135`, add the boolean `hidden` attribute to the toggle: `<button class="icon-btn nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Mở menu" hidden>`.
  2. In `js/main.js`, immediately after `if (!toggle || !panel) return;` (line 51), add `toggle.hidden = false;`.
  3. No CSS change is needed: `[hidden]{display:none !important}` hides it before JS runs, and `.nav-toggle{display:none}` at ≥1024 still applies after it is un-hidden.
- **Verify:** With JS off at 375 there is no toggle. With JS on, the toggle shows and checklist #13 still passes.

### R2: Nit. The date field's calendar-button Tab stop loses the brand focus ring

- **Where:** `css/styles.css:644-647`; only `.field__control:focus-visible` styles focus.
- **What is wrong:** Chrome gives `<input type="date">` four Tab stops: day, month, year and the calendar-picker button. The first three get the forest ring. On the fourth, the host matches `:focus-within` but not `:focus` or `:focus-visible`. The field's ring and forest border disappear, and only Chrome's small blue default ring on the icon remains (screenshot verified).
- **Why it matters:** The ring is still visible, so WCAG 2.4.7 passes. But it is off-brand and inconsistent with §8.6, which asks for "forest on light sections" on every focusable element.
- **Fix:** Insert this rule directly after `css/styles.css:647`:

  ```css
  /* Chrome's date picker button is its own Tab stop; keep the brand ring on the field while it has focus. */
  input[type="date"].field__control:focus-within {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }
  ```

  I verified this in Chrome 154 by injecting the rule. The field shows the forest ring while the picker button is focused. Chrome's own icon ring cannot be restyled from author CSS and can stay.

### R3: Nit. The skip link stays tabbable while the mobile menu is open and leads nowhere

- **Where:** `js/main.js:54` (`const background = [$('main'), $('footer')]…`).
- **What is wrong:** With the panel open, Shift+Tab from the first menu link reaches toggle, call, logo, then the skip link. Activating it sets the hash to `#noi-dung` but cannot focus the inert `main`, so focus drops to `<body>`. The menu stays open and `main` stays inert (measured).
- **Why it matters:** §7.2 intends focus to be contained to the header and panel while the menu is open. A keyboard user who activates the skip link from the panel loses their focus position.
- **Fix:** Change `js/main.js:54` to `const background = [$('.skip-link'), $('main'), $('footer')].filter(Boolean);`. The existing `setExpanded()` then makes the skip link inert while the menu is open and restores it on close. No other change is needed.

### R4: Nit. Orphaned last words in short wrapped labels

- **Where:** `css/styles.css:1194` (`.value__title`) and `:1423` (`.occasion__name`).
- **What is wrong:** At 375, the occasion tile "Tình yêu & Kỷ niệm" breaks as "Tình yêu & Kỷ / niệm" (`index.html:518`). At 1024, the 4-column value titles break as "Thiệp viết tay miễn / phí" and "Duyệt ảnh trước khi / giao" (`index.html:242`, `:249`). The broken lines visibly split one-syllable words from their compound ("miễn phí", "Kỷ niệm"), which looks unpolished in an otherwise editorial layout.
- **Fix:** Add `text-wrap: balance;` to both rules:
  - `.value__title { font-size: var(--fs-300); text-wrap: balance; }`
  - In the `.occasion__name { … }` block at `:1423`, add `text-wrap: balance;`.

  This doesn't conflict with the spec: §2.3 already uses `balance` for H1 and H2.

## Notes per review dimension

- **Visual quality.** It reads as premium and editorial.
  - Warm ivory and paper bands alternate with a single dark forest pause in the story section.
  - Cormorant headings sit over a calm Be Vietnam Pro body. The tall circumflex is Cormorant's own design and renders correctly.
  - The arched hero has an overlapping caption card. Collections use a 64px editorial stagger.
  - Radii are consistent: 12px for cards and media, 20px for the form and delivery cards, pills for buttons and chips. Shadows stay soft.
  - Spacing follows the 4px scale and the section rhythm is even. Product crops are uniform 4:5, and no image is distorted (`object-fit: cover` everywhere).
  - Hover, active and focus states exist for every component in §5.0, and hover is gated behind `@media (hover:hover)`.
- **Accessibility.**
  - Landmarks are correct: 1 header, 2 labelled navs, 1 main, 1 footer.
  - There is a single H1 and the outline has no skipped levels. `lang="vi"`, the skip link works, and alt text is in Vietnamese at ≤125 characters.
  - The filter is announced through a live region, form errors are tied in with `aria-describedby`, the status uses `role=status`, and focus is managed on error and on success.
  - Reduced motion is honoured, and every target is at least 44px.
  - Beyond R2 and R3 there are no gaps.
- **Responsive behaviour.**
  - Only the 480, 768, 1024 and 1280 `min-width` breakpoints are used.
  - Nothing overflows horizontally from 320 to 1440, the nav switches at 1024, and every grid collapses per §6.3.
  - The process section reorders cleanly below 1024 through `display: contents` and `order`, without duplicating markup.
- **Code quality.**
  - The markup is semantic, with no inline handlers. The only inline styles are the spec-allowed `--media-fallback` and the sprite wrapper.
  - There are no color literals outside `:root` and no globals: the code is an IIFE with `'use strict'`. There is no `innerHTML`, no `console`, and no storage.
  - Every module no-ops when its elements are missing. The script is `defer`, fonts use `display=swap`, images have dimensions and are lazy-loaded, the three hosts are preconnected, and CLS is 0.

## Observations for the design-spec owner

These are not Frontend defects and are not counted in the verdict. Each follows directly from the spec as written.

- **O1.** The product `<select>`'s default option "Chưa chọn — nhờ Mộc Sương tư vấn" is truncated in the closed control at every width: "…nhờ Mộc Sương" at 375 and "…Mộc Sươn" in the 2-column form at 1440. This comes from the spec's 48px right padding plus 16–17px text. Consider a shorter default label such as "Nhờ Mộc Sương tư vấn".
- **O2.** The mandated `opacity: 0.55` on `aria-disabled` buttons drops the loading label "Đang gửi…" to about 2.8:1 for roughly 900ms. WCAG exempts inactive controls, but this text is status information. Consider `opacity: 0.75` (still clearly dimmed) for `.is-loading`.
- **O3.** The header measures `--header-h` + 1px (65px or 77px) because §5.1 puts a 1px `border-bottom` on the header around an inner box of exactly `--header-h`. The mobile panel (`inset: var(--header-h) …`) therefore tucks 1px under the header. This is invisible, but worth knowing if anyone measures 64px or 76px.
- **O4.** Mobile LCP is 3.6s on Lighthouse's simulated slow 4G, and the LCP element is the Unsplash hero image. The page already does everything the spec allows: preconnect, `eager`, `fetchpriority=high`, and an image animation that never touches opacity. Any further gain would have to come from the spec, for example `q=65` on the hero URLs.
