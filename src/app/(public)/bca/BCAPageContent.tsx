'use client';

import { RevealOnScroll, StaggerChildren, StaggerItem } from '@/components/motion';
import { SectionHeading, LinkButton } from '@/components/ui';
import { CurriculumSection } from '@/components/sections/CurriculumSection';
import { CareerPathsSection } from '@/components/sections/HomeSections';
import { ArrowRight, Clock, GraduationCap, BookOpen, Award } from 'lucide-react';

export function BCAPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(232,93,36,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(232,93,36,0.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
        <div className="relative container-wide">
          <RevealOnScroll>
            <span className="label text-ember-glow tracking-[0.15em] text-xs">Program</span>
            <h1 className="heading-display text-white mt-4 max-w-4xl">
              Bachelor of<br />
              <span className="text-ember">Computer Applications</span>
            </h1>
            <p className="text-lg text-white/50 mt-6 max-w-2xl leading-relaxed">
              A three-year undergraduate program that takes you from programming fundamentals to real-world software development, AI, cloud computing, and beyond.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="bg-paper border-b border-stone-lighter/50">
        <div className="container-wide py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Clock className="w-5 h-5" />, label: 'Duration', value: '3 Years / 6 Semesters' },
              { icon: <GraduationCap className="w-5 h-5" />, label: 'Eligibility', value: '10+2 / PUC (Any Stream)' },
              { icon: <BookOpen className="w-5 h-5" />, label: 'Affiliation', value: 'Gulbarga University' },
              { icon: <Award className="w-5 h-5" />, label: 'Established', value: '2023' },
            ].map((fact) => (
              <RevealOnScroll key={fact.label} delay={0.1}>
                <div className="flex items-start gap-3">
                  <div className="text-ember mt-0.5">{fact.icon}</div>
                  <div>
                    <div className="text-xs text-stone font-heading uppercase tracking-wide">{fact.label}</div>
                    <div className="font-heading font-medium text-ink text-sm mt-0.5">{fact.value}</div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-paper">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <RevealOnScroll>
              <SectionHeading
                label="Overview"
                title="Technology education that prepares you for the industry."
              />
              <div className="mt-6 space-y-4 text-stone leading-relaxed">
                <p>
                  The BCA program at S.R.N. Mehta Degree College is designed as a comprehensive technology education journey. Over six semesters, students build a strong foundation in programming, data structures, and computer science fundamentals before advancing to specialized areas.
                </p>
                <p>
                  Our curriculum covers everything from C and Java programming to artificial intelligence, cloud computing, and cybersecurity. Students don&apos;t just study theory — they build real projects, visit industries, and develop the practical skills that employers look for.
                </p>
                <p>
                  The program is affiliated to Gulbarga University and follows a curriculum designed to match current industry requirements. Students graduate with the knowledge, skills, and portfolio needed to start a career in technology or pursue higher studies like MCA or MBA.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="space-y-4">
                <h3 className="heading-md text-ink">What makes our BCA different</h3>
                {[
                  'Programming from day one — not just theory',
                  'Dedicated computer labs with modern equipment',
                  'Industry visits and field trips for real-world exposure',
                  'Smart classrooms with ICT-enabled teaching',
                  'Guest lectures from industry professionals',
                  'Final semester major project with presentation',
                  'Career guidance and placement support',
                  'Comprehensive six-semester curriculum covering 20+ subjects',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3 py-2">
                    <div className="w-5 h-5 rounded-full bg-ember-light flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-ember" />
                    </div>
                    <span className="text-sm text-ink/80">{point}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <CurriculumSection />

      {/* Career Paths */}
      <CareerPathsSection />

      {/* Higher Education */}
      <section className="section-padding bg-paper-warm">
        <div className="container-wide">
          <RevealOnScroll>
            <SectionHeading
              label="After BCA"
              title="Higher education pathways"
              description="A BCA degree is a stepping stone to advanced studies and specialization."
              align="center"
            />
          </RevealOnScroll>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto" staggerDelay={0.1}>
            {[
              { title: 'MCA', desc: 'Master of Computer Applications — deepen your technical expertise and specialize in areas like AI, cybersecurity, or software engineering.' },
              { title: 'MBA', desc: 'Master of Business Administration — combine your technology background with business skills for management roles in tech companies.' },
              { title: 'M.Sc (CS / IT)', desc: 'Master of Science in Computer Science or IT — pursue research-oriented careers in emerging technologies and academia.' },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-6 rounded-xl bg-white border border-stone-lighter/80 h-full">
                  <h3 className="font-heading font-semibold text-ink text-lg">{item.title}</h3>
                  <p className="text-sm text-stone mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-16 md:py-20">
        <div className="container-wide text-center">
          <RevealOnScroll>
            <h2 className="heading-xl text-white max-w-2xl mx-auto">
              Ready to start your journey in technology?
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <LinkButton href="/admissions" size="lg">
                Apply for BCA
                <ArrowRight className="w-4 h-4 ml-1" />
              </LinkButton>
              <LinkButton href="/contact" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-ink">
                Get in Touch
              </LinkButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
