/* eslint-disable import/no-nodejs-modules */
import * as path from 'path'
import { fileURLToPath } from 'url'

import react from '@vitejs/plugin-react-swc'
import { glob } from 'glob'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
// import { viteStaticCopy } from 'vite-plugin-static-copy'

import { peerDependencies } from './package.json'

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  console.log(`[VITE COMMAND] ${command} ${mode}`)
  return {
    plugins: [
      react(),
      dts({
        include: ['lib', 'src'],
        rollupTypes: true,
        insertTypesEntry: true,
        tsconfigPath: path.resolve(__dirname, 'tsconfig.lib.json'),
      }),
      // viteStaticCopy({
      //   targets: [{ src: 'src/assets/fonts/*', dest: 'assets/fonts' }],
      // }),
      libInjectCss(),
    ],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
    build: {
      copyPublicDir: false,
      cssCodeSplit: true,
      lib: {
        entry: path.resolve(__dirname, 'lib/index.ts'),
        name: '@alessandro-lenzi/react-timeline',
        formats: ['es', 'umd'],
        fileName: (format) => `react-timeline.${format}.js`,
      },
      rollupOptions: {
        external: [...Object.keys(peerDependencies), 'react/jsx-runtime'],
        input: Object.fromEntries(
          glob
            .sync('lib/**/*.{ts,tsx}', {
              ignore: ['lib/**/*.d.ts', 'lib/**/*.stories.tsx'],
            })
            .map((file) => [
              path.relative(
                'lib',
                file.slice(0, file.length - path.extname(file).length)
              ),
              fileURLToPath(new URL(file, import.meta.url)),
            ])
        ),
        output: {
          preserveModules: false, // Required before v2.2.0.
          globals: {
            react: 'React',
            'react/jsx-runtime': 'ReactJsxRuntime',
            'react-dom': 'ReactDOM',
            clsx: 'clsx',
            tailwindcss: 'tailwindcss',
          },
        },
      },
      sourcemap: true,
      emptyOutDir: true,
    },
  }
})
