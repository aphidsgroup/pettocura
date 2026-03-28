'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const stripServices = [
  { name: 'Pet Grooming', icon: '/icons/pet-grooming.png', href: '/grooming', color: '#E8577D' },
  { name: 'Pet Boarding', icon: '/icons/pet-boarding.png', href: '/boarding', color: '#5B6ABF' },
  { name: 'Pet Walking', icon: '/icons/pet-walking.png', href: '/contact', color: '#D4A843' },
  { name: 'Pet Sitting', icon: '/icons/pet-sitting.png', href: '/contact', color: '#9B6BBF' },
  { name: 'Pet Taxi', icon: '/icons/pet-taxi.png', href: '/contact', color: '#40A68C' },
  { name: 'Pet Accessories', icon: '/icons/pet-accessories.png', href: '/contact', color: '#E08A3E' },
  { name: 'Pet Cake & Treats', icon: '/icons/pet-cake-treats.png', href: '/contact', color: '#D4527A' },
];

export default function ServiceStrip() {
  return (
    <section className="service-strip-section">
      <div className="service-strip-container">
        <div className="service-strip-inner">
          {stripServices.map((svc, i) => (
            <motion.div
              key={svc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link href={svc.href} className="service-strip-item">
                <div className="service-strip-icon-wrap">
                  <Image
                    src={svc.icon}
                    alt={svc.name}
                    width={52}
                    height={52}
                    className="service-strip-icon"
                  />
                </div>
                <span className="service-strip-label">{svc.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        /* ── Service Strip: PetBacker-style bar ── */
        .service-strip-section {
          position: relative;
          z-index: 20;
          margin-top: -40px;
          padding: 0 16px;
          pointer-events: none;
        }

        .service-strip-container {
          max-width: 1100px;
          margin: 0 auto;
          pointer-events: auto;
        }

        .service-strip-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 20px;
          padding: 20px 32px;
          box-shadow:
            0 4px 32px rgba(0, 0, 0, 0.08),
            0 1px 4px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .service-strip-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 100px;
          position: relative;
        }

        .service-strip-item:hover {
          background: rgba(0, 0, 0, 0.03);
          transform: translateY(-2px);
        }

        .service-strip-item:hover .service-strip-icon {
          transform: scale(1.12);
        }

        .service-strip-icon-wrap {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: transparent;
          transition: all 0.25s ease;
        }

        .service-strip-icon {
          width: 52px;
          height: 52px;
          object-fit: contain;
          transition: transform 0.25s ease;
        }

        .service-strip-label {
          font-size: 12px;
          font-weight: 600;
          color: #555;
          text-align: center;
          letter-spacing: 0.01em;
          line-height: 1.3;
          white-space: nowrap;
          transition: color 0.25s ease;
        }

        .service-strip-item:hover .service-strip-label {
          color: #0d9488;
        }

        /* ── Mobile: 3–4 col grid like PetBacker ── */
        @media (max-width: 768px) {
          .service-strip-section {
            margin-top: -30px;
            padding: 0 12px;
          }

          .service-strip-inner {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 4px;
            padding: 16px 12px;
            border-radius: 16px;
          }

          .service-strip-item {
            padding: 10px 4px;
            min-width: unset;
          }

          .service-strip-icon-wrap {
            width: 44px;
            height: 44px;
          }

          .service-strip-icon {
            width: 40px;
            height: 40px;
          }

          .service-strip-label {
            font-size: 10px;
            white-space: normal;
            line-height: 1.25;
          }
        }

        /* ── Small mobile: tighter grid ── */
        @media (max-width: 380px) {
          .service-strip-inner {
            grid-template-columns: repeat(3, 1fr);
            gap: 2px;
            padding: 12px 8px;
          }

          .service-strip-icon-wrap {
            width: 40px;
            height: 40px;
          }

          .service-strip-icon {
            width: 36px;
            height: 36px;
          }

          .service-strip-label {
            font-size: 9px;
          }
        }
      `}</style>
    </section>
  );
}
