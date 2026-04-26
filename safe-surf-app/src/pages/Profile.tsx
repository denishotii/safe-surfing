import { Settings, Share2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { badges, benefits, userProfile } from '../data/user';

export default function Profile() {
  const progressPct = userProfile.progressToNext;

  return (
    <div className="min-h-screen pb-28" style={{ background: '#F6F1EA' }}>
      {/* Hero gradient header */}
      <div
        className="relative px-5 pt-14 pb-8"
        style={{ background: 'linear-gradient(135deg, #0E7490 0%, #134E4A 100%)' }}
      >
        <div className="flex justify-end gap-2 mb-6">
          <motion.button whileTap={{ scale: 0.93 }} className="p-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Share2 size={17} color="white" />
          </motion.button>
          <motion.button whileTap={{ scale: 0.93 }} className="p-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Settings size={17} color="white" />
          </motion.button>
        </div>

        {/* Avatar + name */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: 'rgba(255,255,255,0.15)' }}>
            🏄
          </div>
          <div>
            <h1 className="text-title font-bold text-white">{userProfile.name}</h1>
            <p className="text-caption" style={{ color: 'rgba(255,255,255,0.6)' }}>{userProfile.handle} · {userProfile.location}</p>
          </div>
        </div>

        {/* Hero impact number */}
        <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.12)' }}>
          <p className="text-micro uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>YOUR IMPACT THIS SEASON</p>
          <p className="text-display font-black text-white tabular">{userProfile.trashCollected} kg</p>
          <p className="text-body-lg mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
            ≈ {Math.round(userProfile.trashCollected * 100)} single-use bottles saved from Bali's ocean.
          </p>
        </div>
      </div>

      <div className="px-5 pt-5 space-y-5">
        {/* Level progress */}
        <div className="rounded-xl p-4 shadow-soft" style={{ background: '#fff' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-micro uppercase tracking-widest mb-0.5" style={{ color: '#94A3B8' }}>CURRENT LEVEL</p>
              <div className="flex items-center gap-2">
                <Zap size={16} fill="#D97706" color="#D97706" />
                <p className="text-subtitle font-bold" style={{ color: '#0B1F2E' }}>{userProfile.level}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-micro uppercase tracking-widest mb-0.5" style={{ color: '#94A3B8' }}>NEXT LEVEL</p>
              <p className="text-caption font-semibold" style={{ color: '#0D9488' }}>{userProfile.levelNext}</p>
            </div>
          </div>
          <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: '#EDE6D9' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #0D9488, #14B8A6)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPct * 100}%` }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
          </div>
          <p className="text-caption" style={{ color: '#94A3B8' }}>
            {userProfile.greenScore.toLocaleString()} / 2,000 pts · {(2000 - userProfile.greenScore).toLocaleString()} to {userProfile.levelNext}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: userProfile.missionsCompleted, label: 'Missions completed', icon: '🏄', bg: '#F0FDFA', color: '#0D9488' },
            { value: userProfile.beachesVisited,    label: 'Beaches visited',    icon: '🏖', bg: '#F0F9FF', color: '#2563EB' },
            { value: `${userProfile.kgCO2Offset} kg`, label: 'CO₂ offset',      icon: '🌱', bg: '#ECFDF5', color: '#059669' },
            { value: '3 wks',                       label: 'Mission streak',     icon: '🔥', bg: '#FFF7ED', color: '#EA580C' },
          ].map(({ value, label, icon, bg, color }) => (
            <div key={label} className="rounded-xl p-4" style={{ background: bg }}>
              <p className="text-2xl mb-1">{icon}</p>
              <p className="text-subtitle font-bold tabular" style={{ color }}>{value}</p>
              <p className="text-caption" style={{ color: '#94A3B8' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-micro uppercase tracking-widest" style={{ color: '#94A3B8' }}>BADGES</p>
            <span className="text-caption font-semibold" style={{ color: '#94A3B8' }}>
              {badges.filter(b => b.earned).length}/{badges.length} earned
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {badges.map(badge => (
              <div key={badge.id} className="flex flex-col items-center">
                <div
                  className="w-full aspect-square rounded-xl flex items-center justify-center text-2xl mb-1.5 relative"
                  style={{
                    background: badge.earned ? '#CCFBF1' : '#EDE6D9',
                    border: badge.earned ? '1.5px solid #5EEAD4' : '1.5px solid #EDE6D9',
                    opacity: badge.earned ? 1 : 0.45,
                    filter: badge.earned ? 'none' : 'grayscale(1)',
                  }}
                >
                  {badge.icon}
                  {!badge.earned && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl" style={{ background: 'rgba(237,230,217,0.5)' }}>
                      <span className="text-[12px]">🔒</span>
                    </div>
                  )}
                </div>
                <p className="text-[9px] font-semibold text-center leading-tight" style={{ color: badge.earned ? '#0B1F2E' : '#94A3B8' }}>
                  {badge.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner perks */}
        <div>
          <p className="text-micro uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>YOUR PERKS 🎁</p>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
            {benefits.map(benefit => {
              const unlocked = userProfile.greenScore >= benefit.pointsRequired;
              return (
                <motion.div
                  key={benefit.id}
                  whileTap={{ scale: 0.97 }}
                  className="flex-shrink-0 rounded-xl p-4 cursor-pointer"
                  style={{
                    background: '#fff',
                    boxShadow: '0 1px 3px rgba(11,31,46,0.04), 0 4px 12px rgba(11,31,46,0.05)',
                    width: 180,
                    opacity: unlocked ? 1 : 0.6,
                  }}
                >
                  <span className="text-2xl block mb-2">{benefit.icon}</span>
                  <p className="text-[12px] font-bold leading-tight mb-0.5" style={{ color: '#0B1F2E' }}>{benefit.partner}</p>
                  <p className="text-[11px] mb-2" style={{ color: '#94A3B8' }}>{benefit.description}</p>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-xs"
                    style={{
                      background: unlocked ? '#ECFDF5' : '#EDE6D9',
                      color: unlocked ? '#059669' : '#94A3B8',
                    }}
                  >
                    {unlocked ? benefit.discount : `Unlock at ${benefit.pointsRequired.toLocaleString()} pts`}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
