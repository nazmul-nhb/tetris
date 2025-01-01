import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: [
				"fonts/*.ttf",
				"music/*.mp3",
				"sounds/*.wav",
				"/*.png",
			],
			manifest: {
				name: "Tetris by NHB",
				short_name: "Tetris",
				description:
					"A modern, fast-paced web implementation of the classic Tetris game built with React and TypeScript.",
				theme_color: "#020617",
				background_color: "#020617",
				display: "standalone",
				start_url: "/",
				icons: [
					{
						src: "/icon-192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/icon-512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
			devOptions: {
				enabled: true,
				type: "module",
			},
			workbox: {
				runtimeCaching: [
					{
						urlPattern: /^\/(?:music|sounds)\/.*\.(mp3|wav|ogg)$/,
						handler: "CacheFirst",
						options: {
							cacheName: "audio-cache",
							expiration: {
								maxEntries: 64,
								maxAgeSeconds: 30 * 24 * 60 * 60, // ? Cache for 1 month
							},
							matchOptions: {
								ignoreSearch: true,
							},
						},
					},
					{
						urlPattern: /^\/fonts\/.*\.(ttf|woff|woff2|eot|otf)$/,
						handler: "CacheFirst",
						options: {
							cacheName: "font-cache",
							expiration: {
								maxEntries: 20,
								maxAgeSeconds: 30 * 24 * 60 * 60, // ? Cache for 1 month
							},
						},
					},
				],
			},
		}),
	],
});
