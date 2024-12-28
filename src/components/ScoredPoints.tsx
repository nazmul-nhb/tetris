import React from "react";
import NextPiece from "./NextPiece";
import { GameState } from "../types";
import { FaCoins, FaTrophy } from "react-icons/fa6";

type Props = { state: GameState };

/**
 * ScoredPoints component displays the current score, best score, and the next piece in the Tetris game.
 *
 * @param state - The current state of the game, containing the scores (bestScore, score) and the next piece.
 */
const ScoredPoints: React.FC<Props> = ({ state }) => {
	return (
		<div className="flex justify-between tracking-wider items-center w-full relative pb-2">
			{/* Best Score */}
			<h2
				title="Best Score"
				className="text-lg font-semibold flex items-center gap-2"
			>
				<FaTrophy size={22} />
				{state.bestScore}
			</h2>
			{/* Next Piece */}
			<div className="absolute left-1/2 -translate-x-1/2">
				<NextPiece nextPiece={state.nextPiece} />
			</div>
			{/* Current Score */}
			<h2
				title="Current Score"
				className="text-lg font-semibold flex items-center gap-2"
			>
				<FaCoins size={20} /> {state.score}
			</h2>
		</div>
	);
};

export default ScoredPoints;
