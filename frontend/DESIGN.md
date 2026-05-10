# Glimpse — Design System & Brand Identity
> *Formerly: EventLens*
> Version 1.0 · AI-Powered Event Photo Retrieval

---

## 00 · Name Rationale

**"EventLens"** describes the tool. **"Glimpse"** describes the *feeling* —
that flash of delight when you suddenly see yourself in a sea of strangers' photos.
It's intimate, immediate, and emotional. It's also short, memorable, and globally
pronounceable. No hyphenation. No explanation required.

**Tagline options:**
- *"Your moment, found."*
- *"Every face. Every frame."*
- *"See yourself in every shot."* ← recommended primary

**Domain targets:** `useglimpse.com` · `getglimpse.co` · `glimpse.photo`

---

## 01 · Brand Philosophy

Glimpse lives in the space between the event and the memory. The photographer captures
thousands of moments — Glimpse makes sure every *person* in those moments actually
receives them.

This is a **premium, emotional, creator-first** product. The design must feel like it
belongs at a wedding, a high-end corporate summit, a Lagos fashion week, or a
university graduation — not just at a birthday party. The experience should feel
*magical* on both sides: the photographer building the event, and the guest who
scans a QR code and sees their own face smiling back in seconds.

**Brand personality:** Warm magic. Effortless luxury. Photographer-proud. Guest-delightful.

**Brand promise:** *"See yourself in every shot."*

**Brand voice:** Confident and warm, with a sense of quiet wonder. The copy should feel
like a photographer who genuinely loves their craft and wants their clients to feel that
love. Never clinical. Never loud. Occasionally poetic.

---

## 02 · Colour Palette

> Deliberately opposite to Presently's Sungold/Black.
> Glimpse uses a deep, rich **Viola (deep rose-violet)** as its primary,
> grounded by **Ink** (deep near-black with a warm blue undertone),
> and lifted by **Champagne** (warm near-white with golden warmth).
> The combination evokes a dimly lit event hall, string lights, and the glow
> of a phone screen showing you your best photo of the night.

```
┌────────────────────────────────────────────────────────────────┐
│  GLIMPSE COLOUR SYSTEM                                          │
├────────────────────────────────────────────────────────────────┤
│  PRIMARY                                                        │
│  ● Viola          #C2185B   Primary actions, brand anchor       │
│  ● Deep Viola     #8E0038   Hover / pressed / depth            │
│  ● Blush          #FCE4EC   Tinted backgrounds, light fills    │
│                                                                │
│  NEUTRAL                                                        │
│  ● Ink            #0F0E17   Headlines, dark surfaces           │
│  ● Dusk           #1C1B2E   Cards on dark bg (warm-dark blue)  │
│  ● Slate 600      #475569   Body text on light                 │
│  ● Slate 300      #CBD5E1   Placeholder / muted / captions     │
│  ● Champagne      #FAF7F2   Page bg (light mode)               │
│  ● Pure White     #FFFFFF   Cards, modals, clean surfaces      │
│                                                                │
│  ACCENT                                                        │
│  ● Flash Gold     #FFD54F   Highlight moments, star ratings    │
│  ● Aperture Teal  #00BFA5   Success states, verified badges    │
│  ● Soft Lilac     #EDE7F6   Subtle section backgrounds         │
└────────────────────────────────────────────────────────────────┘
```

### Usage Rules
- **Viola** is the brand soul. It lives on primary buttons, active nav indicators,
  brand marks, and key illustrations. It is never used as a background wash.
- **Ink** is the page backbone — dark surfaces, heavy headlines. Not pure black.
- **Champagne** replaces white as the default page background for warmth.
- **Flash Gold** is reserved for the "magic moment" interactions — face match
  confirmation, star ratings, featured photo highlights. Never decorative.
- **Aperture Teal** is semantic only: success, upload complete, face verified.
- Dark mode uses Ink → Dusk → `#242333` as the surface stack.

