'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Card } from '@/components/ui';
import { Settings, Save, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Settings state
  const [collegeName, setCollegeName] = useState('S.R.N. Mehta Degree College');
  const [tagline, setTagline] = useState('We Teach Them, They Serve The Nation');
  const [academicYear, setAcademicYear] = useState('2026-27');
  const [admissionStatus, setAdmissionStatus] = useState<'open' | 'closed' | 'coming_soon'>('open');
  const [eligibility, setEligibility] = useState('10+2 / PUC in Any Stream (Arts, Commerce, Science)');
  const [instructions, setInstructions] = useState('Fill in all required fields and submit your academic documents.');
  const [contactPerson, setContactPerson] = useState('Admissions Incharge');
  const [contactPhone, setContactPhone] = useState('+91 99000 00000');
  const [contactEmail, setContactEmail] = useState('admissions@srnmehtacollege.com');

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      const json = await res.json();
      if (json.success && json.data) {
        const s = json.data;
        if (s.collegeName) setCollegeName(s.collegeName);
        if (s.tagline) setTagline(s.tagline);
        if (s.admissionStatus) setAdmissionStatus(s.admissionStatus);
        if (s.admissionConfig) {
          if (s.admissionConfig.academicYear) setAcademicYear(s.admissionConfig.academicYear);
          if (s.admissionConfig.eligibility) setEligibility(s.admissionConfig.eligibility);
          if (s.admissionConfig.instructions) setInstructions(s.admissionConfig.instructions);
          if (s.admissionConfig.contactPerson) setContactPerson(s.admissionConfig.contactPerson);
          if (s.admissionConfig.contactPhone) setContactPhone(s.admissionConfig.contactPhone);
          if (s.admissionConfig.contactEmail) setContactEmail(s.admissionConfig.contactEmail);
        }
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    const payload = {
      collegeName,
      tagline,
      admissionStatus,
      admissionConfig: {
        academicYear,
        eligibility,
        instructions,
        contactPerson,
        contactPhone,
        contactEmail,
      },
    };

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-semibold text-2xl text-ink flex items-center gap-2">
            <Settings className="w-6 h-6 text-stone" />
            General & Admissions Settings
          </h1>
          <p className="text-sm text-stone mt-1">
            Toggle admissions status, update current academic year, and configure global website metadata.
          </p>
        </div>
        <Button onClick={fetchSettings} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-1.5" /> Refresh
        </Button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-heading flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Settings have been saved successfully to MongoDB!
        </div>
      )}

      {loading ? (
        <Card padding="lg" className="text-center py-12 text-stone">
          <RefreshCw className="w-8 h-8 animate-spin text-ember mx-auto mb-2" />
          <p className="text-sm font-heading">Loading settings...</p>
        </Card>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Admissions Control Card */}
          <Card padding="lg" className="space-y-4">
            <h2 className="heading-md text-ink">Admissions Portal Controls</h2>

            <div>
              <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-2">
                Admissions Status
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'open', label: 'Open', desc: 'Accepting online enquiry submissions' },
                  { value: 'coming_soon', label: 'Coming Soon', desc: 'Announcing upcoming intake' },
                  { value: 'closed', label: 'Closed', desc: 'Admissions currently inactive' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setAdmissionStatus(item.value as typeof admissionStatus)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      admissionStatus === item.value
                        ? 'border-ember bg-ember-light/20 ring-1 ring-ember text-ink'
                        : 'border-gray-200 bg-white hover:border-stone text-stone'
                    }`}
                  >
                    <div className="font-heading font-semibold text-sm capitalize">{item.label}</div>
                    <div className="text-xs text-stone mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Input
                label="Target Academic Year"
                required
                placeholder="2026-27"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
              />
              <Input
                label="Eligibility Summary"
                required
                placeholder="10+2 / PUC Passed in Any Stream"
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Admission Contact Person"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
              />
              <Input
                label="Admissions Phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
              <Input
                label="Admissions Email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
          </Card>

          {/* College Identity Card */}
          <Card padding="lg" className="space-y-4">
            <h2 className="heading-md text-ink">College Identity</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="College Name"
                required
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
              />
              <Input
                label="Motto / Tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>
          </Card>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="submit" size="lg" disabled={saving} className="min-w-[160px]">
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
