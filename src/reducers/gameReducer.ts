import { COLS, ROWS, SPEED_LEVELS, TETROMINOS } from "../constants";
import { GameAction, GameState } from "../types";
import {
	createEmptyGrid,
	isCollision,
	getRenderedGrid,
	rotateMatrix,
	clearFullRows,
	getRandomPiece,
	getSpeedMultiplier,
} from "../utilities/gameUtils";
import {
	getSavedScores,
	updateBestScore,
	updateLinesCleared,
} from "../utilities/localStorage";

/**
 * Reducer function to manage game state for Tetris.
 *
 * @param state - The current game state.
 * @param action - The action to perform, such as "RESET_GRID", "SPAWN_PIECE", "UPDATE_POSITION", etc.
 * @returns The new game state after the action is processed.
 */
export function gameReducer(state: GameState, action: GameAction): GameState {
	switch (action.type) {
		case "RESET_GRID":
			return {
				...state,
				grid: createEmptyGrid(ROWS, COLS),
				currentPiece: TETROMINOS[getRandomPiece()],
				nextPiece: TETROMINOS[getRandomPiece()],
				position: { x: 4, y: 0 },
				score: 0,
				linesCleared: 0,
				gameOver: false,
				isPaused: false,
				speed: 1000,
			};

		case "SPAWN_PIECE": {
			if (state.gameOver) return state;

			const piece = state.nextPiece;

			const spawnPosition = { x: 4, y: 0 };

			// Check if the spawn position is valid
			if (isCollision(state.grid, piece.shape, spawnPosition)) {
				return { ...state, gameOver: true }; // Game Over
			}

			return {
				...state,
				currentPiece: piece,
				nextPiece: TETROMINOS[getRandomPiece()],
				position: spawnPosition,
			};
		}

		case "UPDATE_POSITION": {
			if (!state.currentPiece) return state;

			if (state.isPaused) {
				return { ...state, isPaused: false };
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
				return { ...state, isPaused: false };
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

			let basePoints: number = 0;

			if (rowsCleared > 0) {
				// Update lines cleared in local storage
				updateLinesCleared(rowsCleared);

				switch (rowsCleared) {
					case 1:
						basePoints = 100;
						break;
					case 2:
						basePoints = 300;
						break;
					case 3:
						basePoints = 500;
						break;
					case 4:
						basePoints = 800;
						break;
					default:
						break;
				}
			}

			// Bonus Multiplier for faster speed
			const speed = Number(getSpeedMultiplier(state.speed));
			const newPoints = basePoints * speed;

			const newScore =
				state.score + (state.isHardMode ? newPoints * 1.5 : newPoints);

			let bestScore = state.bestScore;

			// Update Best Score in memory and local storage
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
			return { ...state, isPaused: !state.isPaused };

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
			return { ...state, points: null };

		case "CHANGE_TRACK":
			return {
				...state,
				trackChanges: state.trackChanges + 1,
			};

		case "TOGGLE_MODE":
			return {
				...state,
				isHardMode: !state.isHardMode,
			};

		default:
			return state;
	}
}
