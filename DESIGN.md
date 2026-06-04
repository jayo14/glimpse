# Design System Inspired by Cluely; applied

## 1. Visual Theme & Atmosphere

Cluely's design system embodies a modern, professional aesthetic with a sophisticated blend of cool blues and refined neutrals. The visual language conveys trust, innovation, and clarity—essential qualities for an AI meeting assistant. The design employs a minimalist approach with strategic use of depth and elevation to create hierarchy and guide user attention. Soft shadows and subtle inset glows create a contemporary, almost ethereal quality that reinforces the cutting-edge nature of the product while maintaining accessibility and readability across all surfaces.

**Key Characteristics**

- Clean, minimalist aesthetic with strong typographic hierarchy
- Sophisticated blue and neutral color palette evoking professionalism and trust
- Subtle depth through layered shadows and inset glows
- Modern sans-serif primary font (Geist) paired with elegant serif display font (EB Garamond)
- Generous whitespace and breathing room between components
- Soft, rounded button treatments with contemporary shadow treatments
- Focus on clarity and scannability for busy professionals

## 2. Color Palette & Roles

### Primary

- **Deep Slate** (`#263043`): Primary brand color used extensively for text, buttons, and interactive elements; conveys stability and professionalism
- **Night** (`#18171C`): Deep background and text color for high contrast; creates visual hierarchy and emphasis

### Accent Colors

- **Rose Mist** (`#F4C9C8`): Subtle warm accent for special highlights or status indicators
- **Sage Green** (`#A7C3A8`): Gentle accent for positive or balanced states
- **Deep Rose** (`#481F1E`): Rich accent for subtle emphasis or decorative elements
- **Forest** (`#2D492E`): Dark accent for contrast and emphasis
- **Steel Gray** (`#8C929D`): Mid-tone accent for secondary information

### Interactive

- **Charcoal** (`#000000`): Primary interactive text and borders; maximum contrast
- **Coal** (`#040406`): Near-black for deepest shadows and strong contrast

### Neutral Scale

- **Platinum** (`#FFFFFF`): Primary background and light text; foundational neutral
- **Light Gray** (`#EDEEF2`): Secondary background surfaces; slightly warmer than white
- **Off White** (`#F5F5F5`): Tertiary background; subtle distinction from primary white
- **Silver** (`#E4E4E7`): Border color and light dividers; creates visual separation
- **Stone** (`#B2B3BA`): Medium-neutral for secondary text and muted elements
- **Ash** (`#898B91`): Tertiary text and disabled states; lower contrast for de-emphasis
- **Gray** (`#9B9B9B`): Auxiliary neutral for placeholder text and hints

### Surface & Borders

- **Border Default** (`#E4E4E7`): Primary border color used 482 times across the system; subtle visual separation
- **Border Secondary** (`#B2B3BA`): Secondary borders for less prominent dividers
- **Surface Light** (`#EDEEF2`): Elevated surface backgrounds for cards and containers
- **Surface Lightest** (`#F5F5F5`): Minimal elevation for subtle background variation

## 3. Typography Rules

### Font Family

**Primary Font: EB Garamond**
Fallback stack: `"EB Garamond", Georgia, serif`
Used for display headings and premium brand moments.

**Secondary Font: Geist**
Fallback stack: `"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif`
Used for body text, navigation, buttons, and UI labels.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display 1 (H1) | EB Garamond | 80px | 500 | 76.8px | 0px | Hero headline; premium brand expression |
| Heading 2 (H2) | Geist | 19px | 500 | 26.6px | 0px | Section subheading; moderate emphasis |
| Heading 3 (H3) | Geist | 28px | 500 | 35px | 0px | Feature headline; strong visual hierarchy |
| Body (Paragraph) | Geist | 12px | 400 | 19.2px | 0px | Primary content text; long-form reading |
| Span / Inline | Geist | 16px | 400 | 24px | 0px | Inline text and smaller callouts |
| Button / CTA | Geist | 16px | 500 | 24px | 0px | Primary button labels; bold prominence |
| Button Small | Geist | 12px | 500 | 16px | 0px | Secondary/tertiary buttons; compact |
| Input / Form | Geist | 13px | 400 | 19.5px | 0px | Form field text and placeholders |

