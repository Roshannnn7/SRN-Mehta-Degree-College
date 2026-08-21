'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll, StaggerChildren, StaggerItem } from '@/components/motion';
import { SectionHeading, Badge } from '@/components/ui';
import Image from 'next/image';
import { FACILITIES, CAREER_PATHS, TOP_PERFORMERS, ACADEMIC_STATS } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { LinkButton } from '@/components/ui';
import {
  Monitor, Cpu, Library, Wifi, Theater, Trees,
  Coffee, Bus, Shield, Briefcase, Laptop, Building2,
  ArrowRight, ChevronRight,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Library: <Library className="w-5 h-5" />,
  Wifi: <Wifi className="w-5 h-5" />,
  Theater: <Theater className="w-5 h-5" />,
  Trees: <Trees className="w-5 h-5" />,
  Coffee: <Coffee className="w-5 h-5" />,
  Bus: <Bus className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Laptop: <Laptop className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
};

// === FACILITIES SECTION ===
export function FacilitiesSection() {
  return (
    <section className="section-padding bg-ink" id="facilities">
      <div className="container-wide">
        <RevealOnScroll>
          <SectionHeading
            label="Campus"
            title="Everything you need to focus on learning."
            description="Modern infrastructure designed for a complete academic experience."
            dark
          />
        </RevealOnScroll>

        <StaggerChildren
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mt-10 md:mt-14"
          staggerDelay={0.05}
        >
          {FACILITIES.map((facility) => (
            <StaggerItem key={facility.name}>
              <div className="group p-5 md:p-6 rounded-xl bg-ink-light border border-ink-muted hover:border-ember/30 transition-all duration-300 h-full">
                <div className="text-ember-glow mb-3 transition-transform duration-300 group-hover:scale-110">
                  {iconMap[facility.icon] || <Monitor className="w-5 h-5" />}
                </div>
                <h3 className="font-heading font-medium text-white text-sm mb-1.5">
                  {facility.name}
                </h3>
                <p className="text-xs text-white/40 leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Actual Campus Renderings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 md:mt-16 pt-12 border-t border-white/5">
          <RevealOnScroll className="group">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-lg border border-white/5 bg-ink-light">
              <Image
                src="/campus-front.png"
                alt="S.R.N. Mehta Degree College Front Facade View"
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </div>
            <h4 className="font-heading font-medium text-white text-sm mt-3">Modern Entrance Facade</h4>
            <p className="text-xs text-white/40 mt-1">Stunning contemporary design featuring multi-story study blocks and landscaped approaches.</p>
          </RevealOnScroll>

          <RevealOnScroll className="group" delay={0.15}>
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-lg border border-white/5 bg-ink-light">
              <Image
                src="/campus-aerial.jpg"
                alt="S.R.N. Mehta Degree College Aerial Campus Layout"
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </div>
            <h4 className="font-heading font-medium text-white text-sm mt-3">Aerial Campus Rendering</h4>
            <p className="text-xs text-white/40 mt-1">An expansive layout showing sports amenities, academic courtyard, and administrative buildings.</p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.3}>
          <div className="mt-10 text-center">
            <LinkButton href="/campus" variant="outline" className="border-white/20 text-white hover:bg-white hover:text-ink">
              Explore Campus
              <ArrowRight className="w-4 h-4 ml-1" />
            </LinkButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// === CAREER PATHS SECTION ===
export function CareerPathsSection() {
  const [activeCareer, setActiveCareer] = useState<number | null>(null);

  return (
    <section className="section-padding bg-paper" id="careers">
      <div className="container-wide">
        <RevealOnScroll>
          <SectionHeading
            label="After BCA"
            title="Where can BCA take you?"
            description="A BCA degree opens doors across the technology industry and beyond."
            align="center"
          />
        </RevealOnScroll>

        <div className="mt-10 md:mt-14 max-w-4xl mx-auto">
          <StaggerChildren staggerDelay={0.04}>
            {CAREER_PATHS.map((career, i) => (
              <StaggerItem key={career.title}>
                <div
                  className={cn(
                    'border-b border-stone-lighter/80 transition-all duration-300',
                    activeCareer === i && 'bg-paper-warm rounded-xl border-transparent mb-2',
                  )}
                >
                  <button
                    className="w-full flex items-center justify-between py-4 px-4 text-left group"
                    onClick={() => setActiveCareer(activeCareer === i ? null : i)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-heading text-xs text-stone-light w-6">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={cn(
                        'font-heading font-medium text-base md:text-lg transition-colors',
                        activeCareer === i ? 'text-ember' : 'text-ink group-hover:text-ember',
                      )}>
                        {career.title}
                      </span>
                    </div>
                    <ChevronRight className={cn(
                      'w-4 h-4 text-stone transition-transform duration-300',
                      activeCareer === i && 'rotate-90 text-ember',
                    )} />
                  </button>

                  <AnimatePresence>
                    {activeCareer === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-5 pl-14">
                          <p className="text-sm text-stone leading-relaxed mb-4">
                            {career.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <span className="label text-[0.6rem] text-stone-light block mb-2">Key Skills</span>
                              <div className="flex flex-wrap gap-1.5">
                                {career.skills.map((skill) => (
                                  <Badge key={skill} variant="teal" size="sm">{skill}</Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="label text-[0.6rem] text-stone-light block mb-2">Related Subjects</span>
                              <div className="flex flex-wrap gap-1.5">
                                {career.relatedSubjects.map((sub) => (
                                  <Badge key={sub} variant="ember" size="sm">{sub}</Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="label text-[0.6rem] text-stone-light block mb-2">Higher Studies</span>
                              <div className="flex flex-wrap gap-1.5">
                                {career.higherStudies.map((study) => (
                                  <Badge key={study} size="sm">{study}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}

// === ADMISSION CTA SECTION ===
export function AdmissionCTASection() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-28">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'radial-gradient(circle at 30% 50%, #E85D24 0%, transparent 50%), radial-gradient(circle at 70% 50%, #0D9488 0%, transparent 50%)',
      }} />

      <div className="relative container-wide text-center">
        <RevealOnScroll>
          <span className="label text-ember-glow tracking-[0.15em] text-xs block mb-4">
            Admissions
          </span>
          <h2 className="heading-xl text-white max-w-3xl mx-auto text-balance">
            Your future in technology starts with one step.
          </h2>
          <p className="text-lg text-white/40 mt-4 max-w-lg mx-auto">
            Take the first step toward a career in software, data, AI, cloud, and beyond.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <LinkButton href="/admissions" size="lg">
              Start Your Application
            </LinkButton>
            <LinkButton href="/bca" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-ink">
              Learn About BCA
            </LinkButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// === FAQ PREVIEW SECTION ===
export function FAQPreviewSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { question: 'What is BCA?', answer: 'BCA (Bachelor of Computer Applications) is a 3-year undergraduate degree program that covers computer science, programming, databases, web technologies, AI, cloud computing, and more. It prepares students for careers in the technology industry.' },
    { question: 'Who is eligible for BCA?', answer: 'Students who have completed 10+2 or PUC in any stream are eligible to apply for BCA at S.R.N. Mehta Degree College.' },
    { question: 'What is the duration of the BCA program?', answer: 'The BCA program is 3 years long, divided into 6 semesters. Students complete coursework, labs, projects, and a final major project.' },
    { question: 'What career options are available after BCA?', answer: 'BCA graduates can pursue careers as Software Developers, Web Developers, Data Analysts, Database Administrators, Cybersecurity Analysts, Cloud Engineers, and more. They can also pursue higher studies such as MCA, MBA, or M.Sc.' },
    { question: 'Is the college affiliated to a university?', answer: 'Yes, S.R.N. Mehta Degree College is affiliated to Gulbarga University, Kalaburagi, Karnataka.' },
  ];

  return (
    <section className="section-padding bg-paper-warm" id="faq">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <RevealOnScroll>
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                label="FAQ"
                title="Common questions, clear answers."
              />
              <div className="mt-6">
                <LinkButton href="/faq" variant="ghost" className="text-ember hover:text-ember-deep -ml-4">
                  View all FAQ
                  <ArrowRight className="w-4 h-4 ml-1" />
                </LinkButton>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div>
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-stone-lighter/60">
                  <button
                    className="w-full flex items-center justify-between py-5 text-left group"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className={cn(
                      'font-heading font-medium text-base pr-4 transition-colors',
                      openFaq === i ? 'text-ember' : 'text-ink group-hover:text-ember',
                    )}>
                      {faq.question}
                    </span>
                    <span className={cn(
                      'shrink-0 w-7 h-7 flex items-center justify-center rounded-full border transition-all duration-300',
                      openFaq === i
                        ? 'bg-ember border-ember text-white rotate-45'
                        : 'border-stone-lighter text-stone',
                    )}>
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-stone leading-relaxed pb-5 pr-10">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// === ABOUT PREVIEW / WHY SRN MEHTA ===
export function WhySection() {
  const reasons = [
    { title: 'BCA-focused institution', description: 'Not a general college with BCA as an afterthought. Our entire academic ecosystem is built around computer applications education.' },
    { title: 'Practical learning approach', description: 'Dedicated computer labs, hands-on programming from day one, real projects, and industry-relevant curriculum through all six semesters.' },
    { title: 'Industry exposure', description: 'Regular field trips, industry visits, guest lectures from professionals, and workshops that connect classroom learning to the real world.' },
    { title: 'Modern campus infrastructure', description: 'Smart classrooms with digital teaching aids, high-speed internet, well-equipped labs, library, auditorium, and secure campus.' },
  ];

  return (
    <section className="section-padding bg-paper">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <RevealOnScroll>
            <div>
              <SectionHeading
                label="Why SRN Mehta"
                title="A BCA experience built for the real world."
                description="Established in 2023 with a clear mission: create technology professionals who are ready for the industry from day one."
              />
              <div className="mt-8">
                <LinkButton href="/about">
                  About the College
                  <ArrowRight className="w-4 h-4 ml-1" />
                </LinkButton>
              </div>
            </div>
          </RevealOnScroll>

          <StaggerChildren className="space-y-4" staggerDelay={0.1}>
            {reasons.map((reason, i) => (
              <StaggerItem key={i}>
                <div className="flex gap-4 p-5 rounded-xl bg-paper-warm border border-stone-lighter/50 hover:border-ember/20 transition-colors">
                  <div className="font-heading font-bold text-3xl text-stone-lighter/60 shrink-0 w-10">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-heading font-medium text-ink text-sm">{reason.title}</h3>
                    <p className="text-sm text-stone mt-1 leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}

// === ACHIEVEMENTS SECTION ===
export function AchievementsSection() {
  return (
    <section className="section-padding bg-paper-warm" id="achievements">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Big Stats */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <RevealOnScroll>
              <SectionHeading
                label="Academic Excellence"
                title="100% Pass Result. A proud achievement."
                description="Our BCA students achieved outstanding academic success in the university examinations, setting a benchmark for future cohorts with Sri Praful Mehta & Family Trust."
              />
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="p-6 rounded-xl bg-white border border-stone-lighter/50 shadow-sm">
                  <div className="font-heading font-bold text-4xl md:text-5xl text-ember">{ACADEMIC_STATS.passResult.split('%')[0]}%</div>
                  <div className="text-xs text-stone font-heading uppercase tracking-wide mt-2">Pass Rate</div>
                </div>
                <div className="p-6 rounded-xl bg-white border border-stone-lighter/50 shadow-sm">
                  <div className="font-heading font-bold text-4xl md:text-5xl text-teal">{ACADEMIC_STATS.appearedCount}/{ACADEMIC_STATS.appearedCount}</div>
                  <div className="text-xs text-stone font-heading uppercase tracking-wide mt-2">Students Cleared</div>
                </div>
                <div className="p-6 rounded-xl bg-white border border-stone-lighter/50 shadow-sm">
                  <div className="font-heading font-bold text-4xl md:text-5xl text-ink">{ACADEMIC_STATS.exemplaryCount}</div>
                  <div className="text-xs text-stone font-heading uppercase tracking-wide mt-2">First Class Exemplary</div>
                </div>
                <div className="p-6 rounded-xl bg-white border border-stone-lighter/50 shadow-sm">
                  <div className="font-heading font-bold text-4xl md:text-5xl text-stone">{ACADEMIC_STATS.distinctionCount}</div>
                  <div className="text-xs text-stone font-heading uppercase tracking-wide mt-2">Distinction</div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Top Performers List */}
          <div className="lg:col-span-7">
            <RevealOnScroll delay={0.2}>
              <div className="bg-white rounded-2xl border border-stone-lighter/80 p-6 md:p-8 shadow-sm">
                <h3 className="font-heading font-semibold text-ink text-lg mb-6">Top Performers</h3>
                
                <StaggerChildren className="divide-y divide-stone-lighter/50" staggerDelay={0.05}>
                  {TOP_PERFORMERS.map((student, i) => (
                    <StaggerItem key={student.name} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="font-heading font-bold text-sm text-stone-light w-6">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <div className="font-medium text-ink text-sm">{student.name}</div>
                          <div className="text-[0.65rem] text-stone font-heading uppercase tracking-wide mt-0.5">{student.rank}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-heading font-bold text-ember text-sm">{student.cgpa}</div>
                        <div className="text-[0.6rem] text-stone-light font-heading uppercase tracking-wide">CGPA</div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

