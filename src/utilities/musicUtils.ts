import { MusicTrack } from "../types";
import { parseBlob } from "music-metadata";
import { defaultMusicInfo } from "../constants";

const musicTracks: MusicTrack[] = [
	{ file: null, url: "/music/tetris-8bit.mp3" },
	{ file: null, url: "/music/puppets.mp3" },
	{ file: null, url: "/music/crawl.mp3" },
	{ file: null, url: "/music/remedy.mp3" },
	{ file: null, url: "/music/tetris-1984.mp3" },
];

let currentMusicTracks: MusicTrack[] = musicTracks;
let currentTrackIndex: number = 0;
let currentMusic: HTMLAudioElement | null = new Audio(
	currentMusicTracks[currentTrackIndex].url
);
let currentFile: File | null = currentMusicTracks[currentTrackIndex].file;

// Loop the background music playlist
currentMusic.addEventListener("ended", () => playNextTrack(true));

/** Cleanup currently playing music */
const cleanUpCurrentTrack = () => {
	if (currentMusic) {
		currentMusic.pause();
		currentMusic.removeEventListener("ended", () => playNextTrack(true));
		currentMusic.src = "";
		currentMusic = null;
	}
};

/**
 * Function to get random track index.
 * @param tracks An array of track urls.
 * @param exclude The track index to exclude.
 * @returns Random track index.
 */
const getRandomTrack = (tracks: MusicTrack[], exclude?: number): number => {
	if (tracks.length === 1) return 0;

	const randomIndex = Math.floor(
		Math.random() * (tracks.length - (exclude !== undefined ? 1 : 0))
	);

	return exclude !== undefined && randomIndex >= exclude
		? randomIndex + 1
		: randomIndex;
};

/**
 * Select music files from the user.
 * @param fileList A list of user-selected music files.
 */
export const selectMusicFiles = (fileList: FileList) => {
	cleanUpCurrentTrack();

	currentMusicTracks = Array.from(fileList).map((file) => ({
		file,
		url: URL.createObjectURL(file),
	}));

	currentTrackIndex = getRandomTrack(currentMusicTracks);

	currentFile = currentMusicTracks[currentTrackIndex].file;

	currentMusic = new Audio(currentMusicTracks[currentTrackIndex].url);

	// Loop the background music playlist
	currentMusic.addEventListener("ended", () => playNextTrack(true));
	currentMusic.play();
};

/**
 * Toggle the background music playback.
 * @param isEnabled Whether music should be played.
 */
export const toggleMusic = (isEnabled: boolean) => {
	if (!currentMusic) return;

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
	cleanUpCurrentTrack();

	// currentTrackIndex = (currentTrackIndex + 1) % currentMusicTracks.length;

	const nextIndex = getRandomTrack(currentMusicTracks, currentTrackIndex);

	currentTrackIndex = nextIndex;

	const nextTrack = currentMusicTracks[currentTrackIndex];

	currentFile = nextTrack.file;

	currentMusic = new Audio(nextTrack.url);

	// Loop the background music playlist
	currentMusic.addEventListener("ended", () => playNextTrack(true));

	if (isEnabled) currentMusic.play();
};

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
			url.split("/").pop() || "/music/tetris-8bit.mp3",
			{ type: blob.type }
		);

		return file;
	} catch (error) {
		console.error("Error Fetching File:", error);
		return null;
	}
};

/** Extract metadata from the currently playing audio file. */
export const extractMetadata = async () => {
	if (!currentFile) {
		if (!currentMusic) return defaultMusicInfo;

		currentFile = await fetchMusicFile(currentMusic.src);

		if (!currentFile) return defaultMusicInfo;
	}

	try {
		const metadata = await parseBlob(currentFile);
		const { title, artist } = metadata.common;

		return {
			filename: currentFile.name || "Unknown Music File",
			title: title || currentFile.name.split(".")[0],
			artist: artist || "Unknown Artist",
		};
	} catch (error) {
		console.error("Error extracting metadata:", error);
		return defaultMusicInfo;
	}
};
