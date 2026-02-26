const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost/dinogame',
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Auto-create scores table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS scores (
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(20) NOT NULL,
    game_type VARCHAR(10) NOT NULL,
    score INTEGER NOT NULL,
    difficulty VARCHAR(15) NOT NULL DEFAULT 'intermediate',
    created_at TIMESTAMP DEFAULT NOW()
  )
`).then(() => console.log('Scores table ready'))
  .catch(err => console.error('Failed to create scores table:', err));

const VALID_DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];

// Get top 10 scores for a game type + difficulty
app.get('/api/scores/:gameType/:difficulty', async (req, res) => {
  const { gameType, difficulty } = req.params;
  if (gameType !== 'dino' && gameType !== 'flappy') {
    return res.status(400).json({ error: 'Invalid game type' });
  }
  if (!VALID_DIFFICULTIES.includes(difficulty)) {
    return res.status(400).json({ error: 'Invalid difficulty' });
  }

  try {
    const result = await pool.query(
      'SELECT player_name, score, difficulty, created_at FROM scores WHERE game_type = $1 AND difficulty = $2 ORDER BY score DESC LIMIT 10',
      [gameType, difficulty]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Save a new score
app.post('/api/scores', async (req, res) => {
  const { playerName, gameType, score, difficulty } = req.body;

  if (!playerName || !gameType || score == null || !difficulty) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  if (gameType !== 'dino' && gameType !== 'flappy') {
    return res.status(400).json({ error: 'Invalid game type' });
  }
  if (!VALID_DIFFICULTIES.includes(difficulty)) {
    return res.status(400).json({ error: 'Invalid difficulty' });
  }
  const name = String(playerName).slice(0, 20).trim();
  if (!name) {
    return res.status(400).json({ error: 'Invalid name' });
  }

  try {
    await pool.query(
      'INSERT INTO scores (player_name, game_type, score, difficulty) VALUES ($1, $2, $3, $4)',
      [name, gameType, Math.max(0, Math.floor(Number(score))), difficulty]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Old Fashion Games server running at http://localhost:${PORT}`);
});
