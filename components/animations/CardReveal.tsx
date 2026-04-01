'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardRevealProps {
  children: ReactNode;
  className?: string;
  index?: number;
  staggerDelay?: number;
  damping?: number;
  stiffness?: number;
}

const springConfig = {
  damping: 20,
  stiffness: 100,
  mass: 1,
};

export const CardReveal = ({
  children,
  className = '',
  index = 0,
  staggerDelay = 0.1,
}: CardRevealProps) => {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.95,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 100,
        mass: 1,
        delay: index * staggerDelay,
      }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{
        scale: 1.02,
        transition: { type: 'spring', damping: 20, stiffness: 100 },
      }}
    >
      {children}
    </motion.div>
  );
};
