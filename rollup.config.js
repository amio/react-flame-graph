import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'index.js',
  dest: 'dist/transpiled.js',
  format: 'iife',
  plugins: [
    babel({
      presets: [
        [ 'es2015-rollup' ],
        [ 'react' ]
      ]
    }),
    nodeResolve({ jsnext: true, main: true })
  ]
}
