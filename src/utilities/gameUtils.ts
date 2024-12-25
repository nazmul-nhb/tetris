import { COLS, ROWS, TETROMINOS } from "../constants";
import { Cell, ClearedRows, KeyPress, Position, Tetromino } from "../types";

/**
 * Function to create an empty grid.
 * @param rows Number of rows for the empty grid.
 * @param cols Number of columns for the empty grid.
 * @returns a 2D array of empty cells.
 */
export const createEmptyGrid = (rows: number, cols: number): Cell[][] =>
	Array.from({ length: rows }, () =>
		Array.from({ length: cols }, () => ({ filled: false, color: null }))
	);

/**
 * Rotate a Tetromino matrix clockwise.
 * @param matrix The Tetromino matrix to rotate.
 * @returns The rotated Tetromino matrix.
 */
export const rotateMatrix = (matrix: Tetromino): Tetromino => {
	return matrix[0].map((_, i) => matrix.map((row) => row[i]).reverse());
};

/**
 * Generate a random Tetromino piece key.
 * @returns A random Tetromino key from TETROMINOS.
 */
export const getRandomPiece = (): keyof typeof TETROMINOS => {
	const pieces = Object.keys(TETROMINOS) as (keyof typeof TETROMINOS)[];
	return pieces[Math.floor(Math.random() * pieces.length)];
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
	const rows = grid.length; // Dynamic row count based on the grid
	const cols = grid[0].length; // Dynamic column count based on the grid

	const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));

	piece.forEach((row, rowIndex) => {
		row.forEach((cell, colIndex) => {
			if (cell === 1) {
				const y = position.y + rowIndex;
				const x = position.x + colIndex;

				// Validate against the custom grid dimensions
				if (y >= 0 && y < rows && x >= 0 && x < cols) {
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
export const clearFullRows = (grid: Cell[][]): ClearedRows => {
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

/**
 * Throttle a function to prevent rapid key-press.
 * @param func The function to throttle key-press.
 * @param delay The delay between key-presses in ms.
 * @returns Throttled keyPress function.
 */
export const throttleKeyPress = (func: KeyPress, delay: number): KeyPress => {
	let lastCall = 0;

	return (event: KeyboardEvent) => {
		const now = Date.now();

		if (now - lastCall >= delay) {
			lastCall = now;
			func(event);
		}
	};
};


// /**
//  * Throttle a function to prevent rapid execution.
//  * @param func The function to throttle.
//  * @param delay Delay in milliseconds.
//  * @returns A throttled version of the function.
//  */
// export const throttleButtonPress = (func: () => void, delay: number) => {
// 	let lastCall = 0;

// 	return () => {
// 		const now = Date.now();

// 		if (now - lastCall >= delay) {
// 			lastCall = now;
// 			func();
// 		}
// 	};
// };
