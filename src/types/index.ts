
export type Cell = {
	filled: boolean;
	color: string | null;
};
export type Tetromino = number[][];

export type Position = { x: number; y: number };

export type PieceDetails = { shape: Tetromino; color: string };

export type ClearedRows = { newGrid: Cell[][]; rowsCleared: number };

export type GameState = {
	grid: Cell[][];
	currentPiece: PieceDetails | null;
	nextPiece: PieceDetails;
	position: Position;
	score: number;
	bestScore: number;
	linesCleared: number;
	totalLines: number;
	gameOver: boolean;
	isPaused: boolean;
	isMusicEnabled: boolean;
	isSoundEffectsEnabled: boolean;
	points: number | null;
	speed: number;
};

export type GameAction =
	| { type: "RESET_GRID" }
	| { type: "SPAWN_PIECE" }
	| { type: "UPDATE_POSITION"; x: number; y: number }
	| { type: "ROTATE_PIECE" }
	| { type: "MOVE_LEFT" }
	| { type: "MOVE_RIGHT" }
	| { type: "MOVE_DOWN" }
	| { type: "CLEAR_ROWS" }
	| { type: "TOGGLE_PAUSE" }
	| { type: "TOGGLE_MUSIC"; enableMusic?: boolean }
	| { type: "TOGGLE_SOUND_EFFECTS" }
	| { type: "RESET_POINTS" };

export type PressedKey =
	| "ArrowLeft"
	| "ArrowRight"
	| "ArrowDown"
	| "ArrowUp"
	| "Pause"
	| "Music"
	| "Sound"
	| "Restart"
	| "Next";

export type TetrisScores = {
	totalLines: number;
	bestScore: number;
	pendingUpdate?: boolean;
};

export type KeyPress = (event: KeyboardEvent) => void;

export type ControlProps = {
	state: GameState;
	dispatch: React.Dispatch<GameAction>;
	pressedKey: PressedKey | null;
};
