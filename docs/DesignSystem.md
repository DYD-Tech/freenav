# Design System

## Philosophy

Inspired by **Apple**, **Linear**, and **Notion** — clean, focused, and fast.

## Colors

| Token      | Light          | Dark           |
|------------|----------------|----------------|
| primary    | `#8b5cf6`      | `#a78bfa`      |
| surface    | `#ffffff`      | `#1a1a1a`      |
| background | `#f5f5f5`      | `#111111`      |
| border     | `#e5e5e5`      | `#333333`      |
| muted      | `#f0f0f0`      | `#222222`      |
| foreground | `#1a1a1a`      | `#e5e5e5`      |

## Typography

- **Font family**: Inter (system-ui fallback)
- **Scale**:
  - H1: 2.5rem / 2.25rem (md)
  - H2: 1.75rem / 1.5rem (md)
  - H3: 1.35rem / 1.25rem (md)
  - Body: 1rem
  - Caption: 0.875rem

## Spacing

8-point grid system.

## Components

### Navbar
- Fixed top, semi-transparent backdrop
- Theme toggle (dark/light)
- Search icon link

### ResourceCard
- Logo (left)
- Title + description
- Category badge + tags
- Hover shadow

### CategoryCard
- Icon + name
- Resource count
- Hover border-primary

### Button
- Primary: filled, rounded-lg
- Secondary: outlined, rounded-lg

### Footer
- Links row (About, Categories, Submit, GitHub)
- Copyright

## Responsive Breakpoints

| Name  | Min Width |
|-------|-----------|
| sm    | 640px     |
| md    | 768px     |
| lg    | 1024px    |
| xl    | 1280px    |
| 2xl   | 1536px    |