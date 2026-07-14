import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { asset } from '../asset';

const chips = [
  { icon: '🍗', label: 'Flame-Grilled' },
  { icon: '☪️', label: 'Halal' },
  { icon: '🧱', label: 'Cosy Industrial Space' },
  { icon: '👨‍👩‍👧‍👦', label: 'Family Friendly' },
];

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section id="story" ref={ref} className="section-pad bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT: Image block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative h-[460px] md:h-[580px] rounded-3xl overflow-hidden">
              <motion.img
                style={{ y: imgY }}
                src={asset('images/interior-family.jpg')}
                alt="Inside The Roadside Eatery"
                className="absolute inset-0 w-full h-[115%] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
            </div>

            {/* Floating tagline card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute -bottom-6 left-4 md:-left-8 bg-white rounded-2xl p-5 shadow-2xl max-w-[15rem]"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-accent/12 flex items-center justify-center shrink-0">
                  <span className="text-xl">🔥</span>
                </div>
                <div className="font-playfair font-bold text-base md:text-lg text-ink leading-snug">
                  Every Plate, Grilled Fresh To Order.
                </div>
              </div>
            </motion.div>

            {/* Ember decorative shape */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-accent/20 blur-xl pointer-events-none" />
          </motion.div>

          {/* RIGHT: Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-accent" />
              <span className="font-manrope text-xs text-accent tracking-[0.25em] uppercase font-semibold">
                Our Story
              </span>
            </div>

            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-ink leading-tight mb-6">
              Born by the Roadside
              <span className="block italic text-accent">of Setia Alam.</span>
            </h2>

            <p className="font-manrope text-lg text-muted leading-relaxed mb-6">
              What started as a humble roadside idea grew into Setia Alam's go-to
              hangout for hearty, honest comfort food. Concrete walls, warm timber
              tables and a glow of neon, the kind of place you linger long after
              the plates are cleared.
            </p>

            <p className="font-manrope text-base text-muted leading-relaxed mb-10">
              Everything is grilled fresh to order, from our signature chicken chop
              to sizzling steaks and comforting bowls of pasta. Come with family,
              come with friends, come hungry.
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-3 mb-10">
              {chips.map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-2 bg-white border border-accent/15 rounded-full px-4 py-2 shadow-sm font-manrope text-sm font-medium text-ink"
                >
                  <span>{chip.icon}</span>
                  {chip.label}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '4.8', label: 'Google Rating' },
                { value: '300+', label: 'Happy Reviews' },
                { value: '30+', label: 'Menu Items' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-playfair text-3xl font-bold text-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="font-manrope text-xs text-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
