# The DS — A CSS Design System

A lightweight, modern CSS design system built on CSS custom properties, cascade layers, and contemporary layout primitives. No JavaScript required. No build step. Just CSS.

## Features

- **Zero dependencies** — pure CSS, works with any HTML framework or none at all
- **CSS cascade layers** — predictable specificity with a clear `reset → setup → theme → base → component → page → utility` layer stack
- **Fully themeable** — all design decisions are exposed as CSS custom properties; override what you need
- **Dark mode support** — manual (`.ds-darkmode`), light (`.ds-lightmode`), and automatic (`prefers-color-scheme`) modes
- **Modern color system** — uses `oklch` and relative color syntax for automatic tint/shade generation and contrast calculation
- **Container query-based grid** — responsive layout that reacts to its container, not just the viewport
- **Google Fonts included** — Alegreya Sans (headings) and Quicksand (body) loaded via `@import`

## Installation

Copy `dist/theds.css` into your project and link it in your HTML:

```html
<link rel="stylesheet" href="theds.css">
```

Or link directly from the repository:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/muze-nl/the-ds@main/dist/theds.css">
```

## Layer Architecture

The design system uses `@layer` to give you guaranteed control over specificity:

```
reset → setup → theme → base → component → page → utility
```

- **reset** — normalises browser defaults (margins, padding, box-sizing)
- **setup** — raw design values (colour palette, font names)
- **theme** — semantic tokens derived from raw values
- **base** — element-level styles (typography, links, form inputs)
- **component** — reusable UI patterns (buttons, dialogs, badges, etc.)
- **page** — layout-level styles (your app-specific overrides go here)
- **utility** — single-purpose helper classes (spacing, alignment, colour)

Your own styles in an unlayered stylesheet automatically win over everything, so adding the design system never blocks you from customising it.

## Tokens & Custom Properties

All design decisions are exposed as CSS custom properties. The main ones:

### Colours

| Token | Description |
|---|---|
| `--ds-primary` | Primary brand colour (oklch green) |
| `--ds-support` | Supporting/accent colour (oklch teal) |
| `--ds-grey-0` … `--ds-grey-100` | Grey scale, 12 steps |
| `--ds-color-error` | Error state colour |
| `--ds-color-warning` | Warning state colour |
| `--ds-color-info` | Info state colour |

Tints and shades are generated automatically:

```css
--ds-primary-10   /* lighter tint */
--ds-primary-90   /* darker shade */
--ds-primary-high /* high-contrast variant (adapts to light/dark mode) */
--ds-primary-low  /* low-contrast variant */
```

Text contrast is computed automatically from the background colour using relative colour syntax — no manual contrast tokens needed.

### Typography

| Token | Default |
|---|---|
| `--ds-font-heading` | `'Alegreya Sans', sans-serif` |
| `--ds-font-body` | `'Quicksand', Helvetica, sans-serif` |
| `--ds-font-size` | `1.25rem` |
| `--ds-font-weight` | `300` |
| `--ds-line-height` | `1.6rem` |
| `--ds-heading-multiplier` | `1.272` (major third scale) |

Heading sizes (`h1`–`h3`) are derived automatically from `--ds-heading-multiplier`, giving a consistent typographic scale.

### Spacing

All spacing is derived from `--ds-line-height` (the base `--ds-space` unit):

```css
--ds-space-d4   /* ÷ 4 */
--ds-space-d3   /* ÷ 3 */
--ds-space-d2   /* ÷ 2 */
--ds-space       /* 1× (= line-height) */
--ds-space-x2   /* 2× */
--ds-space-x3   /* 3× */
--ds-space-x4   /* 4× */
```

### Shadows & Glows

Four shadow sizes (`--ds-shadow-tiny/small/medium/large`) and three glow sizes (`--ds-glow-small/medium/large`). Glows are used automatically in dark mode contexts.

## Dark Mode

Three dark mode strategies are supported:

```html
<!-- Explicit dark mode on a container -->
<div class="ds-darkmode"> … </div>

<!-- Explicit light mode on a container -->
<div class="ds-lightmode"> … </div>

