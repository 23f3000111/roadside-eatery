import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { asset } from '../asset';
import { WHATSAPP_URL, MAPS_URL, PHONE_TEL } from '../site';

function WAGlyph({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.7.9 3.6 1.4 5.6 1.4h.2C24.6 28.8 30 23.4 30 16.8 30 9.4 24.6 3 16 3zm0 23.6c-1.8 0-3.5-.5-5-1.3l-.4-.2-4.3.8.9-4.2-.3-.4C6 19.4 5.4 17.2 5.4 15 5.4 9.2 10.2 4.6 16 4.6c2.8 0 5.4 1.1 7.4 3.1 2 2 3.1 4.6 3.1 7.4 0 5.8-4.8 11.5-10.5 11.5zm6.1-8.4c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6s-.8-1.9-1.1-2.6c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9 0 1.7 1.2 3.3 1.4 3.6.2.2 2.4 3.7 5.9 5.1 2.2.9 3 1 4.1.9.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z" />
    </svg>
  );
}

const FLOW = {
  start: {
    bot: [
      'Hi there! 👋 Welcome to The Roadside Eatery, Setia Alam.',
      'How can I help you today?',
    ],
    options: [
      { label: '🍽️ View menu', next: 'menu' },
      { label: '🔥 Signature dishes', act: 'scroll:#signatures' },
      { label: '📍 Location & hours', next: 'location' },
      { label: '💬 Chat on WhatsApp', act: 'whatsapp' },
    ],
  },
  menu: {
    bot: [
      'Great! Our menu spans grilled chops & steaks, creamy pastas, burgers and cold drinks. 😋',
      'Want me to take you there?',
    ],
    options: [
      { label: 'Show me the menu', act: 'scroll:#menu' },
      { label: "What's popular?", next: 'popular' },
      { label: '⬅ Back', next: 'start' },
    ],
  },
  popular: {
    bot: [
      'Our bestsellers 🌟',
      '• Char-Grilled Chicken Chop, RM18.90\n• Salted Egg Pasta, RM16.90\n• Grilled Ribeye Steak, RM26.90\n• Roadside Beef Burger, RM14.90',
    ],
    options: [
      { label: 'Take me to the menu', act: 'scroll:#menu' },
      { label: '⬅ Back', next: 'menu' },
    ],
  },
  location: {
    bot: [
      "📍 We're on Jalan Setia Prima, Setia Alam, Shah Alam, Selangor.",
      '🕛 Open daily from 12:00 PM till late (1 AM on weekends).\n☎ 012-345 5334',
    ],
    options: [
      { label: 'Open in Maps', act: 'maps', next: 'more' },
      { label: '💬 WhatsApp us', act: 'whatsapp', next: 'more' },
      { label: '⬅ Back', next: 'start' },
    ],
  },
  more: {
    bot: ['Anything else I can help with? 😊'],
    options: [
      { label: '🍽️ View menu', next: 'menu' },
      { label: '📍 Location', next: 'location' },
      { label: '🔁 Start over', next: 'start' },
    ],
  },
};

let idc = 0;
const uid = () => ++idc;

