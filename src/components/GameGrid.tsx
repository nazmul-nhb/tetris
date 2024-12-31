import React, { Dispatch, Fragment } from "react";
import { Cell, GameAction, GameState } from "../types";
import { playSoundEffect } from "../utilities/soundUtils";

type Props = {
	state: GameState;
	dispatch: Dispatch<GameAction>;
	renderedGrid: Cell[][];
};

/**
 * GameGrid component that renders the grid of cells and handles the pause functionality when clicked.
 *
 * @param state - The current state of the game, including pause and hard mode settings.
 * @param dispatch - Function to dispatch actions to update the game state.
 * @param renderedGrid - The grid of cells to be rendered.
 */
const GameGrid: React.FC<Props> = ({ state, dispatch, renderedGrid }) => (
	<div
		onClick={() => {
			if (!state.gameOver) {
				playSoundEffect("pause", state.isSoundEffectsEnabled);
				dispatch({ type: "TOGGLE_PAUSE" });
			}
		}}
		className={`${
			state.gameOver ? "-z-10" : "z-10"
		} grid grid-cols-12 border border-gray-400`}
	>
		{renderedGrid.map((row, rowIndex) =>
			row.map((cell, colIndex) => (
				<div
					key={`${rowIndex}-${colIndex}`}
					className={`w-5 h-5 relative overflow-hidden ${
						state.isHardMode
							? cell.filled && "border border-gray-300"
							: "border border-gray-300"
					}`}
					style={{
						backgroundColor: cell.filled
							? cell.color || "gray"
							: "white",
						boxShadow: cell.filled
							? `inset 0 1px 2px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.6)`
							: "none",
					}}
				>
					{/* Shiny Edges */}
					{cell.filled && (
						<Fragment>
							{/* Top Shine */}
							<div
								className="absolute top-0 left-0 w-full h-0.5"
								style={{
									background: `linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0))`,
								}}
							/>
							{/* Left Shine */}
							<div
								className="absolute top-0 left-0 h-full w-0.5"
								style={{
									background: `linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0))`,
								}}
							/>
							{/* Bottom Shadow */}
							<div
								className="absolute bottom-0 left-0 w-full h-0.5"
								style={{
									background: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0))`,
								}}
							/>
							{/* Right Shadow */}
							<div
								className="absolute top-0 right-0 h-full w-0.5"
								style={{
									background: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))`,
								}}
							/>
						</Fragment>
					)}
				</div>
			))
		)}
	</div>
);

export default GameGrid;
