import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    name: 'Nurul A.',
    avatar: 'N',
    color: '#E8622A',
    rating: 5,
    text: 'Best chicken chop in Setia Alam, hands down. Grilled perfectly, sauce on point, and the portion is huge. We keep coming back with the whole family.',
    date: 'Google Review',
  },
  {
    name: 'Firdaus H.',
    avatar: 'F',
    color: '#E8A33D',
    rating: 5,
    text: 'The salted egg pasta is dangerously good. Cosy spot with a nice concrete-industrial look, great for a chill dinner with friends.',
    date: 'Google Review',
  },
  {
    name: 'Wei Ling T.',
    avatar: 'W',
    color: '#1D4ED8',
    rating: 5,
    text: 'Came for the aglio olio, stayed for the vibes. Neon lights, comfy seats, friendly staff. Portions are generous and prices are very reasonable.',
    date: 'Google Review',
  },
  {
    name: 'Aiman R.',
    avatar: 'A',
    color: '#8A5A3B',
    rating: 5,
    text: 'Solid ribeye steak for the price and the loaded fries are a must. Good place to hang out late, open till midnight which is a big plus.',
    date: 'Google Review',
  },
  {
    name: 'Syafiqah M.',
    avatar: 'S',
    color: '#C24A18',
    rating: 5,
    text: 'Family-friendly, halal, and the kids loved the burgers. Cosy atmosphere and quick service even when it was busy. Highly recommend!',
    date: 'Google Review',
  },
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = (dir) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timer = setInterval(() => navigate(1), 5500);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
  };

  return (
    <section id="reviews" className="section-pad bg-surface overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-accent" />
            <span className="font-manrope text-xs text-accent tracking-[0.25em] uppercase font-semibold">
              Reviews
            </span>
            <div className="w-8 h-0.5 bg-accent" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-ink mb-4">
            Loved by Setia Alam.
          </h2>

          {/* Google Rating */}
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-3 shadow-md mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" className="text-gold" />
              ))}
            </div>
            <span className="font-playfair font-bold text-2xl text-ink">4.8</span>
            <span className="font-manrope text-sm text-muted">300+ Google Reviews</span>
          </div>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(31,27,24,0.08)] min-h-[280px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="w-full p-10 md:p-14"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(reviews[current].rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" className="text-gold" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-playfair text-xl md:text-2xl xl:text-3xl font-medium text-ink leading-relaxed mb-8 italic">
                  "{reviews[current].text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-playfair font-bold text-lg"
                    style={{ backgroundColor: reviews[current].color }}
                  >
                    {reviews[current].avatar}
                  </div>
                  <div>
                    <div className="font-manrope font-semibold text-ink">
                      {reviews[current].name}
                    </div>
                    <div className="font-manrope text-xs text-muted">
                      {reviews[current].date}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-7 h-2.5 bg-accent'
                      : 'w-2.5 h-2.5 bg-accent/20 hover:bg-accent'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="w-11 h-11 rounded-full border-2 border-accent text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
                aria-label="Previous review"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent-deep transition-colors duration-300"
                aria-label="Next review"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