export default function WhatsAppBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [typing, setTyping] = useState(false);
  const [nudge, setNudge] = useState(false);
  const timers = useRef([]);
  const bodyRef = useRef(null);
  const started = useRef(false);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const goToNode = useCallback((nodeId) => {
    const node = FLOW[nodeId];
    if (!node) return;
    setOptions([]);
    setTyping(true);
    let delay = 500;
    node.bot.forEach((text, idx) => {
      const t = setTimeout(() => {
        setMessages((m) => [...m, { id: uid(), from: 'bot', text }]);
        if (idx === node.bot.length - 1) {
          setTyping(false);
          setOptions(node.options);
        }
      }, delay);
      timers.current.push(t);
      delay += 650 + Math.min(text.length * 12, 900);
    });
  }, []);

  useEffect(() => {
    if (open && !started.current) {
      started.current = true;
      goToNode('start');
    }
  }, [open, goToNode]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, options]);

  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 4500);
    return () => clearTimeout(t);
  }, []);

  const runAct = (act) => {
    if (act === 'whatsapp') window.open(WHATSAPP_URL, '_blank', 'noopener');
    else if (act === 'maps') window.open(MAPS_URL, '_blank', 'noopener');
    else if (act === 'call') window.location.href = `tel:${PHONE_TEL}`;
    else if (act.startsWith('scroll:')) {
      const sel = act.split(':')[1];
      setOpen(false);
      setTimeout(() => document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' }), 280);
    }
  };

  const choose = (opt) => {
    setMessages((m) => [...m, { id: uid(), from: 'user', text: opt.label }]);
    setOptions([]);
    if (opt.act) runAct(opt.act);
    if (opt.next) {
      const t = setTimeout(() => goToNode(opt.next), 350);
      timers.current.push(t);
    }
  };

  const toggle = () => {
    setNudge(false);
    setOpen((v) => {
      if (v) clearTimers();
      return !v;
    });
  };

  useEffect(() => () => clearTimers(), []);

  return (
    <>
      {/* Launcher */}
      <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
        <AnimatePresence>
          {nudge && !open && (
            <motion.button
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={toggle}
              className="max-w-[210px] rounded-2xl rounded-br-sm bg-white px-4 py-2.5 text-left text-sm text-[#075E54] shadow-[0_10px_30px_-6px_rgba(0,0,0,0.25)]"
            >
              <span className="font-semibold">Roadside Eatery</span> · Hungry? Tap to see the menu or ask us anything 🍽️
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggle}
          whileTap={{ scale: 0.9 }}
          aria-label="Open Roadside Eatery chat"
          className="relative grid h-16 w-16 place-items-center rounded-full text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)]"
          style={{ background: 'linear-gradient(145deg,#25D366,#128C7E)' }}
        >
          {!open && (
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
          )}
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={26} />
              </motion.span>
            ) : (
              <motion.span key="w" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <WAGlyph />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="fixed bottom-24 right-3 z-[60] flex h-[560px] max-h-[78vh] w-[calc(100vw-1.5rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-black/10 shadow-2xl sm:right-5"
            role="dialog"
            aria-label="Roadside Eatery chat"
          >
            {/* header */}
            <div className="flex items-center gap-3 px-4 py-3 text-white" style={{ background: 'linear-gradient(145deg,#128C7E,#075E54)' }}>
              <div className="relative">
                <img src={asset('images/logo.jpg')} alt="" className="h-10 w-10 rounded-full border-2 border-white/30 object-cover bg-white" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#075E54] bg-[#25D366]" />
              </div>
              <div className="flex-1 leading-tight">
                <p className="font-semibold">The Roadside Eatery</p>
                <p className="text-xs text-white/75">Typically replies instantly</p>
              </div>
              <button onClick={toggle} aria-label="Close chat" className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15">
                <X size={18} />
              </button>
            </div>

            {/* body */}
            <div
              ref={bodyRef}
              className="flex-1 space-y-2 overflow-y-auto px-3 py-4"
              style={{
                background:
                  '#ECE5DD url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'%23ECE5DD\'/%3E%3Cpath d=\'M20 8l2 5 5 2-5 2-2 5-2-5-5-2 5-2z\' fill=\'%23000\' opacity=\'.025\'/%3E%3C/svg%3E")',
              }}
            >
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm shadow-sm ${
                        m.from === 'user'
                          ? 'rounded-br-sm bg-[#DCF8C6] text-[#075E54]'
                          : 'rounded-bl-sm bg-white text-gray-800'
                      }`}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-3.5 py-3 shadow-sm">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* quick replies */}
            <div className="border-t border-black/5 bg-[#F0F0F0] px-3 py-3">
              <AnimatePresence mode="popLayout">
                {options.length > 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-wrap gap-2">
                    {options.map((o) => (
                      <button
                        key={o.label}
                        onClick={() => choose(o)}
                        className="rounded-full border border-[#128C7E]/40 bg-white px-3.5 py-1.5 text-sm font-medium text-[#075E54] transition-colors hover:bg-[#128C7E] hover:text-white"
                      >
                        {o.label}
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <p className="py-1.5 text-center text-xs text-gray-400">typing…</p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
