'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export const useLenisScroll = (options = {}) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [options]);
};

export const LenisScroll = ({ children }: { children: React.ReactNode }) => {
  useLenisScroll();
  return <>{children}</>;
};
