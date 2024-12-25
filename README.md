# 🎮 Tetris

[**▶️ Play Now!**](https://tetris-nhb.vercel.app)

A modern implementation of the classic **Tetris** game built with `React` and `TypeScript`.

## 🚀 **Key Features**

- 🎲 **Classic Tetris Gameplay:** Enjoy the iconic block-stacking puzzle mechanics.  
- 🔊 **Sound Effects & Music:** Toggle background music and sound effects for an engaging experience.  
- 💾 **Local Storage Integration:** Automatically save **high scores** and **total lines cleared**.  
- 🎮 **Keyboard & On-Screen Controls:** Play using keyboard shortcuts or on-screen buttons.  
- 🧩 **Next Piece Preview:** Preview the upcoming Tetromino to plan better strategy.  
- 🏆 **Dynamic Points Pop-Up:** Instant feedback with animated point pop-ups after clearing lines.  
- ⭐ **Reward System:** Score higher rewards for clearing multiple lines simultaneously.  
- ⚡ **Adaptive Difficulty:** The game speeds up as the player progresses, adding more challenge.  
- 🛑 **Pause & Restart Controls:** Easily pause and restart the game.  

## 📊 Scoring & Reward System

The game rewards player with points based on how many lines s/he clears at once:

- `100` Points for clearing only `1x` line.
- `300` Points for clearing `2x` lines at the same time.
- `500` Points for clearing `3x` lines at the same time.
- `800` Points for clearing `4x` lines at the same time.

As more lines are cleared in a single move, the points awarded increase. Clearing multiple lines simultaneously is a strategic way to accumulate points quickly and boost the score efficiently.

## 🔥 Speed Ups

As more points are accumulated during gameplay, the speed of the falling Tetrominos increases automatically. This creates an escalating challenge as the game progresses. Speed levels are determined by the current score:

- **0 - 999 points**: Speed is **1s** per drop.
- **1000 - 4999 points**: Speed is **0.9s** per drop.
- **5000 - 9999 points**: Speed is **0.8s** per drop.
- **10000 - 24999 points**: Speed is **0.7s** per drop.
- **25000 - 34999 points**: Speed is **0.6s** per drop.
- **35000 - 39999 points**: Speed is **0.5s** per drop.
- **40000 - 44999 points**: Speed is **0.4s** per drop.
- **45000 - 49999 points**: Speed is **0.3s** per drop.
- **50000+ points**: Speed is **0.2s** per drop.

The Tetrominos will fall faster as the player reaches higher score thresholds, making the game progressively more difficult and exciting.

## 🎯 **Controls with Keyboard Shortcuts**

| **Action**                 | **Key**   |
|----------------------------|---------  |
| Rotate                     | ↑ Arrow   |
| Move Left                  | ← Arrow   |
| Move Right                 | → Arrow   |
| Fast Drop                  | ↓ Arrow   |
| Pause/Resume               | Space-bar |
| Restart                    | Escape/R  |
| Toggle Sound Effects       | S         |
| Toggle Background Music    | M         |
| Play next background music | N         |

## 🖥️ **Technologies Used**

- **React** for building UI components.  
- **TypeScript** for type safety during development.  
- **TailwindCSS** for styling alongside vanilla css.  
- **useReducer Hook** for complex state management.  
- **LocalStorage** for persistent game data.  
- **React Icons** for visual controls with attractive icons.  

## 📦 Version

Current version: 1.7.3

## 👨‍💻 Author

[Nazmul Hassan](https://nazmul-nhb.vercel.app)

<details>
   <summary
      style="
         font-weight: 600;
         font-size: 26px;
         cursor: pointer;
         color: black;
      "
   >
      🛠️ Local Setup
   </summary>

### Set up the Project Locally

   To set up the project locally, follow these steps:

   1. Clone the repository:

      ```bash
      git clone https://github.com/nazmul-nhb/tetris.git
      ```

   2. Navigate to the project directory:

      ```bash
      cd tetris
      ```

   3. If you are using `npm` `yarn` or any other package manager rather than `pnpm` delete the `pnpm lockfile`:

      ```bash
      rm pnpm-lock.yaml
      ```

   4. Install the dependencies using your preferred package manager:

      **Using pnpm:**

      ```bash
      pnpm install
      ```

      **Using npm:**

      ```bash
      npm install
      ```

      **Using yarn:**

      ```bash
      yarn install
      ```

### Run the Project Locally

   To run the project locally, use the following command:

   **Using pnpm:**

   ```bash
   pnpm dev
   ```

   **Using npm:**

   ```bash
   npm run dev
   ```

   **Using yarn:**

   ```bash
   yarn dev
   ```

   This will start the development server and you can view the application in your browser at `http://localhost:5173` (or the `port` specified in your console).

### Build for Production

   To create a production build, run:

   **Using pnpm:**

   ```bash
   pnpm build
   ```

   **Using npm:**

   ```bash
   npm run build
   ```

   **Using yarn:**

   ```bash
   yarn build
   ```

</details>
