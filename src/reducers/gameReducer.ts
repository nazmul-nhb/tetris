import { TETROMINOS } from "../constants";
import { GameAction, GameState } from "../types";
import { createEmptyGrid } from "../utilities";

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
		case "UPDATE_POSITION":
			return {
				...state,
				position: {
					x: state.position.x + action.x,
					y: state.position.y + action.y,
				},
			};
		default:
			return state;
	}
}
