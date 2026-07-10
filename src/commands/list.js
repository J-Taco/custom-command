import { program } from "commander";
import { getAll } from "../core/store.js";

program
    .command('list')
    .description('Lists all custom commands')
    .action(() => {
        const data = getAll();
        const keys = Object.keys(data);

        if (keys.length == 0) {
            console.log('No defined commands.');
        } else {
            keys.forEach(key => {
                const cmd = data[key];
                console.log(`${key} - ${cmd.description}`);
            });
        }
    });