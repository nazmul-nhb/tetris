import { TETROMINOS } from "../constants";

export type Cell = {
	filled: boolean;
	color: string | null;
};
export type Tetromino = number[][];

export type Position = { x: number; y: number };

export type PieceDetails = { shape: Tetromino; color: string };

export type GameState = {
	grid: Cell[][];
	currentPiece: PieceDetails | null;
	position: Position;
	score: number;
    bestScore: number;
    linesCleared: number;
    totalLines: number;
	gameOver: boolean;
	isPaused: boolean;
};

export type GameAction =
	| { type: "RESET_GRID" }
	| { type: "SPAWN_PIECE"; piece: keyof typeof TETROMINOS }
	| { type: "UPDATE_POSITION"; x: number; y: number }
	| { type: "ROTATE_PIECE" }
	| { type: "MOVE_LEFT" }
	| { type: "MOVE_RIGHT" }
	| { type: "MOVE_DOWN" }
	| { type: "CLEAR_ROWS" }
	| { type: "TOGGLE_PAUSE" };

export type KeyPressed =
	| "ArrowLeft"
	| "ArrowRight"
	| "ArrowDown"
	| "ArrowUp"
	| "Space";

export type TetrisScores = {
	totalLines: number;
	bestScore: number;
};