### Gradient Signatures
```css
/* Used in hero backgrounds and feature illustrations */
--gradient-event:  linear-gradient(135deg, #1C1B2E 0%, #0F0E17 60%, #2D0A1E 100%);
--gradient-viola:  linear-gradient(135deg, #C2185B 0%, #8E0038 100%);
--gradient-magic:  radial-gradient(ellipse at 60% 40%, rgba(194,24,91,0.18) 0%, transparent 65%);
--gradient-warm:   linear-gradient(180deg, #FAF7F2 0%, #FCE4EC 100%);
```

---

## 03 · Typography

> Completely distinct from Presently's Tan Nimbus / Plus Jakarta Sans pairing.

### Type Scale

| Token        | Font                 | Weight | Size (desktop) | Usage                        |
|--------------|----------------------|--------|----------------|------------------------------|
| `display-xl` | **Cormorant Garamond** | 700  | 80–104px       | Hero headlines               |
| `display-lg` | Cormorant Garamond   | 700    | 56–72px        | Section headlines            |
| `display-md` | Cormorant Garamond   | 600    | 40–52px        | Sub-headings                 |
| `heading-lg` | **DM Sans**          | 700    | 28–32px        | Card titles, UI heads        |
| `heading-md` | DM Sans              | 600    | 20–24px        | Panel titles                 |
| `body-lg`    | DM Sans              | 400    | 18px           | Marketing body copy          |
| `body-md`    | DM Sans              | 400    | 15–16px        | App/dashboard UI text        |
| `body-sm`    | DM Sans              | 400    | 13–14px        | Captions, labels             |
| `label`      | DM Sans              | 600    | 11–12px        | TRACKED CAPS labels, badges  |
| `mono`       | **IBM Plex Mono**    | 400    | 13px           | Event codes, QR IDs, URLs    |

**Cormorant Garamond** — A high-contrast editorial serif with genuine elegance and optical
presence. When set large, it feels like a luxury magazine headline. It makes Glimpse feel
expensive and intentional in a way no sans-serif can. Completely different in character
from Tan Nimbus.

**DM Sans** — Geometric, warm, highly legible. Where Cormorant is the *feeling*, DM Sans
is the *function*. Clean and neutral enough to be invisible at UI sizes, distinct enough
to not feel generic.

**IBM Plex Mono** — For event codes, QR identifiers, and system strings only. Has a
quiet authority appropriate for a photo-tech product.

### Typographic Principles
- Cormorant looks best at `font-size: 64px+` with letter-spacing `-0.02em` and
  `line-height: 1.05`. Below 32px, switch to DM Sans.
- Body copy: `line-height: 1.7`, max-width `60ch`.
- Use italic Cormorant (`font-style: italic`) for emotional emphasis — taglines,
  pull quotes, the "magic moment" description.
- Tracked caps (`letter-spacing: 0.12em`) for section labels and badge text only.

---

## 04 · Spacing & Layout

```
Base unit: 4px
Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160px

Container max-width: 1320px
Content max-width:   1000px (editorial sections)
Gutter (desktop):    80px
Gutter (mobile):     20px
Column grid:         12-col desktop / 4-col mobile
Border-radius scale: 4px (inputs), 8px (small cards), 16px (panels), 24px (large cards),
                     9999px (pills, buttons)
```

---

## 05 · Elevation & Depth

```css
--shadow-xs:   0 1px 2px rgba(15,14,23,0.06);
--shadow-sm:   0 2px 8px rgba(15,14,23,0.08), 0 1px 3px rgba(15,14,23,0.06);
--shadow-md:   0 8px 24px rgba(15,14,23,0.12), 0 2px 8px rgba(15,14,23,0.06);
--shadow-lg:   0 20px 48px rgba(15,14,23,0.16), 0 6px 20px rgba(15,14,23,0.08);
--shadow-viola: 0 8px 32px rgba(194,24,91,0.28);  /* glow for CTAs & hover states */
--shadow-photo: 0 24px 64px rgba(15,14,23,0.35);  /* photo card dramatic shadow */
```

---

## 06 · Iconography

- Icon library: **Phosphor Icons** (duotone variant for feature icons, regular stroke
  for UI icons, weight: `regular` / `bold` toggled by context)
