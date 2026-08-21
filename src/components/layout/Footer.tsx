import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/utils';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

const quickLinks = [
  { label: 'BCA Program', href: '/bca' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Campus', href: '/campus' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Faculty', href: '/faculty' },
  { label: 'Contact', href: '/contact' },
];

const academicLinks = [
  { label: 'Curriculum', href: '/bca#curriculum' },
  { label: 'Career Paths', href: '/bca#careers' },
  { label: 'Field Trips', href: '/field-trips' },
  { label: 'Announcements', href: '/announcements' },
  { label: 'FAQ', href: '/faq' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white" role="contentinfo">
      {/* Main Footer */}
      <div className="container-wide pt-16 pb-10 md:pt-20 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10 shrink-0 bg-white rounded-full p-0.5 shadow-sm border border-stone-800">
                <Image
                  src="/logo.png"
                  alt="S.R.N. Mehta Degree College Logo"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <div>
                <div className="font-heading font-semibold text-base leading-tight">{SITE_CONFIG.shortName}</div>
                <div className="text-[0.65rem] text-white/50 leading-tight tracking-wide uppercase">Degree College</div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
              BCA-focused undergraduate education designed to turn curiosity into capability. Affiliated to {SITE_CONFIG.affiliation}.
            </p>
            <div className="space-y-3 text-sm text-white/50">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-ember-glow" />
                <span>{SITE_CONFIG.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-sm tracking-wide uppercase text-white/40 mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-ember-glow transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic */}
          <div>
            <h3 className="font-heading font-semibold text-sm tracking-wide uppercase text-white/40 mb-5">
              Academics
            </h3>
            <ul className="space-y-2.5">
              {academicLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-ember-glow transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-sm tracking-wide uppercase text-white/40 mb-5">
              Get in Touch
            </h3>
            <div className="space-y-4 text-sm">
              <a href={`tel:${SITE_CONFIG.phone.replace(/[\s-+]/g, '')}`} className="flex items-center gap-2.5 text-white/60 hover:text-ember-glow transition-colors">
                <Phone className="w-4 h-4 text-ember-glow" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <a href="mailto:info@srnmehtacollege.com" className="flex items-center gap-2.5 text-white/60 hover:text-ember-glow transition-colors">
                <Mail className="w-4 h-4 text-ember-glow" />
                <span>info@srnmehtacollege.com</span>
              </a>
              <div className="pt-2 flex items-center gap-4 text-white/40">
                <a href={SITE_CONFIG.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ember-glow transition-colors text-xs font-heading">
                  Instagram
                </a>
                <span>·</span>
                <a href={SITE_CONFIG.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-ember-glow transition-colors text-xs font-heading">
                  YouTube
                </a>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-ember hover:bg-ember-deep text-white text-sm font-heading font-medium rounded-lg transition-colors"
              >
                Apply for BCA
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/50 transition-colors">Terms</Link>
            <Link href="/admin/login" className="hover:text-white/50 transition-colors">Admin Login</Link>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${SITE_CONFIG.coordinates.lat},${SITE_CONFIG.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors"
            >
              Directions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
