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
export const rotateMatrix = (matrix: Tetromino): Tetromino => {
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
): Cell[][] => {
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

/**
 * Check for collision when placing or rotating a Tetromino.
 * @param grid The game grid.
 * @param shape The Tetromino shape.
 * @param position The position to check.
 * @returns True if there's a collision.
 */
export const isCollision = (
	grid: Cell[][],
	shape: Tetromino,
	position: Position
): boolean => {
	return shape.some((row, rowIndex) =>
		row.some((cell, colIndex) => {
			if (cell === 1) {
				const x = position.x + colIndex;
				const y = position.y + rowIndex;

				// Check if out of bounds or collides with a filled cell
				return (
					x < 0 ||
					x >= COLS ||
					y >= ROWS || // Out of bounds vertically or horizontally
					(y >= 0 && grid[y][x].filled) // Collision with filled cell
				);
			}
			return false;
		})
	);
};

/**
 * Clear filled rows and update the grid and score.
 * @param grid The current game grid.
 * @returns An object with the updated grid and cleared row count.
 */
export const clearFullRows = (
	grid: Cell[][]
): { newGrid: Cell[][]; rowsCleared: number } => {
	const newGrid = grid.filter((row) => row.some((cell) => !cell.filled));
	const clearedRows = ROWS - newGrid.length;

	// Add empty rows on top to maintain grid size
	while (newGrid.length < ROWS) {
		newGrid.unshift(
			Array.from({ length: COLS }, () => ({ filled: false, color: null }))
		);
	}

	return { newGrid, rowsCleared: clearedRows };
};
