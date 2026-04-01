'use client';

import { motion } from 'framer-motion';
import { ReactNode, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: boolean;
  blur?: boolean;
  duration?: number;
  delay?: number;
  useGSAP?: boolean;
}

export const ScrollReveal = ({
  children,
  className = '',
  direction = 'up',
  scale = false,
  blur = false,
  duration = 0.8,
  delay = 0,
  useGSAP = false,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!useGSAP || !ref.current) return;

    const directionMap = {
      up: { y: 60, x: 0 },
      down: { y: -60, x: 0 },
      left: { x: 60, y: 0 },
      right: { x: -60, y: 0 },
    };

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        ...directionMap[direction],
        scale: scale ? 0.85 : 1,
        filter: blur ? 'blur(10px)' : 'blur(0px)',
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [useGSAP, direction, scale, blur, duration]);

  if (useGSAP) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  const directionVariants = {
    up: { y: 60 },
    down: { y: -60 },
    left: { x: 60 },
    right: { x: -60 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...directionVariants[direction],
        scale: scale ? 0.85 : 1,
        filter: blur ? 'blur(10px)' : 'blur(0px)',
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      transition={{
        duration,
        delay,
      }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  );
};
