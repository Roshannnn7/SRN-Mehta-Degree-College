'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Card, EmptyState } from '@/components/ui';
import {
  Users, Plus, Search, Trash2, Edit2, RefreshCw, X, Award, BookOpen
} from 'lucide-react';

interface FacultyItem {
  _id: string;
  name: string;
  designation: string;
  department: string;
  qualification?: string;
  bio?: string;
  photoUrl?: string;
  subjects?: string[];
  order?: number;
}

export default function AdminFacultyPage() {
  const [faculty, setFaculty] = useState<FacultyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [qualification, setQualification] = useState('');
  const [subjectsText, setSubjectsText] = useState('');
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [order, setOrder] = useState(0);
  const [saving, setSaving] = useState(false);

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/faculty');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setFaculty(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch faculty:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setName('');
    setDesignation('Assistant Professor');
    setQualification('MCA, M.Tech');
    setSubjectsText('Data Structures, Java Programming');
    setBio('');
    setPhotoUrl('');
    setOrder(faculty.length + 1);
    setModalOpen(true);
  };

  const openEditModal = (item: FacultyItem) => {
    setEditingId(item._id);
    setName(item.name);
    setDesignation(item.designation);
    setQualification(item.qualification || '');
    setSubjectsText(item.subjects?.join(', ') || '');
    setBio(item.bio || '');
    setPhotoUrl(item.photoUrl || '');
    setOrder(item.order || 0);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const subjects = subjectsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      name,
      designation,
      qualification,
      subjects,
      bio,
      photoUrl: photoUrl || undefined,
      order: Number(order) || 0,
      department: 'Computer Applications',
    };

    try {
      if (editingId) {
        const res = await fetch('/api/admin/faculty', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        const json = await res.json();
        if (json.success) {
          fetchFaculty();
          setModalOpen(false);
        }
      } else {
        const res = await fetch('/api/admin/faculty', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          fetchFaculty();
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Failed to save faculty:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this faculty member?')) return;
    try {
      const res = await fetch(`/api/admin/faculty?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setFaculty((prev) => prev.filter((f) => f._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete faculty:', err);
    }
  };

  const filtered = faculty.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.designation.toLowerCase().includes(search.toLowerCase()) ||
      f.qualification?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-semibold text-2xl text-ink flex items-center gap-2">
            <Users className="w-6 h-6 text-rose-600" />
            Faculty Directory
          </h1>
          <p className="text-sm text-stone mt-1">
            Manage professors, lecturers, lab instructors, qualifications, and teaching subjects.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={fetchFaculty} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-1.5" /> Refresh
          </Button>
          <Button onClick={openCreateModal} size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> Add Faculty Member
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card padding="sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-light" />
          <input
            type="text"
            placeholder="Search faculty by name, qualification, or designation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-ember"
          />
        </div>
      </Card>

      {/* List */}
      {loading ? (
        <Card padding="lg" className="text-center py-12 text-stone">
          <RefreshCw className="w-8 h-8 animate-spin text-rose-600 mx-auto mb-2" />
          <p className="text-sm font-heading">Loading faculty directory...</p>
        </Card>
      ) : filtered.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<Users className="w-12 h-12 text-stone-300" />}
            title="No faculty members added yet."
            description="Add faculty profiles to display on the college website."
            action={<Button onClick={openCreateModal} size="sm"><Plus className="w-4 h-4 mr-1.5" /> Add Faculty Member</Button>}
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
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-ink">{item.name}</h3>
                    <p className="text-xs text-ember font-heading font-medium mt-0.5">
                      {item.designation}
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 bg-stone-100 rounded text-stone">
                    #{item.order || 0}
                  </span>
                </div>

                {item.qualification && (
                  <div className="flex items-center gap-1 text-xs text-stone mt-2">
                    <Award className="w-3.5 h-3.5 text-ember" />
                    <span>{item.qualification}</span>
                  </div>
                )}

                {item.subjects && item.subjects.length > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center gap-1 text-[0.68rem] font-heading font-semibold text-stone uppercase tracking-wider mb-1">
                      <BookOpen className="w-3 h-3 text-stone-light" /> Teaches
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.subjects.map((sub, i) => (
                        <span
                          key={i}
                          className="text-[0.65rem] px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md border border-stone-200"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {item.bio && (
                  <p className="text-xs text-stone mt-3 line-clamp-2 leading-relaxed">
                    {item.bio}
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
                {editingId ? 'Edit Faculty Profile' : 'Add Faculty Member'}
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
                label="Full Name"
                required
                placeholder="e.g. Prof. Ramesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Designation"
                  required
                  placeholder="e.g. Assistant Professor / HOD"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
                <Input
                  label="Qualification"
                  placeholder="e.g. M.Sc (CS), Ph.D"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                />
              </div>

              <Input
                label="Subjects Taught (comma separated)"
                placeholder="e.g. C Programming, Operating Systems, Java"
                value={subjectsText}
                onChange={(e) => setSubjectsText(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Photo URL (Optional)"
                  placeholder="https://... or /faculty-1.jpg"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
                <Input
                  label="Display Order"
                  type="number"
                  placeholder="1, 2, 3..."
                  value={order.toString()}
                  onChange={(e) => setOrder(Number(e.target.value) || 0)}
                />
              </div>

              <div>
                <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-1">
                  Brief Bio / Academic Background
                </label>
                <textarea
                  rows={3}
                  placeholder="Short introduction, research interest, years of teaching..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-ember"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Update Faculty' : 'Add Faculty'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
