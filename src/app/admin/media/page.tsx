'use client';

import { useState, useRef } from 'react';
import { Button, Card, Badge } from '@/components/ui';
import {
  FolderOpen, Upload, Link as LinkIcon, CheckCircle2, Copy,
  Film, Image as ImageIcon, AlertCircle, RefreshCw
} from 'lucide-react';

interface MediaAsset {
  url: string;
  name: string;
  size?: string;
  type: 'image' | 'video';
  publicId?: string;
}

const presetMedia: MediaAsset[] = [
  { url: '/logo.png', name: 'College Official Logo', size: 'PNG', type: 'image' },
  { url: '/campus-front.png', name: 'Campus Building Front', size: 'PNG', type: 'image' },
  { url: '/campus-aerial.jpg', name: 'Campus Aerial View', size: 'JPG', type: 'image' },
  { url: '/admissions-poster.png', name: 'BCA Admissions Banner', size: 'PNG', type: 'image' },
];

export default function AdminMediaPage() {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState('');
  const [mediaList, setMediaList] = useState<MediaAsset[]>(presetMedia);
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    const isVid = customUrl.match(/\.(mp4|webm|ogg|mov)$/i) || customUrl.includes('/video/upload/');
    const newAsset: MediaAsset = {
      url: customUrl.trim(),
      name: `External Asset (${mediaList.length + 1})`,
      size: isVid ? 'VIDEO' : 'URL',
      type: isVid ? 'video' : 'image',
    };

    setMediaList((prev) => [newAsset, ...prev]);
    setCustomUrl('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'srn-mehta-college');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();

      if (json.success && json.data) {
        const isVid = json.data.resourceType === 'video' || file.type.startsWith('video/');
        const newAsset: MediaAsset = {
          url: json.data.url,
          name: json.data.originalName || file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          type: isVid ? 'video' : 'image',
          publicId: json.data.publicId,
        };

        setMediaList((prev) => [newAsset, ...prev]);
        setUploadSuccess(`Successfully uploaded "${file.name}" to Cloudinary!`);
        setTimeout(() => setUploadSuccess(null), 4000);
      } else {
        setUploadError(json.error || 'Failed to upload file to Cloudinary.');
      }
    } catch (err: unknown) {
      console.error('File upload failed:', err);
      setUploadError(err instanceof Error ? err.message : 'Network error during file upload.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const filtered = mediaList.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-semibold text-2xl text-ink flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-ember" />
            Media & Asset Library (Cloudinary)
          </h1>
          <p className="text-sm text-stone mt-1">
            Upload campus photos, lab banners, and tour videos to Cloudinary, or paste media URLs to use across all website modules.
          </p>
        </div>

        {/* Direct Upload Button */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,video/*"
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="shadow-sm"
          >
            {uploading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Uploading to Cloudinary...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" /> Upload Photo or Video
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {uploadSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-heading flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {uploadError && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-heading flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{uploadError}</p>
            <p className="text-xs text-amber-700 mt-1">
              Ensure your Cloudinary environment variables (<code className="px-1 bg-amber-100 rounded">CLOUDINARY_CLOUD_NAME</code>, <code className="px-1 bg-amber-100 rounded">CLOUDINARY_API_KEY</code>, <code className="px-1 bg-amber-100 rounded">CLOUDINARY_API_SECRET</code>) are configured in your <code className="px-1 bg-amber-100 rounded">.env.local</code>.
            </p>
          </div>
        </div>
      )}

      {/* Controls & Quick URL Add */}
      <Card padding="md" className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Type Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all ${
                filterType === 'all' ? 'bg-white text-ink shadow-sm' : 'text-stone hover:text-ink'
              }`}
            >
              All Assets ({mediaList.length})
            </button>
            <button
              onClick={() => setFilterType('image')}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all flex items-center gap-1 ${
                filterType === 'image' ? 'bg-white text-ink shadow-sm' : 'text-stone hover:text-ink'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Photos ({mediaList.filter((m) => m.type === 'image').length})
            </button>
            <button
              onClick={() => setFilterType('video')}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all flex items-center gap-1 ${
                filterType === 'video' ? 'bg-white text-ink shadow-sm' : 'text-stone hover:text-ink'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              Videos ({mediaList.filter((m) => m.type === 'video').length})
            </button>
          </div>

          {/* Quick Paste Form */}
          <form onSubmit={handleAddUrl} className="flex items-center gap-2 w-full sm:w-96">
            <div className="relative flex-1">
              <LinkIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-light" />
              <input
                type="text"
                placeholder="Or paste external image/video URL..."
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-ember"
              />
            </div>
            <Button type="submit" size="sm" variant="outline" className="h-8 text-xs shrink-0">
              Add URL
            </Button>
          </form>
        </div>
      </Card>

      {/* Grid of Assets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="h-44 bg-stone-900 relative overflow-hidden flex items-center justify-center">
              {item.type === 'video' ? (
                <video
                  src={item.url}
                  controls
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={item.url}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <span className="absolute top-2 right-2 text-[0.65rem] font-mono px-2 py-0.5 rounded-full bg-black/70 text-white backdrop-blur flex items-center gap-1">
                {item.type === 'video' ? <Film className="w-3 h-3 text-amber-400" /> : <ImageIcon className="w-3 h-3 text-emerald-400" />}
                {item.size || (item.type === 'video' ? 'VIDEO' : 'IMG')}
              </span>
            </div>

            <div className="p-3.5 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-heading font-semibold text-sm text-ink truncate">{item.name}</h4>
                  <Badge variant={item.type === 'video' ? 'ember' : 'default'}>
                    {item.type}
                  </Badge>
                </div>
                <p className="text-[0.65rem] text-stone font-mono truncate mt-1 select-all">{item.url}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => handleCopy(item.url)}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-heading font-medium bg-stone-50 hover:bg-ember hover:text-white transition-colors text-stone border border-stone-200"
                >
                  {copiedUrl === item.url ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 font-semibold">Copied URL!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy {item.type === 'video' ? 'Video' : 'Image'} URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
