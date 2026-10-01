---
name: Aquaspin Laundry Station
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3f4850'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#707881'
  outline-variant: '#bfc7d2'
  surface-tint: '#006398'
  primary: '#006194'
  on-primary: '#ffffff'
  primary-container: '#007bb9'
  on-primary-container: '#fdfcff'
  inverse-primary: '#93ccff'
  secondary: '#006399'
  on-secondary: '#ffffff'
  secondary-container: '#7bc2ff'
  on-secondary-container: '#004f7b'
  tertiary: '#00685f'
  on-tertiary: '#ffffff'
  tertiary-container: '#008378'
  on-tertiary-container: '#f4fffc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#93ccff'
  on-primary-fixed: '#001d31'
  on-primary-fixed-variant: '#004b73'
  secondary-fixed: '#cde5ff'
  secondary-fixed-dim: '#94ccff'
  on-secondary-fixed: '#001d32'
  on-secondary-fixed-variant: '#004b74'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  currency-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  currency-body:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

# Aquaspin Laundry Station - Design System

## Brand & Style

The design system embodies effortless freshness, hygiene, and domestic dependability. It balances an ultra-clean, clinical clarity with the warm, vibrant hospitality characteristic of modern Philippine daily-life utilities. The interface evokes the visual and sensory feeling of fresh running water, crisp folded linen, and prompt neighborhood logistics.

The visual style blends **Modern Tactile Utility** with **Subtle Aqueous Depth**. Surfaces are buoyant, soft, and distinctly organized into clean segmented cards. Subtle light-refracting gradients suggest pure water flows, while micro-interactions provide physical feedback akin to modern appliance control panels. Key states are instantly legible to users walking down tropical streets or tracking cycles in dimly lit laundry stations.

---

## Colors

The palette revolves around pure aquatic blues, hygienic mint teals, and oceanic slates, paired with critical functional indicators tailored for local commerce.

### Functional & Accent Roles
- **Primary (`#0284C7` / `#006194`)**: Clear sky blue. Used for primary operational calls to action, active wash indicators, and interactive highlights.
- **Secondary (`#0369A1` / `#006399`)**: Deep oceanic blue. Anchors structural navigation, top bars, and high-emphasis controls.
- **Tertiary (`#0D9488` / `#00685F`)**: Crisp mint/teal. Represents hygiene, completed washing/folding cycles, and pristine sanitized states.
- **Neutral (`#0F172A` / `#131B2E`)**: Deep oceanic slate. Serves as dark-mode canvas ground and high-contrast text in light mode.

### Local Payment & Operational Signals
- **GCash Indicator (`#005CE6`)**: Official high-trust royal blue for GCash payment gateways and verification marks.
- **Cash / Paid Indicator (`#16A34A`)**: Fresh emerald green for physical counter cash, zero balance states, and instant receipts.
- **Pay-Later / Balance Alert (`#D97706`)**: Warm amber for pending store accounts, partial payments, and overdue pickup notifications.
- **Error / Machine Issue (`#BA1A1A` / `#E11D48`)**: High-visibility rose red for wash errors, water pressure alerts, or cancelled drops.

### Color Tokens Reference Table

