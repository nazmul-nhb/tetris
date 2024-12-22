import { TETROMINOS } from "../constants";
import { GameAction, GameState } from "../types";
import {
	createEmptyGrid,
	isCollision,
	getRenderedGrid,
	rotateMatrix,
	clearFullRows,
} from "../utilities";

/**
 * Game Reducer.
 * @param state The current game state.
 * @param action The action to perform.
 * @returns The new game state.
 */
export function gameReducer(state: GameState, action: GameAction): GameState {
	switch (action.type) {
		case "RESET_GRID":
			return { ...state, grid: createEmptyGrid() };

		case "SPAWN_PIECE": {
			const piece = TETROMINOS[action.piece];
			return { ...state, currentPiece: piece, position: { x: 3, y: 0 } };
		}

		case "UPDATE_POSITION": {
			const newX = state.position.x + action.x;
			const newY = state.position.y + action.y;

			// Check for collision with the new position
			const collision = isCollision(
				state.grid,
				state.currentPiece!.shape,
				{
					x: newX,
					y: newY,
				}
			);

			// If there's a collision while moving downward (y > 0), lock the piece
			if (collision && action.y > 0) {
				// Lock the current piece into the grid
				const lockedGrid = getRenderedGrid(
					state.grid,
					state.currentPiece!.shape,
					state.position,
					state.currentPiece!.color
				);

				// Clear completed rows
				const { newGrid, rowsCleared } = clearFullRows(lockedGrid);

				return {
					...state,
					grid: newGrid,
					currentPiece: null,
					position: { x: 3, y: 0 },
					score: state.score + rowsCleared * 100,
				};
			}

			// If there's a collision but not due to downward movement, ignore the move
			if (collision) {
				return state;
			}

			// Apply the valid movement
			return {
				...state,
				position: { x: newX, y: newY },
			};
		}

		case "ROTATE_PIECE": {
			if (!state.currentPiece) return state;

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
			return {
				...state,
				grid: newGrid,
				score: state.score + rowsCleared * 100, // Increment score (100 points per cleared row)
			};
		}

		default:
			return state;
	}
}
