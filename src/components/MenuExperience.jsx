import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Plus } from 'lucide-react';
import { asset } from '../asset';

const TABS = ['Grills & Chops', 'Pasta', 'Burgers & Sides', 'Drinks'];

/* Each item carries a photo (where we have one), a short blurb and mock
   nutrition facts so the pop-up can show an image + the dish's nutrients. */
const menu = {
  'Grills & Chops': [
    { name: 'Char-Grilled Chicken Chop', price: 'RM 18.90', tag: 'House Fav ✦', img: 'chicken-chop.jpg', emoji: '🍗',
      desc: 'Flame-grilled quarter chicken glazed in smoky black-pepper sauce, with golden fries and creamy coleslaw.',
      nutri: { kcal: 640, protein: '46 g', carbs: '38 g', fat: '32 g' } },
    { name: 'Black Pepper Chicken Chop', price: 'RM 18.90', tag: 'Popular', img: 'chicken-chop.jpg', emoji: '🍗',
      desc: 'Juicy grilled chicken drenched in a peppery brown gravy, served with fries and slaw.',
      nutri: { kcal: 620, protein: '44 g', carbs: '40 g', fat: '30 g' } },
    { name: 'BBQ Chicken Chop', price: 'RM 18.90', tag: 'Smoky', img: 'chicken-chop.jpg', emoji: '🍗',
      desc: 'Sweet-smoky barbecue glaze over char-grilled chicken, fries and coleslaw.',
      nutri: { kcal: 660, protein: '45 g', carbs: '44 g', fat: '31 g' } },
    { name: 'Grilled Ribeye Steak', price: 'RM 26.90', tag: 'Premium', img: 'steak-fries.jpg', emoji: '🥩',
      desc: 'A tender ribeye seared over open flame with house BBQ glaze, fries and black-pepper gravy.',
      nutri: { kcal: 720, protein: '52 g', carbs: '34 g', fat: '40 g' } },
    { name: 'New Zealand Lamb Chop', price: 'RM 28.90', tag: 'Premium', img: 'steak-fries.jpg', emoji: '🍖',
      desc: 'Marinated NZ lamb chops grilled to a smoky finish, with mint sauce, fries and slaw.',
      nutri: { kcal: 780, protein: '48 g', carbs: '32 g', fat: '46 g' } },
    { name: 'Chicken & Rib Combo', price: 'RM 24.90', tag: 'Sharing', img: 'chicken-chop.jpg', emoji: '🍗',
      desc: 'Half a grilled chicken with smoky pork-free beef ribs, loaded fries and coleslaw.',
      nutri: { kcal: 900, protein: '60 g', carbs: '52 g', fat: '48 g' } },
    { name: 'Grilled Fish & Chips', price: 'RM 17.90', tag: 'Classic', img: 'steak-fries.jpg', emoji: '🐟',
      desc: 'Grilled dory fillet with crispy fries, tartar sauce and a lemon wedge.',
      nutri: { kcal: 560, protein: '38 g', carbs: '46 g', fat: '24 g' } },
    { name: 'Mixed Grill Platter', price: 'RM 32.90', tag: 'For Two ✦', img: 'steak-fries.jpg', emoji: '🍽️',
      desc: 'Chicken chop, beef sausage, lamb and wings piled with fries, a sharing feast.',
      nutri: { kcal: 1180, protein: '74 g', carbs: '58 g', fat: '64 g' } },
  ],
  Pasta: [
    { name: 'Salted Egg Pasta', price: 'RM 16.90', tag: 'Signature ✦', img: 'salted-egg-pasta.jpg', emoji: '🍝',
      desc: 'Silky salted-egg cream over linguine, crowned with crispy grilled chicken and chilli flakes.',
      nutri: { kcal: 720, protein: '34 g', carbs: '68 g', fat: '36 g' } },
    { name: 'Aglio Olio Grilled Chicken', price: 'RM 15.90', tag: 'Garlic & Chilli', img: 'aglio-olio.jpg', emoji: '🍝',
      desc: 'Olive-oil linguine tossed with toasted garlic and chilli, topped with sliced grilled chicken.',
      nutri: { kcal: 610, protein: '30 g', carbs: '64 g', fat: '26 g' } },
    { name: 'Creamy Chicken Carbonara', price: 'RM 15.90', tag: 'Rich', img: 'salted-egg-pasta.jpg', emoji: '🍝',
      desc: 'Classic creamy carbonara with smoked chicken, parmesan and cracked black pepper.',
      nutri: { kcal: 780, protein: '32 g', carbs: '66 g', fat: '42 g' } },
    { name: 'Beef Bolognese', price: 'RM 15.90', tag: 'Classic', img: 'aglio-olio.jpg', emoji: '🍝',
      desc: 'Slow-cooked beef ragù over spaghetti, finished with parmesan and basil.',
      nutri: { kcal: 640, protein: '36 g', carbs: '70 g', fat: '24 g' } },
    { name: 'Tom Yam Seafood Pasta', price: 'RM 16.90', tag: 'Spicy', img: 'aglio-olio.jpg', emoji: '🍤',
      desc: 'Aromatic, spicy tom-yam cream with prawns, squid and linguine.',
      nutri: { kcal: 660, protein: '34 g', carbs: '62 g', fat: '30 g' } },
    { name: 'Marinara Pomodoro', price: 'RM 14.90', tag: 'Meat-Free', img: 'aglio-olio.jpg', emoji: '🍅',
      desc: 'Bright tomato-basil sauce over spaghetti, a simple meat-free favourite.',
      nutri: { kcal: 520, protein: '16 g', carbs: '78 g', fat: '14 g' } },
  ],
  'Burgers & Sides': [
    { name: 'Roadside Beef Burger', price: 'RM 14.90', tag: 'House Fav', emoji: '🍔',
      desc: 'Grilled beef patty, cheddar, caramelised onion and house sauce in a toasted brioche bun.',
      nutri: { kcal: 560, protein: '28 g', carbs: '42 g', fat: '30 g' } },
    { name: 'Double-Stack Beef Burger', price: 'RM 19.90', tag: 'Big Bite ✦', emoji: '🍔',
      desc: 'Two beef patties, double cheese and crispy onions, for a serious appetite.',
      nutri: { kcal: 820, protein: '46 g', carbs: '44 g', fat: '50 g' } },
    { name: 'Crispy Chicken Burger', price: 'RM 13.90', tag: 'Crunchy', emoji: '🍔',
      desc: 'Buttermilk-fried chicken thigh with slaw and spicy mayo in a soft bun.',
      nutri: { kcal: 600, protein: '30 g', carbs: '48 g', fat: '32 g' } },
    { name: 'Loaded Cheese Fries', price: 'RM 10.90', tag: 'Shareable', emoji: '🍟',
      desc: 'Crispy fries smothered in melted cheese sauce, beef bits and spring onion.',
      nutri: { kcal: 640, protein: '18 g', carbs: '58 g', fat: '38 g' } },
    { name: 'Grilled Chicken Wings (6)', price: 'RM 12.90', tag: 'Smoky', emoji: '🍗',
      desc: 'Six smoky char-grilled wings tossed in your choice of BBQ or spicy glaze.',
      nutri: { kcal: 480, protein: '34 g', carbs: '12 g', fat: '32 g' } },
    { name: 'Creamy Coleslaw', price: 'RM 5.90', tag: 'Side', emoji: '🥗',
      desc: 'Cool, crunchy cabbage and carrot in a light creamy dressing.',
      nutri: { kcal: 180, protein: '3 g', carbs: '14 g', fat: '12 g' } },
  ],
  Drinks: [
    { name: 'Iced Café Latte', price: 'RM 8.90', tag: 'Chill', emoji: '🥤',
      desc: 'Double-shot espresso over milk and ice, smooth and lightly sweet.',
      nutri: { kcal: 150, protein: '8 g', carbs: '16 g', fat: '6 g' } },
    { name: 'Electric Blue Lemonade', price: 'RM 7.90', tag: 'Refreshing ✦', emoji: '🥤',
      desc: 'Zesty lemonade with a splash of blue, bright, fizzy and cooling.',
      nutri: { kcal: 130, protein: '0 g', carbs: '33 g', fat: '0 g' } },
    { name: 'Iced Milo Dinosaur', price: 'RM 8.90', tag: 'Local Fav', emoji: '🥤',
      desc: 'Iced chocolate malt drink piled with a generous heap of Milo powder.',
      nutri: { kcal: 280, protein: '7 g', carbs: '46 g', fat: '7 g' } },
    { name: 'Sirap Bandung Soda', price: 'RM 6.90', tag: 'Sweet', emoji: '🥤',
      desc: 'Rose syrup and milk topped with soda, a nostalgic pink cooler.',
      nutri: { kcal: 190, protein: '3 g', carbs: '40 g', fat: '4 g' } },
    { name: 'Iced Lemon Tea', price: 'RM 6.90', tag: 'Classic', emoji: '🥤',
      desc: 'Freshly brewed tea with lemon over ice, the everyday classic.',
      nutri: { kcal: 110, protein: '0 g', carbs: '28 g', fat: '0 g' } },
    { name: 'Fresh Orange Juice', price: 'RM 8.90', tag: 'Freshly Pressed', emoji: '🍊',
      desc: 'Whole oranges pressed to order, nothing added.',
      nutri: { kcal: 130, protein: '2 g', carbs: '31 g', fat: '0 g' } },
  ],
};

