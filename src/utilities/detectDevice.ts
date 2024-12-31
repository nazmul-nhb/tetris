type Device =
	| "android"
	| "iphone"
	| "ipad"
	| "ipod"
	| "windows"
	| "mac"
	| "linux"
	| "unknown";

/**
 * Detects if the game is running on Android, Mac, Windows, Linux etc.
 * @returns - Device OS: `android` if running on Android, `windows` if running on Windows and so on.
 */
export const detectDevice = (): Device => {
	const userAgent = navigator.userAgent.toLowerCase();

	if (userAgent.includes("android")) {
		return "android";
	} else if (userAgent.includes("iphone")) {
		return "iphone";
	} else if (userAgent.includes("ipad")) {
		return "ipad";
	} else if (userAgent.includes("ipod")) {
		return "ipod";
	} else if (userAgent.includes("windows")) {
		return "windows";
	} else if (userAgent.includes("macintosh")) {
		return "mac";
	} else if (userAgent.includes("linux")) {
		return "linux";
	}

	return "unknown";
};