### Principles

- **Hierarchy through scale and weight**: Display uses 80px serif for maximum impact; body uses 12px sans-serif for legibility
- **Professional balance**: Serif display paired with modern sans-serif body creates premium-yet-accessible feeling
- **Generous line heights**: 1.2–1.4× multiplier ensures ample breathing room and readability
- **Consistent weights**: 400 for body, 500 for headings and buttons; minimal weight variation maintains clarity
- **Compact inputs**: Form text smaller (13px) than body to maintain visual hierarchy and expected interaction model

## 4. Component Stylings

### Buttons

#### Primary Button (Large)
- **Background**: `rgba(0, 0, 0, 0)` (transparent with shadow)
- **Text Color**: `#FFFFFF`
- **Font**: Geist, 16px, weight 500
- **Padding**: `10px 20px`
- **Border Radius**: `12px`
- **Border**: `0px solid`
- **Box Shadow**: `rgba(148, 172, 243, 0.4) 20px 20px 24px 0px, rgba(191, 229, 251, 0.4) -3px -3px 4px 0px inset, rgba(19, 26, 228, 0.1) 4px 4px 4px 0px inset`
- **Line Height**: 24px
- **Height**: auto
- **Width**: fit-content
- **Hover State**: Maintain shadow intensity; increase opacity on inset glows to 0.5

#### Secondary Button (Icon)
- **Background**: `rgba(0, 0, 0, 0)`
- **Text Color**: `#FFFFFF`
- **Font**: Geist, 16px, weight 400
- **Padding**: `0px`
- **Border Radius**: `0px`
- **Border**: `0px solid`
- **Box Shadow**: none
- **Height**: 24px
- **Width**: 24px
- **Line Height**: 24px
- **Hover State**: Opacity fade to 0.7

#### Tertiary Button (Pill Badge)
- **Background**: `rgba(0, 0, 0, 0)`
- **Text Color**: `#FFFFFF`
- **Font**: Geist, 12px, weight 500
- **Padding**: `0px 12px`
- **Border Radius**: `33px` (fully rounded)
- **Border**: `0px solid`
- **Box Shadow**: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(175, 179, 196) 0px 0.7px 0px 0px inset`
- **Height**: 32px
- **Line Height**: 16px
- **Hover State**: Inset shadow opacity increase to 1

#### Dark Button (Minimal)
- **Background**: `rgba(0, 0, 0, 0)`
- **Text Color**: `#000000`
- **Font**: Geist, 16px, weight 400
- **Padding**: `0px`
- **Border Radius**: `33px`
- **Border**: `0px solid`
- **Box Shadow**: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(175, 179, 196) 0px 0.7px 0px 0px inset`
- **Height**: 32px
- **Width**: 32px
- **Line Height**: 24px

### Cards & Containers

#### Large Card (Hero Section)
- **Background**: `rgba(0, 0, 0, 0)`
- **Text Color**: `#000000`
- **Font**: Geist, 16px, weight 400
- **Padding**: `112px`
- **Border Radius**: `24px`
- **Border**: `0px solid`
- **Box Shadow**: none
- **Height**: 541.688px
- **Width**: 896px
- **Line Height**: 24px

#### Standard Card (Feature)
- **Background**: `rgba(0, 0, 0, 0)`
- **Text Color**: `#000000`
- **Font**: Geist, 16px, weight 400
- **Padding**: `22px`
- **Border Radius**: `24px`
- **Border**: `0px solid`
- **Box Shadow**: none
- **Height**: 365.969px
- **Width**: 384px
- **Line Height**: 24px

#### Minimal Card (Gallery Item)
- **Background**: `rgba(0, 0, 0, 0)`
- **Text Color**: `#000000`
- **Font**: Geist, 16px, weight 400
- **Padding**: `0px`
- **Border Radius**: `24px`
- **Border**: `0px solid`
- **Box Shadow**: none
- **Height**: 365.969px
- **Width**: 384px

