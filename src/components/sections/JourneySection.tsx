'use client';

import { RevealOnScroll, StaggerChildren, StaggerItem } from '@/components/motion';
import { SectionHeading } from '@/components/ui';
import { cn } from '@/lib/utils';

const journey = [
  {
    step: '01',
    title: 'LEARN',
    subtitle: 'Build foundations',
    description: 'Start with C, C++, and data structures. Understand how computers think — then learn to think with them.',
    subjects: ['C Programming', 'Data Structures', 'Mathematics', 'Digital Electronics'],
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    step: '02',
    title: 'BUILD',
    subtitle: 'Create real software',
    description: 'Write your first applications in Java and Python. Design databases. Engineer software that solves problems.',
    subjects: ['Java', 'Python', 'DBMS', 'Software Engineering'],
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  {
    step: '03',
    title: 'EXPERIMENT',
    subtitle: 'Explore frontiers',
    description: 'Step into artificial intelligence, cloud computing, and cybersecurity. Find the technology that excites you most.',
    subjects: ['AI', 'Cloud Computing', 'Cyber Security', 'Data Science'],
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
  },
  {
    step: '04',
    title: 'COLLABORATE',
    subtitle: 'Work as a team',
    description: 'Join lab sessions, group projects, and workshops. Learn to build software the way the industry does — together.',
    subjects: ['Lab Projects', 'Team Assignments', 'Workshops', 'Peer Learning'],
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  {
    step: '05',
    title: 'PRESENT',
    subtitle: 'Show your work',
    description: 'Present at seminars. Visit industries. Attend guest lectures. Gain the confidence to communicate your ideas.',
    subjects: ['Seminars', 'Industry Visits', 'Guest Lectures', 'Presentations'],
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
  },
  {
    step: '06',
    title: 'LAUNCH',
    subtitle: 'Start your career',
    description: 'Complete your major project. Prepare for placements or higher studies. Step into the technology industry ready.',
    subjects: ['Major Project', 'Placement Prep', 'MCA / MBA', 'Industry Readiness'],
    color: 'text-ember',
    bg: 'bg-ember-light',
    border: 'border-ember/20',
  },
];

export function JourneySection() {
  return (
    <section className="section-padding bg-paper" id="journey">
      <div className="container-wide">
        <RevealOnScroll>
          <SectionHeading
            label="The BCA Journey"
            title="From first line of code to career launch."
            description="BCA at SRN Mehta isn't just a degree. It's a structured journey through the world of technology."
          />
        </RevealOnScroll>

        <div className="mt-12 md:mt-16">
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
            {journey.map((item) => (
              <StaggerItem key={item.step}>
                <div className={cn(
                  'group relative p-6 md:p-7 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full',
                  item.bg, item.border,
                )}>
                  {/* Step number */}
                  <div className={cn('font-heading font-bold text-4xl md:text-5xl opacity-15', item.color)}>
                    {item.step}
                  </div>

                  {/* Title */}
                  <div className="mt-2">
                    <h3 className={cn('font-heading font-bold text-xl tracking-tight', item.color)}>
                      {item.title}
                    </h3>
                    <p className="text-sm font-heading text-stone mt-0.5">{item.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-ink/70 leading-relaxed mt-3">
                    {item.description}
                  </p>

                  {/* Subject tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {item.subjects.map((sub) => (
                      <span
                        key={sub}
                        className="text-[0.65rem] font-heading font-medium tracking-wide px-2 py-0.5 rounded-full bg-white/70 text-ink/60 border border-current/10"
                      >
                        {sub}
                      </span>
                    ))}
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
