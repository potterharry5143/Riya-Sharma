import { motion, AnimatePresence } from 'framer-motion';

export default function FeedbackOverlay({ feedback }) {
  // feedback = 'correct' | 'wrong' | null
  return (
    <AnimatePresence>
      {feedback && (
        <motion.div
          key={feedback}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            initial={{ scale: 0.4, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.4, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`
              px-10 py-8 rounded-3xl glass text-center shadow-2xl
              ${feedback === 'correct'
                ? 'border-green-400/60 bg-green-100/50'
                : 'border-red-400/60 bg-red-100/50'}
            `}
          >
            <div className="text-6xl mb-2">
              {feedback === 'correct' ? '🎉' : '😅'}
            </div>
            <p className={`text-2xl font-black ${
              feedback === 'correct' ? 'text-green-600' : 'text-red-500'
            }`}>
              {feedback === 'correct' ? 'Correct! 🥳' : 'Oops! 💀'}
            </p>
            <p className="text-sm text-gray-500 mt-1 font-semibold">
              {feedback === 'correct'
                ? 'You know me so well!'
                : 'Not quite, but nice try!'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
