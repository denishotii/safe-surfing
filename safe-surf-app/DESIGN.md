# SafeSurf — UI/UX Design System
**"Surf Smart. Stay Green."**

---

## 1. Design Philosophy

### The moment of use
Pablo wakes at 6:15 AM. Coffee. Surfboard half-loaded. Phone in hand. He has **30 seconds** to decide where to drive.

Most surf apps fail him: tide tables, swell charts, forecast jargon, 10-tab navigation. SafeSurf does **one thing brilliantly** — tells him where to go, why, and what's happening socially. Then it gets out of the way.

### The north star
> **"Calm intelligence at the edge of the ocean."**

Every screen should feel like it was made by someone who actually surfs at 6 AM — not a fintech designer trying to look "eco." Confident. Quiet. Human. Coastal, not corporate.

### Three design laws
1. **One hero per screen.** The most important answer is always the biggest thing visible. Everything else is supporting cast.
2. **Color is data, never decoration.** Every color choice communicates water quality, crowd level, or action priority. Nothing is teal "because it's ocean-y."
3. **Progressive disclosure.** Surface the answer. Reveal the detail on demand. Never force the user to compare before they've decided.

### What this app is NOT
- Not a clinical forecast dashboard (Surfline, Magicseaweed)
- Not an "eco app" with cartoon leaves and guilt-trip copy
- Not a social media feed with engagement bait
- Not a busy dashboard with 12 competing widgets
- Not childlike. Pablo is 31 and sophisticated.

### Design DNA references
| Reference | What we borrow |
|-----------|----------------|
| **AllTrails** | Map-first discovery, trustworthy data, photography-forward |
| **Apple Weather** | Beautiful condition visualizations, strong hero hierarchy |
| **Strava** | Achievement systems that motivate without nagging |
| **Airbnb** | Soft shadows, generous whitespace, personality in copy |
| **Linear** | Refined, opinionated, zero clutter |
| **Headspace** | Calming pacing, intentional motion, breathing room |

---

## 2. Color System

### Philosophy
The palette is Bali at golden hour: deep ocean, warm sand, sunset coral. **Backgrounds are warm cream, never cold white.** Color contrast is intentional — status colors are the only bright saturated colors in the UI.

### 2.1 Foundation Tokens

```css
/* Backgrounds */
--bg-base:        #F6F1EA;   /* Warm sand cream — main app background */
--bg-surface:     #FFFFFF;   /* Cards, sheets — elevated above base */
--bg-sunken:      #EDE6D9;   /* Input fields, dividers, subtle indents */

/* Text */
--text-primary:   #0B1F2E;   /* Deep ocean navy — primary copy, never pure black */
--text-secondary: #4A5568;   /* Secondary info, descriptions */
--text-muted:     #94A3B8;   /* Captions, placeholders, metadata */
--text-inverse:   #FFFFFF;   /* Text on dark/gradient surfaces */

/* Lines */
--border-default: rgba(11, 31, 46, 0.08);
--border-strong:  rgba(11, 31, 46, 0.16);
```

### 2.2 Brand — Ocean Teal

The brand primary. Used for icons, links, active states, brand moments. NOT used for primary CTA buttons (that's coral's job).

```css
--teal-50:   #F0FDFA;
--teal-100:  #CCFBF1;
--teal-300:  #5EEAD4;
--teal-500:  #14B8A6;
--teal-600:  #0D9488;   /* Primary brand teal */
--teal-700:  #0F766E;   /* Pressed/deep states */
--teal-900:  #134E4A;   /* Hero gradient dark stop */
```

### 2.3 Action — Sunset Coral

The **primary CTA color.** Warm, energetic, unmistakable. Only buttons that move something forward use coral. One dominant action per screen.

```css
--coral-50:  #FFF4F1;
--coral-300: #FCA28A;
--coral-500: #F97456;   /* Default CTA */
--coral-600: #F56242;   /* Hover/pressed */
--coral-700: #DC4A2B;   /* Destructive pressed */
```

### 2.4 Semantic / Status Colors

These are **data colors only**. Every status indicator in the app uses exactly these.

