import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 22 },
  },
};



export default function Hero() {
  const navigate = useNavigate();

  return (
    <motion.section
      className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-xl mx-auto py-4 sm:py-8 px-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Profile / Intro Picture */}
      <motion.div
        variants={itemVariants}
        className="mb-4 relative"
      >
        <div
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 mx-auto shadow-2xl"
          style={{ borderColor: 'var(--color-primary)' }}
        >
          <img
            src="/Image0.jpeg"
            alt="Riya's profile"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Glowing ring */}
        <div
          className="absolute inset-0 w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto animate-pulse_glow pointer-events-none"
          style={{
            boxShadow: '0 0 24px 6px var(--color-primary)',
            opacity: 0.35,
          }}
        />
      </motion.div>

      {/* Emoji crown */}
      <motion.div variants={itemVariants} className="text-4xl sm:text-5xl mb-1 sm:mb-2 select-none">
        👑
      </motion.div>

      {/* Main heading */}
      <motion.h1
        variants={itemVariants}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text leading-tight"
        style={{
          backgroundImage:
            'linear-gradient(135deg, var(--color-primary-hover) 0%, var(--color-text-main) 50%, var(--color-primary) 100%)',
        }}
      >
        How Well Do You{' '}
        <span className="italic">Know Me?</span>
      </motion.h1>



      {/* CTA buttons */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center mt-6 sm:mt-10 w-full"
      >
        <Button
          onClick={() => navigate('/quiz')}
          className="text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 min-h-[48px] w-full max-w-xs shadow-xl shadow-theme-primary/50 animate-pulse_glow"
        >
          🎮 Start Quiz!
        </Button>
      </motion.div>

    </motion.section>
  );
}
