# 🎮 Tetris

[**▶️ Play Now!**](https://tetris-nhb.vercel.app)

A modern, fast-paced web implementation of the classic **Tetris** game built with `React` and `TypeScript`.

## 🚀 **Key Features**

- 🎲 **Classic Tetris Gameplay:** Enjoy the iconic block-stacking puzzle mechanics with simplified yet attractive UI.  
- 🔊 **Sound Effects & Music:** Toggle background music and sound effects for an engaging experience. Users can also select their own favorite music tracks by clicking the music folder icon.
- 💾 **Local Storage Integration:** Automatically save **high scores** and **total lines cleared**.  
- 🎮 **Keyboard & On-Screen Controls:** Play using keyboard shortcuts or on-screen buttons.  
- 🧩 **Next Piece Preview:** Preview the upcoming Tetromino to plan better strategy.  
- 🏆 **Dynamic Points Pop-Up:** Instant feedback with animated point pop-ups after clearing lines.  
- ⭐ **Reward System:** Score higher as rewards for clearing multiple lines simultaneously or for faster speed.  
- ⚡ **Adaptive Difficulty:** The game speeds up as the player progresses, adding more challenge. Show speed on top-left corner.  
- 🎭 **Hard/Easy Mode:** Switch between modes using the **🎭 Mode Toggle** button (Mask Icon on top). An **empty mask on back** represents **Easy Mode** (grid lines visible), while **both masks filled** represents **Hard Mode** (grid lines hidden). The mask icon along with speed and restart button icon turns **orange** in *Easy Mode* and **blue** in *Hard Mode*.
- 🛑 **Pause & Restart Controls:** Easily pause and restart the game. Show restart button on top-right corner. Restarting the game requires confirmation.
- 📱 **Progressive Web App (PWA):** This game is a `PWA` and can be installed on your device for offline play.

## 📊 Scoring & Reward System

The game rewards players based on the number of lines cleared and the current game speed:

### 🪄 Base Points (per Clear Action)

| **Lines Cleared** | **Base Points** |
|------------------:|:---------------:|
| 1 Line            | 100             |
| 2 Lines           | 300             |
| 3 Lines           | 500             |
| 4 Lines           | 800             |

As more lines are cleared in a single move, the points awarded increase. Clearing multiple lines simultaneously is a strategic way to accumulate points quickly and boost the score efficiently.

### ⚡ Speed Multiplier

The base points are multiplied by a [**Speed Multiplier**](#-speed-levels-table) based on the current drop speed:

```text
Final Points = Base Points × Speed Multiplier (1.0, 1.1, 1.3, 2.5 etc.)
```

### 🎭 Hard Mode Bonus

If **Hard Mode** is enabled, the final points are further increased by **1.5×**:

```text
Final Score = Final Points × 1.5 (if Hard Mode is ON)
```

This encourages skilled players to attempt harder challenges for higher rewards.

## 🔥 Speed Ups

As more points are accumulated during gameplay, the speed of the falling Tetrominos increases automatically. This creates an escalating challenge as the game progresses. Speed levels are determined by the current score:

### 📊 Speed Levels Table

| **Score Range (points)** | **Drop Speed** | **Speed Multiplier** |  
|-------------------------:|:--------------:|:--------------------:|
| **0 - 999**              | **1000 ms**    | **1.0x**             |
| **1000 - 4999**          | **875 ms**     | **1.1x**             |
| **5000 - 9999**          | **775 ms**     | **1.3x**             |
| **10000 - 19999**        | **675 ms**     | **1.5x**             |
| **20000 - 29999**        | **590 ms**     | **1.7x**             |
| **30000 - 34999**        | **500 ms**     | **2.0x**             |
| **35000 - 39999**        | **400 ms**     | **2.5x**             |
| **40000 - 44999**        | **335 ms**     | **3.0x**             |
| **45000 - 49999**        | **270 ms**     | **3.7x**             |
| **50000+**               | **220 ms**     | **4.5x**             |

The Tetrominos will fall faster as the player reaches higher score thresholds, making the game progressively more difficult and exciting.

## 🎯 **Controls with Keyboard Shortcuts**

| **Action**                 | **Key**     |
|---------------------------:|:-----------:|
| Rotate                     | ↑ Arrow     |
| Move Left                  | ← Arrow     |
| Move Right                 | → Arrow     |
| Faster Drop                | ↓ Arrow     |
| Pause/Resume               | Spacebar/P  |
| Restart                    | Escape/R    |
| Toggle Sound Effects       | S           |
| Toggle Background Music    | M           |
| Open File(s) or Folder     | F           |
| Toggle Hard/Easy Mode      | E/H         |
| Play next background music | N           |

## 🖥️ **Technologies Used**

- **React** for building UI components.  
- **TypeScript** for type safety during development.  
- **TailwindCSS** for styling alongside vanilla css (for custom animation).  
- **useReducer Hook** for complex state management.  
- **LocalStorage** for persistent game data.  
- **React Icons** for visual controls with attractive icons.  
- **Music Metadata** for extracting music metadata (song title and artist name).  

## 📦 Version

Current version: **2.6.0**

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
