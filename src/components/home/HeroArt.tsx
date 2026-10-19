/**
 * The hero centerpiece. Solid colors that never blend into each other:
 * Midnight shows flat pop-art blobs with a halftone print texture; Lavender and Ivory show
 * two glossy interlocking 3D rings and a sphere on an orbit line. Colors come from --shape-*.
 */
export function HeroArt() {
  return (
    <div className="hero-art pointer-events-none relative mx-auto aspect-square w-full max-w-[560px]" aria-hidden>
      <svg className="size-full overflow-visible" viewBox="0 0 600 600">
        <defs>
          <pattern id="halftone" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <circle cx="6" cy="6" r="2.3" fill="#0b0b0b" fillOpacity="0.4" />
          </pattern>
          <linearGradient id="ring-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--shape-1-light)" />
            <stop offset="0.45" stopColor="var(--shape-1)" />
            <stop offset="1" stopColor="var(--shape-1-dark)" />
          </linearGradient>
          <linearGradient id="ring-b" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--shape-3-light)" />
            <stop offset="0.5" stopColor="var(--shape-3)" />
            <stop offset="1" stopColor="var(--shape-3-dark)" />
          </linearGradient>
          <radialGradient id="sphere" cx="0.34" cy="0.3" r="0.78">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="0.16" stopColor="var(--shape-2-light)" />
            <stop offset="0.58" stopColor="var(--shape-2)" />
            <stop offset="1" stopColor="var(--shape-2-dark)" />
          </radialGradient>
          <filter id="drop" x="-60%" y="-60%" width="220%" height="240%">
            <feDropShadow dx="0" dy="24" stdDeviation="20" floodColor="#1a0b2e" floodOpacity="0.3" />
          </filter>
          {/* lower-right half: where ring A passes over ring B */}
          <clipPath id="over"><path d="M300 300 L600 300 L600 600 L300 600z" /></clipPath>
        </defs>

        {/* ── Midnight: flat pop-art, pink and chartreuse side by side ── */}
        <g className="hidden dark:inline">
          <g className="art-drift-b">
            <path fill="var(--shape-2)" d="M420 250c90 10 150 90 130 180s-110 140-200 120-120-90-170-110-60-110 10-150 140-50 230-40z" />
            <path fill="url(#halftone)" d="M420 250c90 10 150 90 130 180s-110 140-200 120-120-90-170-110-60-110 10-150 140-50 230-40z" />
          </g>
          <g className="art-drift-a">
            <path fill="var(--shape-1)" stroke="var(--bg)" strokeWidth="10" d="M190 60c90-30 190 20 210 110s-30 160-110 190-150 90-220 40S10 240 50 170s50-80 140-110z" />
            <path fill="url(#halftone)" d="M190 60c90-30 190 20 210 110s-30 160-110 190-150 90-220 40S10 240 50 170s50-80 140-110z" />
          </g>
          <circle cx="520" cy="110" r="30" fill="var(--shape-1)" className="art-drift-b" />
          <circle cx="110" cy="500" r="16" fill="var(--shape-2)" className="art-drift-a" />
          <path d="M70 560 q 40 -30 80 0 t 80 0 t 80 0" fill="none" stroke="var(--shape-1)" strokeWidth="7" strokeLinecap="round" />
          <path d="M470 40 l 18 -18 l 18 18 l 18 -18" fill="none" stroke="var(--shape-2)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* ── Lavender / Ivory: glossy interlocking rings + sphere ── */}
        <g className="dark:hidden">
          <ellipse cx="300" cy="320" rx="285" ry="95" fill="none" stroke="var(--shape-line)" strokeOpacity="0.5" strokeWidth="2" transform="rotate(-14 300 320)" />
          <g className="art-spin">
            <g filter="url(#drop)">
              <ellipse cx="350" cy="330" rx="150" ry="115" fill="none" stroke="url(#ring-b)" strokeWidth="58" transform="rotate(32 350 330)" />
              <ellipse cx="350" cy="330" rx="150" ry="115" fill="none" stroke="#fff" strokeOpacity="0.32" strokeWidth="9" strokeDasharray="200 900" strokeLinecap="round" transform="rotate(32 350 330) translate(-10 -12)" />
            </g>
            <g filter="url(#drop)">
              <ellipse cx="230" cy="250" rx="150" ry="115" fill="none" stroke="url(#ring-a)" strokeWidth="58" transform="rotate(-26 230 250)" />
              <ellipse cx="230" cy="250" rx="150" ry="115" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="9" strokeDasharray="220 900" strokeLinecap="round" transform="rotate(-26 230 250) translate(-10 -12)" />
            </g>
            {/* ring B passes back over ring A here, so they interlock */}
            <g clipPath="url(#over)">
              <ellipse cx="350" cy="330" rx="150" ry="115" fill="none" stroke="url(#ring-b)" strokeWidth="58" transform="rotate(32 350 330)" />
            </g>
          </g>
          <circle cx="480" cy="120" r="56" fill="url(#sphere)" filter="url(#drop)" className="art-drift-a" />
          <circle cx="110" cy="490" r="30" fill="url(#sphere)" filter="url(#drop)" className="art-drift-b" />
        </g>
      </svg>
    </div>
  );
}
