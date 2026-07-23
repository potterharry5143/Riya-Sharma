import { motion } from 'framer-motion';

export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  const milestones = [25, 50, 75, 100];
  const hitMilestone = milestones.some((m) => pct >= m && pct - Math.round(100 / total) < m);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-theme-text-muted">
          Question {current} of {total}
        </span>
        <span className="text-sm font-bold text-theme-text-muted">{pct}%</span>
      </div>
      <div className="w-full h-4 bg-theme-card-bg rounded-full overflow-hidden border border-theme-card-border">
        <motion.div
          className={`h-full rounded-full ${hitMilestone ? 'bar-pulse' : ''}`}
          style={{
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-primary-hover))',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        />
      </div>
      <div className="flex justify-between mt-1 px-0.5">
        {milestones.map((m) => (
          <span
            key={m}
            className={`text-xs transition-opacity duration-300 ${
              pct >= m ? 'opacity-100' : 'opacity-30'
            }`}
          >
            {m === 25 ? '🌱' : m === 50 ? '⭐' : m === 75 ? '🔥' : '🏆'}
          </span>
        ))}
      </div>
    </div>
  );
}