- Phosphor's duotone style (two-tone with opacity layer) aligns with Glimpse's
  photographic, layered aesthetic
- UI icon size: 16px (inline), 20px (UI), 24px (feature), 40px (section markers)
- Custom mark: The **Glimpse Aperture** — a stylised eye/camera aperture hybrid, formed
  by a geometric iris with 6 blades, one blade subtly highlighted in Viola. Clean,
  unmistakable at 16px, elegant at 256px.

---

## 07 · Brand Mark & Logo

### Wordmark
- **"Glimpse"** set in Cormorant Garamond, Bold, `letter-spacing: -0.02em`
- The `G` has the Aperture mark embedded as the counter/interior
- Colour: `#0F0E17` on light / `#FFFFFF` on dark / `#C2185B` standalone mark

### Brand Mark (icon only)
- The Aperture eye: 6-blade iris in Ink with one Viola-highlighted blade
- Minimum size: 20px rendered
- App icon: deep `#1C1B2E` (Dusk) background, centred Aperture mark in White + Viola
  accent blade, corner radius 22%

### Clearspace
- Minimum clearspace = cap-height of the `G` on all four sides

### Photography Watermark (White-label feature)
- Glimpse generates a transparent-background watermark from each photographer's logo
- Glimpse's own watermark: small Aperture mark + "via Glimpse" in DM Sans 11px

---

## 08 · Component Tokens

### Buttons

```
Primary:     bg=Viola    text=White   radius=9999px  px=28  py=14  fw=600
             hover: bg=Deep-Viola + --shadow-viola
Secondary:   bg=Ink      text=White   radius=9999px  px=28  py=14  fw=600
Outline:     border=1.5px Viola  text=Viola  radius=9999px  fill on hover
Ghost:       text=Viola  underline on hover, no border
Destructive: bg=Soft-Coral text=White
```

### Cards

```
Light card:      bg=White   border=1px solid #E2E8F0   radius=16px  shadow=--shadow-md
Dark card:       bg=#1C1B2E border=1px solid #2D2B42   radius=16px  shadow=--shadow-lg
Photo card:      radius=12px  overflow=hidden  shadow=--shadow-photo
                 hover: scale(1.02) + shadow intensify + Viola border glow
Feature card:    bg=White   left-accent=4px solid Viola  radius=0 0 16px 16px
Pricing card:    border=1.5px  radius=20px
                 Most popular: bg=Ink  text=White  Viola highlight border
```

### Status Badges

```
Face Found:     bg=#E0F2F1  text=#00695C   "✓ Match found"
Processing:     bg=#EDE7F6  text=#6A1B9A   animated shimmer
Uploading:      bg=#E3F2FD  text=#1565C0   progress bar
Event Live:     bg=#FCE4EC  text=#B71C1C   Viola dot pulse
```

### Input Fields

```
border-radius: 10px
border: 1.5px solid #CBD5E1
focus-border: 1.5px solid Viola + box-shadow: 0 0 0 3px rgba(194,24,91,0.12)
height: 48px (desktop), 52px (mobile)
file-upload zone: dashed border 2px Viola/40, dashed-gap: 6px, bg: Blush
                  on drag-over: Viola/20 bg, solid Viola border, scale(1.01)
```

---

## 09 · Motion & Animation

### Principles
- **Cinematic, not snappy.** Glimpse is about photographs, memory, and emotion.
  Animations should feel slightly slower and more graceful than typical SaaS —
  like a shutter opening, not a button click.
- **The magic moment is the centrepiece.** The face-match reveal animation is the
  single most important interaction in the product. It must feel genuinely magical.