| Category | Token | Hex Value | Usage / Description |
| :--- | :--- | :--- | :--- |
| **Primary** | `primary` | `#006194` | Primary brand color, CTA buttons, active state highlights |
| | `on-primary` | `#ffffff` | Content placed over primary color |
| | `primary-container` | `#007bb9` | High-emphasis primary containers and cards |
| | `on-primary-container`| `#fdfcff` | Text/icons on primary container |
| | `primary-fixed` | `#cce5ff` | Static light-variant accent for accents & chips |
| | `primary-fixed-dim` | `#93ccff` | Subdued fixed primary tone |
| | `on-primary-fixed` | `#001d31` | High contrast text over primary-fixed |
| | `on-primary-fixed-variant` | `#004b73` | Medium contrast text over primary-fixed |
| **Secondary** | `secondary` | `#006399` | Navigation elements, headers, secondary actions |
| | `on-secondary` | `#ffffff` | Content placed over secondary color |
| | `secondary-container`| `#7bc2ff` | Secondary badges and accent pills |
| | `on-secondary-container`| `#004f7b` | Text/icons on secondary container |
| | `secondary-fixed` | `#cde5ff` | Static light secondary container |
| | `secondary-fixed-dim`| `#94ccff` | Subdued secondary container accent |
| | `on-secondary-fixed` | `#001d32` | Dark text on secondary fixed |
| | `on-secondary-fixed-variant` | `#004b74` | Mid-dark text on secondary fixed |
| **Tertiary** | `tertiary` | `#00685f` | Mint/teal for completed orders, hygiene indicators |
| | `on-tertiary` | `#ffffff` | Content over tertiary color |
| | `tertiary-container`| `#008378` | Tertiary indicator container |
| | `on-tertiary-container`| `#f4fffc` | Text/icons on tertiary container |
| | `tertiary-fixed` | `#89f5e7` | Bright mint chip background |
| | `tertiary-fixed-dim`| `#6bd8cb` | Subdued mint chip background |
| | `on-tertiary-fixed` | `#00201d` | Deep green text on tertiary chips |
| | `on-tertiary-fixed-variant`| `#005049` | Mid-dark green text on tertiary chips |
| **Surface & Neutral** | `surface` | `#faf8ff` | Default page background |
| | `surface-dim` | `#d2d9f4` | Dimmed surface background |
| | `surface-bright` | `#faf8ff` | Bright surface variant |
| | `surface-container-lowest` | `#ffffff` | Base card and tile background (pure white) |
| | `surface-container-low` | `#f2f3ff` | Subtle grouped section container |
| | `surface-container` | `#eaedff` | General container background |
| | `surface-container-high` | `#e2e7ff` | Elevated container backdrop |
| | `surface-container-highest`| `#dae2fd`| Highest elevated container surface |
| | `on-surface` | `#131b2e` | Primary body text and icons |
| | `on-surface-variant`| `#3f4850` | Secondary / muted text and icons |
| | `surface-variant` | `#dae2fd` | Variant background for interactive cards |
| | `outline` | `#707881` | Border outline for input fields and cards |
| | `outline-variant` | `#bfc7d2` | Divider lines and subtle dividers |
| | `surface-tint` | `#006398` | Tonal elevation tint overlay |
| **Inverse** | `inverse-surface` | `#283044` | Dark mode base surface / dark toast notifications |
| | `inverse-on-surface`| `#eef0ff` | Text on inverse surface |
| | `inverse-primary` | `#93ccff` | Primary elements on dark surfaces |
| **Status & Error** | `error` | `#ba1a1a` | Form error alerts, machine malfunction alerts |
| | `on-error` | `#ffffff` | Text on error color |
| | `error-container` | `#ffdad6` | Alert banner background |
| | `on-error-container`| `#93000a` | Alert banner text |

### Color Modes
- **Light Mode (Default)**: Bright airy backgrounds (`#FAF8FF`, `#FFFFFF`) with crisp oceanic slate borders (`#E2E8F0`, `#BFC7D2`) and watery blue tints for containers.
- **Dark Mode**: Deep midnight slate surfaces (`#0B1120`, `#0F172A`, `#283044`) with glowing neon-water boundaries (`#1E293B`) to maintain crisp readability without harsh glare in dim laundry shops.

---

## Typography

The type system is powered by **Plus Jakarta Sans**, chosen for its friendly geometric curves, crisp aperture openings, and high legibility on mobile screens under direct tropical sunlight.

### Typography Scale

