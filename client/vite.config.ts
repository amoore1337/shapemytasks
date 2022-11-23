import { readFileSync } from 'fs';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-macros', 'babel-plugin-styled-components'],
      },
    }),
    viteTsconfigPaths(),
    svgrPlugin(),
  ],
  server: {
    port: 3030,
    strictPort: true,
    hmr: {
      clientPort: 3030,
    },
    https: {
      key: readFileSync('../localhost-ssl/localhost.key'),
      cert: readFileSync('../localhost-ssl/localhost.crt'),
    },
  },
  build: {
    outDir: './build',
  },
  define: {
    'process.env.BABEL_TYPES_8_BREAKING': 'false',
    __DEV__: (env.mode === 'development').toString(),
  },
}));
