'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { PageGate } from '@/components/PageGate';
import { SectionGate } from '@/components/SectionGate';
import { defaultBlogPosts, BlogPost } from '@/data/defaults';
import { useAdminData } from '@/hooks/useAdminData';

const categories = ['All', 'Grooming Tips', 'Boarding', 'Pet Health', 'Nutrition'];

const categoryColors: Record<string, string> = {
  'Grooming Tips': 'bg-violet-100 text-violet-700',
  'Boarding': 'bg-blue-100 text-blue-700',
  'Pet Health': 'bg-rose-100 text-rose-700',
  'Nutrition': 'bg-amber-100 text-amber-700',
};

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { data: posts } = useAdminData<BlogPost>('blog_posts', defaultBlogPosts);

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <PageGate pageKey="blog">
      <SectionGate id="blog-header">
        <section className="pt-32 pb-8 bg-gradient-to-b from-stone-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Our Blog</span>
              <h1 className="mt-3 text-4xl lg:text-5xl font-bold text-stone-900">Pet Care Guides</h1>
              <p className="mt-4 text-stone-500 max-w-2xl mx-auto">Expert tips, grooming guides, and everything you need to keep your furry friend healthy and happy.</p>
            </AnimatedSection>

          <SectionGate id="blog-filters">
            <AnimatedSection delay={0.2} className="mt-10">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                        : 'bg-white text-stone-600 border border-stone-200 hover:border-teal-300 hover:text-teal-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </AnimatedSection>
          </SectionGate>
          </div>
        </section>
      </SectionGate>

      <SectionGate id="blog-grid">
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                layout
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-3xl border border-stone-100 overflow-hidden hover:shadow-xl hover:shadow-stone-100/80 hover:border-stone-200 transition-all duration-500 hover:-translate-y-1 h-full"
                >
                  {/* Image Placeholder */}
                  <div className="aspect-[16/10] bg-gradient-to-br from-teal-100 via-cyan-50 to-amber-50 flex items-center justify-center text-5xl overflow-hidden">
                    <span className="group-hover:scale-110 transition-transform duration-500">
                      {post.category === 'Grooming Tips' ? '✂️' : post.category === 'Boarding' ? '🏠' : post.category === 'Pet Health' ? '💚' : '🍖'}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || 'bg-stone-100 text-stone-700'}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-stone-400">{post.readTime}</span>
                    </div>
                    <h2 className="text-lg font-bold text-stone-900 group-hover:text-teal-700 transition-colors mb-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-stone-400">{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span className="text-teal-600 text-sm font-semibold group-hover:gap-1 inline-flex items-center transition-all">
                        Read
                        <svg className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-stone-400 text-lg">No posts found in this category yet.</p>
            </div>
          )}
          </div>
        </section>
      </SectionGate>
    </PageGate>
  );
}
