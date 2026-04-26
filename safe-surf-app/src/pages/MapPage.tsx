import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { beaches, goScore, goScoreColor, crowdLabel, waterQualityLabel, crowdStatusType } from '../data/beaches';
import type { Beach } from '../types';

const filters = ['All', 'Uncrowded', 'Clean Water', 'Good Surf', 'Beginner'];

function pinColor(beach: Beach): string {
  const s = beach.crowdScore;
  if (s <= 3) return '#059669';
  if (s <= 6) return '#D97706';
  return '#DC2626';
}

export default function MapPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = beaches.filter(b => {
    if (activeFilter === 'Uncrowded')  return b.crowdScore <= 4;
    if (activeFilter === 'Clean Water') return b.waterQualityScore >= 8;
    if (activeFilter === 'Good Surf')  return b.waveHeight >= 1.2;
    if (activeFilter === 'Beginner')   return b.surfLevel === 'beginner';
    return true;
  });

  const sel = beaches.find(b => b.id === selected);

  return (
    <div className="flex flex-col" style={{ height: 'calc(100svh - 72px)' }}>
      {/* Floating header */}
      <div className="absolute top-0 left-0 right-0 z-[1001] px-5 pt-14 pb-3"
        style={{ background: 'linear-gradient(180deg, rgba(246,241,234,0.95) 60%, transparent 100%)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-title font-bold" style={{ color: '#0B1F2E' }}>Map</h1>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-caption font-semibold"
            style={{ background: '#fff', boxShadow: '0 1px 3px rgba(11,31,46,0.04), 0 4px 12px rgba(11,31,46,0.05)' }}
          >
            <SlidersHorizontal size={13} style={{ color: '#94A3B8' }} />
            <span style={{ color: '#4A5568' }}>Filter</span>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="flex-shrink-0 text-label px-3 py-1.5 rounded-full transition-all"
              style={{
                background: activeFilter === f ? '#0B1F2E' : '#fff',
                color: activeFilter === f ? '#fff' : '#4A5568',
                boxShadow: '0 1px 3px rgba(11,31,46,0.04)',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapContainer
          center={[-8.73, 115.15]}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
          {filtered.map(beach => (
            <CircleMarker
              key={beach.id}
              center={[beach.lat, beach.lng]}
              radius={selected === beach.id ? 16 : 12}
              fillColor={pinColor(beach)}
              color="white"
              weight={selected === beach.id ? 3 : 2}
              fillOpacity={0.9}
              eventHandlers={{ click: () => setSelected(beach.id) }}
            />
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="absolute top-36 right-4 z-[1001] rounded-xl p-3"
        style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', boxShadow: '0 4px 12px rgba(11,31,46,0.08)' }}
      >
        <p className="text-micro uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>CROWD</p>
        {[
          { color: '#059669', label: 'Low' },
          { color: '#D97706', label: 'Moderate' },
          { color: '#DC2626', label: 'Busy' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2 mb-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
            <span className="text-[11px] font-medium" style={{ color: '#4A5568' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Bottom sheet */}
      <AnimatePresence>
        {sel && (
          <motion.div
            className="absolute bottom-4 left-4 right-4 z-[1001] rounded-xl overflow-hidden"
            style={{ background: '#fff', boxShadow: '0 20px 60px rgba(11,31,46,0.20), 0 8px 20px rgba(11,31,46,0.10)' }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            {/* Mini hero */}
            <div className={`relative bg-gradient-to-br ${sel.gradient} h-20 flex items-end px-4 pb-3`}>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(11,31,46,0.5) 100%)' }} />
              <div className="relative flex items-end justify-between w-full">
                <div>
                  <p className="text-[16px] font-bold text-white leading-tight">{sel.name}</p>
                  <p className="text-[11px] text-white/70 capitalize">{sel.surfLevel}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/70 text-xl leading-none pb-0.5">×</button>
              </div>
            </div>

            <div className="p-4">
              {/* Status chips */}
              <div className="flex gap-2 mb-3 flex-wrap">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-xs" style={{ background: '#ECFDF5', color: '#059669' }}>
                  💧 {waterQualityLabel(sel.waterQualityScore)}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-xs"
                  style={{
                    background: crowdStatusType(sel.crowdScore) === 'go' ? '#ECFDF5' : crowdStatusType(sel.crowdScore) === 'check' ? '#FFFBEB' : '#FEF2F2',
                    color: crowdStatusType(sel.crowdScore) === 'go' ? '#059669' : crowdStatusType(sel.crowdScore) === 'check' ? '#D97706' : '#DC2626',
                  }}
                >
                  👥 {crowdLabel(sel.crowdScore)}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-xs" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                  🌊 {sel.waveHeight}m
                </span>
              </div>

              {/* AI tip */}
              <p className="text-[12px] italic leading-relaxed mb-3" style={{ color: '#0D9488' }}>
                "{sel.aiTip.split('.')[0]}."
              </p>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/beach/${sel.id}`)}
                className="w-full py-3.5 rounded-md text-label font-bold"
                style={{ background: '#F97456', color: '#fff' }}
              >
                View full details →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Peek strip (no selection) */}
      {!sel && (
        <div className="absolute bottom-4 left-0 right-0 z-[1001] px-5">
          <p className="text-micro uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>
            {filtered.length} BEACHES NEAR YOU
          </p>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {filtered.map(b => {
              const score = goScore(b);
              const color = goScoreColor(score);
              return (
                <motion.button
                  key={b.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelected(b.id)}
                  className="flex-shrink-0 flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', boxShadow: '0 1px 3px rgba(11,31,46,0.04), 0 4px 12px rgba(11,31,46,0.05)' }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: pinColor(b) }} />
                  <span className="text-[12px] font-semibold" style={{ color: '#0B1F2E' }}>{b.name.split(' ')[0]}</span>
                  <span className="text-[12px] font-black tabular" style={{ color }}>{score}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
