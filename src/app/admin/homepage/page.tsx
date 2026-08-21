'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Card } from '@/components/ui';
import { Home, Save, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function AdminHomepageCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Hero Content
  const [headingLine1, setHeadingLine1] = useState('BUILD WHAT');
  const [headingLine2, setHeadingLine2] = useState('COMES NEXT.');
  const [subheading, setSubheading] = useState('Three years of BCA. A lifetime of building.');
  const [ctaPrimaryText, setCtaPrimaryText] = useState('Explore BCA');
  const [ctaPrimaryLink, setCtaPrimaryLink] = useState('/bca');
  const [ctaSecondaryText, setCtaSecondaryText] = useState('Apply Now');
  const [ctaSecondaryLink, setCtaSecondaryLink] = useState('/admissions');

  // Principal's Message
  const [principalName, setPrincipalName] = useState('Dr. S. R. Mehta');
  const [principalDesignation, setPrincipalDesignation] = useState('Principal & Academic Director');
  const [principalMessage, setPrincipalMessage] = useState(
    'Welcome to S.R.N. Mehta Degree College. Our mission is to impart world-class computer applications education equipped with the latest software development tools, industry ethics, and technological excellence.'
  );

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        if (d.heroContent) {
          if (d.heroContent.headingLine1) setHeadingLine1(d.heroContent.headingLine1);
          if (d.heroContent.headingLine2) setHeadingLine2(d.heroContent.headingLine2);
          if (d.heroContent.subheading) setSubheading(d.heroContent.subheading);
          if (d.heroContent.ctaPrimary?.text) setCtaPrimaryText(d.heroContent.ctaPrimary.text);
          if (d.heroContent.ctaPrimary?.link) setCtaPrimaryLink(d.heroContent.ctaPrimary.link);
          if (d.heroContent.ctaSecondary?.text) setCtaSecondaryText(d.heroContent.ctaSecondary.text);
          if (d.heroContent.ctaSecondary?.link) setCtaSecondaryLink(d.heroContent.ctaSecondary.link);
        }
        if (d.principalMessage) {
          if (d.principalMessage.name) setPrincipalName(d.principalMessage.name);
          if (d.principalMessage.designation) setPrincipalDesignation(d.principalMessage.designation);
          if (d.principalMessage.message) setPrincipalMessage(d.principalMessage.message);
        }
      }
    } catch (err) {
      console.error('Failed to load homepage content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    const payload = {
      heroContent: {
        headingLine1,
        headingLine2,
        subheading,
        ctaPrimary: { text: ctaPrimaryText, link: ctaPrimaryLink },
        ctaSecondary: { text: ctaSecondaryText, link: ctaSecondaryLink },
      },
      principalMessage: {
        name: principalName,
        designation: principalDesignation,
        message: principalMessage,
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
      console.error('Failed to save homepage content:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-semibold text-2xl text-ink flex items-center gap-2">
            <Home className="w-6 h-6 text-ember" />
            Homepage Content Management
          </h1>
          <p className="text-sm text-stone mt-1">
            Edit the hero showcase header, call-to-action buttons, and the Principal&apos;s welcome message.
          </p>
        </div>
        <Button onClick={fetchContent} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-1.5" /> Refresh
        </Button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-heading flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Homepage content updated successfully!
        </div>
      )}

      {loading ? (
        <Card padding="lg" className="text-center py-12 text-stone">
          <RefreshCw className="w-8 h-8 animate-spin text-ember mx-auto mb-2" />
          <p className="text-sm font-heading">Loading homepage content...</p>
        </Card>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Hero Section */}
          <Card padding="lg" className="space-y-4">
            <h2 className="heading-md text-ink">Hero Banner Content</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Headline Line 1"
                required
                value={headingLine1}
                onChange={(e) => setHeadingLine1(e.target.value)}
              />
              <Input
                label="Headline Line 2"
                required
                value={headingLine2}
                onChange={(e) => setHeadingLine2(e.target.value)}
              />
            </div>
            <Input
              label="Hero Subheading Description"
              required
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                <span className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block">
                  Primary Button
                </span>
                <Input
                  label="Button Text"
                  value={ctaPrimaryText}
                  onChange={(e) => setCtaPrimaryText(e.target.value)}
                />
                <Input
                  label="Button Link URL"
                  value={ctaPrimaryLink}
                  onChange={(e) => setCtaPrimaryLink(e.target.value)}
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                <span className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block">
                  Secondary Button
                </span>
                <Input
                  label="Button Text"
                  value={ctaSecondaryText}
                  onChange={(e) => setCtaSecondaryText(e.target.value)}
                />
                <Input
                  label="Button Link URL"
                  value={ctaSecondaryLink}
                  onChange={(e) => setCtaSecondaryLink(e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Principal's Message */}
          <Card padding="lg" className="space-y-4">
            <h2 className="heading-md text-ink">Principal&apos;s Welcome Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Principal Name"
                value={principalName}
                onChange={(e) => setPrincipalName(e.target.value)}
              />
              <Input
                label="Designation"
                value={principalDesignation}
                onChange={(e) => setPrincipalDesignation(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-1">
                Message Content
              </label>
              <textarea
                rows={4}
                value={principalMessage}
                onChange={(e) => setPrincipalMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-ember"
              />
            </div>
          </Card>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="submit" size="lg" disabled={saving} className="min-w-[160px]">
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Homepage'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
