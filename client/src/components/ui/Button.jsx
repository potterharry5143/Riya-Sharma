import { motion } from 'framer-motion';

const variants = {
  primary: 'btn-shimmer text-theme-text-main shadow-lg shadow-theme-primary/40',
  secondary:
    'bg-theme-card-bg text-theme-text-main border border-theme-card-border hover:opacity-80',
  ghost: 'bg-transparent text-theme-text-muted hover:bg-theme-card-bg',
  danger: 'bg-red-500/80 text-white hover:bg-red-600/80',
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...rest
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.07 }}
      whileTap={disabled ? {} : { scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`
        inline-flex items-center justify-center gap-2
        px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base
        min-h-[44px]
        transition-colors duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        select-none outline-none focus-visible:ring-2
        focus-visible:ring-purple-400 focus-visible:ring-offset-2
        ${variants[variant]}
        ${className}
      `}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
