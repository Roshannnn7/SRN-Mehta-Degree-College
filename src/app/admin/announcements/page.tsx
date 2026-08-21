'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Badge, Card, EmptyState } from '@/components/ui';
import {
  Megaphone, Plus, Search, Trash2, Edit2,
  RefreshCw, X, Calendar
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface AnnouncementItem {
  _id: string;
  title: string;
  content: string;
  type: string;
  priority: 'normal' | 'high' | 'urgent';
  publishDate: string;
  expiryDate?: string;
  status: 'draft' | 'published';
}

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('general');
  const [priority, setPriority] = useState<'normal' | 'high' | 'urgent'>('normal');
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [saving, setSaving] = useState(false);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/announcements');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setAnnouncements(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setType('general');
    setPriority('normal');
    setStatus('published');
    setModalOpen(true);
  };

  const openEditModal = (item: AnnouncementItem) => {
    setEditingId(item._id);
    setTitle(item.title);
    setContent(item.content);
    setType(item.type || 'general');
    setPriority(item.priority || 'normal');
    setStatus(item.status === 'draft' ? 'draft' : 'published');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      content,
      type,
      priority,
      status,
      publishDate: new Date().toISOString(),
    };

    try {
      if (editingId) {
        const res = await fetch('/api/admin/announcements', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        const json = await res.json();
        if (json.success) {
          fetchAnnouncements();
          setModalOpen(false);
        }
      } else {
        const res = await fetch('/api/admin/announcements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          fetchAnnouncements();
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Failed to save announcement:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    try {
      const res = await fetch(`/api/admin/announcements?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setAnnouncements((prev) => prev.filter((a) => a._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete announcement:', err);
    }
  };

  const filtered = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase()) ||
      a.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-semibold text-2xl text-ink flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-teal-600" />
            Announcements & Circulars
          </h1>
          <p className="text-sm text-stone mt-1">
            Publish official circulars, exam schedules, holidays, and urgent campus alerts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={fetchAnnouncements} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-1.5" /> Refresh
          </Button>
          <Button onClick={openCreateModal} size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> Post Announcement
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card padding="sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-light" />
          <input
            type="text"
            placeholder="Search circulars by title, keyword, or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-ember"
          />
        </div>
      </Card>

      {/* List */}
      {loading ? (
        <Card padding="lg" className="text-center py-12 text-stone">
          <RefreshCw className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-2" />
          <p className="text-sm font-heading">Loading announcements...</p>
        </Card>
      ) : filtered.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<Megaphone className="w-12 h-12 text-stone-300" />}
            title="No announcements found."
            description="Create an announcement to show on the public notices board."
            action={<Button onClick={openCreateModal} size="sm"><Plus className="w-4 h-4 mr-1.5" /> Post Announcement</Button>}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              className={`bg-white rounded-2xl border p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow ${
                item.priority === 'urgent'
                  ? 'border-red-200 bg-red-50/10'
                  : item.priority === 'high'
                  ? 'border-amber-200'
                  : 'border-gray-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[0.65rem] font-heading font-semibold uppercase px-2.5 py-0.5 rounded-full bg-stone-100 text-stone">
                    {item.type}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {item.priority === 'urgent' && (
                      <span className="text-[0.65rem] font-heading font-bold uppercase px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                        Urgent
                      </span>
                    )}
                    <Badge variant={item.status === 'published' ? 'success' : 'default'}>
                      {item.status === 'published' ? 'Live' : 'Draft'}
                    </Badge>
                  </div>
                </div>

                <h3 className="font-heading font-semibold text-base text-ink mt-2">
                  {item.title}
                </h3>

                <p className="text-xs text-stone mt-2 line-clamp-4 leading-relaxed whitespace-pre-line">
                  {item.content}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-100 text-xs text-stone font-heading">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-ember" />
                  <span>{formatDate(item.publishDate)}</span>
                </div>

                <div className="flex items-center gap-1">
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
                {editingId ? 'Edit Announcement' : 'Post Announcement'}
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
                label="Circular Title"
                required
                placeholder="e.g. Commencement of Odd Semester Classes"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-1">
                    Category Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:border-ember"
                  >
                    <option value="general">General</option>
                    <option value="admission">Admissions</option>
                    <option value="exam">Examination</option>
                    <option value="holiday">Holiday</option>
                    <option value="event">Events</option>
                    <option value="workshop">Workshop</option>
                    <option value="result">Results</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-1">
                    Priority Alert
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as 'normal' | 'high' | 'urgent')}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:border-ember"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent Alert</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-1">
                  Circular Content
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Full circular notification details for students and staff..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-ember"
                />
              </div>

              <div>
                <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-1">
                  Visibility Status
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
                    Live (Public)
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={status === 'draft'}
                      onChange={() => setStatus('draft')}
                    />
                    Draft
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Update Notice' : 'Publish Notice'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
