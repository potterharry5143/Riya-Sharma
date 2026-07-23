import { Router } from 'express';
import Leaderboard from '../models/Leaderboard.js';

const router = Router();

// GET /api/leaderboard -> returns top 10 scores
router.get('/', async (req, res) => {
  try {
    const scores = await Leaderboard.find()
      .sort({ score: -1, createdAt: 1 }) // Highest score first, then earliest time
      .limit(10);
    res.json(scores);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// POST /api/leaderboard -> saves a new score
router.post('/', async (req, res) => {
  try {
    const { name, score } = req.body;
    
    if (!name || typeof score !== 'number') {
      return res.status(400).json({ error: 'Name and score are required' });
    }

    const entry = new Leaderboard({ name, score });
    await entry.save();

    res.status(201).json(entry);
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

// DELETE /api/leaderboard/:id -> deletes a score if secret code is valid
router.delete('/:id', async (req, res) => {
  try {
    const { code } = req.body;
    if (code !== 'Aman19') {
      return res.status(403).json({ error: 'Invalid admin code' });
    }
    await Leaderboard.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting score:', error);
    res.status(500).json({ error: 'Failed to delete score' });
  }
});

export default router;
