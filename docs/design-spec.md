# Mộc Sương Atelier — Landing Page Design Spec

**Version:** 1.0 · **Date:** 2026-10-07 · **Owner:** UI/UX Design · **Consumer:** Frontend implementer (no follow-up questions possible)

This spec covers a single-page, responsive landing page for a premium flower shop in Hà Nội. The page uses plain HTML5, CSS3 and vanilla JavaScript, with no framework, no build step and no npm.

## 0. How to read this spec

- **MUST** means required, and the reviewer will check it. **SHOULD** means strongly recommended. No item gives the implementer a choice between options: every value is final.
- Any text in a `copy` table or a quoted block is **exact user-facing copy**. Copy it character for character, including diacritics, the `₫` sign, en dashes `–` and middle dots `·`.
- Class names, IDs and `data-*` attributes in the DOM outlines are **normative**: JS and the review depend on them. The outlines show structure and are not final markup. Add wrappers only when layout needs them.
- Pixel values are CSS px. `rem` assumes the browser default root size of 16px. Never set `html { font-size }`.
- All brand facts are fictional: name, address, phone, social handles, people and the domain `mocsuong.vn`. The footer discloses this (§5.11).

---

## 1. Visual direction

| Item | Decision |
|---|---|
| **Brand name** | **Mộc Sương** (full form: *Mộc Sương Atelier*) |
| **Tagline** | **Hoa tươi mỗi sớm, trọn vẹn lời thương.** |
| **Hero promise (H1)** | **Mỗi bó hoa là một lá thư viết tay** |
| **Mood keywords** | Tinh tế (refined) · Mộc mạc (natural, unpretentious) · Thư thái (calm) · Thủ công (handcrafted) · Theo mùa (seasonal) |
| **Location** | Hà Nội, phố cổ. Same-day delivery in the inner city. |

**Rationale.** *Mộc* means simple, natural and honest, and *Sương* is the morning dew. Together they describe the brand ritual: florists choose stems at chợ hoa Quảng Bá at 5 a.m. and arrange them without fuss. The visual language follows that dawn. A warm ivory "giấy dó" paper sets the canvas, a deep leaf-green carries trust and action, and one dusty rose accent adds tenderness. Botanical line drawings are used sparingly. A high-contrast Garamond serif (Cormorant Garamond) gives headings the voice of a handwritten letter. It matches the H1 promise that each bouquet is a letter, and it stays literary rather than ornate. A sans designed for Vietnamese (Be Vietnam Pro) keeps body text, prices and forms perfectly legible with stacked diacritics. Layouts are editorial: asymmetric two-column compositions, generous whitespace, captions under photos instead of text over photos, and slow, short motion. The result should feel like a printed lookbook from a small atelier, not a discount marketplace.

**Don'ts:** no gradients on text, no glitter, no stock "sale" badges, no carousels that autoplay, no emoji in copy, no more than one accent color per component, no text placed over photographs (except the solid caption card in the hero).

---

## 2. Design tokens

### 2.1 Ready-to-paste `:root` block (MUST be the first rule in `css/styles.css`)

```css
:root {
  color-scheme: light;

  /* ===== Color — palette ===== */
  --color-ivory: #FAF7F2;          /* page background (default sections) */
  --color-ivory-glass: rgb(250 247 242 / 0.92); /* scrolled header bg, image badges */
  --color-paper: #F3EDE4;          /* alternate section background */
  --color-blush: #F6E7E2;          /* order (form) section background, prefill flash */
  --color-white: #FFFFFF;          /* cards, form card, inputs */
  --color-ink: #1E2A23;            /* primary text, headings */
  --color-ink-soft: #4B5650;       /* secondary text, body copy in cards */
  --color-ink-muted: #5F6862;      /* hints, captions, placeholders, meta */
  --color-forest: #2F4A3A;         /* brand primary: buttons, links, icons, dark section bg */
  --color-forest-deep: #1F3329;    /* hover of forest, footer background */
  --color-rose: #9C4257;           /* accent text: eyebrows, step numbers, quote marks, value icons */
  --color-rose-soft: #E9C9C8;      /* eyebrow text on dark backgrounds; decorative */
  --color-sage: #9DB09A;           /* decorative botanical strokes ONLY (never text) */
  --color-sage-tint: #E6ECE3;      /* fallback gradient start */
  --color-line: #E3DACD;           /* decorative hairlines, card borders */
  --color-line-strong: #8A877F;    /* form-control & chip borders (≥3:1 non-text contrast) */
  --color-line-on-dark: rgb(250 247 242 / 0.16); /* hairlines on forest / forest-deep */
  --color-on-dark: #FAF7F2;        /* text on forest / forest-deep */
  --color-on-dark-soft: #C7D1C9;   /* secondary text on forest / forest-deep */
  --color-error: #B42318;          /* error text, error borders */
  --color-error-bg: #FDEDEB;       /* form status (error) background */
  --color-success: #2B6A45;        /* success icon/text */
  --color-success-bg: #E7F2EB;     /* success panel icon halo */
  --color-focus: #2F4A3A;          /* focus ring on light backgrounds */
  --color-focus-on-dark: #F0C38E;  /* focus ring on forest / forest-deep */

  /* ===== Image fallbacks (shown behind every photo; visible if it fails) ===== */
  --fallback-rose: linear-gradient(160deg, #F6E7E2 0%, #EBCFCB 100%);
  --fallback-sage: linear-gradient(160deg, #E6ECE3 0%, #C9D6C6 100%);
  --fallback-sand: linear-gradient(160deg, #F3EDE4 0%, #E2D3BF 100%);

  /* ===== Typography ===== */
  --font-serif: "Cormorant Garamond", "Noto Serif", Georgia, "Times New Roman", serif;
  --font-sans: "Be Vietnam Pro", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

  /* Fluid scale: min @ 320px viewport → max @ 1280px viewport */
  --fs-100: clamp(0.8125rem, 0.7917rem + 0.1042vw, 0.875rem);  /* 13 → 14px  eyebrow, meta, hints */
  --fs-200: clamp(0.875rem, 0.8542rem + 0.1042vw, 0.9375rem);  /* 14 → 15px  small, nav, buttons, labels */
  --fs-300: clamp(1rem, 0.9792rem + 0.1042vw, 1.0625rem);      /* 16 → 17px  body */
  --fs-400: clamp(1.125rem, 1.0833rem + 0.2083vw, 1.25rem);    /* 18 → 20px  lead, prices, h3 (sans) */
  --fs-500: clamp(1.375rem, 1.3333rem + 0.2083vw, 1.5rem);     /* 22 → 24px  card titles (serif), quotes */
  --fs-600: clamp(1.5rem, 1.3333rem + 0.8333vw, 2rem);         /* 24 → 32px  h3 large (serif), stats, menu links */
  --fs-700: clamp(2rem, 1.6667rem + 1.6667vw, 3rem);           /* 32 → 48px  h2 */
  --fs-800: clamp(2.5rem, 1.8333rem + 3.3333vw, 4.5rem);       /* 40 → 72px  h1 */

  --lh-tight: 1.15;   /* h1, h2 — never lower: Vietnamese stacked diacritics (ỗ, ẫ, ặ) collide */
  --lh-snug: 1.3;     /* h3, card titles, quotes */
  --lh-body: 1.65;    /* paragraphs, lists */
  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --tracking-tight: -0.01em;   /* serif headings */
  --tracking-button: 0.02em;   /* buttons, nav */
  --tracking-eyebrow: 0.14em;  /* uppercase eyebrows */
  --measure: 62ch;             /* max line length for paragraphs */
  --measure-narrow: 44ch;      /* lead paragraphs, section intros */

  /* ===== Spacing (4px base) ===== */
  --space-1: 0.25rem;  /* 4  */
  --space-2: 0.5rem;   /* 8  */
  --space-3: 0.75rem;  /* 12 */
  --space-4: 1rem;     /* 16 */
  --space-5: 1.5rem;   /* 24 */
  --space-6: 2rem;     /* 32 */
  --space-7: 3rem;     /* 48 */
  --space-8: 4rem;     /* 64 */
  --space-9: 6rem;     /* 96 */
  --space-10: 8rem;    /* 128 */
  --section-space: clamp(4rem, 2.6667rem + 6.6667vw, 8rem); /* 64 → 128px vertical section padding */

  /* ===== Layout ===== */
  --container-max: 1200px;  /* max content width (excluding gutters) */
  --gutter: 16px;           /* container side padding — overridden per breakpoint below */
  --grid-gap: 24px;         /* column gap — overridden at ≥1024 */
  --header-h: 64px;         /* header height — overridden at ≥1024 */
  --tap-min: 44px;          /* minimum touch target */

  /* ===== Radii ===== */
  --radius-sm: 8px;    /* inputs, select, textarea, icon buttons' focus */
  --radius-md: 12px;   /* cards, images, tiles */
  --radius-lg: 20px;   /* form card, delivery card */
  --radius-pill: 999px;/* buttons, chips, badges */
  --radius-arch: 50% 50% 12px 12px / 40% 40% 12px 12px; /* true semicircular arch on a 4:5 box ONLY */

  /* ===== Shadows (warm ink-tinted, low) ===== */
  --shadow-sm: 0 1px 2px rgb(30 42 35 / 0.06), 0 2px 6px rgb(30 42 35 / 0.04);
  --shadow-md: 0 12px 28px -12px rgb(30 42 35 / 0.18);
  --shadow-lg: 0 28px 56px -20px rgb(30 42 35 / 0.24);

  /* ===== Motion ===== */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);      /* entrances, reveals, hovers */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);   /* panel open/close */
  --dur-fast: 150ms;    /* color changes */
  --dur-base: 250ms;    /* buttons, links, chips, header state */
  --dur-slow: 400ms;    /* mobile menu, success panel */
  --dur-reveal: 700ms;  /* scroll reveal */
  --dur-image: 800ms;   /* image hover zoom */
  --reveal-distance: 24px;
  --reveal-stagger: 80ms;

  /* ===== Z-index layers ===== */
  --z-below: -1;    /* decorative botanical SVGs behind content */
  --z-base: 0;
  --z-raised: 10;   /* image badges, hero caption card */
  --z-menu: 90;     /* mobile menu panel */
  --z-header: 100;  /* sticky header */
  --z-skip: 1000;   /* skip link */
}

/* Breakpoint overrides (custom properties cannot be used inside @media conditions) */
@media (min-width: 480px)  { :root { --gutter: 24px; } }
@media (min-width: 768px)  { :root { --gutter: 32px; } }
@media (min-width: 1024px) { :root { --gutter: 40px; --grid-gap: 32px; --header-h: 76px; } }
@media (min-width: 1280px) { :root { --gutter: 48px; } }
```

**Rule:** outside the `:root` blocks above, `styles.css` MUST NOT contain literal hex or `rgb()` colors. Always use `var(--color-…)`, `var(--fallback-…)` or `var(--shadow-…)`. `transparent` and `currentColor` are allowed.

### 2.2 Contrast: verified pairs (WCAG 2.1 relative luminance)

| Foreground | Background | Ratio | Use | AA result |
|---|---|---|---|---|
| ink `#1E2A23` | ivory `#FAF7F2` | **13.93:1** | body and headings on default sections | Pass (AAA) |
| ink `#1E2A23` | paper `#F3EDE4` | **12.79:1** | text on alternate sections | Pass (AAA) |
| ink `#1E2A23` | blush `#F6E7E2` | **12.37:1** | order section text | Pass (AAA) |
| ink `#1E2A23` | white `#FFFFFF` | **14.89:1** | cards, form | Pass (AAA) |
| ink-soft `#4B5650` | ivory / paper / blush / white | **7.16 / 6.57 / 6.35 / 7.65:1** | secondary text | Pass (AAA) |
| ink-muted `#5F6862` | ivory / paper / blush / white | **5.39 / 4.95 / 4.79 / 5.76:1** | hints, meta, placeholders | Pass (AA) |
| rose `#9C4257` | ivory / paper / blush / white | **5.90 / 5.42 / 5.24 / 6.31:1** | eyebrows, step numbers | Pass (AA) |
| ivory `#FAF7F2` | forest `#2F4A3A` | **9.09:1** | primary button label; story section text | Pass (AAA) |
| ivory `#FAF7F2` | forest-deep `#1F3329` | **12.57:1** | button hover; footer text | Pass (AAA) |
| forest `#2F4A3A` | ivory / paper / white / blush | **9.09 / 8.35 / 9.72 / 8.07:1** | links, secondary button, icons | Pass (AAA) |
| on-dark-soft `#C7D1C9` | forest / forest-deep | **6.20 / 8.56:1** | secondary text on dark | Pass (AA) |
| rose-soft `#E9C9C8` | forest / forest-deep | **6.32 / 8.73:1** | eyebrow on dark | Pass (AA) |
| error `#B42318` | white / ivory / error-bg | **6.57 / 6.15 / 5.79:1** | error messages | Pass (AA) |
| success `#2B6A45` | white / success-bg | **6.46 / 5.63:1** | success text/icon | Pass (AA) |
| line-strong `#8A877F` | white / ivory | **3.59 / 3.36:1** | input and chip borders (non-text, needs 3:1) | Pass (1.4.11) |
| focus `#2F4A3A` ring | ivory / white | **9.09 / 9.72:1** | focus indicator (non-text, needs 3:1) | Pass |
| focus-on-dark `#F0C38E` ring | forest / forest-deep | **5.97 / 8.25:1** | focus indicator on dark | Pass |

**Forbidden pairs:** rose on rose-soft (4.10:1). Sage as text on any background. ink-muted for text on forest.

### 2.3 Typography usage

