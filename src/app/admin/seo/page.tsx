'use client';

import { useState } from 'react';
import { Button, Input, Card } from '@/components/ui';
import { Search, Save, CheckCircle2, Globe } from 'lucide-react';

const pagesList = [
  { slug: 'home', title: 'Home | S.R.N. Mehta Degree College — BCA in Kalaburagi', desc: 'S.R.N. Mehta Degree College offers a premier 3-year BCA program affiliated to Gulbarga University in Kalaburagi, Karnataka.' },
  { slug: 'bca', title: 'BCA Program & Syllabus | S.R.N. Mehta Degree College', desc: 'Explore the 3-year Bachelor of Computer Applications curriculum, software labs, AI, cloud computing, and career pathways.' },
  { slug: 'admissions', title: 'BCA Admissions 2026-27 | S.R.N. Mehta Degree College', desc: 'Apply online for BCA admissions at S.R.N. Mehta Degree College. Eligibility: 10+2 / PUC passed in any stream.' },
  { slug: 'campus', title: 'Campus & Facilities | S.R.N. Mehta Degree College', desc: 'Discover smart classrooms, high-performance computer laboratories, digital library, auditorium, and transport facilities.' },
  { slug: 'events', title: 'Events & Activities | S.R.N. Mehta Degree College', desc: 'Stay updated with seminars, guest lectures, technical workshops, NSS activities, and cultural festivals.' },
  { slug: 'gallery', title: 'Photo Gallery | S.R.N. Mehta Degree College', desc: 'Browse campus photography, computer lab sessions, student events, and industrial visits.' },
  { slug: 'contact', title: 'Contact Us | S.R.N. Mehta Degree College', desc: 'Get in touch with S.R.N. Mehta Degree College on University Road, Kalaburagi. Call, email, or visit our admissions desk.' },
];

export default function AdminSEOPage() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [pageMeta, setPageMeta] = useState(
    pagesList.reduce((acc, p) => {
      acc[p.slug] = { title: p.title, desc: p.desc, keywords: 'BCA, Computer Applications, Kalaburagi, Degree College, Gulbarga University' };
      return acc;
    }, {} as Record<string, { title: string; desc: string; keywords: string }>)
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const current = pageMeta[selectedPage] || { title: '', desc: '', keywords: '' };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-semibold text-2xl text-ink flex items-center gap-2">
            <Search className="w-6 h-6 text-ember" />
            Search Engine Optimization (SEO)
          </h1>
          <p className="text-sm text-stone mt-1">
            Configure Google search titles, meta descriptions, and keywords for every public page.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-heading flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          SEO tags saved successfully!
        </div>
      )}

      {/* Page Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {pagesList.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setSelectedPage(p.slug)}
            className={`px-3.5 py-2 rounded-xl text-xs font-heading font-semibold capitalize whitespace-nowrap transition-all border ${
              selectedPage === p.slug
                ? 'bg-ink text-white border-ink shadow-sm'
                : 'bg-white text-stone border-gray-200 hover:border-ink hover:text-ink'
            }`}
          >
            {p.slug === 'home' ? 'Homepage' : `/${p.slug}`}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSave}>
        <Card padding="lg" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone pb-2 border-b border-gray-100">
            <Globe className="w-4 h-4 text-ember" />
            Editing Meta for: <span className="font-bold text-ink">/{selectedPage === 'home' ? '' : selectedPage}</span>
          </div>

          <Input
            label="Page Title (60-70 characters)"
            required
            value={current.title}
            onChange={(e) =>
              setPageMeta((prev) => ({
                ...prev,
                [selectedPage]: { ...prev[selectedPage], title: e.target.value },
              }))
            }
          />

          <div>
            <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-1">
              Meta Description (150-160 characters)
            </label>
            <textarea
              rows={3}
              required
              value={current.desc}
              onChange={(e) =>
                setPageMeta((prev) => ({
                  ...prev,
                  [selectedPage]: { ...prev[selectedPage], desc: e.target.value },
                }))
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-ember"
            />
          </div>

          <Input
            label="Target Keywords (comma separated)"
            value={current.keywords}
            onChange={(e) =>
              setPageMeta((prev) => ({
                ...prev,
                [selectedPage]: { ...prev[selectedPage], keywords: e.target.value },
              }))
            }
          />

          {/* Search Result Preview */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
            <span className="text-[0.65rem] font-heading font-semibold text-stone uppercase tracking-wider block">
              Google Search Result Snippet Preview
            </span>
            <div className="text-blue-700 text-base font-medium hover:underline cursor-pointer truncate">
              {current.title}
            </div>
            <div className="text-emerald-700 text-xs font-mono">
              https://srnmehtacollege.com/{selectedPage === 'home' ? '' : selectedPage}
            </div>
            <div className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
              {current.desc}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" size="md">
              <Save className="w-4 h-4 mr-1.5" /> Save SEO Settings
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
