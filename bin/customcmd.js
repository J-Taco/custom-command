#!/usr/bin/env node
import { program } from 'commander';
import { runCommand } from '../src/commands/run.js';

program.name('customcmd').description('An easy to use custom terminal command creator that can do multiple steps with one command').version('1.1.0');

import '../src/commands/define.js';
import '../src/commands/list.js';
import '../src/commands/remove.js';
import '../src/commands/run.js';
import '../src/commands/info.js';
import '../src/commands/ui.js';
import '../src/commands/edit.js';

program
    .arguments('<name> [userInputs...]')
    .allowUnknownOption()
    .action(async (name, userInputs) => {
        await runCommand(name, userInputs);
    });

program.parse(process.argv);