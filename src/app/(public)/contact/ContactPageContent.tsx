'use client';

import { useState } from 'react';
import { RevealOnScroll } from '@/components/motion';
import { SectionHeading, Button, Input, Textarea, Select } from '@/components/ui';
import { SITE_CONFIG } from '@/lib/utils';
import { MapPin, Phone, Mail, Clock, ExternalLink, Send, CheckCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const CampusMap = dynamic(() => import('@/components/shared/CampusMap').then(m => ({ default: m.CampusMap })), {
  ssr: false,
  loading: () => <div className="w-full h-80 bg-paper-warm rounded-xl animate-pulse" />,
});

export function ContactPageContent() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative container-wide">
          <RevealOnScroll>
            <span className="label text-ember-glow tracking-[0.15em] text-xs">Contact</span>
            <h1 className="heading-display text-white mt-4 max-w-3xl">
              Get in<br /><span className="text-ember">touch.</span>
            </h1>
            <p className="text-lg text-white/50 mt-6 max-w-xl">
              Have a question about BCA admissions, campus visits, or anything else? We&apos;d like to hear from you.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="section-padding bg-paper">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Info Column */}
            <div className="lg:col-span-2">
              <RevealOnScroll>
                <SectionHeading label="Visit Us" title="Find us in Kalaburagi." />

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-ember-light flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-ember" />
                    </div>
                    <div>
                      <div className="font-heading font-medium text-ink text-sm">Address</div>
                      <p className="text-sm text-stone mt-0.5">{SITE_CONFIG.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-ember-light flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-ember" />
                    </div>
                    <div>
                      <div className="font-heading font-medium text-ink text-sm">College Hours</div>
                      <p className="text-sm text-stone mt-0.5">Monday – Saturday, 9:00 AM – 4:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-ember-light flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-ember" />
                    </div>
                    <div>
                      <div className="font-heading font-medium text-ink text-sm">Phone</div>
                      <a href={`tel:${SITE_CONFIG.phone.replace(/[\s-+]/g, '')}`} className="text-sm text-stone mt-0.5 block hover:text-ember transition-colors">
                        {SITE_CONFIG.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-ember-light flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-ember" />
                    </div>
                    <div>
                      <div className="font-heading font-medium text-ink text-sm">Email</div>
                      <a href="mailto:info@srnmehtacollege.com" className="text-sm text-stone mt-0.5 block hover:text-ember transition-colors">
                        info@srnmehtacollege.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${SITE_CONFIG.coordinates.lat},${SITE_CONFIG.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-heading font-medium text-ember hover:text-ember-deep transition-colors"
                  >
                    Get Directions
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </RevealOnScroll>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-3">
              <RevealOnScroll delay={0.15}>
                <div className="p-6 md:p-8 rounded-2xl bg-white border border-stone-lighter/80 shadow-sm">
                  <h3 className="heading-md text-ink mb-1">Send us a message</h3>
                  <p className="text-sm text-stone mb-6">We typically respond within one business day.</p>

                  {formState === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                      </div>
                      <h4 className="heading-md text-ink mb-2">Message sent</h4>
                      <p className="text-sm text-stone max-w-md">
                        Thank you for reaching out. We&apos;ve received your message and will get back to you soon.
                      </p>
                      <Button
                        variant="ghost"
                        className="mt-4 text-ember"
                        onClick={() => setFormState('idle')}
                      >
                        Send another message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Name"
                          id="contact-name"
                          required
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <Input
                          label="Email"
                          id="contact-email"
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Phone"
                          id="contact-phone"
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        <Select
                          label="Subject"
                          id="contact-subject"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          options={[
                            { value: 'admissions', label: 'Admissions Enquiry' },
                            { value: 'bca', label: 'BCA Program' },
                            { value: 'campus', label: 'Campus Visit' },
                            { value: 'general', label: 'General Enquiry' },
                            { value: 'other', label: 'Other' },
                          ]}
                        />
                      </div>
                      <Textarea
                        label="Message"
                        id="contact-message"
                        required
                        placeholder="Tell us how we can help..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />

                      <div className="flex items-start gap-2 text-xs text-stone">
                        <input type="checkbox" required className="mt-0.5 accent-ember" id="consent" />
                        <label htmlFor="consent">
                          I consent to S.R.N. Mehta Degree College collecting and storing this information to respond to my enquiry.
                        </label>
                      </div>

                      {/* Honeypot */}
                      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                      {formState === 'error' && (
                        <p className="text-sm text-error">Something went wrong. Please try again.</p>
                      )}

                      <Button type="submit" size="lg" disabled={formState === 'loading'} className="w-full md:w-auto">
                        {formState === 'loading' ? 'Sending...' : 'Send Message'}
                        <Send className="w-4 h-4 ml-1" />
                      </Button>
                    </form>
                  )}
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-paper-warm py-10 md:py-14">
        <div className="container-wide">
          <RevealOnScroll>
            <div className="rounded-2xl overflow-hidden border border-stone-lighter/50 shadow-sm">
              <CampusMap />
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
