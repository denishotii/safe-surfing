import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Droplets, Waves, Wind, Users } from 'lucide-react';
import { beaches, goScore, crowdLabel } from '../data/beaches';
import { missions } from '../data/missions';
import { beachPhotos } from '../data/images';
import ScoreGauge from '../components/ScoreGauge';

const sorted = [...beaches].sort((a, b) => goScore(b) - goScore(a));
const hero = sorted[0];
const alternatives = sorted.slice(1, 4);
const heroScore = goScore(hero);
const myMission = missions.find(m => m.joined);

const ecoFact =
  'Chemical sunscreens containing oxybenzone can bleach coral reefs within 96 hours of exposure.';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-28" style={{ background: '#F6F1EA' }}>
      {/* ── Header ── */}
      <div className="px-5 pt-14 pb-5 flex items-start justify-between">
        <div>
          <p className="text-micro uppercase tracking-widest mb-0.5" style={{ color: '#94A3B8' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()} · BALI
          </p>
          <h1 className="text-title font-bold" style={{ color: '#0B1F2E' }}>Morning, Pablo. 🤙</h1>
        </div>
        <motion.button
          whileTap={{ scale: 0.94 }}
          className="relative p-2.5 rounded-lg"
          style={{ background: '#fff', boxShadow: '0 1px 3px rgba(11,31,46,0.04), 0 4px 12px rgba(11,31,46,0.05)' }}
        >
          <Bell size={18} style={{ color: '#4A5568' }} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: '#F97456' }} />
        </motion.button>
      </div>

      <div className="px-5 space-y-8">

        {/* ── Hero Recommendation ── */}
        <section>
          <p className="text-micro uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>TODAY'S BEST CALL</p>

          <motion.div
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate(`/beach/${hero.id}`)}
            className="rounded-xl overflow-hidden cursor-pointer relative"
            style={{ height: 240, boxShadow: '0 6px 20px rgba(11,31,46,0.12), 0 2px 6px rgba(11,31,46,0.06)' }}
          >
            {/* Background photo with gradient fallback */}
            <img
              src={beachPhotos[hero.id]}
              alt={hero.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.82) saturate(0.9)' }}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 30%, rgba(11,31,46,0.72) 100%)' }}
            />
            {/* Score Gauge */}
            <div className="absolute top-3 right-3">
              <ScoreGauge score={heroScore} size="sm" />
            </div>
            {/* Name + pills */}
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-hero text-white font-bold mb-2" style={{ letterSpacing: '-0.02em' }}>
                {hero.name}
              </h2>
              <div className="flex gap-2 flex-wrap">
                {[
                  `👥 ${crowdLabel(hero.crowdScore)}`,
                  '💧 Excellent',
                  `🌊 ${hero.waveHeight}m`,
                ].map(label => (
                  <span
                    key={label}
                    className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full text-white"
                    style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)' }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI verdict */}
          <p className="text-body-lg mt-3 mb-4 leading-relaxed" style={{ color: '#4A5568' }}>
            {hero.aiTip}
          </p>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/beach/${hero.id}`)}
            className="w-full py-4 rounded-md text-label font-bold"
            style={{ background: '#F97456', color: '#fff' }}
          >
            Take me there →
          </motion.button>
        </section>

        {/* ── Alternatives ── */}
        <section>
          <p className="text-micro uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>
            IF NOT {hero.name.split(' ')[0].toUpperCase()}
          </p>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
            {alternatives.map(b => {
              const score = goScore(b);
              const photo = beachPhotos[b.id];
              return (
                <motion.div
                  key={b.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(`/beach/${b.id}`)}
                  className="flex-shrink-0 rounded-xl overflow-hidden cursor-pointer relative"
                  style={{ width: 160, height: 200, boxShadow: '0 2px 8px rgba(11,31,46,0.10)' }}
                >
                  <img
                    src={photo}
                    alt={b.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: 'brightness(0.80) saturate(0.88)' }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(11,31,46,0.75) 100%)' }}
                  />
                  {/* Score badge */}
                  <div
                    className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-xs"
                    style={{ background: 'rgba(255,255,255,0.92)' }}
                  >
                    <span className="text-[13px] font-black tabular" style={{ color: score >= 70 ? '#059669' : score >= 40 ? '#D97706' : '#DC2626' }}>
                      {score}
                    </span>
                  </div>
                  {/* Name + crowd */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-[13px] leading-snug">{b.name}</p>
                    <p className="text-white/65 text-[11px] mt-0.5">{crowdLabel(b.crowdScore)} · {b.waveHeight}m</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Bali-wide conditions ── */}
        <section>
          <p className="text-micro uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>BALI-WIDE TODAY</p>
          <div className="rounded-xl p-4" style={{ background: '#fff', boxShadow: '0 1px 3px rgba(11,31,46,0.04), 0 4px 12px rgba(11,31,46,0.05)' }}>
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: <Droplets size={16} color="#059669" />, value: '7.2', unit: '/10',  label: 'Water' },
                { icon: <Waves    size={16} color="#2563EB" />, value: '1.4', unit: 'm',    label: 'Waves' },
                { icon: <Wind     size={16} color="#0D9488" />, value: '17',  unit: 'km/h', label: 'Wind'  },
                { icon: <Users    size={16} color="#D97706" />, value: '6.1', unit: '/10',  label: 'Crowd' },
              ].map(({ icon, value, unit, label }) => (
                <div key={label} className="flex flex-col items-center text-center">
                  <div className="mb-1">{icon}</div>
                  <div className="tabular">
                    <span className="text-subtitle font-bold" style={{ color: '#0B1F2E' }}>{value}</span>
                    <span className="text-[10px]" style={{ color: '#94A3B8' }}>{unit}</span>
                  </div>
                  <p className="text-micro uppercase tracking-widest mt-0.5" style={{ color: '#94A3B8' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Next mission ── */}
        {myMission && (
          <section>
            <p className="text-micro uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>YOUR NEXT MISSION</p>
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/missions')}
              className="rounded-xl overflow-hidden cursor-pointer"
              style={{ boxShadow: '0 1px 3px rgba(11,31,46,0.04), 0 4px 12px rgba(11,31,46,0.05)' }}
            >
              {/* Photo strip */}
              <div className="relative h-24 overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=700&q=75&fit=crop`}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.72) saturate(0.85)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(11,31,46,0.55) 100%)' }} />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="text-xl">{myMission.ngoEmoji}</span>
                  <span className="text-white font-bold text-[14px]">{myMission.title}</span>
                </div>
              </div>
              {/* Details row */}
              <div className="bg-white px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-caption" style={{ color: '#94A3B8' }}>{myMission.beach}</p>
                  <span
                    className="inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-xs"
                    style={{ background: '#ECFDF5', color: '#059669' }}
                  >
                    ✓ Joined · Tomorrow {myMission.time}
                  </span>
                </div>
                <span className="text-xl" style={{ color: '#94A3B8' }}>›</span>
              </div>
            </motion.div>
          </section>
        )}

        {/* ── Eco moment ── */}
        <section>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #5EEAD4' }}>
            <div
              className="relative h-28"
              style={{ background: 'linear-gradient(135deg, #0D9488 0%, #134E4A 100%)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=700&q=70&fit=crop"
                alt=""
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
              />
              <div className="relative p-4 flex items-end h-full">
                <p className="text-micro uppercase tracking-widest" style={{ color: '#5EEAD4' }}>TODAY'S GREEN MOMENT</p>
              </div>
            </div>
            <div className="p-4" style={{ background: '#CCFBF1' }}>
              <p className="text-body leading-relaxed" style={{ color: '#134E4A' }}>{ecoFact}</p>
              <button
                onClick={() => navigate('/guide')}
                className="mt-2.5 text-caption font-semibold"
                style={{ color: '#0D9488' }}
              >
                Ask Mark about this →
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
