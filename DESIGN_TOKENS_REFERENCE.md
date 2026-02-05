# Design System - Hyresgästföreningen Lokalt
Extracted from: https://hyresgaestfoereningen-lokalt.vercel.app/

## Colors

### Primary Colors
- Primary Blue: #0066B3 (used for: primary buttons, links, interactive elements)
- Primary Hover: #00528F (darker shade for hover states)
- Primary Light: #E6F2FA (light background tints)

### Secondary/Accent Colors
- Accent Red: #E30613 (used for: emphasis, important actions, branding accents)
- Accent Hover: #B6050F (darker shade for hover states)
- Accent Light: #FCE7E8 (light background tints)

### Neutral Colors
- Navy: #1A1A40 (used for: dark backgrounds, footer, navbar text)
- Navy Light: #474787 (lighter navy for secondary elements)

### Text Colors
- Heading: #0f172a (slate-900 - primary text)
- Body: #1f2937 (gray-800 - secondary text)
- Muted: #4b5563 (gray-600 - tertiary/muted text)
- Light: #9ca3af (gray-400 - subtle text)
- Inverse: #ffffff (white - text on dark backgrounds)

### Background Colors
- Page Background: #fafbfc (very light gray-blue)
- Card Background: #ffffff (white)
- Section Background (Light): #f8fafc (slate-50)
- Section Background (Dark): #1A1A40 (navy)
- Hover Background: #f1f5f9 (slate-100)

### Border Colors
- Default: #e5e7eb (gray-200)
- Light: #f3f4f6 (gray-100)
- Strong: #d1d5db (gray-300)
- Input Focus: #0066B3 (primary)

### Status Colors
- Success: #10b981 (emerald-500)
- Error: #ef4444 (red-500)
- Warning: #f59e0b (amber-500)
- Info: #3b82f6 (blue-500)

## Typography

### Font Families
- Primary (Headings & Body): 'Inter', system-ui, -apple-system, sans-serif
- Google Fonts URL: https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap

### Font Sizes
- xs: 12px / 0.75rem (line-height: 1rem)
- sm: 14px / 0.875rem (line-height: 1.25rem)
- base: 16px / 1rem (line-height: 1.5rem)
- lg: 18px / 1.125rem (line-height: 1.75rem)
- xl: 20px / 1.25rem (line-height: 1.75rem)
- 2xl: 24px / 1.5rem (line-height: 2rem)
- 3xl: 30px / 1.875rem (line-height: 2.25rem)
- 4xl: 36px / 2.25rem (line-height: 2.5rem)

### Font Weights
- light: 300
- regular: 400
- medium: 500
- semibold: 600
- bold: 700

### Line Heights
- tight: 1.25
- normal: 1.5
- relaxed: 1.625
- loose: 2

### Letter Spacing
- body: -0.02em (slight negative tracking for modern feel)

## Spacing
- xs: 4px / 0.25rem
- sm: 8px / 0.5rem
- md: 16px / 1rem
- lg: 24px / 1.5rem
- xl: 32px / 2rem
- 2xl: 48px / 3rem
- 3xl: 64px / 4rem

## Border Radius
- none: 0
- sm: 4px / 0.25rem
- md: 6px / 0.375rem
- lg: 8px / 0.5rem
- xl: 12px / 0.75rem
- full: 9999px

## Shadows
- sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
- md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
- lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)

## Transitions
- Default: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)
- Color: color 0.2s cubic-bezier(0.4, 0, 0.2, 1)
- Transform: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)
- Opacity: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)

## Layout
- Max Container Width: 1280px / 80rem
- Container Padding: 16px (mobile), 24px (tablet), 32px (desktop)

## Components

### Header
- Background: #ffffff (white)
- Border Bottom: 1px solid #e5e7eb
- Height: 64px / 4rem
- Shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)
- Text Color: #1A1A40 (navy)
- Logo Height: 40px
- Navigation:
  - Link Color: #1A1A40
  - Link Hover: #0066B3
  - Active Color: #0066B3
  - Font Weight: 500 (medium)
- Mobile Menu:
  - Background: #ffffff
  - Border Top: 1px solid #e5e7eb
  - Animation: slide down with opacity

### Footer
- Background: #1A1A40 (navy)
- Text Color: #ffffff
- Link Color: #d1d5db (gray-300)
- Link Hover: #ffffff
- Padding: 48px / 3rem vertical
- Border Top: none
- Social Icons:
  - Size: 40px x 40px
  - Background: rgba(255,255,255,0.1)
  - Hover Background: #0066B3
  - Border Radius: full (rounded-full)
- Bottom Bar Border: 1px solid rgba(255,255,255,0.1)

### Buttons

#### Primary Button
- Background: #0066B3
- Text: #ffffff
- Padding: 8px 16px (sm), 12px 24px (md), 16px 32px (lg)
- Border Radius: 8px (rounded-lg)
- Font Weight: 500
- Hover Background: #00528F
- Active Background: #003D6B
- Transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)

#### Secondary Button
- Background: #E30613
- Text: #ffffff
- Same sizing as primary
- Hover Background: #B6050F

#### Outline Button
- Background: transparent
- Border: 1px solid #0066B3
- Text: #0066B3
- Hover Background: #E6F2FA

#### Ghost Button
- Background: transparent
- Text: #1A1A40
- Hover Background: #f1f5f9

### Forms

#### Input
- Border: 1px solid #e5e7eb
- Background: #ffffff
- Text: #0f172a
- Padding: 8px 16px
- Border Radius: 8px
- Font Size: 16px
- Focus Border: #0066B3
- Focus Ring: 0 0 0 3px rgba(0, 102, 179, 0.1)
- Placeholder Color: #9ca3af

#### Textarea
- Same as input
- Min Height: 100px

### Cards
- Background: #ffffff
- Border: 1px solid #e5e7eb
- Padding: 24px
- Border Radius: 8px
- Shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)
- Hover Shadow (if interactive): 0 4px 6px -1px rgb(0 0 0 / 0.1)

### Scrollbar
- Width: 8px
- Track Background: #f1f5f9
- Thumb Background: #cbd5e1
- Thumb Border Radius: 4px
- Thumb Hover: #94a3b8

## Animations

### Fade In Up
```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
- Duration: 0.4s
- Easing: ease-out
- Fill Mode: forwards
