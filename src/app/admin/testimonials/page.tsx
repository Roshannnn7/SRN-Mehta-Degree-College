'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Card, EmptyState } from '@/components/ui';
import {
  Quote, Plus, Search, Trash2, Edit2, RefreshCw, X, User
} from 'lucide-react';

interface TestimonialItem {
  _id: string;
  studentName: string;
  batch: string;
  course: string;
  quote: string;
  currentRole?: string;
  status: 'draft' | 'published';
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form
  const [studentName, setStudentName] = useState('');
  const [batch, setBatch] = useState('2023 - 2026');
  const [course, setCourse] = useState('BCA');
  const [quote, setQuote] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/testimonials');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setTestimonials(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setStudentName('');
    setBatch('Batch 2023-26');
    setCourse('BCA');
    setQuote('');
    setCurrentRole('Software Engineer / Student');
    setModalOpen(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingId(item._id);
    setStudentName(item.studentName);
    setBatch(item.batch);
    setCourse(item.course || 'BCA');
    setQuote(item.quote);
    setCurrentRole(item.currentRole || '');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      studentName,
      batch,
      course,
      quote,
      currentRole,
      status: 'published',
    };

    try {
      if (editingId) {
        const res = await fetch('/api/admin/testimonials', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        const json = await res.json();
        if (json.success) {
          fetchTestimonials();
          setModalOpen(false);
        }
      } else {
        const res = await fetch('/api/admin/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          fetchTestimonials();
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Failed to save testimonial:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setTestimonials((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete testimonial:', err);
    }
  };

  const filtered = testimonials.filter(
    (t) =>
      t.studentName.toLowerCase().includes(search.toLowerCase()) ||
      t.quote.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-semibold text-2xl text-ink flex items-center gap-2">
            <Quote className="w-6 h-6 text-ember" />
            Student & Alumni Testimonials
          </h1>
          <p className="text-sm text-stone mt-1">
            Manage student feedback, achievements, reviews, and alumni career journeys.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={fetchTestimonials} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-1.5" /> Refresh
          </Button>
          <Button onClick={openCreateModal} size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> Add Testimonial
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card padding="sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-light" />
          <input
            type="text"
            placeholder="Search testimonials by student name or quote keyword..."
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
          <p className="text-sm font-heading">Loading testimonials...</p>
        </Card>
      ) : filtered.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<Quote className="w-12 h-12 text-stone-300" />}
            title="No testimonials added yet."
            description="Add student reviews and quotes to display on the college homepage."
            action={<Button onClick={openCreateModal} size="sm"><Plus className="w-4 h-4 mr-1.5" /> Add Testimonial</Button>}
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
                <Quote className="w-7 h-7 text-ember-light mb-2" />
                <p className="text-sm text-stone leading-relaxed italic line-clamp-4">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-ink">{item.studentName}</h4>
                    <p className="text-[0.68rem] text-stone">
                      {item.course} • {item.batch}
                    </p>
                  </div>
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
                {editingId ? 'Edit Testimonial' : 'Add Student Testimonial'}
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
                label="Student Name"
                required
                placeholder="e.g. Abhishek Patil"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Batch / Year"
                  placeholder="e.g. Batch 2023-26"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                />
                <Input
                  label="Current Role / Higher Study"
                  placeholder="e.g. MCA Student at NIT"
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-1">
                  Testimonial Quote
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="What was their experience studying BCA at SRN Mehta Degree College..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-ember"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Update Testimonial' : 'Save Testimonial'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