**Font loading (MUST be used exactly).** Google Fonts CSS2 serves `unicode-range` subsets automatically. Both families ship a `vietnamese` subset, verified on 2026-10-07.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&amp;family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&amp;display=swap">
```

| Role | Family | Size token | Weight | Line height | Other |
|---|---|---|---|---|---|
| H1 (hero) | serif | `--fs-800` | 500 | `--lh-tight` | tracking `--tracking-tight`; `text-wrap: balance`; max-width 16ch (renders as two balanced lines at ≥1024: "Mỗi bó hoa là" / "một lá thư viết tay") |
| H2 (section titles) | serif | `--fs-700` | 500 | `--lh-tight` | tracking tight; `text-wrap: balance`; max-width 20ch |
| H3 large (collections, success) | serif | `--fs-600` | 600 | `--lh-snug` | |
| H3 card (products) | serif | `--fs-500` | 600 | `--lh-snug` | |
| H3 small (values, steps, delivery) | sans | `--fs-400` (values: `--fs-300`) | 600 | `--lh-snug` | |
| Lead paragraph | sans | `--fs-400` | 400 | `--lh-body` | color ink-soft; max-width `--measure-narrow` |
| Body | sans | `--fs-300` | 400 | `--lh-body` | max-width `--measure`; `text-wrap: pretty` |
| Small / card desc | sans | `--fs-200` | 400 | 1.55 | color ink-soft |
| Eyebrow | sans | `--fs-100` | 600 | 1.4 | `text-transform: uppercase`; tracking `--tracking-eyebrow`; color rose; preceded by a 24×1px rose line (`::before`, gap 12px) |
| Nav links, buttons, labels | sans | `--fs-200` | 500 (labels 600) | 1.2 | tracking `--tracking-button` (nav/buttons only) |
| Price | sans | `--fs-400` | 600 | 1.2 | `font-variant-numeric: tabular-nums lining-nums` |
| Quote | serif italic | `--fs-500` | 500 | 1.45 | |
| Stats / step numbers | serif | `--fs-600` | 500 | 1 | `font-variant-numeric: lining-nums` |

Base: `body { font-family: var(--font-sans); font-size: var(--fs-300); line-height: var(--lh-body); color: var(--color-ink); background: var(--color-ivory); -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; overflow-wrap: break-word; }`. Serif is used only for H1, H2, H3 serif variants, quotes, stats, step numbers, mobile menu links and the logo. Never set serif text below 20px.

---

## 3. Imagery strategy

### 3.1 Decision

1. **Photography:** 12 hand-picked, free Unsplash photos (Unsplash License, not Unsplash+), hot-linked from `images.unsplash.com`. That host is the Imgix CDN: it gives responsive crops, AVIF/WebP via `auto=format`, nothing to bundle and stable IDs. Every ID below was fetched and visually checked at its target crop on 2026-10-07.
2. **Never broken:** every photo sits in a `.media` frame. The frame paints a brand gradient (`--fallback-*`) and a centered inline-SVG sprig *behind* the `<img>`. While the image loads the sprig works as a placeholder. If the image errors, JS hides the `<img>` and the gradient plus sprig stays. The page never shows a broken-image icon or stray alt text.
3. **Illustration:** all icons and botanical ornaments are hand-authored inline SVG (sprite in §3.5). They have no external requests, inherit `currentColor` and scale cleanly.
4. **No local raster assets.** Do not create `assets/`.

**Dependency justification:** (a) Google Fonts provides the only two brand typefaces with full Vietnamese coverage and keeps the page at 5 font files, with no self-hosting pipeline. (b) The Unsplash CDN gives premium editorial photography with responsive sizing and no build step. The fallback design removes any visual risk if the CDN fails. No other external resource is allowed.

### 3.2 URL template and sizes

```
https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&q=75&w={W}&h={H}
```
In HTML attributes, write `&` as `&amp;`.
The hero slot (#1) uses `q=65` instead of `q=75` on `src` and every `srcset` candidate to speed up LCP; all other photos keep `q=75`.

| Aspect | `srcset` candidates (W×H) | `src` (default) |
|---|---|---|
| 4:5 | 480×600 `480w`, 800×1000 `800w`, 1200×1500 `1200w` | 800×1000 |
| 3:4 | 480×640 `480w`, 800×1067 `800w`, 1200×1600 `1200w` | 800×1067 |
| 3:2 | 480×320 `480w`, 800×533 `800w`, 1200×800 `1200w` | 800×533 |

Every `<img>` MUST have `width` and `height` attributes equal to the `src` size, `decoding="async"` and `alt`. All images use `loading="lazy"` except the hero image, which uses `loading="eager"` and `fetchpriority="high"`. Each `.media` frame sets CSS `aspect-ratio`. The `<img>` inside is `position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center`.

### 3.3 Image slot inventory (all 12 slots, plus Open Graph)

| # | Slot | Photo ID | Crop (URL) | Displayed aspect | `sizes` | Fallback | Vietnamese `alt` |
|---|---|---|---|---|---|---|---|
| 1 | Hero | `1563241527-3004b7be0ffd` | 4:5 | 4:5 with `--radius-arch` | `(min-width: 528px) 480px, calc(100vw - 32px)` | `--fallback-rose` | Bó hoa hồng kem và cam đào cắm trong lọ thủy tinh buộc nơ lụa, đặt trên bàn gỗ sáng màu |
| 2 | Collection: Thu Hà Nội | `1530092285049-1c42085fd395` | 3:4 | 4:3 below 768, 3:4 from 768 | `(min-width: 1280px) 384px, (min-width: 768px) 33vw, 100vw` | `--fallback-sand` | Những bông cúc trắng mỏng manh vươn lên nền trời xanh mùa thu |
| 3 | Collection: Sương Mai | `1582794543139-8ac9cb0f7b11` | 3:4 | same as #2 | same as #2 | `--fallback-rose` | Cận cảnh những bông mẫu đơn hồng phấn đang nở rộ |
| 4 | Collection: Hỷ Sự | `1578534102052-70f4c14ee0e7` | 3:4 | same as #2 | same as #2 | `--fallback-sage` | Cô dâu cầm bó hoa cưới với hồng trắng kem và lá xanh |
| 5 | Product: Đào Phai | `1572454591674-2739f30d8c40` | 4:5 | 4:5 | `(min-width: 1280px) 384px, (min-width: 1024px) 33vw, (min-width: 480px) 50vw, 100vw` | `--fallback-rose` | Bình thủy tinh cắm hồng cam đào, mao lương và lá bạc |
| 6 | Product: Hồng Nhung | `1494972308805-463bc619d34e` | 4:5 | 4:5 | as #5 | `--fallback-rose` | Bó hồng đỏ thắm nhìn từ trên xuống |
| 7 | Product: Nắng Hạ | `1455659817273-f96807779a8a` | 4:5 | 4:5 | as #5 | `--fallback-sand` | Những bông hướng dương vàng rực xếp sát bên nhau |
| 8 | Product: Phú Quý | `1524598171353-ce84a157ed05` | 4:5 | 4:5 | as #5 | `--fallback-sage` | Chậu lan hồ điệp hồng tím hai cành trong chậu sứ trắng trên kệ gỗ |
| 9 | Product: Mây Trắng | `1631883971900-fa9c798aee92` | 4:5 | 4:5 | as #5 | `--fallback-sage` | Bàn tay cầm bó hoa baby trắng buộc ruy băng |
| 10 | Product: Tĩnh Tại | `1484676681417-64a0ea3475fd` | 4:5 | 4:5 | as #5 | `--fallback-sand` | Bó hồng trắng và mao lương trắng mang sắc thanh nhã |
| 11 | Story (craft) | `1756194712073-89613e8ecad9` | 4:5 | 4:3 below 1024, 4:5 from 1024 | `(min-width: 1280px) 480px, (min-width: 1024px) 37vw, (min-width: 688px) 640px, calc(100vw - 32px)` | `--fallback-sage` | Đôi tay nghệ nhân dùng dây gai buộc bó lá xanh trên bàn gỗ |
| 12 | Process (delivery) | `1567696153798-9111f9cd3d0d` | **art-directed:** 3:2 below 1024, 4:5 from 1024 (`<picture>`, see §5.8) | 3:2 / 4:5 | `<source>` (≥1024): `(min-width: 1280px) 480px, 37vw`; `<img>`: `(min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)` | `--fallback-sand` | Bàn tay trao bó hoa hướng dương gói giấy kraft kèm tấm thiệp nhỏ |
| OG | Social share | `1563241527-3004b7be0ffd` | `?fm=jpg&fit=crop&w=1200&h=630&q=80` | 1200×630 | — | — | `og:image:alt`: Bó hoa hồng kem và cam đào cắm trong lọ thủy tinh buộc nơ lụa |

The testimonials have no portraits on purpose, so no faces are invented. Occasion tiles and value props use the SVG icons in §3.5, not photos.

### 3.4 Fallback mechanism (MUST)

DOM (identical for every photo slot; set the slot's fallback via inline custom property):

```html
<div class="media media--4x5" style="--media-fallback: var(--fallback-rose)">
  <span class="media__fallback" aria-hidden="true"><svg class="icon"><use href="#i-sprig"></use></svg></span>
  <img src="…" srcset="…" sizes="…" width="800" height="1000" alt="…" loading="lazy" decoding="async">
</div>
```

CSS:
- `.media { position: relative; overflow: hidden; background: var(--media-fallback, var(--fallback-sand)); border-radius: var(--radius-md); }`
- `.media--4x5 { aspect-ratio: 4 / 5 }`, `.media--3x4 { aspect-ratio: 3 / 4 }`, `.media--3x2 { aspect-ratio: 3 / 2 }`, `.media--4x3 { aspect-ratio: 4 / 3 }`. Responsive switches are listed per section.
- `.media__fallback { position: absolute; inset: 0; display: grid; place-items: center; color: var(--color-forest); opacity: 0.35; }`. Its svg is `width: 22%; height: auto; aspect-ratio: 1; stroke-width: 1.25`.
- `.media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }`, which paints above the fallback.
- `.media.is-error img { visibility: hidden; }`.

JS: see §7.9.

### 3.5 Inline SVG sprite (MUST be pasted verbatim as the first child of `<body>`, before the skip link)

All symbols are line icons drawn to be stroked. The global `.icon` class supplies the stroke properties, which inherit into `<use>` shadow trees.

```html
<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">
  <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>
  <symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.6 3.5h2.6l1.6 4.4-2.1 1.3a11.5 11.5 0 0 0 6.1 6.1l1.3-2.1 4.4 1.6v2.6a2 2 0 0 1-2.2 2A15.8 15.8 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z"/></symbol>
  <symbol id="i-chat" viewBox="0 0 24 24"><path d="M5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4 3.5V16h-.5A1.5 1.5 0 0 1 4 14.5v-9A1.5 1.5 0 0 1 5.5 4z"/><path d="M8.5 10h.01M12 10h.01M15.5 10h.01"/></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="13" rx="1.5"/><path d="M4 7l8 6 8-6"/></symbol>
  <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></symbol>
  <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
  <symbol id="i-arrow-up-right" viewBox="0 0 24 24"><path d="M7 17L17 7M8.5 7H17v8.5"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></symbol>
  <symbol id="i-check-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M8.2 12.3l2.6 2.6 5-5.2"/></symbol>
  <symbol id="i-alert" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5.5M12 16.4v.1"/></symbol>
  <symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></symbol>
  <symbol id="i-fast" viewBox="0 0 24 24"><circle cx="14" cy="12" r="7"/><path d="M14 8.5V12l2.5 1.6M2.5 9h3.5M1.5 12h4M2.5 15h3.5"/></symbol>
  <symbol id="i-sunrise" viewBox="0 0 24 24"><path d="M3 18h18M7 21h10M6.5 18a5.5 5.5 0 0 1 11 0M12 10.5V7.5M17.3 12.7l1.9-1.9M6.7 12.7l-1.9-1.9"/></symbol>
  <symbol id="i-card" viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="14" rx="1.5"/><path d="M7 11c1.1-1.4 2-1.4 2.5 0s1.4 1.4 2.5 0 2-1.4 2.5 0 1.4 1.4 2.5.2M7 15h6"/></symbol>
  <symbol id="i-camera" viewBox="0 0 24 24"><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.3l1.4-2h5.6l1.4 2h2.3A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="12.8" r="3.3"/></symbol>
  <symbol id="i-cake" viewBox="0 0 24 24"><path d="M4 20.5h16M5.5 20.5v-7A1.5 1.5 0 0 1 7 12h10a1.5 1.5 0 0 1 1.5 1.5v7M5.5 16c1.1.9 2.2.9 3.3 0s2.2-.9 3.2 0 2.2.9 3.2 0 2.2-.9 3.3 0M12 12V9M12 6.6c-.9-.7-.9-1.8 0-3 .9 1.2.9 2.3 0 3z"/></symbol>
  <symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20C7.2 16.7 3.5 13.6 3.5 9.6 3.5 7 5.5 5 8 5c1.7 0 3.1.8 4 2.2C12.9 5.8 14.3 5 16 5c2.5 0 4.5 2 4.5 4.6 0 4-3.7 7.1-8.5 10.4z"/></symbol>
  <symbol id="i-tulip" viewBox="0 0 24 24"><path d="M12 21v-9M12 12c-2.9 0-5-2.2-5-5.4V4l2.6 1.9L12 3l2.4 2.9L17 4v2.6C17 9.8 14.9 12 12 12zM12 18c-2.3 0-4.1-1.3-4.6-3.6 2.3 0 4.1 1.3 4.6 3.6zM12 18c2.3 0 4.1-1.3 4.6-3.6-2.3 0-4.1 1.3-4.6 3.6z"/></symbol>
  <symbol id="i-blossom" viewBox="0 0 24 24"><path d="M16.8 5.6A1.9 1.9 0 1 1 17.9 8.9A1.9 1.9 0 1 1 15.0 11.0A1.9 1.9 0 1 1 12.1 8.9A1.9 1.9 0 1 1 13.2 5.6A1.9 1.9 0 1 1 16.8 5.6z"/><path d="M15 8h.01M3 21.5c3.4-1.8 6.6-4.6 9.6-9.4M8.4 17.6c-1.6-.7-2.3-2.2-1.9-4 1.6.7 2.4 2.2 1.9 4zM10.6 15.4c1.7-.1 3.3.7 4.2 2.3"/><circle cx="16.4" cy="18.6" r="1.4"/></symbol>
  <symbol id="i-rings" viewBox="0 0 24 24"><circle cx="9" cy="14.5" r="5"/><circle cx="15" cy="14.5" r="5"/><path d="M10.4 5.6L12 3.5l1.6 2.1L12 7.8z"/></symbol>
  <symbol id="i-ribbon" viewBox="0 0 24 24"><path d="M12 11.5C9.3 7.8 5.2 8 5.6 10.8c.4 2.6 3.7 2.3 6.4.7zM12 11.5c2.7-3.7 6.8-3.5 6.4-.7-.4 2.6-3.7 2.3-6.4.7zM11 12.3l-2.6 7 1.8-.8 1 1.6M13 12.3l2.6 7-1.8-.8-1 1.6M2.5 11h2M19.5 11h2"/></symbol>
  <symbol id="i-lotus" viewBox="0 0 24 24"><path d="M12 4.5c2 2.2 3 4.6 3 7.1s-1 4.6-3 6.4c-2-1.8-3-3.9-3-6.4s1-4.9 3-7.1zM10.6 17.7C7.1 18 4.3 16.5 3 13.4c2.4-.8 4.8-.5 6.6 1M13.4 17.7c3.5.3 6.3-1.2 7.6-4.3-2.4-.8-4.8-.5-6.6 1M6 20.5h12"/></symbol>
  <symbol id="i-building" viewBox="0 0 24 24"><path d="M3.5 20.5h17M6 20.5V5.5A1.5 1.5 0 0 1 7.5 4h6A1.5 1.5 0 0 1 15 5.5v15M15 10h2.5a1.5 1.5 0 0 1 1.5 1.5v9M9 8h3M9 11.5h3M9 15h3"/></symbol>
  <symbol id="i-sprig" viewBox="0 0 64 64"><path d="M30 61c1-14 0-30 7-54M31 47c-8-.6-13.5-5.2-15-12.5 7.6.2 12.8 4.8 15 12.5zM31.6 37c7.2-1.6 11.6-6.6 12-13.6-7 .9-11.2 5.9-12 13.6zM33 27c-6-1.9-9.2-6.6-9.2-12.6 5.8 1.3 9 6 9.2 12.6zM34.6 18.5c5-1.8 7.6-5.6 7.5-10.5-4.7 1.3-7.3 5.1-7.5 10.5zM37 7c-1.7-1.3-2.2-3-1.5-5 1.8.9 2.4 2.6 1.5 5z"/></symbol>
