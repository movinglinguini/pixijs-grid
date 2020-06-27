import {terser} from 'rollup-plugin-terser';
import clear from 'rollup-plugin-clear';

const commonConfig = {
  plugins: [clear({ targets: ['dist'] })],
};

export default [{
  input: 'src/pixijs-grid.js',
  output: [{
    format: 'esm',
  }],
  ...commonConfig,
}, {
  input: 'src/pixijs-grid.mjs',
  output: [{
    format: 'esm',
    entryFileNames: 'pixijs-grid.mjs'
  }],
  ...commonConfig,
}]
