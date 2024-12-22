import { Tetromino } from "../types";

export const ROWS = 20;
export const COLS = 10;

export const TETROMINOS: Record<string, { shape: Tetromino; color: string }> = {
	I: {
		shape: [[1, 1, 1, 1]],
		color: "cyan",
	},
	O: {
		shape: [
			[1, 1],
			[1, 1],
		],
		color: "yellow",
	},
	T: {
		shape: [
			[0, 1, 0],
			[1, 1, 1],
		],
		color: "purple",
	},
	L: {
		shape: [
			[1, 0],
			[1, 0],
			[1, 1],
		],
		color: "orange",
	},
	J: {
		shape: [
			[0, 1],
			[0, 1],
			[1, 1],
		],
		color: "blue",
	},
	S: {
		shape: [
			[0, 1, 1],
			[1, 1, 0],
		],
		color: "green",
	},
	Z: {
		shape: [
			[1, 1, 0],
			[0, 1, 1],
		],
		color: "red",
	},
};
