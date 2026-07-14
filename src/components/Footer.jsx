import { Instagram, MapPin } from 'lucide-react';
import { asset } from '../asset';

const IG_URL = 'https://www.instagram.com/theroadsideeatery_setiaalam/';

function Logo() {
  return (
    <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden ring-1 ring-white/15">
      <img
        src={asset('images/logo.jpg')}
        alt="The Roadside Eatery"
        className="w-full h-full object-contain"
      />
    </span>
  );
}

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-ink-deep text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <Logo />
              <span className="flex flex-col leading-none">
                <span className="font-playfair font-bold text-2xl">The Roadside Eatery</span>
                <span className="font-manrope text-[10px] tracking-[0.3em] uppercase text-accent font-semibold mt-1">
                  Setia Alam
                </span>
              </span>
            </div>
            <p className="font-manrope text-sm text-white/50 leading-relaxed max-w-xs mb-6">
              Flame-grilled chops, sizzling steaks and comforting pasta in a cosy
              concrete-and-timber hideout in Setia Alam.
            </p>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-accent transition-colors duration-300 rounded-full px-4 py-2 text-sm font-manrope"
            >
              <Instagram size={14} />
              @theroadsideeatery_setiaalam
            </a>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-manrope font-semibold text-xs tracking-widest uppercase text-accent mb-4">
              Menu
            </h4>
            <ul className="space-y-2.5">
              {['Grills & Chops', 'Pasta', 'Burgers & Sides', 'Drinks'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo('menu')}
                    className="font-manrope text-sm text-white/50 hover:text-accent transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div>
            <h4 className="font-manrope font-semibold text-xs tracking-widest uppercase text-accent mb-4">
              Visit
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Our Story', id: 'story' },
                { label: 'The Vibe', id: 'vibe' },
                { label: 'Location', id: 'location' },
                { label: 'Reviews', id: 'reviews' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="font-manrope text-sm text-white/50 hover:text-accent transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-manrope font-semibold text-xs tracking-widest uppercase text-accent mb-4">
              Hours
            </h4>
            <ul className="space-y-2">
              <li className="font-manrope text-sm text-white/50">Mon – Thu</li>
              <li className="font-manrope text-sm text-white font-semibold">12 PM – 12 AM</li>
              <li className="font-manrope text-sm text-white/50 mt-3">Fri – Sun</li>
              <li className="font-manrope text-sm text-white font-semibold">12 PM – 1 AM</li>
              <li className="font-manrope text-sm text-gold font-semibold mt-3">Open Daily</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-manrope text-xs text-white/30">
            © 2026 The Roadside Eatery · Mockup design. All photos © their owners.
          </p>
          <div className="flex items-center gap-2">
            <MapPin size={12} className="text-accent" />
            <span className="font-manrope text-xs text-white/30">
              Jalan Setia Prima, Setia Alam, Shah Alam, Selangor
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
