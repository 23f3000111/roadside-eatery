import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

const hours = [
  { day: 'Monday – Thursday', time: '12:00 PM – 12:00 AM', open: true },
  { day: 'Friday – Sunday', time: '12:00 PM – 1:00 AM', open: true },
  { day: 'Public Holidays', time: '12:00 PM – 12:00 AM', open: true },
];

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d105075.11389330449!2d101.470913!3d3.1236305!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc51006c558baf%3A0x789f5ddbd0b8d2b1!2sThe%20Roadside%20Eatery%20Setia%20Alam!5e1!3m2!1sen!2sin!4v1783948928526!5m2!1sen!2sin';

export default function Location() {
  return (
    <section id="location" className="section-pad bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-accent" />
              <span className="font-manrope text-xs text-accent tracking-[0.25em] uppercase font-semibold">
                Find Us
              </span>
            </div>

            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-ink leading-tight mb-8">
              Pull Over for
              <span className="block italic text-accent">Something Good.</span>
            </h2>

            {/* Address */}
            <div className="flex items-start gap-4 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-accent/12 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent transition-colors duration-300">
                <MapPin size={18} className="text-accent group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="font-manrope font-semibold text-ink mb-1">Address</div>
                <div className="font-manrope text-muted leading-relaxed">
                  Jalan Setia Prima,<br />
                  Setia Alam, 40170 Shah Alam,<br />
                  Selangor, Malaysia
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-accent/12 flex items-center justify-center shrink-0">
                <Clock size={18} className="text-accent" />
              </div>
              <div className="flex-1">
                <div className="font-manrope font-semibold text-ink mb-3">Opening Hours</div>
                <div className="space-y-2">
                  {hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between py-2 border-b border-line last:border-0">
                      <span className="font-manrope text-sm text-muted">{h.day}</span>
                      <span className="font-manrope text-sm font-semibold text-accent">
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.google.com/maps/place/The+Roadside+Eatery+Setia+Alam/@3.1236305,101.470913,12z"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ember flex items-center gap-2"
              >
                <Navigation size={16} />
                Get Directions
              </a>
              <a
                href="tel:+60"
                className="btn-outline-ember flex items-center gap-2"
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Map embed + visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative"
          >
            {/* Map */}
            <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(31,27,24,0.12)] h-[400px] md:h-[500px] border-4 border-white">
              <iframe
                title="The Roadside Eatery, Setia Alam, location map"
                src={MAP_SRC}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            {/* Address card overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-5 left-6 right-6 bg-white rounded-2xl p-5 shadow-2xl flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-white" />
              </div>
              <div>
                <div className="font-playfair font-semibold text-ink">The Roadside Eatery</div>
                <div className="font-manrope text-xs text-muted">
                  Setia Alam, Shah Alam, Selangor
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-manrope text-xs text-green-600 font-semibold">Open Now</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
