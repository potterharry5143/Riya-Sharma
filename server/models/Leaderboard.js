import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 10, // 10 questions total
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create model
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

export default Leaderboard;
