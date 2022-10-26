import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{ find: '@', replacement: path.resolve(__dirname, './src') },
			{ find: '@/components', replacement: path.resolve(__dirname, './src/components') },
			{ find: '@/routes', replacement: path.resolve(__dirname, './src/routes') },
			{ find: '@/helpers', replacement: path.resolve(__dirname, './src/helpers') },
			{ find: '@/hooks', replacement: path.resolve(__dirname, './src/hooks') },
			{ find: '@/assets', replacement: path.resolve(__dirname, './src/assets') },
			{ find: '@/api', replacement: path.resolve(__dirname, './src/api') },
		],
	},
});
