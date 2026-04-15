# Design Brief

## Direction

Data-Driven Intelligence — A dark, modern analytics interface for institutional risk assessment and intervention management.

## Tone

Refined minimalism with confidence. Deep charcoal backgrounds (0.14L, cool 260H) with sophisticated teal primary accent. No gradients, no decoration—typography and surface hierarchy communicate data authority.

## Differentiation

Risk levels use distinct, high-chroma OKLCH colors for immediate recognition: red (0.55L 0.22C 25H) for critical, orange (0.65L 0.18C 55H) for high, yellow (0.68L 0.15C 85H) for medium, green (0.62L 0.16C 145H) for low. This creates a universally understood visual language for decision-makers without explanation.

## Color Palette

| Token      | OKLCH              | Role                                  |
| ---------- | ------------------ | ------------------------------------- |
| background | 0.14 0.01 260      | Deep charcoal, authoritative backdrop |
| foreground | 0.92 0.01 260      | Off-white text, high contrast         |
| card       | 0.19 0.012 260     | Elevated surface for data/sections    |
| primary    | 0.65 0.18 190      | Teal CTA, tech-forward accent        |
| accent     | 0.72 0.12 70       | Warm amber for secondary actions      |
| muted      | 0.22 0.02 260      | Supporting UI, disabled states        |
| destructive | 0.55 0.22 25      | Risk critical (red)                   |
| chart-2    | 0.65 0.18 55       | Risk high (orange)                    |
| chart-3    | 0.68 0.15 85       | Risk medium (yellow)                  |
| chart-4    | 0.62 0.16 145      | Risk low (green)                      |

## Typography

- Display: Space Grotesk — clean, geometric, confident for headers and data labels
- Body: DM Sans — precise, neutral, excellent for data-heavy UI and form fields
- Scale: hero `text-5xl md:text-6xl font-bold`, h2 `text-2xl md:text-3xl font-semibold`, label `text-xs font-semibold uppercase tracking-widest`, body `text-sm md:text-base`

## Elevation & Depth

Single-lift card system: background (0.14L) → card (0.19L), no shadows beyond transparent layers. Depth created through lightness contrast and subtle borders, not box-shadow—maintains minimalism while preserving information hierarchy.

## Structural Zones

| Zone    | Background        | Border                    | Notes                                          |
| ------- | ----------------- | ------------------------- | ---------------------------------------------- |
| Header  | card (0.19L)      | border bottom (0.28L)     | Logo, title, user menu. Sticky on scroll.      |
| Sidebar | sidebar (0.18L)   | sidebar-border (0.28L)    | Navigation, student list, filter controls.    |
| Content | background (0.14L) | —                         | Main data area. Alternating card backgrounds. |
| Footer  | background (0.14L) | border top (0.28L)        | Attribution, minimal.                          |

## Spacing & Rhythm

Compact grid: 8px base unit. Section gaps `gap-6` (24px), card padding `p-4 md:p-6`, micro-spacing `gap-2`. Dense information layout balances whitespace with data clarity. Sidebar narrow, content wide.

## Component Patterns

- Buttons: primary teal (`bg-primary`) with dark text, secondary muted with border, no border-radius (sharp edges `rounded-sm`)
- Cards: `bg-card` with `border border-border`, minimal lift, no shadow, `rounded-md` (6px)
- Badges: risk level colors from palette, `rounded-full`, compact `px-2 py-1 text-xs`
- Tables: zebra striping via alternating `bg-muted/30` rows, minimal borders

## Motion

- Entrance: fade-in on page load, no delay choreography
- Hover: 0.2s transition on card lift (subtle scale or opacity), button text color shift
- Decorative: none—data clarity takes priority

## Constraints

- No gradients, full-color blocks only
- No box-shadow beyond subtle transparent overlays
- Typography hierarchy via size and weight, not color variation
- Risk colors must always use chart color tokens; never hardcode red/orange/yellow/green
- Responsive mobile-first: sidebar collapses below md, content fills width

## Signature Detail

Risk level color coding (red/orange/yellow/green via OKLCH high-chroma values) creates instant, accessible pattern recognition for institutional users without requiring color-blind accommodation text—the system is designed for clarity first.