### Inputs & Forms

#### Text Input (Default)
- **Background**: `rgba(0, 0, 0, 0)` (transparent)
- **Text Color**: `#FFFFFF`
- **Font**: Geist, 13px, weight 400
- **Padding**: `10px 10px 8px 10px`
- **Border Radius**: `0px`
- **Border**: `0px solid`
- **Box Shadow**: `rgba(0, 0, 0, 0.05) 0px 2px 20px -1px inset`
- **Height**: 37.5px
- **Line Height**: 19.5px
- **Placeholder Color**: `#898B91`
- **Focus State**: Box shadow opacity increases to 0.1; text color remains `#FFFFFF`

#### Text Input (Secondary)
- **Background**: `rgba(0, 0, 0, 0)`
- **Text Color**: `#FFFFFF`
- **Font**: Geist, 13px, weight 400
- **Padding**: `10px 10px 8px 10px`
- **Border Radius**: `0px`
- **Border**: `0px solid`
- **Box Shadow**: `rgba(0, 0, 0, 0.05) 0px 2px 20px -1px inset`
- **Height**: 37.5px
- **Width**: 456px
- **Line Height**: 19.5px

### Navigation

#### Header Navigation
- **Background**: `rgba(0, 0, 0, 0)`
- **Text Color**: `#000000`
- **Font**: Geist, 16px, weight 400
- **Padding**: `0px`
- **Border Radius**: `0px`
- **Border**: `0px solid`
- **Box Shadow**: none
- **Height**: 156px
- **Width**: 549.281px
- **Line Height**: 24px
- **Link Hover**: Text opacity increases to 0.8

### Links

#### Standard Link (Default)
- **Background**: `rgba(0, 0, 0, 0)`
- **Text Color**: `#FFFFFF`
- **Font**: Geist, 16px, weight 400
- **Padding**: `0px`
- **Border Radius**: `4px`
- **Border**: `0px solid`
- **Box Shadow**: none
- **Height**: 22px
- **Width**: 84px
- **Line Height**: 24px
- **Hover State**: Text color lightens or opacity fades

#### Navigation Link (Accent)
- **Background**: `rgba(0, 0, 0, 0)`
- **Text Color**: `#FFFFFF`
- **Font**: Geist, 14px, weight 500
- **Padding**: `8px 14px`
- **Border Radius**: `0px`
- **Border**: `0px solid`
- **Box Shadow**: none
- **Height**: 36px
- **Width**: 128.281px
- **Line Height**: 20px
- **Active State**: Underline or border-bottom `2px solid #FFFFFF`

## 5. Layout Principles

### Spacing System

**Base Unit**: 4px

**Scale**:
- **Micro**: 4px (tight spacing, icon padding)
- **Extra Small**: 8px (small gaps, input padding)
- **Small**: 12px (standard padding)
- **Medium**: 16px (component spacing)
- **Large**: 20px (section gaps)
- **Extra Large**: 24px (card padding, large buttons)
- **Jumbo**: 28px (large section gaps)
- **Extra Jumbo**: 32px (spacious padding)
- **2XL**: 40px (hero padding)
- **3XL**: 44px (major section breaks)
- **4XL**: 48px (full-width spacing)
- **5XL**: 56px (display section spacing)

**Usage Context**:
- Internal button padding: 10px (custom) or `12px`
- Card padding: `22px` (standard), `24px` (spacious), `112px` (hero)
- Section gaps: `20px–56px` depending on visual weight
- Form field spacing: `8px` between labels and inputs
- Navigation spacing: `16px–24px` between items

### Grid & Container

- **Max Width**: 1200px (inferred from standard web practices)
- **Column Strategy**: 12-column flexible grid with 16px gutters
- **Container Padding**: 40px (desktop), 24px (tablet), 16px (mobile)
- **Card Width**: 384px (standard), 896px (hero/wide)
- **Navigation Width**: 549.281px (inferred)

### Whitespace Philosophy