```css
/* Go — Excellent / Low Crowd / Clean */
--status-go:        #059669;
--status-go-bg:     #ECFDF5;
--status-go-border: #A7F3D0;

/* Check — Moderate */
--status-check:        #D97706;
--status-check-bg:     #FFFBEB;
--status-check-border: #FDE68A;

/* Avoid — Poor / Overcrowded */
--status-avoid:        #DC2626;
--status-avoid-bg:     #FEF2F2;
--status-avoid-border: #FECACA;

/* Info — Wave / wind data (neutral) */
--status-info:        #2563EB;
--status-info-bg:     #EFF6FF;
--status-info-border: #BFDBFE;
```

**Rule:** Status is ALWAYS communicated with both color AND an icon + text label. Never color alone.

### 2.5 Beach Identity Gradients

Each beach has its own gradient "personality" — shown in card heroes, map pin halos, detail headers. These are the app's "album art."

```css
/* Balangan — Hidden teal gem, serene */
--beach-balangan:  linear-gradient(135deg, #0FB5A6 0%, #0E7490 100%);

/* Padang Padang — World-class, deep and powerful */
--beach-padang:    linear-gradient(135deg, #4F46E5 0%, #1E1B4B 100%);

/* Uluwatu — Iconic cliff sunset */
--beach-uluwatu:   linear-gradient(135deg, #7C3AED 0%, #BE185D 100%);

/* Canggu — Warm, social, digital nomad amber */
--beach-canggu:    linear-gradient(135deg, #F59E0B 0%, #C2410C 100%);

/* Seminyak — Rose resort, lifestyle */
--beach-seminyak:  linear-gradient(135deg, #FB7185 0%, #9D174D 100%);

/* Kuta — Warning, crowded, avoid signal */
--beach-kuta:      linear-gradient(135deg, #EF4444 0%, #7F1D1D 100%);

/* Nusa Dua — Calm aqua, family, protected */
--beach-nusadua:   linear-gradient(135deg, #34D399 0%, #065F46 100%);

/* Dreamland — Sky blue, dreamy, secluded */
--beach-dreamland: linear-gradient(135deg, #60A5FA 0%, #1E3A8A 100%);
```

All beach gradients require a dark vignette overlay for text legibility:
```css
/* Stacked on top of the gradient */
linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(11,31,46,0.55) 100%)
```

---

## 3. Typography

### 3.1 Font Stack

**Primary:** `Plus Jakarta Sans` — modern geometric humanist, excellent at all weights, has personality without being loud. One clear step above generic Inter.

**Fallback:** `system-ui, -apple-system, sans-serif`

**Numbers:** Always use `font-variant-numeric: tabular-nums` on any score, count, metric, or time. Numbers must align perfectly in columns and gauges.

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

### 3.2 Type Scale

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
|-------|------|-------------|--------|----------------|-------|
| `display` | 40px | 1.1 | 800 | -0.03em | Profile hero number, big score reveals |
| `hero` | 28px | 1.2 | 700 | -0.02em | Beach names on detail, page heroes |
| `title` | 22px | 1.3 | 700 | -0.01em | Page headings (Today, Missions) |
| `subtitle` | 18px | 1.4 | 600 | 0 | Section headings, card titles |
| `body-lg` | 16px | 1.5 | 400 | 0 | Primary body, AI verdict text |
| `body` | 14px | 1.5 | 400 | 0 | Default body, card content |
| `label` | 13px | 1.4 | 600 | 0 | Buttons, active nav, tags |
| `caption` | 12px | 1.4 | 500 | 0.01em | Metadata, timestamps |
| `micro` | 10px | 1.4 | 700 | 0.08em | Eyebrow labels — ALWAYS UPPERCASE |

### 3.3 Hierarchy Rules

- Maximum **3 text weights** on any single screen (e.g. 400 / 600 / 800)
- Headlines breathe — allow line breaks at natural pauses
- The **display number** (score, kg of trash, green points) is always the largest element on its screen
- Eyebrow labels (`micro`) are UPPERCASE, spaced, in `--text-muted`. They introduce sections, not compete.
- Never truncate meaningful content. Abbreviate stats, not descriptions.

---

## 4. Spacing & Layout

### 4.1 Base Grid

8px base unit. All spacing is multiples: `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80`

### 4.2 Layout Zones