<!-- Follow the OS preference -->
<div class="ds-darkmode-auto"> … </div>
```

Shadows automatically switch to glows in dark mode, and colour tokens (high/low, link colours) invert accordingly.

## Grid

The grid uses container queries, so it responds to the size of the element it's in rather than the whole viewport.

```html
<!-- Auto-fitting flexible grid -->
<div class="ds-grid"> … </div>

<!-- Fixed column grid (2 → 4 → 6 → 12 columns as container grows) -->
<div class="ds-grid-fixed ds-grid-12"> … </div>
```

Column spans:

```html
<div class="ds-grid-span-2"> … </div>
<div class="ds-grid-span-6"> … </div>
<div class="ds-grid-span-all"> … </div>  <!-- full width -->
```

Row spans work the same way with `.ds-grid-row-2` through `.ds-grid-row-10`.

The current breakpoint is also available as a token for use in your own styles:

```css
/* --ds-screen-size: small | tablet | medium | large | extra-large */
```

## Components

### Buttons

```html
<button class="ds-button">Default</button>
<button class="ds-button ds-button-primary">Primary</button>
<button class="ds-button ds-button-support">Support</button>
<button class="ds-button" disabled>Disabled</button>

<!-- Works on links too -->
<a href="#" class="ds-button ds-button-primary">Link button</a>

<!-- Button group -->
<div class="ds-button-group">
  <button class="ds-button">One</button>
  <button class="ds-button">Two</button>
</div>
```

### Forms

```html
<div class="ds-form-group">
  <label for="name">Name</label>
  <input type="text" id="name">
  <span class="ds-form-help">Optional help text</span>
</div>

<div class="ds-form-group">
  <label for="choice">Choice</label>
  <select id="choice">
    <option>Option A</option>
    <option>Option B</option>
  </select>
</div>

<textarea></textarea>
```

All inputs inherit the page font and colour, and use `outline` instead of `border` for outline control without affecting layout.

### Dialog

```html
<dialog class="ds-dialog">
  <div class="ds-dialog-header"> … </div>
  <div class="ds-dialog-content"> … </div>
  <div class="ds-dialog-footer"> … </div>
</dialog>
```

### Dropdown

Uses the CSS Popover API with a fallback to checkbox state for older browsers.

```html
<div class="ds-dropdown" style="--ds-dropdown-anchor: --my-menu">
  <button class="ds-button ds-dropdown-button" popovertarget="my-menu">Menu</button>
  <nav id="my-menu" class="ds-dropdown-nav ds-dropdown-left" popover>
    <ul class="ds-dropdown-list">
      <li class="ds-dropdown-item"><a href="#">Item one</a></li>
      <li class="ds-dropdown-item"><a href="#">Item two</a></li>
    </ul>
  </nav>
</div>
```

Position variants: `.ds-dropdown-left`, `.ds-dropdown-right`, `.ds-dropdown-center`, `.ds-dropdown-up`.

### Tabs

```html
<ul class="ds-tabs ds-tabs-border-color">
  <li><a class="ds-tabs-tab ds-tabs-tab-selected" href="#">Tab one</a></li>
  <li><a class="ds-tabs-tab" href="#">Tab two</a></li>
</ul>
```

Variants: `.ds-tabs-border`, `.ds-tabs-border-bottom`, `.ds-tabs-border-color`, `.ds-tabs-vertical`.

### Navbar

```html
<nav class="ds-navbar">
  <div class="ds-navbar-left">Logo</div>
  <ul class="ds-navbar-nav">
    <li><a href="#">Link</a></li>
  </ul>
  <div class="ds-navbar-right">
    <button class="ds-button ds-button-primary">Sign in</button>
  </div>
</nav>
```

### Alert

```html
<div class="ds-alert ds-alert-error"> … </div>
<div class="ds-alert ds-alert-warning"> … </div>
<div class="ds-alert ds-alert-info"> … </div>
```

### Toast / Notification

```html
<ul class="ds-toasts">
  <li class="ds-toast ds-toast-info ds-toast-autohide" data-state="new">
    Something happened.
  </li>
</ul>
```

Set `data-state="shown"` to trigger the auto-hide animation.

### Badge

```html
<span class="ds-badge">Default</span>
<span class="ds-badge ds-badge-inverted">Inverted</span>

