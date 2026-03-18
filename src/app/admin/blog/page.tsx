'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaEye } from 'react-icons/fa';
import { defaultBlogPosts, BlogPost } from '@/data/defaults';

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function generateMetaTitle(title: string): string {
  return `${title} | Petto Cura`;
}

function generateMetaDesc(excerpt: string): string {
  return excerpt.slice(0, 155) + (excerpt.length > 155 ? '...' : '');
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', category: 'Grooming Tips', author: 'Petto Cura Team',
  });

  useEffect(() => {
    const saved = localStorage.getItem('pettocura_blogs');
    setPosts(saved ? JSON.parse(saved) : defaultBlogPosts);
  }, []);

  const savePosts = (updated: BlogPost[]) => {
    setPosts(updated);
    localStorage.setItem('pettocura_blogs', JSON.stringify(updated));
  };

  const openAddModal = () => {
    setEditingPost(null);
    setForm({ title: '', excerpt: '', content: '', category: 'Grooming Tips', author: 'Petto Cura Team' });
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setForm({ title: post.title, excerpt: post.excerpt, content: post.content, category: post.category, author: post.author });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = generateSlug(form.title);
    const metaTitle = generateMetaTitle(form.title);
    const metaDescription = generateMetaDesc(form.excerpt);

    if (editingPost) {
      const updated = posts.map((p) => p.id === editingPost.id ? {
        ...editingPost, ...form, slug, metaTitle, metaDescription,
      } : p);
      savePosts(updated);
    } else {
      const newPost: BlogPost = {
        id: `blog-${Date.now()}`,
        slug,
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        author: form.author,
        date: new Date().toISOString().split('T')[0],
        readTime: `${Math.ceil(form.content.split(' ').length / 200)} min read`,
        image: '/blog/default.jpg',
        metaTitle,
        metaDescription,
      };
      savePosts([newPost, ...posts]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this blog post?')) {
      savePosts(posts.filter((p) => p.id !== id));
    }
  };

  const categoryColors: Record<string, string> = {
    'Grooming Tips': 'bg-violet-100 text-violet-700',
    'Boarding': 'bg-blue-100 text-blue-700',
    'Pet Health': 'bg-rose-100 text-rose-700',
    'Nutrition': 'bg-amber-100 text-amber-700',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Blog Manager</h1>
          <p className="text-stone-500 text-sm mt-1">Create, edit, and manage pet care blog posts</p>
        </div>
        <button onClick={openAddModal} className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-500 transition-colors shadow-md">
          <FaPlus className="w-3 h-3" /> New Post
        </button>
      </div>

      {/* Posts Grid */}
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

              {/* Auto-generated Meta Preview */}
              <div className="bg-stone-50 rounded-xl p-3 mb-4 border border-stone-100">
                <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1">Auto Meta Tags</p>
                <p className="text-[11px] text-teal-700 font-medium truncate">{post.metaTitle}</p>
                <p className="text-[10px] text-stone-500 line-clamp-1">{post.metaDescription}</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => openEditModal(post)} className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-stone-100 text-stone-600 text-xs font-medium hover:bg-stone-200 transition-colors">
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-stone-900">{editingPost ? 'Edit Post' : 'New Blog Post'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400"><FaTimes /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Title *</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" placeholder="Blog post title..." />
                {form.title && (
                  <p className="text-xs text-stone-400 mt-1">Slug: /blog/{generateSlug(form.title)}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400">
                    <option>Grooming Tips</option>
                    <option>Boarding</option>
                    <option>Pet Health</option>
                    <option>Nutrition</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Author</label>
                  <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Excerpt *</label>
                <textarea required rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 resize-none" placeholder="Short summary for previews..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Content (Markdown) *</label>
                <textarea required rows={12} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 resize-none" placeholder="Write your blog post in markdown..." />
              </div>

              {form.title && (
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Auto-Generated Meta Tags</p>
                  <p className="text-sm text-teal-700 font-medium">{generateMetaTitle(form.title)}</p>
                  <p className="text-xs text-stone-500 mt-1">{form.excerpt ? generateMetaDesc(form.excerpt) : 'Fill in the excerpt to see meta description...'}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-500 transition-colors">{editingPost ? 'Update Post' : 'Publish Post'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