```
Status bar (OS-managed, safe area top)
─────────────────────────────────────
Header zone (48px compact / full-bleed)

Content area (scrollable)

─────────────────────────────────────
Bottom nav (72px + safe area bottom)
```

- **Horizontal gutter:** 20px (not 16px — the extra breathing room is noticeable)
- **Card padding:** 16px internal. 20px for large hero cards.
- **Section gap:** 32px between major content sections
- **Stack within card:** 4px between inline elements, 8px between rows, 12px between groups

### 4.3 Border Radius Scale

| Token | Value | Used on |
|-------|-------|---------|
| `radius-xs` | 6px | Chips, inline tags, mini badges |
| `radius-sm` | 10px | Small buttons, compact elements |
| `radius-md` | 14px | Standard buttons, inputs |
| `radius-lg` | 20px | Cards, list items |
| `radius-xl` | 28px | Hero cards, bottom sheets |
| `radius-full` | 9999px | Pills, avatars, FABs |

**Rule:** Larger surface → larger radius. Consistent within any component — never mix radii on the same element.

### 4.4 Shadow System

Soft, layered, barely-there. Nothing harsh or material-like.

```css
/* Cards on cream background — just barely lifted */
--shadow-soft:
  0 1px 3px rgba(11, 31, 46, 0.04),
  0 4px 12px rgba(11, 31, 46, 0.05);

/* Pressed or active state — slightly more lift */
--shadow-pop:
  0 6px 20px rgba(11, 31, 46, 0.10),
  0 2px 6px rgba(11, 31, 46, 0.06);

/* Bottom sheets, dialogs */
--shadow-overlay:
  0 20px 60px rgba(11, 31, 46, 0.20),
  0 8px 20px rgba(11, 31, 46, 0.10);
```

Cards use white (`--bg-surface`) on the cream `--bg-base`. The cream → white layering with `--shadow-soft` creates depth without visible borders.

---

## 5. Navigation Architecture

### 5.1 Tab Rename — Language Matters

| Old | New | Reason |
|-----|-----|--------|
| Home | **Today** | Pablo thinks "what's happening today?" not "home" |
| Explore | **Map** | Direct, spatial, honest |
| Community | **Missions** | Action-first |
| AI Chat | **Guide** | Feels like a local friend, not a chatbot |
| Profile | **Me** | Natural, intimate |

### 5.2 Bottom Navigation Design

- Height: 72px + bottom safe area
- Background: `rgba(255,255,255,0.88)` with `backdrop-filter: blur(24px)` — frosted glass
- Active tab: icon + label in `--teal-600`, weight 700, small dot indicator (4px circle) above icon
- Inactive: icon + label in `--text-muted`, weight 500
- Tab change: active dot **slides** between positions (shared layout animation, not instant jump)
- Tab labels: "Today" · "Map" · "Missions" · "Guide" · "Me"

### 5.3 Header Variants

**Hero (Today, Me):** No chrome. Page title is part of content design. Full-bleed gradient bleeds to status bar.

**Scroll-aware (Missions, Beach Detail):** Starts transparent over hero. As user scrolls 48px: fades to `rgba(246,241,234,0.92)` + `blur(20px)` + `--shadow-soft`. Shows compact page title centered in this state.

**Static (Map, Guide):** White surface, hairline bottom. Title left-aligned in `title` weight.

---

## 6. Component Specifications

### 6.1 Score Gauge (Signature Component)

The app's most distinctive element. A circular dial showing a beach's composite "Go Score" (0–100), combining water quality, crowd, and surf.

```
    ╭──────────────╮
   ╱  ╭──────────╮  ╲
  │  │    87     │  │   ← display weight, tabular, semantic color
  │  │  / 100    │  │
   ╲  ╰──────────╯  ╱
    ╰──────────────╯
        GO SCORE        ← micro uppercase, --text-muted
```

**Specs:**
- Size: 112px on Beach Detail, 80px on cards
- Track: 10px stroke, `--bg-sunken`
- Fill: 10px stroke, semantic color: `--status-go` (≥70), `--status-check` (40–69), `--status-avoid` (<40)
- Number: `display` weight 800, tabular numerics, semantic color
- Label: `micro` uppercase, `--text-muted`
- Animation: sweeps 0° → value over 700ms ease-out. Number counts up in sync.
- Placement on Beach Detail: half-overlapping the bottom edge of the hero image (floats between sections)

