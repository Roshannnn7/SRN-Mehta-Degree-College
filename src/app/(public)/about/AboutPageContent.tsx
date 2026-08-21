'use client';

import Image from 'next/image';
import { RevealOnScroll, StaggerChildren, StaggerItem } from '@/components/motion';
import { SectionHeading, LinkButton } from '@/components/ui';
import { ArrowRight, MapPin, Calendar, BookOpen, Users } from 'lucide-react';

export function AboutPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative container-wide">
          <RevealOnScroll>
            <span className="label text-ember-glow tracking-[0.15em] text-xs">About</span>
            <h1 className="heading-display text-white mt-4 max-w-4xl">
              A college built for<br />
              <span className="text-ember">what comes next.</span>
            </h1>
            <p className="text-lg text-white/50 mt-6 max-w-xl leading-relaxed">
              S.R.N. Mehta Degree College is a BCA-focused institution in Kalaburagi, Karnataka, established with one clear purpose: technology education that prepares students for real careers.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-paper">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <RevealOnScroll>
              <SectionHeading label="Our Story" title="Built from the ground up for BCA education." />
              <div className="mt-6 space-y-4 text-stone leading-relaxed">
                <p>
                  S.R.N. Mehta Degree College was established in 2023 on University Road, Kalaburagi, with a clear vision: to create an undergraduate institution that puts computer applications education at its center — not as an afterthought, but as the foundation of everything we do.
                </p>
                <p>
                  Affiliated to Gulbarga University, the college offers a three-year Bachelor of Computer Applications (BCA) program designed to give students a comprehensive understanding of programming, databases, web technologies, artificial intelligence, cloud computing, cybersecurity, and software engineering.
                </p>
                <p>
                  From smart classrooms and dedicated computer labs to industry visits and placement support, every aspect of the college is designed to bridge the gap between academic learning and industry readiness.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Calendar className="w-5 h-5" />, label: 'Established', value: '2023' },
                  { icon: <BookOpen className="w-5 h-5" />, label: 'University', value: 'Gulbarga University' },
                  { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: 'Kalaburagi, Karnataka' },
                  { icon: <Users className="w-5 h-5" />, label: 'Focus', value: 'BCA Program' },
                ].map((item) => (
                  <div key={item.label} className="p-5 rounded-xl bg-paper-warm border border-stone-lighter/50">
                    <div className="text-ember mb-2">{item.icon}</div>
                    <div className="text-xs text-stone font-heading uppercase tracking-wide">{item.label}</div>
                    <div className="font-heading font-medium text-ink text-sm mt-1">{item.value}</div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Campus Infrastructure Renders */}
      <section className="section-padding bg-paper-warm border-t border-stone-lighter/30">
        <div className="container-wide">
          <RevealOnScroll>
            <SectionHeading
              label="Campus Infrastructure"
              title="A purpose-built digital learning environment."
              description="Explore architectural renderings of the state-of-the-art campus designed to foster academic excellence and innovation."
            />
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 md:mt-14">
            <RevealOnScroll className="group">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md border border-stone-lighter bg-stone-100">
                <Image
                  src="/campus-front.png"
                  alt="S.R.N. Mehta Degree College Front Facade View"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-heading font-semibold text-lg text-ink mt-4">Main Campus Facade</h3>
              <p className="text-sm text-stone mt-1.5 leading-relaxed">
                Featuring modern architecture with clean geometric columns, structured academic blocks, and landscaped entrance portals.
              </p>
            </RevealOnScroll>

            <RevealOnScroll className="group" delay={0.15}>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md border border-stone-lighter bg-stone-100">
                <Image
                  src="/campus-aerial.jpg"
                  alt="S.R.N. Mehta Degree College Aerial Campus Layout"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-heading font-semibold text-lg text-ink mt-4">Aerial Master Plan</h3>
              <p className="text-sm text-stone mt-1.5 leading-relaxed">
                An expansive aerial rendering showcasing academic blocks, administrative wing, sports ground, and lush green environment.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-white border-t border-stone-lighter/30">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RevealOnScroll>
              <div className="p-8 rounded-2xl bg-white border border-stone-lighter/80 h-full">
                <span className="label text-ember text-xs">Vision</span>
                <h3 className="heading-md text-ink mt-3">
                  To be a leading undergraduate institution in technology education, producing graduates who contribute meaningfully to the digital economy.
                </h3>
                <p className="text-sm text-stone mt-4 leading-relaxed">
                  We envision a college where every student gains not just a degree, but the practical skills, professional confidence, and technological understanding needed to build successful careers.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <div className="p-8 rounded-2xl bg-ink text-white h-full">
                <span className="label text-ember-glow text-xs">Mission</span>
                <h3 className="heading-md text-white mt-3">
                  To provide quality BCA education through modern pedagogy, practical exposure, and industry-relevant curriculum.
                </h3>
                <p className="text-sm text-white/50 mt-4 leading-relaxed">
                  Our mission is to deliver education that combines strong theoretical foundations with hands-on project experience, supported by smart infrastructure, dedicated faculty, and continuous industry engagement.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-paper">
        <div className="container-wide">
          <RevealOnScroll>
            <SectionHeading
              label="Values"
              title="What we stand for."
              align="center"
            />
          </RevealOnScroll>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 md:mt-14" staggerDelay={0.08}>
            {[
              { title: 'Academic Rigor', desc: 'A curriculum that challenges students and builds real competence in technology.' },
              { title: 'Practical Learning', desc: 'Education that connects theory to application through labs, projects, and industry visits.' },
              { title: 'Student Growth', desc: 'Supporting every student in developing both technical skills and professional confidence.' },
              { title: 'Integrity', desc: 'Honest representation of our capabilities, transparent processes, and ethical practices.' },
            ].map((value) => (
              <StaggerItem key={value.title}>
                <div className="p-6 rounded-xl border border-stone-lighter/80 bg-paper-warm h-full">
                  <h3 className="font-heading font-medium text-ink">{value.title}</h3>
                  <p className="text-sm text-stone mt-2 leading-relaxed">{value.desc}</p>
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
              See what we&apos;re building.
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <LinkButton href="/bca" size="lg">
                Explore BCA Program
                <ArrowRight className="w-4 h-4 ml-1" />
              </LinkButton>
              <LinkButton href="/campus" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-ink">
                Tour the Campus
              </LinkButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
