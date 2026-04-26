import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { onDone: () => void; }

// Unsplash photos — Bali surf & ocean scenes (no API key needed, direct image URLs)
const slides = [
  {
    // Bali surfer on a clean wave
    image: 'https://images.unsplash.com/photo-1505459668311-8dfac7952bf0?w=900&q=80&auto=format&fit=crop',
    headline: 'Find your wave.',
    sub: 'Live conditions for every beach in Bali.',
  },
  {
    // Crowded beach from above / aerial
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80&auto=format&fit=crop',
    headline: 'Beat the crowd.',
    sub: 'Smart routing away from busy spots.',
  },
  {
    // People doing beach cleanup / community
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=900&q=80&auto=format&fit=crop',
    headline: 'Protect what you love.',
    sub: 'Earn rewards. Join the people who care.',
  },
];

const levelOptions = [
  { id: 'beginner',     label: 'Beginner',     icon: '🤙', desc: 'Learning the basics' },
  { id: 'intermediate', label: 'Intermediate',  icon: '🏄', desc: 'Getting in the pocket' },
  { id: 'advanced',     label: 'Advanced',      icon: '🔥', desc: 'Charging it' },
];

export default function Splash({ onDone }: Props) {
  const [phase, setPhase] = useState<'splash' | 'onboard' | 'setup'>('splash');
  const [slideIndex, setSlideIndex] = useState(0);
  const [level, setLevel] = useState<string | null>(null);

  // Auto-advance splash
  useEffect(() => {
    const t = setTimeout(() => setPhase('onboard'), 1800);
    return () => clearTimeout(t);
  }, []);

  function nextSlide() {
    if (slideIndex < slides.length - 1) setSlideIndex(i => i + 1);
    else setPhase('setup');
  }

  const slide = slides[slideIndex];

  if (phase === 'splash') {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen"
        style={{ background: '#F6F1EA' }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-900 flex items-center justify-center shadow-pop">
            <span className="text-3xl">🌊</span>
          </div>
          <div className="text-center">
            <h1 className="text-hero font-black" style={{ color: '#0B1F2E', letterSpacing: '-0.02em' }}>WaterMark</h1>
            <p className="text-caption mt-1" style={{ color: '#94A3B8' }}>Surf Smart. Stay Green.</p>
          </div>
          {/* Wave SVG */}
          <svg width="120" height="20" viewBox="0 0 120 20" fill="none">
            <path
              d="M0 10 Q15 2 30 10 Q45 18 60 10 Q75 2 90 10 Q105 18 120 10"
              stroke="#0D9488"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              className="wave-draw"
            />
          </svg>
        </motion.div>
      </motion.div>
    );
  }

  if (phase === 'onboard') {
    return (
      <div className="min-h-screen flex flex-col overflow-hidden" style={{ background: '#0B1F2E' }}>
        {/* Progress lines */}
        <div className="flex gap-1.5 px-5 pt-14 pb-0">
          {slides.map((_, i) => (
            <div
              key={i}
              className="h-0.5 rounded-full flex-1 transition-all duration-300"
              style={{ background: i <= slideIndex ? '#fff' : 'rgba(255,255,255,0.25)' }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            className="flex-1 flex flex-col justify-end relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' as const }}
          >
            {/* Background photo */}
            <img
              src={slide.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.75) saturate(0.9)' }}
            />
            {/* Dark gradient overlay for text legibility */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 35%, rgba(11,31,46,0.82) 100%)' }} />
            <div className="relative px-6 pb-40">
              <h2 className="text-display text-white font-black mb-3 leading-tight" style={{ letterSpacing: '-0.03em' }}>
                {slide.headline}
              </h2>
              <p className="text-body-lg" style={{ color: 'rgba(255,255,255,0.78)' }}>{slide.sub}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Actions */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-12 flex items-center justify-between">
          <button
            onClick={onDone}
            className="text-label font-semibold"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Skip
          </button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={nextSlide}
            className="text-label font-bold px-7 py-3.5 rounded-md"
            style={{ background: '#F97456', color: '#fff' }}
          >
            {slideIndex < slides.length - 1 ? 'Continue →' : 'Get Started →'}
          </motion.button>
        </div>
      </div>
    );
  }

  // Setup
  return (
    <div className="min-h-screen flex flex-col px-5 pt-16 pb-12" style={{ background: '#F6F1EA' }}>
      <h1 className="text-title font-bold mb-1" style={{ color: '#0B1F2E' }}>Your surf level?</h1>
      <p className="text-body mb-8" style={{ color: '#94A3B8' }}>So we can tune the recommendations for you.</p>

      <div className="flex flex-col gap-3 mb-10">
        {levelOptions.map(opt => (
          <motion.button
            key={opt.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLevel(opt.id)}
            className="flex items-center gap-4 p-4 rounded-xl text-left transition-all"
            style={{
              background: level === opt.id ? '#CCFBF1' : '#fff',
              border: `2px solid ${level === opt.id ? '#0D9488' : 'transparent'}`,
              boxShadow: '0 1px 3px rgba(11,31,46,0.04), 0 4px 12px rgba(11,31,46,0.05)',
            }}
          >
            <span className="text-3xl">{opt.icon}</span>
            <div>
              <p className="text-subtitle font-bold" style={{ color: '#0B1F2E' }}>{opt.label}</p>
              <p className="text-caption" style={{ color: '#94A3B8' }}>{opt.desc}</p>
            </div>
            {level === opt.id && (
              <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center text-white text-xs" style={{ background: '#0D9488' }}>✓</div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="mt-auto">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onDone}
          disabled={!level}
          className="w-full py-4 rounded-md text-label font-bold"
          style={{
            background: level ? '#F97456' : '#EDE6D9',
            color: level ? '#fff' : '#94A3B8',
          }}
        >
          Let's go 🤙
        </motion.button>
      </div>
    </div>
  );
}
