'use client';

import { useState } from 'react';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/motion';
import { SectionHeading, Button, Input, Textarea, Select } from '@/components/ui';
import { SITE_CONFIG } from '@/lib/utils';
import { CheckCircle, FileText, Send, AlertCircle } from 'lucide-react';

export function AdmissionsPageContent() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    studentName: '', parentName: '', phone: '', email: '', dob: '',
    board: '', stream: '', percentage: '', city: '', contactPreference: 'phone', message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    try {
      const res = await fetch('/api/public/admission-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState('success');
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative container-wide">
          <RevealOnScroll>
            <span className="label text-ember-glow tracking-[0.15em] text-xs">Admissions</span>
            <h1 className="heading-display text-white mt-4 max-w-4xl">
              Start your<br /><span className="text-ember">BCA journey.</span>
            </h1>
            <p className="text-lg text-white/50 mt-6 max-w-xl">
              Submit an admission enquiry for the BCA program. Our team will review your information and get in touch.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Info + Form */}
      <section className="section-padding bg-paper">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Info */}
            <div className="lg:col-span-2">
              <RevealOnScroll>
                <SectionHeading label="BCA Admission" title="What you need to know." />

                <div className="mt-8 space-y-5">
                  <div className="p-5 rounded-xl bg-paper-warm border border-stone-lighter/50">
                    <div className="text-xs text-stone font-heading uppercase tracking-wide mb-1">Program</div>
                    <div className="font-heading font-medium text-ink">BCA — Bachelor of Computer Applications</div>
                  </div>
                  <div className="p-5 rounded-xl bg-paper-warm border border-stone-lighter/50">
                    <div className="text-xs text-stone font-heading uppercase tracking-wide mb-1">Duration</div>
                    <div className="font-heading font-medium text-ink">3 Years (6 Semesters)</div>
                  </div>
                  <div className="p-5 rounded-xl bg-paper-warm border border-stone-lighter/50">
                    <div className="text-xs text-stone font-heading uppercase tracking-wide mb-1">Eligibility</div>
                    <div className="font-heading font-medium text-ink">10+2 / PUC passed in any stream</div>
                  </div>
                  <div className="p-5 rounded-xl bg-paper-warm border border-stone-lighter/50">
                    <div className="text-xs text-stone font-heading uppercase tracking-wide mb-1">Affiliation</div>
                    <div className="font-heading font-medium text-ink">Gulbarga University</div>
                  </div>
                </div>

                {/* Admission Poster */}
                <a
                  href="/admissions-poster.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md border border-stone-lighter bg-stone-100 group cursor-pointer"
                >
                  <Image
                    src="/admissions-poster.png"
                    alt="S.R.N. Mehta Degree College Admission Flyer"
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
                    <div className="flex items-center gap-2 text-white">
                      <FileText className="w-4 h-4 text-ember-glow" />
                      <span className="font-heading font-medium text-xs">View Official Admission Poster (New Tab)</span>
                    </div>
                  </div>
                </a>

                <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <div className="text-xs text-amber-800">
                      <strong>Please note:</strong> Submitting this form is an expression of interest, not a confirmed admission. Our admissions team will contact you with next steps.
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <RevealOnScroll delay={0.15}>
                <div className="p-6 md:p-8 rounded-2xl bg-white border border-stone-lighter/80 shadow-sm">
                  <h3 className="heading-md text-ink mb-1">Admission Enquiry Form</h3>
                  <p className="text-sm text-stone mb-6">Fill in your details and we&apos;ll get back to you.</p>

                  {formState === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                      </div>
                      <h4 className="heading-md text-ink mb-2">Enquiry submitted</h4>
                      <p className="text-sm text-stone max-w-md">
                        Thank you for your interest in BCA at {SITE_CONFIG.shortName}. Our admissions team will review your enquiry and contact you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Student Name" id="studentName" name="studentName" required placeholder="Full name" value={formData.studentName} onChange={handleChange} />
                        <Input label="Parent/Guardian Name" id="parentName" name="parentName" required placeholder="Parent's full name" value={formData.parentName} onChange={handleChange} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Phone" id="adm-phone" name="phone" type="tel" required placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} />
                        <Input label="Email" id="adm-email" name="email" type="email" required placeholder="your@email.com" value={formData.email} onChange={handleChange} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input label="Date of Birth" id="dob" name="dob" type="date" required value={formData.dob} onChange={handleChange} />
                        <Input label="PUC/12th Board" id="board" name="board" required placeholder="e.g., Karnataka PUC" value={formData.board} onChange={handleChange} />
                        <Input label="Stream" id="stream" name="stream" required placeholder="e.g., Science, Commerce" value={formData.stream} onChange={handleChange} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Percentage (%)" id="percentage" name="percentage" required placeholder="e.g., 65%" value={formData.percentage} onChange={handleChange} />
                        <Input label="City" id="city" name="city" required placeholder="Your city" value={formData.city} onChange={handleChange} />
                      </div>
                      <Select
                        label="Preferred Contact Method"
                        id="contactPreference"
                        name="contactPreference"
                        value={formData.contactPreference}
                        onChange={handleChange}
                        options={[
                          { value: 'phone', label: 'Phone Call' },
                          { value: 'email', label: 'Email' },
                          { value: 'whatsapp', label: 'WhatsApp' },
                        ]}
                      />
                      <Textarea label="Additional Message" id="adm-message" name="message" placeholder="Any questions or additional information..." value={formData.message} onChange={handleChange} />

                      <div className="flex items-start gap-2 text-xs text-stone">
                        <input type="checkbox" required className="mt-0.5 accent-ember" id="adm-consent" />
                        <label htmlFor="adm-consent">I consent to S.R.N. Mehta Degree College processing this information for admission purposes.</label>
                      </div>

                      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                      {formState === 'error' && <p className="text-sm text-error">Something went wrong. Please try again.</p>}

                      <Button type="submit" size="lg" disabled={formState === 'loading'} className="w-full md:w-auto">
                        {formState === 'loading' ? 'Submitting...' : 'Submit Enquiry'}
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
    </>
  );
}
