# MoneyFlowPhone Component

A reusable React component that combines a mobile phone with animated money flow effects. Perfect for landing pages, marketing materials, and financial service websites.

## Features

- 🎯 **Smooth money flow animation** - Dollar signs emerge from phone and float upward
- 📱 **Customizable phone image** - Use any phone image you prefer
- 📏 **Responsive scaling** - 4 different size options
- ⚡ **Performance optimized** - Smooth 60fps animations
- 🎨 **Customizable** - Control colors, timing, and effects
- 🔄 **Auto-reset cycles** - 18-second cycles with smooth transitions

## Quick Start

```tsx
import { MoneyFlowPhone } from '@/components/ui/MoneyFlowPhone'

// Basic usage
<MoneyFlowPhone />

// With custom props
<MoneyFlowPhone 
  scale="lg"
  className="my-8"
  showMoneyFlow={true}
  phoneImage="/path/to/your/phone.png"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `scale` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the component |
| `showMoneyFlow` | `boolean` | `true` | Toggle money flow animation |
| `phoneImage` | `string` | `'/IMAGES/How it works/phone.png'` | Path to phone image |
| `phoneAlt` | `string` | `'Mobile Phone'` | Alt text for phone image |

## Scale Options

- `sm` - 75% size (compact)
- `md` - 100% size (default)
- `lg` - 125% size (prominent)
- `xl` - 150% size (large display)

## Usage Examples

### 1. Basic Implementation
```tsx
export default function HeroSection() {
  return (
    <div className="text-center py-16">
      <h1>Make Money with Your Phone</h1>
      <MoneyFlowPhone />
      <p>Start earning today!</p>
    </div>
  )
}
```

### 2. Large Scale for Hero
```tsx
<MoneyFlowPhone 
  scale="xl"
  className="my-12"
/>
```

### 3. Phone Only (No Money Flow)
```tsx
<MoneyFlowPhone 
  showMoneyFlow={false}
  scale="lg"
/>
```

### 4. Custom Phone Image
```tsx
<MoneyFlowPhone 
  phoneImage="/images/iphone.png"
  phoneAlt="iPhone"
  scale="md"
/>
```

### 5. Responsive Scaling
```tsx
<MoneyFlowPhone 
  scale="md"
  className="md:scale-125 lg:scale-150"
/>
```

## Animation Details

- **Cycle Duration**: 18 seconds total
- **Active Period**: 15 seconds of money flow
- **Fade Period**: 3 seconds of smooth fade-out
- **Particle Creation**: Every 1.2 seconds
- **Max Particles**: 8 on screen at once
- **Fade-in**: 0.3 seconds for new particles

## Styling

The component uses Tailwind CSS classes and includes:
- Drop shadows for depth
- Smooth transitions
- Responsive design
- Pulsing ring animations around the phone

## Performance

- Optimized with `requestAnimationFrame`
- Automatic cleanup on unmount
- Efficient particle management
- Smooth 60fps animations

## Browser Support

- Modern browsers with CSS animations support
- Graceful degradation for older browsers
- Mobile-optimized animations 