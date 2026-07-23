import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import chatRouter from './routes/chat.js';
import leaderboardRouter from './routes/leaderboard.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
}));

app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Chat route
app.use('/api/chat', chatRouter);

// Leaderboard route
app.use('/api/leaderboard', leaderboardRouter);

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`\n✨ PotterHarry server running at http://localhost:${PORT}`);
      if (!process.env.GEMINI_API_KEY) {
        console.warn('⚠️  GEMINI_API_KEY not set! Copy server/.env.example to server/.env and add your key.');
      }
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
