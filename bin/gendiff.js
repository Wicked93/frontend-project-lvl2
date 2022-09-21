#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import engineDiff from '../src/index.js';

const program = new Command();

program
  .description('Compare files and output differences in console')
  .version('0.8.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    const diffData = engineDiff(filepath1, filepath2, options.format);
    console.log(diffData);
  });
program.parse();
