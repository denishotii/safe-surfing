import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Beach } from '../types';
import { goScore, goScoreColor, goScoreLabel, crowdLabel, crowdStatusType } from '../data/beaches';

interface Props {
  beach: Beach;
  compact?: boolean;
}

function GoScoreBadge({ score }: { score: number }) {
  const color = goScoreColor(score);
  const label = goScoreLabel(score);
  return (
    <div
      className="flex flex-col items-center justify-center rounded-xs px-2 py-1"
      style={{ background: 'rgba(255,255,255,0.92)', minWidth: 44 }}
    >
      <span className="font-black tabular text-[15px] leading-tight" style={{ color }}>{score}</span>
      <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color }}>{label}</span>
    </div>
  );
}

const crowdDot: Record<string, string> = {
  go:    '#059669',
  check: '#D97706',
  avoid: '#DC2626',
};

export default function BeachCard({ beach, compact = false }: Props) {
  const navigate = useNavigate();
  const score = goScore(beach);
  const crowdType = crowdStatusType(beach.crowdScore);

  if (compact) {
    return (
      <motion.div
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate(`/beach/${beach.id}`)}
        className="flex-shrink-0 cursor-pointer"
        style={{ width: 180 }}
      >
        <div className="rounded-lg shadow-soft overflow-hidden bg-white">
          {/* Gradient hero */}
          <div
            className={`relative bg-gradient-to-br ${beach.gradient}`}
            style={{ height: 120 }}
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(11,31,46,0.5) 100%)' }} />
            <div className="absolute top-2.5 right-2.5">
              <GoScoreBadge score={score} />
            </div>
            {/* Crowd dot */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: crowdDot[crowdType] }} />
              <span className="text-[10px] font-semibold text-white">{crowdLabel(beach.crowdScore)}</span>
            </div>
            <div className="absolute bottom-2.5 left-3">
              <p className="text-white font-bold text-[14px] leading-tight">{beach.name}</p>
            </div>
          </div>
          {/* Stats */}
          <div className="px-3 py-2.5 flex items-center justify-between">
            <span className="text-[11px] font-medium" style={{ color: '#94A3B8' }}>🌊 {beach.waveHeight}m</span>
            <span className="text-[11px] font-medium" style={{ color: '#94A3B8' }}>🌬 {beach.windSpeed}km/h</span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Feed card (full width)
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/beach/${beach.id}`)}
      className="rounded-xl shadow-soft overflow-hidden bg-white cursor-pointer"
    >
      {/* Gradient hero */}
      <div
        className={`relative bg-gradient-to-br ${beach.gradient}`}
        style={{ height: 140 }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(11,31,46,0.55) 100%)' }} />
        <div className="absolute top-3 right-3">
          <GoScoreBadge score={score} />
        </div>
        <div className="absolute bottom-3 left-4 right-16">
          <p className="text-white font-bold text-[18px] leading-snug">{beach.name}</p>
          <p className="text-white/70 text-[12px] capitalize">{beach.surfLevel} · {beach.waveHeight}m</p>
        </div>
      </div>
      {/* Conditions row */}
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: crowdDot[crowdStatusType(beach.crowdScore)] }} />
          <span className="text-caption font-semibold" style={{ color: '#4A5568' }}>{crowdLabel(beach.crowdScore)}</span>
        </div>
        <span style={{ color: '#EDE6D9' }}>·</span>
        <span className="text-caption" style={{ color: '#94A3B8' }}>💧 {beach.waterQualityScore.toFixed(1)}/10</span>
        <span style={{ color: '#EDE6D9' }}>·</span>
        <span className="text-caption" style={{ color: '#94A3B8' }}>🌬 {beach.windSpeed} km/h</span>
      </div>
      {/* AI tip */}
      <div className="px-4 pb-3">
        <p className="text-[12px] font-medium italic" style={{ color: '#0D9488' }}>"{beach.aiTip.split('.')[0]}."</p>
      </div>
    </motion.div>
  );
}
