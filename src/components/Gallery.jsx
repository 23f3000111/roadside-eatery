import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { asset } from '../asset';

const IG_URL = 'https://www.instagram.com/theroadsideeatery_setiaalam/';
const IG_HANDLE = '@theroadsideeatery_setiaalam';

// Masonry pattern across the eatery's photos
const galleryItems = [
  { src: asset('images/chicken-chop.jpg'), alt: 'Grilled chicken chop', tall: true },
  { src: asset('images/salted-egg-pasta.jpg'), alt: 'Salted egg pasta', tall: false },
  { src: asset('images/aglio-olio.jpg'), alt: 'Aglio olio grilled chicken', tall: false },
  { src: asset('images/friends-dining.jpg'), alt: 'Friends dining', tall: false },
  { src: asset('images/interior-family.jpg'), alt: 'Inside the eatery', tall: true },
  { src: asset('images/family-neon.jpg'), alt: 'Family under the neon sign', tall: false },
  { src: asset('images/steak-fries.jpg'), alt: 'Grilled steak and fries', tall: false },
];

export default function Gallery() {
  return (
    <section id="gallery" className="section-pad bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-accent" />
            <span className="font-manrope text-xs text-accent tracking-[0.25em] uppercase font-semibold">
              Instagram
            </span>
            <div className="w-8 h-0.5 bg-accent" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-ink mb-2">
            From Our Grill, to Your Feed.
          </h2>
          <p className="font-manrope text-base text-muted">
            Follow us {IG_HANDLE}
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {galleryItems.map((item, i) => (
            <motion.a
              key={i}
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl break-inside-avoid cursor-pointer block"
            >
              <img
                src={item.src}
                alt={item.alt}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  item.tall ? 'h-80 md:h-96' : 'h-52 md:h-64'
                }`}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-accent/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="text-center text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Instagram size={28} className="mx-auto mb-2" />
                  <span className="font-manrope text-sm font-semibold">Setia Alam</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-outline-ember"
          >
            <Instagram size={16} />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
