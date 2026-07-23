import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import ThemeSelector from './ThemeSelector';

const links = [
  { to: '/quiz',  label: '🎮 Quiz' },
  { to: '/chat',  label: '💬 AI Chatbot' },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.1 }}
      className="fixed top-4 inset-x-0 flex justify-center z-50 pointer-events-none"
    >
      <div className="glass flex items-center justify-center gap-2 px-4 py-2 rounded-full pointer-events-auto">
        <Link to="/" title="Go Home">
          <span className="text-xl mr-1 select-none cursor-pointer hover:scale-110 transition-transform block">
            ✨
          </span>
        </Link>
        {links.map(({ to, label }) => {
          const active = pathname === to;
          return (
            <Link key={to} to={to}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-bold transition-colors duration-200 block whitespace-nowrap
                  ${active
                    ? 'bg-white/40 text-theme-text-main shadow-sm border border-theme-card-border'
                    : 'text-theme-text-muted hover:bg-white/20'}
                `}
              >
                {label}
              </motion.span>
            </Link>
          );
        })}
        <div className="ml-2 pl-2 border-l border-theme-card-border flex items-center">
          <ThemeSelector />
        </div>
      </div>
    </motion.nav>
  );
}
