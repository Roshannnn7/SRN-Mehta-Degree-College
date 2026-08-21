'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Card, EmptyState } from '@/components/ui';
import {
  MapPin, Plus, Search, Trash2, Edit2, RefreshCw, X, Calendar
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface FieldTripItem {
  _id: string;
  title: string;
  date: string;
  location: string;
  purpose: string;
  description: string;
  faculty?: string[];
  outcomes?: string;
  status: 'draft' | 'published';
}

export default function AdminFieldTripsPage() {
  const [trips, setTrips] = useState<FieldTripItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [purpose, setPurpose] = useState('');
  const [description, setDescription] = useState('');
  const [outcomes, setOutcomes] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [saving, setSaving] = useState(false);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/field-trips');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setTrips(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch field trips:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setDate(new Date().toISOString().split('T')[0]);
    setLocation('');
    setPurpose('Industry Exposure & Practical Learning');
    setDescription('');
    setOutcomes('');
    setStatus('published');
    setModalOpen(true);
  };

  const openEditModal = (item: FieldTripItem) => {
    setEditingId(item._id);
    setTitle(item.title);
    setDate(item.date ? new Date(item.date).toISOString().split('T')[0] : '');
    setLocation(item.location);
    setPurpose(item.purpose || '');
    setDescription(item.description || '');
    setOutcomes(item.outcomes || '');
    setStatus(item.status === 'draft' ? 'draft' : 'published');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      date,
      location,
      purpose,
      description,
      outcomes,
      status,
    };

    try {
      if (editingId) {
        const res = await fetch('/api/admin/field-trips', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        const json = await res.json();
        if (json.success) {
          fetchTrips();
          setModalOpen(false);
        }
      } else {
        const res = await fetch('/api/admin/field-trips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          fetchTrips();
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Failed to save field trip:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this field trip?')) return;
    try {
      const res = await fetch(`/api/admin/field-trips?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setTrips((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete field trip:', err);
    }
  };

  const filtered = trips.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-semibold text-2xl text-ink flex items-center gap-2">
            <MapPin className="w-6 h-6 text-ember" />
            Field Trips & Industrial Visits
          </h1>
          <p className="text-sm text-stone mt-1">
            Record student industrial visits, technology exposure tours, and practical learning outcomes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={fetchTrips} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-1.5" /> Refresh
          </Button>
          <Button onClick={openCreateModal} size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> Add Field Trip
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card padding="sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-light" />
          <input
            type="text"
            placeholder="Search field trips by company name, location, or purpose..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-ember"
          />
        </div>
      </Card>

      {/* List */}
      {loading ? (
        <Card padding="lg" className="text-center py-12 text-stone">
          <RefreshCw className="w-8 h-8 animate-spin text-ember mx-auto mb-2" />
          <p className="text-sm font-heading">Loading field trips...</p>
        </Card>
      ) : filtered.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<MapPin className="w-12 h-12 text-stone-300" />}
            title="No field trips added yet."
            description="Add an industrial visit or study tour to display on the public field trips page."
            action={<Button onClick={openCreateModal} size="sm"><Plus className="w-4 h-4 mr-1.5" /> Add Field Trip</Button>}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-xs text-stone font-heading font-medium">
                    <Calendar className="w-3.5 h-3.5 text-ember" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <span className="text-xs text-stone bg-stone-100 px-2 py-0.5 rounded-full">
                    {item.status === 'published' ? 'Live' : 'Draft'}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-lg text-ink">{item.title}</h3>

                <div className="flex items-center gap-1.5 text-xs text-ember font-heading mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>

                {item.purpose && (
                  <p className="text-xs text-stone mt-2 font-medium">
                    Purpose: <span className="text-ink font-normal">{item.purpose}</span>
                  </p>
                )}

                {item.description && (
                  <p className="text-xs text-stone mt-2 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-1 pt-3 mt-4 border-t border-gray-100">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-1.5 text-stone hover:text-ink hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-1.5 text-stone-light hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="heading-md text-ink">
                {editingId ? 'Edit Field Trip' : 'Add Field Trip'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-light hover:text-ink hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <Input
                label="Trip Title"
                required
                placeholder="e.g. IT Park & Data Center Industrial Visit"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-1">
                    Trip Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-ember"
                  />
                </div>
                <Input
                  label="Destination / Location"
                  required
                  placeholder="e.g. Infosys Campus, Mysore"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <Input
                label="Visit Purpose"
                placeholder="e.g. Cloud Infrastructure and Enterprise Networking Study"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              />

              <div>
                <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Details of the tour, batch participants, itinerary..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-ember"
                />
              </div>

              <div>
                <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-1">
                  Learning Outcomes
                </label>
                <textarea
                  rows={2}
                  placeholder="Key takeaways, practical understanding acquired by students..."
                  value={outcomes}
                  onChange={(e) => setOutcomes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-ember"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Update Trip' : 'Save Field Trip'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