### 6.2 Conditions Strip (Fixed 4-Column)

Always in this exact order: **Water · Waves · Wind · Crowd**. Users internalize the pattern.

Each cell:
- Domain icon (20px, colored to status)
- Large value: `subtitle` weight 700, tabular
- Unit + label: `caption`, `--text-muted`
- Tap cell: expands inline popover with extra detail

### 6.3 Beach Card — Compact (Horizontal Scroll)

Width: 180px, Height: 220px, `radius-lg`, `shadow-soft`

- Top 55%: beach gradient with dark vignette overlay
  - Top-left: status dot (8px circle, semantic color) + crowd label in `caption`
  - Top-right: Go Score badge (pill, white bg, bold number, semantic color)
- Bottom 45%: white surface
  - Beach name: `subtitle` bold
  - Wave height + crowd label: `caption` muted

### 6.4 Beach Card — Feed (Full Width)

Full width, `radius-xl`, `shadow-soft`

- Top: beach gradient at 48% height
  - Bottom-left: beach name in `hero` white
  - Top-right: Go Score badge
- Bottom: white surface
  - Conditions strip (compact 4-col)
  - AI tip: 1 line in `caption`, `--teal-700` italic

### 6.5 Mission Card

```
[NGO Logo]  Mission Title                [type pill]
NGO Name

[📅 Apr 27]  Short description of the
[6:00 AM ]   mission in 2 lines max...

[👤👤👤 +9]   [⚡ 100 pts]      [Join Mission]
```

- Calendar block: `radius-sm`, `--teal-50` bg, day `subtitle` bold + time `caption`
- Avatar stack: 3 overlapping 28px circles, +N overflow label
- Points chip: amber bg, lightning icon + "100 pts", `label` weight
- CTA: coral fill (not joined) → green outline with checkmark (joined)

### 6.6 Buttons

| Variant | Background | Text | Height |
|---------|-----------|------|--------|
| Primary | `--coral-500` | white | 52px |
| Secondary | transparent | `--text-primary` | 48px, `--border-strong` outline |
| Ghost | transparent | `--teal-600` | 44px, no border |
| Icon | `--bg-sunken` | `--text-secondary` | 40px circle |
| Danger | `--status-avoid-bg` | `--status-avoid` | 48px |

- Only **one** Primary button per visible viewport
- Press: scale 0.96, 120ms spring. Release: spring back 200ms.
- Radius: `radius-md` for Primary/Secondary. `radius-full` for Icon/FAB.
- Label: `label` token, 600 weight

### 6.7 Status Pills

```
[ 💧  Excellent ]   ← icon + text, semantic bg + text color
```

- Padding: 6px 12px, `radius-xs`
- `caption` weight 600
- Always icon + text. Never color alone (accessibility).

### 6.8 Bottom Sheet

Three snap positions: Peek (20%) · Mid (55%) · Full (92%)

- `radius-xl` top corners only
- 4px × 32px drag handle, `--bg-sunken`, centered 12px from top
- Background: `--bg-surface`
- Shadow: `--shadow-overlay` on top edge
- Backdrop: `rgba(11, 31, 46, 0.25)` — fades as sheet lifts
- Spring physics on snap. Drag-to-dismiss. Tap-backdrop-to-collapse.

### 6.9 Empty States

Formula: Illustration → Headline → Subtext → Action

- Illustration: single-line SVG, 48px tall, `--text-muted` stroke, no fill
- Headline: `subtitle`, `--text-primary`, centered
- Subtext: `body`, `--text-secondary`, 2 lines max
- Button: Primary, centered, 200px wide

Example (no missions joined):
```
     〰〰〰        ← wave line illustration

"The ocean's waiting."
Join your first cleanup and
earn your Beach Guardian badge.

   [ Browse Missions ]
```

### 6.10 Skeleton Loading

No spinners. Content areas replaced with:
- Same layout as real content
- `--bg-sunken` placeholder shapes with `radius-xs`
- Shimmer: gradient sliding L→R over 1.4s, infinite
- Transition to real content: 200ms cross-dissolve

---

## 7. Screen-by-Screen Redesign

