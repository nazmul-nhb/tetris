# Tetris

[Play Now!](https://tetris-nhb.vercel.app/)

A modern implementation of the classic **Tetris** game built with `React` and `TypeScript`.

## Key Features

- Classic `Tetris` gameplay with modern web UI
- Sound effects and background music
- Local storage for saving high scores and total lines cleared
- Keyboard and on-screen controls

## Keyboard Shortcuts

- **Left Arrow**: Move piece left
- **Right Arrow**: Move piece right
- **Down Arrow**: Move piece down
- **Up Arrow**: Rotate piece
- **Space**: Pause/Resume game
- **S**: Toggle sound effects
- **M**: Toggle background music
- **Esc**: Restart game

## Local Setup

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

## Usage

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

## Build for Production

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

## Technologies Used

- `React` JavaScript library to build the application.
- `TypeScript` For typed JavaScript during development.
- `react-icons` for icons.
- `useReducer`: Built in React hook for complex state management.

## Version

Current version: 1.2.1

## Author

[Nazmul Hassan](https://nazmul-nhb.vercel.app)
