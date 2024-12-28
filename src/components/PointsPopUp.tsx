import React from "react";

type Props = { points: number | null };

/**
 * PointsPopUp component displays a popup with the points added to the game score.
 *
 * @param points - The number of points to display in the popup. If null, the popup will not be rendered.
 */
const PointsPopUp: React.FC<Props> = ({ points }) => {
	if (!points) return null;

	return (
		<div className="absolute flex justify-center gap-3 top-1/2 -translate-y-1/2 animate-pop-up duration-1000 text-red-800 text-lg font-extrabold px-4 py-1 rounded-sm bg-red-300/90 text-nowrap z-30">
			+{points} Points!
		</div>
	);
};

export default PointsPopUp;
