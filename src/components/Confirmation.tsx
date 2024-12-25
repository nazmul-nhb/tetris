import React, { useEffect, useRef, useState } from "react";

type Props = {
	onConfirm: () => void;
	onCancel: () => void;
};

const Confirmation: React.FC<Props> = ({ onConfirm, onCancel }) => {
	const [isExiting, setIsExiting] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	const handleCancel = () => {
		setIsExiting(true);
		setTimeout(onCancel, 300);
	};

	const handleConfirm = () => {
		setIsExiting(true);
		setTimeout(onConfirm, 300);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				setIsExiting(true);
				setTimeout(onCancel, 300);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onCancel]);

	return (
		<div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm backdrop-filter z-50">
			<div
				ref={modalRef}
				className={`
					bg-red-100/95 p-6 rounded-md shadow-md shadow-red-600 w-full max-w-[240px] absolute top-1/4  text-red-950 
					transform ${isExiting ? "animate-popupOut" : "animate-popupIn"}
				`}
			>
				<h2 className="text-sm font-semibold text-center mb-4 tracking-wider">
					Want to restart the game?
				</h2>
				<div className="flex justify-evenly text-xs tracking-widest">
					<button
						onClick={handleConfirm}
						className="bg-green-800 text-white py-2 px-2 rounded hover:bg-green-900 transition-all duration-300 hover:-translate-y-1 active:translate-y-1 shadow-sm shadow-gray-500 active:shadow-md active:shadow-gray-700"
					>
						Confirm
					</button>
					<button
						onClick={handleCancel}
						className="bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800 transition-all duration-300 hover:-translate-y-1 active:translate-y-1 shadow-sm shadow-gray-500 active:shadow-md active:shadow-gray-700"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default Confirmation;
