import { TETROMINOS } from "../constants";
import { GameAction, GameState } from "../types";
import { createEmptyGrid, isCollision, getRenderedGrid } from "../utilities";

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
			const newPosition = {
				x: state.position.x + action.x,
				y: state.position.y + action.y,
			};

			// Check for collision before updating position
			if (
				state.currentPiece &&
				!isCollision(state.grid, state.currentPiece.shape, newPosition)
			) {
				return { ...state, position: newPosition };
			}

			// Handle collision with the bottom (lock piece in place)
			if (action.y > 0 && state.currentPiece) {
				const mergedGrid = getRenderedGrid(
					state.grid,
					state.currentPiece.shape,
					state.position,
					state.currentPiece.color
				);
				return {
					...state,
					grid: mergedGrid,
					currentPiece: null, // Clear current piece
					position: { x: 3, y: 0 }, // Reset position for the next piece
				};
			}

			return state;
		}

		default:
			return state;
	}
}
