'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Card, EmptyState } from '@/components/ui';
import {
  HelpCircle, Plus, Search, Trash2, Edit2, RefreshCw, X
} from 'lucide-react';

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  order?: number;
  status: 'draft' | 'published';
}

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [order, setOrder] = useState(0);
  const [saving, setSaving] = useState(false);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/faq');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setFaqs(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch FAQs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setQuestion('');
    setAnswer('');
    setOrder(faqs.length + 1);
    setModalOpen(true);
  };

  const openEditModal = (item: FAQItem) => {
    setEditingId(item._id);
    setQuestion(item.question);
    setAnswer(item.answer);
    setOrder(item.order || 0);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      question,
      answer,
      order: Number(order) || 0,
      status: 'published',
    };

    try {
      if (editingId) {
        const res = await fetch('/api/admin/faq', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        const json = await res.json();
        if (json.success) {
          fetchFaqs();
          setModalOpen(false);
        }
      } else {
        const res = await fetch('/api/admin/faq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          fetchFaqs();
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Failed to save FAQ:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      const res = await fetch(`/api/admin/faq?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setFaqs((prev) => prev.filter((f) => f._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete FAQ:', err);
    }
  };

  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-semibold text-2xl text-ink flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-indigo-600" />
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-sm text-stone mt-1">
            Manage common questions about admissions, fees, syllabus, eligibility, and facilities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={fetchFaqs} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-1.5" /> Refresh
          </Button>
          <Button onClick={openCreateModal} size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> Add FAQ
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card padding="sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-light" />
          <input
            type="text"
            placeholder="Search FAQs by question or answer keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-ember"
          />
        </div>
      </Card>

      {/* List */}
      {loading ? (
        <Card padding="lg" className="text-center py-12 text-stone">
          <RefreshCw className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-2" />
          <p className="text-sm font-heading">Loading FAQs...</p>
        </Card>
      ) : filtered.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<HelpCircle className="w-12 h-12 text-stone-300" />}
            title="No FAQs added yet."
            description="Add questions and answers to show on the public FAQ page."
            action={<Button onClick={openCreateModal} size="sm"><Plus className="w-4 h-4 mr-1.5" /> Add FAQ</Button>}
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col md:flex-row md:items-start justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono px-2 py-0.5 bg-stone-100 rounded text-stone">
                    #{item.order || 0}
                  </span>
                  <h3 className="font-heading font-semibold text-base text-ink">
                    {item.question}
                  </h3>
                </div>
                <p className="text-sm text-stone mt-2 leading-relaxed whitespace-pre-line pl-8">
                  {item.answer}
                </p>
              </div>

              <div className="flex items-center gap-1 self-end md:self-start shrink-0">
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
                {editingId ? 'Edit FAQ' : 'Add FAQ Question'}
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
                label="Question"
                required
                placeholder="e.g. What is the eligibility criteria for BCA admission?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />

              <div>
                <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-1">
                  Answer
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Clear and detailed answer to guide prospective students..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-ember"
                />
              </div>

              <Input
                label="Display Order"
                type="number"
                value={order.toString()}
                onChange={(e) => setOrder(Number(e.target.value) || 0)}
              />

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Update FAQ' : 'Save FAQ'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
