# Old Fashion Games

Retro-style browser games built with HTML5 Canvas, featuring a Dino Runner and Flappy Bird clone.

**Live:** [oldfashiongames-production.up.railway.app](https://oldfashiongames-production.up.railway.app)

## Games

- **Dino Run** - Side-scrolling runner. Jump over cacti to survive.
- **Flappy** - Navigate through pipe gaps by tapping to fly.

## Features

- 3 difficulty levels (Beginner, Intermediate, Advanced)
- Progressive difficulty that increases every 10 obstacles
- Leaderboard with PostgreSQL backend (per game, per difficulty)
- Responsive design with full mobile touch/swipe support

## Controls

### Desktop

- **Space / Arrow Up** - Jump / Flap
- **M** - Return to menu
- **D** - Change difficulty (on game over)
- **Tab** - Switch game tab (leaderboard)

### Mobile

- **Tap** - Jump / Flap / Select menu items
- **[X] button** (top-right) - Back to menu from any screen
- **Tap [Change Level]** - Switch difficulty on game over
- **Tap [Menu]** - Return to menu on game over
- **Swipe left/right** - Switch game tab (leaderboard)
- **Swipe up/down** - Cycle difficulty (leaderboard)

## Setup

### Prerequisites

- Node.js
- PostgreSQL

### Install

```bash
# Install dependencies
npm install

# Create PostgreSQL database
createdb dinogame
psql dinogame -c "
CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  player_name VARCHAR(20) NOT NULL,
  game_type VARCHAR(10) NOT NULL,
  score INTEGER NOT NULL,
  difficulty VARCHAR(15) NOT NULL DEFAULT 'intermediate',
  created_at TIMESTAMP DEFAULT NOW()
);
"

# Start the server
npm start
```

Open http://localhost:3000 in your browser.

### Deploy (Railway)

1. Push to GitHub
2. Connect repo in Railway dashboard
3. Add PostgreSQL plugin (auto-sets `DATABASE_URL`)
4. Deploy

## License

MIT
