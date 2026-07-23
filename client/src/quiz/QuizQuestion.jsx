import { motion, AnimatePresence } from 'framer-motion';

const optionVariants = {
  idle: { scale: 1, x: 0 },
  correct: {
    scale: [1, 1.05, 1],
    backgroundColor: ['rgba(255,255,255,0.4)', 'rgba(134,239,172,0.6)', 'rgba(134,239,172,0.5)'],
    transition: { duration: 0.4 },
  },
  wrong: {
    x: [0, -8, 8, -6, 6, -3, 3, 0],
    backgroundColor: ['rgba(255,255,255,0.4)', 'rgba(252,165,165,0.6)', 'rgba(252,165,165,0.5)'],
    transition: { duration: 0.5 },
  },
};

export default function QuizQuestion({
  question,
  onAnswer,
  selectedIndex,
  feedback,
}) {
  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Question emoji */}
      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20, delay: 0.1 }}
        className="text-4xl sm:text-5xl text-center mb-3 sm:mb-4"
      >
        {question.emoji}
      </motion.div>

      {/* Question text */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-lg sm:text-xl md:text-2xl font-extrabold text-theme-text-main text-center mb-4 sm:mb-6 leading-snug"
      >
        {question.question}
      </motion.h2>

      {/* Options grid — 1 col on mobile, 2 cols on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
        <AnimatePresence>
          {question.options.map((option, i) => {
            const isSelected = selectedIndex === i;
            const isCorrect = i === question.correct;
            let animState = 'idle';
            if (feedback && isSelected) {
              animState = feedback === 'correct' ? 'correct' : 'wrong';
            } else if (feedback && isCorrect) {
              animState = 'correct'; // show correct on wrong pick
            }

            return (
              <motion.button
                key={option}
                variants={optionVariants}
                animate={animState}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  opacity: { delay: 0.1 + i * 0.07 },
                  y: { delay: 0.1 + i * 0.07, type: 'spring', stiffness: 280, damping: 20 },
                }}
                whileHover={!feedback ? { scale: 1.04, y: -2 } : {}}
                whileTap={!feedback ? { scale: 0.97 } : {}}
                onClick={() => !feedback && onAnswer(i)}
                disabled={!!feedback}
                className={`
                  glass px-4 py-4 sm:py-4 rounded-2xl text-left font-bold text-theme-text-main
                  transition-colors duration-200 cursor-pointer text-sm sm:text-base
                  disabled:cursor-default select-none flex items-center gap-2 w-full
                  min-h-[52px] border-2 ${isSelected && feedback
                    ? feedback === 'correct'
                      ? 'border-green-400'
                      : 'border-red-400'
                    : feedback && isCorrect
                      ? 'border-green-400'
                      : 'border-theme-card-border'}
                `}
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-theme-primary/20 flex items-center justify-center text-xs font-black text-theme-text-main">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="leading-snug">{option}</span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
