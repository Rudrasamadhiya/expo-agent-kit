export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="0.6" stopColor="var(--accent-2)" />
          <stop offset="1" stopColor="var(--accent-3)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#lg)" />
      <rect x="10.5" y="7" width="11" height="18" rx="2.6" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="16" cy="21.6" r="1.1" fill="#fff" />
      <path d="M13 12.5h6M13 15.5h4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