const tabIcons = {
  'Grills & Chops': '🍗',
  Pasta: '🍝',
  'Burgers & Sides': '🍔',
  Drinks: '🥤',
};

/* Image or, when we have no photo, a themed emoji panel */
function DishVisual({ item, className = '' }) {
  if (item.img) {
    return (
      <img
        src={asset(`images/${item.img}`)}
        alt={item.name}
        className={`w-full h-full object-cover object-[center_60%] ${className}`}
      />
    );
  }
  return (
    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/15 to-gold/15 ${className}`}>
      <span className="text-6xl md:text-7xl select-none">{item.emoji}</span>
    </div>
  );
}

export default function MenuExperience() {
  const [active, setActive] = useState('Grills & Chops');
  const [selected, setSelected] = useState(null);

  // Esc to close + lock body scroll while the modal is open
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [selected]);

  return (
    <section id="menu" className="section-pad bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-accent" />
            <span className="font-manrope text-xs text-accent tracking-[0.25em] uppercase font-semibold">
              The Menu
            </span>
            <div className="w-8 h-0.5 bg-accent" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-ink mb-4">
            Comfort Food, Done Right.
          </h2>
          <p className="font-manrope text-lg text-muted max-w-xl mx-auto">
            Tap any dish for a closer look, its story and the nutrition.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap justify-center gap-2 bg-surface rounded-full p-1.5 shadow-inner">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full font-manrope text-sm font-semibold transition-all duration-300 ${
                  active === tab ? 'text-white shadow-lg' : 'text-muted hover:text-accent'
                }`}
              >
                {active === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tabIcons[tab]}</span>
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {menu[active].map((item, i) => (
              <motion.button
                key={item.name}
                onClick={() => setSelected(item)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative text-left bg-surface rounded-2xl overflow-hidden border border-line card-lift"
              >
                {/* Thumbnail */}
                <div className="relative h-36 overflow-hidden">
                  <DishVisual item={item} className="transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  <span className="absolute top-3 left-3 font-manrope text-[10px] font-semibold tracking-widest uppercase text-white bg-accent/85 px-2.5 py-1 rounded-full">
                    {item.tag}
                  </span>
                  <span className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 text-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus size={16} />
                  </span>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="font-playfair font-semibold text-ink text-base leading-snug mb-2 group-hover:text-accent-deep transition-colors">
                    {item.name}
                  </h3>
                  <div className="w-8 h-0.5 bg-accent/40 mb-3 group-hover:w-16 transition-all duration-500" />
                  <div className="flex items-center justify-between">
                    <span className="font-playfair font-bold text-xl text-accent">{item.price}</span>
                    <span className="font-manrope text-[11px] text-muted">{item.nutri.kcal} kcal</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center font-manrope text-sm text-muted mt-10"
        >
          Prices &amp; nutrition are indicative • All grills served with fries &amp; coleslaw • Dine-in &amp; takeaway available
        </motion.p>
      </div>

      {/* ── Dish pop-up ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selected.name}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[88vh] overflow-y-auto hide-scrollbar"
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-ink flex items-center justify-center shadow-md hover:bg-white"
              >
                <X size={18} />
              </button>

              {/* Image */}
              <div className="relative h-56 md:h-64">
                <DishVisual item={selected} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="font-manrope text-[10px] tracking-[0.2em] uppercase font-semibold text-white/90 bg-accent/85 px-2.5 py-1 rounded-full">
                    {selected.tag}
                  </span>
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white leading-tight mt-2">
                    {selected.name}
                  </h3>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 md:p-7">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-playfair font-bold text-2xl text-accent">{selected.price}</span>
                  <span className="inline-flex items-center gap-1.5 font-manrope text-xs font-semibold text-accent-deep bg-accent/10 px-3 py-1.5 rounded-full">
                    <Flame size={13} /> Grilled fresh to order
                  </span>
                </div>

                <p className="font-manrope text-[15px] text-muted leading-relaxed mb-6">
                  {selected.desc}
                </p>

                {/* Nutrition */}
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-manrope text-xs font-semibold tracking-widest uppercase text-ink">
                    Nutrition
                  </span>
                  <span className="font-manrope text-[11px] text-muted">· per serving (approx.)</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Calories', value: `${selected.nutri.kcal}` },
                    { label: 'Protein', value: selected.nutri.protein },
                    { label: 'Carbs', value: selected.nutri.carbs },
                    { label: 'Fat', value: selected.nutri.fat },
                  ].map((n) => (
                    <div key={n.label} className="rounded-2xl bg-surface border border-line p-3 text-center">
                      <div className="font-playfair font-bold text-lg text-ink leading-none mb-1">{n.value}</div>
                      <div className="font-manrope text-[10px] uppercase tracking-wider text-muted">{n.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
