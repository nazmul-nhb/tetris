import { TetrisScores } from "../types";

/**
 * Get the saved scores from local storage.
 * @returns The saved scores from local storage.
 */
export const getSavedScores = (): TetrisScores => {
	const savedScores = localStorage.getItem("tetrisScores");

	if (savedScores) {
		const scores = JSON.parse(savedScores) as TetrisScores;
		return scores;
	}

	return { totalLines: 0, bestScore: 0 };
};

/**
 * Save the scores to local storage.
 * @param scores The scores to save.
 */
const storeTetrisScores = (scores: TetrisScores): void => {
	localStorage.setItem("tetrisScores", JSON.stringify(scores));
};

/**
 * Update the best score in local storage.
 * @param score New best score to update.
 */
export const updateBestScore = (score: number): void => {
	const savedScores = getSavedScores();

	const updatedScores = { ...savedScores, bestScore: score };

	storeTetrisScores(updatedScores);
};

let isUpdating = false;

/**
 * Update the total lines cleared in local storage.
 * @param lines New cleared lines to add to the previous cleared lines.
 */
export const updateLinesCleared = (lines: number): void => {
	// Check if there's a pending update
	if (isUpdating) return;

	// Retrieve the current saved scores
	const savedScores = getSavedScores();

	// Set the flag before updating
	const updatedScores: TetrisScores = {
		...savedScores,
		totalLines: savedScores.totalLines + lines,
	};

	isUpdating = true;

	storeTetrisScores(updatedScores);

	// Clear the flag after a successful update
	setTimeout(() => {
		isUpdating = false;
	}, 0);
};
