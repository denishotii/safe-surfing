import { useEffect, useState } from 'react';
import { goScoreColor, goScoreLabel } from '../data/beaches';

interface Props {
  score: number;
  size?: 'sm' | 'lg';
}

export default function ScoreGauge({ score, size = 'lg' }: Props) {
  const [displayed, setDisplayed] = useState(0);
  const dim = size === 'lg' ? 112 : 80;
  const stroke = size === 'lg' ? 10 : 8;
  const r = (dim - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const arc = circ * 0.75; // 270° arc
  const color = goScoreColor(score);
  const labelSize = size === 'lg' ? 'text-[9px]' : 'text-[8px]';

  // Count-up animation
  useEffect(() => {
    let start: number | null = null;
    const duration = 700;
    function step(ts: number) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(step);
    }
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [score]);

  const filled = arc * (displayed / 100);
  const rotation = -225; // start at bottom-left

  return (
    <div
      className="flex flex-col items-center"
      style={{ width: dim, height: dim + 16 }}
      aria-label={`Go score ${score} out of 100, ${goScoreLabel(score)}`}
    >
      <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`}>
        {/* Track */}
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke="#EDE6D9"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${arc} ${circ}`}
          transform={`rotate(${rotation} ${dim / 2} ${dim / 2})`}
        />
        {/* Fill */}
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circ}`}
          transform={`rotate(${rotation} ${dim / 2} ${dim / 2})`}
          style={{ transition: 'stroke-dasharray 0.05s linear' }}
        />
        {/* Number */}
        <text
          x={dim / 2}
          y={dim / 2 + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={color}
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="800"
          fontSize={size === 'lg' ? 26 : 18}
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {displayed}
        </text>
      </svg>
      <span
        className={`${labelSize} font-bold tracking-widest uppercase mt-[-4px]`}
        style={{ color: '#94A3B8', letterSpacing: '0.08em' }}
      >
        GO SCORE
      </span>
    </div>
  );
}
