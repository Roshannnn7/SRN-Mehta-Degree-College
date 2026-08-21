'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Card } from '@/components/ui';
import { Building2, Save, RefreshCw, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/utils';

export default function AdminCollegeInfoPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // College Info
  const [address, setAddress] = useState<string>(SITE_CONFIG.address);
  const [phone, setPhone] = useState<string>(SITE_CONFIG.phone);
  const [email, setEmail] = useState<string>('info@srnmehtacollege.com');
  const [timings, setTimings] = useState<string>('9:00 AM - 4:00 PM (Mon - Sat)');
  const [lat, setLat] = useState<string>(SITE_CONFIG.coordinates.lat.toString());
  const [lng, setLng] = useState<string>(SITE_CONFIG.coordinates.lng.toString());
  const [instagram, setInstagram] = useState<string>(SITE_CONFIG.instagram);
  const [youtube, setYoutube] = useState<string>(SITE_CONFIG.youtube);

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        if (d.address) setAddress(d.address);
        if (d.phone) setPhone(d.phone);
        if (d.email) setEmail(d.email);
        if (d.timings) setTimings(d.timings);
        if (d.mapCoordinates?.lat) setLat(d.mapCoordinates.lat.toString());
        if (d.mapCoordinates?.lng) setLng(d.mapCoordinates.lng.toString());
        if (d.socialLinks?.instagram) setInstagram(d.socialLinks.instagram);
        if (d.socialLinks?.youtube) setYoutube(d.socialLinks.youtube);
      }
    } catch (err) {
      console.error('Failed to load college info:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    const payload = {
      address,
      phone,
      email,
      timings,
      mapCoordinates: { lat: parseFloat(lat) || 17.3297, lng: parseFloat(lng) || 76.8343 },
      socialLinks: { instagram, youtube },
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
      console.error('Failed to save college info:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-semibold text-2xl text-ink flex items-center gap-2">
            <Building2 className="w-6 h-6 text-ember" />
            College Contact & Campus Details
          </h1>
          <p className="text-sm text-stone mt-1">
            Update campus address, phone numbers, working timings, map coordinates, and social media handles.
          </p>
        </div>
        <Button onClick={fetchInfo} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-1.5" /> Refresh
        </Button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-heading flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Campus details updated successfully!
        </div>
      )}

      {loading ? (
        <Card padding="lg" className="text-center py-12 text-stone">
          <RefreshCw className="w-8 h-8 animate-spin text-ember mx-auto mb-2" />
          <p className="text-sm font-heading">Loading campus info...</p>
        </Card>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <Card padding="lg" className="space-y-4">
            <h2 className="heading-md text-ink">Campus Address & Contacts</h2>
            <Input
              label="Full Campus Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="General Office Phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                label="Official Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Office Timings"
                required
                value={timings}
                onChange={(e) => setTimings(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Input
                label="Google Maps Latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
              <Input
                label="Google Maps Longitude"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
            </div>
          </Card>

          <Card padding="lg" className="space-y-4">
            <h2 className="heading-md text-ink">Social Media Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Instagram URL"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
              <Input
                label="YouTube Channel URL"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
              />
            </div>
          </Card>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="submit" size="lg" disabled={saving} className="min-w-[160px]">
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Campus Info'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
