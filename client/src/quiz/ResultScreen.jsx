import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const SCORE_RANGES = [
  {
    min: 0,
    max: 3,
    badge: '🥚',
    title: 'Total Stranger',
    msg: "We've barely met, huh? 😅 Let's hang out more!",
  },
  {
    min: 4,
    max: 5,
    badge: '🌱',
    title: 'Getting There!',
    msg: "You know a few things! You're warming up! 🌟",
  },
  {
    min: 6,
    max: 7,
    badge: '⭐',
    title: 'Pretty Close!',
    msg: "Not bad at all! You really pay attention! 👀",
  },
  {
    min: 8,
    max: 9,
    badge: '💫',
    title: 'Almost Perfect!',
    msg: "You know me SO well! Just one or two slips! 🥺",
  },
  {
    min: 10,
    max: 10,
    badge: '👑',
    title: 'My Person! 🎉',
    msg: "PERFECT SCORE! You know me better than I know myself! 💕",
  },
];

function getRange(score) {
  return SCORE_RANGES.find((r) => score >= r.min && score <= r.max) || SCORE_RANGES[0];
}

export default function ResultScreen({ playerName, score, total, onRestart }) {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayScore, setDisplayScore] = useState(0);
  const [savedEntryId, setSavedEntryId] = useState(null);
  const confettiFired = useRef(false);
  const range = getRange(score) || SCORE_RANGES[0]; // fallback safety

  // Count-up animation
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = Math.max(16, duration / score || duration);
    const timer = setInterval(() => {
      start += 1;
      setDisplayScore(start);
      if (start >= score) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [score]);

  // Confetti — dynamic import, fire once
  useEffect(() => {
    if (confettiFired.current) return;
    confettiFired.current = true;
    const fire = async () => {
      const { default: confetti } = await import('canvas-confetti');
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#ffb3c6', '#d4bbff', '#b5ead7', '#fff3b0', '#ff9dc0'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ffb3c6', '#c084fc'],
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#b5ead7', '#fff3b0'],
        });
      }, 400);
    };
    fire();
  }, []);

  const scoreSaved = useRef(false);

  // API Call to save score and fetch leaderboard
  useEffect(() => {
    const saveAndFetch = async () => {
      try {
        if (!scoreSaved.current && playerName) {
          scoreSaved.current = true;
          const postRes = await fetch((import.meta.env.VITE_API_URL || '') + '/api/leaderboard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: playerName, score }),
          });
          if (postRes.ok) {
            const saved = await postRes.json();
            setSavedEntryId(saved._id);
          }
        }
        const res = await fetch((import.meta.env.VITE_API_URL || '') + '/api/leaderboard');
        const data = await res.json();
        setLeaderboard(data);
      } catch (err) {
        console.error('Leaderboard error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    saveAndFetch();
  }, [playerName, score]);

  const handleDelete = async (id) => {
    const code = prompt('Enter admin code to delete this entry:');
    if (!code) return;

    try {
      const res = await fetch(`/api/leaderboard/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      if (res.ok) {
        setLeaderboard(prev => prev.filter(entry => entry._id !== id));
      } else {
        const errorData = await res.json();
        alert(`Failed to delete: ${errorData.error}`);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete. Make sure backend is running.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-3 sm:px-4">


      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-3xl sm:text-4xl font-black text-theme-text-main mb-2"
      >
        {range.title} {playerName && `, ${playerName}!`}
      </motion.h2>

      {/* Score circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20, delay: 0.5 }}
        className={`my-6 w-32 h-32 rounded-full glass
          flex flex-col items-center justify-center shadow-xl border-4 border-theme-primary`}
      >
        <span className="text-4xl font-black text-theme-text-main drop-shadow">
          {displayScore}
        </span>
        <span className="text-sm font-bold text-theme-text-muted">out of {total}</span>
      </motion.div>



      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-sm sm:max-w-sm mb-6 glass p-3 sm:p-4"
      >
        <h3 className="text-xl font-bold text-theme-text-main mb-3">🏆 Leaderboard</h3>
        {isLoading ? (
          <p className="text-sm text-theme-text-muted">Loading...</p>
        ) : leaderboard.length === 0 ? (
          <p className="text-sm text-theme-text-muted">No scores yet! Play to be the first! 🌟</p>
        ) : (
          <div className="flex flex-col gap-2">
            {leaderboard.map((entry, idx) => (
              <div 
                key={entry._id || idx}
                className={`flex justify-between items-center px-4 py-2 rounded-xl text-sm font-bold border
                  ${entry._id === savedEntryId
                    ? 'bg-theme-primary text-theme-text-main border-theme-primary-hover shadow-md' 
                    : 'bg-theme-card-bg text-theme-text-main border-theme-card-border'}`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className="opacity-50">#{idx + 1}</span>
                    <span className="truncate max-w-[120px]">{entry.name}</span>
                  </div>
                  <span className="text-xs font-normal opacity-60 mt-0.5 ml-7">
                    {new Date(entry.createdAt).toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{entry.score} / {total}</span>
                  <button 
                    onClick={() => handleDelete(entry._id)}
                    className="opacity-40 hover:opacity-100 transition-opacity"
                    title="Delete entry"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-sm sm:max-w-none"
      >
        <Button onClick={onRestart} className="w-full sm:w-auto min-h-[48px]">🔄 Try Again</Button>
        <Button variant="secondary" onClick={() => navigate('/chat')} className="w-full sm:w-auto min-h-[48px]">
          💬 Chat with AI
        </Button>
        <Button variant="ghost" onClick={() => navigate('/')} className="w-full sm:w-auto min-h-[48px]">
          🏠 Home
        </Button>
      </motion.div>
    </div>
  );
}
