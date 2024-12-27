import { MusicDetails } from "../types";
import React, { useEffect, useState } from "react";
import { extractMetadata } from "../utilities/musicUtils";

const MusicInfo: React.FC = () => {
	const [info, setInfo] = useState<MusicDetails>({
		filename: "Unknown File",
		title: "Unknown Title",
		artist: "Unknown Artist",
	});

	useEffect(() => {
		const fetchMetadata = async () => {
			try {
				const data = await extractMetadata();
				console.log("Metadata fetched:", data);

				setInfo(data);
			} catch (error) {
				// Handle error and retain default values
				console.error("Error fetching metadata:", error);
			}
		};

		fetchMetadata();
	}, []);

	return <div className="-mt-4 -mb-2 text-xs !font-light text-orange-200">{info.title}</div>;
};

export default MusicInfo;
