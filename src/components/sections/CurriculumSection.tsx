'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from '@/components/motion';
import { BCA_CURRICULUM } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { BookOpen, FlaskConical, Award, Info, Sparkles } from 'lucide-react';

const categoryColors: Record<string, string> = {
  programming: 'bg-blue-50 text-blue-700 border-blue-200',
  database: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  systems: 'bg-purple-50 text-purple-700 border-purple-200',
  web: 'bg-amber-50 text-amber-700 border-amber-200',
  ai_ml: 'bg-rose-50 text-rose-700 border-rose-200',
  cybersecurity: 'bg-red-50 text-red-700 border-red-200',
  cloud: 'bg-sky-50 text-sky-700 border-sky-200',
  data_science: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  mathematics: 'bg-teal-50 text-teal-700 border-teal-200',
  language: 'bg-emerald-50 text-emerald-800 border-emerald-300',
  compulsory: 'bg-stone-100 text-stone-700 border-stone-300',
  skill: 'bg-cyan-50 text-cyan-800 border-cyan-300',
  project: 'bg-orange-50 text-orange-700 border-orange-200',
  elective: 'bg-violet-50 text-violet-700 border-violet-200',
};

const categoryLabels: Record<string, string> = {
  programming: 'Programming',
  database: 'Database',
  systems: 'Systems',
  web: 'Web',
  ai_ml: 'AI / ML',
  cybersecurity: 'Security',
  cloud: 'Cloud',
  data_science: 'Data Science',
  mathematics: 'Mathematics',
  language: 'Language',
  compulsory: 'Compulsory',
  skill: 'Skill Course',
  project: 'Project',
  elective: 'Elective',
};

const typeBadges: Record<string, { bg: string; text: string; icon: typeof BookOpen }> = {
  Theory: { bg: 'bg-blue-100/80 text-blue-800 border-blue-200', text: 'Theory', icon: BookOpen },
  Practical: { bg: 'bg-emerald-100/80 text-emerald-800 border-emerald-200', text: 'Practical', icon: FlaskConical },
  Skill: { bg: 'bg-amber-100/80 text-amber-800 border-amber-200', text: 'Skill', icon: Sparkles },
  Elective: { bg: 'bg-purple-100/80 text-purple-800 border-purple-200', text: 'Elective', icon: BookOpen },
  Project: { bg: 'bg-orange-100/80 text-orange-800 border-orange-200', text: 'Project', icon: Award },
};

