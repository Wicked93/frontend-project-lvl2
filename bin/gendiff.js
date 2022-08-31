#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import engineDiff from '../index.js';
import formatDiffEntries from './stylish.js';
import plain from './plain.js'

const program = new Command();

program
  .description('Compare files and output differences in console')
  .version('0.8.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const diffData = engineDiff(filepath1, filepath2);
    console.log(diffData);
  });
program.parse();
