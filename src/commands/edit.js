import { program } from 'commander';
import { update } from '../core/store.js';
import { argumentFormat } from './define.js';

program
    .command('edit <name>')
    .description('Update an already existing command')
    .option('--description <description>', 'Command description')
    .option('--cmd <cmd...>', 'Command(s) to save')
    .option('--arg <arg...>', 'Argument(s) to save')
    .action(async (name, options) => {
        const object = {};

        if (options.description !== undefined) object.description = options.description;
        if (options.cmd !== undefined) object.commands = options.cmd;
        if (options.arg !== undefined) object.arguments = options.arg.map(arg => argumentFormat(arg));

        const saved = await update(name, object);

        if (saved == 'not-exists') {
            console.error(`Error: ${name} does not exist. Create a command with customcmd define <name>`);
        } else if (saved == 'success') {
            console.log(`Command ${name} updated successfully.`);
        } else {
            console.error(`An unknown error occured when updating ${name}. Try again. `)
        }
    });