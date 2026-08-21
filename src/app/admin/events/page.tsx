'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Badge, Card, EmptyState } from '@/components/ui';
import {
  Calendar, Plus, Search, Trash2, Edit2, MapPin,
  RefreshCw, X, Globe
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

interface EventItem {
  _id: string;
  title: string;
  slug: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  registrationLink?: string;
  coverImage?: { url: string };
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('seminar');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [imageUrl, setImageUrl] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/events');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setEvents(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setDate(new Date().toISOString().split('T')[0]);
    setTime('10:00 AM');
    setLocation('Auditorium / Campus');
    setCategory('seminar');
    setDescription('');
    setStatus('published');
    setImageUrl('');
    setRegistrationLink('');
    setModalOpen(true);
  };

  const openEditModal = (ev: EventItem) => {
    setEditingId(ev._id);
    setTitle(ev.title);
    setDate(ev.date ? new Date(ev.date).toISOString().split('T')[0] : '');
    setTime(ev.time || '');
    setLocation(ev.location);
    setCategory(ev.category || 'seminar');
    setDescription(ev.description || '');
    setStatus(ev.status === 'draft' ? 'draft' : 'published');
    setImageUrl(ev.coverImage?.url || '');
    setRegistrationLink(ev.registrationLink || '');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      date,
      time,
      location,
      category,
      description,
      status,
      coverImage: imageUrl ? { url: imageUrl, alt: title, publicId: 'custom' } : undefined,
      registrationLink: registrationLink || undefined,
    };

    try {
      if (editingId) {
        const res = await fetch('/api/admin/events', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        const json = await res.json();
        if (json.success) {
          fetchEvents();
          setModalOpen(false);
        }
      } else {
        const res = await fetch('/api/admin/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          fetchEvents();
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Failed to save event:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch(`/api/admin/events?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setEvents((prev) => prev.filter((e) => e._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete event:', err);
    }
  };

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-semibold text-2xl text-ink flex items-center gap-2">
            <Calendar className="w-6 h-6 text-violet-600" />
            Events Management
          </h1>
          <p className="text-sm text-stone mt-1">
            Create, publish, and manage college seminars, technical workshops, cultural days, and sports events.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={fetchEvents} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-1.5" /> Refresh
          </Button>
          <Button onClick={openCreateModal} size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> Add New Event
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card padding="sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-light" />
          <input
            type="text"
            placeholder="Search events by title, category, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-ember"
          />
        </div>
      </Card>

      {/* List / Grid */}
      {loading ? (
        <Card padding="lg" className="text-center py-12 text-stone">
          <RefreshCw className="w-8 h-8 animate-spin text-violet-600 mx-auto mb-2" />
          <p className="text-sm font-heading">Loading events from MongoDB...</p>
        </Card>
      ) : filtered.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<Calendar className="w-12 h-12 text-stone-300" />}
            title="No events found."
            description="Create an event to display on the public website."
            action={<Button onClick={openCreateModal} size="sm"><Plus className="w-4 h-4 mr-1.5" /> Add Event</Button>}
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
                  <span className="text-[0.65rem] font-heading font-semibold uppercase px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200">
                    {item.category}
                  </span>
                  <Badge variant={item.status === 'published' ? 'success' : 'default'}>
                    {item.status === 'published' ? 'Published' : 'Draft'}
                  </Badge>
                </div>

                <h3 className="font-heading font-semibold text-lg text-ink line-clamp-2 mt-2">
                  {item.title}
                </h3>

                <p className="text-xs text-stone mt-2 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 pt-3 border-t border-gray-100 space-y-1 text-xs text-stone font-heading">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-ember" />
                    <span>{formatDate(item.date)}</span>
                    {item.time && <span>• {item.time}</span>}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-ember" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                <Link
                  href={`/events/${item.slug}`}
                  target="_blank"
                  className="text-xs text-stone hover:text-ember flex items-center gap-1 font-heading font-medium"
                >
                  <Globe className="w-3.5 h-3.5" /> View Public
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 text-stone hover:text-ink hover:bg-stone-100 rounded-lg transition-colors"
                    title="Edit Event"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 text-stone-light hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="heading-md text-ink">
                {editingId ? 'Edit Event' : 'Create New Event'}
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
                label="Event Title"
                required
                placeholder="e.g. Annual Technical Symposium 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-1">
                    Event Date
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
                  label="Time"
                  placeholder="e.g. 10:00 AM - 4:00 PM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Location / Venue"
                  required
                  placeholder="e.g. College Auditorium"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <div>
                  <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:border-ember"
                  >
                    <option value="seminar">Seminar</option>
                    <option value="workshop">Workshop</option>
                    <option value="industry_visit">Industry Visit</option>
                    <option value="cultural">Cultural</option>
                    <option value="sports">Sports</option>
                    <option value="guest_lecture">Guest Lecture</option>
                    <option value="competition">Competition</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details about the event, speakers, schedule..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-ember"
                />
              </div>

              <Input
                label="Cover Image URL (Optional)"
                placeholder="https://... or /campus-front.png"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />

              <Input
                label="Registration Link (Optional)"
                placeholder="https://forms.google.com/..."
                value={registrationLink}
                onChange={(e) => setRegistrationLink(e.target.value)}
              />

              <div>
                <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-1">
                  Status
                </label>
                <div className="flex gap-4 text-sm font-heading">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="published"
                      checked={status === 'published'}
                      onChange={() => setStatus('published')}
                    />
                    Published (Visible to public)
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={status === 'draft'}
                      onChange={() => setStatus('draft')}
                    />
                    Draft (Hidden)
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Update Event' : 'Create Event'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
