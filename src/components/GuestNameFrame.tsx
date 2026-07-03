import React from "react";

let idCounter = 0;

interface GuestNameFrameProps {
  name: string;
  className?: string;
}

// Builds the stepped-corner, arc-sided rectangle silhouette from
// public/frame/gold-rectangle-frame.png, inset by `pad` on every side.
const buildFramePath = (pad: number) => {
  const w = 320;
  const h = 160;
  const step = 22 - pad * 0.3; // corner notch depth, shrinks slightly for inner lines
  const notch = 34 - pad * 0.3; // corner notch width

  const left = pad;
  const right = w - pad;
  const top = pad;
  const bottom = h - pad;
  const arcTop = top + step + notch;
  const arcBottom = bottom - step - notch;

  return `
    M ${left + notch} ${top}
    H ${right - notch}
    L ${right - notch + step} ${top + step}
    V ${arcTop - step}
    L ${right} ${arcTop}
    A ${(arcBottom - arcTop) / 2} ${(arcBottom - arcTop) / 2} 0 0 1 ${right} ${arcBottom}
    L ${right - notch + step} ${bottom - step}
    V ${bottom}
    H ${left + notch}
    L ${left + notch - step} ${bottom - step}
    V ${arcBottom - step}
    L ${left} ${arcBottom}
    A ${(arcBottom - arcTop) / 2} ${(arcBottom - arcTop) / 2} 0 0 1 ${left} ${arcTop}
    L ${left + notch - step} ${top + step}
    Z
  `.trim();
};

// Double-line gold frame with stepped corners and arced sides,
// traced from public/frame/gold-rectangle-frame.png
export const GuestNameFrame = ({ name, className }: GuestNameFrameProps) => {
  const gradientId = React.useMemo(() => `guest-frame-gold-${idCounter++}`, []);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 320 160"
        className="absolute inset-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#aa7c11" />
            <stop offset="35%" stopColor="#f3e5ab" />
            <stop offset="55%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#aa7c11" />
          </linearGradient>
        </defs>
        <path
          d={buildFramePath(8)}
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          strokeLinejoin="miter"
        />
        <path
          d={buildFramePath(18)}
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          strokeLinejoin="miter"
        />
      </svg>
      <span className="relative z-10 px-12 py-8 font-moul text-lg text-[#aa7c11] text-center">
        {name}
      </span>
    </div>
  );
};
