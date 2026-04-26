interface Props {
  icon: string;
  label: string;
  type: 'go' | 'check' | 'avoid' | 'info';
  size?: 'sm' | 'md';
}

const colors = {
  go:    { text: '#059669', bg: '#ECFDF5' },
  check: { text: '#D97706', bg: '#FFFBEB' },
  avoid: { text: '#DC2626', bg: '#FEF2F2' },
  info:  { text: '#2563EB', bg: '#EFF6FF' },
};

export default function StatusPill({ icon, label, type, size = 'md' }: Props) {
  const { text, bg } = colors[type];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-xs font-semibold whitespace-nowrap ${
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-caption px-2.5 py-1'
      }`}
      style={{ color: text, background: bg }}
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </span>
  );
}
