import type { Beach, HourlyData } from '../types';

export const beaches: Beach[] = [
  {
    id: 'balangan',
    name: 'Balangan Beach',
    lat: -8.7913,
    lng: 115.1030,
    description: 'Hidden gem south of Jimbaran. Stunning limestone cliffs, crystal water and consistently clean reef breaks without the tourist swarms. Arrives early to claim a peak.',
    waterQualityScore: 9.2,
    crowdScore: 2.8,
    waveHeight: 1.4,
    windSpeed: 14,
    windDirection: 'SE',
    swellPeriod: 12,
    surfLevel: 'intermediate',
    rating: 4.8,
    bestVisitTime: 'Early morning (6–9 AM)',
    aiTip: 'Perfect today. Low crowds, crystal water and a peeling left that sets up beautifully at mid tide. Don\'t overthink — just go.',
    tags: ['uncrowded', 'reef break', 'scenic'],
    gradient: 'from-[#0FB5A6] to-[#0E7490]',
  },
  {
    id: 'padang-padang',
    name: 'Padang Padang',
    lat: -8.8152,
    lng: 115.1007,
    description: 'World-famous barreling left-hander carved into the Bukit limestone. Best at high tide with a solid SW swell. Every session here feels earned.',
    waterQualityScore: 8.7,
    crowdScore: 5.1,
    waveHeight: 2.1,
    windSpeed: 18,
    windDirection: 'S',
    swellPeriod: 14,
    surfLevel: 'advanced',
    rating: 4.9,
    bestVisitTime: 'Afternoon (2–5 PM)',
    aiTip: 'Great swell running today. Moderate crowd expected midday — arrive before 1 PM or after 4 PM for the best lineups.',
    tags: ['world-class', 'barrel', 'reef break'],
    gradient: 'from-[#4F46E5] to-[#1E1B4B]',
  },
  {
    id: 'uluwatu',
    name: 'Uluwatu',
    lat: -8.8291,
    lng: 115.0847,
    description: 'Bali\'s most iconic left-hander. Multiple sections — from the temple steps peak to the cave break — serve different skill levels. Spiritual and spectacular.',
    waterQualityScore: 7.8,
    crowdScore: 6.9,
    waveHeight: 1.8,
    windSpeed: 22,
    windDirection: 'SSE',
    swellPeriod: 11,
    surfLevel: 'intermediate',
    rating: 4.7,
    bestVisitTime: 'Early morning (6–8 AM)',
    aiTip: 'Busy today — peak tourist season is hitting hard. Consider Padang or Dreamland for similar swell with half the crowd.',
    tags: ['iconic', 'long walls', 'cliffside'],
    gradient: 'from-[#7C3AED] to-[#BE185D]',
  },
  {
    id: 'canggu',
    name: 'Canggu Beach',
    lat: -8.6508,
    lng: 115.1276,
    description: 'The digital-nomad heartbeat of Bali. Black-sand beach break with forgiving waves ideal for progression. Stay for the coffee and sunsets.',
    waterQualityScore: 6.4,
    crowdScore: 7.2,
    waveHeight: 1.1,
    windSpeed: 16,
    windDirection: 'SW',
    swellPeriod: 9,
    surfLevel: 'beginner',
    rating: 4.3,
    bestVisitTime: 'Morning (7–10 AM)',
    aiTip: 'Water quality dipped after yesterday\'s rain — safe to surf but rinse off quickly after. Crowd is manageable before 9 AM.',
    tags: ['beach break', 'consistent', 'social'],
    gradient: 'from-[#F59E0B] to-[#C2410C]',
  },
  {
    id: 'seminyak',
    name: 'Seminyak Beach',
    lat: -8.6853,
    lng: 115.1556,
    description: 'Bali\'s upscale resort coastline. Beach break suited to beginners, famous for fiery sunsets and beach clubs that blur into the sand.',
    waterQualityScore: 5.9,
    crowdScore: 8.4,
    waveHeight: 0.9,
    windSpeed: 19,
    windDirection: 'W',
    swellPeriod: 8,
    surfLevel: 'beginner',
    rating: 3.9,
    bestVisitTime: 'Sunrise (6–7 AM)',
    aiTip: 'Very crowded and water quality is below average. We\'d recommend heading south to Balangan or Dreamland today.',
    tags: ['sunset', 'beach clubs', 'resort'],
    gradient: 'from-[#FB7185] to-[#9D174D]',
  },
  {
    id: 'kuta',
    name: 'Kuta Beach',
    lat: -8.7180,
    lng: 115.1686,
    description: 'Bali\'s most famous — and most crowded — beach. Sandy bottom is perfect for beginner lessons but tourist pressure is extreme year-round.',
    waterQualityScore: 4.1,
    crowdScore: 9.6,
    waveHeight: 0.7,
    windSpeed: 21,
    windDirection: 'W',
    swellPeriod: 7,
    surfLevel: 'beginner',
    rating: 3.2,
    bestVisitTime: 'Not recommended today',
    aiTip: 'Skip Kuta today. Water quality is poor — microplastics and bacteria detected after recent runoff. Packed with tourists.',
    tags: ['crowded', 'beginner lessons', 'tourist hub'],
    gradient: 'from-[#EF4444] to-[#7F1D1D]',
  },
  {
    id: 'nusa-dua',
    name: 'Nusa Dua',
    lat: -8.7969,
    lng: 115.2269,
    description: 'Protected lagoon on Bali\'s east peninsula. Calm water, pristine sand, recovering coral reef — ideal for families and snorkellers.',
    waterQualityScore: 8.9,
    crowdScore: 4.2,
    waveHeight: 0.5,
    windSpeed: 12,
    windDirection: 'E',
    swellPeriod: 6,
    surfLevel: 'beginner',
    rating: 4.5,
    bestVisitTime: 'Anytime today',
    aiTip: 'Great conditions for families and snorkelling. Reef is recovering — please stay on marked paths and avoid standing on coral.',
    tags: ['calm', 'snorkelling', 'family-friendly'],
    gradient: 'from-[#34D399] to-[#065F46]',
  },
  {
    id: 'dreamland',
    name: 'Dreamland Beach',
    lat: -8.7974,
    lng: 115.1057,
    description: 'Tucked under limestone cliffs near Uluwatu. Powdery white sand and a consistent beach break — worth every step of the steep path down.',
    waterQualityScore: 8.1,
    crowdScore: 3.7,
    waveHeight: 1.3,
    windSpeed: 15,
    windDirection: 'SSW',
    swellPeriod: 10,
    surfLevel: 'intermediate',
    rating: 4.6,
    bestVisitTime: 'Morning (7–11 AM)',
    aiTip: 'Great alternative to the crowded Uluwatu lineup. Similar swell, a quarter of the crowd. Perfect morning session.',
    tags: ['scenic', 'cliffs', 'uncrowded'],
    gradient: 'from-[#60A5FA] to-[#1E3A8A]',
  },
];

