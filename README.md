# Old Fashion Games

Retro-style browser games built with HTML5 Canvas, featuring a Dino Runner and Flappy Bird clone.

## Games

- **Dino Run** - Side-scrolling runner. Jump over cacti to survive.
- **Flappy** - Navigate through pipe gaps by tapping to fly.

## Features

- 3 difficulty levels (Beginner, Intermediate, Advanced)
- Progressive difficulty that increases every 10 obstacles
- Leaderboard with PostgreSQL backend (per game, per difficulty)
- Responsive design with touch support for mobile

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

## Controls

- **Space / Arrow Up / Tap** - Jump / Flap
- **M** - Return to menu
- **D** - Change difficulty (on game over)

## License

MIT
