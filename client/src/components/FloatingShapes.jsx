import { useEffect, useRef, useState } from 'react';

const ALL_SHAPES = [
  { emoji: '⭐', size: 28, x: '8%',  y: '12%', cls: 'shape-a', delay: '0s',   opacity: 0.7 },
  { emoji: '💫', size: 36, x: '88%', y: '8%',  cls: 'shape-b', delay: '1.5s', opacity: 0.6 },
  { emoji: '✨', size: 22, x: '75%', y: '30%', cls: 'shape-c', delay: '0.8s', opacity: 0.8 },
  { emoji: '🌸', size: 30, x: '5%',  y: '55%', cls: 'shape-b', delay: '2.1s', opacity: 0.5 },
  { emoji: '🫧', size: 40, x: '92%', y: '60%', cls: 'shape-a', delay: '0.3s', opacity: 0.45 },
  { emoji: '⭐', size: 18, x: '50%', y: '5%',  cls: 'shape-c', delay: '1.2s', opacity: 0.65 },
  { emoji: '💕', size: 26, x: '20%', y: '82%', cls: 'shape-a', delay: '3.0s', opacity: 0.55 },
  { emoji: '✨', size: 32, x: '65%', y: '88%', cls: 'shape-b', delay: '0.6s', opacity: 0.5 },
  { emoji: '🌟', size: 24, x: '38%', y: '92%', cls: 'shape-c', delay: '1.8s', opacity: 0.6 },
  { emoji: '💫', size: 20, x: '15%', y: '35%', cls: 'shape-a', delay: '2.4s', opacity: 0.7 },
];

// Mobile: fewer shapes, smaller size, lower opacity
const MOBILE_SHAPES = [
  { ...ALL_SHAPES[0], size: 18, opacity: 0.45 },
  { ...ALL_SHAPES[1], size: 22, opacity: 0.4 },
  { ...ALL_SHAPES[2], size: 16, opacity: 0.5 },
  { ...ALL_SHAPES[5], size: 14, opacity: 0.4 },
];

export default function FloatingShapes() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 639px)').matches : false
  );

  // Detect mobile breakpoint reactively
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Pause animations when tab is hidden (performance)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleVisibility = () => {
      container.style.animationPlayState =
        document.hidden ? 'paused' : 'running';
      container.querySelectorAll('.shape').forEach((el) => {
        el.style.animationPlayState = document.hidden ? 'paused' : 'running';
      });
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const SHAPES = isMobile ? MOBILE_SHAPES : ALL_SHAPES;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {SHAPES.map((s, i) => (
        <span
          key={i}
          className={`shape ${s.cls}`}
          style={{
            left: s.x,
            top: s.y,
            fontSize: s.size,
            opacity: s.opacity,
            animationDelay: s.delay,
          }}
        >
          {s.emoji}
        </span>
      ))}
    </div>
  );
}
