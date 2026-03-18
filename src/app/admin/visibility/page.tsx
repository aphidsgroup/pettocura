'use client';

import { useVisibility, PageKey, SectionKey } from '@/hooks/useVisibility';
import { FaEye, FaEyeSlash, FaGlobe, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

const pageConfig: { key: PageKey; label: string; route: string; sections: { key: SectionKey; label: string }[] }[] = [
  {
    key: 'home', label: 'Home', route: '/',
    sections: [
      { key: 'home-hero', label: 'Hero Banner' },
      { key: 'home-services', label: 'Services Grid' },
      { key: 'home-trust', label: 'Trust Signals Counter' },
      { key: 'home-whyus', label: 'Why Petto Cura' },
      { key: 'home-cta', label: 'CTA Banner' },
    ],
  },
  {
    key: 'grooming', label: 'Grooming', route: '/grooming',
    sections: [
      { key: 'grooming-hero', label: 'Hero Banner' },
      { key: 'grooming-quick-answers', label: 'Quick Answers (AEO)' },
      { key: 'grooming-key-facts', label: 'Key Facts Table (GEO)' },
      { key: 'grooming-services', label: 'Services Grid' },
      { key: 'grooming-faq', label: 'FAQ Accordion' },
    ],
  },
  {
    key: 'boarding', label: 'Boarding', route: '/boarding',
    sections: [
      { key: 'boarding-hero', label: 'Hero Banner' },
      { key: 'boarding-safety', label: 'Safety Features' },
      { key: 'boarding-live-update', label: 'Live Pet Update Teaser' },
      { key: 'boarding-services', label: 'Services Grid' },
      { key: 'boarding-quick-answers', label: 'Quick Answers (AEO)' },
      { key: 'boarding-key-facts', label: 'Key Facts Table (GEO)' },
      { key: 'boarding-faq', label: 'FAQ Accordion' },
    ],
  },
  {
    key: 'find-a-center', label: 'Find a Center', route: '/find-a-center',
    sections: [
      { key: 'center-header', label: 'Page Header' },
      { key: 'center-map', label: 'Map' },
      { key: 'center-cards', label: 'Location Cards' },
    ],
  },
  {
    key: 'blog', label: 'Blog', route: '/blog',
    sections: [
      { key: 'blog-header', label: 'Page Header' },
      { key: 'blog-filters', label: 'Category Filters' },
      { key: 'blog-grid', label: 'Blog Posts Grid' },
    ],
  },
  {
    key: 'contact', label: 'Contact', route: '/contact',
    sections: [
      { key: 'contact-header', label: 'Page Header' },
      { key: 'contact-form', label: 'Contact Form' },
      { key: 'contact-info', label: 'Contact Info Card' },
      { key: 'contact-map', label: 'Map' },
    ],
  },
];

export default function VisibilityManager() {
  const { settings, loaded, togglePage, toggleSection } = useVisibility();
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set(['home']));

  const toggleExpand = (key: string) => {
    setExpandedPages(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  if (!loaded) return <div className="animate-pulse h-40 bg-stone-100 rounded-2xl" />;

  const visiblePages = Object.values(settings.pages).filter(Boolean).length;
  const totalPages = Object.values(settings.pages).length;
  const visibleSections = Object.values(settings.sections).filter(Boolean).length;
  const totalSections = Object.values(settings.sections).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Page Visibility</h1>
          <p className="text-stone-500 text-sm mt-1">Toggle pages and sections on/off while developing behind the scenes</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-stone-500 bg-stone-100 px-3 py-1.5 rounded-lg">
            {visiblePages}/{totalPages} pages · {visibleSections}/{totalSections} sections
          </span>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
        <FaGlobe className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-teal-800">
          <strong>How it works:</strong> Hidden pages show a &quot;Coming Soon&quot; message to visitors. Hidden sections are simply removed from the page. Changes apply instantly — no redeploy needed.
        </div>
      </div>

      {/* Page List */}
      <div className="space-y-4">
        {pageConfig.map((page) => {
          const isPageOn = settings.pages[page.key];
          const isExpanded = expandedPages.has(page.key);
          const visibleSectionsCount = page.sections.filter(s => settings.sections[s.key]).length;

          return (
            <div key={page.key} className={`bg-white rounded-2xl border transition-all duration-200 ${isPageOn ? 'border-stone-200' : 'border-red-200 bg-red-50/30'}`}>
              {/* Page Header */}
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleExpand(page.key)}
                    className="text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    {isExpanded ? <FaChevronDown className="w-3 h-3" /> : <FaChevronRight className="w-3 h-3" />}
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`font-bold text-sm ${isPageOn ? 'text-stone-900' : 'text-stone-400'}`}>{page.label}</h3>
                      <code className="text-[10px] text-stone-400 bg-stone-50 px-1.5 py-0.5 rounded">{page.route}</code>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      {visibleSectionsCount}/{page.sections.length} sections visible
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => togglePage(page.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isPageOn
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-red-50 text-red-600 hover:bg-red-100'
                  }`}
                >
                  {isPageOn ? <FaEye className="w-3 h-3" /> : <FaEyeSlash className="w-3 h-3" />}
                  {isPageOn ? 'Visible' : 'Hidden'}
                </button>
              </div>

              {/* Sections */}
              {isExpanded && (
                <div className="border-t border-stone-100 px-5 py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {page.sections.map((section) => {
                      const isSectionOn = settings.sections[section.key];
                      return (
                        <button
                          key={section.key}
                          onClick={() => toggleSection(section.key)}
                          disabled={!isPageOn}
                          className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                            !isPageOn
                              ? 'bg-stone-100 text-stone-300 cursor-not-allowed'
                              : isSectionOn
                              ? 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                              : 'bg-red-50 text-red-500 hover:bg-red-100'
                          }`}
                        >
                          <span>{section.label}</span>
                          {isPageOn && (
                            isSectionOn
                              ? <FaEye className="w-3 h-3 text-emerald-500" />
                              : <FaEyeSlash className="w-3 h-3 text-red-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
