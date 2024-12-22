import { COLS, ROWS } from "../constants";
import { Cell, Position, Tetromino } from "../types";

/**
 * Function to create an empty grid
 * @returns a 2D array of empty cells
 */
export const createEmptyGrid = (): Cell[][] =>
	Array.from({ length: ROWS }, () =>
		Array.from({ length: COLS }, () => ({ filled: false, color: null }))
	);

/**
 * Rotate a Tetromino matrix clockwise
 * @param matrix The Tetromino matrix to rotate.
 * @returns The rotated Tetromino matrix.
 */
 export const rotateMatrix = (matrix: number[][]): number[][] => {
	return matrix[0].map((_, i) => matrix.map((row) => row[i]).reverse());
};

/**
 * Merge Tetromino with the Grid.
 * @param grid The game grid.
 * @param piece The Tetromino to merge.
 * @param position The position of the Tetromino.
 * @param color The color of the Tetromino.
 * @returns The new grid with the Tetromino merged.
 */
export const getRenderedGrid = (
	grid: Cell[][],
	piece: Tetromino,
	position: Position,
	color: string
) => {
	const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));

	piece.forEach((row, rowIndex) => {
		row.forEach((cell, colIndex) => {
			if (cell === 1) {
				const y = position.y + rowIndex;
				const x = position.x + colIndex;

				if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
					newGrid[y][x] = { filled: true, color };
				}
			}
		});
	});

	return newGrid;
};