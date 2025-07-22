# MindBuddy Design System

## Foundation

### Brand Principles
- **Clean & Minimal**: Focus on content, not decoration
- **Accessible**: High contrast, clear typography
- **Consistent**: Unified experience across all screens
- **Professional**: Trustworthy health & finance application

### Device Specifications
- **Target Device**: iPhone 14
- **Screen Size**: 393 × 852 pixels
- **Safe Areas**: Considered for notch and home indicator
- **Orientation**: Portrait only

## Color System

### Primary Palette
```css
/* Backgrounds */
--bg-primary: #F8F9FA;      /* Main background */
--bg-secondary: #FFFFFF;    /* Card background */
--bg-tertiary: #FAFAFA;     /* Subtle background */

/* Text */
--text-primary: #000000;    /* Main text */
--text-secondary: #666666;  /* Secondary text */
--text-tertiary: #999999;   /* Disabled/hint text */

/* Borders & Dividers */
--border-default: #E0E0E0;  /* Default borders */
--border-light: #F0F0F0;    /* Subtle dividers */
--border-dark: #CCCCCC;     /* Emphasized borders */
```

### Functional Colors
```css
/* Status */
--success: #28A745;         /* Positive actions/states */
--warning: #FFC107;         /* Warnings/cautions */
--error: #DC3545;           /* Errors/destructive */
--info: #17A2B8;            /* Informational */

/* Interactive */
--link: #007AFF;            /* Links/clickable text */
--focus: #0056B3;           /* Focus states */
```

### Grayscale
```css
--gray-900: #212529;        /* Darkest */
--gray-800: #343A40;
--gray-700: #495057;
--gray-600: #6C757D;
--gray-500: #ADB5BD;
--gray-400: #CED4DA;
--gray-300: #DEE2E6;
--gray-200: #E9ECEF;
--gray-100: #F8F9FA;        /* Lightest */
```

## Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Type Scale
```css
/* Display */
--font-display: 32px;       /* Page titles */

/* Headings */
--font-h1: 24px;           /* Main headings */
--font-h2: 20px;           /* Section headings */
--font-h3: 18px;           /* Subsection headings */

/* Body */
--font-large: 16px;        /* Large body text */
--font-base: 14px;         /* Default body text */
--font-small: 13px;        /* Small body text */
--font-tiny: 12px;         /* Captions/labels */
```

### Font Weights
```css
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--line-tight: 1.2;         /* Headings */
--line-base: 1.5;          /* Body text */
--line-loose: 1.75;        /* Relaxed reading */
```

## Spacing System

### Base Unit: 4px
```css
--space-xs: 4px;           /* Tight spacing */
--space-sm: 8px;           /* Small spacing */
--space-md: 12px;          /* Medium spacing */
--space-lg: 16px;          /* Large spacing */
--space-xl: 20px;          /* Extra large spacing */
--space-2xl: 24px;         /* Double extra large */
--space-3xl: 32px;         /* Triple extra large */
--space-4xl: 40px;         /* Quadruple extra large */
```

### Layout Spacing
```css
/* Screen padding */
--screen-padding: 20px;

/* Section spacing */
--section-gap: 24px;

/* Card spacing */
--card-padding: 20px;
--card-gap: 16px;
```

## Component Library

### Cards
```css
.card {
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
    padding: 20px;
}

.card-title {
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    margin-bottom: 4px;
}

.card-subtitle {
    font-size: 12px;
    font-weight: 400;
    color: #666666;
}
```

### Buttons

#### Primary Button
```css
.button-primary {
    background: #000000;
    color: #FFFFFF;
    border: none;
    border-radius: 12px;
    padding: 16px 24px;
    font-size: 16px;
    font-weight: 600;
    min-height: 52px;
}
```

#### Secondary Button
```css
.button-secondary {
    background: transparent;
    color: #000000;
    border: 1px solid #E0E0E0;
    border-radius: 12px;
    padding: 16px 24px;
    font-size: 16px;
    font-weight: 600;
    min-height: 52px;
}
```

#### Action Button (Grid)
```css
.action-button {
    background: #F8F9FA;
    border: 1px solid #E0E0E0;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
}
```

### Input Fields
```css
.input-field {
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    border-radius: 12px;
    padding: 16px;
    font-size: 16px;
    min-height: 52px;
}

.input-field:focus {
    border-color: #666666;
    outline: none;
}
```

