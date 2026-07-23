import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

export default function StartScreen({ onStart }) {
  const [name, setName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || '') + '/api/leaderboard')
      .then(res => res.json())
      .then(data => setLeaderboard(data))
      .catch(err => console.error('Leaderboard error:', err))
      .finally(() => setIsLoading(false));
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 text-center min-h-[300px]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="text-6xl mb-4">👑</div>
        <h2 className="text-2xl font-black text-theme-text-main mb-6">
          Who's playing today?
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
          <input
            type="text"
            placeholder="Enter your cute name ✨"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={25}
            className="px-6 py-3 rounded-full border-2 border-theme-card-border focus:border-theme-primary 
              focus:outline-none focus:ring-4 focus:ring-theme-primary/30 text-theme-text-main 
              placeholder-theme-text-muted/70 font-bold text-center w-full max-w-[280px] bg-theme-card-bg backdrop-blur-sm
              transition-all duration-200"
            autoFocus
          />
          <Button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="w-full max-w-[280px]"
          >
            Let's Begin! 🚀
          </Button>
        </form>
      </motion.div>

      {/* Leaderboard Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm mt-8 glass p-4 shadow-sm"
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
                className="flex justify-between items-center px-4 py-2 rounded-xl text-sm font-bold bg-theme-card-bg text-theme-text-main border border-theme-card-border"
              >
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-3">
                    <span className="opacity-50">#{idx + 1}</span>
                    <span className="truncate max-w-[120px]">{entry.name}</span>
                  </div>
                  <span className="text-xs font-normal opacity-60 mt-0.5 ml-7">
                    {new Date(entry.createdAt).toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{entry.score} pts</span>
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
    </div>
  );
}
