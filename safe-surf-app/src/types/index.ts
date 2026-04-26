export type SurfLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Beach {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
  waterQualityScore: number; // 1-10
  crowdScore: number;        // 1-10 (higher = more crowded)
  waveHeight: number;        // metres
  windSpeed: number;         // km/h
  windDirection: string;
  swellPeriod: number;       // seconds
  surfLevel: SurfLevel;
  rating: number;
  bestVisitTime: string;
  aiTip: string;
  tags: string[];
  gradient: string;          // tailwind gradient classes
}

export interface Mission {
  id: string;
  title: string;
  beach: string;
  beachId: string;
  date: string;
  time: string;
  participants: number;
  maxParticipants: number;
  ngo: string;
  ngoEmoji: string;
  description: string;
  type: 'cleanup' | 'survey' | 'education' | 'planting';
  difficulty: 'easy' | 'moderate' | 'challenging';
  reward: number;
  joined: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  requirement: string;
}

export interface Benefit {
  id: string;
  partner: string;
  discount: string;
  description: string;
  icon: string;
  pointsRequired: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  beachId?: string;
  missionId?: string;
}

export interface HourlyData {
  hour: string;
  crowd: number;
  wave: number;
}
