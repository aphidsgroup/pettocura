'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaEye, FaBold, FaItalic, FaHeading, FaListUl, FaListOl, FaLink, FaQuoteLeft, FaUndo, FaRedo, FaSearch } from 'react-icons/fa';
import { defaultBlogPosts, BlogPost } from '@/data/defaults';
import { supabase } from '@/lib/supabase';

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/* ─── Rich Text Editor Component ─── */
function RichEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
      }
    }
    isInternalChange.current = false;
  }, [value]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const exec = useCallback((cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
    handleInput();
  }, [handleInput]);

  const insertHeading = useCallback((level: string) => {
    exec('formatBlock', level);
  }, [exec]);

  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 bg-stone-50 border-b border-stone-200">
        <button type="button" onClick={() => exec('bold')} className="p-2 rounded-lg hover:bg-stone-200 text-stone-600 transition-colors" title="Bold"><FaBold className="w-3 h-3" /></button>
        <button type="button" onClick={() => exec('italic')} className="p-2 rounded-lg hover:bg-stone-200 text-stone-600 transition-colors" title="Italic"><FaItalic className="w-3 h-3" /></button>
        <div className="w-px h-5 bg-stone-200 mx-1" />
        <button type="button" onClick={() => insertHeading('H2')} className="p-2 rounded-lg hover:bg-stone-200 text-stone-600 transition-colors text-xs font-bold" title="Heading 2">H2</button>
        <button type="button" onClick={() => insertHeading('H3')} className="p-2 rounded-lg hover:bg-stone-200 text-stone-600 transition-colors text-xs font-bold" title="Heading 3">H3</button>
        <button type="button" onClick={() => insertHeading('H4')} className="p-2 rounded-lg hover:bg-stone-200 text-stone-600 transition-colors text-xs font-bold" title="Heading 4">H4</button>
        <button type="button" onClick={() => insertHeading('P')} className="p-2 rounded-lg hover:bg-stone-200 text-stone-600 transition-colors text-xs" title="Paragraph">¶</button>
        <div className="w-px h-5 bg-stone-200 mx-1" />
        <button type="button" onClick={() => exec('insertUnorderedList')} className="p-2 rounded-lg hover:bg-stone-200 text-stone-600 transition-colors" title="Bullet List"><FaListUl className="w-3 h-3" /></button>
        <button type="button" onClick={() => exec('insertOrderedList')} className="p-2 rounded-lg hover:bg-stone-200 text-stone-600 transition-colors" title="Numbered List"><FaListOl className="w-3 h-3" /></button>
        <button type="button" onClick={() => exec('formatBlock', 'BLOCKQUOTE')} className="p-2 rounded-lg hover:bg-stone-200 text-stone-600 transition-colors" title="Blockquote"><FaQuoteLeft className="w-3 h-3" /></button>
        <div className="w-px h-5 bg-stone-200 mx-1" />
        <button type="button" onClick={() => { const url = prompt('Enter URL:'); if (url) exec('createLink', url); }} className="p-2 rounded-lg hover:bg-stone-200 text-stone-600 transition-colors" title="Insert Link"><FaLink className="w-3 h-3" /></button>
        <div className="w-px h-5 bg-stone-200 mx-1" />
        <button type="button" onClick={() => exec('undo')} className="p-2 rounded-lg hover:bg-stone-200 text-stone-400 transition-colors" title="Undo"><FaUndo className="w-3 h-3" /></button>
        <button type="button" onClick={() => exec('redo')} className="p-2 rounded-lg hover:bg-stone-200 text-stone-400 transition-colors" title="Redo"><FaRedo className="w-3 h-3" /></button>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[300px] max-h-[500px] overflow-y-auto p-4 text-sm text-stone-800 focus:outline-none prose-content [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-1 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-teal-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-stone-500 [&_a]:text-teal-600 [&_a]:underline"
        suppressContentEditableWarning
      />
    </div>
  );
}

