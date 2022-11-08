import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@api': path.resolve(__dirname, './src/api'),
			'@components': path.resolve(__dirname, './src/components'),
			'@constant': path.resolve(__dirname, './src/constant'),
			'@helpers': path.resolve(__dirname, './src/helpers'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@routes': path.resolve(__dirname, './src/routes'),
			'@schema': path.resolve(__dirname, './src/schema'),
		},
	},
});
