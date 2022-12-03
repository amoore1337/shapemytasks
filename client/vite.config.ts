import { readFileSync } from 'fs';

import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

const plugins = [
  react({
    babel: {
      plugins: ['babel-plugin-macros', 'babel-plugin-styled-components'],
    },
  }),
  viteTsconfigPaths(),
  svgrPlugin(),
];

if (process.env.ANALYZE_BUILD) {
  plugins.push(visualizer({
    title: 'SMT Build Analysis',
    filename: 'build-analysis.html',
    template: 'treemap', // 'sunburst is also useful
  }));
}

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  plugins,
  server: {
    port: 3030,
    strictPort: true,
    hmr: {
      clientPort: 3030,
    },
    https: process.env.WITH_SSL ? {
      key: readFileSync('../localhost-ssl/localhost.key'),
      cert: readFileSync('../localhost-ssl/localhost.crt'),
    } : false,
  },
  build: {
    outDir: './build',
    target: 'es2020',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  define: {
    'process.env.BABEL_TYPES_8_BREAKING': 'false',
    __DEV__: (env.mode === 'development').toString(),
  },
}));
