# Tetris

[Play Now!](https://tetris-nhb.vercel.app/)

A modern implementation of the classic **Tetris** game built with `React` and `TypeScript`.

## Key Features

- Classic `Tetris` gameplay with modern web UI
- Sound effects and background music
- Local storage for saving high scores and total lines cleared
- Keyboard and on-screen controls
- Points pop-up display showing the scored points for current cleared lines
- Reward system for clearing more lines at a time
- Speed ups that increase the challenge as the player progresses

## Scoring System

The game rewards player with points based on how many lines s/he clears at once:

- `100` Points for clearing only `1x` line.
- `300` Points for clearing `2x` lines at the same time.
- `500` Points for clearing `3x` lines at the same time.
- `800` Points for clearing `4x` lines at the same time.

As you clear more lines in a single move, the points awarded increase. Clearing multiple lines simultaneously is a strategic way to rack up more points and increase your score quickly.

## Speed Ups

As you accumulate more points during gameplay, the game will automatically increase the speed of the falling Tetrominos. This adds an increasing challenge as you progress. The speed levels are determined by your current score:

- **0 - 999 points**: Speed is **1s** per drop.
- **1000 - 4999 points**: Speed is **0.9s** per drop.
- **5000 - 9999 points**: Speed is **0.8s** per drop.
- **10000 - 24999 points**: Speed is **0.7s** per drop.
- **25000 - 34999 points**: Speed is **0.6s** per drop.
- **35000 - 39999 points**: Speed is **0.5s** per drop.
- **40000 - 44999 points**: Speed is **0.4s** per drop.
- **45000 - 49999 points**: Speed is **0.3s** per drop.
- **50000+ points**: Speed is **0.2s** per drop.

The Tetrominos will fall faster as you reach higher score thresholds, making the game progressively more difficult and exciting.

## Keyboard Shortcuts

- **Left Arrow**: Move piece left
- **Right Arrow**: Move piece right
- **Down Arrow**: Move piece down
- **Up Arrow**: Rotate piece
- **Space**: Pause/Resume game
- **S**: Toggle sound effects
- **M**: Toggle background music
- **N**: Play next background music
- **Esc**: Restart game

## Technologies Used

- `React` JavaScript library to build the application UI.
- `TypeScript` For typed JavaScript logic during development.
- `react-icons` For attractive icons.
- `useReducer`: Built in React hook for complex state management.

## Version

Current version: 1.6.9

## Author

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
      Local Setup
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
