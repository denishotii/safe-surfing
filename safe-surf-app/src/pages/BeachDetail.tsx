import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, Droplets, Waves, Wind, Users } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  getBeachById, goScore,
  waterStatusType, crowdStatusType, hourlyData
} from '../data/beaches';
import ScoreGauge from '../components/ScoreGauge';
import { beachPhotos } from '../data/images';

export default function BeachDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const beach = getBeachById(id!);
  const [checkedIn, setCheckedIn] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!beach) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ background: '#F6F1EA' }}>
        <p style={{ color: '#94A3B8' }}>Beach not found.</p>
      </div>
    );
  }

  const score = goScore(beach);
  const isWarning = score < 40;

  const conditionCells = [
    { icon: <Droplets size={18} />, value: beach.waterQualityScore.toFixed(1), unit: '/10', label: 'Water', type: waterStatusType(beach.waterQualityScore) },
    { icon: <Waves size={18} />,    value: beach.waveHeight,                   unit: 'm',   label: 'Waves', type: 'info' as const },
    { icon: <Wind size={18} />,     value: beach.windSpeed,                     unit: 'km', label: 'Wind',  type: 'info' as const },
    { icon: <Users size={18} />,    value: beach.crowdScore.toFixed(1),         unit: '/10', label: 'Crowd', type: crowdStatusType(beach.crowdScore) },
  ];

  const statusColors = {
    go:    { text: '#059669', icon: '1px solid #A7F3D0' },
    check: { text: '#D97706', icon: '1px solid #FDE68A' },
    avoid: { text: '#DC2626', icon: '1px solid #FECACA' },
    info:  { text: '#2563EB', icon: '1px solid #BFDBFE' },
  };

  return (
    <div className="min-h-screen pb-28" style={{ background: '#F6F1EA' }}>
      {/* Hero */}
      <div className="relative" style={{ height: 320 }}>
        {/* Photo */}
        <img
          src={beachPhotos[beach.id]}
          alt={beach.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.80) saturate(0.9)' }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 35%, rgba(11,31,46,0.75) 100%)' }}
        />

        {/* Top bar: back + save/share */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-12">
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}
            aria-label="Back"
          >
            <ArrowLeft size={18} color="white" />
          </motion.button>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => setSaved(s => !s)}
              className="p-2.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}
            >
              <Heart size={18} color="white" fill={saved ? 'white' : 'none'} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.93 }}
              className="p-2.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}
            >
              <Share2 size={18} color="white" />
            </motion.button>
          </div>
        </div>

        {/* Bottom: name + tags + score gauge */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 flex items-end justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-hero text-white font-bold mb-2" style={{ letterSpacing: '-0.02em' }}>{beach.name}</h1>
            <div className="flex gap-2 flex-wrap">
              {beach.tags.map(tag => (
                <span key={tag} className="text-[11px] font-semibold text-white px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
            <ScoreGauge score={score} size="sm" />
          </div>
        </div>
      </div>

      {/* AI verdict strip */}
      <div className="px-5 py-4" style={{ background: '#fff', borderBottom: '1px solid rgba(11,31,46,0.06)' }}>
        <p
          className="text-body-lg leading-relaxed"
          style={{ color: isWarning ? '#DC2626' : '#4A5568' }}
        >
          {beach.aiTip}
        </p>
      </div>

      <div className="px-5 space-y-5 mt-5">
        {/* Conditions strip */}
        <div className="rounded-xl overflow-hidden shadow-soft" style={{ background: '#fff' }}>
          <div className="grid grid-cols-4 divide-x" style={{ borderColor: 'rgba(11,31,46,0.06)' }}>
            {conditionCells.map(({ icon, value, unit, label, type }) => {
              const col = statusColors[type].text;
              return (
                <div key={label} className="flex flex-col items-center py-4 px-1">
                  <div className="mb-1.5" style={{ color: col }}>{icon}</div>
                  <div className="tabular text-center">
                    <span className="text-subtitle font-bold" style={{ color: '#0B1F2E' }}>{value}</span>
                    <span className="text-[10px] font-medium" style={{ color: '#94A3B8' }}>{unit}</span>
                  </div>
                  <p className="text-micro uppercase tracking-widest mt-1" style={{ color: '#94A3B8' }}>{label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's timeline */}
        <div className="rounded-xl p-4 shadow-soft" style={{ background: '#fff' }}>
          <p className="text-micro uppercase tracking-widest mb-4" style={{ color: '#94A3B8' }}>TODAY'S PATTERN</p>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={hourlyData} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gCrowd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97456" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F97456" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gWave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ fontSize: 11, borderRadius: 10, border: 'none', boxShadow: '0 4px 12px rgba(11,31,46,0.10)', fontFamily: 'Plus Jakarta Sans' }}
              />
              <Area type="monotone" dataKey="crowd" name="Crowd" stroke="#F97456" fill="url(#gCrowd)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="wave"  name="Wave (m)" stroke="#2563EB" fill="url(#gWave)"  strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div className="flex gap-4 justify-center mt-2">
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 rounded" style={{ background: '#F97456' }} /><span className="text-[11px]" style={{ color: '#94A3B8' }}>Crowd</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 rounded" style={{ background: '#2563EB' }} /><span className="text-[11px]" style={{ color: '#94A3B8' }}>Wave height</span></div>
          </div>
          {/* Best window pills */}
          <div className="flex gap-2 justify-center mt-4">
            <span className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ background: '#ECFDF5', color: '#059669' }}>✓ 6–9 AM</span>
            <span className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ background: '#EDE6D9', color: '#94A3B8' }}>○ Noon</span>
            <span className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ background: '#FFFBEB', color: '#D97706' }}>⚠ 2–5 PM</span>
          </div>
        </div>

        {/* Beach description */}
        <div className="rounded-xl p-4 shadow-soft" style={{ background: '#fff' }}>
          <p className="text-micro uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>BEST TIME</p>
          <p className="text-subtitle font-semibold mb-3" style={{ color: '#0D9488' }}>{beach.bestVisitTime}</p>
          <p className="text-body leading-relaxed" style={{ color: '#4A5568' }}>{beach.description}</p>
        </div>

        {/* Community intel */}
        <div className="rounded-xl p-4 shadow-soft" style={{ background: '#fff' }}>
          <p className="text-micro uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>RECENT CHECK-INS</p>
          {[
            { name: 'Komang W.', emoji: '🏄', note: 'Clean waves, only 6 surfers out.', time: '1h ago' },
            { name: 'Sarah K.',  emoji: '🌊', note: 'Water crystal clear, reef visible.', time: '2h ago' },
            { name: 'Made A.',   emoji: '🐠', note: 'Saw some reef fish — water looking healthy.', time: '4h ago' },
          ].map(({ name, emoji, note, time }) => (
            <div key={name} className="flex items-start gap-3 mb-3 last:mb-0">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-base" style={{ background: '#F0FDFA' }}>{emoji}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[12px] font-semibold" style={{ color: '#0B1F2E' }}>{name}</span>
                  <span className="text-[11px]" style={{ color: '#94A3B8' }}>{time}</span>
                </div>
                <p className="text-[12px] leading-relaxed" style={{ color: '#4A5568' }}>{note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pb-safe pt-3 z-50"
        style={{ background: 'rgba(246,241,234,0.92)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(11,31,46,0.06)' }}
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setCheckedIn(true)}
          className="w-full py-4 rounded-md text-label font-bold transition-all"
          style={{
            background: checkedIn ? '#059669' : '#F97456',
            color: '#fff',
          }}
        >
          {checkedIn ? '✓ Checked in! See you out there.' : "I'm going here 🤙"}
        </motion.button>
        {checkedIn && (
          <p className="text-[11px] text-center mt-2" style={{ color: '#94A3B8' }}>
            Live crowd counter updated for other surfers.
          </p>
        )}
      </div>
    </div>
  );
}
