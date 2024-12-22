import { TETROMINOS } from "../constants";

export type Cell = {
	filled: boolean;
	color: string | null;
};
export type Tetromino = number[][];

export type Position = { x: number; y: number };

export type GameState = {
	grid: Cell[][];
	currentPiece: { shape: Tetromino; color: string } | null;
	position: Position;
};


export type GameAction =
	| { type: "RESET_GRID" }
	| { type: "SPAWN_PIECE"; piece: keyof typeof TETROMINOS }
	| { type: "UPDATE_POSITION"; x: number; y: number };