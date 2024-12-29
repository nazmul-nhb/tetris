import { GameState, MusicDetails } from "../types";
import React, { useEffect, useState } from "react";
import { extractMetadata } from "../utilities/musicUtils";
import { BsMusicNoteList } from "react-icons/bs";
import { defaultMusicInfo } from "../constants";

type Props = {
	state: GameState;
	selectedMusic: FileList | null;
};

/**
 * MusicInfo component displays information about the currently playing music track, including the title and artist.
 * It fetches metadata periodically to update the displayed information.
 *
 * @param state - The current game state, including track changes.
 * @param selectedMusic - The selected music files.
 */
const MusicInfo: React.FC<Props> = ({ state, selectedMusic }) => {
	const [info, setInfo] = useState<MusicDetails>(defaultMusicInfo);
	const [dependencyKey, setDependencyKey] = useState("dependency");

	useEffect(() => {
		setDependencyKey(`${state.trackChanges}-${selectedMusic?.length || 0}`);

		const fetchMetadata = async () => {
			const data = await extractMetadata();
			setInfo(data);
		};

		fetchMetadata();

		const interval = setInterval(() => {
			setDependencyKey(
				`${state.trackChanges}-${selectedMusic?.length || 0 + interval}`
			);

			fetchMetadata();
		}, 5000);

		return () => clearInterval(interval);
	}, [dependencyKey, selectedMusic?.length, state.trackChanges]);

	return (
		<div
			key={info.filename}
			title={`${info.title} by ${info.artist}`}
			className="w-full overflow-hidden -mt-4 -mb-1 z-40"
		>
			<h5 className="text-[10px] !font-extralight text-orange-100 flex items-center gap-2 tracking-widest font-serif whitespace-nowrap max-w-[260px] overflow-hidden">
				<BsMusicNoteList />
				<span className="inline-block text-center marquee-container w-full">
					<span className="inline-block marquee-content">
						{info.title} by {info.artist}
					</span>
				</span>
			</h5>
		</div>
	);
};

export default MusicInfo;
