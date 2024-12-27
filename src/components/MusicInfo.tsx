import { GameState, MusicDetails } from "../types";
import React, { useEffect, useState } from "react";
import { extractMetadata } from "../utilities/musicUtils";
import { BsMusicNoteList } from "react-icons/bs";

type Props = { state: GameState; selectedMusic: FileList | null };

const MusicInfo: React.FC<Props> = ({ state, selectedMusic }) => {
	const [info, setInfo] = useState<MusicDetails>({
		filename: "Unknown File",
		title: "Unknown Title",
		artist: "Unknown Artist",
	});

	useEffect(() => {
		const fetchMetadata = async () => {
			const data = await extractMetadata();
			setInfo(data);
		};

		fetchMetadata();
	}, [state, selectedMusic]);

	return (
		<div
			key={info.filename}
			title={`${info.title} by ${info.artist}`}
			className="w-full overflow-hidden -mt-4 -mb-2"
		>
			<h5 className="text-[10px] !font-extralight text-orange-100 flex items-center gap-2 tracking-widest font-serif whitespace-nowrap max-w-[280px] overflow-hidden">
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
