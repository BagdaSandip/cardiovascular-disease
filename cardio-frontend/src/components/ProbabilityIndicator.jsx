import React, { useEffect, useRef, useState } from 'react';

/**
 * SVG arc/donut ring confidence meter.
 * Animates the stroke-dashoffset on mount.
 */
const ConfidenceRing = ({ probability, isHighRisk }) => {
  const [animVal, setAnimVal] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const DURATION = 1300;

  useEffect(() => {
    if (probability == null) return;
    startRef.current = null;

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimVal(eased * probability);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [probability]);

  if (probability == null) return null;

  const SIZE       = 160;
  const STROKE     = 11;
  const RADIUS     = (SIZE - STROKE) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  // We use a 270° arc (three-quarters), starting at 135° (bottom-left)
  const ARC_RATIO  = 0.75;
  const ARC_LEN    = CIRCUMFERENCE * ARC_RATIO;
  const GAP        = CIRCUMFERENCE * (1 - ARC_RATIO);
  const offset     = ARC_LEN - (animVal / 100) * ARC_LEN;

  const successColor = '#059669';
  const dangerColor  = '#dc2626';
  const fillColor    = isHighRisk ? dangerColor : successColor;

  return (
    <div className="confidence-ring-wrap">
      <p className="confidence-ring-label">Prediction Confidence</p>

      <svg
        className="confidence-ring-svg"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-label={`Confidence: ${probability.toFixed(1)}%`}
      >
        {/* Track */}
        <circle
          className="confidence-ring-track"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeDasharray={`${ARC_LEN} ${GAP}`}
          strokeDashoffset={0}
          transform={`rotate(135 ${SIZE / 2} ${SIZE / 2})`}
        />
        {/* Fill */}
        <circle
          className="confidence-ring-fill"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke={fillColor}
          strokeDasharray={`${ARC_LEN} ${GAP}`}
          strokeDashoffset={offset}
          transform={`rotate(135 ${SIZE / 2} ${SIZE / 2})`}
          style={{ filter: `drop-shadow(0 0 6px ${fillColor}88)` }}
        />
        {/* Center text */}
        <text
          className="confidence-ring-text-val"
          x={SIZE / 2}
          y={SIZE / 2 - 4}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={fillColor}
          fontSize="26"
        >
          {animVal.toFixed(1)}%
        </text>
        <text
          className="confidence-ring-text-sub"
          x={SIZE / 2}
          y={SIZE / 2 + 22}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--text-3)"
          fontSize="10"
        >
          CONFIDENCE
        </text>
      </svg>
    </div>
  );
};

export default ConfidenceRing;
