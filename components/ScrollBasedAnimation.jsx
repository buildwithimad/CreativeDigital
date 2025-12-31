'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ScrollBasedAnimation = ({
  children,
  threshold = 0.3,
  delay = 0,
  duration = 0.4,
  offset = 70,
  direction = 'up',
}) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const [mounted, setMounted] = useState(false);

  // ✅ Mark mounted (prevents SSR mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ IntersectionObserver (client only)
  useEffect(() => {
    if (!mounted || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        } else {
          controls.start('hidden');
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [mounted, controls, threshold]);

  // Offset direction
  const offsetStyle =
    direction === 'up'
      ? { y: offset }
      : direction === 'down'
      ? { y: -offset }
      : direction === 'left'
      ? { x: offset }
      : direction === 'right'
      ? { x: -offset }
      : { y: offset };

  const variants = {
    hidden: { opacity: 0, ...offsetStyle },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: 'easeOut' },
    },
  };

  // 🔒 CRITICAL: render STATIC markup until mounted
  if (!mounted) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollBasedAnimation;
