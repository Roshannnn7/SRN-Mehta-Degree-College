'use client';

import { motion } from 'framer-motion';
import { LinkButton } from '@/components/ui';
import { MagneticElement } from '@/components/motion';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink">
      {/* Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `
            linear-gradient(rgba(232, 93, 36, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232, 93, 36, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink" />
      </div>

      {/* Floating accent elements */}
      <motion.div
        className="absolute top-1/4 right-[15%] w-64 h-64 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #E85D24 0%, transparent 70%)' }}
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[10%] w-48 h-48 rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #0D9488 0%, transparent 70%)' }}
        animate={{ y: [0, 15, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="relative container-wide py-32 md:py-40">
        <div className="max-w-5xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="label text-ember-glow tracking-[0.15em] text-xs">
              S.R.N. Mehta Degree College · Kalaburagi
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="heading-display text-white mt-6 md:mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block">BUILD WHAT</span>
            <span className="block text-ember">COMES NEXT.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl text-white/50 mt-6 md:mt-8 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Three years of BCA. A lifetime of building. Undergraduate technology education designed to turn curiosity into capability.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mt-8 md:mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <MagneticElement strength={0.15}>
              <LinkButton href="/bca" size="lg">
                Explore BCA
              </LinkButton>
            </MagneticElement>
            <MagneticElement strength={0.15}>
              <LinkButton href="/admissions" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-ink">
                Apply Now
              </LinkButton>
            </MagneticElement>
          </motion.div>

          {/* Bottom info bar */}
          <motion.div
            className="flex flex-wrap items-center gap-6 mt-16 md:mt-20 pt-6 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="text-xs text-white/30 font-heading tracking-wide uppercase">
              Affiliated to Gulbarga University
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
            <div className="text-xs text-white/30 font-heading tracking-wide uppercase">
              3-Year BCA Program
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
            <div className="text-xs text-white/30 font-heading tracking-wide uppercase">
              Est. 2023
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-[0.6rem] font-heading tracking-[0.2em] uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
