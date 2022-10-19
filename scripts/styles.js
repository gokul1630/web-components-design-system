/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable no-console */
const yargs = require('yargs');
const gaze = require('gaze');
const postcss = require('postcss');
const fs = require('fs');
const glob = require('glob');
const config = require('../postcss.config');

const options = yargs.option('watch', {
  type: 'boolean',
  describe: 'Watch the file system for changes and render automatically',
}).argv;

/**
 * Function to wrap all generic .css files with CSS template literals suitable for consumption via Lit.
 *
 * @param {string} filepath
 */
const createCssLiterals = filepath => {
  const filename = filepath.replace(/^.*[\\\/]/, '');
  fs.readFile(filepath, (err, css) => {
    const nFilePath = `${filepath}.lit.ts`;
    postcss([...config.plugins])
      .process(css, { from: filepath, to: nFilePath })
      .then(result => {
        if (filepath.includes('css-variables')) {
          createVariableLiterals(result, nFilePath);
        } else {
          createComponentLiterals(result, nFilePath);
        }
      });
  });
};

const createComponentLiterals = (result, path) => {
  fs.writeFile(
    path,
    `
import { css } from 'lit';
export default css\`
/* Apply component specific CSS */
${result.css}\`;`,
    () => true
  );
};

const createVariableLiterals = (result, path) => {
  fs.writeFile(
    path,
    `
import { css } from 'lit';
export default css\`
/* Apply CSS Variables to the host element. */
:host {
${result.css}\`;`,
    () => true
  );
};

// Run the component style generation.
glob('packages/**/*.css', (err, files) => {
  files.forEach(createCssLiterals);
});