### 7.1 Splash + Onboarding (MISSING — must build)

**Splash (1.5s):**
- Full background `--bg-base` (warm cream)
- Centered: "SafeSurf" in `hero` weight, `--text-primary`
- A subtle wave path SVG draws under the wordmark (draw-on animation, 600ms)
- Fades out

**Onboarding Carousel (3 slides, swipeable):**

| Slide | Visual | Headline | Sub |
|-------|--------|----------|-----|
| 1 | Full-bleed beach photo, dark overlay | "Find your wave." | Live conditions for every beach in Bali. |
| 2 | Stylized map with color-coded beach pins | "Beat the crowd." | Smart routing away from busy spots. |
| 3 | Real people cleaning a beach | "Protect what you love." | Earn rewards. Join the people who care. |

- Progress: 3 thin lines at top. Active = full width + white. Inactive = 30% width + 40% opacity.
- Bottom: `Skip` (ghost, left) + `Continue →` (coral primary, right). Final slide: `Get Started`.

**Quick Setup (1 screen):**

Two questions displayed as cards:
1. "Your surf level?" → 3 icon tiles (single select): Beginner · Intermediate · Advanced
2. "What matters to you?" → pill multi-select: Wave quality · Low crowds · Clean water · New spots · Community

Then: `Let's go →` primary CTA

---

### 7.2 Today (Home) — Full Redesign

**Goal:** In 3 seconds, Pablo knows exactly where to surf.

**Above the fold — THE RECOMMENDATION takes 65% of screen:**

```
Apr 25 · Bali                          [🔔]

TODAY'S BEST CALL      ← micro eyebrow

┌──────────────────────────────────────┐
│                                [87] │  ← score gauge (80px) top-right
│   beach gradient / photo            │
│                                     │  220px hero
│   Balangan Beach                    │  ← hero font, white
│   ● Empty  💧 Excellent  🌊 1.4m    │  ← 3 status pills
└──────────────────────────────────────┘

"Skip the lineup. Crystal water,          ← body-lg, --text-secondary
peeling lefts, 8 surfers max."

              [ Take me there → ]        ← full-width coral primary
```

**Below fold (scrollable sections):**

**"3 alternatives"** — eyebrow: `IF NOT BALANGAN`
Horizontal scroll of 3 compact beach cards. Right edge partially visible = scroll indicator.

**"Today in Bali"** — eyebrow: `BALI-WIDE TODAY`
Single conditions strip with island averages (Water/Waves/Wind/Crowd).

**"Your next mission"** — only shown if Pablo has joined one
Single compact mission card.

**"Today's green moment"** — dismissible
Small card, `--teal-50` bg: a single interesting ocean fact + CTA "Ask Surfi about this →"

That's all. **No full beach list on Home** — that belongs on Map.

---

### 7.3 Map — Full Redesign

**Goal:** Spatial overview with instant filtering.

**Full-screen map.** All UI floats as overlays.

**Map tile style:** Stadia Maps "Alidade Smooth" — land matches `--bg-base`, water in soft teal wash, minimal road detail. Not default OSM gray.

**Floating overlays:**
- Top-left: SafeSurf logo pill (small, `--bg-surface`, `shadow-soft`)
- Top-right: Filter pill (`"Filter"` + icon. Coral fill if any filter is active.)

**Custom Map Pins:**
Each pin is a 44px SVG circle:
- Outer ring: 3px, crowd-level semantic color
- Inner: beach identity gradient (36px)
- Selected: outer ring expands to 8px + pulse halo animation. Pin lifts 4px with shadow.
- Stale data (>30min): small clock overlay on pin.

**Bottom Sheet:**

Peek state (default 22%):
```
           ────
  8 beaches near you         [All ▾]
  [Balangan] [Padang] [Uluwatu] →
```
Horizontal scroll of compact cards.

Mid state (drag up, 55%):
- Filter chips: All · Uncrowded · Clean · Good Surf · Beginner · Family
- Vertical list of beach cards, sorted by Go Score

Full state (92%): Same, full scrollable list

Tap a pin → sheet snaps to mid, list auto-scrolls to highlight that beach.
Tap card → navigate to Beach Detail.

---

### 7.4 Beach Detail — Full Redesign

**Scrollable page, sticky bottom CTA bar.**

