/* AnnouncementBar */

const items = [
  'Now Serving in Setia Alam',
  'Halal',
  'Dine-in & Takeaway',
  'Family & Friends Welcome',
  'Grilled Chops · Steaks · Pasta',
  'Open Daily 12 PM – 12 AM',
  'Now Serving in Setia Alam',
  'Halal',
  'Dine-in & Takeaway',
  'Family & Friends Welcome',
  'Grilled Chops · Steaks · Pasta',
  'Open Daily 12 PM – 12 AM',
];

const dot = (
  <span className="mx-4 text-accent select-none">✦</span>
);

export default function AnnouncementBar() {
  return (
    <div className="bg-ink text-white text-xs font-manrope tracking-widest overflow-hidden py-2.5 fixed top-0 left-0 right-0 w-full z-50">
      <div className="ticker">
        {items.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="uppercase">{item}</span>
            {dot}
          </span>
        ))}
        {/* duplicate for seamless loop */}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="flex items-center shrink-0">
            <span className="uppercase">{item}</span>
            {dot}
          </span>
        ))}
      </div>
    </div>
  );
}
