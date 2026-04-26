import { motion } from 'framer-motion';
import type { Mission } from '../types';
import { formatDate, missionTypeColor } from '../data/missions';
import { missionPhotos } from '../data/images';

interface Props {
  mission: Mission;
  onJoin?: (id: string) => void;
  featured?: boolean;
}

export default function MissionCard({ mission, onJoin, featured = false }: Props) {
  const spotsLeft = mission.maxParticipants - mission.participants;
  const fillPct = (mission.participants / mission.maxParticipants) * 100;

  if (featured) {
    return (
      <motion.div
        whileTap={{ scale: 0.99 }}
        className="rounded-xl overflow-hidden shadow-soft"
        style={{ background: '#fff' }}
      >
        {/* Photo hero */}
        <div className="relative h-44 overflow-hidden flex items-end p-4">
          <img
            src={missionPhotos[mission.type] ?? missionPhotos.cleanup}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.72) saturate(0.85)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(11,31,46,0.72) 100%)' }} />
          <div className="relative z-10 w-full">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-xs" style={{ background: '#F97456', color: '#fff' }}>
                FEATURED · {formatDate(mission.date).toUpperCase()}
              </span>
              <span className="text-[10px] font-semibold text-white/70">{mission.ngoEmoji} {mission.ngo}</span>
            </div>
            <p className="text-white font-bold text-[18px] leading-snug">{mission.title}</p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-body" style={{ color: '#4A5568' }}>{mission.description}</p>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-caption" style={{ color: '#94A3B8' }}>📍 {mission.beach}</span>
            <span style={{ color: '#EDE6D9' }}>·</span>
            <span className="text-caption" style={{ color: '#94A3B8' }}>🕐 {mission.time}</span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-caption" style={{ color: '#94A3B8' }}>
              <span>{mission.participants}/{mission.maxParticipants} joined</span>
              <span style={{ color: '#F97456', fontWeight: 600 }}>⚡ +{mission.reward} pts</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => onJoin?.(mission.id)}
              className="text-label px-5 py-2.5 rounded-md font-semibold"
              style={{
                background: mission.joined ? '#ECFDF5' : '#F97456',
                color: mission.joined ? '#059669' : '#fff',
                border: mission.joined ? '1px solid #A7F3D0' : 'none',
              }}
            >
              {mission.joined ? '✓ Joined' : 'Join Mission'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="rounded-xl shadow-soft overflow-hidden"
      style={{ background: '#fff' }}
    >
      {/* Thin photo strip */}
      <div className="relative h-16 overflow-hidden">
        <img
          src={missionPhotos[mission.type] ?? missionPhotos.cleanup}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.65) saturate(0.8)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(11,31,46,0.55) 100%)' }} />
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
          <span className="text-white/80 text-[11px] font-semibold">📍 {mission.beach}</span>
          <span
            className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-xs tracking-wider"
            style={missionTypeColor[mission.type]}
          >
            {mission.type}
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-2xl">{mission.ngoEmoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-bold leading-snug" style={{ color: '#0B1F2E' }}>{mission.title}</p>
            <p className="text-caption" style={{ color: '#94A3B8' }}>{mission.ngo} · 📅 {formatDate(mission.date)} · {mission.time}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-[11px] mb-1" style={{ color: '#94A3B8' }}>
            <span>{mission.participants}/{mission.maxParticipants} joined</span>
            <span>{spotsLeft} spots left</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#EDE6D9' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${fillPct}%`, background: '#0D9488' }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-caption font-semibold" style={{ color: '#D97706' }}>
            ⚡ +{mission.reward} green points
          </span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onJoin?.(mission.id)}
            className="text-label px-4 py-2 rounded-md font-semibold"
            style={{
              background: mission.joined ? '#ECFDF5' : '#F97456',
              color: mission.joined ? '#059669' : '#fff',
              border: mission.joined ? '1px solid #A7F3D0' : 'none',
              fontSize: 13,
            }}
          >
            {mission.joined ? '✓ Joined' : 'Join Mission'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