| Token | Font Family | Size | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display` | Plus Jakarta Sans | 40px | 800 | 48px | -0.02em |
| `display-mobile` | Plus Jakarta Sans | 32px | 800 | 38px | -0.02em |
| `headline-lg` | Plus Jakarta Sans | 30px | 700 | 36px | -0.015em |
| `headline-lg-mobile` | Plus Jakarta Sans | 24px | 700 | 30px | -0.01em |
| `headline-md` | Plus Jakarta Sans | 20px | 600 | 26px | -0.01em |
| `headline-sm` | Plus Jakarta Sans | 16px | 600 | 22px | normal |
| `body-lg` | Plus Jakarta Sans | 16px | 400 | 24px | normal |
| `body-md` | Plus Jakarta Sans | 14px | 400 | 20px | normal |
| `body-sm` | Plus Jakarta Sans | 12px | 400 | 16px | normal |
| `currency-display` | Plus Jakarta Sans | 28px | 700 | 32px | -0.01em |
| `currency-body` | Plus Jakarta Sans | 15px | 600 | 20px | normal |
| `label-lg` | Plus Jakarta Sans | 14px | 600 | 18px | 0.01em |
| `label-md` | Plus Jakarta Sans | 12px | 600 | 16px | 0.02em |
| `label-sm` | Plus Jakarta Sans | 10px | 700 | 14px | 0.04em |

### Currency Formatting Rules
- Philippine Peso amounts must always explicitly display the standard currency symbol: `₱`.
- Use tabular figures where numbers appear in lists, invoices, or real-time weight meters to prevent layout shift.
- In financial cards and receipts, pair `currency-display` with a smaller, un-weighted `₱` glyph baseline-aligned with the figures (e.g., `₱ 340.00`).

---

## Layout & Spacing

### Spacing Scale

| Token | Rem | Pixels | Usage |
| :--- | :--- | :--- | :--- |
| `space-xs` | `0.25rem` | 4px | Micro padding, tight icon offsets |
| `space-sm` | `0.5rem` | 8px | Button inline gaps, pill padding, tag spacing |
| `space-md` | `1rem` | 16px | Standard card padding, input gaps, stack margins |
| `space-lg` | `1.5rem` | 24px | Section separation, container paddings |
| `space-xl` | `2rem` | 32px | Major component blocks, modal margins |

### Grid, Margins & Gutters

| Viewport | Columns | Screen Margin | Grid Gutter | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile Handheld (360px - 599px)** | 4 | `1rem` (`16px`) | `1rem` (`16px`) | Core operations (drop-off tracking, basket weight entry, voucher scan) stack vertically into full-width touch cards |
| **Tablet / In-Store POS (600px - 1023px)** | 8 | `2rem` (`32px`) | `1.25rem` (`20px`) | Two-pane split: Machine bay status on the left (5 cols), order ledger & checkout on the right (3 cols) |
| **Desktop Portal (1024px+)** | 12 | `3rem` (`48px`) | `1.5rem` (`24px`) | Max-width constrained to `1280px` centered. Multi-column oversight (Intake, Wash, Dry, Fold, For Pickup) |

---

## Rounded Corners (Borders & Shapes)

The system uses `roundness: 2` (base border radius of `0.5rem` / `8px`), offering a balanced, welcoming geometry that softens industrial laundry hardware into a friendly everyday utility.

| Token | Value | Component Mapping |
| :--- | :--- | :--- |
| `sm` | `0.25rem` (4px) | Badges, small tags, sub-indicators |
| `DEFAULT` | `0.5rem` (8px) | Base rounded element |
| `md` | `0.75rem` (12px) | Buttons, text inputs, segmented pickers |
| `lg` | `1rem` (16px) | Cards, order load tiles, dialog modals |
| `xl` | `1.5rem` (24px) | Bottom sheets, oversized hero banners |
| `full` | `9999px` | Status pills, price badges, timer chips |
| *Drum Rings* | `50%` | Washer / Dryer status rings symbolizing spinning drums |

---

## Elevation & Depth

Visual hierarchy uses **Aqueous Tonal Layering** coupled with diffused, clean blue-tinted ambient shadows. Rather than harsh black drop shadows, elevation captures the purity of layered water and glass surfaces.

### Surface Tiers

- **Tier 0 (Canvas Base)**:
  - Light: `#FAF8FF` / `#F8FAFC`
  - Dark: `#0B1120`
  - Non-elevated, clean backdrop.
