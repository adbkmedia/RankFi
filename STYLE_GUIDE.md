# RankFi Style Guide

This document defines the design system and styling standards for the RankFi website.

## 🏗️ Project Context

**This style guide is the foundation for rebuilding RankFi's production website:**
- **Scale**: 30-40k monthly visitors, 7-figure business
- **Scope**: Hundreds of blog pages + comparison pages
- **Goal**: Consistent design system that scales across all pages
- **Approach**: Building one page at a time with proper foundation

All components and pages should reference the design tokens defined in `app/globals.css` to ensure consistency as the site grows.

## 📍 Where to Change Styles

**To change colors, fonts, or spacing:**
1. **Colors**: Edit `app/globals.css` → Look for `--rankfi-*` variables in `:root`
2. **Fonts**: Edit `app/layout.tsx` → Change the font imports, then update `globals.css`
3. **Quick Reference**: See the "Quick Reference Tables" section below for all tokens

**Example**: To change the brand teal color, edit `--rankfi-teal: #00a38f;` in `globals.css`

## 🎨 Color Palette

**All colors are defined in `app/globals.css` as CSS variables. Use Tailwind classes like `bg-rankfi-teal` or `text-rankfi-teal`.**

### Primary Colors
- **Teal/Green**: `rankfi-teal` (`#00a38f`) - Primary brand color (links, accents)
  - Use: `bg-rankfi-teal`, `text-rankfi-teal`, `border-rankfi-teal`
- **Dark Gray/Black**: `rankfi-dark` (`#0a0a0a`) - Header/footer backgrounds
  - Use: `bg-rankfi-dark`
- **Dark Gray**: `rankfi-gray` (`#2d2d2d`) - Table headers, active buttons
  - Use: `bg-rankfi-gray`

### Text Colors
- **Black**: `rankfi-text-black` (`#000000`) - Primary text color
  - Use: `text-rankfi-text-black` or `text-black`
- **Dark Gray**: `rankfi-text-dark-gray` (`#333333`) - Secondary text
  - Use: `text-rankfi-text-dark-gray` or `text-gray-700`
- **Light Gray**: `rankfi-text-light-gray` (`#666666`) - Tertiary text
  - Use: `text-rankfi-text-light-gray` or `text-gray-500`
- **White**: `rankfi-text-white` (`#ffffff`) - Text on dark backgrounds
  - Use: `text-rankfi-text-white` or `text-white`

### Background Colors
- **White**: `#ffffff` - Page backgrounds, cards
  - Use: `bg-white`
- **Light Gray**: `rankfi-light-gray` (`#f0f0f0`) - Hover states, inactive buttons
  - Use: `bg-rankfi-light-gray`
- **Hover Gray**: `rankfi-hover-gray` (`#e0e0e0`) - Hover states
  - Use: `hover:bg-rankfi-hover-gray`
- **Page Background**: `rankfi-page-bg` (`#fafafa`) - Page backgrounds
  - Use: `bg-rankfi-page-bg` or `bg-gray-50`

### Border Colors
- **Light Gray**: `rankfi-border` (`#eaeaea`) - Table borders, card borders
  - Use: `border-rankfi-border` or `border-[#eaeaea]`

## 📐 Typography

**Fonts are configured in `app/layout.tsx` and `app/globals.css`. Currently using Geist Sans and Geist Mono from Google Fonts.**

### Font Families
- **Sans**: Geist Sans (primary font) - Set in `layout.tsx`
- **Mono**: Geist Mono (code/monospace) - Set in `layout.tsx`
- **To change fonts**: Edit `layout.tsx` to import different Google Fonts, then update `globals.css`

### Font Sizes
- **Table Headers**: `text-xs` (12px) - Table headers
- **Table Body**: `text-[13px]` (13px) - Table content
- **Small Text**: `text-sm` (14px) - Descriptions, links
- **Body Text**: `text-base` (16px) - Default body text
- **Large Headers**: `text-xl` (20px) - Section titles
- **Hero Title**: `text-2xl md:text-3xl lg:text-4xl` - Responsive hero text

### Font Weights
- **Normal**: `font-normal` - Body text
- **Medium**: `font-medium` - Navigation links
- **Bold**: `font-bold` - Headers, exchange names
- **Semibold**: `font-semibold` - Table headers

## 📏 Spacing

### Padding
- **Small**: `p-2` (8px) - Table cells
- **Medium**: `p-4` (16px) - Cards, sections
- **Large**: `p-6` (24px) - Larger cards
- **Extra Large**: `py-12` (48px) - Section spacing

### Margins
- **Small Gap**: `gap-2` (8px) - Between small elements
- **Medium Gap**: `gap-4` (16px) - Between buttons
- **Large Gap**: `gap-6` (24px) - Between cards

## 🎯 Component Styles

### Buttons
- **Primary (Active)**: `bg-rankfi-gray text-white` or `bg-[#2d2d2d] text-white` - Dark background, white text
- **Secondary (Inactive)**: `bg-rankfi-light-gray text-black` or `bg-[#f0f0f0] text-black` - Light gray background
- **Hover**: `hover:bg-rankfi-hover-gray` or `hover:bg-[#e0e0e0]` - Slightly darker on hover
- **Rounded**: `rounded-full` - Pill-shaped buttons

