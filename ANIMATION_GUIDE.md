# Animation System Documentation

## Overview

A comprehensive animation system built with Framer Motion, GSAP ScrollTrigger, and Lenis smooth scrolling for creating high-end, immersive digital experiences.

## Components

### AnimatedText
Character and word stagger animations for text elements.

```tsx
import { AnimatedText } from '@/components/animations';

<AnimatedText
  as="h1"
  className="text-4xl font-bold"
  variant="characters"
  delay={0.2}
  staggerDelay={0.05}
>
  Hello World
</AnimatedText>
```

**Props:**
- `as`: HTML element type (default: 'span')
- `className`: Tailwind classes
- `delay`: Initial animation delay (seconds)
- `variant`: 'characters' | 'words' | 'lines'
- `staggerDelay`: Delay between each item (seconds)

### ScrollReveal
Scroll-triggered reveal animations with blur, scale, and directional options.

```tsx
import { ScrollReveal } from '@/components/animations';

<ScrollReveal
  direction="up"
  scale={true}
  blur={true}
  duration={0.8}
  delay={0.2}
>
  <div>Content that reveals on scroll</div>
</ScrollReveal>
```

**Props:**
- `direction`: 'up' | 'down' | 'left' | 'right' (default: 'up')
- `scale`: Enable scale animation (default: false)
- `blur`: Enable blur animation (default: false)
- `duration`: Animation duration (seconds)
- `delay`: Stagger delay (seconds)
- `useGSAP`: Use GSAP instead of Framer Motion (default: false)

### CardReveal
Spring-physics card animations with hover effects and stagger.

```tsx
import { CardReveal } from '@/components/animations';

{items.map((item, index) => (
  <CardReveal key={index} index={index} staggerDelay={0.15}>
    <Card>{item}</Card>
  </CardReveal>
))}
```

**Props:**
- `index`: Used for stagger calculations
- `staggerDelay`: Delay between card animations (seconds)

### LenisScroll
Smooth momentum scrolling wrapper.

```tsx
import { LenisScroll } from '@/components/animations';

<LenisScroll>
  <YourApp />
</LenisScroll>
```

## Hooks

### useParallax
Parallax scroll effect on elements.

```tsx
import { useParallax } from '@/hooks/useAnimations';

const ref = useParallax(0.5);
return <div ref={ref}>Parallax element</div>;
```

### useMagneticButton
Magnetic button effect that follows cursor.

```tsx
import { useMagneticButton } from '@/hooks/useAnimations';

const ref = useMagneticButton();
return <button ref={ref}>Magnetic Button</button>;
```

## Performance Tips

1. Use `transform` and `opacity` only for GPU acceleration
2. Set `viewport={{ once: true }}` to animate only once
3. Use stagger delays to distribute animation load
4. Combine with Tailwind v4 transitions for static animations
5. Test on low-end devices for performance

## Configuration

All animations use:
- Easing: `[0.22, 1, 0.36, 1]` (custom curve)
- Spring damping: 20
- Spring stiffness: 100
- Default viewport margin: -100px (triggers before entering view)
