import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', ...props }) {
  return (
    <motion.div
      className={`glass p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
