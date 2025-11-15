# Portfolio Website V37 - Andrei Dodu

A stunning, modern portfolio website built with Next.js featuring dark theme design, interactive animations, and advanced visual effects.

## Features

- **Pure Black Design**: Dark theme with gradient accents (Swedish Blue to Gold)
- **Interactive Background**: Multi-layered background with animated dots, floating orbs, pulsing lights, and mouse-following glow
- **Glass Morphism Navigation**: Fixed navigation bar with blur effect
- **Gradient Text Effects**: Eye-catching gradient text for headings
- **Profile Card**: Interactive card with tabs (Dev, Invest, Finance) and metallic border with shine effect
- **Feature Cards**: Three animated cards highlighting key expertise areas
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Smooth Animations**: GPU-accelerated animations for optimal performance
- **Accessibility**: WCAG AA compliant with keyboard navigation and reduced motion support

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Houdini** - Advanced gradient animations using @property
- **React Hooks** - Modern state management and effects

## Design System

### Colors
- Background: Pure black (#000000)
- Cards: Dark grey (#111111)
- Text: White (#ffffff), Grey (#888888), Muted (#666666)
- Accent: Swedish Blue (#0369a1) to Gold (#fbbf24) gradient

### Typography
- Font: System font stack (Apple System, Segoe UI, Roboto)
- Heading sizes: 4.5rem (h1), 2.5rem (h2), 1.125rem (h3)
- Font weights: 700 (bold), 600 (semibold), 400 (regular)

### Animations
- Float: Smooth floating motion for orbs
- Pulse: Pulsing effect for light dots
- Drift: Diagonal movement for dot grid
- RotateShine: Rotating shine effect for metallic borders
- FadeUp: Entrance animation

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio-v37
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
portfolio-v37/
├── app/
│   ├── globals.css          # Global styles and design system
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main page component
├── components/
│   ├── Background.tsx        # Multi-layered background effects
│   ├── Navigation.tsx        # Glass morphism navbar
│   ├── Hero.tsx              # Hero section with gradient text
│   ├── ProfileCard.tsx       # Interactive profile card with tabs
│   ├── FeatureCards.tsx      # Feature showcase cards
│   ├── Contact.tsx           # Contact section
│   └── Footer.tsx            # Footer component
└── public/                   # Static assets
```

## Components

### Background
Multi-layered background with:
- Animated dot grid pattern
- Floating gradient orbs (blue and gold)
- Pulsing blue light dots
- Interactive cursor glow effect

### Navigation
Glass morphism navigation bar with:
- Fixed positioning
- Blur backdrop effect
- Smooth underline animations on hover
- Mobile hamburger menu

### ProfileCard
Interactive profile card featuring:
- Metallic gradient border
- Rotating shine effect on hover
- Three tabs (Dev, Invest, Finance)
- Skill tags with hover animations

### FeatureCards
Three feature cards showcasing:
- Performance First
- Clean Architecture
- Strategic Thinking

## Performance Optimizations

- CSS transforms for GPU acceleration
- Will-change property on hover elements
- Intersection Observer for scroll animations
- Debounced scroll events
- CSS containment on animated elements

## Accessibility

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Focus states for keyboard navigation
- Reduced motion media query support
- WCAG AA color contrast compliance

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2025 Andrei Dodu. All rights reserved.

## Contact

- Email: contact@andreidodu.com
- Location: Sweden
- GitHub: [Your GitHub]
- LinkedIn: [Your LinkedIn]
