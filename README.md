# 🎮 Tetris

[**▶️ Play Now!**](https://tetris-nhb.vercel.app)

A modern implementation of the classic **Tetris** game built with `React` and `TypeScript`.

## 🚀 **Key Features**

- 🎲 **Classic Tetris Gameplay:** Enjoy the iconic block-stacking puzzle mechanics.  
- 🔊 **Sound Effects & Music:** Toggle background music and sound effects for an engaging experience. Users can also select their own favorite music tracks by clicking the music folder icon.
- 💾 **Local Storage Integration:** Automatically save **high scores** and **total lines cleared**.  
- 🎮 **Keyboard & On-Screen Controls:** Play using keyboard shortcuts or on-screen buttons.  
- 🧩 **Next Piece Preview:** Preview the upcoming Tetromino to plan better strategy.  
- 🏆 **Dynamic Points Pop-Up:** Instant feedback with animated point pop-ups after clearing lines.  
- ⭐ **Reward System:** Score higher rewards for clearing multiple lines simultaneously.  
- ⚡ **Adaptive Difficulty:** The game speeds up as the player progresses, adding more challenge. Show speed on top-left corner.  
- 🛑 **Pause & Restart Controls:** Easily pause and restart the game. Show restart button on top-right corner. Restarting the game requires confirmation.

## 📊 Scoring & Reward System

The game rewards players with points based on how many lines they clear at once:

| **Lines Cleared** | **Points Awarded** |
|------------------:|:-------------------|
| 1 Line            | 100 Points         |
| 2 Lines           | 300 Points         |
| 3 Lines           | 500 Points         |
| 4 Lines           | 800 Points         |

As more lines are cleared in a single move, the points awarded increase. Clearing multiple lines simultaneously is a strategic way to accumulate points quickly and boost the score efficiently.

## 🔥 Speed Ups

As more points are accumulated during gameplay, the speed of the falling Tetrominos increases automatically. This creates an escalating challenge as the game progresses. Speed levels are determined by the current score:

### 📊 Speed Levels Table

| **Score Range (points)** | **Drop Speed (seconds)** |
|-------------------------:|:------------------------:|
| **0 - 999**              | **1.0 second**           |
| **1000 - 4999**          | **0.9 second**           |
| **5000 - 9999**          | **0.8 second**           |
| **10000 - 24999**        | **0.7 second**           |
| **25000 - 34999**        | **0.6 second**           |
| **35000 - 39999**        | **0.5 second**           |
| **40000 - 44999**        | **0.4 second**           |
| **45000 - 49999**        | **0.3 second**           |
| **50000+**               | **0.2 second**           |

The Tetrominos will fall faster as the player reaches higher score thresholds, making the game progressively more difficult and exciting.

## 🎯 **Controls with Keyboard Shortcuts**

| **Action**                 | **Key**     |
|---------------------------:|:------------|
| Rotate                     | ↑ Arrow     |
| Move Left                  | ← Arrow     |
| Move Right                 | → Arrow     |
| Faster Drop                | ↓ Arrow     |
| Pause/Resume               | Space-bar/P |
| Restart                    | Escape/R    |
| Toggle Sound Effects       | S           |
| Toggle Background Music    | M           |
| Open File(s) or Folder     | F           |
| Play next background music | N           |

## 🖥️ **Technologies Used**

- **React** for building UI components.  
- **TypeScript** for type safety during development.  
- **TailwindCSS** for styling alongside vanilla css.  
- **useReducer Hook** for complex state management.  
- **LocalStorage** for persistent game data.  
- **React Icons** for visual controls with attractive icons.  

## 📦 Version

Current version: 2.2.0

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
