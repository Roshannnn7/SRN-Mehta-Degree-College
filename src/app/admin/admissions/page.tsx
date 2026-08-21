'use client';

import { useState, useEffect } from 'react';
import { Button, Badge, Card, EmptyState } from '@/components/ui';
import {
  GraduationCap, Search, Filter, Trash2, Eye, Phone, Mail,
  RefreshCw, X
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Enquiry {
  _id: string;
  studentName: string;
  parentName: string;
  phone: string;
  email: string;
  dob?: string;
  board?: string;
  stream?: string;
  percentage?: string;
  city?: string;
  contactPreference?: string;
  message?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  adminNotes?: string;
  createdAt: string;
}

export default function AdminAdmissionsPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/admissions');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setEnquiries(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch admissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdating(true);
    try {
      const res = await fetch('/api/admin/admissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === id ? { ...e, status: newStatus as Enquiry['status'] } : e))
        );
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus as Enquiry['status'] });
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry record?')) return;
    try {
      const res = await fetch(`/api/admin/admissions?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setEnquiries((prev) => prev.filter((e) => e._id !== id));
        if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error('Failed to delete enquiry:', err);
    }
  };

  const filtered = enquiries.filter((item) => {
    const matchesSearch =
      item.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      item.phone?.includes(search) ||
      item.email?.toLowerCase().includes(search.toLowerCase()) ||
      item.city?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="ember">New</Badge>;
      case 'read':
        return <Badge variant="warning">In Review</Badge>;
      case 'replied':
        return <Badge variant="success">Replied</Badge>;
      case 'archived':
        return <Badge variant="default">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-semibold text-2xl text-ink flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-ember" />
            Admission Enquiries
          </h1>
          <p className="text-sm text-stone mt-1">
            Manage student applications, contact preferences, and enrollment leads.
          </p>
        </div>
        <Button onClick={fetchEnquiries} variant="outline" size="sm" className="self-start sm:self-auto">
          <RefreshCw className="w-4 h-4 mr-1.5" />
          Refresh List
        </Button>
      </div>

      {/* Controls */}
      <Card padding="sm" className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-light" />
          <input
            type="text"
            placeholder="Search student, phone, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-ember focus:ring-1 focus:ring-ember"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-stone" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-ink focus:outline-none focus:border-ember"
          >
            <option value="all">All Statuses ({enquiries.length})</option>
            <option value="new">New ({enquiries.filter((e) => e.status === 'new').length})</option>
            <option value="read">In Review ({enquiries.filter((e) => e.status === 'read').length})</option>
            <option value="replied">Replied ({enquiries.filter((e) => e.status === 'replied').length})</option>
            <option value="archived">Archived ({enquiries.filter((e) => e.status === 'archived').length})</option>
          </select>
        </div>
      </Card>

      {/* Table / List */}
      {loading ? (
        <Card padding="lg" className="text-center py-12 text-stone">
          <RefreshCw className="w-8 h-8 animate-spin text-ember mx-auto mb-2" />
          <p className="text-sm font-heading">Loading enquiries from MongoDB...</p>
        </Card>
      ) : filtered.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<GraduationCap className="w-12 h-12 text-stone-300" />}
            title="No admission enquiries found."
            description={
              search || statusFilter !== 'all'
                ? 'Try adjusting your search or status filter.'
                : 'Admission enquiries submitted through the public form will appear here in real-time.'
            }
          />
        </Card>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-gray-200 text-xs font-heading font-semibold text-stone uppercase tracking-wider">
                  <th className="py-3 px-4">Student & Parent</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Academic Background</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-heading font-semibold text-ink">{item.studentName}</div>
                      {item.parentName && (
                        <div className="text-xs text-stone">Parent: {item.parentName}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs">
                      <a href={`tel:${item.phone}`} className="flex items-center gap-1 text-ink hover:text-ember">
                        <Phone className="w-3 h-3 text-ember" /> {item.phone}
                      </a>
                      <a href={`mailto:${item.email}`} className="flex items-center gap-1 text-stone hover:text-ember mt-0.5">
                        <Mail className="w-3 h-3 text-stone-light" /> {item.email}
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-stone">
                      <div>Stream: <span className="font-medium text-ink">{item.stream || '—'}</span></div>
                      <div>Board: {item.board || '—'} {item.percentage ? `(${item.percentage}%)` : ''}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-stone">{item.city || '—'}</td>
                    <td className="py-3.5 px-4 text-xs text-stone whitespace-nowrap">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(item.status)}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedEnquiry(item)}
                          className="h-8 px-2.5"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" /> View
                        </Button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-1.5 text-stone-light hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[0.65rem] font-mono text-stone uppercase tracking-wider">Admission Lead</span>
                <h3 className="heading-md text-ink mt-0.5">{selectedEnquiry.studentName}</h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-lg text-stone-light hover:text-ink hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div>
                <span className="text-stone font-heading">Parent/Guardian:</span>
                <p className="font-semibold text-ink mt-0.5">{selectedEnquiry.parentName || '—'}</p>
              </div>
              <div>
                <span className="text-stone font-heading">City/Town:</span>
                <p className="font-semibold text-ink mt-0.5">{selectedEnquiry.city || '—'}</p>
              </div>
              <div>
                <span className="text-stone font-heading">Phone:</span>
                <p className="font-semibold text-ink mt-0.5">{selectedEnquiry.phone}</p>
              </div>
              <div>
                <span className="text-stone font-heading">Email:</span>
                <p className="font-semibold text-ink mt-0.5 truncate">{selectedEnquiry.email}</p>
              </div>
              <div>
                <span className="text-stone font-heading">10+2 / PUC Stream:</span>
                <p className="font-semibold text-ink mt-0.5">{selectedEnquiry.stream || '—'}</p>
              </div>
              <div>
                <span className="text-stone font-heading">Board & Marks:</span>
                <p className="font-semibold text-ink mt-0.5">
                  {selectedEnquiry.board || '—'} {selectedEnquiry.percentage ? `(${selectedEnquiry.percentage}%)` : ''}
                </p>
              </div>
            </div>

            {selectedEnquiry.message && (
              <div>
                <h4 className="text-xs font-heading font-semibold text-stone uppercase tracking-wider mb-1">
                  Student Message / Queries
                </h4>
                <p className="text-sm text-ink bg-white p-3 rounded-lg border border-stone-200 whitespace-pre-line leading-relaxed">
                  {selectedEnquiry.message}
                </p>
              </div>
            )}

            <div>
              <label className="text-xs font-heading font-semibold text-stone uppercase tracking-wider block mb-2">
                Update Status
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['new', 'read', 'replied', 'archived'] as const).map((st) => (
                  <button
                    key={st}
                    disabled={updating}
                    onClick={() => handleStatusChange(selectedEnquiry._id, st)}
                    className={`py-2 text-xs font-heading font-medium rounded-lg border transition-all ${
                      selectedEnquiry.status === st
                        ? 'bg-ink text-white border-ink shadow-sm'
                        : 'bg-white text-stone border-stone-200 hover:border-ink hover:text-ink'
                    }`}
                  >
                    {st === 'new' ? 'New' : st === 'read' ? 'Reviewing' : st === 'replied' ? 'Replied' : 'Archive'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
              <Button variant="outline" onClick={() => setSelectedEnquiry(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
