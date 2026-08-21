'use client';

import { useState } from 'react';
import { Button, Input, Card, Badge } from '@/components/ui';
import { BookOpen, CheckCircle2, Save, Info } from 'lucide-react';
import { BCA_CURRICULUM } from '@/lib/utils';

export default function AdminBCAContentPage() {
  const [affiliation, setAffiliation] = useState('Gulbarga University, Kalaburagi');
  const [duration, setDuration] = useState('3 Years / 6 Semesters');
  const [eligibility, setEligibility] = useState('10+2 / PUC Passed in Any Stream (Science, Commerce, Arts)');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-semibold text-2xl text-ink flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-ember" />
            BCA Program & Syllabus Scheme
          </h1>
          <p className="text-sm text-stone mt-1">
            Bachelor of Computer Applications curriculum structure (Gulbarga University Kalaburagi scheme w.e.f 2024-25).
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-heading flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          BCA Program details updated successfully!
        </div>
      )}

      {/* Program Summary Settings */}
      <form onSubmit={handleSave}>
        <Card padding="lg" className="space-y-4">
          <h2 className="heading-md text-ink">Program Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="University Affiliation"
              required
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
            />
            <Input
              label="Course Duration"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <Input
              label="Eligibility"
              required
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" size="sm">
              <Save className="w-4 h-4 mr-1.5" /> Save Program Info
            </Button>
          </div>
        </Card>
      </form>

      {/* Syllabus Scheme Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="heading-md text-ink">Active University Syllabus (6 Semesters)</h2>
          <span className="text-xs font-heading font-semibold px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full">
            Total 3,950 Marks
          </span>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-900">
          <Info className="w-4 h-4 text-ember shrink-0 mt-0.5" />
          <span>
            <strong>Language Policy:</strong> In Semesters I to IV, <strong>Language-1T (MIL-1)</strong> is optional: students can select either <strong>Kannada</strong> or <strong>Hindi</strong>. English-1 is compulsory.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BCA_CURRICULUM.map((sem) => (
            <Card key={sem.number} padding="md" className="space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div>
                  <span className="text-xs font-mono font-bold text-ember">Sem {sem.number}</span>
                  <h3 className="font-heading font-semibold text-sm text-ink">{sem.title}</h3>
                </div>
                <Badge variant="default">{sem.totalMarks} Marks</Badge>
              </div>

              <div className="space-y-1.5 text-xs">
                {sem.subjects.map((sub) => (
                  <div
                    key={sub.code}
                    className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-100"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.65rem] text-stone-500 px-1 bg-white rounded border">
                        {sub.code}
                      </span>
                      <span className="font-medium text-ink">{sub.name}</span>
                    </div>
                    <span className="font-mono text-stone">
                      {sub.totalMarks}M
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