</svg>
```

Icon usage: `<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-phone"></use></svg>`.
Global icon CSS: `.icon { width: 1.25em; height: 1.25em; flex: none; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; vertical-align: middle; }`. Large icons (32–40px) use `stroke-width: 1.25`. The sprig at sizes of 120px and up uses `stroke-width: 1`.

| Icon | Used in |
|---|---|
| `i-sprig` | logo mark, image fallback, hero ornament, story ornament |
| `i-menu` / `i-close` | mobile nav toggle |
| `i-phone`, `i-chat`, `i-mail`, `i-pin`, `i-clock` | header call button, contact lists, footer |
| `i-arrow-right` | primary CTA, `.link-arrow` |
| `i-arrow-up-right` | external links (footer social, Zalo) |
| `i-check` | hero trust list, pressed filter chip |
| `i-check-circle` | form success panel |
| `i-alert` | field errors, form status |
| `i-chevron-down` | custom select arrow |
| `i-fast`, `i-sunrise`, `i-card`, `i-camera` | value props 1–4 |
| `i-cake`, `i-heart`, `i-tulip`, `i-blossom`, `i-rings`, `i-ribbon`, `i-lotus`, `i-building` | occasion tiles 1–8 |

### 3.6 Favicon (inline SVG data URI, MUST be used exactly)

```html
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%232F4A3A'/%3E%3Cpath d='M30 56c1-12 0-26 6-46M31 44c-7-.5-11.5-4.4-12.8-10.6 6.5.2 10.9 4.1 12.8 10.6zM31.5 35.5c6.1-1.4 9.9-5.6 10.2-11.6-6 .8-9.5 5-10.2 11.6zM33 26.5c-5.1-1.6-7.8-5.6-7.8-10.7 4.9 1.1 7.6 5.1 7.8 10.7z' fill='none' stroke='%23FAF7F2' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">
```
It renders an ivory sprig on a forest rounded square and was checked at 32px and 64px.

---

## 4. Information architecture

Order is final. "BG" is the section background.

| # | Section | Element / `id` | BG | In nav? | Purpose |
|---|---|---|---|---|---|
| 0 | Skip link | `a.skip-link` → `#noi-dung` | — | — | Keyboard bypass |
| 1 | Sticky header + nav + mobile menu | `header.site-header` | ivory (glass when scrolled) | — | Wayfinding, persistent CTA and call |
| 2 | Hero | `section#trang-chu` | ivory | logo target | Promise and primary CTA |
| 3 | Trust / value props | `section#cam-ket` | paper | — | Remove risk: speed, freshness, card, photo approval |
| 4 | Featured collections | `section#bo-suu-tap` | ivory | "Bộ sưu tập" | Show taste and seasonality, set price anchors |
| 5 | Best-selling products (+ filter) | `section#hoa-ban-chay` | paper | "Hoa bán chạy" | Concrete products, prices, "Đặt hoa" |
| 6 | Shop by occasion | `section#theo-dip` | ivory | "Theo dịp" | Fast path by occasion that pre-fills the form |
| 7 | Brand story / craft | `section#cau-chuyen` | **forest** (dark) | "Câu chuyện" | Justify premium, build emotional trust |
| 8 | How ordering & same-day delivery work | `section#cach-dat-hoa` | paper | "Giao hàng" | Answer logistics: steps, cut-off, fees, payment |
| 9 | Testimonials | `section#danh-gia` | ivory | — | Social proof |
| 10 | Order / contact CTA with form | `section#dat-hoa` | blush | header CTA "Đặt hoa" | Conversion |
| 11 | Footer | `footer#lien-he` | **forest-deep** (dark) | — | Address, hotline, Zalo/Facebook/Instagram, hours |

`<main id="noi-dung" tabindex="-1">` wraps sections 2–10. Rationale for the order: emotion first (hero), then reassurance (values), then taste (collections), then concrete choice (products), with occasions as an alternate path. Story and process answer "why pay more" and "how does it work" right before social proof and the form.

---

## 5. Section specifications

### 5.0 Global components and conventions

**Container.** `.container { width: 100%; max-width: calc(var(--container-max) + 2 * var(--gutter)); margin-inline: auto; padding-inline: var(--gutter); }`

**Section.** `.section { padding-block: var(--section-space); }`. Background modifiers: `.section--paper`, `.section--blush`, `.section--forest` (text on-dark; adds class `on-dark`). Every section has `aria-labelledby` pointing at its H2 id.

**Section header** (`.section-head`): eyebrow (`p.eyebrow`), H2, optional intro (`p.section-head__intro`, lead style, max-width `--measure-narrow`). Gaps: eyebrow→H2 16px, H2→intro 20px. Margin below the header block: 48px (<768), 64px (≥768). Variant `.section-head--center`: text-align center; the eyebrow's `::before` line is replaced by lines on both sides (`::before` and `::after`, 24px each); intro gets `margin-inline: auto`.

**Buttons** (`.btn`). `display:inline-flex; align-items:center; justify-content:center; gap:10px; min-height:48px; padding:0 28px; border-radius:var(--radius-pill); font: var(--fw-medium) var(--fs-200)/1.2 var(--font-sans); letter-spacing: var(--tracking-button); text-decoration:none; border:1px solid transparent; transition: background-color var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out); cursor:pointer;`

| Variant | Default | Hover (`@media (hover:hover)`) | Active | Focus-visible | Disabled / `aria-disabled="true"` |
|---|---|---|---|---|---|
| `.btn--primary` | bg forest, text ivory | bg forest-deep | `transform: translateY(1px)` | 2px focus ring, offset 3px | opacity 0.55, `cursor:not-allowed`, no hover change, no transform. Exception: the loading state (`.btn.is-loading`, "Đang gửi…") uses opacity 0.75 so its status text stays readable. |
| `.btn--secondary` | transparent, 1px border forest, text forest | bg forest, text ivory | translateY(1px) | same | same |
| `.btn--on-dark` | transparent, 1px border on-dark, text on-dark | bg on-dark (ivory), text forest | translateY(1px) | ring `--color-focus-on-dark` | same |
| `.btn--sm` (modifier) | min-height 44px, padding 0 20px | — | — | — | — |
| `.btn--block` (modifier) | width 100% | — | — | — | — |
| `.btn.is-loading` | label replaced by "Đang gửi…" plus a 16px spinner (2px ring, currentColor, top border transparent, rotates 360° every 800ms linear; static under reduced motion) | — | — | — | — |

An arrow icon inside `.btn` (`i-arrow-right`, 18px) moves `translateX(4px)` on hover over `--dur-base`.

**Text links.** Inline links: color forest, `text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 0.2em;`. Hover: color forest-deep, thickness 2px. On dark: color on-dark. `.link-arrow`: inline-flex, gap 8px, `--fs-200` 600, forest, no underline. On hover the text gets an underline and the arrow moves 4px right. Min-height 44px.

**Icon button** (`.icon-btn`): 44×44px, `display:inline-grid; place-items:center; border-radius: var(--radius-pill); background: transparent; color: var(--color-ink); border: 0`. Icon 22px. Hover: bg paper. Active: bg line.

**Chip** (`.chip`, filter toggle): `<button type="button" aria-pressed>`. min-height 44px, padding 0 18px, radius pill, 1px border line-strong, bg transparent, text ink-soft, `--fs-200` 500, gap 8px. Hover: border forest, text forest. `[aria-pressed="true"]`: bg forest, border forest, text ivory, plus a visible 16px `i-check` icon before the label. The icon is hidden (`display:none`) when not pressed, so state is not shown by color alone. Active: `transform: scale(0.98)`.

**Badge** (`.badge`, on product images): absolute, top 12px, left 12px, `z-index: var(--z-raised)`, bg `--color-ivory-glass`, text ink, `--fs-100` 600, uppercase, letter-spacing 0.08em, padding 6px 10px, radius pill.

**Focus.** Global: `:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }`. Inside `.on-dark` (story section, footer): `outline-color: var(--color-focus-on-dark)`. Inputs, selects and textareas use `outline-offset: 2px`. Never remove outlines without a replacement. `main:focus { outline: none; }` is the only exception, because main is a programmatic focus target.

**Utilities (MUST exist).**
- `[hidden] { display: none !important; }`. This prevents `display:flex/grid` from overriding `hidden`, which filtering relies on.
- `.visually-hidden { position:absolute !important; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0; }`

**Form controls** (`.field`): label (`--fs-200` 600 ink, margin-bottom 8px; required marker `<span class="req" aria-hidden="true">*</span>` in rose; optional marker `<span class="opt">(không bắt buộc)</span>` 400 ink-muted), control, hint (`.field__hint`, `--fs-100` ink-muted, margin-top 6px), error (`.field__error`, `--fs-100` 600 error color, flex with 16px `i-alert`, gap 6px, margin-top 6px).
- Input, select: height 52px, padding 0 16px, `--fs-300` (16px min, which prevents iOS zoom), color ink, bg white, 1px border line-strong, radius sm, `transition: border-color var(--dur-fast), box-shadow var(--dur-fast)`. Placeholder color ink-muted.
- Select: `appearance:none`, padding-right 48px. The wrapper `.select` is `position:relative`. The `i-chevron-down` icon (20px, ink-soft) is absolutely positioned 16px from the right, vertically centered, with `pointer-events:none`.
- Date: same box. Set `color-scheme: light`.
- Textarea: min-height 128px, padding 14px 16px, `resize: vertical`, line-height 1.55.
- **Hover:** border ink-soft. **Focus-visible:** border forest plus outline 2px forest, offset 2px. **Invalid** (`.field.is-invalid`): border error plus `box-shadow: inset 0 0 0 1px var(--color-error)`, which looks 2px wide without shifting layout. The error message (icon plus text) is shown, and the control has `aria-invalid="true"`. **Disabled:** bg paper, text ink-muted, `cursor:not-allowed`. **Prefilled flash** (`.field.is-prefilled`): the control's background animates from blush back to white over 1600ms `--ease-out`. Under reduced motion there is no animation.

**Reveal hooks.** `data-reveal` marks an element that fades up on scroll. `data-reveal-group` on a parent staggers its `[data-reveal]` children (§7.5). Never put `data-reveal` on an element that also has a hover transform. Put it on the wrapper (`<li>`) instead.

---

### 5.1 Skip link and header (`header.site-header`)

**Purpose.** Persistent wayfinding, brand recall, one-tap call and a constant "Đặt hoa" CTA.

**Layout.**

| | < 1024px | ≥ 1024px | ≥ 1280px |
|---|---|---|---|
| Height | 64px (`--header-h`) | 76px | 76px |
| Left | Logo | Logo | Logo |
| Center | — | Desktop nav (5 links, gap 32px) | same |
| Right | Call icon-button + menu toggle (gap 4px) | "Đặt hoa" `.btn--primary.btn--sm` | Phone link "0900 123 456" (with `i-phone` 18px, ink, `--fs-200` 500), 24px gap, then "Đặt hoa" button |

- `position: sticky; top: 0; z-index: var(--z-header); background: var(--color-ivory); border-bottom: 1px solid transparent; transition: background-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);`
- **Scrolled state** (`.site-header.is-scrolled`, added by JS when `scrollY > 8`): `background: var(--color-ivory-glass); backdrop-filter: saturate(140%) blur(12px); -webkit-backdrop-filter: saturate(140%) blur(12px); border-bottom-color: var(--color-line); box-shadow: var(--shadow-sm);`. Wrap it in `@supports not (backdrop-filter: blur(1px))`, where the background stays solid `--color-ivory`. Height never changes.
- `.site-header__inner`: container, `display:flex; align-items:center; justify-content:space-between; height: var(--header-h); gap: 24px`.
- Desktop nav, header CTA and phone link: `display:none` below their breakpoints. The call button and menu toggle use `display:none` at ≥1024.

**Logo** (`a.logo`). Inline-flex, gap 10px, `i-sprig` at 28px in forest. Text stack: `.logo__name` "Mộc Sương" (serif, 600, 1.625rem, line-height 1, ink, letter-spacing 0.01em) and `.logo__sub` "Atelier hoa" (sans 500, 0.75rem, uppercase, letter-spacing 0.24em, ink-muted, margin-top 2px). `aria-label="Mộc Sương Atelier — về đầu trang"`, `href="#trang-chu"`. Min-height 44px.

**Desktop nav link** (`.site-nav__link`): `--fs-200` 500, ink-soft, min-height 44px, inline-flex, align center, position relative. Underline: `::after` 1px forest at bottom 8px, `transform: scaleX(0)`, transform-origin left, transition `--dur-base`. Hover: color ink, `scaleX(1)`. **Current** (`[aria-current="true"]`, set by scrollspy): color ink, underline `scaleX(1)`. Focus-visible: global ring.

**Mobile menu panel** (`#mobile-menu.mobile-menu`, <1024 only). It MUST be a **sibling placed immediately after `</header>`**, not inside the header. The scrolled header uses `backdrop-filter`, which creates a containing block for `position: fixed` descendants. A panel nested inside the header would be clipped to the header box. Styles: `position: fixed; inset: var(--header-h) 0 0 0; z-index: var(--z-menu); background: var(--color-ivory); overflow-y: auto; padding: 24px var(--gutter) 40px;`. It starts with `hidden`. Open state `.is-open`: opacity 1 and translateY(0). Closed: opacity 0 and translateY(-8px). Transition `--dur-slow` `--ease-in-out`. Contents:
1. `<nav aria-label="Điều hướng trên di động">` list. Each link is serif `--fs-600` 500 ink, `display:flex; min-height:56px; align-items:center;` with a 1px line border-bottom. Current link: rose `::before` dot (6px circle) plus `aria-current`.
2. `.btn--primary.btn--block` "Đặt hoa ngay", margin-top 32px.
3. Contact list (margin-top 24px, gap 4px, `--fs-200`): phone link, Zalo link and hours text, each with an 18px icon. Links are min-height 44px.