**Zone 1 — Hero**
Beach photo or gradient, 220px tall.
Ghost buttons over photo: `←` back (top-left), `♡` save + `↗` share (top-right).
Beach name in `hero` white, bottom-left.
Tags row: `#reef-break` `#uncrowded` `#scenic` in white pills.

**Zone 2 — Score Gauge (the answer)**
112px gauge, centered, half-overlapping hero bottom.
```
         ╭──[87]──╮
        ╱  GO SCORE ╲
"Best window 6–9 AM. Very low crowd,
 excellent water quality."
```
This is the most important content. 2 sentences max for the AI verdict.

**Zone 3 — Conditions Strip**
4-column: Water · Waves · Wind · Crowd
Tap any tile: inline detail popover (e.g. Water shows: pH, bacteria level, last-tested time, rainfall note)

**Zone 4 — Today's Timeline**
Recharts AreaChart, crowd + wave height across 24h. "Now" vertical marker.
Below chart: 3 best-window pills: `✓ 6–9 AM` `○ Noon` `⚠ 2–5 PM`

**Zone 5 — Beach character**
3–4 sentence description. Tag pills below.

**Zone 6 — Community intel**
3 latest check-ins: avatar + 1-line note + time. Plus "Add your report" row.

**Sticky bottom CTA bar (always visible):**
```
[ ♡ Save ]   [ I'm going → ]   [ ↗ Share ]
```
"I'm going" = coral primary. On tap: morphs to `"✓ Checked in!"` green. Check-in increments live crowd counter.

---

### 7.5 Missions (Community) — Full Redesign

**Header:**
- Eyebrow: `BALI CLEANUP NETWORK`
- Title: "Missions"
- Subtitle: "186 volunteers active this month"
- Segmented control: `All` · `Joined` · `My Impact`

**FEATURED mission (top, hero-width):**
One curated "most urgent" mission with photo, large type, urgency tag `TOMORROW · 6 AM`, coral CTA. This isn't a list item — it's editorial.

**Feed (grouped by date):**
Group headers: `THIS WEEK` · `NEXT WEEK` · `LATER` in `micro` uppercase.
Optimistic UI on join (instant button state change, then sync).

**Joined tab:**
Calendar-style: date blocks down left column, mission details right.
Impact strip at top: missions joined · kg collected · CO₂ offset.

**My Impact tab:**
Big display number: `"15.4 kg"` of trash collected.
Translation: `"That's 1,540 single-use bottles diverted from Bali's ocean."` — make it tangible, not abstract.
Leaderboard below (community framing, not competition).

---

### 7.6 Me (Profile) — Full Redesign

**Hero (visible without scrolling):**
```
[deep teal gradient header]                [⚙]

[🏄 avatar]
Pablo
@pablo_surfs · Canggu, Bali

┌──────────────────────────────────────┐
│         15.4 kg collected            │  ← display number
│   ≈ 1,540 bottles saved from ocean   │  ← translation
└──────────────────────────────────────┘
```

Impact number is the hero — not green points. Points are a mechanic; impact is the meaning.

**Level Progress:**
```
Green Activist ●━━━━━━━━━━━━━━━━━━━━● Ocean Guardian
              ████████████░░░░░░░
                1,250 / 2,000 pts · 750 to go
```

**Stats Grid (2×2):**
```
┌──────────────┬──────────────┐
│ 🏄  5        │ 🏖  12       │
│  Missions    │  Beaches     │
├──────────────┼──────────────┤
│ 🌱  8.2 kg   │ 🔥  3 wks    │
│  CO₂ Offset  │  Streak      │
└──────────────┴──────────────┘
```

**Badge Collection:**
4-column grid. Earned: full color, subtle shadow, tap for info modal.
Locked: grayscale + 40% opacity + lock overlay. Tap → "how to earn" modal.

**Partner Perks (horizontal scroll):**
Card per partner: logo, discount text, `UNLOCKED` or `Unlock at 1000 pts`.
Unlocked: tap → QR code modal for in-store redemption.

---

### 7.7 Guide (AI Chat) — Full Redesign

**Goal:** A knowledgeable local friend named "Surfi," not a generic chatbot.

**Header:**
```
[wave icon]  Surfi
             Your Bali surf guide  ● Online
```