Cluely embraces generous whitespace to create a premium, breathing aesthetic. Spacing between major sections ranges from 44px to 56px, creating visual rest and preventing cognitive overload. Card-to-card spacing maintains 24px minimum gaps. Within cards, padding of 22px–24px ensures content doesn't feel cramped. Hero sections employ 112px padding, signaling premium, elevated experiences. This philosophy reinforces the professional, trustworthy positioning of the product.

### Border Radius Scale

- **None**: `0px` (forms, inputs, navigation baseline)
- **Minimal**: `4px` (link focus states)
- **Small**: `6px` (image corners, fine details)
- **Medium**: `12px` (button outlines, secondary buttons)
- **Large**: `13px` (image overlays)
- **Extra Large**: `24px` (cards, containers)
- **Full**: `33px+` (pill buttons, fully rounded badges)

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | `box-shadow: none` | Base surfaces, navigation, text |
| Raised (1) | `rgba(0, 0, 0, 0.05) 0px 2px 20px -1px inset` | Input fields, subtle lift |
| Lifted (2) | `rgb(175, 179, 196) 0px 0.7px 0px 0px inset` | Pill buttons, tertiary actions |
| Elevated (3) | `rgb(12, 68, 161) 0px 0px 0px 0.5px, rgb(2, 44, 112) 0px -1px 0px 0px inset, rgb(129, 182, 255) 0px 0.5px 0px 0px inset` | Primary button hover, high emphasis |
| Float (4) | `rgba(148, 172, 243, 0.4) 20px 20px 24px 0px, rgba(191, 229, 251, 0.4) -3px -3px 4px 0px inset, rgba(19, 26, 228, 0.1) 4px 4px 4px 0px inset` | Primary CTA buttons, floating elements |
| Premium (5) | `rgba(255, 255, 255, 0.5) 2.093px 1.951px 9.012px 0px inset, rgba(255, 255, 255, 0.5) 1.111px 1.035px 4.506px 0px inset` | Custom premium states, glass morphism accents |

**Shadow Philosophy**

Cluely's elevation system uses layered inset and outset shadows to create depth without heaviness. Shadows employ soft blues and whites to maintain the cool, contemporary palette. Multiple shadow layers (outer glow + inner highlight + accent) create a sophisticated, almost glassmorphic effect that feels premium and modern. Shadows increase in intensity with interaction depth—flat text and surfaces have no shadow; primary CTAs employ the full floating treatment with multiple shadow layers.

## 7. Do's and Don'ts

### Do

- Use the primary deep slate (`#263043`) and night (`#18171C`) for text and primary UI elements
- Employ generous spacing (20px–56px) between major sections to maintain breathing room
- Leverage the soft blue shadow palette for depth; never use harsh black shadows
- Apply EB Garamond sparingly for display headings only; rely on Geist for all body and interactive text
- Use transparent backgrounds with shadow elevation for buttons; never solid flat backgrounds
- Maintain 24px border radius for card containers; 12px for secondary buttons
- Pair warm accents (rose, sage) with cool neutral backgrounds for visual pop
- Test all text for WCAG AA contrast compliance; aim for 4.5:1 minimum on body text
- Use inset shadows to suggest affordance and clickability on interactive elements

### Don't

- Don't mix serif and sans-serif fonts in the same component or section
- Don't use harsh black (`#000000`) shadows; always blend with background color using opacity
- Don't set font weights beyond 500 (reserved for headings and buttons); body text is always 400
- Don't apply border-radius below 12px on clickable buttons; maintain modern, soft appearance
- Don't layer more than three distinct shadows on a single element; keep elevation subtle
- Don't set padding below 8px; maintain minimum touch target size of 32px
- Don't use the full rose or sage accent colors as backgrounds; reserve for small highlights
- Don't stretch input fields beyond 490px without responsive redesign
- Don't apply full-width card layouts; maintain 384px–896px container sizes for visual hierarchy
- Don't forget to include inset highlights alongside outset shadows for the signature glassmorphic treatment

## 8. Responsive Behavior

### Breakpoints

