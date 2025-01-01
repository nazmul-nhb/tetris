import "./styles.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// * Service Worker Registration
if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("/registerSW.js")
			.then((registration) => {
				if (import.meta.env.DEV) {
					console.log("Service Worker Registered:", registration);
				}
			})
			.catch((error) => {
				if (import.meta.env.DEV) {
					console.error("Service Worker Registration Failed:", error);
				}
			});
	});
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