**Conversation:**
- Pablo's messages: right-aligned, `--teal-50` bg bubble, `--teal-700` text, `radius-xl` cut at bottom-right
- Surfi's messages: NO bubble. Plain text on `--bg-base`. Small "Surfi" label + icon above in `micro`. Feels like reading a local's message, not a chat widget.
- **Inline rich cards:** When Surfi mentions a beach → renders a compact BeachCard inline. Mentions a mission → compact MissionCard inline. Chat becomes a rich information surface.

**Suggested Prompts (above input, always visible):**
3 contextual pill chips that rotate by time:
- Morning: `"Best spot now"` · `"Sunrise check-in"` · `"Today's conditions"`
- Afternoon: `"Afternoon session?"` · `"Nearest cleanup"` · `"Crowd check"`

**Typing indicator:**
3 dots with sinusoidal wave-phase animation (not standard bounce — a ripple moving left→right).

**Input bar:**
- Left: `+` (quick actions: Check-in / Report pollution / Photo)
- Center: text input, `--bg-sunken`, `radius-full`
- Right: mic when empty → send button when typing

---

## 8. Motion & Animation System

### 8.1 Principles

1. **Purposeful** — every animation answers "what changed?" or "what can I do next?"
2. **Snappy** — interactive feedback <150ms. Full transitions complete by 300ms.
3. **Spring-first** — spring physics everywhere interactive. Linear = mechanical = wrong.
4. **Measured** — ocean energy is slow swells, not jittery bouncing. Springs are gentle.
5. **Respect prefers-reduced-motion** — collapse all to 120ms instant fade.

### 8.2 Easing Tokens

```js
const easings = {
  enter:        [0.16, 1, 0.3, 1],       // Decelerate in (things appearing)
  exit:         [0.7, 0, 0.84, 0],        // Accelerate out (things leaving)
  spring:       { type: 'spring', stiffness: 300, damping: 28 },
  springSnappy: { type: 'spring', stiffness: 420, damping: 32 },
  springGentle: { type: 'spring', stiffness: 200, damping: 24 },
}
```

### 8.3 Page Transitions

Enter: slide up 20px + fade in, 280ms `ease-enter`. New content comes from "below" — like a wave rising.
Exit: fade out only, 160ms. No movement out.

### 8.4 Interaction Animation Catalog

| Interaction | Behavior |
|-------------|----------|
| **Card press** | scale 0.97, `springSnappy` → spring back on release |
| **Score gauge entrance** | Arc sweeps 0°→target in 700ms ease-out. Number counts up in sync. |
| **Tab switch** | Active dot slides between positions (layout animation). Icon scale 1→1.08→1. |
| **Map pin select** | Halo pulse (scale 1→1.4, opacity 1→0, 600ms, repeat 2×). Pin lifts 4px. |
| **Bottom sheet drag** | Follows finger 1:1. Snaps to nearest position with `springGentle`. Backdrop fades in sync. |
| **Pull to refresh** | Custom wave SVG fills as you pull (progress-tied). Splash particles on release. |
| **Mission join** | Button text crossfades: "Join Mission" → "✓ See you Tuesday." Confetti: 12 dots in `--status-go` + `--coral-500`, arc trajectories, 800ms. |
| **Badge earned** | Full-screen overlay. Badge scales 0.5→1.1→1.0 with halo bloom. Auto-dismiss 3s or tap. |
| **Number reveal** | Tabular nums count from 0 to value, 600ms ease-out. Used for score, kg, points. |
| **Check-in morph** | "I'm going →" width morphs → check icon → "✓ Checked in!" Coral→green color. |
| **Skeleton** | `--bg-sunken` shapes, shimmer L→R gradient 1.4s infinite. Cross-dissolve to real content. |
| **Toast** | Slides up from above bottom nav, `springSnappy`. Swipe-to-dismiss. Auto-dismiss 3.5s. |

---

## 9. Voice & Tone

### 9.1 Core Voice

| We are | We are not |
|--------|-----------|
| Confident | Pushy |
| Warm | Sentimental |
| Brief | Terse |
| Direct | Blunt |
| Knowledgeable | Preachy |

### 9.2 Copy Patterns