| Breakpoint | Width | Key Changes |
|-----------|-------|-------------|
| Mobile | 320px–640px | Single-column layout; container padding 16px; button font 14px; heading H3 24px |
| Tablet | 641px–1024px | Two-column grid; container padding 24px; full navigation visible; button padding 12px 16px |
| Desktop | 1025px–1440px | Three-column grid; container padding 40px; wide cards (896px) available; full spacing scale applied |
| Large Desktop | 1441px+ | Four-column grid; max-width 1200px applied; spacing 56px sections; hero padding maintained |

### Touch Targets

- **Minimum touch target**: 32px × 32px (buttons, icon buttons)
- **Recommended touch target**: 44px × 44px (navigation, primary CTAs)
- **Form inputs**: 37.5px height minimum; 40px+ recommended
- **Link target**: 40px minimum line height for text links
- **Spacing between targets**: 8px–12px minimum gap to prevent accidental activation

### Collapsing Strategy

- **Navigation**: Collapses to hamburger menu at tablet breakpoint (641px)
- **Cards**: Shift from 3-column to 2-column at tablet; 1-column at mobile
- **Padding**: Reduces from 112px (desktop hero) to 56px (tablet) to 32px (mobile)
- **Typography**: H1 scales from 80px (desktop) to 56px (tablet) to 40px (mobile)
- **Form inputs**: Width becomes 100% on mobile; tablet maintains 456px max width
- **Spacing scale**: All gap values decrease by 25–33% at tablet; 50% at mobile
- **Button layout**: Stacks vertically on mobile; horizontal on tablet+
- **Hero sections**: Image backgrounds scale with aspect ratio maintained; text overlay repositions below 768px

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA / Button Glow**: Soft Blue shadow palette (`rgba(148, 172, 243, 0.4)` for outer glow)
- **Primary Text**: Deep Slate (`#263043`) or Night (`#18171C`)
- **Background Neutral**: White (`#FFFFFF`) or Light Gray (`#EDEEF2`)
- **Heading Text**: Night (`#18171C`)
- **Border / Divider**: Silver (`#E4E4E7`) or Stone (`#B2B3BA`)
- **Button Text**: White (`#FFFFFF`) on transparent background
- **Input Text**: White (`#FFFFFF`) on transparent with inset shadow
- **Secondary Accent**: Rose Mist (`#F4C9C8`), Sage Green (`#A7C3A8`)
- **Disabled / Muted**: Ash (`#898B91`) or Gray (`#9B9B9B`)

### Iteration Guide

1. **Shadow Strategy**: All interactive buttons use three-layer shadows (outer glow + inset highlight + accent); inputs use single soft inset shadow `rgba(0, 0, 0, 0.05) 0px 2px 20px -1px inset`

2. **Button Styling**: Primary buttons are always transparent background with floating shadow treatment; border radius 12px; padding 10px 20px; never use solid fills or stark borders

3. **Typography Hierarchy**: Display text (H1) uses EB Garamond 80px weight 500; all UI text uses Geist with weights 400 (body) or 500 (headings/buttons)

4. **Spacing Multiplier**: Base 4px unit; apply in multiples (8, 12, 16, 20, 24, 28, 32, 40, 44, 48, 56); section gaps minimum 20px, card internal padding minimum 22px

5. **Card Containers**: Always apply 24px border radius; padding 22px (standard) or 112px (hero); never add background color—maintain transparency and rely on page background

6. **Form Elements**: Input fields are transparent with 0px border-radius and subtle inset shadow; height 37.5px; font Geist 13px; placeholder color `#898B91`

7. **Color Contrast**: Ensure all text meets WCAG AA 4.5:1 minimum; test white text on transparent shadows; avoid light text below 16px font size without weight boost to 500+

8. **Touch Interaction**: All clickable elements minimum 32px × 32px; spacing between targets 8px–12px; hover states use opacity fade or shadow intensity increase, never color shift

9. **Responsive Collapse**: Desktop padding 40px→24px tablet→16px mobile; navigation collapses to menu at 641px; cards flex 3-col→2-col→1-col; hero images scale with aspect ratio preserved
