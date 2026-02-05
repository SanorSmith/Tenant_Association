# Design System Documentation
Hyresgästföreningen Lokalt - Tenant Association App

## Overview
This design system is based on [Hyresgästföreningen Lokalt](https://hyresgaestfoereningen-lokalt.vercel.app/) and implemented using Vue 3 + Tailwind CSS.

## Colors

### Primary Palette
- **Primary Blue**: `#0066B3` - Main brand color for primary buttons, links, and key UI elements
- **Accent Red**: `#E30613` - Emphasis, important actions, branding accents
- **Navy**: `#1A1A40` - Dark backgrounds, footer, navbar text

### Semantic Colors

#### Text Colors
| Token | Value | Usage |
|-------|-------|-------|
| `text-primary` | `#0f172a` | Primary headings and body text |
| `text-secondary` | `#1f2937` | Secondary text |
| `text-muted` | `#4b5563` | Tertiary/muted text, descriptions |
| `text-light` | `#9ca3af` | Subtle text, placeholders |
| `text-inverse` | `#ffffff` | Text on dark backgrounds |

#### Background Colors
| Token | Value | Usage |
|-------|-------|-------|
| `background` | `#fafbfc` | Page background (light gray-blue) |
| `background-secondary` | `#f8fafc` | Section backgrounds, card footers |
| `background-tertiary` | `#f1f5f9` | Hover states, subtle highlights |
| `card` | `#ffffff` | Card backgrounds |

#### Border Colors
| Token | Value | Usage |
|-------|-------|-------|
| `border` | `#e5e7eb` | Default borders |
| `border-light` | `#f3f4f6` | Subtle borders |
| `border-strong` | `#d1d5db` | Emphasized borders |

#### Status Colors
| Token | Value | Usage |
|-------|-------|-------|
| `success` | `#10b981` | Success states, confirmations |
| `error` | `#ef4444` | Error states, validation |
| `warning` | `#f59e0b` | Warning states, cautions |
| `info` | `#3b82f6` | Info states, notifications |

## Typography

### Font Family
- **Primary**: `Inter, system-ui, -apple-system, sans-serif`
- **Google Fonts**: https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap

### Type Scale
| Size | Value | Line Height | Usage |
|------|-------|-------------|-------|
| `text-xs` | 12px / 0.75rem | 1rem | Captions, badges |
| `text-sm` | 14px / 0.875rem | 1.25rem | Small text, labels |
| `text-base` | 16px / 1rem | 1.5rem | Body text |
| `text-lg` | 18px / 1.125rem | 1.75rem | Large body |
| `text-xl` | 20px / 1.25rem | 1.75rem | Small headings |
| `text-2xl` | 24px / 1.5rem | 2rem | H5 |
| `text-3xl` | 30px / 1.875rem | 2.25rem | H4 |
| `text-4xl` | 36px / 2.25rem | 2.5rem | H3 |

### Font Weights
| Weight | Value | Usage |
|--------|-------|-------|
| `font-light` | 300 | Large headings |
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Navigation, buttons |
| `font-semibold` | 600 | Subheadings |
| `font-bold` | 700 | Headings, emphasis |

### Letter Spacing
- Body text: `-0.02em` (slight negative tracking for modern feel)

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `spacing-1` | 4px | xs |
| `spacing-2` | 8px | sm |
| `spacing-4` | 16px | md (base) |
| `spacing-6` | 24px | lg |
| `spacing-8` | 32px | xl |
| `spacing-12` | 48px | 2xl |
| `spacing-16` | 64px | 3xl |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-none` | 0 | Sharp corners |
| `rounded-sm` | 4px | Subtle rounding |
| `rounded` | 6px | Default |
| `rounded-lg` | 8px | Buttons, cards |
| `rounded-xl` | 12px | Large elements |
| `rounded-full` | 9999px | Circles, pills |

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Subtle elevation |
| `shadow` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` | Default |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Cards, modals |
| `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Elevated elements |

## Transitions

### Timing
- Default: `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`
- Easing function: `cubic-bezier(0.4, 0, 0.2, 1)` (Tailwind: `ease-smooth`)

### Common Transitions
| Type | CSS |
|------|-----|
| Colors | `color 0.2s ease-smooth` |
| Transform | `transform 0.2s ease-smooth` |
| Opacity | `opacity 0.2s ease-smooth` |
| All | `all 0.2s ease-smooth` |

## Components

### Button

#### Variants
```vue
<BaseButton variant="primary">Primary</BaseButton>
<BaseButton variant="secondary">Secondary</BaseButton>
<BaseButton variant="accent">Accent</BaseButton>
<BaseButton variant="outline">Outline</BaseButton>
```

#### Sizes
```vue
<BaseButton size="sm">Small</BaseButton>
<BaseButton size="md">Medium</BaseButton>
<BaseButton size="lg">Large</BaseButton>
```

#### States
- **Default**: Base styling
- **Hover**: Darker background, shadow increase
- **Focus**: Ring outline with offset
- **Disabled**: Reduced opacity, no pointer events
- **Loading**: Spinner icon, disabled state

### Card

```vue
<BaseCard title="Card Title">
  Card content goes here
</BaseCard>
```

#### Props
- `title`: Card header title
- `hover`: Enable hover effects
- `padding`: `'none' | 'sm' | 'md' | 'lg'`
- `shadow`: `'none' | 'sm' | 'md' | 'lg'`

### Input

```vue
<BaseInput
  v-model="value"
  label="Email"
  placeholder="Enter email"
  hint="We'll never share your email"
/>
```

#### States
- **Default**: Border with subtle background
- **Focus**: Primary border, ring shadow
- **Error**: Error border, error message, error icon
- **Disabled**: Reduced opacity, no interaction

## Layout

### Container
- **Max Width**: 1280px (`max-w-7xl`)
- **Padding**: 
  - Mobile: 16px (`px-4`)
  - Tablet: 24px (`sm:px-6`)
  - Desktop: 32px (`lg:px-8`)

### Grid
- Use Tailwind's grid system
- Common patterns:
  - `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` (Footer)
  - `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (Cards)

## Custom Scrollbar

```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
```

## Animations

### Fade In Up
```css
animation: fade-in-up 0.4s ease-out forwards;
```
Use for: Content reveal on scroll, modal appearance

### Usage
```vue
<div class="animate-fade-in-up">
  Content fades in and up
</div>
```

## Best Practices

### Do's
- Use semantic color tokens (`text-primary`, `bg-background`)
- Follow spacing scale (multiples of 4px)
- Use transition utilities for interactive elements
- Maintain consistent border radius within components
- Apply `ease-smooth` for all transitions

### Don'ts
- Don't use arbitrary color values
- Don't create one-off component styles
- Don't skip accessibility (contrast, focus states)
- Don't use hardcoded spacing values
- Don't mix different transition timings

## Tailwind Config

All design tokens are configured in `tailwind.config.js`:

```javascript
// Colors
colors: {
  primary: { DEFAULT: '#0066B3', 50: '#E6F2FA', ... },
  accent: { DEFAULT: '#E30613', ... },
  text: { primary: '#0f172a', secondary: '#1f2937', ... },
  background: { DEFAULT: '#fafbfc', ... },
  border: { DEFAULT: '#e5e7eb', ... },
}

// Typography
fontFamily: {
  sans: ['Inter', 'system-ui', ...],
}

// Animations
animation: {
  'fade-in-up': 'fade-in-up 0.4s ease-out forwards',
}
```

## Migration Notes

### From Old System
- `text-navy` → `text-text-primary`
- `text-gray-300` → `text-text-light`
- `bg-white` → `bg-card` (for cards)
- `bg-gray-50` → `bg-background-secondary`
- `border-gray-200` → `border-border`
- `hover:bg-gray-100` → `hover:bg-background-tertiary`

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 5+)

## Accessibility
- WCAG AA compliant color contrast
- Keyboard navigation support
- Focus indicators on all interactive elements
- Semantic HTML structure
- Screen reader friendly
