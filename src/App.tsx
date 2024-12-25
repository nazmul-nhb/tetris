import React from "react";
import Tetris from "./components/Tetris";

const App: React.FC = () => {
	return (
		<main className="bg-slate-950 min-h-screen text-white">
			<Tetris />
		</main>
	);
};

export default App;