**Recommendations:**
- Lead with place, then reason: `"Head to Balangan. Empty + clean + 1.4m lefts."`
- Use declarative sentences. No hedging.
- Negative: `"Skip Kuta today."` Not: `"Kuta Beach is not recommended at this time."`

**Status labels (always human words, not numbers):**
- Water: Excellent / Good / Moderate / Poor
- Crowd: Empty / Quiet / Moderate / Busy / Packed

**Mission CTAs:**
- Join: `"You're in. See you at sunrise."` (not "Successfully joined")
- Leave: `"Leaving frees your spot for someone else."` (context, not guilt)

**Achievement:**
- Badge: `"You've earned Beach Guardian."` — single sentence, done.
- Level up: `"Ocean Guardian. You made it."` — confident, brief.

**Errors:**
- `"Couldn't load beach data. The ocean's always moving — try again."`
- Never: `"Error 503: Service unavailable"`

### 9.3 Surfi (AI Guide) Voice

Speaks like a knowledgeable local who surfs daily and cares about the reef.
- Uses beach-specific knowledge: `"Padang only turns on with SW swell. Today it's on."`
- Opinionated when helpful: `"Honestly? Skip Uluwatu this morning. Too crowded for what's out there."`
- Mentions reef-safe sunscreen as a suggestion, not a lecture.
- Uses Pablo's name 1–2× per conversation, not every message.

---

## 10. Accessibility

- **Contrast:** All text/bg pairs ≥ 4.5:1 (WCAG AA). Check every combination.
- **Color independence:** Every status has icon + text + color. Never color alone.
- **Tap targets:** 48×48px minimum. Adjacent targets with 8px gap.
- **Focus visible:** 2px solid `--teal-500`, 2px offset. Never `outline: none` without replacement.
- **Reduced motion:** `prefers-reduced-motion: reduce` collapses all animations to 120ms fade.
- **Screen reader:** All icon-only buttons have `aria-label`. Score gauge: `aria-label="Go score 87 out of 100, Excellent."`. Decorative icons: `aria-hidden="true"`.
- **Dynamic type:** Text scales with system settings to 200%. No fixed heights on text containers.

---

## 11. Implementation Priorities (Build Order)

Build in this sequence — each layer makes the next faster and better:

1. **Design tokens** — CSS custom properties + Tailwind theme. Colors, spacing, radii, shadows, fonts. One source of truth.
2. **Typography** — Load Plus Jakarta Sans. Apply type scale as Tailwind utilities.
3. **Core atoms** — Button (all variants), StatusPill, ScoreGauge, ConditionsStrip, Avatar, Tag.
4. **Layout shell** — App container, BottomNav (with slide animation), Header variants.
5. **Splash + Onboarding** — First impressions matter most. Build it first.
6. **Today screen** — The hero recommendation card. This is the demo centerpiece.
7. **Beach Detail** — Score gauge hero, conditions, chart, sticky CTA bar.
8. **Map** — Custom tiles, custom SVG pins, bottom sheet with snap positions.
9. **Missions** — Featured mission hero + grouped feed + join interaction + confetti.
10. **Me / Profile** — Impact hero number, level progress, badge grid, perks scroll.
11. **Guide / Chat** — Inline rich cards, suggested prompts, Surfi persona.
12. **Polish pass** — Page transitions, spring animations, score gauge countup, confetti, wave pull-to-refresh.

**Dependencies to add:**
- `framer-motion` — all springs, page transitions, shared layout animations, gesture handling
- `@radix-ui/react-tabs` + `@radix-ui/react-dialog` — accessible primitives

**Map improvement:**
- Stadia Maps tiles (Alidade Smooth — free for prototypes) replaces default OSM gray
- Custom SVG CircleMarker replacement with the gradient pin design

---

## 12. Definition of Done (per screen)

- [ ] Primary answer visible without scrolling
- [ ] Exactly one Primary (coral) button visible
- [ ] Every color communicates meaning — nothing is decorative
- [ ] All numbers use tabular-nums
- [ ] Every interactive element has a press state and focus state
- [ ] Empty, loading, and error states are designed
- [ ] Looks intentional in a screenshot — no orphaned text, no awkward gaps
- [ ] Reads well at 320px width
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Feels calm. If it feels busy — remove something.
