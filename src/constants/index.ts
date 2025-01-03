import { PieceDetails } from "../types";

export const ROWS = 20;
export const COLS = 12;

/** Speed Levels and Conditions */
export const SPEED_LEVELS = [
	{ score: 0, speed: 1000 },
	{ score: 1000, speed: 875 },
	{ score: 5000, speed: 775 },
	{ score: 10000, speed: 675 },
	{ score: 20000, speed: 590 },
	{ score: 30000, speed: 500 },
	{ score: 35000, speed: 400 },
	{ score: 40000, speed: 335 },
	{ score: 45000, speed: 270 },
	{ score: 50000, speed: 220 },
];

/** The Tetrominos shapes and colors */
export const TETROMINOS: Record<string, PieceDetails> = {
	I: {
		shape: [[1, 1, 1, 1]],
		color: "DarkRed",
	},
	O: {
		shape: [
			[1, 1],
			[1, 1],
		],
		color: "Brown",
	},
	T: {
		shape: [
			[0, 1, 0],
			[1, 1, 1],
		],
		color: "DarkGreen",
	},
	L: {
		shape: [
			[1, 0],
			[1, 0],
			[1, 1],
		],
		color: "Purple",
	},
	J: {
		shape: [
			[0, 1],
			[0, 1],
			[1, 1],
		],
		color: "SaddleBrown",
	},
	S: {
		shape: [
			[0, 1, 1],
			[1, 1, 0],
		],
		color: "Crimson",
	},
	Z: {
		shape: [
			[1, 1, 0],
			[0, 1, 1],
		],
		color: "OrangeRed",
	},
} as const;

export const defaultMusicInfo = {
	filename: "Unknown Music File",
	title: "Unknown Title",
	artist: "Unknown Artist",
};