export function CurriculumSection() {
  const [activeSemester, setActiveSemester] = useState(0);
  const [filterType, setFilterType] = useState<'all' | 'Theory' | 'Practical'>('all');

  const currentSemester = BCA_CURRICULUM[activeSemester];
  const filteredSubjects = filterType === 'all'
    ? currentSemester.subjects
    : currentSemester.subjects.filter((s) => s.type === filterType);

  const theoryCount = currentSemester.subjects.filter((s) => s.type === 'Theory' || s.type === 'Skill' || s.type === 'Elective').length;
  const practicalCount = currentSemester.subjects.filter((s) => s.type === 'Practical').length;
  const projectCount = currentSemester.subjects.filter((s) => s.type === 'Project').length;

  return (
    <section className="section-padding bg-paper-warm" id="curriculum">
      <div className="container-wide">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto">
            <span className="label text-ember tracking-[0.15em] text-xs font-semibold uppercase">Gulbarga University Curriculum</span>
            <h2 className="heading-xl text-ink mt-3">
              Six Semesters. One Complete Transformation.
            </h2>
            <p className="text-stone mt-4 text-base md:text-lg leading-relaxed">
              Scheme of study and examination for B.C.A. (w.e.f. Academic Year 2024-25 & onwards). Total Course Marks: <span className="font-semibold text-ink">3,950</span>.
            </p>
          </div>
        </RevealOnScroll>

        {/* Language Note Callout */}
        <RevealOnScroll delay={0.1}>
          <div className="max-w-4xl mx-auto mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 text-amber-900">
            <Info className="w-5 h-5 text-ember shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm">
              <span className="font-semibold text-ink">Language Choice Notice: </span>
              Under <span className="font-medium">Language-1T (MIL-1)</span> in Semesters I through IV, students have the option to choose either <span className="font-semibold text-ember">Kannada</span> or <span className="font-semibold text-ember">Hindi</span>. English-1 is the compulsory second language.
            </div>
          </div>
        </RevealOnScroll>

        {/* Semester Tabs */}
        <RevealOnScroll delay={0.2}>
          <div className="flex justify-center mt-8 md:mt-10">
            <div className="inline-flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-stone-lighter/80 shadow-sm overflow-x-auto max-w-full">
              {BCA_CURRICULUM.map((sem, i) => (
                <button
                  key={sem.number}
                  onClick={() => {
                    setActiveSemester(i);
                    setFilterType('all');
                  }}
                  className={cn(
                    'relative px-4 py-2.5 text-xs md:text-sm font-heading font-medium rounded-xl transition-all whitespace-nowrap',
                    activeSemester === i
                      ? 'text-white shadow-sm'
                      : 'text-stone hover:text-ink hover:bg-stone-50',
                  )}
                >
                  {activeSemester === i && (
                    <motion.div
                      layoutId="semester-tab"
                      className="absolute inset-0 bg-ink rounded-xl"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 font-semibold">Sem {sem.number}</span>
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Semester Meta Bar */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSemester}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 rounded-2xl bg-white border border-stone-lighter/90 shadow-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-ember/10 text-ember rounded-md">
                      {currentSemester.academicYear}
                    </span>
                    <span className="text-xs text-stone font-heading">
                      {theoryCount} Theory • {practicalCount} Practicals {projectCount > 0 ? `• ${projectCount} Project` : ''}
                    </span>
                  </div>
                  <h3 className="heading-md text-ink mt-1.5">{currentSemester.title}</h3>
                </div>

                <div className="flex items-center gap-3 self-start md:self-auto">
                  <div className="text-right">
                    <div className="text-[0.68rem] uppercase tracking-wider font-heading text-stone">Total Semester Marks</div>
                    <div className="font-heading font-bold text-xl md:text-2xl text-ember">
                      {currentSemester.totalMarks} <span className="text-xs font-normal text-stone">Marks</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex justify-center gap-2 mt-6">
                {(['all', 'Theory', 'Practical'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setFilterType(filter)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-lg text-xs font-medium font-heading transition-all border',
                      filterType === filter
                        ? 'bg-ink text-white border-ink'
                        : 'bg-white text-stone border-stone-lighter/80 hover:text-ink hover:border-stone',
                    )}
                  >
                    {filter === 'all' ? 'All Papers' : filter === 'Theory' ? 'Theory / Skill / Electives' : 'Practical Labs'}
                  </button>
                ))}
              </div>

              {/* Subject Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mt-6">
                {filteredSubjects.map((subject, i) => {
                  const badgeInfo = typeBadges[subject.type] || typeBadges.Theory;
                  const Icon = badgeInfo.icon;

                  return (
                    <motion.div
                      key={subject.code}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                      className={cn(
                        'flex flex-col justify-between p-4 md:p-5 rounded-2xl bg-white border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5',
                        subject.type === 'Practical' ? 'border-emerald-200/80 bg-emerald-50/20' : 'border-stone-lighter/90',
                      )}
                    >
                      <div>
                        {/* Top Code & Type */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-bold text-ink/70 px-2 py-0.5 bg-stone-100 rounded-md border border-stone-200">
                            {subject.code}
                          </span>
                          <span className={cn('inline-flex items-center gap-1 text-[0.68rem] font-semibold px-2 py-0.5 rounded-full border', badgeInfo.bg)}>
                            <Icon className="w-3 h-3" />
                            {subject.type}
                          </span>
                        </div>

                        {/* Subject Title */}
                        <h4 className="font-heading font-semibold text-ink text-base mt-3 leading-snug">
                          {subject.name}
                        </h4>

                        {/* Optional Note */}
                        {subject.note && (
                          <p className="text-xs text-ember font-medium mt-1.5 flex items-center gap-1">
                            <Info className="w-3 h-3 shrink-0" />
                            {subject.note}
                          </p>
                        )}
                      </div>

                      {/* Bottom Marks & Category */}
                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className={cn(
                          'text-[0.65rem] px-2 py-0.5 rounded-md border font-heading uppercase tracking-wide',
                          categoryColors[subject.category] || 'bg-gray-50 text-gray-700 border-gray-200',
                        )}>
                          {categoryLabels[subject.category] || subject.category}
                        </span>

                        <div className="font-mono font-medium text-stone">
                          Sem: <span className="text-ink font-semibold">{subject.examMarks}</span> + IA: <span className="text-ink font-semibold">{subject.iaMarks}</span> = <span className="font-bold text-ember">{subject.totalMarks}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Category Legend */}
        <RevealOnScroll delay={0.3}>
          <div className="flex flex-wrap justify-center gap-2 mt-12 pt-8 border-t border-stone-lighter/50 max-w-4xl mx-auto">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <span
                key={key}
                className={cn(
                  'inline-flex items-center gap-1.5 text-[0.65rem] px-2.5 py-1 rounded-full border',
                  categoryColors[key] || 'bg-gray-50 text-gray-700 border-gray-200',
                )}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                {label}
              </span>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