<!-- Label + value -->
<span class="ds-badge">
  <label>Status</label>
  Active
</span>

<!-- Tag shape -->
<span class="ds-badge ds-badge-tag">Tag</span>
```

### Box

A contained, rounded card surface:

```html
<div class="ds-box ds-space-inside"> … </div>
```

### Sticky positioning

```html
<header class="ds-sticky-top"> … </header>
<footer class="ds-sticky-bottom"> … </footer>
```

### Panels (list/detail layout)

A mobile-first list → detail pattern that becomes a side-by-side grid on wider screens:

```html
<div class="ds-panels-container ds-panels-list-details">
  <div class="ds-panels-panes">
    <div class="ds-panels-pane">List pane</div>
    <div class="ds-panels-pane">Detail pane</div>
  </div>
</div>
```

## Utility Classes

### Colour & Background

```html
<div class="ds-bg-primary"> … </div>
<div class="ds-bg-primary-gradient"> … </div>
<div class="ds-bg-support"> … </div>
<div class="ds-bg-grey-low"> … </div>
<div class="ds-bg-grey-medium"> … </div>
<div class="ds-bg-grey-high"> … </div>
<span class="ds-color-primary">Primary text</span>
<span class="ds-color-support">Support text</span>
```

Background classes automatically compute a contrasting text colour.

### Spacing

```html
<div class="ds-space"> … </div>           <!-- margin all sides -->
<div class="ds-space-vertical"> … </div>  <!-- margin top/bottom -->
<div class="ds-space-inside"> … </div>    <!-- padding all sides -->
<div class="ds-no-space"> … </div>        <!-- remove margin -->
<div class="ds-space-contain"> … </div>   <!-- contain child margins -->
```

### Alignment

```html
<div class="ds-center"> … </div>          <!-- horizontally centred -->
<div class="ds-center-middle"> … </div>   <!-- centred both axes (flex) -->
<div class="ds-align-right"> … </div>     <!-- float right -->
```

### Shadows & Glow

```html
<div class="ds-shadow-small"> … </div>
<div class="ds-shadow-medium"> … </div>
<div class="ds-shadow-large"> … </div>
<div class="ds-glow"> … </div>
<div class="ds-glow-small"> … </div>
<div class="ds-glow-large"> … </div>
```

Hover and focus variants: `.ds-glow-hover`, `.ds-glow-focus`, `.ds-glow-small-hover`, etc.

## Customising

Override any token on `:root` (or a scoped selector) after importing the stylesheet:

```css
:root {
  --ds-primary: oklch(0.65 0.18 30);  /* swap to an orange brand colour */
  --ds-font-body: 'Inter', sans-serif;
  --ds-font-size: 1rem;
  --ds-box-radius: 8px;
}
```

Because all tokens cascade normally, you can also scope overrides to a specific section of your page:

```css
.my-section {
  --ds-primary: oklch(0.55 0.2 280);
}
```

## Icons

The system includes a base class for inline SVG icons:

```html
<svg class="ds-icon ds-icon-feather"> … </svg>
```

`.ds-icon-feather` sets up stroke-based rendering compatible with the Feather icon set. Icons scale with the surrounding text via `--ds-icon-height` (defaults to `--ds-line-height`).

## Browser Support

The design system uses several modern CSS features. All are well-supported in current browsers:

| Feature | Notes |
|---|---|
| CSS cascade layers (`@layer`) | Chrome 99+, Firefox 97+, Safari 15.4+ |
| CSS custom properties | All modern browsers |
| `oklch` colour | Chrome 111+, Firefox 113+, Safari 15.4+ |
| Relative colour syntax | Chrome 119+, Firefox 128+, Safari 16.4+ |
| Container queries | Chrome 105+, Firefox 110+, Safari 16+ |
| CSS Popover API | Chrome 114+, Firefox 125+, Safari 17+ |
| `@position-try` (dropdown) | Chrome 125+ (fallback included for others) |

Older browsers that don't support a given feature gracefully degrade — the fallback paths are included in the stylesheet.

## Licence

See [LICENSE](LICENSE) in the repository root.