**Copy.**

| Element | Text |
|---|---|
| Skip link | Bỏ qua điều hướng, đến nội dung chính |
| Nav links (in order) → hrefs | Bộ sưu tập → `#bo-suu-tap` · Hoa bán chạy → `#hoa-ban-chay` · Theo dịp → `#theo-dip` · Câu chuyện → `#cau-chuyen` · Giao hàng → `#cach-dat-hoa` |
| Desktop nav `aria-label` | Điều hướng chính |
| Header CTA | Đặt hoa → `#dat-hoa` |
| Phone link (≥1280) | 0900 123 456 → `tel:+84900123456` |
| Call icon-button `aria-label` | Gọi hotline 0900 123 456 |
| Toggle `aria-label` (closed / open) | Mở menu / Đóng menu |
| Mobile CTA | Đặt hoa ngay |
| Mobile contact | Gọi 0900 123 456 (`tel:+84900123456`) · Nhắn Zalo (`https://zalo.me/0900123456`, new tab) · Mở cửa 7:00 – 21:00 mỗi ngày |

**Skip link.** It is the first focusable element. `position:absolute; left: 16px; top: 12px; z-index: var(--z-skip); transform: translateY(-200%);` and it becomes `translateY(0)` on `:focus`. Styled as `.btn--primary.btn--sm`.

**DOM outline.**
```
body
  svg (sprite)
  a.skip-link[href="#noi-dung"]
  header.site-header
    div.container.site-header__inner
      a.logo[href="#trang-chu"][aria-label]
      nav.site-nav[aria-label="Điều hướng chính"] > ul.site-nav__list > li > a.site-nav__link ×5
      div.site-header__actions
        a.header-phone[href="tel:+84900123456"]            (≥1280)
        a.btn.btn--primary.btn--sm.header-cta[href="#dat-hoa"]  (≥1024)
        a.icon-btn.header-call[href="tel:+84900123456"][aria-label]  (<1024)
        button.icon-btn.nav-toggle[type=button][aria-expanded=false][aria-controls=mobile-menu][aria-label="Mở menu"]  (<1024)
          svg.icon.nav-toggle__icon-open (i-menu) + svg.icon.nav-toggle__icon-close (i-close, hidden while closed)
  div#mobile-menu.mobile-menu[hidden]          ← sibling of header, NOT inside it
    nav[aria-label="Điều hướng trên di động"] > ul > li > a.mobile-menu__link ×5
    a.btn.btn--primary.btn--block[href="#dat-hoa"]
    ul.mobile-menu__contact
  main#noi-dung[tabindex="-1"] …
```

---

### 5.2 Hero (`section#trang-chu.hero`)

**Purpose.** State the brand promise in one line, show the signature look and give two clear actions.

**Layout.**
- **< 768px:** single column. Content first, then image. Padding-top 40px, padding-bottom `--section-space`. CTA group: below 480px both buttons are `.btn--block`, stacked with 12px gap. At 480px and up they sit inline (flex-wrap, gap 12px). Trust list: below 480px vertical (gap 8px); at 480px and up a row (flex-wrap, gap 8px 24px). Image figure: margin-top 48px, `width:100%; max-width:480px; margin-inline:auto`.
- **768–1023px:** same single column. Content max-width 640px. Image max-width 480px, centered.
- **≥ 1024px:** 12-column grid (`grid-template-columns: repeat(12, 1fr); column-gap: var(--grid-gap); align-items:center`). `.hero__content` spans columns 1–6. `.hero__media` spans columns 8–12. Padding-top 64px. Image margin-top 0.
- The section has `overflow: clip` so decorative elements never cause horizontal scroll.

**Anatomy.**
- `.hero__content`: eyebrow → H1 (margin-top 16px, max-width 16ch, `text-wrap: balance`) → lead (margin-top 20px, `--fs-400`, ink-soft, max-width `--measure-narrow`) → actions (margin-top 32px) → trust list (margin-top 32px, `--fs-200` ink-soft, each item `i-check` 18px forest + text, gap 8px).
- `.hero__media` (`figure`, `position:relative`): `.media.media--4x5` with `border-radius: var(--radius-arch)`, fallback `--fallback-rose`.
- Caption card `figcaption.hero__caption`: `position:absolute; z-index: var(--z-raised); left:16px; bottom:16px; max-width: calc(100% - 32px)`. At ≥1024: `left:-32px; bottom:40px`. Card: bg white, radius md, shadow md, padding 12px 16px, flex column gap 2px. Contents: label (eyebrow style without the line, `--fs-100`, rose), title (serif 600, 1.25rem, ink), price (`--fs-200` 600 ink).
- Ornament `svg.hero__sprig` (`i-sprig`): only at ≥1024. `position:absolute; top:-40px; right:-56px; width:180px; height:180px; color: var(--color-sage); opacity:0.6; transform: rotate(18deg); z-index: var(--z-below); stroke-width:1`. The `figure` gets `isolation:isolate`.

**Copy.**

| Element | Text |
|---|---|
| Eyebrow | Atelier hoa tươi · Hà Nội |
| H1 (`#hero-title`) | Mỗi bó hoa là một lá thư viết tay |
| Lead | Mộc Sương chọn hoa tươi tại chợ hoa Quảng Bá lúc 5 giờ sáng, cắm thủ công theo câu chuyện của bạn và giao tận tay trong ngày khắp nội thành Hà Nội. |
| Primary CTA | Đặt hoa ngay (+ `i-arrow-right`) → `#dat-hoa` |
| Secondary CTA | Xem bộ sưu tập → `#bo-suu-tap` |
| Trust list | Giao trong ngày · Thiệp viết tay miễn phí · Duyệt ảnh trước khi giao (3 `<li>`) |
| Caption label | Bộ sưu tập đặc trưng |
| Caption title | Sương Mai |
| Caption price | Từ 750.000₫ |

**Load motion** (`prefers-reduced-motion: no-preference` only, pure CSS): `.hero__content > *` uses `@keyframes hero-up { from { opacity:0; transform: translateY(16px) } to { opacity:1; transform:none } }` for 800ms `--ease-out` `both`, with delays 0, 100, 200, 300 and 400ms for its 5 children. The hero image animates **only** `transform: scale(1.04) → scale(1)` over 1400ms `--ease-out`. Never animate its opacity, because that would delay LCP. The caption card fades up after a 600ms delay.

**States.** Buttons follow §5.0. Nothing else is interactive.

---

### 5.3 Trust / value props (`section#cam-ket.values`)

**Purpose.** Answer the four main anxieties of gifting flowers remotely: speed, freshness, personal touch and "will it look like the photo?"

**Layout.** BG paper. Padding-block 64px (`--space-8`), a band rather than a full section. The visually hidden H2 keeps the heading outline intact.
- **< 480px:** 1 column, gap 24px. Each item is a 2-column grid (`40px 1fr`, gap 16px) with the icon left and text right.
- **480–1023px:** 2 columns, gap 32px 24px. Same item layout.
- **≥ 1024px:** 4 columns. Each item stacks vertically (icon on top, margin-bottom 16px). Items 2–4 get `border-left: 1px solid var(--color-line); padding-left: 24px`.

**Anatomy.** `ul.values__list[data-reveal-group] > li.value[data-reveal]`: icon (32px, rose, stroke 1.25) → H3 `.value__title` (sans 600 `--fs-300` ink) → `p.value__text` (`--fs-200` ink-soft, margin-top 6px).

**Copy.**

| Icon | H3 | Text |
|---|---|---|
| `i-fast` | Giao trong ngày | Đặt trước 16:00, hoa đến tay người nhận ngay hôm nay trong nội thành Hà Nội. |
| `i-sunrise` | Hoa tuyển mỗi sớm | Chọn từng cành lúc 5 giờ sáng tại chợ Quảng Bá, không dùng hoa tồn từ hôm trước. |
| `i-card` | Thiệp viết tay miễn phí | Lời nhắn của bạn được viết tay bằng mực nước trên giấy mỹ thuật. |
| `i-camera` | Duyệt ảnh trước khi giao | Bạn nhận ảnh bó hoa thật qua Zalo. Chưa ưng ý, chúng tôi cắm lại miễn phí. |

Visually hidden H2 (`#values-title`): **Cam kết của Mộc Sương**

**States.** Static, no interaction.

---

### 5.4 Featured collections (`section#bo-suu-tap.collections`)

**Purpose.** Show taste and seasonality and set price anchors from 590.000₫ to 2.500.000₫.

**Layout.** BG ivory. Section header left-aligned.
- **< 768px:** 1 column, gap 48px. Media `aspect-ratio: 4/3`.
- **768–1023px:** 3 columns, gap `--grid-gap`. Media `aspect-ratio: 3/4`.
- **≥ 1024px:** 3 columns. The **2nd card has `margin-top: 64px`**, an editorial stagger. Grid `align-items: start`.

**Anatomy** (`ul.collections__grid[data-reveal-group] > li[data-reveal] > article.collection`):
media (`.media`, radius md) → meta (eyebrow style, no line, margin-top 20px) → H3 (serif `--fs-600` 600, margin-top 8px) → description (`--fs-300` ink-soft, margin-top 8px, max-width 36ch) → price line (`p.collection__price`, `--fs-200` 600 ink, margin-top 12px) → `a.link-arrow` (margin-top 8px).
Card hover (`@media (hover:hover)`, on `article:hover`): the image scales to 1.04 over `--dur-image` `--ease-out`. The `.media` frame clips it.

**Copy.**

| # | Meta | H3 | Description | Price | Link text (+ visually hidden) | `href` / `data-product` |
|---|---|---|---|---|---|---|
| 1 | Theo mùa · Tháng 10 – 12 | Thu Hà Nội | Cúc trắng, cỏ lau và những nhành hoa dại — dịu dàng như chiều heo may trên phố cổ. | Từ 590.000₫ | Đặt theo bộ sưu tập `<span class="visually-hidden">Thu Hà Nội</span>` | `#dat-hoa` / `bst-thu-ha-noi` |
| 2 | Đặc trưng của Mộc Sương | Sương Mai | Mẫu đơn hồng phấn, hồng kem và lá bạc, phom dáng tự nhiên như vừa hái từ vườn lúc sớm mai. | Từ 750.000₫ | Đặt theo bộ sưu tập `<span class="visually-hidden">Sương Mai</span>` | `#dat-hoa` / `bst-suong-mai` |
| 3 | Cưới hỏi & sự kiện | Hỷ Sự | Hoa cưới cầm tay, hoa bàn tiệc và cổng hoa, thiết kế riêng theo câu chuyện của hai bạn. | Từ 2.500.000₫ | Đặt theo bộ sưu tập `<span class="visually-hidden">Hỷ Sự</span>` | `#dat-hoa` / `bst-hy-su` |

Section header: eyebrow **Bộ sưu tập** · H2 (`#collections-title`) **Ba câu chuyện hoa theo nhịp mùa Hà Nội** · intro **Mỗi bộ sưu tập là một bảng màu và một tâm trạng. Chọn điều bạn muốn nói, Mộc Sương sẽ cắm phần còn lại.**

**States.** Link hover, focus and active follow §5.0. Clicking a link pre-selects the matching option in the form's "Mẫu hoa" select (§7.7).

---

### 5.5 Best-selling products (`section#hoa-ban-chay.products`)

**Purpose.** Concrete, priced products with a direct "Đặt hoa" action, filterable by occasion.

**Layout.** BG paper. Section header left-aligned. Filter (`.filter`) sits below the header (no extra margin, since the header margin applies). Grid margin-top 32px.
- **< 480px:** 1 column, gap 24px.
- **480–1023px:** 2 columns, gap `--grid-gap`.
- **≥ 1024px:** 3 columns, gap `--grid-gap`.
- Filter: a `<p id="filter-label" class="filter__label">` (`--fs-200` 600 ink) followed by a `div.filter__chips[role="group"][aria-labelledby="filter-label"]` with `display:flex; flex-wrap:wrap; gap:8px; margin-top:12px`. Chips wrap and never scroll horizontally. The whole `.filter` has the `hidden` attribute in HTML, and JS removes it, so no-JS users never see dead controls.

**Product card** (`ul.products__grid[data-reveal-group] > li.products__item[data-reveal][data-occasions="…"] > article.product`):
- `article.product`: `display:flex; flex-direction:column; height:100%; background: var(--color-white); border:1px solid var(--color-line); border-radius: var(--radius-md); overflow:hidden; transition: box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);`
- Media: `.media.media--4x5` with radius 0 (the card clips it), optional `.badge`.
- Body `.product__body`: padding 20px (24px at ≥1024), flex column, `flex:1`. H3 `.product__name` (serif `--fs-500` 600) → `p.product__desc` (`--fs-200` ink-soft, margin-top 8px) → footer `.product__footer` (`margin-top:auto; padding-top:20px; display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap`) holding `p.product__price` (`<data value="850000">850.000₫</data>`, price style) and `a.btn.btn--secondary.btn--sm` "Đặt hoa".
- **Hover** (`@media (hover:hover)`, `article:hover`): shadow md, `translateY(-4px)`, image scale 1.04 over `--dur-image`. **Focus-within:** shadow md (no translate). The button has its own focus ring.

**Products (order is final).**

| # | Name (H3) | Description | Price (`data value`) | Badge | `data-occasions` | `data-product` |
|---|---|---|---|---|---|---|
| 1 | Đào Phai | Hồng cam đào, mao lương và lá bạc trong bình thủy tinh, dịu dàng như nắng sớm. | 850.000₫ (`850000`) | Bán chạy nhất | `sinh-nhat tinh-yeu` | `dao-phai` |
| 2 | Hồng Nhung | Bó hồng đỏ Đà Lạt dày dặn, gói giấy lụa — lời yêu thương không cần nói thành lời. | 1.150.000₫ (`1150000`) | — | `tinh-yeu` | `hong-nhung` |
| 3 | Nắng Hạ | Hướng dương rạng rỡ bó cùng lá xanh, gửi một lời chúc thật tươi và đầy năng lượng. | 720.000₫ (`720000`) | — | `sinh-nhat khai-truong` | `nang-ha` |
| 4 | Phú Quý | Chậu lan hồ điệp hai cành trong chậu sứ trắng, bền đẹp nhiều tuần — hợp khai trương và Tết. | 1.850.000₫ (`1850000`) | — | `khai-truong` | `phu-quy` |
| 5 | Mây Trắng | Bó hoa baby trắng tinh khôi, nhẹ như một áng mây — món quà nhỏ cho sinh nhật hay lời cảm ơn. | 490.000₫ (`490000`) | Mới | `sinh-nhat tinh-yeu` | `may-trang` |
| 6 | Tĩnh Tại | Hồng trắng và mao lương trắng, sắc thanh nhã để gửi lời chia buồn và tưởng nhớ. | 1.250.000₫ (`1250000`) | — | `chia-buon` | `tinh-tai` |