/* ─── Blog Manager ─── */
export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');

  // Form state
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Grooming Tips');
  const [author, setAuthor] = useState('Petto Cura Team');
  // SEO fields
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  // AEO fields
  const [aeoQuestion, setAeoQuestion] = useState('');
  const [aeoAnswer, setAeoAnswer] = useState('');
  // GEO fields
  const [geoFacts, setGeoFacts] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      if (!supabase) { setPosts(defaultBlogPosts); return; }
      const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        // Map snake_case columns to camelCase
        setPosts(data.map((p: Record<string, unknown>) => ({
          id: p.id as string,
          slug: p.slug as string,
          title: p.title as string,
          excerpt: p.excerpt as string,
          content: p.content as string,
          category: p.category as string,
          author: p.author as string,
          date: p.date as string,
          readTime: (p.read_time || p.readTime || '') as string,
          image: (p.image || '') as string,
          metaTitle: (p.meta_title || p.metaTitle || '') as string,
          metaDescription: (p.meta_description || p.metaDescription || '') as string,
        })));
      } else {
        setPosts(defaultBlogPosts);
      }
    };
    fetchPosts();
  }, []);

  const savePosts = async (updated: BlogPost[]) => {
    setPosts(updated);
  };

  const resetForm = () => {
    setTitle(''); setExcerpt(''); setContent(''); setCategory('Grooming Tips'); setAuthor('Petto Cura Team');
    setMetaTitle(''); setMetaDescription(''); setFocusKeyword('');
    setAeoQuestion(''); setAeoAnswer(''); setGeoFacts('');
    setActiveTab('content');
  };

  const openNew = () => {
    setEditingPost(null);
    resetForm();
    setIsEditing(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setCategory(post.category);
    setAuthor(post.author);
    setMetaTitle(post.metaTitle);
    setMetaDescription(post.metaDescription);
    setFocusKeyword('');
    setAeoQuestion(''); setAeoAnswer(''); setGeoFacts('');
    setActiveTab('content');
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim() || !supabase) return;
    const slug = generateSlug(title);
    const finalMetaTitle = metaTitle || `${title} | Petto Cura`;
    const finalMetaDesc = metaDescription || excerpt.slice(0, 155) + (excerpt.length > 155 ? '...' : '');

    let finalContent = content;
    if (aeoQuestion && aeoAnswer) {
      finalContent += `<section class="aeo-section"><h3>Quick Answer</h3><p><strong>Q: ${aeoQuestion}</strong></p><p>${aeoAnswer}</p></section>`;
    }
    if (geoFacts) {
      finalContent += `<section class="geo-section"><h3>Key Facts</h3>${geoFacts}</section>`;
    }

    const postData = {
      slug, title, excerpt,
      content: finalContent,
      category, author,
      date: editingPost?.date || new Date().toISOString().split('T')[0],
      read_time: `${Math.max(1, Math.ceil(content.replace(/<[^>]+>/g, '').split(' ').length / 200))} min read`,
      image: '/blog/default.jpg',
      meta_title: finalMetaTitle,
      meta_description: finalMetaDesc,
    };

    if (editingPost) {
      await supabase.from('blog_posts').update(postData).eq('id', editingPost.id);
    } else {
      await supabase.from('blog_posts').insert({ id: `blog-${Date.now()}`, ...postData });
    }

    // Refetch
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (data) {
      setPosts(data.map((p: Record<string, unknown>) => ({
        id: p.id as string, slug: p.slug as string, title: p.title as string, excerpt: p.excerpt as string,
        content: p.content as string, category: p.category as string, author: p.author as string,
        date: p.date as string, readTime: (p.read_time || '') as string, image: (p.image || '') as string,
        metaTitle: (p.meta_title || '') as string, metaDescription: (p.meta_description || '') as string,
      })));
    }
    setIsEditing(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    if (confirm('Delete this blog post?')) {
      await supabase.from('blog_posts').delete().eq('id', id);
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const categoryColors: Record<string, string> = {
    'Grooming Tips': 'bg-violet-100 text-violet-700',
    'Boarding': 'bg-blue-100 text-blue-700',
    'Pet Health': 'bg-rose-100 text-rose-700',
    'Nutrition': 'bg-amber-100 text-amber-700',
  };

  // ─── Full-Page Editor View ───
  if (isEditing) {
    const slug = title ? generateSlug(title) : '';
    const wordCount = content.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
      <div className="max-w-5xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => { setIsEditing(false); resetForm(); }} className="text-sm text-stone-500 hover:text-stone-700 transition-colors">
            ← Back to posts
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-400">{wordCount} words · {readTime} min read</span>
            <button onClick={handleSave} className="px-6 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-500 transition-colors shadow-md">
              {editingPost ? 'Update Post' : 'Publish Post'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-stone-100 p-1 rounded-xl w-fit">
          <button onClick={() => setActiveTab('content')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'content' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}>
            ✏️ Content
          </button>
          <button onClick={() => setActiveTab('seo')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'seo' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}>
            <FaSearch className="w-3 h-3 inline mr-1" /> SEO / AEO / GEO
          </button>
        </div>

        {activeTab === 'content' ? (
          <div className="space-y-5">
            {/* Title */}
            <div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title..."
                className="w-full text-3xl font-bold text-stone-900 placeholder:text-stone-300 focus:outline-none border-none bg-transparent"
              />
              {slug && <p className="text-xs text-stone-400 mt-1">pettocura.com/blog/{slug}</p>}
            </div>

            {/* Meta Row */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-medium text-stone-500 mb-1">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400">
                  <option>Grooming Tips</option>
                  <option>Boarding</option>
                  <option>Pet Health</option>
                  <option>Nutrition</option>
                </select>
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-medium text-stone-500 mb-1">Author</label>
                <input value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Excerpt / Summary</label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A short summary shown in previews and search results..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 resize-none"
              />
            </div>

            {/* Rich Text Editor */}
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Content</label>
              <RichEditor value={content} onChange={setContent} />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* SEO Section */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <h3 className="font-bold text-stone-900 text-sm mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-xs">🔍</span>
                SEO Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Meta Title <span className="text-stone-300">(auto-generated if empty)</span></label>
                  <input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder={title ? `${title} | Petto Cura` : 'Auto-generated from title...'} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" />
                  <p className="text-[10px] text-stone-400 mt-1">{(metaTitle || `${title} | Petto Cura`).length}/60 characters</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Meta Description <span className="text-stone-300">(auto-generated from excerpt if empty)</span></label>
                  <textarea rows={2} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder={excerpt || 'Auto-generated from excerpt...'} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 resize-none" />
                  <p className="text-[10px] text-stone-400 mt-1">{(metaDescription || excerpt).length}/155 characters</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Focus Keyword</label>
                  <input value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)} placeholder="e.g. dog grooming Chennai" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" />
                </div>

                {/* Google Preview */}
                {title && (
                  <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                    <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Google Search Preview</p>
                    <p className="text-blue-700 text-sm font-medium hover:underline cursor-pointer truncate">{metaTitle || `${title} | Petto Cura`}</p>
                    <p className="text-green-700 text-xs">pettocura.com/blog/{generateSlug(title)}</p>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-0.5">{metaDescription || excerpt || 'Add an excerpt to preview the description...'}</p>
                  </div>
                )}
              </div>
            </div>

            {/* AEO Section */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <h3 className="font-bold text-stone-900 text-sm mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-teal-100 flex items-center justify-center text-xs">⚡</span>
                Answer Engine Optimization (AEO)
              </h3>
              <p className="text-xs text-stone-400 mb-4">Add a Q&A pair to target Position 0 featured snippets</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Question</label>
                  <input value={aeoQuestion} onChange={(e) => setAeoQuestion(e.target.value)} placeholder="e.g. How much does dog grooming cost in Chennai?" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Direct Answer</label>
                  <textarea rows={3} value={aeoAnswer} onChange={(e) => setAeoAnswer(e.target.value)} placeholder="Give a clear, concise answer (40-60 words ideal)..." className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 resize-none" />
                </div>
              </div>
            </div>

            {/* GEO Section */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <h3 className="font-bold text-stone-900 text-sm mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center text-xs">🤖</span>
                Generative Engine Optimization (GEO)
              </h3>
              <p className="text-xs text-stone-400 mb-4">Add structured facts that AI models can easily cite</p>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Key Facts (one per line, use &quot;Label: Value&quot; format)</label>
                <textarea rows={5} value={geoFacts} onChange={(e) => setGeoFacts(e.target.value)} placeholder={"Service: Dog Grooming\nPrice Range: ₹599 – ₹1,999\nLocation: Nolambur, Chennai\nRating: 4.9/5 on Google"} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 resize-none" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── Post List View ───
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Blog Manager</h1>
          <p className="text-stone-500 text-sm mt-1">Create, edit, and manage pet care blog posts</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-500 transition-colors shadow-md">
          <FaPlus className="w-3 h-3" /> New Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-[16/9] bg-gradient-to-br from-teal-100 to-stone-100 flex items-center justify-center text-3xl">
              {post.category === 'Grooming Tips' ? '✂️' : post.category === 'Boarding' ? '🏠' : post.category === 'Pet Health' ? '💚' : '🍖'}
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-stone-100 text-stone-700'}`}>
                  {post.category}
                </span>
                <span className="text-[11px] text-stone-400">{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
              </div>
              <h3 className="font-bold text-stone-900 text-sm mb-1 line-clamp-1">{post.title}</h3>
              <p className="text-xs text-stone-500 line-clamp-2 mb-4">{post.excerpt}</p>

              <div className="bg-stone-50 rounded-xl p-3 mb-4 border border-stone-100">
                <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1">SEO Meta</p>
                <p className="text-[11px] text-teal-700 font-medium truncate">{post.metaTitle}</p>
                <p className="text-[10px] text-stone-500 line-clamp-1">{post.metaDescription}</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => openEdit(post)} className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-stone-100 text-stone-600 text-xs font-medium hover:bg-stone-200 transition-colors">
                  <FaEdit className="w-3 h-3" /> Edit
                </button>
                <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-2 rounded-lg bg-teal-50 text-teal-600 hover:bg-teal-100 transition-colors">
                  <FaEye className="w-3.5 h-3.5" />
                </a>
                <button onClick={() => handleDelete(post.id)} className="inline-flex items-center justify-center p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                  <FaTrash className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
