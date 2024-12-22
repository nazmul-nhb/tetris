import { TetrisScores } from "../types";

/**
 * Get the saved scores from local storage.
 * @returns The saved scores from local storage.
 */
export const getSavedScores = (): TetrisScores => {
	const savedScores = localStorage.getItem("tetrisScores");

	if (savedScores) {
		return JSON.parse(savedScores);
	}

	return { totalLines: 0, bestScore: 0 };
};

/**
 * Save the scores to local storage.
 * @param scores The scores to save.
 */
const _saveScores = (scores: TetrisScores): void => {
	localStorage.setItem("tetrisScores", JSON.stringify(scores));
};

/**
 * Update the best score in local storage.
 * @param score New best score to update.
 */
export const updateBestScore = (score: number): void => {
	const savedScores = getSavedScores();

	const updatedScores = { ...savedScores, bestScore: score };

	_saveScores(updatedScores);
};

/**
 * Update the total lines cleared in local storage.
 * @param lines New cleared lines to add to the previous cleared lines.
 */
export const updateLinesCleared = (lines: number): void => {
	const savedScores = getSavedScores();
	console.log({ savedScores });
	const updatedScores = {
		...savedScores,
		totalLines: savedScores.totalLines + lines,
	};
	console.log({ updatedScores });

	_saveScores(updatedScores);
};
