import { GameState } from "../types";
import { COLS, ROWS, TETROMINOS } from ".";
import { getSavedScores } from "../utilities/localStorage";
import { createEmptyGrid, getRandomPiece } from "../utilities/gameUtils";

const { bestScore, totalLines } = getSavedScores();

/** The initial game state */
export const initialState: GameState = {
	grid: createEmptyGrid(ROWS, COLS),
	currentPiece: TETROMINOS[getRandomPiece()],
	nextPiece: TETROMINOS[getRandomPiece()],
	position: { x: 4, y: 0 },
	score: 0,
	bestScore: bestScore,
	linesCleared: 0,
	totalLines: totalLines,
	gameOver: false,
	isPaused: true,
	isMusicEnabled: false,
	isSoundEffectsEnabled: true,
	points: null,
	speed: 1000,
	trackChanges: 0,
	isHardMode: false,
};