Button markup per card: `<a class="btn btn--secondary btn--sm" href="#dat-hoa" data-product="dao-phai">Đặt hoa<span class="visually-hidden"> mẫu Đào Phai</span></a>`. Use the matching name per card.

**Filter chips (order is final).**

| Chip label | `data-filter` | Matching products | Initial `aria-pressed` |
|---|---|---|---|
| Tất cả | `all` | 6 | `true` |
| Sinh nhật | `sinh-nhat` | Đào Phai, Nắng Hạ, Mây Trắng (3) | `false` |
| Tình yêu & Kỷ niệm | `tinh-yeu` | Đào Phai, Hồng Nhung, Mây Trắng (3) | `false` |
| Khai trương & Tết | `khai-truong` | Nắng Hạ, Phú Quý (2) | `false` |
| Chia buồn | `chia-buon` | Tĩnh Tại (1) | `false` |

**Copy (other).**

| Element | Text |
|---|---|
| Eyebrow | Hoa bán chạy |
| H2 (`#products-title`) | Những bó hoa được yêu thích nhất |
| Intro | Cắm trong ngày, giá đã gồm thiệp viết tay và giấy gói, chưa gồm phí giao. Hoa thật có thể khác ảnh đôi chút theo mùa. |
| Filter label | Lọc theo dịp |
| Live status, all (`#product-status`, `.visually-hidden`, `aria-live="polite"`) | Đang hiển thị tất cả 6 mẫu hoa. |
| Live status, filtered | Đang hiển thị {n} mẫu hoa cho dịp {chip label}. (e.g. "Đang hiển thị 3 mẫu hoa cho dịp Sinh nhật.") |
| Empty state (`p.products__empty[hidden]`; not reachable with current data, but required) | Chưa có mẫu sẵn cho dịp này — gọi 0900 123 456 để Mộc Sương cắm riêng cho bạn. |

**States.** Chip states per §5.0. Card hover and focus as above. Filtered-out items get the `hidden` attribute on the `<li>`. Shown items fade in (§7.6).

---

### 5.6 Shop by occasion (`section#theo-dip.occasions`)

**Purpose.** A fast path for people who know the occasion but not the flower. Each tile pre-fills the order form.

**Layout.** BG ivory. Centered section header (`.section-head--center`).
- **< 768px:** 2 columns, gap 12px.
- **≥ 768px:** 4 columns, gap 20px. Max-width of the grid equals the container.
- Tile (`a.occasion`): `display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:8px; min-height:152px; padding:24px 12px; background: var(--color-white); border:1px solid var(--color-line); border-radius: var(--radius-md); color: var(--color-ink); text-decoration:none; transition: border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);`
- Icon 40px, forest, stroke 1.25, margin-bottom 4px. Name `.occasion__name` (sans 600 `--fs-300`). Note `.occasion__note` (`--fs-100` ink-muted).

**States.** Hover: border forest, shadow sm, `translateY(-2px)`, icon color rose. Active: `translateY(0)`. Focus-visible: global ring. The `data-reveal` attribute goes on the `<li>`, not on the `<a>`.

**Copy and data.**

| # | Icon | Name | Note | `data-occasion` |
|---|---|---|---|---|
| 1 | `i-cake` | Sinh nhật | Tươi vui, rực rỡ | `sinh-nhat` |
| 2 | `i-heart` | Tình yêu & Kỷ niệm | Hồng đỏ, hồng kem | `tinh-yeu` |
| 3 | `i-tulip` | Ngày Phụ nữ | 8/3 · 20/10 | `phu-nu` |
| 4 | `i-blossom` | Tết Nguyên đán | Mai, đào, lan hồ điệp | `tet` |
| 5 | `i-rings` | Cưới hỏi | Hoa cưới, hoa bàn tiệc | `cuoi-hoi` |
| 6 | `i-ribbon` | Khai trương | Kệ hoa, lan chúc mừng | `khai-truong` |
| 7 | `i-lotus` | Chia buồn | Trang nghiêm, thanh tịnh | `chia-buon` |
| 8 | `i-building` | Doanh nghiệp | Hoa văn phòng, sự kiện | `doanh-nghiep` |

All tiles: `href="#dat-hoa"`. Section header: eyebrow **Theo dịp** · H2 (`#occasions-title`) **Mỗi dịp, một ngôn ngữ của hoa** · intro **Chọn dịp bạn cần — chúng tôi sẽ điền sẵn vào phiếu đặt hoa và gợi ý mẫu phù hợp khi gọi lại.**

---

### 5.7 Brand story / craft (`section#cau-chuyen.story.section--forest.on-dark`)

**Purpose.** Justify the premium through ritual, craft and sustainability. It is the one dark "editorial pause" in the page.

**Layout.** BG forest, text on-dark.
- **< 1024px:** single column. Image first: `.media.media--4x3`, full container width, max-width 640px. Then content with margin-top 40px, max-width 640px.
- **≥ 1024px:** 12-column grid, `align-items:center`. Image spans columns 1–5 with `.media` `aspect-ratio: 4/5`. Content spans columns 7–12.
- Ornament: `i-sprig` 140px, color sage, opacity 0.5, stroke 1, absolutely positioned at the top-right of the content column (`top:-24px; right:0`), ≥1024 only, aria-hidden.

**Anatomy.** Eyebrow (color rose-soft, `::before` line rose-soft) → H2 (on-dark) → two paragraphs (`--fs-300`, on-dark-soft, max-width `--measure`, gap 16px) → stats `dl.story__stats` (margin-top 40px, padding-top 24px, `border-top:1px solid var(--color-line-on-dark)`, `display:grid; grid-template-columns: repeat(3, 1fr); gap:16px`; each `div` holds `dt` and `dd`. The **number is in `<dd>`**, serif `--fs-600` 500 on-dark, and `<dt>` is the label, `--fs-100` on-dark-soft. CSS `order` or `flex-direction: column-reverse` puts the number above the label visually) → signature (margin-top 32px: name serif italic `--fs-500` on-dark; role `--fs-100` on-dark-soft) → `.btn.btn--on-dark` (margin-top 32px).

**Copy.**

| Element | Text |
|---|---|
| Eyebrow | Câu chuyện Mộc Sương |
| H2 (`#story-title`) | Cắm hoa chậm, để lời thương được trọn vẹn |
| Paragraph 1 | Mộc Sương bắt đầu từ một góc hiên nhỏ ở phố cổ Hà Nội vào mùa thu năm 2018, với một niềm tin giản dị: bó hoa đẹp không cần cầu kỳ — chỉ cần tươi, có chủ ý và được làm bằng cả sự tận tâm. |
| Paragraph 2 | Mỗi sáng, các nghệ nhân của chúng tôi có mặt ở chợ hoa Quảng Bá từ 5 giờ để chọn từng cành. Chúng tôi ưu tiên hoa theo mùa, gói bằng giấy tái chế và không dùng xốp cắm hoa dùng một lần. |
| Stat 1 (dd / dt) | 2018 / Năm atelier mở cửa |
| Stat 2 | 5:00 / Giờ chọn hoa mỗi sáng |
| Stat 3 | 100% / Thiệp được viết tay |
| Signature name | Nguyễn Hạ Vy |
| Signature role | Nhà sáng lập & nghệ nhân cắm hoa |
| Button | Đặt một bó hoa riêng → `#dat-hoa` |

**States.** The button uses `.btn--on-dark` states, with focus ring `--color-focus-on-dark`.

---

### 5.8 How ordering & same-day delivery work (`section#cach-dat-hoa.process`)

**Purpose.** Remove logistic doubt: the steps, the 16:00 cut-off, the delivery window, fees and payment.

**Layout.** BG paper.
- **< 1024px:** single column. Order: section header → image (`<picture>`, `.media--3x2`, margin-bottom 40px) → steps → delivery card (margin-top 40px).
- **≥ 1024px:** 12-column grid, `align-items:start`. `.process__media` spans columns 1–5 with `position: sticky; top: calc(var(--header-h) + 32px);` and `.media` `aspect-ratio: 4/5`. `.process__content` spans columns 7–12 and contains the section header, steps and delivery card.

**Image markup (art-directed, MUST):**
```html
<div class="media process__frame" style="--media-fallback: var(--fallback-sand)">
  <span class="media__fallback" aria-hidden="true"><svg class="icon"><use href="#i-sprig"></use></svg></span>
  <picture>
    <source media="(min-width: 1024px)"
            srcset="https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?auto=format&amp;fit=crop&amp;q=75&amp;w=480&amp;h=600 480w,
                    https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?auto=format&amp;fit=crop&amp;q=75&amp;w=800&amp;h=1000 800w"
            sizes="(min-width: 1280px) 480px, 37vw" width="800" height="1000">
    <img src="https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?auto=format&amp;fit=crop&amp;q=75&amp;w=800&amp;h=533"
         srcset="…w=480&amp;h=320 480w, …w=800&amp;h=533 800w, …w=1200&amp;h=800 1200w"
         sizes="(min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)"
         width="800" height="533" loading="lazy" decoding="async"
         alt="Bàn tay trao bó hoa hướng dương gói giấy kraft kèm tấm thiệp nhỏ">
  </picture>
</div>
```
`.process__frame { aspect-ratio: 3/2 }` below 1024 and `aspect-ratio: 4/5` from 1024. `picture` is `display: contents`.

**Steps** (`ol.steps[data-reveal-group] > li.step[data-reveal]`): each `li` is a grid `grid-template-columns: 56px 1fr; gap: 16px; padding-block: 24px; border-top: 1px solid var(--color-line)`. The first step has no border-top. `span.step__num[aria-hidden="true"]` is serif `--fs-600` 500 rose. Then H3 (sans 600 `--fs-400`) and p (`--fs-300` ink-soft, margin-top 6px). Use `list-style:none`. The visible number is decorative; `<ol>` carries the semantics.

**Delivery card** (`div.delivery`): bg ivory, 1px line border, radius lg, padding 24px (32px at ≥768). H3 `.delivery__title` (sans 600 `--fs-400`). `dl.delivery__list` (margin-top 16px): 1 column below 768px, 2 columns from 768px (`gap: 20px 32px`). Each `div` holds `dt` (`--fs-200` 600 ink) and `dd` (`--fs-200` ink-soft, margin 4px 0 0).

**Copy.**

| Element | Text |
|---|---|
| Eyebrow | Đặt hoa & giao hàng |
| H2 (`#process-title`) | Đặt hoa dễ dàng, nhận hoa trong ngày |
| Intro | Bốn bước đơn giản, từ lúc bạn chọn mẫu đến khi hoa đến tay người nhận. |
| Step 01 H3 / p | Chọn mẫu hoặc kể ý tưởng / Chọn một mẫu có sẵn, hoặc kể cho chúng tôi nghe về người nhận, dịp đặc biệt và ngân sách của bạn. |
| Step 02 | Xác nhận trong 15 phút / Mộc Sương gọi lại hoặc nhắn Zalo để chốt mẫu hoa, lời nhắn trên thiệp và khung giờ giao. |
| Step 03 | Duyệt ảnh hoa thật / Bạn nhận ảnh bó hoa hoàn thiện trước khi giao. Chưa ưng ý, chúng tôi chỉnh lại ngay, miễn phí. |
| Step 04 | Giao tận tay / Shipper của Mộc Sương giao đúng khung giờ, kèm thẻ hướng dẫn chăm hoa để hoa tươi lâu hơn. |
| Delivery card H3 | Thông tin giao hàng |
| dt / dd 1 | Giao trong ngày / Đặt trước 16:00, nhận hoa ngay hôm nay tại nội thành Hà Nội. |
| dt / dd 2 | Khung giờ giao / 8:00 – 20:00 mỗi ngày, chọn khung 2 tiếng phù hợp. |
| dt / dd 3 | Phí giao hàng / Miễn phí cho đơn từ 1.000.000₫. Đơn dưới 1.000.000₫: 30.000₫ trong nội thành. |
| dt / dd 4 | Thanh toán / Chuyển khoản, ví điện tử hoặc tiền mặt khi nhận hoa. |

Step numbers: 01, 02, 03, 04.

**States.** Static.

---

### 5.9 Testimonials (`section#danh-gia.testimonials`)

**Purpose.** Social proof that covers the three main use cases: a family gift, romance and corporate orders.

**Layout.** BG ivory. Centered section header. Static grid; there is no carousel.
- **< 1024px:** 1 column, gap 24px, `max-width: 640px; margin-inline: auto`.
- **≥ 1024px:** 3 columns, gap `--grid-gap`, `align-items: stretch`.

**Anatomy** (`ul[data-reveal-group] > li[data-reveal] > figure.quote`): bg white, 1px line border, radius md, padding 24px (32px at ≥768), `height:100%`, flex column.
- Quote mark: `<span class="quote__mark" aria-hidden="true">“</span>`, serif, 4.5rem, line-height 0.6, rose, height 32px.
- `blockquote > p`: serif italic `--fs-500` 500 ink, line-height 1.45, margin-top 16px.
- `figcaption` (`margin-top:auto; padding-top:24px`): a 1px line border-top with 16px space above the text. `.quote__name` (`--fs-200` 600 ink, block) and `.quote__meta` (`--fs-100` ink-muted, block).

**Copy.**

| # | Quote | Name | Meta |
|---|---|---|---|
| 1 | Mình đặt hoa sinh nhật cho mẹ lúc 2 giờ chiều, 5 giờ hoa đã đến tận nhà. Bó hoa nhẹ nhàng, đúng gu mẹ, và tấm thiệp viết tay làm mẹ xúc động mãi. | Chị Minh Anh | Tây Hồ, Hà Nội · Mẫu Đào Phai |
| 2 | Được xem ảnh bó hoa thật trước khi giao làm mình yên tâm hẳn. Kỷ niệm 5 năm ngày cưới, vợ mình bất ngờ thật sự. | Anh Quốc Bảo | Cầu Giấy, Hà Nội · Mẫu Hồng Nhung |
| 3 | Công ty mình đặt 40 bó hoa dịp 20/10. Mộc Sương tư vấn nhanh, giao đúng giờ và bó nào cũng chỉn chu như nhau. | Chị Thu Hà | Phòng Hành chính – Nhân sự, Đống Đa · Đơn doanh nghiệp |

