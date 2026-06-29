import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { Search, Loader2, Trash2, Edit, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Enquiry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
  status: 'pending' | 'contacted' | 'completed';
  createdAt: any;
  note?: string;
}

function NoteCell({ enquiry, onSave, onView }: { enquiry: Enquiry, onSave: (id: string, note: string) => Promise<void>, onView: (content: string) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(enquiry.note || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsEditing(false);
    if (note.trim() === (enquiry.note || '').trim()) return; // No change
    setIsSaving(true);
    try {
      await onSave(enquiry.id, note.trim());
      alert('Note saved successfully!');
    } catch (error) {
      alert('Failed to save note.');
      setNote(enquiry.note || ''); // Revert on failure
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex flex-col gap-1 w-48">
        <div className="relative">
          <input
            type="text"
            autoFocus
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 60))}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
              if (e.key === 'Escape') {
                setNote(enquiry.note || '');
                setIsEditing(false);
              }
            }}
            disabled={isSaving}
            placeholder="Add note..."
            maxLength={60}
            className="w-full text-sm py-1.5 pl-2 pr-10 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none disabled:opacity-50 transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium text-gray-400 pointer-events-none">
            {note.length}/60
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 w-48 group">
      <div 
        className={cn(
          "text-sm cursor-pointer truncate flex-1 hover:text-red-600 transition-colors", 
          !enquiry.note ? "text-gray-400 italic hover:text-gray-600" : "text-gray-900"
        )}
        onClick={() => {
          if (enquiry.note) {
            onView(enquiry.note);
          } else {
            setIsEditing(true);
          }
        }}
        title={enquiry.note ? "Click to view full note" : "Click to add note"}
      >
        {enquiry.note ? (enquiry.note.length > 30 ? enquiry.note.substring(0, 30) + '...' : enquiry.note) : 'Add note...'}
      </div>
      <button 
        onClick={() => setIsEditing(true)} 
        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-700 transition-opacity"
        title="Edit note"
      >
        <Edit className="w-3 h-3" />
      </button>
    </div>
  );
}

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [popupContent, setPopupContent] = useState<{ title: string, content: string } | null>(null);

  const isAdminAdinath = auth.currentUser?.email?.toLowerCase() === 'admin@adinathmotors.com';

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && popupContent) {
        setPopupContent(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [popupContent]);

  const fetchEnquiries = async () => {
    try {
      setError(null);
      const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data: Enquiry[] = [];
      querySnapshot.forEach((doc) => {
        const d = doc.data();
        data.push({
          id: doc.id,
          name: d.name || 'Unknown',
          email: d.email || 'N/A',
          mobile: d.mobile || 'N/A',
          message: d.message || 'No message',
          status: d.status || 'pending',
          createdAt: d.createdAt,
          note: d.note || '',
        });
      });
      setEnquiries(data);
    } catch (err: any) {
      console.error("Error fetching enquiries:", err);
      setError(err.message || 'Failed to fetch enquiries.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const enquiryRef = doc(db, 'enquiries', id);
      await updateDoc(enquiryRef, { status: newStatus });
      setEnquiries((prev) => prev.map((enq) => enq.id === id ? { ...enq, status: newStatus as any } : enq));
    } catch (error) {
      console.error("Error updating status:", error);
      alert('Failed to update status');
    }
  };

  const handleNoteSave = async (id: string, newNote: string) => {
    const enquiryRef = doc(db, 'enquiries', id);
    await updateDoc(enquiryRef, { note: newNote });
    setEnquiries((prev) => prev.map((enq) => enq.id === id ? { ...enq, note: newNote } : enq));
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'enquiries', id));
        setEnquiries((prev) => prev.filter((enq) => enq.id !== id));
      } catch (error) {
        console.error("Error deleting enquiry:", error);
        alert('Failed to delete enquiry');
      }
    }
  };

  const filteredEnquiries = enquiries.filter((enq) => 
    enq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enq.mobile.includes(searchTerm)
  );

  const formatDate = (dateValue: any) => {
    if (!dateValue) return 'N/A';
    if (typeof dateValue.toMillis === 'function') {
      return new Date(dateValue.toMillis()).toLocaleDateString();
    }
    if (dateValue.seconds) {
      return new Date(dateValue.seconds * 1000).toLocaleDateString();
    }
    return new Date(dateValue).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
          <p className="mt-1 text-sm text-gray-500">Manage all customer enquiries received from the website.</p>
        </div>
        
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search enquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all sm:text-sm"
          />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400" />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(enquiry.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{enquiry.name}</div>
                      <div className="text-sm text-gray-500">{enquiry.email}</div>
                      <div className="text-sm text-gray-500">{enquiry.mobile}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div 
                        className="text-sm text-gray-900 cursor-pointer hover:text-red-600 transition-colors group"
                        onClick={() => setPopupContent({ title: 'Message', content: enquiry.message })}
                        title="Click to view full message"
                      >
                        {enquiry.message.length > 30 ? enquiry.message.substring(0, 30) + '...' : enquiry.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={enquiry.status}
                        onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                        className={cn(
                          "text-xs font-semibold rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-offset-1 cursor-pointer outline-none",
                          enquiry.status === 'completed' ? "bg-green-100 text-green-800 focus:ring-green-500" :
                          enquiry.status === 'contacted' ? "bg-blue-100 text-blue-800 focus:ring-blue-500" :
                          "bg-amber-100 text-amber-800 focus:ring-amber-500"
                        )}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <NoteCell 
                        enquiry={enquiry} 
                        onSave={handleNoteSave} 
                        onView={(content) => setPopupContent({ title: 'Note', content })}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {!isAdminAdinath && (
                        <button
                          onClick={() => handleDelete(enquiry.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup Modal */}
      {popupContent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPopupContent(null);
          }}
        >
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">{popupContent.title}</h3>
              <button 
                onClick={() => setPopupContent(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <p className="text-sm text-gray-700 whitespace-pre-wrap break-words leading-relaxed">
                {popupContent.content}
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end">
              <button
                onClick={() => setPopupContent(null)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
