/** SVG icons for Investment Map 2 HUD + map markers. */

export function CoinIcon({ size = 46 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden>
      <ellipse cx="32" cy="36" rx="22" ry="10" fill="rgba(0,0,0,0.25)" />
      <ellipse cx="32" cy="34" rx="22" ry="22" fill="#a87820" />
      <ellipse cx="32" cy="30" rx="22" ry="22" fill="#e2b84a" />
      <ellipse cx="32" cy="30" rx="16" ry="16" fill="#f0d27a" />
      <ellipse cx="32" cy="30" rx="16" ry="16" fill="none" stroke="#a87820" strokeWidth="2" />
      <text
        x="32"
        y="37"
        textAnchor="middle"
        fontSize="20"
        fontWeight="800"
        fill="#5b3a1e"
        fontFamily="Georgia, serif"
      >
        $
      </text>
    </svg>
  );
}

export function TreasureChestIcon({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden>
      <rect x="8" y="28" width="48" height="28" rx="3" fill="#8b5a2b" stroke="#3e2410" strokeWidth="2" />
      <path d="M8 28 C8 14 56 14 56 28" fill="#c48a3a" stroke="#3e2410" strokeWidth="2" />
      <rect x="6" y="26" width="52" height="6" fill="#e2b84a" stroke="#3e2410" strokeWidth="1.5" />
      <rect x="28" y="34" width="8" height="10" rx="1" fill="#e2b84a" stroke="#3e2410" strokeWidth="1.5" />
      <circle cx="32" cy="39" r="2" fill="#5b3a1e" />
      <path d="M12 22h40" stroke="#f0d27a" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

/** Teardrop map portal — strength colour + module number (icon sheet style). */
export function PortalArchIcon({ color, number }: { color: string; number: number }) {
  const gid = `portal-${number}`;
  return (
    <svg viewBox="0 0 56 68" width="34" height="42" aria-hidden className="portal-svg">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#1a1408" />
        </linearGradient>
        <radialGradient id={`${gid}-glow`} cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.15" />
        </radialGradient>
      </defs>
      <ellipse cx="28" cy="62" rx="12" ry="3.5" fill="rgba(0,0,0,0.3)" />
      <path
        d="M28 66 C12 50 8 34 8 26 C8 12 18 4 28 4 C38 4 48 12 48 26 C48 34 44 50 28 66 Z"
        fill={`url(#${gid})`}
        stroke="#1a1408"
        strokeWidth="2"
      />
      <circle cx="28" cy="28" r="14" fill={`url(#${gid}-glow)`} stroke="#f7f3e8" strokeWidth="1.5" />
      <circle cx="16" cy="12" r="8" fill="#f7f3e8" stroke="#1a1408" strokeWidth="1.5" />
      <text
        x="16"
        y="16"
        textAnchor="middle"
        fontSize="9"
        fontWeight="800"
        fill="#1a1408"
        fontFamily="system-ui, sans-serif"
      >
        {number}
      </text>
    </svg>
  );
}

/** Compulsory exam badge — graduation cap + Roman numeral ribbon. */
export function ExamBadgeIcon({
  color,
  roman,
}: {
  color: string;
  roman: string;
}) {
  return (
    <svg viewBox="0 0 56 64" width="38" height="44" aria-hidden className="exam-svg">
      <ellipse cx="28" cy="58" rx="14" ry="3.5" fill="rgba(0,0,0,0.3)" />
      <path
        d="M10 12 h36 l4 10 v20 c0 10-8 18-22 22 C14 60 6 52 6 42 V22 Z"
        fill={color}
        stroke="#1a1408"
        strokeWidth="2"
      />
      <path d="M14 20 h28 l-3 8 H17 Z" fill="#1a1408" opacity="0.35" />
      <path d="M18 26 h20 v4 H18 Z" fill="#f7f3e8" />
      <path d="M22 30 h12 l2 10 H20 Z" fill="#f0d27a" stroke="#1a1408" strokeWidth="1" />
      <rect x="12" y="44" width="32" height="12" rx="2" fill="#1a1408" />
      <text
        x="28"
        y="53"
        textAnchor="middle"
        fontSize="10"
        fontWeight="800"
        fill="#f7f3e8"
        fontFamily="Georgia, serif"
      >
        {roman}
      </text>
    </svg>
  );
}

export function HudBookIcon() {
  return (
    <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden>
      <rect x="10" y="8" width="28" height="32" rx="3" fill="#7c4dff" stroke="#1a1408" strokeWidth="2" />
      <path d="M16 14h16M16 20h16M16 26h12" stroke="#f7f3e8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function HudScrollIcon() {
  return (
    <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden>
      <path
        d="M14 10h20c2 0 4 2 4 4v20c0 2-2 4-4 4H14c-2 0-4-2-4-4V14c0-2 2-4 4-4z"
        fill="#2196f3"
        stroke="#1a1408"
        strokeWidth="2"
      />
      <path d="M16 18h16M16 24h16M16 30h10" stroke="#e3f2fd" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function HudCompassIcon() {
  return (
    <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden>
      <circle cx="24" cy="24" r="16" fill="#43a047" stroke="#1a1408" strokeWidth="2" />
      <path d="M24 10l4 14-4 14-4-14z" fill="#f7f3e8" />
      <circle cx="24" cy="24" r="3" fill="#1a1408" />
    </svg>
  );
}

export function HudFlagIcon() {
  return (
    <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden>
      <path d="M14 8v32" stroke="#1a1408" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 10h18l-4 8 4 8H16z" fill="#e53935" stroke="#1a1408" strokeWidth="2" />
    </svg>
  );
}

export function CompassRose() {
  return (
    <svg viewBox="0 0 80 80" width="72" height="72" aria-hidden className="compass-rose-svg">
      <circle cx="40" cy="40" r="36" fill="#c6a15b" stroke="#1a1408" strokeWidth="2" />
      <circle cx="40" cy="40" r="28" fill="#f3efe4" stroke="#5b3a1e" strokeWidth="1.5" />
      <path d="M40 12 L46 40 L40 36 L34 40 Z" fill="#e53935" />
      <path d="M40 68 L46 40 L40 44 L34 40 Z" fill="#1a1408" />
      <path d="M12 40 L40 34 L36 40 L40 46 Z" fill="#5b3a1e" />
      <path d="M68 40 L40 34 L44 40 L40 46 Z" fill="#5b3a1e" />
      <text x="40" y="22" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1a1408">
        N
      </text>
    </svg>
  );
}
