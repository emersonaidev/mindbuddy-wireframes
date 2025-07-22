# MindBuddy Component Specifications

## Navigation Components

### Top Navigation Bar
```
Component: NavHeader
Dimensions: 393 × 56px
Background: Transparent
Padding: 16px horizontal

Variants:
- Back Navigation (with back arrow)
- Title Only (centered)
- Menu Navigation (with hamburger icon)

Elements:
- Back Arrow: 20px, color: #000
- Title: Inter 18px SemiBold, color: #000
- Menu Icon: 24×24px, 3 lines, 2px stroke
```

### Bottom Navigation (Tab Bar)
```
Component: BottomNav
Dimensions: 393 × 80px
Background: #FFFFFF
Border Top: 1px solid #E0E0E0
Items: 5 max

Tab Item:
- Icon: 24×24px
- Label: Inter 10px Medium
- Active Color: #000000
- Inactive Color: #999999
- Padding: 8px vertical
```

## Card Components

### Standard Card
```
Component: Card
Background: #FFFFFF
Border Radius: 16px
Shadow: 0px 2px 8px rgba(0, 0, 0, 0.05)
Padding: 20px
Margin Bottom: 24px

Title: Inter 14px Medium, color: #000
Subtitle: Inter 12px Regular, color: #666
```

### Balance Card ($MNDY)
```
Component: BalanceCard
Extends: Card

Structure:
- Header Row: Space between
  - Title: "$MNDY Balance"
  - Badge: "+7 earned today"
- Amount: Inter 24px Bold
- Breakdown List: 
  - Item spacing: 8px vertical
  - Divider: 1px #F0F0F0
```

### Score Card (Circular Progress)
```
Component: ScoreCard
Extends: Card

Elements:
- Progress Ring: 160×160px
  - Stroke Width: 12px
  - Background: #E0E0E0
  - Fill: #666666
- Score Text: 
  - Number: Inter 32px Bold
  - Label: Inter 13px Regular
- Status: Inter 14px Medium
```

### Data Reputation Card
```
Component: ReputationCard
Extends: Card

Elements:
- Score: Inter 24px Bold
- Progress Bar: 8px height
  - Background: #E0E0E0
  - Fill: Dynamic width %
- Rating Labels: Inter 11px Regular
  - Poor | Fair | Good | Excellent
```

## Button Components

### Primary Button
```
Component: ButtonPrimary
Height: 52px
Background: #000000
Color: #FFFFFF
Border Radius: 12px
Padding: 16px 24px
Font: Inter 16px SemiBold

States:
- Default: opacity 1
- Pressed: opacity 0.8
- Disabled: opacity 0.4
```

### Secondary Button
```
Component: ButtonSecondary
Height: 52px
Background: Transparent
Border: 1px solid #E0E0E0
Color: #000000
Border Radius: 12px
Padding: 16px 24px
Font: Inter 16px SemiBold

States:
- Default: border #E0E0E0
- Pressed: border #666666
- Disabled: opacity 0.4
```

### Action Button (Grid)
```
Component: ActionButton
Background: #F8F9FA
Border: 1px solid #E0E0E0
Border Radius: 12px
Padding: 16px
Min Height: 80px

Structure:
- Icon: 20px, margin-bottom: 8px
- Label: Inter 13px Medium

States:
- Default: background #F8F9FA
- Hover: background #F0F0F0, border #666
```

### Link Button
```
Component: LinkButton
Background: None
Color: #666666
Font: Inter 12px Medium
Text Decoration: None

States:
- Default: color #666666
- Active: color #000000
```

## Form Components

### Input Field
```
Component: InputField
Height: 52px
Background: #FFFFFF
Border: 1px solid #E0E0E0
Border Radius: 12px
Padding: 16px
Font: Inter 16px Regular

States:
- Default: border #E0E0E0
- Focus: border #666666
- Error: border #DC3545
- Disabled: background #F8F9FA
```

### Label
```
Component: InputLabel
Font: Inter 14px Medium
Color: #000000
Margin Bottom: 8px
```

### Helper Text
```
Component: HelperText
Font: Inter 12px Regular
Color: #666666
Margin Top: 4px

Variants:
- Default: color #666666
- Error: color #DC3545
```

### Checkbox
```
Component: Checkbox
Size: 20×20px
Border: 2px solid #E0E0E0
Border Radius: 4px
Background: #FFFFFF

States:
- Unchecked: border #E0E0E0
- Checked: background #000000, checkmark #FFFFFF
- Disabled: opacity 0.4
```

## List Components

