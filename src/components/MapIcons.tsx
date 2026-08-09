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

export function PortalArchIcon({ color, number }: { color: string; number: number }) {
  return (
    <svg viewBox="0 0 48 56" width="36" height="42" aria-hidden className="portal-svg">
      <defs>
        <linearGradient id={`pg-${number}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <ellipse cx="24" cy="50" rx="14" ry="4" fill="rgba(0,0,0,0.28)" />
      <path
        d="M8 48 V22 C8 8 40 8 40 22 V48"
        fill={`url(#pg-${number})`}
        stroke="#1a1408"
        strokeWidth="2.2"
      />
      <path
        d="M14 48 V24 C14 14 34 14 34 24 V48"
        fill="rgba(255,255,255,0.22)"
        stroke={color}
        strokeWidth="1.2"
      />
      <circle cx="24" cy="30" r="9" fill="#1a1408" stroke={color} strokeWidth="2" />
      <text
        x="24"
        y="34"
        textAnchor="middle"
        fontSize="12"
        fontWeight="800"
        fill="#f7f3e8"
        fontFamily="system-ui, sans-serif"
      >
        {number}
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
