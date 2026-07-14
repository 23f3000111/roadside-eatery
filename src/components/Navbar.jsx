import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Palette } from 'lucide-react';
import { asset } from '../asset';
import { useTheme } from '../ThemeContext';
import { WHATSAPP_URL } from '../site';

const links = ['Home', 'Menu', 'Story', 'Location', 'Reviews'];

/* Brand coin, the real Roadside Eatery badge on a clean white disc */
function Logo() {
  return (
    <span className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm ring-1 ring-ink/10 overflow-hidden">
      <img
        src={asset('images/logo.jpg')}
        alt="The Roadside Eatery"
        className="w-full h-full object-contain"
      />
    </span>
  );
}

/* Colour-theme toggle (ember ↔ grey & white) */
function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Switch colour theme"
      title={theme === 'ember' ? 'Switch to grey & white' : 'Switch to ember'}
      className={`w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center hover:border-accent transition-colors ${className}`}
    >
      <Palette size={17} className="text-accent" />
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-based active section tracker
  useEffect(() => {
    const sectionIds = ['home', 'story', 'menu', 'location', 'reviews'];
    const track = () => {
      const scrollPos = window.scrollY + 120;
      let current = 'home';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', track, { passive: true });
    track();
    return () => window.removeEventListener('scroll', track);
  }, []);

  const handleNav = (section) => {
    setOpen(false);
    const id = section.toLowerCase();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-9 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-surface/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(31,27,24,0.08)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        {/* Logo (coin only) */}
        <a href="#home" onClick={() => handleNav('home')} className="flex items-center gap-3 group">
          <Logo />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <button
                key={link}
                onClick={() => handleNav(link)}
                className={`font-manrope text-sm font-medium transition-colors duration-200 relative group ${
                  isActive ? 'text-accent' : 'text-ink hover:text-accent'
                }`}
              >
                {link}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 bg-accent rounded-full transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* CTA + theme toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ember text-sm"
          >
            Find Us
          </a>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-ink p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-surface/97 backdrop-blur-xl border-t border-accent/10"
          >
            <div className="px-5 py-6 flex flex-col gap-5">
              {links.map((link) => {
                const isActive = activeSection === link.toLowerCase();
                return (
                  <button
                    key={link}
                    onClick={() => handleNav(link)}
                    className={`font-manrope text-base font-medium text-left transition-colors ${
                      isActive ? 'text-accent' : 'text-ink hover:text-accent'
                    }`}
                  >
                    {link}
                  </button>
                );
              })}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ember text-sm w-full text-center mt-2"
              >
                Find Us on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
