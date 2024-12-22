import { PieceDetails } from "../types";

export const ROWS = 20;
export const COLS = 12;

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
