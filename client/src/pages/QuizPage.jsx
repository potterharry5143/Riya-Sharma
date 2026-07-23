import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import ProgressBar from '../quiz/ProgressBar';
import QuizQuestion from '../quiz/QuizQuestion';
import FeedbackOverlay from '../quiz/FeedbackOverlay';
import ResultScreen from '../quiz/ResultScreen';
import StartScreen from '../quiz/StartScreen';
import questions from '../quiz/questions';

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 24 },
  },
  exit: (dir) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  }),
};

export default function QuizPage() {
  const [playerName, setPlayerName] = useState('');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [direction, setDirection] = useState(1);
  const [finished, setFinished] = useState(false);

  const handleAnswer = useCallback(
    (optionIdx) => {
      if (feedback) return; // guard double-click
      const isCorrect = optionIdx === questions[currentIdx].correct;
      setSelectedIndex(optionIdx);
      setFeedback(isCorrect ? 'correct' : 'wrong');

      if (isCorrect) {
        setScore((s) => s + 1);

        // Micro confetti on correct — dynamic import
        import('canvas-confetti').then(({ default: confetti }) => {
          confetti({
            particleCount: 30,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#ffb3c6', '#d4bbff', '#b5ead7'],
            scalar: 0.7,
          });
        });
      }

      // Auto-advance after feedback
      setTimeout(() => {
        setFeedback(null);
        setSelectedIndex(null);
        setDirection(1);
        if (currentIdx + 1 >= questions.length) {
          setFinished(true);
        } else {
          setCurrentIdx((i) => i + 1);
        }
      }, 1100);
    },
    [currentIdx, feedback]
  );

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedIndex(null);
    setFeedback(null);
    setDirection(1);
    setFinished(false);
    setPlayerName('');
  };

  return (
    <div className="relative min-h-screen z-10">
      <div className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 pt-20 sm:pt-24 pb-8 sm:pb-12">
        <GlassCard className="w-full max-w-2xl">
          {!playerName ? (
            <StartScreen onStart={(name) => setPlayerName(name)} />
          ) : finished ? (
            <ResultScreen
              playerName={playerName}
              score={score}
              total={questions.length}
              onRestart={handleRestart}
            />
          ) : (
            <>
              {/* Header */}
              <div className="mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl font-black text-theme-text-main text-center mb-1">
                  ✨ How Well Do You Know Me?
                </h1>
                <ProgressBar current={currentIdx + 1} total={questions.length} />
              </div>

              {/* Animated question card */}
              <div className="relative overflow-hidden min-h-[320px] sm:min-h-[360px] flex items-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIdx}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full"
                  >
                    <QuizQuestion
                      question={questions[currentIdx]}
                      onAnswer={handleAnswer}
                      selectedIndex={selectedIndex}
                      feedback={feedback}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}
        </GlassCard>
      </div>

      {/* Feedback overlay */}
      <FeedbackOverlay feedback={feedback} />
    </div>
  );
}
