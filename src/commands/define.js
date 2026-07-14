import { program } from 'commander';
import { save } from "../core/store.js";

program
    .command('define <name>')
    .description('Define a custom command')
    .option('--description <description>', 'Command description')
    .option('--cmd <cmd...>', 'Command(s) to save')
    .option('--arg <arg...>', 'Argument(s) to save')
    .action(async (name, options) => {
        const object = {
            description: options.description ?? '',
            commands: options.cmd ?? [],
            arguments: (options.arg ?? []).map(arg => argumentFormat(arg)),
        };

        const saved = await save(name, object);

        if (saved == 'exists') {
            console.error(`Error: ${name} is already a registered command! `);
        } else if (saved == 'success') {
            console.log(`Command "${name}" saved successfully.`);
        } else {
            console.error(`An unknown error occured when creating ${name}. Try again. `);
        }
    });

export function argumentFormat(argString) {
    const parts = argString.split(':');

    if (parts[1] == 'named') {
        return {
            name: parts[0],
            type: parts[1],
            default: parts[2],
        };
    } else {
        return {
            name: parts[0],
            type: parts[1],
        };
    }
}