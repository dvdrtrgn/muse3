import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const out = 'vuebox';

// https://vitejs.dev/config/
export default defineConfig({
    build: { outDir: `dist/${out}` },
    base: `/${out}/`,
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
