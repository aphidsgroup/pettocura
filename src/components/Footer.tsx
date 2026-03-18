import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const footerLinks = {
  services: [
    { label: 'Pet Grooming', href: '/grooming' },
    { label: 'Pet Boarding', href: '/boarding' },
    { label: 'Daycare', href: '/boarding' },
    { label: 'Spa Treatments', href: '/grooming' },
  ],
  company: [
    { label: 'About Us', href: '/' },
    { label: 'Find a Center', href: '/find-a-center' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  support: [
    { label: 'FAQs', href: '/grooming#faq' },
    { label: 'Privacy Policy', href: '/contact' },
    { label: 'Terms of Service', href: '/contact' },
    { label: 'Cancellation Policy', href: '/contact' },
  ],
};

const socialLinks = [
  { icon: FaInstagram, href: 'https://www.instagram.com/pettocura', label: 'Instagram' },
  { icon: FaFacebookF, href: 'https://www.facebook.com/pettocura', label: 'Facebook' },
  { icon: FaWhatsapp, href: 'https://wa.me/919876543210', label: 'WhatsApp' },
  { icon: FaYoutube, href: 'https://www.youtube.com/@pettocura', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-12 border-b border-stone-800">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center">
                <span className="text-white text-lg font-bold">P</span>
              </div>
              <span className="text-xl font-bold text-white">
                Petto <span className="text-teal-400">Cura</span>
              </span>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm mb-6">
              Premium pet grooming and boarding services in Chennai. Where every tail wags with joy and every whisker shines with care.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-teal-600 hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-stone-400 hover:text-teal-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-stone-400 hover:text-teal-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-stone-400 hover:text-teal-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-sm">
            © {new Date().getFullYear()} Petto Cura. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-stone-500 text-sm">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            Serving Nolambur, Mogappair & Chennai
          </div>
        </div>
      </div>
    </footer>
  );
}