Section header: eyebrow **Khách hàng nói gì** · H2 (`#testimonials-title`) **Những lời thương đã được gửi trao**

**States.** Static.

---

### 5.10 Order / contact CTA with form (`section#dat-hoa.order.section--blush`)

**Purpose.** Convert. Capture a callback request with the minimum friction and offer instant alternatives (hotline, Zalo).

**Layout.** BG blush.
- **< 1024px:** single column. Info block first (max-width 640px), then the form card (margin-top 40px, full container width).
- **≥ 1024px:** 12-column grid, `align-items:start`. `.order__info` spans columns 1–5. `.order__card` spans columns 6–12.
- **Form card** (`.order__card`): bg white, radius lg, shadow md, padding 24px (<768) / 40px (≥768).
- **Form grid** (`form.order-form`): `display:grid; gap:20px`. 1 column below 768px. From 768px: `grid-template-columns: 1fr 1fr; column-gap: 20px`. Placement from 768: Name | Phone; Occasion | Product; Date | (empty); Message spans 2; status spans 2; actions span 2.
- **Actions row** (`.order-form__actions`): flex column, gap 12px. Below 768px the submit is `.btn--block`. From 768px it is a row with `align-items:center; justify-content:space-between`: submit (auto width) and the privacy note on the right (`--fs-100` ink-muted, max-width 32ch).

**Info block anatomy.** Eyebrow → H2 → lead (`--fs-400` ink-soft) → `ul.contact-list` (margin-top 32px, gap 12px; each item is flex, gap 12px, 20px forest icon, `--fs-300`; link items min-height 44px) → note (`--fs-200` ink-soft, margin-top 24px, padding 16px 20px, bg `--color-ivory-glass`, radius md).

**Info copy.**

| Element | Text |
|---|---|
| Eyebrow | Đặt hoa |
| H2 (`#order-title`) | Gửi hoa đến người thương, ngay hôm nay |
| Lead | Để lại thông tin, Mộc Sương sẽ gọi lại trong 15 phút để tư vấn mẫu, chốt lời nhắn và giờ giao (7:00 – 21:00 mỗi ngày). |
| Contact 1 (`i-phone`) | Hotline: 0900 123 456 → `tel:+84900123456` |
| Contact 2 (`i-chat`) | Nhắn Zalo: 0900 123 456 → `https://zalo.me/0900123456` (new tab, + `i-arrow-up-right` 16px + visually hidden " (mở trong tab mới)") |
| Contact 3 (`i-clock`) | Mở cửa 7:00 – 21:00, tất cả các ngày |
| Contact 4 (`i-pin`) | Số 9 ngõ Sương Mai, phường Hoàn Kiếm, Hà Nội |
| Note | Đơn doanh nghiệp, sự kiện hoặc tiệc cưới? Gọi hotline để nhận báo giá riêng trong 24 giờ. |

**Form fields (order is final).**

| # | Label | Control | `id` / `name` | Attributes | Hint (id) | Required |
|---|---|---|---|---|---|---|
| 1 | Họ và tên | `input type="text"` | `order-name` / `name` | `autocomplete="name"`, `maxlength="60"`, `placeholder="Ví dụ: Nguyễn Minh Anh"`, `aria-describedby="order-name-error"` | — | yes |
| 2 | Số điện thoại | `input type="tel"` | `order-phone` / `phone` | `autocomplete="tel"`, `inputmode="tel"`, `maxlength="16"`, `placeholder="0901 234 567"`, `aria-describedby="order-phone-hint order-phone-error"` | Mộc Sương sẽ gọi hoặc nhắn Zalo vào số này để xác nhận. (`order-phone-hint`) | yes |
| 3 | Dịp tặng hoa | `select` | `order-occasion` / `occasion` | `aria-describedby="order-occasion-error"` | — | yes |
| 4 | Mẫu hoa | `select` | `order-product` / `product` | `aria-describedby="order-product-hint"` | Bạn có thể để trống, chúng tôi sẽ tư vấn theo ngân sách. (`order-product-hint`) | no |
| 5 | Ngày giao hoa | `input type="date"` | `order-date` / `delivery_date` | `min`/`max` set by JS, `aria-describedby="order-date-hint order-date-error"` | Đặt trước 16:00 để nhận hoa trong ngày. (`order-date-hint`) | yes |
| 6 | Lời nhắn | `textarea rows="4"` | `order-message` / `message` | `maxlength="200"`, `placeholder="Ví dụ: Chúc mẹ tuổi mới thật nhiều niềm vui!"`, `aria-describedby="order-message-hint order-message-count"` | Lời nhắn viết tay trên thiệp, hoặc yêu cầu riêng về màu sắc. Tối đa 200 ký tự. (`order-message-hint`); counter `0/200` (`order-message-count`, right-aligned, `--fs-100` ink-muted) | no |

Required fields carry the HTML `required` attribute plus the visual `*`. Optional labels append "(không bắt buộc)". Above the fields, inside the form, the first line reads **Các mục có dấu \* là bắt buộc.** (`--fs-100` ink-muted, spanning 2 columns).

**Occasion `<select>` options (value → label):** `""` → Chọn dịp tặng hoa · `sinh-nhat` → Sinh nhật · `tinh-yeu` → Tình yêu & Kỷ niệm · `phu-nu` → Ngày Phụ nữ 8/3 · 20/10 · `tet` → Tết Nguyên đán · `cuoi-hoi` → Cưới hỏi · `khai-truong` → Khai trương · `chia-buon` → Chia buồn · `doanh-nghiep` → Doanh nghiệp & Sự kiện · `khac` → Dịp khác

**Product `<select>` options:** `""` → Nhờ Mộc Sương tư vấn
`<optgroup label="Hoa bán chạy">`: `dao-phai` → Đào Phai — 850.000₫ · `hong-nhung` → Hồng Nhung — 1.150.000₫ · `nang-ha` → Nắng Hạ — 720.000₫ · `phu-quy` → Phú Quý — 1.850.000₫ · `may-trang` → Mây Trắng — 490.000₫ · `tinh-tai` → Tĩnh Tại — 1.250.000₫
`<optgroup label="Theo bộ sưu tập">`: `bst-thu-ha-noi` → Bộ sưu tập Thu Hà Nội — từ 590.000₫ · `bst-suong-mai` → Bộ sưu tập Sương Mai — từ 750.000₫ · `bst-hy-su` → Bộ sưu tập Hỷ Sự — từ 2.500.000₫

**Status line** (`div#form-status.form-status`, `role="status"`, spans 2 columns). It contains `svg.icon` (`i-alert`, aria-hidden) and `span.form-status__text`. It is **always rendered and never `hidden` or `display:none`**, because a live region must already be in the accessibility tree when its text changes. Without `.is-visible`, it uses the `.visually-hidden` declarations and its text is empty. With `.is-visible` (errors present), it shows with bg error-bg, error text color, `--fs-200` 600, padding 12px 16px, radius sm, flex with gap 8px.

**Submit:** `button.btn.btn--primary[type="submit"]` with the label **Gửi yêu cầu đặt hoa**. Loading label: **Đang gửi…**
**Privacy note:** **Thông tin của bạn chỉ dùng để liên hệ về đơn hoa này.**
**No-JS note** (inside `<noscript>`, above actions, `--fs-200` ink-soft): **Biểu mẫu cần JavaScript để gửi. Bạn có thể gọi ngay 0900 123 456 để đặt hoa.**

**Error messages (exact, Vietnamese).**

| Field | Condition | Message |
|---|---|---|
| Họ và tên | empty (after trim) | Vui lòng nhập họ và tên. |
| Họ và tên | fails pattern (§7.8) | Họ và tên chỉ gồm chữ cái và khoảng trắng, từ 2 đến 60 ký tự. |
| Số điện thoại | empty | Vui lòng nhập số điện thoại. |
| Số điện thoại | invalid VN format | Số điện thoại chưa đúng. Ví dụ: 0901 234 567 hoặc +84 901 234 567. |
| Dịp tặng hoa | `""` | Vui lòng chọn dịp tặng hoa. |
| Ngày giao hoa | empty or unparseable | Vui lòng chọn ngày giao hoa. |
| Ngày giao hoa | before today | Ngày giao không thể là ngày đã qua. |
| Ngày giao hoa | today and local time ≥ 16:00 | Đơn giao trong hôm nay cần đặt trước 16:00. Vui lòng chọn ngày mai hoặc gọi 0900 123 456. |
| Ngày giao hoa | more than 90 days ahead | Mộc Sương nhận đặt trước tối đa 90 ngày. |
| Form status | n ≥ 1 invalid fields | Vui lòng kiểm tra lại {n} mục được đánh dấu. |

**Success panel** (`div#order-success.order-success[hidden]`, inside `.order__card`, replaces the form): centered text, padding-block 24px.
- Icon: `i-check-circle` 48px, success color, inside a 72px circle with bg success-bg.
- H3 (`#order-success-title`, `tabindex="-1"`, serif `--fs-600` 600, margin-top 20px): **Mộc Sương đã nhận yêu cầu của bạn**
- Paragraph (`--fs-300` ink-soft, margin-top 12px, max-width 44ch, centered): **Cảm ơn {name}. Chúng tôi sẽ gọi lại số {phone} trong 15 phút (7:00 – 21:00) để xác nhận mẫu hoa, lời nhắn và giờ giao.** `{name}` is the trimmed name with whitespace collapsed. `{phone}` is the value as typed, trimmed. Insert both with `textContent` only.
- Small line (`--fs-200`, margin-top 8px): **Cần gấp? Gọi ngay** followed by the link **0900 123 456** (`tel:+84900123456`).
- Button `.btn--secondary` (margin-top 24px): **Gửi thêm một yêu cầu khác**
- Entrance: opacity 0→1 and translateY(8px)→0 over `--dur-slow` `--ease-out`. No motion under reduced motion.

**States summary.** Field default, hover, focus, invalid, disabled and prefilled as in §5.0. Submit: default, hover, active, focus, loading (`is-loading` + `aria-disabled="true"`; further submits are ignored). Error status shown or hidden. Success panel shown or hidden.

**DOM outline.**
```
section#dat-hoa.order.section.section--blush[aria-labelledby=order-title]
  div.container.order__grid
    div.order__info  (eyebrow, h2#order-title, p.lead, ul.contact-list, p.order__note)
    div.order__card
      form#order-form.order-form[action="#dat-hoa"][method="post"][aria-labelledby=order-title]
        p.order-form__required
        div.field (label[for=order-name], input#order-name, p#order-name-error.field__error[hidden])
        div.field (label, input#order-phone, p#order-phone-hint.field__hint, p#order-phone-error.field__error[hidden])
        div.field (label, div.select > select#order-occasion + svg i-chevron-down, p#order-occasion-error[hidden])
        div.field (label, div.select > select#order-product + svg, p#order-product-hint)
        div.field (label, input#order-date, p#order-date-hint, p#order-date-error[hidden])
        div.field.field--full (label, textarea#order-message, div.field__meta > p#order-message-hint + span#order-message-count)
        noscript > p
        div#form-status.form-status[role=status] (svg i-alert + span.form-status__text; never hidden, see Status line)
        div.order-form__actions (button[type=submit].btn.btn--primary, p.order-form__privacy)
      div#order-success.order-success[hidden] (…)
```

---

### 5.11 Footer (`footer#lien-he.site-footer.on-dark`)

**Purpose.** Contact, address, hours and social links, plus an honest disclosure.

**Layout.** BG forest-deep, text on-dark. Padding: 64px top, 32px bottom.
- **< 768px:** 1 column, gap 40px.
- **768–1023px:** 2 columns, gap 40px 32px.
- **≥ 1024px:** 4 columns `grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 32px`.
- Bottom bar `.site-footer__bottom`: margin-top 48px, padding-top 24px, `border-top: 1px solid var(--color-line-on-dark)`, `--fs-100` on-dark-soft. Below 768px it is a column with gap 8px. From 768px it is a flex row, `justify-content: space-between`, wrapping.

**Anatomy.**
- Column 1 (brand): logo (same as header, colors on-dark and the sprig in rose-soft, **not a link**), tagline (serif italic `--fs-500` on-dark, margin-top 20px), blurb (`--fs-200` on-dark-soft, margin-top 12px, max-width 36ch).
- Columns 2–4: H2 `.footer__title` (sans `--fs-100` 600, uppercase, letter-spacing `--tracking-eyebrow`, rose-soft, margin-bottom 16px), then a `ul` (gap 4px). Every link item has `display:inline-flex; align-items:center; gap:10px; min-height:44px;`, `--fs-200` on-dark, no underline by default and an underline on hover. Text items use `--fs-200` on-dark-soft with `padding-block: 10px`.
- External links: `target="_blank" rel="noopener noreferrer"`, followed by the `i-arrow-up-right` 16px icon and `<span class="visually-hidden"> (mở trong tab mới)</span>`.
- The address is wrapped in `<address>` (font-style normal).

**Copy.**

| Element | Text |
|---|---|
| Logo | Mộc Sương / Atelier hoa |
| Tagline | Hoa tươi mỗi sớm, trọn vẹn lời thương. |
| Blurb | Atelier hoa tươi thủ công giữa lòng phố cổ Hà Nội. Hoa tuyển mỗi sớm, cắm bằng sự tận tâm và giao trong ngày. |
| Col 2 title | Liên hệ |
| Col 2 items | (`i-pin`) Số 9 ngõ Sương Mai, phường Hoàn Kiếm, Hà Nội · (`i-phone`) Hotline: 0900 123 456 → `tel:+84900123456` · (`i-mail`) xinchao@mocsuong.vn → `mailto:xinchao@mocsuong.vn` |
| Col 3 title | Giờ mở cửa |
| Col 3 items | Thứ Hai – Chủ nhật: 7:00 – 21:00 · Giao hoa: 8:00 – 20:00 · Nhận đơn trực tuyến 24/7 |
| Col 4 title | Theo dõi Mộc Sương |
| Col 4 links | Zalo → `https://zalo.me/0900123456` · Facebook → `https://www.facebook.com/mocsuong.atelier` · Instagram → `https://www.instagram.com/mocsuong.atelier` |
| Bottom 1 | © `<span data-year>2026</span>` Mộc Sương Atelier. Hình ảnh: Unsplash. |
| Bottom 2 | Mộc Sương là thương hiệu minh họa — địa chỉ, số điện thoại và mạng xã hội chỉ dùng cho mục đích trình diễn. |
| Bottom 3 (link) | Lên đầu trang ↑ → `#trang-chu` (the arrow is text; wrap it in `<span aria-hidden="true">`) |

