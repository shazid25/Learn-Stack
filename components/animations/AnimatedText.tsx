'use client';

import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface AnimatedTextProps {
  children: string | ReactNode;
  className?: string;
  delay?: number;
  variant?: 'words' | 'characters' | 'lines';
  staggerDelay?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (custom: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: custom,
    },
  }),
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export const AnimatedText = ({
  children,
  className = '',
  delay = 0,
  variant = 'characters',
  staggerDelay = 0.05,
}: AnimatedTextProps) => {
  if (typeof children !== 'string') {
    return <>{children}</>;
  }

  const text = children;
  const items = variant === 'characters' ? text.split('') : text.split(' ');

  return (
    <motion.div
      className={className}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      {items.map((item, index) => (
        <motion.span
          key={`${item}-${index}`}
          variants={itemVariants}
          className={variant === 'characters' ? '' : 'inline-block mr-[0.25em]'}
        >
          {item}
          {variant === 'characters' && item === ' ' && '\u00A0'}
        </motion.span>
      ))}
    </motion.div>
  );
};
