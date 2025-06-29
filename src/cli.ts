#!/usr/bin/env node
import { Command } from 'commander';
import commands from './utils';

const program = new Command();

program
  .name('photo-genie')
  .description('Photo utilities CLI')
  .version('1.0.0');


for (const cmd of commands) {
  program.addCommand(cmd);
}

program.parseAsync(process.argv);
