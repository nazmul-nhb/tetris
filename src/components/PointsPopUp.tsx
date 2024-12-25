import React from "react";

type BonusProps = { points: number | null };

const PointsPopUp: React.FC<BonusProps> = ({ points }) => {
	if (!points) return null;

	return (
		<div className="absolute flex justify-center gap-3 top-1/2 -translate-y-1/2 animate-pop-up duration-1000 text-red-800 text-lg font-extrabold px-4 py-1 rounded-sm bg-red-300/90 border border-red-400 text-nowrap z-30">
			+{points} Points!
		</div>
	);
};

export default PointsPopUp;
