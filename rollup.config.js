import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default [
  {
    input: './src/index.ts',
    output: {
      dir: 'lib',
      format: 'cjs'
    },
    external: ['react', 'react-dom'],
    plugins: [
      typescript({
        outDir: 'lib'
      }),
      resolve(),
      commonjs()
    ]
  }
]
