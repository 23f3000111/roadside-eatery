import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { asset } from '../asset';

export default function CTA() {
  return (
    <section className="section-pad bg-[#1F1B18] relative overflow-hidden">
      {/* Background decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[#E8622A]/12 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#E8A33D]/10 blur-3xl translate-x-1/2 translate-y-1/2" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#E8622A 1px, transparent 1px), linear-gradient(90deg, #E8622A 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Food image floating */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-64 h-80 rounded-3xl overflow-hidden opacity-20 hidden lg:block">
        <img
          src={asset('images/steak-fries.jpg')}
          alt="Grilled steak"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto px-5 md:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-[#E8622A]/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#E8622A] animate-pulse" />
            <span className="font-manrope text-xs text-[#E8622A] tracking-widest uppercase font-semibold">
              Open Daily till Midnight
            </span>
          </div>

          <h2 className="font-playfair text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
            Come Hungry,
            <span className="block italic text-[#E8622A]">Leave Happy.</span>
          </h2>

          <p className="font-manrope text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-10">
            Swing by The Roadside Eatery in Setia Alam for flame-grilled chops,
            sizzling steaks and comforting pasta — no reservations needed.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="https://www.google.com/maps/place/The+Roadside+Eatery+Setia+Alam/@3.1236305,101.470913,12z"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ember flex items-center gap-2 text-base px-8 py-4"
            >
              Get Directions <ArrowRight size={18} />
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline-ember border-white/30 text-white hover:border-[#E8622A] text-base px-8 py-4"
            >
              See Menu
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