### Cards
- **Background**: `bg-white`
- **Border**: `border border-gray-200`
- **Rounded**: `rounded-lg`
- **Shadow**: `hover:shadow-lg` - On hover

### Tables
- **Header Background**: `bg-rankfi-gray` or `bg-[#2d2d2d]` - Dark gray
- **Header Text**: `text-white`
- **Row Background**: `bg-white`
- **Row Hover**: `hover:bg-rankfi-light-gray` or `hover:bg-[#f0f0f0]`
- **Borders**: `border border-rankfi-border` or `border-[#eaeaea]`

## 🔗 Links

- **Color**: `text-rankfi-teal` or `text-[#00a38f]` - Teal/green
- **Hover**: `hover:underline`

## 📱 Responsive Breakpoints

- **Mobile**: Default (no prefix)
- **Tablet**: `md:` prefix (768px and up)
- **Desktop**: `lg:` prefix (1024px and up)

## 🎨 Icons

- **Size**: `w-4 h-4` (16px) for small icons
- **Size**: `w-5 h-5` (20px) for medium icons
- **Color**: Inherit from parent or use `text-gray-600`

## 📝 Usage Examples

### Button (Using Design Tokens)
```tsx
// Primary button
<button className="px-5 py-2 rounded-full text-sm font-medium bg-rankfi-gray text-white hover:bg-rankfi-hover-gray">
  Click Me
</button>

// Secondary button
<button className="px-5 py-2 rounded-full text-sm font-medium bg-rankfi-light-gray text-black hover:bg-rankfi-hover-gray">
  Click Me
</button>
```

### Card
```tsx
<div className="bg-white rounded-lg border border-rankfi-border p-6 hover:shadow-lg">
  Card Content
</div>
```

### Link (Using Design Tokens)
```tsx
<a href="#" className="text-rankfi-teal hover:underline">
  Link Text
</a>
```

## 🚀 Quick Reference Tables

**All tokens are defined in `app/globals.css`. Edit the `--rankfi-*` variables there to change globally.**

### Color Tokens Quick Lookup

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| `rankfi-teal` | `#00a38f` | `bg-rankfi-teal`, `text-rankfi-teal` | Primary brand color, links |
| `rankfi-dark` | `#0a0a0a` | `bg-rankfi-dark` | Header/footer backgrounds |
| `rankfi-gray` | `#2d2d2d` | `bg-rankfi-gray` | Table headers, active buttons |
| `rankfi-light-gray` | `#f0f0f0` | `bg-rankfi-light-gray` | Inactive buttons, hover states |
| `rankfi-hover-gray` | `#e0e0e0` | `hover:bg-rankfi-hover-gray` | Hover states |
| `rankfi-page-bg` | `#fafafa` | `bg-rankfi-page-bg` | Page backgrounds |
| `rankfi-border` | `#eaeaea` | `border-rankfi-border` | Table borders, card borders |
| `rankfi-text-black` | `#000000` | `text-rankfi-text-black` | Primary text |
| `rankfi-text-dark-gray` | `#333333` | `text-rankfi-text-dark-gray` | Secondary text |
| `rankfi-text-light-gray` | `#666666` | `text-rankfi-text-light-gray` | Tertiary text |
| `rankfi-text-white` | `#ffffff` | `text-rankfi-text-white` | Text on dark backgrounds |

### Font Sizes Quick Lookup

| Size | Tailwind Class | Usage |
|------|----------------|-------|
| 12px | `text-xs` | Table headers |
| 13px | `text-[13px]` | Table body |
| 14px | `text-sm` | Small text, descriptions |
| 16px | `text-base` | Default body text |
| 20px | `text-xl` | Section titles |

### Spacing Quick Lookup

| Size | Tailwind Class | Usage |
|------|----------------|-------|
| 8px | `p-2`, `gap-2` | Table cells, small gaps |
| 16px | `p-4`, `gap-4` | Cards, buttons |
| 24px | `p-6`, `gap-6` | Larger cards |
| 48px | `py-12` | Section spacing |

### Common Code Patterns

**Primary Button:**
```tsx
className="px-5 py-2 rounded-full text-sm font-medium bg-rankfi-gray text-white hover:bg-rankfi-hover-gray"
```

**Secondary Button:**
```tsx
className="px-5 py-2 rounded-full text-sm font-medium bg-rankfi-light-gray text-black hover:bg-rankfi-hover-gray"
```

**Link:**
```tsx
className="text-rankfi-teal hover:underline"
```

**Card:**
```tsx
className="bg-white rounded-lg border border-rankfi-border p-6 hover:shadow-lg"
```

**Table Header:**
```tsx
className="bg-rankfi-gray text-white text-xs font-semibold"
```

**Table Row:**
```tsx
className="bg-white hover:bg-rankfi-light-gray border border-rankfi-border"
```

---

**💡 Tip**: You can still use hex codes directly (e.g., `bg-[#00a38f]`), but using tokens (`bg-rankfi-teal`) ensures consistency and makes global changes easier.

**📍 To edit**: All tokens are defined in `app/globals.css` in the `:root` section.

**Last Updated**: 2025

