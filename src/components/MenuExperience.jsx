import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = ['Grills & Chops', 'Pasta', 'Burgers & Sides', 'Drinks'];

const menu = {
  'Grills & Chops': [
    { name: 'Char-Grilled Chicken Chop', price: 'RM 18.90', tag: 'House Fav ✦' },
    { name: 'Black Pepper Chicken Chop', price: 'RM 18.90', tag: 'Popular' },
    { name: 'BBQ Chicken Chop', price: 'RM 18.90', tag: 'Smoky' },
    { name: 'Grilled Ribeye Steak', price: 'RM 26.90', tag: 'Premium' },
    { name: 'New Zealand Lamb Chop', price: 'RM 28.90', tag: 'Premium' },
    { name: 'Chicken & Rib Combo', price: 'RM 24.90', tag: 'Sharing' },
    { name: 'Grilled Fish & Chips', price: 'RM 17.90', tag: 'Classic' },
    { name: 'Mixed Grill Platter', price: 'RM 32.90', tag: 'For Two ✦' },
  ],
  Pasta: [
    { name: 'Salted Egg Pasta', price: 'RM 16.90', tag: 'Signature ✦' },
    { name: 'Aglio Olio Grilled Chicken', price: 'RM 15.90', tag: 'Garlic & Chilli' },
    { name: 'Creamy Chicken Carbonara', price: 'RM 15.90', tag: 'Rich' },
    { name: 'Beef Bolognese', price: 'RM 15.90', tag: 'Classic' },
    { name: 'Tom Yam Seafood Pasta', price: 'RM 16.90', tag: 'Spicy' },
    { name: 'Marinara Pomodoro', price: 'RM 14.90', tag: 'Meat-Free' },
  ],
  'Burgers & Sides': [
    { name: 'Roadside Beef Burger', price: 'RM 14.90', tag: 'House Fav' },
    { name: 'Double-Stack Beef Burger', price: 'RM 19.90', tag: 'Big Bite ✦' },
    { name: 'Crispy Chicken Burger', price: 'RM 13.90', tag: 'Crunchy' },
    { name: 'Loaded Cheese Fries', price: 'RM 10.90', tag: 'Shareable' },
    { name: 'Grilled Chicken Wings (6)', price: 'RM 12.90', tag: 'Smoky' },
    { name: 'Creamy Coleslaw', price: 'RM 5.90', tag: 'Side' },
  ],
  Drinks: [
    { name: 'Iced Café Latte', price: 'RM 8.90', tag: 'Chill' },
    { name: 'Electric Blue Lemonade', price: 'RM 7.90', tag: 'Refreshing ✦' },
    { name: 'Iced Milo Dinosaur', price: 'RM 8.90', tag: 'Local Fav' },
    { name: 'Sirap Bandung Soda', price: 'RM 6.90', tag: 'Sweet' },
    { name: 'Iced Lemon Tea', price: 'RM 6.90', tag: 'Classic' },
    { name: 'Fresh Orange Juice', price: 'RM 8.90', tag: 'Freshly Pressed' },
  ],
};

const tabIcons = {
  'Grills & Chops': '🍗',
  Pasta: '🍝',
  'Burgers & Sides': '🍔',
  Drinks: '🥤',
};

export default function MenuExperience() {
  const [active, setActive] = useState('Grills & Chops');

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
            <div className="w-8 h-0.5 bg-[#E8622A]" />
            <span className="font-manrope text-xs text-[#E8622A] tracking-[0.25em] uppercase font-semibold">
              The Menu
            </span>
            <div className="w-8 h-0.5 bg-[#E8622A]" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1F1B18] mb-4">
            Comfort Food, Done Right.
          </h2>
          <p className="font-manrope text-lg text-[#6B5F55] max-w-xl mx-auto">
            Flame-grilled chops and steaks, creamy pastas, stacked burgers and cold drinks.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap justify-center gap-2 bg-[#FBF6EF] rounded-full p-1.5 shadow-inner">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full font-manrope text-sm font-semibold transition-all duration-300 ${
                  active === tab
                    ? 'text-white shadow-lg'
                    : 'text-[#6B5F55] hover:text-[#E8622A]'
                }`}
              >
                {active === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-[#E8622A]"
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
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-[#FBF6EF] rounded-2xl p-5 border border-[#EFE6DA] card-lift cursor-default"
              >
                {/* Tag */}
                <span className="inline-block font-manrope text-[10px] font-semibold tracking-widest uppercase text-[#C24A18] bg-[#E8622A]/10 px-2.5 py-1 rounded-full mb-3">
                  {item.tag}
                </span>

                {/* Name */}
                <h3 className="font-playfair font-semibold text-[#1F1B18] text-base leading-snug mb-3 group-hover:text-[#C24A18] transition-colors">
                  {item.name}
                </h3>

                {/* Divider */}
                <div className="w-8 h-0.5 bg-[#E8622A]/40 mb-3 group-hover:w-16 transition-all duration-500" />

                {/* Price */}
                <div className="font-playfair font-bold text-xl text-[#E8622A]">
                  {item.price}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center font-manrope text-sm text-[#9A8E82] mt-10"
        >
          Prices are indicative • All grills served with fries &amp; coleslaw • Dine-in &amp; takeaway available
        </motion.p>
      </div>
    </section>
  );
}
