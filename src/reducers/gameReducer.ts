import { SPEED_LEVELS, TETROMINOS } from "../constants";
import { GameAction, GameState } from "../types";
import {
	createEmptyGrid,
	isCollision,
	getRenderedGrid,
	rotateMatrix,
	clearFullRows,
	getRandomPiece,
} from "../utilities/gameUtils";
import {
	getSavedScores,
	updateBestScore,
	updateLinesCleared,
} from "../utilities/localStorage";

/**
 * Game Reducer.
 * @param state The current game state.
 * @param action The action to perform.
 * @returns The new game state.
 */
export function gameReducer(state: GameState, action: GameAction): GameState {
	switch (action.type) {
		case "RESET_GRID":
			return {
				...state,
				grid: createEmptyGrid(),
				currentPiece: TETROMINOS[getRandomPiece()],
				position: { x: 4, y: 0 },
				score: 0,
				linesCleared: 0,
				gameOver: false,
				isPaused: false,
				speed: 1000,
			};

		case "SPAWN_PIECE": {
			if (state.gameOver) return state;

			const piece = TETROMINOS[action.piece];
			const spawnPosition = { x: 4, y: 0 };

			// Check if the spawn position is valid
			if (isCollision(state.grid, piece.shape, spawnPosition)) {
				return { ...state, speed: 1000, gameOver: true }; // Game Over
			}

			return {
				...state,
				currentPiece: piece,
				position: spawnPosition,
			};
		}

		case "UPDATE_POSITION": {
			if (!state.currentPiece) return state;

			if (state.isPaused) {
				return {
					...state,
					isPaused: false,
					// isMusicEnabled: true,
				};
			}

			const newX = state.position.x + action.x;
			const newY = state.position.y + action.y;

			// Check for collision
			const collision = isCollision(
				state.grid,
				state.currentPiece.shape,
				{ x: newX, y: newY }
			);

			// Lock piece if collision occurs on downward movement
			if (collision && action.y > 0) {
				const lockedGrid = getRenderedGrid(
					state.grid,
					state.currentPiece.shape,
					state.position,
					state.currentPiece.color
				);

				return {
					...state,
					grid: lockedGrid,
					currentPiece: null,
					position: { x: 4, y: 0 },
				};
			}

			// Ignore invalid moves
			if (collision) return state;

			// Apply valid movement
			return {
				...state,
				position: { x: newX, y: newY },
			};
		}

		case "ROTATE_PIECE": {
			if (!state.currentPiece) return state;

			if (state.isPaused) {
				return {
					...state,
					isPaused: false,
					// isMusicEnabled: true,
				};
			}

			// Rotate the piece
			const rotatedShape = rotateMatrix(state.currentPiece.shape);

			// Check for collisions after rotation
			if (!isCollision(state.grid, rotatedShape, state.position)) {
				return {
					...state,
					currentPiece: {
						...state.currentPiece,
						shape: rotatedShape,
					},
				};
			}

			// If rotation is invalid, return state unchanged
			return state;
		}

		case "CLEAR_ROWS": {
			const { newGrid, rowsCleared } = clearFullRows(state.grid);

			let newPoints: number | null = null;

			if (rowsCleared > 0) {
				updateLinesCleared(rowsCleared);
				newPoints =
					rowsCleared === 4 ? 800 : rowsCleared > 1 ? 300 : 100;
			}

			const newScore = state.score + (newPoints || 0);

			let bestScore = state.bestScore;

			// Handle Best Score
			if (newScore > state.bestScore) {
				bestScore = newScore;
				updateBestScore(bestScore);
			}

			// Dynamic Speed Adjustment
			const newSpeed = SPEED_LEVELS.reduce((acc, level) => {
				return newScore >= level.score ? level.speed : acc;
			}, 1000);

			// Fetch updated scores after local storage changes
			const updatedScores = getSavedScores();

			return {
				...state,
				grid: newGrid,
				score: newScore,
				speed: newSpeed,
				points: newPoints,
				bestScore: updatedScores.bestScore,
				linesCleared: state.linesCleared + rowsCleared,
				totalLines: updatedScores.totalLines,
			};
		}

		case "TOGGLE_PAUSE":
			return {
				...state,
				isPaused: !state.isPaused,
				// isMusicEnabled: !!state.isPaused,
			};

		case "TOGGLE_MUSIC":
			if (action.enableMusic) {
				return { ...state, isMusicEnabled: true };
			}

			return { ...state, isMusicEnabled: !state.isMusicEnabled };

		case "TOGGLE_SOUND_EFFECTS":
			return {
				...state,
				isSoundEffectsEnabled: !state.isSoundEffectsEnabled,
			};

		case "RESET_POINTS":
			return {
				...state,
				points: null,
			};

		default:
			return state;
	}
}
