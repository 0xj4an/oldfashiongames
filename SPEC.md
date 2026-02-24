# Dino Flappy - Game Specification

## 1. Project Overview
- **Project Name**: Dino Flappy
- **Type**: Browser-based arcade game (single HTML file)
- **Core Functionality**: Flappy Bird clone featuring the Chrome dinosaur character jumping through pipes
- **Target Users**: Casual gamers, nostalgic Chrome users

## 2. UI/UX Specification

### Layout Structure
- Full viewport canvas game
- Centered game area (400x600px)
- Score display top-center
- Game over overlay with restart prompt

### Visual Design

#### Color Palette
- **Background**: `#f7f7f7` (off-white, like original Chrome game)
- **Ground**: `#535353` (dark gray)
- **Dino**: `#535353` (dark gray silhouette)
- **Pipes**: `#73bf2e` (classic green)
- **Pipe Cap**: `#558c22` (darker green)
- **Text**: `#535353`
- **Score**: `#535353`
- **Game Over Overlay**: `rgba(0, 0, 0, 0.5)`

#### Typography
- **Font**: `"Press Start 2P"` from Google Fonts (pixel style)
- **Fallback**: `monospace`
- **Score Size**: 32px
- **Game Over Text**: 24px

#### Spacing
- Ground height: 80px from bottom
- Pipe gap: 150px vertical spacing
- Pipe horizontal spacing: 200px between pipes

### Visual Effects
- Dino bobbing animation (subtle up/down while alive)
- Screen shake on collision
- Flash effect on death

### Components

#### Dino (Player)
- 40x44px sprite area
- Simple blocky T-Rex shape drawn with canvas
- States: alive (bobbing), dead (rotates and falls)
- Jump velocity: -8.5
- Gravity: 0.5
- Max fall speed: 10

#### Pipes
- Width: 52px
- Gap: 150px (adjustable for difficulty)
- Cap height: 26px
- Move speed: 3px per frame
- Spawn off-screen right, despawn off-screen left

#### Ground
- Scrolling ground line
- Simple horizontal line with small marks for movement illusion

#### Score
- Current score (pipes passed)
- Best score (localStorage)

## 3. Functionality Specification

### Core Features
1. **Game Loop**: 60fps canvas rendering
2. **Jump Mechanic**: Click/Space/Tap to jump
3. **Pipe Generation**: Random gap position (min 50px from top/bottom)
4. **Collision Detection**: Box collision between dino and pipes/ground/ceiling
5. **Scoring**: +1 for each pipe pair passed
6. **High Score**: Persisted in localStorage
7. **Restart**: Click/Space/Tap after game over

### User Interactions
- **Start**: Any key/click starts game
- **Jump**: Space, Up Arrow, Click, or Touch
- **Restart**: Any key/click after death

### Game States
1. **Ready**: Shows "Tap to Start" - dino stationary
2. **Playing**: Active gameplay
3. **Game Over**: Shows score, best score, "Tap to Restart"

### Edge Cases
- Prevent dino from going above ceiling
- Prevent multiple jumps mid-air (optional: allow flapping)
- Handle window blur (pause game)
- Responsive: center canvas on any screen size

## 4. Acceptance Criteria
- [x] Game loads without errors
- [x] Dino jumps on input
- [x] Pipes scroll from right to left
- [x] Collision detection works accurately
- [x] Score increments when passing pipes
- [x] High score persists across sessions
- [x] Game restarts properly
- [x] Visual style matches Chrome dinosaur aesthetic
- [x] Works on desktop (keyboard + mouse)
