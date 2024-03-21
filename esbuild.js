const esbuild = require('esbuild')
const { replaceTscAliasPaths } = require('tsc-alias')
/**
 * @type {esbuild.BuildOptions}
 */
const baseOptions = {
  platform: 'node',
  outdir: 'dist',
  plugins: [],
  entryPoints: ['src/*.ts', 'src/**/*.ts'],
}

esbuild.build({
  ...baseOptions,
  outExtension: { '.js': '.mjs' },
  format: 'esm',
})

esbuild.build({
  ...baseOptions,
  format: 'cjs',
})

replaceTscAliasPaths({
  configFile: 'tsconfig.json',
  watch: false,
  outDir: 'dist',
  declarationDir: 'dist',
  fileExtensions: '.mjs',
})
