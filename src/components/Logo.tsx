/** Phone with a terminal prompt, and an AI sparkle breaking out of its corner. Colors follow the theme. */
export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M16 1.2c11.2 0 14.8 3.6 14.8 14.8S27.2 30.8 16 30.8 1.2 27.2 1.2 16 4.8 1.2 16 1.2z" fill="var(--logo-bg)" />
      <rect x="8.2" y="7" width="12.6" height="19.4" rx="3.2" fill="#fff" stroke="var(--logo-ink)" strokeWidth="1.3" />
      <path d="M11.4 13.6l2.6 2.4-2.6 2.4M15.6 19.6h3" fill="none" stroke="var(--logo-bg)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24.2 2.6Q24.2 8.6 30.2 8.6Q24.2 8.6 24.2 14.6Q24.2 8.6 18.2 8.6Q24.2 8.6 24.2 2.6z" fill="var(--logo-spark)" stroke="var(--logo-ink)" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
