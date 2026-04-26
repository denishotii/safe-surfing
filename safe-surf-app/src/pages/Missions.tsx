import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Mission } from '../types';
import { missions as initialMissions } from '../data/missions';
import MissionCard from '../components/MissionCard';
import { missionsHeaderPhoto } from '../data/images';

const tabs = ['All', 'Joined', 'My Impact'];

const leaderboard = [
  { rank: 1, name: 'Komang W.',  pts: 4200, missions: 22, emoji: '🏄', isLocal: true },
  { rank: 2, name: 'Sarah K.',   pts: 3850, missions: 19, emoji: '🌊', isLocal: false },
  { rank: 3, name: 'Made A.',    pts: 3200, missions: 17, emoji: '🐠', isLocal: true },
  { rank: 4, name: 'Pablo',      pts: 1250, missions: 5,  emoji: '🏄', isLocal: false, isYou: true },
  { rank: 5, name: 'Emma L.',    pts: 1100, missions: 5,  emoji: '🌿', isLocal: false },
  { rank: 6, name: 'Wayan S.',   pts: 980,  missions: 4,  emoji: '☀️', isLocal: true },
];

export default function Missions() {
  const [activeTab, setActiveTab] = useState(0);
  const [missionList, setMissionList] = useState<Mission[]>(initialMissions);

  function toggleJoin(id: string) {
    setMissionList(prev =>
      prev.map(m =>
        m.id === id
          ? { ...m, joined: !m.joined, participants: m.joined ? m.participants - 1 : m.participants + 1 }
          : m
      )
    );
  }

  const featured = missionList[0];
  const allMissions = missionList.slice(1);
  const joined = missionList.filter(m => m.joined);

  return (
    <div className="min-h-screen pb-28" style={{ background: '#F6F1EA' }}>
      {/* Header */}
      <div className="relative overflow-hidden" style={{ minHeight: 200 }}>
        <img
          src={missionsHeaderPhoto}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.55) saturate(0.85)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(13,148,136,0.45) 0%, rgba(11,31,46,0.72) 100%)' }}
        />
        <div className="relative px-5 pt-14 pb-5">
          <p className="text-micro uppercase tracking-widest mb-1" style={{ color: '#5EEAD4' }}>BALI CLEANUP NETWORK</p>
          <h1 className="text-title font-bold text-white mb-1">Missions</h1>
          <p className="text-body-lg text-white/70">186 volunteers active this month</p>

          {/* Impact stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { value: '2.4t',  label: 'Trash collected' },
              { value: '38',    label: 'Missions done' },
              { value: '12',    label: 'NGO partners' },
            ].map(({ value, label }) => (
              <div key={label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)' }}>
                <p className="text-subtitle font-bold text-white tabular">{value}</p>
                <p className="text-[10px] text-white/60">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ background: '#fff', borderColor: 'rgba(11,31,46,0.06)' }}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className="flex-1 py-3.5 text-label font-semibold relative"
            style={{ color: activeTab === i ? '#0D9488' : '#94A3B8' }}
          >
            {tab}
            {activeTab === i && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                style={{ background: '#0D9488' }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="px-5 pt-5 space-y-4">
        {/* ALL MISSIONS */}
        {activeTab === 0 && (
          <>
            {/* Featured */}
            <div>
              <MissionCard mission={featured} onJoin={toggleJoin} featured />
            </div>

            {/* This week */}
            <div>
              <p className="text-micro uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>THIS WEEK</p>
              <div className="space-y-3">
                {allMissions.filter(m => {
                  const d = new Date(m.date);
                  const now = new Date();
                  const diff = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
                  return diff <= 7;
                }).map(m => <MissionCard key={m.id} mission={m} onJoin={toggleJoin} />)}
              </div>
            </div>

            {/* Later */}
            <div>
              <p className="text-micro uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>LATER</p>
              <div className="space-y-3">
                {allMissions.filter(m => {
                  const d = new Date(m.date);
                  const now = new Date();
                  const diff = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
                  return diff > 7;
                }).map(m => <MissionCard key={m.id} mission={m} onJoin={toggleJoin} />)}
              </div>
            </div>
          </>
        )}

        {/* JOINED */}
        {activeTab === 1 && (
          joined.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[40px] mb-3">🌊</p>
              <p className="text-subtitle font-bold mb-1" style={{ color: '#0B1F2E' }}>The ocean's waiting.</p>
              <p className="text-body mb-5" style={{ color: '#94A3B8' }}>Join a mission to start making a difference.</p>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(0)}
                className="px-6 py-3 rounded-md text-label font-bold"
                style={{ background: '#F97456', color: '#fff' }}
              >
                Browse Missions
              </motion.button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Impact strip */}
              <div className="rounded-xl p-4 shadow-soft" style={{ background: '#fff' }}>
                <p className="text-micro uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>YOUR IMPACT</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: joined.length, label: 'Missions' },
                    { value: '15.4 kg', label: 'Trash' },
                    { value: '8.2 kg', label: 'CO₂ offset' },
                  ].map(({ value, label }) => (
                    <div key={label} className="text-center">
                      <p className="text-subtitle font-bold tabular" style={{ color: '#0B1F2E' }}>{value}</p>
                      <p className="text-caption" style={{ color: '#94A3B8' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
              {joined.map(m => <MissionCard key={m.id} mission={m} onJoin={toggleJoin} />)}
            </div>
          )
        )}

        {/* LEADERBOARD */}
        {activeTab === 2 && (
          <div>
            {/* Big impact number */}
            <div className="rounded-xl p-5 mb-5 text-center shadow-soft" style={{ background: '#fff' }}>
              <p className="text-display font-black tabular" style={{ color: '#0B1F2E' }}>15.4 kg</p>
              <p className="text-body-lg font-semibold mt-1" style={{ color: '#0D9488' }}>of trash collected</p>
              <p className="text-body mt-1" style={{ color: '#94A3B8' }}>≈ 1,540 single-use bottles diverted from Bali's ocean</p>
            </div>

            <p className="text-micro uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>GREEN ACTIVISTS RANKING</p>
            <div className="space-y-2">
              {leaderboard.map(user => (
                <div
                  key={user.rank}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{
                    background: user.isYou ? '#F0FDFA' : '#fff',
                    border: user.isYou ? '1.5px solid #5EEAD4' : 'none',
                    boxShadow: '0 1px 3px rgba(11,31,46,0.04)',
                  }}
                >
                  <span className="w-7 text-center">
                    {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : (
                      <span className="text-caption font-bold" style={{ color: '#94A3B8' }}>{user.rank}</span>
                    )}
                  </span>
                  <span className="text-xl">{user.emoji}</span>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold" style={{ color: '#0B1F2E' }}>
                      {user.name}
                      {user.isYou && <span className="text-[11px] ml-1" style={{ color: '#0D9488' }}>(you)</span>}
                      {user.isLocal && <span className="text-[11px] ml-1" style={{ color: '#059669' }}>· local</span>}
                    </p>
                    <p className="text-caption" style={{ color: '#94A3B8' }}>{user.missions} missions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-bold tabular" style={{ color: '#D97706' }}>⚡ {user.pts.toLocaleString()}</p>
                    <p className="text-[10px]" style={{ color: '#94A3B8' }}>pts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