**States.** Link hover adds an underline (1px, offset 0.2em). Focus ring uses `--color-focus-on-dark`. Active color is rose-soft.

---

## 6. Responsive rules

### 6.1 Breakpoints (mobile-first, `min-width` only)

| Name | Query | Design reference width |
|---|---|---|
| base | (none) | 360px. Must also work at **320px**. |
| sm | `@media (min-width: 480px)` | 480px |
| md | `@media (min-width: 768px)` | 768px |
| lg | `@media (min-width: 1024px)` | 1280px |
| xl | `@media (min-width: 1280px)` | 1440px |

Do not add other breakpoints. Hover-only effects go inside `@media (hover: hover)`.

### 6.2 Container and gutters

| Breakpoint | `--gutter` (side padding) | `--grid-gap` | `--header-h` | Usable content width |
|---|---|---|---|---|
| base | 16px | 24px | 64px | viewport − 32px (288px at 320) |
| sm | 24px | 24px | 64px | viewport − 48px |
| md | 32px | 24px | 64px | viewport − 64px |
| lg | 40px | 32px | 76px | viewport − 80px |
| xl | 48px | 32px | 76px | capped at 1200px |

### 6.3 Layout matrix (columns per section)

| Section | base | sm (480) | md (768) | lg (1024) | xl (1280) |
|---|---|---|---|---|---|
| Header | logo + call + menu | same | same | logo + nav + CTA | + phone number |
| Hero | 1 col, stacked buttons | 1 col, inline buttons | 1 col | 12-col: 1–6 text / 8–12 image | same |
| Values | 1 col (icon left) | 2 col | 2 col | 4 col (dividers) | same |
| Collections | 1 col, media 4:3 | 1 col, 4:3 | 3 col, 3:4 | 3 col, 3:4, middle card +64px | same |
| Products | 1 col | 2 col | 2 col | 3 col | same |
| Occasions | 2 col | 2 col | 4 col | 4 col | same |
| Story | 1 col, media 4:3 | same | same | 12-col: 1–5 image (4:5) / 7–12 text | same |
| Process | 1 col, media 3:2 | same | same (delivery dl 2 col) | 12-col: 1–5 sticky image (4:5) / 7–12 content | same |
| Testimonials | 1 col (max 640) | same | same | 3 col | same |
| Order | 1 col, form 1 col | same | 1 col, form 2 col | 12-col: 1–5 info / 6–12 form | same |
| Footer | 1 col | 1 col | 2 col | 4 col | same |

### 6.4 Navigation on small screens

Below 1024px the desktop nav is `display:none`. The menu toggle opens the full-height panel described in §5.1. The call icon-button stays visible in the header at all widths below 1024px. The panel closes on link click, Esc, a toggle click, or when the viewport crosses to ≥1024px.

### 6.5 Hard rules

- **Touch targets:** every interactive element is at least 44×44px: buttons, chips, icon buttons, nav links, mobile menu links, footer links, contact links and `.link-arrow`. Inline links inside paragraphs are exempt (WCAG 2.5.8 inline exception), but none exist in this copy except the success panel's tel link, which MUST have `display:inline-flex; min-height:44px; align-items:center`.
- **No horizontal scroll at 320px:** `document.documentElement.scrollWidth` MUST equal `clientWidth` at 320, 360, 375, 414, 768, 1024, 1280 and 1440px. Decorative SVGs live inside `overflow: clip` parents. No element may use `100vw` widths except `sizes` attributes. Do not "fix" overflow with `body { overflow-x: hidden }`; fix the cause.
- Images never upscale beyond their container. Long words and the email address wrap (`overflow-wrap: break-word` on body).
- `html { scroll-padding-top: calc(var(--header-h) + 16px); }` keeps anchor targets clear of the sticky header.
- `html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }`
- Text remains readable at 200% browser zoom with no clipped content (WCAG 1.4.4). Do not set fixed heights on text containers.

---

## 7. Interaction and motion spec (`js/main.js`)

**General.** The file is one ES2020 script loaded with `<script src="js/main.js" defer></script>` in `<head>`. Wrap everything in an IIFE with `'use strict'`. No dependencies, no `innerHTML` with user data, and no `console.*` in shipped code. Size target is ≤ 15 KB unminified. Each module below is a named function called from an `init()` at the bottom. Each one MUST no-op safely if its elements are missing.

`const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');` is read live (`reduceMotion.matches`) wherever motion decisions are made.

### 7.1 Header scrolled state — `initHeader()`
- On `scroll` (passive), throttled with `requestAnimationFrame`, toggle `.is-scrolled` on `.site-header` when `window.scrollY > 8`. Run once on init so a reload mid-page gets the right state.
- CSS transition `--dur-base` `--ease-out` (§5.1).

### 7.2 Mobile navigation — `initMobileNav()`
Elements: `.nav-toggle`, `#mobile-menu`, `main`, `footer`.
- **Open:**
  1. Remove `hidden` from `#mobile-menu`, force a reflow (`panel.offsetHeight`), then add `.is-open`. This lets the transition play.
  2. `toggle.setAttribute('aria-expanded','true')` and `aria-label` "Đóng menu". Show `i-close` and hide `i-menu`.
  3. Set `inert` on `main` and `footer`. This contains focus to the header and panel and hides the rest from assistive technology.
  4. Add `.is-menu-open` to `<html>`. CSS gives it `overflow: hidden` to lock page scroll.
  5. Move focus to the first link in the panel.
- **Close** (function `closeMenu({ returnFocus })`):
  1. Remove `.is-open`, set `aria-expanded="false"` and `aria-label` "Mở menu", and swap the icons back.
  2. Remove `inert` from `main` and `footer` and remove `.is-menu-open`.
  3. After `--dur-slow` (400ms), or immediately when `reduceMotion.matches`, set `hidden` on the panel, but only if it is still closed.
  4. If `returnFocus`, focus the toggle.
- **Triggers:** toggle click (open or close; returnFocus true when closing). `Escape` keydown on `document` while open (returnFocus true). Click on any `a[href^="#"]` inside the panel closes with returnFocus false and lets the browser navigate. `matchMedia('(min-width: 1024px)')` `change` event closes with returnFocus false when it starts matching.
- **Motion:** panel opacity and translateY over 400ms `--ease-in-out`. Links stagger in with a 40ms delay each (CSS `transition-delay` via `:nth-child`), max 5. Under reduced motion there is no transition.

### 7.3 Smooth anchor scrolling
- CSS only: `@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }` plus `scroll-padding-top` (§6.5).
- The skip link targets `<main id="noi-dung" tabindex="-1">`, so focus moves with it.
- JS MUST NOT call `preventDefault` on in-page anchors. The browser handles scrolling and the URL hash. Prefill handlers (§7.7) run on the same click without blocking navigation.

### 7.4 Scrollspy — `initScrollSpy()`
- Observe **every** `main > section[id]` with `IntersectionObserver` (`rootMargin: '-40% 0px -55% 0px'`, `threshold: 0`).
- When a section intersects and its id is one of `bo-suu-tap, hoa-ban-chay, theo-dip, cau-chuyen, cach-dat-hoa`, set `aria-current="true"` on every nav link (desktop and mobile) whose `href` equals `#id`, and remove `aria-current` from all others. When the intersecting section is any other one (hero, values, testimonials, order), remove `aria-current` from all nav links.

### 7.5 Scroll reveal — `initReveal()`
- Skip entirely (content stays visible) if `reduceMotion.matches` or `!('IntersectionObserver' in window)`.
- Otherwise add the class `reveal-ready` to `<html>`. For every `[data-reveal-group]`, set `--reveal-delay` on its `[data-reveal]` children to `Math.min(index, 3) * 80 + 'ms'`, with the index resetting per group.
- Observe all `[data-reveal]` (`threshold: 0.15`, `rootMargin: '0px 0px -10% 0px'`). On intersect, add `.is-revealed` and `unobserve`.
- CSS (MUST be gated by `.reveal-ready` and by the media query, so no-JS and reduced-motion users never see hidden content):
```css
@media (prefers-reduced-motion: no-preference) {
  .reveal-ready [data-reveal] {
    opacity: 0;
    transform: translateY(var(--reveal-distance));
    transition: opacity var(--dur-reveal) var(--ease-out) var(--reveal-delay, 0ms),
                transform var(--dur-reveal) var(--ease-out) var(--reveal-delay, 0ms);
  }
  .reveal-ready [data-reveal].is-revealed { opacity: 1; transform: none; }
}
```
- Elements to mark `data-reveal`: each `.section-head`, value items, collection `<li>`s, product `<li>`s, occasion `<li>`s, story image and story content, process media and steps, delivery card, testimonial `<li>`s, order info and order card. **Not** the hero or the header.

### 7.6 Product filter — `initProductFilter()`
- Remove `hidden` from `.filter`.
- On chip click: set `aria-pressed="true"` on the clicked chip and `"false"` on the others. For every `li.products__item`, set `hidden` unless `filter === 'all'` or its `data-occasions` (space-separated) includes the filter value.
- Shown items play a 300ms fade-up (opacity 0→1, translateY 8px→0) via the class `.is-entering`, which is removed on `animationend`. No animation under reduced motion. Items already shown before the click do not re-animate.
- Update `#product-status` with the exact strings in §5.5, and toggle `.products__empty` when n = 0.
- Keep the active filter value in a module variable `activeFilter` for §7.7. Keyboard: chips are native buttons (Tab, Enter and Space work). Do not implement roving tabindex.

### 7.7 Prefill from occasions, products and collections — `initPrefill()`
- Delegate `click` on `document` for `a[data-occasion]` and `a[data-product]`. Do not prevent default; navigation to `#dat-hoa` proceeds.
- `data-occasion="X"`: set `#order-occasion` value to `X`.
- `data-product="Y"`: set `#order-product` value to `Y`. Additionally, if `activeFilter !== 'all'` and `#order-occasion` is empty, set the occasion to `activeFilter` (the filter values equal occasion values).
- For each field changed: add `.is-prefilled` to its `.field` for 1600ms (the flash in §5.0), and if that field was touched (§7.8), re-validate it.
- If the success panel is currently visible, call the same reset routine as the "Gửi thêm một yêu cầu khác" button **before** applying the values.

### 7.8 Form validation and simulated submit — `initOrderForm()`
- On init: `form.noValidate = true`, so JS takes over and no-JS users keep native validation. Set `#order-date` `min` to today and `max` to today + 90 days, both formatted as `YYYY-MM-DD` from **local** date parts. Never use `toISOString()`, which is UTC and is wrong for Vietnam (UTC+7) before 07:00.
- **Normalisation:** name: `value.trim().replace(/\s+/g, ' ')`. Phone: `value.replace(/[\s.\-()]/g, '')`.
- **Rules.**
  - Name: required; `/^[\p{L}\p{M}][\p{L}\p{M}\s'.-]{1,59}$/u`.
  - Phone: required; `/^(?:\+84|84|0)(?:[35789]\d{8}|2\d{9})$/`. This accepts Vietnamese mobiles (03x/05x/07x/08x/09x, 10 digits) and landlines (02x, 11 digits), with an optional +84/84 prefix.
    - Accept: `0901 234 567`, `0912.345.678`, `+84 901 234 567`, `84901234567`, `024 3826 1234`.
    - Reject: `0123456789` (old 01x prefix), `090123456` (9 digits), `09012345678` (11-digit mobile), `abc`, empty.
  - Occasion: required; non-empty.
  - Date: required. Parse `YYYY-MM-DD` with `new Date(y, m - 1, d)` (local). Rules: not before today; if equal to today and `new Date().getHours() >= 16`, error; not after today + 90 days.
  - Message: optional; `maxlength=200` is enforced by the attribute. The counter `#order-message-count` updates on `input` as `{length}/200`.
- **Timing.** A field becomes "touched" on its first `blur`. Touched fields re-validate on `input` (text fields) or `change` (select, date). On submit, all fields validate and are marked touched.
- **Showing an error:** add `.is-invalid` to the `.field`, set `aria-invalid="true"` on the control, put the message into the `span.field__error-text` inside `#{id}-error` via `textContent` (the error `<p>` holds an aria-hidden `i-alert` svg, then that span), and remove `hidden`. **Clearing:** remove the class, set `aria-invalid="false"`, empty the text and set `hidden`. Error elements stay in the DOM and are always referenced by `aria-describedby`.
- **Submit with errors:** `preventDefault`. Set `#form-status .form-status__text` to "Vui lòng kiểm tra lại {n} mục được đánh dấu.", add `.is-visible`, and focus the **first** invalid control in DOM order. While the status is visible, re-count after each re-validation and update the text. When all errors are fixed, empty the text and remove `.is-visible`.
- **Submit valid:** `preventDefault`. If already loading, ignore. Add `.is-loading` and `aria-disabled="true"` to the submit and replace its label with "Đang gửi…". Do **not** use the `disabled` attribute, because it drops focus. After **900ms** (`setTimeout`; there is **no network request**; add the comment `// TODO: kết nối API đặt hoa khi có backend`):
  - Fill `{name}` and `{phone}` in the success text with `textContent`.
  - Set `hidden` on the form and remove `hidden` from `#order-success`.
  - Focus `#order-success-title`.
  - Restore the submit button state.
- **Reset** ("Gửi thêm một yêu cầu khác"): `form.reset()`, clear all errors, touched flags and the status, reset the counter to `0/200`, hide the success panel, show the form and focus `#order-name`.
- **Data stays local.** Nothing is stored in `localStorage`, cookies or the URL.

### 7.9 Image fallback — `initImageFallbacks()`
```js
document.querySelectorAll('.media img').forEach((img) => {
  const frame = img.closest('.media');
  const fail = () => frame.classList.add('is-error');
  if (img.complete && img.naturalWidth === 0 && img.currentSrc) fail();
  else img.addEventListener('error', fail, { once: true });
});
```
Run this first in `init()`, before other modules, so early failures are caught.

### 7.10 Footer year — `initYear()`
Set `textContent` of `[data-year]` to `new Date().getFullYear()`.

### 7.11 Motion inventory

