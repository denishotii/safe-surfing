import type React from 'react';
import type { Mission } from '../types';

export const missions: Mission[] = [
  {
    id: 'm1',
    title: 'Kuta Beach Mega Cleanup',
    beach: 'Kuta Beach',
    beachId: 'kuta',
    date: '2026-04-26',
    time: '7:00 AM',
    participants: 48,
    maxParticipants: 80,
    ngo: 'Bye Bye Plastic Bali',
    ngoEmoji: '🌊',
    description: 'Join the biggest regular beach cleanup in Bali. We collect plastic, fishing nets, and organic waste along 2 km of Kuta Beach. Gloves and bags provided.',
    type: 'cleanup',
    difficulty: 'easy',
    reward: 150,
    joined: false,
  },
  {
    id: 'm2',
    title: 'Canggu Sunrise Patrol',
    beach: 'Canggu Beach',
    beachId: 'canggu',
    date: '2026-04-27',
    time: '6:00 AM',
    participants: 12,
    maxParticipants: 20,
    ngo: 'Surfrider Foundation Bali',
    ngoEmoji: '🏄',
    description: 'Early morning patrol picking up plastic and recording pollution data. Perfect for surfers already up early. Short, impactful 2-hour session.',
    type: 'cleanup',
    difficulty: 'easy',
    reward: 100,
    joined: true,
  },
  {
    id: 'm3',
    title: 'Reef Health Survey — Nusa Dua',
    beach: 'Nusa Dua',
    beachId: 'nusa-dua',
    date: '2026-04-28',
    time: '8:00 AM',
    participants: 6,
    maxParticipants: 10,
    ngo: 'Reef Check Indonesia',
    ngoEmoji: '🐠',
    description: 'Help marine biologists survey coral reef health. Snorkelling certification required. We map coral coverage, note bleaching and count fish species.',
    type: 'survey',
    difficulty: 'moderate',
    reward: 300,
    joined: false,
  },
  {
    id: 'm4',
    title: 'Uluwatu Cliff Trail Cleanup',
    beach: 'Uluwatu',
    beachId: 'uluwatu',
    date: '2026-04-29',
    time: '7:30 AM',
    participants: 22,
    maxParticipants: 40,
    ngo: 'Plastic Free Bali',
    ngoEmoji: '♻️',
    description: 'Clean tourist paths and cliff edges around the famous Uluwatu temple and surf break. Sturdy footwear required. Spectacular views included.',
    type: 'cleanup',
    difficulty: 'moderate',
    reward: 120,
    joined: false,
  },
  {
    id: 'm5',
    title: 'Ocean Education Day — Schools',
    beach: 'Seminyak Beach',
    beachId: 'seminyak',
    date: '2026-05-03',
    time: '9:00 AM',
    participants: 8,
    maxParticipants: 15,
    ngo: 'Green School Bali',
    ngoEmoji: '📚',
    description: 'Teach local school children about ocean conservation, plastic pollution, and sustainable surfing. No teaching experience needed — just enthusiasm.',
    type: 'education',
    difficulty: 'easy',
    reward: 200,
    joined: false,
  },
  {
    id: 'm6',
    title: 'Mangrove Restoration Sprint',
    beach: 'Nusa Dua',
    beachId: 'nusa-dua',
    date: '2026-05-10',
    time: '7:00 AM',
    participants: 31,
    maxParticipants: 60,
    ngo: 'Mangrove Action Project',
    ngoEmoji: '🌿',
    description: 'Plant young mangrove trees in coastal wetlands behind Nusa Dua. Mangroves absorb CO₂, prevent erosion, and provide habitat for juvenile fish.',
    type: 'planting',
    difficulty: 'easy',
    reward: 250,
    joined: false,
  },
];

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export const missionTypeColor: Record<string, React.CSSProperties> = {
  cleanup:   { background: '#EFF6FF', color: '#2563EB' },
  survey:    { background: '#F5F3FF', color: '#7C3AED' },
  education: { background: '#FFFBEB', color: '#D97706' },
  planting:  { background: '#ECFDF5', color: '#059669' },
};
