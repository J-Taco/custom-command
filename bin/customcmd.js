#!/usr/bin/env node
import { program } from 'commander';

program.name('custcmd').description('Run your custom commands').version('1.0.0');

// Register commands here
import '../src/commands/define.js';
import '../src/commands/list.js';
import '../src/commands/remove.js';
import '../src/commands/run.js';
import '../src/commands/info.js';

program.parse(process.argv);