### Menu Item
```
Component: MenuItem
Height: 60px
Padding: 16px 0
Border Bottom: 1px solid #F0F0F0

Structure:
- Icon Container: 40×40px, background #F0F0F0
- Content Area: Flex 1
  - Label: Inter 14px Medium
  - Description: Inter 12px Regular, color #666
- Arrow: "›" 20px, color #999
```

### Activity Item
```
Component: ActivityItem
Padding: 8px 0
Border Bottom: 1px solid #F0F0F0

Structure:
- Label: Inter 14px Regular
- Value: Inter 14px Regular, text-align: right
```

## Progress Components

### Circular Progress
```
Component: CircularProgress
Sizes: 
- Small: 80×80px, stroke: 8px
- Medium: 100×100px, stroke: 10px  
- Large: 160×160px, stroke: 12px

SVG Structure:
- Background Circle: stroke #E0E0E0
- Progress Circle: stroke #666666
  - stroke-dasharray: circumference
  - stroke-dashoffset: calculated %
```

### Linear Progress
```
Component: LinearProgress
Height: 8px
Background: #E0E0E0
Border Radius: 4px

Fill:
- Background: #666666
- Width: Dynamic %
- Transition: width 0.3s ease
```

### Rating Bar
```
Component: RatingBar
Extends: LinearProgress

Additional:
- Labels Row: Inter 11px Regular
- Range Text: Inter 12px Regular, centered
```

## Badge Components

### Standard Badge
```
Component: Badge
Height: 28px
Padding: 6px 12px
Border Radius: 20px
Background: #F0F0F0
Font: Inter 12px Medium
Color: #000000
```

### Dark Badge
```
Component: BadgeDark
Extends: Badge
Background: #000000
Color: #FFFFFF
```

### Count Badge
```
Component: CountBadge
Size: 20×20px
Border Radius: 10px
Background: #000000
Color: #FFFFFF
Font: Inter 10px Bold
Min Width: 20px
```

## Modal Components

### Menu Overlay
```
Component: MenuOverlay
Width: 295px (75% of 393px)
Height: 100%
Background: #FFFFFF
Shadow: -2px 0 8px rgba(0, 0, 0, 0.1)
Position: Right aligned
Padding: 20px

Header:
- Title: Inter 16px Medium
- Close Button: "×" 24×24px

Menu Items:
- Font: Inter 14px Medium
- Padding: 12px 0
- Border Bottom: 1px #F0F0F0
```

### Dark Overlay
```
Component: DarkOverlay
Background: rgba(0, 0, 0, 0.3)
Position: Absolute
Z-index: 999
```

## Special Components

### Earnings Breakdown
```
Component: EarningsBreakdown
Structure:
- Day Header: Space between
  - Label: Inter 13px Medium
  - Total: Inter 13px Medium
- Activities Grid: 2 columns
  - Activity: Inter 13px Regular
  - Value: Inter 13px Regular, right aligned
- Divider: 1px #F0F0F0, margin 16px
```

### Score Ring Display
```
Component: ScoreRing
Container: 160×160px
SVG ViewBox: 0 0 120 120
Circle Radius: 50px
Center: 60, 60

Text Overlay:
- Score: Inter 32px Bold
- Label: Inter 13px Regular, color #666
```

### Utility List
```
Component: UtilityList
List Style: None
Item Spacing: 16px

Item Structure:
- Bullet: "•" 16px, color #666
- Header: Inter 13px Medium
- Subtext: Inter 12px Regular, color #666
```

## Icon System

### Navigation Icons
```
Back Arrow: "←" 20px
Forward Arrow: "›" 20px
Close: "×" 24px
Menu: 3 lines, 2px height, 4px gap
```

### Action Icons
```
Size: 20px in buttons
Emoji Icons Used:
- 💸 Withdraw
- 🔄 Exchange
- 📊 Transaction History
- 💰 Earn More
- 💤 Sleep
- ❤️ Heart Rate
- 👟 Steps
```

## Spacing Reference

### Component Spacing
```
Between Cards: 24px
Inside Cards: 20px padding
Between Sections: 32px
List Item Padding: 16px vertical
Button Group Gap: 12px
Form Field Gap: 16px
Icon to Text: 8px
```

### Touch Targets
```
Minimum: 44×44px
Recommended: 48×48px
Action Buttons: 80×80px minimum
List Items: 60px height
```

## Animation Specs

### Transitions
```
Default: all 0.2s ease
Hover States: opacity 0.2s ease
Progress Bars: width 0.3s ease
Page Transitions: transform 0.3s ease
```

### Loading States
```
Spinner: 20×20px, 2px stroke
Rotation: 360deg, 1s linear infinite
Skeleton: Pulse animation 1.5s ease-in-out
```

---

*Component Specifications v1.0*
*Device: iPhone 14 (393×852px)*
*Last Updated: July 2025*