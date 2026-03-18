'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost, defaultBlogPosts } from '@/data/defaults';
import { FaArrowLeft, FaClock, FaUser, FaCalendar } from 'react-icons/fa';

function renderMarkdown(content: string) {
  // Simple markdown to HTML converter for blog content
  return content
    .split('\n')
    .map((line) => {
      if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`;
      if (line.startsWith('- **')) {
        const match = line.match(/^- \*\*(.+?)\*\*:?\s*(.*)$/);
        if (match) return `<li><strong>${match[1]}</strong>${match[2] ? ': ' + match[2] : ''}</li>`;
      }
      if (line.startsWith('- ')) return `<li>${line.slice(2)}</li>`;
      if (line.startsWith('---')) return '<hr />';
      if (line.startsWith('*') && line.endsWith('*')) return `<p><em>${line.slice(1, -1)}</em></p>`;
      if (line.trim() === '') return '<br />';
      return `<p>${line}</p>`;
    })
    .join('\n')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const relatedPosts = defaultBlogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <>
      <article className="pt-32 pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Back link */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-teal-600 text-sm font-medium mb-8 hover:text-teal-700 transition-colors">
              <FaArrowLeft className="w-3 h-3" /> Back to Blog
            </Link>

            {/* Category */}
            <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-4">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-stone-900 leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-stone-400 mb-8 pb-8 border-b border-stone-100">
              <span className="flex items-center gap-1.5"><FaUser className="w-3 h-3" /> {post.author}</span>
              <span className="flex items-center gap-1.5"><FaCalendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="flex items-center gap-1.5"><FaClock className="w-3 h-3" /> {post.readTime}</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-stone-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="group bg-white rounded-2xl p-6 border border-stone-100 hover:shadow-lg hover:border-teal-200/50 transition-all duration-300"
                >
                  <span className="text-xs font-semibold text-teal-600 mb-2 block">{rp.category}</span>
                  <h3 className="font-bold text-stone-900 group-hover:text-teal-700 transition-colors mb-2">{rp.title}</h3>
                  <p className="text-sm text-stone-500 line-clamp-2">{rp.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
