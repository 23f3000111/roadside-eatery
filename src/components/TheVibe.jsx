import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { asset } from '../asset';

export default function TheVibe() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const leftY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const rightY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  return (
    <section id="vibe" ref={ref} className="section-pad bg-[#1F1B18] overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E8622A]/6 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-[#E8622A]" />
            <span className="font-manrope text-xs text-[#E8622A] tracking-[0.25em] uppercase font-semibold">
              The Vibe
            </span>
            <div className="w-8 h-0.5 bg-[#E8622A]" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
            Come As You Are.
            <span className="block italic text-[#E8622A]">Stay a While.</span>
          </h2>
          <p className="font-manrope text-lg text-white/50 max-w-xl mx-auto">
            Raw concrete, warm timber and a wash of neon — big tables made for
            families, catch-ups and long, unhurried meals.
          </p>
        </motion.div>

        {/* Image grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
          {/* Left tall */}
          <motion.div
            style={{ y: leftY }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="group relative h-72 md:h-[480px] rounded-3xl overflow-hidden col-span-1"
          >
            <img
              src={asset('images/family-neon.jpg')}
              alt="Family under the neon sign"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="font-manrope text-[10px] text-[#E8622A] tracking-widest uppercase font-semibold">Good Company</span>
              <h3 className="font-playfair text-xl font-bold text-white">Made for Gatherings</h3>
            </div>
          </motion.div>

          {/* Center wide */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="group relative h-80 md:h-[560px] rounded-3xl overflow-hidden col-span-1"
          >
            <img
              src={asset('images/interior-family.jpg')}
              alt="Inside the eatery"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="font-manrope text-[10px] text-[#E8622A] tracking-widest uppercase font-semibold">The Space</span>
              <h3 className="font-playfair text-xl font-bold text-white">Concrete &amp; Timber</h3>
            </div>
          </motion.div>

          {/* Right tall */}
          <motion.div
            style={{ y: rightY }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="group relative h-72 md:h-[480px] rounded-3xl overflow-hidden col-span-1"
          >
            <img
              src={asset('images/friends-dining.jpg')}
              alt="Friends catching up over food"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="font-manrope text-[10px] text-[#E8622A] tracking-widest uppercase font-semibold">Catch-Ups</span>
              <h3 className="font-playfair text-xl font-bold text-white">Where Friends Meet</h3>
            </div>
          </motion.div>
        </div>

        {/* Vibe highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
        >
          {[
            { icon: '💡', label: 'Neon-Lit Corners', sub: 'Made for photos' },
            { icon: '🪑', label: 'Big Sharing Tables', sub: 'Bring the crew' },
            { icon: '❄️', label: 'Air-Conditioned', sub: 'Cool & comfy' },
            { icon: '🌙', label: 'Late-Night Friendly', sub: 'Open till 12 AM' },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors duration-300"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-manrope font-semibold text-white text-sm">{item.label}</div>
              <div className="font-manrope text-xs text-[#E8A33D] mt-1">{item.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