- **Easing**: Favour `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (smooth ease-out) over
  spring-heavy overshoots. This product has emotional weight; it should move accordingly.

### Core Animation Tokens

```css
--ease-out-silk:    cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-out-expo:    cubic-bezier(0.19, 1, 0.22, 1);
--ease-in-back:     cubic-bezier(0.36, 0, 0.66, -0.56);
--ease-spring:      cubic-bezier(0.34, 1.36, 0.64, 1);
--duration-instant: 100ms;
--duration-fast:    200ms;
--duration-base:    400ms;
--duration-slow:    600ms;
--duration-cinematic: 900ms;
```

### Interaction Patterns

**Face match reveal (the magic moment):**
1. Selfie uploads → circular progress ring in Viola fills (600ms)
2. "Scanning..." text pulses softly
3. Flash: white overlay opacity 0 → 0.6 → 0 (200ms) — shutter effect
4. Photos cascade in: first photo scales from center (scale 0.85 → 1), then others
   fan out in a staggered grid (40ms gap each), each with a subtle motion blur dissolve
5. Flash Gold shimmer sweeps across the photo grid once
6. Counter: "23 photos found" counts up from 0

**Photo card hover:**
- Scale: 1.0 → 1.03 (200ms ease-out-silk)
- Shadow: --shadow-md → --shadow-photo
- Subtle Viola border glow materialises

**Upload drop zone:**
- Dashed border animates: dash-offset scrolls infinitely when idle
- On hover: Viola bg fill slides up from bottom (clip-path reveal)
- On drop: brief scale bounce (1.0 → 1.02 → 1.0)

**Page load:**
- Hero: Cormorant headline fades in per-word (not per-character — too flashy)
  with translateY 20px → 0, 80ms stagger, 600ms duration
- Hero visual fades in 300ms after headline completes
- Scroll-triggered sections: opacity 0 → 1, translateY 32px → 0, 500ms ease-out-silk

**Continuous / ambient:**
- Event-live badge: Viola dot pulses (scale 1.0 → 1.4 → 1.0, opacity 1 → 0, 2s loop)
- Hero background: very slow radial gradient drift (30s loop, barely perceptible)
- Photo mosaic (hero): subtle parallax at 0.3× scroll rate

---

## 10 · Photography & Illustration Style

### Product Photography
- Real event photography as background/illustration: warm indoor lighting, bokeh,
  crowds, candid celebration moments
- Colour grade: warm shadows, slight desaturation in highlights — cinematic, not Instagram
- Event types shown: weddings, corporate events, graduations, concerts, galas
- Nigerian faces and venues are the default representation; global events appear secondary

### UI Illustrations
- Device: dark-framed phone mockups (Ink-coloured bezels), slight 5–10° tilt
- UI inside: real Glimpse screens — not placeholders
- Photo mosaic pattern: offset grid of event photos with face-detection circles as an
  abstract illustration element (used in hero and feature sections)
- Aperture iris: the brand mark scales up as a background illustration element at
  very low opacity (`rgba(194,24,91,0.06)`) in dark sections — subliminal texture

### Icon Illustrations (Feature Sections)
- Phosphor duotone icons at 40–48px
- Base layer: Slate 300 / White
- Accent layer: Viola at 70% opacity
- Never use emoji-style illustration; always line-based

---

## 11 · Tone & Messaging Framework

| Audience            | Core Emotion             | Glimpse Message                                          |
|---------------------|--------------------------|----------------------------------------------------------|
| **Guests**          | FOMO → Delight           | "Scan. Smile. See yourself. Done."                       |
| **Photographers**   | Pride + practicality     | "Deliver photos guests actually find — and remember you."|
| **Event Planners**  | Control + wow-factor     | "One QR code. Every guest. Zero follow-up emails."       |
| **Corporate Events**| Efficiency + polish      | "Professional photo distribution, handled automatically."|

**Microcopy rules:**
- Upload confirmation: "Your photos are being processed. Magic incoming."
- Face match: "We found you in 23 photos ✨"
- Empty match: "We couldn't find you — try a clearer selfie in better light."
  (Never blame — always give a path forward)
- Upload complete: "847 photos processed. Your guests are ready to find themselves."
- Pricing: Always show Nigerian Naira (₦) first, USD equivalent small below

---

## 12 · Dark & Light Mode

**Default (web/marketing):** Dark — the product is about events, nights, and magic.
A dark-first design feels immersive and premium.

**App default:** Follows system; light mode is warm (Champagne bg), not stark white.

### Dark Mode Surface Stack
```
Page background:  #0F0E17  (Ink)
Layer 1 (cards):  #1C1B2E  (Dusk)
Layer 2:          #242333
Layer 3:          #2E2C40
Border:           #3A3850
Muted text:       #94A3B8
```

### Light Mode Surface Stack
```
Page background:  #FAF7F2  (Champagne)
Layer 1 (cards):  #FFFFFF
Layer 2:          #F4F2EE
Border:           #E2D9D0
```

---

## 13 · Mobile-First Principles

- Touch targets: minimum 48×48px
- Bottom tab bar: 4 items (Home, My Photos, Events, Profile)
- The selfie/scan CTA is always bottom-center, large (56px height), Viola bg
- Photo grid: 2-column on mobile, 3-column on tablet, 4-column on desktop
- Face search results load progressively — first 4 photos instant, rest stagger in
- Camera/selfie UI: full-screen, face-detection oval overlay in Viola, Flash Gold
  indicator when face is centred

---

## 14 · Photographer Dashboard Design Principles

The photographer experience is a *professional tool* — it should feel like Lightroom
or Notion, not Instagram. Clean, data-dense where needed, never cute.

- Dark sidebar with Ink bg, Dusk active state, Viola active indicator dot
- Metrics at a glance: Photos uploaded, Guests scanned, Downloads, Shares
- Event cards: photo thumbnail as card background with dark overlay and metadata
- Upload zone: prominent, always accessible, supports bulk drag-and-drop
- White-label settings: live preview of how the gallery looks with custom logo/colours

---

## 15 · Pricing Component

```
Three tiers displayed as cards in a horizontal row (desktop) / stacked (mobile)