### Navigation

#### Top Navigation
```css
.nav-header {
    height: 56px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-title {
    font-size: 18px;
    font-weight: 600;
}
```

#### Bottom Navigation
```css
.bottom-nav {
    height: 80px;
    background: #FFFFFF;
    border-top: 1px solid #E0E0E0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 20px; /* Safe area */
}
```

### Lists

#### Menu Item
```css
.menu-item {
    padding: 16px 0;
    border-bottom: 1px solid #F0F0F0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.menu-label {
    font-size: 14px;
    font-weight: 500;
    color: #000000;
}

.menu-arrow {
    color: #999999;
    font-size: 16px;
}
```

### Progress Indicators

#### Circular Progress
```css
.circular-progress {
    width: 160px;
    height: 160px;
    position: relative;
}

.progress-ring {
    stroke-width: 12;
    fill: none;
}

.progress-ring-bg {
    stroke: #E0E0E0;
}

.progress-ring-fill {
    stroke: #666666;
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: center;
}
```

#### Linear Progress
```css
.progress-bar {
    height: 8px;
    background: #E0E0E0;
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: #666666;
    border-radius: 4px;
}
```

### Badges
```css
.badge {
    background: #F0F0F0;
    color: #000000;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    display: inline-block;
}

.badge-dark {
    background: #000000;
    color: #FFFFFF;
}
```

## Layout Patterns

### Screen Structure
```
┌─────────────────────────┐
│      Navigation         │ 56px
├─────────────────────────┤
│                         │
│      Content Area       │ Flexible
│                         │
├─────────────────────────┤
│    Bottom Navigation    │ 80px
└─────────────────────────┘
```

### Grid System
- **Columns**: 12 column grid
- **Gutters**: 16px
- **Margins**: 20px

### Card Layouts
```css
/* Single Column */
.card-stack {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

/* Two Column Grid */
.card-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

/* Action Button Grid */
.action-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}
```

## Motion & Animation

### Transitions
```css
/* Default transition */
transition: all 0.2s ease;

/* Slower transitions for larger elements */
transition: all 0.3s ease;

/* Spring animation for interactive elements */
transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Loading States
- Skeleton screens for content loading
- Circular spinners for actions
- Progress bars for multi-step processes

## Accessibility

### Color Contrast
- Text on background: Minimum 7:1 ratio
- Large text: Minimum 4.5:1 ratio
- Interactive elements: Minimum 3:1 ratio

### Touch Targets
- Minimum size: 44×44px
- Recommended: 48×48px
- Spacing between targets: 8px minimum

### Typography
- Minimum font size: 12px
- Body text: 14px recommended
- Line height: 1.5 minimum

## State Management

### Interactive States
```css
/* Default */
opacity: 1;

/* Hover (desktop) */
opacity: 0.8;

/* Active/Pressed */
opacity: 0.6;
transform: scale(0.98);

/* Disabled */
opacity: 0.4;
cursor: not-allowed;

/* Focus */
outline: 2px solid #007AFF;
outline-offset: 2px;
```

### Validation States
```css
/* Error */
border-color: #DC3545;
color: #DC3545;

/* Success */
border-color: #28A745;
color: #28A745;

/* Warning */
border-color: #FFC107;
color: #FFC107;
```

## Implementation Notes

### CSS Variables
All design tokens should be implemented as CSS custom properties for easy theming:

```css
:root {
    /* Colors */
    --color-bg-primary: #F8F9FA;
    --color-bg-secondary: #FFFFFF;
    --color-text-primary: #000000;
    --color-text-secondary: #666666;
    
    /* Typography */
    --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-size-base: 14px;
    
    /* Spacing */
    --spacing-unit: 4px;
    
    /* Borders */
    --border-radius-sm: 8px;
    --border-radius-md: 12px;
    --border-radius-lg: 16px;
}
```

### Dark Mode (Future)
While not currently implemented, the grayscale design system allows for easy dark mode adaptation:

```css
@media (prefers-color-scheme: dark) {
    :root {
        --color-bg-primary: #1A1A1A;
        --color-bg-secondary: #2A2A2A;
        --color-text-primary: #FFFFFF;
        --color-text-secondary: #999999;
    }
}
```

---

*Design System Version: 1.0*
*Last Updated: July 2025*