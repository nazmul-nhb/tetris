import React from "react";
import { PieceDetails } from "../types";
import { createEmptyGrid, getRenderedGrid } from "../utilities/gameUtils";

type Props = { nextPiece: PieceDetails };

const NextPiece: React.FC<Props> = ({ nextPiece }) => {
	const miniGrid = createEmptyGrid(3, 4);

	const renderedMiniGrid = getRenderedGrid(
		miniGrid,
		nextPiece.shape,
		{ x: 0, y: 0 },
		nextPiece.color
	);

	return (
		<div
			title="Next Piece"
			className="border border-gray-300 flex items-center justify-center z-50 hover:scale-125 transition-all duration-300"
		>
			<div className="grid grid-cols-4 grid-rows-3">
				{renderedMiniGrid.map((row, rowIndex) =>
					row.map((cell, colIndex) => (
						<div
							key={`${rowIndex}-${colIndex}`}
							className={`w-2 h-2 border border-gray-400`}
							style={{
								backgroundColor: cell.filled
									? cell.color || "gray"
									: "white",
							}}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default NextPiece;
