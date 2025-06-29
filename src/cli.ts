#!/usr/bin/env node
import { Command } from 'commander';
import { deleteOrphanArw } from './utils/delete-arw/index';

const program = new Command();

program
  .name('photo-genie')
  .description('Photo utilities CLI')
  .version('1.0.0');

program
  .command('delete-arw <dir>')
  .description('Delete ARW files without matching JPEGs')
  .action(async (dir: string) => {
    await deleteOrphanArw(dir);
  });

program.parseAsync(process.argv);
