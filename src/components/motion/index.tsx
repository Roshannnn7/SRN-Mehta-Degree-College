'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, type Variants } from 'framer-motion';

// === REVEAL ON SCROLL ===
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

const directionVariants: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
};

export function RevealOnScroll({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  const variants = directionVariants[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// === TEXT REVEAL (word by word) ===
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.04,
  once = true,
  as: Tag = 'h2',
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <Tag className={className}>
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={wordVariants}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}

// === IMAGE REVEAL (scale + clip) ===
interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function ImageReveal({ children, className = '', delay = 0, once = true }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : { clipPath: 'inset(100% 0 0 0)' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        initial={{ scale: 1.2 }}
        animate={isInView ? { scale: 1 } : { scale: 1.2 }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// === STAGGER CHILDREN ===
interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delay?: number;
  once?: boolean;
}

export function StaggerChildren({
  children,
  className = '',
  staggerDelay = 0.1,
  delay = 0,
  once = true,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// === STAGGER ITEM (child of StaggerChildren) ===
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// === MAGNETIC BUTTON ===
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticElement({ children, className = '', strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// === SMOOTH COUNTER ===
interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function SmoothCounter({ target, duration = 2, suffix = '', prefix = '', className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isInView ? (
          <Counter from={0} to={target} duration={duration} />
        ) : (
          '0'
        )}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

function Counter({ from, to, duration }: { from: number; to: number; duration: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const start = performance.now();
    const update = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const value = Math.round(from + (to - from) * eased);
      if (ref.current) ref.current.textContent = value.toString();
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [from, to, duration]);

  return <span ref={ref}>{from}</span>;
}

// === PAGE TRANSITION WRAPPER ===
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
