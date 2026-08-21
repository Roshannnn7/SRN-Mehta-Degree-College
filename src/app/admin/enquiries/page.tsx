'use client';

import { useState, useEffect } from 'react';
import { Button, Badge, Card, EmptyState } from '@/components/ui';
import {
  MessageSquare, Search, Filter, Trash2, Eye, Mail,
  RefreshCw, X, CheckCheck
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ContactMsg {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  adminNotes?: string;
  createdAt: string;
}

export default function AdminEnquiriesPage() {
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMsg, setSelectedMsg] = useState<ContactMsg | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/enquiries');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setMessages(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch contact messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, status: newStatus as ContactMsg['status'] } : m))
        );
        if (selectedMsg && selectedMsg._id === id) {
          setSelectedMsg({ ...selectedMsg, status: newStatus as ContactMsg['status'] });
        }
      }
    } catch (err) {
      console.error('Failed to update message status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/admin/enquiries?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        if (selectedMsg?._id === id) setSelectedMsg(null);
      }
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  const filtered = messages.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase()) ||
      item.subject?.toLowerCase().includes(search.toLowerCase()) ||
      item.message?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-semibold text-2xl text-ink flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-emerald-600" />
            Contact Enquiries & Messages
          </h1>
          <p className="text-sm text-stone mt-1">
            General inquiries, campus visit requests, and contact submissions from the public website.
          </p>
        </div>
        <Button onClick={fetchMessages} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-1.5" />
          Refresh
        </Button>
      </div>

      {/* Filter bar */}
      <Card padding="sm" className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-light" />
          <input
            type="text"
            placeholder="Search name, email, subject..."
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
            <option value="all">All Messages ({messages.length})</option>
            <option value="new">Unread / New ({messages.filter((m) => m.status === 'new').length})</option>
            <option value="read">Read ({messages.filter((m) => m.status === 'read').length})</option>
            <option value="replied">Replied ({messages.filter((m) => m.status === 'replied').length})</option>
            <option value="archived">Archived ({messages.filter((m) => m.status === 'archived').length})</option>
          </select>
        </div>
      </Card>

      {/* Messages List */}
      {loading ? (
        <Card padding="lg" className="text-center py-12 text-stone">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-2" />
          <p className="text-sm font-heading">Loading messages...</p>
        </Card>
      ) : filtered.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<MessageSquare className="w-12 h-12 text-stone-300" />}
            title="No contact messages found."
            description="Messages submitted via the contact form on the website will appear here in real-time."
          />
        </Card>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-gray-200 text-xs font-heading font-semibold text-stone uppercase tracking-wider">
                  <th className="py-3 px-4">Sender</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Preview</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((msg) => (
                  <tr
                    key={msg._id}
                    className={`hover:bg-stone-50/70 transition-colors ${
                      msg.status === 'new' ? 'bg-emerald-50/30 font-medium' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-heading font-semibold text-ink">{msg.name}</div>
                      <div className="text-xs text-stone font-mono">{msg.email}</div>
                      {msg.phone && <div className="text-xs text-stone">{msg.phone}</div>}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-ink max-w-[200px] truncate">
                      {msg.subject}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-stone max-w-[280px] truncate">
                      {msg.message}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-stone whitespace-nowrap">
                      {formatDate(msg.createdAt)}
                    </td>
                    <td className="py-3.5 px-4">
                      {msg.status === 'new' ? (
                        <Badge variant="ember">New</Badge>
                      ) : msg.status === 'read' ? (
                        <Badge variant="warning">Read</Badge>
                      ) : msg.status === 'replied' ? (
                        <Badge variant="success">Replied</Badge>
                      ) : (
                        <Badge variant="default">Archived</Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedMsg(msg);
                            if (msg.status === 'new') handleStatusChange(msg._id, 'read');
                          }}
                          className="h-8 px-2.5"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" /> Open
                        </Button>
                        <button
                          onClick={() => handleDelete(msg._id)}
                          className="p-1.5 text-stone-light hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Message"
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

      {/* View Message Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[0.65rem] font-mono text-stone uppercase tracking-wider">
                  Contact Message • {formatDate(selectedMsg.createdAt)}
                </span>
                <h3 className="heading-md text-ink mt-0.5">{selectedMsg.subject}</h3>
              </div>
              <button
                onClick={() => setSelectedMsg(null)}
                className="p-1.5 rounded-lg text-stone-light hover:text-ink hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs space-y-1">
              <div className="font-semibold text-ink text-sm">{selectedMsg.name}</div>
              <div className="text-stone">
                Email:{' '}
                <a href={`mailto:${selectedMsg.email}`} className="text-ember font-mono hover:underline">
                  {selectedMsg.email}
                </a>
              </div>
              {selectedMsg.phone && (
                <div className="text-stone">
                  Phone:{' '}
                  <a href={`tel:${selectedMsg.phone}`} className="text-ink font-mono">
                    {selectedMsg.phone}
                  </a>
                </div>
              )}
            </div>

            <div>
              <h4 className="text-xs font-heading font-semibold text-stone uppercase tracking-wider mb-1.5">
                Message Body
              </h4>
              <div className="bg-white p-4 rounded-xl border border-stone-200 text-sm text-ink leading-relaxed whitespace-pre-line">
                {selectedMsg.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-200">
              <div className="flex gap-1.5">
                <button
                  onClick={() => handleStatusChange(selectedMsg._id, 'replied')}
                  className="px-3 py-1.5 rounded-lg text-xs font-heading font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1"
                >
                  <CheckCheck className="w-3.5 h-3.5" /> Mark as Replied
                </button>
                <button
                  onClick={() => handleStatusChange(selectedMsg._id, 'archived')}
                  className="px-3 py-1.5 rounded-lg text-xs font-heading font-medium bg-stone-100 text-stone hover:bg-stone-200"
                >
                  Archive
                </button>
              </div>

              <a
                href={`mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(selectedMsg.subject)}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-white rounded-lg text-xs font-heading font-medium hover:bg-ember transition-colors"
              >
                <Mail className="w-3.5 h-3.5" /> Reply by Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
