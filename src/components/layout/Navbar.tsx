'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn, NAV_ITEMS } from '@/lib/utils';
import { LinkButton } from '@/components/ui';
import { Menu, X, ChevronDown } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const isHome = pathname === '/';
  const navBg = isScrolled || !isHome
    ? 'bg-white/95 backdrop-blur-md border-b border-stone-lighter/50 shadow-sm'
    : 'bg-transparent';
  const textColor = isScrolled || !isHome ? 'text-ink' : 'text-white';

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          navBg,
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="relative w-10 h-10 shrink-0 bg-white rounded-full p-0.5 shadow-sm border border-stone-200">
                <Image
                  src="/logo.png"
                  alt="S.R.N. Mehta Degree College Logo"
                  fill
                  className="object-contain rounded-full"
                  priority
                />
              </div>
              <div className={cn('hidden sm:block transition-colors', textColor)}>
                <div className="font-heading font-semibold text-sm leading-tight">S.R.N. Mehta</div>
                <div className="text-[0.65rem] opacity-70 leading-tight tracking-wide uppercase">Degree College</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative group">
                  {'children' in item && item.children ? (
                    <button
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md',
                        textColor,
                        'hover:text-ember',
                      )}
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'px-3 py-2 text-sm font-medium transition-colors rounded-md block',
                        pathname === item.href
                          ? 'text-ember'
                          : cn(textColor, 'hover:text-ember'),
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {'children' in item && item.children && (
                    <div
                      className={cn(
                        'absolute top-full left-0 pt-2 transition-all duration-200',
                        openDropdown === item.label ? 'opacity-100 visible' : 'opacity-0 invisible',
                      )}
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <div className="bg-white rounded-xl shadow-xl border border-stone-lighter/50 py-2 min-w-[180px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block px-4 py-2.5 text-sm transition-colors',
                              pathname === child.href
                                ? 'text-ember bg-ember-light/50'
                                : 'text-ink hover:text-ember hover:bg-paper-warm',
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:block">
                <LinkButton href="/admissions" size="sm">
                  Apply Now
                </LinkButton>
              </div>

              <button
                className={cn('lg:hidden p-2 rounded-md transition-colors', textColor)}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full pt-20 pb-8 px-6 overflow-y-auto">
              <motion.div
                className="flex-1 flex flex-col gap-1"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                }}
              >
                {NAV_ITEMS.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    {'children' in item && item.children ? (
                      <div>
                        <button
                          className="w-full flex items-center justify-between py-3 text-xl font-heading text-white/80 hover:text-white transition-colors"
                          onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                        >
                          {item.label}
                          <ChevronDown className={cn(
                            'w-5 h-5 transition-transform',
                            openDropdown === item.label && 'rotate-180',
                          )} />
                        </button>
                        <AnimatePresence>
                          {openDropdown === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4 border-l border-white/10"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={cn(
                                    'block py-2.5 text-base transition-colors',
                                    pathname === child.href
                                      ? 'text-ember-glow'
                                      : 'text-white/60 hover:text-white',
                                  )}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          'block py-3 text-xl font-heading transition-colors',
                          pathname === item.href
                            ? 'text-ember-glow'
                            : 'text-white/80 hover:text-white',
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 pt-6 border-t border-white/10"
              >
                <LinkButton href="/admissions" size="lg" className="w-full justify-center">
                  Apply Now
                </LinkButton>
                <p className="text-center text-white/40 text-xs mt-4 font-heading tracking-wide uppercase">
                  S.R.N. Mehta Degree College · Kalaburagi
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