- **Tier 1 (Resting Mobile Cards)**:
  - Light: `#FFFFFF`
  - Dark: `#151F32`
  - Boundary outline: `1px solid #E2E8F0` / `#1E293B`
  - Shadow: `0px 4px 16px -2px rgba(2, 132, 199, 0.06)`
- **Tier 2 (Interactive Floating Modules / Active Machine Cylinders)**:
  - Elevated during active wash runs or card drag-reorder.
  - Shadow: `0px 10px 24px -4px rgba(2, 132, 199, 0.12), 0px 2px 6px -1px rgba(15, 23, 42, 0.04)`
- **Tier 3 (Modals, GCash Checkout Drawers & Quick Actions)**:
  - Raised backdrop sheet.
  - Shadow: `0px 20px 40px -8px rgba(15, 23, 42, 0.22)`
  - Frosted water backdrop blur: `backdrop-filter: blur(12px)` over `rgba(15, 23, 42, 0.4)`

---

## Key Components

### Buttons
- **Primary Button**: Solid sky blue (`#0284C7` / `#006194`) with white text and an ultra-subtle inset top highlight (`inset 0 1px 0 rgba(255,255,255,0.2)`). Height: `48px` on mobile for thumb reach. Hover: `#0369A1`.
- **Secondary Button**: Crisp water tint (`#E0F2FE` / `#CCE5FF`) with sky blue label (`#0369A1` / `#006194`). Dark Mode: `#1E293B` background with `#38BDF8` label.
- **Critical Action Button**: Mint green solid (`#0D9488` / `#00685F`) for marking loads "Completed & Packed".

### Status Chips & Pills
- **Wash Cycle Running**: Pill with animated pulse icon, pale blue fill (`#F0F9FF`), sky blue border (`#BAE6FD`), text `#0284C7`.
- **Clean / Ready for Pickup**: Mint teal fill (`#F0FDFA`), emerald border (`#99F6E4`), text `#0F766E`.
- **Pay-Later Balance Warning**: Amber fill (`#FFFBEB`), amber border (`#FDE68A`), text `#B45309`, leading with an alert symbol and the formatted peso amount (e.g., `₱ 180.00 Unpaid`).
- **Payment Method Badges**:
  - *GCash*: Royal blue pill (`#005CE6`), bold white text with the GCash mark.
  - *Counter Cash*: Mint-slate pill (`#DCFCE7`), text `#15803D`.

### Cards & Service Tiles
- **Active Drum Monitor Card**: Displays front-load drum graphic with animated radial water level, current spin stage (Wash / Rinse / Spin / Dry), customer name, ticket ID, and dynamic remaining time counter.
- **Weigh-In Card**: Interactive kilo-scale card featuring large weight numbers, service type tabs (Wash-Dry-Fold vs. Blankets/Curtains), and instantaneous price recalculation in `₱`.

### Lists & Activity Rows
- **Order Tracking Item**: Left-aligned round status icon, order ID with date, kilogram weight badge, and a right-aligned currency block with high-contrast settlement status. Divided by hairline watery dividers (`1px solid #F1F5F9`).

### Input Fields & Controls
- **Standard Input**: Clean white container, `1.5px` border in `#CBD5E1`. On focus: dynamic glow with `#0284C7` border and `0 0 0 3px rgba(2, 132, 199, 0.15)`.
- **Peso Input Modifier**: Prefix block containing static `₱` symbol tinted in oceanic slate (`#64748B`), visually integrated into the left edge of the input.
- **Checkboxes & Radios**: `20px` round-cornered indicators with high-contrast checkmarks; filled in sky blue `#0284C7` when checked.
