import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { asset } from '../asset';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mosaicY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleNav = (section) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-surface"
    >
      {/* Background warm gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[65%] h-full bg-gradient-to-l from-tint via-tint to-transparent" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent opacity-[0.06] blur-3xl float-blob" />
        <div className="absolute top-24 right-1/3 w-64 h-64 rounded-full bg-gold opacity-[0.08] blur-3xl float-blob" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full pt-32 md:pt-28 pb-16 md:pb-12 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-12 items-center min-h-screen">
        {/* LEFT: Text */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 flex flex-col items-start"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="inline-flex items-center gap-2 bg-white border border-accent/25 rounded-full px-4 py-1.5 mb-7 shadow-sm"
          >
            <MapPin size={13} className="text-accent" />
            <span className="font-manrope text-xs font-semibold text-accent-deep tracking-widest uppercase">
              A Local Favourite in Setia Alam
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.35}
            className="font-playfair text-[2.9rem] leading-[1.04] sm:text-6xl xl:text-7xl font-bold text-ink mb-6"
          >
            Grilled Comfort,
            <span className="block italic shimmer-ember pb-1">Roadside Soul.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.5}
            className="font-manrope text-base md:text-lg text-muted leading-relaxed max-w-md mb-9"
          >
            Char-grilled chicken chops and steaks, creamy salted-egg &amp; aglio-olio
            pasta, hearty burgers, served up in a cosy, concrete-and-timber hideout.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.65}
            className="flex flex-wrap gap-4 mb-11"
          >
            <button
              onClick={() => handleNav('menu')}
              className="btn-ember flex items-center gap-2"
            >
              View Menu <ArrowRight size={16} />
            </button>
            <button
              onClick={() => handleNav('location')}
              className="btn-outline-ember"
            >
              Find Us
            </button>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.8}
            className="flex items-center gap-x-5 gap-y-2 flex-wrap"
          >
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" className="text-gold" />
              ))}
              <span className="font-manrope font-bold text-sm text-ink ml-1">4.8</span>
            </div>
            <span className="text-gold">✦</span>
            <span className="font-manrope text-sm text-muted">300+ Reviews</span>
            <span className="text-gold">✦</span>
            <span className="font-manrope text-sm text-muted">Family &amp; Friends Fav</span>
          </motion.div>
        </motion.div>

        {/* RIGHT: Clean landscape image stack (dishes centered, no overlap) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Decorative ring behind the stack */}
          <div className="absolute -z-0 -bottom-7 -left-6 w-36 h-36 rounded-full border-[20px] border-accent/12 pointer-events-none" />

          <motion.div style={{ y: mosaicY }} className="relative z-[1] flex flex-col gap-3">
            {/* Primary, signature plate, dish centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl overflow-hidden aspect-[16/10] shadow-[0_28px_70px_rgba(31,27,24,0.24)] group"
            >
              <img
                src={asset('images/chicken-chop.jpg')}
                alt="Char-grilled chicken chop with fries and coleslaw"
                className="w-full h-full object-cover object-[center_58%] transition-transform duration-[1.2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-6 right-6">
                <span className="font-manrope text-[10px] tracking-[0.25em] uppercase font-semibold text-gold">
                  ✦ Signature Plate
                </span>
                <h3 className="font-playfair text-xl md:text-2xl font-bold text-white leading-tight">
                  Char-Grilled Chicken Chop
                </h3>
              </div>
            </motion.div>

            {/* Two vivid pasta cards, dishes centered */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl overflow-hidden aspect-[5/4] shadow-[0_16px_40px_rgba(31,27,24,0.16)] group"
              >
                <img
                  src={asset('images/salted-egg-pasta.jpg')}
                  alt="Salted egg pasta"
                  className="w-full h-full object-cover object-[62%_60%] transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <span className="absolute bottom-3 left-3 font-manrope text-[10px] font-semibold text-white/95 drop-shadow">
                  Salted Egg Pasta
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl overflow-hidden aspect-[5/4] shadow-[0_16px_40px_rgba(31,27,24,0.16)] group"
              >
                <img
                  src={asset('images/aglio-olio.jpg')}
                  alt="Aglio olio grilled chicken"
                  className="w-full h-full object-cover object-[58%_52%] transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <span className="absolute bottom-3 left-3 font-manrope text-[10px] font-semibold text-white/95 drop-shadow">
                  Aglio Olio
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Single floating accent: rating coin (bottom-right, clear of the dish labels) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15, type: 'spring', stiffness: 180 }}
            className="absolute z-[2] -bottom-5 -right-3 md:-right-6 bg-white rounded-2xl px-4 py-3 shadow-[0_16px_40px_rgba(31,27,24,0.18)] flex items-center gap-3"
          >
            <span className="text-2xl md:text-3xl font-playfair font-bold text-ink">4.8</span>
            <div className="flex flex-col">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill="currentColor" className="text-gold" />
                ))}
              </div>
              <span className="font-manrope text-[10px] text-muted">Google · 300+ reviews</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="font-manrope text-xs text-muted tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-0.5 h-8 bg-gradient-to-b from-accent to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
