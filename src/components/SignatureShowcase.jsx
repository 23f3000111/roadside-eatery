import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { asset } from '../asset';

/* Sticky-image scroll showcase.
   Each signature plate carries its real studio-backdrop colour, which we use
   as the per-step accent so the vivid photography drives the palette. */

const dishes = [
  {
    id: 1,
    name: 'Char-Grilled Chicken Chop',
    tag: 'House Favourite',
    desc: 'Our signature plate — flame-grilled quarter chicken glazed in smoky black-pepper sauce, with golden fries and creamy coleslaw. The one everybody orders.',
    price: 'RM 18.90',
    img: asset('images/chicken-chop.jpg'),
    color: '#C99A5B',
  },
  {
    id: 2,
    name: 'Ribeye Steak & Fries',
    tag: 'The Big Plate',
    desc: 'A generous cut seared over open flame, brushed with our house BBQ glaze and served with shoestring fries, slaw and a pot of black-pepper gravy.',
    price: 'RM 26.90',
    img: asset('images/steak-fries.jpg'),
    color: '#C99A5B',
  },
  {
    id: 3,
    name: 'Salted Egg Pasta',
    tag: 'Creamy & Bold',
    desc: 'Silky salted-egg cream folded through linguine, crowned with crispy grilled chicken and a scatter of chilli flakes. Rich, savoury, a little addictive.',
    price: 'RM 16.90',
    img: asset('images/salted-egg-pasta.jpg'),
    color: '#E8622A',
  },
  {
    id: 4,
    name: 'Aglio Olio Grilled Chicken',
    tag: 'Garlic & Chilli',
    desc: 'Olive-oil linguine tossed with toasted garlic, chilli and herbs, finished with sliced grilled chicken and shaved parmesan. Simple done properly.',
    price: 'RM 15.90',
    img: asset('images/aglio-olio.jpg'),
    color: '#1D4ED8',
  },
];

export default function SignatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { threshold: 0.4, rootMargin: '-20% 0px -20% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const accent = dishes[activeIndex].color;

  return (
    <section id="signatures" className="bg-[#1F1B18]">
      <div className="lg:flex">

        {/* ══ LEFT — sticky image panel (desktop only) ══ */}
        <div className="hidden lg:block lg:w-1/2">
          <div
            style={{ position: 'sticky', top: '90px', height: 'calc(100vh - 90px)' }}
            className="flex flex-col p-8 justify-center"
          >
            {/* Section label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5" style={{ backgroundColor: accent, transition: 'background-color 0.6s' }} />
              <span className="font-manrope text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: accent, transition: 'color 0.6s' }}>
                Signature Plates
              </span>
            </div>

            {/* Image frame */}
            <div className="relative flex-1 rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
              {dishes.map((item, i) => (
                <motion.img
                  key={item.id}
                  src={item.img}
                  alt={item.name}
                  animate={{
                    opacity: i === activeIndex ? 1 : 0,
                    scale:   i === activeIndex ? 1 : 1.05,
                  }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ zIndex: i === activeIndex ? 2 : 1 }}
                />
              ))}

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                style={{ zIndex: 3 }}
              />

              {/* Price — crossfade per dish */}
              <div className="absolute bottom-7 left-7" style={{ zIndex: 4 }}>
                {dishes.map((item, i) => (
                  <motion.span
                    key={item.id}
                    animate={{
                      opacity: i === activeIndex ? 1 : 0,
                      y:       i === activeIndex ? 0 : 10,
                    }}
                    transition={{ duration: 0.4 }}
                    className="block font-playfair text-4xl font-bold text-white absolute bottom-0 left-0 whitespace-nowrap"
                  >
                    {item.price}
                  </motion.span>
                ))}
                <span className="invisible font-playfair text-4xl font-bold">RM 00.00</span>
              </div>

              {/* Progress indicator dots */}
              <div
                className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2"
                style={{ zIndex: 4 }}
              >
                {dishes.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-500"
                    style={
                      i === activeIndex
                        ? { width: '6px', height: '32px', backgroundColor: accent }
                        : { width: '6px', height: '6px', backgroundColor: 'rgba(255,255,255,0.3)' }
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ RIGHT — scrolling steps ══ */}
        <div className="lg:w-1/2">
          {/* Mobile-only section header */}
          <div className="lg:hidden px-6 pt-20 pb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-[#E8622A]" />
              <span className="font-manrope text-xs text-[#E8622A] tracking-[0.25em] uppercase font-semibold">
                Signature Plates
              </span>
            </div>
            <h2 className="font-playfair text-4xl font-bold text-white">
              Grilled to <span className="italic text-[#E8622A]">Order.</span>
            </h2>
          </div>

          {dishes.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => (stepRefs.current[i] = el)}
              className="min-h-screen flex flex-col justify-center px-8 md:px-12 lg:px-14 py-24"
            >
              {/* Mobile image */}
              <div className="lg:hidden w-full h-56 rounded-2xl overflow-hidden mb-8 shadow-xl">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>

              {/* Step number */}
              <span
                className="font-playfair text-[7rem] font-bold leading-none block mb-2 select-none"
                style={{ color: `${item.color}33` }}
              >
                0{i + 1}
              </span>

              {/* Tag */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-5 h-0.5" style={{ backgroundColor: item.color }} />
                <span
                  className="font-manrope text-xs font-semibold tracking-widest uppercase"
                  style={{ color: item.color }}
                >
                  {item.tag}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-playfair text-3xl md:text-4xl xl:text-[2.75rem] font-bold text-white leading-tight mb-5">
                {item.name}
              </h3>

              {/* Description */}
              <p className="font-manrope text-lg text-white/55 leading-relaxed max-w-sm mb-8">
                {item.desc}
              </p>

              {/* Mobile price */}
              <div className="lg:hidden font-playfair text-3xl font-bold mb-6" style={{ color: item.color }}>
                {item.price}
              </div>

              {/* CTA link */}
              <button
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 font-manrope font-semibold text-sm uppercase tracking-widest group w-fit"
                style={{ color: item.color }}
              >
                See Full Menu
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