Free:        White card, Ink border, DM Sans
Per Event:   White card, Viola border 2px, "Most Popular" pill in Viola bg
Pro Monthly: Ink card (dark), White text, Flash Gold "Best Value" badge

Pricing numbers: Cormorant Garamond, display-lg, weight 700
Currency label:  DM Sans, 18px, Slate 400, sits top-left of number
Period label:    DM Sans, 14px, Slate 400, below number

Feature list:    Aperture Teal checkmarks, DM Sans 15px
CTA button:      Full-width, pill, Viola (Free/PerEvent) / White (Pro dark card)
```

---

## 16 · Brand Applications

| Surface                   | Treatment                                                  |
|---------------------------|------------------------------------------------------------|
| App icon                  | Dusk bg + White/Viola Aperture mark                       |
| Splash screen             | Ink bg, Aperture mark fades in, then Wordmark slides up   |
| Web landing               | Dark-first, Cormorant headlines, Viola CTAs               |
| Guest gallery (white-label)| Photographer's own branding; Glimpse small footer credit  |
| Email — guest             | Dark header (Ink), Viola CTA, photo thumbnails            |
| Email — photographer      | Light (Champagne), clean data summary, export CTA         |
| QR code card              | Printed: Ink bg, White QR code, Aperture mark, event name |
| Social media              | Dark bg, photo collage textures, Cormorant type           |
| Push notifications        | "You were found in 5 new photos 📸" — always warm         |

---

## 17 · Differentiation from Presently

| Dimension       | Presently                  | Glimpse                              |
|-----------------|----------------------------|--------------------------------------|
| Primary colour  | Sungold #F5C518 (bright)   | Viola #C2185B (deep, romantic)       |
| Neutral         | Hard Black #0D0D0D         | Ink #0F0E17 (warm-dark)              |
| Display font    | Tan Nimbus (modern serif)  | Cormorant Garamond (classical serif) |
| UI font         | Plus Jakarta Sans          | DM Sans                              |
| Default mode    | Light                      | Dark                                 |
| Brand emotion   | Precision, trust           | Magic, delight, memory               |
| Icon style      | Lucide (stroke, neutral)   | Phosphor (duotone, expressive)       |
| Motion feel     | Snappy, functional         | Cinematic, graceful                  |
| Border radius   | Large (pill-forward)       | Moderate (refined, not cutesy)       |
| Personality     | Institutional warmth       | Creative professional luxury         |

---

*End of Glimpse Design System v1.0*

