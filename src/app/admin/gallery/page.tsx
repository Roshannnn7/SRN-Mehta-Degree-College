'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Card, EmptyState, Badge } from '@/components/ui';
import {
  Image as ImageIcon, Plus, Search, Trash2, Edit2, RefreshCw, X, Star
} from 'lucide-react';

interface MediaItem {
  url: string;
  publicId: string;
  alt: string;
  caption?: string;
}

interface Album {
  _id: string;
  title: string;
  category: string;
  images: MediaItem[];
  featured: boolean;
  order?: number;
  status: 'draft' | 'published';
}

export default function AdminGalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('campus');
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/gallery');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setAlbums(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setCategory('campus');
    setFeatured(false);
    setStatus('published');
    setImageUrl('');
    setImageCaption('');
    setModalOpen(true);
  };

  const openEditModal = (item: Album) => {
    setEditingId(item._id);
    setTitle(item.title);
    setCategory(item.category || 'campus');
    setFeatured(item.featured || false);
    setStatus(item.status === 'draft' ? 'draft' : 'published');
    setImageUrl(item.images?.[0]?.url || '');
    setImageCaption(item.images?.[0]?.caption || '');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const images = imageUrl
      ? [{ url: imageUrl, publicId: 'custom', alt: title, caption: imageCaption }]
      : [];

    const payload = {
      title,
      category,
      featured,
      status,
      images,
    };

    try {
      if (editingId) {
        const res = await fetch('/api/admin/gallery', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        const json = await res.json();
        if (json.success) {
          fetchAlbums();
          setModalOpen(false);
        }
      } else {
        const res = await fetch('/api/admin/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          fetchAlbums();
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Failed to save gallery album:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery album?')) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setAlbums((prev) => prev.filter((a) => a._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete album:', err);
    }
  };

  const filtered = albums.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-semibold text-2xl text-ink flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-amber-600" />
            Photo Gallery Albums
          </h1>
          <p className="text-sm text-stone mt-1">
            Organize campus photography, event photos, student activities, and lab facilities into albums.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={fetchAlbums} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-1.5" /> Refresh
          </Button>
          <Button onClick={openCreateModal} size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> Create Album
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card padding="sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-light" />
          <input
            type="text"
            placeholder="Search albums by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-ember"
          />
        </div>
      </Card>

      {/* Grid */}
      {loading ? (
        <Card padding="lg" className="text-center py-12 text-stone">
          <RefreshCw className="w-8 h-8 animate-spin text-amber-600 mx-auto mb-2" />
          <p className="text-sm font-heading">Loading albums...</p>
        </Card>
      ) : filtered.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<ImageIcon className="w-12 h-12 text-stone-300" />}
            title="No gallery albums created yet."
            description="Create an album with images to show on the public gallery page."
            action={<Button onClick={openCreateModal} size="sm"><Plus className="w-4 h-4 mr-1.5" /> Create Album</Button>}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              {item.images?.[0]?.url ? (
                <div className="h-44 bg-stone-100 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.images[0].url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {item.featured && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[0.65rem] font-heading font-semibold flex items-center gap-1 shadow">
                      <Star className="w-3 h-3 fill-current" /> Featured
                    </span>
                  )}
                </div>
              ) : (
                <div className="h-40 bg-stone-100 flex items-center justify-center text-stone-300">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[0.65rem] font-heading font-semibold uppercase px-2.5 py-0.5 rounded-full bg-stone-100 text-stone">
                      {item.category}
                    </span>
                    <Badge variant={item.status === 'published' ? 'success' : 'default'}>
                      {item.status === 'published' ? 'Public' : 'Draft'}
                    </Badge>
                  </div>

                  <h3 className="font-heading font-semibold text-base text-ink">{item.title}</h3>
                  {item.images?.[0]?.caption && (
                    <p className="text-xs text-stone mt-1">{item.images[0].caption}</p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-100">
                  <span className="text-xs text-stone font-heading">
                    {item.images?.length || 0} photo{item.images?.length === 1 ? '' : 's'}
                  </span>

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
                {editingId ? 'Edit Album' : 'Create Gallery Album'}
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
                label="Album Title"
                required
                placeholder="e.g. Computer Science Lab & Campus Aerial"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                  <option value="campus">Campus</option>
                  <option value="labs">Computer Labs</option>
                  <option value="events">Events & Functions</option>
                  <option value="field_trips">Field Trips & Industry Visits</option>
                  <option value="students">Students & Life</option>
                  <option value="cultural">Cultural</option>
                  <option value="sports">Sports</option>
                </select>
              </div>

              <Input
                label="Image URL"
                required
                placeholder="/campus-aerial.jpg or https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />

              <Input
                label="Caption / Description (Optional)"
                placeholder="Brief caption for this photo..."
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
              />

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm font-heading cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 accent-ember rounded"
                  />
                  Featured in Homepage Gallery
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Update Album' : 'Create Album'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