/** Composite 0–100 "Go Score" — higher is better */
export function goScore(beach: Beach): number {
  const water  = beach.waterQualityScore * 5;          // 0–50 pts
  const crowd  = (10 - beach.crowdScore) * 3;          // 0–30 pts
  const surf   = Math.min(beach.waveHeight * 6, 20);   // 0–20 pts (capped)
  return Math.round(water + crowd + surf);
}

export function goScoreColor(score: number): string {
  if (score >= 70) return '#059669';
  if (score >= 40) return '#D97706';
  return '#DC2626';
}

export function goScoreLabel(score: number): string {
  if (score >= 75) return 'Go';
  if (score >= 55) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Avoid';
}

export function waterQualityLabel(score: number): string {
  if (score >= 8.5) return 'Excellent';
  if (score >= 7)   return 'Good';
  if (score >= 5)   return 'Moderate';
  return 'Poor';
}

export function crowdLabel(score: number): string {
  if (score <= 2)  return 'Empty';
  if (score <= 4)  return 'Quiet';
  if (score <= 6)  return 'Moderate';
  if (score <= 8)  return 'Busy';
  return 'Packed';
}

export function statusColor(type: 'go' | 'check' | 'avoid'): { text: string; bg: string; border: string } {
  if (type === 'go')    return { text: '#059669', bg: '#ECFDF5', border: '#A7F3D0' };
  if (type === 'check') return { text: '#D97706', bg: '#FFFBEB', border: '#FDE68A' };
  return { text: '#DC2626', bg: '#FEF2F2', border: '#FECACA' };
}

export function waterStatusType(score: number): 'go' | 'check' | 'avoid' {
  if (score >= 7.5) return 'go';
  if (score >= 5)   return 'check';
  return 'avoid';
}

export function crowdStatusType(score: number): 'go' | 'check' | 'avoid' {
  if (score <= 4) return 'go';
  if (score <= 7) return 'check';
  return 'avoid';
}

export function getBeachById(id: string): Beach | undefined {
  return beaches.find(b => b.id === id);
}

export const hourlyData: HourlyData[] = [
  { hour: '6AM',  crowd: 1,   wave: 1.2 },
  { hour: '8AM',  crowd: 2,   wave: 1.4 },
  { hour: '10AM', crowd: 4,   wave: 1.6 },
  { hour: '12PM', crowd: 7,   wave: 1.5 },
  { hour: '2PM',  crowd: 9,   wave: 1.3 },
  { hour: '4PM',  crowd: 8,   wave: 1.2 },
  { hour: '6PM',  crowd: 6,   wave: 1.1 },
  { hour: '8PM',  crowd: 3,   wave: 0.9 },
];
