'use client';

import { useState } from 'react';
import { useSiteContent } from '@/hooks/useSiteContent';
import ImageUploader from '@/components/admin/ImageUploader';
import { FaSave, FaCheck } from 'react-icons/fa';

const pages = [
  { key: 'home', label: 'Home' },
  { key: 'grooming', label: 'Grooming' },
  { key: 'boarding', label: 'Boarding' },
  { key: 'contact', label: 'Contact' },
  { key: 'franchise', label: 'Franchise' },
];

export default function ContentEditorPage() {
  const [activePage, setActivePage] = useState('home');
  const { content, loading, updateContent, getContentBySection } = useSiteContent(activePage);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const sections = [...new Set(content.map(c => c.section))];

  const handleChange = (id: string, value: string) => {
    setEditedValues(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = async (id: string) => {
    const value = editedValues[id];
    if (value === undefined) return;
    await updateContent(id, value);
    setSavedIds(prev => new Set(prev).add(id));
    setTimeout(() => setSavedIds(prev => { const n = new Set(prev); n.delete(id); return n; }), 2000);
    setEditedValues(prev => { const n = { ...prev }; delete n[id]; return n; });
  };

  const handleSaveAll = async () => {
    for (const [id, value] of Object.entries(editedValues)) {
      await updateContent(id, value);
    }
    setSavedIds(new Set(Object.keys(editedValues)));
    setTimeout(() => setSavedIds(new Set()), 2000);
    setEditedValues({});
  };

  const formatSectionName = (section: string) => {
    return section.replace(/^[a-z]+_/, '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Content Editor</h1>
          <p className="text-stone-500 text-sm mt-1">Edit text and images section-by-section for each page</p>
        </div>
        {Object.keys(editedValues).length > 0 && (
          <button
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-500 transition-colors text-sm"
          >
            <FaSave className="w-3 h-3" />
            Save All Changes ({Object.keys(editedValues).length})
          </button>
        )}
      </div>

      {/* Page Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {pages.map(p => (
          <button
            key={p.key}
            onClick={() => { setActivePage(p.key); setEditedValues({}); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              activePage === p.key
                ? 'bg-teal-600 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16 text-stone-400">Loading content...</div>
      ) : content.length === 0 ? (
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-8 text-center">
          <h3 className="text-lg font-bold text-stone-900 mb-2">No Content Found</h3>
          <p className="text-stone-600 text-sm">Run the SQL script in Supabase to create the site_content table and seed data.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sections.map(section => {
            const sectionItems = getContentBySection(section);
            return (
              <div key={section} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <div className="bg-stone-50 px-6 py-3 border-b border-stone-200">
                  <h3 className="font-semibold text-stone-900 text-sm">{formatSectionName(section)}</h3>
                </div>
                <div className="p-6 space-y-4">
                  {sectionItems.map(item => {
                    const currentValue = editedValues[item.id] ?? item.value;
                    const isModified = editedValues[item.id] !== undefined;
                    const isSaved = savedIds.has(item.id);

                    return (
                      <div key={item.id} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                            {item.label}
                          </label>
                          {item.field_type === 'textarea' ? (
                            <textarea
                              value={currentValue}
                              onChange={e => handleChange(item.id, e.target.value)}
                              rows={3}
                              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 resize-none"
                            />
                          ) : item.field_type === 'image' ? (
                            <ImageUploader
                              value={currentValue}
                              onChange={v => handleChange(item.id, v)}
                              folder={activePage}
                              label=""
                            />
                          ) : (
                            <input
                              value={currentValue}
                              onChange={e => handleChange(item.id, e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
                            />
                          )}
                        </div>
                        <div className="pt-6">
                          {isSaved ? (
                            <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                              <FaCheck className="w-3 h-3" />
                            </span>
                          ) : isModified ? (
                            <button
                              onClick={() => handleSave(item.id)}
                              className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600 hover:bg-teal-200 transition-colors"
                              title="Save"
                            >
                              <FaSave className="w-3 h-3" />
                            </button>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
