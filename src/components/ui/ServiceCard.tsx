'use client';

import { motion } from 'framer-motion';

interface ServiceCardProps {
  icon: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  index?: number;
}

export default function ServiceCard({ icon, name, description, price, features, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-3xl p-8 shadow-sm border border-stone-100 hover:shadow-xl hover:shadow-teal-100/50 hover:border-teal-200/50 transition-all duration-500 hover:-translate-y-1"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-50/0 to-teal-50/0 group-hover:from-teal-50/50 group-hover:to-white transition-all duration-500" />
      <div className="relative">
        <div className="flex items-start justify-between mb-5">
          <span className="text-4xl">{icon}</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold">
            {price}
          </span>
        </div>
        <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-teal-700 transition-colors">
          {name}
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed mb-5">
          {description}
        </p>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-stone-600">
              <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