| Motion | Property | Duration | Easing | Trigger | Reduced motion |
|---|---|---|---|---|---|
| Hero text load-in | opacity, translateY 16px | 800ms, stagger 100ms | `--ease-out` | page load | none (static) |
| Hero image settle | scale 1.04→1 | 1400ms | `--ease-out` | page load | none |
| Header scrolled | bg, border, shadow | 250ms | `--ease-out` | scrollY > 8 | color-only change, instant |
| Mobile menu | opacity, translateY −8px | 400ms (links +40ms each) | `--ease-in-out` | toggle | instant |
| Scroll reveal | opacity, translateY 24px | 700ms, stagger 80ms (max 240ms) | `--ease-out` | 15% in view | disabled; content visible |
| Button hover | bg/color/border | 250ms | `--ease-out` | hover | instant |
| Button arrow | translateX 4px | 250ms | `--ease-out` | hover | none |
| Card lift | translateY −4px, shadow | 250ms | `--ease-out` | hover | shadow only, no movement |
| Image zoom | scale 1.04 | 800ms | `--ease-out` | card hover | none |
| Occasion tile | translateY −2px, border, shadow | 250ms | `--ease-out` | hover | border and shadow only |
| Filter enter | opacity, translateY 8px | 300ms | `--ease-out` | filter change | none |
| Prefill flash | background blush→white | 1600ms | `--ease-out` | prefill | none |
| Success panel | opacity, translateY 8px | 400ms | `--ease-out` | success | none |
| Spinner | rotate 360° | 800ms linear, infinite | linear | loading | static ring |

Global safety net (MUST be the last block in `styles.css`):
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Never autoplay anything. Nothing moves for more than 1.4s.

---

## 8. Accessibility requirements (WCAG 2.1 AA)

1. **Language:** `<html lang="vi">`. Proper nouns stay in Vietnamese. The English words "Atelier" and "Zalo" need no `lang` override.
2. **Landmarks:** exactly one `header` (banner), one `nav[aria-label="Điều hướng chính"]` plus one `nav[aria-label="Điều hướng trên di động"]`, one `main#noi-dung`, and one `footer` (contentinfo). Every `section` has `aria-labelledby` pointing at its H2.
3. **Headings:** exactly one H1 (hero). Each section has one H2 (values uses a visually hidden H2). Cards, steps, values, delivery and success use H3. Footer column titles are H2. No skipped levels.
4. **Skip link:** first focusable element. It becomes visible on focus and moves focus to `main` (§5.1).
5. **Keyboard:** all functionality works with the keyboard alone. Tab order follows visual order. There are no positive `tabindex` values. The mobile menu behaves as in §7.2 (inert background, Esc closes, focus returns). Chips are buttons with `aria-pressed`.
6. **Focus visible:** a 2px ring with 3px offset on every focusable element, in forest on light sections and sand `#F0C38E` on dark sections. It must never be clipped by `overflow:hidden`; when a card clips, give the focused element inner space or use `outline-offset: -3px`.
7. **Forms:** every control has a visible `<label for>`. Required fields use `required` plus a visual `*` (the `*` is `aria-hidden`), and the form explains the asterisk in text. Hints and errors are linked by `aria-describedby`. Invalid controls get `aria-invalid="true"`. Errors use text plus an icon plus a border, never color alone. The status region is `role="status"`. On a failed submit, focus moves to the first invalid field. On success, focus moves to the success heading. Autocomplete attributes are as listed in §5.10.
8. **Images:** content photos have the Vietnamese `alt` from §3.3. Describe what is visible, use ≤ 125 characters, and never start with "Hình ảnh" or "Ảnh". Decorative SVGs and the fallback sprig use `aria-hidden="true" focusable="false"`. Icon-only controls have `aria-label`. Icons next to text are hidden from assistive technology.
9. **Color is never the only signal:** the pressed chip shows a check icon, `aria-current` nav links show an underline or dot, errors show an icon and text, and links in body text are underlined.
10. **Contrast:** use only the pairs in §2.2.
11. **Live regions:** `#product-status` (polite) for filter results and `#form-status` (`role="status"`) for form errors. Do not announce the message counter.
12. **Repeated link text:** "Đặt hoa" and "Đặt theo bộ sưu tập" carry visually hidden product or collection names (§5.4, §5.5).
13. **External links** announce "(mở trong tab mới)".
14. **Motion:** honour `prefers-reduced-motion` (§7.11). Nothing flashes.
15. **Zoom / reflow:** content reflows at 320px CSS width (equivalent to 400% zoom on 1280px) without loss (WCAG 1.4.10).
16. **Touch targets** ≥ 44×44px (§6.5).

---

## 9. SEO and meta

### 9.1 `<head>` (MUST, in this order)

```html
<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mộc Sương Atelier — Hoa tươi thủ công, giao trong ngày tại Hà Nội</title>
  <meta name="description" content="Hoa tươi cắm thủ công mỗi sớm cho sinh nhật, kỷ niệm, khai trương, cưới hỏi, chia buồn. Thiệp viết tay miễn phí, giao trong ngày nội thành Hà Nội.">
  <link rel="canonical" href="https://mocsuong.vn/">
  <meta name="theme-color" content="#FAF7F2">
  <meta name="color-scheme" content="light">
  <meta name="format-detection" content="telephone=no">

  <meta property="og:type" content="website">
  <meta property="og:locale" content="vi_VN">
  <meta property="og:site_name" content="Mộc Sương Atelier">
  <meta property="og:title" content="Mộc Sương Atelier — Mỗi bó hoa là một lá thư viết tay">
  <meta property="og:description" content="Hoa tuyển mỗi sớm, cắm thủ công và giao trong ngày khắp nội thành Hà Nội. Thiệp viết tay miễn phí cho mọi đơn hoa.">
  <meta property="og:url" content="https://mocsuong.vn/">
  <meta property="og:image" content="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?fm=jpg&amp;fit=crop&amp;w=1200&amp;h=630&amp;q=80">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Bó hoa hồng kem và cam đào cắm trong lọ thủy tinh buộc nơ lụa">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Mộc Sương Atelier — Mỗi bó hoa là một lá thư viết tay">
  <meta name="twitter:description" content="Hoa tuyển mỗi sớm, cắm thủ công và giao trong ngày khắp nội thành Hà Nội.">
  <meta name="twitter:image" content="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?fm=jpg&amp;fit=crop&amp;w=1200&amp;h=630&amp;q=80">

  <link rel="icon" type="image/svg+xml" href="…exact data URI from §3.6…">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://images.unsplash.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&amp;family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&amp;display=swap">
  <link rel="stylesheet" href="css/styles.css">
  <script src="js/main.js" defer></script>

  <script type="application/ld+json">…§9.2…</script>
</head>
```
The title is 65 characters and the description is 146 characters, both within SERP limits.

### 9.2 JSON-LD (Florist)

```json
{
  "@context": "https://schema.org",
  "@type": "Florist",
  "name": "Mộc Sương Atelier",
  "alternateName": "Mộc Sương",
  "slogan": "Hoa tươi mỗi sớm, trọn vẹn lời thương.",
  "description": "Atelier hoa tươi thủ công tại Hà Nội: hoa sinh nhật, kỷ niệm, khai trương, cưới hỏi, chia buồn. Thiệp viết tay miễn phí, giao trong ngày nội thành.",
  "url": "https://mocsuong.vn/",
  "image": "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?fm=jpg&fit=crop&w=1200&h=630&q=80",
  "telephone": "+84900123456",
  "email": "xinchao@mocsuong.vn",
  "priceRange": "490.000₫ – 2.500.000₫",
  "currenciesAccepted": "VND",
  "paymentAccepted": "Tiền mặt, Chuyển khoản, Ví điện tử",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Số 9 ngõ Sương Mai",
    "addressLocality": "Phường Hoàn Kiếm",
    "addressRegion": "Hà Nội",
    "addressCountry": "VN"
  },
  "areaServed": { "@type": "City", "name": "Hà Nội" },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "07:00",
    "closes": "21:00"
  }],
  "sameAs": [
    "https://www.facebook.com/mocsuong.atelier",
    "https://www.instagram.com/mocsuong.atelier"
  ]
}
```
Inside `<script type="application/ld+json">`, keep raw `&` (it is JSON, not HTML). The script content MUST pass `JSON.parse`.

---

## 10. File structure (MUST)

```
/
├── index.html          # all markup, sprite, head meta, JSON-LD
├── css/
│   └── styles.css      # :root tokens first → base → utilities → components → sections → reduced-motion last
├── js/
│   └── main.js         # deferred, vanilla, modules §7.1–7.10
├── docs/
│   └── design-spec.md  # this file (do not edit)
└── README.md           # untouched
```

- **Do not create `assets/`.** All images are remote (§3) and all icons are inline (§3.5).
- No `package.json`, no bundler, no CSS preprocessor, no external JS, no web fonts other than §2.3, no analytics, and no inline `style` attributes except the `--media-fallback` custom property on `.media`.
- `index.html` references assets with relative paths (`css/styles.css`, `js/main.js`), so the page works from `file://` and from any static host.
- `styles.css` section order: (1) `:root` tokens and breakpoint overrides, (2) modern reset (box-sizing, margin reset, `img{display:block;max-width:100%}`, `button` font inherit), (3) base typography, (4) utilities (`[hidden]`, `.visually-hidden`, `.container`, `.icon`), (5) components (§5.0), (6) sections in page order, (7) reveal and animation keyframes, (8) the reduced-motion block.
- Size targets: `styles.css` ≤ 40 KB, `main.js` ≤ 15 KB, unminified.

---

## 11. Acceptance checklist for Frontend

The reviewer checks each item. Viewports to use: 320, 375, 768, 1024 and 1440px.

1. [ ] The repo contains only `index.html`, `css/styles.css`, `js/main.js` plus the existing `README.md` and `docs/`. There is no `assets/`, no `package.json` and no third-party JS.
2. [ ] The Network panel shows external requests only to `fonts.googleapis.com`, `fonts.gstatic.com` and `images.unsplash.com`.
3. [ ] `<html lang="vi">`, UTF-8 charset, viewport meta, and the `<title>` and meta description exactly as in §9.1.
4. [ ] Open Graph and Twitter tags are present. The favicon is the inline SVG data URI from §3.6. The JSON-LD passes `JSON.parse` and has `"@type": "Florist"`.
5. [ ] `styles.css` starts with the §2.1 `:root` block verbatim. `grep -nE '#[0-9A-Fa-f]{3,8}\b|rgb\(' css/styles.css` finds color matches only inside the `:root` blocks. Ignore any ID-selector false positives.
6. [ ] Be Vietnam Pro and Cormorant Garamond render every Vietnamese string, with no fallback-font glyphs in "Mộc Sương", "Hỷ Sự", "Tĩnh Tại" or "Đặt hoa". Headings never show colliding diacritics (line-height ≥ 1.15).
7. [ ] Sections appear in the order and with the `id`s of §4. Each `section` has `aria-labelledby`.
8. [ ] All copy matches §5 verbatim. Spot-check the H1, the hero lead, all 6 product names and prices, the 3 testimonials, the form labels and the footer disclosure.
9. [ ] There is exactly one H1. Each section has an H2 (values: visually hidden). Card titles are H3. An automated outline (axe or HeadingsMap) shows no skipped levels.
10. [ ] The skip link is the first Tab stop, is visible on focus, and moves focus to `main#noi-dung`.
11. [ ] The header is sticky with fixed height. After scrolling more than 8px it gains `.is-scrolled` (glass background, hairline, shadow). The height never changes.
12. [ ] Desktop (≥1024): 5 nav links plus the "Đặt hoa" CTA. ≥1280 also shows the phone number. Scrollspy sets `aria-current="true"` on the active link, shown with an underline.
13. [ ] Mobile (<1024): the toggle flips `aria-expanded` and the label between "Mở menu" and "Đóng menu". Focus moves to the first link. `main` and `footer` are `inert`. The page does not scroll behind the panel. Esc closes and returns focus to the toggle. A link click closes and navigates. Resizing to ≥1024 closes the panel.
14. [ ] Every interactive element measures ≥ 44×44px in DevTools at 375px: buttons, chips, icon buttons, nav, menu, footer and contact links, and `.link-arrow`.
15. [ ] `document.documentElement.scrollWidth === document.documentElement.clientWidth` at 320, 375, 768, 1024 and 1440px.
16. [ ] Grid columns per section match the §6.3 matrix at every breakpoint, including the collections stagger at ≥1024 and the sticky process image at ≥1024.
17. [ ] Filter chips are hidden without JS and visible with JS. Clicking updates `aria-pressed` and shows the check icon. Counts are 6, 3, 3, 2 and 1. `#product-status` announces the exact §5.5 sentence.
18. [ ] Clicking an occasion tile scrolls to `#dat-hoa` with that occasion selected and the field flashing. "Đặt hoa" on a card selects the product. "Đặt theo bộ sưu tập" selects the collection option. With the "Chia buồn" filter active, clicking "Đặt hoa" on Tĩnh Tại also pre-selects the "Chia buồn" occasion.
19. [ ] Submitting the empty form shows 4 errors (name, phone, occasion, date) with the exact §5.10 messages, each with an icon, red border and `aria-invalid="true"`. The status reads "Vui lòng kiểm tra lại 4 mục được đánh dấu." and focus lands on "Họ và tên".
20. [ ] The phone validator accepts and rejects exactly the test vectors in §7.8.
21. [ ] The date field has `min` = today and `max` = today + 90 days, computed from local time. A past date, a date more than 90 days ahead, and today after 16:00 each show their specific message.
22. [ ] A valid submit shows "Đang gửi…" for about 900ms with focus kept on the button, then the success panel with the user's name and phone. Code review confirms both are inserted with `textContent` (no `innerHTML` anywhere in `main.js`), and the name `<b>Lan</b>` is rejected by name validation. Focus moves to the success heading. "Gửi thêm một yêu cầu khác" restores an empty form and focuses "Họ và tên".
23. [ ] No network request fires on submit. Nothing is written to `localStorage` or cookies.
24. [ ] Every `<img>` has `width`, `height`, `decoding="async"` and the §3.3 `alt`. All but the hero are `loading="lazy"`, and the hero has `fetchpriority="high"`. The process image uses `<picture>` art direction (3:2 → 4:5 at 1024).
25. [ ] Blocking `images.unsplash.com` in DevTools leaves every image slot as a brand gradient with a centered sprig. There are no broken-image icons and no visible alt text, and the layout is unchanged.
26. [ ] Scroll reveal animates sections in once. With "Emulate prefers-reduced-motion: reduce", nothing translates or fades, all content is visible on load, and anchor scrolling is instant.
27. [ ] With JS disabled, all content is visible (nothing stuck at `opacity:0`), anchor links work, the filter is hidden, and the form shows the `<noscript>` note.
28. [ ] The focus ring is clearly visible on every interactive element in light sections (forest) and in the story and footer (sand). It is never clipped.
29. [ ] Lighthouse (mobile) scores Accessibility ≥ 95, SEO ≥ 95 and Best Practices ≥ 95. axe DevTools reports 0 serious or critical issues, including 0 contrast failures.
30. [ ] The W3C Nu HTML validator reports 0 errors. The console shows 0 errors and 0 warnings on load and through every interaction above.
