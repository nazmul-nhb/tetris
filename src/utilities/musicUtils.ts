import { MusicTrack } from "../types";
import { parseBlob } from "music-metadata";
import { defaultMusicInfo } from "../constants";

const musicTracks: MusicTrack[] = [
	{ file: null, url: "/music/puppets.mp3" },
	{ file: null, url: "/music/crawl.mp3" },
	{ file: null, url: "/music/remedy.mp3" },
];

let currentMusicTracks: MusicTrack[] = musicTracks;
let currentTrackIndex = Math.floor(Math.random() * currentMusicTracks.length);
let currentMusic = new Audio(currentMusicTracks[currentTrackIndex].url);
let currentFile: File | null = currentMusicTracks[currentTrackIndex].file;

// currentMusic.loop = true;

// Loop the background music playlist
currentMusic.addEventListener("ended", () => {
	playNextTrack(true);
});

/**
 * Fetch the file and create a File object for music files that don't have a File object.
 * @param url URL of the music file.
 * @returns FIle object for metadata.
 */
const fetchMusicFile = async (url: string): Promise<File | null> => {
	try {
		const response = await fetch(url);
		const blob = await response.blob();

		const file = new File(
			[blob],
			url.split("/").pop() || "/music/puppets.mp3",
			{
				type: blob.type,
			}
		);
		return file;
	} catch (error) {
		console.error("Error fetching file:", error);
		return null;
	}
};

/**
 * Select music files from the user.
 * @param fileList A list of user-selected music files.
 */
export const selectMusicFiles = (fileList: FileList) => {
	currentMusicTracks = Array.from(fileList).map((file) => ({
		file,
		url: URL.createObjectURL(file),
	}));

	currentMusic.pause();
	currentMusic.currentTime = 0;

	currentTrackIndex = Math.floor(Math.random() * currentMusicTracks.length);
	currentFile = currentMusicTracks[currentTrackIndex].file;

	currentMusic = new Audio(currentMusicTracks[currentTrackIndex].url);
	// currentMusic.loop = true;
	currentMusic.play();

	// Loop the background music playlist
	currentMusic.addEventListener("ended", () => {
		playNextTrack(true);
	});
};

/**
 * Toggle the background music playback.
 * @param isEnabled Whether music should be played.
 */
export const toggleMusic = (isEnabled: boolean) => {
	if (isEnabled) {
		currentMusic.play();
	} else {
		currentMusic.pause();
	}
};

/**
 * Play the next music track.
 * @param isEnabled Whether music is enabled.
 */
export const playNextTrack = (isEnabled: boolean) => {
	if (currentMusic) {
		currentMusic.pause();
		currentMusic.currentTime = 0;
		currentMusic.src = "";
	}

	currentTrackIndex = (currentTrackIndex + 1) % currentMusicTracks.length;

	const nextTrack = currentMusicTracks[currentTrackIndex];
	currentFile = nextTrack.file;

	currentMusic = new Audio(nextTrack.url);
	// currentMusic.loop = true;

	if (isEnabled) {
		currentMusic.play();
	}

	currentMusic.addEventListener("ended", () => {
		playNextTrack(true);
	});
};

/** Extract metadata from the currently playing audio file. */
export const extractMetadata = async () => {
	if (!currentFile) {
		currentFile = await fetchMusicFile(currentMusic.src);

		if (!currentFile) {
			return defaultMusicInfo;
		}
	}

	try {
		const metadata = await parseBlob(currentFile);
		const { title, artist } = metadata.common;

		return {
			filename: currentFile.name || "Unknown File",
			title: title || currentFile.name.split(".")[0],
			artist: artist || "Unknown Artist",
		};
	} catch (error) {
		console.error("Error extracting metadata:", error);
		return defaultMusicInfo;
	}
};

export { currentFile };
