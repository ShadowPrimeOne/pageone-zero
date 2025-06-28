# AnimatedPhoneUnit Component Documentation

## Overview

The `AnimatedPhoneUnit` is a reusable React component that combines animated dollar signs, a mobile phone icon, and pulsing ring animations into a cohesive visual unit. This component is designed for use in landing pages, hero sections, and other marketing materials where you want to showcase phone-related services or call-to-action elements.

## File Location

```
src/components/modules/Adwords/AnimatedPhoneUnit.tsx
```

## Dependencies

- `AnimatedLogo` component (dollar signs with bounce animations)
- `MobilePhoneIcon` component (phone with pulsing ring animations)
- React 18+
- Tailwind CSS

## Component Interface

```typescript
interface AnimatedPhoneUnitProps {
  className?: string
  scale?: 'sm' | 'md' | 'lg' | 'xl'
  showDollarSigns?: boolean
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes to apply to the container |
| `scale` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Predefined scale options for the entire unit |
| `showDollarSigns` | `boolean` | `true` | Toggle to show/hide the animated dollar signs |

## Scale Options

| Scale | Size | Use Case |
|-------|------|----------|
| `sm` | 75% | Compact spaces, sidebars, small cards |
| `md` | 100% | Default size, most common use |
| `lg` | 125% | Hero sections, prominent displays |
| `xl` | 150% | Large displays, featured sections |

## Basic Usage

### Import Statement

```tsx
import { AnimatedPhoneUnit } from '@/components/modules/Adwords/AnimatedPhoneUnit'
```

### Simple Implementation

```tsx
export default function MyPage() {
  return (
    <div>
      <h1>Welcome to Our Service</h1>
      <AnimatedPhoneUnit />
    </div>
  )
}
```

## Advanced Usage Examples

### 1. Hero Section with Responsive Scaling

```tsx
export default function HeroSection() {
  return (
    <section className="hero min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Get More Leads</h1>
        <AnimatedPhoneUnit 
          scale="lg"
          className="md:scale-125 lg:scale-150"
        />
        <p className="mt-8 text-xl">Call us today!</p>
      </div>
    </section>
  )
}
```

### 2. Feature Section with Multiple Instances

```tsx
export default function FeatureSection() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <AnimatedPhoneUnit scale="md" />
          <h3 className="mt-4 text-xl font-semibold">24/7 Support</h3>
          <p>Always here when you need us</p>
        </div>
        <div className="text-center">
          <AnimatedPhoneUnit scale="md" />
          <h3 className="mt-4 text-xl font-semibold">Fast Response</h3>
          <p>Quick turnaround times</p>
        </div>
        <div className="text-center">
          <AnimatedPhoneUnit scale="md" />
          <h3 className="mt-4 text-xl font-semibold">Quality Service</h3>
          <p>Professional results guaranteed</p>
        </div>
      </div>
    </section>
  )
}
```

### 3. Call-to-Action Section

```tsx
export default function CTASection() {
  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
        <AnimatedPhoneUnit 
          scale="xl"
          className="mb-8"
        />
        <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold">
          Contact Us Now
        </button>
      </div>
    </section>
  )
}
```

### 4. Phone-Only Version (No Dollar Signs)

```tsx
export default function PhoneOnlySection() {
  return (
    <section className="py-12">
      <div className="text-center">
        <h2>Call Us Today</h2>
        <AnimatedPhoneUnit 
          showDollarSigns={false}
          scale="lg"
        />
        <p className="mt-4">We're here to help!</p>
      </div>
    </section>
  )
}
```

### 5. Custom Styling

```tsx
export default function CustomStyledSection() {
  return (
    <section className="py-16">
      <AnimatedPhoneUnit 
        scale="lg"
        className="border-2 border-gray-300 rounded-lg p-8 bg-gray-50 shadow-lg"
      />
    </section>
  )
}
```

## Responsive Design

The component is designed to work seamlessly across all device sizes. For optimal responsive behavior, consider these patterns:

### Mobile-First Responsive Scaling

```tsx
<AnimatedPhoneUnit 
  scale="md"
  className="md:scale-125 lg:scale-150"
/>
```

### Container-Based Responsive

```tsx
<div className="w-full max-w-md mx-auto">
  <AnimatedPhoneUnit scale="lg" />
</div>
```

## Animation Details

### Dollar Signs Animation
- Three dollar signs with different sizes and opacities
- Independent bounce animations with staggered timing
- Positioned above the phone icon
- Green color with drop shadows

### Phone Icon Animation
- Mobile phone image with pulsing ring animations
- Rings appear with a 1-second delay after the phone
- Three concentric rings with different opacities
- Yellow/gold color scheme

### Ring Animation
- Custom ping animation without white background
- 2-second duration with cubic-bezier easing
- Staggered delays for visual interest

## CSS Classes Applied

The component uses these Tailwind classes by default:
- `flex flex-col items-center` - Layout
- `transition-transform duration-300` - Smooth scaling transitions
- Scale classes based on the `scale` prop

## Performance Considerations

- Uses `requestAnimationFrame` for smooth animations
- Optimized with `useRef` and `useState` for minimal re-renders
- CSS transforms for hardware acceleration
- Cleanup functions to prevent memory leaks

## Browser Compatibility

- Modern browsers with CSS Grid and Flexbox support
- Requires JavaScript for animations
- Graceful degradation for older browsers

## Troubleshooting

### Common Issues

1. **Animations not working**
   - Ensure JavaScript is enabled
   - Check for CSS conflicts in parent components

2. **Phone image not loading**
   - Verify the image path: `/IMAGES/Adwords Leads for electrical industry incoming call.png`
   - Check Next.js Image component configuration

3. **Dollar signs not positioned correctly**
   - Ensure the container has sufficient width
   - Check for CSS conflicts with positioning

### Debug Mode

To debug positioning issues, add a background color temporarily:

```tsx
<AnimatedPhoneUnit 
  className="bg-red-200 border border-red-500"
  scale="md"
/>
```

## Migration Guide

### From Separate Components

If you were previously using `AnimatedLogo` and `MobilePhoneIcon` separately:

**Before:**
```tsx
<div className="flex flex-col items-center">
  <AnimatedLogo />
  <MobilePhoneIcon />
</div>
```

**After:**
```tsx
<AnimatedPhoneUnit />
```

## Best Practices

1. **Use appropriate scale for context**
   - `sm` for compact spaces
   - `md` for standard content
   - `lg` for hero sections
   - `xl` for featured displays

2. **Consider responsive scaling**
   - Start with `md` scale
   - Add responsive classes for larger screens

3. **Maintain visual hierarchy**
   - Don't use `xl` scale in dense layouts
   - Ensure adequate spacing around the component

4. **Accessibility**
   - The component includes proper alt text for images
   - Animations respect `prefers-reduced-motion` settings

## Future Enhancements

Potential improvements for future versions:
- Custom animation timing options
- Different color themes
- Additional icon options
- A/B testing variants
- Performance monitoring hooks

## Support

For issues or questions about this component:
1. Check this documentation first
2. Review the component source code
3. Test in isolation to identify conflicts
4. Check browser console for errors

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Author:** Development Team 